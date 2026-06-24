"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

export default function PlatformUpdatesPage() {
  const updatesList = [
    {
      category: "INNVIKTA ARCADE",
      date: "May 12, 2026",
      title: "Innvikta Arcade: Interactive Gamified Training Challenges",
      desc: "Introduce employees to immersive role-based scenarios, competitive team leaderboards, and interactive security quizzes designed to keep training retention high throughout the year. Employees can test their security instincts in real-time, competing for the top spot on organizational leaderboards.",
      image: "/images/arcade-preview.png",
      graphicText: "INNVIKTA ARCADE"
    },
    {
      category: "SIMULATIONS",
      date: "April 08, 2026",
      title: "Advanced Intent-Based Phishing Simulations",
      desc: "Create custom simulation campaigns using automated template generators that reflect real-world social engineering, spear phishing, and credential harvesting attacks. Track delivery rates, click-through rates, and report metrics directly from a unified risk dashboard.",
      image: "/images/phishing-simulator.png",
      graphicText: "PHISHING SIMULATION"
    },
    {
      category: "COMPLIANCE",
      date: "March 15, 2026",
      title: "Regional Data Privacy & Compliance Mappings",
      desc: "Automatically map active security awareness courses to major global regulatory frameworks, including DPDP (India), GDPR (Europe), HIPAA (US), and SOC 2 audits. Generate comprehensive evidence logs and progress records with a single click to present to compliance auditors.",
      image: "/images/compliance-training.png",
      graphicText: "COMPLIANCE TRACKING"
    }
  ];

  return (
    <GSAPWrapper>
      <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-800 font-sans selection:bg-[#f15a24] selection:text-white pb-16">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="pt-32 pb-24 bg-gradient-to-br from-[#f15a24] to-[#df4b17] relative overflow-hidden border-b border-[#e24e1b] mb-16 text-white">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-[0.08] pointer-events-none z-0">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
          {/* Subtle Decorative Rings */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border-2 border-white opacity-[0.12] pointer-events-none z-0" />
          <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border-[6px] border-white opacity-[0.06] pointer-events-none z-0" />
          
          <div className="container px-6 md:px-12 lg:px-24 relative z-10">
            <div className="max-w-4xl space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-100 mb-2 block font-sans">
                LATEST ANNOUNCEMENTS
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-secondary text-white tracking-tight leading-tight">
                Platform Updates
              </h1>
              <p className="text-lg md:text-xl text-orange-50 leading-relaxed max-w-2xl font-sans">
                Explore the latest features, security content, and enhancements added to the Innvikta training suite.
              </p>
            </div>
          </div>
        </section>

        {/* ================= FEATURED UPDATE (NO CARD CONTAINER) ================= */}
        <div className="container px-6 md:px-12 lg:px-24 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left featured content */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#f15a24] font-sans">PRODUCT</span>
                  <span className="text-xs text-slate-400 font-semibold">•</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">June 24, 2026</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-secondary text-slate-900 leading-tight">
                  Product Updates: Q2 2026 Review & Core Enhancements
                </h2>
                <p className="text-slate-650 text-sm md:text-base leading-relaxed font-sans">
                  This quarter, we rolled out advanced AI-driven phishing simulation customization, compliance tracking mappings for regional privacy laws, and multiplayer security quizzes inside the Innvikta Arcade. Read on to discover how these features will improve employee retention and streamline audit logging.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link 
                  href="#"
                  className="text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-[#f15a24] transition-colors border-b-2 border-slate-900 hover:border-[#f15a24] pb-0.5 font-sans"
                >
                  Read article
                </Link>
              </div>
            </div>

            {/* Right featured badge / graphic block */}
            <div className="lg:col-span-5 bg-[#FFEFEA] rounded-3xl p-8 md:p-12 flex flex-col justify-between relative min-h-[320px] overflow-hidden">
              {/* Decorative Rings */}
              <div className="absolute right-0 top-0 bottom-0 w-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover">
                  <circle cx="200" cy="100" r="100" stroke="#f15a24" strokeWidth="2" strokeDasharray="4 8" />
                  <circle cx="200" cy="100" r="70" stroke="#f15a24" strokeWidth="8" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-bold tracking-widest text-[#f15a24] uppercase font-sans">Quarterly Recap</span>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="text-5xl font-black font-secondary text-[#f15a24] tracking-tight leading-none">
                  Q2 <br/> 2026
                </h3>
              </div>

              <div className="relative z-10 flex justify-end">
                <div className="w-12 h-12 rounded-full border-2 border-[#f15a24]/30 flex items-center justify-center text-[#f15a24] hover:bg-[#f15a24] hover:text-white transition-all duration-300">
                  <FiArrowRight className="text-xl" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= LIST OF UPDATES ================= */}
        <div className="container px-6 md:px-12 lg:px-24 mb-16">
          <div className="space-y-12">
            {updatesList.map((update, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-slate-200/60 items-center"
              >
                {/* Left image block */}
                <div 
                  className="md:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
                  style={{ backgroundImage: `url(${update.image})` }}
                >
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] transition-colors duration-300 hover:bg-black/45 pointer-events-none" />
                  <span className="relative z-10 text-[10px] font-extrabold uppercase tracking-widest text-white/80 mb-2 font-sans">INNVIKTA UPDATES</span>
                  <h4 className="relative z-10 text-lg md:text-xl font-bold text-white tracking-wider max-w-[200px] leading-tight font-secondary">
                    {update.graphicText}
                  </h4>
                </div>

                {/* Right content block */}
                <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#f15a24] font-sans">{update.category}</span>
                      <span className="text-xs text-slate-400 font-semibold">•</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">{update.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-secondary text-slate-900 leading-snug">
                      {update.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
                      {update.desc}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <Link 
                      href="#"
                      className="text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-[#f15a24] transition-colors border-b-2 border-slate-900 hover:border-[#f15a24] pb-0.5 font-sans"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </GSAPWrapper>
  );
}
