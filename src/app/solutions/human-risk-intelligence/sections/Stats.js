import React from "react";
import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="bg-white stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stats-content-block animate from-left">
            <h2 className="text-52-heading"><span className="text-orange">Human Risk</span> Is Still the Weakest Link</h2>

            <div className="stats-subheading">
              <p className="text-18-content">
                Most security programs track completion. Effective security programs track behaviour. InSAT helps organizations measure human risk, improve engagement, and turn awareness efforts into measurable outcomes.
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn-primary btn-cta" href="/book-demo">
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
            {/* Card 1: Human Element */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-number">68%</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Human Element in Breaches</h3>
                <p className="card-description">of breaches involve a non-malicious human element</p>
                <span className="card-source">Source: Verizon DBIR</span>
              </div>
              <div className="card-chart">
                <div className="bar-chart">
                  <div className="bar" style={{height: '40%'}}></div>
                  <div className="bar" style={{height: '90%'}}></div>
                  <div className="bar" style={{height: '60%'}}></div>
                  <div className="bar" style={{height: '100%'}}></div>
                  <div className="bar" style={{height: '75%'}}></div>
                  <div className="bar" style={{height: '50%'}}></div>
                </div>
              </div>
            </div>

            {/* Card 2: Risky Actions */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-number">71%</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Risky Actions Online</h3>
                <p className="card-description">of employees admit to taking risky actions online</p>
                <span className="card-source">Source: Proofpoint</span>
              </div>
              <div className="card-chart">
                <div className="progress-circle">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" stroke="#FFF0E4" strokeWidth="6" fill="transparent" />
                    <circle cx="40" cy="40" r="32" stroke="#f15a24" strokeWidth="6" fill="transparent" 
                            strokeDasharray="201" strokeDashoffset="58" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                  </svg>
                  <span className="progress-text">71%</span>
                </div>
              </div>
            </div>

            {/* Card 3: Global Cost */}
            <div className="stats-card w-full">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="#f15a24" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H7" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="card-number">$4.44M</div>
                <div className="card-divider"></div>
                <h3 className="card-title">Average Global Breach Cost</h3>
                <p className="card-description">average global cost of a data breach</p>
                <span className="card-source">Source: IBM</span>
              </div>
              <div className="card-chart">
                <svg className="wave-chart" width="100%" height="60" viewBox="0 0 200 60">
                  <path d="M 0 45 Q 25 50 50 38 T 100 28 T 150 45 T 200 12" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 0 45 Q 25 50 50 38 T 100 28 T 150 45 T 200 12 L 200 60 L 0 60 Z" fill="rgba(241, 90, 36, 0.06)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
