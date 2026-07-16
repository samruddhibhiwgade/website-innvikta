"use client";
import SeoMeta from "@layouts/partials/SeoMeta";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiInfo, FiChevronDown, FiTrendingDown, FiShield, FiPercent, FiClock, FiActivity, FiBriefcase, FiUsers, FiDollarSign, FiArrowRight } from "react-icons/fi";
import "../../../styles/insat.scss";
import FreeTierCta from "@layouts/partials/FreeTierCta";

// Industry benchmark database from the Excel Benchmarks tab
const BENCHMARKS = {
  "Banking": { clickRate: 0.20, credRate: 0.035, emailsPerUser: 520, reportRate: 0.18, costPerUser: 260, compliance: "Very High", notes: "Higher regulatory and fraud exposure" },
  "Insurance": { clickRate: 0.21, credRate: 0.034, emailsPerUser: 500, reportRate: 0.16, costPerUser: 220, compliance: "High", notes: "Customer data and payment risk" },
  "Healthcare": { clickRate: 0.24, credRate: 0.040, emailsPerUser: 480, reportRate: 0.12, costPerUser: 240, compliance: "Very High", notes: "Sensitive data and downtime risk" },
  "Manufacturing": { clickRate: 0.22, credRate: 0.032, emailsPerUser: 440, reportRate: 0.10, costPerUser: 190, compliance: "High", notes: "Ransomware and OT downtime exposure" },
  "IT/ITES": { clickRate: 0.18, credRate: 0.028, emailsPerUser: 560, reportRate: 0.20, costPerUser: 210, compliance: "High", notes: "Credential and client-data exposure" },
  "Retail": { clickRate: 0.25, credRate: 0.038, emailsPerUser: 420, reportRate: 0.11, costPerUser: 170, compliance: "Medium", notes: "Payment and seasonal fraud exposure" },
  "Pharma": { clickRate: 0.22, credRate: 0.033, emailsPerUser: 470, reportRate: 0.13, costPerUser: 230, compliance: "Very High", notes: "IP, regulated data and vendor risk" },
  "Education": { clickRate: 0.28, credRate: 0.045, emailsPerUser: 380, reportRate: 0.08, costPerUser: 130, compliance: "Medium", notes: "High user diversity and low reporting benchmark" },
  "Government": { clickRate: 0.23, credRate: 0.036, emailsPerUser: 460, reportRate: 0.12, costPerUser: 210, compliance: "Very High", notes: "Public service and citizen-data risk" },
  "Energy": { clickRate: 0.21, credRate: 0.032, emailsPerUser: 500, reportRate: 0.13, costPerUser: 250, compliance: "Very High", notes: "Critical infrastructure downtime risk" },
  "Logistics": { clickRate: 0.23, credRate: 0.034, emailsPerUser: 430, reportRate: 0.10, costPerUser: 175, compliance: "Medium", notes: "Invoice, shipment and vendor fraud exposure" },
  "Other": { clickRate: 0.22, credRate: 0.034, emailsPerUser: 440, reportRate: 0.12, costPerUser: 180, compliance: "Medium", notes: "Generic cross-industry assumption" }
};

// Existing Program Assumptions from the Excel Assumptions tab
const ASSUMPTIONS = {
  "None": { riskReduction: 0.15, clickReduction: 0.18, credReduction: 0.24, reportUplift: 1.2 },
  "Annual Training": { riskReduction: 0.28, clickReduction: 0.30, credReduction: 0.38, reportUplift: 1.6 },
  "Quarterly Training": { riskReduction: 0.42, clickReduction: 0.45, credReduction: 0.55, reportUplift: 2.2 },
  "Monthly Training": { riskReduction: 0.55, clickReduction: 0.58, credReduction: 0.68, reportUplift: 3.0 },
  "Mature Continuous Program": { riskReduction: 0.70, clickReduction: 0.72, credReduction: 0.80, reportUplift: 4.0 }
};

const CURRENCIES = {
  "USD": { symbol: "$", label: "USD ($)" },
  "INR": { symbol: "₹", label: "INR (₹)" },
  "EUR": { symbol: "€", label: "EUR (€)" },
  "GBP": { symbol: "£", label: "GBP (£)" }
};

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Japan",
  "Other"
];

// Custom Dropdown Component to guarantee it renders downwards
function CustomDropdown({ label, value, options, optionLabels, onChange, tooltip, activeTooltip, setActiveTooltip, tooltipKey, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative text-left w-full ${isOpen ? "z-50" : "z-10"} ${disabled ? "opacity-60 pointer-events-none" : ""}`} ref={dropdownRef}>
      <div className="flex items-center justify-between !mb-2 w-full">
        <div className="text-sm font-bold text-slate-800 flex items-center !gap-1.5">
          <span>{label}</span>
          {tooltip && (
            <button
              type="button"
              disabled={disabled}
              className="text-slate-400 hover:text-slate-600 focus:outline-none"
              onMouseEnter={() => !disabled && setActiveTooltip(tooltipKey)}
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label={`${label} Info`}
            >
              <FiInfo className="text-xs" />
            </button>
          )}
        </div>
        {activeTooltip === tooltipKey && !disabled && (
          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
            {tooltip}
          </div>
        )}
      </div>
      
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between !px-5 !py-3.5 border border-slate-100 rounded-xl focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-medium text-left ${disabled ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'cursor-pointer'} ${!value ? 'text-slate-400' : 'text-slate-800'}`}
          style={{ backgroundColor: disabled ? "#e2e8f0" : "#f8fafc" }}
        >
          <span>{value ? (optionLabels ? optionLabels[value] : value) : placeholder}</span>
          <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && !disabled && (
          <div 
            className="absolute left-0 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto no-scrollbar"
            style={{ top: "100%", padding: "6px" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left hover:bg-slate-50 transition-colors text-sm cursor-pointer rounded-lg ${opt === value ? 'bg-[#f15a24]/10 text-[#f15a24] font-semibold' : 'text-slate-700'}`}
                style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem", paddingTop: "0.625rem", paddingBottom: "0.625rem" }}
              >
                {optionLabels ? optionLabels[opt] : opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SimulationRoiPage() {
  // Input states matching the Excel model (initially empty to show placeholders)
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [employees, setEmployees] = useState("");
  const [existingProgram, setExistingProgram] = useState("");
  const [programCostPerUser, setProgramCostPerUser] = useState("");
  const [currency, setCurrency] = useState("");

  // UI state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [calculationStep, setCalculationStep] = useState(0);

  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const ctaRef = useRef(null);
  const summaryRef = useRef(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCta = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset calculated status when inputs change so they must re-run calculations
  useEffect(() => {
    setIsCalculated(false);
  }, [companyName, industry, country, employees, existingProgram, programCostPerUser, currency]);

  const handleCalculate = () => {
    if (isCalculating) return;
    setIsCalculating(true);
    setCalculationStep(0);

    const steps = [
      "Loading industry benchmarks...",
      "Quantifying human cyber risk...",
      "Generating board-ready report..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setCalculationStep(currentStep);
      } else {
        clearInterval(interval);
        setIsCalculating(false);
        setIsCalculated(true);
        setTimeout(() => {
          summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }, 450);
  };

  // Lookup benchmark and assumptions values
  const benchmark = BENCHMARKS[industry] || BENCHMARKS["Other"];
  const assumption = ASSUMPTIONS[existingProgram] || ASSUMPTIONS["None"];

  // Handle empty state values for calculation safety
  const employeesCount = employees === "" ? 0 : Number(employees);
  const programCostPerUserVal = programCostPerUser === "" ? 0 : Number(programCostPerUser);

  // Excel Calculations
  const industryClickRate = benchmark.clickRate;
  const credentialSubmissionRate = benchmark.credRate;
  const emailsPerUserYear = benchmark.emailsPerUser;
  const baselineReportingRate = benchmark.reportRate;
  const annualRiskCostPerUser = benchmark.costPerUser;

  const programEffectiveness = assumption.riskReduction; // Overall Risk Reduction
  const clickReduction = assumption.clickReduction;
  const credReduction = assumption.credReduction;
  const reportingUplift = assumption.reportUplift;

  // Outputs
  const estimatedPhishingEmailsPerYear = Math.round(employeesCount * emailsPerUserYear);
  const estimatedRiskyClicksPerYear = Math.round(estimatedPhishingEmailsPerYear * industryClickRate);
  const estimatedCredentialSubmissionsPerYear = Math.round(estimatedRiskyClicksPerYear * credentialSubmissionRate);

  const estimatedAnnualHumanRiskExposure = employeesCount * annualRiskCostPerUser;
  const projectedRiskAfterAwareness = estimatedAnnualHumanRiskExposure * (1 - programEffectiveness);
  const estimatedAnnualRiskReduction = estimatedAnnualHumanRiskExposure - projectedRiskAfterAwareness;

  const annualProgramInvestment = employeesCount * programCostPerUserVal;
  const projectedRoiMultiple = annualProgramInvestment === 0 ? 0 : (estimatedAnnualRiskReduction / annualProgramInvestment);
  const paybackPeriodMonths = estimatedAnnualRiskReduction === 0 ? 0 : (annualProgramInvestment / estimatedAnnualRiskReduction * 12);

  const riskScoreBefore = Math.min(95, Math.round(30 + (industryClickRate * 150) + (credentialSubmissionRate * 250)));
  const riskScoreAfter = Math.max(5, Math.round(riskScoreBefore * (1 - programEffectiveness)));

  // Currency helpers
  const symbol = CURRENCIES[currency]?.symbol || "$";
  const formatCurrency = (val) => {
    if (val >= 1000000) {
      return `${symbol}${(val / 1000000).toFixed(1)}M`;
    }
    return `${symbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const tooltips = {
    companyName: "Name of the organization for branding the board-ready summary report.",
    industry: "Industry type defines the baseline phishing susceptibility, email frequency, and average risk cost per user based on global cybersecurity reports.",
    country: "Region of operations for compliance pressure and exposure mapping.",
    employees: "Total number of organization personnel who actively use corporate email addresses.",
    existingProgram: "The type of security awareness program currently deployed, which determines baseline risk reduction parameters.",
    programCostPerUser: "Average annual security awareness license and administration budget per user.",
    currency: "Select preferred currency for the financial reports."
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
    }
  ];

  const ctaData = {
    label: "FREE FOR UP TO 50 USERS",
    title: "Start Free. No Credit Card. No Catch.",
    description: "Get access to AI-powered security awareness training, phishing templates, gamified learning, and human risk reporting - free for teams up to 50 users.",
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

  const currencyLabels = Object.keys(CURRENCIES).reduce((acc, cur) => {
    acc[cur] = CURRENCIES[cur].label;
    return acc;
  }, {});

  return (
    <>
      <SeoMeta title="Phishing Simulation ROI Calculator | Innvikta" description="Calculate the return on investment of running phishing simulation and security training programs." />
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
                    <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto", textAlign: "center" }}>Enterprise Planning Tools</span>
                    <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                      Security Awareness <span className="text-primary">ROI Calculator</span>
                    </h1>
                    <p className="text-20-content hero-paragraph text-balance" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
                      Estimate your organization&apos;s human cyber risk exposure and project the financial Return on Investment (ROI) of implementing a continuous awareness and simulation program.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={scrollToCalculator} className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Open Calculator
                      </button>
                      <button onClick={scrollToCta} className="btn btn-secondary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Start Free Tier
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
                  <h2 className="text-40-heading" style={{ textAlign: "center", marginBottom: "1.25rem" }}>ROI Calculator</h2>
                  <p style={{ fontSize: "1.125rem", color: "#64748b", maxWidth: "42rem", margin: "0 auto", textAlign: "center", lineHeight: "1.75" }}>
                    Enter organization details to simulate risk mitigation values based on premium industry benchmarks.
                  </p>
                </div>
              </div>

              <div className="row justify-center">
                {/* INPUTS COLUMN */}
                <div className="col-12 lg:col-8">
                  <div className="relative w-full bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] !p-8 md:!p-10 text-left">
                    <h3 className="text-xl font-bold text-slate-950 !mb-8 border-b border-slate-100 !pb-4 text-left">Organization Parameters</h3>
 
                     <div className="grid grid-cols-1 md:grid-cols-2 !gap-6 md:!gap-8 text-left">
                       
                       {/* Company Name */}
                       <div className="relative text-left">
                         <div className="flex items-center justify-between !mb-2 w-full">
                           <div className="text-sm font-bold text-slate-800 flex items-center !gap-1.5">
                             <label htmlFor="company-name-input">Company Name</label>
                             <button
                               type="button"
                               className="text-slate-400 hover:text-slate-600 focus:outline-none"
                               onMouseEnter={() => setActiveTooltip("companyName")}
                               onMouseLeave={() => setActiveTooltip(null)}
                               aria-label="Company Info"
                             >
                               <FiInfo className="text-xs" />
                             </button>
                           </div>
                           {activeTooltip === "companyName" && (
                             <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                               {tooltips.companyName}
                             </div>
                           )}
                         </div>
                         <input
                           id="company-name-input"
                           type="text"
                           value={companyName}
                           onChange={(e) => setCompanyName(e.target.value)}
                           placeholder="Enter company name"
                           className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                         />
                       </div>
 
                       {/* Industry Selector - Custom dropdown to open downwards */}
                       <CustomDropdown
                         label="Industry"
                         value={industry}
                         options={Object.keys(BENCHMARKS)}
                         onChange={setIndustry}
                         tooltip={tooltips.industry}
                         activeTooltip={activeTooltip}
                         setActiveTooltip={setActiveTooltip}
                         tooltipKey="industry"
                         placeholder="Choose industry"
                       />
 
                       {/* Country / Region - Custom dropdown */}
                       <CustomDropdown
                         label="Country / Region"
                         value={country}
                         options={COUNTRIES}
                         onChange={setCountry}
                         tooltip={tooltips.country}
                         activeTooltip={activeTooltip}
                         setActiveTooltip={setActiveTooltip}
                         tooltipKey="country"
                         placeholder="Choose region"
                       />
 
                       {/* Employees Count */}
                       <div className="relative text-left">
                         <div className="flex items-center justify-between !mb-2 w-full">
                           <div className="text-sm font-bold text-slate-800 flex items-center !gap-1.5">
                             <label htmlFor="employees-input">Employee Count</label>
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
                         <input
                           id="employees-input"
                           type="number"
                           min="1"
                           max="1000000"
                           value={employees}
                           onChange={(e) => {
                             const val = e.target.value;
                             setEmployees(val === "" ? "" : Math.max(1, parseInt(val, 10) || 1));
                           }}
                           placeholder="Enter employee count"
                           className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                         />
                       </div>
 
                       {/* Currency Selector - Custom dropdown */}
                       <div className="relative text-left md:col-span-2">
                         <CustomDropdown
                           label="Preferred Currency"
                           value={currency}
                           options={Object.keys(CURRENCIES)}
                           optionLabels={currencyLabels}
                           onChange={setCurrency}
                           tooltip={tooltips.currency}
                           activeTooltip={activeTooltip}
                           setActiveTooltip={setActiveTooltip}
                           tooltipKey="currency"
                           placeholder="Choose currency"
                         />
                       </div>
 
                       {/* Existing Awareness Program - Custom dropdown */}
                       <CustomDropdown
                         label="Existing Awareness Program"
                         value={existingProgram}
                         options={Object.keys(ASSUMPTIONS)}
                         onChange={(val) => {
                           setExistingProgram(val);
                           const defaultCosts = {
                             "None": 0.0,
                             "Annual Training": 4.0,
                             "Quarterly Training": 8.0,
                             "Monthly Training": 12.0,
                             "Mature Continuous Program": 15.0
                           };
                           setProgramCostPerUser(defaultCosts[val] !== undefined ? defaultCosts[val] : "");
                         }}
                         tooltip={tooltips.existingProgram}
                         activeTooltip={activeTooltip}
                         setActiveTooltip={setActiveTooltip}
                         tooltipKey="existingProgram"
                         placeholder={currency ? "Choose existing program" : "Please choose currency first"}
                         disabled={!currency}
                       />
 
                       {/* Annual Program Cost Per User */}
                       <div className="relative text-left">
                         <div className="flex items-center justify-between !mb-2 w-full">
                           <div className="text-sm font-bold text-slate-800 flex items-center !gap-1.5">
                             <label htmlFor="program-cost-input">Annual Program Cost / User ({symbol})</label>
                             <button
                               type="button"
                               disabled={!currency}
                               className="text-slate-400 hover:text-slate-600 focus:outline-none"
                               onMouseEnter={() => currency && setActiveTooltip("programCostPerUser")}
                               onMouseLeave={() => setActiveTooltip(null)}
                               aria-label="Program Cost Info"
                             >
                               <FiInfo className="text-xs" />
                             </button>
                           </div>
                           {activeTooltip === "programCostPerUser" && currency && (
                             <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
                               {tooltips.programCostPerUser}
                             </div>
                           )}
                         </div>
                         <input
                           id="program-cost-input"
                           type="number"
                           step="0.1"
                           min="0"
                           value={programCostPerUser}
                           onChange={(e) => {
                             const val = e.target.value;
                             setProgramCostPerUser(val === "" ? "" : Math.max(0, parseFloat(val) || 0));
                           }}
                           placeholder={currency ? "Enter cost per user" : "Please choose currency first"}
                           disabled={!currency}
                           className={`w-full !px-5 !py-3.5 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold ${!currency ? 'cursor-not-allowed bg-slate-100 text-slate-400 opacity-60' : 'bg-slate-50'}`}
                         />
                       </div>
 
                     </div>
 
                     {/* Calculate Button */}
                     <div className="!mt-8 !pt-6 border-t border-slate-100 flex justify-center">
                       <button
                         type="button"
                         onClick={handleCalculate}
                         disabled={!companyName || !industry || !country || !employees || !existingProgram || !programCostPerUser || !currency || isCalculating}
                         className={`w-full md:w-auto !px-10 !py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center !gap-2 cursor-pointer ${
                           (!companyName || !industry || !country || !employees || !existingProgram || !programCostPerUser || !currency || isCalculating)
                             ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                             : 'bg-[#f15a24] hover:bg-orange-600 hover:scale-[1.02]'
                         }`}
                       >
                        {isCalculating ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                            <span>{["Loading industry benchmarks...", "Quantifying human cyber risk...", "Generating board-ready report..."][calculationStep]}</span>
                          </>
                        ) : (
                          <>
                            <span>Calculate ROI Projections</span>
                            <FiArrowRight />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* RESULTS PANEL COLUMN */}
                <div className="col-12 lg:col-8" style={{ marginTop: "2rem" }} ref={summaryRef}>
                  <div className="relative">
                    {!isCalculated && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-[6px] z-20 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-[#f15a24] border border-orange-100">
                          <FiActivity className="text-2xl animate-pulse" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Projections Ready to Generate</h4>
                        <p className="text-sm text-slate-500 max-w-sm">
                          Please fill in all organization parameters above and click &quot;Calculate ROI Projections&quot; to generate your board-ready financial report.
                        </p>
                      </div>
                    )}
                    
                    <main className={`summary-card rounded-2xl !p-8 md:!p-12 pb-12 text-left transition-all duration-500 ${!isCalculated ? 'select-none pointer-events-none opacity-40' : ''}`} style={{ backgroundColor: "#ffffff", isolation: "isolate", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)", border: "1px solid #f1f5f9" }} data-purpose="main-dashboard-container">
                    
                    <header style={{ marginBottom: "1.75rem" }}>
                      <h2 className="text-3xl font-extrabold text-slate-950" style={{ marginBottom: "0.35rem" }}>Executive ROI Summary</h2>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Board-Ready Projections for {companyName || "[Company Name]"} ({industry || "[Selected Industry]"} Industry)</p>
                    </header>

                    {/* Narrative Summary */}
                    <div style={{ marginBottom: "2rem" }} data-purpose="narrative-text">
                      <p className="text-slate-800 leading-relaxed text-[16px]" style={{ lineHeight: "1.8" }}>
                        Based on benchmark assumptions for the <strong className="font-bold text-slate-950">{industry}</strong> industry and an employee population of <strong className="font-bold text-slate-950">{employees.toLocaleString()}</strong>, the organisation may have an estimated annual human cyber risk exposure of <strong className="font-bold text-slate-950">{formatCurrency(estimatedAnnualHumanRiskExposure)}</strong>. A continuous security awareness and phishing simulation program could reduce this risk by approximately <strong className="font-bold text-[#f15a24]">{(programEffectiveness * 100).toFixed(0)}%</strong>, creating an estimated annual risk reduction of <strong className="font-extrabold text-[#f15a24]">{formatCurrency(estimatedAnnualRiskReduction)}</strong> and a projected ROI of <strong className="font-bold text-slate-950">{projectedRoiMultiple > 0 ? `${projectedRoiMultiple.toFixed(1)}x` : "N/A"}</strong>.
                      </p>
                    </div>

                    {/* Primary Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: "2.5rem" }} data-purpose="top-metrics-grid">
                      <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Annual Risk Exposure</span>
                        <span className="text-xl font-extrabold text-slate-950">{formatCurrency(estimatedAnnualHumanRiskExposure)}</span>
                      </div>
                      <div className="bg-orange-50/40 border border-orange-100 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                        <span className="block text-[10px] font-bold text-[#f15a24] uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Annual Risk Reduction</span>
                        <span className="text-xl font-extrabold text-[#f15a24]">{formatCurrency(estimatedAnnualRiskReduction)}</span>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl shadow-sm transition-all hover:shadow-md" style={{ padding: "1.25rem 1.5rem" }}>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.5rem" }}>Projected ROI Multiple</span>
                        <span className="text-xl font-extrabold text-slate-950">{projectedRoiMultiple > 0 ? `${projectedRoiMultiple.toFixed(1)}x` : "N/A"}</span>
                      </div>
                    </div>

                    {/* Additional Financial Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "2.5rem" }}>
                      <div className="bg-slate-50 border border-slate-200/50 rounded-xl" style={{ padding: "1.25rem 1.5rem" }}>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.4rem" }}>Annual Program Investment</span>
                        <span className="text-2xl font-extrabold text-slate-950">{formatCurrency(annualProgramInvestment)}</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/50 rounded-xl" style={{ padding: "1.25rem 1.5rem" }}>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider" style={{ marginBottom: "0.4rem" }}>Payback Period</span>
                        <span className="text-2xl font-extrabold text-slate-950">{paybackPeriodMonths > 0 ? `${paybackPeriodMonths.toFixed(1)} months` : "N/A"}</span>
                      </div>
                    </div>



                    {/* Disclaimer from Executive Report tab */}
                    <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem", color: "#64748b", fontSize: "0.75rem", lineHeight: "1.5" }}>
                      <p className="font-semibold uppercase tracking-wider mb-1" style={{ fontSize: "0.7rem" }}>Disclaimer</p>
                      <p>
                        This calculator produces industry-based modeled projections, not measured facts about a specific customer environment. Update parameters as customer-specific incident data or region-specific benchmarks become available.
                      </p>
                    </footer>

                  </main>
                </div>
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
