import React from "react";

export default function HeroSection({
  currentQuestion,
  formData,
  handleInputChange,
  handleNext,
  handleBack,
  calculateBenchmark,
  benchmarkResult,
  handleReset
}) {
  return (
    <section className="hero-section" style={{ background: "#FFFFFF", paddingBottom: "5rem", paddingTop: "4rem" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "75vh" }}>
          
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7 hero-content" style={{ textAlign: "left", padding: "0" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "500" }}>FREE HUMAN RISK SCAN</span>
            <h1 className="text-64-heading" style={{ color: "#1F1F1F", fontWeight: "600", lineHeight: "1.05", marginBottom: "1.5rem" }}>
              Security Culture Maturity Benchmark &amp; <span style={{ color: "#F15A24" }}>Human Risk Assessment</span>
            </h1>
            <p className="text-18-content" style={{ color: "#3A3A3A", opacity: "0.9", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px" }}>
              Measure how your organization&apos;s security culture compares against industry standards. Evaluate awareness, behaviors, reporting habits, compliance practices, and human risk indicators to understand where your culture stands today.
            </p>
          </div>

          {/* Right Column: Premium Benchmark Visual / Form Card */}
          <div className="lg:col-span-5 hero-visual-card">
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
              {!benchmarkResult ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#F15A24" }}>
                      Question {currentQuestion} of 9
                    </span>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: "10px",
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: i <= currentQuestion ? "#F15A24" : "#E7E7E7",
                            transition: "background-color 0.3s ease"
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Questions */}
                  {currentQuestion === 1 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Select Industry</h3>
                      <select
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Select industry...</option>
                        <option value="bfsi">BFSI</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="technology">Technology & IT</option>
                        <option value="government">Government & Public</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 2 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Organization Size</h3>
                      <select
                        value={formData.orgSize}
                        onChange={(e) => handleInputChange("orgSize", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Select workforce size...</option>
                        <option value="1-99">1 - 99 employees</option>
                        <option value="100-499">100 - 499 employees</option>
                        <option value="500-2499">500 - 2,499 employees</option>
                        <option value="2500+">2,500+ employees</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 3 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Attitudes</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How do employees perceive security policies and mandates?</p>
                      <select
                        value={formData.attitudes}
                        onChange={(e) => handleInputChange("attitudes", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Positive/Understands business importance</option>
                        <option value="medium">Neutral/Complies but finds it disruptive</option>
                        <option value="low">Negative/Views security as an obstacle</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 4 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Behaviors</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How regularly do employees exhibit safe security habits in their daily workflows?</p>
                      <select
                        value={formData.behaviors}
                        onChange={(e) => handleInputChange("behaviors", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Always lock screens, verify senders, use safe managers</option>
                        <option value="medium">Occasionally bypass safety for convenience</option>
                        <option value="low">Frequent security shortcuts and policy workarounds</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 5 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Knowledge</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees understand cybersecurity threat vectors (phishing, social engineering, AI-clones)?</p>
                      <select
                        value={formData.knowledge}
                        onChange={(e) => handleInputChange("knowledge", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Highly aware of modern and AI-driven attack vectors</option>
                        <option value="medium">Familiar with phishing, but lacks knowledge of deepfakes/BEC</option>
                        <option value="low">Minimal knowledge, struggles to identify threats</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 6 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Communication</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees know where and how to report security concerns?</p>
                      <select
                        value={formData.communication}
                        onChange={(e) => handleInputChange("communication", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Reports threats immediately via structured channels</option>
                        <option value="medium">Discusses concerns with peers but rarely logs them formally</option>
                        <option value="low">Avoids reporting due to complex channels or fear of blame</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 7 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Compliance Practices</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Are compliance policies followed consistently rather than just during audits?</p>
                      <select
                        value={formData.compliance}
                        onChange={(e) => handleInputChange("compliance", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Continuous policy compliance and clean audits</option>
                        <option value="medium">Policies followed loosely outside of review seasons</option>
                        <option value="low">Widespread non-compliance or lack of policy awareness</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 8 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Team Norms</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do peers actively encourage and reinforce secure behaviors among one another?</p>
                      <select
                        value={formData.norms}
                        onChange={(e) => handleInputChange("norms", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">Peers actively support and check on security habits</option>
                        <option value="medium">Tolerates secure behaviors but doesn&apos;t advocate them</option>
                        <option value="low">Secure behavior is often teased or bypassed by team pressure</option>
                      </select>
                    </div>
                  )}

                  {currentQuestion === 9 && (
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Ownership</h3>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees feel personally responsible for protecting the organization?</p>
                      <select
                        value={formData.ownership}
                        onChange={(e) => handleInputChange("ownership", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                      >
                        <option value="">Choose option...</option>
                        <option value="high">High ownership; views security as part of their job role</option>
                        <option value="medium">Moderate; feels it is primarily IT/Security&apos;s responsibility</option>
                        <option value="low">Zero ownership; assumes security teams handle everything</option>
                      </select>
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
                          background: "#FFFFFF",
                          color: "#3A3A3A",
                          fontWeight: "400",
                          borderRadius: "8px",
                          cursor: "pointer"
                        }}
                      >
                        Back
                      </button>
                    )}
                    
                    {currentQuestion < 9 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (currentQuestion === 1 && !formData.industry) ||
                          (currentQuestion === 2 && !formData.orgSize) ||
                          (currentQuestion === 3 && !formData.attitudes) ||
                          (currentQuestion === 4 && !formData.behaviors) ||
                          (currentQuestion === 5 && !formData.knowledge) ||
                          (currentQuestion === 6 && !formData.communication) ||
                          (currentQuestion === 7 && !formData.compliance) ||
                          (currentQuestion === 8 && !formData.norms)
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
                            (currentQuestion === 1 && !formData.industry) ||
                            (currentQuestion === 2 && !formData.orgSize) ||
                            (currentQuestion === 3 && !formData.attitudes) ||
                            (currentQuestion === 4 && !formData.behaviors) ||
                            (currentQuestion === 5 && !formData.knowledge) ||
                            (currentQuestion === 6 && !formData.communication) ||
                            (currentQuestion === 7 && !formData.compliance) ||
                            (currentQuestion === 8 && !formData.norms)
                          ) ? 0.5 : 1
                        }}
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={calculateBenchmark}
                        disabled={!formData.ownership}
                        style={{
                          flex: 2,
                          padding: "0.75rem",
                          background: "#F15A24",
                          color: "#FFFFFF",
                          fontWeight: "500",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                          opacity: !formData.ownership ? 0.5 : 1
                        }}
                      >
                        Calculate Benchmark
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#F15A24", letterSpacing: "0.05em" }}>CALCULATED SCORE</span>
                  <div style={{ fontSize: "3.5rem", fontWeight: "700", color: "#1F1F1F", margin: "0.5rem 0" }}>
                    {benchmarkResult.score} <span style={{ fontSize: "1.2rem", color: "#6B7280" }}>/ 100</span>
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                    {benchmarkResult.band}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "1.5rem", lineHeight: "1.4" }}>
                    {benchmarkResult.bandDesc}
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <button
                      type="button"
                      onClick={() => document.getElementById("benchmark-report")?.scrollIntoView({ behavior: "smooth" })}
                      style={{ width: "100%", padding: "0.75rem", background: "#F15A24", color: "#FFFFFF", fontWeight: "500", borderRadius: "8px", border: "none", cursor: "pointer" }}
                    >
                      View Detailed Breakdown
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      style={{ width: "100%", padding: "0.75rem", background: "#FFFFFF", border: "1px solid #E7E7E7", color: "#3A3A3A", fontWeight: "400", borderRadius: "8px", cursor: "pointer" }}
                    >
                      Retake Benchmark
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
