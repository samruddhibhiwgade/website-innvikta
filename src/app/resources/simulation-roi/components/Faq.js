import React from "react";
import { faqs } from "./constants";

export default function FAQSection({ openFaqIndex, setOpenFaqIndex }) {
  return (
    <div style={{ backgroundColor: "#FFF6E9", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container faq-grid">
        <div className="faq-title-col">
          <span className="inline-block px-3 py-1.5 mb-4 text-xs font-bold tracking-widest text-[#f15a24] bg-[#f15a24]/10 rounded-full uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="text-40-heading">Security Awareness ROI FAQ</h2>
          <p className="text-slate-500 mt-3">Authoritative insights and direct answers concerning workforce training returns.</p>
        </div>

        <div className="faq-list-col">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button type="button" className="faq-trigger w-full" aria-expanded={isOpen} onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                  <span className="faq-question">{faq.q}</span>
                  <div className="faq-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                      <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                    </svg>
                  </div>
                </button>
                <div className="faq-panel" style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, transition: "all 0.3s ease", overflow: "hidden" }}>
                  <div className="faq-panel-inner">
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
