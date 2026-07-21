import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function ResultsDashboard({ resultsRef, overallScore }) {
  return (
    <section className="section bg-white" ref={resultsRef} style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", textAlign: "left", alignItems: "start" }}>
          
          {/* Left Column: Gauge Illustration & elevation prompt */}
          <div className="flex flex-col items-center text-center">
            
            {/* SVG Speedometer Gauge */}
            <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center", width: "100%" }}>
              <svg width="340" height="190" viewBox="0 0 200 110" style={{ overflow: "visible" }}>
                {/* Segment D (Red) */}
                <path d="M 22 100 A 78 78 0 0 1 43.9 45.8" fill="none" stroke="#E53E3E" strokeWidth="24" strokeLinecap="butt" />
                {/* Segment C (Orange) */}
                <path d="M 45.8 43.9 A 78 78 0 0 1 97.2 22.1" fill="none" stroke="#ED8936" strokeWidth="24" strokeLinecap="butt" />
                {/* Segment B (Light Green) */}
                <path d="M 102.7 22.1 A 78 78 0 0 1 154.1 43.9" fill="none" stroke="#9CD323" strokeWidth="24" strokeLinecap="butt" />
                {/* Segment A (Dark Green) */}
                <path d="M 156.1 45.8 A 78 78 0 0 1 178 100" fill="none" stroke="#38A169" strokeWidth="24" strokeLinecap="butt" />
                
                {/* Labels inside segments */}
                <text x="27.7" y="70.8" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(-68, 27.7, 70.8)">D</text>
                <text x="69.5" y="28.2" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(-23, 69.5, 28.2)">C</text>
                <text x="130.5" y="28.2" fill="black" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(23, 130.5, 28.2)">B</text>
                <text x="172.3" y="70.8" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(68, 172.3, 70.8)">A</text>

                {/* Static needle */}
                <g 
                  transform={`rotate(${
                    overallScore >= 90 ? 68 :
                    overallScore >= 70 ? 23 :
                    overallScore >= 50 ? -23 : -68
                  }, 100, 100)`}
                >
                  <polygon points="98,100 100,22 102,100" fill="#1A202C" />
                  <circle cx="100" cy="100" r="6" fill="#1A202C" />
                </g>
              </svg>
            </div>

            {/* Elevate Text & SME CTA */}
            <div style={{ textAlign: "left", width: "100%" }}>
              <h2 style={{ fontSize: "2rem", color: "#F15A24", fontWeight: "700", lineHeight: "1.2", marginBottom: "1rem" }}>
                Ready to elevate your organization&apos;s cybersecurity awareness?
              </h2>
              <h4 style={{ fontSize: "1.1rem", color: "#1F1F1F", fontWeight: "600", marginBottom: "1rem" }}>
                Talk to us for a free detailed analysis of your grade!
              </h4>
              <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "2rem" }}>
                Our team of SMEs will walk you through easy ways you can improve your existing security awareness training and help you strengthen your defences against cyber threats.
              </p>
              
              <button
                onClick={() => window.open("/book-demo", "_blank")}
                className="btn btn-primary"
                style={{
                  backgroundColor: "#F15A24",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "30px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.9rem"
                }}
              >
                <span>Schedule a call</span>
                <FiArrowRight />
              </button>
            </div>

          </div>

          {/* Right Column: Rating Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#F15A24", display: "block", marginBottom: "0.5rem" }}>
                Your Security Awareness Rating
              </span>
              <span style={{ 
                fontSize: "7.5rem", 
                fontWeight: "900", 
                color: overallScore >= 90 ? "#38A169" : overallScore >= 70 ? "#9CD323" : overallScore >= 50 ? "#ED8936" : "#E53E3E",
                lineHeight: "1",
                display: "block",
                marginBottom: "1rem"
              }}>
                {overallScore >= 90 ? "A" : overallScore >= 70 ? "B" : overallScore >= 50 ? "C" : "D"}
              </span>
            </div>

            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                {overallScore >= 90 ? "Your organization has an elite security awareness maturity, showing strong protection posture:" :
                 overallScore >= 70 ? "Your organization has made progress in security awareness, but there's still room for improvement:" :
                 overallScore >= 50 ? "Your organization displays basic security awareness, but experiences high risk exposure:" :
                 "Your organization is at critical risk due to minimal security awareness training:"}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6" }}>
                {overallScore >= 90 ? "Employees demonstrate advanced security understanding, active threat reporting, and minimal susceptibility. Continue to reinforce learning campaigns to sustain this posture." :
                 overallScore >= 70 ? "While employees may have a basic understanding of security principles, there are areas where awareness could be strengthened. Targeted training programs and ongoing reinforcement of security policies can help address weaknesses and further enhance security awareness across the organization." :
                 overallScore >= 50 ? "Security policies exist but are not actively understood or followed by most departments. Phishing simulated click rates are likely higher than average, and incident reporting is slow or manual." :
                 "There is no formal or regular training delivered to employees. Susceptibility to social engineering, ransomware, and credential harvesting attacks is high, with no reporting processes in place."}
              </p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                Suggestions for Improvement:
              </h4>
              <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6" }}>
                {overallScore >= 90 ? "Focus on gamified deepdives, regular emerging threat alerts, and automated SOC integration for reported threats." :
                 overallScore >= 70 ? "Introduce advanced cybersecurity training modules, promote a culture of reporting security incidents, and provide regular updates on emerging threats and best practices." :
                 overallScore >= 50 ? "Establish regular monthly simulated campaigns, mandate role-based privacy training, and deploy a 1-click reporting hook to ease threat detection." :
                 "Roll out initial baseline awareness modules immediately, set up strong password and MFA rules, and configure simulated phishing tests."}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
