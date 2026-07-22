import React from "react";
import Link from "next/link";

const JourneySection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} id="audit-ready-evidence" className="bg-white" style={{ paddingTop: "4rem", paddingBottom: "5rem", position: "relative" }}>
      <div className="container">
        <div className="journey-section-grid">
          
          {/* Left Column: Title & CTAs */}
          <div className="journey-left-col animate">
            <span className="text-subheading">FROM AWARENESS TO EVIDENCE</span>
            <h2 className="text-52-heading" style={{ lineHeight: "1.2" }}>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>One Continuous</span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Compliance <span className="text-orange">Journey</span></span>
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", marginTop: "1.25rem", marginBottom: "2rem", color: "#334155", maxWidth: "480px" }}>
              A structured, automated learning loop designed to satisfy regulatory audits, build lasting retention, and turn policy training into measurable employee behavior and audit-ready compliance evidence.
            </p>
            
            <div className="journey-btn-group">
              <Link className="btn btn-primary btn-cta" href="/book-demo">
                <span className="hover-sweep"></span>
                <span>Book a demo</span>
                <div className="arrow-wrapper">
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Staggered Cards & Wave */}
          <div className="journey-right-col">
            {/* Dotted Snake Connecting SVG */}
            <div className="journey-wave-container">
              <svg className="journey-wave-svg" viewBox="0 0 850 780" preserveAspectRatio="none">
                <defs>
                  <mask id="journey-mask">
                    <path className="journey-mask-path" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                </defs>
                <path className="journey-path-bg" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" />
                <path className="journey-path-active" d="M 142,20 L 142,74 C 142,140 426,140 426,254 C 426,320 142,320 142,434 C 142,500 426,500 426,614 L 426,696" mask="url(#journey-mask)" />
                <circle cx="142" cy="20" r="4.5" fill="#f15a24" />
                <circle cx="426" cy="696" r="4.5" fill="#f15a24" />
              </svg>
            </div>

            {/* Staggered Cards Grid */}
            <div className="journey-steps-container">
              
              {/* Step 1: Train */}
              <div className="journey-step step-1">
                <div className="journey-badge">1</div>
                <div className="journey-card">
                  <div className="journey-card-header">
                    <div className="journey-card-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <h3 className="journey-card-title">Train</h3>
                  </div>
                  <p className="journey-card-desc">Deliver role-based training that builds awareness and knowledge.</p>
                </div>
              </div>

              {/* Step 2: Assess */}
              <div className="journey-step step-2">
                <div className="journey-badge">2</div>
                <div className="journey-card">
                  <div className="journey-card-header">
                    <div className="journey-card-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="journey-card-title">Assess</h3>
                  </div>
                  <p className="journey-card-desc">Evaluate understanding with scenario-based assessments.</p>
                </div>
              </div>

              {/* Step 3: Reinforce */}
              <div className="journey-step step-3">
                <div className="journey-badge">3</div>
                <div className="journey-card">
                  <div className="journey-card-header">
                    <div className="journey-card-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
                      </svg>
                    </div>
                    <h3 className="journey-card-title">Reinforce</h3>
                  </div>
                  <p className="journey-card-desc">Reinforce learning with microlearning, nudges, and spaced repetition.</p>
                </div>
              </div>

              {/* Step 4: Evidence */}
              <div className="journey-step step-4">
                <div className="journey-badge">4</div>
                <div className="journey-card">
                  <div className="journey-card-header">
                    <div className="journey-card-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 10h6M9 14h6" />
                      </svg>
                    </div>
                    <h3 className="journey-card-title">Evidence</h3>
                  </div>
                  <p className="journey-card-desc">Automatically generate reports, completion records, and compliance evidence.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default JourneySection;
