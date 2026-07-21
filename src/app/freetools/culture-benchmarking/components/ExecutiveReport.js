import React from "react";
import { getScoreData } from "./constants";

export default function ExecutiveReport({ benchmarkResult, formData }) {
  const scoreData = getScoreData(benchmarkResult, formData);

  return (
    <section id="benchmark-report" style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
            CULTURE SCORECARD
          </span>
          <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
            Interactive Culture Maturity Report
          </h2>
          <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            Receive a detailed culture maturity assessment with benchmark comparisons, risk insights, and prioritized improvement opportunities.
          </p>
        </div>

        {/* The Executive Report Document */}
        <div 
          style={{
            background: "#FFFFFF",
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1F1F1F", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1F1F1F", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Security Culture Maturity Assessment
              </h3>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontSize: "0.85rem", color: "#6B7280" }}>
                <span><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span><strong>Industry:</strong> {formData.industry ? formData.industry.toUpperCase() : "TECHNOLOGY & IT"}</span>
                <span><strong>Workforce Size:</strong> {formData.orgSize ? formData.orgSize : "500–2,499"}</span>
              </div>
            </div>
          </div>

          {/* Part 1: Executive Summary */}
          <div style={{ marginBottom: "3rem" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
              I. Executive Insight Summary
            </h4>
            <div style={{ background: "#FDFDFD", borderLeft: "4px solid #E7E7E7", padding: "1.5rem 2rem", borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: "1rem", color: "#3A3A3A", lineHeight: "1.8", margin: 0, fontStyle: "italic" }}>
                &ldquo;{scoreData.execSummary}&rdquo;
              </p>
            </div>
          </div>

          {/* Part 2: Key Score Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "3.5rem", borderTop: "1px solid #E7E7E7", borderBottom: "1px solid #E7E7E7", paddingTop: "2rem", paddingBottom: "2rem" }}>
            {/* Left Metric Column */}
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Culture Score &amp; Status</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginTop: "0.75rem" }}>
                <strong style={{ fontSize: "4.5rem", color: "#F15A24", fontWeight: "800", lineHeight: 1 }}>{scoreData.score}</strong>
                <div>
                  <span style={{ fontSize: "1rem", fontWeight: "700", color: "#1F1F1F", display: "block" }}>/ 100 Index</span>
                  <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>{scoreData.percentile}</span>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0", borderBottom: "1px solid #E7E7E7" }}>
                  <span style={{ color: "#6B7280" }}>Maturity Level:</span>
                  <strong style={{ color: "#1F1F1F" }}>{scoreData.maturityLevel}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0" }}>
                  <span style={{ color: "#6B7280" }}>Maturity Band Description:</span>
                  <span style={{ color: "#3A3A3A", textAlign: "left", maxWidth: "240px", fontWeight: "500" }}>{scoreData.maturityDesc}</span>
                </div>
              </div>
            </div>

            {/* Right Metric Column */}
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Human Risk Indicators</span>
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "20px", background: scoreData.score >= 76 ? "#FFEFEA" : "#FEE2E2", color: scoreData.score >= 76 ? "#F15A24" : "#EF4444", fontWeight: "700", fontSize: "0.9rem" }}>
                  {scoreData.riskLevel} Rating
                </div>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "0.5rem", lineHeight: "1.5" }}>
                  {scoreData.riskDesc}
                </p>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0", borderBottom: "1px solid #E7E7E7" }}>
                  <span style={{ color: "#6B7280" }}>Industry Comparison:</span>
                  <strong style={{ color: "#10B981" }}>{scoreData.comparisonText}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0" }}>
                  <span style={{ color: "#6B7280" }}>QoQ Trend Status:</span>
                  <strong style={{ color: "#10B981" }}>{scoreData.trendText}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Part 3: Dimension Score Breakdown Table */}
          <div style={{ marginBottom: "3.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem" }}>
              II. Structured Dimension Scorecard
            </h4>
            
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1F1F1F", color: "#6B7280", fontWeight: "600" }}>
                  <th style={{ padding: "0.75rem 0" }}>Dimension Name</th>
                  <th style={{ padding: "0.75rem 0", textAlign: "center" }}>Weight</th>
                  <th style={{ padding: "0.75rem 0", textAlign: "right" }}>Dimension Index</th>
                  <th style={{ padding: "0.75rem 0", textAlign: "right" }}>Performance Band</th>
                </tr>
              </thead>
              <tbody>
                {scoreData.dimensions.map((dim, idx) => {
                  let status = "Action Required";
                  let statusColor = "#EF4444";
                  if (dim.score >= 90) {
                    status = "Outstanding";
                    statusColor = "#10B981";
                  } else if (dim.score >= 80) {
                    status = "Strong";
                    statusColor = "#10B981";
                  } else if (dim.score >= 70) {
                    status = "Satisfactory";
                    statusColor = "#3B82F6";
                  }
                  
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #E7E7E7" }}>
                      <td style={{ padding: "1rem 0", fontWeight: "500", color: "#1F1F1F" }}>{dim.name}</td>
                      <td style={{ padding: "1rem 0", textAlign: "center", color: "#6B7280" }}>{dim.weight}</td>
                      <td style={{ padding: "1rem 0", textAlign: "right", fontWeight: "700", color: "#1F1F1F" }}>{dim.score} / 100</td>
                      <td style={{ padding: "1rem 0", textAlign: "right" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", color: statusColor, border: `1px solid ${statusColor}`, padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Part 4: Recommendations Action Plan */}
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem" }}>
              III. Tactical Action &amp; Mitigation Plan
            </h4>
            
            <div style={{ background: "#FDFDFD", border: "1px solid #E7E7E7", borderRadius: "8px", padding: "1.5rem 2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {scoreData.recommendations.map((rec, rIdx) => (
                  <div key={rIdx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ 
                      background: "#FFEFEA", 
                      color: "#F15A24", 
                      borderRadius: "50%", 
                      minWidth: "24px", 
                      minHeight: "24px", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "0.8rem", 
                      fontWeight: "700" 
                    }}>
                      0{rIdx + 1}
                    </span>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "#1F1F1F", display: "block" }}>
                        {rec.split(" targeting ")[0].split(" to ")[0]}
                      </strong>
                      <span style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "0.15rem", display: "block" }}>
                        {rec}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
