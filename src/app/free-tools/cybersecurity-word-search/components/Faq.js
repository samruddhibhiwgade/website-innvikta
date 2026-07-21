import React from "react";

export default function FAQSection({ activeFaq, setActiveFaq }) {
  return (
    <section className="bg-[#FFFAF6] border-t border-border py-16">
      <div className="container faq-grid">
        <div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center">
          <h2 className="text-40-heading text-center">We’re here to help</h2>
          <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.25rem" }}>
            <div className="arrow-circle">
              <span className="arrow-circle-bg"></span>
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
              </svg>
            </div>
            <span>Learn more</span>
          </a>
        </div>

        <div className="faq-list-col animate from-right">
          {[
            { q: "How does the Cybersecurity Word Search game work?", a: "Find the hidden words list on the right side of the screen inside the layout matrix. Drag horizontally, vertically, or diagonally in both forward and backward directions to claim words!" },
            { q: "Can I play this game on mobile phones?", a: "Yes, the word search layout features touch gestures so you can drag and play smoothly on mobile browsers and tablets." },
            { q: "How does this tool help organization security awareness?", a: "Word searches leverage active cognitive recollection, making security terms like MFA, ransomware, and phishing immediately familiar, building foundational security awareness." }
          ].map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`}>
              <button type="button" className="faq-trigger" aria-expanded={activeFaq === idx} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span className="faq-question">{faq.q}</span>
                <div className="faq-icon-wrapper">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                    <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                  </svg>
                </div>
              </button>
              <div className="faq-panel">
                <div className="faq-panel-inner">
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
