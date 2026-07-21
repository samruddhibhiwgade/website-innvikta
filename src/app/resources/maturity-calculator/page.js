"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useRef, useEffect } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

import { CATEGORIES } from "./components/constants";
import HeroSection from "./components/Hero";
import AssessmentForm from "./components/AssessmentForm";
import ResultsDashboard from "./components/ResultsDashboard";
import FAQSection from "./components/Faq";

export default function MaturityCalculator() {
  const [step, setStep] = useState("hero"); // hero, assessment, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { categoryId: score }
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Animation state for the needle angle
  const [needleAngle, setNeedleAngle] = useState(-68);

  const resultsRef = useRef(null);

  const selectAnswer = (score) => {
    const category = CATEGORIES[currentQuestionIndex];
    setAnswers((prev) => ({ ...prev, [category.id]: score }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < CATEGORIES.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("results");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const overallScore = Math.round(
    CATEGORIES.reduce((total, cat) => {
      const score = answers[cat.id] ?? 0;
      return total + (score / 4) * 100 * cat.weight;
    }, 0)
  );

  // Trigger needle swinging animation
  useEffect(() => {
    if (step === "results") {
      const targetAngle = 
        overallScore >= 90 ? 68 :
        overallScore >= 70 ? 23 :
        overallScore >= 50 ? -23 : -68;
      
      setNeedleAngle(-68);
      const timeout = setTimeout(() => {
        setNeedleAngle(targetAngle);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [step, overallScore]);

  return (
    <GSAPWrapper>
      <SeoMeta title="Security Awareness Maturity Calculator | Innvikta" description="Assess your organization's security awareness maturity and get actionable recommendations." />
      <div className="insat-page" style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">
          {step === "hero" && (
            <HeroSection setStep={setStep} />
          )}

          {step === "assessment" && (
            <AssessmentForm 
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              selectAnswer={selectAnswer}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}

          {step === "results" && (
            <ResultsDashboard 
              resultsRef={resultsRef}
              overallScore={overallScore}
            />
          )}

          <FAQSection 
            openFaqIndex={openFaqIndex}
            setOpenFaqIndex={setOpenFaqIndex}
          />
        </div>
      </div>
    </GSAPWrapper>
  );
}