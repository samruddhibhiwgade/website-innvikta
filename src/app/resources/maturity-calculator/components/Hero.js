import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection({ setStep }) {
  return (
    <section className="hero-section" style={{ background: "#FFFFFF", padding: "8rem 0 6rem 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Background SVG Decors */}
      <div className="hero-bg-decor" aria-hidden="true" style={{ pointerEvents: "none" }}>
        <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
          <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
          <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
          <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
          <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
          <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
          <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
        </svg>
      </div>

      <div className="container relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
        <span className="text-subheading block text-center" style={{ color: "#F15A24", fontWeight: "600", marginBottom: "1rem" }}>
          MATURITY ASSESSMENT TOOL
        </span>
        <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
          Measure Your <span className="text-primary">Human Cyber Risk</span>
        </h1>
        <p className="text-20-content hero-paragraph" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
          Evaluate your organization&apos;s security awareness maturity across training, phishing resilience, compliance, privacy, and employee cyber behavior.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setStep("assessment")}
            className="btn btn-primary"
            style={{ 
              backgroundColor: "#F15A24", 
              color: "#FFFFFF", 
              border: "none", 
              padding: "14px 32px", 
              borderRadius: "8px", 
              fontWeight: 700, 
              fontSize: "1rem", 
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>Start Free Assessment</span>
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
