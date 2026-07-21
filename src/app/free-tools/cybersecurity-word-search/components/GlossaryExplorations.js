import React from "react";
import { CYBER_TERMS } from "./constants";

export default function GlossaryExplorations() {
  return (
    <section className="bg-white py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-8" style={{ margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1200px", width: "100%", boxSizing: "border-box" }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem", textAlign: "center" }}>GLOSSARY TERM EXPLORATIONS</span>
          <h2 className="text-40-heading mb-12 text-center" style={{ marginBottom: "3rem" }}>Essential Security Terminology Defined</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {Object.values(CYBER_TERMS).map((term) => (
              <div key={term.name} className="border-b border-border pb-6">
                <h3 className="text-lg font-bold mb-2" style={{ color: "#F15A24", fontWeight: "700" }}>{term.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{term.def}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
