"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { 
  FiArrowLeft, 
  FiArrowRight
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
        className="relative text-white py-28 bg-cover bg-center overflow-hidden min-h-[420px] flex items-end"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${data.heroImage || data.image})` }}
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

      {/* 2. Measure security outcomes Section (Clean, professional minimalist column layout) */}
      <section className="py-14 bg-[#FFFBF7] border-b border-orange-100/50">
        <div className="container px-6 md:px-12 lg:px-24 text-left">
          <h2 className="text-2xl font-bold font-secondary text-[#f15a24] mb-10">
            Measure security outcomes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.atGlance.map((point, index) => (
              <div 
                key={index} 
                className="border-l-2 border-[#f15a24] pl-4 py-1"
              >
                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
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
                   <p 
                     key={i} 
                     className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl prose prose-slate"
                     dangerouslySetInnerHTML={{ __html: para }}
                   />
                 ))}
               </div>
 
               {/* Block 2 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.challengeTitle}
                 </h2>
                 {data.challengeParagraphs.map((para, i) => (
                   <p 
                     key={i} 
                     className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl prose prose-slate"
                     dangerouslySetInnerHTML={{ __html: para }}
                   />
                 ))}
               </div>
 
               {/* Block 3 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.solutionTitle || "Solution Section"}
                 </h2>
                 {data.solutionParagraphs.map((para, i) => (
                   <p 
                     key={i} 
                     className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl prose prose-slate"
                     dangerouslySetInnerHTML={{ __html: para }}
                   />
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
          <div className="bg-[#fff7f3] rounded-[1.5rem] px-8 py-8 md:py-10 text-center border border-[#f15a24]/10 shadow-sm relative overflow-hidden">
            {/* Subtle brand circles */}
            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#f15a24]/5 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[#f15a24]/5 pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h3 className="text-xl md:text-2xl font-bold font-secondary text-slate-900">
                {data.ctaTitle || "Ready to Build a Stronger Security Culture?"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
                {data.ctaDescription || "Get a personalized walk-through of Innvikta InSAT to see how our simulated phishing campaigns and automated training modules reduce social engineering risks."}
              </p>
              <div className="pt-3">
                <Link 
                  href={data.ctaButtonUrl || "/book-demo"} 
                  className="bg-[#f15a24] hover:bg-orange-600 !text-white px-5 py-2.5 rounded-lg transition-all duration-300 inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-sm shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  {data.ctaButtonText || "Book a Demo"} <FiArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Additional Section (Quote & Team Image Layout) */}
      {data.cultureTitle && data.cultureParagraphs && data.cultureParagraphs.length > 0 && data.cultureParagraphs.some(p => p.trim() !== "") && (
        <section className="py-20 bg-white border-b border-slate-100/50">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Story details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                  {data.cultureTitle}
                </h2>
                {data.cultureParagraphs.map((para, i) => para.trim() !== "" && (
                  <p 
                    key={i} 
                    className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal prose prose-slate"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              {/* Right Side: Collage / Collaboration Image */}
              {data.cultureImage && (
                <div className="lg:col-span-5">
                  <img 
                    src={data.cultureImage} 
                    alt="Security Compliance Team" 
                    className="w-full h-72 object-cover rounded-3xl border border-slate-200/80 shadow-sm"
                  />
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* 6. Big Quote Section (Centered, full width quote block) */}
      {data.quoteText && (
        <section className="py-20 bg-white">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto text-center relative">
              <div className="absolute top-12 left-1/2 -translate-x-1/2 text-8xl font-serif text-slate-100 select-none pointer-events-none">
                &ldquo;
              </div>
              <div className="relative z-10 space-y-6">
                <blockquote className="text-xl md:text-2xl font-medium font-secondary text-slate-600 leading-relaxed italic">
                  {data.quoteText}
                </blockquote>
                {data.quoteAuthor && (
                  <cite className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider not-italic">
                    {data.quoteAuthor}
                  </cite>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections (Rendered at the very end of the case study details) */}
      {data.customSections && data.customSections.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-12 text-left">
              {data.customSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                    {section.title}
                  </h2>
                  {section.paragraphs && section.paragraphs.map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal prose prose-slate"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </GSAPWrapper>
  );
}
