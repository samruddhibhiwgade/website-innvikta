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
