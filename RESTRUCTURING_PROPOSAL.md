# Refactoring & Restructuring Proposal: Monolithic Page Partitioning & Style Isolation

This proposal details the architectural current state, analyzes the internal composition of monolithic files, lays out a concrete plan to move layouts under a unified `/src` structure, and specifies a strict verification protocol to guarantee zero visual regressions or animation failures.

---

## 1. Current Workspace Structure & Design Flaws

The project is structured under a hybrid layout that inherits files from both Pages Router and App Router structures. This results in clutter at the root level and un-encapsulated stylesheet leakage.

### Current Directory Structure
```
c:\website\website-innvikta\
├── app/                       # Routing (Contains pages, layouts, and API endpoints)
├── layouts/                   # Shared templates & layouts (legacy folder in root)
│   ├── components/            # Reusable UI parts (Circle.js, Scene.js, Cta.js)
│   ├── partials/              # Larger layout shells (Header.js, Footer.js, Chatbot.js)
│   └── shortcodes/            # Shortcodes for MDX compilation
├── styles/                    # Global stylesheet files
│   ├── base.scss              # Global HTML reset rules
│   ├── buttons.scss           # Global action button stylings
│   ├── components.scss        # Card frameworks, notice containers, and prose styles
│   ├── insat.scss             # 88KB of unscoped styles for InSAT and related pages
│   ├── navigation.scss        # Glassmorphic header and mega-menu animations
│   └── style.scss             # Stylesheet compiler entry point
├── config/                    # Global static JSON configurations (root level)
├── content/                   # Static Markdown files (root level)
├── public/                    # Web fonts and image directories
├── lib/                       # GSAP integrations and text converting scripts
├── store/                     # Zustand state management for WebGL arcade
└── hooks/                     # Custom React hooks
```

### Main Architectural Pain Points

1.  **Split-Brain Code Locations**:
    *   Shared UI files live in the root-level `layouts/components/` and `layouts/partials/` directories, while routing files live in the root-level `app/` folder. This splits code across separate root directories.
2.  **Monolithic Page Files (Hardcoded Layouts)**:
    *   Pages like InSAT (`app/solutions/insat/page.js`), Phishing Simulation (`app/solutions/phishing-simulation/page.js`), and Compliance Training (`app/solutions/compliance-training/page.js`) contain up to 900 lines of JSX, static datasets, inline SVGs, and scroll animation logic in a single file.
3.  **Global Style Pollution (`insat.scss`)**:
    *   At **88KB and 3,708 lines**, `insat.scss` is loaded globally on multiple pages. Because its classes are not scoped, editing a style for the InSAT page can cause layout regressions on the About page or dynamic solution pages.
4.  **Root Folder Clutter**:
    *   Source folders sit directly alongside configuration files, making it hard to manage.

---

## 2. Exhaustive Section-by-Section Analysis of Monolithic Files

---

### File 1: InSAT Page (`app/solutions/insat/page.js`)
*   **Total Size**: 50.4 KB | **Total Length**: 798 Lines
*   **State Management**:
    *   `activeFaq`: Tracks the index of the expanded FAQ item (`null` or `0-2`).
    *   `currentIndex`, `prevDisabled`, `nextDisabled`: Manages slider translations and navigation states for the testimonial slider.
*   **Scroll Animations**:
    *   GSAP `ScrollTrigger` timeline targets `.hero-content > *` and `.hero-visual` for entrance animations on scroll.

#### Section-by-Section Layout Breakdown:
*   **Lines 13-50**: Testimonial slider translation logic and resize handlers.
*   **Lines 52-73**: GSAP animation hooks mapping triggers to DOM classes.
*   **Lines 82-141**: **Hero Section**. Renders the `hero-grid-container` with custom heading tokens, CTAs, and `dashboard_platform1.png` inside the desktop container.
*   **Lines 145-279**: **Stats Row Section**. Renders three visual stats cards (Breach Cost, AI Usage, and Incident Reductions) containing complex inline SVG charts.
*   **Lines 282-334**: **Features Grid Section**. Displays three cards: Security Awareness, Phishing, and Microlearning.
*   **Lines 337-487**: **Core Columns**. Renders grids for AI Adaptive Learning, Reporting, Gamified Engagement, Continuous Reinforcement, and IT Integrations.
*   **Lines 490-546**: **Everything Needed list**. Displays detailed grids for adaptive pathways.
*   **Lines 549-625**: **Role-Based Learning Section**. Four bento cards mapping risks for Finance, HR, Sales, and IT.
*   **Lines 628-744**: **FAQ Accordion Section**. FAQ grids, accordion panels, and state hooks.
*   **Lines 747-785**: **CTA Prompt**. Banner CTA with wave SVGs and decorative circles.

---

### File 2: Phishing Simulation Page (`app/solutions/phishing-simulation/page.js`)
*   **Total Size**: 57.1 KB | **Total Length**: 890 Lines
*   **State & Routing Elements**:
    *   `activeFaq`: FAQ accordion toggle states.
    *   `activeVector` (Index `0-6`): Tracks the selected attack vector tab.
    *   `displayImages` (`current` and `prev` sources): Handles fade transitions when switching screenshot mockups.
    *   `hashchange` Listener: Maps URL anchor hashes (e.g., `#vishing-simulation`) to accordion vectors and triggers smooth scrolling.

#### Section-by-Section Layout Breakdown:
*   **Lines 13-99**: The static `attackVectors` data array, containing the name, description, and raw SVG icon definitions for each vector.
*   **Lines 101-163**: Hash routing handlers, image transition loops, and hash change event listeners.
*   **Lines 167-223**: Testimonials slider translation mechanics, resize listeners, and GSAP ScrollTrigger timelines.
*   **Lines 233-280**: **Hero Section**. Banner title: "Identify and Reduce Human Risk Before It Becomes a Breach".
*   **Lines 282-398**: **Stats Row Section**. Stats grid with three indicators: Observed Attacks (apwg), BEC Costs (ic3), and AI voice fraud rates.
*   **Lines 401-483**: **Multichannel Simulation Accordion**. Split-screen layout: a left accordion containing the 7 attack vectors and a right device frame showing screen mockups.
*   **Lines 486-580**: **Custom Campaign Builder**. Two-column layout mapping template cards on the left and a library graphic on the right.
*   **Lines 583-699**: **Reports & Insights Section**. Features click metrics, department logs, and repeat offender trackers.
*   **Lines 706-744**: **FAQ Accordion Section**.
*   **Lines 747-785**: **CTA Prompt**. Banners with decorative waves.

---

### File 3: Compliance Training Page (`app/solutions/compliance-training/page.js`)
*   **Total Size**: 42.0 KB | **Total Length**: 792 Lines
*   **State & Calculations**:
    *   `activeFaq`: FAQ accordion index states.
    *   Local inline styling objects defining card grids and bento structures.
    *   `getTotalLength()` SVG mask calculation: Draws the dotted path line on scroll using GSAP coordinates.

#### Section-by-Section Layout Breakdown:
*   **Lines 18-108**: GSAP ScrollTrigger timelines. Desktop timelines draw SVG line masks dynamically based on screen coordinates.
*   **Lines 110-186**: Shared FAQ database arrays and inline style configuration models.
*   **Lines 193-252**: **Hero Section**. Header title: "Audit-ready. Built for Retention."
*   **Lines 254-368**: **Stats Row Bento Grid**. Two-column layout mapping privacy rules: DPDP Act, GDPR, HIPAA, PCI-DSS, AI Policies, and Internal Code vectors.
*   **Lines 370-491**: **Compliance Journey Section**. Connects the four stages (Train, Assess, Reinforce, Evidence) with a dotted SVG path line that draws dynamically on scroll.
*   **Lines 493-585**: **Role-Based Compliance Learning**. Lists specific training modules for HR, Finance, IT, Sales, and Leadership.
*   **Lines 587-703**: **Refresher Campaigns Section**. 6 campaign status cards mapping notifications and targeted reminders.
*   **Lines 705-744**: **FAQ Accordion Section**.
*   **Lines 746-785**: **Final CTA Prompt**.

---

### File 4: Monolithic Stylesheet (`styles/insat.scss`)
*   **Total Size**: 88.2 KB | **Total Length**: 3,708 Lines
*   **Current Composition**:
    *   **Lines 1-32**: Direct `@font-face` loads for Satoshi and F37Lineca fonts.
    *   **Lines 34-70**: CSS variables defined inside the `.insat-page` selector (`--color-forest`, `--color-emerald`, etc.).
    *   **Lines 71-115**: Resets for headers, images, anchors, buttons, lists, and lists.
    *   **Lines 116-228**: Custom clamped typography headings (`.text-96-heading`, `.text-52-heading`, `.text-subheading`).
    *   **Lines 229-302**: Global section layouts and padding models.
    *   **Lines 303-562**: Responsive headers, mobile slide-drawers, and language lists.
    *   **Lines 563-700**: Custom button styles (`.btn-primary`, `.btn-secondary`, `.arrow-wrapper`).
    *   **Lines 701-3708**: Unscoped SCSS rules for solutions, stats sections, calculators, accordions, and bento cards.

---

## 3. Restructuring Methodology: Strict Manual Execution

To prevent runtime errors, syntax regressions, and compiler inconsistencies, the restructuring process will reject any automated mass search-and-replace scripts or file migration tools. Every file move, import pathway edit, component extraction, and stylesheet compile update will be executed manually, one by one.

### Scoping Rules for Manual Migration:
*   **No Automated Mass Replacements**: Paths like relative SCSS imports or Next.js aliases will be manually updated and checked in each file.
*   **Line-by-Line Scrutiny**: During JSX component extraction, we will manually audit local React hooks (`useEffect`, `useState`, `useRef`), props delegation, and layout offsets to ensure scoping remains correct.
*   **One-by-One Route Migration**: The Solutions pages (InSAT, Phishing, Compliance) will be migrated and verified individually. We will build and test the page after each component extraction rather than modifying all pages simultaneously.
*   **Manual Animation Checking**: Interactive triggers and GSAP animation triggers will be manually tested in the browser at various responsive widths.

---

## 4. The Target Component-Based Directory Layout

The refactored code will be moved under a clean, unified `/src` folder structure, separating configurations and content databases in the root:

```
c:\website\website-innvikta\
├── config/                     # Central static parameters (theme.json, config.json)
├── content/                    # Markdown content files
├── public/                     # Public image resources & fonts
└── src/                        # Root folder for code
    ├── app/                    # Next.js App Router (pages and sub-app layouts)
    │   ├── solutions/          
    │   │   ├── insat/          
    │   │   │   ├── sections/   # Local isolated page rows
    │   │   │   │   ├── Hero.js
    │   │   │   │   ├── Stats.js
    │   │   │   │   ├── FeaturesGrid.js
    │   │   │   │   └── Faq.js
    │   │   │   │   └── constants.js
    │   │   │   └── page.js     # Clean page orchestrator
    │   │   ├── compliance-training/
    │   │   │   ├── sections/   
    │   │   │   │   ├── Hero.js
    │   │   │   │   ├── BentoGrid.js
    │   │   │   │   ├── Journey.js
    │   │   │   │   └── Faq.js
    │   │   │   └── page.js     # Clean page orchestrator
    │   │   └── phishing-simulation/
    │   │       ├── sections/   
    │   │       │   ├── Hero.js
    │   │       │   ├── Stats.js
    │   │       │   ├── AccordionPanel.js
    │   │       │   └── Faq.js
    │   │       └── page.js     # Clean page orchestrator
    │   ├── layout.js           # Root Layout file
    │   └── page.js             # Homepage router
    ├── layouts/                # Shared layout components
    │   ├── components/         # Reusable widgets (Circle, GSAPWrapper, Logo)
    │   └── partials/           # Site-wide elements (Header, Footer)
    ├── styles/                 # Scoped stylesheets
    │   ├── features/           # Scoped page styles
    │   │   ├── insat-core.scss
    │   │   ├── compliance-core.scss
    │   │   ├── phishing-core.scss
    │   │   └── about-core.scss
    │   ├── style.scss          # Main style compiler entry
    │   ├── base.scss           
    │   ├── components.scss     
    │   └── buttons.scss        
    ├── lib/                    # Core helper functions
    ├── store/                  # zustand state hooks
    └── hooks/                  # Scoped custom hooks
```

---

## 5. Step-by-Step Refactoring Blueprint

Here is a walk-through showing how a monolithic page file is split and modularized.

---

### Step 5.1: Extract Sub-Components
Create modular functional components under the page's `./sections/` directory.

#### Example Extraction: Stats Row Component (`src/app/solutions/insat/sections/Stats.js`)
```javascript
import React from "react";
import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="bg-white stats-section">
      <div className="container">
        <div className="stats-grid">
          {/* Left text column */}
          <div className="stats-content-block animate from-left">
            <span className="text-subheading">INSAT USER RISK SIMULATION</span>
            <h2 className="text-52-heading">
              Simulate Real-World <br/>
              <span className="text-orange">Risk.</span> Drive <br/>
              <span className="text-orange">Real Impact.</span>
            </h2>
            <div className="stats-subheading">
              <p className="text-18-content opacity-80">
                InSAT's realistic simulations uncover human risk across email, AI tools, and data handling.
              </p>
            </div>
            <div className="mt-8">
              <Link className="btn btn-primary btn-cta" href="/book-demo">
                <span>Book a demo</span>
              </Link>
            </div>
          </div>

          {/* Right stats cards column */}
          <div className="stats-cards-block animate from-right">
            {/* Card 1: Breach Cost */}
            <div className="stats-card">
              <div className="card-icon-wrapper bg-[#FFEFEA] rounded-full w-[72px] h-[72px] flex items-center justify-center mx-auto">
                {/* SVG Icon */}
              </div>
              <div className="card-number">$4.44M</div>
              <div className="card-divider"></div>
              <h3 className="card-title">Average Global Breach Cost</h3>
              <span className="card-source">SOURCE: IBM</span>
            </div>
            
            {/* Additional cards here... */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Step 5.2: Simplify the Parent Page Orchestrator (`src/app/solutions/insat/page.js`)
The parent `page.js` file is simplified into an orchestrator shell:

```javascript
"use client";
import React, { useRef } from "react";
import SeoMeta from "@layouts/partials/SeoMeta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import HeroSection from "./sections/Hero";
import StatsSection from "./sections/Stats";
import FeaturesGrid from "./sections/FeaturesGrid";
import FAQSection from "./sections/Faq";
import "../../../styles/features/insat-core.scss"; // Scoped stylesheet

export default function InsatPage() {
  const containerRef = useRef(null);

  return (
    <GSAPWrapper>
      <SeoMeta 
        title="InSAT | AI-Powered Security Awareness Training Platform" 
        description="Reduce threat susceptibility with Innvikta's Interactive Security Awareness Training platform." 
      />
      <div className="insat-page-scope" ref={containerRef}>
        <HeroSection />
        <StatsSection />
        <FeaturesGrid />
        <FAQSection />
      </div>
    </GSAPWrapper>
  );
}
```

---

## 6. Stylesheet Partitioning & Scope Isolation

Instead of loading one massive 88KB stylesheet globally, `insat.scss` will be split into page-specific stylesheets.

### Partitioning Layout
1.  **Extract `insat-core.scss`**: Rules for `/solutions/insat` components.
2.  **Extract `compliance-core.scss`**: Rules for `/solutions/compliance-training` components.
3.  **Extract `phishing-core.scss`**: Rules for `/solutions/phishing-simulation` components.
4.  **Extract `about-core.scss`**: Rules for the `/about` layout.

### Scope Isolation (Preventing Style Leakage)
To ensure styles do not leak onto other pages, we will wrap them in parent container classes:

```scss
/* src/styles/features/insat-core.scss */
.insat-page-scope {
  /* InSAT font definitions */
  --color-forest: #1F2937;
  --color-grey-5: #FFF6E9;

  font-family: var(--font-secondary), sans-serif;
  background-color: var(--color-white);

  .hero-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .stats-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
}
```

By wrapping all InSAT style definitions inside `.insat-page-scope`, these styles will *only* apply when rendering components nested within that container, preventing unintended layout shifts on other pages.

---

## 7. Zero-UI-Regression Verification Protocol

To ensure that the website's design, responsiveness, and animations remain **100% identical** after the restructuring, we will implement the following verification protocol.

### 6.1: HTML DOM Comparison (SSR Diffs)
Next.js pre-renders page layouts on the server. Because modularizing React code does not change the compiled HTML structure, we can compare the generated HTML before and after the refactoring to verify that the markup remains identical.

#### The Audit Script (`scratch/verify_dom.js`)

We will run a script to download and compare the compiled HTML files:

```javascript
const fs = require('fs');
const path = require('path');
const http = require('http');

const PAGES = [
  { name: 'insat', url: 'http://localhost:3000/solutions/insat' },
  { name: 'compliance', url: 'http://localhost:3000/solutions/compliance-training' },
  { name: 'phishing', url: 'http://localhost:3000/solutions/phishing-simulation' },
  { name: 'about', url: 'http://localhost:3000/about' }
];

const fetchHtml = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
};

const runAudit = async (phase) => {
  const outputDir = path.join(__dirname, '../scratch/snapshots', phase);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (let page of PAGES) {
    try {
      const html = await fetchHtml(page.url);
      // Clean dynamic scripts and hydration keys to isolate static markup
      const cleanHtml = html
        .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
        .replace(/__next_f[^>]*>/g, '')
        .replace(/&quot;/g, '"');
      
      fs.writeFileSync(path.join(outputDir, `${page.name}.html`), cleanHtml);
      console.log(`Snapshot saved for: ${page.name} (${phase})`);
    } catch (e) {
      console.error(`Failed to fetch: ${page.name}`, e.message);
    }
  }
};

// Usage: 
// 1. Run `node verify_dom.js before` on the current codebase.
// 2. Perform the refactoring.
// 3. Run `node verify_dom.js after` on the refactored codebase.
// 4. Compare the files: `diff scratch/snapshots/before/insat.html scratch/snapshots/after/insat.html`.
```

If the refactoring is correct, the difference check (`diff`) should return **zero differences** in the HTML tags, hierarchies, attributes, and class names.

### 6.2: GSAP Trigger Audits
GSAP animations target specific class selectors (e.g., `.hero-content > *`, `.journey-step`).
1.  Verify that extracted sub-components keep their class names exactly:
    *   *Hero Section*: Main container must retain `.hero-content` and child columns must preserve `.hero-image-right` and `.hero-visual`.
    *   *Compliance Journey*: The SVG container must preserve `.journey-wave-svg` and target path masks must preserve `.journey-mask-path`.
2.  Verify that parent sections retain the exact classes that trigger ScrollTrigger actions (e.g., `.story-section`, `.mission-section`).

### 6.3: Responsive Layout Verification
We will audit the bento grids and flex containers across standard responsive breakpoints:
*   Verify that nested grids retain their Tailwind responsive prefixes (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
*   Confirm that style overrides inside `@media` queries in the partitioned stylesheets (`insat-core.scss`, etc.) align with the viewport scales.

### 6.4: Interactive State Verification
Verify that interactive component elements function correctly:
*   *Accordion Expand/Collapse*: Click FAQs to ensure the panels expand and collapse smoothly.
*   *Image Toggles*: Click the attack vector tabs in Phishing Simulation to verify that the mockup screenshots update and transition correctly.
*   *Zustand and WebGL*: Launch the game on the `/cyber-arcade` route to verify that state hooks and collectible models load and render.
*   *Newsletter Forms*: Verify that AJAX newsletter sign-up requests submit correctly.
