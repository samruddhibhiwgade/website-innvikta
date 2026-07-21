import React from "react";
import { FAQS } from "./constants";

export default function FAQSection({ openFaqIndex, setOpenFaqIndex }) {
  return (
    <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
      <div className="container faq-grid">
        <div className="faq-title-col text-left">
          <h2 className="text-40-heading">Frequently Asked Questions</h2>
          <a className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
            <div className="arrow-circle">
              <span className="arrow-circle-bg"></span>
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
              </svg>
            </div>
            <span>Still have questions? Contact us</span>
          </a>
        </div>

        <div className="faq-list-col text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{faq.question}</span>
                  <div className="faq-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                      <path
                        className="vertical-line"
                        d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                        stroke="var(--color-grey-30)" />
                    </svg>
                  </div>
                </button>
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
