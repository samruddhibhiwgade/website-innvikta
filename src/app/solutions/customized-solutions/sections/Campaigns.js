import React from "react";
import Link from "next/link";
import { cultureCampaignCards } from "./constants";

export default function CampaignsSection() {
  return (
    <section id="culture-benchmark-studies" className="bg-white campaigns-section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
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

          {/* Right Column: Bento Grid of 5 Cards */}
          <div className="lg:col-span-7 animate from-right">
            <div className="campaigns-bento-grid">
              {cultureCampaignCards.map((card, idx) => (
                <div
                  key={idx}
                  className="campaigns-bento-card"
                  style={{ gridColumn: card.span }}
                >
                  <div className="cbc-icon">
                    {card.icon}
                  </div>
                  <h3 className="cbc-title">{card.title}</h3>
                  <p className="cbc-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
