import React from "react";
import Link from "next/link";
import { cultureCampaignCards } from "./constants";

export default function CampaignsSection() {
  return (
    <section id="culture-benchmark-studies" className="bg-white" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 animate from-left">
            <span className="text-subheading">CULTURE & BEHAVIOUR CAMPAIGNS</span>
            <h2 className="text-52-heading" style={{ lineHeight: "1.2", marginBottom: "1.5rem" }}>
              Keep Awareness <br/>
              Visible <span className="text-orange">All Year</span>
            </h2>
            <p className="text-18-content" style={{ opacity: "0.8", color: "#475569", lineHeight: "1.6" }}>
              Run themed campaigns using nudges, posters, quizzes, games, simulations, and microlearning - aligned to your internal communication style.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn-primary btn-cta" href="/book-demo">
                <span className="hover-sweep"></span>
                <span>Book a demo</span>
                <div className="arrow-wrapper">
                  <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Bento Grid of 5 Cards */}
          <div className="lg:col-span-7 animate from-right">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", width: "100%" }}>
              {cultureCampaignCards.map((card, idx) => (
                <div
                  key={idx}
                  className="stats-card transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                  style={{
                    background: "#FFFBF7",
                    border: "1px solid #FFEAD4",
                    borderRadius: "14px",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    gridColumn: card.span,
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      background: "#FFEFEA",
                      display: "inline-flex",
                      padding: "0.45rem",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.25rem"
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    style={{
                      marginTop: "0px",
                      marginBottom: "0.25rem",
                      fontSize: "1.05rem",
                      fontWeight: "600",
                      color: "#1E293B",
                      lineHeight: "1.2"
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#334155",
                      marginTop: "0px",
                      marginBottom: "0px",
                      lineHeight: "1.4"
                    }}
                  >
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
