"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import HeroSection from "./components/Hero";
import DimensionsOverview from "./components/DimensionsOverview";
import BenchmarkReport from "./components/BenchmarkReport";
import ExecutiveReport from "./components/ExecutiveReport";
import WhyCultureMatters from "./components/WhyCultureMatters";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

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

  return (
    <GSAPWrapper>
      <SeoMeta title="Security Culture Benchmarking Tool | Innvikta" description="Assess and benchmark your organization's security culture and reporting behaviors." />
      <div className="insat-page" ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">
          <HeroSection 
            currentQuestion={currentQuestion}
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
            calculateBenchmark={calculateBenchmark}
            benchmarkResult={benchmarkResult}
            handleReset={handleReset}
          />
          <DimensionsOverview />
          <BenchmarkReport 
            benchmarkResult={benchmarkResult}
            formData={formData}
            handleReset={handleReset}
          />
          <ExecutiveReport 
            benchmarkResult={benchmarkResult}
            formData={formData}
          />
          <WhyCultureMatters />
          <FAQSection 
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default CultureBenchmarkingPage;