"use client";

import React, { useState } from "react";

const regionsData = {
  "North America": {
    clickRate: 2.8,
    reportRate: 78.0,
    insights: "High regulatory maturity and sustained investment in security tools contribute to strong reporting metrics, though complex spear-phishing campaigns continue to find success."
  },
  "Europe": {
    clickRate: 3.1,
    reportRate: 74.0,
    insights: "Driven by GDPR mandates and data protection awareness, European employees show a strong culture of caution and report suspect communications rapidly."
  },
  "Asia Pacific": {
    clickRate: 4.5,
    reportRate: 58.0,
    insights: "Rapid digitalization and varying cybersecurity awareness levels across localized sub-regions create opportunities for attackers, emphasizing the need for localized training modules."
  },
  "Latin America": {
    clickRate: 5.2,
    reportRate: 50.0,
    insights: "Emerging threat landscapes and lower overall security awareness programs result in higher susceptibility rates. Improving reporting tools and basic threat awareness is critical."
  },
  "Middle East & Africa": {
    clickRate: 4.8,
    reportRate: 54.0,
    insights: "Accelerated cloud adoption and target-rich energy/financial sectors face frequent phishing campaigns. Targeted executive and operational staff training is key."
  }
};

const RegionalBenchmarkMap = () => {
  const [selectedRegion, setSelectedRegion] = useState("North America");

  const activeData = regionsData[selectedRegion];

  return (
    <div className="w-full bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm text-left">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        
        {/* World Map SVG / Region Selectors */}
        <div className="w-full lg:w-3/5">
          <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 overflow-hidden flex flex-col items-center">
            
            {/* Highly Polished Stylized SVG Map */}
            <svg
              className="w-full h-auto max-w-lg opacity-85 hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 800 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background grid representation */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="450" fill="url(#grid)" rx="16" />

              {/* World Map Image Background */}
              <image
                href="/images/worldmap.jpg"
                x="0"
                y="0"
                width="800"
                height="450"
                preserveAspectRatio="xMidYMid slice"
                opacity="0.9"
              />
 
              {/* Simplified Region Shapes / Bubbles for clicks */}
              
              {/* North America */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion("North America")}
              >
                <circle
                  cx="180"
                  cy="140"
                  r="65"
                  className={`transition-all duration-300 ${
                    selectedRegion === "North America"
                      ? "fill-primary/20 stroke-primary stroke-[2px]"
                      : "fill-slate-300/20 stroke-slate-400/40 hover:fill-slate-400/30"
                  }`}
                />
                <circle cx="180" cy="140" r="8" fill="#f15a24" />
                <text x="180" y="220" textAnchor="middle" className="text-xs font-bold fill-slate-700 pointer-events-none">
                  North America
                </text>
              </g>
 
              {/* Europe */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion("Europe")}
              >
                <circle
                  cx="420"
                  cy="120"
                  r="55"
                  className={`transition-all duration-300 ${
                    selectedRegion === "Europe"
                      ? "fill-primary/20 stroke-primary stroke-[2px]"
                      : "fill-slate-300/20 stroke-slate-400/40 hover:fill-slate-400/30"
                  }`}
                />
                <circle cx="420" cy="120" r="8" fill="#f15a24" />
                <text x="420" y="190" textAnchor="middle" className="text-xs font-bold fill-slate-700 pointer-events-none">
                  Europe
                </text>
              </g>
 
              {/* Asia Pacific */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion("Asia Pacific")}
              >
                <circle
                  cx="640"
                  cy="185"
                  r="75"
                  className={`transition-all duration-300 ${
                    selectedRegion === "Asia Pacific"
                      ? "fill-primary/20 stroke-primary stroke-[2px]"
                      : "fill-slate-300/20 stroke-slate-400/40 hover:fill-slate-400/30"
                  }`}
                />
                <circle cx="640" cy="185" r="8" fill="#f15a24" />
                <text x="640" y="275" textAnchor="middle" className="text-xs font-bold fill-slate-700 pointer-events-none">
                  Asia Pacific
                </text>
              </g>
 
              {/* Latin America */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion("Latin America")}
              >
                <circle
                  cx="240"
                  cy="300"
                  r="55"
                  className={`transition-all duration-300 ${
                    selectedRegion === "Latin America"
                      ? "fill-primary/20 stroke-primary stroke-[2px]"
                      : "fill-slate-300/20 stroke-slate-400/40 hover:fill-slate-400/30"
                  }`}
                />
                <circle cx="240" cy="300" r="8" fill="#f15a24" />
                <text x="240" y="370" textAnchor="middle" className="text-xs font-bold fill-slate-700 pointer-events-none">
                  Latin America
                </text>
              </g>
 
              {/* Middle East & Africa */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegion("Middle East & Africa")}
              >
                <circle
                  cx="450"
                  cy="240"
                  r="60"
                  className={`transition-all duration-300 ${
                    selectedRegion === "Middle East & Africa"
                      ? "fill-primary/20 stroke-primary stroke-[2px]"
                      : "fill-slate-300/20 stroke-slate-400/40 hover:fill-slate-400/30"
                  }`}
                />
                <circle cx="450" cy="240" r="8" fill="#f15a24" />
                <text x="450" y="315" textAnchor="middle" className="text-xs font-bold fill-slate-700 pointer-events-none">
                  MEA
                </text>
              </g>
            </svg>

            {/* Mobile-friendly Region List Selector */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center w-full">
              {Object.keys(regionsData).map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all ${
                    selectedRegion === region
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            
          </div>
        </div>

        {/* Data / Insights card */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between self-stretch">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex-grow flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-primary mb-2 block">
                Regional Intel
              </span>
              <h4 className="font-bold text-2xl text-dark mb-6">
                {selectedRegion}
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 block mb-1">Average Click Rate</span>
                  <span className="text-3xl font-extrabold text-red-500">{activeData.clickRate}%</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 block mb-1">Average Report Rate</span>
                  <span className="text-3xl font-extrabold text-emerald-500">{activeData.reportRate}%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h5 className="font-semibold text-sm text-slate-700 mb-2">Regional Behavior Context</h5>
              <p className="text-slate-600 text-sm leading-relaxed">
                {activeData.insights}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegionalBenchmarkMap;
