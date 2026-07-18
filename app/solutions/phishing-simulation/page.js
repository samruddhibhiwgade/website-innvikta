"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const attackVectors = [
  {
    title: "Phishing Simulations",
    desc: "Deploy realistic, customizable email attacks, replica login portals, and test attachment clicks across user bases.",
    image: "/images/solutions/phishingsimulation_images/phishing_simulation.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-phishing text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path className="envelope-flap" d="M22 6l-10 7L2 6" />
        <circle className="notification-dot" cx="19" cy="7" r="2" fill="#F15A24" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  },
  {
    title: "Smishing & WhatsApp",
    desc: "Simulate mobile social engineering risks via high-fidelity SMS and WhatsApp-style conversational templates.",
    image: "/images/solutions/phishingsimulation_images/smishing_whatsapp phishing.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-sms text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle className="pulse-ring" cx="12" cy="12" r="10" stroke="#F15A24" strokeWidth="1.5" fill="none" />
        <path className="chat-bubble" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: "QR Traps",
    desc: "Generate malicious QR code mockups to test employee awareness of scanning untrusted physical or digital codes.",
    image: "/images/solutions/phishingsimulation_images/qr_phishing.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-qr text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="qr-block qr-block-1" x="3" y="3" width="6" height="6" />
        <rect className="qr-block qr-block-2" x="15" y="3" width="6" height="6" />
        <rect className="qr-block qr-block-3" x="3" y="15" width="6" height="6" />
        <rect className="qr-block qr-block-4" x="15" y="15" width="6" height="6" />
        <line className="beam-line" x1="2" y1="12" x2="22" y2="12" stroke="#F15A24" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Vishing Tests",
    desc: "Automate voice-based phone tests simulating social engineering tactics to steal credentials or verify details.",
    image: "/images/solutions/phishingsimulation_images/vishing_simulation.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-phone text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="phone-wave wave-1" d="M17 6A5 5 0 0 1 17 18" stroke="#F15A24" />
        <path className="phone-wave wave-2" d="M20 3A9 9 0 0 1 20 21" stroke="#F15A24" />
        <path className="phone-receiver" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    title: "AI Scenario Variants",
    desc: "Escalate campaign difficulty and customize message content dynamically based on user risk profiles and behaviors.",
    image: "/images/solutions/phishingsimulation_images/aivariants (2).png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-ai text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <g className="spark-rays">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </g>
      </svg>
    )
  },
  {
    title: "Attachment Simulations",
    desc: "Incorporate mock malicious payloads or attachments in fake invoices and emails to track user opening habits.",
    image: "/images/solutions/phishingsimulation_images/attachmentsimulation (2).png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-attach text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="paperclip" d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        <path className="attach-arrow" d="M12 2v6M9 5l3 3 3-3" />
      </svg>
    )
  },
  {
    title: "USB Baiting",
    desc: "Deploy trackable, safe USB drives in common workspace areas to evaluate employee behavior and readiness regarding physical media security.",
    image: "/images/solutions/phishingsimulation_images/usb_baiting.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-usb text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="usb-body" x="6" y="6" width="12" height="14" rx="2" />
        <rect className="usb-connector" x="9" y="2" width="6" height="4" />
        <path className="usb-lines" d="M10 10v4M14 10v4" />
      </svg>
    )
  }
];

const PhishingSimulationPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeVector, setActiveVector] = useState(0);
  const [displayImages, setDisplayImages] = useState({
    current: "/images/solutions/phishingsimulation_images/phishing_simulation.png",
    prev: null
  });

  useEffect(() => {
    const nextImg = activeVector !== null ? attackVectors[activeVector].image : "/images/solutions/phishingsimulation_images/phishing_simulation.png";
    if (nextImg !== displayImages.current) {
      setDisplayImages((prev) => ({
        prev: prev.current,
        current: nextImg
      }));
    }
  }, [activeVector]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      let targetIndex = -1;
      let targetId = "";
      
      if (hash === "#vishing-simulation" || hash === "#vishing-tests") {
        targetIndex = 3;
        targetId = "vishing-simulation";
      } else if (hash === "#ai-led-scenario-variants" || hash === "#ai-scenario-variants") {
        targetIndex = 4;
        targetId = "ai-led-scenario-variants";
      } else if (hash === "#multi-vector-attack") {
        targetIndex = 0;
        targetId = "multi-vector-attack";
      } else if (hash === "#smishing-whatsapp" || hash === "#smishing-simulation") {
        targetIndex = 1;
        targetId = "smishing-whatsapp";
      } else if (hash === "#qr-traps" || hash === "#qr-traps-simulation") {
        targetIndex = 2;
        targetId = "qr-traps";
      } else if (hash === "#attachment-simulations" || hash === "#attachment-simulation") {
        targetIndex = 5;
        targetId = "attachment-simulations";
      } else if (hash === "#usb-baiting" || hash === "#usb-baiting-simulation") {
        targetIndex = 6;
        targetId = "usb-baiting";
      }

      if (targetIndex !== -1) {
        setActiveVector(targetIndex);
        if (targetId) {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const heroRef = useRef(null);
  
  // Testimonials Slider state & refs
  const sliderWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  
  const updateSlider = () => {
    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;
    const slides = wrapper.children;
    if (slides.length === 0) return;
    
    const spacing = 12;
    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
      offset += slides[i].offsetWidth + spacing;
    }
    wrapper.style.transform = `translate3d(${-offset}px, 0, 0)`;
    
    setPrevDisabled(currentIndex === 0);
    
    const containerWidth = wrapper.parentElement.offsetWidth;
    let totalRemainingWidth = 0;
    for (let i = currentIndex + 1; i < slides.length; i++) {
      totalRemainingWidth += slides[i].offsetWidth + spacing;
    }
    setNextDisabled(totalRemainingWidth <= containerWidth);
  };
  
  useEffect(() => {
    updateSlider();
    const handleResize = () => updateSlider();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

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
      <SeoMeta title="Automated Phishing Simulation & Training Platform | Innvikta" description="Empower employees to detect and report social engineering attacks with realistic, automated phishing simulations." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
        

        
        <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
            <div className="hero-outer-wrapper">

                <div className="container">
                    <div className="hero-grid-container">
                        <div className="hero-content">
                            <span className="text-subheading">Test Human Risk Before Attackers Do</span>
                            <h1 className="text-96-heading hero-title-custom">Identify and Reduce<br />Human Risk Before<br />It Becomes a Breach</h1>

                            <div className="hero-text-wrapper">
                                <p className="text-20-content hero-paragraph">
                                    Run AI-enabled attack simulations that uncover risky behaviour and trigger instant learning in real time.
                                </p>
                            </div>

                            <div className="hero-actions-row">
                                <a className="btn btn-primary btn-cta" href="/book-demo">
                                    <span className="hover-sweep"></span>
                                    <span>Start Free</span>
                                    <div className="arrow-wrapper">
                                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z"
                                                fill="currentColor" />
                                        </svg>
                                    </div>
                                </a>
                                <a className="btn btn-secondary" href="/book-demo">
                                    <span>Book a demo</span>
                                </a>
                            </div>
                        </div>

                        <div className="hero-image-right">
                            <img src="/images/solutions/phishingsimulation_images/phishing_simulationhero.png" alt="Phishing Simulation Hero" className="hero-sim-img" />
                        </div>
                    </div>
                </div>

                <div className="container container-hero-visual hidden md:block">
                    <div className="hero-visual">
                        <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
                    </div>
                </div>

            </div>
        </section>

        {/* 2. STATS ROW */}
        <section className="bg-white stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div className="stats-content-block animate from-left">
                        <span className="text-subheading">INSAT USER RISK SIMULATION</span>
                        <h2 className="text-52-heading">
                            <span style={{ color: "#f15a24" }}>Simulate Risk.</span> Reveal <br/>
                            What Training Can&apos;t.
                        </h2>

                        <div className="stats-subheading">
                            <p className="text-18-content" style={{ opacity: "0.8" }}>
                                InSAT runs realistic phishing, BEC, and AI-powered attack simulations to uncover human risk, strengthen awareness, and build a resilient security culture.
                            </p>
                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <Link className="btn btn-primary btn-cta" href="/book-demo">
                                <span className="hover-sweep"></span>
                                <span>Book a demo</span>
                                <div className="arrow-wrapper">
                                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                      <div className="stats-cards-block animate from-right">
                        {/* Card 1: Phishing Attacks Observed */}
                        <div className="stats-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <path d="M16 8 L16 26" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="16" cy="8" r="2.5" stroke="#f15a24" strokeWidth="2" fill="none" />
                                    <circle cx="16" cy="13" r="2" fill="#f15a24" />
                                    <path d="M16 26 C16 32, 8 32, 8 26 C8 23, 11 22, 12 22" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <rect x="20" y="20" width="20" height="14" rx="1.5" stroke="#f15a24" strokeWidth="2.5" fill="#FFEFEA" />
                                    <path d="M20 22 L30 28 L40 22" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="36" cy="19" r="5" fill="#f15a24" />
                                    <path d="M36 17 L36 19.5 M36 21.5 L36 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="card-number" style={{ marginTop: "1rem", textAlign: "center" }}>1M+</div>
                            <h3 className="card-title" style={{ textAlign: "center" }}>Phishing Attacks Observed</h3>
                            <p className="card-description" style={{ textAlign: "center" }}>1Million+ phishing attacks observed in just Q1 2025.</p>
                            <span className="card-source" style={{ display: "block", marginBottom: "1.5rem", textAlign: "center" }}>SOURCE: APWG</span>
                            <div className="card-chart" style={{ display: "flex", justifyContent: "center" }}>
                                <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <line x1="10" y1="90" x2="140" y2="90" stroke="#FFEFEA" strokeWidth="1" />
                                    <rect x="15" y="78" width="14" height="12" rx="2" fill="#f15a24" fillOpacity="0.3" />
                                    <rect x="39" y="66" width="14" height="24" rx="2" fill="#f15a24" fillOpacity="0.5" />
                                    <rect x="63" y="50" width="14" height="40" rx="2" fill="#f15a24" fillOpacity="0.7" />
                                    <rect x="87" y="34" width="14" height="56" rx="2" fill="#f15a24" fillOpacity="0.9" />
                                    <rect x="111" y="18" width="14" height="72" rx="2" fill="#f15a24" />
                                    <path d="M15 76 C 45 72, 90 58, 118 18" stroke="#f15a24" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                    <circle cx="118" cy="18" r="4" stroke="#f15a24" strokeWidth="1.5" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 2: Lost to Business Email Compromise */}
                        <div className="stats-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <rect x="8" y="15" width="28" height="18" rx="2" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                    <path d="M8 17 L22 26 L36 17" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="32" cy="27" r="7.5" fill="#f15a24" stroke="#FFEFEA" strokeWidth="1.5" />
                                    <text x="32" y="31.5" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">$</text>
                                </svg>
                            </div>
                            <div className="card-number" style={{ marginTop: "1rem", textAlign: "center" }}>$2.77B</div>
                            <h3 className="card-title" style={{ textAlign: "center" }}>Lost to Business Email Compromise</h3>
                            <p className="card-description" style={{ textAlign: "center" }}>$2.77B lost to Business Email Compromise in 2024.</p>
                            <span className="card-source" style={{ display: "block", marginBottom: "1.5rem", textAlign: "center" }}>SOURCE: FBI IC3</span>
                            <div className="card-chart" style={{ display: "flex", justifyContent: "center" }}>
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <circle cx="45" cy="45" r="35" fill="#FFEFEA" />
                                    <text x="45" y="56" fontFamily="Inter, sans-serif" fontSize="34" fontWeight="600" fill="#f15a24" textAnchor="middle">$</text>
                                    <circle cx="70" cy="70" r="14" fill="#f15a24" stroke="white" strokeWidth="3" />
                                    <path d="M70 63 L70 77 M65 72 L70 77 L75 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: Failed to Detect AI Audio */}
                        <div className="stats-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <line x1="12" y1="20" x2="12" y2="28" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="18" y1="16" x2="18" y2="32" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="24" y1="10" x2="24" y2="38" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="30" y1="16" x2="30" y2="32" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="36" y1="20" x2="36" y2="28" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="card-number" style={{ marginTop: "1rem", textAlign: "center" }}>66%</div>
                            <h3 className="card-title" style={{ textAlign: "center" }}>Failed to Detect AI Audio</h3>
                            <p className="card-description" style={{ textAlign: "center" }}>66% of participants failed to identify AI-created audio as fake.</p>
                            <span className="card-source" style={{ display: "block", marginBottom: "1.5rem", textAlign: "center" }}>SOURCE: 2025 STUDY</span>
                            <div className="card-chart" style={{ display: "flex", justifyContent: "center" }}>
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <circle cx="50" cy="50" r="36" stroke="#FFEFEA" strokeWidth="8" fill="transparent" />
                                    <circle cx="50" cy="50" r="36" stroke="#f15a24" strokeWidth="8" fill="transparent" 
                                            strokeDasharray="226.2" strokeDashoffset="76.9" strokeLinecap="round" 
                                            transform="rotate(-90 50 50)" />
                                    <text x="50" y="57" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#f15a24" textAnchor="middle">66%</text>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>


        
        <section id="multi-vector-attack" className="bg-white" style={{ paddingTop: "4rem", position: "relative" }}>
            <div id="smishing-whatsapp" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="smishing-simulation" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="qr-traps" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="qr-traps-simulation" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="vishing-simulation" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="vishing-tests" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="ai-led-scenario-variants" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="ai-scenario-variants" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="attachment-simulations" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="attachment-simulation" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="usb-baiting" style={{ position: "absolute", top: "-80px" }}></div>
            <div id="usb-baiting-simulation" style={{ position: "absolute", top: "-80px" }}></div>
            <div className="container">
                <div className="animate mb-12">
                    <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem" }}>INSAT MULTICHANNEL SIMULATION</span>
                    <h2 className="text-52-heading">Modern Attack Simulations</h2>
                    <div style={{marginTop: "1rem", opacity: "0.7"}}>
                        <p className="text-18-content">
                            Test your workforce across the channels attackers use today.
                        </p>
                    </div>
                </div>

                <div className="modern-simulations-grid">
                    {/* Left Accordion Column */}
                    <div className="simulation-accordion-list animate from-left">
                        {attackVectors.map((vector, index) => {
                            const active = activeVector === index;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveVector(index)}
                                    className={`simulation-accordion-item ${active ? "active" : ""}`}
                                >
                                    <div className="sim-icon-container">
                                        {vector.icon(active)}
                                    </div>
                                    <div className="sim-text-content">
                                        <h3 className="sim-title">{vector.title}</h3>
                                        <div 
                                            className="sim-desc-wrapper" 
                                            style={{ 
                                                maxHeight: active ? "120px" : "0px",
                                                opacity: active ? 1 : 0
                                            }}
                                        >
                                            <p className="sim-desc">{vector.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Bezel Frame Column */}
                    <div className="animate from-right">
                        <div className="platform-bezel-frame">
                            <div className="frame-inner" style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                                {displayImages.prev && (
                                    <img 
                                        key={displayImages.prev + "_prev"}
                                        src={displayImages.prev} 
                                        alt="Previous simulation screenshot"
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" }}
                                        className="animate-image-fade-out"
                                    />
                                )}
                                <img 
                                    key={displayImages.current + "_current"}
                                    src={displayImages.current} 
                                    alt={activeVector !== null ? attackVectors[activeVector].title : "Modern Attack Simulations"} 
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" }}
                                    className="animate-image-fade-in"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section id="audience-segmentation" className="bg-grey-5">
            <div className="container">
                <div className="two-col-grid">
                    <div className="two-col-content-block animate from-left">
                        <span className="text-subheading">Custom Campaign Builder</span>
                        <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                            <span style={{ display: "block", whiteSpace: "nowrap" }}>Build Phishing Campaigns</span>
                            That Feel <span style={{ color: "#F15A24" }}>Real</span> to <br />
                            <span style={{ color: "#F15A24" }}>Your Workforce</span>
                        </h2>
                        <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                            Choose from 1000+ ready-to-use phishing templates, customise them, and launch campaigns that look and feel relevant to your organisation.
                        </p>
                        
                        <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: 0, listStyle: "none" }}>
                            {[
                                {
                                    text: "1000+ ready-to-use phishing email templates",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" />
                                            <line x1="2" y1="10" x2="22" y2="10" />
                                            <line x1="6" y1="14" x2="8" y2="14" />
                                            <line x1="12" y1="14" x2="18" y2="14" />
                                        </svg>
                                    )
                                },
                                {
                                    text: "Custom branding, logo, sender name, and email content",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="M12 8v4" />
                                            <path d="M12 16h.01" />
                                        </svg>
                                    )
                                },
                                {
                                    text: "Editable links, attachments, landing pages, and call-to-actions",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    )
                                },
                                {
                                    text: "Role-wise, department-wise, and difficulty-based campaigns",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    )
                                },
                                {
                                    text: "AI-assisted scenario creation for faster campaign setup",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    )
                                },
                                {
                                    text: "Instant learning triggers after risky actions",
                                    icon: (
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                    )
                                }
                            ].map((point, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                                    {point.icon}
                                    <span>{point.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right">
                        <img 
                            alt="Custom Campaign Builder Dashboard" 
                            loading="lazy" 
                            src="/images/solutions/phishingsimulation_images/Template Library.png" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>

        
        <section className="bg-white">
            <div className="container">
                <div className="two-col-grid" style={{marginTop: "0rem"}}>
                    <div className="two-col-content-block animate from-left" style={{ maxWidth: "540px" }}>
                        <span className="text-subheading">Reports & Insights</span>
                        <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                            See Risk Clearly
                        </h2>
                        <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6", color: "#334155" }}>
                            Track campaign results, risky users, department trends, and learning progress - so you can take action that makes an impact.
                        </p>
                        
                        <div className="reports-insight-grid">
                            {[
                                {
                                    title: "Click rates",
                                    desc: "See who clicks and how often",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="20" x2="18" y2="10" />
                                            <line x1="12" y1="20" x2="12" y2="4" />
                                            <line x1="6" y1="20" x2="6" y2="14" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Department trends",
                                    desc: "Spot trends across teams",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                            <line x1="9" y1="22" x2="9" y2="16" />
                                            <line x1="15" y1="22" x2="15" y2="16" />
                                            <line x1="9" y1="16" x2="15" y2="16" />
                                            <circle cx="8" cy="6" r="0.5" />
                                            <circle cx="16" cy="6" r="0.5" />
                                            <circle cx="8" cy="10" r="0.5" />
                                            <circle cx="16" cy="10" r="0.5" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Report rates",
                                    desc: "Measure reporting behavior",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                            <polyline points="17 6 23 6 23 12" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Campaign reports",
                                    desc: "Deep dive into performance",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Repeat risky users",
                                    desc: "Identify and reduce repeat risks",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                            <line x1="12" y1="9" x2="12" y2="13" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Learning completion",
                                    desc: "Track training progress",
                                    icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                                        </svg>
                                    )
                                }
                            ].map((card, idx) => (
                                <div key={idx} className="reports-insight-card">
                                    <div className="reports-insight-icon-container">
                                        {card.icon}
                                    </div>
                                    <div className="reports-insight-text-wrapper">
                                        <h4 className="reports-insight-title">{card.title}</h4>
                                        <p className="reports-insight-desc">{card.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="two-col-visual-block animate from-right" style={{ background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            alt="Reports & Insights Dashboard" 
                            loading="lazy" 
                            src="/images/solutions/phishingsimulation_images/report_insights.png" 
                            style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-grey-5">
            <div className="container faq-grid">
                <div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center">
                    <h2 className="text-40-heading text-center">We’re here to help</h2>
                    <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer"
                        style={{marginTop: "1.25rem"}}>
                        <div className="arrow-circle">
                            <span className="arrow-circle-bg"></span>
                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                    d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                            </svg>
                        </div>
                        <span>Learn more</span>
                    </a>
                </div>

                <div className="faq-list-col animate from-right">
                    
                    <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 0} onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                            <span className="faq-question">What types of phishing simulations can InSAT run?</span>
                            <div className="faq-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                                        stroke="var(--color-grey-30)" />
                                    <path
                                        d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                                        stroke="var(--color-grey-30)" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-panel">
                            <div className="faq-panel-inner">
                                <div className="faq-answer">
                                    <p>InSAT can run realistic simulations of spear phishing, credential harvesting,
                                        malware attachments, and social engineering scenarios tailored to different
                                        departments.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 1} onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                            <span className="faq-question">Can training be assigned role-wise?</span>
                            <div className="faq-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                                        stroke="var(--color-grey-30)" />
                                    <path
                                        d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                                        stroke="var(--color-grey-30)" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-panel">
                            <div className="faq-panel-inner">
                                <div className="faq-answer">
                                    <p>Yes, you can automatically assign specific training paths to high-risk roles like
                                        finance, HR, executives, and developers to address their unique threat
                                        landscapes.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 2} onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                            <span className="faq-question">Does InSAT provide audit-ready compliance evidence?</span>
                            <div className="faq-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                                        stroke="var(--color-grey-30)" />
                                    <path
                                        d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                                        stroke="var(--color-grey-30)" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-panel">
                            <div className="faq-panel-inner">
                                <div className="faq-answer">
                                    <p>Absolutely. InSAT compiles comprehensive, audit-ready compliance records and
                                        human risk telemetry for regulatory frameworks including SOC 2, ISO 27001, and
                                        GDPR.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                        <button type="button" className="faq-trigger" aria-expanded={activeFaq === 3} onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                            <span className="faq-question">Can learning paths adapt based on user risk?</span>
                            <div className="faq-icon-wrapper">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                                        stroke="var(--color-grey-30)" />
                                    <path
                                        d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                                        stroke="var(--color-grey-30)" />
                                </svg>
                            </div>
                        </button>
                        <div className="faq-panel">
                            <div className="faq-panel-inner">
                                <div className="faq-answer">
                                    <p>Yes, our platform analyzes click rates and quiz performances to automatically
                                        enroll high-risk employees in targeted reinforcement modules.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Custom Phishing Final CTA Section */}
        <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
                <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                    <div className="animate">
                        <h2 className="section-title leading-tight">
                            Ready to Test Your Workforce?
                        </h2>
                        <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                            Run safe simulations and turn risky behaviour into measurable learning.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                  <Link href="/start-free" className="btn btn-outline-primary">
                    Start Free
                  </Link>
                  <Link href="/book-demo" className="btn btn-primary">
                    Book a demo &rarr;
                  </Link>
                </div>
                    </div>
                    <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
                        <div className="animate-wave absolute inset-0 w-full h-full">
                            <ImageFallback
                                src="/images/wave.svg"
                                fill={true}
                                sizes="100vw"
                                alt="bg wave"
                            />
                        </div>
                        <Circle
                            className="left-[10%] top-12"
                            width={32}
                            height={32}
                            fill={false}
                            fillValue="#FF5A1F"
                        />
                        <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                        <Circle
                            className="left-[15%] bottom-[35%]"
                            width={47}
                            height={47}
                            fill={false}
                            fillValue="#FF5A1F"
                        />

                        <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                        <Circle
                            className="right-[2%] bottom-[30%]"
                            width={73}
                            height={73}
                            fill={false}
                            fillValue="#FF5A1F"
                        />
                        <Circle
                            className="right-[19%] bottom-[16%]"
                            width={37}
                            height={37}
                            fill={false}
                            fillValue="#FF5A1F"
                        />
                    </div>
                </div>
            </div>
        </section>

    
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default PhishingSimulationPage;