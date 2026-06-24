"use client";

import { useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import "../../styles/insat.scss";

const StartFreePage = () => {
  const [form, setForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    expectedUsers: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

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
    if (!form.expectedUsers) newErrors.expectedUsers = "Please fill the required field";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const keyBenefits = [
    {
      title: "Free Security Awareness Training Modules",
      desc: "Access essential training pathways and standard modules to begin educating employees on baseline security rules."
    },
    {
      title: "Interactive Cybersecurity Game",
      desc: "Test security knowledge retention using a play-driven arcade game that makes learning fun and engaging."
    },
    {
      title: "Free Phishing Templates",
      desc: "Browse and access our comprehensive library of pre-configured, realistic simulated phishing email templates."
    },
    {
      title: "Dashboard Insights",
      desc: "Monitor overall training progress, active users, and core baseline awareness metrics in a centralized view."
    },
    {
      title: "Detailed Reports",
      desc: "Track employee engagement and learning scores, compiling logs to build audit-ready compliance evidence."
    }
  ];

  const faqData = [
    {
      question: "What is included in the free plan?",
      answer: "The free plan gives you immediate access to security awareness training modules, interactive cybersecurity games, a library of phishing email templates, and the Innvikta platform dashboard. You can start educating employees, running awareness activities, and exploring the platform without any upfront commitment."
    },
    {
      question: "Who is the free plan designed for?",
      answer: "The free plan is ideal for organizations that want to evaluate security awareness training before rolling out a larger program. Whether you're part of IT, cybersecurity, compliance, HR, or leadership, you can use it to improve employee awareness and assess engagement with security initiatives."
    },
    {
      question: "Do I need cybersecurity expertise to get started?",
      answer: "No. Innvikta is designed for organizations with or without dedicated security teams. Training content, games, and phishing templates are ready to use, allowing you to launch awareness activities quickly without specialized cybersecurity knowledge."
    },
    {
      question: "Can I upgrade as my program grows?",
      answer: "Yes. As your awareness program matures, you can upgrade to unlock advanced phishing simulations, automated campaigns, compliance-focused learning paths, detailed reporting, user segmentation, and human risk intelligence capabilities."
    },
    {
      question: "How long does it take to get started?",
      answer: "Most organizations can create an account and access training content within a few minutes. There is no complex setup process, allowing you to start building cybersecurity awareness across your workforce immediately."
    },
    {
      question: "Are the training modules suitable for non-technical employees?",
      answer: "Yes. The content is designed for employees across all departments and technical skill levels. Modules focus on real-world cyber threats such as phishing, social engineering, password security, data protection, and emerging AI-powered attacks using simple, easy-to-understand learning formats."
    },
    {
      question: "What makes Innvikta different from traditional awareness training?",
      answer: "Innvikta combines training, phishing simulations, and gamified learning in a single platform. Instead of relying solely on videos or presentations, employees learn through interactive experiences that improve engagement, retention, and long-term security behavior."
    }
  ];

  return (
    <GSAPWrapper>
      <div className="min-h-screen bg-[#fafafa]">
        {/* Banner Section */}
        <div className="bg-[#f15a24] text-white py-12 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-25 pointer-events-none">
            <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
              <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
              <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
              <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
            </svg>
          </div>
          
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary">
                Start Free Trial
              </h1>
              <p className="mt-4 text-white/95 text-lg md:text-xl font-medium">
                Free for up to 50 users. No credit card required.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="section py-16 border-b border-slate-100">
          <div className="container">
            <div className="row items-start justify-between px-6 md:px-12 lg:px-24">
              
              {/* Left Side: Value Propositions */}
              <div className="col-12 lg:col-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
                  Build Safe Workforces <span className="text-[#f15a24]">Starting Today</span>
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Join the platform to run simulations, evaluate compliance benchmarks, and track training retention scores inside your company for free.
                </p>

                <div className="space-y-8 mb-10">
                  {keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <FiCheckCircle className="text-3xl text-[#f15a24] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-dark text-lg leading-tight mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Callout Section */}
                <div className="pt-8 border-t border-slate-200 mt-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    Start <span className="text-[#f15a24]">Security Awareness Training</span> Today
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    Start building a stronger security culture with free awareness training modules, cybersecurity games. Create your account and get started in minutes.
                  </p>
                </div>

                {/* Sales Callout */}
                <div className="pt-6 border-t border-slate-200 mt-6">
                  <p className="text-slate-750 text-base leading-relaxed font-medium">
                    Need custom enterprise parameters or advanced integrations? Contact our sales team directly at{" "}
                    <a href="mailto:sale@innvikta.com" className="text-[#f15a24] font-extrabold hover:underline">
                      sale@innvikta.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Side: Form Container Card */}
              <div className="col-12 lg:col-5 relative">
                <div className="absolute inset-0 -m-8 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="relative bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] p-8 md:p-10">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="text-4xl text-[#f15a24]" />
                      </div>
                      <h3 className="text-2xl font-bold text-dark mb-4">Request Submitted!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Thank you for signing up. We will review your company details and send your dedicated free tier tenant setup link to your email shortly.
                      </p>
                    </div>
                  ) : (
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

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company Name</label>
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
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Expected Number of Users</label>
                        <select 
                          value={form.expectedUsers}
                          onChange={(e) => setForm({...form, expectedUsers: e.target.value})}
                          className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.expectedUsers ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">Select size</option>
                          <option>1–10 Users</option>
                          <option>11–50 Users</option>
                          <option>51–200 Users</option>
                          <option>201–500 Users</option>
                          <option>500+ Users</option>
                        </select>
                        {errors.expectedUsers && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.expectedUsers}</p>}
                      </div>

                      <div className="pt-2 flex justify-start">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="group relative px-6 md:px-10 py-3.5 bg-[#f15a24] hover:bg-[#f15a24]/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 whitespace-nowrap"
                        >
                          <div className="relative z-10 flex items-center gap-2">
                            <span className="uppercase tracking-wider text-sm whitespace-nowrap">
                              {isSubmitting ? "Starting..." : "Start Free Trial"}
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

        {/* FAQ Section */}
        <div className="insat-page">
          <section className="bg-grey-5 py-20">
            <div className="container faq-grid">
              <div className="faq-title-col">
                <h2 className="text-40-heading">We’re here to help</h2>
                <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Learn more</span>
                </a>
              </div>

              <div className="faq-list-col">
                {faqData.map((faq, index) => (
                  <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                    <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-question">{faq.question}</span>
                      <div className="faq-icon-wrapper">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                          <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                        </svg>
                      </div>
                    </button>
                    <div className="faq-panel" style={{ maxHeight: activeFaq === index ? "120px" : "0px", opacity: activeFaq === index ? 1 : 0, transition: "all 0.3s ease", overflow: "hidden" }}>
                      <div className="faq-panel-inner">
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </GSAPWrapper>
  );
};

export default StartFreePage;
