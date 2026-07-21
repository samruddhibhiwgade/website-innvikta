"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import { policyCards } from "./sections/constants";

import HeroSection from "./sections/Hero";
import OverviewSection from "./sections/Overview";
import PolicyProgramsSection from "./sections/PolicyPrograms";
import TargetedPathsSection from "./sections/TargetedPaths";
import HighRiskSection from "./sections/HighRisk";
import CampaignsSection from "./sections/Campaigns";
import FAQSection from "./sections/Faq";
import FinalCtaSection from "./sections/FinalCta";

const CustomizedSolutionsPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePolicy, setActivePolicy] = useState(0);
  const [displayImages, setDisplayImages] = useState({
    current: "/images/solutions/customised_Solutions/infosec_policy.png",
    prev: null
  });

  useEffect(() => {
    const nextImg = activePolicy !== null ? policyCards[activePolicy].image : "/images/solutions/customised_Solutions/infosec_policy.png";
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
        ".hero-image-right",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      ).fromTo(
        ".hero-visual",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.6"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <GSAPWrapper>
      <SeoMeta title="Customized Security Awareness Training | Innvikta" description="Build custom training modules, phishing scenarios, and behavioral journeys tailored to your policies, people, and risks." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection />
          <OverviewSection />
          <PolicyProgramsSection 
            activePolicy={activePolicy}
            setActivePolicy={setActivePolicy}
            displayImages={displayImages}
          />
          <TargetedPathsSection />
          <HighRiskSection />
          <CampaignsSection />
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

export default CustomizedSolutionsPage;