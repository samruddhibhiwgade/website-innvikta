"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const coreCards = [
  {
    title: "Risk Scoring",
    desc: "AI-assisted user and team risk scores based on clicks, reports, quiz results, and repeated risky behaviour.",
    image: "/images/features-01.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 0-10 10c0 2.2.72 4.23 1.94 5.86L6.5 15.3A6 6 0 0 1 12 8a6 6 0 0 1 5.5 7.3l2.56 2.56A10 10 0 0 0 12 2z" />
        <line className="meter-needle" x1="12" y1="14" x2="16" y2="10" stroke="#f15a24" strokeWidth="2" />
        <circle cx="12" cy="14" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Department Heatmaps",
    desc: "Spot vulnerable teams, weak locations, and training gaps at a glance.",
    image: "/images/features-02.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle className="heatmap-dot dot-1" cx="12" cy="6" r="3" fill="#f15a24" />
        <path d="M12 9v3M6 12h12M6 12v5M18 12v5" />
        <circle className="heatmap-dot dot-2" cx="6" cy="18" r="3" fill="#f15a24" />
        <circle className="heatmap-dot dot-3" cx="18" cy="18" r="3" fill="#f15a24" />
      </svg>
    )
  },
  {
    title: "Executive Reporting",
    desc: "Generate clear, board-ready reports for CISOs, leadership, and compliance teams.",
    image: "/images/features-01.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="report-doc" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line className="report-line line-1" x1="8" y1="13" x2="16" y2="13" />
        <line className="report-line line-2" x1="8" y1="17" x2="14" y2="17" />
      </svg>
    )
  },
  {
    title: "Pre/Post Analysis",
    desc: "Compare risk before and after campaigns to show training impact and improvement.",
    image: "/images/features-02.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path className="analysis-arrow" d="M3 10l9-6 9 6" stroke="#f15a24" />
      </svg>
    )
  }
];

const HumanRiskIntelligencePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);
  
  // Interactive core cards states
  const [activeCoreCard, setActiveCoreCard] = useState(0);
  const [coreCardImages, setCoreCardImages] = useState({
    current: "/images/features-01.png",
    prev: null
  });

  useEffect(() => {
    const nextImg = activeCoreCard !== null ? coreCards[activeCoreCard].image : "/images/features-01.png";
    if (nextImg !== coreCardImages.current) {
      setCoreCardImages((prev) => ({
        prev: prev.current,
        current: nextImg
      }));
    }
  }, [activeCoreCard]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#risk-scoring") {
        setActiveCoreCard(0);
      } else if (hash === "#department-heatmaps") {
        setActiveCoreCard(1);
      } else if (hash === "#executive-reporting") {
        setActiveCoreCard(2);
      } else if (hash === "#pre-post-analysis") {
        setActiveCoreCard(3);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const faqData = [
    {
      question: "How does the platform calculate user and department risk scores?",
      answer: "Our AI-powered engine aggregates signals from simulated phishing click rates, active report rates, cybersecurity awareness quiz performance, and repeated risky behaviours. These are weighted dynamically to assign scores between 0 (Lowest Risk) and 100 (Highest Risk)."
    },
    {
      question: "Can we export these reports to share with compliance auditors?",
      answer: "Yes. Every report generated can be downloaded in audit-ready PDF formats containing telemetry metrics and action plans. They serve as defensible evidence for compliance audits like SOC 2, ISO 27001, and HIPAA."
    },
    {
      question: "How often are the risk analytics and heatmaps updated?",
      answer: "All metrics, heatmaps, and risk intelligence dashboards update in real time as employees complete training courses, report simulations, or take action in active phishing campaigns."
    },
    {
      question: "What compliance standards does your human risk dashboard cover?",
      answer: "InSAT compiles comprehensive, audit-ready compliance records and human risk telemetry matching global frameworks, including SOC 2 Type II, ISO 27001, GDPR, and India's DPDP Act."
    }
  ];

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
                        <span className="text-subheading">HUMAN BEHAVIOUR & RISK ANALYTICS</span>
                        <h1 className="text-96-heading">AI-Powered Human Risk Intelligence</h1>

                        <div className="hero-text-wrapper">
                            <p className="text-20-content hero-paragraph">
                                Uncover risky users, weak teams, behaviour trends, and training gaps — before they become incidents.
                            </p>
                        </div>

                        <div className="hero-actions-row">
                            <Link className="btn btn-primary btn-cta" href="/contact">
                                <span className="hover-sweep"></span>
                                <span>Start Free</span>
                                <div className="arrow-wrapper">
                                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </Link>
                            <Link className="btn btn-secondary" href="/book-demo">
                                <span>Book A Demo</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container container-hero-visual">
                    <div className="hero-visual">
                        <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
                    </div>
                </div>

            </div>
        </section>

        {/* 2. STATS ROW */}
        <section className="bg-white stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div className="stats-content-block animate from-left">
                        <h2 className="text-52-heading"><span className="text-orange">Human Risk</span> Is Still the Weakest Link</h2>

                        <div className="stats-subheading">
                            <p className="text-18-content">
                                Most security programs track completion. Effective security programs track behaviour. InSAT helps organizations measure human risk, improve engagement, and turn awareness efforts into measurable outcomes.
                            </p>
                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <Link className="btn btn-primary btn-cta" href="/book-demo">
                                <span>Book A Demo</span>
                                <div className="arrow-wrapper">
                                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="stats-cards-block animate from-right">
                        {/* Card 1: Human Element */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="card-number">68%</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Human Element in Breaches</h3>
                            <p className="card-description">of breaches involve a non-malicious human element</p>
                            <span className="card-source">Source: Verizon DBIR</span>
                            <div className="card-chart">
                                <div className="bar-chart">
                                    <div className="bar" style={{height: '40%'}}></div>
                                    <div className="bar" style={{height: '90%'}}></div>
                                    <div className="bar" style={{height: '60%'}}></div>
                                    <div className="bar" style={{height: '100%'}}></div>
                                    <div className="bar" style={{height: '75%'}}></div>
                                    <div className="bar" style={{height: '50%'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Risky Actions */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="card-number">71%</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Risky Actions Online</h3>
                            <p className="card-description">of employees admit to taking risky actions online</p>
                            <span className="card-source">Source: Proofpoint</span>
                            <div className="card-chart">
                                <div className="progress-circle">
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="32" stroke="#FFF0E4" strokeWidth="6" fill="transparent" />
                                        <circle cx="40" cy="40" r="32" stroke="#f15a24" strokeWidth="6" fill="transparent" 
                                                strokeDasharray="201" strokeDashoffset="58" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                                    </svg>
                                    <span className="progress-text">71%</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Global Cost */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="12" y1="1" x2="12" y2="23" stroke="#f15a24" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M17 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H7" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="card-number">$4.44M</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Average Global Breach Cost</h3>
                            <p className="card-description">average global cost of a data breach</p>
                            <span className="card-source">Source: IBM</span>
                            <div className="card-chart">
                                <svg className="wave-chart" width="100%" height="60" viewBox="0 0 200 60">
                                    <path d="M 0 45 Q 25 50 50 38 T 100 28 T 150 45 T 200 12" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M 0 45 Q 25 50 50 38 T 100 28 T 150 45 T 200 12 L 200 60 L 0 60 Z" fill="rgba(241, 90, 36, 0.06)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 2b. SOLUTION SECTION (Interactive Accordion Layout) */}
        <section id="risk-scoring" className="bg-white" style={{ position: "relative" }}>
            <div id="department-heatmaps" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="executive-reporting" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="pre-post-analysis" style={{ position: "absolute", top: "-80px" }}></div>
            <div className="container">
                <div className="animate mb-12">
                    <span className="text-subheading">RISK INTELLIGENCE CAPABILITIES</span>
                    <h2 className="text-52-heading">Turn Awareness Data into Actionable Risk Intelligence</h2>
                    <div style={{ marginTop: "1rem", opacity: "0.7" }}>
                        <p className="text-18-content">
                            InSAT converts training, simulation, quiz, and behaviour signals into AI-assisted insights your teams can act on.
                        </p>
                    </div>
                </div>

                <div className="modern-simulations-grid" style={{ marginTop: "3.5rem" }}>
                    {/* Left Accordion Column */}
                    <div className="simulation-accordion-list animate from-left">
                        {coreCards.map((vector, index) => {
                            const active = activeCoreCard === index;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveCoreCard(index)}
                                    className={`simulation-accordion-item ${active ? "active" : ""}`}
                                >
                                    <div className="sim-icon-container">
                                        {vector.icon(active)}
                                    </div>
                                    <div className="sim-text-content">
                                        <h3 className="sim-title">{vector.title}</h3>
                                        <div 
                                            className="sim-desc-wrapper" 
                                            style={{ 
                                                maxHeight: active ? "120px" : "0px",
                                                opacity: active ? 1 : 0
                                            }}
                                        >
                                            <p className="sim-desc">{vector.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Bezel Frame Column */}
                    <div className="animate from-right">
                        <div className="platform-bezel-frame">
                            <div className="frame-inner" style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                                {coreCardImages.prev && (
                                    <img 
                                        key={coreCardImages.prev + "_prev"}
                                        src={coreCardImages.prev} 
                                        alt="Previous simulation screenshot"
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                        className="animate-image-fade-out"
                                    />
                                )}
                                <img 
                                    key={coreCardImages.current + "_current"}
                                    src={coreCardImages.current} 
                                    alt={activeCoreCard !== null ? coreCards[activeCoreCard].title : "Actionable Risk Intelligence"} 
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                    className="animate-image-fade-in"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. AI-GENERATED REPORTS SECTION */}
        <section className="bg-grey-5">
            <div className="container">
                <div className="two-col-grid">
                    <div className="two-col-content-block animate from-left">
                        <span className="text-subheading">AI-GENERATED REPORTS</span>
                        <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                            Reports for <span style={{ color: "#f15a24" }}>Every</span> <br />
                            <span style={{ color: "#f15a24" }}>Decision Maker</span>
                        </h2>
                        <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                            Create AI-generated reports tailored for departments, managers, executives, board reviews, and compliance evidence.
                        </p>
                        
                        <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: 0, listStyle: "none", marginTop: "2rem" }}>
                            {[
                                {
                                    title: "Department Reports",
                                    desc: "Detailed threat susceptibility and risk score metrics segmented by business units to identify vulnerable teams.",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Manager Reports",
                                    desc: "Actionable dashboard views for team leads to monitor training completions, active quiz scores, and department progress.",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 3h-6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Executive Reports",
                                    desc: "High-level summary dashboards tracking company-wide security posture, repeat risky users, and threat trends.",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="20" x2="18" y2="10" />
                                            <line x1="12" y1="20" x2="12" y2="4" />
                                            <line x1="6" y1="20" x2="6" y2="14" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Board Reports",
                                    desc: "Defensible evidence demonstrating security training ROI, continuous improvement rates, and overall risk reduction.",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Compliance Reports",
                                    desc: "Audit-ready evidence logs mapped to major global compliance standards, including SOC 2, ISO 27001, and HIPAA.",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="M9 11l3 3 5-5" />
                                        </svg>
                                    )
                                }
                             ].map((point, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                                    {point.icon}
                                    <span style={{ fontSize: "1.05rem", color: "#334155" }}>
                                        <strong style={{ color: "#1F2937", marginRight: "0.35rem" }}>{point.title}:</strong>
                                        <span style={{ color: "#4B5563" }}>{point.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
 
                    <div className="two-col-visual-block animate from-right" style={{ background: "transparent" }}>
                        <div style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #E2E8F0",
                            borderRadius: "16px",
                            padding: "1.75rem",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                        }}>
                            {/* Card Header */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ color: "#F15A24" }}>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>Human Risk Reports</span>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <span style={{ fontSize: "0.8rem", backgroundColor: "#F1F5F9", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#475569", fontWeight: 600, cursor: "pointer" }}>All Reports</span>
                                    <span style={{ fontSize: "0.8rem", backgroundColor: "#FFEBE0", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>AI-Generated</span>
                                </div>
                            </div>
                            
                            {/* KPI Metrics Row */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                {[
                                    { label: "RISK POSTURE", val: "Medium", diff: "↑ 5% this month", color: "#EF4444", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                                    )},
                                    { label: "VULNERABLE TEAMS", val: "3", diff: "HR, Fin, Sales", color: "#EF4444", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    )},
                                    { label: "AVG RISK SCORE", val: "42", diff: "↓ 12%", color: "#10B981", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                                    )},
                                    { label: "COMPLIANCE STATUS", val: "94%", diff: "↑ 4%", color: "#10B981", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                                    )}
                                ].map((kpi, idx) => (
                                    <div key={idx} style={{ border: "1px solid #F1F5F9", borderRadius: "8px", padding: "0.6rem", display: "flex", gap: "0.5rem" }}>
                                        <div style={{ color: "#F15A24", marginTop: "0.15rem" }}>{kpi.icon}</div>
                                        <div>
                                            <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.02em" }}>{kpi.label}</div>
                                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.15rem" }}>
                                                <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>{kpi.val}</span>
                                                <span style={{ fontSize: "0.6rem", color: kpi.color, fontWeight: 600 }}>{kpi.diff}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Table */}
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Report Title</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Target Audience</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Risk Focus</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Status</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Generated</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { 
                                                name: "Department Susceptibility Audit", 
                                                target: "All Departments", 
                                                targetBg: "#EFF6FF", 
                                                targetColor: "#1D4ED8",
                                                risk: "• High Risk", 
                                                riskColor: "#EF4444", 
                                                status: "Ready", 
                                                statusBg: "#DCFCE7", 
                                                statusColor: "#15803D",
                                                updated: "5m ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                            },
                                            { 
                                                name: "Executive Posture Summary", 
                                                target: "Board & CISOs", 
                                                targetBg: "#FAF5FF", 
                                                targetColor: "#7E22CE",
                                                risk: "• Medium Risk", 
                                                riskColor: "#F59E0B", 
                                                status: "Ready", 
                                                statusBg: "#DCFCE7", 
                                                statusColor: "#15803D",
                                                updated: "1h ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                            },
                                            { 
                                                name: "Compliance Attestation Log", 
                                                target: "SOC 2 Auditors", 
                                                targetBg: "#F0FDF4", 
                                                targetColor: "#166534",
                                                risk: "• Low Risk", 
                                                riskColor: "#10B981", 
                                                status: "Ready", 
                                                statusBg: "#DCFCE7", 
                                                statusColor: "#15803D",
                                                updated: "3h ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l3 3 5-5"/></svg>
                                            },
                                            { 
                                                name: "Risk Mitigation Roadmap", 
                                                target: "Security Team", 
                                                targetBg: "#EFF6FF", 
                                                targetColor: "#1D4ED8",
                                                risk: "• Medium Risk", 
                                                riskColor: "#F59E0B", 
                                                status: "Draft", 
                                                statusBg: "#F1F5F9", 
                                                statusColor: "#475569",
                                                updated: "1d ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                            }
                                        ].map((row, rIdx) => (
                                            <tr key={rIdx} style={{ borderBottom: "1px solid #F1F5F9", color: "#334155" }}>
                                                <td style={{ padding: "0.75rem 0.5rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <span style={{ color: "#94A3B8" }}>{row.icon}</span>
                                                    <span>{row.name}</span>
                                                </td>
                                                <td style={{ padding: "0.75rem 0.5rem" }}>
                                                    <span style={{ backgroundColor: row.targetBg, color: row.targetColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                                                        {row.target}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "0.75rem 0.5rem", color: row.riskColor, fontWeight: 600 }}>{row.risk}</td>
                                                <td style={{ padding: "0.75rem 0.5rem" }}>
                                                    <span style={{ backgroundColor: row.statusBg, color: row.statusColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "0.75rem 0.5rem", color: "#64748B" }}>{row.updated}</td>
                                                <td style={{ padding: "0.75rem 0.5rem", color: "#94A3B8", cursor: "pointer", textAlign: "right" }}>
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="12" cy="5" r="1"/>
                                                        <circle cx="12" cy="19" r="1"/>
                                                    </svg>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Footer */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", fontSize: "0.75rem", color: "#94A3B8" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>
                                    <span>View all reports</span>
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                        <polyline points="12 5 19 12 12 19"/>
                                    </svg>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    <span>Last updated: 2 min ago</span>
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 4v6h-6M1 20v-6h6M21.94 9.57a8.91 8.91 0 0 0-4.48-5.32 9 9 0 0 0-9.67.6L2 9m20 5l-5.74 5.74a9 9 0 0 1-9.67.6 8.91 8.91 0 0 1-4.48-5.32"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. AI RECOMMENDATIONS SECTION */}
        <section className="bg-white">
            <div className="container">
                <div className="two-col-grid" style={{ alignItems: "start" }}>
                    
                    {/* Left Column: Heading, Description, and 2x2 Cards Grid */}
                    <div className="two-col-content-block animate from-left" style={{ maxWidth: "580px" }}>
                        <span className="text-subheading">AI RECOMMENDATIONS</span>
                        <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                            Know What to <span style={{ color: "#f15a24" }}>Fix Next</span>
                        </h2>
                        <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                            AI-assisted recommendations help teams prioritize users, departments, campaigns, and reinforcement actions.
                        </p>

                        {/* 2x2 Grid of cards */}
                        <div className="reports-insight-grid">
                            {[
                                {
                                    title: "High-Risk Users",
                                    desc: "Assign targeted microlearning.",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                            <line x1="12" y1="9" x2="12" y2="13"/>
                                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: "Weak Departments",
                                    desc: "Launch role-based simulations.",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: "Repeat Clickers",
                                    desc: "Trigger reinforcement campaigns.",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: "Leadership",
                                    desc: "Generate executive summaries.",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                            <line x1="16" y1="13" x2="8" y2="13"/>
                                            <line x1="16" y1="17" x2="8" y2="17"/>
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

                    {/* Right Column: Dashboard Mockup */}
                    <div className="two-col-visual-block animate from-right" style={{ background: "transparent" }}>
                        <div style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #E2E8F0",
                            borderRadius: "16px",
                            padding: "1.75rem",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                        }}>
                            {/* Card Header */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ color: "#F15A24" }}>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                                        </svg>
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>AI Auto-Pilot Actions</span>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <span style={{ fontSize: "0.8rem", backgroundColor: "#FFEBE0", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>Recommendations</span>
                                </div>
                            </div>

                            {/* KPI Metrics Row */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                {[
                                    { label: "AUTO-RESOLVED", val: "84%", diff: "↑ 12%", color: "#10B981", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                                    )},
                                    { label: "PENDING ACTIONS", val: "4", diff: "High priority", color: "#EF4444", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                                    )},
                                    { label: "IMPACT FORECAST", val: "+18%", diff: "Risk reduction", color: "#10B981", icon: (
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                                    )}
                                ].map((kpi, idx) => (
                                    <div key={idx} style={{ border: "1px solid #F1F5F9", borderRadius: "8px", padding: "0.6rem", display: "flex", gap: "0.5rem" }}>
                                        <div style={{ color: "#F15A24", marginTop: "0.15rem" }}>{kpi.icon}</div>
                                        <div>
                                            <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.02em" }}>{kpi.label}</div>
                                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.15rem" }}>
                                                <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>{kpi.val}</span>
                                                <span style={{ fontSize: "0.55rem", color: kpi.color, fontWeight: 600 }}>{kpi.diff}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recommendation Logs */}
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Recommendation</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Auto-Trigger Action</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Status</th>
                                            <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Triggered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { 
                                                name: "High-Risk Users Detected", 
                                                action: "Deploy targeted microlearning", 
                                                status: "Active", 
                                                statusBg: "#FFEBE0", 
                                                statusColor: "#F15A24",
                                                time: "2m ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                                            },
                                            { 
                                                name: "Finance Click Rate Spike", 
                                                action: "Launch role-based simulations", 
                                                status: "Pending", 
                                                statusBg: "#F1F5F9", 
                                                statusColor: "#475569",
                                                time: "15m ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                                            },
                                            { 
                                                name: "Repeat Phishing Clickers", 
                                                action: "Trigger reinforcement campaign", 
                                                status: "Completed", 
                                                statusBg: "#DCFCE7", 
                                                statusColor: "#15803D",
                                                time: "1h ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                                            },
                                            { 
                                                name: "Leadership Posture Review", 
                                                action: "Generate executive summary", 
                                                status: "Completed", 
                                                statusBg: "#DCFCE7", 
                                                statusColor: "#15803D",
                                                time: "3h ago",
                                                icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                                            }
                                        ].map((row, rIdx) => (
                                            <tr key={rIdx} style={{ borderBottom: "1px solid #F1F5F9", color: "#334155" }}>
                                                <td style={{ padding: "0.75rem 0.5rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <span style={{ color: "#94A3B8" }}>{row.icon}</span>
                                                    <span>{row.name}</span>
                                                </td>
                                                <td style={{ padding: "0.75rem 0.5rem", color: "#475569" }}>{row.action}</td>
                                                <td style={{ padding: "0.75rem 0.5rem" }}>
                                                    <span style={{ backgroundColor: row.statusBg, color: row.statusColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "0.75rem 0.5rem", color: "#64748B" }}>{row.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Footer */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", fontSize: "0.75rem", color: "#94A3B8" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>
                                    <span>Manage all recommendations</span>
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                        <polyline points="12 5 19 12 12 19"/>
                                    </svg>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    <span>Last updated: 5 min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 10. FAQ SECTION */}
        <section className="bg-grey-5">
            <div className="container faq-grid">
                <div className="faq-title-col animate from-left">
                    <h2 className="text-40-heading">We’re here to help</h2>
                    <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{marginTop: "1.25rem"}}>
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
                            <div className="faq-panel" style={{ maxHeight: activeFaq === index ? "120px" : "0px", opacity: activeFaq === index ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.4s ease", overflow: "hidden" }}>
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

        {/* 11. FINAL CTA SECTION (MATCHES PHISHING SIMULATION EXACTLY) */}
        <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight">
                    Ready to See Human Risk Clearly?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Use AI-assisted intelligence to uncover, prioritize, and reduce workforce risk.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/book-demo" className="btn btn-primary">
                      Book A Demo
                    </Link>
                    <Link href="/contact" className="btn btn-outline-primary">
                      Start Free
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
                  <Circle
                    className="right-[2%] bottom-[30%]"
                    width={73}
                    height={73}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                  <Circle
                    className="right-[19%] bottom-[16%]"
                    width={37}
                    height={37}
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
};

export default HumanRiskIntelligencePage;
