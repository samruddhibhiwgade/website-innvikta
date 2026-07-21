import React from "react";

export default function RoleBasedSection() {
  return (
    <section className="bg-grey-5">
      <div className="container">
        <div className="two-col-grid">
          <div className="two-col-content-block animate from-left">
            <span className="text-subheading">ROLE-BASED COMPLIANCE LEARNING</span>
            <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
              Relevant Training for the <span className="text-orange">Right Employees</span>
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
              Assign AI-assisted learning paths based on department, role, location, policy exposure, or risk profile.
            </p>
            
            <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: 0, listStyle: "none" }}>
              {[
                {
                  role: "HR",
                  desc: "Employee data, POSH, background checks, workplace conduct, and confidentiality.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  role: "Finance",
                  desc: "Invoice fraud, payment approvals, anti-bribery, vendor risk, and financial data handling.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  )
                },
                {
                  role: "IT",
                  desc: "Access control, incident reporting, security policies, privileged accounts, and data protection.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  )
                },
                {
                  role: "Sales & Customer Teams",
                  desc: "Customer data, consent, CRM usage, confidentiality, and responsible communication.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  )
                },
                {
                  role: "Leadership",
                  desc: "Governance, regulatory accountability, breach escalation, ethics, and reputational risk.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )
                }
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                  <span style={{ color: "#F15A24", marginTop: "0.25rem", flexShrink: 0, display: "inline-flex" }}>{item.icon}</span>
                  <span>
                    <strong style={{ color: "#000" }}>{item.role}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="two-col-visual-block animate from-right" style={{ background: "transparent", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img 
              alt="Role-Based Compliance Assignment UI" 
              loading="lazy" 
              src="/images/solutions/compliance-training-images/rolebased_training.png" 
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
