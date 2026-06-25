"use client";

import React, { useState, useMemo } from "react";
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

const CASE_STUDIES = [
  {
    id: 1,
    title: "Global Bank Reduces Phishing Susceptibility by 82%",
    imageTitle: "Global Bank Susceptibility Analysis",
    industry: "BFSI",
    industryLabel: "Banking & Finance",
    description: "How a leading multinational banking corporation simulated high-risk voice phishing (vishing) and SMS attacks to secure 12,000+ endpoints.",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "global-bank-phishing"
  },
  {
    id: 2,
    title: "Securing Patient Data and HIPAA Compliance for MedTech Leader",
    imageTitle: "MedTech HIPAA Compliance & Security",
    industry: "Healthcare",
    industryLabel: "Healthcare",
    description: "Deploying automated email and QR code simulation campaigns to educate healthcare workers and protect sensitive patient portal access.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "healthcare-security-crisis"
  },
  {
    id: 3,
    title: "SaaS Enterprise Mitigates Developer Credentials Harvesting Scams",
    imageTitle: "SaaS Developer Credentials Protection",
    industry: "IT & Services",
    industryLabel: "IT & Services",
    description: "Customized AI-generated phishing templates simulating code repository access alerts and cloud provider security warnings.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "saas-credentials-harvesting"
  },
  {
    id: 4,
    title: "Leading Insurer Safeguards Customer Data Against Phishing",
    imageTitle: "Insurance Policy & Customer Data Protection",
    industry: "Insurance",
    industryLabel: "Insurance",
    description: "How a major insurance provider implemented automated phishing defense campaigns to secure highly sensitive client records and meet strict regulatory standards.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "insurance-customer-data"
  },
  {
    id: 5,
    title: "Industrial Leader Safeguards Supply Chain against CEO Fraud",
    imageTitle: "Supply Chain & CEO Fraud Mitigation",
    industry: "Manufacturing",
    industryLabel: "Manufacturing",
    description: "Educating remote procurement and plant personnel against Business Email Compromise (BEC) and fake invoice requests.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "manufacturing-people-centric"
  },
  {
    id: 6,
    title: "National Agency Builds Cybersecurity Culture with Innvikta Arcade",
    imageTitle: "National Security Awareness Campaign",
    industry: "Government",
    industryLabel: "Government",
    description: "Using bite-sized gamified modules and interactive quests to train state-level employees on secure remote work habits.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "national-agency-gamified"
  }
];

const INDUSTRIES = ["All Industries", "BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];

export default function CaseStudies() {
  const [activeIndustry, setActiveIndustry] = useState("All Industries");

  const filteredCaseStudies = useMemo(() => {
    if (activeIndustry === "All Industries") return CASE_STUDIES;
    return CASE_STUDIES.filter(cs => cs.industry === activeIndustry);
  }, [activeIndustry]);

  return (
    <GSAPWrapper>
      <SeoMeta title="Enterprise Success Stories & Case Studies | Innvikta" description="Read how global BFSI, Healthcare, IT, and Manufacturing enterprises reduce human risk and satisfy compliance audits with Innvikta." />

      {/* Hero Section */}
      <div className="bg-[#f15a24] text-white py-20 relative overflow-hidden">
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
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-sm">
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

                  {/* Content under the image */}
                  <div className="pt-6 pb-4 px-2">
                    {/* Category */}
                    <span className="block text-xs md:text-sm font-bold text-[#f15a24] uppercase tracking-wide mb-2">
                      {study.industryLabel}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-slate-900 mb-3 leading-snug tracking-tight group-hover:text-[#f15a24] transition-colors">
                      {study.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-slate-600 font-normal leading-relaxed mb-6">
                      {study.description}
                    </p>
                  </div>
                </div>

                {/* Read More Button styled like Book A Demo in navbar */}
                <div className="px-2 pb-6">
                  <Link 
                    href={`/resources/case-studies/${study.slug || ""}`} 
                    className="bg-[#f15a24] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 inline-flex items-center gap-1 whitespace-nowrap font-bold text-sm shadow-md shadow-orange-500/10"
                  >
                    Read More <FiArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </GSAPWrapper>
  );
}
