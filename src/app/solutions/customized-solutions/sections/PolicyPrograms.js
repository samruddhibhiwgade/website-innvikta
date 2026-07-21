import React from "react";
import { policyCards } from "./constants";

export default function PolicyProgramsSection({ activePolicy, setActivePolicy, displayImages }) {
  return (
    <section className="bg-white" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        <div className="section-intro animate" style={{ marginBottom: "3.5rem" }}>
          <span className="text-subheading">POLICY-ALIGNED PROGRAMS</span>
          <h2 className="text-52-heading">Turn Policies Into Actionable Learning</h2>
          <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", maxWidth: "700px" }}>
            Convert internal policies, SOPs, and compliance requirements into short modules, scenarios, quizzes, and reinforcement campaigns.
          </p>
        </div>

        <div className="modern-simulations-grid">
          {/* Left Accordion Column */}
          <div className="simulation-accordion-list animate from-left">
            {policyCards.map((card, index) => {
              const active = activePolicy === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActivePolicy(index)}
                  className={`simulation-accordion-item ${active ? "active" : ""}`}
                >
                  <div className="sim-icon-container">
                    {card.icon(active)}
                  </div>
                  <div className="sim-text-content">
                    <h3 className="sim-title">{card.title}</h3>
                    <div 
                      className="sim-desc-wrapper" 
                      style={{ 
                        maxHeight: active ? "120px" : "0px",
                        opacity: active ? 1 : 0
                      }}
                    >
                      <p className="sim-desc">{card.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Bezel Frame Column */}
          <div className="animate from-right">
            <div className="platform-bezel-frame">
              <div className="frame-inner" style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                {displayImages.prev && (
                  <img 
                    key={displayImages.prev + "_prev"}
                    src={displayImages.prev} 
                    alt="Previous simulation screenshot"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    className="animate-image-fade-out"
                  />
                )}
                <img 
                  key={displayImages.current + "_current"}
                  src={displayImages.current} 
                  alt={activePolicy !== null ? policyCards[activePolicy].title : "Policy-Aligned Programs"} 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  className="animate-image-fade-in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
