import React from "react";
import { FiGlobe, FiArrowRight } from "react-icons/fi";

export default function HeroSection({
  domain,
  setDomain,
  selector,
  setSelector,
  loading,
  handleScan
}) {
  return (
    <section className="hero-section">
      <div className="hero-outer-wrapper">
        
        {/* Background SVG Decors */}
        <div className="hero-bg-decor" aria-hidden="true">
          <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
            <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
            <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
            <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
            <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
            <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
            <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
            <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
            <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
            <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
            <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
            <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
            <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
            <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
            <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
            <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
            <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
            <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
            <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
            <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
            <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
            <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
            <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
            <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
            <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
            <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
            <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
            <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
            <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
            <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
            <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
            <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
            <circle cx="78" cy="198" r="5" fill="#FF7A00" />
            <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
            <circle cx="158" cy="308" r="4" fill="#FF7A00" />
            <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
            <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
            <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
            <circle cx="268" cy="338" r="4" fill="#FF7A00" />
            <circle cx="188" cy="238" r="4" fill="#FF7A00" />
            <circle cx="398" cy="78" r="5" fill="#FF7A00" />
            <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
            <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
            <circle cx="488" cy="128" r="4" fill="#FF7A00" />
            <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
            <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
            <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
            <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
            <circle cx="648" cy="110" r="4" fill="#FF7A00" />
            <circle cx="638" cy="278" r="4" fill="#FF7A00" />
            <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>

          <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
            <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
            <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
            <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
            <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
            <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
            <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
          </svg>
        </div>

        {/* Backdrop Gradients */}
        <div className="hero-backdrop-wrapper">
          <div className="backdrop-shape shape-1">
            <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
              <defs>
                <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                  <stop offset="0.31" stopColor="#FF7A00" />
                  <stop offset="0.59" stopColor="#F59E0B" />
                  <stop offset="0.78" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="backdrop-shape shape-2">
            <div className="shape-2-inner-1">
              <svg width="100%" height="100%" viewBox="0 0 537 517" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M243.007 443.747L0.726096 516.282L295.51 69.4185L536.066 0.564209L243.007 443.747Z" fill="url(#paint0_linear_hero_2)" />
                <defs>
                  <linearGradient id="paint0_linear_hero_2" x1="626.513" y1="479.564" x2="320.001" y2="-98.1139" gradientUnits="userSpaceOnUse">
                    <stop offset="0.22" stopColor="#FF7A00" />
                    <stop offset="0.55" stopColor="#F59E0B" />
                    <stop offset="0.89" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="shape-2-inner-2">
              <svg width="100%" height="100%" viewBox="0 0 426 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M241.39 507.775L0.180044 612.19L185.387 100.986L425.875 0.00805664L241.39 507.775Z" fill="url(#paint0_linear_hero_3)" />
                <defs>
                  <linearGradient id="paint0_linear_hero_3" x1="426.129" y1="607.122" x2="-243.854" y2="-82.0361" gradientUnits="userSpaceOnUse">
                    <stop offset="0.22" stopColor="#FF7A00" />
                    <stop offset="0.55" stopColor="#F59E0B" />
                    <stop offset="0.89" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="shape-2-inner-3">
              <svg width="100%" height="100%" viewBox="0 0 313 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M259.325 543.891L0.873635 683.366L54.1947 136.437L312.926 0.0959473L259.325 543.891Z" fill="url(#paint0_linear_hero_4)" />
                <defs>
                  <linearGradient id="paint0_linear_hero_4" x1="541.623" y1="465.932" x2="-672.11" y2="-514.628" gradientUnits="userSpaceOnUse">
                    <stop offset="0.22" stopColor="#FF7A00" />
                    <stop offset="0.55" stopColor="#F59E0B" />
                    <stop offset="0.89" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="shape-2-inner-4">
              <svg width="100%" height="100%" viewBox="0 0 272 715" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M271.797 551.346L36.791 714.998L0.988926 160.822L236.664 0.241187L271.797 551.346Z" fill="#FF7A00" />
              </svg>
            </div>
          </div>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
            
            <div className="hero-content" style={{ maxWidth: "100%", textAlign: "center", margin: "0 auto", paddingBottom: "2.5rem", paddingTop: "4rem" }}>
              <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto" }}>Free Cybersecurity Utility</span>
              <h1 className="text-96-heading" style={{ fontSize: "clamp(1.85rem, 5vw, 4.5rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center" }}>
                <span className="text-primary">Domain Security</span> Analyzer
              </h1>
              <p className="text-20-content hero-paragraph" style={{ marginBottom: "2.5rem", marginLeft: "auto", marginRight: "auto", maxWidth: "720px", textAlign: "center" }}>
                Verify your SPF, DKIM, and DMARC configurations instantly to identify security vulnerabilities and block spoofing threats.
              </p>

              {/* Integrated Scanner Form */}
              <div className="scanner-form-container" style={{
                backgroundColor: "#ffffff",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)",
                maxWidth: "840px",
                margin: "0 auto",
                textAlign: "left"
              }}>
                <form onSubmit={handleScan} className="scanner-form">
                  
                  <div className="scanner-form-group-domain">
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
                      Domain Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", top: "50%", left: "1rem", transform: "translateY(-50%)", color: "#94A3B8", display: "flex", alignItems: "center" }}>
                        <FiGlobe style={{ fontSize: "1.1rem" }} />
                      </div>
                      <input
                        type="text"
                        required
                        className="scanner-input"
                        placeholder="e.g. microsoft.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        style={{
                          width: "100%",
                          height: "50px",
                          padding: "0 1rem 0 2.5rem",
                          border: "1px solid #CBD5E1",
                          borderRadius: "10px",
                          fontSize: "0.95rem",
                          color: "#0F172A",
                          fontWeight: 500,
                          backgroundColor: "#F8FAFC",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  <div className="scanner-form-group-selector">
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.5rem" }}>
                      DKIM Selector (Optional)
                    </label>
                    <input
                      type="text"
                      className="scanner-input"
                      placeholder="default"
                      value={selector}
                      onChange={(e) => setSelector(e.target.value)}
                      style={{
                        width: "100%",
                        height: "50px",
                        padding: "0 1rem",
                        border: "1px solid #CBD5E1",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        color: "#0F172A",
                        fontWeight: 500,
                        backgroundColor: "#F8FAFC",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div className="scanner-form-group-button">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "10px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        border: "none",
                        boxSizing: "border-box"
                      }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}>
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Scanning...
                        </>
                      ) : (
                        <>
                          Analyze Domain <FiArrowRight />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
