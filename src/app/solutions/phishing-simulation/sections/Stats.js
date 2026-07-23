import React from "react";
import Link from "next/link";

export default function StatsSection() {
  return (
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
                <span>Book a Demo</span>
                <div className="arrow-wrapper">
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="stats-cards-block animate from-right grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pb-6 md:pb-0">
            {/* Card 1: Phishing Attacks Observed */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="card-number">1M+</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Phishing Attacks Observed</h3>
                <p className="card-description">1Million+ phishing attacks observed in just Q1 2025.</p>
                <span className="card-source">SOURCE: APWG</span>
              </div>
              <div className="card-chart">
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
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="15" width="28" height="18" rx="2" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                    <path d="M8 17 L22 26 L36 17" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="32" cy="27" r="7.5" fill="#f15a24" stroke="#FFEFEA" strokeWidth="1.5" />
                    <text x="32" y="31.5" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">$</text>
                  </svg>
                </div>
                <div className="card-number">$2.77B</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Business Email Compromise</h3>
                <p className="card-description">lost to business email compromise in 2024</p>
                <span className="card-source">SOURCE: FBI IC3</span>
              </div>
              <div className="card-chart">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                  <circle cx="45" cy="45" r="35" fill="#FFEFEA" />
                  <text x="45" y="56" fontFamily="Inter, sans-serif" fontSize="34" fontWeight="600" fill="#f15a24" textAnchor="middle">$</text>
                  <circle cx="70" cy="70" r="14" fill="#f15a24" stroke="white" strokeWidth="3" />
                  <path d="M70 63 L70 77 M65 72 L70 77 L75 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Card 3: Failed to Detect AI Audio */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="20" x2="12" y2="28" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                    <line x1="18" y1="16" x2="18" y2="32" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                    <line x1="24" y1="10" x2="24" y2="38" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                    <line x1="30" y1="16" x2="30" y2="32" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                    <line x1="36" y1="20" x2="36" y2="28" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="card-number">66%</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Failed to Detect AI Audio</h3>
                <p className="card-description">failing to identify fake AI-created audio</p>
                <span className="card-source">SOURCE: 2025 STUDY</span>
              </div>
              <div className="card-chart">
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
  );
}
