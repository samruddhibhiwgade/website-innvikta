import React from "react";
import ImageFallback from "@layouts/components/ImageFallback";

export default function HighRiskSection() {
  return (
    <section id="executive-risk-management" className="bg-white" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        <div className="two-col-grid" style={{ alignItems: "center" }}>
          
          {/* Left Column: Heading, Description & Bullet Points */}
          <div className="two-col-content-block animate from-left" style={{ maxWidth: "620px" }}>
            <span className="text-subheading">EXECUTIVE & HIGH-RISK</span>
            <h2 className="text-52-heading" style={{ marginTop: "0.5rem", lineHeight: "1.1" }}>
              Focused Journeys for <br />
              <span style={{ color: "#f15a24" }}>People Attackers Target First</span>
            </h2>
            <p className="text-18-content" style={{ marginTop: "1.5rem", opacity: "0.8" }}>
              Build specialized campaigns for CXOs, finance teams, privileged users, customer-facing teams, and employees who need reinforcement.
            </p>
            
            <div style={{ marginTop: "2rem" }}>
              <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  {
                    title: "Leadership Risk",
                    desc: "CXO impersonation, urgent approvals, and reputation impact protection.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "4px" }}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <polyline points="16 11 18 13 22 9" />
                      </svg>
                    )
                  },
                  {
                    title: "Finance Risk",
                    desc: "Defense against fake vendors, invoice manipulation, and payment fraud.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "4px" }}>
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    )
                  },
                  {
                    title: "Privileged Access",
                    desc: "Security controls for admin credentials, MFA fatigue, and access misuse.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "4px" }}>
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                      </svg>
                    )
                  },
                  {
                    title: "Repeat-Risk Users",
                    desc: "Targeted nudges, microlearning, and follow-up simulation campaigns.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "4px" }}>
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )
                  }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                    {item.icon}
                    <span>
                      <strong style={{ fontSize: "1.1rem", color: "#0f172a", display: "block", marginBottom: "0.25rem" }}>{item.title}</strong>
                      <span style={{ color: "#475569", fontSize: "0.95rem" }}>{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right" style={{ marginTop: "3rem" }}>
            <ImageFallback
              src="/images/solutions/customised_Solutions/Targeteduser.png"
              alt="High-risk scenarios monitoring"
              fill={true}
              className="object-cover"
              priority={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
