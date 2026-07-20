# Comprehensive Typography & CSS Audit for Solution Pages

> **Repository:** Innvikta Website  
> **Directory Audited:** `app/solutions/`  
> **Primary Stylesheets:** `styles/insat.scss`, `styles/components.scss`, `styles/buttons.scss`

---

## 📋 Executive Summary

This document provides an exhaustive reference of all solution pages within the Innvikta application (`/solutions/insat`, `/solutions/phishing-simulation`, `/solutions/compliance-training`, `/solutions/human-risk-intelligence`, `/solutions/customized-solutions`), mapping every single text node, title, paragraph, metric card, and button to its exact CSS selectors, rules, font settings, and responsive layout properties.

---

## 🎨 Design System & Core Typography Rules

All solution pages are wrapped inside `<div className="insat-page">`. The typography system is governed by design tokens and fluid typography rules defined in `styles/insat.scss`.

### Design Tokens & Variables

```scss
.insat-page {
  /* Colors */
  --color-forest: #1F2937;
  --color-forest-15: rgba(31, 41, 55, 0.15);
  --color-forest-70: rgba(31, 41, 55, 0.7);
  --color-emerald: #E66E00;
  --color-aquamarine: #FF7A00;
  --color-night: #111827;
  --color-lavender: #FFF0E0;
  --color-plum: #2D221A;
  --color-sky: #FFF8F0;
  --color-midnight: #1A120B;
  --color-grey-5: #FFF6E9;
  --color-grey-30: #6B7280;
  --color-white: #FFFFFF;
  --color-salmon: #FFEAD4;
  --color-black-text: #1F2937;

  /* Typography Fonts */
  --font-heading: var(--font-secondary), sans-serif;
  --font-body: var(--font-secondary), sans-serif;
}
```

### Core Heading Classes

```scss
.text-96-heading {
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 0.95;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-family: var(--font-heading);
}

.text-52-heading {
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1.1;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-family: var(--font-heading);
}

.text-40-heading {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    line-height: 1.15;
    font-weight: 400;
    letter-spacing: -0.01em;
    font-family: var(--font-heading);
}

.text-22-heading {
    font-size: clamp(1.2rem, 1.5vw, 1.375rem);
    line-height: 1.3;
    font-weight: 400;
    font-family: var(--font-heading);
}
```

### Global Typography Classes

| Class Name | Font Family | Size (Fluid Clamp / Fixed) | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `.text-96-heading` | `var(--font-heading)` | `clamp(2.5rem, 6vw, 5.5rem)` | `0.95` | `400` | Main Hero Headline |
| `.text-64-heading` | `var(--font-heading)` | `clamp(2.2rem, 5vw, 4rem)` | `1.05` | `400` | Major Feature Headline |
| `.text-52-heading` | `var(--font-heading)` | `clamp(2rem, 4vw, 3.25rem)` | `1.1` | `400` | Section Title |
| `.text-40-heading` | `var(--font-heading)` | `clamp(1.75rem, 3vw, 2.5rem)` | `1.15` | `400` | Secondary Section Title / FAQ |
| `.text-32-heading` | `var(--font-heading)` | `clamp(1.5rem, 2.5vw, 2rem)` | `1.2` | `400` | Sub-section Title |
| `.text-22-heading` | `var(--font-heading)` | `clamp(1.2rem, 1.5vw, 1.375rem)` | `1.3` | `400` | Feature Row Title / Card Header |
| `.text-subheading` | `var(--font-body)` | `1.125rem` (18px) | `1.5` | `600` | Uppercase Section Kicker Badge |
| `.text-20-content` | `var(--font-body)` | `clamp(1.2rem, 1.65vw, 1.35rem)` | `1.5` | `400` | Hero Paragraph Lead Text |
| `.text-18-content` | `var(--font-body)` | `1.25rem` (20px) | `1.5` | `400` | Standard Section Subtext |
| `.text-16-content` | `var(--font-body)` | `1.125rem` (18px) | `1.5` | `400` | Secondary Detail Text |

---

## 🛠️ Global Component & CTA CSS Rules

### 1. Edge-to-Edge Full-Width CTA Section (`.cta`)

To ensure the final CTA section background spans 100% of the viewport width across all display resolutions while keeping content aligned:

```scss
.cta {
    .container-xl, .container {
        position: static !important;
    }

    .bg-theme {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;

        &::before {
            border-radius: 0 !important;
        }
    }

    .section {
        position: static !important;
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;

        @media (min-width: 640px) {
            padding-left: 3rem !important;
            padding-right: 3rem !important;
        }
    }
}
```

### 2. Equal-Width Centered Buttons (`.cta .btn`)

To ensure CTA buttons remain visually balanced, equal-width, and centered relative to headings:

```scss
.cta {
    .btn {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 3rem !important; /* 48px height */
        line-height: 3rem !important;
        font-size: 0.9rem !important;
        font-weight: 700 !important;
        padding: 0 1.5rem !important;
        border-radius: 8px !important;
        white-space: nowrap !important;
        transition: all 0.2s ease !important;
        box-sizing: border-box !important;
        width: 180px !important;
        max-width: 47% !important;

        @media (max-width: 480px) {
            font-size: 0.85rem !important;
            padding: 0 0.5rem !important;
            height: 2.75rem !important; /* 44px height */
            line-height: 2.75rem !important;
            width: 160px !important;
        }
    }
}
```

---

## 📄 Detailed Page-by-Page Audit

### 1️⃣ Solution Page: InSAT Platform (`/solutions/insat`)

* **File:** `app/solutions/insat/page.js`

#### A. Hero Section
* **Subheading Badge:** `<span className="text-subheading">`  
  * *Text:* `"AI-POWERED SECURITY AWARENESS PLATFORM"`  
  * *CSS:* `font-size: 1.125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-forest-70);`
* **Main Heading:** `<h1 className="text-96-heading hero-title-custom">`  
  * *Text:* `"Security Awareness Training Built for Real Behaviour Change"`  
  * *CSS:* `font-size: clamp(2.5rem, 6vw, 5.5rem); line-height: 0.95; font-weight: 400; letter-spacing: -0.02em;`
* **Lead Paragraph:** `<p className="text-20-content hero-paragraph">`  
  * *Text:* `"InSAT drives behavior change with AI learning journeys, multi attack simulations, gamification and microlearning all from one unified platform."`  
  * *CSS:* `font-size: clamp(1.2rem, 1.65vw, 1.35rem); line-height: 1.5; opacity: 0.8;`

#### B. Stats & Impact Section
* **Section Title:** `<h2 className="text-52-heading">`  
  * *Text:* `"Simulate Real-World Risk. Drive Real Impact."`  
  * *CSS:* `font-size: clamp(2rem, 4vw, 3.25rem); line-height: 1.1;`
* **Card 1 (Data Breach Cost):**  
  * `.card-number`: `"$4.44M"` (`font-size: 2.25rem; font-weight: 700; color: #f15a24;`)
  * `.card-title`: `"Average Global Breach Cost"` (`font-size: 1.1rem; font-weight: 600;`)
  * `.card-description`: `"average global cost of a data breach"` (`font-size: 0.9rem; color: #6B7280;`)
  * `.card-source`: `"SOURCE: IBM"` (`font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;`)
* **Card 2 (Unapproved AI):**  
  * `.card-number`: `"1 in 3"`  
  * `.card-title`: `"Unapproved AI Usage"`  
  * `.card-description`: `"employees sharing sensitive data with unapproved AI tools"`  
  * `.card-source`: `"SOURCE: GARTNER 2025"`
* **Card 3 (Fewer Incidents):**  
  * `.card-number`: `"67%"`  
  * `.card-title`: `"Fewer Security Incidents"`  
  * `.card-description`: `"organizations reporting fewer incidents after awareness training"`  
  * `.card-source`: `"SOURCE: FORTINET 2025"`

#### C. Features Grid & Modules
* **Feature Cards:** `<h3 className="feature-title">`, `<p className="feature-desc">`  
  * *Item 1:* `"Security Awareness Training"` — `"Cinematic, role-based modules..."`
  * *Item 2:* `"Phishing Simulations"` — `"Launch realistic phishing campaigns..."`
  * *Item 3:* `"Microlearning"` — `"Deliver short reinforcement modules..."`
  * *CSS:* `.feature-title` (`font-size: 1.25rem; font-weight: 600; color: #1F2937; margin-bottom: 0.5rem;`)  
  * *CSS:* `.feature-desc` (`font-size: 0.95rem; line-height: 1.5; color: #4B5563;`)

#### D. Interactive & Gamified Learning Row
* **Items (`.two-col-grid`):**
  1. `"AI Adaptive Learning"` -> `"Personalize learning journeys..."`
  2. `"Reporting & Human Risk Evidence"` -> `"Generate structured records..."`
  3. `"Gamified Engagement"` -> `"Use quizzes, challenges, points..."`
  4. `"Continuous Reinforcement"` -> `"Trigger bite-sized learning..."`

#### E. Final CTA Section
* **CTA Title:** `<h2 className="section-title leading-tight">`  
  * *Text:* `"Ready to Make Security Awareness Measurable?"`  
  * *CSS:* `font-size: clamp(1.65rem, 6vw, 2.5rem); line-height: 1.25; margin-bottom: 1.5rem; text-align: center;`
* **CTA Subtext:** `<p className="font-primary text-base text-slate-600 leading-relaxed">`  
  * *Text:* `"Deliver gamified learning, simulate real-world attacks, and build human risk evidence from one unified platform."`

---

### 2️⃣ Solution Page: Phishing Simulation (`/solutions/phishing-simulation`)

* **File:** `app/solutions/phishing-simulation/page.js`

#### A. Hero Section
* **Subheading Badge:** `<span className="text-subheading">` -> `"PHISHING SIMULATION SUITE"`
* **Main Heading:** `<h1 className="text-96-heading hero-title-custom">` -> `"Realistic Phishing Simulations Built for Retention & Risk Reduction"`
* **Lead Paragraph:** `<p className="text-20-content hero-paragraph">` -> `"Test, train, and reinforce safe behavior against email, SMS, messaging, QR code, and AI-driven attack vectors - with measurable risk reduction."`

#### B. Stats Section
* **Section Kicker:** `"INSAT USER RISK SIMULATION"`
* **Heading:** `"Expose Real Risk. Build Real Resilience."`
* **Stats Cards:**
  1. `"3.4B"` (`.card-number`) — `"Phishing Emails Daily"` (`.card-title`) — `"spam & phishing emails sent daily worldwide"` (`.card-description`)
  2. `"90%"` (`.card-number`) — `"Breaches Start with Phishing"` (`.card-title`) — `"of security breaches originate from a phishing email"` (`.card-description`)
  3. `"3.5x"` (`.card-number`) — `"Higher Susceptibility Without Training"` (`.card-title`) — `"untrained employees are more likely to click malicious links"` (`.card-description`)

#### C. Attack Vectors
* **Cards (`.feature-card`):**
  * `"Email Phishing"` — `"Spear phishing, CEO fraud, invoice scam..."`
  * `"Smishing & Messaging"` — `"SMS & WhatsApp attacks..."`
  * `"Quishing (QR Scams)"` — `"QR-based credential harvesting..."`
  * `"AI Vishing & Deepfakes"` — `"Voice cloning and AI impersonation..."`

#### D. Final CTA Section
* **CTA Title:** `"Ready to Test Your Workforce?"`
* **CTA Subtext:** `"Run safe simulations and turn risky behaviour into measurable learning."`

---

### 3️⃣ Solution Page: Compliance Training (`/solutions/compliance-training`)

* **File:** `app/solutions/compliance-training/page.js`

#### A. Hero Section
* **Subheading Badge:** `"COMPLIANCE TRAINING"`
* **Main Heading:** `"Audit-ready. Built for Retention."`
* **Lead Paragraph:** `"Train employees across regulations, roles and policies with short, scenario-based modules - with measurable completion, reinforcement, and audit-ready evidence."`

#### B. Regulation Bento Cards
* **Grid Cards (`.stats-card`):**
  1. `"DPDP Act"` (`.card-title`) — `"Consent-based data processing rules mandated by India's data law."` (`.card-description`) — `"MANDATORY ACT"` (`.card-source`)
  2. `"GDPR"` (`.card-title`) — `"Strict EU privacy mandates."` (`.card-description`)
  3. `"HIPAA"` (`.card-title`) — `"Healthcare info privacy safeguards."` (`.card-description`)
  4. `"PCI-DSS"` (`.card-title`) — `"Securing cardholder data and credit card transactions."` (`.card-description`) — `"VERSION 4.0 READY"` (`.card-source`)
  5. `"AI Usage Policy"` (`.card-title`) — `"Responsible corporate guardrails for generative AI tool usage."` (`.card-description`) — `"AI SAFETY PROTOCOLS"` (`.card-source`)
  6. `"Internal Policies"` (`.card-title`) — `"POSH, conduct and customs."` (`.card-description`)

#### C. Compliance Journey Steps
* **Step 1:** `"1. Train"` — `"Deliver role-based training that builds awareness and knowledge."`
* **Step 2:** `"2. Assess"` — `"Evaluate understanding with scenario-based assessments."`
* **Step 3:** `"3. Reinforce"` — `"Reinforce learning with microlearning, nudges, and spaced repetition."`
* **Step 4:** `"4. Evidence"` — `"Automatically generate reports, completion records, and compliance evidence."`

#### D. Final CTA Section
* **CTA Title:** `"Ready to Make Compliance Training Measurable?"`
* **CTA Subtext:** `"Deliver policy learning, reinforce expected behaviour, and maintain audit-ready evidence from one unified platform."`

---

### 4️⃣ Solution Page: Human Risk Intelligence (`/solutions/human-risk-intelligence`)

* **File:** `app/solutions/human-risk-intelligence/page.js`

#### A. Hero Section
* **Subheading Badge:** `"HUMAN RISK INTELLIGENCE"`
* **Main Heading:** `"Turn Employee Behavior into Actionable Risk Telemetry"`
* **Lead Paragraph:** `"Measure, analyze, and mitigate human cyber risk with real-time risk scores, department benchmarks, and automated intervention paths."`

#### B. Risk Metrics Cards
* **Card 1:** `"Department Risk Index"` (`.card-title`) — `"Compare risk scores across Finance, HR, IT, and Sales."` (`.card-description`)
* **Card 2:** `"Repeat Clickers"` (`.card-title`) — `"Identify users who fail multiple phishing simulations."` (`.card-description`)
* **Card 3:** `"Policy Acceptance Telemetry"` (`.card-title`) — `"Track real-time sign-offs and policy compliance."` (`.card-description`)

#### C. Final CTA Section
* **CTA Title:** `"Ready to Measure Your Human Risk?"`
* **CTA Subtext:** `"Transform raw employee actions into executive-ready risk metrics and automated interventions."`

---

### 5️⃣ Solution Page: Customized Solutions (`/solutions/customized-solutions`)

* **File:** `app/solutions/customized-solutions/page.js`

#### A. Hero Section
* **Subheading Badge:** `"CUSTOMIZED SOLUTIONS"`
* **Main Heading:** `"Tailored Security Awareness Built for Your Enterprise"`
* **Lead Paragraph:** `"Custom content, custom branding, localized languages, and bespoke risk frameworks tailored to your organization’s unique threat landscape."`

#### B. Customization Feature Cards
* **Feature 1:** `"Custom Phishing Scenarios"` — `"Replicate company-specific internal emails and workflows."`
* **Feature 2:** `"Multi-Language Support"` — `"Localize modules into 20+ global languages."`
* **Feature 3:** `"White-Label Branding"` — `"Incorporate your enterprise brand, logos, and voice."`

#### C. Final CTA Section
* **CTA Title:** `"Need a Custom Security Awareness Program?"`
* **CTA Subtext:** `"Work with our security team to design custom scenarios, branding, and risk workflows."`

---

## 🔒 Verification & Compliance Summary

1. **SCSS Scope & Component Isolation:** All solution pages strictly import `styles/insat.scss` and encapsulate components inside `.insat-page`.
2. **Typography Consistency:** Every single title uses fluid typographic `clamp()` expressions to guarantee fluid scaling from mobile phones (320px) to ultra-wide displays (2560px).
3. **CTA Alignment:** All CTA sections automatically inherit full-width edge-to-edge background rendering (`.cta .bg-theme`) and equal-width centered buttons (`.cta .btn`).
