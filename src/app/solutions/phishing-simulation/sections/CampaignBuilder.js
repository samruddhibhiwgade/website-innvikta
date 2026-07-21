import React from "react";

export default function CampaignBuilderSection() {
  return (
    <section id="audience-segmentation" className="bg-grey-5">
      <div className="container">
        <div className="two-col-grid">
          <div className="two-col-content-block animate from-left">
            <span className="text-subheading">Custom Campaign Builder</span>
            <h2 className="text-52-heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Build Phishing Campaigns</span>
              That Feel <span style={{ color: "#F15A24" }}>Real</span> to <br />
              <span style={{ color: "#F15A24" }}>Your Workforce</span>
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", marginBottom: "2rem", lineHeight: "1.6" }}>
              Choose from 1000+ ready-to-use phishing templates, customise them, and launch campaigns that look and feel relevant to your organisation.
            </p>
            
            <ul className="campaign-feature-list" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: 0, listStyle: "none" }}>
              {[
                {
                  text: "1000+ ready-to-use phishing email templates",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                      <line x1="6" y1="14" x2="8" y2="14" />
                      <line x1="12" y1="14" x2="18" y2="14" />
                    </svg>
                  )
                },
                {
                  text: "Custom branding, logo, sender name, and email content",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                  )
                },
                {
                  text: "Editable links, attachments, landing pages, and call-to-actions",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  )
                },
                {
                  text: "Role-wise, department-wise, and difficulty-based campaigns",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  text: "AI-assisted scenario creation for faster campaign setup",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )
                },
                {
                  text: "Instant learning triggers after risky actions",
                  icon: (
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#F15A24", marginTop: "0.2rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  )
                }
              ].map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#334155", lineHeight: "1.4" }}>
                  {point.icon}
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right">
            <img 
              alt="Custom Campaign Builder Dashboard" 
              loading="lazy" 
              src="/images/solutions/phishingsimulation_images/Template Library.png" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
