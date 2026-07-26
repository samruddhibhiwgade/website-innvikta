import Link from "next/link";
import { faqData } from "./constants";

export default function FAQSection({ activeFaq, setActiveFaq }) {
  return (
    <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
      <div className="container faq-grid">
        <div className="faq-title-col animate from-left">
          <h2 className="text-40-heading">Frequently Asked Questions</h2>
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
              <div
                className="faq-panel"
                style={{
                  maxHeight: activeFaq === index ? "120px" : "0px",
                  opacity: activeFaq === index ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.4s ease",
                  overflow: "hidden"
                }}
              >
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
