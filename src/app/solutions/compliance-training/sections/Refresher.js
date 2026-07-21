import React from "react";

export default function RefresherSection() {
  return (
    <section id="refresher-campaigns" className="bg-white" style={{ position: "relative" }}>
      <div id="acknowledgement-tracking" style={{ position: "absolute", top: "-80px" }}></div>
      <div className="container">
        <div className="two-col-grid" style={{ marginTop: "0rem" }}>
          
          {/* Left Side: 6 Campaign Cards */}
          <div className="two-col-content-block animate from-left" style={{ maxWidth: "540px" }}>
            <span className="text-subheading">REFRESHER & REINFORCEMENT CAMPAIGNS</span>
            <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              Keep <span className="text-orange">Compliance</span> Alive
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6", color: "#334155" }}>
              Compliance knowledge fades when it is not reinforced. Innvikta helps teams send timely refresher campaigns after policy updates, audits, incidents, or identified learning gaps.
            </p>
            
             <div className="reports-insight-grid">
              {[
                {
                  title: "Short refresher modules",
                  desc: "Quick bite-sized micro-courses",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  )
                },
                {
                  title: "Policy update campaigns",
                  desc: "Sent when internal rules update",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )
                },
                {
                  title: "Department-wise reinforcement",
                  desc: "Tailored to high-risk roles",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  title: "Targeted reminders",
                  desc: "Nudges for incomplete training",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  )
                },
                {
                  title: "Scenario-based policy recall",
                  desc: "Verifies knowledge retention",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )
                },
                {
                  title: "Periodic compliance training",
                  desc: "Assigned to high-risk user groups",
                  icon: (
                    <svg className="w-5 h-5 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
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
          
          {/* Right Side: Responsive Compliance Modules Mockup Image */}
          <div className="two-col-visual-block animate from-right" style={{ background: "transparent", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img 
              alt="Compliance Training Modules" 
              loading="lazy" 
              src="/images/solutions/compliance-training-images/compliance_moduels.png" 
              className="w-full h-auto object-contain"
              style={{
                maxWidth: "100%",
                height: "auto"
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
