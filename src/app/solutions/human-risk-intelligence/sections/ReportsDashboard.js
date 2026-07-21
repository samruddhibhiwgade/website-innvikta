import React from "react";
import Link from "next/link";

export default function ReportsDashboard() {
  return (
    <>
      {/* 3. AI-GENERATED REPORTS SECTION */}
      <section className="bg-grey-5">
        <div className="container">
          <div className="two-col-grid">
            <div className="two-col-content-block animate from-left">
              <span className="text-subheading">AI-GENERATED REPORTS</span>
              <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                Reports for <span style={{ color: "#f15a24" }}>Every</span> <br />
                <span style={{ color: "#f15a24" }}>Decision Maker</span>
              </h2>
              <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                Create AI-generated reports tailored for departments, managers, executives, board reviews, and compliance evidence.
              </p>
              
              <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: 0, listStyle: "none", marginTop: "2rem" }}>
                {[
                  {
                    title: "Department Reports",
                    desc: "Detailed threat susceptibility and risk score metrics segmented by business units to identify vulnerable teams.",
                    icon: (
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )
                  },
                  {
                    title: "Manager Reports",
                    desc: "Actionable dashboard views for team leads to monitor training completions, active quiz scores, and department progress.",
                    icon: (
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 3h-6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Executive Reports",
                    desc: "High-level summary dashboards tracking company-wide security posture, repeat risky users, and threat trends.",
                    icon: (
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    )
                  },
                  {
                    title: "Board Reports",
                    desc: "Defensible evidence demonstrating security training ROI, continuous improvement rates, and overall risk reduction.",
                    icon: (
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )
                  },
                  {
                    title: "Compliance Reports",
                    desc: "Audit-ready evidence logs mapped to major global compliance standards, including SOC 2, ISO 27001, and HIPAA.",
                    icon: (
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#f15a24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11l3 3 5-5" />
                      </svg>
                    )
                  }
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                    {point.icon}
                    <span style={{ fontSize: "1.05rem", color: "#334155" }}>
                      <strong style={{ color: "#1F2937", marginRight: "0.35rem" }}>{point.title}:</strong>
                      <span style={{ color: "#4B5563" }}>{point.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="two-col-visual-block animate from-right" style={{ background: "transparent" }}>
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
              }}>
                {/* Card Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ color: "#F15A24" }}>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>Human Risk Reports</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", backgroundColor: "#F1F5F9", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#475569", fontWeight: 600, cursor: "pointer" }}>All Reports</span>
                    <span style={{ fontSize: "0.8rem", backgroundColor: "#FFEBE0", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>AI-Generated</span>
                  </div>
                </div>
                
                {/* KPI Metrics Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {[
                    { label: "RISK POSTURE", val: "Medium", diff: "↑ 5% this month", color: "#EF4444", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                    )},
                    { label: "VULNERABLE TEAMS", val: "3", diff: "HR, Fin, Sales", color: "#EF4444", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    )},
                    { label: "AVG RISK SCORE", val: "42", diff: "↓ 12%", color: "#10B981", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    )},
                    { label: "COMPLIANCE STATUS", val: "94%", diff: "↑ 4%", color: "#10B981", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                    )}
                  ].map((kpi, idx) => (
                    <div key={idx} style={{ border: "1px solid #F1F5F9", borderRadius: "8px", padding: "0.6rem", display: "flex", gap: "0.5rem" }}>
                      <div style={{ color: "#F15A24", marginTop: "0.15rem" }}>{kpi.icon}</div>
                      <div>
                        <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.02em" }}>{kpi.label}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.15rem" }}>
                          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>{kpi.val}</span>
                          <span style={{ fontSize: "0.6rem", color: kpi.color, fontWeight: 600 }}>{kpi.diff}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Report Title</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Target Audience</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Risk Focus</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Status</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Generated</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { 
                          name: "Department Susceptibility Audit", 
                          target: "All Departments", 
                          targetBg: "#EFF6FF", 
                          targetColor: "#1D4ED8",
                          risk: "• High Risk", 
                          riskColor: "#EF4444", 
                          status: "Ready", 
                          statusBg: "#DCFCE7", 
                          statusColor: "#15803D",
                          updated: "5m ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        },
                        { 
                          name: "Executive Posture Summary", 
                          target: "Board & CISOs", 
                          targetBg: "#FAF5FF", 
                          targetColor: "#7E22CE",
                          risk: "• Medium Risk", 
                          riskColor: "#F59E0B", 
                          status: "Ready", 
                          statusBg: "#DCFCE7", 
                          statusColor: "#15803D",
                          updated: "1h ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        },
                        { 
                          name: "Compliance Attestation Log", 
                          target: "SOC 2 Auditors", 
                          targetBg: "#F0FDF4", 
                          targetColor: "#166534",
                          risk: "• Low Risk", 
                          riskColor: "#10B981", 
                          status: "Ready", 
                          statusBg: "#DCFCE7", 
                          statusColor: "#15803D",
                          updated: "3h ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l3 3 5-5"/></svg>
                        },
                        { 
                          name: "Risk Mitigation Roadmap", 
                          target: "Security Team", 
                          targetBg: "#EFF6FF", 
                          targetColor: "#1D4ED8",
                          risk: "• Medium Risk", 
                          riskColor: "#F59E0B", 
                          status: "Draft", 
                          statusBg: "#F1F5F9", 
                          statusColor: "#475569",
                          updated: "1d ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        }
                      ].map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: "1px solid #F1F5F9", color: "#334155" }}>
                          <td style={{ padding: "0.75rem 0.5rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#94A3B8" }}>{row.icon}</span>
                            <span>{row.name}</span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ backgroundColor: row.targetBg, color: row.targetColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                              {row.target}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem", color: row.riskColor, fontWeight: 600 }}>{row.risk}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ backgroundColor: row.statusBg, color: row.statusColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#64748B" }}>{row.updated}</td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#94A3B8", cursor: "pointer", textAlign: "right" }}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1"/>
                              <circle cx="12" cy="5" r="1"/>
                              <circle cx="12" cy="19" r="1"/>
                            </svg>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", fontSize: "0.75rem", color: "#94A3B8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>
                    <span>View all reports</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span>Last updated: 2 min ago</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 4v6h-6M1 20v-6h6M21.94 9.57a8.91 8.91 0 0 0-4.48-5.32 9 9 0 0 0-9.67.6L2 9m20 5l-5.74 5.74a9 9 0 0 1-9.67.6 8.91 8.91 0 0 1-4.48-5.32"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI RECOMMENDATIONS SECTION */}
      <section className="bg-white">
        <div className="container">
          <div className="two-col-grid" style={{ alignItems: "start" }}>
            
            {/* Left Column: Heading, Description, and 2x2 Cards Grid */}
            <div className="two-col-content-block animate from-left" style={{ maxWidth: "580px" }}>
              <span className="text-subheading">AI RECOMMENDATIONS</span>
              <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                Know What to <span style={{ color: "#f15a24" }}>Fix Next</span>
              </h2>
              <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
                AI-assisted recommendations help teams prioritize users, departments, campaigns, and reinforcement actions.
              </p>

              {/* 2x2 Grid of cards */}
              <div className="reports-insight-grid">
                {[
                  {
                    title: "High-Risk Users",
                    desc: "Assign targeted microlearning.",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    )
                  },
                  {
                    title: "Weak Departments",
                    desc: "Launch role-based simulations.",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    )
                  },
                  {
                    title: "Repeat Clickers",
                    desc: "Trigger reinforcement campaigns.",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                      </svg>
                    )
                  },
                  {
                    title: "Leadership",
                    desc: "Generate executive summaries.",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    )
                  }
                ].map((card, idx) => (
                  <div key={idx} className="reports-insight-card">
                    <div className="reports-insight-icon-container">
                      {card.icon}
                    </div>
                    <div className="reports-insight-text-wrapper">
                      <h4 className="reports-insight-title">{card.title}</h4>
                      <p className="reports-insight-desc">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dashboard Mockup */}
            <div className="two-col-visual-block animate from-right" style={{ background: "transparent" }}>
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
              }}>
                {/* Card Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ color: "#F15A24" }}>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0F172A" }}>AI Auto-Pilot Actions</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", backgroundColor: "#FFEBE0", padding: "0.35rem 0.75rem", borderRadius: "6px", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>Recommendations</span>
                  </div>
                </div>

                {/* KPI Metrics Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {[
                    { label: "AUTO-RESOLVED", val: "84%", diff: "↑ 12%", color: "#10B981", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                    )},
                    { label: "PENDING ACTIONS", val: "4", diff: "High priority", color: "#EF4444", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                    )},
                    { label: "IMPACT FORECAST", val: "+18%", diff: "Risk reduction", color: "#10B981", icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    )}
                  ].map((kpi, idx) => (
                    <div key={idx} style={{ border: "1px solid #F1F5F9", borderRadius: "8px", padding: "0.6rem", display: "flex", gap: "0.5rem" }}>
                      <div style={{ color: "#F15A24", marginTop: "0.15rem" }}>{kpi.icon}</div>
                      <div>
                        <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#64748B", letterSpacing: "0.02em" }}>{kpi.label}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.15rem" }}>
                          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>{kpi.val}</span>
                          <span style={{ fontSize: "0.55rem", color: kpi.color, fontWeight: 600 }}>{kpi.diff}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation Logs */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Recommendation</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Auto-Trigger Action</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Status</th>
                        <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>Triggered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { 
                          name: "High-Risk Users Detected", 
                          action: "Deploy targeted microlearning", 
                          status: "Active", 
                          statusBg: "#FFEBE0", 
                          statusColor: "#F15A24",
                          time: "2m ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                        },
                        { 
                          name: "Finance Click Rate Spike", 
                          action: "Launch role-based simulations", 
                          status: "Pending", 
                          statusBg: "#F1F5F9", 
                          statusColor: "#475569",
                          time: "15m ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                        },
                        { 
                          name: "Repeat Phishing Clickers", 
                          action: "Trigger reinforcement campaign", 
                          status: "Completed", 
                          statusBg: "#DCFCE7", 
                          statusColor: "#15803D",
                          time: "1h ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                        },
                        { 
                          name: "Leadership Posture Review", 
                          action: "Generate executive summary", 
                          status: "Completed", 
                          statusBg: "#DCFCE7", 
                          statusColor: "#15803D",
                          time: "3h ago",
                          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                        }
                      ].map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: "1px solid #F1F5F9", color: "#334155" }}>
                          <td style={{ padding: "0.75rem 0.5rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#94A3B8" }}>{row.icon}</span>
                            <span>{row.name}</span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#475569" }}>{row.action}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ backgroundColor: row.statusBg, color: row.statusColor, padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#64748B" }}>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", fontSize: "0.75rem", color: "#94A3B8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#F15A24", fontWeight: 600, cursor: "pointer" }}>
                    <span>Manage all recommendations</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span>Last updated: 5 min ago</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
