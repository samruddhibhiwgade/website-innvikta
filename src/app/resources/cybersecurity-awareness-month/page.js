"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiFileText, FiImage, FiMonitor, FiLayers, FiPlay, FiSmile, FiShield, FiLock, FiAlertTriangle, FiCheck, FiBriefcase, FiX, FiUser, FiMail, FiPhone } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Link from "next/link";
import SuccessPopup from "../../../layouts/partials/SuccessPopup";
import "../../../styles/features/cybersecurity-awareness-month.scss";

export default function CyberAwarenessMonthCampaignPage() {
  // Stepper state
  const [activeWeek, setActiveWeek] = useState(0);

  // Registered Count Animation
  const [registeredCount, setRegisteredCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = 5000;
    const duration = 1600;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setRegisteredCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setRegisteredCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  useEffect(() => {
    const target = new Date("2026-10-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }
      const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
      setTimeLeft({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        minutes: pad(Math.floor((diff % 3600000) / 60000)),
        seconds: pad(Math.floor((diff % 60000) / 1000)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Card Parallax state
  const [parallaxStyle, setParallaxStyle] = useState({ front: {}, mid: {}, back: {} });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxStyle({
      front: { transform: `perspective(600px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg)` },
      mid: { transform: `perspective(600px) rotateY(${cx * 3}deg) rotateX(${-cy * 2}deg)` },
      back: { transform: `perspective(600px) rotateY(${cx * 1.5}deg) rotateX(${-cy * 1}deg)` },
    });
  };
  const handleMouseLeave = () => {
    setParallaxStyle({ front: {}, mid: {}, back: {} });
  };

  // Form State matching BookDemo
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];

  const validateEmail = (email) => {
    if (!email) return "Work email is required";
    const domain = email.split("@")[1];
    if (freeDomains.includes(domain?.toLowerCase())) {
      return "Please use a work email address";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.fullName) newErrors.fullName = "Name is required";
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;
    if (!form.company) newErrors.company = "Company is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "Cybersecurity Awareness Month Kit",
          name: form.fullName,
          email: form.email,
          company: form.company,
          phone: form.phone
        })
      })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          setSubmitted(true);
          setForm({
            fullName: "",
            email: "",
            company: "",
            phone: ""
          });
        } else {
          alert("Error: " + (data.error || "Failed to submit request. Please try again."));
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert("An error occurred. Please try again later.");
      });
    }
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Cyber Champion Quest 2026 | Cybersecurity Awareness Month | Innvikta" description="Join the Cybersecurity Awareness Month 2026 — The Cyber Champion Quest. 5 weeks of immersive, gamified learning designed to transform security habits." />

      <div className="cyber-campaign-page min-h-screen w-full overflow-x-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="hero" id="home">
          <div className="hero-bg-lines" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>

          <div className="container hero-container">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot"></span>
                Cybersecurity Awareness Month 2026
              </div>

              <h1 className="hero-title">
                The Cyber<br/>
                <em>Champion</em><br/>
                Quest
              </h1>

              <p className="hero-body">
                Five weeks of immersive, gamified learning designed to transform how your team thinks about security. From awareness to action — permanently.
              </p>

              <div className="hero-actions">
                <a href="#register" className="btn btn--primary" id="heroRegisterBtn">Secure Your Spot</a>
                <a href="#weeks" className="btn btn--ghost">View the Program</a>
              </div>

              <div className="hero-meta">
                <div className="meta-item">
                  <div className="flex items-baseline">
                    <span className="meta-value">{registeredCount.toLocaleString()}</span>
                    <span className="meta-suffix">+</span>
                  </div>
                  <span className="meta-label">Registered</span>
                </div>
                <div className="meta-sep"></div>
                <div className="meta-item">
                  <span className="meta-value">5</span>
                  <span className="meta-label">Power Weeks</span>
                </div>
                <div className="meta-sep"></div>
                <div className="meta-item">
                  <span className="meta-value">100%</span>
                  <span className="meta-label">Free to Join</span>
                </div>
              </div>
            </div>

            <div className="hero-right" aria-hidden="true">
              <div 
                className="hero-card-stack" 
                onMouseMove={handleMouseMove} 
                onMouseLeave={handleMouseLeave}
              >
                <div className="hcard hcard--back" style={parallaxStyle.back}>
                  <div className="hcard-week">Week 04</div>
                  <div className="hcard-label">Prove</div>
                  <div className="hcard-bar" style={{ width: "90%" }}></div>
                </div>
                <div className="hcard hcard--mid" style={parallaxStyle.mid}>
                  <div className="hcard-week">Week 03</div>
                  <div className="hcard-label">Apply</div>
                  <div className="hcard-bar" style={{ width: "70%" }}></div>
                </div>
                <div className="hcard hcard--front" style={parallaxStyle.front}>
                  <div className="hcard-chip">Active</div>
                  <div className="hcard-week">Week 01</div>
                  <div className="hcard-title">Learn</div>
                  <p className="hcard-desc">Build your foundation. Know every threat vector before it knows you.</p>
                  <div className="hcard-progress">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: "45%" }}></div>
                    </div>
                    <span>45% complete</span>
                  </div>
                  <div className="hcard-tag">Interactive Module</div>
                </div>
              </div>
              <div className="hero-cert-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6"/><path d="M8.56 14.44L6 20l6-2 6 2-2.56-5.56"/>
                </svg>
                <span>Cyber Champion Certificate awarded</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE TAPE ================= */}
        <div className="marquee-bar" aria-hidden="true">
          <div className="marquee-track">
            <span>Learn</span><span className="marquee-dot"></span>
            <span>Play</span><span className="marquee-dot"></span>
            <span>Apply</span><span class="marquee-dot"></span>
            <span>Prove</span><span class="marquee-dot"></span>
            <span>Rise</span><span class="marquee-dot"></span>
            <span>Stronger Awareness</span><span class="marquee-dot"></span>
            <span>Safer Behavior</span><span class="marquee-dot"></span>
            <span>One Journey. Many Wins.</span><span class="marquee-dot"></span>
            {/* duplicate for seamless loop */}
            <span>Learn</span><span class="marquee-dot"></span>
            <span>Play</span><span class="marquee-dot"></span>
            <span>Apply</span><span class="marquee-dot"></span>
            <span>Prove</span><span class="marquee-dot"></span>
            <span>Rise</span><span class="marquee-dot"></span>
            <span>Stronger Awareness</span><span class="marquee-dot"></span>
            <span>Safer Behavior</span><span class="marquee-dot"></span>
            <span>One Journey. Many Wins.</span><span class="marquee-dot"></span>
          </div>
        </div>

        {/* ================= PROGRAM INTRO ================= */}
        <section className="section program-intro" id="program">
          <div className="container">
            <div className="section-label">The Program</div>
            <div className="program-intro-grid">
              <div className="program-intro-left">
                <h2 className="section-heading">A structured<br/>five-week journey<br/>built for real change.</h2>
              </div>
              <div className="program-intro-right">
                <p>Most security training gets forgotten within a week. The Cyber Champion Quest is different — built around engagement, application, and measurable behavior change. Each week unlocks a new layer of capability.</p>
                <p>From foundational knowledge to competitive challenges and a certified outcome, this is cybersecurity awareness done right.</p>
                <div className="intro-pillars">
                  <div className="intro-reveal-block flex gap-6 flex-wrap">
                    <div className="intro-pillar">
                      <span className="pillar-index">01</span>
                      <span className="pillar-name">Awareness</span>
                    </div>
                    <div className="intro-pillar">
                      <span className="pillar-index">02</span>
                      <span className="pillar-name">Engagement</span>
                    </div>
                    <div className="intro-pillar">
                      <span className="pillar-index">03</span>
                      <span className="pillar-name">Application</span>
                    </div>
                    <div className="intro-pillar">
                      <span className="pillar-index">04</span>
                      <span className="pillar-name">Measurement</span>
                    </div>
                    <div className="intro-pillar">
                      <span className="pillar-index">05</span>
                      <span className="pillar-name">Recognition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5 WEEKS STEPPER ================= */}
        <section className="section weeks-section" id="weeks">
          <div className="container">
            <div className="section-label">The Journey</div>
            <h2 className="section-heading weeks-heading">Five weeks. Five levels.<br/>One Cyber Champion.</h2>

            {/* Stepper Header */}
            <div className="weeks-stepper" role="tablist" aria-label="Program weeks">
              <button 
                className={`step-tab ${activeWeek === 0 ? "active" : ""}`}
                onClick={() => setActiveWeek(0)}
                role="tab"
                aria-selected={activeWeek === 0}
              >
                <span className="step-num">00</span>
                <span className="step-label">Launch</span>
                <span className="step-dates">Oct 1–2</span>
              </button>
              <button 
                className={`step-tab ${activeWeek === 1 ? "active" : ""}`}
                onClick={() => setActiveWeek(1)}
                role="tab"
                aria-selected={activeWeek === 1}
              >
                <span className="step-num">01</span>
                <span className="step-label">Learn</span>
                <span className="step-dates">Oct 5–9</span>
              </button>
              <button 
                className={`step-tab ${activeWeek === 2 ? "active" : ""}`}
                onClick={() => setActiveWeek(2)}
                role="tab"
                aria-selected={activeWeek === 2}
              >
                <span className="step-num">02</span>
                <span className="step-label">Play</span>
                <span className="step-dates">Oct 12–16</span>
              </button>
              <button 
                className={`step-tab ${activeWeek === 3 ? "active" : ""}`}
                onClick={() => setActiveWeek(3)}
                role="tab"
                aria-selected={activeWeek === 3}
              >
                <span className="step-num">03</span>
                <span className="step-label">Apply</span>
                <span className="step-dates">Oct 19–23</span>
              </button>
              <button 
                className={`step-tab ${activeWeek === 4 ? "active" : ""}`}
                onClick={() => setActiveWeek(4)}
                role="tab"
                aria-selected={activeWeek === 4}
              >
                <span className="step-num">04</span>
                <span className="step-label">Prove</span>
                <span className="step-dates">Oct 26–30</span>
              </button>
            </div>

            {/* Week Panels */}
            <div className="weeks-panel-area">
              
              {/* Panel 0: Launch */}
              <div className={`week-panel ${activeWeek === 0 ? "active" : ""}`}>
                <div className="panel-grid">
                  <div className="panel-left">
                    <div className="panel-overline">Week Zero</div>
                    <h3 className="panel-title">Launch</h3>
                    <p className="panel-tagline">We're kicking off something important. Get ready.</p>
                    <p className="panel-body">The campaign begins with a clear signal: cybersecurity is everyone's responsibility. This week sets the stage with materials that create anticipation and align the entire organization around a shared mission.</p>
                    <a href="#register" className="btn btn--primary">Join the Campaign</a>
                  </div>
                  <div className="panel-right">
                    <div className="deliverables-grid">
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiFileText size={18} />
                        </div>
                        <div>
                          <div className="dc-title">Announcement Poster</div>
                          <div className="dc-desc">Campaign-branded visual for internal communications</div>
                        </div>
                      </div>
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiMonitor size={18} />
                        </div>
                        <div>
                          <div className="dc-title">Campaign Calendar</div>
                          <div className="dc-desc">Full 5-week schedule for planning and rollout</div>
                        </div>
                      </div>
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiLayers size={18} />
                        </div>
                        <div>
                          <div className="dc-title">Teaser Content</div>
                          <div className="dc-desc">Pre-launch communications and Innvikta preview assets</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 1: Learn */}
              <div className={`week-panel ${activeWeek === 1 ? "active" : ""}`}>
                <div className="panel-grid">
                  <div className="panel-left">
                    <div className="panel-overline">Week One</div>
                    <h3 className="panel-title">Learn</h3>
                    <p className="panel-tagline">Build your foundation. Know the threats.</p>
                    <p className="panel-body">A 10-minute interactive module covering every major threat vector your team faces — from social engineering and phishing to AI-driven attacks and physical security. Designed to be completed in one sitting, retained for years.</p>
                    <a href="#register" className="btn btn--primary">Start Learning</a>
                  </div>
                  <div className="panel-right">
                    <div className="panel-featured">
                      <div className="featured-eyebrow">Core Deliverable</div>
                      <div className="featured-title">10-Minute Interactive Module</div>
                      <ul className="featured-topics">
                        <li>Social Engineering &amp; Phishing</li>
                        <li>Smishing &amp; Vishing</li>
                        <li>AI-Powered Attack Vectors</li>
                        <li>Physical Security Awareness</li>
                      </ul>
                    </div>
                    <div className="deliverables-grid" style={{ marginTop: "16px" }}>
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiFileText size={18} />
                        </div>
                        <div>
                          <div className="dc-title">Awareness Posters</div>
                          <div className="dc-desc">Printable and digital formats</div>
                        </div>
                      </div>
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiMonitor size={18} />
                        </div>
                        <div>
                          <div className="dc-title">Manager Communication Kit</div>
                          <div className="dc-desc">Ready-to-send emails and briefings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 2: Play */}
              <div className={`week-panel ${activeWeek === 2 ? "active" : ""}`}>
                <div className="panel-grid">
                  <div className="panel-left">
                    <div className="panel-overline">Week Two</div>
                    <h3 className="panel-title">Play</h3>
                    <p className="panel-tagline">Make learning stick. Outsmart the scammers.</p>
                    <p className="panel-body">Gamified challenges that turn knowledge into instinct. The AI ScamJam puts your team face-to-face with real AI-generated scam scenarios in real time — building threat-recognition reflexes that passive training never could.</p>
                    <a href="#register" className="btn btn--primary">Join the Game</a>
                  </div>
                  <div className="panel-right">
                    <div className="panel-featured panel-featured--green">
                      <div className="featured-eyebrow">Flagship Game</div>
                      <div className="featured-title">AI ScamJam</div>
                      <p className="featured-desc">Spot AI-generated scams in real time before they trick your team. Scored, timed, competitive.</p>
                    </div>
                    <div className="deliverables-grid" style={{ marginTop: "16px" }}>
                      <div className="deliverable-card">
                        <div className="dc-icon">
                          <FiLayers size={18} />
                        </div>
                        <div>
                          <div className="dc-title">3 Cybersecurity Comics</div>
                          <div className="dc-desc">The Deceptive Deception · The Phishing Plot · The Voice Clone Call</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 3: Apply */}
              <div className={`week-panel ${activeWeek === 3 ? "active" : ""}`}>
                <div className="panel-grid">
                  <div className="panel-left">
                    <div className="panel-overline">Week Three</div>
                    <h3 className="panel-title">Apply</h3>
                    <p className="panel-tagline">Put knowledge into action. In your context.</p>
                    <p className="panel-body">Theory meets reality. Department-specific scenario cards force teams to make judgment calls in contexts they recognize — Finance, HR, Sales, IT, and Leadership. Can you tell what's real and what's a scam?</p>
                    <a href="#register" className="btn btn--primary">Try a Scenario</a>
                  </div>
                  <div className="panel-right">
                    <div className="panel-featured panel-featured--purple">
                      <div className="featured-eyebrow">Flagship Game</div>
                      <div className="featured-title">Phish or Real</div>
                      <p className="featured-desc">Real-time decisions on live-style email scenarios. Zero hints. Just your judgment.</p>
                    </div>
                    <div className="dept-tags">
                      <span className="dept-tag">Finance</span>
                      <span className="dept-tag">Human Resources</span>
                      <span className="dept-tag">Sales</span>
                      <span className="dept-tag">IT &amp; Security</span>
                      <span className="dept-tag">Leadership</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 4: Prove */}
              <div className={`week-panel ${activeWeek === 4 ? "active" : ""}`}>
                <div className="panel-grid">
                  <div className="panel-left">
                    <div className="panel-overline">Week Four</div>
                    <h3 className="panel-title">Prove</h3>
                    <p className="panel-tagline">Challenge yourself. Show what you've mastered.</p>
                    <p className="panel-body">The final week is where champions are made. Two immersive arcade games, live leaderboards, and the official Cyber Champion Certificate — awarded to those who demonstrate true security excellence.</p>
                    <a href="#register" className="btn btn--primary">Earn Your Certificate</a>
                  </div>
                  <div className="panel-right">
                    <div className="games-grid">
                      <div className="game-card">
                        <div className="game-card-label">Game 01</div>
                        <div className="game-card-title">Inbox Detective</div>
                        <p className="game-card-desc">Analyse email threads and flag every red flag before time runs out.</p>
                      </div>
                      <div className="game-card game-card--alt">
                        <div className="game-card-label">Game 02</div>
                        <div className="game-card-title">Escape the Breach</div>
                        <p className="game-card-desc">Navigate a simulated breach incident. Every decision has consequences.</p>
                      </div>
                    </div>
                    <div className="cert-row">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="6"/><path d="M8.56 14.44L6 20l6-2 6 2-2.56-5.56"/>
                      </svg>
                      <span>Cyber Champion Certificate issued upon completion</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= WHAT YOU GET / OFFERINGS ================= */}
        <section className="section offerings-section" id="offerings">
          <div className="container">
            <div className="section-label">What You Get</div>
            <div className="offerings-header">
              <h2 className="section-heading">Everything unlocked.<br/>Nothing held back.</h2>
              <p>No paywalls, no restricted tiers. Every participant gets the full toolkit — all five weeks, every game, every asset, every certificate.</p>
            </div>

            <div className="offerings-grid">
              <div className="offering revealed" data-reveal>
                <div className="offering-index">01</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Interactive Learning Module</h3>
                <p className="offering-desc">A 10-minute, self-paced module designed to cover every threat your team encounters. Bite-sized, high-retention, no bloat.</p>
                <div className="offering-tag">10 min · Self-paced</div>
              </div>

              <div className="offering offering--accent revealed" data-reveal>
                <div className="offering-index">02</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Four Gamified Security Challenges</h3>
                <p className="offering-desc">AI ScamJam, Phish or Real, Inbox Detective, and Escape the Breach. Competitive, scored, and genuinely engaging.</p>
                <div className="offering-tag">4 games · Competitive</div>
              </div>

              <div className="offering revealed" data-reveal>
                <div className="offering-index">03</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Flipbook Comic Series</h3>
                <p className="offering-desc">Three cybersecurity comics designed to make threats stick. Narrative-driven, visually engaging, and shareable.</p>
                <div className="offering-tag">3 flipbooks</div>
              </div>

              <div className="offering revealed" data-reveal>
                <div className="offering-index">04</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Department Scenario Cards</h3>
                <p className="offering-desc">Role-specific decision scenarios for Finance, HR, Sales, IT, and Leadership. Context-relevant and immediately applicable.</p>
                <div className="offering-tag">5 departments</div>
              </div>

              <div className="offering revealed" data-reveal>
                <div className="offering-index">05</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Leaderboards &amp; Analytics</h3>
                <p className="offering-desc">Live scoring, top performer spotlights, and a full analytics dashboard for your security and leadership teams.</p>
                <div className="offering-tag">Real-time · Org-wide</div>
              </div>

              <div className="offering offering--cert revealed" data-reveal>
                <div className="offering-index">06</div>
                <div className="offering-line"></div>
                <h3 className="offering-title">Cyber Champion Certificate</h3>
                <p className="offering-desc">An official, shareable certificate awarded to every participant who completes the full five-week quest.</p>
                <div className="offering-tag">Official certification</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COUNTDOWN BAND ================= */}
        <section className="countdown-band">
          <div className="container countdown-inner">
            <div className="countdown-copy">
              <div className="section-label">Campaign Launch</div>
              <h2>October 1st, 2026<br/><span>Is your team ready?</span></h2>
            </div>
            <div className="countdown-timer">
              <div className="ctime-block">
                <span className="ctime-num">{timeLeft.days}</span>
                <span className="ctime-label">Days</span>
              </div>
              <span className="ctime-colon">:</span>
              <div className="ctime-block">
                <span className="ctime-num">{timeLeft.hours}</span>
                <span className="ctime-label">Hours</span>
              </div>
              <span className="ctime-colon">:</span>
              <div className="ctime-block">
                <span className="ctime-num">{timeLeft.minutes}</span>
                <span className="ctime-label">Min</span>
              </div>
              <span className="ctime-colon">:</span>
              <div className="ctime-block">
                <span className="ctime-num">{timeLeft.seconds}</span>
                <span className="ctime-label">Sec</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= REGISTER SECTION ================= */}
        <section className="section register-section" id="register">
          <div className="container register-grid">
            
            <div className="register-left">
              <div className="section-label">Register</div>
              <h2 className="section-heading register-heading">Join the<br/>Cyber Champion Quest</h2>
              <p className="register-intro">Spots are limited. Register your organisation now and get full access to the complete five-week toolkit — at no cost.</p>

              <div className="reg-checklist">
                <div className="rc-item">
                  <FiCheck className="rc-check" size={16} />
                  <span>Full five-week program access</span>
                </div>
                <div className="rc-item">
                  <FiCheck className="rc-check" size={16} />
                  <span>All four gamified challenges</span>
                </div>
                <div className="rc-item">
                  <FiCheck className="rc-check" size={16} />
                  <span>Department-specific scenario cards</span>
                </div>
                <div className="rc-item">
                  <FiCheck className="rc-check" size={16} />
                  <span>Org-level analytics &amp; leaderboard</span>
                </div>
                <div className="rc-item">
                  <FiCheck className="rc-check" size={16} />
                  <span>Official Cyber Champion Certificates</span>
                </div>
              </div>

              <div className="trust-strip">
                <div className="trust-pill">
                  <FiShield size={14} />
                  Secure registration
                </div>
                <div className="trust-pill">
                  <FiLock size={14} />
                  No spam, ever
                </div>
                <div className="trust-pill">
                  <FiBriefcase size={14} />
                  Completely free
                </div>
              </div>
            </div>

            <div className="register-right">
              <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden my-8 text-left max-w-4xl mx-auto flex flex-col md:flex-row">
                {/* Left panel - Brand Highlight Accent */}
                <div className="md:w-[40%] bg-gradient-to-br from-[#f15a24] to-[#c2410c] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-wider bg-white/10 rounded-full uppercase border border-white/15 backdrop-blur-sm">
                      CYBER CHAMPION QUEST 2026
                    </div>
                    <h4 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
                      Join the Campaign
                    </h4>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      Register your organisation now and get full access to the complete five-week campaign toolkit — completely free.
                    </p>
                  </div>
                  <div className="mt-8 relative z-10 text-[10px] text-white/70 font-semibold tracking-wider uppercase">
                    © INNVIKTA SECURITY
                  </div>
                </div>

                {/* Right panel - Form Fields */}
                <div className="md:w-[60%] p-6 md:p-8 bg-white flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">YOUR DETAILS</span>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">FULL NAME <span className="text-[#f15a24]">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                            errors.fullName ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                          } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                        />
                        <FiUser className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.fullName}</p>}
                    </div>

                    {/* Corporate Email */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CORPORATE EMAIL <span className="text-[#f15a24]">*</span></label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="jane@yourcompany.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                            errors.email ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                          } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                        />
                        <FiMail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.email}</p>}
                    </div>

                    {/* Organisation */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">ORGANISATION <span className="text-[#f15a24]">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your Organisation"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                            errors.company ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                          } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                        />
                        <FiBriefcase className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                      </div>
                      {errors.company && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.company}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PHONE NUMBER <span className="text-[#f15a24]">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="+1 555-0199"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                            errors.phone ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                          } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                        />
                        <FiPhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.phone}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#f15a24] hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed !text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm py-4 cursor-pointer"
                    >
                      {isSubmitting ? "Submitting..." : "Register for the Campaign"} <FiArrowRight className="text-xs" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>

          {/* Success Popup */}
          <SuccessPopup 
            isOpen={submitted} 
            onClose={() => setSubmitted(false)} 
            title="You're registered, Champion!" 
            message="Welcome to the Cyber Champion Quest 2026. Check your inbox for a confirmation and your first campaign brief. The quest begins October 1st." 
          />
        </section>

      </div>
    </GSAPWrapper>
  );
}