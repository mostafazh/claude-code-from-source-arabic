# Translation review notes — Arabic edition of *Claude Code from Source*

Purpose: everything a second reviewer (human or LLM) needs to double-check the translation. Each page went through: translator → one senior-reviewer round → translator revision. Below are (1) the cross-page rulings reviewers issued, (2) disagreements where a translator kept their version over the reviewer's, (3) close calls that stayed 50/50 after review. Arabic quotes are verbatim from the files on branch `arabic-translation`.

Style reference: Eqraatech/Software-Engineering-In-Arabic (5 sample pages). Glossary and rules: `STYLE_GUIDE.md`.


## 1. Cross-page rulings from reviewers

### Round 1 reviewer (README, ch01–ch04)

OVERALL: All 5 pages pass the hard markdown checks (heading/fence/table/list/link/bold counts identical to source, all code and mermaid blocks byte-identical, link targets identical). Technical accuracy is high; I found no mistranslated mechanism. The feedback below is mostly cross-page consistency, a handful of readability fixes, and rulings on the translators' close calls. Apply the rulings in this section on every page, then the per-page items.

CROSS-PAGE RULINGS (every page must apply):

1. «و» before a Latin word or backticked code: write «و» + ONE SPACE («و `init()`»، «و React»، «و side effects»). This is what ch01 and ch03 already do and it avoids the bidi glitch where و looks glued to the code span. ch02 (lines 43, 78, 245) and ch04 (lines 61, 113, 131, 169, 199) attach it without a space and must change. «والـ» stays attached when the article is present.

2. ما…ش negation: the closed list is extended to (a) negative imperatives («ماتحطش»، «ماتوزّعش»، «ماتفرّقش»), (b) the fixed existential forms, and (c) «ماينفعش». ONE spelling: «مفيش / مفيهوش / مفيهاش» (no alef after م). README «مافيهوش/مافيش» and ch02 «مافيش» change to «مفيهوش/مفيش». Present-tense verb negation stays «مش + verb» except the forms above.

3. Spelling standardisation (content words are MSA per guide 1.1): «أكثر» not «أكتر» (ch02 x6, ch04 x4), «كثير/كثيرة» not «كتير» (README line 55, ch02 line 43), «بالضبط» not «بالظبط» (ch02 lines 56, 84), «دائمًا» not «دايمًا» (ch04 line 163), «الـ cycle» not «الدايرة» (ch03 line 249). «تاني/تانية»، «الاتنين»، «شوية» are accepted as grammar-glue level and stay.

4. No tashkeel except tanween fatḥ and disambiguating shadda: remove the damma passives «بتُستخدم» (ch02 line 154) and «بتُسترجع» (ch03 line 259) and rewrite actively/colloquial-passively; «متوقَّع» (ch02 line 168) → «متوقّع». «بُعد»، «المُرّة»، «المؤهَّلين» may stay (they disambiguate / are the guide's own forms).

5. First-mention gloss after a PLURAL or FEMININE term: adapt the glossary wording minimally in number/gender instead of prefixing the singular term. Canonical adapted forms: «6 abstractions (مفاهيم أساسية بتخبّي التفاصيل وراها)»، «feature flags (مفاتيح بتشغّل أو تقفل ميزات)»، «side effects (آثار جانبية خارج الـ function نفسها)»، «invariants (شروط لازم تفضل صحيحة طول الوقت)»، «memoized (بتحسب النتيجة مرة واحدة وتحتفظ بيها)» after a feminine subject. ch01 line 9 and ch02 line 3 (abstractions), ch01 line 155 (feature flag), ch04 line 5 (invariants) must align. Skipping a gloss when the very sentence already states the definition (Memory in ch01/ch02, bootstrap/latch in ch03, bootstrap/agentic in ch04, kill switch in ch04) is APPROVED. Placing a gloss at the second mention when the first sits inside parentheses or a dense list (compaction in ch04, singleton in ch03) is APPROVED. Delivering a gloss as a «يعني …» / «وده …» clause when the term already has a source parenthetical right after it (async generator ch04, reservoir sampling ch03) is APPROVED.

6. Glosses in the README: none in table cells, link text or the 10-pattern bold lead-ins — APPROVED as done (only trade-offs, agentic, backpressure, output cap in prose). Consequently README table cells use bare English terms: «التقادم (staleness)» → «الـ staleness» (reverse-format additions are not allowed in cells).

7. New/revised glossary entries (reviewer decisions, apply everywhere):
   - deterministic — KEEP, G: (نفس المدخلات بتدّي نفس المخرجات كل مرة)
   - source of truth — KEEP «الـ source of truth», G: (المرجع الوحيد المعتمد). ch02 line 154 must switch from the paraphrase to the English term; ch03 line 223 adds the gloss at first mention.
   - overage — KEEP, G: (تجاوز حد الاستهلاك)
   - interceptor — KEEP, G: (نقطة اعتراض)
   - re-entrant — gloss REVISED for this book's loose usage: (بيرجع يدخل نفسه تاني بالـ context المحدّث). The strict CS gloss in the guide contradicts the paragraph that follows it in ch01.
   - infrastructure / infrastructure state — KEEP English on all pages (already consistent).
   - cursor — KEEP «الـ cursor». Slash commands — TR «الأوامر» (as ch02). «block» as a verb — «بتوقّف اللي بعدها لحد ما تخلص» approved. «poisoned» — «تتسمّم» approved. «model tier» — KEEP as a compound. «naming convention» — «طريقة التسمية» (feminine, so «صارخة عن قصد» agrees).
   - «arbitrary shell commands» = «أي أوامر shell». The guide's own RTL example («عشوائية») is wrong and is superseded.
   - «permission model» (ch01) = «نظام الصلاحيات» (same thing the glossary already names).
   - «transparent (to the rest of the system)»: meaning-first rendering «باقي النظام مش بيحس بالفرق» (ch01) in prose, and the noun «شفافية الـ provider» / «interface شفافة» (ch04) are both accepted; do not force one onto the other.

8. Gender: «layer» is masculine when kept in English inside a named component («الـ API layer هو الأساس») and feminine when translated («الطبقة دي»). Already consistent; keep it. «reconciliation» treated as feminine (عملية) is accepted.

9. AppState: bare «AppState» when it stands alone as a name («AppState بيعتمد على»، «## 3.2 AppState -- …»); with article only inside a noun phrase («الـ AppState store»، «الـ AppState type»). All pages already comply.

10. Casing of «memory»: rule 2.2 (mirror source casing) wins over the glossary's "capitalised" note. Where the source writes lowercase "memory" (README lines 64, 68, 106; ch02 line 3) write «memory»; where the source writes "Memory" (ch01 list item 5, README ch11 title) keep «Memory». Latin "memory" is never ambiguous with RAM because RAM is always «الذاكرة».

11. Numbers: «a dozen» → «12» (approved), «nearly two thousand» → «حوالي 2,000» on both README and ch01 (README currently has «ما يقرب من 2,000»; align to «حوالي»).

12. Quoted source-code comments that appear in BACKTICKS in prose (ch03 line 23) get the Arabic meaning in parentheses exactly like quoted strings — APPROVED. Blockquoted comment in ch04 (English verbatim + Arabic in parentheses inside the same blockquote) — APPROVED.

13. Canonical Part titles (README, and any chapter that references a Part): الجزء I: الأساسيات · الجزء II: الـ Core Loop · الجزء III: الـ Multi-Agent Orchestration · الجزء IV: الحفظ الدائم والذكاء · الجزء V: الـ Interface · الجزء VI: الاتصال · الجزء VII: هندسة الأداء. Canonical chapter titles 5-18 are the README link texts as currently written (including «تنفيذ الـ Tools بشكل Concurrent» and «MCP — البروتوكول الموحّد للـ Tools»); future chapter H1s must match them character-for-character.

14. «على ما» (ch02, "while / by the time") is regional and not on the closed list; use «أثناء ما» or «لما».

STILL-DEBATABLE (close calls I ruled on but where a second opinion is reasonable): (a) re-entrant gloss (loose author usage vs. strict CS meaning); (b) «memory» lowercase per source vs. always-capitalised abstraction name; (c) «الـ source of truth» kept English vs. «المرجع الوحيد المعتمد» translated; (d) README 10-pattern list in 2nd-person imperative vs. descriptive; (e) «retry واحد» vs «retry واحد من الأول» for "one clean retry"; (f) «أدوات الـ AI» vs «الـ AI tools» in README; (g) whether «الطبقة دي» (translated) and «الـ API layer» (kept) in the same chapter reads as inconsistent.

### Round 2 reviewer — ch05-agent-loop.md, ch06-tools.md, ch07-concurrency.md, ch18-epilogue.md

Overall: all four chapters are structurally 1:1 with the source (headings, fences, mermaid, table rows, list items, bold spans, rules all match; every code/mermaid fence is byte-identical). Technical accuracy is high; the register is right and consistent with ch01-ch04. The items below are the only things worth a revision pass.

RULINGS THAT APPLY TO EVERY CHAPTER (add to the style guide):

1. Source editing artifacts (duplicated sentences): ch05 line 76, ch07 lines 259-261 and 265 repeat sentences in the English. Translators did the right thing: keep the duplication verbatim. The orchestrator fixes the English upstream and the translation follows; translators never silently edit the source.

2. Quoted strings, refined rule: (a) speech-like quotes — something a component/person "says", user prompts, model output, code comments, UI strings — keep the English in quotes + Arabic in parentheses (guide example 11; ch06 "I have no tool-specific objection", ch07 "the execution environment has changed, here's how" are correct). (b) Author's scare-quoted labels or adjectives ("always serial", "all concurrent-safe", "reads") are prose: translate directly inside the quotes, no English. Both chapters already follow this split; write it down so later chapters do too.

3. Glossary corrections: (a) withholding pattern gloss is wrong for ch05 — the loop withholds recoverable *errors*, the model withholds nothing. Replace with: «(الـ loop بيحجب الأخطاء اللي ممكن التعافي منها لحد ما يتأكد إن التعافي فشل)», and drop the 2.5 idiom "the model withholds". (b) New KEEP+G entries from ch07: wall-clock time «(الوقت الفعلي اللي بيعدّي على الساعة)»; post-stream drain «الـ drain» «(تفريغ النتائج المتبقية)»; sibling error cascade — noun KEEP «الـ sibling error cascade», verb meaning-first «بتنتقل للـ siblings»; bubble-up (abort signal) «بيتصاعد لفوق» with «(bubble-up)» once per page since «bubble» is reserved for the permission mode; tombstone «بتتحط عليها علامة tombstone»; seam (testing) meaning-first «نقطة الوصل». (c) Confirmed: god object bare, no gloss (ch01 precedent); "first-class citizens" → «جزء أصيل من النظام» (3.11); "death by a thousand cuts" → «يموت بالتقسيط»; "less reactive, more proactive" → «أقل انتظارًا للأوامر وأكثر مبادرة».

4. Gloss placement: when the section that introduces a term already states its definition (ch05 "Recoverable errors are suppressed from the yield stream", "It is a ladder of increasingly aggressive interventions"), do not add the glossary gloss at a later mention — a gloss in the Apply This section, 200 lines after the concept was explained, is noise. Skip it entirely on that page.

5. Numbers + English plural (guide 2.4): always the English plural after a digit: «500 tokens», «13,000 tokens», «250K API calls», «45 members», «15+ arguments». ch05 and ch06 use the singular in several places. (Note for a later sweep, out of this batch: ch03 lines 58 and 90 have «50,000 token» while ch04 correctly has «8,000 tokens».)

6. Promise vocabulary: a promise "resolves" → «بيتعمل له resolve» (ch02 precedent «عملت resolve»), never «بيتحل», which reads as "gets solved".

7. Gender with numerals: English plurals stay feminine singular even after a number or «التلاتة/الاتنين»: «التلاتة بتبدأ», «لو فيه tools اتنين بتشتغل بالتوازي».

8. "often" → «غالبًا». Never «كثير» as an adverb («أوامر Bash كثير بتكوّن» is wrong).

9. Consistency: "infinite loop" stays English on every page (ch05 does, ch06 once translated it). "concurrent batches" stays English as a compound (ch05 does; ch06 line 308 translated it). Egyptian «لورا» for rewind → «للخلف». Egyptian «بتشاور» for "point toward" → «بتشير». "crash" as a verb → «يعمل crash لـ», not «يوقّع».

10. Close calls accepted as-is (no change needed): ch05 «## مثال عملي: "Fix the Bug in auth.ts"» without parenthetical; «### الـ callModel() Loop»; «الـ Subagents» spelling per source; Edit feminine as a tool; «في الذاكرة» for RAM; «+500k» moved into a relative clause. ch06 «عايز» inside the quote rendering; fail-safe bare next to glossed fail-closed; «مجموعة» for partition in the sort step; «أبرز الـ Tools واحدة واحدة». ch07 dropping the runway metaphor; «آمنة للـ Concurrency» as a table header; «الـ Serial Batches» in headings with «بالتتابع» in prose; compact «3.1s»/«2.6s» next to spelled-out «200 ملي ثانية»; no side-effect gloss on the page. ch18 «accidental بالمعنى اللي قصده Brooks»; «كـ transports» hosting the gloss; «الحكاية كلها: اعمل stream، اجمع، نفّذ، ضيف، كرّر»; «انتظام» for order; «-70%» unpacked (matches ch12's «overhead أقل بـ 70%»).

### Round 2 reviewer — ch08-sub-agents.md, ch09-fork-agents.md, ch12-extensibility.md

Structure: all three chapters match the source 1:1 (headings, fences, table rows, list items, links, bold spans, hr rules) and every code/mermaid fence is byte-identical. No omissions or additions found at section level. The remaining work is accuracy nits, register slips and cross-chapter consistency.

Rulings every chapter must apply:

1. Present-tense negation is «مش + بـverb»: «مش بيقدر / مش بتقدر», never «مش يقدر». ch08 has 10 occurrences of «مش يقدر» (L299, 323×2, 445, 710×2, 712, …); ch01 and ch12 already use «مش بيقدر». Fix all of ch08.

2. "guard" is KEEP (matches ch01 L166, ch05 L337, and glossary's «الـ death spiral guard»): «الـ guard الأساسي»، «الـ fallback guard»، «2 guards». Drop «حاجز / حاجزين / الحاجز» (ch08 L147, L592). With a number: «2 guards», not «guard اتنين» (ch09 L117, L133).

3. "belt and suspenders" = «حماية مزدوجة» (ch08's rendering). ch09 L133/L135 use «أسلوب احتياط فوق احتياط» while claiming to match ch08 — align ch09 to «حماية مزدوجة».

4. Never render "synchronous/synchronously" as «متزامن / بشكل متزامن». In Arabic tech writing (and in the Eqraatech reference itself) «متزامن» means *concurrent*, the opposite sense. Use «sync» / «synchronous» in Latin, or «في المقدمة» when the source means blocking the terminal. ch09 L164, L176.

5. Two words outside the closed colloquial list: «ساعات» (= sometimes; ch08 L7, L614) → «أحيانًا» or «في حالات كثيرة»; «وخلاص» (ch09 L43, L188) → «ببساطة» or drop. Also avoid «ما…ش» on a present verb («مانستدعيش») — guide 1.2 limits ما…ش to past / imperative / existential.

6. "critical" as an adjective is «أساسي / مهم جدًا», not the calque «حرج» (ch08 L226 «فلتر حرج», L548 «4 قدرات حرجة»). Keep «الحرجة» only inside the translated quote "Critical Files for Implementation".

7. Counts spelled as adjectives become digits too (guide 2.4/5): «الأبعاد الخمسة» → «الـ 5 أبعاد» (ch08 L734, L751; L700 already has «5 أبعاد»), «الاستراتيجيات الثلاثة» → «الـ 3 استراتيجيات» (ch08 L387), «17 parameter» → «17 parameters» (ch08 L180).

8. Keep English multi-word noun phrases whole (guide 2.1): «lifecycle interceptors (نقاط اعتراض في دورة حياة التنفيذ)», not «interceptors (…) على الـ lifecycle (…)» (ch12 L7). Never stack two glosses in one phrase.

9. "markdown body" = «نص الـ markdown» (ch08 L675). ch12 L41 «جسم الـ markdown» ×2 → «نص الـ markdown».

10. "workhorse" = «اللي شايل الشغل التقيل» (ch08 L568). ch12 L137 «شايل أغلب الشغل» → same phrase.

Close-call rulings (accepted unless noted):
- pathological → «كارثة»: accepted.
- "This is the workhorse." → accepted; canonical per ruling 10.
- "The fifteen-step cleanup" → NOT accepted as literal. «تنظيف الـ 15 خطوة» reads as "cleanup of the 15 steps" and is more misleading in Arabic than the English. Use «والتنظيف اللي في الخطوة 15 بيشتغل…» (ch08 L552).
- trust boundary without the glossary gloss (ch08 L692, ch12 L80): accepted — the canonical gloss describes the ch01 workspace-consent boundary and would mislead here. Rule: a glossary gloss is only added when it matches the sense on the page.
- fork gloss placed on "fork children" in the call() section: accepted.
- "verification pass" → «مرحلة verification»: accepted.
- Author's own scare-quoted phrases ("minus spawning", "similar enough", "semantically equivalent") translated directly inside the quotes: accepted. Rule: the keep-English-plus-gloss convention applies only to strings that exist somewhere (code comments, UI text, prompt excerpts, example user prompts). Rhetorical scare quotes by the author are translated.
- Design-space table cells (الافتراضي / Inherit / مختصر / أي منهما / async دائمًا / أدنى حد / التفويض للشغل العام): accepted; change «task إعدادات» → «task إعداد».
- "AND" emphasis → «(لازم الاتنين)» (ch08) and «وكمان» (ch12): accepted; no added bold.
- "unaffordable one" → see ch08 L730 for a simpler phrasing.
- KAIROS row «والـ force-async في وضع الـ assistant»: accepted.
- ch09 "assistant message / user message" feminine: accepted. Rule: compounds ending in "message" are feminine (رسالة is a TR term).
- "threaded/threading" → «بيتمرر / التمرير»: accepted (consistent with ch08).
- "not pure" with inverted gloss as a «يعني» clause: accepted.
- "warm conversation/session" → «سخنة» with adapted gloss: accepted.
- "exact passthrough" KEEP: accepted.
- "runaway API spend" → «إنفاق على الـ API من غير سقف»، "hold the terminal hostage" → «ماتحتجزش الـ terminal»، "moot" → «مش مطروح أصلًا»، heading "NOT" without added markup، "are a lie" → «كذبة»: all accepted.
- ch12 «بُعدين للتوسعة»: accepted (dual, not a count).
- slash commands → «أوامر» (glossary TR): accepted; the mermaid right below shows «/skill-name» so the '/' nuance is visible.
- «الـ MCP Security Boundary» heading + «حد الأمان» in prose: accepted.
- Source column names in English, Trust Level column translated: accepted.
- «test suite ناجح» masculine: accepted.
- -70% rephrased in prose, untouched in mermaid: accepted.
- fast path glossed at L254 instead of the L145 parenthetical: accepted.
- Exit-code "block" → «يمنع»: accepted, but the Stop-hook sentence (L155) needs rewording — see page feedback.
- "MCP security line" → «خط أمان MCP»: accepted.
- «بتحط الـ base directory في البداية»: accepted.

### Round 2 reviewer — ch10-coordination.md, ch11-memory.md, ch15-mcp.md

All three chapters are structurally clean: line counts, heading/fence/mermaid/table-row/list-item/link/bold counts match the source exactly, every code and mermaid block is byte-identical, link targets are unchanged, and the self-check forbidden-pattern scan is clean except for one «جوه» (ch10:431, inherited from the glossary gloss). Technical accuracy is high across the batch; the feedback below is mostly consistency and readability. Rulings every chapter must apply:

1. COUNTS (settles the ch10/ch11/ch15 close calls). When the counted noun stays English, write digit + English plural: «2 fields»، «2 servers»، «2 turns»، «2 protocols»، «2 instances». When the noun is translated Arabic, the Arabic dual is correct and preferred: «دقيقتين»، «قرارين تصميم»، «طبقتين»، «خطوتين» (this is what ch01 does). The hybrid «field اتنين» / «protocol رسمي اتنين» / «instance اتنين» is wrong in both systems and must go (ch10 has four instances).

2. NO REVERSE-FORMAT GLOSSES. Style guide 1.6 rejects «Arabic word (english)». Several slipped in: ch10 «مش محجوزة (retained)», «شغل المتابعة والتسجيل (bookkeeping)»; ch15 «(backwards-compatible)», «(remote)», «مفتاح موحّد (canonical key)», «الاسم الكامل (fully qualified)». Either keep the English term first with the Arabic after it (for terms a reader would search: «الـ bookkeeping (شغل المتابعة والتسجيل)»), or translate plainly with no parenthetical (for ordinary adjectives like remote / fully qualified).

3. GLOSSARY GLOSS TEXT WITH «جوه». Section 1.3 wins over the glossary wording: write «داخل نفس الـ process، من غير process جديدة» for in-process (fix ch10:431; ch15 was right to avoid it but may now use the corrected gloss if it wants one; not required since the sentence defines it).

4. SKIP A GLOSS WHOSE TEXT MISLEADS IN CONTEXT. Glossary glosses are binding for wording, not for forcing them where they distort meaning. ch15:86 attaches the ch02 trust-boundary gloss («الخط الفاصل بين ما قبل موافقة المستخدم وما بعدها») to a sentence about trusting an MCP server's annotations; the sentence already explains the boundary, so drop the gloss (2.7 "sentence defines it").

5. G-TERMS THAT APPEAR ONLY IN A HEADING GET NO GLOSS. The translators' choice (permission forwarding, kill switch, defense in depth, append-only) is correct: adding a sentence violates "nothing added"; a gloss in a heading violates 2.7. Leave as is.

6. SPELLING «trade-off». The glossary spelling applies regardless of whether the source writes "tradeoff" (2.2 governs casing, not hyphenation). ch11:179 «الـ tradeoff» → «الـ trade-off»; ch15 and ch03 already use the hyphen.

7. GENDER OF ENGLISH PLURALS. 2.6: feminine singular. ch10 slips several times («الـ workers الخاصين بيها», «instances ... شغالين», «الـ 14 turns ... كلهم», «instance اتنين ... بيتواصلوا»), ch15 once («2 servers مختلفين»). Sweep each page.

8. ACCEPTED CLOSE CALLS (no change needed): fire-and-forget kept with ad-hoc gloss; whale sessions kept with gloss; zombie iterators; «في دقيقتين»; Kubernetes sentence; «من غير ما المُرسل يحس بالفرق» for transparently; mutual exclusion translated as plain «متعارضة» in the "not mutually exclusive in principle" sentence; ch11 «الـ Taxonomy من 4 أنواع» heading; masculine staleness gloss («بقى قديم») since memory is masculine per 2.6; «حقائق مقدسة»; «الاعتماد على الـ memory كعكاز»; «اليوم/أمس»; «شايل الحمل الأكبر»; «بالتبعية»; the unpacked mock-divergence quote; «ملف MEMORY.md كـ Index دائم التحميل»; ch15 no MCP gloss; TTL bare; no in-process gloss; the spelled-out fetch-wrapper nesting; "connectors" (موصّلات); «السليمة»; «الـ annotation `readOnlyHint`» masculine; «بشكل lazy»; «تحميل الإعدادات والـ Scoping»; «الـ timeout signal القديم» in the table cell. «أنهي» is accepted (ch03 uses it).

9. REJECTED CLOSE CALLS: «حصان الشغل» (calque; translate the meaning), «ليه رأي واضح» for opinionated (too weak; see ch10 item), «شغل المتابعة والتسجيل (bookkeeping)» (reverse gloss; flip it), «ما يوافقش على طول» for push back (use «يعترض»), the heavy «بالمعنى الحرفي لنظرية المعلومات» phrasing (simplify, keep the English in parentheses).

### Round 2 reviewer — ch13-terminal-ui.md, ch14-input-interaction.md, ch16-remote.md, ch17-performance.md

Structural check passed for all four chapters: heading, fence, table-row, list-item, link and bold-span counts match the source, and every code/mermaid fence is byte-identical (diffed). No banned transliterations, no «يتم», no damma-passives, no Arabic-Indic digits. Chapter H1s and all back-references match §3.10. Overall quality is high; the notes below are the cross-page rulings every chapter must apply.

RULINGS (apply everywhere):
1. "against" is never «ضد». "reconcile against X" → «بيعمل reconcile على X» / «عليه»; "check X against Y" → «يقارن X بـ Y» or «يدوّر على X في Y». «ضد» means "opposed to" and reads as a calque (ch13 lines 13/19, ch16 line 91).
2. "graceful degradation" / "progressive enhancement" as noun phrases (a named design philosophy, headings, bold lead-ins) → KEEP in English (ch14 is correct). The verb form "degrade(s) gracefully" → translate the meaning («الفشل بيحصل بشكل متدرّج من غير ما يوقّع النظام كله»), as ch16 did. Both chapters are compliant; do not change either.
3. "fail open" → KEEP in English, followed by the source's own explanatory clause (ch16 is correct; symmetric with the glossary's fail-closed).
4. "edge case", "modal / modals / modal input", "blit", "clean/dirty" (matching the `dirty` field) → KEEP in English. "chord" needs no gloss when the sentence defines it (ch14 is correct).
5. Tashkeel: only shadda and adverb tanween are allowed. Strip fatha/damma marks: «المُعلَن» → «اللي اتعلن عنه» (or «المعلَن» is still wrong: rephrase), «المظلَّل» → «المظلّل».
6. «حيث» is on the banned list (§1.4). Two instances in ch14 (lines 81, 444). Replace with «و…» or «اللي فيها».
7. Promise vocabulary: "resolves" → «بيعمل resolve» (ch17 has it right; ch13 line 348 uses «بيتحل» and must align).
8. Quote renderings: the Arabic meaning in parentheses after a quoted English string must not itself contain a nested gloss parenthesis. Translate the term inside the rendering («حساسة لزمن الاستجابة») and, if the glossary gloss is wanted, put it on the next plain-prose mention (ch14 line 418).
9. Slang that crossed the §1.4 line: «على العمياني» (ch14 line 63), «ازقّ» (ch14 line 444). Use «من غير ما يشوف اللي بيكتبه» and «ادفع». «بدري» and «ببلاش» already appear in ch05/ch07 and are accepted as glue.
10. Colloquial spellings of content words: «غرايب» → «غرائب» (content words are MSA, §1.1).
11. Gender: process/subprocess is feminine (ch16 line 59 «بيتواصل» → «بتتواصل»); memory is masculine (ch17 line 171 «memory واحدة … حجمها» → «memory واحد … حجمه»).
12. "seven event types" followed by six (ch14 line 145): keep the source's 7 faithfully. Do not silently correct content; note it for the source maintainers outside the file.
13. Numbers with English plurals: «الـ 2 keychain entries», «2 frame buffers», «2 promises» are compliant with §2.4; leave them.
14. Optional harmonisation (§6, not mandatory): ch16/ch17 start Claude Code sentences verb-first («بيحل Claude Code…»); ch13 has several lines starting «Claude Code محتاج…», «Claude Code بيلغي…». Where a one-word reorder is free, prefer verb-first for RTL rendering.

CLOSE-CALL RULINGS not already covered: ch13 — "beyond recognition" rendering overstates (see page note); all gloss placements accepted; UI chrome → «عناصر الـ UI الثابتة» accepted; "lost-release" coined phrase accepted; "semantic liveness" unpacked accepted; plural verb «بيشتغلوا» for two translated masculine nouns accepted. ch14 — headings «دعم أكثر من Protocol» / «دعم الـ Chords» accepted; illustrative quotes in the UI-string format accepted; «"الذاكرة"» for vim's scare-quoted memory accepted; «(يعني Ctrl+Up)» accepted; "zoo" metaphor must be dropped (see page note). ch16 — 9% rendering is correct (the literal reads as "cancels registrations"); split-brain gloss accepted as a helpful exception; "unwinds" simplification accepted; «بحزم» accepted; «تساهل مقصود» accepted; «عنونة» accepted. ch17 — «المال» accepted for register; watchdog/env-var reading is correct and the sentence shape is fine; no latch gloss accepted; «الدقيق» accepted; «النسخة اللي بتوصل للمستخدمين» accepted; «بيعمل throttle» accepted; «سهل تغلط فيه» accepted; «lowercase» kept accepted; «الأنظمة الـ Agentic» heading accepted; «بيسخن» accepted but the adjective «الاتصال السخن» should become «الاتصال اللي سخن».


## 2. Disagreements (translator kept their version)

- **book/ch06-tools.md** — Line 209, last sentence ("too complex to confidently exclude from safety checks")
  - source: it is too complex to confidently exclude from safety checks
  - reviewer: فهو معقد لدرجة إننا ما نقدرش نستبعده بثقة من فحوصات الأمان
  - kept: فهو معقد لدرجة إننا مش بنقدر نستبعده بثقة من فحوصات الأمان
  - translator: Agreed the original «مش نقدر» was ungrammatical and fixed it, but not with «ما نقدرش»: guide 1.2 line 43 says present-tense verb negation is always «مش + بـverb», and restricts «ما…ش» to past short verbs, negative imperatives and existentials. «مش بنقدر» is the form the guide prescribes.
  - reviewer: «مش + bare verb» is ungrammatical in this register; present negation is «مش بـ...» or «ما...ش» (guide 1.2).


## 3. Remaining close calls (still 50/50 after review)

### README.md

- **Source:** once a beta header is sent, never unset mid-session (pattern 8, README line 108)
  - chosen: مش بيتشال أبدًا طول الـ session
  - alternative: مش بيتشال تاني طول الـ session (reviewer's exact wording)
  - why: Took the reviewer's verb fix (يتشال for 'unset') but kept «أبدًا» instead of «تاني» because the source says 'never', not 'again'; the two readings are near-identical and either is acceptable.

- **Source:** how production AI tools actually work (Who This Is For, line 29)
  - chosen: أدوات الـ AI اللي في الـ production
  - alternative: الـ AI tools اللي في الـ production
  - why: Reviewer's still-debatable item (f). 'AI tools' here is ordinary English (software products), not the book's technical 'tool' abstraction, so translating avoids confusing it with the tool-system term used in ch06. Kept as is; a second opinion is reasonable.

- **Source:** The 10 Patterns list (lines 101-110): 'start read-only tools…', 'partition tools by safety…', 'freeze at startup…'
  - chosen: 2nd-person imperative (ابدأ تشغيل، قسّم، جمّده)
  - alternative: descriptive present (بيبدأ تشغيل، بيقسّم، بيتجمّد)
  - why: Reviewer's still-debatable item (d). The source mixes descriptive items (1, 4, 6, 9) with imperative ones (2, 3, 10); the translation mirrors each item's own mood rather than normalising. Mirroring is faithful but a uniformly descriptive list would read more evenly.

### book/ch01-architecture.md

- **Source:** Memory feeds into the query loop… / Memory is how Claude Code "remembers"…
  - chosen: الـ Memory بيدخل للـ query loop… / وعن طريق الـ Memory…
  - alternative: Memory بيدخل للـ query loop… (bare, like AppState per ruling 9)
  - why: Ruling 9 makes AppState bare when it stands alone as a name; Memory is also a named abstraction but the page uses «الـ Memory». Reviewer did not flag it, so I kept it, but the two abstraction names are now treated differently on the same page.

- **Source:** Two tiers match two access patterns.
  - chosen: مستويين لأن فيه access patterns اتنين مختلفين.
  - alternative: مستويين لأن فيه نمطين مختلفين للوصول للـ state.
  - why: Reviewer's wording keeps the English plural with «اتنين» after it, which is grammatical but slightly unusual; a fully Arabic paraphrase reads smoother but drops the searchable term 'access pattern'. Applied the reviewer's version.

- **Source:** State (two layers) … the two-tier architecture / the API layer that the query loop calls
  - chosen: **4. الـ State** (طبقتين) … architecture من مستويين (two-tier) … الـ API layer
  - alternative: Use «مستويين» in the bold lead-in too, so 'layer' and 'tier' are not both rendered as different Arabic words on one page
  - why: Reviewer's still-debatable item (g). The guide maps layer→طبقة when translated and tier→مستوى, so the page follows the guide, but a reader meets «طبقتين» in the lead-in and «مستويين» two sentences later for the same split.

- **Source:** all transparent to the rest of the system
  - chosen: وباقي النظام مش بيحس بالفرق بينها
  - alternative: وكلها شفافة بالنسبة لباقي النظام (matches ch04's «شفافية الـ provider»)
  - why: Reviewer accepted both renderings, but ch01 (meaning-first) and ch04 (noun «شفافية») now use different surface forms for the same concept; a second opinion on whether to unify is reasonable.

### book/ch02-bootstrap.md

- **Source:** startup does not pay for modules it might never use (line 37)
  - chosen: ممكن ما يستخدمهاش أبدًا
  - alternative: ممكن ما يحتاجهاش أبدًا (reviewer's wording)
  - why: Applied the reviewer's ما…ش grammatical fix but kept the source verb 'use' rather than 'need'; both read naturally, the difference is a hair of fidelity vs. the reviewer's exact string.

- **Source:** frozen into an immutable snapshot, and used for the rest of the session (line 154)
  - chosen: وبتفضل هي المستخدمة لباقي الـ session
  - alternative: وبتتستخدم لباقي الـ session
  - why: Reviewer's phrasing avoids the damma passive but is slightly wordier; the guide's own colloquial passive («بتتستخدم») is shorter and equally on-register. Either is fine.

- **Source:** Capture early input before yielding. (line 253, bold lead-in)
  - chosen: احفظ الـ input المبكر قبل ما تسيب التحكم.
  - alternative: احفظ الـ input المبكر قبل ما تبدأ أي شغل async.
  - why: 'yielding' here means giving control back to the event loop, not the generator keyword; «تسيب التحكم» keeps the abstraction, the alternative spells out the concrete meaning the paragraph already gives.

- **Source:** Every component from the six abstractions -- the query loop, ... -- must be initialized before the user sees a cursor. (line 3)
  - chosen: …(مفاهيم أساسية بتخبّي التفاصيل وراها)، يعني الـ query loop والـ tool system والـ state layers والـ hooks والـ memory، لازم يتهيّأ…
  - alternative: Split into two sentences: enumerate the five components first, then the 'must be initialized before the cursor' sentence.
  - why: The «يعني» apposition sits between a gloss parenthetical and the main verb, so the sentence is long; a two-sentence split would be easier to read but drifts further from the source's single sentence.

### book/ch03-state.md

- **Source:** 3 memoized async functions in `context.ts` (line 245)
  - chosen: معمول لها memoize (بتحسب النتيجة مرة واحدة وتحتفظ بيها)
  - alternative: معمول لها memoize (يحسب النتيجة مرة واحدة ويحتفظ بيها)
  - why: Ruling 5 gives the feminine form for 'memoized' after a feminine subject. Here the term is the bare verb 'memoize' in an Arabic passive construction, so the gloss could describe the verb (masculine) or the functions (feminine). Went feminine to match the ruling and the surrounding 'كل واحدة بتتحسب', but either agreement is defensible.

- **Source:** Why not send all beta headers always? (line 118)
  - chosen: ليه مش بنبعت كل الـ beta headers على طول؟
  - alternative: ليه مانبعتش كل الـ beta headers على طول؟
  - why: Ruling 2 restricts ما…ش to past tense, negative imperatives, existentials and ماينفعش. The rhetorical 'why not X?' is present/subjunctive, so it falls under مش + verb; but «ليه مانبعتش» is the more idiomatic Egyptian rhetorical question and the ruling did not explicitly address this shape.

- **Source:** the cycle is broken (line 249)
  - chosen: الـ cycle بيتفك
  - alternative: الـ cycle بيتكسر
  - why: Reviewer approved «يفك» for cycles vs «يكسر» for cache; kept that. A second reader might prefer «بيتكسر» to mirror the source verb 'broken' literally, since the same sentence already uses 'بيفك circular dependency' two clauses earlier.

### book/ch04-api-layer.md

- **Source:** it gets one clean retry at 64K (line 182)
  - chosen: بياخد retry واحد بحد 64K
  - alternative: بياخد retry واحد من الأول بحد 64K
  - why: 'clean' could mean 'a single retry with no further escalation' (reviewer's reading, now applied) or 'a fresh request from scratch' (my original). The source does not disambiguate; the mechanism (re-issuing the request with max_tokens=64K) fits either.

- **Source:** Each conditional here is a runtime bit that would otherwise multiply the Blake2b prefix hash variants (2^N). (line 119, Arabic gloss of the blockquoted comment)
  - chosen: ولو اتحط قبل الـ boundary كان هيضاعف …
  - alternative: ولولا كده كان هيضاعف … (literal 'otherwise')
  - why: The reviewer's version makes the causal point explicit and matches the surrounding paragraph, but it inserts 'before the boundary' into a quoted comment that does not literally say it. A literal «ولولا كده» keeps the quote faithful at the cost of being slightly opaque.

- **Source:** This layer … / The API layer sits at the foundation (lines 5 and 213)
  - chosen: «الطبقة دي» when the source says 'this layer'; «الـ API layer» when the source names the component
  - alternative: Use «الـ API layer» / «الـ layer دي» everywhere for one consistent form
  - why: Reviewer ruling 8 accepts the split (translated when generic, English when part of the component name), but flagged it as still-debatable (g). Both forms appear in the same chapter.

- **Source:** via a single transparent interface (line 5)
  - chosen: من خلال interface واحدة شفافة
  - alternative: من خلال interface واحدة باقي النظام مش بيحس بالفرق وراها
  - why: ch01 renders 'transparent' meaning-first in prose; ch04 keeps the literal adjective. Reviewer accepted both, but a second reader may prefer one rendering across the book.

### book/ch05-agent-loop.md

- **Source:** a `Continue` (the loop iterates)
  - chosen: `Continue` (الـ loop بيلف لفّة جديدة)
  - alternative: `Continue` (الـ loop بيدخل iteration جديدة)
  - why: Reviewer's suggestion is vivid and clear; the alternative reuses the KEEP term `iteration` that the chapter's tables and example already use heavily (Iteration 1/2/3), which may be more consistent for readers mapping the parenthetical to the State table's `transition` row.

- **Source:** Alongside the mutable `State` and the injectable `QueryDeps`
  - chosen: وجنب الـ object `State` اللي هو mutable والـ type `QueryDeps` اللي بيتحقن
  - alternative: وجنب الـ `State` الـ mutable والـ `QueryDeps` الـ injectable
  - why: Reviewer's version keeps `mutable` (KEEP) but renders `injectable` as a relative clause, so the two adjectives are still treated asymmetrically within one phrase; the alternative keeps both as English adjectives matching the later parenthetical «(mutable state، و immutable config، و injectable deps)», at the cost of an «الـ» directly before a backtick (guide 2.3) unless a category noun is inserted.

### book/ch06-tools.md

- **Source:** if two concurrent tools both modify the working directory, which wins?
  - chosen: مين اللي تكسب؟
  - alternative: أنهي واحدة تكسب؟
  - why: Applied the feminine-singular agreement ruling, but «مين» is normally a person-question word; «أنهي واحدة» is more idiomatic for a thing yet less punchy. Kept «مين» for rhythm.

- **Source:** The sub-agent variant of ToolUseContext is particularly revealing.
  - chosen: بتكشف حاجات كثيرة عن التصميم
  - alternative: بتقول كثير عن التصميم (original)
  - why: Changed on my own under ruling 8 (no adverbial «كثير»). The original was arguably an object, not an adverb, so the change is defensible either way; flagging since the reviewer did not request it.

- **Source:** preventing death by a thousand cuts / small enough to avoid context bloat
  - chosen: عشان الـ context ما يموتش بالتقسيط / عشان الـ context ما يتضخمش
  - alternative: عشان الـ context مش يموت بالتقسيط
  - why: Subjunctive negation after «عشان» uses «ما…ش», which guide 1.2 does not list, but the reviewer accepted both instances and «عشان … مش يـ» reads worse. Left as is.

### book/ch07-concurrency.md

- **Source:** "pure read" (table rows 314-316 and line 48)
  - chosen: قراءة بحتة
  - alternative: للقراءة فقط (read-only), which the page already uses for Bash's read-only commands
  - why: «بحتة» is the correct collocation and avoids the «خالص» regex alarm, but the page now has two near-synonyms for the read-only idea («قراءة بحتة» for pure-read tools vs «للقراءة فقط» for read-only commands). Kept distinct because the source also distinguishes "pure read" from "read-only", but a second opinion on whether readers benefit from that distinction would help.

- **Source:** "The implementation cost is a simple array walk" (line 385)
  - chosen: مجرد لفّة بسيطة على array
  - alternative: مجرد loop بسيط على array
  - why: «لفّة» matches the page's «بيلف على» for iterate and reads naturally, but it is slightly colloquial next to the more neutral «loop» the book keeps in English elsewhere; either would be acceptable per the guide.

### book/ch18-epilogue.md

- **Source:** a problem that will evolve significantly (line 109)
  - chosen: لمشكلة هتتطوّر بشكل كبير
  - alternative: لمشكلة هتتطوّر كثير (original)
  - why: Changed under the spirit of ruling 8 (no adverbial «كثير»), but the ruling literally targets "often", not "significantly"; «كثير» here was colloquial-natural, and «بشكل كبير» is slightly more formal. Either is defensible.

- **Source:** they point toward where the field is going (line 91)
  - chosen: وبتشير لفين المجال رايح
  - alternative: وبتشير على المجال رايح فين
  - why: Reviewer's exact wording adopted. The alternative keeps the original clause order with the MSA verb; the chosen form fronts «لفين», which is punchier but slightly more colloquial in word order.

### book/ch08-sub-agents.md

- **Source:** L80: "shown inline or as an attachment to avoid busting the prompt cache"
  - chosen: (بتتعرض inline، أو كـ attachment عشان الـ prompt cache يفضل سليم من غير cache bust)
  - alternative: (بتتعرض inline أو كـ attachment عشان ما تكسرش الـ prompt cache (cache bust))
  - why: Reviewer asked to move the «(cache bust)» tag to L80, but the literal placement produced nested parentheses and kept «عشان ما تكسرش» (a present ما…ش form the guide reserves for past/imperative/existential). I rephrased to a positive clause with the tag inline. Meaning is preserved; a reviewer may prefer the tag in its own parentheses.

- **Source:** L712: "so the model does not waste turns trying to circumvent it"
  - chosen: ، بدل ما الـ model يضيّع turns في محاولة الالتفاف عليه
  - alternative: عشان الـ model مايضيّعش turns في محاولة الالتفاف عليه
  - why: Purpose clause with negation. Egyptian idiom wants «عشان ما يضيّعش», but guide 1.2 limits ما…ش to past/imperative/existential and «عشان مش يضيّع» sounds off. «بدل ما» (instead of) avoids negation and reads naturally, but shifts 'so that…not' to 'instead of'. Also applied the same reasoning to L145/L568/L606 where plain present «مش بيعرف / مش بتعرف» was unambiguous.

- **Source:** L147 fallback guard: "the fallback catches edge cases"
  - chosen: والـ fallback guard بيلقط الحالات الشاذة
  - alternative: والـ fallback بيلقط الحالات الشاذة
  - why: Ruling 2 lists «الـ fallback guard» as a canonical form, so I added «guard» to the bare «fallback». The source says just 'the fallback'; the addition is one word and matches the ruling's phrasing, but it is a small addition to the source.

### book/ch09-fork-agents.md

- **Source:** complete most quick tasks synchronously (where the streaming output is useful feedback)
  - chosen: بشكل synchronous (في المقدمة، وهنا الـ streaming output بيكون feedback مفيد)
  - alternative: بشكل synchronous (في المقدمة) (وهنا الـ streaming output بيكون feedback مفيد)
  - why: Reviewer's suggested «(في المقدمة)» would sit next to the source's own parenthetical, stacking two parentheses (guide 2.7). Merged them into one; the gloss and the author's aside now share a parenthetical, which slightly blurs which part is the author's.

- **Source:** But what if the child is taking too long?
  - chosen: لكن إيه اللي يحصل لو الـ child أخد وقت طويل؟
  - alternative: لكن إيه اللي يحصل لو الـ child بياخد وقت طويل؟
  - why: Took the reviewer's past-tense «أخد» (idiomatic Egyptian conditional). Source is present continuous; «بياخد» would be closer literally but reads less natural after «لو».

### book/ch12-extensibility.md

- **Source:** L155: "A blocking hook forces continuation."
  - chosen: والـ hook اللي بيرجّع blocking result هنا بيجبر الـ model يكمّل.
  - alternative: والـ hook اللي بيرجّع exit code 2 هنا بيجبر الـ model يكمّل.
  - why: exit code 2 is concrete and matches the Stop Hooks section (L292), but it only applies to command hooks; prompt/agent/HTTP hooks block via {ok:false} or JSON, so the generic 'blocking result' is more faithful to the source. Kept the reviewer's wording.

### book/ch10-coordination.md

- **Source:** The most common failure mode is jumping from research directly to implementation (line 330) / failure modes -- all for a throughput requirement (line 473)
  - chosen: Bare «أشهر failure mode» at line 330 (per reviewer), with the glossary gloss «(أشكال الفشل المحتملة)» staying on the plural at line 473
  - alternative: Move the gloss to line 330 as the true first mention («أشهر failure mode (شكل الفشل المحتمل)») and strip it from 473
  - why: 2.7 says gloss the first mention, and 330 now precedes 473. The reviewer explicitly accepted the bare term at 330, and a gloss hanging off a superlative reads awkwardly, so I followed the reviewer; a strict reading of 2.7 would flip it.

- **Source:** And a unified communication protocol that ties them all together.
  - chosen: وكمان communication protocol موحّد بيربطها كلها ببعض
  - alternative: و communication protocol موحّد بيربطها كلها ببعض
  - why: Reviewer proposed «وكمان» to replace the added «وفوق ده كله». «وكمان» carries a faint 'also' the source lacks; plain «و» + space is closer but starts the fragment with a bare Latin word after a one-letter particle, which reads oddly in a list of sentence fragments.

- **Source:** 292 agents in 2 minutes reaching 36.8GB of RSS
  - chosen: 292 agent في دقيقتين بيوصلوا لـ 36.8GB
  - alternative: 292 agent في دقيقتين بتوصل لـ 36.8GB
  - why: Reviewer accepted «في دقيقتين» and did not flag the verb. Strict 2.6 (English plurals feminine singular) would give «بتوصل», but the noun is singular «agent» after a digit, where masculine plural agreement is how Egyptian speech handles a counted singular. Left as accepted.

### book/ch11-memory.md

- **Source:** The architectural nesting is deliberate (line 217)
  - chosen: وإن الـ team memory يكون جزء داخل الـ auto-memory في الـ architecture أمر مقصود:
  - alternative: Reviewer's exact wording: «وإن الـ team memory جزء داخل الـ auto-memory بالشكل ده مقصود:»
  - why: Both fix the التداخل (overlap) mis-sense. Mine keeps the 'architectural' qualifier explicit and reads as a complete clause; the reviewer's is shorter but «بالشكل ده» is vague about what 'this way' refers to. Either is acceptable.

- **Source:** in a way that raw timestamps do not (line 312)
  - chosen: بشكل الـ timestamps الخام مش بتقدر عليه
  - alternative: بطريقة الـ timestamps الخام مش بتقدر عليها
  - why: Took the reviewer's masculine «بشكل ... عليه». The feminine «بطريقة ... عليها» also agrees grammatically; the real fix was replacing the weak «بتعملها» with «بتقدر عليه/عليها». Cosmetic.

- **Source:** This two-tier architecture (line 209)
  - chosen: الـ architecture من مستويين دي
  - alternative: الـ architecture الـ two-tier (من مستويين) دي
  - why: Not in the reviewer's list; I removed the reverse-format gloss «مستويين (two-tier)» under ruling 2. Chose plain translation since 'two-tier' is an ordinary adjective and line 149 already says «على مستويين» without the English. If a reader might search 'two-tier', the English-first form is the alternative.

### book/ch15-mcp.md

- **Source:** The Chrome MCP server and Computer Use MCP server both use this pattern.
  - chosen: الـ Chrome MCP server والـ Computer Use MCP server الاتنين بيستخدموا الـ pattern ده
  - alternative: الـ Chrome MCP server والـ Computer Use MCP server الاتنين بيستخدما الـ pattern ده
  - why: Two named singular English nouns coordinated, not an English plural, so 2.6 feminine-singular does not strictly apply; «الاتنين بيستخدموا» is the natural Egyptian form but a strict reading of ruling 7 might want dual/feminine agreement. Left as is; flagging since the ruling asked for a per-page sweep.

- **Source:** to prevent 30 servers from independently discovering the same expired token
  - chosen: عشان 30 servers ما تروحش كل واحدة لوحدها تكتشف نفس الـ token المنتهي
  - alternative: عشان 30 servers ما يروحوش كل واحد لوحده يكتشف نفس الـ token المنتهي (previous)
  - why: Changed under ruling 7 (feminine singular for English plurals) even though the reviewer did not flag this line; the masculine plural arguably read more naturally with «كل واحد لوحده», so worth a second opinion.

### book/ch13-terminal-ui.md

- **Source:** Claude Code needs a reactive UI. (line 7, ruling 14 verb-first harmonisation)
  - chosen: محتاج Claude Code لـ UI من نوع reactive.
  - alternative: Claude Code محتاج UI من نوع reactive.
  - why: Verb-first per ruling 14 required adding «لـ» after «محتاج» to read naturally; the original noun-first form was already compliant. Either is acceptable; applied the reorder for RTL consistency with ch16/ch17.

- **Source:** the node could have painted over non-sibling cells (line 145)
  - chosen: cells تابعة لـ nodes مش من الـ siblings الخاصين بيه
  - alternative: cells تابعة لـ nodes من خارج الـ subtree الخاص بأبوه
  - why: Reviewer's wording is accurate but slightly heavy; a looser paraphrase might read easier but drifts from the source's 'sibling' framing. Kept the reviewer's version.

### book/ch14-input-interaction.md

- **Source:** Line 434: "when a new terminal quirk surfaces"
  - chosen: «ولما terminal معين يطلع فيه سلوك غريب جديد»
  - alternative: «ولما terminal معين تطلع فيه غرابة جديدة» (reusing the noun «غرائب» that lines 9 and 79 now use for the same source word 'quirks')
  - why: The reviewer's phrasing reads naturally, but 'quirk' is now rendered as the noun «غرائب» twice and as the phrase «سلوك غريب» once. A reader tracking the term across the chapter may want one rendering; the singular «غرابة» is slightly stiffer, which is why the reviewer's wording was kept.

- **Source:** Lines 264/456: "pure state machine"
  - chosen: «state machine من نوع pure»
  - alternative: «pure state machine» kept whole in English, matching how the glossary keeps 'pure function'
  - why: Both keep the FP term in Latin script. «من نوع pure» matches the chapter's existing pattern («من نوع typed», «من نوع cooperative scheduling»), but the whole-phrase form is closer to what a reader would search for.

### book/ch16-remote.md

- **Source:** Remote Control (H1 line 1, H2 line 190, line 202)
  - chosen: «عن بُعد» with the damma kept
  - alternative: «عن بعد» with the damma stripped per ruling 5
  - why: Ruling 5 says strip fatha/damma, but «بُعد» is the canonical spelling fixed in style-guide §3.10 (line 656), the README table, ch08, ch12, ch15 and ch18, and the damma disambiguates بُعد (distance) from بَعد (after). Changing it only in ch16 would break the cross-book H1 match the reviewer already passed; if the damma should go, it needs a book-wide ruling.

### book/ch17-performance.md

- **Source:** The nuclear option `DANGEROUS_uncachedSystemPromptSection(...)`
  - chosen: أما الخيار الأخطر `DANGEROUS_...`
  - alternative: أما خيار الطوارئ `DANGEROUS_...`
  - why: Reviewer's «الأخطر» applied. «الأخطر» reads as 'most dangerous', which duplicates the DANGEROUS_ prefix; 'nuclear option' also carries 'last resort'. «خيار الطوارئ» would capture last-resort better but drifts from the source's tone. Genuinely 50/50.

- **Source:** The most impactful single optimization:
  - chosen: التحسين المنفرد الأكبر أثرًا:
  - alternative: أكبر تحسين لوحده من ناحية الأثر:
  - why: Replaced «من حيث الأثر» per ruling 6 (banned «حيث»). The chosen form is compact MSA; the alternative is more colloquial glue but longer. Either is compliant.

- **Source:** so the warmed connection uses the correct transport configuration
  - chosen: عشان الاتصال اللي سخن يستخدم إعدادات الـ transport الصحيحة
  - alternative: عشان الاتصال الجاهز يستخدم إعدادات الـ transport الصحيحة
  - why: Applied the reviewer's relative clause. «الجاهز» would avoid the warm metaphor entirely but loses the tie to the glossary verb «بيسخن» used one sentence earlier.


## 4. Translators' original close calls (before review; reviewers ruled on these)

### README.md

- **Source:** Glossed terms that appear in the README (abstractions, data flow, bootstrap, trust boundary, singleton, sticky latches, speculative execution, snapshot, lifecycle hooks ...)
  - chosen: Glossed only 4 terms, in prose/list items: trade-offs, agentic (placed right after the bold span, not inside it), backpressure, output cap. No glosses in table cells, link text, or bold lead-ins of the 10-patterns list.
  - alternative: Gloss every G-term at its first non-heading mention, including inside table cells and the terse pattern list (sticky latch, snapshot, speculative execution...).
  - why: README is an index page; table cells and telegraphic list items become unreadable with 8-word parentheticals, and for latch/snapshot the item text already says what the gloss says. Guide says 'body prose only' but does not explicitly rule table cells in or out.

- **Source:** It contains no source code from Claude Code — not a single line. / This repository does not contain any source code
  - chosen: «مافيهوش أي source code من Claude Code، ولا حتى سطر واحد» and «ومافيش فيه أي نص prompt...»
  - alternative: «مش هتلاقي فيه أي source code» or MSA «لا يحتوي على»
  - why: Guide allows ما…ش only on 'short common verbs' (ماكانش، ماحصلش); مافيهوش/مافيش are particle-based, very natural, but not literally on the closed list.

- **Source:** proprietary software / proprietary prompt text
  - chosen: «برمجيات محمية بحقوق ملكية» / «نص prompt محمي بحقوق ملكية»
  - alternative: «برمجيات مملوكة» / keep English «proprietary»
  - why: Not in glossary. «مملوكة» alone sounds incomplete in Arabic; the longer phrase is clearer legally but slightly heavier.

- **Source:** Anyone curious about how production AI tools actually work
  - chosen: «أدوات الـ AI اللي في الـ production» (tools translated)
  - alternative: «الـ AI tools» per glossary KEEP for tool
  - why: Here 'tools' means products like Claude Code, not the tool-call abstraction; keeping English could confuse it with the book's 'tool' concept. Deviates from the glossary letter.

- **Source:** Part II: The Core Loop / Part III: Multi-Agent Orchestration / Part V: The Interface / Part VI: Connectivity / Part IV: Persistence and Intelligence
  - chosen: «الـ Core Loop»، «الـ Multi-Agent Orchestration»، «الـ Interface» kept English; «الاتصال»، «الحفظ الدائم والذكاء» translated (without the '(persistence)' parenthetical the glossary prescribes, because glosses are banned in headings).
  - alternative: «الـ Loop الأساسي»، «الـ Connectivity»، «الـ Persistence والذكاء»
  - why: Part titles are not in the canonical-titles table; mixed keep/translate may look inconsistent across parts. Other pages referencing 'Part II' etc. must match whatever is final.

- **Source:** Chapter titles 5-18 (not in canonical table), e.g. 'Concurrent Tool Execution', 'Spawning Sub-Agents', 'Tasks, Coordination, and Swarms', 'Extensibility', 'MCP — The Universal Tool Protocol', 'Every Millisecond and Token Counts'
  - chosen: «تنفيذ الـ Tools بشكل Concurrent»، «عمل Spawn للـ Sub-Agents»، «الـ Tasks والتنسيق والـ Swarms»، «قابلية التوسعة — الـ Skills والـ Hooks»، «MCP — البروتوكول الموحّد للـ Tools»، «الأداء — كل ملي ثانية وكل Token بيفرقوا»
  - alternative: «الـ Concurrent Tool Execution»، «تشغيل Sub-Agents»، «الـ Coordination»، «البروتوكول العام»، «... ليهم حساب»
  - why: These become the canonical H1s when chapters 5-18 are translated; 'Concurrent' is deliberately not rendered «بالتوازي» since the book distinguishes concurrency from parallelism. 'Universal' = موحّد vs عام is a judgment call.

- **Source:** The heartbeat of the agent: stream, act, observe, repeat.
  - chosen: «القلب النابض للـ agent: اعمل stream، نفّذ، راقب النتيجة، وكرّر.»
  - alternative: Nominal list: «stream، تنفيذ، ملاحظة، تكرار»
  - why: Used the glossary's 'heartbeat' rendering and imperatives; 'observe' expanded to «راقب النتيجة» (one added word) because bare «لاحظ» reads oddly.

- **Source:** One agent is powerful. Many agents working together are transformative.
  - chosen: «الـ agent الواحد قوي. أما agents كتير بتشتغل مع بعض فدي نقلة نوعية.»
  - alternative: «... بيغيّروا قواعد اللعبة» / «تأثيرهم تحويلي»
  - why: 'transformative' has no clean Arabic equivalent; «نقلة نوعية» is idiomatic but a loose rendering. Also used feminine-singular agreement for 'agents' per rule 2.6 although agents act like persons.

- **Source:** AsyncGenerator as agent loop — yields Messages, typed Terminal return, natural backpressure and cancellation
  - chosen: «بيعمل yield لـ Messages، وبيرجّع Terminal كـ typed return، ومعاه backpressure (...) وإلغاء بشكل طبيعي»
  - alternative: «والـ return type الخاص بيه Terminal، والـ backpressure والإلغاء جايين معاه تلقائيًا»
  - why: Telegraphic source; 'natural' means 'falls out of the generator mechanism for free' — «بشكل طبيعي» is literal, «تلقائيًا» is closer in meaning but less faithful. Messages/Terminal are unbackticked type names in source, kept as-is.

- **Source:** 10-pattern list items mix descriptive and imperative voice (start..., partition..., freeze...)
  - chosen: Imperative 2nd-person singular where the source is imperative (ابدأ شغّل، قسّم، جمّده), descriptive elsewhere; item 8 'never unset mid-session' rendered «مش بيتلغي أبدًا أثناء الـ session».
  - alternative: All descriptive («بيبدأ يشغّل...») or «ما تشيلوش في نص الـ session»
  - why: Source voice is ambiguous (imperative vs. note-style). 'unset' for a header: «يتلغي» vs «يتشال»; avoided «نص» as too colloquial.

- **Source:** staleness (ch.11 row) / parody/meme (disclaimer) / deep dive
  - chosen: «التقادم (staleness)»، «محاكاة ساخرة (parody/meme)»، «نظرة متعمقة» / «أقسام متعمقة»
  - alternative: Keep plain English «الـ staleness»، «parody/meme» with no Arabic; «deep dive» kept English
  - why: Terms not in glossary. Arabic-first with English in parentheses is the reverse of the guide's gloss format and technically an addition, but a 2-year dev may not know 'staleness' or 'parody'.

- **Source:** 36 AI agents analyzed nearly two thousand TypeScript files in four phases / 3 editorial reviewers
  - chosen: «وحلّلت 36 AI agents ما يقرب من 2,000 ملف TypeScript على 4 مراحل» (verb-first to avoid a digit/Latin line start, spelled-out number to digits); «3 مراجعين تحريريين» translated as human-style noun while 'revision agents' kept English.
  - alternative: «حوالي ألفين ملف»; «3 editorial reviewers» kept English since they are also agents
  - why: Guide says spelled-out counts become digits, but 'nearly two thousand' is an approximation and 2,000 looks falsely exact; reviewers are AI agents in context but source calls them 'reviewers'.

### book/ch01-architecture.md

- **Source:** deterministic output
  - chosen: «و output من نوع deterministic» (kept English, no gloss because the glossary has no entry)
  - alternative: Translate the meaning: «و output ثابت لنفس المدخلات», or add an ad-hoc gloss
  - why: Not in the glossary. A reader with 2 years of experience may not know 'deterministic', but the guide forbids ad-hoc glosses. The reviewer may want a glossary entry with a gloss.

- **Source:** Glosses attached to plural first mentions: 'Six abstractions', 'compile-time feature flags', 'side effects'
  - chosen: For abstractions and feature flags I prefixed the glossary gloss with the singular term: «6 abstractions (الـ abstraction مفهوم أساسي بيخبّي التفاصيل وراه)». For side effects I used the gloss verbatim.
  - alternative: Use the glossary gloss strictly verbatim everywhere, even when a singular gloss sits after a plural term
  - why: The glossary glosses are worded in the singular, so they read oddly after a plural. Prefixing is a small deviation from 'use the gloss text given', and the three cases are not fully consistent. The reviewer should pick one form.

- **Source:** A mutable singleton (`STATE`) holds ~80 fields...
  - chosen: Split into «المستوى الأول singleton (gloss) اسمه `STATE`، وهو mutable (gloss). شايل ~80 field...», which breaks up the phrase 'mutable singleton' and turns the source's parentheses around `STATE` into «اسمه»
  - alternative: «mutable singleton (`STATE`)» kept whole, with both glosses stacked or one dropped
  - why: Two first-mention glosses land on one two-word phrase. Keeping the phrase whole would put three parentheticals in a row. Splitting reads better but bends the rules on keeping an English noun phrase whole and on 1:1 parentheses.

- **Source:** session-level infrastructure / infrastructure state / four different infrastructure paths
  - chosen: Kept English «الـ infrastructure» throughout («الـ infrastructure state»، «4 مسارات infrastructure»)
  - alternative: «البنية التحتية»
  - why: Not in the glossary. 'infrastructure state' is contrasted with 'reactive state' / 'UI state' as a named pair, so I kept it English for symmetry. «البنية التحتية» is widely understood and may read more easily.

- **Source:** 5. Memory -- The agent's persistent context across sessions.
  - chosen: Skipped the glossary first-mention gloss for Memory and translated the defining sentence: «هو الـ context الدائم اللي الـ agent بيحتفظ بيه بين الـ sessions»
  - alternative: Add the gloss «(السياق اللي الـ agent بيحتفظ بيه بين الـ sessions)» on first mention
  - why: The source sentence is the definition, so adding the gloss would duplicate it word for word. I also wrote «الـ context» (a KEEP term), while the glossary gloss itself uses «السياق». That is a small internal inconsistency in the guide.

- **Source:** the entire loop is re-entrant
  - chosen: «الـ loop كله re-entrant (ينفع يتنادى تاني قبل ما يخلّص)», using the glossary gloss
  - alternative: Drop the gloss, or gloss according to what the author means (the loop feeds its results back in and calls the model again)
  - why: The author uses 're-entrant' loosely to mean the loop re-enters itself with updated context. The glossary gloss gives the strict CS definition, which does not match the paragraph that follows and could confuse the reader.

- **Source:** User-defined lifecycle interceptors ... short-circuit the entire query loop
  - chosen: Kept «interceptors» and «تعمل short-circuit للـ query loop كله» in English
  - alternative: «نقاط اعتراض بيعرّفها المستخدم» and «تنهي الـ query loop كله قبل ما يكمل»
  - why: Neither term is in the glossary. Developers know both from HTTP interceptors and boolean short-circuit, but Arabic renderings may be easier for the target reader. With the English kept, the first sentence of the Hooks item becomes dense with English terms.

- **Source:** all transparent to the rest of the system
  - chosen: Translated the meaning: «وباقي النظام مش بيحس بالفرق بينها»
  - alternative: Literal «وكلها شفافة بالنسبة لباقي النظام»
  - why: In Arabic «شفافة» suggests 'visible/open', which is the opposite of the CS sense here ('invisible to'). I chose the meaning over the word, which departs from the literal text.

- **Source:** permission model (in 'agent loop, tool system, and permission model are entirely provider-agnostic')
  - chosen: «نموذج الصلاحيات», with «provider-agnostic» kept English and unglossed
  - alternative: «نظام الصلاحيات» (the glossary term for 'permission system'), or keep 'model' in English
  - why: The glossary keeps 'model' in English to mean the LLM, so using «الـ model» here would mislead. «نموذج» avoids that but introduces a word not used elsewhere in the chapter. Merging it with «نظام الصلاحيات» may be cleaner. 'provider-agnostic' has no gloss entry and may be unclear to juniors.

- **Source:** Negative imperatives and 'there is no': 'Do not put this logic...', 'Do not scatter...', 'There is no separate phase'
  - chosen: «ماتحطش»، «ماتوزّعش»، «مفيش مرحلة منفصلة»
  - alternative: «مش لازم تحط»، «تجنّب إنك تحط»، or MSA «لا تحط»، and «مش موجودة مرحلة منفصلة»
  - why: The guide's closed list allows ما…ش only on short past-tense verbs and gives no form for a negative imperative or for 'there is no'. These are the natural Egyptian forms but fall outside the closed list, and MSA «لا تضع» would clash with the register.

- **Source:** Heading 'The Six Key Abstractions' and bold lead-in 'The self-describing tool interface.'
  - chosen: «## الـ 6 Abstractions الأساسية» (digit plus 'Key' translated) and «**الـ tool interface اللي بتوصف نفسها.**» ('self-describing' translated, 'tool interface' kept)
  - alternative: «الـ Six Key Abstractions» and «الـ self-describing tool interface», both kept whole in English
  - why: The guide says to keep an English noun phrase whole, but also to turn spelled-out counts into digits and to translate ordinary words. 'Key' and 'self-describing' read as ordinary modifiers rather than part of a term, so this was a judgement on where the term boundary sits.

- **Source:** Claude Code runs arbitrary shell commands on your machine.
  - chosen: «بيشغّل Claude Code أي أوامر shell على جهازك»
  - alternative: «أوامر shell عشوائية», the wording in the style guide's own RTL example
  - why: «عشوائية» means 'random', which mistranslates 'arbitrary' in the security sense of 'any command whatsoever'. I put accuracy ahead of the guide's example sentence. The reviewer should make this consistent if the phrase appears on other pages.

### book/ch02-bootstrap.md

- **Source:** Every component from the six abstractions -- the query loop, the tool system, the state layers, hooks, memory --
  - chosen: الـ 6 abstractions (مفهوم أساسي بيخبّي التفاصيل وراه) ... والـ Memory — glossed abstraction with the glossary's singular wording after a plural term; capitalised Memory but gave it NO gloss; moved the dash-aside list to after a colon at the end of the sentence.
  - alternative: Add the Memory gloss (السياق اللي الـ agent بيحتفظ بيه بين الـ sessions) as the glossary marks it G; or reword the abstraction gloss to plural.
  - why: Two parenthetical glosses inside one enumerating sentence made it unreadable; Memory was already explained in ch01. Reviewer may want strict once-per-page glossing for Memory.

- **Source:** before the user sees a cursor
  - chosen: قبل ما المستخدم يشوف الـ cursor
  - alternative: المؤشر
  - why: 'cursor' is not in the glossary; kept English as developers say it, but المؤشر is a common, clear Arabic word.

- **Source:** which operations overlap, which block, and which are deferred
  - chosen: وأيها بتوقّف اللي بعدها لحد ما تخلص
  - alternative: وأيها بتعمل block
  - why: 'block' as a verb is a technical term, but 'بتعمل block' alone read as vague; chose an explanatory Arabic rendering at the cost of slight expansion.

- **Source:** Commands, agents, hooks, and plugins (and 'command loading', table cell 'Commands, agents, hooks, plugins')
  - chosen: الأوامر والـ agents والـ hooks والـ plugins
  - alternative: الـ commands والـ agents ...
  - why: Glossary says command TR = أمر/أوامر (listed for shell commands). Here they are Claude Code slash commands, and the mixed Arabic/English list looks slightly inconsistent.

- **Source:** The `init()` function is memoized / Migrations are idempotent
  - chosen: Adapted glossary gloss gender to the noun: memoized (بتحسب النتيجة مرة واحدة وتحتفظ بيها), idempotent (تكرار تنفيذها بيدّي نفس النتيجة)
  - alternative: Exact glossary wording in masculine: (يحسب النتيجة مرة واحدة ويحتفظ بيها) / (تكرار تنفيذه...)
  - why: Guide says use the glossary gloss text so pages agree, but masculine wording right after a feminine subject (function / migrations) reads as a grammar error.

- **Source:** environment variables can be poisoned / a malicious environment poisons the application
  - chosen: الـ environment variables ممكن تتسمّم / بيئة خبيثة بتسمّم التطبيق
  - alternative: ممكن حد يتلاعب بيها / بيئة خبيثة بتأثر على التطبيق
  - why: Kept the poisoning metaphor literally since 'poisoning' is an established security term (cache poisoning etc.), but it may sound like a calque to some readers.

- **Source:** the frozen snapshot is the only source of truth for permission decisions
  - chosen: الـ snapshot المجمّد هو المرجع الوحيد المعتمد في قرارات الصلاحيات
  - alternative: الـ source of truth الوحيد / المصدر الوحيد للحقيقة
  - why: 'source of truth' is a recognised engineering term not in the glossary; translated by meaning to avoid the calque 'مصدر الحقيقة', but keeping English would aid searchability.

- **Source:** ## The Startup Timeline / ## Phase 2: Parse and Trust (init.ts) / ## The Migration System
  - chosen: ## الخط الزمني لبدء التشغيل / ## المرحلة 2: الـ Parse والـ Trust (init.ts) / ## نظام الـ Migration
  - alternative: ## الـ Startup Timeline / ## المرحلة 2: الـ Parsing والثقة / ## الـ Migration System
  - why: Timeline is not in the glossary (translated it; startup is TR). For 'Parse and Trust' kept both English to mirror the other phase headings. 'system' is TR per glossary so Migration System was split, which bends the 'keep noun phrase whole' rule.

- **Source:** Capture early input before yielding.
  - chosen: احفظ الـ input المبكر قبل ما تعمل yield.
  - alternative: قبل ما تسيب التحكم للـ event loop
  - why: 'yielding' here means yielding control to the event loop via async work, not generator yield; glossary says yield KEEP with 'يعمل yield', but a 2-year reader may misread it as the generator keyword.

- **Source:** Bold list lead-ins: Module-level subprocess dispatch. / Promise parallelism in setup. / Post-render deferred prefetches.
  - chosen: **الـ Module-level subprocess dispatch.** / **الـ Promise parallelism في الـ setup.** / **الـ Deferred prefetches بعد الـ render.**
  - alternative: Translate them fully, e.g. **تشغيل الـ subprocesses على مستوى الـ module.**
  - why: Treated them as named techniques (kept mostly English, source casing), but they are descriptive phrases rather than searchable terms, so a fuller Arabic rendering might be easier to read.

- **Source:** in at least a dozen places / roughly a dozen fast paths
  - chosen: في 12 مكان على الأقل / حوالي 12 fast path
  - alternative: في أكتر من عشر أماكن / حوالي دستة
  - why: 'dozen' is a loose quantity; converting to the digit 12 follows the digits rule but implies more precision than the source.

- **Source:** Each dynamic import trades cold-path latency (...) for hot-path speed (...); also 'might never use' and 'If no fast path matches'
  - chosen: Split into two sentences: 'بيدفع latency في الـ cold path، لأن ... وفي المقابل بيكسب سرعة في الـ hot path، لأن ...'; used 'ممكن مش هيستخدمها أبدًا' and 'لو مافيش fast path مطابق'
  - alternative: Use the term trade-off with its gloss; 'ممكن ما يستخدمهاش'; 'لو ولا fast path طابق'
  - why: Source uses the verb 'trades', not the noun trade-off, so I did not introduce the glossed term. The guide restricts ما…ش to past verbs, which forced the slightly unusual 'ممكن مش هيستخدمها'; 'مافيش' is outside the closed colloquial list but has no natural allowed substitute.

### book/ch03-state.md

- **Source:** Chapter 2 traced the bootstrap pipeline from process start to first render. / five boolean latches ... once a feature is first activated ... flag stays true
  - chosen: Skipped the glossary first-mention glosses for 'bootstrap' and 'latch' on this page
  - alternative: Insert the glossary gloss text in parentheses at first mention as section 2.7 prescribes
  - why: In both places the source sentence itself already says what the gloss says (process start to first render; flag stays true for the rest of the session), so the gloss would be a visible redundancy. Reviewer may prefer strict consistency.

- **Source:** a process lifecycle that spans hours
  - chosen: «وعمر الـ process فيه بيمتد لساعات»
  - alternative: «الـ process lifecycle الخاص بيه بيمتد لساعات» with gloss (دورة حياة التنفيذ)
  - why: Glossary keeps 'lifecycle' for lifecycle hooks/events; here it just means how long the process lives, and the plain Arabic is more natural. Deviates from KEEP.

- **Source:** The `null` initial value means "not yet evaluated." `true` means "latched on." / meaning "not evaluated / on / never off" / no meaningful "previous state"
  - chosen: Translated the quoted phrases directly into Arabic inside the quotes («"ما اتقيّمش بعد"»، «"اتثبّت على التشغيل"»، «"state سابق"»)
  - alternative: Keep English in quotes + Arabic meaning in parentheses (section 4 quoted-strings rule)
  - why: These are the author's own paraphrases, not source-code comments, UI strings or user prompts, so I treated them as prose. Also had to use MSA «بعد» because «لسه» is banned.

- **Source:** The comment above this line reads: `AND ESPECIALLY HERE`. ... `DO NOT ADD MORE STATE HERE - BE JUDICIOUS WITH GLOBAL STATE`
  - chosen: Kept the backticked comments and added Arabic meaning in parentheses after each
  - alternative: Leave inline code alone with no Arabic meaning (strict 'add nothing')
  - why: They are source-code comments quoted in prose, which the guide says get an Arabic meaning, but they are in backticks rather than quotes, so the rule's applicability is ambiguous.

- **Source:** Sending an unrecognized header creates a different cache namespace.
  - chosen: «لو بعتّ header مش معروف، ده بيعمل cache namespace مختلف.»
  - alternative: «لو بعتّ header الـ feature الخاصة بيه مش مفعّلة / header زيادة مش محتاجه»
  - why: Source is ambiguous: 'unrecognized' by whom? Logically the point is that any extra header changes the cache key. I stayed literal rather than interpret.

- **Source:** the UI store is the source of truth for what the user chose
  - chosen: Kept «الـ source of truth» in English
  - alternative: «المرجع الأساسي» / «مصدر الحقيقة»
  - why: Not in the glossary. Developers say 'source of truth' in English and «مصدر الحقيقة» is a calque, but «المرجع» would also read fine.

- **Source:** every API call would trigger a full component tree reconciliation
  - chosen: Kept «reconciliation كاملة للـ component tree» (treated as feminine)
  - alternative: Translate as «إعادة مقارنة كاملة» or treat as masculine per the default-masculine rule
  - why: React-specific term not in glossary; kept English for searchability. Feminine agreement felt natural (عملية) but contradicts the 'everything else masculine' rule.

- **Source:** Histograms use reservoir sampling (Algorithm R) to maintain bounded memory
  - chosen: «reservoir sampling (Algorithm R)، وده عيّنة عشوائية بحجم ثابت من stream طويل، عشان...» - gloss as an inline clause, not parentheses
  - alternative: Two consecutive parentheses, or drop the gloss
  - why: The source already has a parenthetical right after the term; a second parenthetical gloss looked ugly. Gloss format deviates from section 2.7.

- **Source:** credential caches in bootstrap are cleared / Settings changes clear credential caches
  - chosen: First mention «الـ caches الخاصة بالـ credentials (بيانات الدخول)», later «الـ credential caches»
  - alternative: Keep «الـ credential caches» whole in both places with the gloss after it
  - why: Guide says never split an English noun phrase, but the gloss belongs to 'credentials' only, so I split once to attach it correctly. Slight inconsistency between the two mentions.

- **Source:** AppState (unbackticked, as a name) e.g. 'AppState flows back to bootstrap state'
  - chosen: Treated AppState as a proper name with no article («AppState بيعتمد على...»), but «الـ bootstrap state» with article
  - alternative: «الـ AppState» everywhere
  - why: It is a type name used like a proper noun; the guide's canonical heading also has 'AppState' bare. Reviewer should align this with other chapters.

- **Source:** This cache breaks a circular dependency ... the cycle is broken. / cause invalidation
  - chosen: «بيفك circular dependency ... الدايرة بتتفك»; and 'cause invalidation' rendered as «بتكسر الـ cache»
  - alternative: «بيكسر الـ circular dependency»; keep «invalidation» in English
  - why: Reserved «يكسر» for the fixed cache-bust idiom to avoid confusion, so used «يفك» for cycles. Folded 'invalidation' into the same idiom since it means the same thing here, at the cost of losing a searchable term.

- **Source:** `originalCwd`, `projectRoot`, `cwd`, ... (comma-separated inline-code lists) and indefinite terms after و
  - chosen: Arabic comma «،» between inline-code items; «و » + space before indefinite Latin terms (و NFC normalization، و reactive store)
  - alternative: Keep Latin commas between code tokens; attach و directly («وreactive store»)
  - why: Guide mandates «،» but does not cover code-only lists, and its particle table covers only definite «والـ». Chose what renders most legibly in RTL.

### book/ch04-api-layer.md

- **Source:** This layer handles more failure modes... / The API layer sits at the foundation
  - chosen: Bare "This layer" -> «الطبقة دي» (feminine, translated); named «الـ API layer» kept English and treated as masculine («الـ API layer هو الأساس»)
  - alternative: Keep «الـ layer دي» everywhere and treat layer as feminine (طبقة)
  - why: Glossary says layer is KEEP only inside a named component, and 'layer' is not in the feminine list so it defaults masculine; masculine «الـ API layer هو» sounds slightly off to an Arab ear that hears طبقة. Reviewer should decide a book-wide gender for 'layer'.

- **Source:** the bootstrap sequence / skips all agentic concerns
  - chosen: No first-mention gloss for bootstrap or agentic on this page
  - alternative: Add glossary glosses «(خطوات تجهيز البرنامج من أول تشغيل الـ process...)» and «(يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل)»
  - why: Page already carries ~16 glosses; bootstrap sits inside a 3-item list and the long gloss wrecks the sentence; 'agentic' is used adjectivally («الجانب الـ agentic»). Ch4 readers have read ch1-2. Strict reading of the guide would add them.

- **Source:** 1. **Kill switch check** -- safety valve for the most expensive model tier
  - chosen: «**الـ Kill switch check** -- صمام أمان لأغلى model tier» with no kill-switch gloss; 'model tier' kept in English
  - alternative: Add gloss (زر إيقاف طوارئ); translate tier as مستوى per glossary («أغلى مستوى من الـ models»)
  - why: Gloss would duplicate 'safety valve' in the same 6-word item. 'model tier' here is a pricing class, not the architectural 'tier = مستوى' of ch3, so I kept it as a compound English term.

- **Source:** Blockquote: > Each conditional here is a runtime bit that would otherwise multiply the Blake2b prefix hash variants (2^N).
  - chosen: Kept English comment verbatim, then Arabic meaning in parentheses inside the same blockquote paragraph; 'otherwise' rendered as «ولو كان في مكان تاني» and (2^N) as «بمقدار 2^N»
  - alternative: Translate the blockquote fully into Arabic, or put the Arabic on a second '>' line
  - why: Guide says quoted source comments stay English + Arabic in parens; applied it to a blockquote too. 'otherwise' is ambiguous (if it were before the boundary) so I made it explicit but loosely.

- **Source:** ensures a mid-session overage flip does not change the TTL
  - chosen: «لو حالة الـ overage اتقلبت في نص الـ session، الـ TTL مش هيتغير»
  - alternative: Explain it: «لو المستخدم عدّى حد الاستهلاك في نص الـ session»
  - why: Source meaning of 'overage flip' is unclear without ch3 context (billing overage status toggling). Kept 'overage' in English and literal rather than guess.

- **Source:** orchestrates the entire API call lifecycle
  - chosen: «بتنسّق دورة حياة الـ API call كلها»
  - alternative: «بتعمل orchestrate لـ ... الـ lifecycle» (glossary: orchestration KEEP, lifecycle KEEP)
  - why: Glossary keeps the nouns orchestrator/orchestration and 'lifecycle hook/event', but as a verb and a generic noun the Arabic reads far more naturally; no searchable identifier is lost.

- **Source:** async generator (~700 lines)
  - chosen: Kept source parens for the line count and delivered the gloss as a following clause: «async generator (~700 سطر)، يعني function بترجّع قيمها واحدة واحدة بشكل asynchronous.»
  - alternative: Standard parenthetical gloss right after the term, moving '~700 سطر' out of parens
  - why: Two back-to-back parentheses looked bad; this deviates from the guide's exact gloss format (parentheses) but keeps glossary wording.

- **Source:** it gets one clean retry at 64K
  - chosen: «بياخد retry واحد من الأول بحد 64K»
  - alternative: «retry واحد نضيف عند 64K» / «retry واحد بس»
  - why: 'clean' could mean 'fresh from scratch' or 'single, no further escalation'. Chose 'from scratch'; 'نضيف' felt too colloquial.

- **Source:** is the single largest cost lever in the system
  - chosen: «أكبر عامل بيتحكم في التكلفة في النظام كله»
  - alternative: «أكبر رافعة للتكلفة» (literal lever metaphor)
  - why: Literal 'lever' is a calque that does not carry in Arabic; chose meaning over metaphor, slightly losing the 'something you can pull' nuance.

- **Source:** compaction (first mention inside parentheses in Apply This; again in Looking Ahead)
  - chosen: Gloss placed at the SECOND mention («نظام الـ compaction (ضغط المحادثة...)») in Looking Ahead, not at first mention
  - alternative: Gloss at first mention, producing nested parentheses «(الـ compaction (ضغط ...)، والـ classification)»
  - why: Nested parens are unreadable; violates the letter of 'first-mention' but keeps once-per-page. Also 'classification' kept English to pair with compaction (glossary has 'classifier' KEEP).

- **Source:** The naming convention for sections is deliberately loud / Use the DANGEROUS naming convention
  - chosen: Translated 'naming convention' as «طريقة تسمية الـ sections» / «تسمية DANGEROUS» so the agreed rendering «صارخة عن قصد» agrees in gender
  - alternative: Keep «الـ naming convention» in English (then masculine: «صارخ عن قصد», breaking the glossary's fixed phrase)
  - why: Term is not in the glossary; the fixed phrase in 3.6 is feminine, implying the glossary author expected «تسمية». Also 'section' kept English (masculine) throughout since it maps to `systemPromptSection`.

- **Source:** as a side-channel notification / production resilience / creates psychological friction toward the safe default
  - chosen: «إشعار جاي من side channel منفصل»؛ «عشان النظام يصمد في الـ production»؛ «بتخلق مقاومة نفسية بتدفعك ناحية الاختيار الافتراضي الآمن»
  - alternative: «إشعار جانبي»؛ «resilience» kept English؛ «احتكاك نفسي»
  - why: Three idiom/metaphor spots where I paraphrased meaning. 'friction toward' is odd even in English (friction against leaving the default); reviewer may prefer a tighter phrasing.

### book/ch05-agent-loop.md

- **Source:** Source line 76 repeats the sentence "If the loop throws or the generator is closed via .return(), the completion notifications never fire" twice (editing artifact in the English).
  - chosen: Translated both occurrences verbatim, keeping the duplication.
  - alternative: Merge into one sentence and drop the repeat.
  - why: The rule is omit nothing / add nothing; fixing the source's redundancy is an editorial change the orchestrator should make upstream, not the translator.

- **Source:** Gloss for "withholding pattern" (glossary: الـ model بيحجب جزء من الرد لحد ما يتأكد).
  - chosen: Adapted to «الـ loop بيحجب الخطأ لحد ما يتأكد إن التعافي فشل» at the Apply This mention.
  - alternative: Use the glossary text unchanged.
  - why: In ch05 the loop withholds recoverable errors from the yield stream; the model does not withhold anything. The glossary wording would be technically wrong here, and accuracy outranks the binding gloss. Flagging so the glossary can be corrected.

- **Source:** "tombstoned so the UI removes them" (no glossary entry).
  - chosen: «بتتحط عليها علامة tombstone عشان الـ UI يشيلها»
  - alternative: Translate fully («بتتعلّم كمحذوفة») or keep bare «بتتعمل لها tombstone».
  - why: Kept the English term searchable without adding a parenthetical gloss for an unlisted term; the phrasing already explains the effect.

- **Source:** Heading «## Worked Example: "Fix the Bug in auth.ts"»
  - chosen: «## مثال عملي: "Fix the Bug in auth.ts"» with the quoted string left in English and no Arabic parenthetical.
  - alternative: Add the Arabic meaning in parentheses per the quoted-string rule.
  - why: Quoted strings normally get an Arabic parenthetical, but headings may not carry glosses/parentheticals; the same string is rendered with its Arabic meaning in the body line right after.

- **Source:** "Distinct from the `+500k` auto-continue token budget feature"
  - chosen: «مختلف عن ميزة الـ auto-continue token budget اللي بتتطلب بـ `+500k`»
  - alternative: «ميزة الـ `+500k` auto-continue token budget» (literal order).
  - why: الـ may not sit directly before a backtick, so the code span was moved into a relative clause; this adds two words but no new information.

- **Source:** "Edit is not concurrency-safe, so the streaming executor queues it"
  - chosen: Feminine agreement («الـ Edit ... بيحطها») because Edit is a tool.
  - alternative: Masculine, treating Edit as a bare identifier name.
  - why: Glossary makes tool feminine; Edit here is the tool, not the type name. The previous sentence in the same paragraph uses «tool» for Read, so consistency favored feminine.

- **Source:** "This is the seam where tests swap in fake model calls"
  - chosen: «ودي نقطة الوصل اللي الـ tests بتحقن منها model calls وهمية»
  - alternative: Keep «seam» in English or use «الفتحة».
  - why: "seam" is a testing-jargon metaphor with no glossary entry; meaning-first rendering felt clearer than a bare English word a 2-year dev would not search for.

- **Source:** "an infinite compact-fail-retry loop"
  - chosen: «infinite loop من compact، ففشل، فإعادة محاولة، وهكذا»
  - alternative: Keep the hyphenated English compound «compact-fail-retry loop».
  - why: Guide forbids interleaving Arabic inside an English multi-word term, and the hyphenated compound is ad hoc, not a real term, so it was unpacked into Arabic steps.

- **Source:** Section heading "The callModel() Loop" (no backticks in the source heading).
  - chosen: «### الـ callModel() Loop»
  - alternative: «### الـ loop الخاص بـ callModel()».
  - why: Guide says keep English noun phrases whole with the article once; splitting it would reorder the phrase. Slightly odd to read, but mirrors the source exactly.

- **Source:** "Subagents always stop." (bold lead-in, source spells it without hyphen)
  - chosen: «**الـ Subagents دائمًا بتقف.**» keeping the source's spelling and Title Case.
  - alternative: Normalise to «sub-agents» as used elsewhere in the book.
  - why: Rule 2.2 says keep the source's casing/spelling exactly; the inconsistency is the author's.

- **Source:** Table cell "How many multi-turn recovery attempts for output token limits (max 3)"
  - chosen: «عدد محاولات الـ multi-turn recovery لحدود الـ output tokens (الأقصى 3)»
  - alternative: Reword to «...بسبب الوصول لحد الـ output tokens».
  - why: Kept terse to fit a table cell; the meaning (recovery triggered by hitting output-token limits) is slightly compressed.

- **Source:** "By the time the model finishes its response text, the file contents are already in memory."
  - chosen: «في الذاكرة» (RAM sense).
  - alternative: «memory» in Latin script.
  - why: Glossary reserves Latin «memory» for the CLAUDE.md/MEMORY.md feature and «الذاكرة» for RAM; this sentence is clearly RAM, but a reader skimming the chapter's other «memory» mentions could hesitate.

### book/ch06-tools.md

- **Source:** the nervous system that translates "the model wants to run `git status`" into an actual shell command
  - chosen: kept the quoted English and added «(الـ model عايز يشغّل `git status`)» exactly as the style guide's example 11 prescribes
  - alternative: translate the quote only, or use «محتاج» instead of «عايز» inside the parenthetical
  - why: guide allows «عايز» only inside a quote rendering that mirrors informal source phrasing; followed the guide's own worked example, but it is the one place «عايز» appears in the file

- **Source:** ToolUseContext: The God Object / "It is, by any reasonable definition, a god object."
  - chosen: kept «god object» in English with no gloss (heading: «ToolUseContext: الـ God Object»)
  - alternative: gloss it on first mention, e.g. «(object واحد شايل كل حاجة)»
  - why: glossary lists «god object» as KEEP with no gloss text, and ch01 already used it bare; the source paragraph explains it anyway

- **Source:** preventing death by a thousand cuts
  - chosen: «عشان الـ context ما يموتش بالتقسيط»
  - alternative: literal «الموت بألف جرح صغير» or a plain restatement with no metaphor
  - why: guide bans calqued idioms; «الموت بالتقسيط» is a native Arabic idiom with the same meaning, but it is a slightly different image than the source

- **Source:** If the file is stale -- modified by a background process, another tool, or the user
  - chosen: «لو نسخة الـ model من الملف بقت قديمة -- يعني الملف اتعدّل عن طريق …» (adjective translated per glossary, term kept only in the H3 «اكتشاف الـ Staleness»)
  - alternative: keep the adjective in English: «لو الملف بقى stale»
  - why: glossary says adjective «stale» is TR «قديم / متقادم» but «الملف قديم» alone is ambiguous in Arabic, so I rephrased to say what is actually stale (the model's copy)

- **Source:** The failure mode is instructive
  - chosen: «والـ failure mode (شكل الفشل المحتمل) هنا فيه درس»
  - alternative: translate meaning-first without the term: «وطريقة الفشل هنا فيها درس»
  - why: glossary has «failure modes» KEEP + G in plural; adapted the gloss to singular per 2.7, but the source uses it loosely, not as the technical term

- **Source:** the matcher returns `() => true` -- fail-safe, meaning the hook always runs
  - chosen: kept «fail-safe» in English without gloss, distinct from the glossed «fail-closed» used earlier on the page
  - alternative: translate as «الافتراضي الآمن» to avoid two near-identical English terms
  - why: the source deliberately uses two different terms; glossary only covers fail-closed

- **Source:** Semantic Validation / "does this input make semantic sense?"
  - chosen: heading kept «الـ Semantic Validation»; list item rendered «هل الـ input ده ليه معنى منطقي؟»
  - alternative: «هل الـ input ده منطقي دلاليًا؟»
  - why: 'semantic' has no natural everyday Arabic word; «معنى منطقي» reads naturally but drops the linguistics flavour

- **Source:** Sort each partition alphabetically by name
  - chosen: «رتّب كل مجموعة أبجديًا بالاسم» (partition translated as «مجموعة»)
  - alternative: keep «partition» in English per the glossary entry «partition, partition algorithm | KEEP»
  - why: the glossary KEEP entry is about the ch07 tool-call partition algorithm; here it is just the two lists (built-in vs MCP), so a plain word felt more accurate

- **Source:** Individual Tool Highlights
  - chosen: «أبرز الـ Tools واحدة واحدة»
  - alternative: «لمحات عن الـ Tools الفردية» or «أبرز ما في كل Tool»
  - why: 'individual' has no clean heading-sized Arabic equivalent; picked the colloquial «واحدة واحدة» that matches the page's register

- **Source:** The sub-agent variant of `ToolUseContext` is particularly revealing
  - chosen: «النسخة الخاصة بالـ sub-agents من `ToolUseContext` كاشفة بشكل خاص»
  - alternative: «بتكشف كثير» / «بتقول كثير عن التصميم»
  - why: «كاشفة» is correct MSA but slightly literary; kept it because it stays short and one-to-one with 'revealing'

- **Source:** BashTool detects image output by magic bytes
  - chosen: «الـ output اللي هو صورة عن طريق الـ magic bytes»
  - alternative: «بتكتشف إن الـ output صورة من الـ magic bytes»
  - why: 'image output' as a noun phrase is awkward in Arabic; used a relative clause twice on the page for consistency

- **Source:** marks BashTool as "always serial" is correct but wasteful
  - chosen: «بيعلّم BashTool على إنها "دائمًا بالتتابع" صحيح لكنه مهدر» (quote translated, not kept in English)
  - alternative: keep the English quote «"always serial"» plus Arabic in parentheses per section 4
  - why: section 4's quoted-string rule targets code comments, UI strings and prompts; this is the author's own scare-quoted phrase, so I treated it as prose

### book/ch07-concurrency.md

- **Source:** eliminate most of the wall-clock time
  - chosen: الـ wall-clock time (الوقت الفعلي اللي بيعدّي على الساعة) — term kept with a one-off gloss, later mentions bare
  - alternative: translate fully as «الوقت الفعلي» with no English term
  - why: Not in the glossary; the term recurs (16% of wall-clock time) and readers may want to search it, so I kept it and added my own gloss. Not a glossary-sanctioned gloss.

- **Source:** each batch is either "all concurrent-safe" or "a single serial tool"
  - chosen: translated the quoted labels directly: "كل الـ tools فيه concurrent-safe" / "tool واحدة بتتنفذ لوحدها بالتتابع"
  - alternative: keep the English inside quotes and add Arabic in parentheses (the quoted-string rule)
  - why: These are descriptive labels the author coined, not UI strings or code comments, so the quoted-string rule felt over-applied; treated them as prose.

- **Source:** The post-stream drain phase
  - chosen: مرحلة الـ drain اللي بعد الـ stream (تفريغ النتائج المتبقية)
  - alternative: no gloss (term not in glossary) or translate as «مرحلة التفريغ»
  - why: «drain» is used as a name for a specific method's role (getRemainingResults) and reappears in bold lead-ins, so I kept it, but added a non-glossary gloss for a 2-year reader.

- **Source:** Concurrent tools can share the runway with other concurrent tools
  - chosen: الـ tools الـ concurrent تقدر تشتغل جنب tools concurrent تانية
  - alternative: keep the runway metaphor: «تشارك المدرج مع»
  - why: Airport-runway metaphor does not land in Arabic; translated the meaning per 1.4. Slight loss of the author's wryness.

- **Source:** it also bubbles up to the query controller … This bubble-up
  - chosen: بيتصاعد لفوق للـ query controller … التصعيد ده (bubble-up)
  - alternative: keep «bubble up» as an English verb («بيعمل bubble up»)
  - why: «bubble» is reserved in the glossary for the permission mode; used the Arabic verb and mentioned the English once in parentheses so the reader can map it to the code.

- **Source:** only Bash errors cascade / The sibling error cascade
  - chosen: bold lead-in kept as «الـ sibling error cascade»; verb rendered as «بتنتقل للـ siblings»; later «سلسلة الأخطاء»
  - alternative: a single fixed rendering such as «بتتسلسل» everywhere
  - why: No glossary entry for cascade; the noun is a named mechanism (kept English) but «cascade» as a verb has no natural Arabic, so I translated the meaning. Mixed rendering within the page.

- **Source:** table header "Concurrency Safe"
  - chosen: آمنة للـ Concurrency
  - alternative: keep «Concurrency Safe» untranslated (Title Case English) or «Concurrency-Safe؟»
  - why: Guide says translate header cells but keep terms; the hybrid reads OK but no precedent in ch01-04 for this exact header shape.

- **Source:** Two concurrent edits to the same file corrupt it.
  - chosen: تعديلين concurrent على نفس الملف بيتلفوه
  - alternative: «بيبوّظوه» (more colloquial) or «بيفسدوه» (more MSA)
  - why: «بوّظ» felt like heavy slang (1.4), «أفسد» too stiff; «أتلف» is middle ground but slightly formal for the register.

- **Source:** Neutral commands: echo, printf (no side effects but not "reads")
  - chosen: no gloss for side effects anywhere on the page (table cells forbid it; the list item already has a parenthetical)
  - alternative: deliver the gloss as a «يعني …» clause in the list item per 2.7
  - why: The glossary marks side effect as G, but every mention on this page is in a table cell or an existing parenthetical; adding a يعني clause inside the parenthetical read as noise.

- **Source:** section headings "Concurrent Batches" / "Serial Batches"
  - chosen: «الـ Concurrent Batches» / «الـ Serial Batches» (English compounds kept whole)
  - alternative: «الـ Batches بالتتابع» since serial is TR: بالتتابع in the glossary
  - why: Glossary lists «serial batch» itself as KEEP, which conflicts with «serial → بالتتابع»; I followed the compound KEEP in headings and used «بالتتابع» in running prose.

- **Source:** Sequential total: 3.1s. Streaming total: 2.6s
  - chosen: kept compact units «3.1s» / «2.6s»
  - alternative: «3.1 ثانية» / «2.6 ثانية» like the spelled-out «200 ملي ثانية» elsewhere
  - why: Guide 2.4 says compact units stay as in source, but the same paragraph mixes spelled-out seconds; the page therefore shows both forms.

- **Source:** The result is a sequence of batches that alternates between concurrent groups and individual serial entries
  - chosen: «عناصر فردية بتتنفذ بالتتابع»
  - alternative: «serial entries» kept in English
  - why: «serial» is TR in the glossary but «entries» has no natural Arabic in this sense; chose meaning-first prose over a half-English compound.

### book/ch18-epilogue.md

- **Source:** Claude Code is not the only agentic system.
  - chosen: برنامج Claude Code مش النظام الـ agentic (يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل) الوحيد.
  - alternative: مش Claude Code هو الوحيد اللي نظام agentic.
  - why: Glossary form is «نظام agentic» (indefinite); making it definite with an adjective after the gloss reads slightly heavy, but it keeps the gloss at first mention and avoids a Latin-initial line per section 6.

- **Source:** The -70% fast path for internal callbacks (Chapter 12)
  - chosen: الـ fast path (طريق مختصر للحالات البسيطة) اللي بيقلل الوقت 70% للـ callbacks الداخلية (الفصل 12)
  - alternative: الـ -70% fast path للـ callbacks الداخلية
  - why: «-70%» as a prefixed name renders badly in RTL and is unclear; unpacked it into a relative clause. Assumes ch12 describes a 70% time reduction — if ch12 rendered it as a name, this should match it.

- **Source:** Eight MCP transport types. Claude Code supports stdio, SSE, HTTP, WebSocket, SDK, two IDE variants, and a Claude.ai proxy because…
  - chosen: …و proxy لـ Claude.ai كـ transports (طرق نقل الرسائل بين الـ client والـ server)، لأنه…
  - alternative: No gloss for transport on this page.
  - why: Glossary marks transport as G, but the first mention is in a bold lead-in where glosses are banned; added «كـ transports» in the body to host the gloss, which adds two words the source does not have.

- **Source:** This complexity is accidental in the Brooksian sense
  - chosen: والتعقيد ده accidental بالمعنى اللي قصده Brooks
  - alternative: تعقيد عرضي بالمعنى اللي قصده Fred Brooks
  - why: 'accidental complexity' is a recognised term readers may search; kept the English adjective and the bare surname. Adding 'Fred' would be an addition.

- **Source:** A plugin can crash the host. A hook crashes its own process.
  - chosen: الـ plugin ممكن يعمل crash للـ host. أما الـ hook لما يعمل crash، اللي بيقع هو الـ process الخاصة بيه بس.
  - alternative: الـ plugin ممكن يوقّع الـ host. الـ hook بيوقّع الـ process الخاصة بيه بس.
  - why: «يوقّع» for crash is natural Egyptian dev speech but not in the guide; used «يعمل crash» per 2.5 for the first sentence and «بيقع» (falls) for the second. Used «يوقّع sessions» once later in the same section for 'crash their developers' sessions'.

- **Source:** MCP tools (Chapter 15) become first-class citizens by implementing the same interface.
  - chosen: بتبقى جزء أصيل من النظام لمجرد إنها بتعمل implement لنفس الـ interface
  - alternative: بتبقى مواطنين من الدرجة الأولى
  - why: Followed the 3.11 ruling for 'first-class part' («جزء أصيل») rather than calquing the citizenship idiom; 'first-class citizens' is a common dev idiom, so the calque would also be understood.

- **Source:** …inside the loop, it is just: stream, collect, execute, append, repeat.
  - chosen: داخل الـ loop، الحكاية كلها: اعمل stream، اجمع، نفّذ، ضيف، كرّر.
  - alternative: Keep the five English verbs verbatim: stream, collect, execute, append, repeat.
  - why: These are prose verbs, not identifiers, and ch01 translated the same sequence into Arabic; kept 'stream' as «اعمل stream» per 2.5 since it has no plain Arabic verb.

- **Source:** Each boundary absorbs chaos and exports order.
  - chosen: كل حد من الحدود دي بيمتص الفوضى ويطلّع انتظام.
  - alternative: …ويصدّر نظام.
  - why: «نظام» is already used for 'system' throughout the page, so 'order' as «نظام» would be ambiguous; «انتظام» is less punchy but unambiguous. 'boundary' rendered as «حد/حدود» throughout the Closing.

- **Source:** The crab has the map in its claw. Go read it.
  - chosen: والسلطعون ماسك الخريطة في كمّاشته. روح اقرأه.
  - alternative: …في مخلبه.
  - why: Followed the 3.11 ruling that the mascot is «السلطعون». «كمّاشة» is the everyday word for a crab's claw; «مخلب» is more MSA. 'it' in 'read it' taken as the source code, hence «اقرأه» masculine.

- **Source:** Future agents will be less reactive and more proactive.
  - chosen: الـ agents الجاية هتكون أقل انتظارًا للأوامر وأكثر مبادرة.
  - alternative: أقل رد فعل وأكثر استباقية
  - why: 'reactive' has no crisp Arabic equivalent in this sense; 'waits for orders' captures the meaning at the cost of literalness.

- **Source:** ### Where Agentic Systems Are Heading / ### Multi-Agent Coordination / ### Autonomous Operation
  - chosen: الأنظمة الـ agentic رايحة فين / الـ Multi-Agent Coordination / الـ Autonomous Operation
  - alternative: Translate 'Multi-Agent Coordination' as «التنسيق بين أكثر من agent» and 'Autonomous Operation' as «التشغيل الذاتي»
  - why: Glossary lists 'autonomous operation' as KEEP and Part III uses «الـ Multi-Agent Orchestration», so both headings were kept as English compounds; 'agentic systems' pluralised as «الأنظمة الـ agentic» which is not a form the guide shows.

- **Source:** Asymmetric read/write channels for remote execution.
  - chosen: **الـ asymmetric read/write channels للتنفيذ عن بُعد.**
  - alternative: **قنوات قراءة وكتابة غير متماثلة للتنفيذ عن بُعد.**
  - why: Guide says keep English noun phrases whole and channel is KEEP, but a five-word English lead-in is heavy in Arabic; kept it English for consistency with ch16's terms.

### book/ch08-sub-agents.md

- **Source:** recursive forking would be pathological
  - chosen: لكن الـ fork داخل fork بشكل recursive هيبقى كارثة
  - alternative: هيبقى حالة مرضية / سلوك pathological
  - why: No glossary entry for 'pathological'; 'حالة مرضية' reads like a medical term to a 2-year dev, so rendered the intent (runaway/disastrous) instead of the word.

- **Source:** Belt and suspenders -- the primary guard is fast and reliable; the fallback catches edge cases
  - chosen: حماية مزدوجة: الحاجز الأساسي سريع وموثوق، والـ fallback بيلقط الحالات الشاذة
  - alternative: Keep idiom in English with Arabic gloss: "Belt and suspenders" (حزام وحمّالات)
  - why: The idiom has no Arabic equivalent and a literal calque would be meaningless; guide says translate the meaning of metaphors.

- **Source:** This is the workhorse.
  - chosen: ده اللي شايل الشغل التقيل.
  - alternative: ده الـ workhorse. / ده الحصان الشغّال.
  - why: 'workhorse' is not a technical term a reader would search for, so rendered the meaning; the horse metaphor doesn't carry in Arabic.

- **Source:** The fifteen-step cleanup runs regardless of whether…
  - chosen: وتنظيف الـ 15 خطوة بيشتغل بغض النظر…
  - alternative: والتنظيف اللي في الخطوة 15 بيشتغل…
  - why: Source is ambiguous (cleanup is Step 15 of 15, not itself fifteen steps); kept the source's literal phrasing rather than 'correcting' the author.

- **Source:** There is one important security consideration: the trust boundary.
  - chosen: الـ trust boundary with NO glossary gloss
  - alternative: الـ trust boundary (الخط الفاصل بين ما قبل موافقة المستخدم وما بعدها)
  - why: The glossary gloss is about the ch01 directory-trust dialog; here the boundary is user-controlled vs admin-trusted agent definitions, and the following sentences define it, so the canonical gloss would mislead.

- **Source:** Fork agents -- where the child inherits… (Fork Agents H2 section)
  - chosen: Placed the fork-agent gloss (نسخ من الـ agent بتشترك معاه في نفس الـ context) on 'fork children' in the call() decision-tree section, not in the Fork Agents H2
  - alternative: Gloss at the Fork Agents H2 paragraph, which is the first place 'fork agents' is the topic
  - why: 'fork children' is the first substantive body mention; the H2 paragraph itself defines fork agents inline so a gloss there would repeat the sentence.

- **Source:** a verification pass that demands adversarial thinking
  - chosen: مرحلة verification محتاجة تفكير عدائي (يدوّر على الأخطاء عمدًا)
  - alternative: verification pass محتاجة… (keep the whole noun phrase in English)
  - why: 'pass' as a noun is not a searchable term; translated it as مرحلة and kept 'verification' since it names the built-in agent type.

- **Source:** The "minus spawning" restriction is important
  - chosen: قيد "ما عدا الـ spawn" ده مهم
  - alternative: قيد "minus spawning" (ما عدا الـ spawn) ده مهم
  - why: This is the author's own scare-quoted phrase, not a code/UI/prompt string, so translating it inside the quotes read more naturally than the keep-English-plus-gloss rule for quoted strings.

- **Source:** Table cells: Default / Inherit / Stripped / Either / Always async / Minimal / Workhorse delegation / Config task
  - chosen: الافتراضي / Inherit / مختصر / أي منهما / async دائمًا / أدنى حد / التفويض للشغل العام / task إعدادات
  - alternative: Keep all as English enum-like cells (Default, Inherit, Stripped…)
  - why: 'Inherit' mirrors the 'inherit' config value so it stays Latin; the others are prose descriptors, but 'Stripped'→'مختصر' loses the 'CLAUDE.md removed' nuance without a longer cell.

- **Source:** Belt-and-braces style 'AND' in 'gated by the X feature flag AND the Y experiment'
  - chosen: بالـ feature flag X وكمان بالـ GrowthBook experiment Y (لازم الاتنين)
  - alternative: بالـ feature flag X **و** الـ experiment Y (bold to mirror the caps)
  - why: Source caps 'AND' for emphasis; adding bold would change bold-span counts, so expressed the emphasis with '(لازم الاتنين)' instead.

- **Source:** unaffordable one
  - chosen: منتج تكلفته مش ممكن تتحمّل
  - alternative: منتج مايتحملش تكلفته
  - why: The shorter colloquial form uses ما…ش on a verb outside the guide's closed list of allowed negation cases, so used the مش form.

- **Source:** The `KAIROS` table row: 'assistant force-async'
  - chosen: والـ force-async في وضع الـ assistant
  - alternative: والـ assistant force-async (keep whole compound)
  - why: Unclear whether 'assistant force-async' is a named mechanism or a description; read it as descriptive ('forced async when in assistant mode') and partly translated.

### book/ch09-fork-agents.md

- **Source:** "Not 'similar enough.' Not 'semantically equivalent.'"
  - chosen: Translated directly inside the quotes: مش "متشابه بما فيه الكفاية". ولا "نفس المعنى".
  - alternative: Keep the English in quotes with Arabic in parentheses, per the quoted-strings rule.
  - why: These are scare-quotes for the author's own phrasing, not UI strings, code comments or prompt excerpts, so the keep-English rule did not seem to apply. Real prompt excerpts elsewhere ("default to forking", "You ARE the fork") were kept in English with Arabic glosses.

- **Source:** "assistant message" / "user message" gender
  - chosen: Feminine (الـ assistant message اللي سببت، الـ assistant message الخاصة بالـ parent).
  - alternative: Masculine default for a kept English compound.
  - why: "message" is a TR term (رسالة) and every reader hears رسالة behind it, but the glossary's feminine list does not include it. Applied consistently across the page.

- **Source:** "threaded" / "threading" (system prompt via threading, not recomputation)
  - chosen: التمرير / بيتمرر زي ما هو
  - alternative: Keep "threading" in English.
  - why: ch08 already renders it as بيتمرر, and the English word would collide with OS threads for this audience.

- **Source:** "system prompt generation is not pure"
  - chosen: مش pure (يعني النتيجة مش بتعتمد على المدخلات بس، فيه side effects)
  - alternative: Use the glossary gloss verbatim for pure function, or drop the gloss.
  - why: The source negates the term, so the canonical gloss had to be inverted; kept it as a يعني clause rather than an unadapted parenthesis.

- **Source:** "warm conversation" / "warm session"
  - chosen: محادثة سخنة (الـ cache الخاص بيها متملي وجاهز) and later session سخنة
  - alternative: Keep "warm" in English: محادثة warm.
  - why: Glossary says TR سخنة with gloss (بيتملي ويبقى جاهز); adapted the gloss so it attaches to the cache rather than the conversation.

- **Source:** "exact passthrough" (Layer 2 heading)
  - chosen: عن طريق exact passthrough (kept English)
  - alternative: بالتمرير المباشر زي ما هي
  - why: Not in the glossary; kept English so it maps to the useExactTools flag discussed right below, and reused الـ exact tool passthrough in the Economics section.

- **Source:** "belt-and-suspenders approach" (appears twice)
  - chosen: أسلوب احتياط فوق احتياط
  - alternative: A literal idiom or dropping the metaphor.
  - why: ch08 already settled this rendering for the same guard pair; matched it for cross-chapter consistency.

- **Source:** "runaway API spend"
  - chosen: إنفاق على الـ API من غير سقف
  - alternative: إنفاق منفلت / غير محدود
  - why: 'من غير سقف' reads naturally and mirrors the guide's ceiling = سقف ruling; the source meaning is uncontrolled spend.

- **Source:** "hold the terminal hostage"
  - chosen: ماتحتجزش الـ terminal
  - alternative: ماتخليش الـ terminal رهينة (literal)
  - why: Guide forbids word-for-word idiom calques; احتجاز carries the meaning without the hostage image.

- **Source:** "the auto-backgrounding question is moot"
  - chosen: مش مطروح أصلًا
  - alternative: ملوش محل / مالوش معنى
  - why: ملوش is only attested in the guide inside a quoted example; 'مش مطروح أصلًا' stays inside the allowed colloquial layer.

- **Source:** "When Fork Is NOT Used" (all-caps emphasis in heading)
  - chosen: ## إمتى الـ Fork مش بيتستخدم (no added emphasis)
  - alternative: Add *italics* or bold on مش to mirror the caps.
  - why: Adding markup would change the bold/italic span count versus the source; caps have no Arabic equivalent.

- **Source:** "The placeholder tool results are a lie."
  - chosen: الـ placeholder tool results كذبة.
  - alternative: مش حقيقية / مش دقيقة (softened)
  - why: Kept the author's blunt wry tone as the guide asks; كذبة is plain MSA and not slang.

### book/ch12-extensibility.md

- **Source:** ## Two Dimensions of Extension
  - chosen: ## بُعدين للتوسعة
  - alternative: ## 2 أبعاد للتوسعة (digits rule 2.4/5)
  - why: The guide turns spelled-out counts into digits, but «2 أبعاد» reads unnatural; the Arabic dual «بُعدين» is not really a count word. Kept the dual and flag it.

- **Source:** They are markdown files that become slash commands
  - chosen: ملفات markdown بتتحوّل لأوامر
  - alternative: بتتحوّل لـ slash commands
  - why: Glossary says slash command → TR «الأوامر», but the bare word «أوامر» loses the '/'-prefix nuance for a first-time reader. Followed the glossary; a reviewer may prefer KEEP here.

- **Source:** ### The MCP Security Boundary / The security boundary is absolute
  - chosen: ### الـ MCP Security Boundary / وهنا حد الأمان قاطع
  - alternative: ### حد الأمان الخاص بـ MCP
  - why: 'security boundary' is not in the glossary. Kept it English in the heading (parallel to KEEP 'trust boundary') and translated it in prose as «حد الأمان».

- **Source:** This trust boundary connects to the broader MCP security model
  - chosen: الـ trust boundary ده مرتبط… (no gloss)
  - alternative: add the glossary gloss (الخط الفاصل بين ما قبل موافقة المستخدم وما بعدها)
  - why: The glossary gloss describes the workspace-consent boundary, but here the term means the MCP/external-system boundary; the gloss would mislead. The only other mention is inside a bold lead-in (no gloss allowed), so the page has no trust-boundary gloss.

- **Source:** Source column: Managed (Policy), User, Project, Additional Dirs, Legacy Commands, Bundled, MCP
  - chosen: kept in English
  - alternative: translate (المُدارة، المستخدم، المشروع…)
  - why: These read as category identifiers that map to code/docs; the hook-sources table later has backticked identifiers with a translated trust-level column, so I translated that one's 'Trust Level' column but kept these source names.

- **Source:** without a passing test suite
  - chosen: من غير test suite ناجح (masculine)
  - alternative: test suite ناجحة
  - why: 'suite' is not in the feminine list so default masculine applies, but many readers hear «مجموعة اختبارات» behind it. Followed the default.

- **Source:** -70% overhead (prose mentions)
  - chosen: بتقلّل الـ overhead… بنسبة 70% / (overhead أقل بـ 70%)
  - alternative: (-70% overhead) verbatim
  - why: A leading minus sign next to Arabic renders unreliably in RTL; rephrased the meaning. Left «-70% overhead» untouched inside the mermaid block.

- **Source:** callback hooks (registered programmatically, -70% overhead … via a fast path that skips span tracking)
  - chosen: fast path glossed later at 'The fast path for internal callbacks is a significant optimization'
  - alternative: gloss at first mention inside the parenthetical
  - why: First mention sits inside a parenthetical; guide 2.7 says move the gloss to the next body mention.

- **Source:** the skill content loads into the conversation AND the PreToolUse hook registers
  - chosen: بيتحمّل في المحادثة وكمان الـ hook … بيتسجّل
  - alternative: **و** (bold) to mirror the caps emphasis
  - why: Adding bold would change the bold-span count; «وكمان» carries the emphasis without extra markup.

- **Source:** Exit code 2 blocks; exit code 0 passes
  - chosen: بيمنع / بيعدّي
  - alternative: بيوقّف اللي بعده لحد ما يخلص
  - why: Guide 2.5 distinguishes 'block' (pause) from 'block a tool call' (deny). Here blocking means denying the action, so «يمنع» throughout, including the table column «بيمنع؟».

- **Source:** Skills give the model new capabilities bounded by the MCP security line
  - chosen: محدودة بخط أمان MCP
  - alternative: محدودة بالـ MCP security boundary
  - why: 'security line' is a metaphor for the boundary described earlier; translated literally-but-natural rather than reusing the English term.

- **Source:** `getPromptForCommand` prepends the base directory
  - chosen: بتحط الـ base directory في البداية
  - alternative: بتضيف الـ base directory لأول المسار
  - why: Source is terse about what the directory is prepended to; kept the same level of vagueness rather than guessing.

### book/ch10-coordination.md

- **Source:** Background tasks for fire-and-forget commands.
  - chosen: الـ background tasks للأوامر من نوع fire-and-forget (بتشغّلها ومش بتستنى نتيجتها)
  - alternative: translate fully: «أوامر بتشغّلها وتنساها»
  - why: fire-and-forget is not in the glossary; kept it as a searchable English term with an ad-hoc gloss since developers use it verbatim.

- **Source:** It is bad at bookkeeping. Auto-resume ... eliminating a category of bookkeeping entirely. / The task state machine provides the bookkeeping.
  - chosen: «شغل المتابعة والتسجيل (bookkeeping)» on first mention, then «الـ bookkeeping»
  - alternative: translate everywhere as «المتابعة الإدارية» or «مسك الدفاتر»
  - why: Not a glossary term and not really a code term; a pure Arabic rendering sounded like accounting, so I used reverse-order gloss once then kept English.

- **Source:** Whale sessions -- power users running extended workflows
  - chosen: الـ whale sessions (جلسات المستخدمين الثقيلين اللي بيشغّلوا workflows طويلة)
  - alternative: drop the term: «جلسات المستخدمين الثقيلين»
  - why: Internal Anthropic jargon; kept English so a reader can find it in the source comments, folded the source's own aside into the gloss.

- **Source:** ### Permission Forwarding (heading) — body never repeats the term
  - chosen: No gloss anywhere on the page for permission forwarding; the body describes the flow without naming it
  - alternative: add a «وده الـ permission forwarding (...)» clause in the body
  - why: Guide forbids glosses in headings and forbids adding sentences; I initially added a clause, then removed it to obey 'nothing added'. Same decision for 'Kill Switch' (heading only).

- **Source:** 292 agents in 2 minutes (twice)
  - chosen: في دقيقتين
  - alternative: في 2 دقايق (digits rule, section 2.4/5)
  - why: Digits rule says spelled-out counts become digits, but «2 دقايق» is unnatural Arabic; the dual form is what an engineer would actually say. Other counts all use digits.

- **Source:** no zombie iterators left running
  - chosen: ومفيش zombie iterators سايبة شغالة
  - alternative: «iterators معلّقة من غير فايدة»
  - why: 'zombie' is a standard process/OS term developers know in English; translating it loses the technical connotation.

- **Source:** Vague delegation is not just inefficient -- it is information-theoretically lossy.
  - chosen: هو بيفقد معلومات بالمعنى الحرفي لنظرية المعلومات (information-theoretically lossy)
  - alternative: «بيضيّع معلومات فعلًا» (drop the theory reference)
  - why: The author's precise claim (lossy in the information-theory sense) matters; kept the English phrase in parentheses so the nuance is not lost, at a cost of a slightly heavier sentence.

- **Source:** Reaching for coordinator mode on a single-file bug fix is like deploying Kubernetes for a static website -- technically possible, architecturally inappropriate.
  - chosen: زي إنك تنشر Kubernetes عشان static website: ممكن تقنيًا، لكنه غلط من ناحية الـ architecture
  - alternative: «غير مناسب معماريًا»
  - why: 'architecturally inappropriate' has no idiomatic Arabic equivalent; chose plainer «غلط من ناحية الـ architecture» to keep the wry tone over literal 'inappropriate'.

- **Source:** `local_bash` and `local_agent` are the workhorses
  - chosen: هما حصان الشغل
  - alternative: «هما الأساس / الأكثر استخدامًا»
  - why: Calque risk: «حصان الشغل» is understood in Egyptian usage but borderline literal. Kept the metaphor since the guide allows metaphors when meaning survives.

- **Source:** the request is forwarded to the leader ... `resumeAgentBackground()` -- the agent is transparently restarted
  - chosen: الـ agent بيرجع يشتغل من غير ما المُرسل يحس بالفرق
  - alternative: «بيتعاد تشغيله بشفافية»
  - why: Guide 3.1 says 'transparent' is meaning-first; I made the implicit subject (the sender) explicit, which adds a word the source does not have but is what 'transparently' means here.

- **Source:** It is the most opinionated orchestration pattern in the system
  - chosen: أكثر orchestration pattern في النظام ليه رأي واضح
  - alternative: keep «opinionated» in English: «أكثر pattern opinionated»
  - why: 'opinionated' is common dev jargon (opinionated framework) and could be kept, but it is not in the glossary and the Arabic paraphrase reads naturally; unsure which the reviewers prefer.

- **Source:** The patterns are not mutually exclusive in principle, but they are in practice.
  - chosen: الـ patterns مش متعارضة نظريًا، لكنها متعارضة في الواقع العملي
  - alternative: reuse glossary term: «مفيش بينها mutual exclusion نظريًا»
  - why: The glossary gives «mutual exclusion» as KEEP with a gloss (used earlier for the fork/coordinator flag), but here the phrase is plain English, not the technical concept, so I translated it instead of reusing the KEEP term.

### book/ch11-memory.md

- **Source:** ## The Four-Type Taxonomy
  - chosen: ## الـ Taxonomy من 4 أنواع
  - alternative: ## الـ Four-Type Taxonomy (keep the compound whole, per 2.1)
  - why: Glossary lists 'four-type taxonomy' as KEEP «الـ taxonomy», but section 5 says spelled-out counts become digits even in headings («الـ 7 Modes»). I followed the digits rule; the compound-kept form is equally defensible.

- **Source:** staleness gloss: (إن الـ memory بقت قديمة ومش مطابقة للواقع)
  - chosen: (إن الـ memory بقى قديم ومش مطابق للواقع)
  - alternative: glossary text verbatim with feminine agreement
  - why: Glossary gloss text is binding, but the guide's 2.6 table makes 'memory' masculine. I adapted gender for consistency with the rest of the page; a reviewer may prefer the verbatim gloss.

- **Source:** these are working notes, not gospel
  - chosen: دي ملاحظات شغل، مش حقائق مقدسة
  - alternative: مش كلام منزّل (idiomatic but Egypt-flavoured) / مش حقائق مطلقة
  - why: 'gospel' has no neutral Arabic equivalent; «مقدسة» keeps the religious-authority connotation without slang.

- **Source:** memory as crutch
  - chosen: الاعتماد على الـ memory كعكاز
  - alternative: الـ memory كبديل عن القراءة / كعكاز (literal, without 'الاعتماد على')
  - why: The bare literal calque «الـ memory كعكاز» reads oddly in Arabic; I added «الاعتماد على» to make the metaphor land, which is a small restructuring of the noun phrase.

- **Source:** the model is instructed to push back -- "what was *surprising*..."
  - chosen: الـ model عنده تعليمات إنه ما يوافقش على طول، ويسأل: ... ; italics kept only in the verbatim English quote, Arabic paraphrase plain
  - alternative: يعترض / mirror *italics* inside the Arabic parenthetical too
  - why: 'push back' has no one-word Arabic equivalent in this register. Also unsure whether the italic markers should be duplicated into the Arabic gloss; I kept them once (in the quoted English) to avoid altering marker counts.

- **Source:** ### Defense in Depth / ### The /dream Consolidation / KAIROS Append-Only heading terms
  - chosen: No gloss for defense in depth or append-only (terms appear only in headings, never in body prose)
  - alternative: Insert the glossary gloss into the nearest body sentence (I initially did this for append-only, then removed it)
  - why: Guide forbids glosses in headings and forbids adding words the source lacks; the two rules collide when a G-term appears only in a heading. I chose 'add nothing'.

- **Source:** tradeoff (source spelling, no hyphen)
  - chosen: الـ tradeoff
  - alternative: الـ trade-off (glossary spelling)
  - why: Rule 2.2 says keep the source's form; glossary lists 'trade-off'. Kept source spelling, gloss text taken from the glossary.

- **Source:** Memories from today or yesterday
  - chosen: من اليوم أو أمس
  - alternative: من النهاردة أو إمبارح
  - why: The Egyptian words are natural in this register but not on the closed colloquial list; MSA «اليوم/أمس» is safe though slightly stiffer.

- **Source:** The `description` is the most load-bearing field.
  - chosen: هو اللي شايل الحمل الأكبر
  - alternative: هو الأهم / الأكثر تأثيرًا
  - why: Kept the structural metaphor since the author uses it deliberately; risk that «شايل الحمل» reads as too idiomatic.

- **Source:** disabling auto-memory transitively disables team memory
  - chosen: بيعطّل الـ team memory معاه بالتبعية
  - alternative: بشكل متعدٍّ (literal 'transitively')
  - why: 'transitively' in the maths sense would confuse the target reader; «بالتبعية» carries the meaning but drops the CS flavour.

- **Source:** burned by mock divergence Q4 (quoted description)
  - chosen: (الـ integration tests لازم تشتغل على DB حقيقية، مش mocks. اتحرقنا من اختلاف الـ mocks عن الواقع في Q4)
  - alternative: a tighter literal rendering without «عن الواقع»
  - why: The source is a terse note; I unpacked 'divergence' as «اختلاف … عن الواقع» so the Arabic reader gets what diverged from what, at the cost of two extra words inside a quote rendering.

- **Source:** ## MEMORY.md as the Always-Loaded Index
  - chosen: ## ملف MEMORY.md كـ Index دائم التحميل
  - alternative: ## MEMORY.md كالـ Index اللي بيتحمّل دائمًا
  - why: Added the category noun «ملف» so the heading does not start with Latin text (RTL note 6), even though the source heading has no such noun.

### book/ch15-mcp.md

- **Source:** The Model Context Protocol is an open specification that any agent can implement
  - chosen: No MCP first-mention gloss anywhere on the page
  - alternative: Add the glossary gloss (بروتوكول مفتوح بيخلّي أي agent يستدعي tools خارجية) after the first body mention
  - why: Style guide 2.7 says skip the gloss when the sentence itself defines the term; this sentence and the next paragraph already do, and stacking the gloss would repeat «مفتوح» twice in one clause.

- **Source:** Two design decisions deserve attention.
  - chosen: قرارين تصميم (Arabic dual)
  - alternative: 2 قرارات تصميم (digit, per rule 2.4 'spelled-out counts become digits')
  - why: The digit form reads unnaturally with a translated Arabic noun in the dual; ch01 uses «طبقتين» for 'two layers' in the same situation, so I matched the reference implementation over the letter of 2.4.

- **Source:** Two servers with different names but the same command or URL
  - chosen: لو فيه 2 servers مختلفين في الاسم
  - alternative: لو فيه server-ين / لو فيه اتنين servers
  - why: Rule 2.4 wants the digit plus the English plural; it looks slightly odd in prose but is the guide's canonical shape for counts with English nouns.

- **Source:** needs-auth (with a 15-minute TTL cache to prevent 30 servers from independently discovering the same expired token)
  - chosen: Kept TTL bare, no gloss, and did not nest a second parenthesis
  - alternative: Insert the glossary gloss (مدة صلاحية الـ cache) inside the existing parenthetical
  - why: First and only mention sits inside a source parenthesis; 2.7 says not to stack parentheses and to move the gloss to a second mention, which does not exist on this page. TTL is also well-known to the target reader.

- **Source:** In-Process Transport / running an MCP server and client in the same process
  - chosen: No in-process gloss
  - alternative: Use the glossary gloss (جوه نفس الـ process، من غير process جديدة)
  - why: The body sentence defines it outright, and the glossary's gloss text uses «جوه», which section 1.3 bans. Skipping avoided both the redundancy and the register conflict.

- **Source:** the fetch wrappers stack: timeout wrapping outside step-up detection, outside the base fetch
  - chosen: الـ timeout wrapping بيغلّف الـ step-up detection من الخارج، وده بدوره بيغلّف الـ base fetch
  - alternative: Literal: الـ timeout wrapping خارج الـ step-up detection، خارج الـ base fetch
  - why: The English is elliptical; I spelled out the nesting as two explicit wrap relations so the reader sees the onion order without guessing what 'outside' attaches to.

- **Source:** Claude.ai subscribers configure MCP "connectors" through the web interface
  - chosen: "connectors" (موصّلات) لـ MCP — kept the quoted English with an Arabic meaning in parentheses
  - alternative: Just «MCP connectors» with the quotes and no parenthetical
  - why: Section 4 says quoted UI strings keep the English and get the Arabic meaning right after; for a one-word product label the parenthetical feels slightly heavy, but I followed the rule.

- **Source:** legitimate servers
  - chosen: الـ servers السليمة
  - alternative: الـ servers الشريفة / المشروعة / الموثوقة
  - why: 'Legitimate' here means well-behaved rather than malicious; «سليمة» captures that without the legal ring of «مشروعة» or the trust-model implication of «موثوقة».

- **Source:** MCP annotations map to behavior flags: `readOnlyHint` marks tools safe…
  - chosen: الـ annotation `readOnlyHint` بيعلّم (category noun 'annotation', masculine)
  - alternative: الـ flag `readOnlyHint` / الـ hint `readOnlyHint`
  - why: Rule 2.3 requires a category noun before inline code; the source calls them annotations, and 'annotation' is not in the feminine list so it took masculine agreement.

- **Source:** Handle auth lazily.
  - chosen: تعامل مع الـ auth بشكل lazy.
  - alternative: أجّل الـ auth لحد ما تحتاجه.
  - why: Glossary lists 'lazy' as KEEP; kept the term so it maps to the deferred-loading vocabulary used elsewhere in the book, even though a plain Arabic verb would read a bit smoother.

- **Source:** Configuration Loading and Scoping (heading)
  - chosen: تحميل الإعدادات والـ Scoping
  - alternative: تحميل الإعدادات ونطاقاتها
  - why: 'scope' is KEEP in the glossary (3.5/3.6), so its gerund stayed English in Title Case per 2.2; 'configuration' is TR → الإعدادات.

- **Source:** Stale timeout signal bug (table cell)
  - chosen: الـ bug الخاص بالـ timeout signal القديم
  - alternative: bug إشارة الـ timeout المنتهية
  - why: Cells cannot carry a gloss; 'stale' as an adjective is rendered «قديم» per glossary 3.5 rather than «منتهي», even though the paragraph below explains the signal had actually expired.

### book/ch13-terminal-ui.md

- **Source:** Claude Code started with Ink, then forked it beyond recognition.
  - chosen: بدأ Claude Code بـ Ink، وبعدين عمل له fork وغيّره لدرجة إنه مابقاش له علاقة بالأصل.
  - alternative: ...وغيّره لدرجة إنك مش هتعرفه (more literal 'beyond recognition')
  - why: Idiom has no direct Arabic equivalent; chose meaning-first per guide 1.4 but unsure whether 'مابقاش له علاقة بالأصل' overstates the divergence.

- **Source:** React is the obvious choice for declaring this kind of component tree.
  - chosen: React هو الاختيار الطبيعي عشان تعرّف component tree من النوع ده.
  - alternative: ...عشان تعلن عن component tree ... بشكل declarative
  - why: 'declaring' carries the React 'declarative' sense; dropped the explicit term to keep the sentence natural, at a small loss of nuance.

- **Source:** React reconciler (first mention, inside a dense parenthetical list) / reconciler gloss placement
  - chosen: Glossed at the second mention in 'The Custom DOM' ('الـ reconciler الخاص بـ React (الجزء من React اللي بيحسب إيه اللي اتغير)')
  - alternative: Gloss at the first mention in the intro paragraph
  - why: Guide 2.7 says move the gloss when the first mention sits in parentheses/dense list; applied the same rule to interning, double-buffer and escape sequence (all glossed at a later mention).

- **Source:** unless manually memoized (line 49) vs per-expression memoization (line 303)
  - chosen: No gloss at line 49 (source parenthetical); memoization glossed at line 303 'بيحقن memoization (يحسب النتيجة مرة واحدة ويحتفظ بيها)'
  - alternative: Gloss at first mention as a «يعني» clause inside the parenthetical
  - why: Stacking a gloss inside the source's own parentheses read badly; the glossary gloss is for the verb form and needed slight noun adaptation.

- **Source:** This contaminates the buffer -- tracked by a `prevFrameContaminated` flag
  - chosen: وده بيلوّث الـ buffer، وبيتتابع بـ flag اسمه `prevFrameContaminated`
  - alternative: Keep 'contamination' in English: 'بيعمل contaminate للـ buffer'
  - why: 'contaminate/contamination' is not in the glossary; translated it (يلوّث / التلويث) since it is ordinary English here, but it is also the concept behind the flag name.

- **Source:** Sibling subtrees remain clean and can be blitted from the previous frame.
  - chosen: الـ sibling subtrees بتفضل clean وينفع تتنسخ بالـ blit من الـ frame اللي قبله.
  - alternative: الـ subtrees الشقيقة بتفضل نظيفة...
  - why: 'blit' kept as a term (not in glossary) and 'clean/dirty' kept in English to match the `dirty` field; unsure whether 'clean' should have been translated as نظيفة.

- **Source:** Pool-Based Memory: Why Interning Matters (H2)
  - chosen: ## الـ Pool-Based Memory: ليه الـ Interning مهم
  - alternative: ## الذاكرة المبنية على الـ Pools: ليه الـ Interning مهم
  - why: 'memory' here is the RAM sense (glossary says TR: الذاكرة), but the heading is a Title-Case compound name; kept the English compound as in body prose I did translate it ('إدارة الذاكرة المبنية على الـ pools').

- **Source:** UI chrome (borders, indicators)
  - chosen: عناصر الـ UI الثابتة (الحدود، والمؤشرات)
  - alternative: الـ UI chrome
  - why: 'chrome' is jargon a 2-year developer may not know; translated the meaning rather than keep the term.

- **Source:** A lost-release recovery mechanism
  - chosen: آلية استرداد لحالة "الإفلات الضايع"
  - alternative: آلية lost-release recovery
  - why: Coined an Arabic phrase in quotes for a term that is not standard jargon; unsure if the quotes count as 'adding' or if the English term should have stayed.

- **Source:** the JavaScript GC has no visibility into the semantic liveness of pool entries
  - chosen: الـ GC الخاص بـ JavaScript ماعندوش طريقة يعرف بيها إذا كانت خانة في الـ pool ما زالت مستخدمة فعليًا ولا لأ
  - alternative: ...ماعندوش رؤية للـ semantic liveness الخاصة بخانات الـ pool
  - why: Unpacked 'semantic liveness' into plain meaning; sentence is longer than the source but avoids an opaque term.

- **Source:** frame.cursor (which must stay at the content bottom for the log-update's relative-move invariants)
  - chosen: Split into a new sentence: '...عن `frame.cursor`. وده لازم يفضل في آخر المحتوى عشان الـ invariants (شروط لازم تفضل صحيحة طول الوقت) الخاصة بالحركة النسبية في الـ log-update.'
  - alternative: Keep the source parenthetical and deliver the invariant gloss as a «يعني» clause
  - why: Restructured to avoid nested parentheses while still placing the mandatory invariant gloss; changes the sentence shape slightly.

- **Source:** Text selection and search highlighting operate as screen-buffer overlays
  - chosen: تحديد النص وتظليل نتائج البحث بيشتغلوا كـ overlays
  - alternative: ...بتشتغل كـ overlays (feminine singular agreement)
  - why: Subject is two translated masculine nouns, not an English plural, so used the dual/plural verb; guide 2.6 only covers English plurals.

### book/ch14-input-interaction.md

- **Source:** "constitute the chord `ctrl+x ctrl+k`" / "is a chord: two keystrokes that together form a single action"
  - chosen: No first-mention gloss for chord anywhere on the page
  - alternative: Glossary gloss «(اختصار من ضغطتين متتاليتين زي `ctrl+x ctrl+k`)» at one of the two mentions
  - why: Both candidate sentences already define the term in-sentence (2.7 says skip when the sentence states the definition), and the glossary gloss literally repeats the `ctrl+x ctrl+k` example sitting right next to it.

- **Source:** "Provide escape hatches." (bold lead-in in Apply This)
  - chosen: Kept «escape hatches» ungloseed
  - alternative: Add «(مخارج استثنائية من القاعدة)» in the first body sentence
  - why: Gloss is banned inside bold lead-ins and the term has no second mention; inserting it in the next sentence would add words the source does not have.

- **Source:** Illustrative quoted phrases: "delete the next 2 words", "delete inside quotes", "I am in a latency-sensitive operation, please yield.", "approve", "kill to end of line"
  - chosen: English kept in quotes + Arabic meaning in parentheses (same as UI strings)
  - alternative: Translate directly into Arabic quotes since these are not real UI strings or code comments
  - why: Section 4's quoted-string rule lists UI/prompt/comment strings; these are author-invented illustrative quotes, so either reading is defensible. Chose the rule's format for consistency with ch01.

- **Source:** "edge case" (twice: chord section, vim chip snapping)
  - chosen: KEEP «edge case» in Latin
  - alternative: «حالة طرفية» / «حالة حدّية»
  - why: Not in the glossary; first draft had «حالة حرجة» which wrongly implies 'critical'. Kept English because developers search for it as-is.

- **Source:** "seven event types" followed by a list of six
  - chosen: Translated as «7 event types» faithfully
  - alternative: Silently correct to 6
  - why: Source has an internal inconsistency; translation must not fix content. Flagging for the reviewer.

- **Source:** "the full zoo of VT100/VT220/xterm variations"
  - chosen: «كل حديقة الحيوان الخاصة بأشكال VT100/VT220/xterm»
  - alternative: Drop the metaphor: «كل الأشكال المتنوعة»
  - why: Kept the author's wry image; risk is that it reads as a calque to some readers.

- **Source:** "nested modals", "modal input", "modals"
  - chosen: KEEP «الـ modals المتداخلة»، «modal input»
  - alternative: «النوافذ المنبثقة المتداخلة»
  - why: Not in glossary; 'modal' as a UI concept is searched in English, and 'modal input' in the vim sense has no clean Arabic equivalent.

- **Source:** "Multi-Protocol Support" (H2) and "Chord Support" (H2)
  - chosen: «دعم أكثر من Protocol» and «دعم الـ Chords»
  - alternative: «الـ Multi-Protocol Support» / «الـ Chord Support» as kept compounds
  - why: Guide keeps compound names in headings but these read as descriptive English phrases, not component names; chose translated headings to match ch13's «ليه نبني Renderer مخصوص؟» style.

- **Source:** "progressive enhancement with graceful degradation"
  - chosen: KEEP both phrases in English
  - alternative: Translate: «تحسين تدريجي مع تدهور رشيق»
  - why: Standard web-engineering terms readers will recognise; Arabic renderings are not established. graceful degradation is also kept in the Summary bold lead-in to match.

- **Source:** "(Ctrl+Up arrow)" after `\x1b[1;5A`
  - chosen: «(يعني Ctrl+Up)»
  - alternative: «(Ctrl+سهم لفوق)»
  - why: First draft interleaved Arabic inside the key name; rule 6 says keep an English multi-word term on one side, so dropped 'arrow' rather than mix scripts.

- **Source:** "the 'memory' that makes vim feel like vim"
  - chosen: «"الذاكرة" اللي بتخلّي vim يحسّسك إنه vim»
  - alternative: Keep «memory» in Latin per the book-wide memory rule
  - why: Here 'memory' is the RAM/retention sense in scare quotes, not the book's Memory abstraction, so the TR rule (الذاكرة) applies; flagged in case the reviewer wants Latin.

- **Source:** "push complexity to the boundaries"
  - chosen: «ازقّ التعقيد للحدود»
  - alternative: «حرّك التعقيد ناحية الحدود» (more neutral MSA verb)
  - why: «ازقّ» is colloquial and vivid but sits at the edge of the allowed register; the rest of the sentence is plain MSA content words.

### book/ch16-remote.md

- **Source:** proactive token refresh that eliminates roughly 9% of registrations that would otherwise fail on the first attempt
  - chosen: بيمنع فشل حوالي 9% من التسجيلات اللي كانت هتفشل من أول محاولة لولاه
  - alternative: بيلغي حوالي 9% من التسجيلات اللي كانت هتفشل (closer to the literal 'eliminates registrations')
  - why: The literal rendering reads as 'cancels 9% of registrations'; the source means it removes those first-attempt failures. Chose meaning over word.

- **Source:** preventing split-brain scenarios
  - chosen: سيناريوهات الـ split-brain (إن نسختين يشتغلوا في نفس الوقت وكل واحدة فاكرة إنها الأصل)
  - alternative: No gloss (term not in the glossary)
  - why: Guide says terms without a glossary entry get no gloss, but split-brain is not something a 2-year developer necessarily knows; kept a short gloss as a helpful exception.

- **Source:** an exception unwinds the caller
  - chosen: و exception بيطلع للـ caller
  - alternative: و exception بيفكّ الـ call stack لحد الـ caller
  - why: 'Unwinds' is stack terminology; simplified to 'an exception propagates up to the caller' for readability at the cost of the stack-unwinding image.

- **Source:** failures degrade gracefully
  - chosen: والفشل بيحصل بشكل متدرّج من غير ما يوقّع النظام كله
  - alternative: والفشل graceful degradation
  - why: No glossary entry; translated the meaning rather than keep 'graceful degradation' in English, since the sentence is a design-philosophy summary, not a named mechanism.

- **Source:** a gauntlet of pre-flight checks
  - chosen: سلسلة من الـ pre-flight checks
  - alternative: سلسلة صارمة من الفحوصات المسبقة
  - why: 'Gauntlet' metaphor dropped (no natural Arabic equivalent that isn't slang); kept 'pre-flight checks' in English as a recognizable term.

- **Source:** The bridge (first body mention in 'The v1 bridge is the environment-based remote control system')
  - chosen: Gloss placed on the second mention: 'الـ bridge (جسر بيوصل الـ CLI المحلي بالـ web interface) بيدخل في long-poll loop'
  - alternative: Gloss on first mention inside 'الـ v1 bridge هو نظام الـ remote control...'
  - why: First mention is a dense definitional sentence with 'v1' attached; moving the gloss to the next paragraph reads cleaner (guide 2.7 permits this).

- **Source:** Epoch mismatches (409 responses) are handled aggressively
  - chosen: بيتعامل معاه النظام بحزم
  - alternative: بشكل عدواني / بحدة
  - why: 'Aggressively' here means decisively/strictly, not hostile; «بحزم» carries that meaning without sounding like an attack.

- **Source:** idempotency via UUIDs
  - chosen: idempotency (تكرار الطلب بيدّي نفس النتيجة) عن طريق الـ UUIDs
  - alternative: idempotency with the glossary's 'idempotent' gloss verbatim (تكرار تنفيذه بيدّي نفس النتيجة)
  - why: Glossary entry is for the adjective 'idempotent'; adapted the gloss to the noun form and to 'request' context per rule 2.7.

- **Source:** The `isSessionsMessage()` type guard ... deliberately permissive
  - chosen: وده تساهل مقصود
  - alternative: وده متساهل عن قصد
  - why: Turned the adjective into a nominal clause to keep the sentence short and avoid an awkward adjective agreement with the Latin 'type guard'.

- **Source:** Fail open for auxiliary systems / Every step fails open
  - chosen: Kept 'fail open' in English: 'كل خطوة من دول fail open، يعني أي خطأ بيعطّل الـ proxy...'; 'خلّي الأنظمة المساعدة fail open'
  - alternative: Translate: 'بتفشل بشكل مفتوح' / 'الفشل بيسيب النظام شغال'
  - why: Glossary has 'fail-closed' KEEP but not 'fail open'; kept the term in English for symmetry with fail-closed and let the following clause explain it.

- **Source:** Reads are high-frequency, low-latency, server-initiated
  - chosen: القراءة عالية التكرار، وقليلة الـ latency (زمن الاستجابة)، والـ server هو اللي بيبدأها
  - alternative: القراءة بتحصل كثير وبسرعة والـ server بيبدأها
  - why: Kept a slightly formal list structure to preserve the three-way parallel with the 'Writes are...' sentence; risk is it reads a bit list-like.

- **Source:** The `cc://` URL scheme provides clean addressing for local connections
  - chosen: أما الـ URL scheme `cc://` فبيوفّر طريقة عنونة نظيفة للاتصالات المحلية
  - alternative: عنونة واضحة / addressing نظيف
  - why: 'عنونة' is correct but uncommon in everyday developer speech; 'addressing' in English was rejected to avoid piling up Latin words in one short sentence.

### book/ch17-performance.md

- **Source:** ## Saving Money on API Calls / "The cache hit rate tells you where the money is."
  - chosen: توفير المال في الـ API Calls / بتقولك المال راح فين
  - alternative: توفير الفلوس / الفلوس راحت فين (the prior draft's choice)
  - why: «الفلوس» is more natural Egyptian and matches the whiteboard voice, but the guide restricts the colloquial layer to grammar glue and keeps content words MSA. Chose «المال» for register consistency; a reviewer may prefer «الفلوس».

- **Source:** A streaming watchdog (`CLAUDE_STREAM_IDLE_TIMEOUT_MS`, default 90 seconds) aborts and retries...
  - chosen: streaming watchdog (gloss) بيتحكم فيه الـ env var `CLAUDE_STREAM_IDLE_TIMEOUT_MS`، والافتراضي 90 ثانية
  - alternative: The prior draft's «watchdog اسمه `CLAUDE_STREAM_IDLE_TIMEOUT_MS`» (calling the env var the watchdog's name)
  - why: The source parenthetical is ambiguous; the identifier is the env var that configures the timeout, not the watchdog's name. Rendered it as the controlling variable, which is what the code does. This required the gloss and the env var to sit in one sentence, so the watchdog gloss stays in parentheses and the env var follows as a clause.

- **Source:** Five boolean fields use a "sticky-on" pattern -- once true, they remain true for the session
  - chosen: No latch gloss; kept the source's own definition «أول ما تبقى true، بتفضل true لآخر الـ session»
  - alternative: Add the glossary gloss (flag لما يتفعّل مرة بيفضل مفعّل لآخر الـ session) as the prior draft did
  - why: Guide 2.7 says skip the gloss when the sentence already states the definition; the draft had both and read as a restatement. Removed the gloss.

- **Source:** techniques ranging from the obvious (memoization) to the subtle (26-bit bitmaps...)
  - chosen: من البديهي ... للدقيق
  - alternative: من الواضح ... للخفي / لغير المتوقع
  - why: «subtle» has no single Arabic equivalent in this sense; «الدقيق» conveys fine-grained cleverness, «الخفي» conveys non-obviousness. Picked «الدقيق» as the less loaded option.

- **Source:** Claude Code ships with 50+ startup profiling checkpoints
  - chosen: النسخة اللي بتوصل للمستخدمين من Claude Code فيها 50+ startup profiling checkpoints
  - alternative: «بيتوزّع Claude Code ومعاه ...» (prior draft) or a bare «Claude Code فيه ...»
  - why: «ships with» has no idiom in Arabic; the prior «بيتوزّع» was a slight calque. Chose a meaning-first rephrase that stresses it is in the production build, at the cost of a few extra words.

- **Source:** Two macOS keychain entries would otherwise cost ~65ms of sequential synchronous spawns.
  - chosen: الـ 2 keychain entries ... من spawns متتابعة و synchronous
  - alternative: «اتنين keychain entries» and «المتتابعة والـ synchronous»
  - why: Guide 2.4 wants digits with English plurals; «اتنين» is allowed glue but the digit rule is explicit, so used «الـ 2». Also dropped the article on the indefinite «spawns» in the source.

- **Source:** The terminal renderer throttles at 60fps
  - chosen: بيعمل throttle للـ rendering عند 60fps
  - alternative: «بيحدد سرعته عند 60fps» (prior draft, translated verb)
  - why: Guide 2.5 prefers «يعمل + English» when no ordinary Arabic verb fits, and the code identifier `throttle(...)` follows immediately, so keeping the English verb ties prose to code.

- **Source:** Manual `useMemo` and `useCallback` are error-prone
  - chosen: الاستخدام اليدوي لـ `useMemo` و `useCallback` سهل تغلط فيه
  - alternative: «بيغلط بسهولة» (prior draft) or MSA «معرّض للأخطاء»
  - why: «بيغلط بسهولة» attributes the error to the hooks rather than the developer; «سهل تغلط فيه» addresses the reader in second person as the guide allows and matches the meaning.

- **Source:** a 26-bit bitmap of which lowercase letters it contains
  - chosen: أي حروف lowercase موجودة فيه
  - alternative: «الحروف الصغيرة» (translated)
  - why: «الحروف الصغيرة» is ambiguous in Arabic (small letters vs lowercase); the code checks ASCII 97-122, so kept the English term lowercase, which the reader can map directly to `toLowerCase()`.

- **Source:** `queryable` (resolves on first chunk...)
  - chosen: بيعمل resolve مع أول chunk
  - alternative: «بيتحل مع أول chunk» (prior draft)
  - why: «بيتحل» is the literal verb but reads oddly for a Promise; «بيعمل resolve» follows the guide's «يعمل + English» pattern and is what developers actually say.

- **Source:** the connection warms while the user types ... so the warmed connection uses the correct transport configuration
  - chosen: الاتصال بيسخن (بيتملي ويبقى جاهز) ... الاتصال السخن
  - alternative: «الاتصال بيتجهّز مبكرًا ... الاتصال اللي اتجهّز»
  - why: The glossary fixes «warm» as «بيسخن» with that gloss (written for cache), and it transfers to a TCP connection acceptably, but «الاتصال السخن» is slightly odd Arabic. Kept the glossary rendering for cross-page consistency.

- **Source:** ## Apply This: Performance for Agentic Systems
  - chosen: طبّق ده: الأداء في الأنظمة الـ Agentic
  - alternative: «الأداء للأنظمة agentic» (no article, lowercase)
  - why: Guide 3.1 gives «نظام agentic» (indefinite, no article) but the heading is definite plural Title Case. «الأنظمة الـ Agentic» puts the article on an adjective, which is slightly irregular; kept the prior draft's form since it matches heading casing rules.


## 5. Reviewer feedback per page (applied unless listed in §2)

### README.md (9 items)

- [consistency] line 13 and line 129 (blockquote and Disclaimer)
  - was: مافيهوش أي source code … / الـ repository ده مافيهوش أي source code … ومافيش فيه أي نص prompt
  - now: مفيهوش أي source code … / الـ repository ده مفيهوش أي source code … ومفيش فيه أي نص prompt
  - why: Ruling 2: one spelling for the existential negation across pages (ch01/ch03 use مفيش).

- [consistency] line 116 (How This Book Was Made)
  - was: وحلّلت 36 AI agents ما يقرب من 2,000 ملف TypeScript
  - now: وحلّلت 36 AI agents حوالي 2,000 ملف TypeScript
  - why: Same source phrase ('nearly two thousand') is rendered «حوالي 2,000» in ch01; keep the two pages identical and simpler.

- [consistency] lines 64, 68, 106 (Part IV tagline, ch11 row, pattern 6)
  - was: الـ agent اللي من غير Memory … / الـ file-based Memory … / **الـ File-based Memory مع LLM recall**
  - now: الـ agent اللي من غير memory … / الـ file-based memory … / **الـ File-based memory مع LLM recall**
  - why: Ruling 10: mirror the source casing (source has lowercase 'memory' in all three places).

- [consistency] line 68 (ch11 row, What You'll Learn cell)
  - was: والتقادم (staleness)
  - now: والـ staleness
  - why: Ruling 6: table cells carry bare English terms only; Arabic-first-with-English-in-parentheses is a reverse-format addition and the rest of the cell is English terms.

- [readability] line 101 (pattern 1)
  - was: ومعاه backpressure (إن المستهلك هو اللي بيتحكم في سرعة المنتج) وإلغاء بشكل طبيعي
  - now: والـ backpressure (إن المستهلك هو اللي بيتحكم في سرعة المنتج) والإلغاء بييجوا معاه تلقائيًا
  - why: 'natural' here means 'falls out of the generator for free'; «بشكل طبيعي» is a literal calque that a reader parses as 'normally'.

- [readability] line 102 (pattern 2)
  - was: ابدأ شغّل الـ tools اللي هي read-only
  - now: ابدأ تشغيل الـ tools اللي هي read-only
  - why: Two stacked imperatives («ابدأ شغّل») is a spoken-only construction; the verbal noun reads cleanly.

- [readability] line 108 (pattern 8)
  - was: أول ما beta header يتبعت، مش بيتلغي أبدًا أثناء الـ session
  - now: أول ما beta header يتبعت، مش بيتشال تاني طول الـ session
  - why: 'unset' a header = stop sending / remove it; «يتلغي» suggests cancelling an operation.

- [consistency] line 55 (Part III tagline)
  - was: أما agents كتير بتشتغل مع بعض فدي نقلة نوعية
  - now: أما agents كثيرة بتشتغل مع بعض فدي نقلة نوعية
  - why: Ruling 3: «كثير/كثيرة» spelling everywhere. «نقلة نوعية» for 'transformative' is approved.

- [readability] line 21 (intro paragraph)
  - was: وخاتمة بعنوان **"طبّق ده"**. الخاتمة دي بتستخلص patterns ينفع تتنقل لأي نظام، تقدر تاخدها وتستخدمها في أنظمتك.
  - now: وخاتمة بعنوان **"طبّق ده"** بتستخلص patterns تقدر تاخدها وتستخدمها في أنظمتك.
  - why: 'transferable … you can steal for your own systems' is rendered twice («ينفع تتنقل لأي نظام» + «تقدر تاخدها وتستخدمها»); one clause carries it and avoids the extra sentence split.

### book/ch01-architecture.md (7 items)

- [accuracy] line 84 (Golden Path, 'Third, the entire loop is re-entrant')
  - was: ثالثًا، الـ loop كله re-entrant (ينفع يتنادى تاني قبل ما يخلّص).
  - now: ثالثًا، الـ loop كله re-entrant (بيرجع يدخل نفسه تاني بالـ context المحدّث).
  - why: The author uses 're-entrant' loosely (the loop feeds results back and calls the model again). The strict CS gloss contradicts the very next sentences and would confuse the reader. Ruling 7 revises the glossary gloss.

- [readability] line 5 (What You're Looking At)
  - was: أمر واحد، فعل واحد، و output من نوع deterministic.
  - now: أمر واحد، فعل واحد، و output من نوع deterministic (نفس المدخلات بتدّي نفس المخرجات كل مرة).
  - why: Ruling 7 adds a glossary entry; a 2-year reader may not know 'deterministic' and the sentence is the chapter's opening.

- [consistency] line 149 (Multi-Provider Architecture, last sentence)
  - was: الـ agent loop والـ tool system ونموذج الصلاحيات كلها provider-agnostic تمامًا.
  - now: الـ agent loop والـ tool system ونظام الصلاحيات كلها provider-agnostic تمامًا.
  - why: 'permission model' here is the same permission system named everywhere else; «نموذج» introduces a new word for the same concept.

- [consistency] line 9 (abstractions gloss) and line 155 (feature flags gloss)
  - was: بـ 6 abstractions (الـ abstraction مفهوم أساسي بيخبّي التفاصيل وراه) … والـ compile-time feature flags (الـ feature flag مفتاح بيشغّل أو يقفل ميزة)
  - now: بـ 6 abstractions (مفاهيم أساسية بتخبّي التفاصيل وراها) … والـ compile-time feature flags (مفاتيح بتشغّل أو تقفل ميزات)
  - why: Ruling 5: adapt the gloss's number instead of prefixing the singular term; ch04 already uses the pluralised feature-flags form, so this aligns the pages.

- [readability] line 45 (6. Hooks)
  - was: عبارة عن interceptors بيعرّفها المستخدم على الـ lifecycle (دورة حياة التنفيذ). … نظام الصلاحيات نفسه جزء منه متنفّذ عن طريق الـ hooks:
  - now: عبارة عن interceptors (نقاط اعتراض) بيعرّفها المستخدم على الـ lifecycle (دورة حياة التنفيذ). … جزء من نظام الصلاحيات نفسه متنفّذ عن طريق الـ hooks:
  - why: First sentence is dense with English; the short gloss (new glossary entry) unblocks the reader. The second sentence's topic-comment order («نظام الصلاحيات نفسه جزء منه») is stiff; fronting «جزء من» reads naturally.

- [readability] line 210 (Apply This, 'Separate infrastructure state…', last sentence)
  - was: مستويين عشان فيه 2 access patterns.
  - now: مستويين لأن فيه access patterns اتنين مختلفين.
  - why: 'Two tiers match two access patterns' — «عشان فيه 2 access patterns» reads as a fragment and puts a bare digit before an English plural mid-sentence.

- [style] line 90 (The Permission System, first sentence)
  - was: بيشغّل Claude Code أي أوامر shell على جهازك.
  - now: (keep as is)
  - why: Confirming the translator's choice: «أي أوامر shell» is correct for 'arbitrary' in the security sense; the guide's «عشوائية» example is superseded (Ruling 7). No change needed, listed so the translator does not revert it.

### book/ch02-bootstrap.md (9 items)

- [readability] line 3 (intro, second sentence)
  - was: كل component من الـ 6 abstractions (مفهوم أساسي بيخبّي التفاصيل وراه) لازم يتهيّأ قبل ما المستخدم يشوف الـ cursor: الـ query loop، والـ tool system، والـ state layers، والـ hooks، والـ Memory.
  - now: كل component من الـ 6 abstractions (مفاهيم أساسية بتخبّي التفاصيل وراها)، يعني الـ query loop والـ tool system والـ state layers والـ hooks والـ memory، لازم يتهيّأ قبل ما المستخدم يشوف الـ cursor.
  - why: Moving the enumeration after the colon makes it read as a list of things the user sees after the cursor. An apposition with «يعني» keeps the source meaning. Also applies Ruling 5 (plural gloss) and Ruling 10 (lowercase 'memory' as in source).

- [style] lines 74, 76, 239 («على ما»)
  - was: على ما الـ JavaScript engine بيعمل evaluate … / وعلى ما الـ functions … تتنادى لأول مرة / على ما الـ REPL يعمل render
  - now: أثناء ما الـ JavaScript engine بيعمل evaluate … / ولما الـ functions … تتنادى لأول مرة / لما الـ REPL يعمل render
  - why: Ruling 14: «على ما» is regional and outside the closed colloquial list; «أثناء ما» (while) and «لما» (by the time) are on-register.

- [consistency] lines 43, 78, 245 («و» glued to Latin/code)
  - was: و`claude --help` و`claude mcp list` / وside-effect-in-module-scope / و`await promise`
  - now: و `claude --help` و `claude mcp list` / و side-effect-in-module-scope / و `await promise`
  - why: Ruling 1: «و» + space before Latin or backticked tokens, as ch01/ch03 do.

- [readability] line 121 (The preAction Hook)
  - was: بيعمل Commander parse لبنية الأمر (الـ flags، والـ subcommands، والـ positional arguments) *من غير* ما ينفذ أي حاجة.
  - now: مكتبة Commander بتعمل parse لبنية الأمر (الـ flags، والـ subcommands، والـ positional arguments) *من غير* ما تنفذ أي حاجة.
  - why: «بيعمل Commander parse» interleaves the subject inside the «يعمل + English word» verb phrase, which the guide forbids (keep the English term on one side). A category noun also fixes the Latin-start problem.

- [consistency] line 154 (Phase 3, hook snapshot paragraph)
  - was: وبتتجمّد في snapshot يكون immutable، وبتُستخدم لباقي الـ session. … الـ snapshot المجمّد هو المرجع الوحيد المعتمد في قرارات الصلاحيات.
  - now: وبتتجمّد في snapshot يكون immutable، وبتفضل هي المستخدمة لباقي الـ session. … الـ snapshot المجمّد هو الـ source of truth (المرجع الوحيد المعتمد) في قرارات الصلاحيات.
  - why: Ruling 7 keeps 'source of truth' in English (ch03 already does) with the glossary gloss; Ruling 4 removes the damma passive «بتُستخدم».

- [readability] line 37 (fourth strategy, last sentence)
  - was: لأن بدء التشغيل مش بيدفع ثمن modules ممكن مش هيستخدمها أبدًا.
  - now: لأن بدء التشغيل مش بيدفع ثمن modules ممكن ما يحتاجهاش أبدًا.
  - why: «ممكن مش هيستخدمها» stacks two negation/modal particles awkwardly; the extended ما…ش rule (Ruling 2) allows the natural form.

- [readability] line 253 (Apply This, last bold lead-in)
  - was: **احفظ الـ input المبكر قبل ما تعمل yield.**
  - now: **احفظ الـ input المبكر قبل ما تسيب التحكم.**
  - why: 'yielding' here means yielding control to the event loop, not the generator keyword; after chapters built around generator `yield`, «تعمل yield» misleads. The paragraph's «قبل ما يبدأ أي شغل async» carries the rest.

- [consistency] lines 43, 56, 60, 84 and all «أكتر»
  - was: استدعاءات كتير … بالظبط (x2) … لو مافيش fast path مطابق … أكتر (x6)
  - now: استدعاءات كثيرة … بالضبط … لو مفيش fast path مطابق … أكثر
  - why: Ruling 3 spelling standardisation; Ruling 2 single spelling of «مفيش».

- [style] line 168 (Phase 4, last paragraph)
  - was: وسلوكها متوقَّع
  - now: وسلوكها متوقّع
  - why: Ruling 4: shadda only, no fatḥa.

### book/ch03-state.md (6 items)

- [consistency] line 223 (3.3, two-tier handoff sentence)
  - was: الـ UI store هو الـ source of truth للي المستخدم اختاره، لكن الـ bootstrap state هو الـ source of truth للي الـ API client بيستخدمه.
  - now: الـ UI store هو الـ source of truth (المرجع الوحيد المعتمد) للي المستخدم اختاره، لكن الـ bootstrap state هو الـ source of truth للي الـ API client بيستخدمه.
  - why: Ruling 7: keeping the English term is approved; add the glossary gloss at first mention so it matches ch02.

- [style] line 249 (3.5, CLAUDE.md cache paragraph, last sentence)
  - was: ولما الـ cache يتحط في الـ bootstrap state (وهو DAG leaf)، الدايرة بتتفك.
  - now: ولما الـ cache يتحط في الـ bootstrap state (وهو DAG leaf)، الـ cycle بيتفك.
  - why: «الدايرة» is a colloquial spelling of a content word (guide 1.1 wants MSA content words) and 'cycle' is the searchable term the author uses; «يفك» for cycles vs «يكسر» for cache is approved.

- [style] line 259 (3.6, cost restore sentence)
  - was: التكاليف مش بتُسترجع غير لو الـ session ID المحفوظ مطابق للـ session اللي بيتعملها resume.
  - now: النظام مش بيسترجع التكاليف غير لو الـ session ID المحفوظ مطابق للـ session اللي بيتعملها resume.
  - why: Ruling 4: no damma-marked passive; the active form is on-register and shorter.

- [readability] line 5 (intro, second paragraph)
  - was: في CLI tool بسيطة الإجابة سهلة: كام متغير في `main()`.
  - now: في CLI tool بسيطة الإجابة سهلة: متغيرات قليلة في `main()`.
  - why: «كام متغير» is spoken Egyptian outside the closed list; «متغيرات قليلة» is neutral and equally short.

- [readability] line 29 (The ~80 Fields, intro line)
  - was: عيّنة منها بتوضح قد إيه هي متنوعة:
  - now: عيّنة منها بتوضح مدى تنوعها:
  - why: «قد إيه هي متنوعة» is a spoken construction; «مدى تنوعها» is the plain written form of 'reveals the breadth'.

- [consistency] whole page (spelling audit)
  - was: أكثر (x3) / بالضبط (x3) / مفيش (x4) — already correct
  - now: (no change)
  - why: This page is the reference for the Ruling 2/3 spellings; other pages align to it. Listed so the translator does not 'harmonise' toward the other pages' spellings.

### book/ch04-api-layer.md (8 items)

- [accuracy] line 119 (blockquote, Arabic meaning)
  - was: (كل conditional هنا عبارة عن runtime bit، ولو كان في مكان تاني كان هيضاعف عدد الـ variants الخاصة بالـ Blake2b prefix hash بمقدار 2^N.)
  - now: (كل conditional هنا عبارة عن runtime bit، ولو اتحط قبل الـ boundary كان هيضاعف عدد الـ variants الخاصة بالـ Blake2b prefix hash بمقدار 2^N.)
  - why: 'otherwise' means 'if it were not after the boundary'; «في مكان تاني» (somewhere else) loses the causal point the paragraph exists to make.

- [readability] line 5 (intro, second paragraph)
  - was: ولازم تبني الـ system prompts وهي واعية على مستوى الـ byte بطريقة عمل الـ prompt cache على الـ server، لأن section واحد في غير مكانه ممكن يكسر الـ cache (cache bust)، وهو cache قيمته 50,000+ tokens. … ولازم تحافظ على invariants ثابتة طول الـ session (الـ invariant شرط لازم يفضل صحيح طول الوقت).
  - now: ولازم تبني الـ system prompts وهي فاهمة، على مستوى الـ byte، إزاي الـ prompt cache على الـ server بيشتغل، لأن section واحد في غير مكانه ممكن يكسر cache (cache bust) قيمته 50,000+ tokens. … ولازم تحافظ على invariants (شروط لازم تفضل صحيحة طول الوقت) ثابتة طول الـ session.
  - why: «واعية … بطريقة عمل» is a calque of 'awareness of how'; «وهو cache قيمته» is a detour to attach the value. Ruling 5 for the pluralised invariant gloss placed right after the term.

- [consistency] lines 61, 113, 131, 169, 199 («و» glued to Latin/code)
  - was: و`AnthropicFoundry` و`AnthropicVertex` / و`DANGEROUS_uncachedSystemPromptSection` / وClaude Code / و`AssistantMessage` و`SystemAPIErrorMessage` / وprompt مبني بشكل سيئ
  - now: و `AnthropicFoundry` و `AnthropicVertex` / و `DANGEROUS_uncachedSystemPromptSection` / و Claude Code / و `AssistantMessage` و `SystemAPIErrorMessage` / و prompt مبني بشكل سيئ
  - why: Ruling 1: «و» + space before Latin or backticked tokens.

- [consistency] line 155 (1-hour TTL)
  - was: بيضمن إن لو حالة الـ overage اتقلبت في نص الـ session، الـ TTL مش هيتغير.
  - now: بيضمن إن لو حالة الـ overage (تجاوز حد الاستهلاك) اتقلبت في نص الـ session، الـ TTL مش هيتغير.
  - why: Ruling 7 adds an overage entry; without it the sentence is opaque to a reader who has not seen the billing context.

- [readability] line 135 (The Idle Watchdog, last sentence)
  - was: ولو الـ streaming body وقف بعد كده، مش هيلاحظه أي حاجة.
  - now: ولو الـ streaming body وقف بعد كده، مفيش حاجة هتلاحظه.
  - why: «مش هيلاحظه أي حاجة» mirrors English 'nothing catches it' word order; the existential negation is how Arabic says it.

- [readability] line 182 (Output Token Cap)
  - was: لما response يوصل للـ cap (<1% من الـ requests)، بياخد retry واحد من الأول بحد 64K.
  - now: لما response يوصل للـ cap (<1% من الـ requests)، بياخد retry واحد بحد 64K.
  - why: 'one clean retry' most plausibly means a single retry with no further escalation; «من الأول» adds a 'from scratch' meaning the source does not state. (Listed as debatable in globalNotes.)

- [style] line 163 (Sticky Latches in Action, last sentence)
  - was: وليه إن كل الـ headers تتبعت دايمًا مش هو الحل الصح.
  - now: وليه إن كل الـ headers تتبعت دائمًا مش هو الحل الصح.
  - why: Ruling 3: MSA spelling of content words.

- [consistency] lines 5, 73, 203 and elsewhere («أكتر»)
  - was: أكتر من أي جزء تاني … أكتر عنصر حساس … أكتر مما تتوقع
  - now: أكثر من أي جزء تاني … أكثر عنصر حساس … أكثر مما تتوقع
  - why: Ruling 3 spelling standardisation across pages.

### book/ch05-agent-loop.md (12 items)

- [accuracy] Line 359, Iteration 2 ("input backfill expands the path")
  - was: والـ input backfill بيوسّع الـ path
  - now: والـ input backfill بيحوّل الـ path لمسار absolute
  - why: "expands" here means resolving a relative/tilde path to an absolute one, not widening. ch06 line 164 renders the same mechanism as «تحويل `~/foo.txt` لمسار absolute»; match it.

- [accuracy] Line 105 (table row `pendingToolUseSummary`) and line 359 ("The pending Haiku summary ... resolves during streaming")
  - was: بيتحل أثناء الـ streaming الحالي / بيتحل أثناء الـ streaming
  - now: بيتعمل له resolve أثناء الـ streaming الحالي / بيتعمل له resolve أثناء الـ streaming
  - why: «بيتحل» reads as "gets solved". A promise resolving is «بيتعمل له resolve» (ch02 precedent «عملت resolve»).

- [consistency] Line 32 ("A user abort?")
  - was: إيقاف من المستخدم؟
  - now: abort من المستخدم؟
  - why: abort is KEEP in the glossary and the terminal-state table on the same page says «المستخدم عمل abort». Keep one rendering.

- [markdown] Line 218 ("identified by `tool_use_id`")
  - was: وبيحددها بالـ `tool_use_id`
  - now: وبيحددها عن طريق الـ field `tool_use_id`
  - why: Guide 2.3: «الـ» never sits directly before a backtick; put a category noun in between.

- [consistency] Lines 226, 246, 377 (numbers before English plurals)
  - was: 250K API call في اليوم / 13,000 token / أقل من 500 token
  - now: 250K API calls في اليوم / 13,000 tokens / أقل من 500 tokens
  - why: Guide 2.4: digit + English plural exactly as the source has it (ch04 does this: «8,000 tokens»).

- [readability] Line 495, Apply This closing paragraph (withholding pattern and escalation ladder glosses)
  - was: والـ withholding pattern (الـ loop بيحجب الخطأ لحد ما يتأكد إن التعافي فشل) بيفصّل استدعاء الـ model. والـ escalation ladder (سلّم تصعيد: كل محاولة فاشلة بتجرّب حل أقوى) بيفصّل الـ error recovery.
  - now: والـ withholding pattern بيفصّل استدعاء الـ model. والـ escalation ladder بيفصّل الـ error recovery.
  - why: Both concepts were introduced and defined by their own sections (lines 283 and 303) 200 lines earlier; the sentence-level definitions there make the gloss redundant (guide 2.7 "skip when the sentence states the definition"). A gloss in the wrap-up reads as if the reader skipped the chapter. The adapted withholding gloss itself is correct and goes into the glossary (see globalNotes).

- [omission] Line 428 ("would leave orphaned `tool_use` blocks")
  - was: هيسيب `tool_use` blocks orphaned (من غير `tool_result` مقابل)
  - now: هيسيب `tool_use` blocks orphaned
  - why: The parenthetical is an addition with no glossary entry, and the previous sentence already explains what orphaned means. Line 297 uses orphaned bare; keep it bare here too.

- [consistency] Line 460, Dependency Injection paragraph
  - was: وجنب الـ object `State` القابل للتعديل والـ type `QueryDeps` القابل للحقن
  - now: وجنب الـ object `State` اللي هو mutable والـ type `QueryDeps` اللي بيتحقن
  - why: mutable is KEEP; two sentences later the same paragraph writes «(mutable state، و immutable config، و injectable deps)». Do not translate the adjective in one clause and keep it in the next.

- [style] Lines 36 and 466 ("rewound" / "rewind")
  - was: ماينفعش "ترجّعها لورا" / عمرك ما هتحتاج ترجّعها لورا
  - now: ماينفعش "ترجّعها للخلف" / عمرك ما هتحتاج ترجّعها للخلف
  - why: «لورا» is Egypt-only content vocabulary (guide 1.1: content words are MSA). «للخلف» is understood everywhere.

- [readability] Line 395 ("a `Continue` (the loop iterates)")
  - was: `Continue` (الـ loop بيكرر)
  - now: `Continue` (الـ loop بيلف لفّة جديدة)
  - why: «بيكرر» without an object is vague (repeats what?). "iterates" = goes round again.

- [readability] Line 353 ("A Haiku summary promise is kicked off in the background")
  - was: و promise لـ Haiku summary بيتبدأ في الخلفية
  - now: وبيبدأ promise لـ Haiku summary في الخلفية
  - why: «بيتبدأ» is not a natural form; verb-first also avoids the line starting with «و promise».

- [readability] Line 210 ("Tools without a finite `maxResultSizeChars` are exempted")
  - was: والـ tools اللي ملهاش `maxResultSizeChars` محدود بتتستثنى
  - now: والـ tools اللي قيمة `maxResultSizeChars` عندها مش محدودة بتتستثنى
  - why: «محدود» dangling after the code span is hard to parse; the source means "whose limit is not finite" (i.e. Infinity, like FileReadTool in ch06).

### book/ch06-tools.md (10 items)

- [accuracy] Line 114, assembleToolPool step 1 ("REPL mode hiding")
  - was: وإخفاء الـ tools الخاصة بالـ REPL mode
  - now: والإخفاء حسب الـ REPL mode
  - why: The source says tools are hidden *based on* REPL mode, not that REPL-specific tools are hidden. The current wording inverts which tools get hidden; the neutral phrasing mirrors the source's ambiguity without picking a wrong reading.

- [readability] Line 209, last sentence ("too complex to confidently exclude from safety checks")
  - was: فهو معقد لدرجة إننا مش نقدر نستبعده بثقة من فحوصات الأمان
  - now: فهو معقد لدرجة إننا ما نقدرش نستبعده بثقة من فحوصات الأمان
  - why: «مش + bare verb» is ungrammatical in this register; present negation is «مش بـ...» or «ما...ش» (guide 1.2).

- [consistency] Lines 11 and 82 (numbers before English plurals)
  - was: حوالي 45 member / فيها 15+ argument
  - now: حوالي 45 members / فيها 15+ arguments
  - why: Guide 2.4: digit + English plural as a developer would say it.

- [consistency] Line 308, What Comes Next ("orchestrated into concurrent batches")
  - was: وإزاي الـ tools بتتنظم في batches بتشتغل بالتوازي هو موضوع الفصل 7
  - now: وإزاي الـ tools بتتنظم في concurrent batches هو موضوع الفصل 7
  - why: concurrent batch is KEEP, and ch05 line 279 renders the identical sentence as «بتتنظّم في concurrent batches». The two hand-offs to ch07 should match.

- [consistency] Line 264, FileReadTool ("creating an infinite loop")
  - was: وكده بندخل في loop مالوش نهاية
  - now: وكده بندخل في infinite loop
  - why: ch05 keeps «infinite loop» in English throughout (lines 11, 103, 226). Same term, same rendering.

- [style] Line 221 ("changes the prompt by a few tokens rather than hundreds")
  - was: بيغيّر الـ prompt بكام token بدل مئات
  - now: بيغيّر الـ prompt بشوية tokens بدل مئات
  - why: «كام» is not in the allowed colloquial list (1.2); «شوية» is.

- [consistency] Line 288, last sentence ("if two concurrent tools both modify the working directory")
  - was: لو tools اتنين شغالين بالتوازي والاتنين عدّلوا الـ working directory، مين اللي يكسب؟
  - now: لو فيه tools اتنين بتشتغل بالتوازي وعدّلت الاتنين الـ working directory، مين اللي تكسب؟
  - why: Guide 2.6: English plurals of things take feminine singular agreement, even with a numeral.

- [accuracy] Line 296, Apply This ("correct but wasteful")
  - was: صحيح لكن فيه إهدار كبير
  - now: صحيح لكن فيه إهدار
  - why: «كبير» is an intensifier the source does not have.

- [readability] Line 160 ("Zod Validation catches type mismatches")
  - was: بيمسك اختلافات الـ types
  - now: بيمسك عدم تطابق الـ types
  - why: «اختلافات» reads as "differences between types"; a mismatch is «عدم تطابق».

- [readability] Line 108 ("is resolved at bundle time")
  - was: بيتحسم وقت الـ bundle
  - now: بيتحدد وقت الـ bundle
  - why: «بيتحسم» (gets settled, as in a dispute) is an odd verb for a compile-time constant; «بيتحدد» is what a 2-year dev would say.

### book/ch07-concurrency.md (6 items)

- [style] Line 342, `'block'` bullet ("writes mid-flight")
  - was: (عمليات كتابة لسه ماخلصتش، وأوامر bash طويلة)
  - now: (عمليات كتابة ما خلصتش، وأوامر bash طويلة)
  - why: «لسه» is on the banned list (1.3: use «ما زال»); here the simple negated past says it.

- [readability] Lines 229 and 397 ("Bash commands often form implicit dependency chains" / "shell commands often form implicit pipelines")
  - was: أوامر Bash كثير بتكوّن سلاسل اعتمادية ضمنية / لأن أوامر الـ shell كثير بتكوّن pipelines ضمنية
  - now: أوامر Bash غالبًا بتكوّن سلاسل اعتمادية ضمنية / لأن أوامر الـ shell غالبًا بتكوّن pipelines ضمنية
  - why: «كثير» as an adverb for "often" is slang and momentarily reads as the adjective ("many Bash commands"). «غالبًا» is the plain word.

- [consistency] Line 373 ("if two tools are concurrency-safe")
  - was: بالتعريف، لو فيه tool اتنين concurrency-safe، مفيش واحدة فيهم
  - now: بالتعريف، لو فيه tools اتنين concurrency-safe، مفيش واحدة فيهم
  - why: Plural noun after «اتنين» (guide 2.4 uses the English plural after a number).

- [consistency] Line 271 ("All three start concurrently")
  - was: التلاتة بيبدأوا بشكل concurrent
  - now: التلاتة بتبدأ بشكل concurrent
  - why: Guide 2.6: things in the plural take feminine singular agreement; «بيبدأوا» is human-plural agreement.

- [style] Lines 48, 314, 315, 316 ("pure read")
  - was: قراءة خالصة
  - now: قراءة بحتة
  - why: Correct MSA, but «خالص» is also the banned Egyptian intensifier and the self-check regex flags every occurrence; «بحتة» is the standard collocation for "pure" in this sense and avoids the false alarm.

- [readability] Line 385, Apply This ("The implementation cost is a simple array walk")
  - was: تكلفة الـ implementation مجرد مشي بسيط على array
  - now: تكلفة الـ implementation مجرد لفّة بسيطة على array
  - why: «مشي على array» is a calque; «لفّة على» is how the same idea ("walks the tools array") is naturally said, and the page already uses «بيلف على» for iterate.

### book/ch18-epilogue.md (5 items)

- [readability] Line 5, opening sentence ("Claude Code is not the only agentic system.")
  - was: برنامج Claude Code مش النظام الـ agentic الوحيد (ونظام agentic يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل). وهو مش الأول كمان.
  - now: برنامج Claude Code مش النظام الـ agentic الوحيد. وهو مش الأول كمان. — and move the gloss to line 133: «لو بتبني نظام agentic (يعني الـ model هو اللي بيقرر الخطوات وقت التشغيل)، فده الدرس اللي ينفع تاخده معاك.»
  - why: The epilogue's first line should land like the source's punchy 6-word sentence; a 12-word explanatory parenthetical kills it. Guide 2.7 allows moving the gloss to a later mention when the first sits in a dense spot; line 133 is the natural host.

- [style] Line 91 ("they point toward where the field is going")
  - was: وبتشاور على المجال رايح فين
  - now: وبتشير لفين المجال رايح
  - why: «بتشاور» is Egypt-only content vocabulary (1.1); «بتشير» is the MSA verb every reader knows, and it keeps the colloquial «فين» glue.

- [style] Line 135, final sentence ("The crab has the map in its claw.")
  - was: والسلطعون ماسك الخريطة في كمّاشته.
  - now: والسلطعون ماسك الخريطة في مخلبه.
  - why: «كمّاشة» is pliers/tongs in most of the Arab world and only regionally a crab's claw; «مخلب» is what a pan-Arab reader expects and keeps the closing line clean. Matches the 3.11 mascot ruling («السلطعون»).

- [consistency] Line 39, last sentence ("crash their developers' sessions")
  - was: من غير ما تقلق إن hook script مكتوب غلط يوقّع sessions المطوّرين عندها
  - now: من غير ما تقلق إن hook script مكتوب غلط يعمل crash لـ sessions المطوّرين عندها
  - why: Two sentences earlier the page uses «يعمل crash للـ host»; «يوقّع» is dev slang not in the guide. One rendering for crash-as-verb per page (2.5).

- [readability] Line 5 ("distinguish it from the landscape of agent frameworks")
  - was: بتميّزه عن باقي الساحة في الـ agent frameworks
  - now: بتميّزه عن باقي ساحة الـ agent frameworks
  - why: «الساحة في الـ X» is a calque of the English preposition; the iḍāfa is the natural Arabic shape (glossary: landscape → الساحة).

### book/ch08-sub-agents.md (22 items)

- [accuracy] L552 (Generator Chain, Cancellation)
  - was: وتنظيف الـ 15 خطوة بيشتغل بغض النظر عن إن الـ agent خلّص بشكل طبيعي
  - now: والتنظيف اللي في الخطوة 15 بيشتغل بغض النظر عن إن الـ agent خلّص بشكل طبيعي
  - why: The author means Step 15's `finally` cleanup. The Arabic reads as 'the cleanup of the 15 steps', which is a different and confusing claim; the English ambiguity does not carry over.

- [accuracy] L145 (call() Decision Tree)
  - was: `runAgent()` عبارة عن lifecycle function صافية، ماتعرفش حاجة عن الـ teammates
  - now: `runAgent()` عبارة عن lifecycle function وبس: ماتعرفش حاجة عن الـ teammates
  - why: 'pure lifecycle function' here means 'purely/only a lifecycle function', not a pure function in the FP sense. «صافية» imports the FP meaning and misleads a reader who just learned «pure function» elsewhere.

- [accuracy] L101 (Feature Gating)
  - was: الـ gates من نوع compile-time بتتبدل كـ strings وقت الـ build
  - now: الـ gates من نوع compile-time بيتبدل نصها بقيمتها الثابتة وقت الـ build
  - why: 'string-replaced during the build' means the call is textually substituted by its constant value; «بتتبدل كـ strings» (replaced as strings) does not convey that.

- [consistency] L147 (fork guard paragraph) and L592
  - was: فيه حاجزين بيمنعوه … الحاجز الأساسي سريع وموثوق … ده حاجز ضد انحراف الـ model
  - now: فيه 2 guards بيمنعوه … الـ guard الأساسي سريع وموثوق … ده guard ضد انحراف الـ model
  - why: 'guard' is KEEP in ch01, ch05, ch09 and the glossary («الـ death spiral guard»). ch08 alone translates it as «حاجز».

- [consistency] L299, L323 (×2), L445, L710 (×2), L712 and 3 more
  - was: الـ agent definition مش يقدر يضعّفه / الـ Explore agent مش يقدر يستدعي FileEdit / الـ async agent مش يقدر يدفع
  - now: مش بيقدر يضعّفه / مش بيقدر يستدعي FileEdit / مش بيقدر يدفع
  - why: Guide 1.2: present negation is «مش + بـverb». ch01 and ch12 already write «مش بيقدر / مش بتقدر»; ch08 has 10 instances of «مش يقدر».

- [style] L7 and L614 (bold lead-in)
  - was: ساعات الـ parent agent بيقابل task التفويض أنسب لها / **ساعات الـ agent المتخصص أحسن من general-purpose agent معاه context أكثر.**
  - now: لما الـ parent agent يقابل task التفويض أنسب لها / **أحيانًا الـ agent المتخصص أحسن من general-purpose agent معاه context أكثر.**
  - why: «ساعات» (= sometimes) is Egyptian colloquial outside the guide's closed list; MSA «أحيانًا» is what the register calls for. L7's source is 'When…', so «لما» is also more faithful.

- [readability] L90 (Feature Gating opening)
  - was: نظام الـ sub-agents فيه أكثر feature gating تعقيدًا في الـ codebase كلها.
  - now: الـ feature gating في نظام الـ sub-agents هو الأكثر تعقيدًا في الـ codebase كلها.
  - why: «فيه أكثر feature gating تعقيدًا» is not idiomatic Arabic comparative; topic-first reads naturally.

- [style] L180
  - was: 17 parameter.
  - now: 17 parameters.
  - why: Guide 2.4: digit + the English plural as a developer says it («5 latches», «27 lifecycle events»).

- [readability] L197 (Step 1)
  - was: مثلًا الـ Explore agent الافتراضي ليه هو Haiku للمستخدمين الخارجيين
  - now: مثلًا الـ Explore agent بيستخدم Haiku افتراضيًا للمستخدمين الخارجيين
  - why: «الافتراضي ليه هو» is a stiff calque of 'defaults to'.

- [readability] L226 and L548
  - was: لكن فيه فلتر حرج / بتوفّر 4 قدرات حرجة
  - now: لكن فيه فلتر أساسي / بتوفّر 4 قدرات أساسية
  - why: «حرج» is a calque of 'critical' that Arabic readers hear as 'delicate/precarious'. Reserve it for the quoted string on L580.

- [readability] L245 (Step 4)
  - was: وده خفض إجمالي في التكلفة بيبرر التعقيد الزيادة اللي جابه الحقن الشرطي للـ context.
  - now: وده خفض إجمالي في التكلفة بيبرر التعقيد الإضافي اللي بيجيبه حقن الـ context بشكل شرطي.
  - why: «التعقيد الزيادة» and «الحقن الشرطي للـ context» are word-for-word; the suggested form is how a colleague would say it.

- [readability] L253 (Step 5 opening)
  - was: دي أكثر خطوة معقدة.
  - now: دي الخطوة الأكثر تعقيدًا.
  - why: Grammar: the superlative needs «الأكثر تعقيدًا» or «أكثر الخطوات تعقيدًا»; «أكثر خطوة معقدة» is malformed.

- [style] L387, L734, L751
  - was: الاستراتيجيات الثلاثة دي / الأبعاد الخمسة كلها (×2)
  - now: الـ 3 استراتيجيات دي / الـ 5 أبعاد كلها
  - why: Guide 2.4/5: spelled-out counts become digits, and L700 already writes «5 أبعاد» on the same page.

- [readability] L445 (Step 12)
  - was: لأن ده هيخلّي الـ UI الخاص بالـ parent ينط بشكل غير متوقع
  - now: لأن ده هيخلّي الـ UI الخاص بالـ parent يتغيّر فجأة بشكل غير متوقع
  - why: «ينط» is slangy for the register; 'jump unexpectedly' is about the UI changing under the user.

- [readability] L510 (Step 15)
  - was: الـ comment عن "whale sessions" (الـ sessions الضخمة) اللي بتعمل spawn لمئات الـ agents بيقول كثير:
  - now: الـ comment عن "whale sessions" (الـ sessions الضخمة) اللي بتعمل spawn لمئات الـ agents له دلالة كبيرة:
  - why: «بيقول كثير» is a calque of 'is telling'.

- [readability] L574 (Explore)
  - was: الـ Explore agent هو أكثر built-in agent متحسّن بشراسة لأنه الأكثر spawn: 34 مليون مرة في الأسبوع
  - now: الـ Explore agent هو الـ built-in agent اللي اتعمل له أكبر قدر من التحسين، لأنه الأكثر استخدامًا: بيتعمله spawn 34 مليون مرة في الأسبوع
  - why: «متحسّن بشراسة» is a literal 'aggressively optimized' and «الأكثر spawn» treats a verb as a noun; both stop a reader.

- [style] L582 (Plan)
  - was: مش هتحب model من فئة Haiku ياخد قرارات تصميم هيضطر model من فئة Opus ينفذها.
  - now: مش المفروض model من فئة Haiku ياخد قرارات تصميم هيضطر model من فئة Opus ينفذها.
  - why: 'You do not want X' is impersonal advice; «مش هتحب» reads as a personal preference.

- [style] L588 (Verification)
  - was: المختبِر العدائي.
  - now: الـ tester العدائي.
  - why: The kasra is tashkeel outside the guide's allowed set (tanween on adverbs, disambiguating shadda), and without it «المختبر» is ambiguous (tester vs. lab). «tester» is a term readers know.

- [readability] L690 (Frontmatter section)
  - was: وده معناه كمان إن الـ agent definitions بتتحكم في إصداراتها بالـ version control جنب الـ codebase.
  - now: وده معناه كمان إن الـ agent definitions بتتحفظ في الـ version control جنب الـ codebase.
  - why: 'version-controlled alongside the codebase' = stored in version control; «بتتحكم في إصداراتها» is a mistranslation of the participle.

- [readability] L730 (Dimension 5)
  - was: البُعد الاقتصادي غالبًا بيتفكّر فيه في الآخر في تصميم أنظمة الـ multi-agent … دي الفرق بين منتج قابل للحياة ومنتج تكلفته مش ممكن تتحمّل.
  - now: البُعد الاقتصادي غالبًا بيبقى آخر حاجة بيتفكّر فيها في تصميم أنظمة الـ multi-agent … دي الفرق بين منتج قابل للاستمرار ومنتج محدش يقدر يتحمّل تكلفته.
  - why: «بيتفكّر فيه في الآخر» is a doubled «في»; «قابل للحياة» is a calque of 'viable'; the 'unaffordable' phrase is smoother in the active form (also resolves the translator's close call).

- [style] L749 (design-space table, Statusline row)
  - was: task إعدادات
  - now: task إعداد
  - why: 'Config task' is a task whose purpose is configuration (singular); «إعدادات» (settings, pl.) reads as a settings task list.

- [consistency] L80–L82 (Dynamic Prompt)
  - was: L80: عشان ما تكسرش الـ prompt cache … L82: مش بيكسر الـ prompt cache (cache bust)
  - now: L80: عشان ما تكسرش الـ prompt cache (cache bust) … L82: مش بيكسر الـ prompt cache
  - why: Guide 2.5: the «(cache bust)» tag goes on the first mention of the idiom on the page, which is L80.

### book/ch09-fork-agents.md (11 items)

- [accuracy] L164 and L176 (Sync-to-Async / Auto-Backgrounding)
  - was: استدعاء `call()` الأصلي المتزامن بيرجّع … / يخلّص أغلب الـ tasks السريعة بشكل متزامن
  - now: استدعاء `call()` الأصلي الـ sync بيرجّع … / يخلّص أغلب الـ tasks السريعة بشكل synchronous (في المقدمة)
  - why: «متزامن» in Arabic technical usage (and in the Eqraatech reference) means *concurrent/simultaneous*, the opposite of what 'synchronous' means here. Keep sync/synchronous in Latin, as the rest of the chapter does.

- [consistency] L133 and L135
  - was: ده أسلوب احتياط فوق احتياط: تكلفة الفحص … / أسلوب احتياط فوق احتياط: تكلفة الفحص …
  - now: دي حماية مزدوجة: تكلفة الفحص … / حماية مزدوجة: تكلفة الفحص …
  - why: ch08 L147 renders the same guard pair as «حماية مزدوجة»; the translator's note claims to match ch08 but does not. One rendering across the book.

- [style] L117 and L133
  - was: فيه guard اتنين بيمنعوا ده / منع الـ fork بيعتمد على guard اتنين
  - now: فيه 2 guards بيمنعوا ده / منع الـ fork بيعتمد على 2 guards
  - why: Guide 2.4: digit + English plural. «guard اتنين» is a hybrid neither convention allows.

- [style] L43 (Layer 1)
  - was: ليه مانستدعيش `getSystemPrompt()` تاني وخلاص؟
  - now: ليه مش نستدعي `getSystemPrompt()` تاني ببساطة؟
  - why: «وخلاص» is in the guide's BAD slang example; «مانستدعيش» puts ما…ش on a present verb, outside the closed list (guide 1.2).

- [style] L188 (Non-interactive sessions)
  - was: مسار الـ fork بيتعطّل وخلاص.
  - now: مسار الـ fork بيتعطّل ببساطة.
  - why: Same «وخلاص» slang; 'simply disabled' = «ببساطة».

- [readability] L141 (Sync-to-Async opening)
  - was: لكن لو الـ child بياخد وقت طويل؟
  - now: لكن إيه اللي يحصل لو الـ child أخد وقت طويل؟
  - why: A bare «لو …؟» is not a complete Arabic question; 'But what if…?' needs the «إيه اللي يحصل» frame.

- [readability] L219 (Economics closing paragraph)
  - was: وده السبب إن كل قرار تصميم في نظام الـ fork، التمرير بدل إعادة الحساب، والـ exact tool passthrough، والـ placeholder results، وحتى الاحتفاظ بالـ tool `Agent` في الـ pool الخاص بالـ child رغم إنها ممنوعة، كله بيحسّن حاجة واحدة: prefixes متطابقة byte بـ byte.
  - now: وده السبب إن كل قرار تصميم في نظام الـ fork بيحسّن حاجة واحدة: prefixes متطابقة byte بـ byte. التمرير بدل إعادة الحساب، والـ exact tool passthrough، والـ placeholder results، وحتى الاحتفاظ بالـ tool `Agent` في الـ pool الخاص بالـ child رغم إنها ممنوعة، كلها بتخدم نفس الهدف.
  - why: Guide 1.5: a 40-word sentence with a 4-item aside between subject and predicate; split so the claim lands first and the list follows.

- [markdown] L243 (Apply This, principle 2)
  - was: (زي "do not use Agent" (ماتستخدمش Agent) في الـ fork boilerplate)
  - now: (زي "do not use Agent" يعني ماتستخدمش Agent، في الـ fork boilerplate)
  - why: Guide 2.7: never stack parentheses; deliver the gloss as a «يعني» clause when the term already sits inside a parenthetical.

- [readability] L251 (closing)
  - was: هتعيد تشكيل الـ architecture عندك لأي حد عشان تاخد الخصم ده؟ إجابة Claude Code: لحد بعيد جدًا.
  - now: هتعيد تشكيل الـ architecture عندك لأي مدى عشان تاخد الخصم ده؟ إجابة Claude Code: لمدى بعيد جدًا.
  - why: «لأي حد» reads as 'to whom'; 'how far' is «لأي مدى».

- [style] L160 (Sync-to-Async step 3)
  - was: الـ foreground iterator بيتقفل بهدوء عن طريق `iterator.return()`
  - now: الـ foreground iterator بيتقفل بشكل منظّم عن طريق `iterator.return()`
  - why: 'gracefully terminated' means orderly shutdown (finally runs), not quietly; «بهدوء» loses the technical point the next sentence makes.

- [style] L233 (Design Tensions closing)
  - was: الـ prefixes المتطابقة byte بـ byte تستاهل إنك تلوي الـ architecture حواليها.
  - now: الـ prefixes المتطابقة byte بـ byte تستاهل إنك تعيد تشكيل الـ architecture كلها عشانها.
  - why: «تلوي … حواليها» is a literal 'contort around'; the meaning is reshaping the architecture for their sake.

### book/ch12-extensibility.md (8 items)

- [accuracy] L9 (Two Dimensions, third paragraph)
  - was: والفصل ده مش صدفة.
  - now: والفصل بينهم ده مش صدفة.
  - why: Two lines later (L11) «الفصل ده» means 'this chapter'. Without «بينهم», L9 reads as 'this chapter is not a coincidence', losing the source's 'The separation is not accidental'.

- [accuracy] L155 (Stop event)
  - was: والـ hook اللي بيمنع هنا بيجبر الـ model يكمّل.
  - now: والـ hook اللي بيرجّع blocking result هنا بيجبر الـ model يكمّل.
  - why: 'A blocking hook forces continuation': the hook returns a blocking result (exit 2) and that forces continuation. «اللي بيمنع» makes the reader ask 'prevents what?' and contradicts the outcome (the model keeps going).

- [consistency] L7 (Two Dimensions)
  - was: هي interceptors (نقاط اعتراض) على الـ lifecycle (دورة حياة التنفيذ)، بتشتغل عند أكثر من 24 نقطة
  - now: هي lifecycle interceptors (نقاط اعتراض في دورة حياة التنفيذ)، بتشتغل عند أكثر من 24 نقطة
  - why: Guide 2.1: an English noun phrase stays whole with one article. Splitting it also stacks two glosses in one phrase, which the guide forbids.

- [consistency] L41 (Phase 1, ×2)
  - was: وتفصل الـ YAML frontmatter عن جسم الـ markdown … أما جسم الـ markdown فبيتحفظ داخل closure
  - now: وتفصل الـ YAML frontmatter عن نص الـ markdown … أما نص الـ markdown فبيتحفظ داخل closure
  - why: ch08 L675 renders 'markdown body' as «نص الـ markdown»; «جسم» is a calque.

- [readability] L184 and L302
  - was: استخدام exit 2 بيمنع إن المنع يحصل بالصدفة. / أما الـ exit code 2 كإشارة منع فبيمنع إن المنع يحصل بالصدفة.
  - now: استخدام exit 2 بيتجنّب إن المنع يحصل بالصدفة. / أما الـ exit code 2 كإشارة منع فبيتجنّب إن المنع يحصل بالصدفة.
  - why: «بيمنع إن المنع» repeats the root three times in one clause; 'prevents accidental enforcement' is «بيتجنّب».

- [consistency] L137 (Command hooks)
  - was: وده النوع اللي شايل أغلب الشغل.
  - now: وده النوع اللي شايل الشغل التقيل.
  - why: 'workhorse' is rendered «اللي شايل الشغل التقيل» in ch08 L568; keep one phrase across the book.

- [readability] L133 (H3 heading)
  - was: ### 4 أنواع المستخدم بيقدر يضبطها
  - now: ### الـ 4 أنواع اللي المستخدم بيقدر يضبطها
  - why: The relative clause needs «اللي»; as written the heading is a run-on that a reader parses twice.

- [accuracy] L284 (Integration section)
  - was: ومن غير التحويل ده، الـ hook اللي بيتحقق من توقف الـ agent عمره ما كان هيشتغل.
  - now: ومن غير التحويل ده، الـ hook اللي بيتحقق وقت توقف الـ agent عمره ما كان هيشتغل.
  - why: 'stop-verification hook' is a hook that verifies work at stop time, not one that checks whether the agent stopped.

### book/ch10-coordination.md (27 items)

- [accuracy] line 255, Coordinator Mode intro
  - was: وهو أكثر orchestration pattern في النظام ليه رأي واضح
  - now: وهو الـ orchestration pattern اللي بيفرض طريقة شغل محددة أكثر من أي pattern تاني في النظام
  - why: 'Opinionated' means the pattern imposes a specific way of working; «ليه رأي واضح» reads as 'has a clear opinion' and loses the sense of constraint that the next sections (three tools only, 370-line prompt) build on.

- [accuracy] line 29, Seven Types
  - was: الـ `local_bash` والـ `local_agent` هما حصان الشغل
  - now: الـ `local_bash` والـ `local_agent` هما اللي شايلين أغلب الشغل
  - why: «حصان الشغل» is a word-for-word calque of 'workhorse' with no Arabic currency (1.4). The meaning is 'the ones doing most of the work'.

- [accuracy] line 335, continue-vs-spawn list, item 2
  - was: الـ worker اللي خلّص حالًا فحص نظام الـ authentication ... البداية على نظافة أرخص.
  - now: الـ worker اللي خلّص للتو فحص نظام الـ authentication ... البداية بـ context فاضي أرخص.
  - why: «حالًا» means 'immediately' in MSA and only means 'just now' in Egyptian, so it is ambiguous for the wider audience. «البداية على نظافة» is a calque of 'starting clean'; the technical meaning is starting with an empty context.

- [accuracy] line 685, What the Orchestration Layer Reveals
  - was: الـ task states والـ mailboxes والـ notification XML كلها هندسة مباشرة
  - now: الـ task states والـ mailboxes والـ notification XML كلها هندسة عادية مفيش فيها حاجة معقدة
  - why: 'Straightforward engineering' means ordinary, uncomplicated engineering; «هندسة مباشرة» ('direct engineering') does not carry that meaning in Arabic.

- [accuracy] line 691, What the Orchestration Layer Reveals
  - was: والنظام لازم يتدهور بشكل مهذّب لما المستخدمين يدفعوه للحدود القصوى
  - now: والنظام لازم ينزل أداءه بالتدريج بدل ما ينهار لما المستخدمين يدفعوه للحدود القصوى
  - why: «يتدهور بشكل مهذّب» is a literal calque of 'degrade gracefully' and sounds absurd in Arabic. The meaning is controlled, gradual degradation instead of collapse.

- [accuracy] line 649, Choosing Between Patterns, swarm paragraph
  - was: نظام الـ mailbox بيدعم patterns غير synchronous
  - now: نظام الـ mailbox بيدعم patterns بتشتغل بشكل asynchronous
  - why: 'Asynchronous patterns' should use the term developers know; «غير synchronous» is a negation the reader has to unpack and does not match how the rest of the chapter says async/asynchronous.

- [consistency] lines 89, 245, 554, 569 (counts with English nouns)
  - was: فيه field اتنين يستاهلوا الانتباه / يفتكر إن task اتنين خلصوا / بين اتنين polls متتاليين / instance اتنين من Claude Code / بيشيل protocol رسمي اتنين
  - now: فيه 2 fields يستاهلوا الانتباه / يفتكر إن 2 tasks خلصت / بين 2 polls متتالية / 2 instances من Claude Code / بيشيل 2 protocols رسمية
  - why: Global ruling 1: with an English noun, use digit + English plural (line 116 already does «فيه 3 fields»). The hybrid «field اتنين» is neither the guide's form nor natural Arabic.

- [consistency] line 609, Auto-Resume cost paragraph
  - was: لكنه ضعيف في شغل المتابعة والتسجيل (bookkeeping). والـ auto-resume بيلعب على نقاط قوة الـ LLM بإنه بيشيل فئة كاملة من الـ bookkeeping من الصورة. ... إعادة قراءة آلاف الرسائل ربما
  - now: لكنه ضعيف في الـ bookkeeping (شغل المتابعة والتسجيل). والـ auto-resume بيلعب على نقاط قوة الـ LLM بإنه بيشيل فئة كاملة من الـ bookkeeping من الصورة. ... إعادة قراءة رسائل ممكن تكون بالآلاف
  - why: Reverse-format gloss (global ruling 2): English term first, Arabic after. Also «آلاف الرسائل ربما» leaves 'potentially' dangling at the end of the phrase.

- [consistency] line 116, Agent Task State
  - was: الـ tasks اللي خلصت ومش محجوزة (retained) بتاخد فترة سماح
  - now: الـ tasks اللي خلصت ومش محجوزة للـ UI بتاخد فترة سماح
  - why: Reverse-format gloss. The source says 'non-retained'; the code comment on `retain` says 'UI is holding this task', so «محجوزة للـ UI» conveys it without the parenthetical.

- [consistency] line 431, In-Process Teammates
  - was: الـ in-process teammates (جوه نفس الـ process، من غير process جديدة)
  - now: الـ in-process teammates (داخل نفس الـ process، من غير process جديدة)
  - why: «جوه» is banned by 1.3; the glossary gloss text is corrected by global ruling 3.

- [consistency] lines 278, 389, 245, 554 (agreement with English plurals)
  - was: فتفقد وعيها بالـ workers الخاصين بيها / أكثر من instance من Claude Code شغالين كفريق / الـ 14 turns اللي قبله كلهم / بيتواصلوا عن طريق relay
  - now: فتفقد وعيها بالـ workers الخاصة بيها / أكثر من instance من Claude Code شغالة كفريق / الـ 14 turns اللي قبله كلها / بتتواصل عن طريق relay
  - why: 2.6: English plurals of things take feminine singular agreement; the chapter mostly does this («الـ workers بتشوف») but slips in these spots.

- [consistency] line 221, Command queue paragraph
  - was: الـ array `pendingMessages` على `LocalAgentTaskState` هو الـ channel التالتة
  - now: الـ array `pendingMessages` على `LocalAgentTaskState` هي الـ channel التالتة
  - why: channel is feminine in 2.6; «التالتة» already agrees, the pronoun «هو» does not.

- [readability] line 11, intro
  - was: لكن stack من طبقات من الـ orchestration patterns، كل واحد منها مناسب لشكل مختلف من الشغل ... وفوق ده كله communication protocol موحّد
  - now: لكن stack متعدد الطبقات من الـ orchestration patterns، كل واحد منها مناسب لشكل مختلف من الشغل ... وكمان communication protocol موحّد
  - why: «من طبقات من» is a double partitive that trips the reader. «وفوق ده كله» adds 'on top of all that', which the source ('And a unified…') does not say.

- [readability] line 159, Foreground: The Generator Chain
  - was: الـ mechanism المثير هنا هو الـ escape hatch (مخرج استثنائي من القاعدة) للخلفية
  - now: الـ mechanism المهم هنا هو الـ background escape hatch (مخرج استثنائي من القاعدة)
  - why: 2.1: keep the English noun phrase whole («background escape hatch») and put the gloss after it instead of splitting it. «المثير» for 'interesting' reads as 'exciting/provocative'.

- [readability] lines 341-347, anti-pattern examples
  - was: Anti-pattern: *"Based on your research findings…"* … Pattern كويس: *"In `src/auth/validate.ts`…"*
  - now: الـ anti-pattern: *"Based on your research findings…"* (×3) … الـ pattern الكويس: *"In `src/auth/validate.ts`…"*
  - why: Section 6: four consecutive lines start with a Latin word and will render with the wrong base direction. «Pattern كويس» also capitalises a lowercase concept mid-prose (1.6 reject list).

- [readability] lines 307 and 343, quoted prompt renderings
  - was: (بناءً على نتائجك، اصلح الـ bug) / (اصلح الـ bug في الـ auth module.)
  - now: (بناءً على نتائجك، أصلح الـ bug) / (أصلح الـ bug في الـ auth module.)
  - why: Missing hamza on the imperative; 1.4 requires correct hamzas.

- [readability] line 451, In-Process Teammates
  - was: والـ array `onIdleCallbacks` بيخلّي النظام يتعلّق بلحظة الانتقال من النشاط للـ idle
  - now: والـ array `onIdleCallbacks` بيخلّي النظام يتدخل عند لحظة الانتقال من النشاط للـ idle
  - why: «يتعلّق بـ» means 'to be attached/related to'; 'hook into the transition' means to run code at that moment.

- [readability] line 459, The Mailbox
  - was: نظام mailbox (ملف على الـ disk بتتحط فيه الرسائل الموجهة للـ agent) مبني على الملفات
  - now: نظام mailbox مبني على الملفات (ملف على الـ disk بتتحط فيه الرسائل الموجهة للـ agent)
  - why: Section 6: do not interleave the gloss inside the noun phrase 'file-based mailbox system'.

- [readability] line 473, The Mailbox, Redis sentence
  - was: وكل ده عشان متطلب throughput (كمية الشغل اللي بتخلص في الوقت) استدعاء واحد للـ filesystem بيغطيه ببساطة.
  - now: وكل ده عشان متطلب throughput (كمية الشغل اللي بتخلص في الوقت) بسيط لدرجة إن استدعاء واحد للـ filesystem بيغطيه.
  - why: The relative clause has no connector after the gloss, so the reader hits «استدعاء واحد» with no idea how it attaches. Three glosses in one paragraph are per the rules, but the sentence must still parse.

- [readability] line 527, Input Schema
  - was: هو قناة الكلام غير الرسمي ("here are my findings" (دي نتائجي)) وهو كمان طبقة الـ protocol الرسمية ("I approve your plan" (أنا موافق على خطتك) / "please shut down" (من فضلك اقفل)).
  - now: هو قناة الكلام غير الرسمي، زي "here are my findings" (دي نتائجي)، وهو كمان طبقة الـ protocol الرسمية، زي "I approve your plan" (أنا موافق على خطتك) أو "please shut down" (من فضلك اقفل).
  - why: Nested parentheses around quoted strings are hard to read; 2.7 says not to stack parentheses. Restructure with «زي» instead.

- [readability] line 687, What the Orchestration Layer Reveals
  - was: التفويض الغامض مش بس غير كفء، هو بيفقد معلومات بالمعنى الحرفي لنظرية المعلومات (information-theoretically lossy).
  - now: التفويض الغامض مش بس غير كفء، هو بيضيّع معلومات فعلًا، بمفهوم نظرية المعلومات (information-theoretically lossy).
  - why: Keeping the English is right, but «بالمعنى الحرفي لنظرية المعلومات» ('in the literal sense of information theory') is heavy and slightly off; the author's point is that information is genuinely lost.

- [readability] lines 330 and 647
  - was: أكثر شكل فشل شائع هو القفز ... / بتمنع أكثر شكل فشل شائع في تفويض الـ LLMs
  - now: أشهر failure mode هو القفز ... / بتمنع أشهر failure mode في تفويض الـ LLMs
  - why: «أكثر شكل فشل شائع» is an ungrammatical superlative stack. failure mode is a KEEP term (3.2) and line 473 already glosses «failure modes» on this page, so the bare term is fine here.

- [readability] line 647, Coordinator mode paragraph
  - was: والـ system prompt اللي طوله 370 سطر مش مجرد مراسم
  - now: والـ system prompt اللي طوله 370 سطر مش مجرد شكليات
  - why: 'Not ceremony' means not empty formality; «مراسم» means rites/protocol events.

- [readability] line 487, broadcast paragraph
  - was: وتاني، على مقياس فرق الـ agents (عادةً من 3 لـ 8 أعضاء)، ده كافي تمامًا.
  - now: ومرة تانية، على مقياس فرق الـ agents (عادةً من 3 لـ 8 أعضاء)، ده كافي تمامًا.
  - why: «وتاني» alone reads as 'and another'; 'Again' as a discourse marker is «مرة تانية».

- [readability] line 693, layered architecture paragraph
  - was: من غير ما تغيّر الماكينة اللي تحتها
  - now: من غير ما تغيّر الآلية اللي تحتها
  - why: «ماكينة» is a physical machine loanword; 'underlying machinery' here is the mechanism.

- [style] line 679, The Cost of Orchestration
  - was: أما تشغيل coordinator عشان يصلح typo في ملف واحد فده overhead بحت من غير أي فايدة.
  - now: أما تشغيل coordinator عشان يصلح typo في ملف واحد فده overhead بحت.
  - why: 'Pure overhead' is fully rendered by «overhead بحت»; «من غير أي فايدة» is an addition the source does not have (section 4).

- [style] lines 9 and 261
  - was: ويتأكد إن مفيش حاجة باظت
  - now: ويتأكد إن مفيش حاجة اتكسرت
  - why: «باظ» is Egypt-only slang for 'broke' and appears nowhere else in the book; «اتكسر» is the pan-Arab dev idiom for 'broke' (tests/build) and matches the register.

### book/ch11-memory.md (12 items)

- [accuracy] line 91, exclusion list paragraph
  - was: الـ model عنده تعليمات إنه ما يوافقش على طول، ويسأل:
  - now: الـ model عنده تعليمات إنه يعترض ويسأل:
  - why: 'Push back' means to object/challenge, not merely 'not agree straight away'. Ruling on the close call: use the translator's alternative «يعترض». Keep the italics only in the English quote, as done.

- [consistency] line 179, Sonnet Side-Query
  - was: وتحليل الـ tradeoff (مفاضلة: بتكسب حاجة وبتدفع ثمنها في حاجة تانية) هنا مفيد
  - now: وتحليل الـ trade-off (مفاضلة: بتكسب حاجة وبتدفع ثمنها في حاجة تانية) هنا مفيد
  - why: Global ruling 6: glossary spelling «trade-off» regardless of source hyphenation; ch03, ch04 and ch15 all use the hyphen.

- [consistency] line 278, Background Extraction
  - was: بيوجّهه لاستراتيجية من turn اتنين: الـ turn الأول يقرأ بالتوازي، والـ turn التاني يكتب بالتوازي
  - now: بيوجّهه لاستراتيجية من 2 turns: الـ turn الأول يقرأ بالتوازي، والـ turn التاني يكتب بالتوازي
  - why: Global ruling 1: English noun takes digit + English plural.

- [readability] lines 13, 149, 304 (recurring phrase)
  - was: recall (استرجاع الـ memories المناسبة للمحادثة) بقوة LLM / relevance query بقوة LLM / الـ recall بقوة LLM
  - now: recall (استرجاع الـ memories المناسبة للمحادثة) معتمد على LLM / relevance query معتمد على LLM / الـ recall المعتمد على LLM
  - why: «بقوة LLM» is a calque of 'LLM-powered' ('by the power of'). «معتمد على» / «مبني على» is how Arabic says something is driven by a component. Fix all three occurrences the same way.

- [readability] line 29, Per-Project Scoping
  - was: الـ memory محدد بـ scope هو الـ git repository root، مش الـ working directory.
  - now: الـ scope الخاص بالـ memory هو الـ git repository root، مش الـ working directory.
  - why: The current sentence has a dangling «هو» clause after «scope»; a 2-year reader has to re-read it.

- [readability] line 179, Embedding similarity sentence
  - was: وبيتعب مع النفي
  - now: وضعيف في التعامل مع النفي
  - why: «بيتعب مع» ('gets tired with') is a colloquial calque of 'struggles with'; the technical claim is that embeddings handle negation poorly.

- [readability] line 217, Team Memory
  - was: والتداخل ده في الـ architecture مقصود: تعطيل الـ auto-memory بيعطّل الـ team memory معاه بالتبعية.
  - now: وإن الـ team memory جزء داخل الـ auto-memory بالشكل ده مقصود: تعطيل الـ auto-memory بيعطّل الـ team memory معاه بالتبعية.
  - why: 'Architectural nesting' means one lives inside the other; «التداخل» means overlap/interference, which contradicts the point. «بالتبعية» for 'transitively' is accepted.

- [readability] line 227, Layer 3: Symlink resolution
  - was: لو `team/evil` عبارة عن symlink بيشاور على `/etc/`
  - now: لو `team/evil` عبارة عن symlink بيشير لـ `/etc/`
  - why: «بيشاور على» is Egypt-only for 'points to' and not on the allowed colloquial list; «بيشير لـ» is the standard rendering.

- [readability] line 276, Background Extraction
  - was: (والآن اصلّح الـ bug في الـ login)
  - now: (والآن أصلح الـ bug في الـ login)
  - why: Missing hamza on the imperative (1.4).

- [readability] line 306, Apply This, first bold item
  - was: **الملفات بتغلب الـ databases في memory الـ agent.**
  - now: **الملفات بتكسب على الـ databases كـ memory للـ agent.**
  - why: «في memory الـ agent» reads as 'inside the agent's memory'; the source says files beat databases *as* agent memory.

- [readability] line 312, Apply This, staleness item
  - was: وصيغة العمر المقروءة للإنسان بتحرّك التفكير الصحيح بطريقة الـ timestamps الخام مش بتعملها.
  - now: وصيغة العمر المقروءة للإنسان بتحرّك التفكير الصحيح بشكل الـ timestamps الخام مش بتقدر عليه.
  - why: The relative clause «بطريقة ... مش بتعملها» has a gender mismatch (طريقة is feminine, the pronoun refers back oddly) and stalls the reader; rephrase so the pronoun agrees.

- [style] line 173, The Sonnet Side-Query
  - was: الـ manifest بيتبعت لـ model من Sonnet كـ side-query.
  - now: الـ manifest بيتبعت لـ Sonnet model كـ side-query.
  - why: 'A Sonnet model' is the model itself, not something 'from Sonnet'; keep the compound in English order (2.1).

### book/ch15-mcp.md (9 items)

- [accuracy] line 86, Annotation mapping
  - was: ده trust boundary (الخط الفاصل بين ما قبل موافقة المستخدم وما بعدها) مقبول، لكنه يستاهل تفهمه
  - now: ده trust boundary مقبول، لكنه يستاهل تفهمه
  - why: The glossary gloss was written for ch02's trust dialog (before/after the user approves a directory). Here the boundary is 'we trust what the server declares because the user opted into it'; the imported gloss actively misleads, and the following clause («المستخدم هو اللي اختار يضيف الـ server») already explains the boundary. Global ruling 4.

- [accuracy] line 5, Why MCP Matters
  - was: واحد من أكمل الـ production clients الموجودة أصلًا
  - now: واحد من أكمل الـ production clients الموجودة حاليًا
  - why: «أصلًا» means 'in the first place / at all' and subtly changes the claim; 'in existence' is simply 'currently existing'.

- [accuracy] line 195, Timeout table, Tool call row
  - was: عمليات طويلة بشكل مشروع
  - now: عمليات طويلة بطبيعتها
  - why: 'Legitimately long operations' means operations that genuinely take long; «بشكل مشروع» sounds like a legal judgement and confuses the reader.

- [consistency] lines 50, 52, 70, 80 (reverse-format glosses)
  - was: وده متوافق مع أقدم إعدادات MCP (backwards-compatible) / للخدمات البعيدة (remote) / بتحسب مفتاح موحّد (canonical key) / والاسم الكامل (fully qualified) بيمشي على الشكل
  - now: وده backwards-compatible مع أقدم إعدادات MCP / للخدمات البعيدة / بتحسب canonical key (مفتاح موحّد) / والـ fully qualified name بيمشي على الشكل
  - why: Global ruling 2: no Arabic-first glosses. Keep the searchable term English-first with the Arabic after (canonical key), or drop the parenthetical for plain adjectives (remote, fully qualified).

- [consistency] line 7, core proposition paragraph
  - was: ده الاتفاق كله.
  - now: ده الـ contract كله.
  - why: ch11 keeps 'contract' in English in the same sense («الـ Frontmatter كـ Contract»); «الاتفاق» sounds like a business agreement. Keep the book consistent.

- [consistency] line 70, Deduplication paragraph
  - was: لو فيه 2 servers مختلفين في الاسم
  - now: لو فيه 2 servers مختلفة في الاسم
  - why: 2.6: feminine singular agreement with English plurals. The digit + plural form itself is correct (global ruling 1).

- [readability] line 92, OAuth for MCP Servers
  - was: الـ MCP servers البعيدة كثير منها بيطلب authentication.
  - now: كثير من الـ MCP servers البعيدة بتطلب authentication.
  - why: Topic-fronted «X كثير منها» is a stiff structure for a one-clause sentence; the plain quantifier order is what a colleague would say.

- [readability] line 189, Timeout Architecture intro
  - was: وكل طبقة بتحمي من failure mode مختلف (شكل من أشكال الفشل المحتملة)
  - now: وكل طبقة بتحمي من failure mode (شكل من أشكال الفشل المحتملة) مختلف
  - why: 2.7: the gloss follows the term directly; putting the adjective between term and gloss makes the parenthesis look like it explains «مختلف».

- [style] line 3, first H2
  - was: ## ليه MCP مهم خارج Claude Code كمان
  - now: ## ليه MCP مهم خارج Claude Code
  - why: «كمان» ('also') is not in the source heading ('Why MCP Matters Beyond Claude Code'); section 4 forbids additions, and headings should stay tight.

### book/ch13-terminal-ui.md (9 items)

- [accuracy] Line 13, intro paragraph; and line 19, first paragraph of 'الـ Custom DOM'
  - was: الـ custom DOM اللي React بيعمل reconcile ضده … محتاج حاجة يعمل reconcile ضدها
  - now: الـ custom DOM اللي React بيعمل عليه reconcile … محتاج حاجة يعمل عليها reconcile
  - why: 'reconcile against' is a preposition idiom; «ضد» means 'opposed to' and a 2-year reader will read it as React fighting the DOM. Global ruling 1.

- [accuracy] Line 9, paragraph 'Ink هو الجواب المعتاد'
  - was: وبعدين عمل له fork وغيّره لدرجة إنه مابقاش له علاقة بالأصل.
  - now: وبعدين عمل له fork وغيّره لدرجة إنه ماعادش شبه الأصل.
  - why: 'No longer has any relation to the original' contradicts the very next paragraph ('shares Ink's conceptual DNA'). 'Beyond recognition' is about appearance, not lineage.

- [accuracy] Line 145, blit-disabled condition 2
  - was: الـ node كان ممكن يرسم فوق cells مش تابعة لإخواته
  - now: الـ node كان ممكن يرسم فوق cells تابعة لـ nodes مش من الـ siblings الخاصين بيه
  - why: 'non-sibling cells' = cells owned by nodes that are not its siblings. The current wording reads as 'cells that do not belong to its siblings', which is close to the opposite set and confusing.

- [accuracy] Line 340, first paragraph of 'الـ Streaming Markdown'
  - was: كانت هتبقى كارثية على نطاق واسع.
  - now: كانت هتبقى كارثية لما الرسالة تكبر.
  - why: 'at scale' here means as message length grows (the next section makes it O(n^2) per message), not 'across many users'.

- [consistency] Line 348, 'الـ syntax highlighting بشكل lazy' paragraph
  - was: وبعدين بيتحل بشكل asynchronous مع الـ instance الخاص بـ cli-highlight
  - now: وبعدين بيعمل resolve بشكل asynchronous مع الـ instance الخاص بـ cli-highlight
  - why: ch17 renders Promise 'resolves' as «بيعمل resolve»; «بيتحل» reads as 'gets solved'. Global ruling 7.

- [readability] Line 271, REPL sections list item 2
  - was: عن طريق حراسات `feature()` مع `require()`
  - now: عن طريق شروط `feature()` مع `require()`
  - why: «حراسات» is a word-for-word calque of 'guards' that no Arabic developer says; a feature() guard is simply a condition.

- [readability] Line 372, memory-locality paragraph
  - was: وده كفاية إنه يفجّر ميزانية الـ frame اللي هي 16ms
  - now: وده كفاية إنه يتجاوز ميزانية الـ frame اللي هي 16ms
  - why: 'blow the budget' is an English idiom; «يفجّر» is a literal calque (§1.4).

- [readability] Line 233, StylePool paragraph
  - was: فالانتقال من "bold red" لـ "dim green" عبارة عن ضم لـ string متخزن، مش عملية diff و serialize.
  - now: فالانتقال من "bold red" لـ "dim green" عبارة عن string متخزن جاهز بيتضاف للـ output، مش عملية diff و serialize.
  - why: «ضم لـ string متخزن» is ambiguous ('joining to a stored string'). The point is that the transition string is pre-computed and just appended.

- [style] Lines 332 and 334 (three occurrences), 'إعلان الـ cursor' section; also «المظلَّل» at lines 53 and 111
  - was: موقع الـ node المُعلَن … موقع الـ cursor المُعلَن … فالـ cursor المُعلَن … المحتوى المظلَّل مسبقًا … "النص المظلَّل"
  - now: موقع الـ node اللي اتعلن عنه … موقع الـ cursor اللي اتعلن عنه … فالـ cursor اللي اتعلن عنه … المحتوى المظلّل مسبقًا … "النص المظلّل"
  - why: §1.4 allows only shadda and adverb tanween; the damma/fatha marks are outside the rule. Global ruling 5.

### book/ch14-input-interaction.md (13 items)

- [accuracy] Line 367, quote objects paragraph
  - was: بتلاقي علامات التنصيص المزدوجة في السطر الحالي
  - now: بتلاقي أزواج علامات التنصيص في السطر الحالي
  - why: 'paired quotes' means quotes matched in pairs (the sentence goes on to explain first/second, third/fourth). «المزدوجة» means double-quote characters, which is wrong since `i'` and `` i` `` are in the same list.

- [style] Line 63, onExit paragraph
  - was: والمستخدم كان هيحتاج يكتب `reset` على العمياني عشان يرجّع الـ terminal الخاص بيه.
  - now: والمستخدم كان هيحتاج يكتب `reset` من غير ما يشوف اللي بيكتبه عشان يرجّع الـ terminal الخاص بيه.
  - why: «على العمياني» is Egypt-only slang, banned by §1.4. Global ruling 9.

- [readability] Line 75, legacy terminal sequences paragraph
  - was: وكل حديقة الحيوان الخاصة بأشكال VT100/VT220/xterm اللي اتراكمت على مدار 40 سنة
  - now: وكل الخليط الفوضوي من أشكال VT100/VT220/xterm اللي اتراكم على مدار 40 سنة
  - why: 'the full zoo of' is an English idiom; the literal «حديقة الحيوان» reads as a calque (§1.4). Ruling on the translators' close call: drop the image, keep the wryness with «الخليط الفوضوي».

- [style] Line 81, SGR mouse events paragraph
  - was: بتستخدم الصيغة `ESC [ < button ; col ; row M/m`، حيث `M` معناها ضغط و `m` معناها إفلات.
  - now: بتستخدم الصيغة `ESC [ < button ; col ; row M/m`، و `M` معناها ضغط و `m` معناها إفلات.
  - why: «حيث» is on the §1.4 banned list. Global ruling 6.

- [style] Line 444, closing paragraph of 'طبّق ده'
  - was: ازقّ التعقيد للحدود، حيث ممكن يتعامل معاه مرة واحدة وبشكل صحيح
  - now: ادفع التعقيد للحدود، اللي فيها ممكن تتعامل معاه مرة واحدة وبشكل صحيح
  - why: «ازقّ» is past the allowed colloquial layer (content verb, not glue) and «حيث» is banned. Ruling on the close call: use the neutral imperative.

- [readability] Line 418, markScrollActivity paragraph
  - was: "I am in a latency-sensitive operation, please yield" (أنا في عملية حساسة للـ latency (زمن الاستجابة)، من فضلك افسح لي)
  - now: "I am in a latency-sensitive operation, please yield" (أنا في عملية حساسة لزمن الاستجابة، من فضلك افسح لي)
  - why: Nested parentheses inside a quote rendering; the rendering is already Arabic meaning, so translate the term there. If the glossary gloss is wanted, attach it to «latency» at line 460 instead. Global ruling 8.

- [style] Lines 9 and 79 (Windows Terminal quirks; terminal-specific quirks)
  - was: و Windows Terminal ليه غرايبه الخاصة مع الـ VT mode … يتعامل مع غرايب كل terminal
  - now: و Windows Terminal ليه غرائبه الخاصة مع الـ VT mode … يتعامل مع غرائب كل terminal
  - why: Content words are MSA (§1.1); «غرايب» is the colloquial spelling. Global ruling 10.

- [readability] Line 442, 'what if' sentences
  - was: مفيش "what if the key is undefined?" (وماذا لو المفتاح undefined؟). ومفيش "what if the modifier combination is impossible?" (وماذا لو تركيبة الـ modifiers مستحيلة؟).
  - now: مفيش "what if the key is undefined?" (وإيه لو المفتاح undefined؟). ومفيش "what if the modifier combination is impossible?" (وإيه لو تركيبة الـ modifiers مستحيلة؟).
  - why: «ماذا» is the MSA question word the guide replaces with «إيه» (§1.2); it is a register switch inside an otherwise colloquial page.

- [readability] Line 430, 'الـ chord state كـ machine صريح' paragraph
  - was: دي نوع مختلف من الـ bindings محتاج state machine بدلالات timeout وإلغاء.
  - now: دي نوع مختلف من الـ bindings محتاج state machine فيه timeout وإلغاء.
  - why: «دلالات» for 'semantics' is stiff and unclear to the target reader; the plain meaning is that the machine has timeout and cancellation behaviour.

- [readability] Line 434, 'صمّم لتنوّع الـ terminals' paragraph
  - was: ولما غرابة جديدة تظهر في terminal ما (زي إن Windows Terminal …)
  - now: ولما terminal معين يطلع فيه سلوك غريب جديد (زي إن Windows Terminal …)
  - why: «terminal ما» ('some terminal') is classical indefinite phrasing that clashes with the register; «غرابة تظهر» is a calque of 'a quirk surfaces'.

- [readability] Line 428, 'الـ context كمفهوم أصيل' paragraph
  - was: وده بيخلّصك من شوربة الشروط زي `if (dialogOpen && key === 'y')` المتناثرة في الـ event handlers.
  - now: وده بيخلّصك من فوضى الشروط زي `if (dialogOpen && key === 'y')` المتناثرة في الـ event handlers.
  - why: 'conditional soup' is an English idiom; «شوربة الشروط» is a literal calque (§1.4).

- [style] Line 243, first sentence of 'دعم الـ Chords'
  - was: عبارة عن chord: ضغطتان بيكوّنوا مع بعض action واحد.
  - now: عبارة عن chord: ضغطتين بيكوّنوا مع بعض action واحد.
  - why: MSA nominative dual «ضغطتان» next to the colloquial verb «بيكوّنوا» is a register clash; the page elsewhere uses the accusative/colloquial form.

- [readability] Lines 264 and 456 ('pure state machine')
  - was: عبارة عن state machine نقي مع فحص شامل للـ types … الـ vim mode عبارة عن state machine نقي
  - now: عبارة عن state machine من نوع pure مع فحص شامل للـ types … الـ vim mode عبارة عن state machine من نوع pure
  - why: «نقي» ('clean/unadulterated') does not carry the functional-programming sense; the glossary keeps 'pure function' in English, so the adjective should follow the same convention.

### book/ch16-remote.md (3 items)

- [consistency] Line 47, design-philosophy sentence after the diagrams
  - was: القراءة والكتابة asymmetric (مش متماثلين)، وإعادة الاتصال بتحصل تلقائيًا
  - now: القراءة والكتابة مش متماثلين، وإعادة الاتصال بتحصل تلقائيًا
  - why: The same page translates 'asymmetric' as «غير المتماثل / غير متماثل» in the H2 (line 121) and body (line 123). Keeping the English only here, with a gloss, is inconsistent; 'asymmetric' is not a glossary KEEP term.

- [consistency] Line 59, first sentence of the child-process paragraph
  - was: كل session بتعمل spawn لـ child process من Claude Code، بيتواصل عن طريق NDJSON على stdin/stdout.
  - now: كل session بتعمل spawn لـ child process من Claude Code، بتتواصل عن طريق NDJSON على stdin/stdout.
  - why: process is feminine in §2.6 (and the page itself says «process واحدة» at line 5 and «الـ process تخرج» in ch14). Global ruling 11.

- [readability] Line 91, handleIngressMessage step 3
  - was: يتحقق من الـ UUID ضد `recentPostedUUIDs` (الـ echo dedup) و `recentInboundUUIDs` (الـ re-delivery dedup).
  - now: يدوّر على الـ UUID في `recentPostedUUIDs` (الـ echo dedup) و `recentInboundUUIDs` (الـ re-delivery dedup).
  - why: 'check against' → «ضد» is a calque; the operation is a set lookup. Global ruling 1.

### book/ch17-performance.md (5 items)

- [consistency] Line 171, last sentence of 'الـ Memory Relevance Side-Query'
  - was: memory واحدة ملهاش علاقة حجمها 2,000 token بتكلف في الـ context المهدر أكثر مما بيكلفه الـ side-query
  - now: memory واحد ملهوش علاقة حجمه 2,000 token بيكلف في الـ context المهدر أكثر مما بيكلفه الـ side-query
  - why: §2.6 lists memory as masculine; ch11 and the glossary follow that. Global ruling 11.

- [readability] Line 33, last sentence of 'الـ API Preconnection'
  - was: عشان الاتصال السخن يستخدم إعدادات الـ transport الصحيحة.
  - now: عشان الاتصال اللي سخن يستخدم إعدادات الـ transport الصحيحة.
  - why: Ruling on the close call: keep the glossary verb «بيسخن», but «الاتصال السخن» as an adjective is unidiomatic; the relative clause reads naturally.

- [readability] Line 117, 'الـ Section Memoization' paragraph
  - was: أما الخيار النووي `DANGEROUS_uncachedSystemPromptSection(name, compute, reason)` فبيعيد الحساب في كل turn.
  - now: أما الخيار الأخطر `DANGEROUS_uncachedSystemPromptSection(name, compute, reason)` فبيعيد الحساب في كل turn.
  - why: 'the nuclear option' is an English idiom; «الخيار النووي» is a literal calque (§1.4) and the identifier's DANGEROUS_ prefix already carries the tone.

- [readability] Line 8, playbook list item 2
  - was: والـ context window هو المورد الأكثر محدودية عندك.
  - now: والـ context window هو أضيق مورد عندك.
  - why: «الأكثر محدودية» is a stiff comparative construction a colleague would not say at a whiteboard.

- [style] Line 195, 'صمّم عشان استقرار الـ cache' lead-in paragraph
  - was: كل field في الـ prompt عندك يا ثابت يا متغير.
  - now: كل field في الـ prompt عندك إما ثابت أو متغير.
  - why: «يا … يا» is a colloquial either/or construction outside the closed glue list in §1.2.
