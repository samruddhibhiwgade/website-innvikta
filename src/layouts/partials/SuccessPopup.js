"use client";

import React, { useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

const SuccessPopup = ({ isOpen, onClose, title = "Success!", message = "Your request has been successfully submitted." }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100010] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-scale-up ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-500/10 blur-[50px] pointer-events-none rounded-full" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/50 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          aria-label="Close popup"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20" />
          <div className="relative z-10 w-full h-full bg-gradient-to-tr from-orange-100 to-orange-50 rounded-full flex items-center justify-center shadow-inner border border-orange-200/50">
            <FiCheckCircle className="text-[#f15a24]" size={42} strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-[1.75rem] font-secondary font-bold text-slate-900 mb-4 tracking-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="relative z-10 text-[0.95rem] font-primary font-medium text-slate-500 leading-relaxed max-w-[280px] mx-auto">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;
