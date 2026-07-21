// Maturity Benchmarks Page - Trigger deployment build
import SeoMeta from "../../layouts/partials/SeoMeta";
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
      <SeoMeta title="Security Awareness Maturity Benchmarks | Innvikta" description="Compare phishing click rates and reporting rates across industries and geographic regions. Factual benchmark data for security leaders." />
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
                  <h1 className="text-96-heading" style={{ minHeight: "auto", textAlign: "center" }}>
                    Security Awareness <span style={{ color: "#f15a24" }}>Maturity Benchmarks</span>
                  </h1>
                  
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
                Industry <span style={{ color: "#f15a24" }}>Phishing Benchmarks</span>
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
                Regional <span style={{ color: "#f15a24" }}>Awareness Benchmarks</span>
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
                      <strong>Ignoring Sample Sizes:</strong> Small division results shouldn&apos;t be compared directly to high-volume statistical averages.
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
                  <Link href="/book-demo" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
                    Still have questions? Contact us
                    </Link>
                </div>
              </div>

              {/* Right Column: FAQ Accordion 2-column (5 + 5) */}
              <div className="faq-list-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  <div>
                    <FaqAccordion faqs={faqData.slice(0, 5)} />
                  </div>
                  <div>
                    <FaqAccordion faqs={faqData.slice(5, 10)} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}