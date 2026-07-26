import React from "react";
import Link from "next/link";
import { FiArrowRight, FiShield, FiMail, FiZap, FiAward } from "react-icons/fi";

export default function ReportButtonSection() {
  return (
    <section className="bg-grey-5" style={{ borderTop: "1px solid var(--color-grey)" }}>
      <div className="container">
        <div className="two-col-grid" style={{ alignItems: "center" }}>
          
          {/* Content Block */}
          <div className="two-col-content-block animate from-left">
            <span className="text-subheading" style={{ color: "var(--color-night)", opacity: "0.5", display: "block", marginBottom: "0.5rem" }}>
              One-Click Threat Reporting
            </span>
            <h2 className="text-52-heading">
              Empower Employees with the Phishing Alert Button (PAB)
            </h2>
            <div style={{ marginTop: "1.5rem", opacity: "0.8" }}>
              <p className="text-18-content">
                Give your team a simple, powerful way to report suspicious emails directly from their inbox. 
                Our lightweight plugin integrates with Microsoft Outlook, M365, Gmail, and Google Workspace, 
                turning every employee into an active defender.
              </p>
            </div>

            {/* Micro Feature Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem", marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-aquamarine)", fontSize: "1.25rem", marginTop: "2px" }}><FiZap /></div>
                <div>
                  <h4 style={{ fontWeight: "bold", fontSize: "15px", color: "var(--color-night)" }}>Instant Action</h4>
                  <p style={{ fontSize: "13px", opacity: "0.7", marginTop: "2px" }}>Report phishing with a single click inside the email client ribbon.</p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-aquamarine)", fontSize: "1.25rem", marginTop: "2px" }}><FiShield /></div>
                <div>
                  <h4 style={{ fontWeight: "bold", fontSize: "15px", color: "var(--color-night)" }}>SOC Integration</h4>
                  <p style={{ fontSize: "13px", opacity: "0.7", marginTop: "2px" }}>Forwards reported threats directly to your security queue in real-time.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-aquamarine)", fontSize: "1.25rem", marginTop: "2px" }}><FiMail /></div>
                <div>
                  <h4 style={{ fontWeight: "bold", fontSize: "15px", color: "var(--color-night)" }}>Automatic Sandbox</h4>
                  <p style={{ fontSize: "13px", opacity: "0.7", marginTop: "2px" }}>Safely extracts headers and attachments for threat classification.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-aquamarine)", fontSize: "1.25rem", marginTop: "2px" }}><FiAward /></div>
                <div>
                  <h4 style={{ fontWeight: "bold", fontSize: "15px", color: "var(--color-night)" }}>Positive Reinforcement</h4>
                  <p style={{ fontSize: "13px", opacity: "0.7", marginTop: "2px" }}>Instantly congratulates users for identifying simulated templates.</p>
                </div>
              </div>
            </div>

            <div className="hero-actions-row" style={{ display: "flex", gap: "1rem" }}>
              <Link 
                href="/book-demo" 
                className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                style={{ padding: "14px 28px" }}
              >
                See it in Action <FiArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Visual Block */}
          <div className="two-col-visual-block bg-white animate from-right shadow-md border border-slate-105" style={{ padding: "1rem", borderRadius: "1.5rem", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <img 
              alt="Phishing Alert Button Mockup" 
              loading="lazy" 
              src="/images/phish-report-alert.png" 
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "1rem" }} 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
