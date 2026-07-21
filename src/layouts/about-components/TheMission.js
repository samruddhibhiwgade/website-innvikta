import React from "react";

export default function TheMission() {
  return (
    <section id="our-mission" className="mission-section mission-animate" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "4rem" }}>
          <div className="lg:col-span-6" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>THE MISSION</span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              Making People the Strongest Layer of <span style={{ color: "#F15A24" }}>Defence</span>
            </h2>
          </div>
          <div className="lg:col-span-6 align-with-h2" style={{ textAlign: "left" }}>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
              Our mission is to help organizations reduce human risk by making secure behaviour easier to learn, practice, reinforce, and measure.
            </p>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
              We believe employees are not the weakest link. With the right awareness journeys, simulations, nudges, and insights, they become an active defence layer.
            </p>
          </div>
        </div>

        {/* Premium 2x2 Grid Quadrant */}
        <div className="grid grid-cols-1 md:grid-cols-2 quad-grid" style={{ borderTop: "1px solid #E7E7E7", paddingTop: "1.5rem" }}>
          {[
            { title: "Learn", desc: "Relevant awareness modules built for comprehension." },
            { title: "Practice", desc: "Real-world simulations across email, SMS, QR, and voice." },
            { title: "Reinforce", desc: "Microlearning and real-time nudges to build habits." },
            { title: "Measure", desc: "Human risk insights and board-ready telemetry dashboards." }
          ].map((card, i) => (
            <div
              key={i}
              className={`quad-cell quad-cell-${i}`}
            >
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#1F1F1F", margin: "0 0 0.5rem 0" }}>
                  {card.title}
                </h4>
                <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
