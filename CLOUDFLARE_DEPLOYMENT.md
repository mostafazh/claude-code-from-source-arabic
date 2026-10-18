# دليل النشر على Cloudflare Pages
# Cloudflare Pages Deployment Guide

تم إعداد هذا المستودع وتجهيزه ليعمل مباشرة كموقع ويب ثابت (Static Site) مبني باستخدام [Astro](https://astro.build/)، وجاهز للنشر الفوري على **Cloudflare Pages**.

الموقع يلتزم بشكل كامل بشروط وإرشادات المؤلف الأصلي **Alejandro Balderas**:
- إسناد واضح ومرئي للعمل الأصلي ورابط المستودع الأصلي وموقع https://claude-code-from-source.com
- ترخيص مفتوح غير تجاري (CC BY-NC-SA 4.0)
- دعم كامل للغة العربية والاتجاه من اليمين لليسار (RTL) مع خط عربي أنيق (`IBM Plex Sans Arabic`).

---

## الطريقة 1: النشر التلقائي عبر لوحة تحكم Cloudflare Pages (موصى بها)

1. ادخل إلى حسابك في [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. توجه إلى **Workers & Pages** ثم اضغط على **Create application** > **Pages** > **Connect to Git**.
3. اختر مستودع `claude-code-from-source-arabic`.
4. في صفحة إعدادات البناء (**Set up builds and deployments**):
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `web/dist`
   - **Root directory**: `/` *(أو اختر `web` واجعل Build output directory هو `dist`)*
5. في قسم متغيرات البيئة (**Environment variables**) أضف:
   - `NODE_VERSION`: `20`
6. اضغط **Save and Deploy**.

سيبدأ Cloudflare Pages بتثبيت الحزم وبناء الموقع ونشره في أقل من دقيقة، وسيكون متاحاً على رابط مثل:
`https://claude-code-arabic.pages.dev`

---

## الطريقة 2: النشر السريع عبر أداة Wrangler CLI

يمكنك البناء محلياً والنشر مباشرة إلى Cloudflare Pages بضغطة زر:

```bash
# 1. بناء الموقع محلياً
npm run build

# 2. النشر إلى Cloudflare Pages
npx wrangler pages deploy web/dist --project-name=claude-code-arabic
```

---

## الملفات المجهزة داخل المشروع

- **`wrangler.toml`**: إعدادات Cloudflare Pages ومجلد المخرجات `web/dist`.
- **`.nvmrc`**: يحدد إصدار Node.js 20 LTS لبيئة البناء.
- **`web/public/_headers`**: رؤوس الأمان (Security Headers) والتخزين المؤقت الفائق (Asset Caching).
- **`web/src/book.config.ts`**: فهرس الأجزاء والفصول مترجم بالكامل للعربية.
- **`web/src/layouts/BaseLayout.astro` & `ChapterLayout.astro`**: دعم RTL، خط IBM Plex Sans Arabic، وشريط إسناد دائم للمؤلف الأصلي في الترويسة والتذييل.
