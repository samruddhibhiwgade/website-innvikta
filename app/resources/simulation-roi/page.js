"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiInfo, FiHelpCircle, FiChevronDown, FiChevronUp, FiDollarSign, FiUsers, FiTrendingDown, FiShield, FiPercent, FiClock, FiActivity, FiCheckCircle } from "react-icons/fi";
import "../../../styles/insat.scss";
import FreeTierCta from "@layouts/partials/FreeTierCta";

// Industry breach cost database
const INDUSTRY_COSTS = {
  "Healthcare": 10900000,
  "Financial Services": 5900000,
  "Manufacturing": 5600000,
  "Technology & SaaS": 4900000,
  "Retail & E-Commerce": 4400000,
  "Education": 4000000,
  "Government": 4500000,
  "Professional Services": 4700000,
  "Other": 4400000
};

export default function SimulationRoiPage() {
  // Input states
  const [industry, setIndustry] = useState("Technology & SaaS");
  const [employees, setEmployees] = useState(2000);
  const [monthlyAttempts, setMonthlyAttempts] = useState(5);
  const [currentClickRate, setCurrentClickRate] = useState(18);
  const [breachRate, setBreachRate] = useState(5);
  const [remediationFtes, setRemediationFtes] = useState(2);
  const [hoursPerIncident, setHoursPerIncident] = useState(4);
  const [hourlyCost, setHourlyCost] = useState(60);
  const [productivityHoursLost, setProductivityHoursLost] = useState(4);
  const [projectedClickRate, setProjectedClickRate] = useState(8);
  const [packageType, setPackageType] = useState("Lite");

  // Active FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Tooltip hover states
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Ref for scrolling
  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const ctaRef = useRef(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculations
  const industryBreachCost = INDUSTRY_COSTS[industry] || INDUSTRY_COSTS["Other"];
  
  const annualAttempts = employees * monthlyAttempts * 12;
  
  const currentIncidents = Math.round(annualAttempts * (currentClickRate / 100) * (breachRate / 100));
  const futureIncidents = Math.round(annualAttempts * (projectedClickRate / 100) * (breachRate / 100));
  
  const remediationCostPerIncident = remediationFtes > 0 ? (hoursPerIncident * hourlyCost) / remediationFtes : 0;
  const currentRemediation = currentIncidents * remediationCostPerIncident;
  const futureRemediation = futureIncidents * remediationCostPerIncident;
  
  const averageEmployeeHourlyRate = 50000 / 2080;
  const productivityLossPerIncident = productivityHoursLost * averageEmployeeHourlyRate;
  const currentProductivity = currentIncidents * productivityLossPerIncident;
  const futureProductivity = futureIncidents * productivityLossPerIncident;
  
  const industryBreachExposure = industryBreachCost * (currentClickRate / 100);
  const futureExposure = industryBreachCost * (projectedClickRate / 100);
  
  const currentAnnualCost = currentRemediation + currentProductivity;
  const projectedAnnualCost = futureRemediation + futureProductivity;
  
  const annualSavings = Math.max(0, currentAnnualCost - projectedAnnualCost);
  
  // Calculate price based on package
  const packagePrice = packageType === "Risk Mitigation" ? 18.0 : packageType === "Enterprise" ? 24.0 : 13.2;
  const innviktaCost = employees * packagePrice;
  
  const roi = innviktaCost > 0 ? Math.round((annualSavings / innviktaCost) * 100) : 0;
  const reductionPercentage = currentIncidents > 0 ? Math.round(((currentIncidents - futureIncidents) / currentIncidents) * 100) : 0;

  // Format currency helpers
  const formatCurrency = (val) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const ctaData = {
    label: "FREE FOR UP TO 50 USERS",
    title: "Start Free. No Credit Card. No Catch.",
    description: "Get access to AI-powered security awareness training, phishing templates, gamified learning, and human risk reporting — free for teams up to 50 users.",
    features: [
      "Security awareness modules",
      "Phishing email templates",
      "Gamified learning experiences",
      "Play-driven security games",
      "Basic human risk reports",
      "Employee engagement tracking",
      "Security quizzes & challenges",
      "Leaderboards & achievements",
      "Admin dashboard access",
      "Easy Deployment"
    ],
    form: {
      title: "Start Your Free InSAT Workspace",
      subtitle: "Setup takes less than 2 minutes.",
      button_label: "Submit",
      micro_trust: "No credit card required • Free for up to 50 users • Cancel anytime",
      trust_row: "SOC2 Ready • ISO 27001 Aligned • GDPR Friendly"
    }
  };

  const tooltips = {
    industry: "Industry type dictates the average cost of a data breach based on global cybersecurity benchmarks.",
    employees: "Total number of organization personnel who actively use corporate email addresses.",
    monthlyAttempts: "Average volume of social engineering / phishing email variants targeting an individual user every month.",
    currentClickRate: "Your organization's baseline susceptibility rate before receiving structured security training.",
    breachRate: "Estimated fraction of clicked phishing emails that successfully bypass firewalls to require response actions.",
    remediationFtes: "Quantity of IT Security administrators assigned to quarantine, investigate, and remediate threat alerts.",
    hoursPerIncident: "Total hours consumed collectively by your staff to investigate, audit, and patch a successful compromise.",
    hourlyCost: "Loaded average salary rate of information safety personnel conducting system remediation.",
    productivityHoursLost: "Standard operational downtime incurred by employees locked out of workstations during security events.",
    projectedClickRate: "Target resilience rate achieved by Innvikta's continuous, automated simulation programs."
  };

  const faqs = [
    {
      q: "What is a Security Awareness ROI Calculator?",
      a: "A Security Awareness ROI Calculator is an enterprise-grade financial modeling tool designed to help security leaders and CISOs quantify the economic value of implementing cybersecurity awareness training and phishing simulations. By looking at metrics like user susceptibility click rates, remediation overheads, employee productivity loss, and average industry breach exposure, the calculator projects the direct cost savings and Return on Investment (ROI) your business stands to gain. It shifts security conversation from a cost center to a clear investment with measurable business outcomes."
    },
    {
      q: "How is phishing risk estimated?",
      a: "Phishing risk is estimated by combining simulated attack performance statistics with real-world financial exposure models. The baseline calculator calculates total annual phishing attempts by multiplying your email-enabled employee headcount by average monthly attacks. It then applies your baseline phishing click rate and successful breach rate to estimate your current annual cybersecurity incidents. This calculates direct operational overheads alongside potential industry breach benchmarks, offering a comprehensive view of overall phishing susceptibility exposure."
    },
    {
      q: "What factors affect security awareness ROI?",
      a: "Several factors affect security awareness training ROI, including baseline click rates, the quality and frequency of mock campaigns, remediation costs, and industry classification. A primary factor is baseline click rate reduction: dropping from a standard 18% susceptibility rate to under 8% (or even 2-3% in mature programs) significantly decreases system breaches. Additionally, faster response times, reduced analyst workload, lower employee downtime, and mitigating multi-million dollar data breaches drastically enhance the overall ROI calculation."
    },
    {
      q: "Why does phishing susceptibility matter?",
      a: "Phishing susceptibility is a leading indicator of organizational human risk. Because over 90% of successful corporate breaches initiate via email social engineering, having a highly susceptible workforce dramatically increases the likelihood of ransomware, credential theft, and compliance penalties. Lowering this susceptibility rate creates a robust human firewall, ensuring that employees act as active detectors rather than entry points for advanced threat actors."
    },
    {
      q: "How do phishing simulations improve ROI?",
      a: "Phishing simulations improve ROI by providing hands-on, realistic learning experiences that train employees to recognize actual attack vectors. By exposing staff to benign replicas of smishing, credential harvesting, and attachment attacks, they build threat identification reflexes. Over time, these simulations reduce click rates, increase user reporting rates, lower remediation tasks for security teams, and yield defensible compliance evidence for auditing frameworks."
    },
    {
      q: "How are remediation costs calculated?",
      a: "Remediation costs are calculated by multiplying the estimated annual incidents by the personnel resources required to resolve each issue. This incorporates the number of security analysts involved, the hours spent investigating and containing the incident, and their average hourly labor rate. By reducing successful incidents through security awareness, you directly minimize analyst fatigue and reclaim technical hours for high-priority security engineering tasks."
    },
    {
      q: "How is productivity loss estimated?",
      a: "Productivity loss estimates the hidden operational cost of employee downtime during security breaches. When a workstation is compromised, infected with malware, or locked for credential audits, the affected employee cannot perform standard duties. We calculate this loss by multiplying successful incidents by productivity hours lost and the employee's average loaded hourly wage. Minimizing incident volume directly preserves operational continuity."
    },
    {
      q: "Why are industry breach costs different?",
      a: "Industry breach costs vary significantly due to regulatory frameworks, class of data processed, and target profile value. For instance, healthcare organizations suffer the highest average cost of a data breach (exceeding $10.9M) due to strict HIPAA enforcement and sensitive medical record exposure. Financial services follow closely due to direct asset accessibility and heavy auditing penalties. Our calculator utilizes official industry cost databases to ensure credible, tailored risk projections."
    },
    {
      q: "How can organizations reduce phishing incidents?",
      a: "Organizations can reduce phishing incidents by combining adaptive training paths with automated simulations and direct reporting tools. Deploying dynamic difficulty campaigns ensures that susceptible users receive targeted refresher modules, while advanced users face harder tests. Integrating simple email report buttons allows users to flag suspicious messages instantly, turning your workforce into a collaborative, real-time threat detection system."
    },
    {
      q: "What is considered a good phishing click rate?",
      a: "While a typical untrained organization displays an initial phishing click rate between 15% and 30%, a successful security awareness program aims to drive this below 5%. Elite organizations with continuous, customized simulations frequently achieve click rates under 2%. The primary objective is to maintain a low susceptibility score alongside a high user reporting rate to minimize breach probability."
    },
    {
      q: "How often should phishing simulations be run?",
      a: "Phishing simulations should be run at least once a month to ensure consistent behavioral reinforcement. Infrequent testing leads to rapid skill decay, leaving organizations vulnerable to evolving social engineering tactics. Continuous, automated mini-campaigns distributed throughout the month keep security top-of-mind without causing campaign fatigue or IT department overload."
    },
    {
      q: "How does security awareness training improve business outcomes?",
      a: "Security awareness training improves business outcomes by protecting revenue, satisfying compliance audits, and fostering a strong security culture. Beyond saving millions in breach cleanups, automated training provides verifiable logs needed for frameworks like SOC 2, ISO 27001, and GDPR. It reduces human error risks, builds brand reputation, and empowers employees to protect business operations."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security Awareness ROI Calculator - Innvikta",
            "description": "Estimate the financial impact of reducing phishing risk, remediation effort, and productivity losses through security awareness training.",
            "url": "https://innvikta.com/resources/simulation-roi"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          {/* HERO SECTION */}
          <div className="hero-section" style={{ paddingTop: "3rem", paddingBottom: "1.5rem" }}>
            <div className="hero-outer-wrapper">
              
              <div className="hero-bg-decor" aria-hidden="true">

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
              </div>

              <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
                  <div className="hero-content" style={{ paddingTop: "1rem", paddingBottom: "2rem", textAlign: "center", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto", textAlign: "center" }}>Free Cybersecurity Tools</span>
                    <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                      Security Awareness <span className="text-primary">ROI Calculator</span>
                    </h1>
                    <p className="text-20-content hero-paragraph text-balance" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
                      Calculating the true ROI of a phishing training solution isn&apos;t an exact science. While it&apos;s nearly impossible to put a price tag on the devastating indirect costs of a breach, such as severe brand damage, stolen intellectual property, and lost customer trust, the direct financial impacts are measurable. Use this tool to estimate the tangible costs of remediation and downtime, and see how proactive training protects your bottom line.
                    </p>



                    <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={scrollToCalculator} className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Calculate ROI
                      </button>
                      <button onClick={scrollToCta} className="btn btn-secondary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Start Free
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        {/* CALCULATOR & RESULTS SECTION */}
        <div ref={calculatorRef} style={{ backgroundColor: "#fafafa", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container">
            <div className="row justify-center">
              <div className="col-12 lg:col-8" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h2 className="text-40-heading" style={{ textAlign: "center", marginBottom: "1.25rem" }}>Calculate Your ROI Potential</h2>
                <p style={{ fontSize: "1.125rem", color: "#64748b", maxWidth: "42rem", margin: "0 auto", textAlign: "center", lineHeight: "1.75" }}>Adjust the operational parameters below to model simulated risk mitigation benefits tailored for your infrastructure.</p>
              </div>
            </div>
            
            <div className="row justify-center">
              {/* INPUTS COLUMN */}
              <div className="col-12 lg:col-8">
                <div className="relative w-full bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] !p-8 md:!p-10 text-left">
                  <h3 className="text-xl font-bold text-slate-950 mb-8 border-b border-slate-100 pb-4 text-left">Organization Profile & Parameters</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                    {/* Innvikta Package Selector (Full Width) */}
                    <div className="relative md:col-span-2 text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="package-type-select">Innvikta Subscription Package</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("packageType")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Package Type Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "packageType" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            Select the Innvikta package to calculate pricing and ROI. Lite is $13.20/employee/year, Risk Mitigation is $18.00/employee/year.
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <select 
                          id="package-type-select"
                          value={packageType}
                          onChange={(e) => setPackageType(e.target.value)}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all appearance-none cursor-pointer font-medium"
                        >
                          <option value="Lite">Lite Package ($13.20 per employee/year)</option>
                          <option value="Risk Mitigation">Risk Mitigation Package ($18.00 per employee/year)</option>
                          <option value="Enterprise">Enterprise Package (Custom pricing)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-400">
                          <FiChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Employees Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="employees-input">Employees With Email Access</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("employees")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Employees Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "employees" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.employees}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="employees-input"
                          type="number"
                          min="50"
                          max="100000"
                          value={employees}
                          onChange={(e) => setEmployees(Math.max(50, Math.min(100000, parseInt(e.target.value) || 50)))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Range: 50 – 100,000</p>
                    </div>

                    {/* Monthly Phishing Attempts Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="monthly-attempts-input">Monthly Phishing Attacks Per Employee</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("monthlyAttempts")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Attempts Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "monthlyAttempts" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.monthlyAttempts}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="monthly-attempts-input"
                          type="number"
                          min="1"
                          max="20"
                          value={monthlyAttempts}
                          onChange={(e) => setMonthlyAttempts(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Range: 1 – 20</p>
                    </div>

                    {/* Employees Involved In Remediation Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="remediation-ftes-input">Employees in Remediation (FTEs)</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("remediationFtes")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Remediation FTEs Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "remediationFtes" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.remediationFtes}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="remediation-ftes-input"
                          type="number"
                          min="1"
                          max="20"
                          value={remediationFtes}
                          onChange={(e) => setRemediationFtes(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Range: 1 – 20</p>
                    </div>

                    {/* Hours Required Per Incident Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="hours-per-incident-input">Hours per FTE to Remediate One Incident</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("hoursPerIncident")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Hours Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "hoursPerIncident" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.hoursPerIncident}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="hours-per-incident-input"
                          type="number"
                          min="1"
                          max="20"
                          value={hoursPerIncident}
                          onChange={(e) => setHoursPerIncident(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Range: 1 – 20</p>
                    </div>

                    {/* Hourly Cost Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="hourly-cost-input">Average Employee Hourly Cost ($)</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("hourlyCost")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Hourly Cost Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "hourlyCost" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.hourlyCost}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="hourly-cost-input"
                          type="number"
                          min="1"
                          value={hourlyCost}
                          onChange={(e) => setHourlyCost(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Hourly loaded wage of employees involved.</p>
                    </div>

                    {/* Productivity Hours Lost Input */}
                    <div className="relative text-left">
                      <div className="flex items-center justify-between mb-2 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="productivity-hours-lost-input">Hours Lost per Breached Employee</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("productivityHoursLost")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Downtime Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        {activeTooltip === "productivityHoursLost" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.productivityHoursLost}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input 
                          id="productivity-hours-lost-input"
                          type="number"
                          min="1"
                          max="20"
                          value={productivityHoursLost}
                          onChange={(e) => setProductivityHoursLost(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                          className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Range: 1 – 20</p>
                    </div>

                    {/* Current Phishing Penetration Rate Slider */}
                    <div className="relative md:col-span-2 mt-4 pt-6 border-t border-slate-100 text-left">
                      <div className="flex items-center justify-between mb-3 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="current-click-rate-slider">Current Phishing Penetration Rate (%)</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("currentClickRate")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Click Rate Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{currentClickRate}%</span>
                        {activeTooltip === "currentClickRate" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.currentClickRate}
                          </div>
                        )}
                      </div>
                      <input 
                        id="current-click-rate-slider"
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={currentClickRate}
                        onChange={(e) => setCurrentClickRate(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#f15a24]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                        <span>1%</span>
                        <span>40%</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Percentage of phishing emails successfully fooling employees.</p>
                    </div>

                    {/* Breach Conversion Rate Slider */}
                    <div className="relative md:col-span-2 text-left">
                      <div className="flex items-center justify-between mb-3 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="breach-rate-slider">Breach Conversion Rate (%)</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("breachRate")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Breach Rate Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{breachRate}%</span>
                        {activeTooltip === "breachRate" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.breachRate}
                          </div>
                        )}
                      </div>
                      <input 
                        id="breach-rate-slider"
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={breachRate}
                        onChange={(e) => setBreachRate(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#f15a24]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                        <span>1%</span>
                        <span>20%</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Percentage of successful phishing clicks that become incidents.</p>
                    </div>

                    {/* Projected Phishing Penetration Rate Slider */}
                    <div className="relative md:col-span-2 text-left">
                      <div className="flex items-center justify-between mb-3 w-full">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <label htmlFor="projected-click-rate-slider">Projected Phishing Penetration Rate (%)</label>
                          <button 
                            type="button"
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            onMouseEnter={() => setActiveTooltip("projectedClickRate")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            aria-label="Target Click Rate Info"
                          >
                            <FiInfo className="text-xs" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{projectedClickRate}%</span>
                        {activeTooltip === "projectedClickRate" && (
                          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                            {tooltips.projectedClickRate}
                          </div>
                        )}
                      </div>
                      <input 
                        id="projected-click-rate-slider"
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={projectedClickRate}
                        onChange={(e) => setProjectedClickRate(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#f15a24]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                        <span>1%</span>
                        <span>40%</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400 text-left">Susceptibility target after training programs.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* RESULTS PANEL COLUMN */}
              <div className="col-12 lg:col-8" style={{ marginTop: "2rem" }}>
              <main className="summary-card rounded-2xl !p-8 md:!p-12 pb-12 text-left" style={{ backgroundColor: "#ffffff", isolation: "isolate", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)", border: "1px solid #f1f5f9" }} data-purpose="main-dashboard-container">
                {/* BEGIN: HeaderSection */}
                <header style={{ marginBottom: "1.75rem" }}>
                  <h2 className="text-3xl font-extrabold text-slate-950" style={{ marginBottom: "0.35rem" }}>Executive ROI Summary</h2>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Financial impact analysis for security awareness training and phishing simulations.</p>
                </header>
                {/* END: HeaderSection */}

                {/* BEGIN: NarrativeSummary */}
                <div style={{ marginBottom: "2rem" }} data-purpose="narrative-text">
                  <p className="text-slate-800 leading-relaxed text-[16px]" style={{ lineHeight: "1.8" }}>
                    Based on your current phishing exposure, phishing-related remediation effort and productivity loss may be costing your organization approximately <strong className="font-bold text-slate-950">{formatCurrency(currentAnnualCost)}</strong> annually. Reducing phishing penetration from <strong className="font-bold text-slate-950">{currentClickRate}%</strong> to <strong className="font-bold text-slate-950">{projectedClickRate}%</strong> could lower annual operational costs to approximately <strong className="font-bold text-slate-950">{formatCurrency(projectedAnnualCost)}</strong>. This represents a potential annual savings of <strong className="font-extrabold text-[#f15a24]">{formatCurrency(annualSavings)}</strong> and an estimated ROI of <strong className="font-bold text-slate-950">{roi}%</strong>.
                  </p>
                </div>
                {/* END: NarrativeSummary */}

                {/* BEGIN: PrimaryMetrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" style={{ marginBottom: "2.5rem" }} data-purpose="top-metrics-grid">
                  <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Current Annual Cost</span>
                    <span className="text-2xl font-extrabold text-slate-950">{formatCurrency(currentAnnualCost)}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Projected Annual Cost</span>
                    <span className="text-2xl font-extrabold text-slate-950">{formatCurrency(projectedAnnualCost)}</span>
                  </div>
                  <div className="bg-orange-50/40 border border-orange-100 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                    <span className="block text-[10px] font-bold text-[#f15a24] uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Annual Savings</span>
                    <span className="text-2xl font-extrabold text-[#f15a24]">{formatCurrency(annualSavings)}</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Estimated ROI</span>
                    <span className="text-2xl font-extrabold text-slate-950">{roi}%</span>
                  </div>
                </div>
                {/* END: PrimaryMetrics */}

                {/* BEGIN: StateComparisonTable */}
                <div className="overflow-x-auto" style={{ marginBottom: "2.5rem" }} data-purpose="comparison-table-section">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest" style={{ marginBottom: "1rem" }}>State Comparison</h3>
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-3 font-semibold text-xs text-slate-500 uppercase tracking-wider">Metric</th>
                        <th className="pb-3 font-semibold text-xs text-slate-500 uppercase tracking-wider">Current State</th>
                        <th className="pb-3 font-semibold text-xs text-[#f15a24] uppercase tracking-wider">Future State</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-800">
                      <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 text-slate-700">Phishing Penetration Rate</td>
                        <td className="py-3 font-bold text-slate-900">{currentClickRate}%</td>
                        <td className="py-3 font-bold text-[#f15a24]">{projectedClickRate}%</td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 text-slate-700">Annual Breaches</td>
                        <td className="py-3 font-bold text-slate-900">{currentIncidents}</td>
                        <td className="py-3 font-bold text-[#f15a24]">{futureIncidents}</td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 text-slate-700">Remediation Cost</td>
                        <td className="py-3 font-bold text-slate-900">{formatCurrency(currentRemediation)}</td>
                        <td className="py-3 font-bold text-[#f15a24]">{formatCurrency(futureRemediation)}</td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 text-slate-700">Productivity Loss</td>
                        <td className="py-3 font-bold text-slate-900">{formatCurrency(currentProductivity)}</td>
                        <td className="py-3 font-bold text-[#f15a24]">{formatCurrency(futureProductivity)}</td>
                      </tr>
                      <tr className="font-bold text-slate-900 bg-slate-50/70">
                        <td className="py-3 px-3">Total Annual Cost</td>
                        <td className="py-3 px-3 font-extrabold text-slate-950">{formatCurrency(currentAnnualCost)}</td>
                        <td className="py-3 px-3 font-extrabold text-[#f15a24]">{formatCurrency(projectedAnnualCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* END: StateComparisonTable */}

                {/* BEGIN: SavingsBreakdown */}
                <div style={{ marginBottom: "2.5rem" }} data-purpose="savings-breakdown-section">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest" style={{ marginBottom: "1rem" }}>Savings Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50/50 border border-orange-100/50 rounded-xl transition-all hover:shadow-sm" style={{ padding: "1.25rem 1.5rem" }}>
                      <span className="block text-[10px] font-bold text-[#f15a24] uppercase tracking-wider" style={{ marginBottom: "0.4rem" }}>Remediation Savings</span>
                      <span className="text-2xl font-extrabold text-[#f15a24]">{formatCurrency(currentRemediation - futureRemediation)}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl transition-all hover:shadow-sm" style={{ padding: "1.25rem 1.5rem" }}>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.4rem" }}>Productivity Savings</span>
                      <span className="text-2xl font-extrabold text-slate-950">{formatCurrency(currentProductivity - futureProductivity)}</span>
                    </div>
                  </div>
                </div>
                {/* END: SavingsBreakdown */}

                {/* BEGIN: RecommendationSection */}
                <div style={{ marginBottom: "2.5rem" }} data-purpose="package-recommendation">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest" style={{ marginBottom: "1rem" }}>Package Recommendation</h3>
                  <div className="bg-slate-50/80 rounded-xl border border-slate-200/50" style={{ padding: "1.5rem 1.75rem" }}>
                    <h4 className="text-base font-bold text-slate-900" style={{ marginBottom: "0.5rem" }}>Recommended Package: <span className="text-[#f15a24]">{packageType} Package</span></h4>
                    <p className="text-[14px] leading-relaxed" style={{ color: "#475569", lineHeight: "1.75" }}>
                      {packageType === "Risk Mitigation" 
                        ? "An advanced security awareness package designed to reduce susceptibility click rates and build human firewalls."
                        : packageType === "Enterprise"
                        ? "Fully customized training program with dedicated risk analyst, custom LMS integrations, and enterprise-grade reporting."
                        : "A standard training regime helps maintain security baseline compliance for organizations with moderate risk profiles."}
                    </p>
                  </div>
                </div>
                {/* END: RecommendationSection */}

                {/* BEGIN: KeyInsights */}
                <div style={{ marginBottom: "3rem" }} data-purpose="insights-list">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest" style={{ marginBottom: "1rem" }}>Key Insights</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <li className="flex items-start text-sm" style={{ color: "#334155" }}>
                      <span className="h-2 w-2 rounded-full bg-[#f15a24] flex-shrink-0" style={{ marginTop: "0.375rem", marginRight: "0.75rem" }}></span>
                      Phishing susceptibility directly drives operational cost.
                    </li>
                    <li className="flex items-start text-sm" style={{ color: "#334155" }}>
                      <span className="h-2 w-2 rounded-full bg-[#f15a24] flex-shrink-0" style={{ marginTop: "0.375rem", marginRight: "0.75rem" }}></span>
                      Reducing successful attacks lowers remediation effort.
                    </li>
                    <li className="flex items-start text-sm" style={{ color: "#334155" }}>
                      <span className="h-2 w-2 rounded-full bg-[#f15a24] flex-shrink-0" style={{ marginTop: "0.375rem", marginRight: "0.75rem" }}></span>
                      Productivity gains are a major contributor to savings.
                    </li>
                    <li className="flex items-start text-sm" style={{ color: "#334155" }}>
                      <span className="h-2 w-2 rounded-full bg-[#f15a24] flex-shrink-0" style={{ marginTop: "0.375rem", marginRight: "0.75rem" }}></span>
                      The Innvikta subscription cost is explicitly included as the investment in ROI calculations.
                    </li>
                  </ul>
                </div>
                {/* END: KeyInsights */}

                {/* BEGIN: ActionButtons */}
                <footer className="flex flex-col sm:flex-row justify-end items-center gap-3" style={{ marginTop: "2rem" }} data-purpose="footer-actions">
                  <Link
                    href="/book-demo"
                    style={{
                      display: "inline-block",
                      padding: "0.75rem 2rem",
                      border: "2px solid #f15a24",
                      color: "#f15a24",
                      backgroundColor: "#ffffff",
                      borderRadius: "0.5rem",
                      fontWeight: "700",
                      fontSize: "0.875rem",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    Book a Demo
                  </Link>
                  <button
                    onClick={scrollToCta}
                    style={{
                      padding: "0.75rem 2rem",
                      backgroundColor: "#f15a24",
                      color: "#ffffff",
                      borderRadius: "0.5rem",
                      fontWeight: "700",
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(241,90,36,0.35)",
                    }}
                  >
                    Start Free
                  </button>
                </footer>
                {/* END: ActionButtons */}
              </main>
            </div>
          </div>
        </div>
        </div>

        {/* FAQ SECTION */}
        <div style={{ backgroundColor: "#FFF6E9", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container faq-grid">
            <div className="faq-title-col">
              <span className="inline-block px-3 py-1.5 mb-4 text-xs font-bold tracking-widest text-[#f15a24] bg-[#f15a24]/10 rounded-full uppercase">
                Frequently Asked Questions
              </span>
              <h2 className="text-40-heading">Security Awareness ROI FAQ</h2>
              <p className="text-slate-500 mt-3">Authoritative insights and direct answers concerning workforce training returns.</p>
              <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.25rem" }}>
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>Learn more</span>
              </a>
            </div>

            <div className="faq-list-col">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                    <button type="button" className="faq-trigger w-full" aria-expanded={isOpen} onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                      <span className="faq-question">{faq.q}</span>
                      <div className="faq-icon-wrapper">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                          <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                        </svg>
                      </div>
                    </button>
                    <div className="faq-panel" style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, transition: "all 0.3s ease", overflow: "hidden" }}>
                      <div className="faq-panel-inner">
                        <div className="faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* START FREE CTA SECTION */}
      <div ref={ctaRef}>
        <FreeTierCta data={ctaData} />
      </div>
    </>
  );
}
