import React from "react";

export default function RefresherSection() {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="two-col-grid" style={{marginTop: "0rem"}}>
          <div className="two-col-content-block animate from-left" style={{ maxWidth: "540px" }}>
            <span className="text-subheading">Reports & Insights</span>
            <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              See Risk Clearly
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6", color: "#334155" }}>
              Track campaign results, risky users, department trends, and learning progress - so you can take action that makes an impact.
            </p>
            
            <div className="reports-insight-grid">
              {[
                {
                  title: "Click rates",
                  desc: "See who clicks and how often",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  )
                },
                {
                  title: "Department trends",
                  desc: "Spot trends across teams",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="9" y1="22" x2="9" y2="16" />
                      <line x1="15" y1="22" x2="15" y2="16" />
                      <line x1="9" y1="16" x2="15" y2="16" />
                      <circle cx="8" cy="6" r="0.5" />
                      <circle cx="16" cy="6" r="0.5" />
                      <circle cx="8" cy="10" r="0.5" />
                      <circle cx="16" cy="10" r="0.5" />
                    </svg>
                  )
                },
                {
                  title: "Report rates",
                  desc: "Measure reporting behavior",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  )
                },
                {
                  title: "Campaign reports",
                  desc: "Deep dive into performance",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  )
                },
                {
                  title: "Repeat risky users",
                  desc: "Identify and reduce repeat risks",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )
                },
                {
                  title: "Learning completion",
                  desc: "Track training progress",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
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
          
          <div className="two-col-visual-block animate from-right" style={{ background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img 
              alt="Reports & Insights Dashboard" 
              loading="lazy" 
              src="/images/solutions/phishingsimulation_images/report_insights.png" 
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
