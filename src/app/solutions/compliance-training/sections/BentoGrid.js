import React from "react";
import Link from "next/link";

const cardStyle = {
  background: "#FFFBF7",
  border: "1px solid #FFEAD4",
  borderRadius: "14px",
  padding: "1rem",
  display: "flex",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  textAlign: "center"
};

const iconWrapperStyle = {
  background: "#FFEFEA",
  display: "inline-flex",
  padding: "0.35rem",
  borderRadius: "50%",
  width: "34px",
  height: "34px",
  minWidth: "34px",
  minHeight: "34px",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "0.6rem"
};

const titleStyle = {
  marginTop: "0px",
  marginBottom: "0.3rem",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#1E293B",
  display: "block",
  textAlign: "center",
  lineHeight: "1.2"
};

const descStyle = {
  fontSize: "0.82rem",
  color: "#475569",
  marginTop: "0px",
  marginBottom: "0px",
  lineHeight: "1.5",
  display: "block",
  textAlign: "center"
};

const sourceStyle = {
  fontSize: "0.6rem",
  fontWeight: "700",
  color: "#94A3B8",
  marginTop: "0.5rem",
  marginBottom: "0px",
  display: "block",
  textAlign: "center",
  letterSpacing: "0.05em"
};

export default function BentoGridSection() {
  return (
    <section id="compliance-learning-suite" className="bg-white stats-section" style={{ paddingBottom: "5rem" }}>
      <div className="container">
        <div className="stats-grid">
          <div className="stats-content-block animate from-left">
            <span className="text-subheading">COMPLIANCE TRAINING SUITE</span>
            <h2 className="text-52-heading">
              <span className="text-orange">Structured Journey.</span><br />
              Satisfy Regulatory Audits.
            </h2>

            <div className="stats-subheading">
              <p className="text-18-content">
                Policies only work when employees understand them, remember them, and apply them in real situations. Innvikta helps organizations turn compliance requirements into structured learning journeys with measurable outcomes.
              </p>
              <p className="text-16-content" style={{ marginTop: "1rem", opacity: "0.8" }}>
                Train employees across DPDP, GDPR, HIPAA, PCI-DSS and internal compliance policies through one structured platform.
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn-primary btn-cta" href="/book-demo">
                <span className="hover-sweep"></span>
                <span>Explore Our Platform</span>
                <div className="arrow-wrapper">
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* 6-Card Bento Grid */}
          <div className="stats-cards-block animate from-right" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1.25fr", gap: "1rem", width: "100%" }}>
            
            {/* Card 1: DPDP (Col span 2) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>DPDP Act</h3>
              <p className="card-description" style={descStyle}>Consent-based data processing rules mandated by India&apos;s data law.</p>
              <span className="card-source" style={sourceStyle}>MANDATORY ACT</span>
            </div>

            {/* Card 2: GDPR (Col span 1) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a7 7 0 1 0 10 7" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>GDPR</h3>
              <p className="card-description" style={descStyle}>Strict EU privacy mandates.</p>
            </div>

            {/* Card 3: HIPAA (Col span 1) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>HIPAA</h3>
              <p className="card-description" style={descStyle}>Healthcare info privacy safeguards.</p>
            </div>

            {/* Card 4: PCI-DSS (Col span 2) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>PCI-DSS</h3>
              <p className="card-description" style={descStyle}>Securing cardholder data and credit card transactions.</p>
              <span className="card-source" style={sourceStyle}>VERSION 4.0 READY</span>
            </div>

            {/* Card 5: AI Usage Policy (Col span 2) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 2", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>AI Usage Policy</h3>
              <p className="card-description" style={descStyle}>Responsible corporate guardrails for generative AI tool usage.</p>
              <span className="card-source" style={sourceStyle}>AI SAFETY PROTOCOLS</span>
            </div>

            {/* Card 6: Internal Policies (Col span 1) */}
            <div className="compliance-bento-card" style={{ ...cardStyle, gridColumn: "span 1", flexDirection: "column", justifyContent: "flex-start", gap: "0.15rem" }}>
              <div className="card-icon-wrapper" style={iconWrapperStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="card-title" style={titleStyle}>Internal Policies</h3>
              <p className="card-description" style={descStyle}>POSH, conduct and customs.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
