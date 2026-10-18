# الفصل 9: الـ Fork Agents والـ Prompt Cache

## فكرة الـ 95%

لما parent agent يعمل spawn لـ 5 child agents بالتوازي، الغالبية العظمى من الـ API request الخاص بكل child بتكون متطابقة. الـ system prompt نفسه. والـ tool definitions نفسها. وسجل المحادثة نفسه. والـ assistant message اللي سببت الـ spawns نفسها. الحاجة الوحيدة اللي بتختلف هي التوجيه الأخير: "you handle the database migration" (إنت تتولى الـ database migration)، "you write the tests" (إنت تكتب الـ tests)، "you update the docs" (إنت تحدّث الـ docs).

في fork عادي على محادثة سخنة (الـ cache الخاص بيها متملي وجاهز)، الـ shared prefix ممكن يكون 80,000 tokens. والتوجيه الخاص بكل child ممكن يكون 200 tokens. ده تداخل بنسبة 99.75%. الـ prompt cache الخاص بـ Anthropic بيدّي خصم 90% على الـ input tokens اللي جاية من الـ cache. لو قدرت تخلّي الـ 80,000 tokens دول يعملوا cache hit للـ children من 2 لـ 5، تبقى قللت تكلفة الـ input للـ 4 requests دول بنسبة 90%. وبالنسبة للـ parent، ده الفرق بين إنك تدفع $4 وإنك تدفع $0.50 على نفس الـ parallel dispatch.

المشكلة إن الـ prompt caching بيشتغل على مستوى الـ byte بالضبط. مش "متشابه بما فيه الكفاية". ولا "نفس المعنى". الـ bytes لازم تتطابق، حرف بحرف، من أول byte في الـ system prompt لحد آخر byte قبل ما المحتوى الخاص بكل child يبدأ يختلف. مسافة زيادة واحدة، أو tool definition واحد اتغير ترتيبه، أو feature flag قديم غيّر جزء من الـ system prompt، والـ cache بيعمل miss. الـ prefix كله بيتعالج تاني بالسعر الكامل.

الـ fork agents (نسخ من الـ agent بتشترك معاه في نفس الـ context) هي إجابة Claude Code على القيد ده. هي مش مجرد تسهيل لـ "spawn a child with context" (اعمل spawn لـ child معاه الـ context). هي آلية لاستغلال الـ prompt cache متنكرة في شكل ميزة orchestration. كل قرار تصميم في نظام الـ fork بيرجع لسؤال واحد: إزاي نضمن prefixes من نوع byte-identical (متطابقة byte بـ byte) بين الـ children المتوازية؟

---

## إيه اللي الـ Fork Child بيورثه

الـ fork agent بيورث 4 حاجات من الـ parent، وبيورثها بالـ reference أو كنسخة متطابقة byte بـ byte، مش بإعادة الحساب.

**1. الـ system prompt.** مش بيتولّد تاني، بيتمرر زي ما هو. الـ bytes الخاصة بالـ system prompt اللي الـ parent عمل لها render فعلًا بتتمرر عن طريق `override.systemPrompt`، وبتتسحب من `toolUseContext.renderedSystemPrompt`. ودي نفس الـ string بالضبط اللي اتبعتت في آخر API call للـ parent.

**2. الـ tool definitions.** الـ fork agent definition بيعلن `tools: ['*']`، لكن مع الـ flag `useExactTools` مضبوط على true، الـ child بيستقبل الـ tool array المجمّع الخاص بالـ parent مباشرة. من غير filtering، ولا إعادة ترتيب، ولا re-serialization.

**3. سجل المحادثة.** كل رسالة الـ parent تبادلها مع الـ API، سواء user turns أو assistant turns أو tool calls أو tool results، بتتنسخ في الـ context الخاص بالـ child عن طريق `forkContextMessages`.

**4. الـ thinking configuration والـ model.** الـ fork definition بيحدد `model: 'inherit'`، وده بيتحل لنفس الـ model الخاص بالـ parent بالضبط. نفس الـ model معناه نفس الـ tokenizer، ونفس الـ context window، ونفس الـ cache namespace.

الـ fork agent definition نفسه بسيط جدًا، تقريبًا no-op:

الـ fork agent definition بسيط عن قصد: بيورث كل حاجة من الـ parent. بيحدد كل الـ tools (`'*'`)، وبيورث الـ model الخاص بالـ parent، وبيستخدم الـ bubble mode للصلاحيات (عشان الـ permission prompts تطلع في terminal الـ parent)، وبيوفّر system prompt function من نوع no-op عمرها ما بتتستدعى فعليًا. الـ prompt الحقيقي بيوصل عن طريق قناة الـ override، وهو معمول له render ومستقر على مستوى الـ byte.

---

## حيلة الـ Byte-Identical Prefix

الـ API request اللي بيتبعت لـ Claude ليه بنية محددة: الـ system prompt، وبعدين الـ tools، وبعدين الـ messages. عشان الـ prompt cache يعمل hit، كل byte من بداية الـ request لحد نقطة معينة في الـ prefix لازم يكون متطابق بين الـ requests.

الـ fork agents بتحقق ده بإنها بتضمن إن 3 طبقات متجمّدة:

**الطبقة 1: الـ system prompt بالتمرير، مش بإعادة الحساب.**

لما الـ system prompt الخاص بالـ parent اتعمل له render لآخر API call، النتيجة اتحفظت في `toolUseContext.renderedSystemPrompt`. ودي الـ string بعد كل الـ dynamic interpolation: الـ GrowthBook feature flags، وتفاصيل البيئة، وأوصاف الـ MCP servers، ومحتوى الـ skills، وملفات CLAUDE.md. الـ fork child بيستقبل الـ string دي بالضبط.

ليه مش نستدعي `getSystemPrompt()` تاني ببساطة؟ لأن توليد الـ system prompt مش pure (يعني النتيجة مش بتعتمد على المدخلات بس، فيه side effects). الـ GrowthBook flags بتنتقل من الحالة cold للحالة warm أثناء ما الـ SDK بيجيب الـ remote config. الـ flag اللي رجّع `false` في أول turn للـ parent ممكن يرجّع `true` لما الـ fork child يبدأ يشتغل. لو الـ system prompt فيه block شرطي معتمد على الـ flag ده، الـ prompt اللي اتعمل له render تاني هيختلف حتى لو بحرف واحد. الـ cache بيتكسر (cache bust). وإعادة معالجة 80,000 tokens بالسعر الكامل، مضروبة في 5 children.

تمرير الـ bytes اللي اتعمل لها render بيقضي على فئة الاختلاف دي كلها.

**الطبقة 2: الـ tool definitions عن طريق exact passthrough.**

الـ sub-agents العادية بتعدّي على `resolveAgentTools()`، اللي بتفلتر الـ tool pool حسب الـ arrays `tools` و `disallowedTools` في الـ agent definition، وبتطبّق اختلافات الـ permission mode، وممكن تعيد ترتيب الـ tools. الـ tool array الناتج بعد الـ serialization هيختلف عن الخاص بالـ parent: subset مختلف، وترتيب مختلف، و permission annotations مختلفة.

الـ fork agents بتتخطى ده كله:

```typescript
const resolvedTools = useExactTools
  ? availableTools  // parent's exact array
  : resolveAgentTools(agentDefinition, availableTools, isAsync).resolvedTools
```

الـ flag `useExactTools` بيتضبط على true في مسار الـ fork بس. الـ child بياخد الـ tool pool الخاص بالـ parent زي ما هو. نفس الـ tools، ونفس الترتيب، ونفس الـ serialization. وده بيشمل إن الـ tool `Agent` نفسها تفضل في الـ pool الخاص بالـ child، مع إن الـ child ممنوع يستخدمها: شيلها هيغيّر الـ tool array ويكسر الـ cache.

**الطبقة 3: بناء الـ message array.**

وهنا بتيجي الشغلانة الدقيقة اللي بتعملها `buildForkedMessages()`. الـ function بتبني آخر رسالتين، اللي بيقعدوا بين السجل المشترك والتوجيه الخاص بكل child:

الـ function `buildForkedMessages()` بتبني آخر رسالتين اللي بيقعدوا بين السجل المشترك والتوجيه الخاص بكل child. الخوارزمية:

1. انسخ الـ assistant message الخاصة بالـ parent (مع الحفاظ على كل الـ `tool_use` blocks بالـ IDs الأصلية).
2. لكل `tool_use` block، أنشئ `tool_result` بـ placeholder string ثابت (متطابق بين كل الـ children).
3. ابني user message واحدة فيها كل الـ placeholder results ومتبوعة بالتوجيه الخاص بكل child ملفوف في الـ boilerplate tag.
4. رجّع `[clonedAssistantMessage, userMessageWithPlaceholdersAndDirective]`.

```typescript
// Pseudocode — illustrates the message construction
function buildChildMessages(directive, parentAssistant) {
  const cloned = cloneMessage(parentAssistant)
  const placeholders = parentAssistant.toolUseBlocks.map(b =>
    toolResult(b.id, CONSTANT_PLACEHOLDER)  // Byte-identical across children
  )
  const userMsg = createUserMessage([...placeholders, wrapDirective(directive)])
  return [cloned, userMsg]
}
```

الـ message array الناتج لكل child بيبقى شكله كده:

```
[...shared_history, assistant(all_tool_uses), user(placeholder_results..., directive)]
```

كل عنصر قبل التوجيه متطابق بين الـ children. الثابت `FORK_PLACEHOLDER_RESULT`، وهو string ثابت `'Fork started -- processing in background'`، بيضمن إن حتى الـ tool result blocks تبقى متطابقة byte بـ byte. وقيم `tool_use_id` متطابقة لأنها بتشير لنفس الـ assistant message. الحاجة الوحيدة اللي بتتغير هي الـ text block الأخير اللي فيه التوجيه الخاص بكل child.

حد الـ cache بيقع قبل الـ text block الأخير ده بالضبط. وكل حاجة فوقه، وممكن تكون عشرات الآلاف من الـ tokens من system prompt و tool definitions وسجل محادثة و placeholder results، بتعمل cache hit بخصم 90% لكل child بعد الأول.

---

## الـ Fork Boilerplate Tag

التوجيه الخاص بكل child بيتلف في boilerplate XML tag بيخدم غرضين: بيوجّه الـ child إزاي يتصرف، وبيشتغل كعلامة لاكتشاف الـ fork الـ recursive.

الـ boilerplate فيه حوالي 10 قواعد. أهمها:

- **إلغاء تعليمة الـ forking الخاصة بالـ parent.** الـ system prompt الخاص بالـ parent بيقول "default to forking" (الافتراضي إنك تعمل fork)، والـ boilerplate بيقول للـ child صراحة: "that instruction is for the parent. You ARE the fork. Do NOT spawn sub-agents." (التعليمة دي للـ parent. إنت نفسك الـ fork. ماتعملش spawn لـ sub-agents.)
- **نفّذ في صمت، وبلّغ مرة واحدة.** من غير كلام بين الـ tool calls. استخدم الـ tools مباشرة، وبعدين اطلع بملخص منظّم.
- **خليك في حدود الـ scope.** الـ child ماينفعش يتوسّع خارج توجيهه.
- **صيغة output منظّمة.** الرد لازم يمشي على قالب Scope/Result/Key files/Files changed/Issues، وده بيسهّل على الـ parent يعمل parse للنتائج لما كذا child يبلّغوا في نفس الوقت.

القاعدة 1 مثيرة للاهتمام بشكل خاص. الـ system prompt الخاص بالـ parent، واللي الـ fork child بيورثه بالحرف لأسباب تخص الـ cache، فيه تعليمات زي "default to forking when you have parallel work" (لما يكون عندك شغل متوازي، الافتراضي إنك تعمل fork). لو الـ child مشى على التعليمة دي، هيحاول يعمل fork لـ children خاصة بيه، وده هيعمل recursion لا نهائي من الـ agents. الـ boilerplate بيلغيها صراحة: "that instruction is for the parent. You ARE the fork." (التعليمة دي للـ parent. إنت نفسك الـ fork.)

وصيغة الـ output المنظّمة (Scope/Result/Key files/Files changed/Issues) مش للزينة. هي بتحصر output الـ child في تقرير بالحقائق، وده بيسهّل على الـ parent يعمل parse للنتائج ويجمّعها لما 5 children يبلّغوا في نفس الوقت.

---

## منع الـ Recursive Fork

الـ fork child بيحتفظ بالـ tool `Agent` في الـ tool pool الخاص بيه. ولازم يحتفظ بيها: شيلها هيغيّر الـ tool array بعد الـ serialization ويكسر الـ prompt cache. لكن لو الـ child استدعى الـ tool `Agent` فعلًا من غير `subagent_type`، مسار الـ fork هيتفعّل تاني وهيعمل grandchild fork. والـ grandchild ده هيورث context أكبر (محادثة الـ parent + الـ child)، وهيعمل forks خاصة بيه، وهكذا.

فيه 2 guards بيمنعوا ده:

**الـ guard الأساسي: فحص الـ querySource.** لما fork child يتعمل له spawn، قيمة `context.options.querySource` الخاصة بيه بتتضبط على `'agent:builtin:fork'`. والـ method `call()` بتفحص ده قبل ما تسمح بمسار الـ fork:

```typescript
// In AgentTool.call():
if (effectiveType === undefined) {
  // Fork path -- but are we already in a fork?
  if (querySource === 'agent:builtin:fork') {
    // Reject: already a fork child
  }
}
```

ده الـ fast path. بيفحص string واحد في الـ options object.

**الـ guard الاحتياطي: فحص الرسائل.** منع الـ fork بيعتمد على 2 guards: الـ tag `querySource` اللي بيتضبط وقت الـ spawn (الـ fast path: مقارنة string واحد)، و fallback بيفحص سجل الرسائل بحثًا عن الـ boilerplate XML tag. الـ fallback موجود لأن قيمة `querySource` بتصمد بعد الـ autocompact، لكن في حالات نادرة ماكانتش بتتمرر صح، وهنا الـ fallback اللي بيفحص الرسائل بيلقط الـ recursion. دي حماية مزدوجة: تكلفة الفحص (مسح الرسائل) تافهة مقارنة بتكلفة الـ recursive forking لو حصل بالغلط (إنفاق على الـ API من غير سقف).

ليه الـ fallback؟ لأن Claude Code فيه ميزة autocompact بتعيد كتابة الـ message array لما الـ context يطوّل زيادة. الـ autocompact ممكن يعيد كتابة محتوى الرسائل لكنه بيحافظ على قيمة `querySource` في الـ options. نظريًا، قيمة `querySource` لوحدها كفاية. عمليًا، الـ fallback اللي بيفحص الرسائل بيلقط الحالات النادرة اللي `querySource` ماتمررتش فيها صح. حماية مزدوجة: تكلفة الفحص (مسح الرسائل) تافهة مقارنة بتكلفة الـ recursive forking لو حصل بالغلط (إنفاق على الـ API من غير سقف).

---

## الـ Sync-to-Async Transition

الـ fork child بيبدأ شغله في المقدمة: رسائله بتتعمل لها stream لـ terminal الـ parent، والـ parent بيقف مستني لحد ما يخلص. لكن إيه اللي يحصل لو الـ child أخد وقت طويل؟ Claude Code بيسمح بالنقل للخلفية في نص التنفيذ: المستخدم (أو auto-timeout) يقدر يدفع agent شغال في المقدمة للخلفية من غير ما يضيع أي شغل.

والآلية نظيفة بشكل مفاجئ:

1. لما agent في المقدمة يتسجّل عن طريق `registerAgentForeground()`، بيتعمل background signal promise.

2. الـ sync loop الخاص بالـ parent بيعمل race بين الـ message stream الخاص بالـ agent والـ background signal:

```
while (true) {
  const result = await Promise.race([
    iterator.next(),         // next message from agent
    backgroundSignal,        // "move to background" trigger
  ])
  if (result === BACKGROUND_SIGNAL) break
  // ... process message
}
```

3. لما الـ background signal يتفعّل، الـ foreground iterator بيتقفل بشكل منظّم عن طريق `iterator.return()`. وده بيشغّل الـ block `finally` الخاص بالـ generator، اللي بيتولى التنظيف.

4. بيتعمل spawn لـ instance جديد من `runAgent()` بـ `isAsync: true`، بنفس الـ agent ID وسجل الرسائل اللي اتجمع لحد اللحظة دي. الـ agent بيكمّل من المكان اللي وقف فيه، لكن في الخلفية المرة دي.

5. استدعاء `call()` الأصلي الـ sync بيرجّع `{ status: 'async_launched' }`، والـ parent بيكمّل محادثته.

مفيش شغل بيضيع، لأن سجل الرسائل هو نفسه الـ state الخاص بالـ agent. الـ sidechain transcript على الـ disk فيه كل رسالة الـ agent أنتجها. والـ async instance الجديد بيعيد تشغيل السجل ده وبيكمّل من المكان اللي الـ sync instance وقف فيه.

---

## الـ Auto-Backgrounding

لما الـ environment variable `CLAUDE_AUTO_BACKGROUND_TASKS` أو الـ GrowthBook flag `tengu_auto_background_agents` يكون مفعّل، الـ agents اللي في المقدمة بتتنقل للخلفية تلقائيًا بعد 120 ثانية:

لما الميزة تكون مفعّلة عن طريق environment variable أو feature flag، الـ agents اللي في المقدمة بتتنقل للخلفية تلقائيًا بعد 120 ثانية. ولما تكون متعطّلة، الـ function بترجّع 0 (يعني مفيش auto-backgrounding).

ده قرار UX ليه تبعات على التكلفة. الـ agent اللي في المقدمة بيوقّف terminal الـ parent: المستخدم مش بيقدر يكتب، ولا يدّي تعليمات جديدة، ولا يعمل spawn لـ agents تانية. دقيقتين مدة كافية إن الـ agent يخلّص أغلب الـ tasks السريعة بشكل synchronous (في المقدمة، وهنا الـ streaming output بيكون feedback مفيد)، لكنها قصيرة بما يكفي إن الـ tasks الطويلة ماتحتجزش الـ terminal.

وتحت تجربة الـ fork، سؤال الـ auto-backgrounding مش مطروح أصلًا: كل الـ fork spawns بتتجبر تبقى async من البداية. والـ parameter `run_in_background` مخفي من الـ schema تمامًا. كل fork child بيشتغل في الخلفية، وبيبلّغ عن طريق `<task-notification>` لما يخلص، والـ parent عمره ما بيقف مستني.

---

## إمتى الـ Fork مش بيتستخدم

الـ fork واحد من كذا orchestration mode، وبيتستبعد عن قصد في 3 حالات:

**الـ coordinator mode.** الـ coordinator mode والـ fork mode بينهم mutual exclusion (الاتنين ماينفعش يشتغلوا مع بعض). الـ coordinator عنده نموذج تفويض منظّم: بيحتفظ بخطة، وبيوزّع tasks على الـ workers بـ prompts صريحة، وبيتابع التقدم. أسلوب الـ fork "inherit everything" (ورّث كل حاجة) هيقوّض ده. الـ coordinator المعمول له fork هيورث الـ system prompt الخاص بالـ parent coordinator (اللي بيقول "you are the coordinator, delegate work"، يعني إنت الـ coordinator، فوّض الشغل)، والـ child هيحاول ينسّق بدل ما ينفّذ. الـ function `isForkSubagentEnabled()` بتفحص `isCoordinatorMode()` الأول وبترجّع false لو كان مفعّل.

**الـ sessions غير التفاعلية.** مستهلكي الـ SDK والـ API (الـ mode `--print`، و Claude Agent SDK) بيشتغلوا من غير terminal. وإعداد `permissionMode: 'bubble'` الخاص بالـ fork بيطلّع الـ permission prompts في terminal الـ parent، وده مش موجود في الـ mode غير التفاعلي. وبدل بناء مسار صلاحيات منفصل، مسار الـ fork بيتعطّل ببساطة. مستهلكي الـ SDK بيستخدموا اختيار `subagent_type` صريح بدل منه.

**تحديد subagent_type صريح.** لما الـ model يحدد `subagent_type` (زي `"Explore"` أو `"Plan"` أو `"general-purpose"`)، مسار الـ fork مش بيتفعّل. الـ fork بيشتغل بس لما `subagent_type` يتحذف. وده بيخلّي الـ model يختار بين "I want a specialized agent with its own system prompt and tool set" (أنا محتاج agent متخصص بـ system prompt و tool set خاصين بيه) بالـ type الصريح، و "I want a context-inheriting clone of myself to handle this in parallel" (أنا محتاج نسخة مني بتورث الـ context عشان تتولى ده بالتوازي) بحذف الـ type.

---

## الحسابات الاقتصادية

خد سيناريو ملموس. مطوّر بيطلب من Claude Code يعمل refactor لـ module. الـ parent agent بيحلل الـ codebase، وبيكوّن خطة، وبيطلق 5 fork children بالتوازي: واحد يحدّث الـ database schema، وواحد يعيد كتابة الـ service layer، وواحد يحدّث الـ router، وواحد يصلّح الـ tests، وواحد يحدّث الـ types.

عند النقطة دي من المحادثة، الـ context المشترك كبير:
- الـ system prompt: ~4,000 tokens
- الـ tool definitions (40+ tools): ~12,000 tokens
- سجل المحادثة (التحليل + التخطيط): ~30,000 tokens
- الـ assistant message اللي فيها 5 tool_use blocks: ~2,000 tokens
- الـ placeholder tool results: ~500 tokens

إجمالي الـ shared prefix: ~48,500 tokens. التوجيه الخاص بكل child: ~200 tokens.

من غير fork (5 agents مستقلة، كل واحد بـ context جديد و system prompt خاص بيه):
- كل child بيعالج الـ system prompt الخاص بيه + الـ tools + الـ task prompt
- مفيش مشاركة في الـ cache (system prompts مختلفة، و tool sets مختلفة)
- التكلفة: 5 x معالجة كاملة للـ input

مع الـ fork (prefixes متطابقة byte بـ byte):
- الـ child 1: 48,700 tokens بالسعر الكامل (cache miss في أول request)
- الـ children من 2 لـ 5: 48,500 tokens بـ 10% من السعر (cache hit) + 200 tokens بالسعر الكامل لكل واحد
- التكلفة الفعلية لكل child من 2 لـ 5: ~4,850 + 200 = ما يعادل ~5,050 tokens

والتوفير بيكبر مع حجم الـ context وعدد الـ children. في session سخنة فيها 100K tokens من السجل وبتعمل spawn لـ 8 forks بالتوازي، توفير الـ cache ممكن يعدّي 90% من تكلفة الـ input tokens لو ماكانش فيه مشاركة.

وده السبب إن كل قرار تصميم في نظام الـ fork بيحسّن حاجة واحدة: prefixes متطابقة byte بـ byte. التمرير بدل إعادة الحساب، والـ exact tool passthrough، والـ placeholder results، وحتى الاحتفاظ بالـ tool `Agent` في الـ pool الخاص بالـ child رغم إنها ممنوعة، كلها بتخدم نفس الهدف. كل قرار بيضحّي بشوية أناقة أو أمان مقابل تقليل ملموس في تكلفة الـ API.

---

## التوترات في التصميم

نظام الـ fork بيعمل trade-offs (مفاضلات: بتكسب حاجة وبتدفع ثمنها في حاجة تانية) صريحة تستاهل إنك تفهمها:

**العزل مقابل كفاءة الـ cache.** الـ fork children بتورث كل حاجة، بما فيها سجل محادثة ممكن مايكونش ليه علاقة بالـ task الخاصة بيها. الـ child اللي بيعيد كتابة الـ tests مش محتاج الـ 15 رسالة اللي الـ parent ناقش فيها تصميم الـ database schema. لكن تضمين الرسائل دي هو اللي بيخلّي الـ prefix متطابق. شيل السجل اللي ملوش علاقة هيوفّر مساحة في الـ context window على حساب كسر الـ cache. ورهان التصميم هنا إن توفير الـ cache أكبر من الـ overhead الخاص بالـ context.

**الأمان مقابل كفاءة الـ cache.** الـ tool `Agent` بتفضل في الـ tool pool الخاص بالـ fork child مع إن الـ child ممنوع يستخدمها. شيلها هيكون أأمن (الـ child مش هيقدر حتى يحاول يعمل fork)، لكنه هيغيّر serialization الـ tool array. الـ boilerplate tag و guards منع الـ recursive fork هما الضوابط التعويضية: منع وقت التشغيل بدل الحذف الثابت.

**البساطة مقابل كفاءة الـ cache.** الـ placeholder tool results كذبة. الـ child بيشوف `'Fork started -- processing in background'` لكل tool_use block في الـ assistant message الخاصة بالـ parent، بغض النظر عن اللي الـ tool calls دي عملته فعلًا. وده مقبول لأن توجيه الـ child بيقوله يعمل إيه: هو مش محتاج tool results دقيقة من الـ turn اللي الـ parent وزّع فيه الشغل. لكن معناه إن سجل محادثة الـ child، من الناحية الفنية، مش متماسك. الـ placeholder اتختار للاختصار والتوحيد، مش للدقة.

كل trade-off من دول بيعكس نفس الأولوية: لما تكون بتدفع على كل token في API calls على نطاق واسع، الـ prefixes المتطابقة byte بـ byte تستاهل إنك تعيد تشكيل الـ architecture كلها عشانها.

---

## طبّق ده: التصميم لكفاءة الـ Prompt Cache

الـ fork agent pattern بيتعمم لأبعد من Claude Code. أي نظام بيطلق كذا LLM call بالتوازي من نفس الـ context ممكن يستفيد من بناء requests واعية بالـ cache. المبادئ:

**1. مرّر الـ prompts المعمول لها render، ماتعيدش حسابها.** لو الـ system prompt عندك فيه أي محتوى dynamic، زي feature flags أو timestamps أو تفضيلات المستخدم أو A/B test variants، احفظ النتيجة بعد الـ render ومرّرها للـ children بالقيمة. إعادة الحساب بتعرّضك لخطر الاختلاف.

**2. جمّد الـ tool array.** لو الـ children عندك محتاجة tool sets مختلفة، إنت بتتنازل عن مشاركة الـ cache في الـ tools block. فكّر تحتفظ بالـ tool set الكامل وتستخدم guards وقت التشغيل (زي "do not use Agent" يعني ماتستخدمش Agent، في الـ fork boilerplate) بدل الحذف وقت الـ compile.

**3. كبّر الـ shared prefix للأقصى، وصغّر الـ suffix الخاص بكل child للأدنى.** رتّب الـ message array بحيث كل حاجة مشتركة تيجي الأول، والمحتوى الخاص بكل child يتضاف في الآخر. خلط المحتوى المشترك بالمحتوى الخاص بكل child بيفتّت حد الـ cache.

**4. استخدم placeholders ثابتة للمحتوى المتغير.** لما بنية الرسائل تستلزم ردود على tool calls سابقة، استخدم placeholder strings متطابقة بين كل الـ children بدل النتائج الحقيقية (المختلفة).

**5. احسب نقطة التعادل.** مشاركة الـ cache ليها overhead: context windows أكبر لكل child (لأنها شايلة سجل ملوش علاقة)، و guards وقت التشغيل بدل الأمان الثابت، وتعقيد في الـ architecture. احسب هل الـ parallelism pattern عندك (كام child، وحجم الـ shared prefix قد إيه) بيوفّر فلوس فعلًا بعد حساب الـ context tokens الزيادة.

نظام الـ fork agents، في جوهره، محرّك لاستغلال الـ prompt cache. وهو بيجاوب على سؤال كل اللي بيبني نظام multi-agent بيقابله في النهاية: لما الـ cache بيدّيك خصم 90% على الـ prefixes المتكررة، هتعيد تشكيل الـ architecture عندك لأي مدى عشان تاخد الخصم ده؟ إجابة Claude Code: لمدى بعيد جدًا.
