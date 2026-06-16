"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";

import { 
  FiShield, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiGlobe, 
  FiMail, 
  FiFileText, 
  FiServer,
  FiArrowRight,
  FiLock,
  FiActivity
} from "react-icons/fi";

export default function DomainSecurityAnalyzer() {
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("spf");
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);
  const resultsRef = useRef(null);

  // GSAP animations on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!domain) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/dns-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, selector })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to scan domain");
      }
      setResults(data);

      // Scroll to results cleanly
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "spf", name: "SPF Checker", icon: FiShield },
    { id: "dmarc", name: "DMARC Checker", icon: FiLock },
    { id: "dkim", name: "DKIM Checker", icon: FiKeyIcon },
    { id: "mx", name: "MX Records", icon: FiMail },
    { id: "txt", name: "TXT Records", icon: FiFileText },
    { id: "dns", name: "DNS Lookup", icon: FiServer }
  ];

  function FiKeyIcon(props) {
    return (
      <svg
        {...props}
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
            <FiCheckCircle className="text-[14px]" /> Secure
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
            <FiAlertTriangle className="text-[14px]" /> Warning / Info
          </span>
        );
      case "danger":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
            <FiAlertTriangle className="text-[14px]" /> Vulnerable
          </span>
        );
    }
  };

  const faqData = [
    {
      question: "What is the Domain Security Analyzer?",
      answer: "The Domain Security Analyzer is a free tool by Innvikta that inspects public DNS records for SPF, DKIM, and DMARC configurations to check for vulnerabilities that allow email spoofing."
    },
    {
      question: "How does the tool run checks?",
      answer: "The tool makes live server-side queries to global DNS resolvers to inspect real-time published records (A, AAAA, MX, TXT, SPF, DKIM, and DMARC) for the specified domain."
    },
    {
      question: "What is SPF, DKIM, and DMARC?",
      answer: "They are email authentication protocols. SPF lists authorized senders, DKIM cryptographically signs outgoing emails, and DMARC instructs receivers on how to handle emails that fail SPF/DKIM checks."
    },
    {
      question: "Why does my DKIM scan show a warning or not found status?",
      answer: "DKIM records are published under specific \"selectors\". The tool checks the \"default\" selector by default. If your organization uses a custom selector (e.g. \"google\" or \"k1\"), enter it in the DKIM Selector field."
    }
  ];

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          
          {/* 1. HERO SECTION */}
          <section className="hero-section">
            <div className="hero-outer-wrapper">
              
              {/* Background SVG Decors */}
              <div className="hero-bg-decor" aria-hidden="true">

                {/* Orange network lines (right side, matching Home page) */}
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

                {/* Orange shield (left side, matching Home page) */}
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



              {/* Backdrop Gradients */}
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

              <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
                  
                  {/* Center Column: Title & Scanner Form */}
                  <div className="hero-content" style={{ maxWidth: "100%", textAlign: "center", margin: "0 auto", paddingBottom: "2.5rem", paddingTop: "4rem" }}>
                    <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto" }}>Free Cybersecurity Utility</span>
                    <h1 className="text-96-heading" style={{ fontSize: "clamp(1.85rem, 5vw, 4.5rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center" }}>
                      <span className="text-primary">Domain Security</span> Analyzer
                    </h1>
                    <p className="text-20-content hero-paragraph" style={{ marginBottom: "2.5rem", marginLeft: "auto", marginRight: "auto", maxWidth: "720px", textAlign: "center" }}>
                      Verify your SPF, DKIM, and DMARC configurations instantly to identify security vulnerabilities and block spoofing threats.
                    </p>

                    {/* Integrated Scanner Form */}
                    <div className="scanner-form-container" style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "16px",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)",
                      maxWidth: "840px",
                      margin: "0 auto",
                      textAlign: "left"
                    }}>
                      <form onSubmit={handleScan} className="scanner-form">
                        
                        <div className="scanner-form-group-domain">
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
                            Domain Name
                          </label>
                          <div style={{ position: "relative" }}>
                            <div style={{ position: "absolute", top: "50%", left: "1rem", transform: "translateY(-50%)", color: "#94A3B8", display: "flex", alignItems: "center" }}>
                              <FiGlobe style={{ fontSize: "1.1rem" }} />
                            </div>
                            <input
                              type="text"
                              required
                              className="scanner-input"
                              placeholder="e.g. microsoft.com"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value)}
                              style={{
                                width: "100%",
                                height: "50px",
                                padding: "0 1rem 0 2.5rem",
                                border: "1px solid #CBD5E1",
                                borderRadius: "10px",
                                fontSize: "0.95rem",
                                color: "#0F172A",
                                fontWeight: 500,
                                backgroundColor: "#F8FAFC",
                                outline: "none",
                                boxSizing: "border-box"
                              }}
                            />
                          </div>
                        </div>

                        <div className="scanner-form-group-selector">
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
                            DKIM Selector (Optional)
                          </label>
                          <input
                            type="text"
                            className="scanner-input"
                            placeholder="default"
                            value={selector}
                            onChange={(e) => setSelector(e.target.value)}
                            style={{
                              width: "100%",
                              height: "50px",
                              padding: "0 1rem",
                              border: "1px solid #CBD5E1",
                              borderRadius: "10px",
                              fontSize: "0.95rem",
                              color: "#0F172A",
                              fontWeight: 500,
                              backgroundColor: "#F8FAFC",
                              outline: "none",
                              boxSizing: "border-box"
                            }}
                          />
                        </div>

                        <div className="scanner-form-group-button">
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{
                              width: "100%",
                              height: "50px",
                              borderRadius: "10px",
                              fontSize: "1rem",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              cursor: "pointer",
                              border: "none",
                              boxSizing: "border-box"
                            }}
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}>
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Scanning...
                              </>
                            ) : (
                              <>
                                Analyze Domain <FiArrowRight />
                              </>
                            )}
                          </button>
                        </div>

                      </form>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Error Alert Box */}
          {error && (
            <section className="bg-white" style={{ padding: "2rem 0" }}>
              <div className="container">
                <div style={{
                  padding: "1.25rem",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  borderRadius: "12px",
                  color: "#991B1B",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }}>
                  <FiAlertTriangle style={{ fontSize: "1.35rem", flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              </div>
            </section>
          )}

          {/* 2. RESULTS CONTAINER (ONLY SHOWS AFTER SCAN) */}
          <div ref={resultsRef}>
            {results && (
              <section className="stats-section" style={{ padding: "6rem 0", backgroundColor: "#F8FAFC" }}>
                <div className="container">
                  
                  <div className="section-intro animate" style={{ marginBottom: "4rem" }}>
                    <span className="text-subheading">Domain Profile Results</span>
                    <h2 className="text-52-heading">Domain Security Report</h2>
                  </div>

                  <div className="stats-grid stats-grid-analyzer">
                    
                    {/* Left Profile Panel */}
                    <div className="stats-content-block animate from-left" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      
                      <div className="left-diagnostics-card">
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                          Target Domain
                        </span>
                        <h3 style={{ fontSize: "1.75rem", fontWeight: 500, color: "#1F2937", wordBreak: "break-all", margin: "0.25rem 0 1.25rem 0", fontFamily: "var(--font-heading)" }}>
                          {results.domain}
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid #F1F5F9" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>SPF Status</span>
                            {getStatusBadge(results.spf.status)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>DMARC Status</span>
                            {getStatusBadge(results.dmarc.status)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>DKIM Status ({selector})</span>
                            {getStatusBadge(results.dkim.status)}
                          </div>
                        </div>
                      </div>

                      {/* Summary Recommendations */}
                      <div className="left-diagnostics-card">
                        <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1F2937", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                          <FiActivity style={{ color: "#F15A24" }} /> Quick Recommendations
                        </h4>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0, listStyle: "none" }}>
                          {results.spf.status === "danger" && (
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                              <FiAlertTriangle className="text-red-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Publish an SPF record to authorize mail servers.</span>
                            </li>
                          )}
                          {results.dmarc.status === "danger" && (
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                              <FiAlertTriangle className="text-red-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Configure DMARC rules to reject unauthorized emails.</span>
                            </li>
                          )}
                          {results.dkim.status === "warning" && (
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                              <FiAlertTriangle className="text-amber-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Verify selectors or upload DKIM public keys.</span>
                            </li>
                          )}
                          {results.spf.status === "success" && results.dmarc.status === "success" && (
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                              <FiCheckCircle className="text-green-600" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#166534", lineHeight: "1.5" }}>Authentication is properly aligned. Good job!</span>
                            </li>
                          )}
                        </ul>
                      </div>

                    </div>

                    {/* Right Detailed Tabs Panel */}
                    <div className="stats-cards-block animate from-right" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      
                      {/* Tabs Bar */}
                      <div className="analyzer-tabs-bar">
                        {tabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveTab(tab.id)}
                              className={isActive ? "active" : ""}
                            >
                              <Icon style={{ fontSize: "1.1rem" }} />
                              <span>{tab.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Tab Content Panel */}
                      <div className="analyzer-tab-content-panel">
                        
                        {/* SPF Checker */}
                        {activeTab === "spf" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Sender Policy Framework (SPF)</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Ensures only authorized IP addresses can send mail for your domain.
                            </p>
                            
                            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                              <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw SPF Record</span>
                              <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                                {results.spf.record || "No SPF record found."}
                              </code>
                            </div>

                            <div style={{
                              display: "flex",
                              gap: "0.75rem",
                              padding: "1.25rem",
                              borderRadius: "10px",
                              border: results.spf.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEE2E2",
                              backgroundColor: results.spf.status === "success" ? "#F0FDF4" : "#FEF2F2",
                              color: results.spf.status === "success" ? "#166534" : "#991B1B"
                            }}>
                              {results.spf.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                              <div>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>SPF Integrity Check</h4>
                                <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.spf.message}</p>
                              </div>
                            </div>

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is Sender Policy Framework (SPF) needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                Sender Policy Framework (SPF) is a DNS record that lists the IP addresses and mail servers authorized to send emails from your domain. It is needed to prevent email spoofing, as spam and phishing senders often impersonate domain names to trick recipients.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>Can I have multiple SPF records for a single domain?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  No, a domain must have at most one SPF record. Having multiple SPF records will cause validation failures and lead to emails being marked as spam.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* DMARC Checker */}
                        {activeTab === "dmarc" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>DMARC Policy Compliance</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Instructs receivers how to treat messages that fail SPF or DKIM validation.
                            </p>
                            
                            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                              <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw DMARC Record (_dmarc.{results.domain})</span>
                              <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                                {results.dmarc.record || "No DMARC record found."}
                              </code>
                            </div>

                            <div style={{
                              display: "flex",
                              gap: "0.75rem",
                              padding: "1.25rem",
                              borderRadius: "10px",
                              border: results.dmarc.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEE2E2",
                              backgroundColor: results.dmarc.status === "success" ? "#F0FDF4" : "#FEF2F2",
                              color: results.dmarc.status === "success" ? "#166534" : "#991B1B"
                            }}>
                              {results.dmarc.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                              <div>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>DMARC Compliance Check</h4>
                                <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.dmarc.message}</p>
                              </div>
                            </div>

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DMARC Compliance needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                Domain-based Message Authentication, Reporting, and Conformance (DMARC) builds on SPF and DKIM. It dictates how receiving mail servers should handle emails that fail authentication (e.g., monitor, quarantine, or reject) and provides reports on domain activity. It is needed to enforce strict email authentication policies and block phishing attempts.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is the difference between DMARC policy &apos;none&apos;, &apos;quarantine&apos;, and &apos;reject&apos;?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  &apos;none&apos; monitors mail delivery and generates reports without blocking; &apos;quarantine&apos; sends suspicious emails to the spam/junk folder; and &apos;reject&apos; blocks unauthorized emails from being delivered at all.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* DKIM Checker */}
                        {activeTab === "dkim" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>DKIM Public Key Lookup</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Validates published cryptographic signatures for selector &quot;{selector}&quot;.
                            </p>
                            
                            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                              <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw DKIM Record ({selector}._domainkey.{results.domain})</span>
                              <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                                {results.dkim.record || "No DKIM record resolved at this selector."}
                              </code>
                            </div>

                            <div style={{
                              display: "flex",
                              gap: "0.75rem",
                              padding: "1.25rem",
                              borderRadius: "10px",
                              border: results.dkim.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEF3C7",
                              backgroundColor: results.dkim.status === "success" ? "#F0FDF4" : "#FFFBEB",
                              color: results.dkim.status === "success" ? "#166534" : "#92400E"
                            }}>
                              {results.dkim.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                              <div>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>DKIM Selector Resolution</h4>
                                <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.dkim.message}</p>
                              </div>
                            </div>

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DKIM Public Key Lookup needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                DomainKeys Identified Mail (DKIM) adds a cryptographic digital signature to email headers. It is needed to verify that the email was sent by the actual domain owner and to ensure that the content has not been tampered with or modified during transit.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is a DKIM selector and why is it needed?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  A selector is a unique string used to publish multiple DKIM public keys for a single domain, allowing different email services (like Google Workspace, Office 365, or newsletter platforms) to sign emails independently.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* MX Records */}
                        {activeTab === "mx" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Mail Exchange (MX) Servers</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Mail gateways authorized to accept inbound messages for the domain.
                            </p>
                            
                            {results.mx.length === 0 ? (
                              <div style={{ padding: "2rem", border: "2px dashed #E2E8F0", borderRadius: "12px", textAlign: "center", color: "#94A3B8", fontWeight: 500 }}>
                                No MX records found.
                              </div>
                            ) : (
                              <div style={{ border: "1px solid #E2E8F0", borderRadius: "10px", overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem", textAlign: "left", minWidth: "500px" }}>
                                  <thead>
                                    <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontWeight: 600 }}>
                                      <th style={{ padding: "1rem 1.5rem" }}>Exchange Gateway</th>
                                      <th style={{ padding: "1rem 1.5rem", textAlign: "right" }}>Priority</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {results.mx.map((srv, idx) => (
                                      <tr key={idx} style={{ borderBottom: idx === results.mx.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                                        <td style={{ padding: "1rem 1.5rem", color: "#334155", fontWeight: 500, wordBreak: "break-all" }}>{srv.exchange}</td>
                                        <td style={{ padding: "1rem 1.5rem", textAlign: "right", color: "#475569", fontWeight: 500 }}>{srv.priority}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is Mail Exchange (MX) needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                Mail Exchange (MX) records point to the mail servers responsible for accepting incoming emails on behalf of your domain. They are needed to ensure that mail delivery servers can locate the correct destinations to route your inbound emails.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>How do priority numbers work in MX records?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  Lower priority numbers represent higher preference. Receiving servers will try to deliver mail to the gateway with the lowest priority number first, falling back to higher numbers if the primary is unreachable.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TXT Records */}
                        {activeTab === "txt" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Root TXT Records</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Public text records published on the root domain zone.
                            </p>
                            
                            {results.txt.length === 0 ? (
                              <div style={{ padding: "2rem", border: "2px dashed #E2E8F0", borderRadius: "12px", textAlign: "center", color: "#94A3B8", fontWeight: 500 }}>
                                No TXT records resolved.
                              </div>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "260px", overflowY: "auto" }}>
                                {results.txt.map((rec, idx) => (
                                  <div key={idx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "1.1rem 1.5rem" }}>
                                    <code style={{ fontSize: "0.95rem", color: "#334155", fontWeight: 500, wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>{rec}</code>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is TXT Records needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                Text (TXT) records contain human and machine-readable text data associated with a domain. They are needed to verify domain ownership (e.g., for Google Search Console, Office 365), and to specify security configurations like SPF and key verification strings.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>How long does it take for a newly published TXT record to take effect?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  DNS propagation depends on the TTL (Time to Live) value set on the record, but typically ranges from a few minutes to up to 24–48 hours globally.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* DNS Lookup */}
                        {activeTab === "dns" && (
                          <div className="tab-pane-animate">
                            <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>General DNS Resolutions</h3>
                            <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                              Addresses, CNAME routes, and Nameservers for the domain.
                            </p>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                              <div>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>A Records (IPv4)</span>
                                {results.dns.a.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    {results.dns.a.map((ip, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ip}</code>)}
                                  </div>
                                )}
                              </div>

                              <div>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>AAAA Records (IPv6)</span>
                                {results.dns.aaaa.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    {results.dns.aaaa.map((ip, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ip}</code>)}
                                  </div>
                                )}
                              </div>

                              <div>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Name Servers (NS)</span>
                                {results.dns.ns.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    {results.dns.ns.map((ns, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ns}</code>)}
                                  </div>
                                )}
                              </div>

                              <div>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>CNAME Alias</span>
                                {results.dns.cname.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    {results.dns.cname.map((cname, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{cname}</code>)}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                              <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DNS Lookup needed?</h4>
                              <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                                General Domain Name System (DNS) resolutions map domain names to IP addresses (A, AAAA records) and locate authoritative Nameservers (NS). It is needed to allow web browsers and services to resolve your domain to the correct hosting servers globally.
                              </p>
                              
                              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question & Answer</span>
                                <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is the difference between an A record and a CNAME record?</h5>
                                <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                                  An A record maps a domain directly to an IPv4 address, whereas a CNAME record points a domain alias to another domain name (e.g., mapping `www.example.com` to `example.com`).
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                </div>
              </section>
            )}
          </div>

          {/* 3. FAQ SECTION (Matching Human Risk Intelligence Style) */}
          <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading">Frequently Asked Questions</h2>
                <a className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Contact support</span>
                </a>
              </div>

              <div className="faq-list-col animate from-right">
                {faqData.map((faq, index) => (
                  <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={activeFaq === index}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                      <span className="faq-question">{faq.question}</span>
                      <div className="faq-icon-wrapper">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                          <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className="faq-panel"
                      style={{
                        maxHeight: activeFaq === index ? "120px" : "0px",
                        opacity: activeFaq === index ? 1 : 0,
                        transition: "max-height 0.4s ease, opacity 0.4s ease",
                        overflow: "hidden"
                      }}
                    >
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

          {/* 4. FINAL CTA SECTION */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate relative z-10">
                  <h2 className="section-title leading-tight">
                    Secure Your Domain Against Impersonation
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Analyze SPF, DKIM, and DMARC record vulnerabilities, and prevent email spoofing attacks on your brand.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/book-demo" className="btn btn-primary">
                      Book a Demo
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
}
