"use client";

import React, { useState } from "react";
import { FiCheckCircle, FiArrowRight, FiFileText, FiImage, FiMonitor, FiLayers, FiPlay, FiSmile, FiShield, FiLock, FiAlertTriangle, FiCheck, FiBriefcase } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Link from "next/link";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import "../../../styles/insat.scss";

// FAQ Questions & Factual Answers
const faqData = [
  {
    q: "What is Cybersecurity Awareness Month?",
    a: "Cybersecurity Awareness Month is a global initiative held annually in October to raise awareness about digital safety, human risk, and the importance of cybersecurity education. It encourages public and private organizations to provide resources that improve security habits."
  },
  {
    q: "Why is cybersecurity awareness important?",
    a: "Human error or credential exposure accounts for over 80% of security incidents. Improving employee awareness reduces organizational risk by teaching people to recognize threats before clicking or sharing information."
  },
  {
    q: "What is included in the toolkit?",
    a: "The toolkit contains ready-to-use digital awareness posters, infographics, screensaver templates, baseline awareness modules, and access instructions to interactive cybersecurity games from Innvikta Arcade."
  },
  {
    q: "Who can use these resources?",
    a: "Any organization looking to improve employee security habits can use this toolkit. It is designed for IT teams, HR departments, security professionals, and compliance managers."
  },
  {
    q: "When will the toolkit be available?",
    a: "The campaign toolkit resources will be fully delivered to registered email addresses starting early October 2026."
  }
];

const toolkitItems = [
  {
    title: "Awareness Posters",
    desc: "Ready-to-use posters to promote safe behavior across your organization.",
    icon: FiFileText
  },
  {
    title: "Infographics",
    desc: "Simple visuals explaining key cybersecurity topics.",
    icon: FiImage
  },
  {
    title: "Screensavers",
    desc: "Awareness messages for employee devices.",
    icon: FiMonitor
  },
  {
    title: "Awareness Modules",
    desc: "Structured cybersecurity awareness modules covering phishing, social engineering, and cyber hygiene.",
    icon: FiLayers
  },
  {
    title: "Interactive Games",
    desc: "Engaging, scenario-based games designed to reinforce learning and improve employee participation.",
    icon: FiPlay
  },
  {
    title: "Engagement Activities",
    desc: "Simple activities to encourage participation and awareness.",
    icon: FiSmile
  }
];

export default function CyberAwarenessMonthCampaignPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    title: "",
    industry: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!form.company) newErrors.company = "Please fill the required field";
    if (!form.title) newErrors.title = "Please fill the required field";
    if (!form.industry) newErrors.industry = "Please fill the required field";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <GSAPWrapper>
      {/* Structured FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      <div className="min-h-screen w-full overflow-x-hidden bg-[#fafafa] text-slate-800 font-sans selection:bg-[#f15a24] selection:text-white">
        
        {/* ================= SECTION 1: HERO ================= */}
        <div className="bg-[#f15a24] text-white py-20 relative overflow-hidden">
          {/* Background Decorative Rings */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-20 pointer-events-none">
            <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
              <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
              <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
              <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
            </svg>
          </div>
          
          <div className="w-full px-6 md:px-12 lg:px-24 max-w-none">
            <div className="max-w-4xl space-y-6">
              <span className="inline-block px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#f15a24] bg-white rounded-full">
                October 2026 Campaign
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary">
                CYBERSECURITY AWARENESS MONTH 2026
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/90">
                Practical Awareness Resources for Your Organization
              </h2>
              <p className="text-base md:text-lg text-white/95 leading-relaxed max-w-2xl">
                Get ready for October with ready-to-use cybersecurity awareness materials, structured awareness modules, and interactive games designed to help your organization improve employee awareness and reduce human risk.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#register" 
                  className="group px-8 py-4 bg-white text-[#f15a24] font-extrabold text-sm rounded-full uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
                >
                  Download Toolkit <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
                <a 
                  href="#register" 
                  className="px-8 py-4 bg-[#f15a24] border border-white hover:bg-white hover:text-[#f15a24] text-white font-extrabold text-sm rounded-full uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Updates
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: WHAT YOU WILL GET ================= */}
        <section className="section py-20 bg-white border-b border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mb-16 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f15a24]">Included Resources</span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark font-secondary">
                Cybersecurity Awareness Toolkit
              </h2>
              <p className="text-slate-650 text-base md:text-lg leading-relaxed">
                Everything you need to run an effective awareness campaign.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr_1.25fr] gap-4 w-full">
              {[
                { ...toolkitItems[0], span: "md:col-span-2", label: "CAMPAIGN RESOURCE" },
                { ...toolkitItems[1], span: "md:col-span-1", label: "" },
                { ...toolkitItems[2], span: "md:col-span-1", label: "" },
                { ...toolkitItems[3], span: "md:col-span-2", label: "OCTOBER FOCUS" },
                { ...toolkitItems[4], span: "md:col-span-2", label: "INNVIKTA ARCADE" },
                { ...toolkitItems[5], span: "md:col-span-1", label: "" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group relative transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center p-6 text-center overflow-hidden col-span-1 ${item.span}`}
                  style={{
                    backgroundColor: "#FFFBF7",
                    border: "1px solid #FFEAD4",
                    borderRadius: "16px",
                    gap: "0.25rem",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f15a24";
                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(241, 90, 36, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#FFEAD4";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div 
                    className="flex items-center justify-center transition-all duration-300" 
                    style={{
                      backgroundColor: "#FFEFEA",
                      padding: "0.5rem",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      minWidth: "40px",
                      minHeight: "40px",
                      marginBottom: "0.5rem",
                      color: "#f15a24"
                    }}
                  >
                    <item.icon className="text-xl" />
                  </div>

                  <h3 
                    style={{
                      marginTop: "0px",
                      marginBottom: "0.25rem",
                      fontSize: "1.05rem",
                      fontWeight: "750",
                      color: "#1E293B",
                      lineHeight: "1.2"
                    }}
                    className="transition-colors duration-300 group-hover:text-[#f15a24]"
                  >
                    {item.title}
                  </h3>

                  <p 
                    style={{
                      fontSize: "0.85rem",
                      color: "#334155",
                      marginTop: "0px",
                      marginBottom: "0px",
                      lineHeight: "1.4"
                    }}
                  >
                    {item.desc}
                  </p>

                  {item.label && (
                    <span 
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "700",
                        color: "#94A3B8",
                        marginTop: "0.5rem",
                        marginBottom: "0px",
                        letterSpacing: "0.08em"
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: WHY IT MATTERS ================= */}
        <section className="section py-20 bg-white border-b border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            {/* Top row: 2-column heading and description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" style={{ marginBottom: "4.5rem" }}>
              <div className="lg:col-span-6" style={{ textAlign: "left" }}>
                <span className="text-subheading" style={{ color: "#f15a24", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>THE CHALLENGE</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                  Why Cybersecurity <br />
                  Awareness <span style={{ color: "#f15a24" }}>Matters</span>
                </h2>
              </div>
              <div className="lg:col-span-6" style={{ textAlign: "left", paddingTop: "1.5rem" }}>
                <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0, color: "#475569" }}>
                  Cyber threats continue to target employees through phishing, social engineering, and other tactics. Awareness helps employees recognize risks and make safer decisions.
                </p>
              </div>
            </div>

            {/* Bottom row: 2x2 grid of cards with left borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Phishing Awareness",
                  desc: "Recognize deceptive links, mock credentials, and spoofed senders.",
                  color: "#f15a24"
                },
                {
                  title: "Social Engineering",
                  desc: "Identify psychological manipulation, urgency cues, and live voice pressure.",
                  color: "#f15a24"
                },
                {
                  title: "Credential Safety",
                  desc: "Maintain secure sign-ins, avoid single sign-on triggers, and handle MFA safely.",
                  color: "#f15a24"
                },
                {
                  title: "Safe Digital Behavior",
                  desc: "Build healthy everyday habits around remote setups, shadow tools, and data privacy.",
                  color: "#f15a24"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "transparent",
                    borderLeft: `3px solid ${item.color}`,
                    padding: "0.5rem 0 0.5rem 1.75rem",
                    textAlign: "left",
                    transition: "all 0.3s ease"
                  }}
                >
                  <h3 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "1.05rem", color: "#6B7280", lineHeight: "1.6", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: WHO THIS IS FOR ================= */}
        <section className="section py-20 bg-white border-b border-slate-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mb-16 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f15a24]">Target Audience</span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark font-secondary">
                Who Should Use This Toolkit
              </h2>
              <p className="text-slate-650 text-base md:text-lg leading-relaxed">
                Any organization looking to improve employee cybersecurity awareness can benefit from these resources.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { 
                  title: "Organizations of all sizes", 
                  desc: "Strengthen user perimeters across small operations or large multi-site enterprises.",
                  icon: FiShield
                },
                { 
                  title: "IT and Security Teams", 
                  desc: "Deploy ready campaign materials without stretching active IT management hours.",
                  icon: FiLayers
                },
                { 
                  title: "HR and Training Teams", 
                  desc: "Easily run visual onboarding programs, visual modules, and team activities.",
                  icon: FiCheckCircle
                },
                { 
                  title: "Compliance Teams", 
                  desc: "Gather baseline logs and proof-of-awareness materials to satisfy security audit mandates.",
                  icon: FiBriefcase
                }
              ].map((audience, idx) => (
                <div key={idx} className="text-center flex flex-col items-center">
                  <div className="mb-5 text-[#f15a24] text-3xl">
                    <audience.icon />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E293B] mb-3 leading-snug max-w-[200px]">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[240px]">
                    {audience.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: REGISTER FOR TOOLKIT ================= */}
        <section id="register" className="section py-20 bg-slate-50/30 border-b border-slate-100 relative">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="row items-center justify-between">
              
              <div className="col-12 lg:col-6 mb-12 lg:mb-0 space-y-6 pr-0 lg:pr-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#f15a24]">Instant Access Registration</span>
                <h2 className="text-3xl md:text-5xl font-bold text-dark font-secondary">
                  Get the Cybersecurity Awareness Toolkit
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Register to receive updates and access to awareness materials, structured modules, and interactive games for Cybersecurity Awareness Month.
                </p>
                
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#f15a24] text-lg shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">100% Free Campaign Assets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#f15a24] text-lg shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">No CC requirements or sales pressure</span>
                  </div>
                </div>
              </div>

              <div className="col-12 lg:col-5 relative">
                <div className="absolute inset-0 -m-8 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="relative bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="text-4xl text-[#f15a24]" />
                      </div>
                      <h3 className="text-2xl font-bold text-dark mb-4">Registration Complete!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Thank you for signing up. We will deliver the campaign toolkit download links directly to your registered work email starting early October 2026.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          value={form.fullName}
                          onChange={(e) => setForm({...form, fullName: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.fullName ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all`}
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
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all`}
                        />
                        {errors.email && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company</label>
                          <input 
                            type="text" 
                            placeholder="Acme Inc."
                            value={form.company}
                            onChange={(e) => setForm({...form, company: e.target.value})}
                            className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.company ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all`}
                          />
                          {errors.company && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.company}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Job Title</label>
                          <input 
                            type="text" 
                            placeholder="Security Specialist"
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.title ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all`}
                          />
                          {errors.title && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.title}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Industry</label>
                        <select 
                          value={form.industry}
                          onChange={(e) => setForm({...form, industry: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.industry ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">Select industry</option>
                          <option>Technology</option>
                          <option>Finance & Banking</option>
                          <option>Healthcare</option>
                          <option>Education</option>
                          <option>Manufacturing</option>
                          <option>Government</option>
                          <option>Professional Services</option>
                          <option>Other Sector</option>
                        </select>
                        {errors.industry && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.industry}</p>}
                      </div>

                      <div className="pt-2 flex justify-start">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="group relative px-10 py-3.5 bg-[#f15a24] hover:bg-[#f15a24]/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 whitespace-nowrap cursor-pointer"
                        >
                          <div className="relative z-10 flex items-center gap-2">
                            <span className="uppercase tracking-wider text-sm">
                              {isSubmitting ? "Registering..." : "Download Toolkit"}
                            </span>
                            {!isSubmitting && (
                              <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                            )}
                          </div>
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 6: FAQ HUB (InSAT Styled) ================= */}
        <div className="insat-page">
          <section className="bg-grey-5 py-20">
            <div className="container faq-grid max-w-none px-6 md:px-12 lg:px-24">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading font-secondary">Frequently Asked Questions</h2>
              </div>

              <div className="faq-list-col animate from-right">
                {faqData.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                      <button
                        type="button"
                        className="faq-trigger"
                        aria-expanded={isOpen}
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                      >
                        <span className="faq-question">{faq.q}</span>
                        <div className="faq-icon-wrapper">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                            <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                          </svg>
                        </div>
                      </button>
                      <div 
                        className="faq-panel"
                        style={{ 
                          maxHeight: isOpen ? "150px" : "0px", 
                          opacity: isOpen ? 1 : 0, 
                          transition: "all 0.3s ease",
                          overflow: "hidden"
                        }}
                      >
                        <div className="faq-panel-inner">
                          <div className="faq-answer">
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* ================= SECTION 7: FINAL CTA ================= */}
        <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem", backgroundColor: "#ffffff" }}>
          <div className="container-xl">
            <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
              <div className="animate">
                <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto" }}>
                  Be Ready for October
                </h2>
                <p className="mt-10 font-primary text-base text-slate-650 leading-relaxed max-w-xl mx-auto" style={{ marginTop: "2.5rem" }}>
                  Prepare your organization with practical cybersecurity awareness resources, including modules and interactive learning experiences.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in" style={{ marginTop: "2.5rem" }}>
                  <Link href="/contact" className="btn btn-primary btn-cta inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <span className="hover-sweep"></span>
                    <span>Contact Us</span>
                    <div className="arrow-wrapper">
                      <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
                <div className="animate-wave absolute inset-0 w-full h-full">
                  <ImageFallback
                    src="/images/wave.svg"
                    fill={true}
                    sizes="100vw"
                    alt="bg wave"
                  />
                </div>
                <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
                <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
                <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </GSAPWrapper>
  );
}
