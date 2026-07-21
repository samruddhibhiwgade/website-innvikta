"use client";

import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiX } from "react-icons/fi";

const CyberAwarenessPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if current date is past Oct 31, 2026
    const currentDate = new Date();
    const deadlineDate = new Date("2026-10-31T23:59:59");
    if (currentDate > deadlineDate) {
      return;
    }

    // Check session storage so it only shows once per session
    const hasSeen = sessionStorage.getItem("cyber_awareness_seen");
    if (hasSeen === "true") {
      return;
    }

    const handleMouseLeave = (e) => {
      // e.clientY < 20 indicates mouse moving up out of the viewport
      if (e.clientY < 20) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("cyber_awareness_seen", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    sessionStorage.setItem("cyber_awareness_seen", "true");
    
    fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form_type: "Cyber Awareness Popup",
        email: email
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.error || "Failed to submit enquiry. Please try again.");
      }
    })
    .catch((err) => {
      setError("An error occurred. Please try again.");
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-4xl overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row min-h-[480px] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 text-white transition-colors"
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Left Section - Content & Form (60% width) */}
        <div className="w-full md:w-[58%] p-8 md:p-10 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/images/logo-main.png" 
                alt="Innvikta Cybersecurity Solutions" 
                className="h-7 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-bold text-lg text-slate-800 tracking-tight" style={{ fontFamily: "Satoshi, sans-serif" }}>
                INNVIKTA
              </span>
            </div>

            {/* Divider October banner */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] bg-slate-200 flex-grow"></div>
              <span className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">October Is</span>
              <div className="h-[1px] bg-slate-200 flex-grow"></div>
            </div>

            {/* Main Titles */}
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
              <span className="text-[#f15a24] block">CYBER</span>
              <span className="text-[#334155] block">AWARENESS</span>
              <span 
                className="text-[#f15a24] block mt-1"
                style={{ 
                  fontFamily: "'Playwrite HR', 'Brush Script MT', 'Comic Sans MS', cursive", 
                  fontWeight: "normal",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                  paddingLeft: "0.25rem"
                }}
              >
                Month!
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 font-medium text-sm md:text-base mb-6 leading-snug">
              Stronger awareness. Safer people. Stronger organization.
            </p>

            {/* Contact Alert Info Box */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#f15a24]">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  Have questions or want to know how we can help your organization?{" "}
                  <span className="text-[#f15a24] font-bold">Drop us an email – we'd love to connect!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form & Security Disclaimer */}
          <div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative flex items-center p-1 bg-white border-2 border-slate-200 focus-within:border-[#f15a24] rounded-xl transition-colors">
                  <div className="pl-3 text-slate-400">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="youremail@company.com" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full py-2 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none border-none focus:ring-0 bg-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    className="flex-shrink-0 bg-[#f15a24] hover:bg-[#d64a1b] !text-white text-sm font-bold py-2 px-5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    Send Enquiry <span className="text-base">→</span>
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{error}</p>}
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center font-semibold text-sm">
                🎉 Thank you! Your enquiry has been received. We'll connect with you soon.
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
              <FiLock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Your information is secure and will never be shared.</span>
            </div>
          </div>
        </div>

        {/* Right Section - Visual Graphics (42% width) */}
        <div 
          className="relative w-full md:w-[42%] bg-gradient-to-br from-[#ff6b2b] to-[#f15a24] p-8 flex flex-col justify-center items-center overflow-hidden min-h-[300px] md:min-h-full"
          style={{
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
          }}
        >
          {/* Subtle curved wave background patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="150" cy="50" r="100" fill="none" stroke="white" strokeWidth="8" />
              <circle cx="150" cy="50" r="130" fill="none" stroke="white" strokeWidth="5" />
              <circle cx="150" cy="50" r="160" fill="none" stroke="white" strokeWidth="3" />
            </svg>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          {/* Core Visual Elements Stack */}
          <div className="relative z-10 w-full max-w-[280px] flex flex-col items-center gap-4">
            
            {/* Float Icons Around Laptop Mockup */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              
              {/* Circular Path Badges */}
              <div className="absolute top-0 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider mt-1 drop-shadow-md">Awareness</span>
              </div>

              <div className="absolute right-0 top-[25%] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider mt-1 drop-shadow-md">Training</span>
              </div>

              <div className="absolute right-0 bottom-[20%] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider mt-1 drop-shadow-md">Risk Reduction</span>
              </div>

              <div className="absolute left-0 bottom-[20%] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider mt-1 drop-shadow-md text-center max-w-[65px] leading-tight">Behavior Change</span>
              </div>

              {/* Vector Laptop Component */}
              <div className="relative w-full scale-95 mt-4 z-20 flex flex-col items-center">
                {/* Screen */}
                <div className="w-[190px] h-[120px] bg-slate-900 rounded-t-xl p-1.5 shadow-2xl border-2 border-slate-700 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-1.5 bg-gradient-to-b from-slate-850 to-slate-950 rounded flex flex-col items-center justify-center text-center p-2">
                    <FiLock className="w-6 h-6 text-orange-400 mb-1 animate-pulse" />
                    <p className="text-[8px] font-bold text-white uppercase tracking-widest leading-none">Aware Today,</p>
                    <p className="text-[8px] font-extrabold text-[#f15a24] uppercase tracking-wider mt-0.5">Secure Tomorrow.</p>
                  </div>
                  {/* Camera dot */}
                  <div className="w-1 h-1 rounded-full bg-slate-600 absolute top-1 left-1/2 -translate-x-1/2"></div>
                </div>
                {/* Keyboard Base */}
                <div className="w-[230px] h-[10px] bg-slate-350 rounded-b-md relative shadow-xl">
                  {/* Keyboard indentation */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[3px] bg-slate-600/30 rounded-b"></div>
                  {/* Screen hinge */}
                  <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-slate-800 rounded-t"></div>
                </div>
                {/* Trackpad Lip */}
                <div className="w-[70px] h-[2px] bg-slate-500/50 rounded-b mx-auto"></div>
              </div>

              {/* Overlay Shield Badge (orange check shield next to laptop) */}
              <div className="absolute bottom-[8%] right-[5%] z-30 w-16 h-18 drop-shadow-2xl">
                <svg className="w-full h-auto text-orange-100" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 0L5 10V35C5 51.5 15.5 64.5 30 70C44.5 64.5 55 51.5 55 35V10L30 0Z" fill="url(#shieldGrad)" stroke="white" strokeWidth="2.5" />
                  <path d="M22 35L27 40L38 29" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="shieldGrad" x1="5" y1="0" x2="55" y2="70" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff7e40" />
                      <stop offset="1" stopColor="#f15a24" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Shield with lock (left of awareness) */}
              <div className="absolute top-[8%] left-[8%] z-30 w-14 h-16 drop-shadow-lg">
                <svg className="w-full h-auto text-orange-100" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 0L5 10V35C5 51.5 15.5 64.5 30 70C44.5 64.5 55 51.5 55 35V10L30 0Z" fill="url(#shieldGradLock)" stroke="white" strokeWidth="2" />
                  <defs>
                    <linearGradient id="shieldGradLock" x1="5" y1="0" x2="55" y2="70" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f87171" />
                      <stop offset="1" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Mini Lock Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white pb-1">
                  <FiLock className="w-5.5 h-5.5" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAwarenessPopup;
