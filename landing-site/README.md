# Premium Multi-Page Landing Site (Tech)

This project is a production-ready, responsive, multi-page landing site built with semantic HTML, modern CSS (Flexbox/Grid), and minimal vanilla JavaScript.

Pages:
- `index.html` — Home / Landing
- `services.html` — Services / Products
- `portfolio.html` — Portfolio / Case studies
- `blog.html` — Blog / Insights
- `about.html` — About / Why Choose Us
- `contact.html` — Contact / Form

Assets:
- `assets/images/` contains many sample SVGs for hero, portfolio, blog thumbnails, team photos and client logos. Replace these with production PNG/WebP images as needed — prefer WebP for thumbnails and OG images (recommended sizes: 1200×630 for OG, thumbnails ~900×540).

New features added:
- Portfolio case-study pages (`case-*.html`) with galleries and metrics.
- Blog & single-post templates (`blog.html`, `post-*.html`).
- Extra sample images: `team-*.svg`, `client-*.svg`, `gallery-4.svg`, `gallery-5.svg`, `hero-photo-2.svg`, `blog-3.svg` (placeholders for rapid iteration).
- Lightbox modal for portfolio galleries and accessible close handling.
- Native lazy-loading for images plus a small IntersectionObserver fallback for older browsers.
- Netlify Forms example in `contact.html` (hidden form-name and honeypot field).
- Accessibility improvements: skip links, keyboard-close for modals, focus management basics.

Tip: to swap placeholders with production assets, keep the same filenames or update the `src` attributes in the relevant HTML files.

Performance & SEO notes:
- Prefer WebP for thumbnails and OG images (recommended sizes in README above).
- Remove unused CSS and run Lighthouse audit to further improve Lighthouse scores.

Analytics & Scheduling
- Google Analytics (GA4): replace `G-XXXXXXX` in the HTML head snippets with your GA measurement ID.
- Calendly: replace the `data-calendly` URL on the Contact page with your Calendly link (e.g. `https://calendly.com/your-company/demo-30`). The site uses Calendly's popup widget by default.
- Events: CTA clicks, schedule-demo and simulated form submissions emit `gtag` events if GA is installed.

Netlify Forms & leads
- `contact.html` includes Netlify Forms attributes (`data-netlify="true"` and `form-name`) — submit the form via the site or use an SMTP/server endpoint as desired.
- For production, consider adding server-side validation, anti-spam rules, and email notifications or a CRM integration.
Tech & Standards:
- Mobile-first responsive design
- BEM-like naming
- Accessible and SEO-friendly
- Minimal JS for interactions only

Deployment:
- Ready for Netlify / Vercel. Deploy by linking the Git repository or drag-and-drop the `landing-site` folder.
- Quick Netlify: `netlify deploy --prod` or connect the repo on app.netlify.com. For Vercel: `vercel` CLI or import the project via the Vercel dashboard.

Customization:
- Theme colors in `css/styles.css` (CSS variables in `:root`).
- Update logo, text and images directly in the HTML files. Replace `assets/images/og-*.svg` with real images (1200×630 recommended for social cards).
- For analytics add the provider script in `index.html` head and ensure it's loaded asynchronously. Keep scripts minimal for speed.

License: MIT

---

Next steps & checklist:
- Replace placeholder images (`assets/images/*`) with production assets (1200×630 for OG images).
- Replace example contact info and `https://example.com` with your production domain.
- Run Lighthouse audit and address accessibility and performance suggestions (fonts, images, critical CSS).
- Connect to Netlify/Vercel and set environment variables (if needed).
- Add analytics or marketing tags asynchronously (preferably via GTM or server-side include).

Accessibility & SEO:
- All images should have `alt` text when added.
- Use semantic headings and ensure color contrast meets WCAG AA.
- Ensure form uses a real backend endpoint or Netlify Forms if collecting leads.

If you want, I can now wire a sample Netlify form handling and add a simple CI deploy script.