# Arabic Translation Style Guide — "Claude Code from Source" (v2)

Shared rules for every translator and reviewer agent. When a rule here conflicts with your instinct, the rule wins: consistency across pages matters more than any single nice sentence.

v2 supersedes v1. It folds in every cross-page ruling from the round-1 review (README + ch01-ch04) and extends the glossary for ch05-ch18. The round-1 pages are the reference implementation of this guide: when in doubt, open `book/ch01-architecture.md` or `book/ch04-api-layer.md` and copy what they do.

**Audience:** Arabic-speaking developers with ~2 years of experience (undergrads included). They code in English, read docs in English, but want the *explanation* in Arabic.
**Goal:** accurate, natural, easy to read. Technical terms stay in English (Latin script) so the reader can search them and map them to real code and docs.
**Reference register:** Eqraatech "Software-Engineering-In-Arabic" (5 sample pages were studied: README, Cursor, Concurrency vs Parallelism, Layered Architecture, Prompting Techniques). We match its *voice* — a senior engineer explaining at a whiteboard — but normalise its inconsistencies. Section 1.6 lists exactly what we take from the samples and what we reject.

---

## 1. Register

### 1.1 What the voice is

Simplified written Arabic with a **light Egyptian flavour in the grammar glue only**. Content words (nouns, most verbs, adjectives) are plain Modern Standard Arabic that any Arab reader knows. The colloquial layer is limited to a closed list of connectives and verb prefixes. Think "a senior engineer explaining to a junior colleague at a whiteboard", not a news anchor and not a chat message.

### 1.2 Allowed colloquial layer (closed list — use these exact spellings)

| Use | Spelling | Instead of |
|---|---|---|
| relative pronoun | اللي | الذي / التي / الذين |
| present-tense prefix | بـ : بيقدر، بيشتغل، بتنفذ، بنستخدم | يستطيع (bare MSA present as main verb) |
| future prefix | هـ : هنشوف، هيتنفذ | سوف / سـ |
| negation (present, future, nominal) | مش : مش بيستنى، مش هيتحمل، مش مجرد | ليس / لا / لن |
| negation (past, short common verbs) | ما…ش : ماكانش، ماحصلش، ماظهرش | لم |
| negation (negative imperative) | ما…ش : ماتحطش، ماتوزّعش، ماتفرّقش | لا تـ |
| negation (existential) | مفيش / مفيهوش / مفيهاش — **no alef after م** | لا يوجد |
| "it doesn't work / not allowed" | ماينفعش | لا يجوز |
| demonstratives (after the noun) | ده / دي / دول : الـ pattern ده، الفكرة دي | هذا / هذه (before the noun) |
| so / because / in order to | عشان، عشان كده | لكي / من أجل ذلك |
| like / such as | زي | مثل (مثل is also fine) |
| when / if | لما، لو | عندما / إذا |
| while / by the time | أثناء ما، لما | «على ما» (regional — not allowed) |
| question words | إيه، ليه، إزاي، فين، إمتى | ماذا / لماذا / كيف |
| also / only | كمان، بس (= only) | أيضًا / فقط (both also fine) |
| must / can | لازم، ممكن | يجب / يمكن |
| "let's" | تعالى + verb : تعالى نتتبع | دعنا / هيا بنا |
| thing | حاجة (sparingly) | شيء (also fine) |
| other / the two / a bit | تاني / تانية، الاتنين، شوية | (accepted as grammar glue) |

Present-tense verb negation is always «مش + verb» («مش بيستنى»). The «ما…ش» forms are limited to the three rows above.

### 1.3 Fixed spellings (content words are MSA)

| Write | Never |
|---|---|
| لكن | بس (as "but") |
| جدًا | أوي |
| حاليًا / الآن | دلوقتي |
| داخل / خارج | جوه / بره |
| ما زال | لسه |
| محتاج / تحتاج | عايز / عاوز |
| الخاص بـ / الخاصة بـ, or an iḍāfa | بتاع / بتاعة |
| أكثر | أكتر |
| كثير / كثيرة | كتير |
| بالضبط | بالظبط |
| دائمًا | دايمًا |
| الـ cycle | الدايرة |
| أي أوامر shell (for "arbitrary shell commands") | أوامر shell عشوائية |

### 1.4 Not allowed

- Heavy slang, idioms, jokes that are Egypt-only: «الحلو مايكملش»، «ورقة وقلم وتعالوا»، «في وشك»، «خالص»، «أوي»، «حتة»، «يخش»، «تخيل معايا»، «طب احنا كده». The reference uses some of these; we do not.
- Stiff classical phrasing: «إنّ … لَـ»، «إذ»، «حيث إنّ»، «ألا وهو»، «لا سيما»، «بَيْدَ أنّ»، «ثمّة»، «ما هي إلا». Also whole MSA sentences with «عندما تكون … التي تطلبها» — that is a register switch, not a content word.
- The passive-by-auxiliary chain «يتم + مصدر» («يتم تنفيذ الأدوات»). Use an active verb or the colloquial passive: «الـ tools بتتنفذ».
- MSA damma passives «بتُستخدم»، «بتُسترجع»: rewrite actively or with the colloquial passive («بتتستخدم»، «بترجع تاني»).
- Word-for-word calques of English idioms and metaphors. Translate the *meaning*.
- Arabic-script transliteration of technical terms: no «كاش»، «تولز»، «هوكس»، «برومبت»، «ستريمنج»، «البروسيسور»، «السيرفر»، «اليوزر»، «التستينج»، «الداتا». The only accepted loanwords in Arabic script are: **الكود، الإنترنت، البروتوكول**.
- Tashkeel, except tanween fatḥ on adverbs (جدًا، تمامًا، فعليًا — tanween on the letter before the alef) and a shadda where it disambiguates (يشغّل، يحمّل، مطوّر، متوقّع). «بُعد»، «المُرّة»، «المؤهَّلين» are the guide's own forms and may stay. Always write hamzas correctly: إن، أن، إلى، أي، إيه.
- Addressing the reader in the plural. Address is **second-person masculine singular** (تقدر، لو بتبني، خد بالك) or inclusive "we" (هنشوف، بنلاقي).

### 1.5 Sentence shape

- Short sentences. If the English sentence has more than two clauses, split it. One idea per sentence.
- Prefer verb-first or topic-first Arabic order, whichever reads naturally. Do not mirror English clause order mechanically.
- English " -- " asides: first choice is to restructure into two sentences or use a colon; if an aside is truly needed use a single " — " per sentence.
- Keep the author's tone: confident, direct, slightly wry. Do not add enthusiasm (no «!» unless the source has one), do not add filler intros («في الحقيقة»، «من الجدير بالذكر»).
- A re-explanation connective is fine when the source itself restates («بمعنى تاني»، «يعني ببساطة»); never add one to a sentence the source did not restate.

### 1.6 What the 5 reference samples teach (adopt / reject)

**Adopt** (matches the samples and the round-1 pages):
- Question headings in the colloquial form: «إيه هي الـ X؟»، «ليه …؟»، «طيب إيه مشاكله؟». Our chapters use the same shape: «ليه Mutable Singleton»، «إزاي الأجزاء بتتوصل ببعض».
- Bold lead-in list items «**الـ Testability**: …» / «**1. الـ Query Loop** …» — the term in bold, colon or full stop, then the explanation.
- Opening a conclusion sentence with «فـ» («فالـ layered architecture ممكن يكون كفاية») and a paragraph that ends in a bullet list that unpacks it.
- «الـ X بقى هي/هو لما …» as an emphatic definition *only* when the source contrasts two things (the samples' Concurrency-vs-Parallelism move). Use sparingly.
- Sentence rhythm: one-sentence paragraph → list → one-sentence wrap-up. Our source already has this rhythm; keep it, do not merge paragraphs.

**Reject** (the samples do this; we do not):
- «ال» + space + Latin, or Title-casing a lowercase concept in running prose («الـ Concurrency» for "concurrency"). We write «الـ concurrency» — see 2.1, 2.2.
- Backticks around concept words (`` `LLMs` ``, `` `APIs` ``, `` `CRUD` ``) — see 2.3.
- Reverse-format glosses: Arabic word first, English in parentheses («عملية (task)»، «التقادم (staleness)»). Our format is English term first, Arabic gloss after — see 2.7.
- Latin comma «,» between Arabic words; «بتاع»; «أكتر»؛ «كتير»؛ «بالظبط»؛ «عايز»؛ «ألا وهو» — see 1.3.
- Mixed register inside one page (sample 05 alternates full MSA paragraphs with Egyptian ones). One register per page: ours.
- Arabic-script transliterations (البروسيسور، السيرفر، اليوزر، التستينج، الداتا) — see 1.4.
- Author-voice asides («تخيل معايا»، «ورقة وقلم») and rhetorical questions the source does not have. Nothing added — see section 4.

### 1.7 Good / bad examples (from the actual source)

**1.** *A traditional CLI is a function. It takes arguments, does work, and exits.*
- GOOD: الـ CLI التقليدي عبارة عن function. بياخد arguments، بينفذ شغله، ويخرج.
- BAD (stiff): إنّ واجهة سطر الأوامر التقليدية ما هي إلا دالّة؛ إذ تتلقى المعاملات فتؤدي عملها ثم تنصرف.
- BAD (slang): الـ CLI العادي ده حتة function وخلاص، بياخدله كام argument ويخلّص ويمشي.

**2.** *The model's reasoning is the control flow.*
- GOOD: والـ reasoning الخاص بالـ model هو نفسه الـ control flow.
- BAD (calque + translated terms): استدلال النموذج هو تدفق التحكم.

**3.** *Cross it, and the CLI feels sluggish. Miss it by a lot, and developers stop using it.*
- GOOD: لو عدّيت الحد ده، الـ CLI هيبان بطيء. ولو عدّيته بفرق كبير، المطوّرين هيبطلوا يستخدموه.
- BAD (word-for-word): اعبره، والـ CLI يشعر بالبطء. افقده بالكثير، والمطورون يتوقفون عن استخدامه.

**4.** *This is not an oversight.*
- GOOD: وده مش سهو.
- BAD (stiff): وليس هذا من قبيل السهو أو الغفلة.

**5.** *The `StreamingToolExecutor` does not wait for the model to finish before starting concurrency-safe tools.*
- GOOD: الـ class `StreamingToolExecutor` مش بيستنى الـ model يخلّص عشان يبدأ يشغّل الـ tools اللي هي concurrency-safe.
- BAD (يتم chain, terms translated): لا يتم انتظار انتهاء النموذج من قِبل مُنفِّذ الأدوات المتدفق قبل أن يتم بدء تشغيل الأدوات الآمنة تزامنيًا.

**6.** *These comments have the tone of engineers who learned the cost of an ungoverned global object the hard way.*
- GOOD: نبرة الـ comments دي نبرة مهندسين اتعلموا بالتجربة المُرّة ثمن إن يكون عندك global object من غير ضوابط.
- BAD (calque): هذه التعليقات لها نغمة مهندسين تعلموا تكلفة كائن عام غير محكوم بالطريقة الصعبة.

**7.** *If a beta header appears in request N but not request N+1, the cache is busted -- even if the prompt content is identical.*
- GOOD: لو فيه beta header ظهر في الـ request رقم N وماظهرش في الـ request رقم N+1، الـ cache بيتكسر. وده بيحصل حتى لو محتوى الـ prompt متطابق.
- BAD (one long sentence, mixed conventions): في حالة ظهور ال beta header فى الريكويست N و عدم ظهوره فى الريكويست N+1 فإن الكاش يتم كسره -- حتى لو كان محتوى البرومبت متطابقاً.

**8.** *Thirty-four lines. No middleware, no devtools, no time-travel debugging, no action types.*
- GOOD: 34 سطر. من غير middleware، ولا devtools، ولا time-travel debugging، ولا action types.
- BAD (padding, tone changed): تخيل معايا! أربعة وثلاثون سطرًا فقط لا غير، وبدون أي برمجيات وسيطة أو أدوات مطورين!

**9.** *The trust boundary is not about the user trusting Claude Code. It is about Claude Code trusting the environment.*
- GOOD: الـ trust boundary مش معناه إن المستخدم يثق في Claude Code. معناه إن Claude Code نفسه يثق في البيئة اللي شغال فيها.
- BAD (heavy Egyptian): الـ trust boundary ده مالوش دعوة خالص بإن اليوزر مأمّن لـ Claude Code، ده الحكاية كلها إن Claude Code هو اللي يأمّن للبيئة بتاعته.

**10.** *Let us trace a single API call from start to finish.*
- GOOD: تعالى نتتبع API call واحد من البداية للنهاية.
- BAD (stiff): فلنتتبّع معًا استدعاءً واحدًا لواجهة برمجة التطبيقات من مبتدئه إلى منتهاه.

**11.** *The loop is the heartbeat. But the heartbeat is meaningless without the nervous system that translates "the model wants to run `git status`" into an actual shell command.* (ch06)
- GOOD: الـ loop هو نبض القلب. لكن النبض ده ملوش معنى من غير الجهاز العصبي اللي بيحوّل "the model wants to run `git status`" (الـ model عايز يشغّل `git status`) لأمر shell حقيقي.
- BAD (metaphor dropped, quote translated only): الحلقة مهمة، لكنها بلا فائدة بدون النظام الذي يحوّل رغبة النموذج في تشغيل git status إلى أمر فعلي.
- Note: the quoted string keeps its English and gets the Arabic meaning in parentheses (section 4). «عايز» is allowed *inside* the parenthetical rendering of a quote only when it mirrors the source's informal phrasing; in our own prose it stays «محتاج».

**12.** *The solution is not a bigger model. It is more agents.* (ch08)
- GOOD: الحل مش model أكبر. الحل هو agents أكثر.
- BAD (merged, «أكتر»): الحل مش إنك تجيب model أكبر لكن إنك تشغّل agents أكتر.

---

## 2. Embedding English terms — the ONE convention

### 2.1 The definite article

Write **`الـ` + one space + the English term**: الـ cache، الـ agent loop، الـ hooks.
Never «ال cache», never «الكاش», never «الcache», never «الـcache» (no space).

Prefixed particles attach to the article, and the space stays:

| Particle | Form | Example |
|---|---|---|
| و | والـ | والـ state |
| لـ | للـ | للـ UI |
| بـ | بالـ | بالـ hooks |
| كـ | كالـ (definite) / كـ + space (indefinite) | كـ singleton |
| فـ | فالـ | فالـ generator بيقف |
| indefinite with لـ / بـ | لـ + space / بـ + space | لـ sub-agent جديد |

Indefinite terms take no article: «بيرجّع generator»، «عبارة عن singleton».

**«و» before a bare Latin word or a backticked identifier takes ONE space**: «و React»، «و side effects»، «و `init()`»، «و LLM prompts». Never glue it («وReact»، «و`init()`») — the bidi rendering makes و look attached to the code span. «والـ» stays attached when the article is present.

An English noun phrase is kept **whole and in English order**, with the article once at the front: الـ agent loop، الـ prompt cache، الـ two-tier architecture، الـ model tier، الـ source of truth. Never split or reorder it («الـ loop الخاص بالـ agent» is wrong for "agent loop").

Proper names take no article: Claude Code، Claude، Anthropic، React، Ink، Bun، Zustand، Commander، OpenTelemetry، ESLint، Bedrock، Vertex AI، GitHub، npm، TypeScript، Yoga، Sonnet، Opus، Haiku، Protobuf، JSON-RPC.

**Identifier-like names used as a bare name take no article either**: «AppState بيعتمد على»، «## 3.2 AppState -- …»، «AgentTool بتعمل spawn»، «SendMessage بيكتب في الـ mailbox». With the article only inside a noun phrase: «الـ AppState store»، «الـ AgentTool definition»، «الـ FlushGate class» (or «الـ class `FlushGate`» when the source backticks it).

### 2.2 Casing

Keep the source's casing exactly. Running prose: lowercase (الـ query loop، memory). Headings and bold lead-ins where the source uses Title Case: keep Title Case (الـ Query Loop، الـ Memory). Acronyms and proper names always as in the source (API، SDK، REPL، CLI، MCP، TTL، SSE، DAG، ANSI، JWT، XAA).

This rule wins over any glossary note: where the source writes lowercase "memory" we write «memory»; where it writes "Memory" we write «Memory». Latin "memory" is never confused with RAM because RAM is always «الذاكرة».

### 2.3 Backticks

Backticks **mirror the source exactly**. If the source has `` `STATE` ``, the translation has `` `STATE` ``. If the source has plain "prompt cache", the translation has plain «الـ prompt cache». Never add backticks to a concept term, never remove them from an identifier. (The reference site backticks concept words; we deliberately do not, so that inline code stays 1:1 with the source.)

Inline code does **not** take «الـ» directly. Put a plain category noun before it:
- الـ function `init()`، الـ object `STATE`، ملف `cli.tsx`، الـ flag `--print`، الـ type `Terminal`، الـ hook `preAction`، الـ mode `bubble`، الـ class `StreamingToolExecutor`، الـ tool `AgentTool`، الـ event `PreToolUse`، الـ field `worker_epoch`، الـ endpoint `/bridge`، الأمر `/dream`.
- This also fixes the RTL problem of a line starting with Latin text (section 6).

### 2.4 Plurals and numbers

- Use the English plural exactly as a developer would say it: الـ tools، الـ hooks، الـ tokens، الـ latches، الـ teammates، الـ frames. No Arabic plural endings on English words («توكنات», «hookات» are wrong).
- With a number, write the digit and keep the English plural as in the source: 6 abstractions، 5 latches، 27 lifecycle events، 7 permission modes، 8 transports، 14 خطوة (when the noun is translated).
- Counts that the source spells out ("six", "five", "fifteen-step", "a dozen", "two dozen", "nearly two thousand", "ninety-five percent") become **digits**: 6، 5، 15 خطوة، 12، 24، حوالي 2,000، 95%. "one / a single" becomes واحد / واحدة.
- Spelled-out units are translated: 300 ملي ثانية، 90 ثانية، 5 دقايق، 6 ساعات، 1,700 سطر. Compact units stay as in the source: 300ms، 400KB، 8K، 50K tokens، 95%، ~138ms، $4، $0.50، 0x18.

### 2.5 Verbs from English terms

Pick **«يعمل + English word»** for actions that have no ordinary Arabic verb: بيعمل render، بيعمل re-render، بيعمل yield لـ، بيعمل spawn لـ، بيعمل stream لـ، بيعمل import لـ، بيعمل mount، بيعمل subscribe، بيعمل parse لـ، بيعمل cache لـ، بيعمل memoize لـ، بيعمل fork، بيعمل abort لـ، بيعمل poll، بيعمل dispatch لـ، بيعمل flush لـ، بيعمل intern لـ، بيعمل diff.
Never glue an Arabic verb prefix onto an English word («تـ Throw»، «ي render»، «بي yield»).

Ordinary actions use ordinary Arabic verbs: ينفّذ (execute)، يشغّل (run)، يحمّل (load)، يقرأ، يكتب، يستدعي (call)، يرجّع (return)، يبعت (send)، يستقبل (receive)، يحفظ (save/persist)، يتحقق من (validate/check)، يعيد المحاولة (retry, as a verb)، يوقف (kill/terminate a process)، يقاطع (interrupt)، يفوّض (delegate)، يسجّل (register)، يحقن (inject, e.g. into the system prompt).

Fixed idioms:
- **"bust the cache" = «يكسر الـ cache»**, passive «الـ cache بيتكسر», noun «كسر الـ cache» (first mention per page: add «(cache bust)»).
- **"block" (a tool/hook blocks the next step)** = «بتوقّف اللي بعدها لحد ما تخلص»؛ "block a tool call" (deny it) = «يمنع».
- **"poisoned" (cache/context)** = «يتسمّم / تتسمّم».
- **"the model withholds …"** (ch05 withholding pattern) = «الـ model بيحجب»؛ the pattern name itself stays «الـ withholding pattern».

### 2.6 Gender agreement

- **English plurals of things are feminine singular** (standard Arabic non-human plural): الـ tools بتشتغل، الـ hooks دي، الـ latches الخمسة… → «الـ 5 latches دي». Plurals of *people-like* agents follow the same rule (الـ agents بتشتغل، الـ teammates بتتواصل، الـ workers بترجّع) — they are things in the code.
- **Singular terms default to masculine.** Only the terms below are feminine (because every Arabic speaker hears the feminine equivalent behind them):

| Feminine | Behind it |
|---|---|
| tool | أداة |
| function | دالة |
| session | جلسة |
| task | مهمة |
| codebase | قاعدة الكود |
| architecture | معمارية / بنية |
| process / subprocess | عملية |
| interface | واجهة |
| dependency | اعتمادية |
| library | مكتبة |
| skill | مهارة |
| cell (terminal grid cell) | خلية |
| channel | قناة |
| reconciliation | عملية |
| phase / layer (only when translated: المرحلة / الطبقة) | — |

Everything else is masculine: agent، sub-agent، loop، model، prompt، cache، state، store، singleton، generator، hook، latch، header، token، client، provider، bundler، stream، pipeline، bootstrap، watchdog، fallback، timeout، flag، mode، module، snapshot، request، response، API، SDK، CLI، REPL، UI، type، object، field، pattern، abstraction، trade-off، memory، fork، coordinator، worker، teammate، swarm، team، mailbox، transport، bridge، frame، pool، buffer، chord، keybinding، registry، budget، server، container، proxy.

«layer» is masculine when kept in English inside a named component («الـ API layer هو الأساس») and feminine when translated («الطبقة دي»). Both may appear on one page.

Examples: «الـ tool دي بتعلن عن نفسها»، «الـ cache ده بيتكسر»، «الـ session الحالية»، «الـ query loop نفسه generator»، «الـ skill دي بتتحمّل على مرحلتين».

### 2.7 First-mention gloss

Format: **English term, then a short Arabic gloss in parentheses, once per page, in body prose only** — «الـ backpressure (إن المستهلك هو اللي بيتحكم في سرعة المنتج)». Max ~8 words. Use the gloss text given in the glossary (column "Gloss") so all pages agree. Terms without a gloss entry get no gloss: a 2-year developer already knows API, function, cache, token, prompt, loop, request, state.

Where a gloss may **not** go: headings, table cells (header or body), link text, mermaid, code, and the bold lead-in of a numbered list item (README's 10-pattern list). Table cells therefore carry the bare English term («الـ staleness»), never a reverse-format «التقادم (staleness)».

Rules that the round-1 review settled:
- **Plural or feminine head term → adapt the gloss minimally in number/gender**, do not prefix the singular. Canonical adapted forms: «6 abstractions (مفاهيم أساسية بتخبّي التفاصيل وراها)»، «feature flags (مفاتيح بتشغّل أو تقفل ميزات)»، «side effects (آثار جانبية خارج الـ function نفسها)»، «invariants (شروط لازم تفضل صحيحة طول الوقت)»، «memoized (بتحسب النتيجة مرة واحدة وتحتفظ بيها)» after a feminine subject، «interceptors (نقاط اعتراض)».
- **Skip the gloss when the very sentence already states the definition** (the source often does this: "An agent is a loop: call the model, execute tools…"). A gloss that repeats the sentence is noise.
- **Move the gloss to the second mention** when the first sits inside parentheses, a dense list, a heading, or a table.
- **When the source already has a parenthetical right after the term**, deliver the gloss as a «يعني …» / «وده …» clause instead of stacking two parentheses.
- Never gloss a term twice on a page. In a long chapter written in several appends (section 7), keep a running list of glossed terms across appends.

---

## 3. Glossary

Decision legend: **KEEP** = keep English (Latin script), apply section 2. **TR** = translate, always with exactly the Arabic given. **G** = deserves a first-mention gloss (text given). Entries are grouped by topic; a term is listed once even if it recurs in many chapters — search this section before inventing a rendering.

### 3.1 Core concepts of the book

| Term | Decision | Arabic / Gloss |
|---|---|---|
| agent, AI agent, sub-agent, fork agent, child agent, parent agent | KEEP («الـ sub-agent»، «الـ child»، «الـ parent» when the source says child/parent) | — |
| agentic (system / CLI) | KEEP | «نظام agentic» · G: (يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل) |
| agent loop, query loop, loop | KEEP | — |
| tool, tool call, tool result, tool system, tool use | KEEP | — |
| task | KEEP | — |
| state, state layer, bootstrap state, AppState | KEEP (AppState bare as a name, see 2.1) | — |
| store, reactive store | KEEP | G for reactive: (أي تغيير فيه بيبلّغ الـ UI تلقائيًا) |
| tier / two-tier | tier TR: مستوى؛ "two-tier architecture" KEEP in headings, prose: «architecture من مستويين (two-tier)» | — |
| model tier | KEEP as a compound: «الـ model tier» | — |
| layer | KEEP inside a named component (الـ API layer، الـ state layer); otherwise TR: طبقة | — |
| bootstrap, bootstrap pipeline | KEEP | G: (خطوات تجهيز البرنامج من أول تشغيل الـ process لحد ما يبقى جاهز) |
| pipeline | KEEP | — |
| hook, lifecycle hook, lifecycle event | KEEP | G for lifecycle: (دورة حياة التنفيذ) |
| memory / Memory | KEEP, casing per source (2.2) | G: (السياق اللي الـ agent بيحتفظ بيه بين الـ sessions) — skip when the sentence defines it |
| memory (RAM sense, "bounded memory", "saving memory") | TR | الذاكرة |
| abstraction | KEEP | G: (مفهوم أساسي بيخبّي التفاصيل وراه) |
| architecture | KEEP | — |
| pattern, design pattern | KEEP | — |
| trade-off | KEEP | G: (مفاضلة: بتكسب حاجة وبتدفع ثمنها في حاجة تانية) |
| mental model | KEEP | G: (التصور الذهني) |
| golden path | KEEP | G: (المسار الأساسي للـ request من أوله لآخره) |
| control flow, data flow | KEEP | G for data flow: (مسار انتقال البيانات) |
| deterministic | KEEP | G: (نفس المدخلات بتدّي نفس المخرجات كل مرة) |
| source of truth, single source of truth | KEEP «الـ source of truth» | G: (المرجع الوحيد المعتمد) |
| infrastructure, infrastructure state | KEEP | — |
| permission, permissions | TR | صلاحية / الصلاحيات |
| permission system, permission model | TR | نظام الصلاحيات |
| permission mode, mode | KEEP | «الـ permission mode»؛ mode names stay in backticks |
| permission prompt / trust prompt (UI dialog) | KEEP "prompt" | «الـ permission prompt» |
| allow / deny / ask (as outcomes) | TR in prose: يسمح / يرفض / يسأل المستخدم; identifiers in backticks stay | — |
| classifier | KEEP | G: (model صغير بيصنّف الطلب: مسموح ولا لأ) |
| transcript | KEEP | G: (سجل المحادثة) |
| cursor | KEEP «الـ cursor» | — |
| slash command(s) | TR | الأوامر (the command itself stays code: الأمر `/dream`) |
| naming convention | TR | طريقة التسمية (feminine) |
| transparent (to the rest of the system) | meaning-first in prose: «باقي النظام مش بيحس بالفرق»؛ noun: «شفافية الـ provider»، «interface شفافة» | — |

### 3.2 Model / API / caching

| Term | Decision | Arabic / Gloss |
|---|---|---|
| model, LLM, language model | KEEP («الـ model»، «الـ LLM»، «language model») | — |
| prompt, system prompt | KEEP | — |
| prompt cache, prompt caching, cache, caching | KEEP | — |
| cache key, cache hit, cache miss, cache scope, cache namespace, cache slot | KEEP | G for cache key: (المفتاح اللي الـ server بيقارن بيه عشان يعرف الـ cache ينفع ولا لأ) |
| bust the cache / cache bust / cache-breaking | «يكسر الـ cache» / «كسر الـ cache» | see 2.5 |
| warm (cache warms, warm conversation) | TR | «الـ cache بيسخن»، «محادثة سخنة» · G: (بيتملي ويبقى جاهز) |
| prefix, shared prefix, byte-identical prefix | KEEP | G for byte-identical: (متطابق byte بـ byte) |
| TTL | KEEP | G: (مدة صلاحية الـ cache) |
| token, token budget, thinking budget, output cap | KEEP | G for output cap: (الحد الأقصى لعدد الـ output tokens) |
| overage | KEEP | G: (تجاوز حد الاستهلاك) |
| context, context window | KEEP | — |
| compaction, compact, auto-compact / autocompact | KEEP (spell as the source spells it) | G: (ضغط المحادثة عشان تفضل داخل الـ context window) |
| compression layer(s) | «طبقات الضغط» / «4 compression layers» in headings | — |
| snip (compact), microcompact, context collapse | KEEP as names: «الـ snip compact»، «الـ microcompact»، «الـ context collapse» | G for collapse: (طيّ أجزاء من المحادثة من غير حذفها) |
| tool result budget, result budgeting | KEEP | G: (حد أقصى لحجم نتيجة كل tool) |
| streaming, stream, chunk, SSE | KEEP | — |
| non-streaming fallback, fallback, model fallback | KEEP | G for fallback: (خطة بديلة لما الأساسية تفشل) |
| withholding pattern | KEEP | G: (الـ model بيحجب جزء من الرد لحد ما يتأكد) |
| escalation ladder | KEEP | G: (سلّم تصعيد: كل محاولة فاشلة بتجرّب حل أقوى) |
| death spiral (guard) | KEEP «الـ death spiral guard» | G: (حماية من دوامة أخطاء بتكرر نفسها) |
| watchdog, idle watchdog | KEEP | G: (مؤقّت بيراقب الـ stream ويقطعه لو وقف) |
| timeout, idle timer | KEEP | — |
| retry (noun) / retry (verb) | noun KEEP; verb TR: يعيد المحاولة | — |
| request, response, request body, header, beta header | KEEP | — |
| client, client factory, factory | KEEP | G for factory: (function وظيفتها تنشئ الـ object المناسب وترجّعه) |
| provider, cloud provider, multi-provider | KEEP | — |
| wrapper, tool wrapping | KEEP | — |
| credentials, credential injection | KEEP | G: (بيانات الدخول) |
| API key, OAuth, refresh token, JWT, epoch | KEEP | G for epoch: (رقم بيزيد مع كل تسجيل جديد عشان يبطّل القديم) |
| kill switch | KEEP | G: (زر إيقاف طوارئ) |
| failure modes | KEEP | G: (أشكال الفشل المحتملة) |
| invariant | KEEP | G: (شرط لازم يفضل صحيح طول الوقت) |
| type erasure | KEEP | G: (إخفاء الـ type الحقيقي عمدًا) |
| partial parsing, parse | KEEP | — |
| proxy, upstream proxy, load balancer, TCP, endpoint, first-party / third-party | KEEP | — |
| fleet, at fleet scale | TR | «على مستوى كل المستخدمين» |
| latency | KEEP | G: (زمن الاستجابة) |
| throughput | KEEP | G: (كمية الشغل اللي بتخلص في الوقت) |
| overhead | KEEP | — |
| economics (of forking) | TR | الحسابات الاقتصادية / التكلفة |
| preconnect / API preconnection | KEEP «الـ preconnection» | G: (فتح الاتصال بالـ API مبكرًا قبل أول request) |
| raw API | KEEP | — |

### 3.3 Language / runtime / build

| Term | Decision | Arabic / Gloss |
|---|---|---|
| function, object, class, type, interface, schema, field, boolean, string, array, Set, Map, Promise, enum | KEEP | — |
| variable | TR | متغير (but "environment variables" KEEP as a phrase) |
| generator, async generator, yield, generator chain | KEEP | G for async generator: (function بترجّع قيمها واحدة واحدة بشكل asynchronous) |
| backpressure | KEEP | G: (إن المستهلك هو اللي بيتحكم في سرعة المنتج) |
| cancellation, abort, AbortController, abort signal | cancellation TR: الإلغاء؛ abort KEEP: «بيعمل abort»، «الـ AbortController» | — |
| callback, event emitter, event loop, listener, subscriber, subscribe | KEEP | — |
| discriminated union | KEEP | G: (type بيجمع كذا حالة، وكل حالة ليها علامة بتميزها) |
| return type, terminal state, continue state | KEEP | — |
| state machine, transition | KEEP «الـ state machine»؛ transition KEEP | G for state machine: (مجموعة حالات محددة وانتقالات بينها) |
| pure function | KEEP | G: (function نتيجتها بتعتمد على مدخلاتها بس، من غير side effects) |
| dependency injection | KEEP | G: (الـ function بتاخد اللي محتاجاه كـ parameters بدل ما تجيبه بنفسها) |
| singleton | KEEP | G: (object واحد بس على مستوى الـ process كله) |
| mutable, immutable, mutation | KEEP | G for mutable: (قابل للتعديل المباشر) |
| getter, setter, encapsulation, type narrowing | KEEP | — |
| closure, updater function, selector, middleware, devtools | KEEP | — |
| reference, reference identity | KEEP | — |
| latch, sticky latch | KEEP | G: (flag لما يتفعّل مرة بيفضل مفعّل لآخر الـ session) |
| signal, pub/sub | KEEP | G for pub/sub: (نشر واشتراك) |
| side effect | KEEP | G: (أثر جانبي خارج الـ function نفسها) |
| memoize, memoized, memoization | KEEP | G: (يحسب النتيجة مرة واحدة ويحتفظ بيها) |
| idempotent | KEEP | G: (تكرار تنفيذه بيدّي نفس النتيجة) |
| re-entrant | KEEP | G (this book's loose usage): (بيرجع يدخل نفسه تاني بالـ context المحدّث) |
| speculative execution | KEEP | G: (تنفيذ مبكر على أمل إن النتيجة هتتحتاج) |
| concurrency, concurrent, concurrency-safe | KEEP | — |
| in parallel / parallelism | adverb TR: بالتوازي; noun KEEP: parallelism | — |
| serial / sequential | TR | بالتتابع / بالترتيب |
| batch, batching, concurrent batch, serial batch | KEEP | — |
| partition, partition algorithm | KEEP | G: (تقسيم الـ tool calls لمجموعات حسب أمان تشغيلها مع بعض) |
| admission check | KEEP | G: (فحص قبل ما الـ tool تدخل التنفيذ) |
| result harvesting | KEEP | G: (جمع النتائج أول ما تجهز) |
| order preservation | TR | الحفاظ على الترتيب |
| interrupt, interrupt behavior | KEEP «الـ interrupt»؛ verb TR: يقاطع | — |
| fail-closed | KEEP | G: (لو حصل شك، الافتراضي هو الأكثر أمانًا) |
| registry, tool registry, agent name registry, task registry | KEEP | — |
| deferred loading, deferred import, lazy | KEEP | G for deferred loading: (التحميل بيتأجل لحد ما الحاجة تتطلب) |
| context modifier | KEEP | G: (function بتعدّل الـ context للـ tools اللي بعدها) |
| feature gating, feature flag, flag | KEEP | G for feature flag: (مفتاح بيشغّل أو يقفل ميزة) |
| module, module-level, module scope, module evaluation | KEEP | G for module evaluation: (تنفيذ كود الـ module لحظة الـ import) |
| import, dynamic import, static import, require | KEEP | — |
| import graph, dependency, dependency graph, circular dependency | KEEP | G for circular dependency: (A محتاج B و B محتاج A) |
| DAG, DAG leaf | KEEP | G for DAG leaf: (module ما بيعملش import لأي module تاني في المشروع) |
| subprocess, process, PID, in-process | KEEP | G for in-process: (جوه نفس الـ process، من غير process جديدة) |
| I/O, I/O-bound | KEEP | — |
| keychain, MDM | KEEP | — |
| environment variables, env vars | KEEP | — |
| environment (generic) | TR | البيئة |
| config, configuration, settings | TR | الإعدادات (identifier-like uses such as "global config" file stay: «الـ global config») |
| build system / build time / compile-time / runtime | «نظام الـ build» / «وقت الـ build» / compile-time KEEP / «الـ runtime»، «وقت التشغيل» for "at runtime" | — |
| bundler, bundle | KEEP | — |
| dead code elimination | KEEP | G: (حذف الكود اللي مستحيل يتنفذ) |
| source maps, source code, pseudocode | KEEP | — |
| codebase, repository / repo, monolith, worktree | KEEP | G for worktree: (نسخة عمل منفصلة من الـ repo في مجلد تاني) |
| fast path, fast-path dispatch | KEEP | G: (طريق مختصر للحالات البسيطة) |
| critical path | KEEP | G: (سلسلة الخطوات اللي بتحدد الزمن الكلي) |
| hot path / cold path, warm start / cold start | KEEP | — |
| startup | TR | بدء التشغيل |
| initialization / initialize / init | TR: التهيئة / يهيّئ; `init()` stays code | — |
| trust boundary, trust dialog | KEEP | G for trust boundary: (الخط الفاصل بين ما قبل موافقة المستخدم وما بعدها) |
| entry point, launch path | KEEP | — |
| headless | KEEP | G: (من غير UI) |
| REPL, CLI, SDK, UI, terminal, shell | KEEP | — |
| component, component tree, mount, unmount | KEEP | — |
| migration, schema migration | KEEP | — |
| snapshot | KEEP | G: (نسخة مجمّدة في لحظة معينة) |
| telemetry, profiling checkpoints | KEEP | — |
| persist / persistence | verb TR: يحفظ على الـ disk; noun: «الحفظ الدائم (persistence)» | — |
| disk | KEEP | — |
| diff, state diff, cell-level diffing | KEEP | — |
| Observer pattern, god object, escape hatch | KEEP | G for escape hatch: (مخرج استثنائي من القاعدة) |
| leaky abstraction | KEEP | G: (abstraction بتسرّب تفاصيلها الداخلية) |
| histogram, reservoir sampling, percentile, p50/p95/p99 | KEEP | G for reservoir sampling: (عيّنة عشوائية بحجم ثابت من stream طويل) |
| orchestrator / orchestration | KEEP | — |
| injection attack, prompt injection | KEEP «injection attacks» | — |
| webhook, HTTP, TLS, SSO, JSON-RPC, JSON Schema | KEEP | — |
| frontmatter | KEEP | G: (الـ metadata اللي في أول الملف بين `---`) |
| bitmap, pre-filter, fuzzy search | KEEP | G for bitmap pre-filter: (فلتر أولي رخيص بيستبعد أغلب النتائج قبل البحث الفعلي) |
| ring buffer | KEEP | G: (buffer دائري بحجم ثابت، الجديد بيكتب فوق الأقدم) |
| O(1), O(n), O(capacity) | KEEP as written | — |

### 3.4 Multi-agent (ch08-ch10)

| Term | Decision | Arabic / Gloss |
|---|---|---|
| spawn (verb) / spawning | «بيعمل spawn لـ» / «عمل spawn» | — |
| fork, fork child, fork agent, forking | KEEP «بيعمل fork»، «الـ fork child» | G for fork agent: (نسخة من الـ agent بتشترك معاه في نفس الـ context) |
| fork boilerplate tag | KEEP | — |
| auto-backgrounding | KEEP | G: (نقل الـ agent للخلفية تلقائيًا لو طوّل) |
| sync-to-async transition | KEEP | — |
| coordinator, coordinator mode | KEEP «الـ coordinator»، «الـ coordinator mode» | G for coordinator: (agent وظيفته يوزّع الشغل على agents تانية ويجمع النتائج) |
| worker, worker agent | KEEP | — |
| swarm | KEEP | G: (مجموعة agents بتشتغل مع بعض على نفس الهدف) |
| team, teammate, team context | KEEP («الـ team»، «الـ teammates») | — |
| mailbox | KEEP | G: (ملف على الـ disk بتتحط فيه الرسائل الموجهة للـ agent) |
| message (SendMessage sense) | TR رسالة in prose; the tool stays `SendMessage` / SendMessage | — |
| channel (communication channel) | KEEP | — |
| routing, routing dispatch | KEEP | — |
| structured protocol | KEEP | — |
| permission forwarding | KEEP | G: (تمرير الـ permission prompt للـ parent عشان المستخدم يشوفه) |
| bubble mode | KEEP «الـ mode `bubble`» / «الـ bubble mode» | G: (الـ permission prompts بتطلع في terminal الـ parent) |
| permission isolation, abort controller isolation | KEEP | — |
| CLAUDE.md stripping | KEEP «الـ CLAUDE.md stripping» | — |
| skill preloading | KEEP | — |
| agent definition, agent type, built-in agent types | KEEP | — |
| General-Purpose / Explore / Plan / Verification / Claude Code Guide / Statusline Setup (agent type names) | KEEP as names, no article: «الـ agent type اسمه Explore» | — |
| mutual exclusion | KEEP | G: (الاتنين ماينفعش يشتغلوا مع بعض) |
| heartbeat | TR when metaphor (نبض القلب)؛ KEEP when a mechanism («الـ heartbeat») | — |
| bottleneck | KEEP | G: (عنق زجاجة) |
| delegation, delegate | TR | التفويض / يفوّض |
| ceiling (hard ceiling) | TR | سقف / حد أقصى |
| design space, design tensions | TR | مساحة التصميم / التوترات في التصميم |

### 3.5 Memory & extensibility (ch11-ch12)

| Term | Decision | Arabic / Gloss |
|---|---|---|
| stateless | KEEP | G: (مش بيفتكر حاجة من session للتانية) |
| file-based memory | KEEP | — |
| taxonomy, four-type taxonomy | KEEP «الـ taxonomy» | G: (تصنيف) |
| write path / recall path | KEEP | — |
| recall, LLM recall | KEEP | G: (استرجاع الـ memories المناسبة للمحادثة) |
| side-query | KEEP | G: (API call جانبي لـ model أصغر) |
| staleness, stale | KEEP «الـ staleness»؛ adjective: «قديم / متقادم» | G: (إن الـ memory بقت قديمة ومش مطابقة للواقع) |
| consolidation, /dream consolidation, consolidation lock | KEEP «الـ consolidation» | G: (دمج الملاحظات المتفرقة في memories منظمة) |
| append-only (daily logs) | KEEP | G: (بيتضاف له بس، ولا بيتعدّل ولا بيتمسح) |
| background extraction | KEEP | — |
| scope, scoping, per-project scoping | KEEP «الـ scope» | — |
| defense in depth | KEEP | G: (أكثر من طبقة حماية فوق بعض) |
| path resolution | KEEP | — |
| extensibility | TR in title (قابلية التوسعة); KEEP in «extensibility system» | — |
| skill, skills | KEEP | — |
| two-phase loading | KEEP | G: (الـ frontmatter بس في الأول، والمحتوى الكامل عند الاستدعاء) |
| plugin | KEEP | — |
| hook source, hook type | KEEP | — |
| exit code, exit code semantics | KEEP «الـ exit code» | — |
| snapshot security model | KEEP | — |
| precedence | TR | الأولوية / ترتيب الأولوية |
| force continuation | «يجبر الـ model يكمّل» | — |
| dynamic discovery | KEEP | — |

### 3.6 Terminal UI & input (ch13-ch14)

| Term | Decision | Arabic / Gloss |
|---|---|---|
| renderer, rendering engine, rendering pipeline, render, re-render | KEEP | — |
| Ink, Yoga, React reconciler, React Fiber, React Compiler | KEEP (proper names) | G for reconciler: (الجزء من React اللي بيحسب إيه اللي اتغير) |
| DOM, custom DOM | KEEP | — |
| fiber container | KEEP | — |
| double-buffer / double-buffered rendering | KEEP | G: (بيرسم في buffer خلفي وبعدين يبدّل) |
| frame, frame scheduling | KEEP | — |
| cell, grid, packed typed arrays | KEEP | — |
| string interning, pool, pool-based | KEEP «الـ interning»، «الـ pool» | G for interning: (تخزين كل string مرة واحدة وإعادة استخدامها بالـ index) |
| ANSI, escape sequence, escape code | KEEP | G for escape sequence: (سلسلة bytes بتتحكم في الـ terminal) |
| stdin, stdout, TTY | KEEP | — |
| hit-testing, layout, styling | KEEP | — |
| selection, search highlighting | TR | التحديد / تظليل نتائج البحث |
| streaming markdown | KEEP | — |
| virtual scrolling, viewport | KEEP | G for virtual scrolling: (بيرسم بس الجزء الظاهر على الشاشة) |
| key parsing, tokenizer, parser | KEEP | — |
| terminal protocol (kitty, modifyOtherKeys, bracketed paste, mouse) | KEEP names | — |
| keybinding, keybinding system, binding | KEEP | — |
| chord, chord support | KEEP | G: (اختصار من ضغطتين متتاليتين زي `ctrl+x ctrl+k`) |
| scope (keybinding context, "16 scopes") | KEEP «الـ scope» | — |
| reserved shortcuts | TR | الاختصارات المحجوزة |
| resolution flow / resolution chain | KEEP «الـ resolution chain» | — |
| vim mode, normal / insert / visual mode | KEEP; mode names stay code when the source backticks them | — |
| motion, operator, text object (vim) | KEEP | G for text object: (وحدة نص زي كلمة أو سطر أو اللي جوه القوسين) |
| dot-repeat | KEEP | G: (تكرار آخر تعديل بزرار `.`) |
| declarative configuration | KEEP | — |
| event system, event | KEEP | — |
| resize | KEEP «الـ resize» | — |

### 3.7 MCP & remote (ch15-ch16)

| Term | Decision | Arabic / Gloss |
|---|---|---|
| MCP, Model Context Protocol | KEEP | G: (بروتوكول مفتوح بيخلّي أي agent يستدعي tools خارجية) |
| MCP server, MCP client | KEEP | — |
| transport, transport type | KEEP | G: (طريقة نقل الرسائل بين الـ client والـ server) |
| stdio, SSE, HTTP, WebSocket, in-process transport | KEEP | — |
| discovery, discovery chain, tool discovery | KEEP «الـ discovery» | — |
| cross-app access (XAA) | KEEP | — |
| error body normalization | KEEP | — |
| connection, connection state, connection management | KEEP «الـ connection» | — |
| session expiry | KEEP | — |
| batched connections | KEEP | — |
| tool name normalization | KEEP | — |
| remote, remote control, remote session | KEEP «الـ remote control» | — |
| bridge, Bridge v1 / v2 | KEEP | G: (جسر بيوصل الـ CLI المحلي بالـ web interface) |
| CCR (Claude Code Remote) | KEEP | — |
| poll, poll-based, dispatch | KEEP | — |
| direct session | KEEP | — |
| FlushGate | KEEP (identifier) | G: (بيأجّل الكتابات الحية لحد ما إرسال الـ history يخلص) |
| echo deduplication | KEEP | G: (منع الرسالة إنها تتعرض مرتين لما ترجع من الـ server) |
| local server | KEEP | — |
| container, cloud container | KEEP | — |
| Protobuf hand-encoding | KEEP | — |
| LAN, localhost | KEEP | — |

### 3.8 Performance & epilogue (ch17-ch18)

| Term | Decision | Arabic / Gloss |
|---|---|---|
| playbook | TR | دليل الخطوات / كتالوج الحيل (pick one per page; heading: «دليل المهندس الـ senior») |
| startup latency | KEEP | — |
| context window sizing | KEEP | — |
| section memoization, memoized session date | KEEP | — |
| score-bound rejection | KEEP | — |
| fused indexOf scan | KEEP | — |
| async indexing, partial queryability | KEEP | — |
| bet, architectural bet | TR | رهان / الرهانات في الـ architecture («الرهان 1») |
| self-describing tools | KEEP | G: (كل tool بتوصف نفسها وصلاحياتها بنفسها) |
| central orchestrator | KEEP | — |
| autonomous operation | KEEP | — |
| what transfers | TR | إيه اللي ينفع يتنقل لأنظمة تانية |
| the cost of complexity | TR | ثمن التعقيد |
| landscape (of agent frameworks) | TR | الساحة / المشهد |

### 3.9 Ordinary words — always TRANSLATE, always this rendering

| English | Arabic |
|---|---|
| book / part / chapter / section | الكتاب / الجزء / الفصل / القسم |
| Chapter 5, Part II, Section 3.1, Phase 2, Step 8 | الفصل 5، الجزء II، القسم 3.1، المرحلة 2، الخطوة 8 |
| table of contents | فهرس المحتويات |
| What You'll Learn | هتتعلم إيه |
| Apply This | طبّق ده |
| Looking Ahead / What Comes Next | الخطوة الجاية / اللي جاي |
| What We Learned | اتعلمنا إيه |
| Summary | الملخص |
| Closing | الختام |
| system | النظام |
| design / design decision | التصميم / قرار تصميم |
| performance | الأداء |
| cost | التكلفة |
| security / safe / dangerous | الأمان / آمن / خطير |
| attack / attacker / malicious | هجوم / مهاجم / خبيث |
| user | المستخدم |
| developer / engineer | مطوّر / مهندس |
| senior engineers / technical leaders | مهندسين senior / القادة التقنيين |
| file / directory (generic) | ملف / مجلد ("working directory" KEEP) |
| command (shell command) | أمر / أوامر shell |
| line (of code) | سطر |
| code | الكود |
| message / message history | رسالة / سجل الرسائل (type `Message` stays code) |
| conversation / turn | المحادثة / «turn» KEEP |
| input / output | KEEP input / output when technical; otherwise المدخلات / المخرجات |
| error / error handling / error recovery | خطأ (generic); «error handling»، «error recovery» KEEP |
| behavior | السلوك |
| implementation | «الـ implementation» KEEP |
| version / update | إصدار / تحديث |
| machine | الجهاز |
| network | الشبكة ("network requests" KEEP) |
| step / phase / stage | خطوة / مرحلة / مرحلة |
| budget (time budget) | ميزانية |
| the key insight / the insight | الفكرة الأساسية |
| principle / reason / example | مبدأ / سبب / مثال |
| production | «الـ production» KEEP |
| subscription / eligible | الاشتراك / مؤهَّل |
| educational / disclaimer | تعليمي / إخلاء مسؤولية |
| parent / child (agents) | الـ parent / الـ child (KEEP, masculine) |
| background (run in the background) | الخلفية |
| foreground | المقدمة |
| result / output (of an agent) | النتيجة |
| directive / instruction | توجيه / تعليمات |
| discount | خصم |
| overlap | تداخل |

### 3.10 Canonical titles (README table and chapter H1 must match character-for-character)

Part titles:

| Source | Arabic |
|---|---|
| Part I: Foundations | الجزء I: الأساسيات |
| Part II: The Core Loop | الجزء II: الـ Core Loop |
| Part III: Multi-Agent Orchestration | الجزء III: الـ Multi-Agent Orchestration |
| Part IV: Persistence and Intelligence | الجزء IV: الحفظ الدائم والذكاء |
| Part V: The Interface | الجزء V: الـ Interface |
| Part VI: Connectivity | الجزء VI: الاتصال |
| Part VII: Performance Engineering | الجزء VII: هندسة الأداء |

Chapter titles (chapter H1 = «الفصل N: » + this text with the chapter source's dash «--»; README link text = this text without the prefix and with the README's «—»):

| # | Source | Arabic |
|---|---|---|
| 1 | The Architecture of an AI Agent | الـ Architecture الخاصة بالـ AI Agent |
| 2 | Starting Fast -- The Bootstrap Pipeline | بداية سريعة -- الـ Bootstrap Pipeline |
| 3 | State -- The Two-Tier Architecture | الـ State -- الـ Two-Tier Architecture |
| 4 | Talking to Claude -- The API Layer | الكلام مع Claude -- الـ API Layer |
| 5 | The Agent Loop | الـ Agent Loop |
| 6 | Tools -- From Definition to Execution | الـ Tools -- من التعريف للتنفيذ |
| 7 | Concurrent Tool Execution | تنفيذ الـ Tools بشكل Concurrent |
| 8 | Spawning Sub-Agents | عمل Spawn للـ Sub-Agents |
| 9 | Fork Agents and the Prompt Cache | الـ Fork Agents والـ Prompt Cache |
| 10 | Tasks, Coordination, and Swarms | الـ Tasks والتنسيق والـ Swarms |
| 11 | Memory -- Learning Across Conversations | الـ Memory -- التعلّم من محادثة للتانية |
| 12 | Extensibility -- Skills and Hooks | قابلية التوسعة -- الـ Skills والـ Hooks |
| 13 | The Terminal UI | الـ Terminal UI |
| 14 | Input and Interaction | الـ Input والتفاعل |
| 15 | MCP -- The Universal Tool Protocol | MCP -- البروتوكول الموحّد للـ Tools |
| 16 | Remote Control and Cloud Execution | التحكم عن بُعد والتنفيذ على الـ Cloud |
| 17 | Performance -- Every Millisecond and Token Counts | الأداء -- كل ملي ثانية وكل Token بيفرقوا |
| 18 | What We Learned | الخاتمة -- اتعلمنا إيه |

Chapter 18's source H1 is "What We Learned"; its README link text is «الخاتمة — اتعلمنا إيه». The chapter H1 is «الفصل 18: الخاتمة -- اتعلمنا إيه» so that the two match. The book title **Claude Code from Source** stays in English everywhere. When a chapter refers back to another chapter by name, use the canonical text from this table.

### 3.11 Tricky phrases — agreed renderings

| Source | Rendering |
|---|---|
| steal the patterns | خد الـ patterns واستخدمها عندك |
| under the hood | من الداخل |
| learned … the hard way | اتعلموا بالتجربة المُرّة |
| the heartbeat of the system | القلب النابض للنظام |
| the loop is the heartbeat | الـ loop هو نبض القلب |
| the nervous system | الجهاز العصبي |
| center of gravity | مركز الثقل |
| architectural linchpin | حجر الأساس في الـ architecture |
| forcing function | قيد بيفرض الانضباط |
| refreshingly honest | صريح بشكل يفرح |
| deliberately loud (naming) | صارخة عن قصد |
| invisible performance cliffs | انهيارات مفاجئة في الأداء من غير ما حد يلاحظ |
| pure waste | إهدار تام |
| zoom into one segment | بيقرّب على جزء واحد من |
| first-class part of the type system | جزء أصيل من الـ type system |
| scales linearly | بيكبر بشكل خطي |
| If you read nothing else: | لو مش هتقرأ غير حاجة واحدة: |
| The crab is just a crab. | والسلطعون مجرد سلطعون. |
| the multiplication of intelligence | مضاعفة الذكاء |
| hits a ceiling | بيوصل لسقف |
| pollute the main conversation | يلوّث المحادثة الأساسية |
| adversarial thinking | تفكير عدائي (يدوّر على الأخطاء عمدًا) |
| survives contact with the real world | بيصمد لما يقابل الواقع |
| interface evolution through subtraction | تطوير الـ interface بالحذف |
| the shared interface became a fiction | الـ interface المشتركة بقت وهم |
| Five-to-one improvement, free. | تحسين 5 لـ 1، ببلاش. |
| the model is not forgetful -- it never knew | الـ model مش بينسى. هو أصلًا ماكانش يعرف |
| each conversation is an independent universe | كل محادثة عالم مستقل بذاته |
| the terminal is not a browser | الـ terminal مش browser |
| invented from scratch | يتعمل من الصفر |
| raw bytes, meaningful actions | bytes خام، وأفعال ليها معنى |
| those bets deserve examination | الرهانات دي تستاهل نقف قدامها |

---

## 4. Markdown rules (hard constraints — a violation is a bug, not a style issue)

**Never translate or alter — copy byte-for-byte:**
- Fenced code blocks (```` ```typescript ````, ```` ```bash ````, ```` ```markdown ````, etc.), **including their comments**, shebang lines (`#!/bin/bash`) and any `#` heading lines that sit inside a fence (ch08 has `# My Custom Agent` inside a markdown fence — it is code, not a heading).
- Mermaid blocks in full: syntax, node IDs, **and label text** (Arabic inside mermaid renders unreliably, so labels stay English).
- Inline code in backticks, file paths, identifiers, CLI flags, env var names, HTTP codes, endpoints, hex bytes.
- URLs, link targets, image paths, HTML tags and attributes (`<p align="center">`, `<img … />`, `<br/>`). Only the human-readable `alt` text and link *text* are translated.
- Frontmatter keys (if any page has frontmatter). Values that are prose may be translated; keys never.
- `style` / `dateFormat` / `axisFormat` lines, table alignment rows (`|---|---|`), horizontal rules (`---`).

**Preserve 1:1:**
- Every heading, at the same level, in the same order. Section numbers («3.1») stay. Heading text is translated but keeps English terms per section 2 (no glosses in headings).
- Every paragraph, list item, table row and cell, blockquote, bold/italic span, in the same order. Same number of list items and table rows as the source. `**bold**` and `*italic*` markers stay around the corresponding Arabic words.
- Tables: translate header cells and prose cells; keep column order (do not mirror columns for RTL). Cells that are pure identifiers or enum values stay untouched. ch08 and ch10 have wide schema tables — every row, every cell.
- Links: same count, same targets. No in-page anchor links exist in ch01-ch18 (verified); if you meet one that points at a translated heading, leave the target unchanged and flag it in your notes.
- **Nothing omitted, nothing added.** No translator's notes, no extra explanations beyond the permitted first-mention gloss, no RTL wrapper `<div>`, no new headings. (GitHub already renders paragraphs with `dir="auto"`.)

**Quoted English strings** — source-code comments quoted in prose, UI strings, example user prompts, system-prompt excerpts (e.g. "we have always been lying about the return type", "Do you trust this directory?", "you handle the database migration"): keep the English original in its quotes, then add the Arabic meaning in parentheses right after. The same applies when the quoted comment sits in backticks in prose, and to a blockquoted comment (English verbatim, Arabic in parentheses inside the same blockquote). Strings inside mermaid/code blocks stay untouched.

**Punctuation:**
- Arabic comma «،» and question mark «؟». Full stop «.». Colon «:». Straight double quotes "…" as in the source. No Arabic semicolon; split the sentence instead.
- Parentheses and lists keep the source's structure.
- No space before «،» or «.»; one space after.

---

## 5. Numbers

Western digits only (0-9) — never ٠-٩. Keep the source's separators and symbols: 1,700 · ~80 · 50,000+ · 95% · 99.75% · 2^N · O(n^2) · <1% · 8-16x · $4 · $0.50 · 0x18 · 26-bit. Version-like and numbered references keep their form: الفصل 5، القسم 3.4، المرحلة 0، الخطوة 8، p99، HTTP 200، 529، Bridge v1، JSON-RPC 2.0. Spelled-out counts become digits (2.4), including in headings: "The Ninety-Five Percent Insight" → «فكرة الـ 95%»؛ "Seven Modes" → «الـ 7 Modes»؛ "Five Architectural Bets" → «الـ 5 رهانات في الـ Architecture».

---

## 6. RTL notes

- A line or list item that **starts with a Latin word** gets a wrong base direction in many renderers. Where a small rephrase avoids it, rephrase: start with «الـ», a category noun, or a verb.
  - Source: `` `cli.tsx` tries to exit before importing anything heavy. `` → «ملف `cli.tsx` بيحاول يخرج قبل ما يعمل import لأي حاجة تقيلة.»
  - Source: "Claude Code runs arbitrary shell commands…" → «بيشغّل Claude Code أي أوامر shell…» or «برنامج Claude Code بيشغّل…»
  - Source list item "**Interactive REPL** -- the standard case." → «**الـ Interactive REPL** -- الحالة العادية.»
  - Source: "AgentTool spawns a child." → «الـ tool `AgentTool` بتعمل spawn لـ child.» (category noun) or «AgentTool بتعمل spawn لـ child.» (bare identifier name, acceptable).
- Do not contort a sentence to satisfy this. Numbered bold lead-ins («**1. الـ Query Loop**») and table cells that are pure identifiers are fine as they are.
- Avoid ending a sentence with a Latin term directly followed by «.» when an easy reorder exists; the dot can visually jump sides. Not mandatory.
- Keep an English multi-word term on one side of the sentence; do not interleave Arabic words inside it.
- Put Arabic punctuation after a closing backtick or parenthesis, never inside inline code.
- «و» + one space before Latin / backticks (2.1) is part of this: it keeps the conjunction visually separate from the code span.

---

## 7. Long chapters

ch05 (505 lines), ch08 (753), ch10 (699), ch13 (383), ch14 (462) are two to four times the size of a round-1 chapter. Rules for them (and a good idea for every chapter):

1. **Write the file in several appends, never one giant write.** Cut at H2 boundaries: roughly 100-150 source lines per append, so 4-6 appends for ch08/ch10 and 3-4 for the others. The first write creates the file with the H1 and the first H2 block(s); each later append starts exactly at the next H2 heading and ends exactly before the following one. Never rewrite an earlier append.
2. **Section-by-section fidelity.** Before each append, re-read the corresponding source span (by line range) and translate that span only. Do not translate from memory of the whole chapter, do not merge or reorder sections, do not "finish the chapter in one go" once the context is tired. After each append, run the section 8 counts on that span (headings, fences, list items, table rows, links, bold spans) before moving on.
3. **Carry state across appends**: the list of terms already glossed on this page (one gloss per page — 2.7), the chapter's canonical title (3.10), and any close calls. Write these into your working notes after each append, not into the file.
4. **Code and mermaid fences never span an append boundary.** If an H2 block is itself huge (ch08 "The runAgent Lifecycle" is ~370 lines with 15 H4 steps), cut at H3/H4 boundaries instead, still whole blocks only.
5. **Final pass on the whole file**: the section 8 self-check over the complete file, plus a search for duplicated glosses and for any heading that appears twice (a sign that an append overlapped).

---

## 8. Translator self-check (run before you return)

1. Same count as the source of: headings (outside fences), code fences, mermaid blocks, tables, table rows, list items, links, images, `---` rules, bold spans.
2. Every code/mermaid block is byte-identical to the source.
3. Search your output for: «ال » followed by Latin (should be «الـ »), «و» glued to Latin or a backtick, Arabic-Indic digits, «,» between Arabic words, «يتم», damma-passives («بتُ»), «بتاع», «أوي», «دلوقتي», «لسه», «عايز» (outside quote renderings), «أكتر», «كتير», «بالظبط», «دايمًا», «على ما», «مافيش/مافيهوش», «الذي/التي», «سوف», transliterated terms (كاش، توكن، برومبت، سيرفر، بروسيسور).
4. Every KEEP term from the glossary is in Latin script with the source's casing; every TR term uses the glossary's exact Arabic.
5. Each gloss appears at most once per page, only in body prose, with the glossary's wording (adapted for number/gender per 2.7). No gloss in a table cell, link text, heading, or bold lead-in.
6. Chapter H1 and any back-references to other chapters match section 3.10 character-for-character.
7. Read three random paragraphs aloud: would a colleague actually say this? Any sentence over ~25 words — split it.
8. List your **close calls** (places where you deviated from, or were unsure about, this guide) at the end of your reply to the orchestrator, not inside the translated file.
