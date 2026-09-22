# Claude Code from Source

**الـ Architecture والـ Patterns والتفاصيل الداخلية للـ AI Coding Agent الخاص بـ Anthropic**

<p align="center">
  <img src="./web/public/cover.jpg" alt="Claude Code from Source — غلاف الكتاب" width="400" />
  <br/><br/>
  <a href="https://claude-code-from-source.com"><strong>اقرأ الكتاب على الإنترنت من claude-code-from-source.com</strong></a>
</p>

---

> **الـ repository ده تعليمي بالكامل.** مفيهوش أي source code من Claude Code، ولا حتى سطر واحد. كل code block فيه عبارة عن pseudocode أصلي مكتوب عشان يوضّح الـ architectural patterns. الهدف إننا نساعد المهندسين يفهموا الـ AI agents اللي شغالة في الـ production بتتبني إزاي، مش إننا نعيد إنتاج برمجيات محمية بحقوق ملكية أو نعيد توزيعها.

---

لما Anthropic نشرت Claude Code على npm، ملفات الـ source maps اللي امتدادها `.js.map` كان فيها field اسمه `sourcesContent` بيحتوي على كود TypeScript الأصلي بالكامل. الكتاب ده نتيجة دراسة الـ architecture دي. استخلصنا منها الـ patterns والـ trade-offs (مفاضلة: بتكسب حاجة وبتدفع ثمنها في حاجة تانية) وقرارات التصميم، وصغناها في سرد تقني يقدر أي مهندس يتعلم منه.

**18 فصل موزعين على 7 أجزاء.** ما يعادل ~400 صفحة مطبوعة.

كل فصل مكتوب على أكثر من مستوى من العمق: سرد متسلسل للقادة التقنيين، وأقسام متعمقة للمهندسين اللي بينفذوا بنفسهم، وخاتمة بعنوان **"طبّق ده"** بتستخلص patterns تقدر تاخدها وتستخدمها في أنظمتك. الرسومات التوضيحية مكتوبة بـ [Mermaid](https://mermaid.js.org/) وبتظهر على GitHub مباشرة.

---

## الكتاب ده لمين

- **مهندسين senior بيبنوا أنظمة agentic** (يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل) — خد الـ patterns واستخدمها عندك، وافهم الـ trade-offs، ونفّذها في الـ stack الخاص بيك
- **القادة التقنيين اللي بيقيّموا architectures** — تقدر تتابع السرد من غير ما تقرأ كل code block
- **أي حد عنده فضول يعرف أدوات الـ AI اللي في الـ production بتشتغل إزاي فعلًا** من الداخل

---

## فهرس المحتويات

### الجزء I: الأساسيات
*قبل ما الـ agent يقدر يفكر، لازم الـ process تكون موجودة أصلًا.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 1 | [الـ Architecture الخاصة بالـ AI Agent](./book/ch01-architecture.md) | الـ 6 abstractions الأساسية، والـ data flow، ونظام الصلاحيات، ونظام الـ build |
| 2 | [بداية سريعة — الـ Bootstrap Pipeline](./book/ch02-bootstrap.md) | التهيئة على 5 مراحل، والـ module-level I/O parallelism، والـ trust boundary |
| 3 | [الـ State — الـ Two-Tier Architecture](./book/ch03-state.md) | الـ bootstrap singleton، والـ AppState store، والـ sticky latches، وتتبّع التكلفة |
| 4 | [الكلام مع Claude — الـ API Layer](./book/ch04-api-layer.md) | الـ multi-provider client، والـ prompt cache، والـ streaming، والـ error recovery |

### الجزء II: الـ Core Loop
*القلب النابض للـ agent: اعمل stream، نفّذ، راقب النتيجة، وكرّر.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 5 | [الـ Agent Loop](./book/ch05-agent-loop.md) | نظرة متعمقة في ملف query.ts، وضغط على 4 طبقات، والـ error recovery، والـ token budgets |
| 6 | [الـ Tools — من التعريف للتنفيذ](./book/ch06-tools.md) | الـ Tool interface، والـ pipeline المكوّن من 14 خطوة، ونظام الصلاحيات |
| 7 | [تنفيذ الـ Tools بشكل Concurrent](./book/ch07-concurrency.md) | الـ partition algorithm، والـ streaming executor، والـ speculative execution |

### الجزء III: الـ Multi-Agent Orchestration
*الـ agent الواحد قوي. أما agents كثيرة بتشتغل مع بعض فدي نقلة نوعية.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 8 | [عمل Spawn للـ Sub-Agents](./book/ch08-sub-agents.md) | الـ AgentTool، والـ lifecycle الخاص بـ runAgent المكوّن من 15 خطوة، والـ built-in agent types |
| 9 | [الـ Fork Agents والـ Prompt Cache](./book/ch09-fork-agents.md) | حيلة الـ byte-identical prefix، ومشاركة الـ cache، وتحسين التكلفة |
| 10 | [الـ Tasks والتنسيق والـ Swarms](./book/ch10-coordination.md) | الـ Task state machine، والـ coordinator mode، والـ swarm messaging |

### الجزء IV: الحفظ الدائم والذكاء
*الـ agent اللي من غير memory هيفضل يكرر نفس الأخطاء للأبد.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 11 | [الـ Memory — التعلّم من محادثة للتانية](./book/ch11-memory.md) | الـ file-based memory، وتصنيف من 4 أنواع، والـ LLM recall، والـ staleness |
| 12 | [قابلية التوسعة — الـ Skills والـ Hooks](./book/ch12-extensibility.md) | تحميل الـ skills على مرحلتين، والـ lifecycle hooks، والـ snapshot security |

### الجزء V: الـ Interface
*كل حاجة المستخدم بيشوفها بتعدّي من الطبقة دي.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 13 | [الـ Terminal UI](./book/ch13-terminal-ui.md) | نسخة fork مخصصة من Ink، والـ rendering pipeline، والـ double-buffer، والـ pools |
| 14 | [الـ Input والتفاعل](./book/ch14-input-interaction.md) | الـ key parsing، والـ keybindings، ودعم الـ chords، والـ vim mode |

### الجزء VI: الاتصال
*الـ agent بيوصل لأبعد من localhost.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 15 | [MCP — البروتوكول الموحّد للـ Tools](./book/ch15-mcp.md) | 8 transports، والـ OAuth الخاص بـ MCP، والـ tool wrapping |
| 16 | [التحكم عن بُعد والتنفيذ على الـ Cloud](./book/ch16-remote.md) | الـ Bridge v1/v2، والـ CCR، والـ upstream proxy |

### الجزء VII: هندسة الأداء
*إننا نخلّي كل ده سريع لدرجة إن الإنسان مش بيحس بالآلة اللي شغالة وراه.*

| # | الفصل | هتتعلم إيه |
|---|---------|-------------------|
| 17 | [الأداء — كل ملي ثانية وكل Token بيفرقوا](./book/ch17-performance.md) | بدء التشغيل، والـ context window، والـ prompt cache، والـ rendering، والبحث |
| 18 | [الخاتمة — اتعلمنا إيه](./book/ch18-epilogue.md) | الرهانات الـ 5 في الـ architecture، وإيه اللي ينفع يتنقل لأنظمة تانية، والـ agents رايحة على فين |

---

## الـ 10 Patterns اللي بتخلّي كل ده يشتغل

لو مش هتقرأ غير حاجة واحدة:

1. **الـ AsyncGenerator كـ agent loop** — بيعمل yield لـ Messages، وبيرجّع Terminal كـ typed return، والـ backpressure (إن المستهلك هو اللي بيتحكم في سرعة المنتج) والإلغاء بييجوا معاه تلقائيًا
2. **الـ Speculative tool execution** — ابدأ تشغيل الـ tools اللي هي read-only أثناء الـ streaming الخاص بالـ model، قبل ما الـ response يكتمل
3. **الـ Concurrent-safe batching** — قسّم الـ tools حسب الأمان، شغّل الـ reads بالتوازي، ونفّذ الـ writes بالتتابع
4. **الـ Fork agents عشان مشاركة الـ cache** — الـ children اللي شغالة بالتوازي بتشترك في byte-identical prompt prefixes، وده بيوفّر ~95% من الـ input tokens
5. **ضغط الـ context على 4 طبقات** — snip، microcompact، collapse، autocompact — وكل طبقة أخف من اللي بعدها
6. **الـ File-based memory مع LLM recall** — فيه side-query على Sonnet بيختار الـ memories المرتبطة بالموضوع، مش keyword matching
7. **تحميل الـ skills على مرحلتين** — الـ frontmatter بس عند بدء التشغيل، والمحتوى الكامل عند الاستدعاء
8. **الـ Sticky latches عشان ثبات الـ cache** — أول ما beta header يتبعت، مش بيتشال أبدًا طول الـ session
9. **الـ Slot reservation** — الـ output cap (الحد الأقصى لعدد الـ output tokens) الافتراضي 8K، وبيترفع لـ 64K لما الـ response يوصل للحد (وده بيوفّر context في 99% من الـ requests)
10. **الـ Hook config snapshot** — جمّده عند بدء التشغيل عشان تمنع الـ injection attacks وقت التشغيل

---

## الكتاب ده اتعمل إزاي

الـ source اتستخرج من الـ source maps الموجودة على npm. وحلّلت 36 AI agents حوالي 2,000 ملف TypeScript على 4 مراحل:

1. **الاستكشاف**: 6 agents شغالة بالتوازي قرأت كل ملف في الـ source tree
2. **التحليل**: 12 agents كتبت 494KB من التوثيق التقني الخام
3. **الكتابة**: 15 agents أعادت كتابة كل حاجة من الصفر في شكل فصول سردية
4. **المراجعة والتنقيح**: 3 مراجعين تحريريين كتبوا 900 سطر من الملاحظات، و3 revision agents طبّقت كل التصحيحات

العملية كلها، من استخراج الـ source لحد الكتاب النهائي بعد التنقيح، أخدت حوالي 6 ساعات.

---

## إخلاء مسؤولية

**الـ repository ده مفيهوش أي source code من Claude Code.** كل الـ code blocks عبارة عن pseudocode أصلي بأسماء متغيرات مختلفة، مكتوب عشان يوضّح الـ architectural patterns. ومفيش فيه أي نص prompt محمي بحقوق ملكية، ولا internal constants، ولا الـ implementation الحرفي لأي function. المشروع ده موجود لأغراض تعليمية بحتة: إنه يساعد المهندسين يفهموا الـ design patterns اللي ورا الـ AI coding agents اللي شغالة في الـ production.

غلاف "NO'REILLY" محاكاة ساخرة (parody/meme) لغرض التوضيح فقط. المشروع ده مش مرتبط بـ O'Reilly Media بأي شكل. والسلطعون مجرد سلطعون.

ده تحليل مستقل. برنامج Claude Code منتج من منتجات Anthropic. والكتاب ده مش تابع لـ Anthropic، ولا معتمد منها، ولا برعايتها.
