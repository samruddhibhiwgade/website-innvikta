import React from "react";
import { 
  FiShield, 
  FiLock, 
  FiMail, 
  FiFileText, 
  FiServer, 
  FiActivity, 
  FiAlertTriangle, 
  FiCheckCircle 
} from "react-icons/fi";
import { getStatusBadge } from "./constants";

function FiKeyIcon(props) {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

export default function ResultsReport({
  resultsRef,
  results,
  selector,
  activeTab,
  setActiveTab
}) {
  if (!results) return <div ref={resultsRef}></div>;

  const tabs = [
    { id: "spf", name: "SPF Checker", icon: FiShield },
    { id: "dmarc", name: "DMARC Checker", icon: FiLock },
    { id: "dkim", name: "DKIM Checker", icon: FiKeyIcon },
    { id: "mx", name: "MX Records", icon: FiMail },
    { id: "txt", name: "TXT Records", icon: FiFileText },
    { id: "dns", name: "DNS Lookup", icon: FiServer }
  ];

  return (
    <div ref={resultsRef}>
      <section className="stats-section" style={{ padding: "6rem 0", backgroundColor: "#F8FAFC" }}>
        <div className="container">
          
          <div className="section-intro animate" style={{ marginBottom: "4rem" }}>
            <span className="text-subheading">Domain Profile Results</span>
            <h2 className="text-52-heading">Domain Security Report</h2>
          </div>

          <div className="stats-grid stats-grid-analyzer">
            
            {/* Left Profile Panel */}
            <div className="stats-content-block animate from-left" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              <div className="left-diagnostics-card">
                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  Target Domain
                </span>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 500, color: "#1F2937", wordBreak: "break-all", margin: "0.25rem 0 1.25rem 0", fontFamily: "var(--font-heading)" }}>
                  {results.domain}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid #F1F5F9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>SPF Status</span>
                    {getStatusBadge(results.spf.status)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>DMARC Status</span>
                    {getStatusBadge(results.dmarc.status)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>DKIM Status ({selector})</span>
                    {getStatusBadge(results.dkim.status)}
                  </div>
                </div>
              </div>

              {/* Summary Recommendations */}
              <div className="left-diagnostics-card">
                <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1F2937", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <FiActivity style={{ color: "#F15A24" }} /> Quick Recommendations
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0, listStyle: "none" }}>
                  {results.spf.status === "danger" && (
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <FiAlertTriangle className="text-red-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Publish an SPF record to authorize mail servers.</span>
                    </li>
                  )}
                  {results.dmarc.status === "danger" && (
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <FiAlertTriangle className="text-red-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Configure DMARC rules to reject unauthorized emails.</span>
                    </li>
                  )}
                  {results.dkim.status === "warning" && (
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <FiAlertTriangle className="text-amber-500" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#4B5563", lineHeight: "1.5" }}>Verify selectors or upload DKIM public keys.</span>
                    </li>
                  )}
                  {results.spf.status === "success" && results.dmarc.status === "success" && (
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <FiCheckCircle className="text-green-600" style={{ fontSize: "1.1rem", marginTop: "0.15rem", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#166534", lineHeight: "1.5" }}>Authentication is properly aligned. Good job!</span>
                    </li>
                  )}
                </ul>
              </div>

            </div>

            {/* Right Detailed Tabs Panel */}
            <div className="analyzer-cards-block animate from-right" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "100%", minWidth: 0 }}>
              
              {/* Tabs Bar */}
              <div className="analyzer-tabs-bar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={isActive ? "active" : ""}
                    >
                      <Icon style={{ fontSize: "1.1rem" }} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panel */}
              <div className="analyzer-tab-content-panel">
                
                {/* SPF Checker */}
                {activeTab === "spf" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Sender Policy Framework (SPF)</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Ensures only authorized IP addresses can send mail for your domain.
                    </p>
                    
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                      <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw SPF Record</span>
                      <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                        {results.spf.record || "No SPF record found."}
                      </code>
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "1.25rem",
                      borderRadius: "10px",
                      border: results.spf.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEE2E2",
                      backgroundColor: results.spf.status === "success" ? "#F0FDF4" : "#FEF2F2",
                      color: results.spf.status === "success" ? "#166534" : "#991B1B"
                    }}>
                      {results.spf.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>SPF Integrity Check</h4>
                        <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.spf.message}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is Sender Policy Framework (SPF) needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        Sender Policy Framework (SPF) is a DNS record that lists the IP addresses and mail servers authorized to send emails from your domain. It is needed to prevent email spoofing, as spam and phishing senders often impersonate domain names to trick recipients.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>Can I have multiple SPF records for a single domain?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          No, a domain must have at most one SPF record. Having multiple SPF records will cause validation failures and lead to emails being marked as spam.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DMARC Checker */}
                {activeTab === "dmarc" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>DMARC Policy Compliance</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Instructs receivers how to treat messages that fail SPF or DKIM validation.
                    </p>
                    
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                      <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw DMARC Record (_dmarc.{results.domain})</span>
                      <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                        {results.dmarc.record || "No DMARC record found."}
                      </code>
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "1.25rem",
                      borderRadius: "10px",
                      border: results.dmarc.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEE2E2",
                      backgroundColor: results.dmarc.status === "success" ? "#F0FDF4" : "#FEF2F2",
                      color: results.dmarc.status === "success" ? "#166534" : "#991B1B"
                    }}>
                      {results.dmarc.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>DMARC Compliance Check</h4>
                        <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.dmarc.message}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DMARC Compliance needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        Domain-based Message Authentication, Reporting, and Conformance (DMARC) builds on SPF and DKIM. It dictates how receiving mail servers should handle emails that fail authentication (e.g., monitor, quarantine, or reject) and provides reports on domain activity. It is needed to enforce strict email authentication policies and block phishing attempts.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is the difference between DMARC policy &apos;none&apos;, &apos;quarantine&apos;, and &apos;reject&apos;?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          &apos;none&apos; monitors mail delivery and generates reports without blocking; &apos;quarantine&apos; sends suspicious emails to the spam/junk folder; and &apos;reject&apos; blocks unauthorized emails from being delivered at all.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DKIM Checker */}
                {activeTab === "dkim" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>DKIM Public Key Lookup</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Validates published cryptographic signatures for selector &quot;{selector}&quot;.
                    </p>
                    
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.75rem" }}>
                      <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Raw DKIM Record ({selector}._domainkey.{results.domain})</span>
                      <code style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: "#1E293B", wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>
                        {results.dkim.record || "No DKIM record resolved at this selector."}
                      </code>
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "1.25rem",
                      borderRadius: "10px",
                      border: results.dkim.status === "success" ? "1px solid #DCFCE7" : "1px solid #FEF3C7",
                      backgroundColor: results.dkim.status === "success" ? "#F0FDF4" : "#FFFBEB",
                      color: results.dkim.status === "success" ? "#166534" : "#92400E"
                    }}>
                      {results.dkim.status === "success" ? <FiCheckCircle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} /> : <FiAlertTriangle style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.15rem" }} />}
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 600, margin: 0 }}>DKIM Selector Resolution</h4>
                        <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0 0 0", opacity: 0.9, lineHeight: "1.5" }}>{results.dkim.message}</p>
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DKIM Public Key Lookup needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        DomainKeys Identified Mail (DKIM) adds a cryptographic digital signature to email headers. It is needed to verify that the email was sent by the actual domain owner and to ensure that the content has not been tampered with or modified during transit.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is a DKIM selector and why is it needed?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          A selector is a unique string used to publish multiple DKIM public keys for a single domain, allowing different email services (like Google Workspace, Office 365, or newsletter platforms) to sign emails independently.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MX Records */}
                {activeTab === "mx" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Mail Exchange (MX) Servers</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Mail gateways authorized to accept inbound messages for the domain.
                    </p>
                    
                    {results.mx.length === 0 ? (
                      <div style={{ padding: "2rem", border: "2px dashed #E2E8F0", borderRadius: "12px", textAlign: "center", color: "#94A3B8", fontWeight: 500 }}>
                        No MX records found.
                      </div>
                    ) : (
                      <div style={{ border: "1px solid #E2E8F0", borderRadius: "10px", overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem", textAlign: "left", minWidth: "500px" }}>
                          <thead>
                            <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontWeight: 600 }}>
                              <th style={{ padding: "1rem 1.5rem" }}>Exchange Gateway</th>
                              <th style={{ padding: "1rem 1.5rem", textAlign: "right" }}>Priority</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.mx.map((srv, idx) => (
                              <tr key={idx} style={{ borderBottom: idx === results.mx.length - 1 ? "none" : "1px solid #F1F5F9" }}>
                                <td style={{ padding: "1rem 1.5rem", color: "#334155", fontWeight: 500, wordBreak: "break-all" }}>{srv.exchange}</td>
                                <td style={{ padding: "1rem 1.5rem", textAlign: "right", color: "#475569", fontWeight: 500 }}>{srv.priority}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is Mail Exchange (MX) needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        Mail Exchange (MX) records point to the mail servers responsible for accepting incoming emails on behalf of your domain. They are needed to ensure that mail delivery servers can locate the correct destinations to route your inbound emails.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>How do priority numbers work in MX records?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          Lower priority numbers represent higher preference. Receiving servers will try to deliver mail to the gateway with the lowest priority number first, falling back to higher numbers if the primary is unreachable.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TXT Records */}
                {activeTab === "txt" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>Root TXT Records</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Public text records published on the root domain zone.
                    </p>
                    
                    {results.txt.length === 0 ? (
                      <div style={{ padding: "2rem", border: "2px dashed #E2E8F0", borderRadius: "12px", textAlign: "center", color: "#94A3B8", fontWeight: 500 }}>
                        No TXT records resolved.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "260px", overflowY: "auto" }}>
                        {results.txt.map((rec, idx) => (
                          <div key={idx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "1.1rem 1.5rem" }}>
                            <code style={{ fontSize: "0.95rem", color: "#334155", fontWeight: 500, wordBreak: "break-all", fontFamily: "monospace", lineHeight: "1.5" }}>{rec}</code>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is TXT Records needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        Text (TXT) records contain human and machine-readable text data associated with a domain. They are needed to verify domain ownership (e.g., for Google Search Console, Office 365), and to specify security configurations like SPF and key verification strings.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>How long does it take for a newly published TXT record to take effect?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          DNS propagation depends on the TTL (Time to Live) value set on the record, but typically ranges from a few minutes to up to 24–48 hours globally.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DNS Lookup */}
                {activeTab === "dns" && (
                  <div className="tab-pane-animate">
                    <h3 className="text-32-heading" style={{ fontWeight: 400, color: "#1F2937", marginBottom: "0.75rem" }}>General DNS Resolutions</h3>
                    <p style={{ fontSize: "1.05rem", color: "#4B5563", marginBottom: "1.75rem", fontWeight: 500, lineHeight: "1.6" }}>
                      Addresses, CNAME routes, and Nameservers for the domain.
                    </p>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>A Records (IPv4)</span>
                        {results.dns.a.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                            {results.dns.a.map((ip, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ip}</code>)}
                          </div>
                        )}
                      </div>

                      <div>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>AAAA Records (IPv6)</span>
                        {results.dns.aaaa.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                            {results.dns.aaaa.map((ip, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ip}</code>)}
                          </div>
                        )}
                      </div>

                      <div>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Name Servers (NS)</span>
                        {results.dns.ns.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                            {results.dns.ns.map((ns, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{ns}</code>)}
                          </div>
                        )}
                      </div>

                      <div>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>CNAME Alias</span>
                        {results.dns.cname.length === 0 ? <span style={{ fontSize: "0.95rem", color: "#94A3B8", fontWeight: 500, fontStyle: "italic", display: "inline-block", marginTop: "0.5rem" }}>None</span> : (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
                            {results.dns.cname.map((cname, i) => <code key={i} style={{ backgroundColor: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.5rem 0.95rem", fontSize: "0.9rem", fontWeight: 500, color: "#334155", fontFamily: "monospace", display: "inline-block" }}>{cname}</code>)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E2E8F0" }}>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1F2937", marginBottom: "0.5rem" }}>Why is DNS Lookup needed?</h4>
                      <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "1.25rem" }}>
                        General Domain Name System (DNS) resolutions map domain names to IP addresses (A, AAAA records) and locate authoritative Nameservers (NS). It is needed to allow web browsers and services to resolve your domain to the correct hosting servers globally.
                      </p>
                      
                      <div style={{ backgroundColor: "#F8FAFC", borderRadius: "8px", padding: "1.25rem", borderLeft: "4px solid #F15A24" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Common Question &amp; Answer</span>
                        <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1E293B", margin: "0.25rem 0" }}>What is the difference between an A record and a CNAME record?</h5>
                        <p style={{ fontSize: "0.9rem", color: "#475569", margin: "0.5rem 0 0 0", lineHeight: "1.5" }}>
                          An A record maps a domain directly to an IPv4 address, whereas a CNAME record points a domain alias to another domain name (e.g., mapping `www.example.com` to `example.com`).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
