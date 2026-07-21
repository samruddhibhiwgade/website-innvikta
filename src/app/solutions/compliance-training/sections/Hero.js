"use client";
import React from "react";

const HeroSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
      <div className="hero-outer-wrapper">
        
        <style>{`
          @media (min-width: 1024px) {
            .compliance-hero-grid {
              grid-template-columns: 0.95fr 1.05fr !important;
            }
            .compliance-hero-img {
              max-width: 780px !important;
            }
          }
        `}</style>
        
        <div className="container">
          <div className="hero-grid-container compliance-hero-grid">
            <div className="hero-content">
              <span className="text-subheading">Compliance Training</span>
              <h1 className="text-96-heading hero-title-custom">Audit-ready. Built for Retention.</h1>

              <div className="hero-text-wrapper">
                <p className="text-20-content hero-paragraph">
                  Train employees across regulations, roles and policies with short, scenario-based modules - with measurable completion, reinforcement, and audit-ready evidence.
                </p>
              </div>

              <div className="hero-actions-row">
                <a className="btn btn-primary btn-cta" href="/book-demo">
                  <span className="hover-sweep"></span>
                  <span>Explore Our Platform</span>
                  <div className="arrow-wrapper">
                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                    </svg>
                  </div>
                </a>
                <a className="btn btn-secondary" href="/book-demo">
                  <span>Book a demo</span>
                </a>
              </div>
            </div>

            <div className="hero-image-right" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <img 
                src="/images/solutions/compliance-training-images/img_2.png" 
                alt="Compliance Training Hero" 
                className="hero-sim-img compliance-hero-img" 
                style={{
                  maxWidth: "780px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

export default HeroSection;
