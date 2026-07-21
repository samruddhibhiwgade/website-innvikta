import React from "react";

export default function ImpactApproach() {
  return (
    <section id="impact-approach" className="impact-section impact-animate" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "4.5rem" }}>
          <div className="lg:col-span-6" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>IMPACT & APPROACH</span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              Built for Relevance, Engagement, and Measurable <span style={{ color: "#F15A24" }}>Impact</span>
            </h2>
          </div>
          <div className="lg:col-span-6 align-with-h2" style={{ textAlign: "left" }}>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
              Innvikta brings together awareness modules, simulations, gamified learning, compliance journeys, AI powered customization, and reporting — in one unified platform — so organizations can move beyond completion and build measurable behaviour change.
            </p>
          </div>
        </div>

        {/* 4 Cards: Seamless Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Relevant by Design",
              desc: "Aligned to roles, departments, industries, policies, and risk priorities.",
              color: "#F15A24",
            },
            {
              title: "Engaging by Experience",
              desc: "Story-led modules, simulations, and gamified journeys that employees actually interact with.",
              color: "#F15A24",
            },
            {
              title: "Measurable by Default",
              desc: "Dashboards, reports, scores, and evidence records that help teams track progress.",
              color: "#F15A24",
            },
            {
              title: "Flexible by Nature",
              desc: "Adaptable to your policies, procedures, compliance needs, and communication style.",
              color: "#F15A24",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="seamless-hover-card"
              style={{
                background: "transparent",
                borderLeft: `3px solid ${item.color}`,
                padding: "0.5rem 0 0.5rem 1.75rem",
                textAlign: "left",
                transition: "all 0.3s ease"
              }}
            >
              <h3 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#6B7280", lineHeight: "1.6", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .seamless-hover-card:hover {
          transform: translateX(6px);
          border-left-width: 6px !important;
        }
        #our-story, #our-mission, #leadership-team, #impact-approach {
          scroll-margin-top: 120px;
        }
      `}</style>
    </section>
  );
}
