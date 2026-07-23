import React from "react";

export default function HeroSection({ scrollToCalculator, scrollToCta }) {
  return (
    <div className="hero-section" style={{ paddingTop: "3rem", paddingBottom: "1.5rem" }}>
      <div className="hero-outer-wrapper">
        <div className="hero-bg-decor" aria-hidden="true">
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

        <div className="hero-backdrop-wrapper">
          <div className="backdrop-shape shape-1">
            <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
              <defs>
                <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                  <stop offset="0.31" stopColor="#FF7A00" />
                  <stop offset="0.59" stopColor="#F59E0B" />
                  <stop offset="0.78" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
            <div className="hero-content" style={{ paddingTop: "1rem", paddingBottom: "2rem", textAlign: "center", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto", textAlign: "center" }}>Enterprise Planning Tools</span>
              <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                Security Awareness <span className="text-primary">ROI Calculator</span>
              </h1>
              <p className="text-20-content hero-paragraph text-balance" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
                Estimate your organization&apos;s human cyber risk exposure and project the financial Return on Investment (ROI) of implementing a continuous awareness and simulation program.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={scrollToCalculator} className="btn-roi-calc bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm" style={{ padding: "14px 28px" }}>
                  Open Calculator
                </button>
                <button onClick={scrollToCta} className="btn-roi-calc bg-transparent hover:bg-[#f15a24] border border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm whitespace-nowrap" style={{ padding: "14px 28px" }}>
                  Start Free Tier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
