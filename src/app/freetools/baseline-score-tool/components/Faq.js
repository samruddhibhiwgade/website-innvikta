import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { faqData } from "./constants";

export default function FAQSection({ activeFaq, setActiveFaq }) {
  const leftFaqs = faqData.slice(0, 6);
  const rightFaqs = faqData.slice(6, 11);

  const renderFaqItem = (item, index, offset = 0, isLastInCol = false) => {
    const globalIndex = index + offset;
    return (
      <div 
        className={`faq-item ${activeFaq === globalIndex ? 'active' : ''}`} 
        key={globalIndex}
        style={isLastInCol ? { borderBottom: "1px solid var(--color-forest-15)" } : {}}
      >
        <button type="button" className="faq-trigger" aria-expanded={activeFaq === globalIndex} onClick={() => setActiveFaq(activeFaq === globalIndex ? null : globalIndex)}>
          <span className="faq-question">{item.q}</span>
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
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container max-w-[1200px] mx-auto px-4 md:px-6">
        {/* FAQ Text at the Top */}
        <div className="animate from-left flex flex-col justify-center items-center text-center w-full" style={{ marginBottom: "4rem" }}>
          <h2 className="text-40-heading text-center">Frequently Asked Questions</h2>
          <Link className="arrow-link" href="/book-demo" style={{ marginTop: "1.25rem" }}>
            <div className="arrow-circle">
              <span className="arrow-circle-bg"></span>
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
              </svg>
            </div>
            <span>Still have questions? Contact us</span>
          </Link>
        </div>

        {/* Two Equal Sections (Columns) of the FAQ */}
        <div className="animate from-right w-full text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 w-full">
            {Array.from({ length: Math.max(leftFaqs.length, rightFaqs.length) }).map((_, rowIndex) => {
              const leftItem = leftFaqs[rowIndex];
              const rightItem = rightFaqs[rowIndex];
              return (
                <React.Fragment key={rowIndex}>
                  {leftItem ? (
                    renderFaqItem(leftItem, rowIndex, 0, rowIndex === leftFaqs.length - 1)
                  ) : (
                    <div className="hidden md:block" />
                  )}
                  {rightItem ? (
                    renderFaqItem(rightItem, rowIndex, 6, rowIndex === rightFaqs.length - 1)
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
