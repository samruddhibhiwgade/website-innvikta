# Refactoring & Restructuring Proposal: Phase 2 Monolithic Page Partitioning & Style Isolation

This proposal details the plan to modularize the remaining monolithic pages, tools, and shared layout components in the codebase, bringing the entire workspace into a clean, component-oriented, and performance-optimized architecture.

---

## 1. Monolithic Files Analysis (Target Inventory)

The following pages and layout templates have been identified as monolithic (containing inline UI sections, local states, hardcoded datasets, inline SVGs, and animations in single files). They will be refactored into modular sub-components.

| File Location | Size (KB) | Current Structure | Target Architecture |
| :--- | :--- | :--- | :--- |
| `src/app/solutions/human-risk-intelligence/page.js` | **77.7 KB** | ~1080 lines of inline components, raw SVG network maps, and local state. | Thin entry orchestrator + `sections/` components. |
| `src/app/solutions/customized-solutions/page.js` | **52.1 KB** | ~960 lines of inline sections, policy lists, bento grids, and local state. | Thin entry orchestrator + `sections/` components. |
| `src/app/freetools/culture-benchmarking/page.js` | **92.8 KB** | ~1490 lines of inline questionnaire state, scoring calculations, dimensions, and report grids. | Orchestrator + `components/` for Quiz, Dimensions, Report, and FAQs. |
| `src/app/freetools/spot-the-phish/page.js` | **82.1 KB** | ~1380 lines containing 15 email scenarios (HTML bodies), timer intervals, and game panels. | Orchestrator + `components/` for EmailList, GameScreen, and ScenarioData. |
| `src/app/freetools/password-generator/page.js` | **69.5 KB** | ~1100 lines of password math, regex checks, strength indicators, and layout. | Orchestrator + `components/` for GeneratorForm and InfoGrid. |
| `src/app/freetools/domain-security-analyzer/page.js` | **65.4 KB** | ~1050 lines of API domain lookup states, reports, and graphics. | Orchestrator + `components/` for AnalyzerForm and AuditReport. |
| `src/app/freetools/baseline-score-tool/page.js` | **59.6 KB** | ~980 lines of score calculation metrics and questionnaire steps. | Orchestrator + `components/` for QuestionFlow and Results. |
| `src/app/free-tools/cybersecurity-word-search/page.js` | **61.0 KB** | ~1020 lines of word search grid arrays, mouse-drag triggers, and timers. | Orchestrator + `components/` for WordGrid and Scoreboard. |
| `src/app/resources/simulation-roi/page.js` | **44.1 KB** | ~750 lines of financial calculations, sliders, and formulas. | Orchestrator + `components/` for Calculators and Charts. |
| `src/app/resources/dpdp-at-a-glance/page.js` | **43.8 KB** | ~700 lines of static compliance text cards and layout grids. | Orchestrator + `sections/` or static Markdown files. |
| `src/app/resources/maturity-calculator/page.js` | **33.9 KB** | ~600 lines of maturity matrix evaluation flow. | Orchestrator + `components/` for Assessment. |
| `src/app/partners/page.js` | **34.1 KB** | ~600 lines of inline headings, partnership cards, and benefits. | Orchestrator + `sections/` components. |
| `src/app/start-free/page.js` | **24.8 KB** | ~480 lines of client-side registration forms and visual columns. | Orchestrator + `components/` for Forms and Features. |
| `src/app/book-demo/page.js` | **23.1 KB** | ~450 lines of inline scheduling forms, calendars, and headers. | Orchestrator + `components/` for CalendarForm. |
| `src/app/cyber-arcade/page.js` | **29.0 KB** | ~500 lines of WebGL canvas wrappers and Zustand hooks. | Orchestrator + `components/` for GameCanvas. |
| `src/layouts/About.js` | **36.6 KB** | ~650 lines of static team grids, mission headers, and story timelines. | Modular layout component + `sections/` components. |

---

## 2. Refactoring Blueprints for Key Monoliths

### 2.1: Human Risk Intelligence Page (`src/app/solutions/human-risk-intelligence/`)
The **77.7 KB** file will be modularized into a thin orchestrator page file and separate files inside a new local `sections/` folder:

```
src/app/solutions/human-risk-intelligence/
├── sections/
│   ├── Hero.js                  # Hero heading & complex background SVGs (Lines 153-326)
│   ├── Stats.js                 # Risk stats cards & custom inline SVG charts (Lines 327-426)
│   ├── SolutionAccordion.js     # Interactive swapper accordion panel (Lines 427-501)
│   ├── ReportsDashboard.js      # Reports bento list & SVG mock tables (Lines 502-699)
│   ├── RoleBased.js             # Risk profiling for Finance, HR, Sales, IT (Lines 700-745)
│   ├── Faq.js                   # Accordion details mapped from constants
│   ├── FinalCta.js              # Standard action footer
│   └── constants.js             # Moves arrays: `coreCards`, `faqData`, `reportingAudits`
└── page.js                      # Thin orchestrator (imports and renders sections)
```

### 2.2: Culture Benchmarking Page (`src/app/freetools/culture-benchmarking/`)
The **92.8 KB** file will be modularized into components under a local `components/` folder to isolate the quiz state machine and scoring algorithm:

```
src/app/freetools/culture-benchmarking/
├── components/
│   ├── BenchmarkHero.js         # Top banner and headings
│   ├── QuestionCard.js          # Interactive multi-choice step quiz element (Questions 1-9)
│   ├── ScoreMaturityReport.js   # Scoring results, dimension bars, and recommendations
│   ├── BenchmarkFaq.js          # FAQS layout
│   └── constants.js             # Questionnaire choices, dimension definitions, and questions data
└── page.js                      # Page wrapper coordinating quiz vs. report view states
```

### 2.3: Spot the Phish Game Page (`src/app/freetools/spot-the-phish/`)
The **82.1 KB** file will extract its static email datasets and interactive screens to make game state management easier to verify:

```
src/app/freetools/spot-the-phish/
├── components/
│   ├── StartScreen.js           # Welcome modal overlay
│   ├── OutlookSidebar.js        # Left email folder listing panel
│   ├── EmailBody.js             # Current email body renderer & trust toggle buttons
│   ├── FeedbackModal.js         # Phishing analysis explanation overlay
│   ├── ScoreboardSummary.js     # Final complete screens with stats and restart buttons
│   └── scenarios.js             # Static file housing the HTML templates for the 15 emails
└── page.js                      # Page entry containing timer and active guess states
```

---

## 3. Stylesheet Partitioning & Isolation

All remaining styling rules defined inside `styles/insat.scss` will be extracted into scoped feature stylesheets inside `src/styles/features/`:

1.  `human-risk-core.scss`: Scope wrapped in `.human-risk-scope` to prevent layout leakage.
2.  `customized-core.scss`: Scope wrapped in `.customized-scope`.
3.  `freetools-core.scss`: Common styling rules for baseline, culture, spot-the-phish, and generator tools.
4.  `about-core.scss`: Scoped rules for the team grids and history timelines.

Example of style wrapping:
```scss
/* src/styles/features/human-risk-core.scss */
.human-risk-scope {
  --color-accent-orange: #f15a24;
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
}
```

---

## 4. Verification & Validation Protocol

To guarantee zero regressions in functionality, layout, and visual design:

### 4.1: DOM Comparisons
We will update our testing script `scratch/verify_dom.js` to capture snapshots of all 15 page routes prior to refactoring, and compare them character-by-character with the refactored output:
```bash
node scratch/verify_dom.js before
# [Execute refactoring steps]
node scratch/verify_dom.js after
# [Verify HTML diffs]
```

### 4.2: Key State Workflows to Audit
1.  **Form submissions:** Ensure the password generator correctly triggers math calculations, and domain analyzer handles input callbacks.
2.  **Game triggers:** Verify the Spot the Phish countdown timer stops when complete and correctly calculates answers.
3.  **Active routes:** Ensure no broken links or missing layouts occur in the `[regular]` pages.
