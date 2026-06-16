"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "./components/Circle";
import ImageFallback from "./components/ImageFallback";
import { FiArrowRight } from "react-icons/fi";
import NetworkBackground from "@layouts/components/NetworkBackground";
import { motion, AnimatePresence } from "framer-motion";

const leadershipTeam = [
  {
    name: "Rajsinh Phadtare",
    role: "CEO",
    bio: "Leading Innvikta’s vision for human risk reduction and enterprise security awareness.",
    image: "/images/about/team/raj.png",
    summary: "Visionary leader driving Innvikta's mission to eliminate the human recall gap in enterprise cybersecurity.",
    longBio: "Rajsinh has dedicated his career to designing human-centric security programs that convert technical compliance requirements into measurable habits. Under his leadership, Innvikta has scaled to serve enterprises globally, focusing on AI-driven awareness campaigns and realistic multi-channel phishing simulations.",
    quote: "Human risk is not a technology challenge. It is a behavior challenge that requires behavioral solutions.",
    expertise: ["Cybersecurity", "Human Risk", "Governance", "Enterprise Strategy", "Compliance", "Business Growth"],
    linkedin: "https://linkedin.com",
  },
  {
    name: "Nakul Ilawe",
    role: "CMO & Growth Lead",
    bio: "Driving market strategy, partnerships, customer engagement, and brand growth.",
    image: "/images/about/team/nakul.png",
    summary: "Growth strategist aligning product capability with enterprise market needs and strategic partnerships.",
    longBio: "Nakul directs Innvikta’s go-to-market execution, driving brand engagement and scaling enterprise adoption. He specializes in designing user-focused security education programs that resonate with modern workforces and deliver clear business outcomes.",
    quote: "Security is only effective when it becomes a natural, friction-free part of the employee's daily workflow.",
    expertise: ["Growth Strategy", "Product Marketing", "Partnerships", "Brand Development", "Customer Experience"],
    linkedin: "https://linkedin.com",
  },
  {
    name: "Dnyaneshwar Phadtare (IPS retd.)",
    role: "Board Advisor",
    bio: "Guiding cybersecurity strategy and risk readiness based on real-world security and public-sector insight.",
    image: "/images/about/team/Dnyaneshwar.png",
    summary: "Distinguished security expert advising on strategic threat landscapes, public sector compliance, and risk readiness.",
    longBio: "With a highly distinguished career in public service and law enforcement, Dnyaneshwar brings invaluable strategic insights to Innvikta. He advises on emerging cyber threat vectors, state-level compliance mandates, and organizational security resilience.",
    quote: "True defense lies in empowering the individual. Technology changes, but human nature remains the constant.",
    expertise: ["Threat Intelligence", "Public Policy", "Risk Readiness", "Strategic Security", "Incident Response"],
    linkedin: "https://linkedin.com",
  },
  {
    name: "Santosh Kamane",
    role: "Board Advisor",
    bio: "Advising on business direction, growth, partnerships, and organizational impact.",
    image: "/images/about/team/santosh.png",
    summary: "Enterprise strategy expert guiding business development, scale initiatives, and corporate governance.",
    longBio: "Santosh works closely with the executive team to define corporate strategy, structure joint ventures, and govern commercial expansion. His extensive enterprise background guides Innvikta's partnerships and growth acceleration.",
    quote: "Scaling a business requires alignment of vision, flawless operational execution, and trust.",
    expertise: ["Corporate Governance", "M&A", "Commercial Scale", "Business Operations", "Strategic Partnerships"],
    linkedin: "https://linkedin.com",
  },
];

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

      // Simple scroll trigger animations
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
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeLeaderIndex, isHovered]);


  return (
    <GSAPWrapper>
      <div ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        
        {/* SECTION 1: HERO */}
        <section className="section banner pt-0 relative overflow-hidden" style={{ paddingBottom: "5rem", paddingTop: "4rem" }}>
          <div className="banner-bg absolute left-0 top-0 w-full h-full overflow-hidden z-0 bg-[#fff7f3]" style={{ height: "100%" }}>
            <Circle className="circle left-[10%] top-12" width={32} height={32} fill={false} />
            <Circle className="circle left-[2.5%] top-[29%]" width={85} height={85} />
            <Circle className="circle bottom-[48%] left-[22%]" width={20} height={20} />
            <Circle className="circle bottom-[37%] left-[15%]" width={47} height={47} fill={false} />
            <Circle className="circle bottom-[13%] left-[6%]" width={62} height={62} fill={false} />
            <Circle className="circle right-[12%] top-[15%]" width={20} height={20} />
            <Circle className="circle right-[2%] top-[30%]" width={73} height={73} fill={false} />
            <Circle className="circle right-[19%] top-[48%]" width={37} height={37} fill={false} />
            <Circle className="circle right-[33%] top-[54%]" width={20} height={20} />
            <Circle className="circle bottom-[20%] right-[3%]" width={65} height={65} />
            <NetworkBackground />
          </div>
          <div className="container-xl relative z-20">
            <div className="row overflow-hidden rounded-2xl will-change-transform">
              <div className="col-12">
                <div className="row relative justify-center pb-10">
                  <div className="banner-content col-10 pb-0 pt-10 md:pt-20 text-center will-change-transform">
                    <h1 className="mb-6 banner-title font-black text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                      Human Risk Management <br />for the <span className="text-primary">AI Era</span>
                    </h1>
                    <p className="banner-desc text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                      Innvikta helps organizations make security awareness practical, engaging, measurable, and built for real-world behaviour change.
                    </p>

                    <div className="banner-btn flex flex-wrap items-center justify-center gap-4">
                      <Link 
                        href="/book-demo"
                        className="btn btn-primary shadow-lg shadow-orange-500/15 w-44 h-12 flex items-center justify-center font-bold text-base gap-1.5"
                      >
                        Book Demo <FiArrowRight className="text-xs" />
                      </Link>
                      <Link 
                        href="/contact"
                        className="w-44 h-12 flex items-center justify-center rounded-lg font-bold text-base bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] text-[#f15a24] hover:text-white transition-all duration-300"
                      >
                        Start Free
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="insat-page">
          <div className="main-content">
            
            {/* SECTION 2: OUR STORY */}
            <section id="our-story" className="story-section" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Story Content */}
                  <div className="lg:col-span-6 story-animate" style={{ textAlign: "left" }}>
                    <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>OUR STORY</span>
                    <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                      From Security Awareness to Real-World <span style={{ color: "#F15A24" }}>Readiness</span>
                    </h2>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                      With 15+ years of cybersecurity experience across the US and India, we saw one gap repeatedly: awareness was being delivered, but real-world recall was still missing.
                    </p>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                      Employees may complete modules and follow policies, but the true test comes later — during a suspicious email, urgent payment request, risky attachment, QR code, or AI-generated deception.
                    </p>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                      Innvikta was created to close that gap with awareness experiences that are practical, engaging, measurable, and built for recall when it matters most.
                    </p>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
                      We are not just creating modules — with InSAT, we are building a platform that helps people stay ready when threats arrive.
                    </p>
                  </div>

                  {/* Right Column: Representation Office Photo with Quote overlay */}
                  <div className="lg:col-span-6 story-animate">
                    <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
                      <ImageFallback
                        src="/images/about/01.jpg"
                        width={600}
                        height={400}
                        alt="Innvikta Office Team"
                        className="w-full h-auto object-cover"
                        style={{ filter: "brightness(0.9)" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "2rem",
                          left: "2rem",
                          right: "2rem",
                          background: "rgba(255, 255, 255, 0.95)",
                          backdropFilter: "blur(8px)",
                          padding: "1.5rem 2rem",
                          borderRadius: "14px",
                          borderLeft: "4px solid #F15A24",
                          textAlign: "left"
                        }}
                      >
                        <p style={{ fontStyle: "italic", fontSize: "1.1rem", fontWeight: "500", color: "#1F1F1F", margin: 0 }}>
                          “Awareness should work when the real decision happens.”
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 3: THE MISSION */}
            <section id="our-mission" className="mission-section" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "4rem" }}>
                  <div className="lg:col-span-6 mission-animate" style={{ textAlign: "left" }}>
                    <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>THE MISSION</span>
                    <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                      Making People the Strongest Layer of <span style={{ color: "#F15A24" }}>Defence</span>
                    </h2>
                  </div>
                  <div className="lg:col-span-6 mission-animate align-with-h2" style={{ textAlign: "left" }}>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                      Our mission is to help organizations reduce human risk by making secure behaviour easier to learn, practice, reinforce, and measure.
                    </p>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
                      We believe employees are not the weakest link. With the right awareness journeys, simulations, nudges, and insights, they become an active defence layer.
                    </p>
                  </div>
                </div>

                {/* Premium 2x2 Grid Quadrant separated by thin X-Y crosshair lines */}
                <div className="grid grid-cols-1 md:grid-cols-2 quad-grid" style={{ borderTop: "1px solid #E7E7E7", paddingTop: "1.5rem" }}>
                  {[
                    { title: "Learn", desc: "Relevant awareness modules built for comprehension." },
                    { title: "Practice", desc: "Real-world simulations across email, SMS, QR, and voice." },
                    { title: "Reinforce", desc: "Microlearning and real-time nudges to build habits." },
                    { title: "Measure", desc: "Human risk insights and board-ready telemetry dashboards." }
                  ].map((card, i) => (
                    <div
                      key={i}
                      className={`mission-animate quad-cell quad-cell-${i}`}
                    >
                      <div style={{ textAlign: "left" }}>
                        <h4 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#1F1F1F", margin: "0 0 0.5rem 0" }}>
                          {card.title}
                        </h4>
                        <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: LEADERSHIP & ADVISORS (Premium Editorial Showcase) */}
            <section id="leadership-team" className="leadership-section relative overflow-hidden" style={{ background: "var(--color-grey-5)", borderTop: "1px solid #E7E7E7", width: "100vw", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", paddingBottom: "5.5rem" }}>
              
              {/* SECTION HEADER */}
              <div className="container text-center mb-16" style={{ maxWidth: "1200px", margin: "0 auto 5rem auto", padding: "0 2rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
                  LEADERSHIP & ADVISORS
                </span>
                <h2 className="text-52-heading" style={{ color: "#111111", marginTop: "0.5rem", marginBottom: "1.25rem", lineHeight: "1.2" }}>
                  Led by <span style={{ color: "#F15A24" }}>Security, Strategy, and Enterprise Experience</span>
                </h2>
                <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
                  Innvikta is guided by a focused leadership team and experienced advisors across cybersecurity, business growth, compliance, and enterprise transformation.
                </p>
              </div>

              {/* DESKTOP INTERACTIVE EDITORIAL LAYOUT */}
              <div className="container hidden md:block" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
                <div className="grid grid-cols-12 gap-8 items-start relative">
                  
                  {/* LEFT COLUMN: STICKY NAVIGATION */}
                  <div className="col-span-3 sticky top-32 self-start" style={{ zIndex: 10 }}>
                    <nav className="flex flex-col gap-2 relative border-l border-[#E7E7E7]">
                      {leadershipTeam.map((leader, i) => {
                        const isActive = activeLeaderIndex === i;
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setActiveLeaderIndex(i);
                            }}
                            className="group relative flex items-center gap-4 py-3.5 pl-6 text-left transition-all duration-300 w-full"
                            style={{
                              background: isActive ? "rgba(241, 90, 36, 0.03)" : "transparent",
                              borderRadius: "8px",
                              overflow: "hidden"
                            }}
                          >
                            {/* Active Indicator Bar */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F15A24] rounded-l-lg"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}

                            {/* Small Thumbnail Portrait */}
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "4px",
                              overflow: "hidden",
                              background: "transparent",
                              flexShrink: 0,
                              border: isActive ? "1.5px solid #F15A24" : "1px solid #E5E7EB"
                            }}>
                              <img
                                src={leader.image}
                                alt={leader.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              />
                            </div>

                            <div>
                              <h4 style={{
                                fontSize: "0.95rem",
                                fontWeight: isActive ? "700" : "550",
                                color: isActive ? "#111111" : "#6B7280",
                                margin: 0,
                                transition: "color 0.25s"
                              }}>
                                {leader.name}
                              </h4>
                              <p style={{
                                fontSize: "0.8rem",
                                color: isActive ? "#F15A24" : "#9CA3AF",
                                margin: 0
                              }}>
                                {leader.role}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* RIGHT COLUMN: ACTIVE LEADER SHOWCASE CONTAINER */}
                  <div className="col-span-9 min-h-[440px] flex items-start relative">
                    <AnimatePresence mode="wait">
                      {leadershipTeam.map((leader, i) => i === activeLeaderIndex && (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="grid grid-cols-9 gap-8 items-start w-full"
                        >
                          {/* CENTER COLUMN: EDITORIAL CONTENT */}
                          <div 
                            className="col-span-5 pr-8 text-left"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <span style={{ fontSize: "1.1rem", fontWeight: "750", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {leader.role}
                            </span>
                            <h2 style={{ fontSize: "3rem", fontWeight: "800", color: "#111111", marginTop: "0.25rem", marginBottom: "1.5rem", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                              {leader.name}
                            </h2>

                            {/* Executive Summary */}
                            <p className="text-18-content" style={{ fontWeight: "600", color: "#111111", marginBottom: "1.5rem", lineHeight: "1.5" }}>
                              {leader.summary}
                            </p>

                            {/* Detailed Bio */}
                            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "2rem" }}>
                              {leader.longBio}
                            </p>

                            {/* Leadership Philosophy Quote */}
                            <div style={{
                              borderLeft: "2.5px solid #F15A24",
                              paddingLeft: "1.5rem",
                              marginBottom: "2.5rem",
                              fontStyle: "italic",
                            }}>
                              <p style={{ fontSize: "1.1rem", color: "#111111", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
                               &ldquo;{leader.quote}&rdquo;
                              </p>
                            </div>
                          </div>

                          {/* RIGHT COLUMN: EXECUTIVE PORTRAIT */}
                          <div className="col-span-4 relative self-stretch flex items-end justify-center min-h-[400px] overflow-visible">
                            <div className="w-full flex justify-center items-end" style={{ height: "100%", maxHeight: "500px" }}>
                              <div className="relative overflow-hidden" style={{ width: "100%", height: "400px", borderRadius: "16px" }}>
                                <img
                                  src={leader.image}
                                  alt={leader.name}
                                  className="w-full h-full object-cover pointer-events-none relative z-10"
                                  style={{ borderRadius: "16px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

              {/* MOBILE INTERACTIVE STORYTELLING LAYOUT */}
              <div className="container block md:hidden">
                <div className="flex flex-col gap-20">
                  {leadershipTeam.map((leader, i) => (
                    <div key={i} className="flex flex-col text-left border-b border-[#E7E7E7] pb-16 last:border-0 last:pb-0">
                      {/* Portrait Hero */}
                      <motion.div
                        className="relative overflow-hidden rounded-2xl pt-6 px-6 pb-0 mb-16 flex justify-center items-end"
                        style={{ height: "350px" }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-auto h-[80%] object-cover pointer-events-none z-10"
                          style={{ borderRadius: "12px" }}
                        />
                      </motion.div>

                      {/* Text Details Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      >
                        <span style={{ fontSize: "0.95rem", fontWeight: "750", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "0.5rem" }}>
                          {leader.role}
                        </span>
                        <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#111111", marginTop: "0.25rem", marginBottom: "1rem" }}>
                          {leader.name}
                        </h2>

                        <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#111111", marginBottom: "1rem", lineHeight: "1.5" }}>
                          {leader.summary}
                        </p>

                        <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                          {leader.longBio}
                        </p>

                        <div style={{ borderLeft: "2.5px solid #F15A24", paddingLeft: "1.25rem", marginBottom: "2rem", fontStyle: "italic" }}>
                          <p style={{ fontSize: "1.05rem", color: "#111111", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
                            &ldquo;{leader.quote}&rdquo;
                          </p>
                        </div>

                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

            </section>
            
            {/* SECTION 5: IMPACT AND APPROACH */}
            <section id="impact-approach" className="impact-section" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "4.5rem" }}>
                  <div className="lg:col-span-6 impact-animate" style={{ textAlign: "left" }}>
                    <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>IMPACT & APPROACH</span>
                    <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                      Built for Relevance, Engagement, and Measurable <span style={{ color: "#F15A24" }}>Impact</span>
                    </h2>
                  </div>
                  <div className="lg:col-span-6 impact-animate align-with-h2" style={{ textAlign: "left" }}>
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
                      Innvikta brings together awareness modules, simulations, gamified learning, compliance journeys, AI powered customization, and reporting — in one unified platform — so organizations can move beyond completion and build measurable behaviour change.
                    </p>
                  </div>
                </div>

                {/* 4 Cards: Seamless Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Relevant by Design",
                      desc: "Aligned to roles, departments, industries, policies, and risk priorities.",
                      color: "#F15A24",
                    },
                    {
                      title: "Engaging by Experience",
                      desc: "Story-led modules, simulations, and gamified journeys that employees actually interact with.",
                      color: "#F15A24",
                    },
                    {
                      title: "Measurable by Default",
                      desc: "Dashboards, reports, scores, and evidence records that help teams track progress.",
                      color: "#F15A24",
                    },
                    {
                      title: "Flexible by Nature",
                      desc: "Adaptable to your policies, procedures, compliance needs, and communication style.",
                      color: "#F15A24",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="impact-animate seamless-hover-card"
                      style={{
                        background: "transparent",
                        borderLeft: `3px solid ${item.color}`,
                        padding: "0.5rem 0 0.5rem 1.75rem",
                        textAlign: "left",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <h3 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "1.05rem", color: "#6B7280", lineHeight: "1.6", margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <style>{`
                .seamless-hover-card:hover {
                  transform: translateX(6px);
                  border-left-width: 6px !important;
                }
                #our-story, #our-mission, #leadership-team, #impact-approach {
                  scroll-margin-top: 120px;
                }
              `}</style>
            </section>

            {/* SECTION 6: FINAL CTA */}
            <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
              <div className="container-xl">
                <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                  <div className="cta-animate">
                    <h2 className="section-title leading-tight">
                      Ready to Build a More Security-Aware Workforce?
                    </h2>
                    <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                      Explore how Innvikta helps enterprises make awareness practical, engaging, and measurable.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                      <Link href="/contact" className="btn btn-primary">
                        Start Free
                      </Link>
                      <Link href="/book-demo" className="btn btn-outline-primary">
                        Book a Demo
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[#fff7f3] rounded-2xl overflow-hidden -z-10">
                    <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
                    <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                    <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
                    <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                    <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
                    <Circle className="right-[19%] bottom-[16%]" width={37} height={37} fill={false} fillValue="#FF5A1F" />
                  </div>
                </div>
              </div>
            </section>

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

