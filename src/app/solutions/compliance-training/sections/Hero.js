"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

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
                <Link 
                  href="/start-free" 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 flex items-center justify-center font-bold text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Start Free
                </Link>
                <Link 
                  href="/book-demo" 
                  className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Explore Platform <FiArrowRight className="text-xs" />
                </Link>
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
