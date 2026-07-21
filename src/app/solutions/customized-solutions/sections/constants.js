import React from "react";

export const customizedCards = [
  {
    title: "Your Policies",
    desc: "We align with your real policies, controls, and compliance requirements.",
    bullets: ["Internal policies & SOPs", "Compliance frameworks", "Security controls"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  },
  {
    title: "Your People",
    desc: "We adapt to your teams, roles, and behaviors to make learning relevant.",
    bullets: ["Roles & responsibilities", "Department workflows", "Knowledge & skill gaps"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Your Risks",
    desc: "We focus on the threats and priorities that matter most to your business.",
    bullets: ["Threat landscape", "Regulatory obligations", "Business risk priorities"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    title: "Customized Awareness Program",
    desc: "A tailored learning experience that drives awareness, builds better behavior, and delivers measurable impact.",
    bullets: ["Relevant for every employee", "Actionable & role-specific", "Measurable & audit-ready"],
    highlight: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    )
  }
];

export const policyCards = [
  {
    title: "InfoSec Policies",
    desc: "Modules on password rules, access control, phishing reporting, and data handling.",
    image: "/images/solutions/customised_Solutions/infosec_policy.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="lock-body" x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path className="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    title: "Data Privacy",
    desc: "Modules on DPDP, GDPR, consent, personal data use, sharing limits, and breach escalation.",
    image: "/images/solutions/customised_Solutions/dataprivacy_policy.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="privacy-shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "Incident Reporting",
    desc: "Modules on decision-based situations and reporting channels.",
    image: "/images/solutions/customised_Solutions/incidentreporting.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="alert-triangle" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line className="alert-line" x1="12" y1="9" x2="12" y2="13" />
        <line className="alert-dot" x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    title: "Device Usage",
    desc: "Modules on laptops, mobiles, USBs, public Wi-Fi, and remote work.",
    image: "/images/solutions/customised_Solutions/deviceusage_policy.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="device-screen" x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line className="device-stand-base" x1="8" y1="21" x2="16" y2="21" />
        <line className="device-stand" x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    title: "HR Policies",
    desc: "Modules on confidentiality, employee data, POSH and workplace conduct.",
    image: "/images/solutions/customised_Solutions/Hr_policy.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="hr-user-right" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle className="hr-user-head" cx="9" cy="7" r="4" />
        <path className="hr-user-left-1" d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path className="hr-user-left-2" d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Finance Approvals",
    desc: "Modules on fake vendors, payment fraud, invoice manipulation, and CEO fraud.",
    image: "/images/solutions/customised_Solutions/Finance_policy.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line className="finance-line" x1="12" y1="1" x2="12" y2="23" />
        <path className="finance-dollar" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

export const cultureCampaignCards = [
  {
    title: "Cybersecurity Month",
    desc: "Annual organization-wide security awareness drive.",
    span: "span 2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    title: "Data Privacy Week",
    desc: "Focus on privacy and compliance.",
    span: "span 1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "Phishing Readiness",
    desc: "Simulation campaigns & safety drills.",
    span: "span 1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  },
  {
    title: "Password & MFA",
    desc: "Refresher training on credentials.",
    span: "span 1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    title: "Report Suspicious Activity",
    desc: "Empowering teams to report active threats.",
    span: "span 1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f15a24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  }
];

export const faqData = [
  {
    q: "How are custom security awareness programs created?",
    a: "Innvikta tailors the training based on your internal policies, SOPs, and industry-specific regulations to match your risk profile."
  },
  {
    q: "Can we create training paths for specific departments?",
    a: "Yes, you can define focused journeys for Finance, HR, Sales, developers, and executives to address department-level risks."
  },
  {
    q: "Do you support custom simulations?",
    a: "Absolutely. We customize phishing, smishing, and social engineering templates to reflect your organization's actual communication channels and brand."
  },
  {
    q: "How do you align training with compliance frameworks?",
    a: "We map modules to local and global compliance standards such as DPDP, GDPR, SOC 2, and ISO 27001 so your learning evidence is audit-ready."
  }
];
