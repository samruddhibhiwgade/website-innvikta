import React from "react";

export default function AssessmentResults({
  assessmentResult,
  formData,
  handleReset
}) {
  return (
    <section id="assessment-results" style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>EXECUTIVE SUMMARY</span>
          <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
            {assessmentResult ? "Your Organization's Assessment Results" : "See What Your Assessment Reveals"}
          </h2>
          <p className="text-18-content" style={{ color: "#6E6E6E", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            Below is {assessmentResult ? "the live scan report" : "a realistic sample assessment"} representing human risk exposure parameters.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #E7E7E7",
            borderLeft: "4px solid #F15A24",
            borderRadius: "20px",
            padding: "3rem 2.25rem",
            boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
            transform: "translateY(-8px)",
            maxWidth: "960px",
            margin: "0 auto"
          }}
        >
          {/* Score Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" style={{ borderBottom: "1px solid #E7E7E7", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
            <div className="md:col-span-4" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6E6E6E", uppercase: "true", marginBottom: "0.5rem" }}>
                HUMAN RISK SCORE
              </div>
              <div style={{ fontSize: "5rem", fontWeight: "600", color: assessmentResult ? assessmentResult.color : "#F15A24", lineHeight: "1" }}>
                {assessmentResult ? assessmentResult.score : "67"}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#6E6E6E", marginTop: "0.25rem" }}>out of 100 max</div>
            </div>

            <div className="md:col-span-8" style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: assessmentResult ? assessmentResult.color : "#F15A24",
                  color: "#FFFFFF",
                  padding: "0.35rem 1rem",
                  borderRadius: "4px",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem"
                }}
              >
                {assessmentResult ? assessmentResult.level : "HIGH RISK EXPOSURE"}
              </div>
              <p className="text-16-content" style={{ color: "#3A3A3A", lineHeight: "1.5" }}>
                {assessmentResult ? (
                  `Based on a workforce size of ${formData.orgSize} and industry benchmarks, the domain ${formData.domain} presents high-impact vulnerabilities. Your current security maturity programs require immediate updates.`
                ) : (
                  "Based on standard regional targeting baselines and observable perimeter controls, look-alike domain risks, exposed workforce email identities, and training maturity intervals remain elevated."
                )}
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "left" }}>
            {[
              {
                label: "Email Security Posture",
                val: assessmentResult ? assessmentResult.email : 72,
                state: formData.domain 
                  ? `Weak SPF/DMARC email policies detected for the domain ${formData.domain}.`
                  : "Weak SPF/DMARC email authentication records detected.",
                risk: ["bfsi", "government", "healthcare"].includes(formData.industry)
                  ? `As a highly targeted organization in the ${formData.industry.toUpperCase()} sector, permissive policies significantly elevate the risk of domain spoofing and spear-phishing.`
                  : formData.industry
                  ? `Permissive email policies in the ${formData.industry} industry facilitate vendor impersonation and supply chain email attacks.`
                  : "Permitted spoofed emails bypass standard filtering to appear as legitimate corporate communications.",
                rec: ["bfsi", "government", "healthcare"].includes(formData.industry)
                  ? "Configure strict DMARC reject policies immediately, implement SPF/DKIM validation, and deploy automated spoofing alert systems."
                  : "Enforce strict DMARC reject policies and register comprehensive SPF/DKIM records."
              },
              {
                label: "Identity Exposure",
                val: assessmentResult ? assessmentResult.identity : 61,
                state: ["10000+", "2500-9999", "500-2499"].includes(formData.orgSize)
                  ? `A large employee footprint of ${formData.orgSize} expands the identity perimeter, resulting in high volumes of exposed credentials on public indices.`
                  : formData.orgSize
                  ? `An organization size of ${formData.orgSize} employees presents key corporate identity exposure points on public databanks.`
                  : "Exposed employee email credentials and identities discoverable on public indices.",
                risk: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                  ? "Lack of continuous security training leaves exposed identities highly vulnerable to credential stuffing and automated phishing."
                  : "Facilitates highly targeted spear-phishing campaigns, brute-force access attempts, and account takeover vectors.",
                rec: ["10000+", "2500-9999"].includes(formData.orgSize)
                  ? "Enforce strict multi-factor authentication (MFA) across all identity providers, deploy continuous dark web scanning, and audit external directories."
                  : "Restrict public directory lookups, enforce multi-factor authentication (MFA), and audit exposed accounts."
              },
              {
                label: "Employee Exposure",
                val: assessmentResult ? assessmentResult.employee : 58,
                state: ["10000+", "2500-9999"].includes(formData.orgSize)
                  ? `Broad organizational hierarchies for a ${formData.orgSize} workforce are easily mapped on public social networks and business registers.`
                  : formData.orgSize
                  ? `Company hierarchy and key contacts for a team size of ${formData.orgSize} are visible on public channels.`
                  : "Corporate directory structure and employee roles discoverable on public platforms.",
                risk: ["bfsi", "government"].includes(formData.industry)
                  ? "Attackers frequently leverage this structural visibility to orchestrate high-impact C-suite impersonation and Business Email Compromise (BEC) fraud."
                  : "Allows threat actors to map reporting relationships for targeted social engineering and departmental spoofing.",
                rec: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                  ? "Implement targeted BEC, social engineering, and C-suite impersonation training specifically for high-risk cohorts like Finance and HR."
                  : "Deliver role-based security training and define strict dual-authorization protocols for financial transactions."
              },
              {
                label: "Brand Impersonation Risk",
                val: assessmentResult ? assessmentResult.brand : 79,
                state: formData.domain 
                  ? `Multiple look-alike domain permutations and typosquatting risks mimicking ${formData.domain} are available for malicious registrations.`
                  : "Active look-alike domains and brand abuse vectors registered by unauthorized third parties.",
                risk: ["bfsi", "healthcare"].includes(formData.industry)
                  ? "Critical threat of credential harvesting portals and fake login pages targeting your customers, patients, or partners."
                  : "Tricks employees, suppliers, or clients into interacting with malicious look-alike portals and spoofed communication channels.",
                rec: "Set up proactive look-alike domain monitoring, register key defensive domain variations, and establish a clear takedown protocol."
              },
              {
                label: "Security Maturity",
                val: assessmentResult ? assessmentResult.maturity : 42,
                state: formData.trainingFreq === "never"
                  ? "No formal security awareness training is conducted, leaving the workforce vulnerable to basic threats."
                  : formData.trainingFreq === "annually"
                  ? "Security Awareness Training is run only annually, leading to low knowledge retention and secure-habit formation."
                  : formData.trainingFreq === "quarterly"
                  ? "Training is conducted quarterly, leaving significant gaps in awareness of evolving threat vectors."
                  : "Continuous monthly training is active, providing a strong baseline defense for the organization.",
                risk: formData.phishingFreq === "never"
                  ? "Workforce resilience is completely unmeasured; susceptibility to modern phishing campaigns is unknown."
                  : formData.phishingFreq === "annually"
                  ? "Simulations are too infrequent (annually) to build active threat-reporting reflexes or change security behaviors."
                  : formData.phishingFreq === "quarterly"
                  ? "Quarterly phishing simulations are spaced too far apart, causing decay of defensive detection skills between tests."
                  : "Monthly phishing simulations are active, but must be personalized to match active role-specific threat targeting.",
                rec: (formData.trainingFreq === "never" || formData.trainingFreq === "annually")
                  ? "Transition from static/absent training to continuous monthly microlearning modules and run immediate baseline phishing tests."
                  : (formData.phishingFreq === "never" || formData.phishingFreq === "annually" || formData.phishingFreq === "quarterly")
                  ? "Increase phishing simulations to a monthly frequency and integrate real-time feedback loops directly into training."
                  : "Align simulations with real-time employee behavior metrics and roll out role-specific advanced defense modules."
              }
            ].map((row, idx) => (
              <div key={idx} style={{ borderBottom: idx < 4 ? "1px solid #E7E7E7" : "none", paddingBottom: idx < 4 ? "2rem" : "0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1F1F1F" }}>{row.label}</h4>
                  <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#F15A24" }}>{row.val}% Exposure</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                  <div>
                    <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Current State:</strong>
                    <span style={{ color: "#6E6E6E" }}>{row.state}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Risk Explanation:</strong>
                    <span style={{ color: "#6E6E6E" }}>{row.risk}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#1F1F1F", display: "block", marginBottom: "0.25rem" }}>Recommended Action:</strong>
                    <span style={{ color: "#6E6E6E" }}>{row.rec}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {assessmentResult && (
            <button
              type="button"
              onClick={handleReset}
              style={{
                width: "100%",
                marginTop: "2.5rem",
                padding: "1rem",
                backgroundColor: "#1F1F1F",
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: "0.95rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Recalculate Assessment Score
            </button>
          )}
        </div>

        {!assessmentResult && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
            <button
              type="button"
              onClick={() => {
                document.body.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "12px 30px",
                backgroundColor: "#F15A24",
                color: "#FFFFFF",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              Get My Human Risk Score
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
