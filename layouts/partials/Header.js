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
            href: "/solutions/insat#security-awareness-training",
            chips: [{ label: "Role-Based Modules" }, { label: "Story-Based Simulations" }]
          },
          { 
            name: "Interactive Gamified Arcade", 
            desc: "Bite-sized microlearning games and quizzes that motivate participation.", 
            href: "/solutions/insat#interactive-gamified-arcade",
            chips: [{ label: "Gamified / Interactive Modules" }, { label: "Policy Reinforcement" }]
          },
          { 
            name: "AI Adaptive Learning", 
            desc: "Personalized paths adjusted dynamically to user risk profiles.", 
            href: "/solutions/insat#ai-adaptive-learning",
            chips: [{ label: "Personalized Learning Paths" }, { label: "Dynamic Risk Profiling" }]
          },
          { 
            name: "Human Risk Intelligence", 
            desc: "Turn awareness data into measurable, board-ready risk scoring and visibility.", 
            href: "/solutions/insat#human-risk-intelligence",
            chips: [{ label: "Risk Dashboards" }, { label: "Behavioral Analytics" }]
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
            href: "/solutions/phishing-simulation#multi-vector-attack",
            chips: [
              { label: "Smishing Simulation", href: "/solutions/phishing-simulation#smishing-whatsapp" },
              { label: "WhatsApp Simulation", href: "/solutions/phishing-simulation#smishing-whatsapp" }
            ]
          },
          { 
            name: "Vishing Simulation", 
            desc: "Automated phone tests simulating voice-based social engineering threats.", 
            href: "/solutions/phishing-simulation#vishing-simulation",
            chips: [
              { label: "Voice Attack Scenarios", href: "/solutions/phishing-simulation#vishing-simulation" },
              { label: "AI-Led Variants", href: "/solutions/phishing-simulation#ai-led-scenario-variants" }
            ]
          },
          { 
            name: "Audience Segmentation", 
            desc: "Auto-generate dynamic templates based on current local threat vectors.", 
            href: "/solutions/phishing-simulation#audience-segmentation",
            chips: [{ label: "Campaign Scheduling" }, { label: "Difficulty Progression" }]
          },
          { 
            name: "AI-Led Scenario Variants", 
            desc: "Escalate difficulty levels dynamically based on employee susceptibility.", 
            href: "/solutions/phishing-simulation#ai-led-scenario-variants",
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
        id: "compliance_training",
        label: "Compliance Training",
        href: "/solutions/compliance-training",
        icon: FiCheckCircle,
        headline: "Meet regulatory mandates and reinforce critical privacy policies.",
        cells: [
          { 
            name: "Compliance Learning Suite", 
            desc: "Satisfy GDPR, HIPAA, PCI-DSS, and India's DPDP Act requirements.", 
            href: "/solutions/compliance-training#compliance-learning-suite",
            chips: [{ label: "GDPR Awareness" }, { label: "HIPAA Awareness" }]
          },
          { 
            name: "Acknowledgement Tracking", 
            desc: "Track and log employee policy agreements and corporate code sign-offs.", 
            href: "/solutions/compliance-training#acknowledgement-tracking",
            chips: [{ label: "Completion Logs" }, { label: "Audit Records" }]
          },
          { 
            name: "Refresher Campaigns", 
            desc: "Automatically deploy compliance courses to specific high-risk user groups.", 
            href: "/solutions/compliance-training#refresher-campaigns",
            chips: [{ label: "Governance Reinforcement" }, { label: "Ongoing Compliance Education" }]
          },
          { 
            name: "Audit-Ready Evidence", 
            desc: "Generate automated training completion records to satisfy security framework audits.", 
            href: "/solutions/compliance-training#audit-ready-evidence",
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
            href: "/solutions/customized-solutions#industry-specific-portals",
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
            href: "/solutions/customized-solutions#departmental-learning-paths",
            chips: [
              { label: "Remote Workforce Security", icon: FiCloud },
              { label: "Human Risk Management", icon: FiActivity }
            ]
          },
          { 
            name: "Executive Risk Management", 
            desc: "Deploy specialized campaigns to high-target C-suite and finance teams.", 
            href: "/solutions/customized-solutions#executive-risk-management",
            chips: [
              { label: "Executive Risk Reporting", icon: FiBarChart2 },
              { label: "Phishing Prevention", icon: FiLock }
            ]
          },
          { 
            name: "Culture Benchmark Studies", 
            desc: "Assess and compare security culture indexes across remote workforces.", 
            href: "/solutions/customized-solutions#culture-benchmark-studies",
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
          label: "Get Guidance",
          href: "/cyberhelp"
        },
        cells: [
          { name: "Incident Reporting Guide", desc: "Step-by-step assistance for victims to understand, document, and report cyber incidents effectively.", href: "/cyberhelp/register" },
          { name: "Complaint Filing Support", desc: "Guided NCRP complaint filing walkthroughs with actionable reporting instructions and support resources.", href: "/cyberhelp/filing-guide" },
          { name: "Emergency Account Freeze", desc: "Quick access to emergency banking and UPI account freeze guidance to reduce fraud impact immediately.", href: "/cyberhelp/freeze" },
          { name: "Cyber Helpline Directory", desc: "Search verified national, state, banking, and cybercrime support contacts in one centralized place.", href: "/cyberhelp/directory" },
          { name: "Evidence Vault & Report Templates", desc: "Organize cyber evidence securely and use ready-made complaint templates for faster reporting.", href: "/cyberhelp/evidence" },
          { name: "Scam Awareness & Cyber Alerts", desc: "Stay informed about scam trends, fraud warnings, cyber safety tips, and interactive awareness resources.", href: "/cyberhelp/alerts" }
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
        headline: "Read the latest cybersecurity blog posts and explore our comprehensive glossary.",
        cells: [
          { name: "Security Blog", desc: "Latest threat research findings and awareness campaign tips.", href: "/blog" },
          { name: "Glossary", desc: "A comprehensive glossary of cybersecurity terms and concepts.", href: "/resources/glossary" }
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
        headline: "Get data-driven security maturity benchmarks and real-world case studies.",
        cells: [
          { name: "Maturity Benchmarks", desc: "Compare regional click rates and reporting rates against industry peers.", href: "/maturity-benchmarks" },
          { name: "Case Studies", desc: "Success stories from real enterprise security leadership teams.", href: "/resources/case-studies" }
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
        headline: "Stay up to date with the latest platform updates and security insights.",
        cells: [
          { name: "Platform Updates", desc: "See the latest features added to the Innvikta training suite.", href: "/platform-updates" },
          { name: "Weekly Newsletter", desc: "Security tips and campaign ideas delivered directly to your inbox.", href: "#" }
        ],
        cta: {
          title: "Join our next live webinar",
          desc: "Register to watch expert panels dissect active social engineering vectors live.",
          label: "Register Now",
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
          { name: "Baseline Score Tool", desc: "Get a baseline human risk score for your active domain.", href: "/freetools/baseline-score-tool" },
          { name: "Culture Benchmarking", desc: "Measure security culture indicators and threat reports.", href: "/freetools/culture-benchmarking" }
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
          { name: "Free Password Generator", desc: "Create secure passwords and check credential strength locally.", href: "/freetools/password-generator" },
          { name: "Domain Security Analyzer", desc: "Scan SPF, DKIM, and DMARC record vulnerabilities.", href: "/freetools/domain-security-analyzer" },
          { name: "Spot The Phish", desc: "Test your ability to detect phishing emails in an interactive simulator.", href: "/freetools/spot-the-phish" },
          { name: "Simulation ROI Tool", desc: "Estimate potential cost savings from threat training campaigns.", href: "/resources/simulation-roi" }
        ],
        cta: {
          title: "Check password exposure logs",
          desc: "Analyze if employee credentials exist on public breach indexes securely.",
          label: "Run Tool",
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
          { name: "Story-Based Learning", desc: "Cinematic, scenario-driven interactive modules.", href: "/cyber-arcade" },
          { name: "Missions & Quests", desc: "Simulated security assignments for active play.", href: "/cyber-arcade" },
          { name: "Topic-Based Modules", desc: "Mini-games targeting specific security topics.", href: "/cyber-arcade#section-games" },
          { name: "Free Arcade Challenges", desc: "Try arcade modules without a full workspace setup.", href: "/cyber-arcade" }
        ],
        cta: {
          title: "Explore Innvikta Arcade",
          desc: "Utilize interactive gamified lessons that build defensive employee habits through story play.",
          label: "Launch a Free Challenge",
          href: "/cyber-arcade",
          svgType: "arcade"
        }
      },
      {
        id: "gamification_sys",
        label: "Gamification System",
        icon: FiAward,
        headline: "Keep employees motivated with progression, badges, and rewards.",
        cells: [
          { name: "Badges & XP", desc: "Reward milestone achievements and daily login streaks.", href: "/cyber-arcade" },
          { name: "Leaderboards", desc: "Encourage friendly security culture competition.", href: "/cyber-arcade" },
          { name: "Progression Paths", desc: "Unlock corporate career stages as skills advance.", href: "/cyber-arcade" },
          { name: "Arcade Rewards Store", desc: "Redeem XP points for custom achievements and items.", href: "/cyber-arcade" }
        ],
        cta: {
          title: "Increase employee participation rates",
          desc: "Leverage gamification mechanics to achieve up to 94% training engagement rates.",
          label: "See Arcade Benefits",
          href: "/cyber-arcade",
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
        headline: "Grow with a modern security awareness and human risk platform built for enterprises.",
        cells: [
          { name: "Partner Program", desc: "Collaborate with Innvikta to deliver modern security awareness solutions.", href: "/partners" },
          { name: "Co-Selling", desc: "Partner with our sales experts to close deals and drive mutual revenue.", href: "/partners#support" },
          { name: "Growth Support", desc: "Access tier pricing, marketing assets, and co-marketing funds.", href: "/partners#support" }
        ],
        cta: {
          title: "Join our partner network",
          desc: "Expand your portfolio with our leading security awareness and human risk analytics tools.",
          label: "Become a Partner",
          href: "/partners#form",
          svgType: "partners"
        }
      },
      {
        id: "reseller",
        label: "Channel & Reseller",
        icon: FiShield,
        headline: "Offer Innvikta’s awareness, simulation, compliance, and human risk solutions to your clients.",
        cells: [
          { name: "Resellers", desc: "Offer Innvikta's training and human risk solutions to your clients.", href: "/partners#reseller" },
          { name: "Consultants", desc: "Integrate human risk intelligence into your security consulting services.", href: "/partners#reseller" },
          { name: "IT Partners", desc: "Equip your IT offerings with easy-to-manage training and phishing tools.", href: "/partners#reseller" }
        ],
        cta: {
          title: "Access white-label reseller tools",
          desc: "Rebrand the training experience and deliver human risk visibility as a managed service.",
          label: "Explore Reseller Program",
          href: "/partners#form",
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
        href: "/about",
        icon: FiBriefcase,
        headline: "We help enterprises build everyday secure employee behavior.",
        cells: [
          { name: "Our Story", desc: "Who we are, our team, and our human security mission.", href: "/about#our-story" },
          { name: "Our Mission", desc: "Transforming workforce vulnerability into defense strength.", href: "/about#our-mission" },
          { name: "Leadership & Team", desc: "Meet the executive team driving security awareness innovation.", href: "/about#leadership-team" },
          { name: "Impact & Approach", desc: "Read about our commitment to privacy, clarity, and trust.", href: "/about#impact-approach" }
        ],
        cta: {
          title: "Discover our mission",
          desc: "Read about our commitment to secure employee work habits and mitigate social engineering vectors.",
          label: "Read About Us",
          href: "/about",
          svgType: "company"
        }
      }
    ]
  }
};

const searchIndex = [
  {
    title: "Security Awareness Training",
    description: "Cinematic, role-based courses that engage employees and satisfy compliance audits.",
    url: "/solutions/insat",
    category: "Solutions",
    keywords: ["insat", "training", "modules", "awareness", "gamification", "arcade", "microlearning"]
  },
  {
    title: "Interactive Gamified Arcade",
    description: "Bite-sized microlearning games and quizzes that motivate participation.",
    url: "/solutions/insat",
    category: "Solutions",
    keywords: ["arcade", "game", "gamified", "quiz", "points", "xp", "badges", "rewards"]
  },
  {
    title: "Phishing Simulation",
    description: "Personalized phishing simulations that teach, test, and strengthen workforce response.",
    url: "/solutions/phishing-simulation",
    category: "Solutions",
    keywords: ["phishing", "simulation", "sms", "whatsapp", "qr code", "templates", "email", "vishing"]
  },
  {
    title: "Human Risk Intelligence",
    description: "Turn awareness data into measurable, board-ready human risk visibility and risk scores.",
    url: "/solutions/human-risk-intelligence",
    category: "Solutions",
    keywords: ["analytics", "risk score", "dashboard", "heatmap", "reporting", "ciso", "roi"]
  },
  {
    title: "Compliance Training",
    description: "Satisfy GDPR, HIPAA, PCI-DSS, and India's DPDP Act requirements.",
    url: "/solutions/compliance-training",
    category: "Solutions",
    keywords: ["compliance", "gdpr", "hipaa", "dpdp", "audit", "policy", "regulations"]
  },
  {
    title: "Customized Solutions",
    description: "Tailored training for your people, risks, and industry with customized learning paths.",
    url: "/solutions/customized-solutions",
    category: "Solutions",
    keywords: ["custom", "industry", "bfsi", "healthcare", "manufacturing", "remote", "department"]
  },
  {
    title: "Partner Program",
    description: "Collaborate with Innvikta to deliver modern security awareness solutions, co-selling, and reseller support.",
    url: "/partners",
    category: "Company & Partners",
    keywords: ["partners", "reseller", "channel", "growth", "co-selling", "collaborate", "alliance"]
  },
  {
    title: "About Innvikta",
    description: "Learn about our story, mission, leadership, and our human security mission.",
    url: "/about",
    category: "Company & Partners",
    keywords: ["about", "story", "mission", "leadership", "team", "innvikta"]
  },
  {
    title: "Free Baseline Risk Score Assessment",
    description: "Verify baseline employee susceptibility in less than 5 minutes.",
    url: "/freetools/baseline-score-tool",
    category: "Free Tools",
    keywords: ["baseline", "calculator", "risk estimator", "free tool"]
  },
  {
    title: "Free Security Culture Benchmarking",
    description: "Measure security culture indicators and threat reports across your industry.",
    url: "/freetools/culture-benchmarking",
    category: "Free Tools",
    keywords: ["culture", "benchmark", "indicator", "survey", "free tool"]
  },
  {
    title: "Free Domain Security Analyzer",
    description: "Scan SPF, DKIM, and DMARC record vulnerabilities for your active domain.",
    url: "/freetools/domain-security-analyzer",
    category: "Free Tools",
    keywords: ["domain", "spf", "dkim", "dmarc", "scanner", "email security", "free tool"]
  },
  {
    title: "Start Free Trial",
    description: "Start building a stronger security culture with free awareness training modules and cybersecurity games.",
    url: "/start-free",
    category: "Get Started",
    keywords: ["start free", "trial", "register", "free account"]
  },
  {
    title: "Book A Demo",
    description: "Schedule a live demo session with our product experts.",
    url: "/book-demo",
    category: "Get Started",
    keywords: ["demo", "book", "schedule", "product demo", "meeting"]
  },
  {
    title: "Cybersecurity Glossary",
    description: "A comprehensive glossary of cybersecurity terms, threat vectors, and compliance standards.",
    url: "/resources/glossary",
    category: "Resources",
    keywords: ["glossary", "dictionary", "terms", "definitions", "cybersecurity", "phishing", "bec"]
  }
];

const languageMap = {
  "English (US)": "en",
  "Deutsch": "de",
  "Français": "fr",
  "Español": "es",
  "日本語": "ja"
};

// Get current language from googtrans cookie
const getLangFromCookie = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'English (US)';
  const match = document.cookie.match(/googtrans=\/([^/]+)\/([^;]+)/);
  if (match && match[2]) {
    const code = match[2];
    const reverseMap = {
      'en': 'English (US)',
      'de': 'Deutsch',
      'fr': 'Français',
      'es': 'Español',
      'ja': '日本語'
    };
    return reverseMap[code] || 'English (US)';
  }
  return 'English (US)';
};

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Close menus and search on path changes
  useEffect(() => {
    setActiveMegaMenu(null);
    setShowMenu(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Re-apply translation on route change
  useEffect(() => {
    const currentLang = getLangFromCookie();
    if (currentLang !== 'English (US)') {
      const timer = setTimeout(() => {
        const langCode = languageMap[currentLang] || 'en';
        const selectEl = document.querySelector('#global_google_translate_element select.goog-te-combo');
        if (selectEl) {
          selectEl.value = langCode;
          selectEl.dispatchEvent(new Event('change'));
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Auto focus input when search overlay is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Reset active result index when query changes
  useEffect(() => {
    setActiveSearchIndex(-1);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

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
  const [selectedLang, setSelectedLang] = useState("English (US)");

  // Initialize global Google Translate
  useEffect(() => {
    // Set initial display language from cookie if present
    setSelectedLang(getLangFromCookie());

    const initGlobalTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,de,fr,es,ja,hi,mr' // Support English, German, French, Spanish, Japanese, Hindi, Marathi
          },
          'global_google_translate_element'
        );
      }
    };

    window.globalGoogleTranslateElementInit = initGlobalTranslate;

    // Load Google Translate script if not loaded
    if (window.google && window.google.translate) {
      initGlobalTranslate();
    } else if (!document.querySelector('#global-google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'global-google-translate-script';
      addScript.src = 'https://translate.google.com/translate_a/element.js?cb=globalGoogleTranslateElementInit';
      document.body.appendChild(addScript);
    }
  }, []);

  const handleLanguageChange = (langName) => {
    setSelectedLang(langName);
    const langCode = languageMap[langName] || 'en';

    const triggerChange = () => {
      const selectEl = document.querySelector('#global_google_translate_element select.goog-te-combo');
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (!triggerChange()) {
      // Retry for up to 2 seconds if the script is still loading
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerChange() || attempts > 20) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  // Scroll listener for sticky styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 20 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredResults = searchQuery.trim() === "" 
    ? [] 
    : searchIndex.filter(item => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.keywords.some(kw => kw.toLowerCase().includes(query)) ||
               item.category.toLowerCase().includes(query);
      });

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSearchIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSearchIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSearchIndex >= 0 && activeSearchIndex < filteredResults.length) {
        const targetUrl = filteredResults[activeSearchIndex].url;
        setIsSearchOpen(false);
        setSearchQuery("");
        window.location.href = targetUrl;
      }
    }
  };

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
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery("");
                }}
                className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <FiSearch className="text-[14px]" /> Search
              </button>
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
                  <FiGlobe className="text-[14px]" /> {selectedLang} <FiChevronDown className="text-[11px]" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-[140px] bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-slate-400">
                    {["English (US)", "Deutsch", "Français", "Español", "日本語"].map((lang, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleLanguageChange(lang)}
                        className="w-full text-left px-3 py-1.5 hover:bg-slate-800 hover:text-white text-slate-400 font-semibold block transition-colors text-xs"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
                {/* Global Google Translate Element */}
                <div id="global_google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}></div>
              </div>
            </div>
          </div>
        </div>
 
        {/* =========================================================
            LAYER 2: MAIN NAVIGATION BAR (Logo, Navigation & CTA Buttons)
            ========================================================= */}
        <div className="w-full transition-all duration-300 bg-white border-b border-slate-100 h-[80px] relative z-40">
          {/* Search Overlay Container */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 w-full h-[80px] bg-white z-[60] flex items-center border-b border-slate-100"
              >
                <div className="container-xl flex items-center justify-center gap-4 w-full relative">
                  <div className="relative flex-1 max-w-[800px]">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search for offerings, solutions, tools..."
                      className="w-full px-6 py-2.5 bg-white border border-slate-200 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-full text-slate-800 placeholder-slate-400 focus:outline-none pr-12 text-sm transition-all font-semibold"
                    />
                    <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#f15a24] text-lg pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-[#f15a24] transition-colors p-2 cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                    aria-label="Close search"
                  >
                    <CgClose className="text-xl stroke-[1px]" />
                  </button>

                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {searchQuery.trim() !== "" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        ref={searchResultsRef}
                        className="absolute left-0 right-0 top-[60px] mx-auto max-w-[800px] bg-white border border-slate-100 rounded-2xl shadow-xl z-[70] overflow-hidden max-h-[450px] overflow-y-auto"
                      >
                        {filteredResults.length === 0 ? (
                          <div className="p-8 text-center text-slate-400 font-semibold">
                            No results found for <span className="text-[#f15a24]">"{searchQuery}"</span>
                          </div>
                        ) : (
                          <div className="p-4 space-y-4 text-left">
                            {Array.from(new Set(filteredResults.map(r => r.category))).map(category => (
                              <div key={category} className="space-y-1.5">
                                <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase px-3">
                                  {category}
                                </div>
                                <div className="space-y-1">
                                  {filteredResults
                                    .filter(r => r.category === category)
                                    .map((result) => {
                                      const globalIdx = filteredResults.indexOf(result);
                                      const isSelected = globalIdx === activeSearchIndex;
                                      return (
                                        <Link
                                          key={result.title}
                                          href={result.url}
                                          onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                          }}
                                          className={`block p-3 rounded-xl transition-all ${
                                            isSelected 
                                              ? "bg-orange-50/70 border-l-4 border-[#f15a24] pl-2" 
                                              : "hover:bg-slate-50 border-l-4 border-transparent"
                                          }`}
                                        >
                                          <div className="font-bold text-[14px] text-slate-800 flex items-center justify-between">
                                            <span>{result.title}</span>
                                            <FiArrowRight className={`text-xs text-[#f15a24] transition-transform ${isSelected ? "translate-x-1" : "opacity-0"}`} />
                                          </div>
                                          <div className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                                            {result.description}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`relative container-xl h-full flex items-center justify-between transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {/* Logo */}
            <div className="z-50 shrink-0 flex items-center">
              <Link href="/">
                <img 
                  src="/images/logo-main.png" 
                  alt="Innvikta" 
                  className="h-8 lg:h-7 xl:h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Main Navigation Items */}
            <ul className="hidden lg:flex items-center justify-center lg:gap-3 xl:gap-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2 h-full desktop-nav-menu">
              {Object.keys(menuData).map((menuKey) => (
                <li
                  key={menuKey}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleMenuHover(menuKey)}
                >
                  <button className={`nav-link h-full flex items-center text-slate-900 hover:text-[#f15a24] transition-colors focus:outline-none whitespace-nowrap ${
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
            <div className="hidden lg:flex items-center ml-auto relative">
              {/* Partner CTA */}
              <div className={`transition-all duration-300 flex items-center h-full ${pathname === "/partners" ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4 absolute right-0"}`}>
                <Link 
                  href="#form" 
                  className="px-4 xl:px-6 py-2 bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg text-[12px] xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1 border border-[#f15a24] hover:border-orange-600 whitespace-nowrap"
                >
                  Become a Partner <FiArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Standard CTAs */}
              <div className={`header-cta-buttons transition-all duration-300 flex items-center h-full ${pathname !== "/partners" ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4 absolute right-0"}`}>
                <Link 
                  href="/start-free" 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] text-[#f15a24] hover:text-white rounded-lg transition-all duration-300 whitespace-nowrap header-cta-start-free"
                >
                  Start Free
                </Link>
                <Link 
                  href="/book-demo" 
                  className="bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg transition-all duration-300 flex items-center gap-1 whitespace-nowrap header-cta-book-demo"
                >
                  Book A Demo <FiArrowRight className="text-xs" />
                </Link>
              </div>
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
                className="absolute left-0 right-0 top-[80px] w-full bg-white border-t border-slate-100 shadow-[0_30px_50px_-10px_rgba(0,0,0,0.08)] z-50 pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar"
                onMouseEnter={() => handleMenuHover(activeMegaMenu)}
                onMouseLeave={handleMenuLeave}
              >
                <div className="container-xl mx-auto flex min-h-[380px] lg:min-h-[420px] xl:min-h-[460px]">
                  {/* 1. LEFT TAB RAIL (Persistent skeleton anchor) */}
                  <div className="w-[240px] xl:w-[280px] 2xl:w-[320px] bg-slate-50 border-r border-slate-100 pt-4 pb-8 xl:pt-6 xl:pb-12 px-2 xl:px-4 flex flex-col gap-2 shrink-0">
                    {menuData[activeMegaMenu].tabs.map((tab) => {
                      const isActive = activeTabs[activeMegaMenu] === tab.id;
                      const isPlaceholder = !tab.href || tab.href === "#";
                      const tabContent = (
                        <>
                          <div className="flex items-center gap-2 xl:gap-3">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <tab.icon className="text-[17px] shrink-0 text-[#f15a24]" />
                            </div>
                            <span className="whitespace-nowrap transition-colors">{tab.label}</span>
                          </div>
                          <FiArrowRight className={`text-xs shrink-0 transition-all duration-200 ${isActive ? "opacity-100 translate-x-0 text-[#f15a24]" : "opacity-0 -translate-x-1 group-hover/tab:opacity-100 group-hover/tab:translate-x-0 group-hover/tab:text-[#f15a24]"}`} />
                        </>
                      );
                      const baseClass = `relative w-full flex items-center justify-between text-left pl-3 xl:pl-5 pr-2 xl:pr-4 py-2.5 rounded-lg text-[13.5px] xl:text-[14px] font-semibold transition-all duration-200 group/tab ${
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
                          <div className="flex-1 pt-4 pb-8 xl:pt-6 xl:pb-12 px-4 xl:px-12 flex flex-col justify-start">
                             {currentTab.headline && (
                               <div className={`mb-6 max-w-4xl border-b border-slate-100 pb-6 ${currentTab.headlineCta ? 'flex flex-col items-start gap-4' : ''}`}>
                                 <h3 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-snug">
                                   {currentTab.headline}
                                 </h3>
                                 {currentTab.headlineCta && (
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
                            <div className={`grid ${currentTab.layout === 'three-column' ? 'grid-cols-3' : 'grid-cols-2'} lg:gap-x-4 xl:gap-x-10 gap-y-6 items-start content-start w-full mt-1`}>
                              {currentTab.cells && currentTab.cells.map((cell, idx) => {
                                const isCellPlaceholder = !cell.href || cell.href === "#";
                                return (
                                  <div key={idx} className="group/item flex flex-col justify-start py-0.5">
                                    {isCellPlaceholder ? (
                                      <span className="text-[#f15a24] lg:text-[14px] xl:text-[16px] font-bold inline-flex items-center gap-1">
                                        {cell.name}
                                      </span>
                                    ) : (
                                      <Link 
                                        href={cell.href}
                                        onClick={handleMenuLeave}
                                        className="text-[#f15a24] lg:text-[14px] xl:text-[16px] font-bold inline-flex items-center gap-1 group-hover/item:text-orange-600 transition-colors"
                                      >
                                        {cell.name}
                                        <FiArrowRight className="text-[11px] opacity-100 translate-x-0.5 group-hover/item:translate-x-1.5 transition-transform text-[#f15a24] group-hover/item:text-orange-600" />
                                      </Link>
                                    )}

                                    {cell.desc && (
                                      isCellPlaceholder ? (
                                        <p className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1">
                                          {cell.desc}
                                        </p>
                                      ) : (
                                        <Link 
                                          href={cell.href}
                                          onClick={handleMenuLeave}
                                          className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1 group-hover/item:text-slate-950 transition-colors block"
                                        >
                                          {cell.desc}
                                        </Link>
                                      )
                                    )}

                                    {/* Chips rendering */}
                                    {cell.chips && (
                                      <div className={`flex ${currentTab.id === 'customized_solutions' ? 'flex-wrap' : 'flex-col'} gap-2 mt-3.5 items-start`}>
                                        {cell.chips.map((chip, i) => {
                                          const chipClass = `text-[12px] font-bold border rounded-md flex items-center gap-1.5 px-2 py-0.5 ${
                                            isCellPlaceholder 
                                              ? 'bg-slate-50 text-slate-500 border-slate-100'
                                              : chip.isMore 
                                                ? 'bg-transparent text-slate-400 border-transparent hover:text-[#f15a24] transition-colors' 
                                                : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-orange-200 hover:text-[#f15a24] hover:bg-orange-50/50 transition-colors'
                                          }`;
                                          
                                          const chipContent = (
                                            <>
                                              {chip.icon && <chip.icon className="text-[12px] opacity-60" />}
                                              {chip.label}
                                            </>
                                          );

                                          if (chip.href) {
                                            return (
                                              <Link 
                                                key={i} 
                                                href={chip.href}
                                                onClick={handleMenuLeave}
                                                className={chipClass}
                                              >
                                                {chipContent}
                                              </Link>
                                            );
                                          }

                                          return (
                                            <span key={i} className={chipClass}>
                                              {chipContent}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>


                          </div>

                          {/* 3. FEATURED CARD (Integrated conversion card) */}
                          {currentTab.cta && (
                            <div className="w-[220px] lg:w-[260px] xl:w-[320px] 2xl:w-[360px] pt-4 pb-8 xl:pt-6 xl:pb-12 px-3 xl:px-6 border-l border-slate-100 bg-transparent shrink-0 flex flex-col justify-start">
                              <div className="bg-slate-50 rounded-2xl p-3 xl:p-5 flex flex-col gap-3 xl:gap-5 shadow-sm border border-slate-100 relative">
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
                                  <h5 className="text-[13px] xl:text-[15px] font-medium text-slate-800 leading-snug">
                                    {currentTab.cta.title}
                                  </h5>
                                  {/* Description removed to reduce text as requested */}
                                </div>
                                <Link 
                                  href={currentTab.cta.href || "#"}
                                  onClick={handleMenuLeave}
                                  className="w-full justify-center text-center py-2.5 xl:py-3 bg-[#f15a24] hover:bg-orange-600 text-white font-semibold whitespace-nowrap rounded-lg text-[10px] xl:text-xs transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-md shadow-orange-500/10"
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
                                  return (
                                    <li key={idx} className="block py-1">
                                      {isCellPlaceholder ? (
                                        <span className="text-slate-700 text-xs font-bold block">
                                          {cell.name}
                                        </span>
                                      ) : (
                                        <Link 
                                          href={cell.href} 
                                          onClick={() => setShowMenu(false)}
                                          className="text-[#f15a24] hover:text-orange-600 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                                        >
                                          {cell.name}
                                          <FiArrowRight className="text-[10px]" />
                                        </Link>
                                      )}
                                      
                                      {cell.desc && (
                                        isCellPlaceholder ? (
                                          <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                                            {cell.desc}
                                          </p>
                                        ) : (
                                          <Link
                                            href={cell.href}
                                            onClick={() => setShowMenu(false)}
                                            className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5 hover:text-[#f15a24]"
                                          >
                                            {cell.desc}
                                          </Link>
                                        )
                                      )}

                                      {cell.chips && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                          {cell.chips.map((chip, i) => {
                                            const chipClass = "text-[10.5px] font-bold border rounded bg-slate-50 text-slate-500 border-slate-100 px-1.5 py-0.5";
                                            if (chip.href) {
                                              return (
                                                <Link 
                                                  key={i}
                                                  href={chip.href}
                                                  onClick={() => setShowMenu(false)}
                                                  className={chipClass}
                                                >
                                                  {chip.label}
                                                </Link>
                                              );
                                            }
                                            return (
                                              <span key={i} className={chipClass}>
                                                {chip.label}
                                              </span>
                                            );
                                          })}
                                        </div>
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
          <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-6 mt-6 relative min-h-[60px]">
            {/* Partner CTA */}
            <div className={`transition-all duration-300 w-full ${pathname === "/partners" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2 absolute inset-x-0"}`}>
              <Link 
                href="#form" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-[#f15a24] text-white font-extrabold rounded-lg text-sm shadow-md shadow-orange-500/10 flex items-center justify-center gap-1"
              >
                Become a Partner <FiArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Standard CTA */}
            <div className={`transition-all duration-300 w-full flex flex-col gap-3 ${pathname !== "/partners" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2 absolute inset-x-0"}`}>
              <Link 
                href="/start-free" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 text-[#f15a24] hover:text-white font-extrabold rounded-lg text-sm transition-all"
              >
                Start Free
              </Link>
              <Link 
                href="/book-demo" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-[#f15a24] text-white font-extrabold rounded-lg text-sm shadow-md shadow-orange-500/10 flex items-center justify-center gap-1"
              >
                Book A Demo <FiArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

