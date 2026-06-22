"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className={`faq-item ${isOpen ? 'active' : ''}`} style={{ borderBottom: "1px solid #E7E7E7" }}>
    <button
      type="button"
      className="faq-trigger"
      aria-expanded={isOpen}
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 0",
        textAlign: "left",
        fontSize: "1.1rem",
        fontWeight: "400",
        color: "#1F1F1F",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
    >
      <span>{q}</span>
      <div className="faq-icon-wrapper" style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="#3A3A3A" strokeWidth="2" />
          {!isOpen && <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="#3A3A3A" strokeWidth="2" />}
        </svg>
      </div>
    </button>
    <div
      className="faq-panel"
      style={{
        maxHeight: isOpen ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out, opacity 0.3s ease",
        opacity: isOpen ? 1 : 0
      }}
    >
      <div style={{ paddingBottom: "1.5rem", color: "#6E6E6E", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p>{a}</p>
      </div>
    </div>
  </div>
);

const BaselineScoreToolPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    domain: "",
    orgSize: "",
    industry: "",
    trainingFreq: "",
    phishingFreq: ""
  });
  const [assessmentResult, setAssessmentResult] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-form-block",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let baseScore = 40;

    // Size impact
    if (formData.orgSize === "100-499") baseScore += 5;
    else if (formData.orgSize === "500-2499") baseScore += 10;
    else if (formData.orgSize === "2500-9999") baseScore += 15;
    else if (formData.orgSize === "10000+") baseScore += 20;

    // Industry impact
    if (["bfsi", "government"].includes(formData.industry)) baseScore += 15;
    else if (formData.industry === "healthcare") baseScore += 12;
    else if (formData.industry === "manufacturing") baseScore += 10;
    else if (["it", "education"].includes(formData.industry)) baseScore += 8;
    else baseScore += 5;

    // Training frequency impact
    if (formData.trainingFreq === "never") baseScore += 20;
    else if (formData.trainingFreq === "annually") baseScore += 12;
    else if (formData.trainingFreq === "quarterly") baseScore += 5;
    else if (formData.trainingFreq === "monthly") baseScore -= 5;

    // Phishing frequency impact
    if (formData.phishingFreq === "never") baseScore += 20;
    else if (formData.phishingFreq === "annually") baseScore += 12;
    else if (formData.phishingFreq === "quarterly") baseScore += 5;
    else if (formData.phishingFreq === "monthly") baseScore -= 5;

    // Seed variations for realism
    let domainFactor = formData.domain ? formData.domain.length % 5 : 0;
    const finalScore = Math.min(98, Math.max(22, baseScore + domainFactor));

    let riskLevel = "LOW RISK";
    let riskColor = "#10B981";
    if (finalScore >= 70) {
      riskLevel = "CRITICAL RISK";
      riskColor = "#EF4444";
    } else if (finalScore >= 60) {
      riskLevel = "HIGH RISK";
      riskColor = "#F15A24";
    } else if (finalScore >= 40) {
      riskLevel = "MEDIUM RISK";
      riskColor = "#F59E0B";
    }

    setAssessmentResult({
      score: finalScore,
      level: riskLevel,
      color: riskColor,
      email: Math.round(98 - finalScore * 0.4),
      identity: Math.round(92 - finalScore * 0.45),
      employee: Math.round(95 - finalScore * 0.5),
      brand: Math.round(90 - finalScore * 0.35),
      maturity: Math.round(96 - finalScore * 0.6)
    });

    // Scroll to results smoothly
    setTimeout(() => {
      document.getElementById("assessment-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      domain: "",
      orgSize: "",
      industry: "",
      trainingFreq: "",
      phishingFreq: ""
    });
    setCurrentQuestion(1);
    setAssessmentResult(null);
  };

  const faqData = [
    {
      q: "What is a Human Risk Assessment?",
      a: "A Human Risk Assessment is a formal evaluation of an organization's susceptibility to social engineering and human-centric cybersecurity threats. By analyzing employee behavior patterns, security awareness training frequency, phishing simulation click rates, and externally observable domain configuration records (like SPF, DKIM, and DMARC), a Human Risk Assessment establishes a baseline of vulnerability. It evaluates the human attack surface to guide security leaders in deploying targeted behavioral security solutions, reducing workforce security risks, and strengthening organizational resilience before threat actors attempt to exploit workforce vulnerabilities."
    },
    {
      q: "How is a Human Risk Score calculated?",
      a: "Innvikta calculates the Human Risk Score using a weighted algorithm based on organizational parameters and defensive training practices. This includes workforce size (which expands the potential attack surface), industry target vectors (as sectors like BFSI and healthcare face disproportionate threat intelligence profiles), and security controls. We combine these threat factors with security readiness parameters, specifically auditing how frequently security awareness training and phishing simulations are run. These inputs are aggregated into a score from 1 to 100, where higher scores signify severe risk exposure."
    },
    {
      q: "What causes a high Human Risk Score?",
      a: "A high Human Risk Score is primarily caused by security training maturity gaps and administrative email vulnerabilities. For example, if an organization never runs phishing simulations or conducts security awareness training less than quarterly, employees cannot build secure habits. Additionally, exposed employee identities on look-alike domains, weak DMARC/SPF configurations, and high workforce susceptibility to social engineering techniques escalate the vulnerability index. Large, targeted organizations in highly regulated sectors also start with elevated baseline threat intelligence targets."
    },
    {
      q: "What is considered a good Human Risk Score?",
      a: "A score under 40 is considered low risk, representing a resilient workforce. Achieving a low risk score requires continuous monthly security awareness training, ongoing automated phishing simulations, strong email authentication records, and a proactive security culture. A score of 40-59 represents moderate risk, while any score exceeding 60 flags critical gaps in behavioral security, requiring immediate leadership intervention and structured human risk management campaigns."
    },
    {
      q: "How often should organizations assess human risk?",
      a: "Organizations should evaluate human risk continuously. Because workforce behavior, threat vectors, and personnel change constantly, static annual assessments fail to capture active vulnerability peaks. Best practices suggest review of human risk score metrics monthly, integrated with recurring simulation reporting. This ensures security leaders can proactively adjust learning paths, identify newly vulnerable departments, and maintain audit-ready evidence for compliance framework reviews."
    },
    {
      q: "How does phishing impact human risk?",
      a: "Phishing remains the primary initial access vector for enterprise breaches. Employee interaction with suspicious emails directly drives social engineering exposure, credential harvesting, and malware deployment. Measuring phishing susceptibility—specifically click rates and threat reporting rates—provides a direct behavioral baseline of human risk. Continuous simulations teach employees to spot active threat indicators, transforming them from targets into active defenders."
    },
    {
      q: "Can AI-generated attacks increase human risk?",
      a: "Yes, generative AI has drastically heightened social engineering capabilities. Threat actors use AI to write highly convincing, hyper-targeted spear-phishing emails, automate Look-alike domain campaigns, and create voice deepfakes for business email compromise (BEC). Because AI-generated attacks lack typical spelling errors and translate perfectly across languages, they bypass traditional employee filters, raising the overall baseline risk and demanding advanced behavioral security training."
    },
    {
      q: "How does employee awareness training reduce cyber risk?",
      a: "Structured, continuous security awareness training builds defensive cognitive habits across the workforce. Rather than viewing compliance as a checkbox exercise, active learning programs teach employees to identify credential theft, social engineering hooks, and data sharing risks. This behavioral focus creates an active 'human firewall,' reducing susceptibility to phishing campaigns and driving down the company's overall human risk exposure index."
    },
    {
      q: "What is business email compromise?",
      a: "Business Email Compromise (BEC) is a sophisticated form of social engineering where threat actors impersonate executives, partners, or vendors to orchestrate unauthorized wire transfers or harvest sensitive credentials. BEC scams rarely contain malicious files or links, bypassing traditional technical filters by relying entirely on conversational trust and look-alike domains. Understanding BEC vulnerability is a critical indicator in workforce threat assessments."
    },
    {
      q: "Why is DMARC important?",
      a: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) is a critical email authentication protocol that prevents domain spoofing and brand impersonation. By working alongside SPF and DKIM, DMARC allows domain owners to instruct recipient servers how to handle emails that fail verification, blocking phishing attempts sent in the company's name and securing the brand's external email posture."
    },
    {
      q: "How does Innvikta measure human risk exposure?",
      a: "Innvikta measures human risk exposure by cross-referencing organizational characteristics, administrative records, and behavioral training frequency. We analyze domain controls, look-alike domain risks, and target vectors, combined with active program metrics like security training intervals and phishing simulator activity. This provides security leaders with a clear, defensible view of their human attack surface and specific, actionable paths for risk mitigation."
    }
  ];

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">

          {/* 1. HERO + ASSESSMENT SECTION */}
          <section className="hero-section" style={{ background: "#FFFFFF", paddingBottom: "4rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "80vh" }}>
                
                {/* Left Column: Headline & Content */}
                <div className="lg:col-span-7 hero-content" style={{ textAlign: "left", padding: "0" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "500" }}>FREE HUMAN RISK SCAN</span>
                  <h1 className="text-64-heading" style={{ color: "#1F1F1F", fontWeight: "600", lineHeight: "1.05", marginBottom: "1.5rem" }}>
                    Understand Your <span style={{ color: "#F15A24" }}>Human Risk Exposure</span>
                  </h1>
                  <p className="text-18-content" style={{ color: "#3A3A3A", opacity: "0.9", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px" }}>
                    Most cyberattacks don&apos;t begin with malware. They begin with people. Measure your organization&apos;s exposure to phishing, social engineering, credential theft, business email compromise, and AI-powered impersonation attacks with Innvikta&apos;s Human Risk Exposure Assessment.
                  </p>

                </div>

                {/* Right Column: Assessment Form */}
                <div className="lg:col-span-5 hero-form-block">
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E7E7E7",
                      borderLeft: "4px solid #F15A24",
                      borderRadius: "20px",
                      padding: "2.25rem",
                      boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
                      transform: "translateY(-8px)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: "500", color: "#F15A24", uppercase: "true", letterSpacing: "0.05em" }}>
                        Question {currentQuestion} of 5
                      </span>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: "16px",
                              height: "4px",
                              borderRadius: "2px",
                              backgroundColor: i <= currentQuestion ? "#F15A24" : "#E7E7E7",
                              transition: "background-color 0.3s ease"
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question 1: Domain */}
                    {currentQuestion === 1 && (
                      <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                          What is your company domain?
                        </h3>
                        <input
                          type="text"
                          placeholder="example.com"
                          value={formData.domain}
                          onChange={(e) => handleInputChange("domain", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1px solid #E7E7E7",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            outline: "none",
                            color: "#1F1F1F"
                          }}
                        />
                        <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                          <strong>Explanation:</strong> Your domain helps identify publicly observable email security controls and potential impersonation risks.
                        </p>
                      </div>
                    )}

                    {/* Question 2: Org Size */}
                    {currentQuestion === 2 && (
                      <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                          What is your organization size?
                        </h3>
                        <select
                          value={formData.orgSize}
                          onChange={(e) => handleInputChange("orgSize", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1px solid #E7E7E7",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            outline: "none",
                            background: "#fff",
                            color: "#1F1F1F"
                          }}
                        >
                          <option value="">Select workforce size...</option>
                          <option value="1-99">1 - 99 employees</option>
                          <option value="100-499">100 - 499 employees</option>
                          <option value="500-2499">500 - 2,499 employees</option>
                          <option value="2500-9999">2,500 - 9,999 employees</option>
                          <option value="10000+">10,000+ employees</option>
                        </select>
                        <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                          <strong>Explanation:</strong> Workforce size influences exposure and attack surface.
                        </p>
                      </div>
                    )}

                    {/* Question 3: Industry */}
                    {currentQuestion === 3 && (
                      <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                          What industry does your company belong to?
                        </h3>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange("industry", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1px solid #E7E7E7",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            outline: "none",
                            background: "#fff",
                            color: "#1F1F1F"
                          }}
                        >
                          <option value="">Select industry...</option>
                          <option value="bfsi">BFSI (Banking & Finance)</option>
                          <option value="healthcare">Healthcare & Medicine</option>
                          <option value="manufacturing">Manufacturing & Supply Chain</option>
                          <option value="it">IT & Technology</option>
                          <option value="government">Government & Public Sector</option>
                          <option value="education">Education & Universities</option>
                          <option value="other">Other Sectors</option>
                        </select>
                        <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                          <strong>Explanation:</strong> Different sectors experience different threat levels and targeting patterns.
                        </p>
                      </div>
                    )}

                    {/* Question 4: Training Frequency */}
                    {currentQuestion === 4 && (
                      <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                          How often is Security Awareness Training conducted?
                        </h3>
                        <select
                          value={formData.trainingFreq}
                          onChange={(e) => handleInputChange("trainingFreq", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1px solid #E7E7E7",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            outline: "none",
                            background: "#fff",
                            color: "#1F1F1F"
                          }}
                        >
                          <option value="">Select training frequency...</option>
                          <option value="never">Never / No formal training</option>
                          <option value="annually">Annually</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="monthly">Monthly / Continuous</option>
                        </select>
                        <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                          <strong>Explanation:</strong> Training maturity strongly influences human risk outcomes.
                        </p>
                      </div>
                    )}

                    {/* Question 5: Phishing Frequency */}
                    {currentQuestion === 5 && (
                      <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                          How often do you run Phishing Simulations?
                        </h3>
                        <select
                          value={formData.phishingFreq}
                          onChange={(e) => handleInputChange("phishingFreq", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1px solid #E7E7E7",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            outline: "none",
                            background: "#fff",
                            color: "#1F1F1F"
                          }}
                        >
                          <option value="">Select simulation frequency...</option>
                          <option value="never">Never / No simulations</option>
                          <option value="annually">Annually</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="monthly">Monthly / Continuous</option>
                        </select>
                        <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                          <strong>Explanation:</strong> Organizations that regularly simulate attacks generally improve resilience.
                        </p>
                      </div>
                    )}

                    {/* Controls */}
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                      {currentQuestion > 1 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          style={{
                            flex: 1,
                            padding: "0.75rem",
                            border: "1px solid #E7E7E7",
                            background: "#none",
                            color: "#3A3A3A",
                            fontWeight: "400",
                            borderRadius: "8px",
                            cursor: "pointer"
                          }}
                        >
                          Back
                        </button>
                      )}
                      
                      {currentQuestion < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={
                            (currentQuestion === 1 && !formData.domain) ||
                            (currentQuestion === 2 && !formData.orgSize) ||
                            (currentQuestion === 3 && !formData.industry) ||
                            (currentQuestion === 4 && !formData.trainingFreq)
                          }
                          style={{
                            flex: 2,
                            padding: "0.75rem",
                            background: "#F15A24",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            opacity: (
                              (currentQuestion === 1 && !formData.domain) ||
                              (currentQuestion === 2 && !formData.orgSize) ||
                              (currentQuestion === 3 && !formData.industry) ||
                              (currentQuestion === 4 && !formData.trainingFreq)
                            ) ? 0.5 : 1
                          }}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={calculateScore}
                          disabled={!formData.phishingFreq}
                          style={{
                            flex: 2,
                            padding: "0.75rem",
                            background: "#F15A24",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            opacity: !formData.phishingFreq ? 0.5 : 1
                          }}
                        >
                          Calculate My Human Risk Score
                        </button>
                      )}
                    </div>

                    {currentQuestion === 5 && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            domain: "acme-corp.com",
                            orgSize: "500-2499",
                            industry: "bfsi",
                            trainingFreq: "annually",
                            phishingFreq: "quarterly"
                          });
                          setAssessmentResult({
                            score: 67,
                            level: "HIGH RISK",
                            color: "#F15A24",
                            email: 72,
                            identity: 61,
                            employee: 58,
                            brand: 79,
                            maturity: 42
                          });
                          setTimeout(() => {
                            document.getElementById("assessment-results")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        style={{
                          width: "100%",
                          marginTop: "0.75rem",
                          background: "none",
                          border: "none",
                          color: "#6E6E6E",
                          fontSize: "0.8rem",
                          fontWeight: "400",
                          textDecoration: "underline",
                          cursor: "pointer",
                          textAlign: "center"
                        }}
                      >
                        View Sample Assessment
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 2. WHY HUMAN RISK MATTERS */}
          <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5" style={{ textAlign: "left" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>THE WEAKEST LINK</span>
                  <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                    Cybercriminals Target People First
                  </h2>
                  <p className="text-18-content" style={{ color: "#6E6E6E", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Modern attacks rarely begin by breaking into systems. They begin by exploiting trust, behavior, communication patterns, and human decision-making.
                  </p>
                  <p className="text-16-content" style={{ color: "#6E6E6E", opacity: "0.85" }}>
                    Employees receive phishing emails, executives face impersonation attempts, and organizations are increasingly exposed to AI-generated social engineering attacks. Technical controls remain essential, but understanding human risk exposure is now equally critical.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ height: "100%" }}>
                    {[
                      {
                        title: "Human Error Focus",
                        desc: "Human Error Remains a Leading Cause of Security Incidents",
                        stat: "74%",
                        source: "Verizon DBIR"
                      },
                      {
                        title: "Phishing Vector",
                        desc: "Phishing Continues to Be a Common Initial Attack Vector",
                        stat: "90%",
                        source: "CISA Threat Report"
                      },
                      {
                        title: "BEC Threat",
                        desc: "Business Email Compromise Causes Billions in Annual Losses",
                        stat: "$2.9B",
                        source: "FBI Internet Crime Report"
                      },
                      {
                        title: "AI Exploitation",
                        desc: "AI Is Increasing the Scale of Social Engineering Attacks",
                        stat: "135%",
                        source: "Innvikta Threat Labs"
                      }
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="risk-stat-card"
                        style={{
                          background: "#FFFBF7",
                          borderRadius: "12px",
                          padding: "1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "1px solid #FFEAD4"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "2rem", fontWeight: "600", color: "#F15A24", marginBottom: "0.5rem" }}>{stat.stat}</div>
                          <p style={{ fontWeight: "600", color: "#1F1F1F", fontSize: "0.95rem", lineHeight: "1.4", marginBottom: "1rem" }}>{stat.desc}</p>
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "#6E6E6E", textTransform: "uppercase", fontWeight: "500", letterSpacing: "0.05em" }}>
                          Source: {stat.source}
                        </span>
                      </div>
                    ))}
                    <style>{`
                      .risk-stat-card {
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
                        box-shadow: 0 4px 12px rgba(31, 31, 31, 0.03);
                      }
                      .risk-stat-card:hover {
                        transform: translateY(-6px);
                        box-shadow: 0 16px 32px rgba(241, 90, 36, 0.08);
                        border-color: #F15A24 !important;
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. HOW THE ASSESSMENT WORKS */}
          <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>METHODOLOGY</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
                  Built Around the Same Signals Attackers Use
                </h2>
                <p className="text-18-content" style={{ color: "#6E6E6E", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", textAlign: "center" }}>
                  Before launching an attack, threat actors conduct reconnaissance. They identify exposed identities, email weaknesses, brand impersonation opportunities, and publicly available organizational information. This assessment evaluates those same exposure indicators to help security teams understand their human attack surface.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  {
                    title: "Email Security Posture",
                    weight: "30%",
                    desc: "SPF, DKIM, DMARC, email authentication, and spoofing protection."
                  },
                  {
                    title: "Identity Exposure",
                    weight: "25%",
                    desc: "Publicly discoverable employee identities and contact information."
                  },
                  {
                    title: "Employee Exposure",
                    weight: "20%",
                    desc: "Workforce visibility and publicly available organizational information."
                  },
                  {
                    title: "Brand Impersonation Risk",
                    weight: "15%",
                    desc: "Spoofing, look-alike domains, and impersonation opportunities."
                  },
                  {
                    title: "Security Maturity",
                    weight: "10%",
                    desc: "Visible governance, reporting processes, and security readiness."
                  }
                ].map((cat, i) => (
                  <div
                    key={i}
                    className="risk-stat-card"
                    style={{
                      background: "#FFFBF7",
                      border: "1px solid #FFEAD4",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6E6E6E" }}>0{i + 1}</span>
                        <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#F15A24" }}>{cat.weight}</span>
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1F1F1F", marginBottom: "0.5rem" }}>{cat.title}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#6E6E6E", lineHeight: "1.5" }}>{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. SAMPLE / DETAILED RESULTS SECTION */}
          <section id="assessment-results" style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>EXECUTIVE SUMMARY</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
                  {assessmentResult ? "Your Organization's Assessment Results" : "See What Your Assessment Reveals"}
                </h2>
                <p className="text-18-content" style={{ color: "#6E6E6E", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
                  Below is {assessmentResult ? "the live scan report" : "a realistic sample assessment"} representing human risk exposure parameters.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #E7E7E7",
                  borderLeft: "4px solid #F15A24",
                  borderRadius: "20px",
                  padding: "3rem 2.25rem",
                  boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
                  transform: "translateY(-8px)",
                  maxWidth: "960px",
                  margin: "0 auto"
                }}
              >
                {/* Score Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" style={{ borderBottom: "1px solid #E7E7E7", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
                  <div className="md:col-span-4" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6E6E6E", uppercase: "true", marginBottom: "0.5rem" }}>
                      HUMAN RISK SCORE
                    </div>
                    <div style={{ fontSize: "5rem", fontWeight: "600", color: assessmentResult ? assessmentResult.color : "#F15A24", lineHeight: "1" }}>
                      {assessmentResult ? assessmentResult.score : "67"}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#6E6E6E", marginTop: "0.25rem" }}>out of 100 max</div>
                  </div>

                  <div className="md:col-span-8" style={{ textAlign: "left" }}>
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: assessmentResult ? assessmentResult.color : "#F15A24",
                        color: "#FFFFFF",
                        padding: "0.35rem 1rem",
                        borderRadius: "4px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        letterSpacing: "0.05em",
                        marginBottom: "1rem"
                      }}
                    >
                      {assessmentResult ? assessmentResult.level : "HIGH RISK EXPOSURE"}
                    </div>
                    <p className="text-16-content" style={{ color: "#3A3A3A", lineHeight: "1.5" }}>
                      {assessmentResult ? (
                        `Based on a workforce size of ${formData.orgSize} and industry benchmarks, the domain ${formData.domain} presents high-impact vulnerabilities. Your current security maturity programs require immediate updates.`
                      ) : (
                        "Based on standard regional targeting baselines and observable perimeter controls, look-alike domain risks, exposed workforce email identities, and training maturity intervals remain elevated."
                      )}
                    </p>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "left" }}>
                  {[
                    {
                      label: "Email Security Posture",
                      val: assessmentResult ? assessmentResult.email : 72,
                      state: formData.domain 
                        ? `Weak SPF/DMARC email policies detected for the domain ${formData.domain}.`
                        : "Weak SPF/DMARC email authentication records detected.",
                      risk: ["bfsi", "government", "healthcare"].includes(formData.industry)
                        ? `As a highly targeted organization in the ${formData.industry.toUpperCase()} sector, permissive policies significantly elevate the risk of domain spoofing and spear-phishing.`
                        : formData.industry
                        ? `Permissive email policies in the ${formData.industry} industry facilitate vendor impersonation and supply chain email attacks.`
                        : "Permitted spoofed emails bypass standard filtering to appear as legitimate corporate communications.",
                      rec: ["bfsi", "government", "healthcare"].includes(formData.industry)
                        ? "Configure strict DMARC reject policies immediately, implement SPF/DKIM validation, and deploy automated spoofing alert systems."
                        : "Enforce strict DMARC reject policies and register comprehensive SPF/DKIM records."
                    },
                    {
                      label: "Identity Exposure",
                      val: assessmentResult ? assessmentResult.identity : 61,
                      state: ["10000+", "2500-9999", "500-2499"].includes(formData.orgSize)
                        ? `A large employee footprint of ${formData.orgSize} expands the identity perimeter, resulting in high volumes of exposed credentials on public indices.`
                        : formData.orgSize
                        ? `An organization size of ${formData.orgSize} employees presents key corporate identity exposure points on public databanks.`
                        : "Exposed employee email credentials and identities discoverable on public indices.",
                      risk: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                        ? "Lack of continuous security training leaves exposed identities highly vulnerable to credential stuffing and automated phishing."
                        : "Facilitates highly targeted spear-phishing campaigns, brute-force access attempts, and account takeover vectors.",
                      rec: ["10000+", "2500-9999"].includes(formData.orgSize)
                        ? "Enforce strict multi-factor authentication (MFA) across all identity providers, deploy continuous dark web scanning, and audit external directories."
                        : "Restrict public directory lookups, enforce multi-factor authentication (MFA), and audit exposed accounts."
                    },
                    {
                      label: "Employee Exposure",
                      val: assessmentResult ? assessmentResult.employee : 58,
                      state: ["10000+", "2500-9999"].includes(formData.orgSize)
                        ? `Broad organizational hierarchies for a ${formData.orgSize} workforce are easily mapped on public social networks and business registers.`
                        : formData.orgSize
                        ? `Company hierarchy and key contacts for a team size of ${formData.orgSize} are visible on public channels.`
                        : "Corporate directory structure and employee roles discoverable on public platforms.",
                      risk: ["bfsi", "government"].includes(formData.industry)
                        ? "Attackers frequently leverage this structural visibility to orchestrate high-impact C-suite impersonation and Business Email Compromise (BEC) fraud."
                        : "Allows threat actors to map reporting relationships for targeted social engineering and departmental spoofing.",
                      rec: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                        ? "Implement targeted BEC, social engineering, and C-suite impersonation training specifically for high-risk cohorts like Finance and HR."
                        : "Deliver role-based security training and define strict dual-authorization protocols for financial transactions."
                    },
                    {
                      label: "Brand Impersonation Risk",
                      val: assessmentResult ? assessmentResult.brand : 79,
                      state: formData.domain 
                        ? `Multiple look-alike domain permutations and typosquatting risks mimicking ${formData.domain} are available for malicious registrations.`
                        : "Active look-alike domains and brand abuse vectors registered by unauthorized third parties.",
                      risk: ["bfsi", "healthcare"].includes(formData.industry)
                        ? "Critical threat of credential harvesting portals and fake login pages targeting your customers, patients, or partners."
                        : "Tricks employees, suppliers, or clients into interacting with malicious look-alike portals and spoofed communication channels.",
                      rec: "Set up proactive look-alike domain monitoring, register key defensive domain variations, and establish a clear takedown protocol."
                    },
                    {
                      label: "Security Maturity",
                      val: assessmentResult ? assessmentResult.maturity : 42,
                      state: formData.trainingFreq === "never"
                        ? "No formal security awareness training is conducted, leaving the workforce vulnerable to basic threats."
                        : formData.trainingFreq === "annually"
                        ? "Security Awareness Training is run only annually, leading to low knowledge retention and secure-habit formation."
                        : formData.trainingFreq === "quarterly"
                        ? "Training is conducted quarterly, leaving significant gaps in awareness of evolving threat vectors."
                        : "Continuous monthly training is active, providing a strong baseline defense for the organization.",
                      risk: formData.phishingFreq === "never"
                        ? "Workforce resilience is completely unmeasured; susceptibility to modern phishing campaigns is unknown."
                        : formData.phishingFreq === "annually"
                        ? "Simulations are too infrequent (annually) to build active threat-reporting reflexes or change security behaviors."
                        : formData.phishingFreq === "quarterly"
                        ? "Quarterly phishing simulations are spaced too far apart, causing decay of defensive detection skills between tests."
                        : "Monthly phishing simulations are active, but must be personalized to match active role-specific threat targeting.",
                      rec: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                        ? "Transition from static/absent training to continuous monthly microlearning modules and run immediate baseline phishing tests."
                        : (formData.phishingFreq === "never" || formData.phishingFreq === "annually" || formData.phishingFreq === "quarterly")
                        ? "Increase phishing simulations to a monthly frequency and integrate real-time feedback loops directly into training."
                        : "Align simulations with real-time employee behavior metrics and roll out role-specific advanced defense modules."
                    }
                  ].map((row, idx) => (
                    <div key={idx} style={{ borderBottom: idx < 4 ? "1px solid #E7E7E7" : "none", paddingBottom: idx < 4 ? "2rem" : "0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1F1F1F" }}>{row.label}</h4>
                        <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#F15A24" }}>{row.val}% Exposure</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                        <div>
                          <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Current State:</strong>
                          <span style={{ color: "#6E6E6E" }}>{row.state}</span>
                        </div>
                        <div>
                          <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Risk Explanation:</strong>
                          <span style={{ color: "#6E6E6E" }}>{row.risk}</span>
                        </div>
                        <div>
                          <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Recommended Action:</strong>
                          <span style={{ color: "#6E6E6E" }}>{row.rec}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {assessmentResult && (
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      width: "100%",
                      marginTop: "2.5rem",
                      padding: "1rem",
                      backgroundColor: "#1F1F1F",
                      color: "#FFFFFF",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Recalculate Assessment Score
                  </button>
                )}
              </div>

              {!assessmentResult && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      document.body.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      padding: "12px 30px",
                      backgroundColor: "#F15A24",
                      color: "#FFFFFF",
                      borderRadius: "6px",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "15px",
                      cursor: "pointer"
                    }}
                  >
                    Get My Human Risk Score
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 5. FAQ SECTION */}
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
                {faqData.map((item, index) => (
                  <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                    <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-question">{item.q}</span>
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
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. FINAL CTA SECTION */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "0" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", fontSize: "2.25rem", fontWeight: "600" }}>
                    Ready to Measure Your Human Risk?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Human risk is measurable. The first step toward reducing phishing susceptibility, impersonation exposure, and workforce cyber risk is understanding where you stand today.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in" style={{ marginTop: "2.5rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        document.body.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn btn-secondary"
                    >
                      Start Free
                    </button>
                    <Link href="/book-demo" className="btn btn-primary btn-cta">
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

export default BaselineScoreToolPage;
