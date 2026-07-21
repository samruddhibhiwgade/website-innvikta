"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useEffect, useRef } from "react";
import "../../../styles/features/phishing-core.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import HeroSection from "./sections/Hero";
import StatsSection from "./sections/Stats";
import AccordionPanelSection from "./sections/AccordionPanel";
import CampaignBuilderSection from "./sections/CampaignBuilder";
import RefresherSection from "./sections/Refresher";
import FAQSection from "./sections/Faq";
import FinalCtaSection from "./sections/FinalCta";

const PhishingSimulationPage = () => {
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
      <SeoMeta 
        title="Automated Phishing Simulation & Training Platform | Innvikta" 
        description="Empower employees to detect and report social engineering attacks with realistic, automated phishing simulations." 
      />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection />
          <StatsSection />
          <AccordionPanelSection />
          <CampaignBuilderSection />
          <RefresherSection />
          <FAQSection />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default PhishingSimulationPage;