import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { faqData } from "./constants";

export default function FAQSection({ activeFaq, setActiveFaq }) {
  return (
    <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
      <div className="container faq-grid">
        <div className="faq-title-col animate from-left">
          <h2 className="text-40-heading">Frequently Asked Questions</h2>
          <Link href="/book-demo" style={{ marginTop: "1.25rem" }} className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">
            Book a Demo <FiArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="faq-list-col animate from-right">
          {faqData.map((faq, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={activeFaq === index}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <span className="faq-question">{faq.question}</span>
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
                    <p>{faq.answer}</p>
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
