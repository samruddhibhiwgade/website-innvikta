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

          <div className="stats-cards-block animate from-right grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pb-6 md:pb-0">
            {/* Card 1: Average Global Cost of a Data Breach */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </div>
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
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </div>
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

            {/* Card 3: Failed to Detect AI Audio */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                    <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div className="card-number">67%</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Fewer Security Incidents</h3>
                <p className="card-description">organizations reporting fewer incidents after awareness training</p>
                <span className="card-source">SOURCE: FORTINET 2025</span>
              </div>
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
  );
}
