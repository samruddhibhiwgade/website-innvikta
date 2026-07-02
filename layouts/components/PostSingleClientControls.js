"use client";

import { useState, useEffect } from "react";

export default function PostSingleClientControls({ seoAnalysis }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSeoPanelOpen, setIsSeoPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[5px] bg-[#f15a24] z-[9999] transition-all duration-75" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* Floating Analyzer Badge */}
      {seoAnalysis && (
        <button
          onClick={() => setIsSeoPanelOpen(!isSeoPanelOpen)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[45] bg-[#1e293b] text-white hover:bg-slate-900 px-3.5 py-5 rounded-r-2xl shadow-xl flex flex-col items-center gap-1.5 border border-l-0 border-slate-700 transition-all active:scale-95 group"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 group-hover:text-primary">SEO & AI</span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 ${
            seoAnalysis.score >= 80 ? "border-green-500 text-green-400" :
            seoAnalysis.score >= 50 ? "border-amber-500 text-amber-400" : "border-red-500 text-red-400"
          }`}>
            {seoAnalysis.score}
          </div>
        </button>
      )}

      {/* Slide-out CMS SEO & AI Analysis Panel Drawer */}
      {isSeoPanelOpen && seoAnalysis && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex justify-end" onClick={() => setIsSeoPanelOpen(false)}>
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto relative z-10 text-left border-l border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">CMS SEO & AI Analyzer</h3>
                <p className="text-xs text-slate-400 font-medium">Real-time search engine scoring report</p>
              </div>
              <button 
                onClick={() => setIsSeoPanelOpen(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Score Ring Display */}
            <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
              <div className={`w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-xl font-black border-4 ${
                seoAnalysis.score >= 80 ? "border-green-500 text-green-600 bg-green-50" :
                seoAnalysis.score >= 50 ? "border-amber-500 text-amber-600 bg-amber-50" : "border-red-500 text-red-600 bg-red-50"
              }`}>
                {seoAnalysis.score}
              </div>
              <div>
                <div className="text-xs font-black uppercase text-slate-400">Total Quality Score</div>
                <div className="text-sm font-bold text-slate-800">
                  {seoAnalysis.score >= 80 ? "Fully Optimized for Search & AI!" :
                   seoAnalysis.score >= 50 ? "Needs minor optimization adjustments" : "Substantial content enhancements required"}
                </div>
              </div>
            </div>

            {/* Failed & Passed Audit Checks Accordion list */}
            <div className="space-y-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Optimization Audit Checklist</div>
              {seoAnalysis.checks.map((check, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 shrink-0">
                      {check.status === "success" && (
                        <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] font-black">✓</span>
                      )}
                      {check.status === "warning" && (
                        <span className="w-4 h-4 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] font-black">!</span>
                      )}
                      {check.status === "error" && (
                        <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-[10px] font-black">✗</span>
                      )}
                      {check.status === "info" && (
                        <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">?</span>
                      )}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{check.name} ({check.points}/{check.maxPoints} pts)</div>
                      <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{check.description}</p>
                      {check.status !== "success" && (
                        <div className="mt-1 text-[11px] font-medium text-primary bg-orange-50 px-2 py-1 rounded border border-orange-100/50">
                          <strong>Rec:</strong> {check.recommendation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#f15a24] hover:bg-[#c2410c] text-white p-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center border border-white/10"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      )}
    </>
  );
}
