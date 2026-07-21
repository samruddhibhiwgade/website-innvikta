import React from "react";

export default function RoleBasedSection() {
  return (
    <section className="bg-white" style={{ paddingTop: "0" }}>
      <div className="container">
        <div className="section-intro" style={{ maxWidth: "800px", marginBottom: "4rem" }}>
          <span className="text-subheading" style={{ color: "var(--color-night)", opacity: "0.5", display: "block", marginBottom: "0.5rem" }}>Role-Based Learning</span>
          <h2 className="text-52-heading">Training That Matches the Employee’s Real Work</h2>
          <p className="text-20-content opacity-70" style={{ marginTop: "1.5rem" }}>
            Different roles face different risks. InSAT helps assign relevant learning paths based on department, role, or risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="side-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="side-card-visual bg-plum">
              <img alt="Finance risks illustration" loading="lazy"
                src="/insat/images/finance.png" />
            </div>
            <div className="side-card-text-wrapper pt-4" style={{ flex: "1" }}>
              <div className="side-card-title-row">
                <span className="side-card-title">Finance</span>
              </div>
              <p className="side-card-desc">
                Invoice fraud, payment manipulation, fake vendor requests, and CEO fraud.
              </p>
            </div>
          </div>

          
          <div className="side-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="side-card-visual bg-plum">
              <img alt="HR risks illustration" loading="lazy"
                src="/insat/images/Hr.png" />
            </div>
            <div className="side-card-text-wrapper pt-4" style={{ flex: "1" }}>
              <div className="side-card-title-row">
                <span className="side-card-title">HR</span>
              </div>
              <p className="side-card-desc">
                Resume malware, employee data handling, fake documents, and social engineering.
              </p>
            </div>
          </div>

          
          <div className="side-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="side-card-visual bg-plum">
              <img alt="Sales risks illustration" loading="lazy"
                src="/insat/images/sales.png" />
            </div>
            <div className="side-card-text-wrapper pt-4" style={{ flex: "1" }}>
              <div className="side-card-title-row">
                <span className="side-card-title">Sales</span>
              </div>
              <p className="side-card-desc">
                Client data protection, public Wi-Fi risks, CRM access, and impersonation attempts.
              </p>
            </div>
          </div>

          
          <div className="side-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="side-card-visual bg-plum">
              <img alt="IT risks illustration" loading="lazy"
                src="/insat/images/IT.png" />
            </div>
            <div className="side-card-text-wrapper pt-4" style={{ flex: "1" }}>
              <div className="side-card-title-row">
                <span className="side-card-title">IT</span>
              </div>
              <p className="side-card-desc">
                Privileged access, malware response, cloud risks, and incident reporting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
