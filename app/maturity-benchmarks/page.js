import React from "react";
import Link from "next/link";
import IndustryBenchmarkChart from "./components/IndustryBenchmarkChart";
import RegionalBenchmarkMap from "./components/RegionalBenchmarkMap";
import FaqAccordion from "./components/FaqAccordion";
import "../../styles/insat.scss";

export const metadata = {
  title: "Security Awareness Maturity Benchmarks | Innvikta",
  description: "Compare phishing click rates and reporting rates across industries and geographic regions. Factual benchmark data for security leaders.",
  openGraph: {
    title: "Security Awareness Maturity Benchmarks | Innvikta",
    description: "Compare regional click rates and reporting rates against industry peers to optimize your security awareness training programs.",
    type: "website",
    url: "https://innvikta.com/maturity-benchmarks",
  }
};

const faqData = [
  {
    question: "What is a phishing benchmark?",
    answer: "A phishing benchmark is a standardized performance metric compiled from simulated phishing campaigns across thousands of organizations. It allows security leaders to compare their workforce's phishing click susceptibility and active reporting behaviors against industry averages and geographical peers."
  },
  {
    question: "What is a phishing click rate?",
    answer: "The phishing click rate represents the percentage of employees who click on a simulated phishing link during a campaign. It is calculated by dividing the total number of unique clicks on a simulated phishing link by the total number of emails delivered, multiplied by 100."
  },
  {
    question: "What is a phishing report rate?",
    answer: "The phishing report rate is the percentage of employees who actively report a simulated phishing email using an email reporting tool. It is calculated by dividing the total number of unique reports by the total number of emails delivered, multiplied by 100. This is a critical indicator of positive security culture."
  },
  {
    question: "What is considered a good phishing click rate?",
    answer: "A phishing click rate below 3.0% is generally considered strong across most industries. Top-performing organizations that run high-frequency, adaptive simulations can drive click susceptibility down to under 1.5%."
  },
  {
    question: "What is considered a good phishing report rate?",
    answer: "A good phishing report rate is typically 70.0% or higher. A high report rate indicates a mature security culture where employees serve as active sensors for social engineering threats."
  },
  {
    question: "Why should organizations compare against industry benchmarks?",
    answer: "Different sectors face varying levels of threats and regulatory constraints. Comparing against industry peers helps set realistic security awareness targets, account for workforce profiles, and justify security budget allocations."
  },
  {
    question: "Why should organizations compare against regional benchmarks?",
    answer: "Geographical locations have unique threat landscapes, language-based vectors, and cultural nuances regarding reporting. Regional benchmarking ensures compliance alignment and respects local workforce behavior patterns."
  },
  {
    question: "How often should benchmark data be reviewed?",
    answer: "Organizations should review benchmark data quarterly. This frequency allows security teams to adjust campaign templates, target high-risk groups, and evaluate the progress of their training program against historical baselines."
  },
  {
    question: "How can benchmark data improve security awareness programs?",
    answer: "Benchmark data exposes susceptibility gaps, highlighting which departments or roles need additional reinforcement training. It also validates the return on investment (ROI) of security training to stakeholders."
  },
  {
    question: "Which metric is more important: click rate or report rate?",
    answer: "Both metrics are vital, but report rate is increasingly viewed as a key indicator of defensive maturity. While a low click rate shows caution, a high report rate demonstrates active defense and community resilience."
  }
];

export default function MaturityBenchmarksPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Global Phishing & Security Awareness Benchmarks 2026",
    "description": "Benchmark statistics for security click rates and reporting rates across different industries and geographic regions.",
    "publisher": {
      "@type": "Organization",
      "name": "Innvikta"
    },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "spatialCoverage": "Global",
    "temporalCoverage": "2025-01-01/2026-06-01"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://innvikta.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Maturity Benchmarks",
        "item": "https://innvikta.com/maturity-benchmarks"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        
        {/* HERO SECTION */}
        <div className="insat-page">
          <section className="hero-section">
            <div className="hero-outer-wrapper">
              
              {/* Background SVG Decor */}
              <div className="hero-bg-decor" aria-hidden="true">
                <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  
                  <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  
                  <circle cx="78" cy="198" r="5" fill="#FF7A00" />
                  <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
                  <circle cx="158" cy="308" r="4" fill="#FF7A00" />
                  <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
                  <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
                  <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
                  <circle cx="268" cy="338" r="4" fill="#FF7A00" />
                  <circle cx="188" cy="238" r="4" fill="#FF7A00" />
                  <circle cx="398" cy="78" r="5" fill="#FF7A00" />
                  <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
                  <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
                  <circle cx="488" cy="128" r="4" fill="#FF7A00" />
                  <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
                  <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
                  <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
                  <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
                  <circle cx="648" cy="110" r="4" fill="#FF7A00" />
                  <circle cx="638" cy="278" r="4" fill="#FF7A00" />
                  
                  <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>

                <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
                  <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
                  <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
                  <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                  <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                </svg>
              </div>

              <div className="hero-backdrop-wrapper">
                <div className="backdrop-shape shape-1">
                  <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
                    <defs>
                      <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                        <stop offset="0.31" stopColor="#FF7A00" />
                        <stop offset="0.59" stopColor="#F59E0B" />
                        <stop offset="0.78" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="backdrop-shape shape-2">
                  <div className="shape-2-inner-1">
                    <svg width="100%" height="100%" viewBox="0 0 537 517" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M243.007 443.747L0.726096 516.282L295.51 69.4185L536.066 0.564209L243.007 443.747Z" fill="url(#paint0_linear_hero_2)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_2" x1="626.513" y1="479.564" x2="320.001" y2="-98.1139" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-2">
                    <svg width="100%" height="100%" viewBox="0 0 426 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M241.39 507.775L0.180044 612.19L185.387 100.986L425.875 0.00805664L241.39 507.775Z" fill="url(#paint0_linear_hero_3)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_3" x1="426.129" y1="607.122" x2="-243.854" y2="-82.0361" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-3">
                    <svg width="100%" height="100%" viewBox="0 0 313 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M259.325 543.891L0.873635 683.366L54.1947 136.437L312.926 0.0959473L259.325 543.891Z" fill="url(#paint0_linear_hero_4)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_4" x1="541.623" y1="465.932" x2="-672.11" y2="-514.628" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-4">
                    <svg width="100%" height="100%" viewBox="0 0 272 715" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M271.797 551.346L36.791 714.998L0.988926 160.822L236.664 0.241187L271.797 551.346Z" fill="#FF7A00" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="container" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div className="hero-content mx-auto" style={{ paddingBottom: "3rem", paddingTop: "2.5rem", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <span className="text-subheading" style={{ color: "#FF7A00" }}>Benchmark Intelligence Resource</span>
                  <h1 className="text-96-heading" style={{ minHeight: "auto", textAlign: "center" }}>Maturity Benchmarks</h1>
                  
                  <div className="hero-text-wrapper" style={{ maxWidth: "720px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p className="text-20-content hero-paragraph text-slate-700" style={{ fontWeight: "500", opacity: 0.95, textAlign: "center", lineHeight: "1.6" }}>
                      Compare regional click rates and phishing reporting rates against industry peers to understand how security awareness performance varies across sectors and geographic regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* OVERVIEW SECTION - Moved detailed text from Hero */}
        <section className="py-12 bg-[#fffaf3] border-b border-[#ffece4]">
          <div className="container max-w-6xl px-4 md:px-8 mx-auto text-center">
            <p className="text-18-content text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ fontSize: "1.15rem" }}>
              Organizations use benchmark data to measure phishing susceptibility, reporting culture, and security awareness effectiveness. Benchmarking helps identify performance gaps, set realistic improvement targets, and compare results against peer organizations.
            </p>
          </div>
        </section>

        {/* SECTION 1: Industry Benchmark Comparison */}
        <section className="py-16 md:py-24 container max-w-[1360px] px-4 md:px-6 mx-auto">
          <div className="insat-page !bg-transparent" style={{ backgroundColor: "transparent" }}>
            <div className="max-w-3xl mb-12 text-left">
              <h2 className="text-52-heading mb-4" style={{ marginBottom: "1.5rem" }}>
                Industry Phishing Benchmarks
              </h2>
              <p className="text-18-content" style={{ marginBottom: "3rem", lineHeight: "1.6" }}>
                Different industries experience different levels of phishing susceptibility due to workforce size, employee exposure, training maturity, regulatory requirements, and threat landscape.
              </p>
            </div>
          </div>

          <IndustryBenchmarkChart />

          {/* Optimized AI Search Featured Snippet Section */}
          <div className="mt-20 text-left border-t border-slate-200/80 pt-16">
            <h4 className="text-32-heading mb-8">What This Means</h4>
            <div className="grid md:grid-cols-2 gap-12 text-[16px] md:text-[18px] text-slate-600 leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-800 text-[20px] md:text-[22px] mb-5">Defining Key Metrics</h5>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      <strong>Phishing Click Rate:</strong> Measures susceptibility. A high click rate indicates that more employees are falling for deceptive links, posing a high risk.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      <strong>Phishing Report Rate:</strong> Measures resilience. A high report rate indicates a healthy security culture where employees actively flag anomalies, helping the security team contain active vectors early.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-[20px] md:text-[22px] mb-5">Performance & Strategy</h5>
                <p className="leading-relaxed mb-4">
                  Industries perform differently based on compliance pressures, simulation frequencies, and threat profiling. High-exposure sectors like Finance achieve lower click rates due to rigorous training constraints, while Retail and Education face high employee turnover and seasonal variations.
                </p>
                <p className="leading-relaxed font-semibold text-slate-700">
                  Benchmarking allows organizations to move from guessing security resilience to data-driven risk management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Regional Benchmark Comparison */}
        <section className="py-16 md:py-24 container max-w-[1360px] px-4 md:px-6 mx-auto">
          <div className="insat-page !bg-transparent" style={{ backgroundColor: "transparent" }}>
            <div className="max-w-3xl mb-12 text-left">
              <h2 className="text-52-heading mb-4" style={{ marginBottom: "1.5rem" }}>
                Regional Awareness Benchmarks
              </h2>
              <p className="text-18-content" style={{ marginBottom: "3rem", lineHeight: "1.6" }}>
                Regional differences can be influenced by cybersecurity maturity, awareness investment, threat exposure, workforce behavior, reporting culture, and local regulations.
              </p>
            </div>
          </div>

          <RegionalBenchmarkMap />

          {/* Regional Insights Block */}
          <div className="mt-20 text-left border-t border-slate-200/80 pt-16">
            <h4 className="text-32-heading mb-8">Regional Benchmark Insights</h4>
            <div className="grid md:grid-cols-2 gap-12 text-[16px] md:text-[18px] text-slate-600 leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-800 text-[20px] md:text-[22px] mb-5">Why Regional Performance Differs</h5>
                <p className="leading-relaxed mb-6">
                  Cybersecurity investment, infrastructure development, and compliance landscapes (e.g., GDPR in Europe, state-level regulations in the US) set different baseline metrics globally. Cultural behavior regarding IT reporting also impacts organizational resilience.
                </p>
                <h5 className="font-bold text-slate-800 text-[20px] md:text-[22px] mb-5">How to Use Regional Benchmarks</h5>
                <p className="leading-relaxed">
                  Multi-national corporations should normalize performance metrics based on regional baselines, avoiding penalizing divisions located in regions where general email click susceptibility averages higher.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-slate-800 text-[20px] md:text-[22px] mb-5">Common Interpretation Mistakes</h5>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>
                      <strong>Ignoring Sample Sizes:</strong> Small division results shouldn't be compared directly to high-volume statistical averages.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>
                      <strong>Focusing Solely on Click Rates:</strong> Overlooking report rate averages can lead to an incomplete picture of team resilience.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>
                      <strong>Assuming Uniform Threat Vectors:</strong> Different countries suffer distinct localized threat vectors (e.g., Smishing, WhatsApp scams, QR phishing).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQ (Design matches solutions pages layout and design exactly) */}
        <section className="bg-[#fffaf3] py-20 md:py-24 text-left border-t border-b border-[#ffece4]">
          <div className="insat-page !bg-transparent" style={{ backgroundColor: "transparent" }}>
            <div className="container faq-grid">
              
              {/* Left Column: Title Block */}
              <div className="faq-title-col">
                <h2 className="text-[32px] md:text-[42px] font-normal text-slate-900 leading-tight mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold text-sm">&gt;</span>
                  <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
                    Still have questions? Contact us
                    </Link>
                </div>
              </div>

              {/* Right Column: FAQ Accordion component */}
              <div className="faq-list-col">
                <FaqAccordion faqs={faqData} />
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
