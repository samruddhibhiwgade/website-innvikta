"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@lib/gsap";
import { FiArrowRight, FiShield, FiBriefcase, FiLayers, FiActivity, FiGlobe, FiCheckCircle, FiTrendingUp, FiSettings, FiAward, FiMail, FiMonitor, FiImage, FiUsers, FiPieChart } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

const heading96Style = {
  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
  lineHeight: '0.95',
  fontWeight: '400',
  letterSpacing: '-0.02em',
  fontFamily: "'Satoshi', sans-serif"
};

const heading52Style = {
  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
  lineHeight: '1.1',
  fontWeight: '400',
  letterSpacing: '-0.02em',
  fontFamily: "'Satoshi', sans-serif"
};

const PartnersPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    employeeSize: "",
    partnershipType: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Content Entrance Animation
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-visual",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
    if (!form.companyName) newErrors.companyName = "Please fill the required field";
    if (!form.website) newErrors.website = "Please fill the required field";
    if (!form.employeeSize) newErrors.employeeSize = "Please fill the required field";
    if (!form.partnershipType) newErrors.partnershipType = "Please fill the required field";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Thank you for your partner request! Our team will get in touch with you shortly.");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          website: "",
          employeeSize: "",
          partnershipType: "",
          message: ""
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById("form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      title: "Modern Offering",
      desc: "Awareness, simulations, compliance journeys, gamified learning, and reporting in one platform.",
      icon: FiLayers
    },
    {
      title: "Enterprise-Relevant",
      desc: "Built for organizations that need measurable employee readiness, not just content completion.",
      icon: FiTrendingUp
    },
    {
      title: "Flexible Delivery",
      desc: "Programs can be aligned to client policies, roles, industries, and risk priorities.",
      icon: FiSettings
    },
    {
      title: "Growth Support",
      desc: "We support partner conversations with demos, proposals, client presentations, and onboarding guidance.",
      icon: FiAward
    }
  ];

  const whoCanPartner = [
    {
      title: "Cybersecurity Consultants",
      desc: "Add awareness, simulation, and human risk programs to your advisory services.",
      icon: FiShield
    },
    {
      title: "IT & Security Service Providers",
      desc: "Offer clients a platform-led solution for employee cyber readiness.",
      icon: FiLayers
    },
    {
      title: "Compliance Advisors",
      desc: "Support clients with policy learning, compliance journeys, and audit-ready records.",
      icon: FiCheckCircle
    },
    {
      title: "Training & LMS Providers",
      desc: "Expand your portfolio with cybersecurity awareness and simulation-led learning.",
      icon: FiBriefcase
    }
  ];

  const supportIncludes = [
    { text: "Product demos and walkthroughs", icon: FiMonitor },
    { text: "Sales and proposal support", icon: FiTrendingUp },
    { text: "Custom client presentations", icon: FiLayers },
    { text: "Co-branded campaign assets", icon: FiImage },
    { text: "Onboarding guidance", icon: FiUsers },
    { text: "Client reporting support", icon: FiPieChart }
  ];

  const steps = [
    {
      step: "01",
      title: "Apply",
      desc: "Submit your details via the partner interest form."
    },
    {
      step: "02",
      title: "Align",
      desc: "Meet with our partnership team to explore synergies, tier opportunities, and requirements."
    },
    {
      step: "03",
      title: "Go to Market",
      desc: "Access portal resources, technical training, and start expanding client portfolios."
    }
  ];

  return (
    <GSAPWrapper>
      <div ref={containerRef} className="min-h-screen bg-[#fafafa]">
        
        {/* HERO SECTION */}
        <section className="bg-[#111827] text-white py-20 md:py-24 border-b border-slate-800 relative overflow-hidden">
          
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-8 hero-content">
                <span style={{ color: '#FFFFFFB3', fontSize: '1.125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', display: 'inline-block' }}>INNVIKTA PARTNER NETWORK</span>
                <h1 style={{ fontSize: 'clamp(2.3rem, 5.5vw, 4.5rem)', lineHeight: '1.05', fontWeight: '400', letterSpacing: '-0.02em', fontFamily: "'Satoshi', sans-serif" }} className="text-white mb-6">
                  <span className="block md:whitespace-nowrap">Partner With Innvikta to</span>
                  <span className="block md:whitespace-nowrap">Build <span className="text-[#f15a24]">Safer Workforces</span></span>
                </h1>
                <p className="text-20-content text-slate-300 mb-10 max-w-2xl leading-relaxed">
                  Join us in helping organizations make security awareness practical, engaging, measurable, and ready for real-world risk.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="#form" 
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#f15a24] hover:bg-orange-600 text-white border-2 border-[#f15a24] hover:border-orange-600 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Become a Partner</span>
                    <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a 
                    href="mailto:sale@innvikta.com" 
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700 text-white border-2 border-slate-700/50 hover:border-slate-600 font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <FiMail className="text-lg text-slate-400 group-hover:text-white transition-colors duration-300" />
                    <span>Talk to Us</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Partnership Illustration */}
              <div className="lg:col-span-4 relative w-full flex justify-center hero-visual">
                <div className="absolute inset-0 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none" />
                <img 
                  src="/images/partnership_hero.png" 
                  alt="Innvikta Partner Network Collaboration" 
                  className="w-full max-w-[380px] h-auto object-contain transform hover:scale-102 transition-transform duration-500"
                />
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 1: GROW WITH A MODERN HUMAN RISK PLATFORM */}
        <section className="py-20 border-b border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading and Description */}
              <div className="lg:col-span-5">
                <span style={{ color: '#1F2937B3', fontSize: '1.125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', display: 'inline-block' }}>PARTNER WITH INNVIKTA</span>
                <h2 style={heading52Style} className="text-slate-900 mb-5">
                  Grow With a Modern <span className="text-[#f15a24]">Human Risk Platform</span>
                </h2>
                <p className="text-18-content text-slate-600 leading-relaxed">
                  Cyber threats are becoming more personal, AI-driven, and employee-focused. Innvikta gives partners a strong offering to help clients build safer behaviour across their workforce.
                </p>
              </div>

              {/* Right Column: 2x2 Grid of Cards */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={i} className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-[#f15a24] transition-colors duration-300" />
                        
                        <div>
                          {/* Icon Beside Heading */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50/50 text-[#f15a24] flex items-center justify-center group-hover:bg-[#f15a24] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm shrink-0">
                              <Icon className="text-lg" />
                            </div>
                            <h3 className="text-base font-bold text-dark font-secondary group-hover:text-[#f15a24] transition-colors duration-300 leading-snug">{benefit.title}</h3>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">{benefit.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: CHANNEL & RESELLER PARTNERS */}
        <section id="reseller" className="py-20 bg-white border-b border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span style={{ color: '#1F2937B3', fontSize: '1.125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', display: 'inline-block' }}>CHANNEL & RESELLER PARTNERS</span>
              <h2 style={heading52Style} className="text-slate-900 mb-5">
                Offer Innvikta to Clients Who Need <span className="text-[#f15a24]">Better Awareness Outcomes</span>
              </h2>
              <p className="text-18-content text-slate-600 leading-relaxed">
                Innvikta is ideal for partners serving cybersecurity, IT, compliance, HR, learning, and enterprise risk teams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {whoCanPartner.map((partner, i) => {
                const Icon = partner.icon;
                return (
                  <div key={i} className="text-center transition-all duration-300">
                    <div className="text-3xl text-[#f15a24] mb-5 flex justify-center">
                      <Icon />
                    </div>
                    <h3 className="font-bold text-dark text-lg md:text-xl mb-3 leading-snug font-secondary min-h-[56px]">{partner.title}</h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">{partner.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: PARTNER SUPPORT & JOURNEY */}
        <section id="support" className="py-20">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <span style={{ color: '#1F2937B3', fontSize: '1.125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', display: 'inline-block' }}>PARTNER SUPPORT</span>
                <h2 style={heading52Style} className="text-slate-900 mb-6">
                  Support That Helps You <span className="text-[#f15a24]">Sell and Deliver Better</span>
                </h2>
                <p className="text-18-content text-slate-600 mb-10 leading-relaxed">
                  We work closely with partners to help them position, present, and deliver Innvikta effectively.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  {supportIncludes.map((support, i) => {
                    const Icon = support.icon;
                    return (
                      <div key={i} className="flex items-center gap-3.5">
                        <Icon className="text-2xl text-[#f15a24] shrink-0" />
                        <span className="text-sm font-bold text-slate-700">{support.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3-Step Journey */}
              <div className="py-4 lg:pl-8">
                <span className="block lg:hidden text-sm font-black text-slate-500 uppercase tracking-[0.15em] mb-8">PARTNER JOURNEY</span>
                <div className="space-y-12 relative before:absolute before:left-[28px] before:top-4 before:bottom-4 before:border-l-2 before:border-dashed before:border-slate-200">
                  {/* Glowing progress line overlay */}
                  <div 
                    className="absolute left-[28px] border-l-2 border-dashed border-[#f15a24] transition-all duration-500 ease-in-out"
                    style={{
                      top: '16px',
                      height: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%',
                    }}
                  />
                  {steps.map((step, i) => {
                    const isActive = activeStep === i;
                    return (
                      <div 
                        key={i} 
                        className={`flex items-start gap-6 relative z-10 transition-all duration-500 cursor-pointer ${isActive ? '' : 'opacity-60'}`}
                        onClick={() => setActiveStep(i)}
                      >
                        <div className={`w-14 h-14 rounded-full font-extrabold flex items-center justify-center shrink-0 border-4 border-white transition-all duration-500 ${isActive ? 'bg-[#f15a24] text-white scale-110 shadow-md shadow-orange-500/20' : 'bg-slate-100 text-slate-400'}`}>
                          {step.step}
                        </div>
                        <div className={`transition-all duration-500 ${isActive ? 'translate-x-2' : ''}`}>
                          <h4 className={`font-bold text-lg mb-1.5 transition-colors duration-500 ${isActive ? 'text-[#f15a24]' : 'text-slate-700'}`}>{step.title}</h4>
                          <p className={`text-slate-500 text-sm leading-relaxed transition-all duration-500 ${isActive ? 'text-slate-700 font-medium' : ''}`}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: PARTNER INTEREST FORM */}
        <section id="form" className="py-20 bg-white border-t border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="relative max-w-5xl mx-auto bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden p-0">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left side panel: Orange background */}
                <div className="w-full lg:w-[38%] bg-[#f15a24] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: '500', letterSpacing: '-0.02em' }} className="text-3xl md:text-4xl text-white mb-6 leading-tight">
                      Become an Innvikta Partner
                    </h2>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8">
                      Tell us a little about your organization and how you would like to partner with us.
                    </p>
                  </div>
                  
                  <div className="relative z-10 space-y-5 pt-6 border-t border-white/20 mt-6 lg:mt-12">
                    <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
                      <FiMail className="text-xl shrink-0" />
                      <a href="mailto:sale@innvikta.com" className="font-semibold text-sm md:text-base hover:underline">
                        sale@innvikta.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <FiGlobe className="text-xl shrink-0" />
                      <span className="font-semibold text-sm md:text-base">Global Partner Network</span>
                    </div>
                  </div>
                </div>

                {/* Right side panel: The Form */}
                <div className="w-full lg:w-[62%] p-8 md:p-10 bg-white">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="Acme Inc."
                          value={form.companyName}
                          onChange={(e) => setForm({...form, companyName: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.companyName ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                        />
                        {errors.companyName && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.companyName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company Website</label>
                        <input 
                          type="text" 
                          placeholder="https://company.com"
                          value={form.website}
                          onChange={(e) => setForm({...form, website: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.website ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                        />
                        {errors.website && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.website}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Employee Size</label>
                        <select 
                          value={form.employeeSize}
                          onChange={(e) => setForm({...form, employeeSize: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.employeeSize ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">Select size</option>
                          <option>1–10</option>
                          <option>11–50</option>
                          <option>51–200</option>
                          <option>201–500</option>
                          <option>501–1000</option>
                          <option>1000+</option>
                        </select>
                        {errors.employeeSize && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.employeeSize}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Partnership Type</label>
                        <select 
                          value={form.partnershipType}
                          onChange={(e) => setForm({...form, partnershipType: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.partnershipType ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">Select type</option>
                          <option>Channel Partner / Reseller</option>
                          <option>Managed Service Provider (MSP)</option>
                          <option>Consulting & Advisory Partner</option>
                          <option>Technology / Integration Partner</option>
                        </select>
                        {errors.partnershipType && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.partnershipType}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Tell us about your organization (Optional)</label>
                      <textarea 
                        rows="4"
                        placeholder="Briefly describe your business model and target clients..."
                        value={form.message}
                        onChange={(e) => setForm({...form, message: e.target.value})}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-start">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group relative px-6 md:px-10 py-3.5 bg-[#f15a24] hover:bg-[#f15a24]/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 whitespace-nowrap"
                      >
                        <div className="relative z-10 flex items-center gap-2">
                          <span className="uppercase tracking-wider text-sm whitespace-nowrap">
                            {isSubmitting ? "Submitting..." : "Become a Partner"}
                          </span>
                          {!isSubmitting && (
                            <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </GSAPWrapper>
  );
};

export default PartnersPage;
