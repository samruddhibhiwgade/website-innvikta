"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const customizedCards = [
  {
    title: "Your Policies",
    desc: "We align with your real policies, controls, and compliance requirements.",
    bullets: ["Internal policies & SOPs", "Compliance frameworks", "Security controls"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  },
  {
    title: "Your People",
    desc: "We adapt to your teams, roles, and behaviors to make learning relevant.",
    bullets: ["Roles & responsibilities", "Department workflows", "Knowledge & skill gaps"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Your Risks",
    desc: "We focus on the threats and priorities that matter most to your business.",
    bullets: ["Threat landscape", "Regulatory obligations", "Business risk priorities"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    title: "Customized Awareness Program",
    desc: "A tailored learning experience that drives awareness, builds better behavior, and delivers measurable impact.",
    bullets: ["Relevant for every employee", "Actionable & role-specific", "Measurable & audit-ready"],
    highlight: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    )
  }
];

const policyCards = [
  {
    title: "InfoSec Policies",
    desc: "Modules on password rules, access control, phishing reporting, and data handling.",
    image: "/insat/images/phishing_simulation.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="lock-body" x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path className="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    title: "Data Privacy",
    desc: "Modules on DPDP, GDPR, consent, personal data use, sharing limits, and breach escalation.",
    image: "/insat/images/security_training.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="privacy-shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "Incident Reporting",
    desc: "Modules on decision-based situations and reporting channels.",
    image: "/insat/images/microlearning.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="alert-triangle" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line className="alert-line" x1="12" y1="9" x2="12" y2="13" />
        <line className="alert-dot" x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    title: "Device Usage",
    desc: "Modules on laptops, mobiles, USBs, public Wi-Fi, and remote work.",
    image: "/insat/images/phishing_simulation_v2.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="device-screen" x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line className="device-stand-base" x1="8" y1="21" x2="16" y2="21" />
        <line className="device-stand" x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    title: "HR Policies",
    desc: "Modules on confidentiality, employee data, POSH and workplace conduct.",
    image: "/insat/images/security_training_v2.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="hr-user-right" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle className="hr-user-head" cx="9" cy="7" r="4" />
        <path className="hr-user-left-1" d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path className="hr-user-left-2" d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Finance Approvals",
    desc: "Modules on fake vendors, payment fraud, invoice manipulation, and CEO fraud.",
    image: "/insat/images/microlearning_v2.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line className="finance-line" x1="12" y1="1" x2="12" y2="23" />
        <path className="finance-dollar" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

const CustomizedSolutionsPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePolicy, setActivePolicy] = useState(0);
  const [displayImages, setDisplayImages] = useState({
    current: "/insat/images/phishing_simulation.png",
    prev: null
  });

  useEffect(() => {
    const nextImg = activePolicy !== null ? policyCards[activePolicy].image : "/insat/images/phishing_simulation.png";
    if (nextImg !== displayImages.current) {
      setDisplayImages((prev) => ({
        prev: prev.current,
        current: nextImg
      }));
    }
  }, [activePolicy]);

  const heroRef = useRef(null);

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
                  <span className="text-subheading">CUSTOMIZED SECURITY AWARENESS</span>
                  <h1 className="text-96-heading">Awareness Built Around Your Organization</h1>

                  <div className="hero-text-wrapper">
                    <p className="text-20-content hero-paragraph">
                      Custom security awareness programs, simulations, and compliance learning aligned to your policies, procedures, roles, risks, and culture.
                    </p>
                  </div>

                  <div className="hero-actions-row">
                    <Link className="btn btn-primary btn-cta" href="/demo">
                      <span className="hover-sweep"></span>
                      <span>Book a Demo</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="container container-hero-visual">
                <div className="hero-visual">
                  <img src="/insat/images/platform.png" alt="Customized Security Awareness Platform" className="hero-platform-img" />
                </div>
              </div>

            </div>
          </section>

          {/* 2. OVERVIEW & RISK REALITY (Stats Row Layout) */}
          <section className="bg-white stats-section" style={{ paddingBottom: "5rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Text & CTA */}
                <div className="lg:col-span-5 stats-content-block animate from-left">
                  <span className="text-subheading">RISK REALITY</span>
                  <h2 className="text-52-heading" style={{ lineHeight: "1.2" }}>
                    Because Every <br/>
                    Organization Has Its <br/>
                    Own <span style={{ color: "#f15a24" }}>Risk Reality.</span>
                  </h2>

                  <div className="stats-subheading">
                    <p className="text-18-content" style={{ opacity: "0.8" }}>
                      Your organization has its own policies, processes, and risks. Innvikta adapts awareness programs around them — so learning feels relevant, practical, and measurable.
                    </p>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <Link className="btn btn-primary btn-cta" href="/demo">
                      <span className="hover-sweep"></span>
                      <span>Book a Demo</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Right Column: 4 Customized Cards */}
                <div className="lg:col-span-7 animate from-right">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12" style={{ paddingTop: "2rem" }}>
                    {customizedCards.map((card, idx) => (
                      <div key={idx} className="customized-stats-card">
                        {/* Floating circular icon */}
                        <div className="card-icon-container">
                          {card.icon}
                        </div>

                        <h3 className="card-title-custom">
                          {card.title}
                        </h3>
                        <div className="card-divider"></div>
                        <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.5", marginBottom: "0.5rem", textAlign: "left", opacity: 0.9 }}>
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 3. POLICY-ALIGNED PROGRAMS (Interactive Accordion Layout with White Background) */}
          <section className="bg-white" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container">
              <div className="section-intro animate" style={{ marginBottom: "3.5rem" }}>
                <span className="text-subheading">POLICY-ALIGNED PROGRAMS</span>
                <h2 className="text-52-heading">Turn Policies Into Actionable Learning</h2>
                <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", maxWidth: "700px" }}>
                  Convert internal policies, SOPs, and compliance requirements into short modules, scenarios, quizzes, and reinforcement campaigns.
                </p>
              </div>

              <div className="modern-simulations-grid">
                {/* Left Accordion Column */}
                <div className="simulation-accordion-list animate from-left">
                  {policyCards.map((card, index) => {
                    const active = activePolicy === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActivePolicy(index)}
                        className={`simulation-accordion-item ${active ? "active" : ""}`}
                      >
                        <div className="sim-icon-container">
                          {card.icon(active)}
                        </div>
                        <div className="sim-text-content">
                          <h3 className="sim-title">{card.title}</h3>
                          <div 
                            className="sim-desc-wrapper" 
                            style={{ 
                              maxHeight: active ? "120px" : "0px",
                              opacity: active ? 1 : 0
                            }}
                          >
                            <p className="sim-desc">{card.desc}</p>
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
                      {displayImages.prev && (
                        <img 
                          key={displayImages.prev + "_prev"}
                          src={displayImages.prev} 
                          alt="Previous simulation screenshot"
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          className="animate-image-fade-out"
                        />
                      )}
                      <img 
                        key={displayImages.current + "_current"}
                        src={displayImages.current} 
                        alt={activePolicy !== null ? policyCards[activePolicy].title : "Policy-Aligned Programs"} 
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                        className="animate-image-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. INDUSTRY & ROLE-SPECIFIC PATHS (Two Column Alternating Layout) */}
          <section className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container">
              <div className="section-intro animate" style={{ textAlign: "left", marginBottom: "4rem" }}>
                <span className="text-subheading">TARGETED PATHS</span>
                <h2 className="text-64-heading">
                  Relevant Learning for <span style={{ color: "#f15a24" }}>Every Team</span>
                </h2>
                <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", maxWidth: "800px" }}>
                  Create focused learning paths for industries, departments, roles, and high-risk user groups.
                </p>
              </div>

              {/* Row 1: Industry Tracks */}
              <div className="two-col-grid" style={{ marginTop: "4rem" }}>
                <div className="two-col-content-block animate from-left">
                  <h2 className="text-40-heading">Industry Tracks</h2>
                  <p className="text-18-content" style={{ marginTop: "1rem", opacity: "0.7" }}>
                    Create focused learning paths for key industries, addressing specific risks and regulatory requirements.
                  </p>
                  
                  <div style={{ marginTop: "2rem" }}>
                    <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {[
                        { title: "BFSI", desc: "Payment fraud, KYC risks, customer data, phishing, regulatory awareness." },
                        { title: "Healthcare", desc: "Patient data, privacy, unauthorized access, device security." },
                        { title: "Manufacturing", desc: "Vendor fraud, plant access, OT awareness, device usage." },
                        { title: "IT/ITES", desc: "Cloud access, client data, credentials, remote work, privileged users." },
                        { title: "Government / Public Sector", desc: "Citizen data, DPDP, document handling, impersonation, email security." },
                        { title: "Education", desc: "Student data, email safety, device use, access control." }
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "#f15a24", fontWeight: "700" }}>✓</span>
                          <span><strong>{item.title}</strong>: {item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right">
                  <img alt="Industry tracks learning paths" loading="lazy" src="/insat/images/Transfers.jpg" />
                </div>
              </div>

              {/* Row 2: Role Tracks */}
              <div className="two-col-grid reverse" style={{ marginTop: "6rem" }}>
                <div className="two-col-content-block animate from-right">
                  <h2 className="text-40-heading">Role Tracks</h2>
                  <p className="text-18-content" style={{ marginTop: "1rem", opacity: "0.7" }}>
                    Address unique threats and responsibilities across key operational departments.
                  </p>
                  
                  <div style={{ marginTop: "2rem" }}>
                    <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {[
                        { title: "Finance", desc: "Invoice fraud, fake vendors, payment approvals." },
                        { title: "HR", desc: "Employee data, social engineering, document handling." },
                        { title: "Sales", desc: "Customer data, CRM usage, impersonation risks." },
                        { title: "Leadership", desc: "CEO fraud, breach escalation, reputational risk." }
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "#f15a24", fontWeight: "700" }}>✓</span>
                          <span><strong>{item.title}</strong>: {item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="two-col-visual-block aspect-628-517 bg-midnight animate from-left">
                  <img alt="Role tracks learning paths" loading="lazy" src="/insat/images/Monitor-Paymentsmidnight.jpg" />
                </div>
              </div>
            </div>
          </section>

          {/* 5. EXECUTIVE & HIGH-RISK USER PROGRAMS (Side Grid Layout) */}
          <section className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container">
              <div className="two-col-grid">
                <div className="sticky-grid-col animate from-left">
                  <span className="text-subheading">EXECUTIVE & HIGH-RISK</span>
                  <h2 className="text-52-heading" style={{ marginTop: "0.5rem" }}>Focused Journeys for People Attackers Target First</h2>
                  <div style={{ marginTop: "1.5rem", opacity: "0.8" }}>
                    <p className="text-18-content">
                      Build specialized campaigns for CXOs, finance teams, privileged users, customer-facing teams, and employees who need reinforcement.
                    </p>
                  </div>
                  <div className="sticky-visual" style={{ marginTop: "2rem" }}>
                    <img alt="High-risk scenarios monitoring" loading="lazy" src="/insat/images/api-new-static.jpg" />
                  </div>
                </div>

                <div className="side-grid-col animate from-right">
                  {/* Card 1 */}
                  <div className="side-card" style={{ marginBottom: "2rem", padding: "2rem", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
                    <div className="side-card-text-wrapper" style={{ padding: 0 }}>
                      <h3 className="side-card-title" style={{ fontSize: "1.35rem", fontWeight: "600", color: "#0f172a", marginBottom: "1rem" }}>Leadership & Finance Risk</h3>
                      <p className="side-card-desc" style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569", opacity: 0.9 }}>
                        <strong>Leadership Risk:</strong> CXO impersonation, urgent approvals, reputation impact.
                        <br /><strong>Finance Risk:</strong> Fake vendors, invoice manipulation, payment fraud.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="side-card" style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
                    <div className="side-card-text-wrapper" style={{ padding: 0 }}>
                      <h3 className="side-card-title" style={{ fontSize: "1.35rem", fontWeight: "600", color: "#0f172a", marginBottom: "1rem" }}>Privileged Access & Repeat Risk</h3>
                      <p className="side-card-desc" style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569", opacity: 0.9 }}>
                        <strong>Privileged Access Risk:</strong> Admin credentials, MFA fatigue, access misuse.
                        <br /><strong>Repeat-Risk Users:</strong> Targeted nudges, microlearning, follow-up simulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. CULTURE & BEHAVIOUR CAMPAIGNS */}
          <section className="bg-white" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container">
              <div className="section-intro animate" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <span className="text-subheading">CULTURE & BEHAVIOUR CAMPAIGNS</span>
                <h2 className="text-52-heading">Keep Awareness Visible All Year</h2>
                <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
                  Run themed campaigns using nudges, posters, quizzes, games, simulations, and microlearning — aligned to your internal communication style.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
                {[
                  "Cybersecurity Month",
                  "Data Privacy Week",
                  "Phishing Readiness",
                  "Password & MFA",
                  "Report Suspicious Activity"
                ].map((item, index) => (
                  <div key={index} style={{
                    padding: "1.25rem 2.5rem",
                    backgroundColor: "#FFEFEA",
                    border: "1px solid #FFEAD4",
                    borderRadius: "50px",
                    color: "#f15a24",
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    textAlign: "center",
                    boxShadow: "0 4px 6px -1px rgba(241, 90, 36, 0.05)"
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ SECTION */}
          <section className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading">Frequently Asked Questions</h2>
                <Link className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
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
                {[
                  {
                    q: "How are custom security awareness programs created?",
                    a: "Innvikta tailors the training based on your internal policies, SOPs, and industry-specific regulations to match your risk profile."
                  },
                  {
                    q: "Can we create training paths for specific departments?",
                    a: "Yes, you can define focused journeys for Finance, HR, Sales, developers, and executives to address department-level risks."
                  },
                  {
                    q: "Do you support custom simulations?",
                    a: "Absolutely. We customize phishing, smishing, and social engineering templates to reflect your organization's actual communication channels and brand."
                  },
                  {
                    q: "How do you align training with compliance frameworks?",
                    a: "We map modules to local and global compliance standards such as DPDP, GDPR, SOC 2, and ISO 27001 so your learning evidence is audit-ready."
                  }
                ].map((faq, index) => (
                  <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                    <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-question">{faq.q}</span>
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
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. FINAL CTA SECTION */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto" }}>
                    Need Awareness Built Around Your Business?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Let’s create a program aligned to your policies, people, risks, and priorities.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/demo" className="btn btn-primary">
                      Book a Demo
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
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default CustomizedSolutionsPage;
