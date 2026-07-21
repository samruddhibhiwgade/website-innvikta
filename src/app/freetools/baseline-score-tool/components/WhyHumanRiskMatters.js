import React from "react";

export default function WhyHumanRiskMatters() {
  return (
    <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>THE WEAKEST LINK</span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              Cybercriminals Target People First
            </h2>
            <p className="text-18-content" style={{ color: "#6E6E6E", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Modern attacks rarely begin by breaking into systems. They begin by exploiting trust, behavior, communication patterns, and human decision-making.
            </p>
            <p className="text-16-content" style={{ color: "#6E6E6E", opacity: "0.85" }}>
              Employees receive phishing emails, executives face impersonation attempts, and organizations are increasingly exposed to AI-generated social engineering attacks. Technical controls remain essential, but understanding human risk exposure is now equally critical.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ height: "100%" }}>
              {[
                {
                  title: "Human Error Focus",
                  desc: "Human Error Remains a Leading Cause of Security Incidents",
                  stat: "74%",
                  source: "Verizon DBIR"
                },
                {
                  title: "Phishing Vector",
                  desc: "Phishing Continues to Be a Common Initial Attack Vector",
                  stat: "90%",
                  source: "CISA Threat Report"
                },
                {
                  title: "BEC Threat",
                  desc: "Business Email Compromise Causes Billions in Annual Losses",
                  stat: "$2.9B",
                  source: "FBI Internet Crime Report"
                },
                {
                  title: "AI Exploitation",
                  desc: "AI Is Increasing the Scale of Social Engineering Attacks",
                  stat: "135%",
                  source: "Innvikta Threat Labs"
                }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="risk-stat-card"
                  style={{
                    background: "#FFFBF7",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid #FFEAD4"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "2rem", fontWeight: "600", color: "#F15A24", marginBottom: "0.5rem" }}>{stat.stat}</div>
                    <p style={{ fontWeight: "600", color: "#1F1F1F", fontSize: "0.95rem", lineHeight: "1.4", marginBottom: "1rem" }}>{stat.desc}</p>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "#6E6E6E", textTransform: "uppercase", fontWeight: "500", letterSpacing: "0.05em" }}>
                    Source: {stat.source}
                  </span>
                </div>
              ))}
              <style>{`
                .risk-stat-card {
                  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
                  box-shadow: 0 4px 12px rgba(31, 31, 31, 0.03);
                }
                .risk-stat-card:hover {
                  transform: translateY(-6px);
                  box-shadow: 0 16px 32px rgba(241, 90, 36, 0.08);
                  border-color: #F15A24 !important;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
