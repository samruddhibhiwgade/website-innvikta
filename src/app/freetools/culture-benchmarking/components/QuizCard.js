import React from "react";

export default function QuizCard({
  currentQuestion,
  formData,
  handleInputChange,
  handleNext,
  handleBack,
  calculateBenchmark
}) {
  return (
    <section id="benchmark-tool" className="bg-white" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="text-subheading">ASSESSMENT TOOL</span>
            <h2 className="text-40-heading" style={{ marginTop: "0.5rem" }}>Benchmark Your Organization</h2>
            <p style={{ color: "#64748B", marginTop: "0.5rem" }}>Answer 9 quick questions to generate your instant culture maturity score.</p>
          </div>

          {/* Progress Bar */}
          <div style={{ backgroundColor: "#F1F5F9", height: "8px", borderRadius: "4px", marginBottom: "2rem", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#F15A24", height: "100%", width: `${(currentQuestion / 9) * 100}%`, transition: "width 0.3s ease" }}></div>
          </div>

          <div style={{ border: "1px solid #E2E8F0", borderRadius: "16px", padding: "2rem", backgroundColor: "#ffffff", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            
            {/* Step 1: Industry */}
            {currentQuestion === 1 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 1 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>What is your organization's primary industry sector?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                  {["BFSI", "Healthcare", "Manufacturing", "IT / Tech", "Government", "Education", "Retail", "Other"].map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => handleInputChange("industry", ind)}
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.industry === ind ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.industry === ind ? "#FFEFEA" : "#FFFFFF",
                        color: formData.industry === ind ? "#F15A24" : "#334155",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Org Size */}
            {currentQuestion === 2 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 2 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>What is the size of your workforce?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                  {["1 - 100 Employees", "101 - 500 Employees", "501 - 2,500 Employees", "2,501+ Employees"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleInputChange("orgSize", size)}
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.orgSize === size ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.orgSize === size ? "#FFEFEA" : "#FFFFFF",
                        color: formData.orgSize === size ? "#F15A24" : "#334155",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Attitudes */}
            {currentQuestion === 3 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 3 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How do employees generally perceive security protocols?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "Positive & Collaborative", desc: "Security is seen as an enabler and shared priority." },
                    { key: "medium", title: "Neutral / Moderate Compliance", desc: "Security rules are followed, but often seen as administrative overhead." },
                    { key: "low", title: "Resistant / Frictional", desc: "Security is viewed as a hurdle that slows down business productivity." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("attitudes", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.attitudes === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.attitudes === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.attitudes === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Behaviors */}
            {currentQuestion === 4 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 4 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How resilient are employees against phishing and credential threats?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "High Resilience", desc: "Low click rates (<5%), high phishing report rates (>70%), strong password habits." },
                    { key: "medium", title: "Moderate Resilience", desc: "Average simulation failure rates, occasional reporting of suspicious emails." },
                    { key: "low", title: "High Risk", desc: "Frequent phishing clicks, rare threat reporting, credential sharing occurs." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("behaviors", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.behaviors === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.behaviors === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.behaviors === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Knowledge */}
            {currentQuestion === 5 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 5 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How effective is workforce security knowledge retention?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "Continuous & High", desc: "Microlearning and quizzes maintain high comprehension year-round." },
                    { key: "medium", title: "Annual Training Focus", desc: "Knowledge spikes around annual compliance training but fades over time." },
                    { key: "low", title: "Low Comprehension", desc: "Infrequent training; employees struggle to identify basic social engineering." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("knowledge", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.knowledge === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.knowledge === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.knowledge === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Communication */}
            {currentQuestion === 6 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 6 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How openly are security incidents and threats reported?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "Open & Blameless", desc: "Employees report mistakes immediately without fear of punishment." },
                    { key: "medium", title: "Standard Escalation", desc: "Incidents are reported, but channels can be slow or confusing." },
                    { key: "low", title: "Fear / Hesitation", desc: "Employees avoid reporting security mistakes due to potential blame." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("communication", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.communication === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.communication === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.communication === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Compliance */}
            {currentQuestion === 7 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 7 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How strictly are internal policies and compliance rules followed?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "High Adherence (>95%)", desc: "Timely policy sign-offs, regular compliance checks, clear oversight." },
                    { key: "medium", title: "Moderate Adherence (70-95%)", desc: "Most complete policy requirements, but reminders are frequently needed." },
                    { key: "low", title: "Inconsistent (<70%)", desc: "Low training completion rates, unmonitored policy acknowledgements." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("compliance", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.compliance === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.compliance === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.compliance === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Norms */}
            {currentQuestion === 8 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 8 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>Do team norms actively reinforce secure habits?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "Strong Social Reinforcement", desc: "Peers remind each other about clean desks, locking screens, and safety." },
                    { key: "medium", title: "Individual Basis", desc: "Security is treated as a personal task rather than a team norm." },
                    { key: "low", title: "Negative Norms", desc: "Workarounds and shortcuts are common and implicitly accepted." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("norms", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.norms === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.norms === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.norms === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Ownership */}
            {currentQuestion === 9 && (
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F15A24", letterSpacing: "0.05em" }}>STEP 9 OF 9</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.5rem", marginBottom: "1.5rem" }}>How strong is individual security accountability across departments?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { key: "high", title: "Shared Ownership", desc: "Every employee considers security a part of their daily core job." },
                    { key: "medium", title: "IT Department Responsibility", desc: "Security is seen primarily as an IT / Security team responsibility." },
                    { key: "low", title: "No Clear Ownership", desc: "Employees take zero personal responsibility for cyber risk." }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleInputChange("ownership", opt.key)}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        borderRadius: "8px",
                        border: formData.ownership === opt.key ? "2px solid #F15A24" : "1px solid #E2E8F0",
                        backgroundColor: formData.ownership === opt.key ? "#FFEFEA" : "#FFFFFF",
                        cursor: "pointer"
                      }}
                    >
                      <strong style={{ display: "block", color: formData.ownership === opt.key ? "#F15A24" : "#0F172A" }}>{opt.title}</strong>
                      <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F1F5F9" }}>
              <button
                type="button"
                onClick={handleBack}
                disabled={currentQuestion === 1}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "6px",
                  border: "1px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontWeight: 600,
                  opacity: currentQuestion === 1 ? 0.5 : 1,
                  cursor: currentQuestion === 1 ? "not-allowed" : "pointer"
                }}
              >
                Previous
              </button>

              {currentQuestion < 9 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.5rem" }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={calculateBenchmark}
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.5rem", backgroundColor: "#F15A24", borderColor: "#F15A24" }}
                >
                  Generate Benchmark Score
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
