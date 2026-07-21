import React from "react";
import { FiShield, FiUserX, FiGlobe } from "react-icons/fi";

export default function HygieneAndThreats() {
  return (
    <>
      {/* EDUCATIONAL DETAILS SECTION */}
      <section className="section bg-grey-5" style={{ padding: "6rem 0" }}>
        <div className="container max-w-7xl mx-auto px-4">
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="text-subheading" style={{ display: "block", marginBottom: "1rem" }}>HYGIENE BEST PRACTICES</span>
            <h2 className="text-40-heading text-dark" style={{ margin: 0 }}>Password Hygiene Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>1. Avoid Reusing Passwords</h4>
              <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                Reusing passwords exposes your entire digital identity. A breach on an insecure forum can lead directly to commercial mailbox compromise.
              </p>
            </div>

            <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>2. Set Up Multi-Factor Auth (MFA)</h4>
              <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                MFA adds a critical second barrier. Even if someone steals your password, they cannot gain entry without your physical token/code.
              </p>
            </div>

            <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>3. Use Secure Password Storage</h4>
              <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                Never store credentials in text files or browser histories. Utilize commercial managers that encrypt vaults locally.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ATTACKERS EXPLAINED */}
      <section className="section bg-white" style={{ padding: "6rem 0" }}>
        <div className="container max-w-7xl mx-auto px-4">
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="text-subheading" style={{ display: "block", marginBottom: "1rem" }}>THREAT INTELLIGENCE</span>
            <h2 className="text-40-heading text-dark" style={{ margin: 0 }}>How Attackers Compromise Credentials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiShield className="text-primary" /> Brute-Force &amp; Dictionary
              </h4>
              <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                Automated scripts try millions of standard combinations and dictionary word variations in seconds. Complex passwords prevent these tools from finding hits.
              </p>
            </div>

            <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiUserX className="text-primary" /> Credential Stuffing
              </h4>
              <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                Hackers acquire lists of leaked credentials from dark web forums and feed them into scripts targeting thousands of popular sites to hijack active sessions.
              </p>
            </div>

            <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
              <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiGlobe className="text-primary" /> Password Spraying
              </h4>
              <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                Attackers spray a common password (like &apos;Spring2026!&apos;) against thousands of corporate email targets, bypassing lockout controls that monitor single accounts.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
