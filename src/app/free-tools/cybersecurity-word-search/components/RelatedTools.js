import React from "react";
import Link from "next/link";

export default function RelatedTools() {
  return (
    <section className="bg-white py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-8" style={{ margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1200px", width: "100%", boxSizing: "border-box" }}>
        <h2 className="text-32-heading text-center" style={{ marginBottom: "3rem" }}>More Free Cybersecurity Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <style>{`
            .custom-resource-card {
              padding: 1.75rem !important;
              background-color: #FFFAF6 !important;
              border: 1px solid #FFEAD4 !important;
              border-radius: 12px !important;
              min-height: 220px !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              box-sizing: border-box !important;
            }
          `}</style>
          {[
            { title: "Spot The Phish", desc: "Interactive game testing your skill at identifying phishing mail indicators.", link: "/freetools/spot-the-phish" },
            { title: "Maturity Calculator", desc: "Evaluate the capability levels of your training program structures.", link: "/resources/maturity-calculator" },
            { title: "Domain Security Analyzer", desc: "Audit records like SPF, DKIM, and DMARC for security vulnerability details.", link: "/freetools/domain-security-analyzer" },
            { title: "Baseline Score Tool", desc: "Assess domain safety levels and run mock credential breaches.", link: "/freetools/baseline-score-tool" }
          ].map((tool, idx) => (
            <div key={idx} className="custom-resource-card">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-2" style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>{tool.title}</h3>
                <p className="text-slate-600 mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "#475569" }}>{tool.desc}</p>
              </div>
              <Link href={tool.link} className="font-bold hover:underline inline-flex items-center gap-1" style={{ fontSize: "0.875rem", color: "#F15A24" }}>
                Launch Tool
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
