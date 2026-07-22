"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useRef, useEffect } from "react";
import { FiInfo, FiActivity, FiArrowRight } from "react-icons/fi";
import "../../../styles/insat.scss";
import FreeTierCta from "@layouts/partials/FreeTierCta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

import { BENCHMARKS, ASSUMPTIONS, CURRENCIES, COUNTRIES, tooltips, ctaData } from "./components/constants";
import CustomDropdown from "./components/CustomDropdown";
import HeroSection from "./components/Hero";
import FAQSection from "./components/Faq";

export default function SimulationRoiPage() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [employees, setEmployees] = useState("");
  const [existingProgram, setExistingProgram] = useState("");
  const [programCostPerUser, setProgramCostPerUser] = useState("");
  const [currency, setCurrency] = useState("");

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

  const benchmark = BENCHMARKS[industry] || BENCHMARKS["Other"];
  const assumption = ASSUMPTIONS[existingProgram] || ASSUMPTIONS["None"];

  const employeesCount = employees === "" ? 0 : Number(employees);
  const programCostPerUserVal = programCostPerUser === "" ? 0 : Number(programCostPerUser);

  const industryClickRate = benchmark.clickRate;
  const credentialSubmissionRate = benchmark.credRate;
  const emailsPerUserYear = benchmark.emailsPerUser;
  const annualRiskCostPerUser = benchmark.costPerUser;

  const programEffectiveness = assumption.riskReduction;

  const estimatedAnnualHumanRiskExposure = employeesCount * annualRiskCostPerUser;
  const projectedRiskAfterAwareness = estimatedAnnualHumanRiskExposure * (1 - programEffectiveness);
  const estimatedAnnualRiskReduction = estimatedAnnualHumanRiskExposure - projectedRiskAfterAwareness;

  const annualProgramInvestment = employeesCount * programCostPerUserVal;
  const projectedRoiMultiple = annualProgramInvestment === 0 ? 0 : (estimatedAnnualRiskReduction / annualProgramInvestment);
  const paybackPeriodMonths = estimatedAnnualRiskReduction === 0 ? 0 : (annualProgramInvestment / estimatedAnnualRiskReduction * 12);

  const symbol = CURRENCIES[currency]?.symbol || "$";
  const formatCurrency = (val) => {
    if (val >= 1000000) {
      return `${symbol}${(val / 1000000).toFixed(1)}M`;
    }
    return `${symbol}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const currencyLabels = Object.keys(CURRENCIES).reduce((acc, cur) => {
    acc[cur] = CURRENCIES[cur].label;
    return acc;
  }, {});

  return (
    <GSAPWrapper>
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
          <HeroSection 
            scrollToCalculator={scrollToCalculator}
            scrollToCta={scrollToCta}
          />

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
                           className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                         />
                       </div>

                       {/* Industry Selector */}
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

                       {/* Country / Region */}
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
                           className="w-full !px-5 !py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold"
                         />
                       </div>

                       {/* Currency Selector */}
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

                       {/* Existing Awareness Program */}
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
                           className={`w-full !px-5 !py-3.5 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-semibold ${!currency ? 'cursor-not-allowed bg-slate-100 text-slate-400 opacity-60' : 'bg-slate-50'}`}
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
                             ? 'bg-[#f15a24]/20 text-[#f15a24]/60 border-2 border-[#f15a24]/25 cursor-not-allowed shadow-none'
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
                    
                    {/* Orange left accent rail */}
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full z-10" style={{ background: "#f15a24", opacity: isCalculated ? 1 : 0.25, transition: "opacity 0.5s ease" }} />
                    
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

                    {/* Disclaimer */}
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

          <FAQSection 
            openFaqIndex={openFaqIndex}
            setOpenFaqIndex={setOpenFaqIndex}
          />
        </div>
      </div>

      <div ref={ctaRef}>
        <FreeTierCta data={ctaData} />
      </div>
      </GSAPWrapper>
  );
}
