import React from "react";
import { coreCards } from "./constants";

export default function SolutionAccordion({ activeCoreCard, setActiveCoreCard, coreCardImages }) {
  return (
    <section id="risk-scoring" className="bg-white" style={{ position: "relative" }}>
      <div id="department-heatmaps" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="executive-reporting" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="pre-post-analysis" style={{ position: "absolute", top: "-80px" }}></div>
      
      <div className="container">
        <div className="animate mb-12">
          <span className="text-subheading">RISK INTELLIGENCE CAPABILITIES</span>
          <h2 className="text-52-heading">Turn Awareness Data into Actionable Risk Intelligence</h2>
          <div style={{ marginTop: "1rem", opacity: "0.7" }}>
            <p className="text-18-content">
              InSAT converts training, simulation, quiz, and behaviour signals into AI-assisted insights your teams can act on.
            </p>
          </div>
        </div>

        <div className="modern-simulations-grid" style={{ marginTop: "3.5rem" }}>
          {/* Left Accordion Column */}
          <div className="simulation-accordion-list animate from-left">
            {coreCards.map((vector, index) => {
              const active = activeCoreCard === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveCoreCard(index)}
                  className={`simulation-accordion-item ${active ? "active" : ""}`}
                >
                  <div className="sim-icon-container">
                    {vector.icon(active)}
                  </div>
                  <div className="sim-text-content">
                    <h3 className="sim-title">{vector.title}</h3>
                    <div 
                      className="sim-desc-wrapper" 
                      style={{ 
                        maxHeight: active ? "120px" : "0px",
                        opacity: active ? 1 : 0
                      }}
                    >
                      <p className="sim-desc">{vector.desc}</p>
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
                {coreCardImages.prev && (
                  <img 
                    key={coreCardImages.prev + "_prev"}
                    src={coreCardImages.prev} 
                    alt="Previous simulation screenshot"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    className="animate-image-fade-out"
                  />
                )}
                <img 
                  key={coreCardImages.current + "_current"}
                  src={coreCardImages.current} 
                  alt={activeCoreCard !== null ? coreCards[activeCoreCard].title : "Actionable Risk Intelligence"} 
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
