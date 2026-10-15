# الفصل 18: الخاتمة -- اتعلمنا إيه

## الـ 5 رهانات في الـ Architecture

برنامج Claude Code مش النظام الـ agentic الوحيد. وهو مش الأول كمان. لكنه عمل 5 رهانات في الـ architecture بتميّزه عن باقي ساحة الـ agent frameworks. وبعد حوالي 2,000 ملف و 17 فصل، الرهانات دي تستاهل نقف قدامها.

### الرهان 1: الـ Generator Loop بدل الـ Callbacks

أغلب الـ agent frameworks بتديك pipeline: بتعرّف الـ tools، وبتسجّل handlers، وبتسيب الـ framework يعمل orchestration. المطوّر بيكتب callbacks. والـ framework هو اللي بيقرر إمتى يستدعيها.

برنامج Claude Code بيعمل العكس. الـ function `query()` عبارة عن async generator، والمطوّر هو اللي ماسك الـ loop. الـ model بيعمل stream للـ response، والـ generator بيعمل yield للـ tool calls، والطرف اللي استدعاه بينفذها ويضيف النتائج، والـ generator بيلف تاني. فيه function واحدة، و data flow واحد، ومكان واحد كل تفاعل بيعدّي منه. الـ 10 terminal states والـ 7 continuation states في الـ return type الخاص بالـ generator بتمثّل كل نتيجة ممكنة. الـ loop هو النظام.

الرهان كان إن generator function واحدة، حتى لو كبرت لـ 1,700 سطر، هتكون أسهل في الفهم من callback graph موزّع. وبعد دراسة الـ source، الرهان كسب. لما تحب تفهم ليه الـ session انتهت، بتبص على function واحدة. ولما تحب تضيف terminal state جديد، بتضيف variant واحد لـ discriminated union واحد. والـ type system بيفرض إنك تتعامل مع كل الحالات من غير ما تنسى واحدة. أما الـ callback architecture فكانت هتوزّع المنطق ده على عشرات الملفات، والتفاعلات بين الـ callbacks كانت هتبقى ضمنية بدل ما تكون ظاهرة في الـ control flow.

### الرهان 2: الـ File-Based Memory بدل الـ Databases

الفصل 11 شرح الحجة بالتفصيل، لكن الأهمية على مستوى الـ architecture بتتعدى الـ memory. قرار استخدام ملفات Markdown عادية بدل SQLite أو vector database أو cloud service كان رهان على الشفافية بدل القدرات. الـ database كانت هتدعم queries أغنى، و lookups أسرع، وضمانات transactional. الملفات مش بتدّي أي حاجة من دي. اللي الملفات بتدّيه هو الثقة.

المستخدم اللي بيفتح `~/.claude/projects/myapp/memory/MEMORY.md` في vim ويشوف بالضبط الـ agent فاكر عنه إيه، علاقته بالنظام مختلفة جذريًا عن مستخدم لازم يسأل الـ agent "what do you remember?" (إنت فاكر إيه؟) ويتمنى إن الإجابة كاملة. التصميم المبني على الملفات بيخلّي حالة معرفة الـ agent قابلة للملاحظة من الخارج، مش مجرد اللي الـ agent بيقوله عن نفسه. وده أهم من أداء الـ queries. ونظام الـ recall (استرجاع الـ memories المناسبة للمحادثة) اللي بيشتغل بـ LLM بيعوّض بساطة التخزين بذكاء الاسترجاع: side-query (API call جانبي لـ model أصغر) لـ Sonnet بيختار 5 memories مناسبة من manifest، وده أدق من الـ embedding similarity ومش محتاج أي infrastructure.

### الرهان 3: الـ Self-Describing Tools بدل الـ Central Orchestrators

الـ agent frameworks عادةً بتوفر tool registry: بتوصف الـ tools الخاصة بيك في إعدادات مركزية، والـ framework بيعرضها على الـ model. أما الـ tools في Claude Code فبتوصف نفسها بنفسها. كل object من نوع `Tool` شايل اسمه، ووصفه، والـ input schema الخاص بيه، ومساهمته في الـ prompt، والـ flag الخاص بأمان الـ concurrency، ومنطق التنفيذ. وظيفة الـ tool system مش إنه يوصف الـ tools للـ model. وظيفته إنه يسيب الـ tools توصف نفسها.

الرهان ده بيكسب في قابلية التوسعة. الـ MCP tools (الفصل 15) بتبقى جزء أصيل من النظام لمجرد إنها بتعمل implement لنفس الـ interface. الـ tool الجاية من MCP server والـ built-in tool، الـ model مش بيفرّق بينهم. النظام مش محتاج طبقة منفصلة اسمها "MCP tool adapter": الـ wrapping بينتج object عادي من نوع `Tool`، ومن اللحظة دي الـ tool pipeline الموجود بيتولاها: فحص الصلاحيات، والتنفيذ الـ concurrent، والـ result budgeting، واعتراض الـ hooks.

### الرهان 4: الـ Fork Agents عشان مشاركة الـ Cache

الفصل 9 غطّى آلية الـ fork: sub-agent بيبدأ والمحادثة الكاملة للـ parent في الـ context window الخاص بيه، وبيشارك الـ parent في الـ prompt cache. ده مش تحسين بسيط للتسهيل. ده رهان في الـ architecture إن طريقة مشاركة الـ cache تستاهل تعقيد إدارة دورة حياة الـ fork.

البديل، إنك تعمل spawn لـ agent جديد ومعاه ملخص للمحادثة، أبسط لكنه مكلّف. كل agent جديد بيدفع التكلفة الكاملة لمعالجة الـ context الخاص بيه من الصفر. أما الـ forked agent فبياخد الـ cached prefix الخاص بالـ parent ببلاش (خصم 90% على الـ input tokens)، وده بيخلّي عمل spawn لـ agents للـ tasks الصغيرة حاجة اقتصادية: استخراج الـ memory، ومراجعة الكود، وجولات التحقق. الـ background memory extraction agent (الفصل 11) بيشتغل بعد كل turn في الـ query loop، وتكلفته هامشية بالضبط لأنه بيشارك الـ parent في الـ cache. من غير مشاركة الـ cache عن طريق الـ fork، الـ agent ده كان هيبقى غالي لدرجة مايستاهلش.

### الرهان 5: الـ Hooks بدل الـ Plugins

أغلب أنظمة قابلية التوسعة بتستخدم plugins: كود بيسجّل قدرات وبيشتغل داخل الـ host process. أما Claude Code فبيستخدم hooks: processes خارجية بتشتغل عند نقاط في الـ lifecycle وبتتواصل عن طريق الـ exit codes و JSON على stdin/stdout.

الرهان هو إن عزل الـ processes يستاهل الـ overhead. الـ plugin ممكن يعمل crash للـ host. أما الـ hook لما يعمل crash، اللي بيقع هو الـ process الخاصة بيه بس. الـ plugin ممكن يسرّب ذاكرة في الـ heap الخاص بالـ host. ذاكرة الـ hook بتموت مع الـ process الخاصة بيه. الـ plugin محتاج API surface لازم يتعمل لها versioning وصيانة. الـ hook محتاج stdin و stdout و exit code، وده بروتوكول ثابت من سنة 1971.

الـ overhead حقيقي: عمل spawn لـ process مع كل استدعاء للـ hook بيكلّف شوية ملي ثانية، الـ callback اللي بيشتغل in-process ماكانش هيدفعها. والـ fast path اللي بيوفّر 70% من الـ overhead للـ callbacks الداخلية (الفصل 12) بيوضّح إن النظام عارف إن التكلفة دي مهمة. لكن للـ hooks الخارجية، زي scripts المستخدم و linters الفريق و policy servers على مستوى الشركات، ضمان العزل بيخلّي توسعة النظام أكثر أمانًا. الشركة تقدر تفرض سياساتها عن طريق الـ hooks من غير ما تقلق إن hook script مكتوب غلط يعمل crash لـ sessions المطوّرين عندها.

---

## إيه اللي ينفع يتنقل لأنظمة تانية، وإيه اللي لأ

مش كل pattern في Claude Code ينفع يتعمّم. بعضها نتيجة للحجم، أو الموارد، أو قيود معينة، وممكن اللي بيبنوا agents تانية مايكونش عندهم نفسها.

### الـ Patterns اللي بتنفع لأي Agent

**الـ generator loop pattern.** أي agent محتاج يعمل stream للـ responses، ويتعامل مع tool calls، ويدير أكثر من terminal state، هيستفيد إنه يخلّي الـ loop صريح بدل ما يخبّيه ورا callbacks. والـ return type من نوع discriminated union، اللي بيسجّل بالضبط الـ loop وقف ليه، pattern بيلغي فئة كاملة من جلسات الـ debugging من نوع "why did the agent stop?" (الـ agent وقف ليه؟).

**الـ file-based memory مع الـ LLM recall.** تفاصيل الـ implementation تخص Claude Code وحده، لكن المبدأ، تخزين بسيط مع استرجاع ذكي، بينطبق على أي agent محتاج يحفظ معرفة بين الـ sessions. والـ four-type taxonomy (تصنيف من 4 أنواع: user و feedback و project و reference) واختبار قابلية الاشتقاق ("can this be re-derived from the current project state?" يعني: ينفع الحاجة دي تتستنتج تاني من الحالة الحالية للمشروع؟) هما design heuristics تقدر تعيد استخدامهم.

**الـ asymmetric read/write channels للتنفيذ عن بُعد.** لما القراءات streams عالية التكرار والكتابات RPCs قليلة التكرار، فصلهم عن بعض هو الصح، بغض النظر عن الـ transport protocol المستخدم.

**الـ bitmap pre-filters للبحث.** أي agent بيبحث في file index كبير هيستفيد من letter bitmap بـ 26-bit كـ pre-filter. 4 bytes لكل entry، ومقارنة integer واحدة لكل candidate: نسبة التكلفة للفايدة مذهلة.

**ثبات الـ prompt cache كمسألة architecture.** لو الـ agent عندك بيستخدم API فيه prompt caching، ترتيب الـ prompt بحيث المحتوى الثابت في الأول والمحتوى المتغير في الآخر مش optimization. ده قرار في الـ architecture بيحدد هيكل التكلفة عندك.

### الـ Patterns الخاصة بحجم Claude Code

**الـ terminal renderer اللي معموله fork.** برنامج Claude Code عمل fork لـ Ink وأعاد بناء الـ rendering pipeline بـ packed typed arrays، و pool-based interning (تخزين كل string مرة واحدة وإعادة استخدامها بالـ index)، و cell-level diffing، لأنه كان محتاج streaming بسرعة 60fps في الـ terminal. أغلب الـ agents بتعمل render لـ web interface أو لـ log output بسيط. الاستثمار الهندسي ده ملوش معنى غير لما يكون الـ terminal rendering هو الـ UI الأساسي عندك وإنت بتعمل stream بتكرار عالي.

**الـ 50+ startup profiling checkpoints.** ليها معنى لما يكون عندك مئات الآلاف من المستخدمين و sampling بنسبة 0.5% بيدّي بيانات ذات دلالة إحصائية. أما لـ agent أصغر، فنظام توقيت أبسط بيكفي.

**الـ 8 MCP transport types.** بيدعم Claude Code الـ stdio و SSE و HTTP و WebSocket و SDK ونسختين للـ IDE و proxy لـ Claude.ai كـ transports (طرق نقل الرسائل بين الـ client والـ server)، لأنه لازم يتكامل مع كل deployment topology. أغلب الـ agents محتاجة stdio و HTTP بس.

**الـ hooks snapshot security model.** تجميد إعدادات الـ hooks عند بدء التشغيل وعدم إعادة قراءتها ضمنيًا أبدًا هو دفاع ضد تهديد محدد: كود خبيث في الـ repository بيعدّل الـ hooks بعد ما المستخدم يوافق على الـ trust dialog. وده مهم لما الـ agent عندك بيشتغل في أي repositories فيها إعدادات `.claude/` غير موثوقة. أما الـ agent اللي بيشتغل بس في بيئات موثوقة، فيقدر يستخدم إدارة أبسط للـ hooks.

---

## ثمن التعقيد

حوالي 2,000 ملف. إيه اللي بنكسبه من ده، وإيه اللي بندفعه؟

عدد الملفات مقياس مضلّل للتعقيد. جزء كبير منه test infrastructure، و type definitions، و configuration schemas، والـ Ink renderer اللي معموله fork. أما التعقيد السلوكي الفعلي فمتركّز في عدد صغير من الملفات عالية الكثافة: `query.ts` (1,700 سطر، الـ agent loop)، و `hooks.ts` (4,900 سطر، نظام اعتراض الـ lifecycle)، و `REPL.tsx` (5,000 سطر، الـ orchestrator التفاعلي)، والـ functions اللي بتبني الـ prompt في نظام الـ memory.

التعقيد جاي من 3 مصادر، وكل واحد ليه طابع مختلف:

**تنوّع الـ protocols.** دعم 5 terminal keyboard protocols، و 8 MCP transport types، و 4 remote execution topologies، و 7 configuration scopes حاجة معقدة بطبيعتها. كل protocol إضافي بيكبّر الـ codebase بشكل خطي مش أسّي، لكن المجموع كبير. والتعقيد ده accidental بالمعنى اللي قصده Brooks: جاي من البيئة (اختلاف الـ terminals عن بعضها، وتطوّر الـ MCP transports، و topologies النشر عن بُعد)، مش من المشكلة اللي بنحلها.

**تحسين الأداء.** الـ pool-based rendering، والـ bitmap search pre-filters، والـ sticky cache latches (flags لما تتفعّل مرة بتفضل مفعّلة لآخر الـ session)، والـ speculative tool execution، كل واحد فيهم بيضيف تعقيد مقابل مكاسب أداء قابلة للقياس. والتعقيد ده مبرر بالقياس: كل optimization سبقها profiling data حدد الـ bottleneck (عنق الزجاجة). الخطر إن الـ optimizations تتراكم وتتفاعل مع بعض بطرق تخلّي الـ hot paths أصعب في التعديل.

**ضبط السلوك.** تعليمات الـ prompt في نظام الـ memory، وتحذيرات الـ staleness (إن الـ memory بقت قديمة ومش مطابقة للواقع)، وبروتوكول التحقق، وتعليمة الـ anti-pattern "ignore memory" (تجاهل الـ memory)، كل دول مش تعقيد في الكود. دول تعقيد في الـ prompt، وعبء صيانتهم مختلف. لما سلوك الـ model يتغير من إصدار للتاني، تعليمات الـ prompt اللي اتضبطت بعناية عن طريق الـ evals ممكن تحتاج ضبط من جديد. الـ eval infrastructure (اللي بتظهر على طول الـ codebase على شكل أرقام cases و eval scores) هي الدفاع ضد الـ regression، لكنها محتاجة استثمار مستمر.

عبء صيانة النظام ده كبير. المهندس الجديد اللي بيقرأ الـ codebase لازم يفهم مش بس مسارات الكود، لكن كمان نتائج الـ evals اللي كانت السبب في صياغات معينة في الـ prompt، وحوادث الـ production اللي كانت السبب في فحوصات أمان معينة، و profiles الأداء اللي كانت السبب في optimizations معينة. الـ comments في الكود وافية، وكثير منها فيه أرقام eval cases وقياسات قبل وبعد، لكن comments وافية في حوالي 2,000 ملف هي نفسها عبء في القراءة.

---

## الأنظمة الـ agentic رايحة فين

فيه 4 اتجاهات باينة من الـ patterns اللي في Claude Code، وبتشير لفين المجال رايح.

### MCP كالبروتوكول الموحّد

الفصل 15 وصف Claude Code كواحد من أكمل الـ MCP clients. الأهمية مش في الـ implementation الخاصة بـ Claude Code. الأهمية إن MCP (بروتوكول مفتوح بيخلّي أي agent يستدعي tools خارجية) موجود أصلًا. بروتوكول موحّد للـ tool discovery والاستدعاء معناه إن الـ tools اللي اتبنت لـ agent واحد بتشتغل مع أي agent. وآثار ده على الـ ecosystem واضحة: MCP server لـ Postgres، أول ما يتبني، بيخدم كل agent بيتكلم MCP. استثمار المطوّر في تكامل الـ tools بقى قابل للنقل.

والنتيجة لمن بيبنوا agents: لو بتعرّف tool protocol خاص بيك، فغالبًا إنت بتغلط. MCP كويس كفاية، وبيتحسن، ومزايا الـ ecosystem لبروتوكول موحّد بتتراكم مع الوقت. ابني MCP client، وساهم في الـ spec، وسيب البروتوكول يتطوّر من feedback المجتمع.

### الـ Multi-Agent Coordination

نظام الـ sub-agents في Claude Code (الفصل 8)، وتنسيق الـ tasks (الفصل 10)، وآلية الـ fork (الفصل 9) كلها implementations مبكرة لـ multi-agent patterns. بتحل مشاكل محددة، زي مشاركة الـ cache والاستكشاف بالتوازي والتحقق المنظم، لكنها كمان بتكشف التحدي الأساسي: الـ coordination overhead.

كل رسالة بين agents بتستهلك tokens. كل fork بيشارك في الـ cache لكنه بيضيف فرع محادثة لازم الـ parent في الآخر يوفّق بينه وبين محادثته. والـ state machine الخاص بالـ Task system (queued و running و completed و failed و cancelled) هو آلية تنسيق بتضيف تعقيد من غير ما تضيف قدرة. وكل ما الـ agents تبقى أقدر، الضغط هيتحول من "how do we coordinate multiple agents?" (إزاي ننسق بين أكثر من agent؟) لـ "how do we make one agent capable enough that coordination is unnecessary?" (إزاي نخلّي agent واحد قادر كفاية إن التنسيق مايبقاش محتاج أصلًا؟).

الأدلة الحالية بتقول إن الطريقتين هيتعايشوا مع بعض. الـ tasks البسيطة هتستخدم agent واحد. والـ tasks المعقدة هتستخدم أنظمة multi-agent منسّقة. والتحدي الهندسي هو إنك تخلّي الـ coordination overhead قليل لدرجة إن نقطة التحوّل تميل للـ multi-agent في الشغل اللي فعلًا ينفع يتعمل بالتوازي، مش بس في الـ tasks اللي معقدة.

### الـ Memory الدائمة

نظام الـ memory في Claude Code هو الإصدار 1 من الـ persistent agent memory. التصميم المبني على الملفات، والـ four-type taxonomy، والـ recall اللي بيشتغل بـ LLM، ونظام الـ staleness، والـ KAIROS mode للـ sessions الطويلة، كلها حلول من الجيل الأول لمشكلة هتتطوّر بشكل كبير.

أنظمة الـ memory المستقبلية غالبًا هتضيف structured retrieval (النظام الحالي بيسترجع ملفات كاملة، والأنظمة الجاية ممكن تسترجع حقائق معينة)، و transfer learning بين المشاريع (تفضيلات المستخدم اللي بتنطبق في كل مكان، و conventions المشروع اللي مش بتنطبق)، و collaborative memory (الـ team memory في الفصل 11 خطوة أولى، لكن الـ sync وحل التعارضات والـ access control كلهم في حدهم الأدنى).

السؤال المفتوح هو: هل الطريقة المبنية على الملفات هتفضل شغالة لما الحجم يكبر؟ عند 200 memories لكل مشروع، بتشتغل. عند 2,000 memories لكل مشروع، الـ manifest الخاص بالـ side-query لـ Sonnet بيبقى كبير جدًا، والـ consolidation (دمج الملاحظات المتفرقة في memories منظمة) بيبقى غالي جدًا، والـ index بيتعدى حدوده القصوى. الرهان في الـ architecture على الملفات بدل الـ databases هيواجه أصعب اختبار ليه مع زيادة الاستخدام.

### الـ Autonomous Operation

الـ KAIROS mode، والـ background memory extraction agent، والـ auto-dream consolidation، والـ speculative tool execution، كل دول خطوات نحو الـ autonomous operation. الـ agent بيعمل شغل مفيد من غير ما حد يطلب منه: بيفتكر اللي نسيت تقوله يفتكره، وبيعمل consolidation لمعرفته وإنت نايم، وبيبدأ ينفذ الـ tool الجاية قبل ما الـ response الحالي يكمل.

المسار واضح. الـ agents الجاية هتكون أقل انتظارًا للأوامر وأكثر مبادرة. هتلاحظ patterns المستخدم ماوصفهاش، وهتقترح تصحيحات المستخدم ماطلبهاش، وهتحافظ على معرفتها بنفسها من غير أوامر `/remember` صريحة. ونظام الـ memory في Claude Code، بشبكة أمان الـ background extraction الخاصة بيه و heuristics "what to save" (إيه اللي يستاهل الحفظ) المصممة في الـ prompt، هو النموذج الأولي للمستقبل ده.

القيد هو الثقة. الـ autonomous operation محتاج إن المستخدم يثق إن الـ agent هيعمل الصح وهو من غير رقابة. الـ file-based memory، ونظام الـ hooks القابل للملاحظة، وتحذيرات الـ staleness، و dialogs الصلاحيات، كل دول موجودة لأن الثقة لازم تتكسب، مش تتفترض. والطريق لـ agents أكثر استقلالية بيعدّي من agents أكثر شفافية.

---

## الختام

17 فصل. 6 core abstractions. generator loop في المنتصف، و tools بتمتد للخارج، و memory بترجع للوراء عبر الزمن، و hooks بتحرس الحدود، و rendering engine بيترجم كل ده لحروف على الشاشة، و MCP بيوصله بالعالم خارج الـ codebase.

أعمق pattern في Claude Code مش تقنية بعينها. هو القرار المتكرر بدفع التعقيد للحدود. نظام الـ rendering بيدفع التعقيد للـ pools والـ diff: داخل الـ pipeline، كل حاجة مقارنات integers. نظام الـ input بيدفع التعقيد للـ tokenizer والـ keybinding resolver: داخل الـ handlers، كل حاجة typed actions. نظام الـ memory بيدفع التعقيد للـ write protocol والـ recall selector: داخل المحادثة، كل حاجة context. والـ agent loop بيدفع التعقيد للـ terminal states والـ tool system: داخل الـ loop، الحكاية كلها: اعمل stream، اجمع، نفّذ، ضيف، كرّر.

كل حد من الحدود دي بيمتص الفوضى ويطلّع انتظام. الـ bytes الخام بتبقى `ParsedKey`. ملفات Markdown بتبقى memories متسترجعة. الـ MCP JSON-RPC بيبقى objects من نوع `Tool`. الـ exit codes الخاصة بالـ hooks بتبقى قرارات صلاحيات. على جانب من كل حد، العالم مبعثر: 5 keyboard protocols، و OAuth servers هشة، و memories قديمة، و hooks من repositories غير موثوقة. وعلى الجانب التاني، العالم typed، ومحدود، ومتعامل مع كل حالاته.

لو بتبني نظام agentic، فده الدرس اللي ينفع تاخده معاك. مش التقنيات بعينها: ممكن ماتحتاجش pool-based rendering ولا KAIROS mode ولا 8 MCP transports. لكن المبدأ: حدد حدودك، وامتص التعقيد عندها، وخلّي كل اللي بينها نظيف. الحدود هي المكان اللي الهندسة فيه صعبة. والداخل هو المكان اللي الهندسة فيه ممتعة. صمّم عشان يكون الداخل ممتع، واستثمر ميزانية التعقيد الخاصة بيك عند الأطراف.

الـ source code مفتوح. والسلطعون ماسك الخريطة في مخلبه. روح اقرأه.
