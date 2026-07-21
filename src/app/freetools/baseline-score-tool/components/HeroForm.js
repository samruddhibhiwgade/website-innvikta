import React from "react";

export default function HeroForm({
  currentQuestion,
  formData,
  handleInputChange,
  handleBack,
  handleNext,
  calculateScore,
  setFormData,
  setAssessmentResult
}) {
  return (
    <section className="hero-section" style={{ background: "#FFFFFF", paddingBottom: "4rem" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "80vh" }}>
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 hero-content" style={{ textAlign: "left", padding: "0" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "500" }}>FREE HUMAN RISK SCAN</span>
            <h1 className="text-64-heading" style={{ color: "#1F1F1F", fontWeight: "600", lineHeight: "1.05", marginBottom: "1.5rem" }}>
              Understand Your <span style={{ color: "#F15A24" }}>Human Risk Exposure</span>
            </h1>
            <p className="text-18-content" style={{ color: "#3A3A3A", opacity: "0.9", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px" }}>
              Most cyberattacks don&apos;t begin with malware. They begin with people. Measure your organization&apos;s exposure to phishing, social engineering, credential theft, business email compromise, and AI-powered impersonation attacks with Innvikta&apos;s Human Risk Exposure Assessment.
            </p>
          </div>

          {/* Right Column: Assessment Form */}
          <div className="lg:col-span-5 hero-form-block">
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E7E7E7",
                borderLeft: "4px solid #F15A24",
                borderRadius: "20px",
                padding: "2.25rem",
                boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
                transform: "translateY(-8px)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "500", color: "#F15A24", uppercase: "true", letterSpacing: "0.05em" }}>
                  Question {currentQuestion} of 5
                </span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "16px",
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: i <= currentQuestion ? "#F15A24" : "#E7E7E7",
                        transition: "background-color 0.3s ease"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Question 1: Domain */}
              {currentQuestion === 1 && (
                <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                    What is your company domain?
                  </h3>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={formData.domain}
                    onChange={(e) => handleInputChange("domain", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1px solid #E7E7E7",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      outline: "none",
                      color: "#1F1F1F"
                    }}
                  />
                  <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                    <strong>Explanation:</strong> Your domain helps identify publicly observable email security controls and potential impersonation risks.
                  </p>
                </div>
              )}

              {/* Question 2: Org Size */}
              {currentQuestion === 2 && (
                <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                    What is your organization size?
                  </h3>
                  <select
                    value={formData.orgSize}
                    onChange={(e) => handleInputChange("orgSize", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1px solid #E7E7E7",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      outline: "none",
                      background: "#fff",
                      color: "#1F1F1F"
                    }}
                  >
                    <option value="">Select workforce size...</option>
                    <option value="1-99">1 - 99 employees</option>
                    <option value="100-499">100 - 499 employees</option>
                    <option value="500-2499">500 - 2,499 employees</option>
                    <option value="2500-9999">2,500 - 9,999 employees</option>
                    <option value="10000+">10,000+ employees</option>
                  </select>
                  <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                    <strong>Explanation:</strong> Workforce size influences exposure and attack surface.
                  </p>
                </div>
              )}

              {/* Question 3: Industry */}
              {currentQuestion === 3 && (
                <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                    What industry does your company belong to?
                  </h3>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1px solid #E7E7E7",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      outline: "none",
                      background: "#fff",
                      color: "#1F1F1F"
                    }}
                  >
                    <option value="">Select industry...</option>
                    <option value="bfsi">BFSI (Banking &amp; Finance)</option>
                    <option value="healthcare">Healthcare &amp; Medicine</option>
                    <option value="manufacturing">Manufacturing &amp; Supply Chain</option>
                    <option value="it">IT &amp; Technology</option>
                    <option value="government">Government &amp; Public Sector</option>
                    <option value="education">Education &amp; Universities</option>
                    <option value="other">Other Sectors</option>
                  </select>
                  <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                    <strong>Explanation:</strong> Different sectors experience different threat levels and targeting patterns.
                  </p>
                </div>
              )}

              {/* Question 4: Training Frequency */}
              {currentQuestion === 4 && (
                <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                    How often is Security Awareness Training conducted?
                  </h3>
                  <select
                    value={formData.trainingFreq}
                    onChange={(e) => handleInputChange("trainingFreq", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1px solid #E7E7E7",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      outline: "none",
                      background: "#fff",
                      color: "#1F1F1F"
                    }}
                  >
                    <option value="">Select training frequency...</option>
                    <option value="never">Never / No formal training</option>
                    <option value="annually">Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly / Continuous</option>
                  </select>
                  <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                    <strong>Explanation:</strong> Training maturity strongly influences human risk outcomes.
                  </p>
                </div>
              )}

              {/* Question 5: Phishing Frequency */}
              {currentQuestion === 5 && (
                <div className="animate-fade-in" style={{ minHeight: "180px" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "0.5rem", color: "#1F1F1F" }}>
                    How often do you run Phishing Simulations?
                  </h3>
                  <select
                    value={formData.phishingFreq}
                    onChange={(e) => handleInputChange("phishingFreq", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1px solid #E7E7E7",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      outline: "none",
                      background: "#fff",
                      color: "#1F1F1F"
                    }}
                  >
                    <option value="">Select simulation frequency...</option>
                    <option value="never">Never / No simulations</option>
                    <option value="annually">Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly / Continuous</option>
                  </select>
                  <p style={{ fontSize: "0.8rem", color: "#6E6E6E", lineHeight: "1.4" }}>
                    <strong>Explanation:</strong> Organizations that regularly simulate attacks generally improve resilience.
                  </p>
                </div>
              )}

              {/* Controls */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                {currentQuestion > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      border: "1px solid #E7E7E7",
                      background: "none",
                      color: "#3A3A3A",
                      fontWeight: "400",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Back
                  </button>
                )}
                
                {currentQuestion < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (currentQuestion === 1 && !formData.domain) ||
                      (currentQuestion === 2 && !formData.orgSize) ||
                      (currentQuestion === 3 && !formData.industry) ||
                      (currentQuestion === 4 && !formData.trainingFreq)
                    }
                    style={{
                      flex: 2,
                      padding: "0.75rem",
                      background: "#F15A24",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      opacity: (
                        (currentQuestion === 1 && !formData.domain) ||
                        (currentQuestion === 2 && !formData.orgSize) ||
                        (currentQuestion === 3 && !formData.industry) ||
                        (currentQuestion === 4 && !formData.trainingFreq)
                      ) ? 0.5 : 1
                    }}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={calculateScore}
                    disabled={!formData.phishingFreq}
                    style={{
                      flex: 2,
                      padding: "0.75rem",
                      background: "#F15A24",
                      color: "#FFFFFF",
                      fontWeight: "500",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      opacity: !formData.phishingFreq ? 0.5 : 1
                    }}
                  >
                    Calculate My Human Risk Score
                  </button>
                )}
              </div>

              {currentQuestion === 5 && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      domain: "acme-corp.com",
                      orgSize: "500-2499",
                      industry: "bfsi",
                      trainingFreq: "annually",
                      phishingFreq: "quarterly"
                    });
                    setAssessmentResult({
                      score: 67,
                      level: "HIGH RISK",
                      color: "#F15A24",
                      email: 72,
                      identity: 61,
                      employee: 58,
                      brand: 79,
                      maturity: 42
                    });
                    setTimeout(() => {
                      document.getElementById("assessment-results")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "0.75rem",
                    background: "none",
                    border: "none",
                    color: "#6E6E6E",
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    textDecoration: "underline",
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                >
                  View Sample Assessment
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
