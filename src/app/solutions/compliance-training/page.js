"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useEffect, useRef } from "react";
import "../../../styles/features/compliance-core.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import HeroSection from "./sections/Hero";
import BentoGridSection from "./sections/BentoGrid";
import DpdpaBanner from "./sections/DpdpaBanner";
import JourneySection from "./sections/Journey";
import RoleBasedSection from "./sections/RoleBased";
import RefresherSection from "./sections/Refresher";
import FAQSection from "./sections/Faq";
import FinalCtaSection from "./sections/FinalCta";

const ComplianceTrainingPage = () => {
  const heroRef = useRef(null);
  const journeyRef = useRef(null);

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
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        // Animate path drawing via mask
        const maskPath = document.querySelector(".journey-mask-path");
        if (maskPath) {
          const pathLength = maskPath.getTotalLength();
          gsap.set(maskPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          });
          gsap.to(maskPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-right-col",
              start: "top 60%",
              end: "bottom 95%",
              scrub: 1.2
            }
          });
        }

        // Animate steps
        gsap.fromTo(
          ".journey-step",
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journey-steps-container",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Mobile
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".journey-step",
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".journey-steps-container",
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, journeyRef);

    return () => ctx.revert();
  }, []);

  return (
    <GSAPWrapper>
      <SeoMeta 
        title="Audit-Ready Compliance Training Suite | Innvikta" 
        description="Train employees on GDPR, HIPAA, DPDP, PCI-DSS, AI policies, and workplace conduct using short, scenarios-based retention training." 
      />
      <div className="insat-page">
        <div className="main-content">
          <HeroSection ref={heroRef} />
          <BentoGridSection />
          <DpdpaBanner />
          <JourneySection ref={journeyRef} />
          <RoleBasedSection />
          <RefresherSection />
          <FAQSection />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default ComplianceTrainingPage;