import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: "#FFFAF6" }}>
      <div className="container relative z-10 text-center">
        <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem" }}>FREE SECURITY arcade TOOL</span>
        <h1 className="text-52-heading">Find Hidden <span style={{ color: "#F15A24" }}>Cybersecurity</span> Terms</h1>
        <p className="text-18-content hero-paragraph mt-4" style={{ opacity: "0.85", textAlign: "center", margin: "1.5rem auto 0 auto", maxWidth: "42rem" }}>
          Challenge yourself by finding cybersecurity words hidden inside the letter grid while learning essential security concepts used by professionals.
        </p>
        <div style={{ justifyContent: "center", display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
          <a className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm" style={{ padding: "14px 28px" }} href="#wordsearch-game">Play Now</a>
          <Link className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm" style={{ padding: "14px 28px" }} href="/solutions/insat">Learn About Security Training</Link>
        </div>
      </div>

      {/* Floating premium illustrations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="floating-shape shape-lock absolute left-[8%] top-[25%] opacity-40">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <div className="floating-shape shape-shield absolute right-[10%] top-[20%] opacity-40">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        </div>
        <div className="floating-shape shape-browser absolute left-[12%] bottom-[15%] opacity-30">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><circle cx="6" cy="6" r="1" /><circle cx="10" cy="6" r="1" /></svg>
        </div>
        <div className="floating-shape shape-key absolute right-[15%] bottom-[12%] opacity-35">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" /></svg>
        </div>
      </div>
    </section>
  );
}
