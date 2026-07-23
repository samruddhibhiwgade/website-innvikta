"use client";
import { FiArrowRight } from "react-icons/fi";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { 
  Shield, 
  User, 
  Building2, 
  Cpu, 
  ClipboardCheck, 
  UserCheck, 
  Users, 
  Scale, 
  AlertOctagon, 
  ChevronDown, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Target,
  FileCheck,
  Gavel,
  Zap,
  Globe,
  Clock,
  HelpCircle
} from "lucide-react";

export default function DpdpAtAGlancePage() {
  const [activeAspect, setActiveAspect] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-image-right",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );

      // Scroll triggered animation for timeline section cards and arrows
      gsap.fromTo(
        ".timeline-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".timeline-arrow",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".timeline-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const entities = [
    {
      title: "Data Principal",
      desc: "The individual whose personal data is processed.",
      icon: User,
    },
    {
      title: "Data Fiduciary",
      desc: "Organisation that decides why and how personal data is processed. (Comparable to Data Controller)",
      icon: Building2,
    },
    {
      title: "Data Processor",
      desc: "Vendor/service provider that processes personal data on behalf of the Data Fiduciary.",
      icon: Cpu,
    },
    {
      title: "Consent Manager",
      desc: "Registered entity that enables individuals to give, manage, review and withdraw consent.",
      icon: ClipboardCheck,
    },
    {
      title: "Data Protection Officer (DPO)",
      desc: "India-based privacy lead appointed by Significant Data Fiduciaries.",
      icon: UserCheck,
    },
    {
      title: "Significant Data Fiduciary",
      desc: "Organisation notified by Government based on volume, sensitivity and risk.",
      icon: Users,
    }
  ];

  const aspectData = [
    {
      id: 0,
      title: "Applicability",
      summary: "Covers digital personal data processed in India and certain organisations outside India offering goods or services to individuals in India.",
      bullets: [
        "Digital personal data processed in India.",
        "Offline data that is later digitised.",
        "Organisations outside India offering goods or services to individuals in India.",
        "Personal or domestic use and certain lawfully public data are generally excluded."
      ],
      icon: Target
    },
    {
      id: 1,
      title: "Children's data",
      summary: "Child is anyone below 18 years. Requires verifiable parental/guardian consent. No tracking, behavioural monitoring or targeted ads, with limited exemptions.",
      bullets: [
        "A child is defined as anyone below 18 years.",
        "Organisations generally need verifiable parental or guardian consent.",
        "Must not process data in a way likely to harm a child.",
        "No tracking or behavioural monitoring of children.",
        "No targeted advertising directed at children.",
        "Limited exemptions apply for specified purposes such as healthcare, education and child safety."
      ],
      icon: User
    },
    {
      id: 2,
      title: "Consent and lawful use",
      summary: "Personal data may be processed with valid consent or for specific legitimate uses permitted by law.",
      bullets: [
        "Consent must be free, specific, informed, clear and easy to withdraw.",
        "Organisations should collect only the data necessary for the stated purpose.",
        "Allows specific legitimate uses permitted by the Act (e.g., voluntary sharing, medical emergencies, employment purposes)."
      ],
      icon: ShieldCheck
    },
    {
      id: 3,
      title: "Security & breach reporting",
      summary: "Reasonable security safeguards must be in place. Individuals and the Data Protection Board must be informed without delay. Detailed report within 72 hours.",
      bullets: [
        "Reasonable security safeguards must be in place to prevent data breaches.",
        "Affected individuals and the Data Protection Board must be informed without delay.",
        "More detailed information must generally be submitted to the Board within 72 hours, unless additional time is allowed."
      ],
      icon: Lock
    },
    {
      id: 4,
      title: "Data obligations",
      summary: "Collect necessary data, explain purpose, secure it, control access, use processors under contracts, delete when no longer needed, handle requests and report breaches.",
      bullets: [
        "Clearly explain what data is collected and why.",
        "Keep personal data accurate and secure.",
        "Limit employee and vendor access.",
        "Use Data Processors under valid contracts.",
        "Delete data when it is no longer required, unless legally retained.",
        "Provide an accessible privacy contact and grievance process."
      ],
      icon: ClipboardCheck
    },
    {
      id: 5,
      title: "Significant Data Fiduciaries",
      summary: "Additional obligations: DPO, independent audit, DPIA, algorithmic risk assessment and compliance with data transfer restrictions.",
      bullets: [
        "Appoint an India-based Data Protection Officer (DPO).",
        "Appoint an independent data auditor.",
        "Conduct annual Data Protection Impact Assessments (DPIAs) and audits.",
        "Assess whether algorithms and technical systems may create risks for individuals.",
        "Follow any notified data-transfer restrictions."
      ],
      icon: Building2
    },
    {
      id: 6,
      title: "Data Principal rights",
      summary: "Access, correction, erasure (where applicable), withdraw consent, raise grievance and nominate another person to exercise rights in case of death or incapacity.",
      bullets: [
        "Access a summary of their personal data and its processing details.",
        "Know who their data has been shared with, subject to legal exceptions.",
        "Correct, complete or update inaccurate information.",
        "Request erasure where retention is no longer necessary.",
        "Withdraw consent easily.",
        "Raise grievances through accessible pathways.",
        "Nominate another person to exercise rights in the event of death or incapacity.",
        "Note: The Act does not specifically provide GDPR-style rights to data portability or a standalone 'right to be forgotten.'"
      ],
      icon: User
    },
    {
      id: 7,
      title: "Penalties for non-compliance",
      summary: "Monetary penalties up to ₹250 crore depending on the nature and severity of the violation.",
      bullets: [
        "Up to ₹250 crore for failure to maintain reasonable security safeguards.",
        "Up to ₹200 crore for breach-notification failures or violations involving children.",
        "Up to ₹150 crore for breach of Significant Data Fiduciary obligations.",
        "Up to ₹50 crore for other violations."
      ],
      icon: Gavel
    }
  ];

  const timelineEvents = [
    {
      date: "11 August 2023",
      title: "DPDP Act enacted",
      desc: "The Act received Presidential assent on 11 August 2023.",
      icon: Calendar
    },
    {
      date: "14 November 2025",
      title: "Final DPDP Rules notified",
      desc: "DPDP Rules, 2025 and the phased enforcement schedule notified.",
      icon: FileCheck
    },
    {
      date: "14 November 2026",
      title: "Consent Manager provisions",
      desc: "Provisions related to Consent Managers come into force (1 year after notification).",
      icon: Users
    },
    {
      date: "14 May 2027",
      title: "Major compliance obligations take effect",
      desc: "Most operational requirements become enforceable (18 months after notification).",
      icon: ShieldCheck
    }
  ];

  const iconWrapperStyle = {
    background: "#FFEFEA",
    display: "inline-flex",
    padding: "0.5rem",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem"
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="DPDP Act at a Glance | Innvikta Compliance Resource" description="A comprehensive guide to India's Digital Personal Data Protection (DPDP) Act requirements, penalties, and employee training compliance." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">

          {/* ==========================================
              1. HERO SECTION (Seamless Solutions Typography)
              ========================================== */}
          <section className="hero-section" style={{ paddingBottom: "3rem", borderBottom: "none" }}>
            <div className="hero-outer-wrapper">
              
              <style>{`
                 .insat-page {
                   --color-forest-15: #cbd5e1;
                   --color-grey-30: #64748b;
                   --color-grey-5: #FFF6E9;
                   --color-emerald: #f15a24;
                 }
                  @media (min-width: 1024px) {
                    .dpdp-hero-grid {
                      grid-template-columns: 1.05fr 0.95fr !important;
                      align-items: center !important;
                    }
                  }
                .aspects-grid-bg {
                  background: transparent;
                  border-radius: 0px;
                  padding: 0px;
                  border: none;
                }
                .aspect-card {
                  background: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 16px;
                  padding: 1.25rem;
                  transition: all 0.3s ease;
                  cursor: pointer;
                  display: flex;
                  flex-direction: column;
                }
                .aspect-card:hover {
                  box-shadow: 0 8px 24px rgba(0,0,0,0.04);
                  border-color: #cbd5e1;
                }
                .aspect-card-header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                }
                .aspect-card-left {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                }
                .aspect-card-icon {
                  width: 42px;
                  height: 42px;
                  border-radius: 50%;
                  background: #FFEFEA;
                  color: #f15a24;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                }
                .aspect-card-panel {
                  margin-top: 1rem;
                  border-top: 1px solid #f1f5f9;
                  padding-top: 1rem;
                }
                .timeline-arrow-line {
                  position: absolute;
                  top: 50px;
                  left: 45px;
                  right: 45px;
                  height: 2px;
                  background: #cbd5e1;
                  z-index: 0;
                }
                .timeline-arrow-line::after {
                  content: '\\2192';
                  position: absolute;
                  right: -10px;
                  top: -10px;
                  color: #cbd5e1;
                  font-size: 16px;
                }
                .badge-top-timeline {
                  position: absolute;
                  top: -12px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: #f15a24;
                  color: white;
                  font-size: 9px;
                  font-weight: 800;
                  text-transform: uppercase;
                  padding: 3px 10px;
                  border-radius: 4px;
                  white-space: nowrap;
                }
                .cta-visual-laptop {
                  position: relative;
                  width: 100%;
                  max-width: 380px;
                  height: auto;
                }
                .cta-footer-strip {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 1.5rem;
                  border-top: 1px solid #e2e8f0;
                  padding-top: 1.5rem;
                  margin-top: 3rem;
                }
                .cta-footer-item {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  font-size: 0.82rem;
                  color: #475569;
                  font-weight: 600;
                }
              `}</style>
              
              <div className="container">
                <div className="hero-grid-container dpdp-hero-grid">
                  <div className="hero-content text-left">
                    <span className="text-subheading">Compliance Overview</span>
                    <h1 className="text-96-heading" style={{ color: "#f15a24", marginBottom: "1.5rem" }}>
                      DPDP <span className="text-slate-900">at a Glance</span>
                    </h1>

                    <div className="hero-text-wrapper">
                      <p className="text-20-content">
                        India’s Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 in a quick summary.
                      </p>
                    </div>

                    {/* DPDP in one line Callout block */}
                    <span className="text-subheading" style={{ marginTop: "2rem", display: "block" }}>DPDP in one line</span>
                    <div className="mt-4 bg-white border border-[#FFEAD4] rounded-2xl flex items-center gap-4" style={{ padding: "1.25rem", boxShadow: "0 4px 16px rgba(241,90,36,0.04)", maxWidth: "600px" }}>
                      <div style={{ background: "#f15a24", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" />
                          <path d="M9 11l2 2 4-4" stroke="#f15a24" strokeWidth="3" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-16-content leading-relaxed text-slate-700 mb-0" style={{ margin: 0 }}>
                          The law that governs how organisations collect, use, store, share and delete digital personal data.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Graphics/Illustration */}
                  <div className="hero-image-right flex justify-center" style={{ overflow: "visible" }}>
                    <ImageFallback
                      src="/images/dpdp_hero.png"
                      className="hero-sim-img"
                      style={{ maxWidth: "100%", width: "100%", height: "auto", transform: "scale(1.15) translateX(55px)", transformOrigin: "center right" }}
                      width={700}
                      height={580}
                      alt="DPDP At A Glance Hero"
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              2. SECTION 1: WHO'S WHO UNDER DPDP?
              ========================================== */}
          <section className="bg-white stats-section animate" style={{ paddingBottom: "4rem", paddingTop: "4rem" }}>
            <div className="container">
              <div className="text-left" style={{ marginBottom: "3.5rem" }}>
                <h2 className="text-52-heading">Who’s who under DPDP?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {entities.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center hover:border-orange-200 transition-all duration-300"
                    style={{ padding: "2rem 1.25rem", height: "100%", minHeight: "240px" }}
                  >
                    <div className="mb-4 flex items-center justify-center" style={{ minHeight: "56px" }}>
                      <item.icon size={28} strokeWidth={1} className="text-[#f15a24]" />
                    </div>
                    <h3 className="text-22-heading mb-2 leading-snug" style={{ color: "#f15a24", fontWeight: "500" }}>
                      {item.title}
                    </h3>
                    <p className="text-16-content leading-relaxed text-slate-600" style={{ margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ==========================================
              3. SECTION 2: DPDP KEY ASPECTS (Accordion Grid)
              ========================================== */}
          <section className="bg-white" style={{ paddingBottom: "4rem", paddingTop: "2rem" }}>
            <div className="container animate">
              <div className="text-left" style={{ marginBottom: "3.5rem" }}>
                <h2 className="text-52-heading">DPDP Key Aspects</h2>
              </div>

              {/* Light gray backdrop grid box matching screenshot */}
              <div className="aspects-grid-bg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  {aspectData.map((aspect) => {
                    const isOpen = activeAspect === aspect.id;
                    return (
                      <div 
                        key={aspect.id}
                        onClick={() => setActiveAspect(isOpen ? null : aspect.id)}
                        className="aspect-card text-left"
                        style={{ padding: "1.25rem 1.5rem", height: "auto" }}
                      >
                        <div className="aspect-card-header">
                          <div className="aspect-card-left">
                            <div className="aspect-card-icon">
                              <aspect.icon size={18} strokeWidth={1.2} />
                            </div>
                            <h3 className="text-20-content text-slate-900 leading-snug" style={{ margin: 0, fontWeight: "600" }}>{aspect.title}</h3>
                          </div>
                          <ChevronDown 
                            size={16} 
                            strokeWidth={1.5}
                            className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-[#f15a24]" : ""}`} 
                          />
                        </div>
 
                        {/* Slide-out details */}
                        <div 
                          className={`transition-all duration-300 overflow-hidden ${
                            isOpen ? "max-h-[450px] opacity-100 aspect-card-panel" : "max-h-0 opacity-0 pointer-events-none"
                          }`}
                        >
                          <ul className="space-y-2">
                            {aspect.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-16-content leading-relaxed text-slate-600" style={{ listStyle: "none", paddingLeft: "1.25rem", position: "relative" }}>
                                <span style={{ position: "absolute", left: "0px", top: "0.6em", width: "5px", height: "5px", borderRadius: "50%", background: "#f15a24" }} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info label strip */}
                <div className="mt-4 flex items-center gap-1.5 text-16-content text-slate-400 pl-2">
                  <HelpCircle size={15} className="text-slate-400" />
                  <span>Click on any topic to expand and learn more.</span>
                </div>
              </div>

            </div>
          </section>

          {/* ==========================================
              4. SECTION 3: DPDP TIMELINE (Horizontal flow)
              ========================================== */}
          <section className="bg-white" style={{ paddingBottom: "4rem", paddingTop: "2rem" }}>
            <div className="container animate">
              <div className="text-left" style={{ marginBottom: "3.5rem" }}>
                <h2 className="text-52-heading">DPDP Timeline</h2>
              </div>

              {/* Horizontal Timeline Container */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative items-stretch">
                  {timelineEvents.map((evt, idx) => {
                    const isHighlight = idx === 3;
                    return (
                      <div key={idx} className="flex flex-col items-center relative flex-1">
                        
                        {/* Details card */}
                        <div 
                          className="bg-white border rounded-2xl flex flex-col items-center text-center w-full relative timeline-card hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300" 
                          style={{ 
                            borderColor: isHighlight ? "#f15a24" : "#e2e8f0", 
                            borderWidth: isHighlight ? "2px" : "1px", 
                            maxWidth: "240px",
                            flex: "1 1 auto",
                            display: "flex",
                            flexDirection: "column",
                            padding: "1.75rem 1rem 1.5rem 1rem", 
                            boxShadow: isHighlight ? "0 4px 20px rgba(241,90,36,0.08)" : "none" 
                          }}
                        >
                          {isHighlight && (
                            <span 
                              className="absolute" 
                              style={{ 
                                top: "-12px", 
                                left: "50%", 
                                transform: "translateX(-50%)", 
                                background: "#f15a24", 
                                color: "white", 
                                fontSize: "10px", 
                                fontWeight: "bold", 
                                padding: "2px 8px", 
                                borderRadius: "4px", 
                                whiteSpace: "nowrap",
                                zIndex: 5
                              }}
                            >
                              KEY COMPLIANCE DATE
                            </span>
                          )}
                          {/* Date inside card */}
                          <div className="text-center text-subheading uppercase tracking-wider mb-4" style={{ color: "#f15a24" }}>
                            {evt.date}
                          </div>
 
                          {/* Large Centered Orange Icon */}
                          <div className="mb-4 text-[#f15a24] flex items-center justify-center" style={{ minHeight: "44px" }}>
                            <evt.icon size={28} strokeWidth={1} />
                          </div>
 
                          <h4 className="text-22-heading text-slate-900 leading-snug mb-2" style={{ fontWeight: "500" }}>
                            {evt.title}
                          </h4>
                          <p className="text-16-content text-slate-500 leading-relaxed mt-auto" style={{ margin: 0 }}>
                            {evt.desc}
                          </p>
                        </div>

                        {/* Arrow connector between cards (Desktop only) */}
                        {idx < 3 && (
                          <div className="hidden md:block absolute timeline-arrow" style={{ right: "-22px", top: "52%", transform: "translateY(-50%)", zIndex: 10 }}>
                            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="6" cy="6" r="3.5" fill="#cbd5e1" />
                              <line x1="9" y1="6" x2="33" y2="6" stroke="#cbd5e1" strokeWidth="2" />
                              <path d="M30 3 L35 6 L30 9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Clock Bar */}
              <div 
                className="bg-[#FFFBF7] border border-[#FFEAD4] rounded-2xl flex items-center gap-4 text-left"
                style={{ 
                  padding: "1rem 1.5rem", 
                  marginTop: "3rem", 
                  marginLeft: "auto", 
                  marginRight: "auto", 
                  maxWidth: "1050px", 
                  width: "100%" 
                }}
              >
                <span 
                  className="text-[#f15a24] shrink-0 bg-[#FFEFEA] rounded-full flex items-center justify-center"
                  style={{ padding: "0.5rem" }}
                >
                  <Clock size={16} />
                </span>
                <p className="text-slate-700 text-16-content leading-normal" style={{ margin: 0 }}>
                  The 18-month transition period is already underway. Organisations should prepare their policies, processes, systems and employees before 14 May 2027.
                </p>
              </div>

            </div>
          </section>

          {/* ==========================================
              5. CTA SECTION (Solutions Typography Integration)
              ========================================== */}
          <section className="bg-white" style={{ paddingBottom: "5rem", paddingTop: "2rem" }}>
            <div className="container">
              <div className="border border-slate-200/80 rounded-3xl p-6 lg:p-10 bg-transparent shadow-sm">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Mockup visual with laptop, plant and coffee cup */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="cta-visual-laptop w-full max-w-[320px] lg:max-w-[360px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src="/images/dpdp_compliance.png" 
                        alt="DPDP Compliance" 
                        className="w-full h-auto object-contain" 
                        style={{ maxHeight: "320px" }}
                      />
                    </div>
                  </div>
 
                  {/* Right Column: Expanded Text & 5 icon elements */}
                  <div className="lg:col-span-8 text-left space-y-4">
                    <h3 className="text-40-heading text-slate-900 leading-tight" style={{ paddingTop: "2.5rem" }}>
                      Innvikta translates DPDP compliance <span style={{ color: "#f15a24" }}>into everyday action.</span>
                    </h3>
                    <p className="text-16-content leading-relaxed text-slate-500" style={{ fontFamily: "var(--font-primary)" }}>
                      We help employees recognise personal data, handle it responsibly and respond correctly when something goes wrong—turning regulatory requirements into practical, role-relevant behaviour.
                    </p>
 
                    {/* 5 Icons Row with vertical divider borders */}
                    <div className="flex items-start gap-0 pt-3 justify-between">
                      {[
                        { label: "Bite-sized learning", icon: FileCheck },
                        { label: "Real-world scenarios", icon: Globe },
                        { icon: User, label: "Role-based relevance" },
                        { icon: Zap, label: "Actionable reinforcement" },
                        { icon: ShieldCheck, label: "Measurable impact" }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="flex-1 flex flex-col items-center text-center px-4"
                          style={{ 
                            borderRight: i < 4 ? "1px solid #e2e8f0" : "none",
                            minHeight: "80px"
                          }}
                        >
                          <item.icon size={26} strokeWidth={1.2} className="text-[#f15a24] mb-2 shrink-0" />
                          <span className="text-slate-600 font-bold text-center leading-tight" style={{ fontSize: "10.5px", margin: 0, fontFamily: "var(--font-primary)" }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
 
                </div>
 
                {/* Footer values list strip */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 border-t border-slate-200 w-full text-center" style={{ fontFamily: "var(--font-primary)", marginTop: "2rem", paddingTop: "2rem", paddingBottom: "1.75rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {[
                    "Raise awareness",
                    "Reduce human risk",
                    "Strengthen compliance",
                    "Build trust"
                  ].map((val, idx) => (
                    <div key={idx} className="inline-flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#f15a24] shrink-0" />
                      <span className="font-bold text-slate-700 leading-none" style={{ margin: 0, padding: 0, position: "relative", top: "-1px" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              6. FAQ SECTION (Matching Solutions Page)
              ========================================== */}
          <section className="bg-grey-5" style={{ paddingBottom: "5rem", paddingTop: "5rem", backgroundColor: "#FFF6E9" }}>
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center w-full lg:w-auto">
                <h2 className="text-40-heading text-center">Frequently Asked Questions</h2>
                <Link className="arrow-link" href="/book-demo" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Still have questions? Contact us</span>
                </Link>
              </div>

              <div className="faq-list-col animate from-right">
                
                <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                  <button type="button" className="faq-trigger" aria-expanded={activeFaq === 0} onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                    <span className="faq-question">How does Innvikta&apos;s DPDP awareness training help Indian organisations comply with the DPDP Act 2023?</span>
                    <div className="faq-icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-panel">
                    <div className="faq-panel-inner">
                      <div className="faq-answer">
                        <p>Innvikta provides role-based, bite-sized DPDP compliance training modules tailored specifically for employees handling personal data in India. Our platform ensures verifiable training records to help Data Fiduciaries demonstrate accountability and compliance to the Data Protection Board of India (DPBI).</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                  <button type="button" className="faq-trigger" aria-expanded={activeFaq === 1} onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                    <span className="faq-question">What role-specific training modules does Innvikta offer for DPDP Act compliance?</span>
                    <div className="faq-icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-panel">
                    <div className="faq-panel-inner">
                      <div className="faq-answer">
                        <p>Innvikta offers specialised modules designed for various departments—including HR, Customer Support, IT, and Finance. Each module translates complex DPDP rules (like consent notices, data principal rights, and secure processing) into everyday practical scenarios relevant to the employee&apos;s role.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                  <button type="button" className="faq-trigger" aria-expanded={activeFaq === 2} onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                    <span className="faq-question">Does Innvikta provide verifiable training reports for DPDP compliance audits?</span>
                    <div className="faq-icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-panel">
                    <div className="faq-panel-inner">
                      <div className="faq-answer">
                        <p>Yes. Innvikta&apos;s compliance dashboard generates audit-ready reports tracking employee participation, assessment scores, and completion rates. This provides concrete evidence of &quot;reasonable security safeguards&quot; to protect personal data as mandated under Section 8 of the DPDP Act.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                  <button type="button" className="faq-trigger" aria-expanded={activeFaq === 3} onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                    <span className="faq-question">How can enterprises start using Innvikta to train their workforce on DPDP rules?</span>
                    <div className="faq-icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-panel">
                    <div className="faq-panel-inner">
                      <div className="faq-answer">
                        <p>Organisations can deploy Innvikta&apos;s automated training platform to launch simulated phishing scenarios and interactive compliance modules across their entire workforce. With automatic reminders and custom risk scoring, you can build a strong privacy-first culture in days.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ==========================================
              7. FINAL CTA SECTION (Solutions CTA Integration)
              ========================================== */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight">
                    Ready to Build a DPDP Compliant Workforce?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Deploy role-based awareness modules and establish a robust privacy-first compliance culture across your team.
                  </p>
                  <div className="flex flex-row flex-nowrap justify-center gap-2 sm:gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link 
                      href="/start-free" 
                      className="btn bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm whitespace-nowrap" 
                      style={{ padding: "14px clamp(12px, 3vw, 28px)" }}
                    >
                      Start Free
                    </Link>
                    <Link 
                      href="/book-demo" 
                      className="btn bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm" 
                      style={{ padding: "14px clamp(12px, 3vw, 28px)" }}
                    >
                      Book a Demo <FiArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
                <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
                  <div className="animate-wave absolute inset-0 w-full h-full">
                    <ImageFallback
                      src="/images/wave.svg"
                      fill={true}
                      sizes="100vw"
                      alt="bg wave"
                    />
                  </div>
                  <Circle
                    className="left-[10%] top-12"
                    width={32}
                    height={32}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                  <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                  <Circle
                    className="left-[15%] bottom-[35%]"
                    width={47}
                    height={47}
                    fill={false}
                    fillValue="#FF5A1F"
                  />

                  <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                  <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fillValue="#FF5A1F" />
                  <Circle
                    className="right-[19%] bottom-[16%]"
                    width={51}
                    height={51}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </GSAPWrapper>
  );
}