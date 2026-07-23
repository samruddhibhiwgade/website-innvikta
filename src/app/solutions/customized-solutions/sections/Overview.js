import React from "react";
import Link from "next/link";
import { customizedCards } from "./constants";

export default function OverviewSection() {
  return (
    <section className="bg-white stats-section" style={{ paddingBottom: "5rem" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 stats-content-block animate from-left">
            <span className="text-subheading">RISK REALITY</span>
            <h2 className="text-52-heading" style={{ lineHeight: "1.2" }}>
              Because Every <br/>
              Organization Has Its <br/>
              Own <span style={{ color: "#f15a24" }}>Risk Reality.</span>
            </h2>

            <div className="stats-subheading">
              <p className="text-18-content" style={{ opacity: "0.8" }}>
                Your organization has its own policies, processes, and risks. Innvikta adapts awareness programs around them - so learning feels relevant, practical, and measurable.
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn-primary btn-cta" href="/book-demo">
                <span className="hover-sweep"></span>
                <span>Book a Demo</span>
                <div className="arrow-wrapper">
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Customized Cards */}
          <div className="lg:col-span-7 animate from-right" style={{ overflow: "visible" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16" style={{ paddingTop: "2.5rem", overflow: "visible" }}>
              {customizedCards.map((card, idx) => (
                <div key={idx} className="customized-stats-card" style={{ overflow: "visible" }}>
                  {/* Floating circular icon */}
                  <div className="card-icon-container">
                    {card.icon}
                  </div>

                  <h3 className="card-title-custom">
                    {card.title}
                  </h3>
                  <div className="card-divider"></div>
                  <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.5", marginBottom: "0.5rem", textAlign: "left", opacity: 0.9 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
