"use client";

import React, { useEffect, useRef, useState } from "react";
import "../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import { leadershipTeam } from "./about-components/constants";
import HeroSection from "./about-components/Hero";
import OurStory from "./about-components/OurStory";
import TheMission from "./about-components/TheMission";
import LeadershipSection from "./about-components/LeadershipSection";
import ImpactApproach from "./about-components/ImpactApproach";
import FinalCta from "./about-components/FinalCta";

const About = () => {
  const heroRef = useRef(null);
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );

      gsap.fromTo(
        ".story-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".mission-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".leader-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".leadership-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".impact-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".impact-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".cta-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cta",
            start: "top 90%",
          },
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setTimeout(() => {
      setActiveLeaderIndex((prevIndex) => (prevIndex + 1) % leadershipTeam.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeLeaderIndex, isHovered]);

  return (
    <GSAPWrapper>
      <div ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <HeroSection />

        <div className="insat-page">
          <div className="main-content">
            <OurStory />
            <TheMission />
            <LeadershipSection 
              activeLeaderIndex={activeLeaderIndex}
              setActiveLeaderIndex={setActiveLeaderIndex}
              setIsHovered={setIsHovered}
            />
            <ImpactApproach />
            <FinalCta />
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 992px) {
          .align-with-h2 {
            padding-top: 45px !important;
          }
        }
        @media (min-width: 768px) {
          .quad-cell-0 {
            padding-right: 2rem;
            padding-bottom: 2rem;
            border-right: 1px solid #E5E7EB;
            border-bottom: 1px solid #E5E7EB;
          }
          .quad-cell-1 {
            padding-left: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #E5E7EB;
          }
          .quad-cell-2 {
            padding-right: 2rem;
            padding-top: 2rem;
            border-right: 1px solid #E5E7EB;
          }
          .quad-cell-3 {
            padding-left: 2rem;
            padding-top: 2rem;
          }
        }
        @media (max-width: 767px) {
          .quad-cell {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #F3F4F6;
          }
          .quad-cell:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </GSAPWrapper>
  );
};

export default About;
