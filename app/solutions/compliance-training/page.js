"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const ComplianceTrainingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);
  const journeyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-visual",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      ).fromTo(
        ".hero-bg-decor",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "<"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        // Animate path drawing via mask
        const maskPath = document.querySelector(".journey-mask-path");
        if (maskPath) {
          const pathLength = maskPath.getTotalLength();
          gsap.set(maskPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          });
          gsap.to(maskPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-right-col",
              start: "top 60%",
              end: "bottom 95%",
              scrub: 1.2
            }
          });
        }

        // Animate steps
        gsap.fromTo(
          ".journey-step",
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journey-steps-container",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Mobile
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".journey-step",
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journey-steps-container",
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, journeyRef);

    return () => ctx.revert();
  }, []);

  const faqData = [
    {
      question: "What regulations are covered in the Compliance Training Suite?",
      answer: "Innvikta covers DPDP, GDPR, HIPAA, PCI-DSS, AI Usage Policies, and custom internal policies through one unified learning journey."
    },
    {
      question: "Can compliance training be assigned role-wise?",
      answer: "Yes, learning paths can be assigned based on role and department, such as POSH for HR, anti-bribery for Finance, and privileged access for IT."
    },
    {
      question: "How are refresher campaigns triggered?",
      answer: "Refresher campaigns are sent automatically after policy updates, audits, security incidents, or when learning gaps are identified."
    },
    {
      question: "Are training records audit-ready?",
      answer: "Absolutely. Innvikta compiles dates, scores, completion logs, and policy acceptance records into exportable reports to satisfy external compliance audits."
    }
  ];

  const cardStyle = {
    background: "#FFFBF7",
    border: "1px solid #FFEAD4",
    borderRadius: "16px",
    padding: "1.25rem",
    display: "flex",
    height: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    textAlign: "center"
  };

  const iconWrapperStyle = {
    background: "#FFEFEA",
    display: "inline-flex",
    padding: "0.35rem",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    minWidth: "32px",
    minHeight: "32px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem"
  };

  const titleStyle = {
    marginTop: "0px",
    marginBottom: "0.25rem",
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#1E293B",
    minHeight: "0px",
    display: "block",
    textAlign: "center",
    lineHeight: "1.2"
  };

  const descStyle = {
    fontSize: "0.85rem",
    color: "#334155",
    marginTop: "0px",
    marginBottom: "0px",
    lineHeight: "1.4",
    minHeight: "0px",
    display: "block",
    textAlign: "center"
  };

  const sourceStyle = {
    fontSize: "0.6rem",
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: "0.5rem",
    marginBottom: "0px",
    display: "block",
    textAlign: "center"
  };

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">

          {/* 1. HERO SECTION */}
          <section className="hero-section">
            <div className="hero-outer-wrapper">
              
              {/* Background SVG Decor */}
              <div className="hero-bg-decor" aria-hidden="true">
                <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  
                  <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  
                  <circle cx="78" cy="198" r="5" fill="#FF7A00" />
                  <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
                  <circle cx="158" cy="308" r="4" fill="#FF7A00" />
                  <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
                  <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
                  <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
                  <circle cx="268" cy="338" r="4" fill="#FF7A00" />
                  <circle cx="188" cy="238" r="4" fill="#FF7A00" />
                  <circle cx="398" cy="78" r="5" fill="#FF7A00" />
                  <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
                  <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
                  <circle cx="488" cy="128" r="4" fill="#FF7A00" />
                  <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
                  <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
                  <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
                  <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
                  <circle cx="648" cy="110" r="4" fill="#FF7A00" />
                  <circle cx="638" cy="278" r="4" fill="#FF7A00" />
                  
                  <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>

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
                <div className="backdrop-shape shape-2">
                  <div className="shape-2-inner-1">
                    <svg width="100%" height="100%" viewBox="0 0 537 517" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M243.007 443.747L0.726096 516.282L295.51 69.4185L536.066 0.564209L243.007 443.747Z" fill="url(#paint0_linear_hero_2)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_2" x1="626.513" y1="479.564" x2="320.001" y2="-98.1139" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-2">
                    <svg width="100%" height="100%" viewBox="0 0 426 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M241.39 507.775L0.180044 612.19L185.387 100.986L425.875 0.00805664L241.39 507.775Z" fill="url(#paint0_linear_hero_3)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_3" x1="426.129" y1="607.122" x2="-243.854" y2="-82.0361" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-3">
                    <svg width="100%" height="100%" viewBox="0 0 313 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M259.325 543.891L0.873635 683.366L54.1947 136.437L312.926 0.0959473L259.325 543.891Z" fill="url(#paint0_linear_hero_4)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_4" x1="541.623" y1="465.932" x2="-672.11" y2="-514.628" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="shape-2-inner-4">
                    <svg width="100%" height="100%" viewBox="0 0 272 715" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M271.797 551.346L36.791 714.998L0.988926 160.822L236.664 0.241187L271.797 551.346Z" fill="#FF7A00" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="hero-content">
                  <span className="text-subheading">Compliance Training</span>
                  <h1 className="text-96-heading">Audit-ready. Built for Retention.</h1>

                  <div className="hero-text-wrapper">
                    <p className="text-20-content hero-paragraph">
                      Train employees across regulations, roles and policies with short, scenario-based modules — with measurable completion, reinforcement, and audit-ready evidence.
                    </p>
                  </div>

                  <div className="hero-actions-row">
                    <a className="btn btn-primary btn-cta" href="/contact">
                      <span className="hover-sweep"></span>
                      <span>Explore Our Platform</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </a>
                    <a className="btn btn-secondary" href="/book-demo">
                      <span>Book A Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Standard Bezel Hero Visual Frame */}
              <div className="container container-hero-visual">
                <div className="hero-visual">
                  <img src="/insat/images/dashboard_platform.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
                </div>
              </div>

            </div>
          </section>

        {/* 2. STATS ROW */}
        <section id="compliance-learning-suite" className="bg-white stats-section" style={{ paddingBottom: "5rem" }}>
            <div className="container">
              <div className="stats-grid">
                <div className="stats-content-block animate from-left">
                  <span className="text-subheading">COMPLIANCE TRAINING SUITE</span>
                  <h2 className="text-52-heading">
                    <span className="text-orange">Structured Journey.</span><br />
                    Satisfy Regulatory Audits.
                  </h2>

                  <div className="stats-subheading">
                    <p className="text-18-content">
                      Policies only work when employees understand them, remember them, and apply them in real situations. Innvikta helps organizations turn compliance requirements into structured learning journeys with measurable outcomes.
                    </p>
                    <p className="text-16-content" style={{ marginTop: "1rem", opacity: "0.8" }}>
                      Train employees across DPDP, GDPR, HIPAA, PCI-DSS and internal compliance policies through one structured platform.
                    </p>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <Link className="btn btn-primary btn-cta" href="/book-demo">
                      <span className="hover-sweep"></span>
                      <span>Explore Our Platform</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* 6-Card Bento Grid */}
                <div className="stats-cards-block animate from-right" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1.25fr", gap: "1rem", width: "100%" }}>
                  
                  {/* Card 1: DPDP (Col span 2) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>DPDP Act</h3>
                    <p className="card-description" style={descStyle}>Consent-based data processing rules mandated by India&apos;s data law.</p>
                    <span className="card-source" style={sourceStyle}>MANDATORY ACT</span>
                  </div>

                  {/* Card 2: GDPR (Col span 1) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a7 7 0 1 0 10 7" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>GDPR</h3>
                    <p className="card-description" style={descStyle}>Strict EU privacy mandates.</p>
                  </div>

                  {/* Card 3: HIPAA (Col span 1) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>HIPAA</h3>
                    <p className="card-description" style={descStyle}>Healthcare info privacy safeguards.</p>
                  </div>

                  {/* Card 4: PCI-DSS (Col span 2) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>PCI-DSS</h3>
                    <p className="card-description" style={descStyle}>Securing cardholder data and credit card transactions.</p>
                    <span className="card-source" style={sourceStyle}>VERSION 4.0 READY</span>
                  </div>

                  {/* Card 5: AI Usage Policy (Col span 2) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>AI Usage Policy</h3>
                    <p className="card-description" style={descStyle}>Responsible corporate guardrails for generative AI tool usage.</p>
                    <span className="card-source" style={sourceStyle}>AI SAFETY PROTOCOLS</span>
                  </div>

                  {/* Card 6: Internal Policies (Col span 1) */}
                  <div className="stats-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
                    <div className="card-icon-wrapper" style={iconWrapperStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <h3 className="card-title" style={titleStyle}>Internal Policies</h3>
                    <p className="card-description" style={descStyle}>POSH, conduct and customs.</p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* 3. COMPLIANCE JOURNEY SECTION */}
          <section id="audit-ready-evidence" className="bg-white" style={{ paddingTop: "4rem", paddingBottom: "5rem", position: "relative" }} ref={journeyRef}>
            <div className="container">
              <div className="journey-section-grid">
                
                {/* Left Column: Title & CTAs */}
                 <div className="journey-left-col animate">
                  <span className="text-subheading">FROM AWARENESS TO EVIDENCE</span>
                  <h2 className="text-52-heading" style={{ lineHeight: "1.2" }}>
                    <span style={{ display: "block", whiteSpace: "nowrap" }}>One Continuous</span>
                    <span style={{ display: "block", whiteSpace: "nowrap" }}>Compliance <span className="text-orange">Journey</span></span>
                  </h2>
                  <p className="text-18-content" style={{ opacity: "0.85", marginTop: "1.25rem", marginBottom: "2rem", color: "#334155", maxWidth: "480px" }}>
                    A structured, automated learning loop designed to satisfy regulatory audits, build lasting retention, and turn policy training into measurable employee behavior and audit-ready compliance evidence.
                  </p>
                  
                  <div className="journey-btn-group">
                    <Link className="btn btn-primary btn-cta" href="/book-demo">
                      <span className="hover-sweep"></span>
                      <span>Book A Demo</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Staggered Cards & Wave */}
                <div className="journey-right-col">
                  {/* Dotted Snake Connecting SVG */}
                  <div className="journey-wave-container">
                    <svg className="journey-wave-svg" viewBox="0 0 850 780" preserveAspectRatio="none">
                      <defs>
                        <mask id="journey-mask">
                          <path className="journey-mask-path" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </mask>
                      </defs>
                      <path className="journey-path-bg" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" />
                      <path className="journey-path-active" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" mask="url(#journey-mask)" />
                      <circle cx="142" cy="20" r="4.5" fill="#f15a24" />
                      <circle cx="426" cy="696" r="4.5" fill="#f15a24" />
                    </svg>
                  </div>

                  {/* Staggered Cards Grid */}
                  <div className="journey-steps-container">
                    
                    {/* Step 1: Train */}
                    <div className="journey-step step-1">
                      <div className="journey-badge">1</div>
                      <div className="journey-card">
                        <div className="journey-card-header">
                          <div className="journey-card-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                          </div>
                          <h3 className="journey-card-title">Train</h3>
                        </div>
                        <p className="journey-card-desc">Deliver role-based training that builds awareness and knowledge.</p>
                      </div>
                    </div>

                    {/* Step 2: Assess */}
                    <div className="journey-step step-2">
                      <div className="journey-badge">2</div>
                      <div className="journey-card">
                        <div className="journey-card-header">
                          <div className="journey-card-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </div>
                          <h3 className="journey-card-title">Assess</h3>
                        </div>
                        <p className="journey-card-desc">Evaluate understanding with scenario-based assessments.</p>
                      </div>
                    </div>

                    {/* Step 3: Reinforce */}
                    <div className="journey-step step-3">
                      <div className="journey-badge">3</div>
                      <div className="journey-card">
                        <div className="journey-card-header">
                          <div className="journey-card-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
                            </svg>
                          </div>
                          <h3 className="journey-card-title">Reinforce</h3>
                        </div>
                        <p className="journey-card-desc">Reinforce learning with microlearning, nudges, and spaced repetition.</p>
                      </div>
                    </div>

                    {/* Step 4: Evidence */}
                    <div className="journey-step step-4">
                      <div className="journey-badge">4</div>
                      <div className="journey-card">
                        <div className="journey-card-header">
                          <div className="journey-card-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <path d="M9 10h6M9 14h6" />
                            </svg>
                          </div>
                          <h3 className="journey-card-title">Evidence</h3>
                        </div>
                        <p className="journey-card-desc">Automatically generate reports, completion records, and compliance evidence.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 4. TWO-COLUMN GRID (ROLE-BASED COMPLIANCE LEARNING) */}
          <section className="bg-grey-5">
            <div className="container">
              <div className="two-col-grid">
                <div className="two-col-content-block animate from-left">
                  <span className="text-subheading">ROLE-BASED COMPLIANCE LEARNING</span>
                  <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                    Relevant Training for the <span className="text-orange">Right Employees</span>
                  </h2>
                  <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                    Assign AI-assisted learning paths based on department, role, location, policy exposure, or risk profile.
                  </p>
                  
                  <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: 0, listStyle: "none" }}>
                    {[
                      {
                        role: "HR",
                        desc: "Employee data, POSH, background checks, workplace conduct, and confidentiality.",
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        )
                      },
                      {
                        role: "Finance",
                        desc: "Invoice fraud, payment approvals, anti-bribery, vendor risk, and financial data handling.",
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                        )
                      },
                      {
                        role: "IT",
                        desc: "Access control, incident reporting, security policies, privileged accounts, and data protection.",
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                        )
                      },
                      {
                        role: "Sales & Customer Teams",
                        desc: "Customer data, consent, CRM usage, confidentiality, and responsible communication.",
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        )
                      },
                      {
                        role: "Leadership",
                        desc: "Governance, regulatory accountability, breach escalation, ethics, and reputational risk.",
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        )
                      }
                    ].map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                        <span style={{ color: "#F15A24", marginTop: "0.25rem", flexShrink: 0, display: "inline-flex" }}>{item.icon}</span>
                        <span>
                          <strong style={{ color: "#000" }}>{item.role}:</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right">
                  <img 
                    alt="Role-Based Compliance Assignment UI" 
                    loading="lazy" 
                    src="/insat/images/awareness-section3.png" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 5. REPORTS & INSIGHTS (REFRESHER & AUDIT-READY RECORDS) */}
          <section id="refresher-campaigns" className="bg-white" style={{ position: "relative" }}>
            <div id="acknowledgement-tracking" style={{ position: "absolute", top: "-80px" }}></div>
            <div className="container">
              <div className="two-col-grid" style={{ marginTop: "0rem" }}>
                
                {/* Left Side: 6 Campaign Cards */}
                <div className="two-col-content-block animate from-left" style={{ maxWidth: "540px" }}>
                  <span className="text-subheading">REFRESHER & REINFORCEMENT CAMPAIGNS</span>
                  <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                    Keep <span className="text-orange">Compliance</span> Alive
                  </h2>
                  <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6", color: "#334155" }}>
                    Compliance knowledge fades when it is not reinforced. Innvikta helps teams send timely refresher campaigns after policy updates, audits, incidents, or identified learning gaps.
                  </p>
                  
                   <div className="reports-insight-grid">
                    {[
                      {
                        title: "Short refresher modules",
                        desc: "Quick bite-sized micro-courses",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                        )
                      },
                      {
                        title: "Policy update campaigns",
                        desc: "Sent when internal rules update",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        )
                      },
                      {
                        title: "Department-wise reinforcement",
                        desc: "Tailored to high-risk roles",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        )
                      },
                      {
                        title: "Targeted reminders",
                        desc: "Nudges for incomplete training",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                        )
                      },
                      {
                        title: "Scenario-based policy recall",
                        desc: "Verifies knowledge retention",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        )
                      },
                      {
                        title: "Periodic compliance training",
                        desc: "Assigned to high-risk user groups",
                        icon: (
                          <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        )
                      }
                    ].map((card, idx) => (
                      <div key={idx} className="reports-insight-card">
                        <div className="reports-insight-icon-container">
                          {card.icon}
                        </div>
                        <div className="reports-insight-text-wrapper">
                          <h4 className="reports-insight-title">{card.title}</h4>
                          <p className="reports-insight-desc">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Side: Mockup Report Preview with KPIs & Table */}
                <div className="two-col-visual-block animate from-right" style={{ background: "transparent" }}>
                  <div style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                  }}>
                    {/* Mockup Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ color: "#F15A24" }}>
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 17h6M9 12h6M9 7h6" />
                          </svg>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>Audit-Ready Records</span>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#10B981", fontWeight: 700, backgroundColor: "#E6F4EA", padding: "0.25rem 0.6rem", borderRadius: "9999px" }}>EXPORT COMPLETE</span>
                    </div>

                    {/* KPI Metrics */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                      {[
                        { label: "COMPLETION", val: "87%", diff: "↑ 12%", color: "#10B981" },
                        { label: "ACCEPTANCE", val: "92%", diff: "↑ 6%", color: "#10B981" },
                        { label: "CAMPAIGNS", val: "12", diff: "Active", color: "#F15A24" },
                        { label: "EVIDENCE", val: "100%", diff: "Audited", color: "#10B981" }
                      ].map((kpi, idx) => (
                        <div key={idx} style={{ border: "1px solid #F1F5F9", borderRadius: "8px", padding: "0.6rem" }}>
                          <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#64748B" }}>{kpi.label}</div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.15rem" }}>
                            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>{kpi.val}</span>
                            <span style={{ fontSize: "0.55rem", color: kpi.color, fontWeight: 600 }}>{kpi.diff}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontSize: "0.7rem", textTransform: "uppercase" }}>
                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Framework</th>
                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Audience</th>
                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Completion</th>
                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "DPDP Awareness", team: "HR Team", rate: "94%", status: "Completed", color: "#15803D", bg: "#DCFCE7" },
                            { name: "GDPR Training", team: "All Staff", rate: "87%", status: "Active", color: "#B45309", bg: "#FEF3C7" },
                            { name: "PCI-DSS Compliance", team: "Finance", rate: "100%", status: "Completed", color: "#15803D", bg: "#DCFCE7" },
                            { name: "AI Usage Policy", team: "Developers", rate: "65%", status: "Draft", color: "#475569", bg: "#F1F5F9" }
                          ].map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #F1F5F9", color: "#334155" }}>
                              <td style={{ padding: "0.8rem 0.5rem", fontWeight: 600, color: "#1E293B" }}>{row.name}</td>
                              <td style={{ padding: "0.8rem 0.5rem" }}>{row.team}</td>
                              <td style={{ padding: "0.8rem 0.5rem", fontWeight: 700 }}>{row.rate}</td>
                              <td style={{ padding: "0.8rem 0.5rem" }}>
                                <span style={{ backgroundColor: row.bg, color: row.color, padding: "0.2rem 0.4rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 6. FAQ SECTION */}
          <section className="bg-grey-5">
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading">We’re here to help</h2>
                <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Learn more</span>
                </a>
              </div>

              <div className="faq-list-col animate from-right">
                {faqData.map((faq, index) => (
                  <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                    <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-question">{faq.question}</span>
                      <div className="faq-icon-wrapper">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                          <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                        </svg>
                      </div>
                    </button>
                    <div className="faq-panel" style={{ maxHeight: activeFaq === index ? "120px" : "0px", opacity: activeFaq === index ? 1 : 0, transition: "all 0.3s ease", overflow: "hidden" }}>
                      <div className="faq-panel-inner">
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FINAL CTA SECTION */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight">
                    Ready to Make Compliance Training Measurable?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Deliver policy learning, reinforce expected behaviour, and maintain audit-ready evidence from one unified platform.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/book-demo" className="btn btn-primary">
                      Start Free
                    </Link>
                    <Link href="/contact" className="btn btn-outline-primary">
                      Explore Platform
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
                  <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
                  <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                  <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
                  <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                  <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
                  <Circle className="right-[19%] bottom-[16%]" width={37} height={37} fill={false} fillValue="#FF5A1F" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default ComplianceTrainingPage;
