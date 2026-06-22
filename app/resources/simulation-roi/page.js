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
  
  const currentRemediation = currentIncidents * remediationFtes * hoursPerIncident * hourlyCost;
  const futureRemediation = futureIncidents * remediationFtes * hoursPerIncident * hourlyCost;
  
  const currentProductivity = currentIncidents * productivityHoursLost * hourlyCost;
  const futureProductivity = futureIncidents * productivityHoursLost * hourlyCost;
  
  const industryBreachExposure = industryBreachCost * (currentClickRate / 100);
  const futureExposure = industryBreachCost * (projectedClickRate / 100);
  
  const currentAnnualCost = currentRemediation + currentProductivity + industryBreachExposure;
  const projectedAnnualCost = futureRemediation + futureProductivity + futureExposure;
  
  const annualSavings = Math.max(0, currentAnnualCost - projectedAnnualCost);
  const innviktaCost = employees * 13.2;
  
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
          <section className="hero-section" style={{ paddingBottom: "2rem" }}>
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
                  <div className="hero-content" style={{ paddingTop: "2.5rem", textAlign: "center", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          </section>

        {/* CALCULATOR & RESULTS SECTION */}
        <section ref={calculatorRef} className="section py-20 bg-[#fafafa]">
          <div className="container">
            <div className="row justify-center">
              <div className="col-12 lg:col-8 text-center mb-16">
                <h2 className="text-40-heading text-center mb-6">Calculate Your ROI Potential</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto text-center text-balance">Adjust the operational parameters below to model simulated risk mitigation benefits tailored for your infrastructure.</p>
              </div>
            </div>
            
            <div className="row justify-center gap-y-8">
              {/* INPUTS COLUMN */}
              <div className="col-12 lg:col-8">
                <div className="relative w-full bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] !p-8 md:!p-10">
                  <h3 className="text-xl font-bold text-slate-950 mb-8 border-b border-slate-100 pb-4">Organization Profile</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Industry Dropdown (Full Width) */}
                  <div className="relative md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Industry
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("industry")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Industry Help Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "industry" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.industry}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <select 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all appearance-none cursor-pointer font-medium"
                      >
                        {Object.keys(INDUSTRY_COSTS).map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-400">
                        <FiChevronDown />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Select the industry that best represents your organization.</p>
                  </div>

                  {/* Employees Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Employees With Email Access
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("employees")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Employees Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "employees" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.employees}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={employees}
                        onChange={(e) => setEmployees(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Employees who regularly receive and interact with emails.</p>
                  </div>

                  {/* Monthly Phishing Attempts Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Monthly Phishing Attempts
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("monthlyAttempts")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Attempts Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "monthlyAttempts" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.monthlyAttempts}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={monthlyAttempts}
                        onChange={(e) => setMonthlyAttempts(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Per employee every month.</p>
                  </div>

                  {/* Employees Involved In Remediation Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Employees Involved In Remediation
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("remediationFtes")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Remediation FTEs Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "remediationFtes" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.remediationFtes}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={remediationFtes}
                        onChange={(e) => setRemediationFtes(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Number of personnel handling an incident.</p>
                  </div>

                  {/* Hours Required Per Incident Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Hours Required Per Incident
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("hoursPerIncident")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Hours Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "hoursPerIncident" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.hoursPerIncident}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={hoursPerIncident}
                        onChange={(e) => setHoursPerIncident(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Average time spent by each employee.</p>
                  </div>

                  {/* Hourly Cost Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Average Employee Hourly Cost ($)
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("hourlyCost")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Hourly Cost Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "hourlyCost" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.hourlyCost}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={hourlyCost}
                        onChange={(e) => setHourlyCost(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Cost of an employee in incident response.</p>
                  </div>

                  {/* Productivity Hours Lost Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Productivity Hours Lost Per Breach
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("productivityHoursLost")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Downtime Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      {activeTooltip === "productivityHoursLost" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.productivityHoursLost}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        min="1"
                        value={productivityHoursLost}
                        onChange={(e) => setProductivityHoursLost(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Average work hours lost.</p>
                  </div>

                  {/* Current Phishing Click Rate Slider */}
                  <div className="relative md:col-span-2 mt-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Current Phishing Click Rate
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("currentClickRate")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Click Rate Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{currentClickRate}%</span>
                      {activeTooltip === "currentClickRate" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.currentClickRate}
                        </div>
                      )}
                    </div>
                    <input 
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
                    <p className="mt-2 text-xs text-slate-400">Percentage of employees likely to click a phishing email.</p>
                  </div>

                  {/* Successful Breach Rate Slider */}
                  <div className="relative md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Successful Breach Rate
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("breachRate")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Breach Rate Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{breachRate}%</span>
                      {activeTooltip === "breachRate" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.breachRate}
                        </div>
                      )}
                    </div>
                    <input 
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
                    <p className="mt-2 text-xs text-slate-400">Percentage of phishing clicks that result in a security incident requiring remediation.</p>
                  </div>

                  {/* Projected Click Rate Slider */}
                  <div className="relative md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        Projected Click Rate With Innvikta
                        <button 
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip("projectedClickRate")}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label="Target Click Rate Info"
                        >
                          <FiInfo className="text-xs" />
                        </button>
                      </label>
                      <span className="text-sm font-extrabold text-[#f15a24] bg-[#f15a24]/10 px-3 py-1 rounded-full">{projectedClickRate}%</span>
                      {activeTooltip === "projectedClickRate" && (
                        <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                          {tooltips.projectedClickRate}
                        </div>
                      )}
                    </div>
                    <input 
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
                    <p className="mt-2 text-xs text-slate-400">Expected phishing click rate after implementing awareness training and phishing simulations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS PANEL COLUMN */}
              <div className="col-12 lg:col-8">
                <div className="w-full bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden">
                  {/* Report Header */}
                  <div className="bg-slate-50 border-b border-slate-200 !px-8 !py-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Executive ROI Summary</h3>
                      <p className="text-sm text-slate-500 mt-1">Financial impact analysis for security awareness training</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 !px-3 !py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                      <FiCheckCircle className="text-[#f15a24]" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Real-Time Data</span>
                    </div>
                  </div>

                  <div className="!p-8 space-y-8">
                    {/* Primary Highlight: ROI & Savings */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-[#f15a24] rounded-2xl !p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 !p-4 opacity-20">
                          <FiActivity size={80} />
                        </div>
                        <div className="relative z-10">
                          <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">Estimated ROI</div>
                          <div className="text-5xl font-black tracking-tight mb-1">{roi}%</div>
                          <div className="text-sm text-white/90">Return on training investment</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white border border-slate-200 rounded-2xl !p-6 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Estimated Annual Savings</div>
                        <div className="text-4xl font-black text-[#f15a24] tracking-tight mb-1">{formatCurrency(annualSavings)}</div>
                        <div className="text-sm text-slate-500">Reclaimed from reduced remediation and downtime</div>
                      </div>
                    </div>

                    {/* Detailed Financial Breakdown */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 !pb-3 mb-4">Financial Breakdown</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl !p-5 border border-slate-100">
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Current Annual Cost</div>
                          <div className="text-2xl font-bold text-slate-900">{formatCurrency(currentAnnualCost)}</div>
                          <p className="text-xs text-slate-400 mt-2">Cost before implementing Innvikta</p>
                        </div>
                        <div className="bg-[#f15a24]/5 rounded-xl !p-5 border border-[#f15a24]/20">
                          <div className="text-xs font-bold uppercase tracking-widest text-[#f15a24] mb-1">Projected Annual Cost</div>
                          <div className="text-2xl font-bold text-[#f15a24]">{formatCurrency(projectedAnnualCost)}</div>
                          <p className="text-xs text-slate-500 mt-2">Expected cost with training</p>
                        </div>
                      </div>
                    </div>

                    {/* Operational Metrics */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 !pb-3 mb-4">Operational Impact</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="!p-4 border border-slate-100 rounded-xl flex flex-col justify-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Current Incidents</div>
                          <div className="text-xl font-bold text-slate-800">{currentIncidents} <span className="text-sm font-normal text-slate-500">/ yr</span></div>
                        </div>
                        <div className="!p-4 border border-slate-100 rounded-xl flex flex-col justify-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Projected Incidents</div>
                          <div className="text-xl font-bold text-slate-800">{futureIncidents} <span className="text-sm font-normal text-slate-500">/ yr</span></div>
                        </div>
                        <div className="!p-4 border border-slate-100 rounded-xl bg-slate-50 md:col-span-1 col-span-2 flex flex-col justify-center">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Incident Reduction</div>
                          <div className="text-xl font-bold text-[#f15a24]">{reductionPercentage}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Industry Context */}
                    <div className="bg-slate-900 rounded-xl !p-5 flex flex-col md:flex-row md:items-center justify-between text-white shadow-md gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Industry Context: {industry}</div>
                        <div className="text-sm text-slate-300">Average cost of a full-scale data breach</div>
                      </div>
                      <div className="text-2xl font-black">{formatCurrency(industryBreachCost)}</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-grey-5 py-20">
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
                    <button type="button" className="faq-trigger" aria-expanded={isOpen} onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
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
        </section>
      </div>
      </div>

      {/* START FREE CTA SECTION */}
      <div ref={ctaRef}>
        <FreeTierCta data={ctaData} />
      </div>
    </>
  );
}
