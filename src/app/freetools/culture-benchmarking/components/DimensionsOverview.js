import React from "react";

export default function DimensionsOverview() {
  return (
    <section style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-6" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
              CULTURE DEFINED
            </span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              What Does Security Culture Actually Measure?
            </h2>
            <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Security culture goes beyond awareness training. Organizations with strong security cultures consistently demonstrate safer employee behaviors, faster threat reporting, stronger accountability, and lower human-driven security incidents.
            </p>
            <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              A mature security culture is not defined by completed training alone. It is reflected in how employees recognize threats, make security decisions, follow policies, and support secure behaviors across teams.
            </p>
            <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Organizations with stronger reporting and ownership cultures often detect threats earlier and reduce the impact of human-related security incidents.
            </p>
          </div>

          {/* Right Column: Visual Bento Grid Framework */}
          <div className="lg:col-span-6">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              
              {/* Section Header (Spans 2 columns, borderless) */}
              <div style={{ gridColumn: "span 2", marginBottom: "0.25rem", textAlign: "left" }}>
                <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                  Seven Core Culture Dimensions Evaluated:
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0 0" }}>
                  Inspired by global human risk management research.
                </p>
              </div>

              {/* Bento Grid Items */}
              {[
                { title: "Security Attitudes", desc: "Beliefs and perceptions about security policies." },
                { title: "Security Behaviors", desc: "Active safe habits in daily system interactions." },
                { title: "Security Knowledge", desc: "Understanding vectors, mechanics, and reporting." },
                { title: "Security Communication", desc: "How feedback loops and incidents are reported." },
                { title: "Compliance Practices", desc: "Consistency in policy acceptance and execution." },
                { title: "Team Norms", desc: "Peer-to-peer security reinforcement and check-ins." },
                { title: "Security Ownership", desc: "Personal responsibility and duty of care." }
              ].map((dim, i) => (
                <div
                  key={i}
                  className="risk-stat-card"
                  style={{
                    gridColumn: i === 6 ? "span 2" : "auto",
                    background: "#FFFFFF",
                    border: "1px solid #E7E7E7",
                    borderLeft: "4px solid #F15A24",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{
                      background: "#FFEFEA",
                      color: "#F15A24",
                      borderRadius: "50%",
                      minWidth: "22px",
                      minHeight: "22px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "600"
                    }}>
                      0{i + 1}
                    </span>
                    <strong style={{ fontSize: "0.95rem", color: "#1F1F1F" }}>{dim.title}</strong>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0, lineHeight: "1.4" }}>{dim.desc}</p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
