import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
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

        <div className="container">
          <div className="hero-grid-container">
            <div className="hero-content">
              <span className="text-subheading">CUSTOMIZED SECURITY AWARENESS</span>
              <h1 className="text-96-heading hero-title-custom">Awareness Built Around Your Organization</h1>

              <div className="hero-text-wrapper">
                <p className="text-20-content hero-paragraph">
                  Custom security awareness programs, simulations, and compliance learning aligned to your policies, procedures, roles, risks, and culture.
                </p>
              </div>

              <div className="hero-actions-row">
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

            <div className="hero-image-right">
              <img src="/images/solutions/customised_Solutions/custom-solution-hero.png" alt="Customized Security Awareness Hero" className="hero-sim-img" />
            </div>
          </div>
        </div>

        <div className="container container-hero-visual">
          <div className="hero-visual">
            <img src="/insat/images/dashboard_platform1.png" alt="Customized Security Awareness Platform" className="hero-platform-img" />
          </div>
        </div>

      </div>
    </section>
  );
}
