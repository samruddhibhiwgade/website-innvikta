import React from "react";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

export const faqData = [
  {
    question: "What is the Domain Security Analyzer?",
    answer: "The Domain Security Analyzer is a free tool by Innvikta that inspects public DNS records for SPF, DKIM, and DMARC configurations to check for vulnerabilities that allow email spoofing."
  },
  {
    question: "How does the tool run checks?",
    answer: "The tool makes live server-side queries to global DNS resolvers to inspect real-time published records (A, AAAA, MX, TXT, SPF, DKIM, and DMARC) for the specified domain."
  },
  {
    question: "What is SPF, DKIM, and DMARC?",
    answer: "They are email authentication protocols. SPF lists authorized senders, DKIM cryptographically signs outgoing emails, and DMARC instructs receivers on how to handle emails that fail SPF/DKIM checks."
  },
  {
    question: "Why does my DKIM scan show a warning or not found status?",
    answer: "DKIM records are published under specific \"selectors\". The tool checks the \"default\" selector by default. If your organization uses a custom selector (e.g. \"google\" or \"k1\"), enter it in the DKIM Selector field."
  }
];

export const getStatusBadge = (status) => {
  switch (status) {
    case "success":
      return (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
          <FiCheckCircle className="text-[14px]" /> Secure
        </span>
      );
    case "warning":
      return (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
          <FiAlertTriangle className="text-[14px]" /> Warning / Info
        </span>
      );
    case "danger":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem", letterSpacing: "0.02em", fontWeight: 600 }}>
          <FiAlertTriangle className="text-[14px]" /> Vulnerable
        </span>
      );
  }
};
