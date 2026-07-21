import React from "react";
import { getScoreData } from "./constants";

export default function BenchmarkReport({ benchmarkResult, formData, handleReset }) {
  const scoreData = getScoreData(benchmarkResult, formData);

  return (
    <section style={{ background: "#FDFDFD", paddingTop: "5rem", paddingBottom: "5rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="text-subheading" style={{ color: "#F15A24", fontWeight: 600 }}>METHODOLOGY</span>
          <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1.5rem" }}>
            How the Benchmark Score Is Calculated
          </h2>
          <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", textAlign: "center" }}>
            Unlike generic awareness scores, this benchmark evaluates multiple indicators of security culture maturity to provide a balanced view of organizational human risk and security behavior.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "2.5rem" }}>
          
          {/* Left Column: Weighted Culture Dimensions */}
          <div className="calculation-col" style={{ gridColumn: "span 7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                Weighted Culture Dimensions
              </h3>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 1.5rem 0", textAlign: "left" }}>
              Each dimension contributes to your overall benchmark score.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { name: "Security Behaviors", weight: "25%", desc: "Measures phishing resilience, secure decision-making, MFA adoption, password practices, and day-to-day security habits.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { name: "Security Ownership & Accountability", weight: "15%", desc: "Measures employee responsibility, incident ownership, proactive security participation, and accountability across teams.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                { name: "Compliance & Policy Adherence", weight: "15%", desc: "Measures policy acknowledgement, procedural compliance, training completion, and adherence to security requirements.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg> },
                { name: "Security Knowledge & Awareness", weight: "15%", desc: "Measures security understanding, assessment performance, knowledge retention, and awareness effectiveness.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg> },
                { name: "Security Attitudes", weight: "10%", desc: "Measures employee perception of security, willingness to engage, and commitment to secure practices.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
                { name: "Security Communication", weight: "10%", desc: "Measures threat reporting behavior, communication effectiveness, and engagement with security initiatives.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                { name: "Team Norms & Cultural Reinforcement", weight: "10%", desc: "Measures peer influence, security champion participation, and how security behaviors are reinforced across teams.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                    <div 
                      style={{ 
                        background: "#FFF0EC", 
                        borderRadius: "10px", 
                        width: "38px", 
                        height: "38px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <strong style={{ fontSize: "0.9rem", color: "#1F1F1F", display: "block", marginBottom: "0.15rem" }}>
                        {item.name}
                      </strong>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 0.5rem 0", lineHeight: "1.4" }}>
                        {item.desc}
                      </p>
                      <div style={{ width: "80%", maxWidth: "300px", height: "4px", background: "#E5E7EB", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: item.weight, height: "100%", background: "#F15A24" }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#F15A24", display: "block" }}>{item.weight}</span>
                    <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>Weight</span>
                  </div>
                </div>
              ))}

              {/* Total Weight Card */}
              <div 
                style={{
                  background: "#FAF9F6",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div 
                    style={{ 
                      background: "#F3F4F6", 
                      borderRadius: "10px", 
                      width: "38px", 
                      height: "38px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ fontSize: "0.9rem", color: "#1F1F1F", display: "block" }}>Total Weight</strong>
                    <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>All dimensions combined</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#F15A24" }}>100%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Benchmark Classifications */}
          <div className="calculation-col" style={{ gridColumn: "span 5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                Benchmark Classifications
              </h3>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 1.5rem 0", textAlign: "left" }}>
              Understand what your score range means.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { range: "86–100", label: "Security-Driven Culture", desc: "Security is embedded into daily decision-making, supported by strong ownership, reporting habits, and organizational reinforcement.", color: "#10B981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a7 7 0 0 0-7 7c0 2.2 1 4.1 2.6 5.4l2.4 2.1c1 .9 2.6.9 3.6 0l2.4-2.1c1.6-1.3 2.6-3.2 2.6-5.4a7 7 0 0 0-7-7z"/></svg> },
                { range: "76–85", label: "Mature", desc: "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.", color: "#F15A24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                { range: "61–75", label: "Progressing", desc: "Security practices are becoming embedded, though key opportunities remain in behavior reinforcement and reporting culture.", color: "#3B82F6", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polygon points="17 6 23 6 23 12"/></svg> },
                { range: "41–60", label: "Foundational", desc: "Basic awareness exists, but security behaviors and cultural adoption remain inconsistent across the organization.", color: "#F59E0B", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18M18 22H6M8 6h8M8 10h8M8 14h8M8 18h8"/></svg> },
                { range: "0–40", label: "High Human Risk", desc: "Organizations show significant cultural gaps, inconsistent security behaviors, and elevated exposure to human-driven threats.", color: "#EF4444", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
              ].map((band, idx) => {
                const isCurrentBand = scoreData.band === band.label;
                return (
                  <div 
                    key={idx}
                    style={{
                      background: "#FFFFFF",
                      border: isCurrentBand ? `2px solid ${band.color}` : "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      textAlign: "left",
                      boxShadow: isCurrentBand ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div 
                      style={{ 
                        background: isCurrentBand ? "#FFEFEA" : "#F9FAFB", 
                        borderRadius: "50%", 
                        width: "36px", 
                        height: "36px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {band.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                        <strong style={{ fontSize: "0.95rem", color: band.color }}>{band.label}</strong>
                        <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: "600" }}>{band.range}</span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0, lineHeight: "1.4" }}>{band.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Methodology Note */}
            <div 
              style={{ 
                marginTop: "1.5rem", 
                background: "#FAF9F6", 
                border: "1px solid #E5E7EB", 
                borderRadius: "12px", 
                padding: "1.25rem 1.5rem", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                textAlign: "left" 
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1 }}>
                <span style={{ fontSize: "2.5rem", color: "#F15A24", fontFamily: "Georgia, serif", lineHeight: "1", marginTop: "-0.5rem" }}>
                  “
                </span>
                <div>
                  <strong style={{ display: "block", fontSize: "0.9rem", color: "#1F1F1F", marginBottom: "0.25rem" }}>Methodology Note</strong>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0, lineHeight: "1.5" }}>
                    Each dimension is normalized to a 100-point scale and weighted according to its impact on human risk reduction. The final benchmark score reflects both individual behaviors and broader organizational culture indicators rather than relying on training completion alone.
                  </p>
                </div>
              </div>
              <div style={{ flexShrink: 0 }} className="hidden sm:block">
                <svg width="36" height="42" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scale(0.85)" }}>
                  <rect x="6" y="8" width="36" height="44" rx="4" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M16 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="#9CA3AF" strokeWidth="2"/>
                  <line x1="14" y1="18" x2="34" y2="18" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="14" y1="26" x2="28" y2="26" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="14" y1="34" x2="24" y2="34" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="36" cy="38" r="8" fill="#FFF0EC" stroke="#F15A24" strokeWidth="2"/>
                  <path d="M33 38l2 2 3-3" stroke="#F15A24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
