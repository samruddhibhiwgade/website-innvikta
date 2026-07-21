import React from "react";
import { FiClock, FiUserX, FiGlobe, FiKey } from "react-icons/fi";

export default function PasswordPillars() {
  return (
    <section className="section bg-white border-t border-border" style={{ padding: "8rem 0" }}>
      <div className="container">
        
        <div className="animate" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="text-subheading" style={{ display: "block", marginBottom: "1rem", textAlign: "center" }}>SECURITY ESSENTIALS</span>
          <h2 className="text-52-heading text-dark" style={{ textAlign: "center", display: "block", width: "100%", margin: "0 auto" }}>What Makes a Password Strong?</h2>
        </div>

        <div className="animate" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="text-18-content text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ textAlign: "center", margin: "0 auto", padding: "2rem 0" }}>
            Computer algorithms can guess simple passwords in milliseconds. Understanding these basic security pillars helps individuals defend their digital identities effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate px-6 sm:px-8">
          
          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiClock className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Length Matters</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Longer passwords dramatically increase entropy, making standard brute-force cracking tools mathematically impractical.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiUserX className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Uniqueness Matters</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Never reuse credentials. If one service gets breached, hackers immediately deploy stuffing attacks on other popular portals.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiGlobe className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Randomness Matters</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Avoid familiar names, dates, or sequences. Machine learning dictionaries guess predictable strings almost immediately.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiKey className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Managers Help</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Don&apos;t try to memorize dozens of random passwords. A verified manager does it for you securely under one master key.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
