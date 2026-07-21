"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
      <div className="hero-outer-wrapper">
        <div className="container">
          <div className="hero-grid-container">
            <div className="hero-content">
              <span className="text-subheading">AI-Powered Security Awareness Platform</span>
              <h1 className="text-96-heading hero-title-custom">
                Security Awareness<br />Training Built for<br />Real Behaviour Change
              </h1>

              <div className="hero-text-wrapper">
                <p className="text-20-content hero-paragraph">
                  InSAT drives behavior change with AI learning journeys, multi attack simulations,
                  gamification and microlearning all from one unified platform.
                </p>
              </div>

              <div className="hero-actions-row">
                <a className="btn btn-primary btn-cta" href="/book-demo">
                  <span className="hover-sweep"></span>
                  <span>Start Free</span>
                  <div className="arrow-wrapper">
                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z"
                        fill="currentColor" />
                    </svg>
                  </div>
                </a>
                <a className="btn btn-secondary" href="/book-demo">
                  <span>Explore Platform</span>
                </a>
              </div>
            </div>

            <div className="hero-image-right animate from-right w-full block md:flex justify-center md:justify-end mt-8 md:mt-0 px-4 md:px-0">
              <img 
                src="/insat/images/Insat_heroimage.png" 
                alt="InSAT Platform Visual" 
                className="hero-sim-img hero-sim-img-custom mx-auto md:mx-0 shrink-0 md:!w-full md:!max-w-none md:ml-0 md:scale-[1.50] md:translate-x-[50px] origin-center md:origin-right object-contain" 
              />
            </div>
          </div>
        </div>
 
        <div className="container container-hero-visual hidden md:block">
          <div className="hero-visual" style={{ marginTop: "3rem" }}>
            <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
