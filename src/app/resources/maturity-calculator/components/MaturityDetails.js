import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function MaturityDetails() {
  const maturityStages = [
    {
      level: "Level 1",
      name: "Reactive (Ad-Hoc)",
      status: "Compliance Focused",
      desc: "Training is treated as a periodic compliance checkbox. Organizations run basic once-a-year sessions with generic modules. Suspicious message reporting is non-existent or completely manual.",
      risk: "High Risk of Breach"
    },
    {
      level: "Level 2",
      name: "Baseline (Formal)",
      status: "Awareness Focused",
      desc: "Training is formal and scheduled. Regular simulated email phishing campaigns are executed, and failure metrics are tracked. The organization has basic security guidelines but lacks personalization.",
      risk: "Moderate Risk"
    },
    {
      level: "Level 3",
      name: "Proactive (Managed)",
      status: "Behavioral Focused",
      desc: "Awareness programs are customized by department and job role. Security simulation templates extend beyond email to SMS and voice. One-click phishing alert buttons enable instant user reporting.",
      risk: "Low Risk"
    },
    {
      level: "Level 4",
      name: "Optimized (HRM)",
      status: "Risk Management Focused",
      desc: "Human Risk Management (HRM) uses dynamic behavioral telemetry to profile every employee. Real-time feedback loops instantly reinforce safe actions. Security culture is measured and continuous.",
      risk: "Resilient Posture"
    },
  ];

  const benefits = [
    {
      title: "Evaluate Employee Cybersecurity Posture",
      desc: "Understand employee susceptibility to social engineering attacks such as credential harvesting, spear-phishing, and vishing."
    },
    {
      title: "Optimize Security Awareness ROI",
      desc: "Pinpoint exact focus areas (e.g. finance, developers, sales) to direct security awareness training resources where they are needed most."
    },
    {
      title: "Strengthen Regulatory Compliance",
      desc: "Satisfy key standard requirements including ISO 27001, SOC 2, HIPAA, and GDPR by validating regular human risk audits."
    },
    {
      title: "Reduce Incident Response Triaging Time",
      desc: "Identify how effectively employees utilize phishing reporting plugins and sandbox integrations to deflect threat vectors in real-time."
    }
  ];

  return (
    <>
      {/* Section 1: The 4 Stages of Security Awareness Maturity */}
      <section className="bg-grey-5" style={{ padding: "6rem 0", borderTop: "1px solid var(--color-grey)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div className="max-w-3xl mx-auto mb-16" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600", marginBottom: "0.5rem", display: "block", textAlign: "center" }}>
              THE MATURITY MODEL
            </span>
            <h2 className="text-52-heading" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: "1.2", textAlign: "center", width: "100%" }}>
              The Four Stages of <span style={{ color: "#F15A24" }}>Security Awareness</span> Maturity
            </h2>
            <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", textAlign: "center" }}>
              Where does your organization stand? Identify your current level and discover the path to a resilient human firewall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-100" style={{ width: "100%" }}>
            {maturityStages.map((stage, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-grey transition-all duration-300 hover:shadow-sm"
                style={{ padding: "2.25rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "#475569", backgroundColor: "#F1F5F9", padding: "0.25rem 0.6rem", borderRadius: "4px" }}>
                      {stage.level}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: "500" }}>
                      {stage.status}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-night)", marginBottom: "1rem" }}>
                    {stage.name}
                  </h3>
                  
                  <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    {stage.desc}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "1rem", marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#64748B" }}>Risk Status:</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1F2937" }}>{stage.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Quantifying Your Security Awareness Program Matters */}
      <section className="bg-white" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5 stats-content-block animate from-left">
              <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600", marginBottom: "0.5rem", display: "block" }}>
                HUMAN RISK MANAGEMENT
              </span>
              <h2 className="text-52-heading" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: "1.2", marginBottom: "1.5rem" }}>
                Why Auditing Your <span style={{ color: "#F15A24" }}>Security Awareness</span> Program is Crucial
              </h2>
              <p className="text-18-content" style={{ opacity: "0.8", marginBottom: "2rem" }}>
                Cyber threats evolve daily, yet most organizations still rely on annual compliance modules. A maturity audit helps align behavior changes with modern threat landscapes.
              </p>
            </div>

            {/* Right Column: Benefits Grid */}
            <div className="lg:col-span-7 animate from-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ color: "#F15A24", fontSize: "1.5rem", marginTop: "2px", flexShrink: 0 }}>
                      <FiCheckCircle />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: "700", fontSize: "1.05rem", color: "var(--color-night)", marginBottom: "0.35rem" }}>
                        {benefit.title}
                      </h4>
                      <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: "1.5" }}>
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
