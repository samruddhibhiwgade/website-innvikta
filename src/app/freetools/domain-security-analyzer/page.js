"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import { FiAlertTriangle } from "react-icons/fi";

import HeroSection from "./components/Hero";
import ResultsReport from "./components/ResultsReport";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

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

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Free Domain Security & SPF/DMARC Analyzer | Innvikta" description="Analyze your domain's SPF, DKIM, and DMARC settings to prevent email spoofing and phishing attacks." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection 
            domain={domain}
            setDomain={setDomain}
            selector={selector}
            setSelector={setSelector}
            loading={loading}
            handleScan={handleScan}
          />

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

          <ResultsReport 
            resultsRef={resultsRef}
            results={results}
            selector={selector}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <FAQSection 
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />

          <FinalCtaSection />
        </div>
      </div>

      <style jsx global>{`
        .insat-page {
            --font-heading: var(--font-secondary), sans-serif;
            --font-body: var(--font-secondary), sans-serif;
            --color-forest-70: rgba(31, 41, 55, 0.7);
            --color-black-text: #1F2937;
            font-family: var(--font-body);
        }
        
        .insat-page h1,
        .insat-page h2,
        .insat-page h3,
        .insat-page h4,
        .insat-page h5,
        .insat-page h6 {
            font-weight: 400 !important;
        }

        /* Overrides for buttons and inputs that might be reset globally */
        .insat-page button.btn-primary {
            background-color: #f15a24 !important;
            color: #ffffff !important;
            border: none !important;
        }
        .insat-page button.btn-primary:hover {
            background-color: #d54e1c !important;
        }
        .insat-page a[href="/book-demo"] {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
        }
      `}</style>
    </GSAPWrapper>
  );
}