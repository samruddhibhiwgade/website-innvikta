"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoGameControllerOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronDown, 
  FiArrowRight, 
  FiCpu, 
  FiShield, 
  FiLayers, 
  FiActivity, 
  FiMonitor, 
  FiTrendingUp, 
  FiZap, 
  FiSmile, 
  FiAward, 
  FiGlobe, 
  FiBriefcase, 
  FiHeart, 
  FiLock, 
  FiCheckCircle, 
  FiPlay, 
  FiBookOpen, 
  FiFileText, 
  FiCalendar, 
  FiUsers, 
  FiMail, 
  FiMenu,
  FiSearch,
  FiHelpCircle,
  FiTarget,
  FiBarChart2,
  FiStar,
  FiCloud,
  FiSettings,
  FiKey
} from "react-icons/fi";

// SVG illustrations for the right-hand Featured CTA cards
const RenderSvgIllustration = ({ type }) => {
  const primaryColor = "#f15a24";
  const darkColor = "#1a202c";
  const mutedColor = "#94a3b8";

  switch (type) {
    case "platform":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Dashboard browser window mockup */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <line x1="10" y1="30" x2="230" y2="30" stroke="#e2e8f0" />
          <circle cx="24" cy="20" r="3" fill="#ef4444" stroke="none" />
          <circle cx="34" cy="20" r="3" fill="#eab308" stroke="none" />
          <circle cx="44" cy="20" r="3" fill="#22c55e" stroke="none" />
          {/* Dashboard chart mockup */}
          <rect x="25" y="45" width="80" height="40" rx="4" fill={primaryColor} fillOpacity="0.05" stroke={primaryColor} strokeWidth="1" />
          <path d="M35 75 L55 60 L75 68 L95 52" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="95" cy="52" r="3" fill="#fff" stroke={primaryColor} strokeWidth="1.5" />
          {/* Checklist items */}
          <rect x="120" y="48" width="90" height="6" rx="3" fill="#e2e8f0" stroke="none" />
          <rect x="120" y="60" width="70" height="6" rx="3" fill="#e2e8f0" stroke="none" />
          <rect x="120" y="72" width="80" height="6" rx="3" fill="#e2e8f0" stroke="none" />
          {/* Progress bar */}
          <rect x="25" y="100" width="190" height="12" rx="6" fill="#f1f5f9" stroke="none" />
          <rect x="25" y="100" width="130" height="12" rx="6" fill={primaryColor} stroke="none" />
          <text x="135" y="109" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">68%</text>
        </svg>
      );
    case "phishing":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Email client window */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <line x1="10" y1="30" x2="230" y2="30" stroke="#e2e8f0" />
          <line x1="75" y1="30" x2="75" y2="130" stroke="#e2e8f0" />
          {/* Left panel items */}
          <rect x="20" y="42" width="45" height="8" rx="4" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="0.5" />
          <rect x="20" y="58" width="40" height="6" rx="3" fill="#cbd5e1" stroke="none" />
          <rect x="20" y="70" width="35" height="6" rx="3" fill="#cbd5e1" stroke="none" />
          {/* Email row with warning sign */}
          <rect x="85" y="42" width="135" height="34" rx="4" fill={primaryColor} fillOpacity="0.05" stroke={primaryColor} strokeWidth="1" />
          <path d="M96 61 L101 51 L106 61 Z" fill={primaryColor} stroke={primaryColor} strokeWidth="1" strokeLinejoin="round" />
          <line x1="101" y1="55" x2="101" y2="57" stroke="#fff" strokeWidth="1" />
          <circle cx="101" cy="59" r="0.5" fill="#fff" />
          <rect x="115" y="49" width="70" height="6" rx="3" fill={darkColor} stroke="none" />
          <rect x="115" y="60" width="90" height="5" rx="2.5" fill={mutedColor} stroke="none" />
          {/* Simple list of emails */}
          <rect x="85" y="86" width="135" height="14" rx="3" fill="#f8fafc" stroke="none" />
          <rect x="95" y="91" width="60" height="4" rx="2" fill="#cbd5e1" stroke="none" />
          <rect x="85" y="106" width="135" height="14" rx="3" fill="#f8fafc" stroke="none" />
          <rect x="95" y="111" width="70" height="4" rx="2" fill="#cbd5e1" stroke="none" />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Analytics graph dashboard */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <line x1="10" y1="30" x2="230" y2="30" stroke="#e2e8f0" />
          {/* Multi-series bar chart */}
          <rect x="25" y="65" width="25" height="50" rx="3" fill="#e2e8f0" stroke="none" />
          <rect x="60" y="45" width="25" height="70" rx="3" fill={primaryColor} stroke="none" />
          <rect x="95" y="55" width="25" height="60" rx="3" fill={darkColor} stroke="none" />
          <rect x="130" y="75" width="25" height="40" rx="3" fill="#cbd5e1" stroke="none" />
          {/* Line overlay representing risk dropping */}
          <path d="M37 60 L72 38 L107 50 L142 68" fill="none" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="72" cy="38" r="4.5" fill="#fff" stroke={primaryColor} strokeWidth="2" />
          {/* Analytics Stats badge */}
          <rect x="170" y="45" width="45" height="20" rx="6" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="0.5" />
          <text x="176" y="58" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">-24%</text>
          <text x="170" y="80" fill={mutedColor} fontSize="8" fontWeight="semibold" fontFamily="Inter, sans-serif">Risk Score</text>
        </svg>
      );
    case "compliance":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Lock and compliance certificate shield layout */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          {/* Centered shield illustration */}
          <path d="M120 35 C155 35 165 47 165 70 C165 100 120 112 120 112 C120 112 75 100 75 70 C75 47 85 35 120 35 Z" fill={primaryColor} fillOpacity="0.05" stroke={primaryColor} strokeWidth="2" />
          {/* Custom checkmark */}
          <path d="M102 70 L114 82 L138 58" fill="none" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Certificates badges */}
          <circle cx="40" cy="50" r="14" fill={darkColor} fillOpacity="0.03" stroke={darkColor} strokeWidth="1" />
          <text x="32" y="53" fill={darkColor} fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">GDPR</text>
          
          <circle cx="40" cy="85" r="14" fill={darkColor} fillOpacity="0.03" stroke={darkColor} strokeWidth="1" />
          <text x="30" y="88" fill={darkColor} fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">HIPAA</text>

          <circle cx="200" cy="68" r="14" fill={darkColor} fillOpacity="0.03" stroke={darkColor} strokeWidth="1" />
          <text x="192" y="71" fill={darkColor} fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">SOC2</text>
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Centralized Node Connection Mockup */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          {/* Interlocking nodes */}
          <circle cx="120" cy="70" r="22" fill={primaryColor} fillOpacity="0.08" stroke={primaryColor} strokeWidth="1.5" />
          <circle cx="120" cy="70" r="8" fill={primaryColor} stroke="none" />
          
          <circle cx="50" cy="40" r="14" fill={darkColor} fillOpacity="0.04" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="190" cy="40" r="14" fill={darkColor} fillOpacity="0.04" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="50" cy="100" r="14" fill={darkColor} fillOpacity="0.04" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="190" cy="100" r="14" fill={darkColor} fillOpacity="0.04" stroke="#e2e8f0" strokeWidth="1" />

          {/* Connection lines */}
          <line x1="120" y1="70" x2="50" y2="40" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="120" y1="70" x2="190" y2="40" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="120" y1="70" x2="50" y2="100" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="120" y1="70" x2="190" y2="100" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      );
    case "resources":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Resource center mockup with guides/books */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <rect x="30" y="30" width="70" height="85" rx="4" fill={primaryColor} fillOpacity="0.05" stroke={primaryColor} strokeWidth="1.5" />
          {/* Guide Cover detail */}
          <rect x="40" y="42" width="50" height="8" rx="2" fill={primaryColor} stroke="none" />
          <rect x="40" y="56" width="40" height="4" rx="2" fill={darkColor} stroke="none" />
          <rect x="40" y="66" width="30" height="4" rx="2" fill={mutedColor} stroke="none" />
          <path d="M40 92 C 55 86, 75 98, 90 92" fill="none" stroke={primaryColor} strokeWidth="1.5" />
          {/* Side text links */}
          <rect x="120" y="42" width="80" height="6" rx="3" fill="#cbd5e1" stroke="none" />
          <rect x="120" y="58" width="70" height="6" rx="3" fill="#cbd5e1" stroke="none" />
          <rect x="120" y="74" width="60" height="6" rx="3" fill="#cbd5e1" stroke="none" />
          <rect x="120" y="90" width="75" height="6" rx="3" fill="#cbd5e1" stroke="none" />
        </svg>
      );
    case "assessments":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Assessment checklist illustration */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          {/* Checklist rows */}
          <circle cx="35" cy="45" r="7" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="1" />
          <path d="M32 45 L34 47 L38 42" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <rect x="55" y="42" width="140" height="6" rx="3" fill={darkColor} stroke="none" />

          <circle cx="35" cy="70" r="7" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="1" />
          <path d="M32 70 L34 72 L38 67" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <rect x="55" y="67" width="120" height="6" rx="3" fill="#cbd5e1" stroke="none" />

          <circle cx="35" cy="95" r="7" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="1" />
          <path d="M32 95 L34 97 L38 92" fill="none" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <rect x="55" y="92" width="130" height="6" rx="3" fill="#cbd5e1" stroke="none" />
        </svg>
      );
    case "arcade":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Innvikta Arcade gaming/illustration mockup */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <rect x="50" y="50" width="140" height="60" rx="10" fill={darkColor} stroke="none" />
          {/* Controller D-Pad */}
          <path d="M72 80 H88 M80 72 V88" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
          {/* Action buttons */}
          <circle cx="150" cy="74" r="5" fill={primaryColor} stroke="none" />
          <circle cx="166" cy="84" r="5" fill={primaryColor} stroke="none" />
          {/* Joysticks */}
          <circle cx="102" cy="85" r="8" fill="#64748b" stroke="none" />
          <circle cx="128" cy="85" r="8" fill="#64748b" stroke="none" />
          {/* Arcade Crown / Star */}
          <path d="M120 22 L128 32 L138 26 L132 38 H108 L102 26 L112 32 Z" fill={primaryColor} stroke={primaryColor} strokeWidth="1" strokeLinejoin="round" />
        </svg>
      );
    case "partners":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Connecting gears representation */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          {/* Gears */}
          <circle cx="95" cy="65" r="22" fill="none" stroke={primaryColor} strokeWidth="4.5" strokeDasharray="7,5" />
          <circle cx="95" cy="65" r="8" fill={primaryColor} stroke="none" />
          
          <circle cx="138" cy="80" r="18" fill="none" stroke={darkColor} strokeWidth="4" strokeDasharray="6,4" />
          <circle cx="138" cy="80" r="6" fill={darkColor} stroke="none" />
          {/* Grid visual lines */}
          <line x1="25" y1="35" x2="65" y2="35" stroke="#e2e8f0" />
          <line x1="25" y1="47" x2="55" y2="47" stroke="#e2e8f0" />
          <line x1="215" y1="105" x2="175" y2="105" stroke="#e2e8f0" />
        </svg>
      );
    case "company":
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Globe or structural lines visual representation */}
          <rect x="10" y="10" width="220" height="120" rx="6" fill="#fff" stroke="#e2e8f0" />
          <circle cx="120" cy="70" r="38" fill={primaryColor} fillOpacity="0.05" stroke={primaryColor} strokeWidth="2" />
          {/* Globe grid lines */}
          <line x1="82" y1="70" x2="158" y2="70" stroke={primaryColor} strokeWidth="1" />
          <line x1="120" y1="32" x2="120" y2="108" stroke={primaryColor} strokeWidth="1" />
          <path d="M94 48 C 110 58, 130 58, 146 48" fill="none" stroke={primaryColor} strokeWidth="1" />
          <path d="M94 92 C 110 82, 130 82, 146 92" fill="none" stroke={primaryColor} strokeWidth="1" />
          <path d="M106 38 C 115 55, 115 85, 106 102" fill="none" stroke={primaryColor} strokeWidth="1" />
          <path d="M134 38 C 125 55, 125 85, 134 102" fill="none" stroke={primaryColor} strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
};

// Reusable menu configuration data with 2x2 grid layout (exactly 4 cells per tab)
const menuData = {
  solutions: {
    title: "Solutions",
    tabs: [
      {
        id: "insat",
        label: "InSAT",
        href: "/solutions/insat",
        icon: FiCpu,
        headline: "Build everyday secure behaviour across your workforce with Innvikta’s unified Security Awareness Training platform.",
        cells: [
          { 
            name: "Security Awareness Training", 
            desc: "Cinematic, role-based courses that engage employees and satisfy audits.", 
            href: "/solutions/insat",
            chips: [{ label: "Role-Based Modules" }, { label: "Story-Based Simulations" }]
          },
          { 
            name: "Interactive Gamified Arcade", 
            desc: "Bite-sized microlearning games and quizzes that motivate participation.", 
            href: "/solutions/insat",
            chips: [{ label: "Gamified / Interactive Modules" }, { label: "Policy Reinforcement" }]
          },
          { 
            name: "AI Adaptive Learning", 
            desc: "Personalized paths adjusted dynamically to user risk profiles.", 
            href: "/solutions/insat",
            chips: [{ label: "Personalized Learning Paths" }, { label: "Dynamic Risk Profiling" }]
          },
          { 
            name: "Microlearning", 
            desc: "Deliver bite-sized, targeted modules to reinforce key security concepts.", 
            href: "/solutions/insat",
            chips: [{ label: "Bite-sized Training" }, { label: "Just-in-Time Learning" }]
          }
        ],
        cta: {
          title: "Launch modern awareness training",
          desc: "Deliver personalized learning built for active participation and defensible compliance evidence.",
          label: "Explore Training Platform",
          href: "/solutions/insat",
          image: "/images/insat_featured.png",
          svgType: "platform"
        }
      },
      {
        id: "user_risk_simulation",
        label: "Phishing Simulation",
        href: "/solutions/phishing-simulation",
        icon: FiMail,
        headline: "Personalized phishing simulations that teach, test, and strengthen workforce response.",
        cells: [
          { 
            name: "Multi Vector Attack", 
            desc: "Simulate and track phishing, attachment, and QR code attacks.", 
            href: "#",
            chips: [{ label: "Smishing Simulation" }, { label: "WhatsApp Simulation" }]
          },
          { 
            name: "Vishing Simulation", 
            desc: "Automated phone tests simulating voice-based social engineering threats.", 
            href: "#",
            chips: [{ label: "Voice Attack Scenarios" }, { label: "AI-Led Variants" }]
          },
          { 
            name: "Audience Segmentation", 
            desc: "Auto-generate dynamic templates based on current local threat vectors.", 
            href: "#",
            chips: [{ label: "Campaign Scheduling" }, { label: "Difficulty Progression" }]
          },
          { 
            name: "AI-Led Scenario Variants", 
            desc: "Escalate difficulty levels dynamically based on employee susceptibility.", 
            href: "#",
            chips: [{ label: "Adaptive Risk Testing" }, { label: "Personalized Simulation Paths" }]
          }
        ],
        cta: {
          title: "Simulate modern attacks and reinforce behavior",
          desc: "Test your team across multiple vectors including SMS, QR codes, and voice to verify click resilience.",
          label: "Explore Phishing Simulations",
          href: "/solutions/phishing-simulation",
          svgType: "phishing"
        }
      },
      {
        id: "human_risk_intelligence",
        label: "Human Risk Intelligence",
        href: "/solutions/human-risk-intelligence",
        icon: FiActivity,
        headline: "Turn awareness data into measurable, board-ready human risk visibility.",
        cells: [
          { 
            name: "Risk Scoring", 
            desc: "Deep-dive analysis into user report rates, click habits, and trends.", 
            href: "#",
            chips: [{ label: "Behavioral Analytics" }, { label: "Threat Intelligence" }]
          },
          { 
            name: "Department Heatmaps", 
            desc: "Calculate dynamic compliance and risk scores for every team.", 
            href: "#",
            chips: [{ label: "Trend Dashboards" }, { label: "Program Impact Analysis" }]
          },
          { 
            name: "Executive Reporting", 
            desc: "Locate vulnerable spots or training gaps by department and location.", 
            href: "#",
            chips: [{ label: "Board Reports" }, { label: "Risk Benchmarking" }]
          },
          { 
            name: "Pre/Post Analysis", 
            desc: "Generate board-ready reports showing campaign impact and program ROI.", 
            href: "#",
            chips: [{ label: "Workforce Comparison" }, { label: "Security Maturity Tracking" }]
          }
        ],
        cta: {
          title: "Provide leaders with clear behavior metrics",
          desc: "Identify security gaps and track behavioral improvements across your entire organization automatically.",
          label: "Explore Dashboard",
          href: "/solutions/human-risk-intelligence",
          svgType: "analytics"
        }
      },
      {
        id: "compliance_training",
        label: "Compliance Training",
        href: "/solutions/compliance-training",
        icon: FiCheckCircle,
        headline: "Meet regulatory mandates and reinforce critical privacy policies.",
        cells: [
          { 
            name: "Compliance Learning Suite", 
            desc: "Satisfy GDPR, HIPAA, PCI-DSS, and India's DPDP Act requirements.", 
            href: "/solutions/compliance-training",
            chips: [{ label: "GDPR Awareness" }, { label: "HIPAA Awareness" }]
          },
          { 
            name: "Acknowledgement Tracking", 
            desc: "Track and log employee policy agreements and corporate code sign-offs.", 
            href: "/solutions/compliance-training",
            chips: [{ label: "Completion Logs" }, { label: "Audit Records" }]
          },
          { 
            name: "Refresher Campaigns", 
            desc: "Automatically deploy compliance courses to specific high-risk user groups.", 
            href: "/solutions/compliance-training",
            chips: [{ label: "Governance Reinforcement" }, { label: "Ongoing Compliance Education" }]
          },
          { 
            name: "Audit-Ready Evidence", 
            desc: "Generate automated training completion records to satisfy security framework audits.", 
            href: "/solutions/compliance-training",
            chips: [{ label: "Automated Records" }, { label: "Auditor Reports" }]
          }
        ],
        cta: {
          title: "Close the awareness gap in compliance",
          desc: "Audit-ready training modules built to satisfy global frameworks, privacy rules, and internal audits.",
          label: "See Compliance Solutions",
          href: "/solutions/compliance-training",
          svgType: "compliance"
        }
      },
      {
        id: "customized_solutions",
        label: "Customized Solutions",
        href: "/solutions/customized-solutions",
        icon: FiLayers,
        headline: "Tailored training for your people, risks, and industry with customized learning paths.",
        cells: [
          { 
            name: "Industry-Specific Portals", 
            desc: "Custom simulations and rules for BFSI, Healthcare, IT, and Manufacturing.", 
            href: "/solutions/customized-solutions",
            chips: [
              { label: "BFSI", icon: FiShield },
              { label: "Healthcare", icon: FiHeart },
              { label: "Government", icon: FiGlobe },
              { label: "IT Services", icon: FiCpu },
              { label: "View All Industries", isMore: true }
            ]
          },
          { 
            name: "Departmental Learning Paths", 
            desc: "Custom training tracks designed for unique team exposures and duties.", 
            href: "/solutions/customized-solutions",
            chips: [
              { label: "Remote Workforce Security", icon: FiCloud },
              { label: "Human Risk Management", icon: FiActivity }
            ]
          },
          { 
            name: "Executive Risk Management", 
            desc: "Deploy specialized campaigns to high-target C-suite and finance teams.", 
            href: "/solutions/customized-solutions",
            chips: [
              { label: "Executive Risk Reporting", icon: FiBarChart2 },
              { label: "Phishing Prevention", icon: FiLock }
            ]
          },
          { 
            name: "Culture Benchmark Studies", 
            desc: "Assess and compare security culture indexes across remote workforces.", 
            href: "/solutions/customized-solutions",
            chips: [
              { label: "Security Culture Building", icon: FiUsers },
              { label: "Compliance Training", icon: FiCheckCircle }
            ]
          }
        ],
        cta: {
          title: "Tailor simulations to specific industries",
          desc: "Build customized learning paths based on the unique regulatory and operational risks of your sector.",
          label: "View Customized Solutions",
          href: "/solutions/customized-solutions",
          svgType: "network"
        }
      }
    ]
  },
  resources: {
    title: "Resources",
    tabs: [
      {
        id: "victim_support",
        label: "Innvikta Cyberhelp",
        icon: FiShield,
        headline: "Victim of Cyberfraud? We’re Here to Help You Fight Back.",
        headlineCta: {
          label: "Get Immediate Help",
          href: "#"
        },
        cells: [
          { name: "Incident Reporting Guide", desc: "Step-by-step assistance for victims to understand, document, and report cyber incidents effectively.", href: "#" },
          { name: "Complaint Filing Support", desc: "Guided NCRP complaint filing walkthroughs with actionable reporting instructions and support resources.", href: "#" },
          { name: "Emergency Account Freeze", desc: "Quick access to emergency banking and UPI account freeze guidance to reduce fraud impact immediately.", href: "#" },
          { name: "Cyber Helpline Directory", desc: "Search verified national, state, banking, and cybercrime support contacts in one centralized place.", href: "#" },
          { name: "Evidence Vault & Report Templates", desc: "Organize cyber evidence securely and use ready-made complaint templates for faster reporting.", href: "#" },
          { name: "Scam Awareness & Cyber Alerts", desc: "Stay informed about scam trends, fraud warnings, cyber safety tips, and interactive awareness resources.", href: "#" }
        ],
        cta: {
          title: "Stop Threats at Every Layer—People, Data, AI",
          desc: "Innvikta provides intent-based protection for every human, every AI agent, across all data.",
          label: "Learn More",
          href: "#",
          svgType: "resources"
        }
      },
      {
        id: "learning_center",
        label: "Learning Center",
        icon: FiBookOpen,
        headline: "Level up your security awareness knowledge and threat prevention strategy.",
        cells: [
          { name: "Security Blog", desc: "Latest threat research findings and awareness campaign tips.", href: "#" },
          { name: "Cybersecurity Guides", desc: "Deep-dives into modern corporate digital defense systems.", href: "#" },
          { name: "Campaign Playbooks", desc: "Step-by-step launch plans for security awareness coordinators.", href: "#" },
          { name: "Compliance Mappings", desc: "Cross-reference training with global privacy frameworks.", href: "#" }
        ],
        cta: {
          title: "Explore the Innvikta Blog",
          desc: "Stay updated with real-time cybersecurity findings and employee engagement tactics.",
          label: "Go to Blog",
          href: "#",
          svgType: "resources"
        }
      },
      {
        id: "research_hub",
        label: "Research Hub",
        icon: FiFileText,
        headline: "Get data-driven security reports, ROI details, and behavior benchmarks.",
        cells: [
          { name: "Maturity Benchmarks", desc: "Compare regional click and report rates against industry peers.", href: "#" },
          { name: "ROI Business Case", desc: "Calculate direct cost savings from human risk training reduction.", href: "#" },
          { name: "Threat Activity Reports", desc: "Stay ahead of emerging business email compromise threat vectors.", href: "#" },
          { name: "CISO Case Studies", desc: "Success stories from real enterprise security leadership teams.", href: "#" }
        ],
        cta: {
          title: "Download latest benchmark report",
          desc: "Understand global trends in human-centric security and phishing simulation performance.",
          label: "Get Reports",
          href: "#",
          svgType: "resources"
        }
      },
      {
        id: "community_hub",
        label: "Community",
        icon: FiCalendar,
        headline: "Connect with security awareness professionals and join events.",
        cells: [
          { name: "Interactive Webinars", desc: "Join monthly panel discussions with global security experts.", href: "#" },
          { name: "Launch Workshops", desc: "Practical classes for simulation planning and deployment.", href: "#" },
          { name: "Platform Updates", desc: "See the latest features added to the Innvikta training suite.", href: "#" },
          { name: "Weekly Newsletter", desc: "Security tips and campaign ideas delivered directly to your inbox.", href: "#" }
        ],
        cta: {
          title: "Join our next live webinar",
          desc: "Register to watch expert panels dissect active social engineering vectors live.",
          label: "Register Now",
          href: "#",
          svgType: "resources"
        }
      },
      {
        id: "proof_trust",
        label: "Proof & Trust",
        icon: FiUsers,
        headline: "See how we help organizations build strong security cultures.",
        cells: [
          { name: "Customer Success Stories", desc: "How leading enterprises transformed employee secure behaviors.", href: "#" },
          { name: "Verified G2 Reviews", desc: "Check software rankings and verified platform user ratings.", href: "#" },
          { name: "Partner Network", desc: "Our trusted integrations and reseller alliances globally.", href: "#" },
          { name: "Performance Metrics", desc: "Verified statistics showing phishing click rate improvements.", href: "#" }
        ],
        cta: {
          title: "Read enterprise customer stories",
          desc: "Discover how Fortune 500 companies reduced click rates from 20% to under 2% in six months.",
          label: "View Success Stories",
          href: "#",
          svgType: "resources"
        }
      }
    ]
  },
  freetools: {
    title: "Free Tools",
    tabs: [
      {
        id: "assessments",
        label: "Security Assessments",
        icon: FiActivity,
        headline: "Benchmark your workforce risk baseline and training maturity.",
        cells: [
          { name: "Maturity Calculator", desc: "Grade the effectiveness and maturity of your training program.", href: "#" },
          { name: "Risk Estimator", desc: "Estimate employee click rates before starting simulations.", href: "#" },
          { name: "Baseline Score Tool", desc: "Get a baseline human risk score for your active domain.", href: "#" },
          { name: "Culture Benchmarking", desc: "Measure security culture indicators and threat reports.", href: "#" }
        ],
        cta: {
          title: "Run a free human risk test",
          desc: "Verify baseline employee susceptibility in less than 5 minutes.",
          label: "Start Assessment",
          href: "#",
          svgType: "assessments"
        }
      },
      {
        id: "cyber_tools",
        label: "Free Cybersecurity Tools",
        icon: FiMonitor,
        headline: "Immediate security utilities for IT and security administration teams.",
        cells: [
          { name: "Password Exposure Scanner", desc: "Scan if enterprise emails are leaked in public breaches.", href: "#" },
          { name: "Domain Security Analyzer", desc: "Scan SPF, DKIM, and DMARC record vulnerabilities.", href: "/freetools/domain-security-analyzer" },
          { name: "Compliance Gap Checker", desc: "Verify regulatory readiness for GDPR, SOC2, and HIPAA.", href: "#" },
          { name: "Simulation ROI Tool", desc: "Estimate potential cost savings from threat training campaigns.", href: "#" }
        ],
        cta: {
          title: "Check password exposure logs",
          desc: "Analyze if employee credentials exist on public breach indexes securely.",
          label: "Run Tool",
          href: "#",
          svgType: "assessments"
        }
      },
      {
        id: "templates",
        label: "Templates",
        icon: FiFileText,
        headline: "Ready-to-use security awareness campaign planning and templates.",
        cells: [
          { name: "Phishing Templates", desc: "Download high-fidelity email warning templates.", href: "#" },
          { name: "Security Policy Drafts", desc: "Ready-to-use security and data policy templates.", href: "#" },
          { name: "IT Incident Checklists", desc: "Standard check steps for immediate threat alert response.", href: "#" },
          { name: "Campaign Calendars", desc: "Planning templates to schedule your annual training.", href: "#" }
        ],
        cta: {
          title: "Download phishing templates",
          desc: "Access ready-made email templates modeled after actual 2026 security threats.",
          label: "Get Templates",
          href: "#",
          svgType: "assessments"
        }
      }
    ]
  },
  arcade: {
    title: "Innvikta Arcade",
    tabs: [
      {
        id: "arcade_exp",
        label: "Arcade Experience",
        icon: IoGameControllerOutline,
        headline: "Turn security awareness into engaging, game-based learning.",
        cells: [
          { name: "Story-Based Learning", desc: "Cinematic, scenario-driven interactive modules.", href: "#" },
          { name: "Missions & Quests", desc: "Simulated security assignments for active play.", href: "#" },
          { name: "Topic-Based Modules", desc: "Mini-games targeting specific security topics.", href: "#" },
          { name: "Free Arcade Challenges", desc: "Try arcade modules without a full workspace setup.", href: "#" }
        ],
        cta: {
          title: "Explore Innvikta Arcade",
          desc: "Utilize interactive gamified lessons that build defensive employee habits through story play.",
          label: "Launch a Free Challenge",
          href: "#",
          svgType: "arcade"
        }
      },
      {
        id: "gamification_sys",
        label: "Gamification System",
        icon: FiAward,
        headline: "Keep employees motivated with progression, badges, and rewards.",
        cells: [
          { name: "Badges & XP", desc: "Reward milestone achievements and daily login streaks.", href: "#" },
          { name: "Leaderboards", desc: "Encourage friendly security culture competition.", href: "#" },
          { name: "Progression Paths", desc: "Unlock corporate career stages as skills advance.", href: "#" },
          { name: "Arcade Rewards Store", desc: "Redeem XP points for custom achievements and items.", href: "#" }
        ],
        cta: {
          title: "Increase employee participation rates",
          desc: "Leverage gamification mechanics to achieve up to 94% training engagement rates.",
          label: "See Arcade Benefits",
          href: "#",
          svgType: "arcade"
        }
      }
    ]
  },
  partners: {
    title: "Partners",
    tabs: [
      {
        id: "partner_prog",
        label: "Partner Program",
        icon: FiGlobe,
        headline: "Grow your business with the leading human risk platform.",
        cells: [
          { name: "Become a Partner", desc: "Apply to become a certified Innvikta channel partner.", href: "#" },
          { name: "Partner Benefits", desc: "Access tier pricing, deal registration, and MDF funds.", href: "#" },
          { name: "Co-Selling Support", desc: "Sales engineering, custom demos, and asset support.", href: "#" }
        ],
        cta: {
          title: "Join our partner network",
          desc: "Expand your portfolio with our leading security awareness and human risk analytics tools.",
          label: "Become a Partner",
          href: "#",
          svgType: "partners"
        }
      },
      {
        id: "reseller",
        label: "Channel & Reseller",
        icon: FiShield,
        headline: "Empower your sales and white-label service operations.",
        cells: [
          { name: "Reseller Enablement", desc: "Manage multiple client dashboards from a single partner console.", href: "#" },
          { name: "White-Label Support", desc: "Deploy customized, branded interfaces for your clients.", href: "#" },
          { name: "Sales Assets", desc: "Download brochures, presentations, and product data sheets.", href: "#" }
        ],
        cta: {
          title: "Access white-label reseller tools",
          desc: "Rebrand the training experience and deliver human risk visibility as a managed service.",
          label: "Explore Reseller Program",
          href: "#",
          svgType: "partners"
        }
      },
      {
        id: "tech_partners",
        label: "Technology Partners",
        icon: FiCpu,
        headline: "Extend platform integration and directory deployment support.",
        cells: [
          { name: "Integrations", desc: "Seamlessly connect with your existing security ecosystem.", href: "#" },
          { name: "Deployment Support", desc: "Expert guidance to ensure smooth implementation.", href: "#" },
          { name: "Platform Collaboration", desc: "Build joint solutions that enhance security capabilities for our mutual customers.", href: "#" }
        ],
        cta: {
          title: "Partner with our Technology Ecosystem",
          desc: "Build integrations, co-develop joint solutions, and streamline deployments for our mutual customers.",
          label: "Talk to Partnerships",
          href: "#",
          svgType: "partners"
        }
      }
    ]
  },
  company: {
    title: "Company",
    tabs: [
      {
        id: "about",
        label: "About Innvikta",
        icon: FiBriefcase,
        headline: "We help enterprises build everyday secure employee behavior.",
        cells: [
          { name: "Our Story", desc: "Who we are, our team, and our human security mission.", href: "#" },
          { name: "Our Mission", desc: "Transforming workforce vulnerability into defense strength.", href: "#" },
          { name: "Leadership & Team", desc: "Meet the executive team driving security awareness innovation.", href: "#" },
          { name: "Impact & Approach", desc: "Read about our commitment to privacy, clarity, and trust.", href: "#" }
        ],
        cta: {
          title: "Discover our mission",
          desc: "Read about our commitment to secure employee work habits and mitigate social engineering vectors.",
          label: "Read About Us",
          href: "#",
          svgType: "company"
        }
      }
    ]
  }
};

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);

  // Close menus on path changes
  useEffect(() => {
    setActiveMegaMenu(null);
    setShowMenu(false);
  }, [pathname]);

  // States to manage the active mega menu and active tabs per mega menu
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeTabs, setActiveTabs] = useState({
    solutions: "insat",
    resources: "learning_center",
    freetools: "assessments",
    arcade: "arcade_exp",
    partners: "partner_prog",
    company: "about"
  });

  // Mobile navigation state
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [mobileActiveSubTab, setMobileActiveSubTab] = useState(null);

  // Language top strip state
  const [langOpen, setLangOpen] = useState(false);

  // Scroll listener for sticky styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 20 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabHover = (menuKey, tabId) => {
    setActiveTabs((prev) => ({
      ...prev,
      [menuKey]: tabId
    }));
  };

  const handleMenuHover = (menuKey) => {
    setActiveMegaMenu(menuKey);
  };

  const handleMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  const toggleMobileMenu = (menuKey) => {
    setMobileActiveMenu(mobileActiveMenu === menuKey ? null : menuKey);
    setMobileActiveSubTab(null);
  };

  const toggleMobileSubTab = (subTabId) => {
    setMobileActiveSubTab(mobileActiveSubTab === subTabId ? null : subTabId);
  };

  return (
    <>
      <div className="header-height-fix"></div>
      
      <header
        className={`header flex flex-col ${sticky ? "header-sticky" : ""}`}
        ref={headerRef}
        onMouseLeave={handleMenuLeave}
      >
        {/* =========================================================
            LAYER 1: UTILITY STRIP (Enterprise Alignment, Minimal Spacing)
            ========================================================= */}
        <div className="hidden lg:block w-full bg-[#f15a24] border-b border-[#e14a14] h-[40px] transition-all duration-300">
          <div className="container-xl h-full flex items-center justify-between text-[13px] font-bold text-white/90">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 text-white border border-white/30 font-extrabold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">NEW</span>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                InSAT Platform Release 2026: Human Behavior Analytics <FiArrowRight className="text-[12px]" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                <FiSearch className="text-[14px]" /> Search
              </Link>
              <span className="h-3 w-[1px] bg-white/30"></span>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                <FiHelpCircle className="text-[14px]" /> Support
              </Link>
              <span className="h-3 w-[1px] bg-white/30"></span>

              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  onBlur={() => setTimeout(() => setLangOpen(false), 200)}
                  className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <FiGlobe className="text-[14px]" /> English <FiChevronDown className="text-[11px]" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-[140px] bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-slate-400">
                    {["English (US)", "Deutsch", "Français", "Español", "日本語"].map((lang, idx) => (
                      <button key={idx} className="w-full text-left px-3 py-1.5 hover:bg-slate-800 hover:text-white text-slate-400 font-semibold block transition-colors text-xs">
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            LAYER 2: MAIN NAVIGATION BAR (Logo, Navigation & CTA Buttons)
            ========================================================= */}
        <div className="w-full transition-all duration-300 bg-white border-b border-slate-100 h-[80px] relative z-40">
          <div className="container-xl h-full flex items-center justify-between">
            {/* Logo */}
            <div className="z-50">
              <Link href="/">
                <img 
                  src="/images/logo-main.png" 
                  alt="Innvikta" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Main Navigation Items */}
            <ul className="hidden lg:flex items-center gap-5 ml-8 h-full">
              {Object.keys(menuData).map((menuKey) => (
                <li
                  key={menuKey}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleMenuHover(menuKey)}
                >
                  <button className={`nav-link h-full flex items-center gap-1 text-[16.5px] font-bold text-slate-900 hover:text-[#f15a24] transition-colors focus:outline-none ${
                    activeMegaMenu === menuKey ? "text-[#f15a24]" : ""
                  }`}>
                    {menuKey === "arcade" && <IoGameControllerOutline className="text-lg text-[#f15a24]" />}
                    {menuData[menuKey].title}
                    <FiChevronDown className={`text-xs transition-transform duration-200 ${
                      activeMegaMenu === menuKey ? "rotate-180 text-[#f15a24]" : "text-slate-400"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Sticky Conversion Area */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <Link 
                href="#" 
                className="px-4 py-2 bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] text-[#f15a24] hover:text-white rounded-lg text-[13px] font-extrabold transition-all duration-300"
              >
                Start Free
              </Link>
              <Link 
                href="#" 
                className="px-5 py-2 bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg text-[13px] font-bold transition-all duration-300 flex items-center gap-1"
              >
                Book Demo <FiArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <div className="flex items-center lg:hidden z-50">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-800 hover:text-[#f15a24] text-2xl transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {showMenu ? <CgClose /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* =========================================================
              LAYER 3: REDESIGNED MASTER MEGA MENU FLYOUT LAYER
              ========================================================= */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 right-0 top-[80px] w-full bg-white border-t border-slate-100 shadow-[0_30px_50px_-10px_rgba(0,0,0,0.08)] z-50 pointer-events-auto"
                onMouseEnter={() => handleMenuHover(activeMegaMenu)}
                onMouseLeave={handleMenuLeave}
              >
                <div className="w-full mx-auto flex min-h-[480px] w-full">
                  {/* 1. LEFT TAB RAIL (Persistent skeleton anchor) */}
                  <div className="w-[320px] bg-slate-50 border-r border-slate-100 pt-6 pb-12 px-6 flex flex-col gap-2 shrink-0">
                    {menuData[activeMegaMenu].tabs.map((tab) => {
                      const isActive = activeTabs[activeMegaMenu] === tab.id;
                      const isPlaceholder = !tab.href || tab.href === "#";
                      const tabContent = (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <tab.icon className="text-[17px] shrink-0 text-[#f15a24]" />
                            </div>
                            <span className="whitespace-nowrap transition-colors">{tab.label}</span>
                          </div>
                          <FiArrowRight className={`text-xs shrink-0 transition-all duration-200 ${isActive ? "opacity-100 translate-x-0 text-[#f15a24]" : "opacity-0 -translate-x-1 group-hover/tab:opacity-100 group-hover/tab:translate-x-0 group-hover/tab:text-[#f15a24]"}`} />
                        </>
                      );
                      const baseClass = `relative w-full flex items-center justify-between text-left pl-6 pr-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 group/tab ${
                        isActive
                          ? "active-tab-rail"
                          : "inactive-tab-rail"
                      }`;

                      return isPlaceholder ? (
                        <div
                          key={tab.id}
                          onMouseEnter={() => handleTabHover(activeMegaMenu, tab.id)}
                          className={`${baseClass} cursor-pointer`}
                        >
                          {tabContent}
                        </div>
                      ) : (
                        <Link
                          key={tab.id}
                          href={tab.href}
                          onMouseEnter={() => handleTabHover(activeMegaMenu, tab.id)}
                          onClick={handleMenuLeave}
                          className={baseClass}
                        >
                          {tabContent}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Active tab object parsing */}
                  {(() => {
                    const currentTabId = activeTabs[activeMegaMenu] || menuData[activeMegaMenu].tabs[0].id;
                    const currentTab = menuData[activeMegaMenu].tabs.find(t => t.id === currentTabId) || menuData[activeMegaMenu].tabs[0];
                    return (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentTabId}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="flex flex-1 w-full"
                        >
                          {/* 2. CENTER WORKSPACE (Strict 2x2 grid, visually populated) */}
                          <div className="flex-1 pt-6 pb-12 px-12 flex flex-col justify-start">
                            {currentTab.headline && (
                              <div className={`mb-6 max-w-4xl border-b border-slate-100 pb-6 ${currentTab.headlineCta && currentTab.headlineCta.href !== "#" ? 'flex flex-col items-start gap-4' : ''}`}>
                                <h3 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-snug">
                                  {currentTab.headline}
                                </h3>
                                {currentTab.headlineCta && currentTab.headlineCta.href !== "#" && (
                                  <Link 
                                    href={currentTab.headlineCta.href}
                                    onClick={handleMenuLeave}
                                    className="group px-6 py-2.5 bg-[#f15a24] hover:bg-orange-600 text-white font-extrabold rounded-full text-[13px] transition-colors flex items-center gap-1.5 mt-1 hover:shadow-none"
                                  >
                                    {currentTab.headlineCta.label} <FiArrowRight className="text-[13px] transition-transform duration-200 group-hover:translate-x-1" />
                                  </Link>
                                )}
                              </div>
                            )}

                            {/* Strictly 2-column or 3-column layout based on tab config */}
                            <div className={`grid ${currentTab.layout === 'three-column' ? 'grid-cols-3' : 'grid-cols-2'} gap-x-10 gap-y-6 items-start content-start w-full mt-1`}>
                              {currentTab.cells && currentTab.cells.map((cell, idx) => {
                                const isCellPlaceholder = !cell.href || cell.href === "#";
                                const cellContent = (
                                  <>
                                    <span className={`text-[#f15a24] text-[16px] font-bold inline-flex items-center gap-1 ${!isCellPlaceholder ? "group-hover/item:text-orange-600 transition-colors" : ""}`}>
                                      {cell.name}
                                      {!isCellPlaceholder && <FiArrowRight className="text-[11px] opacity-100 translate-x-0.5 group-hover/item:translate-x-1.5 transition-transform text-[#f15a24] group-hover/item:text-orange-600" />}
                                    </span>
                                    {cell.desc && (
                                      <p className={`text-[13px] text-slate-700 font-semibold leading-normal mt-1 ${!isCellPlaceholder ? "group-hover/item:text-slate-900 transition-colors" : ""}`}>
                                        {cell.desc}
                                      </p>
                                    )}
                                    
                                    {/* Chips rendering */}
                                    {cell.chips && (
                                      <div className={`flex ${currentTab.id === 'customized_solutions' ? 'flex-wrap' : 'flex-col'} gap-2 mt-3.5 items-start`}>
                                        {cell.chips.map((chip, i) => (
                                          <span key={i} className={`text-[12px] font-bold border rounded-md flex items-center gap-1.5 px-2 py-0.5 ${
                                            isCellPlaceholder 
                                              ? 'bg-slate-50 text-slate-500 border-slate-100'
                                              : chip.isMore 
                                                ? 'bg-transparent text-slate-400 border-transparent hover:text-[#f15a24] transition-colors' 
                                                : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-orange-200 hover:text-[#f15a24] hover:bg-orange-50/50 transition-colors'
                                          }`}>
                                            {chip.icon && <chip.icon className="text-[12px] opacity-60" />}
                                            {chip.label}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                );

                                return (
                                  <div key={idx} className="group/item flex flex-col justify-start">
                                    {isCellPlaceholder ? (
                                      <div className="block py-0.5 cursor-default">
                                        {cellContent}
                                      </div>
                                    ) : (
                                      <Link 
                                        href={cell.href}
                                        onClick={handleMenuLeave}
                                        className="block py-0.5"
                                      >
                                        {cellContent}
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                            </div>


                          </div>

                          {/* 3. FEATURED CARD (Integrated conversion card) */}
                          {currentTab.cta && (
                            <div className="w-[360px] pt-6 pb-12 px-6 border-l border-slate-100 bg-transparent shrink-0 flex flex-col justify-start">
                              <div className="bg-slate-50 rounded-2xl p-5 flex flex-col gap-5 shadow-sm border border-slate-100 relative">
                                <div className="flex flex-col gap-3">
                                  <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-2 relative group-hover/card:shadow-md transition-shadow">
                                    {currentTab.cta.image && (
                                      <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                                        Featured
                                      </div>
                                    )}
                                    {currentTab.cta.image ? (
                                      <img src={currentTab.cta.image} alt={currentTab.cta.title} className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                      <div className="p-3">
                                        <RenderSvgIllustration type={currentTab.cta.svgType} />
                                      </div>
                                    )}
                                  </div>
                                  <h5 className="text-[15px] font-medium text-slate-800 leading-snug">
                                    {currentTab.cta.title}
                                  </h5>
                                  {/* Description removed to reduce text as requested */}
                                </div>
                                <Link 
                                  href={currentTab.cta.href || "#"}
                                  onClick={handleMenuLeave}
                                  className="w-full justify-center text-center py-3 bg-[#f15a24] hover:bg-orange-600 text-white font-extrabold rounded-lg text-xs transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-md shadow-orange-500/10"
                                >
                                  {currentTab.cta.label} <FiArrowRight className="text-xs" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================
            MOBILE ACCORDION-BASED MENU (Preserves Information Hierarchy)
            ========================================================= */}
        <div className={`fixed inset-x-0 top-0 h-screen bg-white z-30 px-6 pt-24 pb-28 overflow-y-auto transition-all duration-500 lg:hidden flex flex-col justify-between ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="space-y-3">
            {Object.keys(menuData).map((menuKey) => {
              const menu = menuData[menuKey];
              const isMenuOpen = mobileActiveMenu === menuKey;

              return (
                <div key={menuKey} className="border-b border-slate-100 pb-2">
                  <button 
                    onClick={() => toggleMobileMenu(menuKey)}
                    className="w-full flex items-center justify-between text-left text-slate-800 text-base font-extrabold py-2 focus:outline-none"
                  >
                    <span className={isMenuOpen ? "text-[#f15a24]" : ""}>{menu.title}</span>
                    <FiChevronDown className={`transform transition-transform duration-300 ${isMenuOpen ? "rotate-180 text-[#f15a24]" : "text-slate-400"}`} />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[1200px] opacity-100 mt-2 pl-3 border-l-2 border-[#f15a24]/20" : "max-h-0 opacity-0"}`}>
                    <div className="space-y-4 py-2">
                      {menu.tabs.map((tab) => {
                        const isSubTabOpen = mobileActiveSubTab === tab.id;
                        return (
                          <div key={tab.id} className="space-y-2">
                            <button
                              onClick={() => toggleMobileSubTab(tab.id)}
                              className="w-full flex items-center justify-between text-left text-[14px] font-bold text-slate-700 focus:outline-none"
                            >
                              <span className="flex items-center gap-2">
                                <tab.icon className="text-[#f15a24] text-xs" />
                                {tab.label}
                              </span>
                              <FiChevronDown className={`transform transition-transform duration-300 text-xs ${isSubTabOpen ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`transition-all duration-300 overflow-hidden pl-4 ${isSubTabOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                              <ul className="space-y-3 py-1 border-l border-slate-100 pl-3">
                                {tab.cells && tab.cells.map((cell, idx) => {
                                  const isCellPlaceholder = !cell.href || cell.href === "#";
                                  const cellContent = (
                                    <>
                                      <span className="text-slate-700 hover:text-[#f15a24] text-xs font-bold block">
                                        {cell.name}
                                      </span>
                                      {cell.desc && (
                                        <p className="text-[10px] text-slate-400 font-medium leading-tight">
                                          {cell.desc}
                                        </p>
                                      )}
                                      {cell.chips && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                          {cell.chips.map((chip, i) => (
                                            <span key={i} className="text-[10.5px] font-bold border rounded bg-slate-50 text-slate-500 border-slate-100 px-1.5 py-0.5">
                                              {chip.label}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  );

                                  return (
                                    <li key={idx}>
                                      {isCellPlaceholder ? (
                                        <div className="block py-1 cursor-default">
                                          {cellContent}
                                        </div>
                                      ) : (
                                        <Link 
                                          href={cell.href} 
                                          onClick={() => setShowMenu(false)}
                                          className="block py-1"
                                        >
                                          {cellContent}
                                        </Link>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Mobile Sticky CTAs */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 mt-6">
            <Link 
              href="#" 
              onClick={() => setShowMenu(false)}
              className="w-full text-center py-3 bg-[#f15a24] text-white font-extrabold rounded-lg text-sm shadow-md shadow-orange-500/10"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
