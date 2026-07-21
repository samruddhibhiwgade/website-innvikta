import React from "react";

export default function ColumnsSection() {
  return (
    <>
      <section className="bg-white">
        <div className="container">
          <div className="section-intro animate" style={{ textAlign: "center" }}>
            <h2 className="text-52-heading">Build Security Awareness Across Your Organization</h2>
          </div>

          {/* AI Adaptive Learning */}
          <div id="ai-adaptive-learning" className="two-col-grid" style={{ marginTop: "4rem" }}>
            <div className="two-col-content-block animate from-left">
              <h2 className="text-52-heading">AI Adaptive Learning</h2>
              <div style={{ marginTop: "1.5rem", opacity: "0.7" }}>
                <p className="text-18-content">
                  Personalize learning journeys based on user performance, risk indicators, and training
                  history.
                </p>
              </div>

              <a className="arrow-link" href="/solutions/insat">
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                      d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>Explore Adaptive Learning</span>
              </a>
            </div>
            <div className="two-col-visual-block bg-white animate from-right">
              <img alt="AI adaptive learning routes" loading="lazy" src="/insat/images/adaptive_learning.png" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>

          {/* Reporting & Human Risk Evidence */}
          <div id="human-risk-intelligence" className="two-col-grid reverse" style={{ marginTop: "6rem" }}>
            <div className="two-col-content-block animate from-right">
              <h2 className="text-52-heading">Reporting & Human Risk Evidence</h2>
              <div style={{ marginTop: "1.5rem", opacity: "0.7" }}>
                <p className="text-18-content">
                  Generate structured records of training, assessments, simulations, and participation for
                  internal reviews and audits.
                </p>
              </div>

              <a className="arrow-link" href="/solutions/insat">
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                      d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>View Reporting Features</span>
              </a>
            </div>
            <div className="two-col-visual-block aspect-628-517 bg-white animate from-left">
              <img alt="Monitor training and assessments" loading="lazy"
                src="/insat/images/humanriskevidence (2).png" style={{ objectFit: "contain" }} />
            </div>
          </div>

          {/* Gamified Engagement */}
          <div id="interactive-gamified-arcade" className="two-col-grid" style={{ marginTop: "6rem" }}>
            <div className="two-col-content-block animate from-left">
              <h2 className="text-52-heading">Gamified Engagement</h2>
              <div style={{ marginTop: "1.5rem", opacity: "0.7" }}>
                <p className="text-18-content">
                  Use quizzes, challenges, points, and interactive modules to improve participation and
                  recall.
                </p>
              </div>

              <a className="arrow-link" href="/solutions/insat">
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                      d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>Explore Gamified Training</span>
              </a>
            </div>
            <div className="two-col-visual-block aspect-628-517 bg-plum animate from-right">
              <img alt="Gamified engagement" loading="lazy" src="/images/home_arcade.png" style={{ objectFit: "contain" }} />
            </div>
          </div>

          {/* Continuous Reinforcement */}
          <div id="microlearning" className="two-col-grid reverse" style={{ marginTop: "6rem" }}>
            <div className="two-col-content-block animate from-right">
              <h2 className="text-52-heading">Continuous Reinforcement</h2>
              <div style={{ marginTop: "1.5rem", opacity: "0.7" }}>
                <p className="text-18-content">
                  Trigger bite-sized learning after risky actions, phishing clicks, campaigns, or policy
                  changes.
                </p>
              </div>

              <a className="arrow-link" href="/solutions/insat">
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                      d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>Explore InSAT Platform</span>
              </a>
            </div>
            <div className="two-col-visual-block aspect-628-517 bg-midnight animate from-left">
              <img alt="Continuous reinforcement" loading="lazy" src="/insat/images/continious_reinforcement.png" />
            </div>
          </div>
        </div>
      </section>

      {/* IT Integration Section */}
      <section className="bg-white" style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <div className="two-col-grid" style={{ alignItems: "center" }}>
            <div className="two-col-content-block animate from-left">
              <h2 className="text-52-heading">Integrate with Your IT & Security Stack</h2>
              <div style={{ marginTop: "1.5rem", opacity: "0.7" }}>
                <p className="text-18-content">
                  Ditch the manual admin work. InSAT auto-syncs with your identity providers, LMS, and
                  communication platforms to automate training management.
                </p>
              </div>
            </div>
            <div className="two-col-visual-block animate from-right" style={{ background: "none" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
                <div className="logo-card-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F8F9FA", borderRadius: "12px", padding: "1.5rem", height: "120px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #EAEAEA" }}>
                  <img src="/images/Google-Workspace-Logo.png" alt="Google Workspace" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div className="logo-card-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F8F9FA", borderRadius: "12px", padding: "1.5rem", height: "120px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #EAEAEA" }}>
                  <img src="/images/Okta-logo.png" alt="Okta" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div className="logo-card-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F8F9FA", borderRadius: "12px", padding: "1.5rem", height: "120px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #EAEAEA" }}>
                  <img src="/images/Microsoft-Logo.png" alt="Microsoft" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div className="logo-card-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F8F9FA", borderRadius: "12px", padding: "1.5rem", height: "120px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid #EAEAEA" }}>
                  <img src="/images/Slack-logo.png" alt="Slack" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything Needed list */}
      <section className="bg-white">
        <div className="container">
          <div className="flex flex-col gap-16">
            <div className="two-col-grid items-start">
              <div className="two-col-content-block max-w-[413px]">
                <h2 className="text-52-heading">Everything Needed to Build Everyday Secure Behaviour</h2>
              </div>

              <div className="faq-list-col flex flex-col gap-8 max-w-[652px]">
                <div className="info-row">
                  <div className="info-icon-box">
                    <img alt="AI Adaptive Learning icon" src="/insat/images/Products.svg" />
                  </div>
                  <div className="info-card-text">
                    <h3 className="text-22-heading">AI Adaptive Learning</h3>
                    <p className="info-desc">
                      InSAT automatically adapts learning paths to each user&apos;s specific department,
                      role, and historical risk profile, ensuring training remains highly relevant.
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-box">
                    <img alt="Gamified Awareness icon" src="/insat/images/Products-1.svg" />
                  </div>
                  <div className="info-card-text">
                    <h3 className="text-22-heading">Gamified Awareness</h3>
                    <p className="info-desc">
                      Boost engagement with interactive quizzes, simulated challenges, leaderboards,
                      and achievements that make security habits second nature.
                    </p>
                  </div>
                </div>

                <div className="info-row border-b-0 pb-0">
                  <div className="info-icon-box">
                    <img alt="Always-On Reporting & Evidence icon" src="/insat/images/Products-2.svg" />
                  </div>
                  <div className="info-card-text">
                    <h3 className="text-22-heading">Always-On Reporting & Evidence</h3>
                    <p className="info-desc">
                      Generate audit-ready records and human risk reports to prove compliance with key
                      regulations like ISO 27001, SOC 2, and GDPR.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
