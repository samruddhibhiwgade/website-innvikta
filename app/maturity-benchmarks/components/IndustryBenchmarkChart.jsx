"use client";

import React, { useState, useEffect } from "react";

const industriesData = {
  "Financial Services": {
    clickRate: 2.1,
    reportRate: 85.0,
    insights: "Financial institutions lead in reporting rates due to stringent regulatory frameworks (like PCI-DSS) and continuous, high-frequency phishing simulations. Susceptibilities remain low due to automated mail filtering and advanced phishing awareness training."
  },
  "Technology": {
    clickRate: 3.5,
    reportRate: 72.0,
    insights: "Tech workforces demonstrate strong reporting habits but remain targeted by highly sophisticated social engineering attacks (e.g., developer credential harvesting and OAuth token abuse)."
  },
  "Healthcare": {
    clickRate: 4.2,
    reportRate: 60.0,
    insights: "The urgency of medical operations creates high susceptibility to phishing attacks, resulting in elevated click rates. Programs targeting nurse and clinical staff response are key to lowering risk."
  },
  "Manufacturing": {
    clickRate: 5.1,
    reportRate: 55.0,
    insights: "Operational staff on factory floors often lack regular access to security updates, leading to higher susceptibility. Focused mobile-friendly microlearning is recommended."
  },
  "Education": {
    clickRate: 6.5,
    reportRate: 42.0,
    insights: "Higher education is historically vulnerable due to open network policies, transient user populations (students), and decentralized IT operations."
  },
  "Retail": {
    clickRate: 5.8,
    reportRate: 48.0,
    insights: "High staff turnover and seasonal hiring in retail result in training gaps, elevating click susceptibility during retail high-season periods."
  },
  "Government": {
    clickRate: 3.8,
    reportRate: 68.0,
    insights: "Public sector entities benefit from compliance mandates, though legacy system dependencies and nation-state targeting require continuous phishing scenario training."
  }
};

const IndustryBenchmarkChart = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("Financial Services");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [selectedIndustry]);

  const activeData = industriesData[selectedIndustry];

  return (
    <div className="w-full transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (4 cols): Selector List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-primary mb-1 block">
              Benchmark Analytics
            </span>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Select Sector
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Compare susceptibility (Click Rate) against active defense (Report Rate) across peer industries to gauge relative team performance.
            </p>
          </div>
          
          {/* Mobile Dropdown Selector (visible only on mobile) */}
          <div className="block lg:hidden w-full relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-700 font-semibold py-3 px-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
            >
              {Object.keys(industriesData).map((industry) => (
                <option key={industry} value={industry} className="text-slate-800 bg-white">
                  {industry}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          {/* Desktop Selector List (visible only on desktop) */}
          <div className="hidden lg:flex flex-col gap-2">
            {Object.keys(industriesData).map((industry) => {
              const isSelected = selectedIndustry === industry;
              return (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`w-full py-3.5 px-5 text-left text-sm font-semibold rounded-xl border transition-all duration-300 relative overflow-hidden flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-primary/20 text-primary shadow-md shadow-primary/5"
                      : "bg-white/40 border-slate-200/60 text-slate-600 hover:bg-white hover:text-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span>{industry}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-slate-100 text-slate-500 py-0.5 px-1.5 rounded font-mono">
                      {industriesData[industry].clickRate}% / {industriesData[industry].reportRate}%
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): The Dual-Axis Chart & Integrated Insights */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Header block (Unboxed for perfect alignment with the left column title) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-3">
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-primary mb-1 block">
                Performance Overview
              </span>
              <h3 className="text-2xl font-bold text-slate-800">
                {selectedIndustry} Analytics
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-600">Click Rate (Left Axis)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Report Rate (Right Axis)</span>
              </div>
            </div>
          </div>

          {/* Integrated Insights Block (No layered card layout) - Aligned below title */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
            <h5 className="font-bold text-xs text-primary uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {selectedIndustry} Insights
            </h5>
            <p className="text-slate-600 text-sm leading-relaxed">
              {activeData.insights}
            </p>
          </div>

          {/* Dual-Axis Bar Chart Box */}
          <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 md:p-6">

            {/* Custom Dual-Axis Vertical Bar Chart */}
            <div className="relative flex justify-between items-end h-56 md:h-64 w-full px-8 md:px-12 mb-4">
              
              {/* Left Y Axis (Click Rate: 0% - 10%) */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between items-end pr-2 pointer-events-none text-[10px] text-slate-400 font-semibold">
                {["10%", "8%", "6%", "4%", "2%", "0%"].map((val) => (
                  <div key={val} className="h-0 flex items-center text-red-500/80">
                    <span>{val}</span>
                  </div>
                ))}
              </div>

              {/* Right Y Axis (Report Rate: 0% - 100%) */}
              <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-between items-start pl-2 pointer-events-none text-[10px] text-slate-400 font-semibold">
                {["100%", "80%", "60%", "40%", "20%", "0%"].map((val) => (
                  <div key={val} className="h-0 flex items-center text-emerald-600/80">
                    <span>{val}</span>
                  </div>
                ))}
              </div>

              {/* Horizontal Grid lines */}
              <div className="absolute left-10 right-10 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
                {[1, 2, 3, 4, 5, 6].map((line) => (
                  <div key={line} className="w-full border-t border-dashed border-slate-200/80 h-0" />
                ))}
              </div>

              {/* The Bars Container */}
              <div className="relative z-10 flex gap-12 md:gap-24 items-end w-full justify-center h-full">
                
                {/* Click Rate Bar (Scaled against 10% max) */}
                <div className="flex flex-col items-center w-20 h-full justify-end">
                  <div className="relative w-full bg-slate-200/60 rounded-t-xl overflow-hidden h-[90%] flex items-end">
                    <div
                      className="w-full bg-red-500 rounded-t-xl transition-all duration-700 ease-out shadow-sm"
                      style={{
                        height: animate ? `${(activeData.clickRate / 10) * 100}%` : "0%",
                        minHeight: animate ? "4px" : "0px"
                      }}
                    ></div>
                    {/* Floating Value */}
                    <div className="absolute top-[-26px] left-0 right-0 text-center font-bold text-red-600 text-sm">
                      {activeData.clickRate}%
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 block text-center">
                    Click Rate
                  </span>
                  <span className="text-[9px] text-slate-400 block text-center font-medium">
                    (Vulnerability)
                  </span>
                </div>

                {/* Report Rate Bar (Scaled against 100% max) */}
                <div className="flex flex-col items-center w-20 h-full justify-end">
                  <div className="relative w-full bg-slate-200/60 rounded-t-xl overflow-hidden h-[90%] flex items-end">
                    <div
                      className="w-full bg-emerald-500 rounded-t-xl transition-all duration-700 ease-out shadow-sm"
                      style={{
                        height: animate ? `${activeData.reportRate}%` : "0%",
                        minHeight: animate ? "4px" : "0px"
                      }}
                    ></div>
                    {/* Floating Value */}
                    <div className="absolute top-[-26px] left-0 right-0 text-center font-bold text-emerald-600 text-sm">
                      {activeData.reportRate}%
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 block text-center">
                    Report Rate
                  </span>
                  <span className="text-[9px] text-slate-400 block text-center font-medium">
                    (Active Defense)
                  </span>
                </div>

              </div>

            </div>

            {/* Custom Axis Labels at Bottom */}
            <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 border-t border-slate-200/80 pt-4 px-2">
              <span className="text-red-500/80">← Left Y-Axis: Click Susceptibility %</span>
              <span className="text-slate-400">Metric Comparison (X-Axis)</span>
              <span className="text-emerald-600/80">Right Y-Axis: Defense Reporting % →</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default IndustryBenchmarkChart;
