"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import "../../styles/features/insat-core.scss";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@lib/gsap";
import { FiArrowRight, FiShield, FiBriefcase, FiLayers, FiActivity, FiGlobe, FiCheckCircle, FiTrendingUp, FiSettings, FiAward, FiMail, FiMonitor, FiImage, FiUsers, FiPieChart } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SuccessPopup from "@layouts/partials/SuccessPopup";



const PartnersPage = () => {
  const router = useRouter();
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
  const [showPopup, setShowPopup] = useState(false);
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
    if (!form.phone) {
      newErrors.phone = "Please fill the required field";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!form.companyName) newErrors.companyName = "Please fill the required field";
    if (!form.website) newErrors.website = "Please fill the required field";
    if (!form.employeeSize) newErrors.employeeSize = "Please fill the required field";
    if (!form.partnershipType) newErrors.partnershipType = "Please fill the required field";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "Partners",
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          company: form.companyName,
          team_size: form.employeeSize,
          message: form.message,
          payload: {
            website: form.website,
            partnershipType: form.partnershipType
          }
        })
      })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          router.push("/thank-you/partner");
        } else {
          alert("Error: " + (data.error || "Failed to submit partner request. Please try again."));
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert("An error occurred. Please try again later.");
      });
    } else {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.text-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
          const inputEl = firstErrorEl.parentElement.querySelector('input, select, textarea');
          if (inputEl) {
            inputEl.focus();
          }
        }
      }, 100);
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

  const getEmailError = () => {
    if (errors.email) return errors.email;
    if (form.email) {
      const emailErr = validateEmail(form.email);
      if (emailErr && emailErr !== "Please fill the required field") {
        return emailErr;
      }
    }
    return "";
  };

  const getPhoneError = () => {
    if (errors.phone) return errors.phone;
    if (form.phone && form.phone.length > 0 && form.phone.length < 10) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const isFullNameFilled = !!form.fullName.trim();
  const isEmailValid = !!form.email.trim() && !validateEmail(form.email);
  const isPhoneValid = /^\d{10}$/.test(form.phone);
  const isCompanyFilled = !!form.companyName.trim();
  const isWebsiteFilled = !!form.website.trim();
  const isEmployeeSizeSelected = !!form.employeeSize;
  const isPartnershipTypeSelected = !!form.partnershipType;

  return (
    <GSAPWrapper>
      <SeoMeta title="Innvikta Partners Program | MSP & Enterprise Partners" description="Partner with Innvikta to offer leading-edge security awareness training, phishing simulations, and human risk management." />
      <div ref={containerRef} className="insat-page insat-page-no-reset min-h-screen bg-[#fafafa]">
        
        <section className="partner-hero-section py-20 md:py-28 border-b border-slate-200 relative overflow-hidden">
          
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Content */}
              <div className="lg:col-span-7 hero-content">
                <span className="text-subheading">INNVIKTA PARTNER NETWORK</span>
                <h1 className="text-96-heading hero-title-custom mb-6">
                  Partner With Innvikta to<br />
                  Build <span className="text-[#f15a24]">Safer Workforces</span>
                </h1>
                <p className="text-20-content hero-paragraph max-w-2xl mb-8">
                  Join us in helping organizations make security awareness<br className="hidden md:inline" />
                  practical, engaging, measurable, and ready for<br className="hidden md:inline" />
                  real-world risk.
                </p>
                <div className="hero-actions-row">
                  <a 
                    href="#form" 
                    onClick={scrollToForm}
                    className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10"
                    style={{ padding: "14px 28px" }}
                  >
                    <span>Become a Partner</span>
                    <FiArrowRight className="text-sm" />
                  </a>
                  <a 
                    href="mailto:sale@innvikta.com" 
                    className="bg-slate-100 hover:bg-[#f15a24] border border-slate-200 hover:border-[#f15a24] text-slate-800 hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold"
                    style={{ padding: "14px 28px" }}
                  >
                    <FiMail className="text-sm" />
                    <span>Talk to Us</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <img 
                  src="/images/partner-hero.png" 
                  alt="Innvikta Partners Handshake" 
                  className="w-full max-w-[500px] h-auto object-contain rounded-2xl shadow-sm"
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
                <span className="text-subheading">PARTNER WITH INNVIKTA</span>
                <h2 className="text-52-heading mb-5">
                  Grow With a Modern <span className="text-[#f15a24]">Human Risk Platform</span>
                </h2>
                <p className="text-20-content text-slate-600 leading-relaxed">
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
                            <div className="w-10 h-10 rounded-xl bg-orange-50/50 text-[#f15a24] flex items-center justify-center group-hover:bg-[#f15a24] group-hover:!text-white group-hover:scale-110 transition-all duration-300 shadow-sm shrink-0">
                              <Icon className="text-lg" />
                            </div>
                            <h3 className="text-22-heading text-dark group-hover:text-[#f15a24] transition-colors duration-300">{benefit.title}</h3>
                          </div>
                          <p className="text-16-content text-slate-500 leading-relaxed">{benefit.desc}</p>
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
              <span className="text-subheading">CHANNEL & RESELLER PARTNERS</span>
              <h2 className="text-52-heading mb-5">
                Offer Innvikta to Clients Who Need <span className="text-[#f15a24]">Better Awareness Outcomes</span>
              </h2>
              <p className="text-20-content text-slate-600 leading-relaxed">
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
                    <h3 className="text-22-heading text-dark mb-3 min-h-[56px]">{partner.title}</h3>
                    <p className="text-16-content text-slate-500 leading-relaxed">{partner.desc}</p>
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
                <span className="text-subheading">PARTNER SUPPORT</span>
                <h2 className="text-52-heading mb-6">
                  Support That Helps You <span className="text-[#f15a24]">Sell and Deliver Better</span>
                </h2>
                <p className="text-20-content text-slate-600 mb-10 leading-relaxed">
                  We work closely with partners to help them position, present, and deliver Innvikta effectively.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  {supportIncludes.map((support, i) => {
                    const Icon = support.icon;
                    return (
                      <div key={i} className="flex items-center gap-3.5">
                        <Icon className="text-2xl text-[#f15a24] shrink-0" />
                        <span className="text-16-content text-slate-700">{support.text}</span>
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
                          <h4 className={`text-22-heading mb-1.5 transition-colors duration-500 ${isActive ? 'text-[#f15a24]' : 'text-slate-700'}`}>{step.title}</h4>
                          <p className={`text-16-content leading-relaxed transition-all duration-500 ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>{step.desc}</p>
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
                <div className="w-full lg:w-[38%] bg-[#f15a24] p-8 md:p-12 !text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h2 className="text-32-heading text-white mb-6">
                      Become an Innvikta Partner
                    </h2>
                    <p className="text-16-content text-white/90 leading-relaxed mb-8">
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
                        onChange={(e) => {
                          setForm({...form, fullName: e.target.value});
                          if (errors.fullName) setErrors({...errors, fullName: ""});
                        }}
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
                          onChange={(e) => {
                            setForm({...form, email: e.target.value});
                            if (errors.email && !validateEmail(e.target.value)) setErrors({...errors, email: ""});
                          }}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${(errors.email || getEmailError()) ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                        />
                        {getEmailError() && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{getEmailError()}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setForm({...form, phone: val});
                            if (errors.phone && val.length === 10) setErrors({...errors, phone: ""});
                          }}
                          maxLength={10}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${(errors.phone || getPhoneError()) ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
                        />
                        {getPhoneError() && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{getPhoneError()}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="Acme Inc."
                          value={form.companyName}
                          onChange={(e) => {
                            setForm({...form, companyName: e.target.value});
                            if (errors.companyName) setErrors({...errors, companyName: ""});
                          }}
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
                          onChange={(e) => {
                            setForm({...form, website: e.target.value});
                            if (errors.website) setErrors({...errors, website: ""});
                          }}
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
                          onChange={(e) => {
                            setForm({...form, employeeSize: e.target.value});
                            if (errors.employeeSize) setErrors({...errors, employeeSize: ""});
                          }}
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
                          onChange={(e) => {
                            setForm({...form, partnershipType: e.target.value});
                            if (errors.partnershipType) setErrors({...errors, partnershipType: ""});
                          }}
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
                        className="group relative px-6 md:px-10 py-3.5 bg-[#f15a24] hover:bg-orange-600 !text-white font-bold rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 whitespace-nowrap cursor-pointer"
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

        <SuccessPopup 
          isOpen={showPopup} 
          onClose={() => setShowPopup(false)} 
          title="Partner Request Received!" 
          message="Thank you for reaching out. Our partnerships team will review your details and contact you shortly." 
        />
        <style jsx global>{`
          .insat-page {
              --font-heading: var(--font-secondary), sans-serif;
              --font-body: var(--font-secondary), sans-serif;
              --color-forest-70: rgba(31, 41, 55, 0.7);
              --color-black-text: #1F2937;
              font-family: var(--font-body);
          }
          
          .insat-page h1,
          .insat-page h2,
          .insat-page h3,
          .insat-page h4,
          .insat-page h5,
          .insat-page h6 {
              font-weight: 400 !important;
          }

          /* Force Typography Class Sizes to override global styles */
          .insat-page .text-96-heading {
              font-size: clamp(2.5rem, 6vw, 5.5rem) !important;
              line-height: 0.95 !important;
              font-weight: 400 !important;
              letter-spacing: -0.02em !important;
              font-family: var(--font-heading) !important;
          }

          .insat-page .hero-title-custom {
              font-size: clamp(2.9rem, 4.8vw, 4.6rem) !important;
              line-height: 1.0 !important;
              margin-bottom: 1.25rem !important;
              font-weight: 400 !important;
              letter-spacing: -0.02em !important;
          }

          .insat-page .text-52-heading {
              font-size: clamp(2rem, 4vw, 3.25rem) !important;
              line-height: 1.1 !important;
              font-weight: 400 !important;
              letter-spacing: -0.02em !important;
              font-family: var(--font-heading) !important;
          }

          .insat-page .text-32-heading {
              font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
              line-height: 1.2 !important;
              font-weight: 400 !important;
              letter-spacing: -0.01em !important;
              font-family: var(--font-heading) !important;
          }

          .insat-page .text-22-heading {
              font-size: clamp(1.2rem, 1.5vw, 1.375rem) !important;
              line-height: 1.3 !important;
              font-weight: 400 !important;
              font-family: var(--font-heading) !important;
          }

          .insat-page .text-subheading {
              font-size: 1.125rem !important;
              font-weight: 600 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.06em !important;
              color: var(--color-forest-70) !important;
              margin-bottom: 1.25rem !important;
              display: inline-block !important;
          }

          .insat-page .text-20-content {
              font-size: clamp(1.2rem, 1.65vw, 1.35rem) !important;
              line-height: 1.5 !important;
              opacity: 0.8 !important;
          }

          .insat-page .text-16-content {
              font-size: 1.125rem !important;
              line-height: 1.5 !important;
          }

          .insat-page .hero-actions-row {
              margin-top: 1.25rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: flex-start !important;
              flex-wrap: wrap !important;
              gap: 1.25rem !important;
          }
          @media (max-width: 767px) {
              .insat-page .hero-actions-row {
                  margin-top: 1.25rem !important;
                  justify-content: flex-start !important;
                  gap: 1rem !important;
              }
          }

           .partner-hero-section {
              background-color: #F6F5F8 !important;
          }

          /* Restore submit button styling on the page from global resets */
          .insat-page button[type="submit"] {
              background-color: #f15a24 !important;
              color: #ffffff !important;
          }
          .insat-page button[type="submit"]:hover {
              background-color: #d54e1c !important;
          }
        `}</style>
      </div>
    </GSAPWrapper>
  );
};

export default PartnersPage;