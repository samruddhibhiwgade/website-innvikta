"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { 
  FiShield, 
  FiLock, 
  FiTerminal, 
  FiGlobe, 
  FiCpu, 
  FiAlertTriangle,
  FiArrowRight
} from "react-icons/fi";

const INDUSTRIES = ["All Industries", "BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [activeIndustry, setActiveIndustry] = useState("All Industries");

  useEffect(() => {
    fetch("/api/case-studies")
      .then(res => res.json())
      .then(data => setCaseStudies(data))
      .catch(err => console.error("Failed to fetch case studies", err));
  }, []);

  const filteredCaseStudies = useMemo(() => {
    if (activeIndustry === "All Industries") return caseStudies;
    return caseStudies.filter(cs => cs.industry === activeIndustry);
  }, [activeIndustry, caseStudies]);

  return (
    <GSAPWrapper>
      <SeoMeta title="Cybersecurity Success Stories & Case Studies | Innvikta" description="Read how leading organizations partner with Innvikta to build secure behaviors, satisfy compliance audits, and mitigate phishing risk." />
      <SeoMeta title="Enterprise Success Stories & Case Studies | Innvikta" description="Read how global BFSI, Healthcare, IT, and Manufacturing enterprises reduce human risk and satisfy compliance audits with Innvikta." />

      {/* Hero Section */}
      <div className="bg-[#f15a24] !text-white py-20 relative overflow-hidden">
        {/* Background Decorative Rings & Dots */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-25 pointer-events-none">
          <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
            {/* Dotted curve */}
            <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
            {/* Thick solid ring */}
            <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
            {/* White solid curve */}
            <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
          </svg>
        </div>

        <div className="container px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary border-b-4 border-white pb-3 inline-block">
              Case Studies
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed font-medium">
              Explore how organizations worldwide use Innvikta’s security awareness campaigns, phishing simulations, and human risk metrics to strengthen security posture.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section bg-white pt-12 pb-24">
        <div className="container px-6 md:px-12 lg:px-24">
          
          {/* Industry Filter Tabs (Mobile Responsive Scroll) */}
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between border border-slate-100 rounded-xl overflow-hidden mb-12 shadow-sm bg-slate-50/50">
            <div className="flex flex-nowrap items-stretch flex-1 overflow-x-auto no-scrollbar scroll-smooth divide-x divide-slate-100">
              {INDUSTRIES.map((ind) => {
                const isActive = activeIndustry === ind;
                return (
                  <button
                    key={ind}
                    onClick={() => setActiveIndustry(ind)}
                    className={`px-5 py-4 text-xs font-extrabold uppercase tracking-wider transition-all relative flex items-center justify-center shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-white text-slate-900 border-t-[3px] border-[#f15a24]"
                        : "bg-transparent text-slate-500 hover:text-[#f15a24] hover:bg-white/40"
                    }`}
                    style={{
                      borderTopColor: isActive ? "#f15a24" : "transparent",
                    }}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heading */}
          <div className="mb-12 text-left">
            <span className="text-base font-secondary font-medium uppercase tracking-[0.05em] text-[#f15a24]">
              Proven Results
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-secondary font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 mt-3">
              Strengthening defense across industries.
            </h2>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study) => (
              <div 
                key={study.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 justify-between"
              >
                <div>
                  {/* Square Image container with Overlay */}
                  {study.pdfUrl ? (
                    <a 
                      href={study.pdfUrl} 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(study.pdfUrl, '_blank', 'width=1000,height=900,noopener,noreferrer');
                      }}
                      className="block"
                    >
                      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-sm cursor-pointer">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Top Overlay: CASE STUDY */}
                        <div className="absolute top-6 left-6 flex items-center">
                          <span className="border-l-2 border-[#f15a24] pl-2 text-[11px] font-black uppercase tracking-wider text-white">
                            Case Study
                          </span>
                        </div>

                        {/* Bottom Overlay: Title */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-lg md:text-xl font-bold font-secondary text-white leading-tight">
                            {study.imageTitle}
                          </h4>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <Link href={`/resources/case-studies/${study.slug || ""}`} className="block">
                      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-sm cursor-pointer">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Top Overlay: CASE STUDY */}
                        <div className="absolute top-6 left-6 flex items-center">
                          <span className="border-l-2 border-[#f15a24] pl-2 text-[11px] font-black uppercase tracking-wider text-white">
                            Case Study
                          </span>
                        </div>

                        {/* Bottom Overlay: Title */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-lg md:text-xl font-bold font-secondary text-white leading-tight">
                            {study.imageTitle}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Content under the image */}
                  <div className="pt-6 pb-4 px-2">
                    {/* Category */}
                    <span className="block text-xs md:text-sm font-bold text-[#f15a24] uppercase tracking-wide mb-2">
                      {study.industryLabel}
                    </span>

                    {/* Title */}
                    {study.pdfUrl ? (
                      <a 
                        href={study.pdfUrl} 
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(study.pdfUrl, '_blank', 'width=1000,height=900,noopener,noreferrer');
                        }}
                        className="block"
                      >
                        <h3 className={`text-2xl font-black mb-3 leading-snug tracking-tight transition-colors cursor-pointer ${
                          study.industry === "Healthcare" 
                            ? "text-[#f15a24]" 
                            : "text-slate-900 group-hover:text-[#f15a24]"
                        }`}>
                          {study.subtitle}
                        </h3>
                      </a>
                    ) : (
                      <Link href={`/resources/case-studies/${study.slug || ""}`} className="block">
                        <h3 className={`text-2xl font-black mb-3 leading-snug tracking-tight transition-colors cursor-pointer ${
                          study.industry === "Healthcare" 
                            ? "text-[#f15a24]" 
                            : "text-slate-900 group-hover:text-[#f15a24]"
                        }`}>
                          {study.subtitle}
                        </h3>
                      </Link>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-500 font-normal leading-relaxed mb-6">
                      {study.description}
                    </p>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="px-2 pb-6">
                  {study.pdfUrl ? (
                    <a 
                      href={study.pdfUrl} 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(study.pdfUrl, '_blank', 'width=1000,height=900,noopener,noreferrer');
                      }}
                      className="bg-[#f15a24] hover:bg-orange-600 !text-white px-5 py-2.5 rounded-lg transition-all duration-300 inline-flex items-center gap-1 whitespace-nowrap font-bold text-sm shadow-md shadow-orange-500/10 cursor-pointer"
                    >
                      View PDF <FiArrowRight className="text-xs" />
                    </a>
                  ) : (
                    <Link 
                      href={`/resources/case-studies/${study.slug || ""}`} 
                      className="bg-[#f15a24] hover:bg-orange-600 !text-white px-5 py-2.5 rounded-lg transition-all duration-300 inline-flex items-center gap-1 whitespace-nowrap font-bold text-sm shadow-md shadow-orange-500/10 cursor-pointer"
                    >
                      Read More <FiArrowRight className="text-xs" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#f15a24] hover:bg-[#d94f1c] text-white p-4 rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer">
          <FiShield className="text-2xl" />
        </button>
      </div>
    </GSAPWrapper>
  );
}
