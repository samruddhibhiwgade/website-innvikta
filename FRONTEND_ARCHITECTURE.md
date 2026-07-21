# Frontend Architecture & Styling Documentation

This document provides a comprehensive analysis of the frontend architecture, styling methodology, shared layouts, component hierarchies, and CSS dependencies of the Innvikta website.

---

## 1. Overall Project Structure

The project is built on the **Next.js (App Router)** framework. The directory structure is divided into clean, decoupled layers for routing, layout presentation, configurations, Markdown content, and asset storage.

### Workspace Directory Tree

```
c:\website\website-innvikta\
├── app/                       # Next.js App Router (pages, nested layouts, API routes)
│   ├── [regular]/             # Dynamic fallback router for content markdown files
│   ├── admin/                 # Admin dashboards (leads, tracking)
│   ├── api/                   # API routes for form actions and services
│   ├── blog/                  # Blog page listing, pagination, and single article pages
│   ├── book-demo/             # Demo request page
│   ├── cyber-arcade/          # Gamified Security Arcade sub-application (Three.js/Canvas)
│   ├── cyberhelp/             # Emergency Incident reporting sub-application
│   ├── freetools/             # Free tools: baseline score, password gen, domain analyzer, etc.
│   ├── solutions/             # Core security offerings (InSAT, Phishing, Compliance, etc.)
│   ├── layout.js              # Application-wide Root Layout
│   └── page.js                # Landing page / Home route
├── layouts/                   # Shared templates and reusable UI elements
│   ├── components/            # Reusable UI widgets and Client Components
│   ├── partials/              # Larger layout regions (Header, Footer, Chatbot, Testimonials)
│   ├── shortcodes/            # MDX custom component shortcodes
│   ├── About.js               # About Page Layout Template
│   ├── Contact.js             # Contact Page Layout Template
│   ├── Default.js             # Default Markdown page parser Layout
│   ├── PostSingle.js          # Individual Blog Post Layout
│   └── Solution.js            # Standard Solution Layout
├── config/                    # Global JSON configurations
│   ├── config.json            # SEO meta author, favicon, CTA content, and redirects
│   ├── menu.json              # Primary site menu headers and footer link maps
│   ├── social.json            # Social profile URLs (LinkedIn, Twitter, Facebook)
│   └── theme.json             # Design tokens: theme colors, fonts, and base sizes
├── content/                   # MDX and Markdown files containing actual text content
│   ├── blog/                  # Markdown files for all individual blog posts
│   ├── solutions/             # Markdown files for dynamic solution pages
│   └── _index.md              # Homepage content frontmatter
├── public/                    # Static assets
│   ├── fonts/                 # Web font assets (woff2 format for Satoshi)
│   └── images/                # Site-wide logos, vector graphics, and product mockups
├── styles/                    # SCSS and global styling sheets
│   ├── base.scss              # Global tag normalization and responsive heading defaults
│   ├── buttons.scss           # Custom button classes (.btn, .btn-primary, etc.)
│   ├── components.scss        # Styling for cards, forms, notice boxes, and prose content
│   ├── insat.scss             # Extensive styling rules for solutions and calculators
│   ├── navigation.scss        # Glassmorphic header, mega-menu dropdowns, and layouts
│   ├── style.scss             # Stylesheet compiler entry point compiling Tailwind & SCSS
│   └── utilities.scss         # Custom CSS utility overrides
├── lib/                       # Helper functions, search indexes, and library wraps (GSAP)
└── store/                     # State management files (Zustand store for cyber-arcade)
```

### Folder Purposes
*   **`app/`**: Serves as the routing engine. It acts as a lightweight shell that handles parameters, initializes page wrappers, fetches static database contents (like Markdown), and imports layouts.
*   **`layouts/`**: Separates display templates from directory routing logic. If a page requires dynamic React states or specific layout components, it delegates rendering to files under `/layouts`.
*   **`config/`**: Centralized configuration folder for menus, social links, colors, and typography. Changes here propagate to both the Tailwind CSS compiler and React layouts.
*   **`styles/`**: Aggregates SCSS files compiled together with Tailwind CSS layers (`base`, `components`, `utilities`) into a single global bundle.
*   **`content/`**: Houses structural files containing metadata (frontmatter) and Markdown text. These files are parsed dynamically at build time to populate pages.

---

## 2. Styling Architecture

The project employs a hybrid styling model that combines **Tailwind CSS utility classes** with a structured **SCSS compilation hierarchy**, driven by centralized design tokens defined in a JSON config.

### Styling Methods & Processing Flow

```mermaid
flowchart TD
    themeJSON[config/theme.json] -->|Reads variables| TWConfig[tailwind.config.js]
    themeJSON -->|Drives| SCSSBase[styles/base.scss]
    
    SCSSCompiler[styles/style.scss] -->|Imports| TWBase[@tailwind base]
    SCSSCompiler -->|Imports| TWComp[@tailwind components]
    SCSSCompiler -->|Imports| TWUtil[@tailwind utilities]
    
    SCSSCompiler -->|Loads layers| SCSSBase
    SCSSCompiler -->|Loads layers| SCSSComp[styles/components.scss]
    SCSSCompiler -->|Loads layers| SCSSNav[styles/navigation.scss]
    SCSSCompiler -->|Loads layers| SCSSBtn[styles/buttons.scss]
    
    TWConfig -->|Compiles| CSSOutput[Global CSS Bundle]
    SCSSCompiler -->|Compiles| CSSOutput
```

*   **Tailwind CSS (Core)**: Handles utility classes, responsive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`), bento grids, and layout containers.
*   **Tailwind Plugins**:
    *   `@tailwindcss/typography`: Used in the `.content` prose wrapper to automatically style raw Markdown HTML (`h1`, `p`, `blockquote`, `li`, `table`).
    *   `@tailwindcss/forms`: Normalizes input form elements.
    *   `tailwind-bootstrap-grid`: Maps grid rows and columns (e.g., `row`, `col-12`, `lg:col-10`) into the Tailwind flow.
*   **SCSS Compilation**: Uses Tailwind's `@layer` directives to nest custom Sass stylesheets (`base`, `components`, `navigation`, `buttons`, `utilities`) directly into Tailwind's pipeline. This prevents override conflicts and ensures clean specificity.
*   **Centralized Design Tokens**: The compiler reads `config/theme.json` to calculate responsive typography sizes (e.g., headers scaling proportionally using `font_scale`) and extends Tailwind's color spectrum.

---

## 3. Global Styles

All global styling is compiled through `styles/style.scss` and imported in the Root Layout (`app/layout.js`). The responsibilities of each stylesheet are mapped below:

### Stylesheet Breakdown

| Stylesheet | File Path | Scope & Controls | Inherited By | Reusable Dependencies |
| :--- | :--- | :--- | :--- | :--- |
| **Main Entry** | [style.scss](file:///c:/website/website-innvikta/styles/style.scss) | Root CSS variables, global scroll behaviors, custom keyframe animations (`float`, `wave-flow`), Google Translate branding removal, and layout adjustments for specific viewport bounds. | Entire Application | Tailwind Base/Components/Utilities |
| **Base Norms** | [base.scss](file:///c:/website/website-innvikta/styles/base.scss) | Element normalization: overrides `body` font variables, default colors, and establishes mathematical sizing scales for `h1` through `h6` tags. | Entire Application | `theme.json` font variables |
| **Buttons** | [buttons.scss](file:///c:/website/website-innvikta/styles/buttons.scss) | Styling for action triggers (`.btn`, `.btn-primary`, `.btn-outline-primary`) with smooth transitions and hover behaviors. Overrides button styles inside solution pages. | All layouts/components containing buttons | `theme.json` primary colors |
| **Generic UI** | [components.scss](file:///c:/website/website-innvikta/styles/components.scss) | General layout structures including `.section`, `.container`, Notice boxes (`.note`, `.tip`, `.info`, `.warning`), form inputs, and the Tailwind Typography prose compiler (`.content`). | Markdown parsed content, contact forms, default pages | Tailwind `@apply` variables |
| **Navigation** | [navigation.scss](file:///c:/website/website-innvikta/styles/navigation.scss) | Header sticky layouts, double-layer utility strips, glassmorphic dropdowns (`.glass-dropdown`), mega menu flyout overlays, and tab rail states. | Navigation headers (`Header.js`) | Tailwind backdrop-blur |
| **Specialized UI** | [insat.scss](file:///c:/website/website-innvikta/styles/insat.scss) | **A massive 88KB stylesheet** containing localized resets, typography overrides (clamped sizes), FAQ accordion triggers, grid cards, stats dashboards, bento bocks, and complex visual diagrams. | InSAT, Phishing Simulation, Compliance Training, About Us, Free Tools (Baseline, Calculator, etc.) | Custom assets and graphics |
| **Cyberhelp UI** | `cyberhelp/styles/cyberhelp.scss` | Custom scoped styles for the incident support center. Contains emergency bank account freeze visual layouts and complaint flow paths. | `/cyberhelp` sub-routes | Scoped CSS overrides |
| **Arcade UI** | `cyber-arcade/styles/cyber-arcade.scss` | Scoped styles, colors, and layout positioning for Three.js Canvas wrappers and dashboard overlays. | `/cyber-arcade` sub-routes | Three.js canvas nodes |

---

## 4. Layout System

The layout system is structured in a hierarchical tree, starting at the root level and nesting into sub-folders and markdown files.

### Layout Hierarchy Diagram

```
Root Layout (app/layout.js)
 ├── <Header /> & Utility Strip (glassmorphic, global translation)
 ├── <Chatbot /> (floating AI widget)
 ├── <Footer /> & Newsletter Block
 │
 ├── [Default Pages] ─── GSAPWrapper (app/[regular]/page.js)
 │                        └── dynamic selection by layout frontmatter:
 │                             ├── layout: "about"    ──> <About />
 │                             ├── layout: "contact"  ──> <Contact />
 │                             ├── layout: "product"  ──> <Product />
 │                             ├── layout: "404"      ──> <NotFound />
 │                             └── Default (no layout) ──> <Default /> ──> <Banner /> & <MDXContent />
 │
 ├── [Custom Sub-Apps]
 │    ├── /cyberhelp    ──> CyberhelpLayout (layout.js) ──> <CyberhelpThemeWrapper />
 │    └── /cyber-arcade ──> CyberArcadeLayout (layout.js) ──> Scoped .cyber-arcade-scope
 │
 └── [Standard Pages] ─── GSAPWrapper (InSAT, Phishing, calculations, weekly newsletters)
```

### Layout Definitions
1.  **Root Layout (`app/layout.js`)**: Wraps every page. It initializes the Google Tag Manager, sets up viewport rules, loads font families (Inter and Satoshi), and displays the global `<Header />`, `<Footer />`, and `<Chatbot />` widgets wrapped in a `<TrackingProvider />`.
2.  **Cyberhelp Sub-Layout (`app/cyberhelp/layout.js`)**: Injects the incident center stylesheet (`cyberhelp.scss`) and wraps all emergency tools inside `<CyberhelpThemeWrapper />` to prevent styles from bleeding out.
3.  **Cyber Arcade Sub-Layout (`app/cyber-arcade/layout.js`)**: Wraps the Three.js gaming console inside a `.cyber-arcade-scope` wrapper and applies custom arcade styling (`cyber-arcade.scss`).
4.  **Markdown Template Layouts (`layouts/`)**: Compiled dynamically based on MDX frontmatter. E.g., a file with `layout: about` triggers `<About />` containing editorial team showcases, board profiles, and timeline elements.

---

## 5. Shared Components

Shared components reside in the `layouts/components/` and `layouts/partials/` folders. Modifying any of these components has a wide blast radius across the application.

### Component Details & Blast Radius

| Component Name | File Path | Purpose | Utilized on Pages | Modification Risk |
| :--- | :--- | :--- | :--- | :--- |
| **`Header`** | `layouts/partials/Header.js` | Top navigation bar containing the utility strip, language selector (Google Translate integration), search overlays, and the mega menu navigation grid. | Entire application (Root Layout) | **CRITICAL**: Controls global layout structure. Changes to spacing or sizing will cause page shift regressions. |
| **`Footer`** | `layouts/partials/Footer.js` | Bottom navigation blocks, logo links, copyright banners, social icon rails, and the AJAX newsletter subscription form. | Entire application (Root Layout) | **HIGH**: Edits modify all pages. Spacing shifts can push footer alignments out of view. |
| **`SeoMeta`** | `layouts/partials/SeoMeta.js` | Manages HTML head metadata dynamically (`og:title`, description, schema validation, robots indices). | All routes | **HIGH**: Handles SEO indexing. Bad syntax will break crawler visibility. |
| **`Cta`** | `layouts/components/Cta.js` | Standard "Ready to Build a Resilient Security Culture" newsletter and demo registration prompt. | Homepage, Blogs, Fallback markdown pages | **MEDIUM**: Affects multiple main pages. Spacing edits affect layout height. |
| **`GSAPWrapper`** | `layouts/components/GSAPWrapper.js`| Integrates GSAP scroll-triggered slide-in animations. | Home, solutions, blog posts, calculators, about page | **HIGH**: Controls rendering animations. Breaking this will make elements remain invisible. |
| **`Circle`** | `layouts/components/Circle.js` | Renders absolute-positioned vector circles in page backgrounds. | Banner components, CTA sections, About Us page | **LOW**: Purely aesthetic. |
| **`NetworkBackground`** | `layouts/components/NetworkBackground.js` | Animated svg network mesh displaying active node lines. | About page, Solution headings | **LOW**: Visual backdrop. |
| **`ImageFallback`** | `layouts/components/ImageFallback.js`| Wraps Next.js `<Image />` to handle source errors with a default image. | Blog lists, author profiles, and bento cards | **MEDIUM**: Breaking this will crash image loads site-wide. |
| **`SuccessPopup`**| `layouts/partials/SuccessPopup.js`| Displays form-action confirmations. | Footer newsletter, contact forms, calculator responses | **MEDIUM**: Affects interactive completions. |

---

## 6. CSS Dependency Mapping

This section maps the exact relationship between stylesheets, components, and the final pages. Use this lookup to estimate the blast radius of any changes.

### Blast Radius Matrix

```
If you modify...                      These pages/components will also change:
--------------------------------------------------------------------------------------------------
styles/style.scss                     Entire Application (Global resets and scrollbars)
styles/base.scss                      Entire Application (Typography tags h1-h6, body tags)
styles/buttons.scss                   All buttons site-wide (.btn, .btn-primary, .btn-outline-primary)
styles/navigation.scss                Header.js navigation links, Glass dropdowns, Mega menus
styles/components.scss                Prose text wrapper (.content), form textareas, Notice boxes
styles/insat.scss                     /solutions/insat, /solutions/phishing-simulation,
                                      /solutions/compliance-training, /solutions/human-risk-intelligence,
                                      /solutions/customized-solutions, /about, /maturity-benchmarks,
                                      /freetools/baseline-score-tool, /freetools/culture-benchmarking,
                                      /freetools/domain-security-analyzer, /freetools/password-generator,
                                      /freetools/spot-the-phish, /resources/maturity-calculator,
                                      /resources/simulation-roi, /resources/glossary, 
                                      /resources/weekly-newsletter
Header.js                             Top menu navigation and utility layouts on every page
Footer.js                             Footer blocks and newsletter subscriptions on every page
Cta.js                                Homepage, blog lists, dynamic markdown page bottoms
GSAPWrapper.js                        Animations on all key routing landing pages
```

---

## 7. Page-by-Page Analysis

This page-by-page audit maps layouts, components, stylesheets, and style controllers for each individual route.

---

### Home Page
*   **Route**: `/`
*   **File Path**: [app/page.js](file:///c:/website/website-innvikta/app/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`), nested inside `<GSAPWrapper />`
*   **Components Used**: `SeoMeta`, `HomeBanner`, `Challenges`, `ShortIntro`, `SpecialFeatures`, `Testimonial`, `FreeTierCta`, `Cta`
*   **CSS Files Used**: `style.scss`, `base.scss`, `components.scss`, `buttons.scss`, `navigation.scss`
*   **Unique Styles**: Custom animations on home banner elements, client review sliders, and floating circle shapes in the CTA background.
*   **Style Controllers**:
    *   *Spacing*: Controlled by `.section` classes (margin/padding) in `components.scss`.
    *   *Colors*: Theme colors (`#f15a24`) and light backdrops (`#fff7f3`) derived from `theme.json`.
    *   *Typography*: Primary font (Inter) styled using Tailwind base classes.
    *   *Responsiveness*: Tailwind grid layout classes (`lg:col-10`, `flex-wrap`).

---

### InSAT (Security Awareness Training) Page
*   **Route**: `/solutions/insat`
*   **File Path**: [app/solutions/insat/page.js](file:///c:/website/website-innvikta/app/solutions/insat/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`), nested inside `<GSAPWrapper />`
*   **Components Used**: `SeoMeta`, `Circle`, `ImageFallback`, `FiArrowRight`
*   **CSS Files Used**: `style.scss` + [insat.scss](file:///c:/website/website-innvikta/styles/insat.scss) (imported directly)
*   **Unique Styles**: Scoped `.insat-page` resets, custom clamped headings (`.text-96-heading`), stats cards, and SVG charts.
*   **Style Controllers**:
    *   *Spacing*: Set by padding variables in `insat.scss` (e.g., `section { padding-top: 8rem }`).
    *   *Colors*: Custom color variables (`--color-grey-5`, `--color-forest`, `--color-aquamarine`) defined locally inside the `.insat-page` wrapper in `insat.scss`.
    *   *Typography*: Managed by custom scoped variables (`--font-heading`, `--font-body`) mapping to Satoshi.
    *   *Responsiveness*: Local media query declarations inside `insat.scss`.

---

### Phishing Simulation Page
*   **Route**: `/solutions/phishing-simulation`
*   **File Path**: [app/solutions/phishing-simulation/page.js](file:///c:/website/website-innvikta/app/solutions/phishing-simulation/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`), nested inside `<GSAPWrapper />`
*   **Components Used**: `SeoMeta`, `Circle`, `ImageFallback`, `FiArrowRight`
*   **CSS Files Used**: `style.scss` + [insat.scss](file:///c:/website/website-innvikta/styles/insat.scss) (imported directly)
*   **Unique Styles**: Threat-simulation vector layouts, attack metrics dashboards, and custom toggle components.
*   **Style Controllers**:
    *   *Spacing/Colors/Typography/Responsiveness*: Controlled via local tokens inside the `.insat-page` wrapper in `insat.scss`.

---

### Compliance Training Page
*   **Route**: `/solutions/compliance-training`
*   **File Path**: [app/solutions/compliance-training/page.js](file:///c:/website/website-innvikta/app/solutions/compliance-training/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`), nested inside `<GSAPWrapper />`
*   **Components Used**: `SeoMeta`, `Circle`, `ImageFallback`
*   **CSS Files Used**: `style.scss` + [insat.scss](file:///c:/website/website-innvikta/styles/insat.scss) (imported directly)
*   **Unique Styles**: Bento-box cards for regulations, dynamic dotted-line SVG animations (`.journey-wave-svg`) representing learning journeys.
*   **Style Controllers**:
    *   *Spacing/Colors/Typography/Responsiveness*: Managed by local tokens inside the `.insat-page` wrapper in `insat.scss`.

---

### Blog Listing & Category Pages
*   **Route**: `/blog`, `/blog/page/[slug]`
*   **File Path**: [app/blog/page.js](file:///c:/website/website-innvikta/app/blog/page.js), [app/blog/page/[slug]/page.js](file:///c:/website/website-innvikta/app/blog/page/%5Bslug%5D/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`), nested inside `<GSAPWrapper />`
*   **Components Used**: `SeoMeta`, `BlogPageClient`, `Cta`
*   **CSS Files Used**: `style.scss`, `components.scss`, `buttons.scss`
*   **Unique Styles**: Card lists with hover transitions and pagination blocks.
*   **Style Controllers**:
    *   *Spacing*: Controlled by Tailwind layout helpers.
    *   *Colors*: Extended palette configured in `tailwind.config.js`.
    *   *Typography*: Styled using the primary font family.
    *   *Responsiveness*: Tailwind breakpoint classes (`md:grid-cols-2`).

---

### Dynamic Regular Pages (About, Contact, Terms, Dynamic Solutions)
*   **Route**: `/[regular]`, `/solutions/[slug]`
*   **File Path**: [app/[regular]/page.js](file:///c:/website/website-innvikta/app/%5Bregular%5D/page.js), [app/solutions/[slug]/page.js](file:///c:/website/website-innvikta/app/solutions/%5Bslug%5D/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`) -> dynamically loads layout templates from `layouts/` (`About.js`, `Contact.js`, `Product.js`, `Default.js`, `Solution.js`, `PostSingle.js`).
*   **Components Used**: `SeoMeta`, layout components (`Banner`, `MDXContent`, `TableOfContents`, `Share`)
*   **CSS Files Used**: `style.scss` + file-specific imports (e.g., `About.js` imports `insat.scss`).
*   **Unique Styles**: Markdown prose tags are auto-styled using `.content` classes, which maps styling rules directly to Markdown tables, headers, and code block components.
*   **Style Controllers**:
    *   *Spacing/Colors/Typography/Responsiveness*: Governed by `.content` styles in `components.scss` (via Tailwind Typography) for Markdown elements, or `insat.scss` for customized pages (like `/about`).

---

### Innvikta Arcade
*   **Route**: `/cyber-arcade`
*   **File Path**: [app/cyber-arcade/page.js](file:///c:/website/website-innvikta/app/cyber-arcade/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`) -> sub-layout `app/cyber-arcade/layout.js` (wraps content in `.cyber-arcade-scope` to scope style variables).
*   **Components Used**: `Scene`, `Canvas`, `Hook`, `Collectible`, `PointsDisplay`, `OverlayControls`
*   **CSS Files Used**: [cyber-arcade.scss](file:///c:/website/website-innvikta/app/cyber-arcade/styles/cyber-arcade.scss)
*   **Unique Styles**: Full-viewport WebGL canvas overlays, floating neon badges, 3D spring-physics game controls.
*   **Style Controllers**:
    *   *Spacing*: Scoped canvas padding rules in `cyber-arcade.scss`.
    *   *Colors*: Local CSS variables containing arcade colors (`--neon-orange`, `#ff5500`).
    *   *Typography*: Scoped heading declarations.
    *   *Responsiveness*: Dynamic viewport scales calculated within Three.js context.

---

### Cyberhelp Center
*   **Route**: `/cyberhelp`
*   **File Path**: [app/cyberhelp/page.js](file:///c:/website/website-innvikta/app/cyberhelp/page.js)
*   **Layout Used**: Root Layout (`app/layout.js`) -> sub-layout `app/cyberhelp/layout.js` (wraps content in `<CyberhelpThemeWrapper />`).
*   **Components Used**: `EmergencyPanel`, `FilingAssistant`, `HelplineDirectory`
*   **CSS Files Used**: [cyberhelp.scss](file:///c:/website/website-innvikta/app/cyberhelp/styles/cyberhelp.scss)
*   **Unique Styles**: Step-by-step reporting guides, red alerts for account freezing, and styled input grids.
*   **Style Controllers**:
    *   *Spacing/Colors/Typography/Responsiveness*: Governed by scoped utility variables in `cyberhelp.scss` to prevent collision with site-wide styles.

---

## 8. Component Hierarchy

The component trees of major routes illustrate how reusable components are nested.

### Homepage Components

```
Home Page (app/page.js)
 └── GSAPWrapper
      ├── SeoMeta
      ├── HomeBanner
      │    └── ImageFallback
      ├── Challenges
      ├── ShortIntro
      │    └── VideoPopup
      ├── SpecialFeatures
      ├── Testimonial
      ├── FreeTierCta
      └── Cta
           ├── Circle
           └── Link
```

### InSAT Solutions Page Components

```
InSAT Page (app/solutions/insat/page.js)
 └── GSAPWrapper
      ├── SeoMeta
      ├── Hero Section
      │    └── Link
      ├── Stats Row Section
      │    ├── Link
      │    └── Stats Cards
      │         └── Local Inline SVGs
      ├── Features Grid Section
      │    └── Feature Cards
      │         └── ImageFallback
      ├── AI Adaptive Learning Section
      │    └── ArrowLink
      ├── FAQ Section
      │    └── Accordion Buttons
      └── CTA Section
           ├── Circle
           └── ImageFallback
```

### Innvikta Arcade Page Components

```
Innvikta Arcade Page (app/cyber-arcade/page.js)
 └── .cyber-arcade-scope (app/cyber-arcade/layout.js)
      ├── Canvas (react-three-fiber)
      │    ├── AmbientParticles
      │    ├── Hook (with Flag & FishingLine)
      │    └── Collectibles (multiple instances)
      ├── PositionEditor (Development Overlay)
      └── Points & UI Panel (Zustand-connected Dashboard)
```

---

## 9. Theme System

Central design tokens are defined in `config/theme.json`. This config drives both the Tailwind compiler and the SCSS variables.

### Token Configuration Map (`theme.json`)

```json
{
  "colors": {
    "default": {
      "theme_color": {
        "primary": "#f15a24",
        "body": "#ffff",
        "border": "#dee2e6",
        "border_secondary": "#ffece4",
        "theme_light": "#fffaf3",
        "theme_dark": "#1a202c"
      },
      "text_color": {
        "default": "#666",
        "dark": "#222",
        "light": "#ceced0"
      }
    }
  },
  "fonts": {
    "font_family": {
      "primary": "Inter:wght@400;500;600;700",
      "primary_type": "sans-serif",
      "secondary": "Satoshi:wght@400;500;600;700;900",
      "secondary_type": "sans-serif"
    },
    "font_size": {
      "base": "16",
      "scale": "1.246"
    }
  }
}
```

### Design Token Implementation

*   **Colors**:
    *   `primary` (`#f15a24`): Main branding color. Map to `.btn-primary` backgrounds, links, and borders.
    *   `theme_light` (`#fffaf3`): Applied to banner backgrounds and bento card backdrops.
    *   `theme_dark` (`#1a202c`): Configures dark mode overrides.
*   **Typography**:
    *   `font_family.primary` (Inter): Sets body text.
    *   `font_family.secondary` (Satoshi): Local font asset loaded in `app/layout.js`. Sets layout headings (`h1` through `h6`).
    *   `font_size.base` (`16px`): Root HTML font size.
    *   `font_size.scale` (`1.246`): Multiplier used to scale headings proportionally.

```
h6 = 16px * 1.000 = 16px (1.000rem)
h5 = 16px * 1.246 = 20px (1.246rem)
h4 = 20px * 1.246 = 25px (1.552rem)
h3 = 25px * 1.246 = 31px (1.934rem)
h2 = 31px * 1.246 = 39px (2.410rem)
h1 = 39px * 1.246 = 48px (3.003rem)
```

---

## 10. Reusable CSS Classes

Key utility classes, transitions, and custom layout configurations are defined in the stylesheets:

*   **`.glass-dropdown`**: (Defined in `navigation.scss`). Applied to mega menu sub-options. Features light borders, rounded corners, and shadow elevations.
    ```css
    background-color: #fafaf9;
    border: 1px solid rgba(254, 96, 25, 0.1);
    border-radius: 1.25rem;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
    ```
*   **`.mega-menu-flyout`**: (Defined in `navigation.scss`). Fixed glassmorphic panels displaying mega menu structures.
    ```css
    background-color: rgba(255, 255, 255, 0.45) !important;
    backdrop-filter: blur(30px) !important;
    -webkit-backdrop-filter: blur(30px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    ```
*   **`.active-tab-rail`** / **`.inactive-tab-rail`**: (Defined in `navigation.scss`). Controls active states inside left-rail navigation tabs.
*   **`.animate-float`**: (Defined in `style.scss`). Applies float animations to images.
*   **`.animate-wave`**: (Defined in `style.scss`). Animates vector waves in the background of headers.
*   **`.no-scrollbar`**: (Defined in `style.scss`). Hides scrollbars while keeping overflow scrolling functional.

---

## 11. Style Flow

The visual flow below illustrates how configurations and stylesheets merge to style page components.

```
[ config/theme.json ]
  │
  ├───> [ tailwind.config.js ]
  │       │
  │       └───> Tailwind Utility Engine (colors, screens, fonts)
  │               │
  │               v
  ├───> [ styles/style.scss ]
  │       │
  │       ├───> @tailwind base; (@apply rules)
  │       ├───> @tailwind components; (.btn, .section, .content)
  │       ├───> @tailwind utilities;
  │       │
  │       └───> Custom SCSS (@import base, navigation, buttons, components)
  │               │
  │               v
  └───> [ app/layout.js ] (Global stylesheet injection)
          │
          ├───> Raw HTML Markup Tags (body, h1-h6 normalized)
          │
          └───> Page Components (scoped pages e.g., app/solutions/insat/page.js)
                  │
                  └───> Local Stylesheet Overrides (e.g., insat.scss imports)
```

---

## 12. Why Changes Propagate

Making edits to the frontend can cause visual bugs on seemingly unrelated pages. This styling propagation is caused by four main architectural links:

### 1. Unified `@tailwind` SCSS Base Layer
The SCSS files use Tailwind’s `@apply` directive to write CSS rules (e.g., `body { @apply text-[17px] bg-body font-primary text-text; }`). Because these layers are registered globally:
*   *Why changes propagate*: If you change the primary text color in `theme.json` or customize `styles/base.scss`, the changes propagate to the entire site.

### 2. Unscoped CSS Class Selectors in Shared Components
Many components in `/layouts/components` rely on site-wide SCSS class declarations (e.g., `.btn`, `.section-title`, `.content`).
*   *Why changes propagate*: If you edit the styling of `.btn-primary` in `buttons.scss` to fix an alignment issue on the Contact page, buttons on the Homepage, Blog Lists, and dynamic solutions pages will also be modified.

### 3. Direct Import of `insat.scss` across Multiple Pages
The `insat.scss` stylesheet contains general class selectors (e.g., `.container`, `.stats-card`, `.info-row`). This file is imported directly by pages outside the InSAT route:
*   *Why changes propagate*: Modifying a card style inside `insat.scss` to style the InSAT page will also alter cards on the About page and compliance training calculators.

### 4. Global Context Providers in the Root Layout
The Root Layout wraps `{children}` inside the `<TrackingProvider />` component.
*   *Why changes propagate*: If you update the tracking code or wrapper styles inside `TrackingProvider.jsx`, it changes the DOM context for the entire application.

---

## 13. Safe Customization Guide

Use these rules to customize pages without causing unintended layout shifts on other pages.

### Customization Rules

| Route / Component | Files to Edit | Files to Avoid | Safe Customization Method |
| :--- | :--- | :--- | :--- |
| **InSAT Page** `/solutions/insat` | `app/solutions/insat/page.js` | `styles/insat.scss` | Declare Tailwind utility classes directly in `page.js` instead of modifying shared SCSS classes in `insat.scss`. |
| **About Us Page** `/about` | `layouts/About.js` | `styles/insat.scss` | If you need custom padding or colors, write inline styles (e.g., `style={{ background: "#FFFFFF" }}`) or use scoped Tailwind utilities inside `About.js`. |
| **Arcade Console** `/cyber-arcade` | `app/cyber-arcade/page.js`, `app/cyber-arcade/styles/cyber-arcade.scss` | `styles/style.scss`, `styles/components.scss` | Keep styles scoped under the `.cyber-arcade-scope` class wrapper inside `cyber-arcade.scss`. |
| **Emergency Help** `/cyberhelp` | `app/cyberhelp/page.js`, `app/cyberhelp/styles/cyberhelp.scss` | `styles/components.scss` | Ensure new elements are wrapped inside `<CyberhelpThemeWrapper />` to prevent style leaks. |
| **Main Header** | `layouts/partials/Header.js`, `styles/navigation.scss` | `styles/style.scss` | Create unique class names (e.g., `.header-cta-start-free`) instead of editing generic utility classes like `.btn`. |

---

## 14. Recommendations

The following structural improvements will help isolate styles, prevent regressions, and make the codebase easier to maintain:

### 1. Refactor and Scrape CSS out of `insat.scss`
*   *Current Issue*: `insat.scss` is an **88KB global stylesheet** imported across unrelated pages. A change made for InSAT can easily break layout styles on the About page.
*   *Action Plan*:
    *   Split `insat.scss` into modular stylesheet files: `about.scss`, `freetools.scss`, and `insat-core.scss`.
    *   Import these files only within their corresponding route contexts to limit the blast radius of changes.

### 2. Refactor `Header.js`
*   *Current Issue*: The `Header.js` component is **113KB**, containing large inline SVGs and hardcoded data models. This makes the code difficult to read and maintain.
*   *Action Plan*:
    *   Extract the illustrations into a separate component: `layouts/components/HeaderIllustrations.js`.
    *   Move the static navigation links (`menuData`) into `config/menu.json` or a separate helper configuration file.

### 3. Replace direct SCSS Imports with Tailwind Utilities
*   *Current Issue*: Custom SCSS rules are often used for basic layout tasks like card layouts, font styles, and grids.
*   *Action Plan*:
    *   Use Tailwind's utility class combinations instead of writing custom SCSS rules.
    *   Replace simple SCSS declarations with Tailwind classes (e.g., replace custom selectors with `flex items-center justify-between gap-4`).
