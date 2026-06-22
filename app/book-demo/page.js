"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

const DemoPage = () => {
  const [form, setForm] = useState({
    fullName: "",
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
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;
    if (!form.phone) newErrors.phone = "Please fill the required field";
    if (!form.company) newErrors.company = "Please fill the required field";
    if (!form.teamSize) newErrors.teamSize = "Please fill the required field";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Demo request submitted successfully! Our team will contact you shortly.");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          teamSize: ""
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const metrics = [
    {
      value: "94%",
      title: "Training Engagement Rate",
      desc: "Drive daily behavior change with immersive, play-driven training pathways."
    },
    {
      value: "72%",
      title: "Phishing Resilience",
      desc: "Run realistic simulations that empower employees to detect complex social engineering vectors."
    },
    {
      value: "3.4×",
      title: "Higher Learning Retention",
      desc: "Transform corporate cybersecurity compliance into interactive habit building through Innvikta Arcade."
    }
  ];

  return (
    <GSAPWrapper>
      <div className="min-h-screen bg-[#fafafa]">
        {/* Header Banner (Proofpoint inspired layout, using Innvikta branding/colors) */}
        <div className="bg-[#f15a24] text-white py-12 relative overflow-hidden">
          {/* Background Decorative Rings & Dots */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-25 pointer-events-none">
            <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
              {/* Dotted curve */}
              <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
              {/* Thick solid ring */}
              <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
              {/* White solid curve */}
              <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
            </svg>
          </div>
          
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary">
                Request a Free Demo of <br />
                <span className="text-white">Innvikta InSAT</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="section py-16">
          <div className="container">
            <div className="row items-start justify-between px-6 md:px-12 lg:px-24">
              
              {/* Left Side: Plain Text Statistics (No Cards/Boxes) */}
              <div className="col-12 lg:col-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
                  Why Organizations Choose <span className="text-[#f15a24]">Innvikta</span>
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Innvikta helps enterprises build everyday secure behaviour across their workforce. Our platform transforms complex security training into engaging, gamified experiences.
                </p>

                {/* Plain Text Metrics List */}
                <div className="space-y-8 mb-10">
                  {metrics.map((metric, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <span className="text-3xl md:text-4xl font-extrabold text-[#f15a24] shrink-0 min-w-[75px] md:min-w-[90px]">
                        {metric.value}
                      </span>
                      <div>
                        <h4 className="font-bold text-dark text-lg leading-tight mb-1">
                          {metric.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {metric.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Client / Partner Logos Infinite Scroller */}
                <div className="pt-8 border-t border-slate-200 mt-8">
                  <span className="block text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-4">
                    TRUSTED BY
                  </span>
                  
                  {/* Infinite Marquee Container (Transparent Background) */}
                  <div className="relative w-full overflow-hidden py-4">
                    {/* Gradient overlay for fade effect matching page background */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
                    
                    <div className="flex gap-8 items-center animate-marquee whitespace-nowrap w-max">
                      {/* First set of logos */}
                      <div className="flex gap-8 items-center shrink-0">
                        <img src="/images/logo1.webp" alt="Client Logo 1" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo2.webp" alt="Client Logo 2" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo3.webp" alt="Client Logo 3" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo4.webp" alt="Client Logo 4" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo5.webp" alt="Client Logo 5" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo6.webp" alt="Client Logo 6" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo7.webp" alt="Client Logo 7" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo8.webp" alt="Client Logo 8" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                      </div>
                      {/* Duplicated set for seamless loop */}
                      <div className="flex gap-8 items-center shrink-0">
                        <img src="/images/logo1.webp" alt="Client Logo 1" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo2.webp" alt="Client Logo 2" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo3.webp" alt="Client Logo 3" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo4.webp" alt="Client Logo 4" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo5.webp" alt="Client Logo 5" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo6.webp" alt="Client Logo 6" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo7.webp" alt="Client Logo 7" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                        <img src="/images/logo8.webp" alt="Client Logo 8" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Inline stylesheet for keyframe scroller animation */}
                  <style jsx>{`
                    @keyframes marquee {
                      0% { transform: translateX(0%); }
                      100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                      animation: marquee 16s linear infinite;
                    }
                  `}</style>
                </div>

                {/* Sales Link Callout (Plain text instead of box) */}
                <div className="pt-8 border-t border-slate-200 mt-8">
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
                    Need custom enterprise requirements or terms? Reach out directly to our sales division at{" "}
                    <a href="mailto:sales@innvikta.com" className="text-[#f15a24] font-extrabold hover:underline">
                      sales@innvikta.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Side: Demo Request Form */}
              <div className="col-12 lg:col-5 relative">
                <div className="absolute inset-0 -m-8 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="relative bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] p-8 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-dark mb-2">
                      Request a Personalized <span className="text-[#f15a24]">Demo</span>
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Fill out the form below, and our cybersecurity experts will tailor a demo session for your team size and industry threat vectors.
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
                            {isSubmitting ? "Submitting..." : "Book A Demo"}
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
                      By submitting, you agree to receive follow-up information regarding the demo session.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
};

export default DemoPage;
