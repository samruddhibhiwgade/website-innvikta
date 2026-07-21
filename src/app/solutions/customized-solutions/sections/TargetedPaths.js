import React from "react";

export default function TargetedPathsSection() {
  return (
    <section id="industry-specific-portals" className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="container">
        <div className="section-intro animate" style={{ textAlign: "left", marginBottom: "4rem" }}>
          <span className="text-subheading">TARGETED PATHS</span>
          <h2 className="text-52-heading">
            Relevant Learning for <span style={{ color: "#f15a24" }}>Every Team</span>
          </h2>
          <p className="text-18-content" style={{ opacity: "0.8", marginTop: "1rem", maxWidth: "800px" }}>
            Create focused learning paths for industries, departments, roles, and high-risk user groups.
          </p>
        </div>

        {/* Row 1: Industry Tracks */}
        <div className="two-col-grid" style={{ marginTop: "4rem", alignItems: "start" }}>
          {/* Left Column: Heading and Subheading */}
          <div className="two-col-content-block animate from-left" style={{ maxWidth: "450px" }}>
            <h2 className="text-52-heading" style={{ marginTop: "0px", marginBottom: "1rem" }}><span style={{ color: "#f15a24" }}>Industry</span> Tracks</h2>
            <p className="text-22-heading" style={{ color: "#475569", fontWeight: "500" }}>Customized paths for key sectors</p>
          </div>
          {/* Right Column: Description & Bullet Points */}
          <div className="two-col-content-block animate from-right" style={{ maxWidth: "680px" }}>
            <p className="text-18-content" style={{ opacity: "0.8", marginBottom: "2rem", lineHeight: "1.6", paddingTop: "0.75rem" }}>
              Create focused learning paths for key industries, addressing specific risks and regulatory requirements.
            </p>
            
            <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  title: "BFSI",
                  desc: "Payment fraud, KYC risks, customer data, phishing, regulatory awareness.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <line x1="3" y1="21" x2="21" y2="21" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <polyline points="12 2 20 10 4 10 12 2" />
                      <line x1="6" y1="10" x2="6" y2="21" />
                      <line x1="10" y1="10" x2="10" y2="21" />
                      <line x1="14" y1="10" x2="14" y2="21" />
                      <line x1="18" y1="10" x2="18" y2="21" />
                    </svg>
                  )
                },
                {
                  title: "Healthcare",
                  desc: "Patient data, privacy, unauthorized access, device security.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  )
                },
                {
                  title: "Manufacturing",
                  desc: "Vendor fraud, plant access, OT awareness, device usage.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  )
                },
                {
                  title: "IT/ITES",
                  desc: "Cloud access, client data, credentials, remote work, privileged users.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  )
                },
                {
                  title: "Government / Public Sector",
                  desc: "Citizen data, DPDP, document handling, impersonation, email security.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                      <line x1="4" y1="22" x2="4" y2="15" />
                    </svg>
                  )
                },
                {
                  title: "Education",
                  desc: "Student data, email safety, device use, access control.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <li key={idx} className="group flex gap-3 items-start transition-all duration-300 hover:translate-x-1.5 cursor-pointer">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span><strong className="transition-colors duration-300 group-hover:text-[#f15a24]" style={{ color: "#0f172a" }}>{item.title}</strong>: <span style={{ color: "#475569" }}>{item.desc}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2: Role Tracks */}
        <div id="departmental-learning-paths" style={{ position: "relative", top: "-100px" }}></div>
        <div className="two-col-grid" style={{ marginTop: "6rem", alignItems: "start" }}>
          {/* Left Column: Heading and Subheading */}
          <div className="two-col-content-block animate from-left" style={{ maxWidth: "450px" }}>
            <h2 className="text-52-heading" style={{ marginTop: "0px", marginBottom: "1rem" }}><span style={{ color: "#f15a24" }}>Role</span> Tracks</h2>
            <p className="text-22-heading" style={{ color: "#475569", fontWeight: "500" }}>Tailored tracks for departments</p>
          </div>
          {/* Right Column: Description & Bullet Points */}
          <div className="two-col-content-block animate from-right" style={{ maxWidth: "680px" }}>
            <p className="text-18-content" style={{ opacity: "0.8", marginBottom: "2rem", lineHeight: "1.6", paddingTop: "0.75rem" }}>
              Address unique threats and responsibilities across key operational departments.
            </p>
            
            <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  title: "Finance",
                  desc: "Invoice fraud, fake vendors, payment approvals.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  )
                },
                {
                  title: "HR",
                  desc: "Employee data, social engineering, document handling.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  title: "Sales",
                  desc: "Customer data, CRM usage, impersonation risks.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  )
                },
                {
                  title: "Leadership",
                  desc: "CEO fraud, breach escalation, reputational risk.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <li key={idx} className="group flex gap-3 items-start transition-all duration-300 hover:translate-x-1.5 cursor-pointer">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span><strong className="transition-colors duration-300 group-hover:text-[#f15a24]" style={{ color: "#0f172a" }}>{item.title}</strong>: <span style={{ color: "#475569" }}>{item.desc}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
