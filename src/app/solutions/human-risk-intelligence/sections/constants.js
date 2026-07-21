import React from "react";

export const coreCards = [
  {
    title: "Risk Scoring",
    desc: "AI-assisted user and team risk scores based on clicks, reports, quiz results, and repeated risky behaviour.",
    image: "/images/features-01.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 0-10 10c0 2.2.72 4.23 1.94 5.86L6.5 15.3A6 6 0 0 1 12 8a6 6 0 0 1 5.5 7.3l2.56 2.56A10 10 0 0 0 12 2z" />
        <line className="meter-needle" x1="12" y1="14" x2="16" y2="10" stroke="#f15a24" strokeWidth="2" />
        <circle cx="12" cy="14" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Department Heatmaps",
    desc: "Spot vulnerable teams, weak locations, and training gaps at a glance.",
    image: "/images/features-02.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle className="heatmap-dot dot-1" cx="12" cy="6" r="3" fill="#f15a24" />
        <path d="M12 9v3M6 12h12M6 12v5M18 12v5" />
        <circle className="heatmap-dot dot-2" cx="6" cy="18" r="3" fill="#f15a24" />
        <circle className="heatmap-dot dot-3" cx="18" cy="18" r="3" fill="#f15a24" />
      </svg>
    )
  },
  {
    title: "Executive Reporting",
    desc: "Generate clear, board-ready reports for CISOs, leadership, and compliance teams.",
    image: "/images/features-01.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="report-doc" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line className="report-line line-1" x1="8" y1="13" x2="16" y2="13" />
        <line className="report-line line-2" x1="8" y1="17" x2="14" y2="17" />
      </svg>
    )
  },
  {
    title: "Pre/Post Analysis",
    desc: "Compare risk before and after campaigns to show training impact and improvement.",
    image: "/images/features-02.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path className="analysis-arrow" d="M3 10l9-6 9 6" stroke="#f15a24" />
      </svg>
    )
  }
];

export const faqData = [
  {
    question: "How does the platform calculate user and department risk scores?",
    answer: "Our AI-powered engine aggregates signals from simulated phishing click rates, active report rates, cybersecurity awareness quiz performance, and repeated risky behaviours. These are weighted dynamically to assign scores between 0 (Lowest Risk) and 100 (Highest Risk)."
  },
  {
    question: "Can we export these reports to share with compliance auditors?",
    answer: "Yes. Every report generated can be downloaded in audit-ready PDF formats containing telemetry metrics and action plans. They serve as defensible evidence for compliance audits like SOC 2, ISO 27001, and HIPAA."
  },
  {
    question: "How often are the risk analytics and heatmaps updated?",
    answer: "All metrics, heatmaps, and risk intelligence dashboards update in real time as employees complete training courses, report simulations, or take action in active phishing campaigns."
  },
  {
    question: "What compliance standards does your human risk dashboard cover?",
    answer: "InSAT compiles comprehensive, audit-ready compliance records and human risk telemetry matching global frameworks, including SOC 2 Type II, ISO 27001, GDPR, and India's DPDP Act."
  }
];
