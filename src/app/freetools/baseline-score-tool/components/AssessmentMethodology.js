import React from "react";

export default function AssessmentMethodology() {
  return (
    <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>METHODOLOGY</span>
          <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
            Built Around the Same Signals Attackers Use
          </h2>
          <p className="text-18-content" style={{ color: "#6E6E6E", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", textAlign: "center" }}>
            Before launching an attack, threat actors conduct reconnaissance. They identify exposed identities, email weaknesses, brand impersonation opportunities, and publicly available organizational information. This assessment evaluates those same exposure indicators to help security teams understand their human attack surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              title: "Email Security Posture",
              weight: "30%",
              desc: "SPF, DKIM, DMARC, email authentication, and spoofing protection."
            },
            {
              title: "Identity Exposure",
              weight: "25%",
              desc: "Publicly discoverable employee identities and contact information."
            },
            {
              title: "Employee Exposure",
              weight: "20%",
              desc: "Workforce visibility and publicly available organizational information."
            },
            {
              title: "Brand Impersonation Risk",
              weight: "15%",
              desc: "Spoofing, look-alike domains, and impersonation opportunities."
            },
            {
              title: "Security Maturity",
              weight: "10%",
              desc: "Visible governance, reporting processes, and security readiness."
            }
          ].map((cat, i) => (
            <div
              key={i}
              className="risk-stat-card"
              style={{
                background: "#FFFBF7",
                border: "1px solid #FFEAD4",
                borderRadius: "12px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6E6E6E" }}>0{i + 1}</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: "600", color: "#F15A24" }}>{cat.weight}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1F1F1F", marginBottom: "0.5rem" }}>{cat.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6E6E6E", lineHeight: "1.5" }}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
