"use client";

import React, { useState } from "react";

const FaqAccordion = ({ faqs }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      {faqs.map((faq, index) => {
        const isActive = activeFaq === index;
        return (
          <div key={index} className={`faq-item ${isActive ? "active" : ""}`}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isActive}
              onClick={() => toggleFaq(index)}
            >
              <span className="faq-question">
                {faq.question}
              </span>
              <div className="faq-icon-wrapper" style={{ background: "none" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z"
                    stroke="var(--color-grey-30)"
                  />
                  <path
                    d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                    stroke="var(--color-grey-30)"
                  />
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
    </>
  );
};

export default FaqAccordion;
