"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

const InsatPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
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
      <SeoMeta title="InSAT | AI-Powered Security Awareness Training Platform" description="Reduce threat susceptibility with Innvikta's Interactive Security Awareness Training (InSAT) platform, offering gamified learning and simulations." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
        

        
        <section className="hero-section">
            <div className="hero-outer-wrapper">

                


                
                <div className="container">
                    <div className="hero-grid-container" style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: "4.5rem" }}>
                        <div className="hero-content">
                            <span className="text-subheading">AI-Powered Security Awareness Platform</span>
                            <h1 className="text-96-heading" style={{ fontSize: "clamp(2.5rem, 3.8vw, 3.6rem)", lineHeight: "1.0", marginBottom: "1.5rem" }}>
                              Security Awareness<br />Training Built for<br />Real Behaviour Change
                            </h1>

                            <div className="hero-text-wrapper">
                                <p className="text-20-content hero-paragraph">
                                    InSAT drives behavior change with AI learning journeys, multi attack simulations,
                                    gamification and microlearning all from one unified platform.
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
                                    <span>Explore Platform</span>
                                </a>
                            </div>
                        </div>

                        <div className="hero-image-right animate from-right" style={{ justifyContent: "flex-end", display: "flex", width: "100%" }}>
                            <img 
                              src="/insat/images/Insat_heroimage.png" 
                              alt="InSAT Platform Visual" 
                              className="hero-sim-img" 
                              style={{ maxWidth: "none", width: "100%", transform: "scale(1.35) translate(30px, -25px)", transformOrigin: "center right" }}
                            />
                        </div>
                    </div>
                </div>
 
                
                <div className="container container-hero-visual">
                    <div className="hero-visual" style={{ marginTop: "3rem" }}>
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
                            Simulate Real-World <br/>
                            <span style={{ color: "#f15a24" }}>Risk.</span> Drive <br/>
                            <span style={{ color: "#f15a24" }}>Real Impact.</span>
                        </h2>

                        <div className="stats-subheading">
                            <p className="text-18-content" style={{ opacity: "0.8" }}>
                                InSAT&apos;s realistic simulations uncover human risk across email, AI tools, and data handling - so you can reduce exposure, strengthen behavior, and prove the value of your security program.
                            </p>
                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <Link className="btn btn-primary btn-cta" href="/book-demo">
                                <span className="hover-sweep"></span>
                                <span>Book A Demo</span>
                                <div className="arrow-wrapper">
                                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="stats-cards-block animate from-right">
                        {/* Card 1: Average Global Cost of a Data Breach */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <circle cx="20" cy="20" r="14" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                    <ellipse cx="20" cy="20" rx="6" ry="14" stroke="#f15a24" strokeWidth="2" fill="none" />
                                    <line x1="6" y1="20" x2="34" y2="20" stroke="#f15a24" strokeWidth="2" />
                                    <path d="M34 24 L42 38 L26 38 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                    <text x="34" y="35.5" fontFamily="Inter" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">!</text>
                                </svg>
                            </div>
                            <div className="card-number">$4.44M</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Average Global Breach Cost</h3>
                            <p className="card-description">average global cost of a data breach</p>
                            <span className="card-source">SOURCE: IBM</span>
                            <div className="card-chart">
                                <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <line x1="10" y1="90" x2="140" y2="90" stroke="#FFEFEA" strokeWidth="1" />
                                    <rect x="15" y="18" width="14" height="72" rx="2" fill="#f15a24" />
                                    <rect x="39" y="34" width="14" height="56" rx="2" fill="#f15a24" fillOpacity="0.9" />
                                    <rect x="63" y="50" width="14" height="40" rx="2" fill="#f15a24" fillOpacity="0.7" />
                                    <rect x="87" y="66" width="14" height="24" rx="2" fill="#f15a24" fillOpacity="0.5" />
                                    <rect x="111" y="78" width="14" height="12" rx="2" fill="#f15a24" fillOpacity="0.3" />
                                    <path d="M22 18 C 50 18, 95 32, 118 78" stroke="#f15a24" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                    <path d="M113 78 L119 80 L119 73" stroke="#f15a24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <circle cx="132" cy="78" r="10" fill="#f15a24" />
                                    <text x="132" y="82" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">$</text>
                                </svg>
                            </div>
                        </div>

                        {/* Card 2: Employees Share Sensitive Data with Unapproved AI Tools */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <path d="M22 12 C16 12, 10 16, 10 24 C10 28, 13 32, 16 34 C17 35, 18 36, 18 37 C18 40, 20 40, 22 40 L22 12 Z" stroke="#f15a24" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                                    <path d="M16 20 C18 20, 20 22, 22 22" stroke="#f15a24" strokeWidth="2" />
                                    <path d="M14 28 C17 28, 19 28, 22 26" stroke="#f15a24" strokeWidth="2" />
                                    <path d="M26 12 C32 12, 38 16, 38 24 C38 28, 35 32, 32 34 C31 35, 30 36, 30 37 C30 40, 28 40, 26 40 L26 12 Z" stroke="#f15a24" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                                    <circle cx="34" cy="20" r="2" fill="#f15a24" />
                                    <line x1="26" y1="20" x2="32" y2="20" stroke="#f15a24" strokeWidth="2" />
                                    <circle cx="32" cy="28" r="2" fill="#f15a24" />
                                    <line x1="26" y1="28" x2="30" y2="28" stroke="#f15a24" strokeWidth="2" />
                                    <circle cx="30" cy="34" r="2" fill="#f15a24" />
                                    <line x1="26" y1="34" x2="28" y2="34" stroke="#f15a24" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className="card-number">1 in 3</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Unapproved AI Usage</h3>
                            <p className="card-description">employees sharing sensitive data with unapproved AI tools</p>
                            <span className="card-source">SOURCE: GARTNER 2025</span>
                            <div className="card-chart">
                                <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <g transform="translate(15, 26)">
                                        <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                        <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="none" />
                                    </g>
                                    <g transform="translate(57, 18)">
                                        <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                        <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="#FFEFEA" />
                                        <path d="M16 28 L23 40 L9 40 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                        <text x="16" y="38" fontFamily="Inter" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">!</text>
                                    </g>
                                    <g transform="translate(99, 26)">
                                        <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                        <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="none" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: Fewer Incidents After Security Awareness Training */}
                        <div className="stats-card">
                            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "72px", height: "72px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "40px", height: "40px" }}>
                                    <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                    <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>
                            <div className="card-number">67%</div>
                            <div className="card-divider"></div>
                            <h3 className="card-title">Fewer Security Incidents</h3>
                            <p className="card-description">organizations reporting fewer incidents after awareness training</p>
                            <span className="card-source">SOURCE: FORTINET 2025</span>
                            <div className="card-chart">
                                <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                    <path d="M25 80 A50 50 0 0 1 125 80" stroke="#FFEFEA" strokeWidth="10" strokeLinecap="round" fill="none" />
                                    <path d="M25 80 A50 50 0 0 1 120.5 37" stroke="#f15a24" strokeWidth="10" strokeLinecap="round" fill="none" />
                                    <g transform="translate(63, 52)">
                                        <path d="M12 2 L22 6 L22 14 Q22 21 12 25 Q2 21 2 14 L2 6 Z" stroke="#f15a24" strokeWidth="2" fill="#FFEFEA" />
                                        <path d="M8 13 L11 16 L16 10" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>


        
        <section id="security-awareness-training" className="bg-grey-5">
            <div className="container">
                <div className="section-intro animate">
                    <span className="text-subheading">Features</span>
                    <h2 className="text-52-heading">Powerful Security Training</h2>
                </div>

                <div className="features-grid">
                    
                    <div className="feature-card animate">
                        <div className="feature-visual">
                            <img alt="Security Awareness Training" loading="lazy" src="/insat/images/phishing-new.png" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Security Awareness Training</h3>
                            <p className="feature-desc">
                                Cinematic, role-based modules that help employees understand common cyber risks in their
                                daily work.
                            </p>
                        </div>
                    </div>

                    
                    <div className="feature-card animate">
                        <div className="feature-visual bg-grey-30">
                            <img alt="Phishing simulations mockup" loading="lazy"
                                src="/insat/images/sat-new.png" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Phishing Simulations</h3>
                            <p className="feature-desc">
                                Launch realistic phishing campaigns and identify risky user responses before attackers
                                do.
                            </p>
                        </div>
                    </div>

                    
                    <div className="feature-card animate">
                        <div className="feature-visual bg-aquamarine">
                            <img alt="Microlearning modules mockup" loading="lazy"
                                src="/insat/images/microlearning-new.png" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Microlearning</h3>
                            <p className="feature-desc">
                                Deliver short reinforcement modules exactly when employees need them most.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="bg-white">
            <div className="container">
                <div className="section-intro animate" style={{textAlign: "center"}}>
                    <h2 className="text-64-heading">Build Security Awareness Across Your Organization</h2>
                </div>

                
                <div id="ai-adaptive-learning" className="two-col-grid" style={{marginTop: "4rem"}}>
                    <div className="two-col-content-block animate from-left">
                        <h2 className="text-40-heading">AI Adaptive Learning</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Personalize learning journeys based on user performance, risk indicators, and training
                                history.
                            </p>
                        </div>

                        <a className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                        d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Adaptive Learning</span>
                        </a>
                    </div>
                    <div className="two-col-visual-block bg-white animate from-right">
                        <img alt="AI adaptive learning routes" loading="lazy" src="/insat/images/adaptive_learning.png" style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                </div>

                
                <div id="human-risk-intelligence" className="two-col-grid reverse" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-right">
                        <h2 className="text-40-heading">Reporting & Human Risk Evidence</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Generate structured records of training, assessments, simulations, and participation for
                                internal reviews and audits.
                            </p>
                        </div>

                        <a className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                        d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>View Reporting Features</span>
                        </a>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-white animate from-left">
                        <img alt="Monitor training and assessments" loading="lazy"
                            src="/insat/images/humanriskevidence (2).png" style={{ objectFit: "contain" }} />
                    </div>
                </div>

                
                <div id="interactive-gamified-arcade" className="two-col-grid" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-left">
                        <h2 className="text-40-heading">Gamified Engagement</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Use quizzes, challenges, points, and interactive modules to improve participation and
                                recall.
                            </p>
                        </div>

                        <a className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                        d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Gamified Training</span>
                        </a>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-plum animate from-right">
                        <img alt="Gamified engagement" loading="lazy" src="/insat/images/Protection-1.jpg" />
                    </div>
                </div>

                
                <div id="microlearning" className="two-col-grid reverse" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-right">
                        <h2 className="text-40-heading">Continuous Reinforcement</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Trigger bite-sized learning after risky actions, phishing clicks, campaigns, or policy
                                changes.
                            </p>
                        </div>

                        <a className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                        d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore InSAT Platform</span>
                        </a>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-midnight animate from-left">
                        <img alt="Continuous reinforcement" loading="lazy" src="/insat/images/continious_reinforcement.png" />
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-white" style={{paddingBottom: "0"}}>
            <div className="container">
                <div style={{textAlign: "center"}} className="animate">
                    <h2 className="text-52-heading">Integrate with Your IT & Security Stack</h2>
                    <p className="text-18-content opacity-70"
                        style={{marginTop: "0.75rem", maxWidth: "523px", marginLeft: "auto", marginRight: "auto"}}>
                        Ditch the manual admin work. InSAT auto-syncs with your identity providers, LMS, and
                        communication platforms to automate training management.
                    </p>
                </div>
            </div>

            
            <div className="ticker-container animate">
                
                <div className="ticker-track ticker-forward">
                    
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                </div>
                
                <div className="ticker-track ticker-reverse">
                    
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                </div>
            </div>
        </section>

        
        <section className="bg-white">
            <div className="container">
                <div className="flex flex-col gap-16">

                    
                    <div className="two-col-grid items-start">
                        <div className="two-col-content-block max-w-[413px]">
                            <h2 className="text-40-heading">Everything Needed to Build Everyday Secure Behaviour</h2>
                        </div>

                        <div className="faq-list-col flex flex-col gap-8 max-w-[652px]">
                            
                            <div className="info-row">
                                <div className="info-icon-box">
                                    <img alt="AI Adaptive Learning icon" src="/insat/images/Products.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">AI Adaptive Learning</h3>
                                    <p className="info-desc">
                                        InSAT automatically adapts learning paths to each user&apos;s specific department,
                                        role, and historical risk profile, ensuring training remains highly relevant.
                                    </p>
                                </div>
                            </div>

                            
                            <div className="info-row">
                                <div className="info-icon-box">
                                    <img alt="Gamified Awareness icon" src="/insat/images/Products-1.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">Gamified Awareness</h3>
                                    <p className="info-desc">
                                        Boost engagement with interactive quizzes, simulated challenges, leaderboards,
                                        and achievements that make security habits second nature.
                                    </p>
                                </div>
                            </div>

                            
                            <div className="info-row border-b-0 pb-0">
                                <div className="info-icon-box">
                                    <img alt="Always-On Reporting & Evidence icon" src="/insat/images/Products-2.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">Always-On Reporting & Evidence</h3>
                                    <p className="info-desc">
                                        Generate audit-ready records and human risk reports to prove compliance with key
                                        regulations like ISO 27001, SOC 2, and GDPR.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="bg-white" style={{paddingTop: "0"}}>
            <div className="container">
                <div className="section-intro" style={{maxWidth: "800px", marginBottom: "4rem"}}>
                    <span className="text-subheading" style={{color: "var(--color-night)", opacity: "0.5", display: "block", marginBottom: "0.5rem"}}>Role-Based Learning</span>
                    <h2 className="text-52-heading">Training That Matches the Employee’s Real Work</h2>
                    <p className="text-20-content opacity-70" style={{marginTop: "1.5rem"}}>
                        Different roles face different risks. InSAT helps assign relevant learning paths based on department, role, or risk profile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    <div className="side-card" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                        <div className="side-card-text-wrapper" style={{flex: "1"}}>
                            <div className="side-card-title-row">
                                <span className="side-card-title">Finance</span>
                            </div>
                            <p className="side-card-desc">
                                Invoice fraud, payment manipulation, fake vendor requests, and CEO fraud.
                            </p>
                        </div>
                        <div className="side-card-visual bg-plum">
                            <img alt="Finance risks illustration" loading="lazy"
                                src="/insat/images/finance.png" />
                        </div>
                    </div>

                    
                    <div className="side-card" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                        <div className="side-card-text-wrapper" style={{flex: "1"}}>
                            <div className="side-card-title-row">
                                <span className="side-card-title">HR</span>
                            </div>
                            <p className="side-card-desc">
                                Resume malware, employee data handling, fake documents, and social engineering.
                            </p>
                        </div>
                        <div className="side-card-visual bg-plum">
                            <img alt="HR risks illustration" loading="lazy"
                                src="/insat/images/Hr.png" />
                        </div>
                    </div>

                    
                    <div className="side-card" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                        <div className="side-card-text-wrapper" style={{flex: "1"}}>
                            <div className="side-card-title-row">
                                <span className="side-card-title">Sales</span>
                            </div>
                            <p className="side-card-desc">
                                Client data protection, public Wi-Fi risks, CRM access, and impersonation attempts.
                            </p>
                        </div>
                        <div className="side-card-visual bg-plum">
                            <img alt="Sales risks illustration" loading="lazy"
                                src="/insat/images/sales.png" />
                        </div>
                    </div>

                    
                    <div className="side-card" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                        <div className="side-card-text-wrapper" style={{flex: "1"}}>
                            <div className="side-card-title-row">
                                <span className="side-card-title">IT</span>
                            </div>
                            <p className="side-card-desc">
                                Privileged access, malware response, cloud risks, and incident reporting.
                            </p>
                        </div>
                        <div className="side-card-visual bg-plum">
                            <img alt="IT risks illustration" loading="lazy"
                                src="/insat/images/IT.png" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="bg-grey-5">
            <div className="container faq-grid">
                <div className="faq-title-col animate from-left">
                    <h2 className="text-40-heading">We’re here to help</h2>
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

    
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default InsatPage;