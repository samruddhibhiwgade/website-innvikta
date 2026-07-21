import React from "react";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
      <div className="hero-outer-wrapper">
        <div className="container">
          <div className="hero-grid-container">
            <div className="hero-content">
              <span className="text-subheading">Test Human Risk Before Attackers Do</span>
              <h1 className="text-96-heading hero-title-custom">Identify and Reduce<br />Human Risk Before<br />It Becomes a Breach</h1>

              <div className="hero-text-wrapper">
                <p className="text-20-content hero-paragraph">
                  Run AI-enabled attack simulations that uncover risky behaviour and trigger instant learning in real time.
                </p>
              </div>

              <div className="hero-actions-row">
                <a className="btn btn-primary btn-cta" href="/book-demo">
                  <span className="hover-sweep"></span>
                  <span>Start Free</span>
                  <div className="arrow-wrapper">
                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                    </svg>
                  </div>
                </a>
                <a className="btn btn-secondary" href="/book-demo">
                  <span>Book a demo</span>
                </a>
              </div>
            </div>

            <div className="hero-image-right">
              <img src="/images/solutions/phishingsimulation_images/phishing_simulationhero.png" alt="Phishing Simulation Hero" className="hero-sim-img" />
            </div>
          </div>
        </div>

        <div className="container container-hero-visual hidden md:block">
          <div className="hero-visual">
            <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
