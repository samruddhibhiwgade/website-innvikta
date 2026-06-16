"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const CultureBenchmarkingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    industry: "",
    orgSize: "",
    attitudes: "",
    behaviors: "",
    knowledge: "",
    communication: "",
    compliance: "",
    norms: "",
    ownership: ""
  });
  const [benchmarkResult, setBenchmarkResult] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-visual-card",
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
    if (currentQuestion < 9) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateBenchmark = () => {
    let score = 55;

    // Weight formulas for realism based on answers
    if (formData.attitudes === "high") score += 6;
    else if (formData.attitudes === "medium") score += 3;

    if (formData.behaviors === "high") score += 12;
    else if (formData.behaviors === "medium") score += 6;

    if (formData.knowledge === "high") score += 10;
    else if (formData.knowledge === "medium") score += 5;

    if (formData.communication === "high") score += 8;
    else if (formData.communication === "medium") score += 4;

    if (formData.compliance === "high") score += 10;
    else if (formData.compliance === "medium") score += 5;

    if (formData.norms === "high") score += 7;
    else if (formData.norms === "medium") score += 3;

    if (formData.ownership === "high") score += 8;
    else if (formData.ownership === "medium") score += 4;

    // Constrain score
    const finalScore = Math.min(98, Math.max(34, score));
    
    let band = "Foundational";
    let bandDesc = "Basic awareness exists, but security behaviors and cultural adoption remain inconsistent across the organization.";
    if (finalScore >= 86) {
      band = "Security-Driven Culture";
      bandDesc = "Security is embedded into daily decision-making, supported by strong ownership, reporting habits, and organizational reinforcement.";
    } else if (finalScore >= 76) {
      band = "Mature";
      bandDesc = "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.";
    } else if (finalScore >= 61) {
      band = "Progressing";
      bandDesc = "Security practices are becoming embedded, though key opportunities remain in behavior reinforcement and reporting culture.";
    } else if (finalScore <= 40) {
      band = "High Human Risk";
      bandDesc = "Organizations show significant cultural gaps, inconsistent security behaviors, and elevated exposure to human-driven threats.";
    }

    setBenchmarkResult({
      score: finalScore,
      band: band,
      bandDesc: bandDesc,
      ownership: Math.min(100, Math.max(45, finalScore + 8)),
      norms: Math.min(100, Math.max(35, finalScore - 9)),
      comparison: finalScore - 75 >= 0 ? `${finalScore - 75}% Above Industry Average` : `${75 - finalScore}% Below Industry Average`,
      trend: finalScore - 70 >= 0 ? `+${finalScore - 70} Points Improvement` : `${finalScore - 70} Points Trend`
    });

    setTimeout(() => {
      document.getElementById("benchmark-report")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      industry: "",
      orgSize: "",
      attitudes: "",
      behaviors: "",
      knowledge: "",
      communication: "",
      compliance: "",
      norms: "",
      ownership: ""
    });
    setCurrentQuestion(1);
    setBenchmarkResult(null);
  };

  const getScoreData = () => {
    const score = benchmarkResult ? benchmarkResult.score : 84;
    const band = benchmarkResult ? benchmarkResult.band : "Mature";
    
    // Map dimensions
    const behaviorsScore = benchmarkResult ? (formData.behaviors === "high" ? 92 : (formData.behaviors === "medium" ? 72 : (formData.behaviors === "low" ? 40 : 72))) : 84;
    const ownershipScore = benchmarkResult ? (formData.ownership === "high" ? 94 : (formData.ownership === "medium" ? 74 : (formData.ownership === "low" ? 48 : 74))) : 92;
    const complianceScore = benchmarkResult ? (formData.compliance === "high" ? 95 : (formData.compliance === "medium" ? 75 : (formData.compliance === "low" ? 50 : 75))) : 85;
    const knowledgeScore = benchmarkResult ? (formData.knowledge === "high" ? 90 : (formData.knowledge === "medium" ? 70 : (formData.knowledge === "low" ? 42 : 70))) : 82;
    const attitudesScore = benchmarkResult ? (formData.attitudes === "high" ? 95 : (formData.attitudes === "medium" ? 75 : (formData.attitudes === "low" ? 45 : 75))) : 85;
    const communicationScore = benchmarkResult ? (formData.communication === "high" ? 93 : (formData.communication === "medium" ? 73 : (formData.communication === "low" ? 46 : 73))) : 82;
    const normsScore = benchmarkResult ? (formData.norms === "high" ? 88 : (formData.norms === "medium" ? 68 : (formData.norms === "low" ? 38 : 68))) : 75;

    const dimensions = [
      { name: "Security Behaviors", weight: "25%", score: behaviorsScore, desc: "Measures phishing resilience, secure decision-making, MFA adoption, password practices, and day-to-day security habits.", color: "#F15A24" },
      { name: "Security Ownership & Accountability", weight: "15%", score: ownershipScore, desc: "Measures employee responsibility, incident ownership, proactive security participation, and accountability across teams.", color: "#3B82F6" },
      { name: "Compliance & Policy Adherence", weight: "15%", score: complianceScore, desc: "Measures policy acknowledgement, procedural compliance, training completion, and adherence to security requirements.", color: "#10B981" },
      { name: "Security Knowledge & Awareness", weight: "15%", score: knowledgeScore, desc: "Measures security understanding, assessment performance, knowledge retention, and awareness effectiveness.", color: "#8B5CF6" },
      { name: "Security Attitudes", weight: "10%", score: attitudesScore, desc: "Measures employee perception of security, willingness to engage, and commitment to secure practices.", color: "#EC4899" },
      { name: "Security Communication", weight: "10%", score: communicationScore, desc: "Measures threat reporting behavior, communication effectiveness, and engagement with security initiatives.", color: "#F59E0B" },
      { name: "Team Norms & Cultural Reinforcement", weight: "10%", score: normsScore, desc: "Measures peer influence, security champion participation, and how security behaviors are reinforced across teams.", color: "#06B6D4" }
    ];

    let maturityLevel = "Level 4 — Mature";
    let maturityDesc = "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.";
    let riskLevel = "Low–Moderate Risk";
    let riskDesc = "Primary exposure areas include social engineering susceptibility and inconsistent security reinforcement across departments.";
    let percentile = "Top 18% of Organizations Assessed";
    
    if (score >= 86) {
      maturityLevel = "Level 5 — Security-Driven Culture";
      maturityDesc = "Security is embedded into daily decision-making, supported by strong ownership, reporting habits, and organizational reinforcement.";
      riskLevel = "Low Risk";
      riskDesc = "Extremely low human risk exposure; resilient peer reinforcement and active proactive threat scanning.";
      percentile = "Top 5% of Organizations Assessed";
    } else if (score >= 76) {
      maturityLevel = "Level 4 — Mature";
      maturityDesc = "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.";
      riskLevel = "Low–Moderate Risk";
      riskDesc = "Primary exposure areas include social engineering susceptibility and inconsistent security reinforcement across departments.";
      percentile = "Top 18% of Organizations Assessed";
    } else if (score >= 61) {
      maturityLevel = "Level 3 — Progressing";
      maturityDesc = "Security practices are becoming embedded, though key opportunities remain in behavior reinforcement and reporting culture.";
      riskLevel = "Moderate Risk";
      riskDesc = "Moderate risk exposure in credential sharing, reporting lag, and peer accountability.";
      percentile = "Top 42% of Organizations Assessed";
    } else if (score >= 41) {
      maturityLevel = "Level 2 — Foundational";
      maturityDesc = "Basic awareness exists, but security behaviors and cultural adoption remain inconsistent across the organization.";
      riskLevel = "High Risk";
      riskDesc = "Elevated threat vectors in social engineering and shadow IT due to lack of policy compliance.";
      percentile = "Top 70% of Organizations Assessed";
    } else {
      maturityLevel = "Level 1 — High Human Risk";
      maturityDesc = "Organizations show significant cultural gaps, inconsistent security behaviors, and elevated exposure to human-driven threats.";
      riskLevel = "Critical Human Risk";
      riskDesc = "High susceptibility to phishing, social engineering, and security policy bypasses.";
      percentile = "Top 95% of Organizations Assessed";
    }

    // Dynamic recommendations based on lower dimensions
    const sortedDims = [...dimensions].sort((a, b) => a.score - b.score);
    const recommendations = [];
    
    sortedDims.forEach((dim) => {
      if (dim.name.includes("Norms")) {
        recommendations.push("Strengthen security champion programs to drive peer adoption");
        recommendations.push("Increase peer-led security engagement and feedback sessions");
      } else if (dim.name.includes("Behaviors")) {
        recommendations.push("Expand behavior-based security coaching and micro-nudges");
      } else if (dim.name.includes("Ownership")) {
        recommendations.push("Define clear team-level security accountability and ownership metrics");
      } else if (dim.name.includes("Compliance")) {
        recommendations.push("Automate policy acknowledgment loops and streamline compliance reminders");
      } else if (dim.name.includes("Knowledge")) {
        recommendations.push("Deploy personalized awareness training targeting cognitive gaps");
      } else if (dim.name.includes("Attitudes")) {
        recommendations.push("Establish executive messaging and positive reinforcement to build engagement");
      } else if (dim.name.includes("Communication")) {
        recommendations.push("Improve cross-team security communication channels and report simplified feedback");
      }
    });

    // Make sure we have exactly 4 items
    while (recommendations.length < 4) {
      recommendations.push("Conduct periodic human risk assessments to track performance");
    }

    // Dynamic comparison
    const diff = score - 75;
    const comparisonText = diff >= 0 ? `+${diff}% Above Peer Average` : `${Math.abs(diff)}% Below Peer Average`;

    // Dynamic trend
    const trendText = score >= 76 ? "+6 Point Improvement" : (score >= 61 ? "+3 Point Improvement" : "+1 Point Improvement");
    const trendDetail = score >= 76 
      ? "Driven by increased reporting activity, stronger policy adherence, and improved phishing resilience."
      : "Supported by baseline completion rates and early policy acknowledgment engagement.";

    // Generate dynamic executive summary
    let execSummary = `Your organization demonstrates a ${band.toLowerCase()} security culture supported by strong accountability, reporting participation, and policy adherence. Employees generally understand their security responsibilities and actively contribute to reducing organizational risk. The most significant opportunity for improvement lies in strengthening ${sortedDims[0].name.toLowerCase()} so that secure behaviors are consistently reinforced across departments. Organizations that improve cultural reinforcement typically achieve higher reporting rates, stronger phishing resilience, and lower human-related security incidents over time.`;

    if (benchmarkResult) {
      const highest = dimensions.reduce((prev, current) => (prev.score > current.score) ? prev : current);
      const lowest = dimensions.reduce((prev, current) => (prev.score < current.score) ? prev : current);
      let sum = `Your organization demonstrates a ${band.toLowerCase()} security culture (score: ${score}/100) `;
      
      if (score >= 86) {
        sum += `supported by industry-leading habits, with particular strength in ${highest.name} (${highest.score}/100). Secure behaviors are deeply embedded in your daily operations. `;
      } else if (score >= 76) {
        sum += `supported by strong accountability and policy adherence, led by high performance in ${highest.name} (${highest.score}/100). Employees generally take proactive ownership of safety. `;
      } else if (score >= 61) {
        sum += `with established awareness foundations, marked by a relative strength in ${highest.name} (${highest.score}/100). However, cultural adoption and behavior management remain somewhat inconsistent. `;
      } else if (score >= 41) {
        sum += `where basic compliance exists, showing a minor strength in ${highest.name} (${highest.score}/100), but significant behavioral gaps persist across key operational areas. `;
      } else {
        sum += `with critical cultural vulnerabilities, although ${highest.name} (${highest.score}/100) is your highest indicator. Immediate strategic interventions are required to mitigate human threat exposure. `;
      }

      sum += `The most significant opportunity for improvement lies in strengthening ${lowest.name} (${lowest.score}/100), which ${lowest.desc.toLowerCase().replace('measures ', 'focuses on ')}. `;

      if (score >= 76) {
        sum += `Organizations that successfully address these gaps typically achieve higher reporting rates, stronger phishing resilience, and lower human-related security incidents over time.`;
      } else {
        sum += `Prioritizing these cultural reinforcement areas is crucial for establishing baseline security ownership, improving reporting behaviors, and reducing overall human risk.`;
      }
      execSummary = sum;
    }

    return {
      score,
      band,
      dimensions,
      maturityLevel,
      maturityDesc,
      riskLevel,
      riskDesc,
      percentile,
      recommendations: recommendations.slice(0, 4),
      comparisonText,
      trendText,
      trendDetail,
      execSummary
    };
  };

  const faqData = [
    {
      q: "What is a security culture benchmark?",
      a: "A security culture benchmark evaluates how employees think about, communicate about, and practice security across an organization. It goes beyond technical controls to measure human risk variables, helping identify cultural strengths, blind spots, and specific maturity improvement opportunities."
    },
    {
      q: "How is the benchmark score calculated?",
      a: "Scores are generated using a weighted algorithm across seven critical security dimensions. The calculation incorporates security behaviors (25%), compliance practices (15%), responsibilities/ownership (15%), knowledge (15%), attitudes (10%), communication (10%), and team norms (10%)."
    },
    {
      q: "Does this benchmark replace a security assessment?",
      a: "No. This benchmark evaluates human and cultural risk factors, reflecting workforce vulnerability and behavioral security maturity. It should complement broader cybersecurity penetration tests, vulnerability assessments, and technical audits."
    },
    {
      q: "How long does the benchmark take?",
      a: "Most organizations can complete the benchmarking questionnaire in less than five minutes. Results are generated instantly, providing a clear score, maturity band, and specific improvement actions."
    },
    {
      q: "Who should use this tool?",
      a: "Security leaders, CISOs, HR teams, compliance managers, and organizations seeking to measure human risk, satisfy compliance mandates, and build a resilient workforce security posture."
    }
  ];

  const scoreData = getScoreData();

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">

          {/* SECTION 1: HERO */}
          <section className="hero-section" style={{ background: "#FFFFFF", paddingBottom: "5rem", paddingTop: "4rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "75vh" }}>
                
                {/* Left Column: Headlines */}
                <div className="lg:col-span-7 hero-content" style={{ textAlign: "left", padding: "0" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "500" }}>FREE HUMAN RISK SCAN</span>
                  <h1 className="text-64-heading" style={{ color: "#1F1F1F", fontWeight: "600", lineHeight: "1.05", marginBottom: "1.5rem" }}>
                    Security Culture Maturity Benchmark & <span style={{ color: "#F15A24" }}>Human Risk Assessment</span>
                  </h1>
                  <p className="text-18-content" style={{ color: "#3A3A3A", opacity: "0.9", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px" }}>
                    Measure how your organization&apos;s security culture compares against industry standards. Evaluate awareness, behaviors, reporting habits, compliance practices, and human risk indicators to understand where your culture stands today.
                  </p>
                </div>

                {/* Right Column: Premium Benchmark Visual / Form Card */}
                <div className="lg:col-span-5 hero-visual-card">
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
                    {!benchmarkResult ? (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#F15A24" }}>
                            Question {currentQuestion} of 9
                          </span>
                          <div style={{ display: "flex", gap: "0.25rem" }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                              <div
                                key={i}
                                style={{
                                  width: "10px",
                                  height: "4px",
                                  borderRadius: "2px",
                                  backgroundColor: i <= currentQuestion ? "#F15A24" : "#E7E7E7",
                                  transition: "background-color 0.3s ease"
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Questions */}
                        {currentQuestion === 1 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Select Industry</h3>
                            <select
                              value={formData.industry}
                              onChange={(e) => handleInputChange("industry", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Select industry...</option>
                              <option value="bfsi">BFSI</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="technology">Technology & IT</option>
                              <option value="government">Government & Public</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 2 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Organization Size</h3>
                            <select
                              value={formData.orgSize}
                              onChange={(e) => handleInputChange("orgSize", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Select workforce size...</option>
                              <option value="1-99">1 - 99 employees</option>
                              <option value="100-499">100 - 499 employees</option>
                              <option value="500-2499">500 - 2,499 employees</option>
                              <option value="2500+">2,500+ employees</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 3 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Attitudes</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How do employees perceive security policies and mandates?</p>
                            <select
                              value={formData.attitudes}
                              onChange={(e) => handleInputChange("attitudes", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Positive/Understands business importance</option>
                              <option value="medium">Neutral/Complies but finds it disruptive</option>
                              <option value="low">Negative/Views security as an obstacle</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 4 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Behaviors</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How regularly do employees exhibit safe security habits in their daily workflows?</p>
                            <select
                              value={formData.behaviors}
                              onChange={(e) => handleInputChange("behaviors", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Always lock screens, verify senders, use safe managers</option>
                              <option value="medium">Occasionally bypass safety for convenience</option>
                              <option value="low">Frequent security shortcuts and policy workarounds</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 5 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Knowledge</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees understand cybersecurity threat vectors (phishing, social engineering, AI-clones)?</p>
                            <select
                              value={formData.knowledge}
                              onChange={(e) => handleInputChange("knowledge", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Highly aware of modern and AI-driven attack vectors</option>
                              <option value="medium">Familiar with phishing, but lacks knowledge of deepfakes/BEC</option>
                              <option value="low">Minimal knowledge, struggles to identify threats</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 6 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Communication</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees know where and how to report security concerns?</p>
                            <select
                              value={formData.communication}
                              onChange={(e) => handleInputChange("communication", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Reports threats immediately via structured channels</option>
                              <option value="medium">Discusses concerns with peers but rarely logs them formally</option>
                              <option value="low">Avoids reporting due to complex channels or fear of blame</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 7 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Compliance Practices</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Are compliance policies followed consistently rather than just during audits?</p>
                            <select
                              value={formData.compliance}
                              onChange={(e) => handleInputChange("compliance", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Continuous policy compliance and clean audits</option>
                              <option value="medium">Policies followed loosely outside of review seasons</option>
                              <option value="low">Widespread non-compliance or lack of policy awareness</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 8 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Team Norms</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do peers actively encourage and reinforce secure behaviors among one another?</p>
                            <select
                              value={formData.norms}
                              onChange={(e) => handleInputChange("norms", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Peers actively support and check on security habits</option>
                              <option value="medium">Tolerates secure behaviors but doesn&apos;t advocate them</option>
                              <option value="low">Secure behavior is often teased or bypassed by team pressure</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 9 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Ownership</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees feel personally responsible for protecting the organization?</p>
                            <select
                              value={formData.ownership}
                              onChange={(e) => handleInputChange("ownership", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">High ownership; views security as part of their job role</option>
                              <option value="medium">Moderate; feels it is primarily IT/Security&apos;s responsibility</option>
                              <option value="low">Zero ownership; assumes security teams handle everything</option>
                            </select>
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
                                background: "#FFFFFF",
                                color: "#3A3A3A",
                                fontWeight: "400",
                                borderRadius: "8px",
                                cursor: "pointer"
                              }}
                            >
                              Back
                            </button>
                          )}
                          
                          {currentQuestion < 9 ? (
                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={
                                (currentQuestion === 1 && !formData.industry) ||
                                (currentQuestion === 2 && !formData.orgSize) ||
                                (currentQuestion === 3 && !formData.attitudes) ||
                                (currentQuestion === 4 && !formData.behaviors) ||
                                (currentQuestion === 5 && !formData.knowledge) ||
                                (currentQuestion === 6 && !formData.communication) ||
                                (currentQuestion === 7 && !formData.compliance) ||
                                (currentQuestion === 8 && !formData.norms)
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
                                  (currentQuestion === 1 && !formData.industry) ||
                                  (currentQuestion === 2 && !formData.orgSize) ||
                                  (currentQuestion === 3 && !formData.attitudes) ||
                                  (currentQuestion === 4 && !formData.behaviors) ||
                                  (currentQuestion === 5 && !formData.knowledge) ||
                                  (currentQuestion === 6 && !formData.communication) ||
                                  (currentQuestion === 7 && !formData.compliance) ||
                                  (currentQuestion === 8 && !formData.norms)
                                ) ? 0.5 : 1
                              }}
                            >
                              Next Question
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={calculateBenchmark}
                              disabled={!formData.ownership}
                              style={{
                                flex: 2,
                                padding: "0.75rem",
                                background: "#F15A24",
                                color: "#FFFFFF",
                                fontWeight: "500",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                opacity: !formData.ownership ? 0.5 : 1
                              }}
                            >
                              Calculate My Culture Score
                            </button>
                          )}
                        </div>

                        {currentQuestion === 9 && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                industry: "technology",
                                orgSize: "500-2499",
                                attitudes: "high",
                                behaviors: "high",
                                knowledge: "medium",
                                communication: "high",
                                compliance: "high",
                                norms: "medium",
                                ownership: "high"
                              });
                              setBenchmarkResult({
                                score: 84,
                                band: "Mature",
                                bandDesc: "Strong security habits are established. Most employees take ownership, though peer-led reinforcement has room to grow.",
                                ownership: 92,
                                norms: 75,
                                comparison: "12% Above Industry Average",
                                trend: "+6 Points Improvement"
                              });
                              setTimeout(() => {
                                document.getElementById("benchmark-report")?.scrollIntoView({ behavior: "smooth" });
                              }, 100);
                            }}
                            style={{
                              width: "100%",
                              marginTop: "0.75rem",
                              background: "none",
                              border: "none",
                              color: "#6B7280",
                              fontSize: "0.8rem",
                              fontWeight: "400",
                              textDecoration: "underline",
                              cursor: "pointer",
                              textAlign: "center"
                            }}
                          >
                            View Sample Report
                          </button>
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                          Security Culture Score
                        </div>
                        <div style={{ fontSize: "5rem", fontWeight: "600", color: "#F15A24", lineHeight: "1" }}>
                          {benchmarkResult.score}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#6B7280", marginTop: "0.25rem", fontWeight: "500" }}>
                          Top 20% of Peer Organizations
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.5rem", textAlign: "left", fontSize: "0.85rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981" }}>
                            <span>↑ Reporting Culture</span>
                            <strong>Active</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981" }}>
                            <span>↑ Security Ownership</span>
                            <strong>Active</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#EF4444" }}>
                            <span>↓ Peer Security Reinforcement</span>
                            <strong>Risk Area</strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleReset}
                          style={{
                            width: "100%",
                            marginTop: "1.5rem",
                            padding: "0.75rem",
                            backgroundColor: "#1F1F1F",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Reset Benchmark
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT IS SECURITY CULTURE BENCHMARKING */}
          <section style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Editorial Content */}
                <div className="lg:col-span-6" style={{ textAlign: "left" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
                    CULTURE DEFINED
                  </span>
                  <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                    What Does Security Culture Actually Measure?
                  </h2>
                  <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Security culture goes beyond awareness training. Organizations with strong security cultures consistently demonstrate safer employee behaviors, faster threat reporting, stronger accountability, and lower human-driven security incidents.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    A mature security culture is not defined by completed training alone. It is reflected in how employees recognize threats, make security decisions, follow policies, and support secure behaviors across teams.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Organizations with stronger reporting and ownership cultures often detect threats earlier and reduce the impact of human-related security incidents.
                  </p>
                </div>

                {/* Right Column: Visual Bento Grid Framework */}
                <div className="lg:col-span-6">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                    
                    {/* Section Header (Spans 2 columns, borderless) */}
                    <div style={{ gridColumn: "span 2", marginBottom: "0.25rem", textAlign: "left" }}>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                        Seven Core Culture Dimensions Evaluated:
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0 0" }}>
                        Inspired by global human risk management research.
                      </p>
                    </div>

                    {/* Bento Grid Items */}
                    {[
                      { title: "Security Attitudes", desc: "Beliefs and perceptions about security policies." },
                      { title: "Security Behaviors", desc: "Active safe habits in daily system interactions." },
                      { title: "Security Knowledge", desc: "Understanding vectors, mechanics, and reporting." },
                      { title: "Security Communication", desc: "How feedback loops and incidents are reported." },
                      { title: "Compliance Practices", desc: "Consistency in policy acceptance and execution." },
                      { title: "Team Norms", desc: "Peer-to-peer security reinforcement and check-ins." },
                      { title: "Security Ownership", desc: "Personal responsibility and duty of care." }
                    ].map((dim, i) => (
                      <div
                        key={i}
                        className="risk-stat-card"
                        style={{
                          gridColumn: i === 6 ? "span 2" : "auto", // Spans 2 columns for the last item (Security Ownership)
                          background: "#FFFFFF",
                          border: "1px solid #E7E7E7",
                          borderLeft: "4px solid #F15A24",
                          borderRadius: "16px",
                          padding: "1.25rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                          <span style={{
                            background: "#FFEFEA",
                            color: "#F15A24",
                            borderRadius: "50%",
                            minWidth: "22px",
                            minHeight: "22px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: "600"
                          }}>
                            0{i + 1}
                          </span>
                          <strong style={{ fontSize: "0.95rem", color: "#1F1F1F" }}>{dim.title}</strong>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0, lineHeight: "1.4" }}>{dim.desc}</p>
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 3: HOW THE BENCHMARK SCORE IS CALCULATED */}
          <section style={{ background: "#FDFDFD", paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>METHODOLOGY</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1.5rem" }}>
                  How the Benchmark Score Is Calculated
                </h2>
                <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", textAlign: "center" }}>
                  Unlike generic awareness scores, this benchmark evaluates multiple indicators of security culture maturity to provide a balanced view of organizational human risk and security behavior.
                </p>
              </div>

              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(12, 1fr)", 
                  gap: "2.5rem" 
                }}
              >
                
                {/* Left Column: Weighted Culture Dimensions (7 cols on lg, 12 cols on mobile) */}
                <div className="calculation-col" style={{ gridColumn: "span 7" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                      Weighted Culture Dimensions
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 1.5rem 0", textAlign: "left" }}>
                    Each dimension contributes to your overall benchmark score.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { name: "Security Behaviors", weight: "25%", desc: "Measures phishing resilience, secure decision-making, MFA adoption, password practices, and day-to-day security habits.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                      { name: "Security Ownership & Accountability", weight: "15%", desc: "Measures employee responsibility, incident ownership, proactive security participation, and accountability across teams.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                      { name: "Compliance & Policy Adherence", weight: "15%", desc: "Measures policy acknowledgement, procedural compliance, training completion, and adherence to security requirements.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg> },
                      { name: "Security Knowledge & Awareness", weight: "15%", desc: "Measures security understanding, assessment performance, knowledge retention, and awareness effectiveness.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg> },
                      { name: "Security Attitudes", weight: "10%", desc: "Measures employee perception of security, willingness to engage, and commitment to secure practices.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
                      { name: "Security Communication", weight: "10%", desc: "Measures threat reporting behavior, communication effectiveness, and engagement with security initiatives.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                      { name: "Team Norms & Cultural Reinforcement", weight: "10%", desc: "Measures peer influence, security champion participation, and how security behaviors are reinforced across teams.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          padding: "1rem 1.25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1rem"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                          <div 
                            style={{ 
                              background: "#FFF0EC", 
                              borderRadius: "10px", 
                              width: "38px", 
                              height: "38px", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              flexShrink: 0
                            }}
                          >
                            {item.icon}
                          </div>
                          <div style={{ flex: 1, textAlign: "left" }}>
                            <strong style={{ fontSize: "0.9rem", color: "#1F1F1F", display: "block", marginBottom: "0.15rem" }}>
                              {item.name}
                            </strong>
                            <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 0.5rem 0", lineHeight: "1.4" }}>
                              {item.desc}
                            </p>
                            {/* Weight Progress Bar */}
                            <div style={{ width: "80%", maxWidth: "300px", height: "4px", background: "#E5E7EB", borderRadius: "2px", overflow: "hidden" }}>
                              <div style={{ width: item.weight, height: "100%", background: "#F15A24" }} />
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#F15A24", display: "block" }}>{item.weight}</span>
                          <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>Weight</span>
                        </div>
                      </div>
                    ))}

                    {/* Total Weight Card */}
                    <div 
                      style={{
                        background: "#FAF9F6",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        padding: "1rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div 
                          style={{ 
                            background: "#F3F4F6", 
                            borderRadius: "10px", 
                            width: "38px", 
                            height: "38px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <strong style={{ fontSize: "0.9rem", color: "#1F1F1F", display: "block" }}>Total Weight</strong>
                          <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>All dimensions combined</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#F15A24" }}>100%</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Column: Benchmark Classifications (5 cols on lg, 12 cols on mobile) */}
                <div className="calculation-col" style={{ gridColumn: "span 5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                      Benchmark Classifications
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 1.5rem 0", textAlign: "left" }}>
                    Understand what your score range means.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { range: "86–100", label: "Security-Driven Culture", desc: "Security is embedded into daily decision-making, supported by strong ownership, reporting habits, and organizational reinforcement.", color: "#10B981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a7 7 0 0 0-7 7c0 2.2 1 4.1 2.6 5.4l2.4 2.1c1 .9 2.6.9 3.6 0l2.4-2.1c1.6-1.3 2.6-3.2 2.6-5.4a7 7 0 0 0-7-7z"/></svg> },
                      { range: "76–85", label: "Mature", desc: "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                      { range: "61–75", label: "Progressing", desc: "Security practices are becoming embedded, though key opportunities remain in behavior reinforcement and reporting culture.", color: "#3B82F6", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polygon points="17 6 23 6 23 12"/></svg> },
                      { range: "41–60", label: "Foundational", desc: "Basic awareness exists, but security behaviors and cultural adoption remain inconsistent across the organization.", color: "#F59E0B", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18M18 22H6M8 6h8M8 10h8M8 14h8M8 18h8"/></svg> },
                      { range: "0–40", label: "High Human Risk", desc: "Organizations show significant cultural gaps, inconsistent security behaviors, and elevated exposure to human-driven threats.", color: "#EF4444", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
                    ].map((band, idx) => {
                      const isCurrentBand = scoreData.band === band.label;
                      return (
                        <div 
                          key={idx}
                          style={{
                            background: "#FFFFFF",
                            border: isCurrentBand ? `2px solid ${band.color}` : "1px solid #E5E7EB",
                            borderRadius: "12px",
                            padding: "1.25rem",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                            textAlign: "left",
                            boxShadow: isCurrentBand ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <div 
                            style={{ 
                              background: isCurrentBand ? "#FFEFEA" : "#F9FAFB", 
                              borderRadius: "50%", 
                              width: "36px", 
                              height: "36px", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              flexShrink: 0
                            }}
                          >
                            {band.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                              <strong style={{ fontSize: "0.95rem", color: band.color }}>{band.label}</strong>
                              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: "600" }}>{band.range}</span>
                            </div>
                            <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0, lineHeight: "1.4" }}>{band.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Methodology Note Block repositioned here to fill empty space and align column heights */}
                  <div 
                    style={{ 
                      marginTop: "1.5rem", 
                      background: "#FAF9F6", 
                      border: "1px solid #E5E7EB", 
                      borderRadius: "12px", 
                      padding: "1.25rem 1.5rem", 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      textAlign: "left" 
                    }}
                  >
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1 }}>
                      <span style={{ fontSize: "2.5rem", color: "#F15A24", fontFamily: "Georgia, serif", lineHeight: "1", marginTop: "-0.5rem" }}>
                        “
                      </span>
                      <div>
                        <strong style={{ display: "block", fontSize: "0.9rem", color: "#1F1F1F", marginBottom: "0.25rem" }}>Methodology Note</strong>
                        <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0, lineHeight: "1.5" }}>
                          Each dimension is normalized to a 100-point scale and weighted according to its impact on human risk reduction. The final benchmark score reflects both individual behaviors and broader organizational culture indicators rather than relying on training completion alone.
                        </p>
                      </div>
                    </div>
                    {/* Clipboard Line-art graphic */}
                    <div style={{ flexShrink: 0 }} className="hidden sm:block">
                      <svg width="36" height="42" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scale(0.85)" }}>
                        <rect x="6" y="8" width="36" height="44" rx="4" stroke="#9CA3AF" strokeWidth="2"/>
                        <path d="M16 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="#9CA3AF" strokeWidth="2"/>
                        <line x1="14" y1="18" x2="34" y2="18" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="14" y1="26" x2="28" y2="26" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="14" y1="34" x2="24" y2="34" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="36" cy="38" r="8" fill="#FFF0EC" stroke="#F15A24" strokeWidth="2"/>
                        <path d="M33 38l2 2 3-3" stroke="#F15A24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* SECTION 4: EXECUTIVE BENCHMARK REPORT (EXECUTIVE FORMAT) */}
          <section id="benchmark-report" style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>CULTURE SCORECARD</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
                  {benchmarkResult ? "Your Security Culture Profile" : "Interactive Culture Maturity Report"}
                </h2>
                <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
                  Receive a detailed culture maturity assessment with benchmark comparisons, risk insights, and prioritized improvement opportunities.
                </p>
              </div>

              {/* The Executive Report Document */}
              <div 
                style={{
                  background: "#FFFFFF",
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
                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1F1F1F", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1F1F1F", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Security Culture Maturity Assessment
                    </h3>
                    <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontSize: "0.85rem", color: "#6B7280" }}>
                      <span><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span><strong>Industry:</strong> {formData.industry ? formData.industry.toUpperCase() : "TECHNOLOGY & IT"}</span>
                      <span><strong>Workforce Size:</strong> {formData.orgSize ? formData.orgSize : "500–2,499"}</span>
                    </div>
                  </div>
                </div>

                {/* Part 1: Executive Summary */}
                <div style={{ marginBottom: "3rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                    I. Executive Insight Summary
                  </h4>
                  <div style={{ background: "#FDFDFD", borderLeft: "4px solid #E7E7E7", padding: "1.5rem 2rem", borderRadius: "0 8px 8px 0" }}>
                    <p style={{ fontSize: "1rem", color: "#3A3A3A", lineHeight: "1.8", margin: 0, fontStyle: "italic" }}>
                      &ldquo;{scoreData.execSummary}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Part 2: Key Score Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "3.5rem", borderTop: "1px solid #E7E7E7", borderBottom: "1px solid #E7E7E7", paddingTop: "2rem", paddingBottom: "2rem" }}>
                  {/* Left Metric Column */}
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Culture Score & Status</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginTop: "0.75rem" }}>
                      <strong style={{ fontSize: "4.5rem", color: "#F15A24", fontWeight: "800", lineHeight: 1 }}>{scoreData.score}</strong>
                      <div>
                        <span style={{ fontSize: "1rem", fontWeight: "700", color: "#1F1F1F", display: "block" }}>/ 100 Index</span>
                        <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>{scoreData.percentile}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0", borderBottom: "1px solid #E7E7E7" }}>
                        <span style={{ color: "#6B7280" }}>Maturity Level:</span>
                        <strong style={{ color: "#1F1F1F" }}>{scoreData.maturityLevel}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0" }}>
                        <span style={{ color: "#6B7280" }}>Maturity Band Description:</span>
                        <span style={{ color: "#3A3A3A", textAlign: "left", maxWidth: "240px", fontWeight: "500" }}>{scoreData.maturityDesc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Metric Column */}
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Human Risk Indicators</span>
                    <div style={{ marginTop: "0.75rem" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "20px", background: scoreData.score >= 76 ? "#FFEFEA" : "#FEE2E2", color: scoreData.score >= 76 ? "#F15A24" : "#EF4444", fontWeight: "700", fontSize: "0.9rem" }}>
                        {scoreData.riskLevel} Rating
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "0.5rem", lineHeight: "1.5" }}>
                        {scoreData.riskDesc}
                      </p>
                    </div>

                    <div style={{ marginTop: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0", borderBottom: "1px solid #E7E7E7" }}>
                        <span style={{ color: "#6B7280" }}>Industry Comparison:</span>
                        <strong style={{ color: "#10B981" }}>{scoreData.comparisonText}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0" }}>
                        <span style={{ color: "#6B7280" }}>QoQ Trend Status:</span>
                        <strong style={{ color: "#10B981" }}>{scoreData.trendText}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 3: Dimension Score Breakdown Table */}
                <div style={{ marginBottom: "3.5rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem" }}>
                    II. Structured Dimension Scorecard
                  </h4>
                  
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #1F1F1F", color: "#6B7280", fontWeight: "600" }}>
                        <th style={{ padding: "0.75rem 0" }}>Dimension Name</th>
                        <th style={{ padding: "0.75rem 0", textAlign: "center" }}>Weight</th>
                        <th style={{ padding: "0.75rem 0", textAlign: "right" }}>Dimension Index</th>
                        <th style={{ padding: "0.75rem 0", textAlign: "right" }}>Performance Band</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoreData.dimensions.map((dim, idx) => {
                        let status = "Satisfactory";
                        let statusColor = "#F59E0B";
                        if (dim.score >= 90) {
                          status = "Outstanding";
                          statusColor = "#10B981";
                        } else if (dim.score >= 80) {
                          status = "Strong";
                          statusColor = "#10B981";
                        } else if (dim.score >= 70) {
                          status = "Satisfactory";
                          statusColor = "#3B82F6";
                        } else {
                          status = "Action Required";
                          statusColor = "#EF4444";
                        }
                        
                        return (
                          <tr key={idx} style={{ borderBottom: "1px solid #E7E7E7" }}>
                            <td style={{ padding: "1rem 0", fontWeight: "500", color: "#1F1F1F" }}>{dim.name}</td>
                            <td style={{ padding: "1rem 0", textAlign: "center", color: "#6B7280" }}>{dim.weight}</td>
                            <td style={{ padding: "1rem 0", textAlign: "right", fontWeight: "700", color: "#1F1F1F" }}>{dim.score} / 100</td>
                            <td style={{ padding: "1rem 0", textAlign: "right" }}>
                              <span style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", color: statusColor, border: `1px solid ${statusColor}`, padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Part 4: Recommendations Action Plan */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem" }}>
                    III. Tactical Action & Mitigation Plan
                  </h4>
                  
                  <div style={{ background: "#FDFDFD", border: "1px solid #E7E7E7", borderRadius: "8px", padding: "1.5rem 2rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {scoreData.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                          <span style={{ 
                            background: "#FFEFEA", 
                            color: "#F15A24", 
                            borderRadius: "50%", 
                            minWidth: "24px", 
                            minHeight: "24px", 
                            display: "inline-flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            fontSize: "0.8rem", 
                            fontWeight: "700" 
                          }}>
                            0{rIdx + 1}
                          </span>
                          <div>
                            <strong style={{ fontSize: "0.95rem", color: "#1F1F1F", display: "block" }}>
                              {rec.split(" targeting ")[0].split(" to ")[0]}
                            </strong>
                            <span style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "0.15rem", display: "block" }}>
                              {rec}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 5: WHY SECURITY CULTURE MATTERS */}
          <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Content */}
                <div className="lg:col-span-7" style={{ textAlign: "left" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
                    THE HUMAN FIREWALL
                  </span>
                  <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                    Human Behavior Remains One of the Largest Security Risks
                  </h2>
                  <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Technical controls alone cannot eliminate risk. Many security incidents still involve phishing, credential misuse, social engineering, policy violations, or unsafe employee behavior.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Organizations that continuously measure and improve security culture are better positioned to:
                  </p>
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {[
                      { 
                        label: "Reduce human risk", 
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                        )
                      },
                      { 
                        label: "Improve threat reporting rates", 
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                        )
                      },
                      { 
                        label: "Strengthen security awareness", 
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 7.5 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                            <line x1="9" y1="18" x2="15" y2="18"/>
                            <line x1="10" y1="22" x2="14" y2="22"/>
                          </svg>
                        )
                      },
                      { 
                        label: "Support compliance initiatives", 
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                            <polyline points="9 14 11 16 15 12"/>
                          </svg>
                        )
                      },
                      { 
                        label: "Build long-term security resilience", 
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <path d="M3 3v18h18"/>
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                          </svg>
                        )
                      }
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1rem", color: "#1F1F1F", lineHeight: "1.5" }}>
                        {item.icon}
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Editorial Statistic Presentation */}
                <div className="lg:col-span-5" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      background: "#FFFBF7",
                      border: "1px solid #FFEAD4",
                      borderRadius: "20px",
                      padding: "3.5rem 2rem",
                      boxShadow: "0 10px 30px rgba(241, 90, 36, 0.02)"
                    }}
                  >
                    <div style={{ fontSize: "6.5rem", fontWeight: "700", color: "#F15A24", lineHeight: "1" }}>
                      91%
                    </div>
                    <strong style={{ fontSize: "1.2rem", color: "#1F1F1F", display: "block", marginTop: "1rem" }}>
                      of cyber attacks begin with human interaction.
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#6B7280", display: "block", marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Source: Threat Intelligence Reports
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 6: FINAL CTA + FAQ */}
          
          {/* FAQ SUBSECTION */}
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

          {/* FINAL CTA SUBSECTION (WAVE STYLE) */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "0" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", fontSize: "2.25rem", fontWeight: "600" }}>
                    Benchmark Your Security Culture in Minutes
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Get an instant assessment of your organization&apos;s security culture maturity and discover opportunities to strengthen human risk resilience.
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
                      <span>Book a Demo</span>
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

           {/* Embedded Styles for Hover Popups */}
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
            .tooltip-trigger {
              position: relative;
              margin-left: 8px;
              display: inline-flex;
              align-items: center;
            }
            .tooltip-content {
              visibility: hidden;
              width: 260px;
              background-color: #1F1F1F;
              color: #FFFFFF;
              text-align: left;
              border-radius: 8px;
              padding: 0.75rem 1rem;
              position: absolute;
              z-index: 100;
              bottom: 125%;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0;
              transition: opacity 0.3s;
              box-shadow: 0 10px 20px rgba(0,0,0,0.15);
              font-size: 0.75rem;
              line-height: 1.4;
              font-weight: 400;
            }
            .tooltip-content::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: #1F1F1F transparent transparent transparent;
            }
            .tooltip-trigger:hover .tooltip-content {
              visibility: visible;
              opacity: 1;
            }
            .bento-tile {
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .bento-tile:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 24px rgba(31, 31, 31, 0.06) !important;
              border-color: #F15A24 !important;
            }
            .bento-label {
              font-size: 0.75rem;
              font-weight: 600;
              color: #6B7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            @media (max-width: 768px) {
              .bento-tile {
                grid-column: span 12 !important;
              }
            }
            @media (max-width: 991px) {
              .calculation-col {
                grid-column: span 12 !important;
              }
            }
          `}</style>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default CultureBenchmarkingPage;
