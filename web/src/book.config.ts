export interface PartConfig {
  number: number;
  title: string;
  epigraph: string;
  chapters: number[];
}

export interface ChapterConfig {
  number: number;
  slug: string;
  title: string;
  description: string;
}

export const parts: PartConfig[] = [
  {
    number: 1,
    title: 'الأساسيات (Foundations)',
    epigraph: 'قبل ما الـ agent يقدر يفكر، لازم الـ process تكون قايمة وجاهزة للشغل أصلاً.',
    chapters: [1, 2, 3, 4],
  },
  {
    number: 2,
    title: 'الـ Core Loop',
    epigraph: 'القلب النابض للـ agent: اعمل Stream، نفّذ، راقب النتيجة، وكرّر.',
    chapters: [5, 6, 7],
  },
  {
    number: 3,
    title: 'تنسيق الـ Multi-Agent',
    epigraph: 'الـ agent الواحد قوي، لكن تناغم عدة وكلاء ذكاء اصطناعي مع بعض بيعمل نقلة نوعية.',
    chapters: [8, 9, 10],
  },
  {
    number: 4,
    title: 'الحفظ الدائم والذاكرة الذكية',
    epigraph: 'الـ agent اللي من غير memory هيفضل يكرر نفس الأخطاء كل مرة.',
    chapters: [11, 12],
  },
  {
    number: 5,
    title: 'واجهة المستخدم (The Interface)',
    epigraph: 'كل حاجة بيشوفها المطور بتعدّي من الطبقة دي.',
    chapters: [13, 14],
  },
  {
    number: 6,
    title: 'الاتصال بالعالم الخارجي',
    epigraph: 'الـ agent بيوصل لأبعد من حدود جهازك وlocalhost.',
    chapters: [15, 16],
  },
  {
    number: 7,
    title: 'هندسة الأداء العالي',
    epigraph: 'نخلّي كل المنظومة سريعة لدرجة إن المطور يحس بالاستجابة الفورية من غير أي تأخير.',
    chapters: [17, 18],
  },
];

export const chapters: ChapterConfig[] = [
  { number: 1, slug: 'ch01-architecture', title: 'الـ Architecture الخاصة بالـ AI Agent', description: 'المفاهيم الأساسية الـ 6، ومسار البيانات (Data Flow)، ونظام الصلاحيات، وآلية الـ Build' },
  { number: 2, slug: 'ch02-bootstrap', title: 'بداية سريعة — الـ Bootstrap Pipeline', description: 'التهيئة على 5 مراحل، والـ Parallel I/O، وحدود الثقة والأمان (Trust Boundary)' },
  { number: 3, slug: 'ch03-state', title: 'الـ State — الـ Two-Tier Architecture', description: 'الـ Bootstrap Singleton، والـ AppState Store، والـ Sticky Latches، وتتبّع التكلفة' },
  { number: 4, slug: 'ch04-api-layer', title: 'الكلام مع Claude — الـ API Layer', description: 'عميل الـ Multi-Provider، والـ Prompt Cache، والـ Streaming، والتعافي من الأخطاء' },
  { number: 5, slug: 'ch05-agent-loop', title: 'الـ Agent Loop', description: 'نظرة متعمقة في ملف query.ts، وضغط السياق على 4 طبقات، ومعالجة الأخطاء، وحصص الـ Tokens' },
  { number: 6, slug: 'ch06-tools', title: 'الـ Tools — من التعريف للتنفيذ', description: 'واجهة الـ Tool Interface، ومسار التنفيذ المكوّن من 14 خطوة، ونظام فحص الصلاحيات' },
  { number: 7, slug: 'ch07-concurrency', title: 'تنفيذ الـ Tools بشكل Concurrent', description: 'خوارزمية التقسيم (Partitioning)، والـ Streaming Executor، والتنفيذ التوقعي (Speculative Execution)' },
  { number: 8, slug: 'ch08-sub-agents', title: 'عمل Spawn للـ Sub-Agents', description: 'أداة AgentTool، ودورة حياة runAgent المكونة من 15 خطوة، وأنواع الـ Agents المدمجة' },
  { number: 9, slug: 'ch09-fork-agents', title: 'الـ Fork Agents والـ Prompt Cache', description: 'حيلة الـ Byte-identical Prefix، ومشاركة الـ Cache، وتوفير التكلفة' },
  { number: 10, slug: 'ch10-coordination', title: 'الـ Tasks والتنسيق والـ Swarms', description: 'آلة الحالات (State Machine) للـ Tasks، ووضع التنسيق، ورسائل الـ Swarm' },
  { number: 11, slug: 'ch11-memory', title: 'الـ Memory — التعلّم من محادثة للتانية', description: 'الذاكرة المعتمدة على الملفات، وتصنيف الأنواع الـ 4، والـ LLM Recall، والتعامل مع تقادم البيانات' },
  { number: 12, slug: 'ch12-extensibility', title: 'قابلية التوسعة — الـ Skills والـ Hooks', description: 'تحميل الـ Skills على مرحلتين، ونقاط الاعتراض (Lifecycle Hooks)، وأمان الـ Snapshots' },
  { number: 13, slug: 'ch13-terminal-ui', title: 'الـ Terminal UI', description: 'نسخة Fork مخصصة وسريعة من Ink، ومسار الـ Rendering، والـ Double-buffer' },
  { number: 14, slug: 'ch14-input-interaction', title: 'الـ Input والتفاعل', description: 'معالجة ضغطات المفاتيح (Key Parsing)، والـ Keybindings، ودعم الـ Chords، ووضع Vim' },
  { number: 15, slug: 'ch15-mcp', title: 'MCP — البروتوكول الموحّد للـ Tools', description: 'بروتوكول Model Context Protocol، وأنواع الـ Transports الـ 8، وتغليف الأدوات' },
  { number: 16, slug: 'ch16-remote', title: 'التحكم عن بُعد والتنفيذ على الـ Cloud', description: 'الـ Bridge v1/v2، والـ CCR، والـ Upstream Proxy' },
  { number: 17, slug: 'ch17-performance', title: 'الأداء — كل ملي ثانية وكل Token بيفرقوا', description: 'تحسين زمن بدء التشغيل، وإدارة الـ Context Window، وتسريع الـ Rendering والبحث' },
  { number: 18, slug: 'ch18-epilogue', title: 'الخاتمة — اتعلمنا إيه للمستقبل', description: 'الرهانات المعمارية الـ 5، والأنماط القابلة للنقل لمشاريعك، ومستقبل الـ Coding Agents' },
];

export function getPartForChapter(chapterNumber: number): PartConfig | undefined {
  return parts.find(p => p.chapters.includes(chapterNumber));
}

export function getChapterNumber(slug: string): number {
  const match = slug.match(/^ch(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getAdjacentChapters(chapterNumber: number) {
  const idx = chapters.findIndex(c => c.number === chapterNumber);
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

export function isFirstChapterOfPart(chapterNumber: number): boolean {
  return parts.some(p => p.chapters[0] === chapterNumber);
}
