"use client";

import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiUser, FiBriefcase, FiMail, FiPhone, FiSend, FiLock } from "react-icons/fi";
import SuccessPopup from "../partials/SuccessPopup";

const BookDemo = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];

  const validateEmail = (email) => {
    if (!email) return "Work email is required";
    const domain = email.split("@")[1];
    if (freeDomains.includes(domain?.toLowerCase())) {
      return "Please use a work email address";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.fullName) newErrors.fullName = "Name is required";
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;
    if (!form.company) newErrors.company = "Company is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSuccess(true);
        setForm({
          fullName: "",
          email: "",
          company: "",
          phone: ""
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };



  return (
    <div className="bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden my-8 text-left max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Left panel - Brand Highlight Accent */}
      <div className="md:w-[40%] bg-gradient-to-br from-[#f15a24] to-[#c2410c] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
        {/* Subtle background decoration grid/pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
        
        <div className="relative z-10">
          {/* Pill Badge */}
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-wider bg-white/10 rounded-full uppercase border border-white/15 backdrop-blur-sm">
            HUMAN RISK MANAGEMENT
          </div>
          
          <h4 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
            See Innvikta InSAT in Action
          </h4>
          
          <p className="text-xs text-white/90 leading-relaxed font-medium">
            Explore how our interactive games, realistic phishing simulations, and gamified training modules dramatically reduce organizational human cyber risk.
          </p>
        </div>
        
        <div className="mt-8 relative z-10 text-[10px] text-white/70 font-semibold tracking-wider uppercase">
          © INNVIKTA SECURITY
        </div>
      </div>

      {/* Right panel - Form Fields */}
      <div className="md:w-[60%] p-6 md:p-8 bg-white flex-1">
        {/* Header indicator */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">YOUR DETAILS</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 !gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">FULL NAME</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                    errors.fullName ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                  } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                />
                <FiUser className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              </div>
              {errors.fullName && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.fullName}</p>}
            </div>

            {/* Corporate Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CORPORATE EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="jane@yourcompany.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                    errors.email ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                  } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                />
                <FiMail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.email}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">COMPANY NAME</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                    errors.company ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                  } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                />
                <FiBriefcase className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              </div>
              {errors.company && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.company}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PHONE NUMBER</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  className={`w-full !pl-4 !pr-10 !py-3 bg-slate-50 border ${
                    errors.phone ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                  } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all text-sm font-medium`}
                />
                <FiPhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-1 mb-0 font-bold">{errors.phone}</p>}
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 flex flex-col items-center sm:items-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-10 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 cursor-pointer w-full sm:w-auto"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="uppercase tracking-wider text-xs">
                  {isSubmitting ? "Submitting..." : "Book a Demo"}
                </span>
                {!isSubmitting && (
                  <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </div>
        </form>
      </div>
      <SuccessPopup 
        isOpen={isSuccess} 
        onClose={() => setIsSuccess(false)} 
        title="Demo Request Received!" 
        message="Thank you! Our team will contact you shortly to schedule your personalized live walkthrough." 
      />
    </div>
  );
};

export default BookDemo;
