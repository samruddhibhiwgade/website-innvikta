# Innvikta Next.js Routing Audit Report: SSR/SSG vs CSR

This document provides a comprehensive audit of the Innvikta application routing architecture, classifying each page, dynamic route, and API endpoint in the `app/` folder into either **Server-Side Rendered / Static (SSR/SSG)** or **Client-Side Rendered (CSR)**.

---

## 1. Executive Summary

Next.js App Router utilizes React Server Components (RSC) by default. Components are classified based on the presence of the `"use client"` directive:

*   **SSR / Static (Server Components)**: Renders on the server. Delivers clean static HTML with minimal client-side JavaScript bundle size. These are highly optimized for fast loading speeds and search engine optimization (SEO).
*   **CSR (Client Components)**: Uses the `"use client"` directive. Interactive pages containing React state hook wrappers (`useState`, `useEffect`), event handlers, or browser APIs (like `window` and `document`) that run dynamically in the client's browser.
*   **API Routes**: Static/dynamic server endpoints returning JSON payloads.

---

## 2. Server-Rendered Routes & API Endpoints (SSR / RSC)
These routes render on the server, ensuring rapid First Contentful Paint (FCP) and optimal SEO indexing.

| Path | Type | Description |
| :--- | :--- | :--- |
| `app/page.js` | SSR / Static | Main homepage deck & layout |
| `app/blog/page.js` | SSR / Static | Main blog list feed |
| `app/blog/page/[slug]/page.js` | SSR / Static | Paginated blog listings |
| `app/blog/[single]/page.js` | SSR / Static | Individual blog post page viewer (`PostSingle`) |
| `app/[regular]/page.js` | SSR / Static | Standard text pages (e.g. Terms, Contact) |
| `app/solutions/[slug]/page.js` | SSR / Static | Dynamic solutions page content parser |
| `app/cyberhelp/page.js` | SSR / Static | Help center base index |
| `app/maturity-benchmarks/page.js` | SSR / Static | Cybersecurity benchmarks metrics dashboard |
| `app/api/admin/blogs/route.js` | API Endpoint | CRUD controller for blog articles |
| `app/api/admin/config/route.js` | API Endpoint | Read/write auto-link configuration mapping rules |
| `app/api/admin/upload/route.js` | API Endpoint | Image file upload handler endpoint |
| `app/api/dns-lookup/route.js` | API Endpoint | Security lookup utility endpoint |

---

## 3. Client-Rendered Interactive Routes (CSR)
These routes render dynamically on the client browser to power interactive forms, graphs, calculators, and tools.

| Path | Type | Interactive Components / State Managed |
| :--- | :--- | :--- |
| `app/admin/page.js` | CSR | Publisher Dashboard, WordPress-style editor, live preview and auto-link toggle |
| `app/book-demo/page.js` | CSR | Form input state, submission state, validation error handling |
| `app/cyber-arcade/page.js` | CSR | Innvikta Arcade gaming lobby interface & card slide controls |
| `app/cyberhelp/[section]/page.js` | CSR | TriageBot chat, VoiceAssistant theme wrapper, active alert feeds |
| `app/freetools/baseline-score-tool/page.js` | CSR | Interactive baseline calculator questionnaire |
| `app/freetools/culture-benchmarking/page.js` | CSR | Security culture score metrics calculations and tab filters |
| `app/freetools/domain-security-analyzer/page.js`| CSR | Real-time DNS lookups, progress bar loaders, response tables |
| `app/freetools/password-generator/page.js` | CSR | Password length sliders, password entropy strength bars, copy-to-clipboard |
| `app/freetools/spot-the-phish/page.js` | CSR | Training game logic, scoreboards, timer states, and slide navigators |
| `app/partners/page.js` | CSR | Partner program sign-up form states and inputs |
| `app/platform-updates/page.js` | CSR | Timeline filters, expand/collapse list views, animation controls |
| `app/resources/case-studies/page.js` | CSR | Filterable customer case study listings |
| `app/resources/cybersecurity-awareness-month/page.js` | CSR | Awareness month calendars, toolkit downloads, email capture forms |
| `app/resources/glossary/page.js` | CSR | A-Z filter buttons, dynamic glossary terms search bar |
| `app/resources/maturity-calculator/page.js` | CSR | Maturity checklist questionnaire tool |
| `app/resources/simulation-roi/page.js` | CSR | Interactive ROI metrics calculator |
| `app/solutions/compliance-training/page.js` | CSR | Interactive compliance course deck and demo request slides |
| `app/solutions/customized-solutions/page.js` | CSR | Solutions selector filter controls |
| `app/solutions/human-risk-intelligence/page.js`| CSR | Human Risk metrics deck |
| `app/solutions/insat/page.js` | CSR | InSAT product presentation deck & slider animations |
| `app/solutions/phishing-simulation/page.js` | CSR | Phishing Simulation slide decks and demo forms |
| `app/start-free/page.js` | CSR | Trial sign-up funnel step questionnaire |

---

## 4. Key Recommendations

1.  **Layouts & Static Leaves**: Keep the main layouts (`app/layout.js`, `app/blog/layout.js`) as Server Components to let Next.js optimize static HTML wrappers.
2.  **Client Component Isolation**: When adding interactivity, isolate state logic into dedicated leaf components (e.g. `<CopyLinkButton />`, `<LanguageSwitcher />`) rather than marking whole page hierarchies as CSR, preserving SSR optimizations for surrounding content.
