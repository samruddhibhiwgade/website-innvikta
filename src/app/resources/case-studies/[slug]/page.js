"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { 
  FiArrowLeft, 
  FiArrowRight,
  FiPlay
} from "react-icons/fi";

export default function CaseStudyDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/case-studies")
      .then(res => res.json())
      .then(list => {
        const found = list.find(item => item.slug === slug);
        setData(found || list[0]);
      })
      .catch(err => console.error("Error fetching case study details", err));
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center" style={{ paddingTop: "8rem" }}>
        <div className="w-12 h-12 border-4 border-[#f15a24] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-slate-500 font-bold text-sm">Loading Case Study...</span>
      </div>
    );
  }

  return (
    <GSAPWrapper>
      <SeoMeta title={`${data.subtitle} | Innvikta Case Study`} description={data.overview} />
      
      {/* 1. KnowBe4-Style Hero Section (Using Innvikta Theme Overlay) */}
      <div 
        className="relative text-white py-20 bg-cover bg-center overflow-hidden min-h-[300px] flex items-end"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${data.image})` }}
      >
        <div className="container px-6 md:px-12 lg:px-24 relative z-10 w-full text-left">
          <Link href="/resources/case-studies" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold mb-4 transition-colors font-secondary text-sm">
            <FiArrowLeft /> Back to Case Studies
          </Link>
          <div className="max-w-4xl">
            <span className="text-white/80 font-bold text-sm tracking-wider uppercase mb-2 block font-secondary">
              CASE STUDY
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-secondary text-white leading-tight">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. At a Glance Section (Soft light-orange/cream background, orange bullet icons, 2x2 layout) */}
      <section className="py-12 bg-[#FFFBF7] border-b border-orange-100">
        <div className="container px-6 md:px-12 lg:px-24 text-left">
          <h2 className="text-2xl font-bold font-secondary text-[#f15a24] mb-8">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.atGlance.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[#f15a24] font-bold text-lg leading-none shrink-0 mt-0.5">&rarr;</span>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Content Section (Split Layout) */}
      <section className="py-16 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
             {/* Left Column (2/3 width content details) */}
             <div className="lg:col-span-8 space-y-12 text-left">
               
               {/* Block 1 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.summaryTitle}
                 </h2>
                 {data.summaryParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
               {/* Block 2 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.challengeTitle}
                 </h2>
                 {data.challengeParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
               {/* Block 3 */}
               <div className="space-y-4">
                 {data.solutionParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
             </div>

            {/* Right Column (1/3 width sidebar card) */}
            <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-8 text-left space-y-8">
              
              {/* Header Company Logo Placeholder */}
              <div className="border-b border-slate-200 pb-6">
                <div className="text-2xl font-extrabold font-secondary tracking-tight text-[#1F1F1F]">
                  {data.title}
                </div>
              </div>

              {/* Industry & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-1">
                    INDUSTRY
                  </span>
                  <span className="text-sm font-bold text-slate-800">{data.industry}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-1">
                    LOCATION
                  </span>
                  <span className="text-sm font-bold text-slate-800">{data.location}</span>
                </div>
              </div>

              {/* Challenge summary */}
              <div>
                <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-2">
                  CHALLENGE
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {data.sidebarChallenge}
                </p>
              </div>

              {/* Platform and Representative details */}
              <div className="space-y-4 pt-4 border-t border-slate-200/80">
                {data.sidebarDetails.map((detail, idx) => (
                  <div key={idx}>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {detail.label}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{detail.val}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Center Action Banner Section (Rounded Card, not edge-to-edge) */}
      <section className="py-4 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="bg-[#CFD8DC]/50 rounded-[1.5rem] px-8 py-6 md:py-8 text-center border border-slate-200/30">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-secondary text-[#0F172A]">
                See Innvikta InSAT Security Awareness in Action
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed font-normal max-w-xl mx-auto">
                Request a personalized demo today to see how simulated threat scenarios can reduce security risks across your organization.
              </p>
              <div className="pt-3">
                <Link 
                  href="/book-demo" 
                  className="inline-flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md shadow-orange-500/25"
                >
                  Get a Demo <span className="text-sm">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Additional Section (Quote & Team Image Layout) */}
      <section className="py-20 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Story details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                Building a security culture requires a program built around real behavior analytics, not slide library training. By triggering short, repeated reinforcement modules, employees understand the role they play in preserving compliance frameworks and cybersecurity defenses.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                Using Innvikta InSAT, the organization achieved full compliance alignment, minimized repeat clickers, and accelerated threat containment times dramatically.
              </p>
            </div>

            {/* Right Side: Collage / Collaboration Image */}
            <div className="lg:col-span-5">
              <img 
                src="/images/about-bg.jpeg" 
                alt="Security Compliance Team" 
                className="w-full h-72 object-cover rounded-3xl border border-slate-200/80 shadow-sm"
              />
            </div>

          </div>

          {/* 6. Big Quote Section (Centered, full width quote block) */}
          <div className="max-w-4xl mx-auto pt-20 text-center relative">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-8xl font-serif text-slate-100 select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative z-10 space-y-6">
              <blockquote className="text-xl md:text-2xl font-bold font-secondary text-[#1F1F1F] leading-relaxed italic">
                {data.quoteText}
              </blockquote>
              <cite className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider not-italic">
                {data.quoteAuthor}
              </cite>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Bottom Action Banner Section */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(241,90,36,0.12),transparent)] pointer-events-none" />
        <div className="container px-6 md:px-12 lg:px-24 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl md:text-2xl font-bold font-secondary">
              Everything you need to secure your human risk &mdash; on one platform.
            </h3>
            <div className="pt-2">
              <Link 
                href="/book-demo" 
                className="inline-flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-md shadow-orange-500/25"
              >
                Book a Demo <FiPlay className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </GSAPWrapper>
  );
}
