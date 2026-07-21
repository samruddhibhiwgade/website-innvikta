"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import { coreCards } from "./sections/constants";

import HeroSection from "./sections/Hero";
import StatsSection from "./sections/Stats";
import SolutionAccordion from "./sections/SolutionAccordion";
import ReportsDashboard from "./sections/ReportsDashboard";
import FAQSection from "./sections/Faq";
import FinalCtaSection from "./sections/FinalCta";

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
      <SeoMeta title="Human Risk Intelligence & Security Culture | Innvikta" description="Get visibility into your human cyber risk surface, benchmark security culture, and drive everyday secure employee behaviors." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection />
          <StatsSection />
          <SolutionAccordion 
            activeCoreCard={activeCoreCard}
            setActiveCoreCard={setActiveCoreCard}
            coreCardImages={coreCardImages}
          />
          <ReportsDashboard />
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

export default HumanRiskIntelligencePage;