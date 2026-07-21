import React from "react";

export default function WhyCultureMatters() {
  return (
    <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
              THE HUMAN FIREWALL
            </span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              Human Behavior Remains One of the Largest Security Risks
            </h2>
            <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Technical controls alone cannot eliminate risk. Many security incidents still involve phishing, credential misuse, social engineering, policy violations, or unsafe employee behavior.
            </p>
            <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Organizations that continuously measure and improve security culture are better positioned to:
            </p>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { 
                  label: "Reduce human risk", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  )
                },
                { 
                  label: "Improve threat reporting rates", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  )
                },
                { 
                  label: "Strengthen security awareness", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 7.5 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
                      <line x1="9" y1="18" x2="15" y2="18"/>
                      <line x1="10" y1="22" x2="14" y2="22"/>
                    </svg>
                  )
                },
                { 
                  label: "Support compliance initiatives", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                      <polyline points="9 14 11 16 15 12"/>
                    </svg>
                  )
                },
                { 
                  label: "Build long-term security resilience", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1rem", color: "#1F1F1F", lineHeight: "1.5" }}>
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Editorial Statistic Presentation */}
          <div className="lg:col-span-5" style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#FFFBF7",
                border: "1px solid #FFEAD4",
                borderRadius: "20px",
                padding: "3.5rem 2rem",
                boxShadow: "0 10px 30px rgba(241, 90, 36, 0.02)"
              }}
            >
              <div style={{ fontSize: "6.5rem", fontWeight: "700", color: "#F15A24", lineHeight: "1" }}>
                91%
              </div>
              <strong style={{ fontSize: "1.2rem", color: "#1F1F1F", display: "block", marginTop: "1rem" }}>
                of cyber attacks begin with human interaction.
              </strong>
              <span style={{ fontSize: "0.75rem", color: "#6B7280", display: "block", marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Source: Threat Intelligence Reports
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
