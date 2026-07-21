"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useEffect, useRef } from "react";
import "../../../styles/features/insat-core.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import HeroSection from "./sections/Hero";
import StatsSection from "./sections/Stats";
import FeaturesGridSection from "./sections/FeaturesGrid";
import ColumnsSection from "./sections/Columns";
import RoleBasedSection from "./sections/RoleBased";
import FAQSection from "./sections/Faq";
import FinalCtaSection from "./sections/FinalCta";

const InsatPage = () => {
  const heroRef = useRef(null);

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
      <SeoMeta 
        title="InSAT | AI-Powered Security Awareness Training Platform" 
        description="Reduce threat susceptibility with Innvikta's Interactive Security Awareness Training (InSAT) platform, offering gamified learning and simulations." 
      />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection />
          <StatsSection />
          <FeaturesGridSection />
          <ColumnsSection />
          <RoleBasedSection />
          <FAQSection />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default InsatPage;