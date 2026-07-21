"use client";
import React, { useState } from "react";

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="bg-grey-5">
      <div className="container faq-grid">
        <div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center">
          <h2 className="text-40-heading text-center">We’re here to help</h2>
          <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer"
            style={{ marginTop: "1.25rem" }}>
            <div className="arrow-circle">
              <span className="arrow-circle-bg"></span>
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
              </svg>
            </div>
            <span>Learn more</span>
          </a>
        </div>

        <div className="faq-list-col animate from-right">
          
          <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
            <button type="button" className="faq-trigger" aria-expanded={activeFaq === 0} onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
              <span className="faq-question">What types of phishing simulations can InSAT run?</span>
              <div className="faq-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                    stroke="var(--color-grey-30)" />
                  <path
                    d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                    stroke="var(--color-grey-30)" />
                </svg>
              </div>
            </button>
            <div className="faq-panel">
              <div className="faq-panel-inner">
                <div className="faq-answer">
                  <p>InSAT can run realistic simulations of spear phishing, credential harvesting,
                    malware attachments, and social engineering scenarios tailored to different
                    departments.</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
            <button type="button" className="faq-trigger" aria-expanded={activeFaq === 1} onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
              <span className="faq-question">Can training be assigned role-wise?</span>
              <div className="faq-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                    stroke="var(--color-grey-30)" />
                  <path
                    d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                    stroke="var(--color-grey-30)" />
                </svg>
              </div>
            </button>
            <div className="faq-panel">
              <div className="faq-panel-inner">
                <div className="faq-answer">
                  <p>Yes, you can automatically assign specific training paths to high-risk roles like
                    finance, HR, executives, and developers to address their unique threat
                    landscapes.</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
            <button type="button" className="faq-trigger" aria-expanded={activeFaq === 2} onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
              <span className="faq-question">Does InSAT provide audit-ready compliance evidence?</span>
              <div className="faq-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                    stroke="var(--color-grey-30)" />
                  <path
                    d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                    stroke="var(--color-grey-30)" />
                </svg>
              </div>
            </button>
            <div className="faq-panel">
              <div className="faq-panel-inner">
                <div className="faq-answer">
                  <p>Absolutely. InSAT compiles comprehensive, audit-ready compliance records and
                    human risk telemetry for regulatory frameworks including SOC 2, ISO 27001, and
                    GDPR.</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
            <button type="button" className="faq-trigger" aria-expanded={activeFaq === 3} onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
              <span className="faq-question">Can learning paths adapt based on user risk?</span>
              <div className="faq-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                    stroke="var(--color-grey-30)" />
                  <path
                    d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                    stroke="var(--color-grey-30)" />
                </svg>
              </div>
            </button>
            <div className="faq-panel">
              <div className="faq-panel-inner">
                <div className="faq-answer">
                  <p>Yes, our platform analyzes click rates and quiz performances to automatically
                    enroll high-risk employees in targeted reinforcement modules.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
