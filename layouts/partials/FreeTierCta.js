"use client";

import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const FreeTierCta = ({ data }) => {
  const { label, title, description, features, form: formData } = data;
  
  const [form, setForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    teamSize: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];

  const validateEmail = (email) => {
    if (!email) return "Please fill the required field";
    const domain = email.split("@")[1];
    if (freeDomains.includes(domain?.toLowerCase())) {
      return "Please use a work email address";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.fullName) newErrors.fullName = "Please fill the required field";
    if (!form.designation) newErrors.designation = "Please fill the required field";
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;
    if (!form.phone) newErrors.phone = "Please fill the required field";
    if (!form.company) newErrors.company = "Please fill the required field";
    if (!form.teamSize) newErrors.teamSize = "Please fill the required field";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Form submitted successfully!");
        setForm({
          fullName: "",
          designation: "",
          email: "",
          phone: "",
          company: "",
          teamSize: ""
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <section className="section relative overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container">
        <div className="row items-center justify-between px-6 md:px-12 lg:px-24">
          {/* Left Side Content */}
          <div className="col-12 lg:col-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary bg-primary/10 rounded-full uppercase">
              {label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark leading-[1.1] mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiCheck className="text-primary text-sm" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Ready</span>
               <div className="flex gap-6 items-center opacity-40 grayscale">
                  <span className="text-[10px] font-black tracking-tighter">SOC2</span>
                  <span className="text-[10px] font-black tracking-tighter">ISO 27001</span>
                  <span className="text-[10px] font-black tracking-tighter">GDPR</span>
               </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="col-12 lg:col-5 relative">
            <div className="absolute inset-0 -m-8 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[24px] p-8 md:p-10 text-left">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-dark mb-2">
                  Start Your Free <span className="text-primary">InSAT Workspace</span>
                </h3>
                <p className="text-slate-500 text-sm">
                  {formData.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(e) => setForm({...form, fullName: e.target.value})}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.fullName ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                  />
                  {errors.fullName && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Designation</label>
                  <select 
                    value={form.designation}
                    onChange={(e) => setForm({...form, designation: e.target.value})}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.designation ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="">Select designation</option>
                    <option>Director / VP</option>
                    <option>CISO / CSO / CIO</option>
                    <option>Manager / Lead</option>
                    <option>Engineer / Specialist</option>
                    <option>HR / Compliance Officer</option>
                    <option>Consultant / Advisor</option>
                    <option>Other / Executive</option>
                  </select>
                  {errors.designation && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.designation}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                  />
                  {errors.email && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.phone ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                  />
                  {errors.phone && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company</label>
                    <input 
                      type="text" 
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={(e) => setForm({...form, company: e.target.value})}
                      className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.company ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                    />
                    {errors.company && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Team Size</label>
                    <select 
                      value={form.teamSize}
                      onChange={(e) => setForm({...form, teamSize: e.target.value})}
                      className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.teamSize ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="">Select size</option>
                      <option>1–10</option>
                      <option>11–25</option>
                      <option>26–50</option>
                      <option>51–100</option>
                      <option>100–200</option>
                      <option>200–500</option>
                      <option>500–1000</option>
                      <option>1000–2000</option>
                      <option>2000+</option>
                    </select>
                    {errors.teamSize && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.teamSize}</p>}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-start">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative px-10 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="uppercase tracking-wider text-sm">
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </span>
                      {!isSubmitting && (
                        <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {formData.micro_trust}
                </p>
                <div className="mt-4 flex justify-center gap-3">
                   <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase tracking-tighter">SOC2 Ready</div>
                   <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase tracking-tighter">GDPR Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTierCta;
