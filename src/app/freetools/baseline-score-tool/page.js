"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import HeroForm from "./components/HeroForm";
import WhyHumanRiskMatters from "./components/WhyHumanRiskMatters";
import AssessmentMethodology from "./components/AssessmentMethodology";
import AssessmentResults from "./components/AssessmentResults";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

export default function BaselineScoreToolPage() {
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

    if (formData.orgSize === "100-499") baseScore += 5;
    else if (formData.orgSize === "500-2499") baseScore += 10;
    else if (formData.orgSize === "2500-9999") baseScore += 15;
    else if (formData.orgSize === "10000+") baseScore += 20;

    if (["bfsi", "government"].includes(formData.industry)) baseScore += 15;
    else if (formData.industry === "healthcare") baseScore += 12;
    else if (formData.industry === "manufacturing") baseScore += 10;
    else if (["it", "education"].includes(formData.industry)) baseScore += 8;
    else baseScore += 5;

    if (formData.trainingFreq === "never") baseScore += 20;
    else if (formData.trainingFreq === "annually") baseScore += 12;
    else if (formData.trainingFreq === "quarterly") baseScore += 5;
    else if (formData.trainingFreq === "monthly") baseScore -= 5;

    if (formData.phishingFreq === "never") baseScore += 20;
    else if (formData.phishingFreq === "annually") baseScore += 12;
    else if (formData.phishingFreq === "quarterly") baseScore += 5;
    else if (formData.phishingFreq === "monthly") baseScore -= 5;

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

  return (
    <GSAPWrapper>
      <SeoMeta title="Free Phishing Baseline Score Calculator | Innvikta" description="Calculate your organization's baseline susceptibility to phishing simulations and compare against industry standards." />
      <div className="insat-page" ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">
          <HeroForm 
            currentQuestion={currentQuestion}
            formData={formData}
            handleInputChange={handleInputChange}
            handleBack={handleBack}
            handleNext={handleNext}
            calculateScore={calculateScore}
            setFormData={setFormData}
            setAssessmentResult={setAssessmentResult}
          />
          <WhyHumanRiskMatters />
          <AssessmentMethodology />
          <AssessmentResults 
            assessmentResult={assessmentResult}
            formData={formData}
            handleReset={handleReset}
          />
          <FAQSection 
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
}