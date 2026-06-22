"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import ImageFallback from "@layouts/components/ImageFallback";
import Circle from "@layouts/components/Circle";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Link from "next/link";
import { gsap } from "@lib/gsap";
import { FiSearch, FiBookOpen, FiShield, FiAlertTriangle, FiCpu } from "react-icons/fi";
import "../../../styles/insat.scss";

const glossaryTerms = [
  {
    term: "Adware",
    category: "Threats",
    definition: "Malicious software that automatically displays or downloads advertisements to generate revenue, often tracking user browsing habits without consent.",
    icon: FiAlertTriangle
  },
  {
    term: "Business Email Compromise (BEC)",
    category: "Social Engineering",
    definition: "A targeted scam where cybercriminals impersonate corporate executives, vendors, or trusted contacts to trick employees into transferring funds or sharing confidential information.",
    icon: FiAlertTriangle
  },
  {
    term: "Compliance Training",
    category: "HRM & Training",
    definition: "Education programs designed to ensure employees understand and adhere to legal frameworks, privacy laws, and corporate regulations such as GDPR, HIPAA, and India's DPDP Act.",
    icon: FiBookOpen
  },
  {
    term: "Deepfake",
    category: "Threats",
    definition: "Synthesized media (video, audio, or images) generated using deep learning AI to convincingly impersonate a real person's voice or appearance, frequently deployed in vishing.",
    icon: FiAlertTriangle
  },
  {
    term: "Encryption",
    category: "Defensive Systems",
    definition: "The process of converting information or data into a code, especially to prevent unauthorized access.",
    icon: FiShield
  },
  {
    term: "Firewall",
    category: "Defensive Systems",
    definition: "A network security device that monitors incoming and outgoing network traffic and decides whether to allow or block specific traffic based on a defined set of security rules.",
    icon: FiShield
  },
  {
    term: "Gamified Microlearning",
    category: "HRM & Training",
    definition: "Educational approach using interactive mini-games, milestones, and XP/points to increase training completion rates and improve information recall.",
    icon: FiBookOpen
  },
  {
    term: "Human Risk Management (HRM)",
    category: "HRM & Training",
    definition: "A strategic cybersecurity framework focused on identifying, monitoring, and reducing human-centric security risks through tracking behaviors, reporting, and tailored training.",
    icon: FiBookOpen
  },
  {
    term: "InSAT (Innvikta Security Awareness Training)",
    category: "HRM & Training",
    definition: "Innvikta's core security awareness training platform, utilizing microlearning, story-driven modules, and gamification to build everyday secure workforce behaviors.",
    icon: FiShield
  },
  {
    term: "Jailbreaking",
    category: "Threats",
    definition: "The privilege escalation process of removing software restrictions imposed by the manufacturer on iOS, iPadOS, tvOS, and watchOS devices.",
    icon: FiAlertTriangle
  },
  {
    term: "Keylogger",
    category: "Threats",
    definition: "A type of surveillance software or spyware that has the capability to record every keystroke you make to a log file, often to steal credentials.",
    icon: FiAlertTriangle
  },
  {
    term: "Logic Bomb",
    category: "Threats",
    definition: "A piece of code intentionally inserted into a software system that will set off a malicious function when specified conditions are met.",
    icon: FiAlertTriangle
  },
  {
    term: "Multi-Factor Authentication (MFA)",
    category: "Defensive Systems",
    definition: "A security protocol requiring users to provide two or more distinct verification factors to gain access to an account, greatly reducing credential theft risk.",
    icon: FiShield
  },
  {
    term: "Network Security",
    category: "Defensive Systems",
    definition: "The practice of securing a computer network from intruders, whether targeted attackers or opportunistic malware.",
    icon: FiShield
  },
  {
    term: "OWASP",
    category: "Defensive Systems",
    definition: "An international non-profit organization dedicated to web application security, known for the OWASP Top 10 list of critical web vulnerabilities.",
    icon: FiShield
  },
  {
    term: "Phishing",
    category: "Social Engineering",
    definition: "The practice of sending fraudulent messages, often impersonating reputable organizations, to trick individuals into disclosing credentials, financial details, or downloading malware.",
    icon: FiAlertTriangle
  },
  {
    term: "QR Code Phishing (Quishing)",
    category: "Social Engineering",
    definition: "A phishing attack vector where the credential-harvesting link is embedded inside a QR code, successfully hiding the URL from traditional email filters.",
    icon: FiAlertTriangle
  },
  {
    term: "Ransomware",
    category: "Threats",
    definition: "Malicious software that encrypts files and systems, demanding a ransom payment from the victim in exchange for the decryption key.",
    icon: FiAlertTriangle
  },
  {
    term: "Smishing",
    category: "Social Engineering",
    definition: "Social engineering attacks conducted via Short Message Service (SMS) text messages, prompting targets to click malicious links or share data.",
    icon: FiAlertTriangle
  },
  {
    term: "SOC 2 Compliance",
    category: "Defensive Systems",
    definition: "A voluntary auditing standard verifying that service providers manage customer data securely, protecting privacy, confidentiality, and processing integrity.",
    icon: FiShield
  },
  {
    term: "Social Engineering",
    category: "Social Engineering",
    definition: "The broad category of manipulative techniques used by cybercriminals to exploit human psychology, tricking individuals into compromising security or sharing secrets.",
    icon: FiAlertTriangle
  },
  {
    term: "Spearphishing",
    category: "Social Engineering",
    definition: "A highly targeted phishing campaign using specific personal or corporate details about the target victim to maximize the rate of successful deception.",
    icon: FiAlertTriangle
  },
  {
    term: "SPF (Sender Policy Framework)",
    category: "Email Security",
    definition: "An email validation system that allows domain owners to publish a list of IP addresses or subnets authorized to send emails on their domain's behalf.",
    icon: FiShield
  },
  {
    term: "Trojan Horse",
    category: "Threats",
    definition: "A type of malicious code or software that looks legitimate but can take control of your computer, designed to damage, disrupt, or steal data.",
    icon: FiAlertTriangle
  },
  {
    term: "URL Phishing",
    category: "Social Engineering",
    definition: "A phishing attack where the threat actor uses a disguised or malicious link to trick the victim into visiting a fake website and revealing credentials.",
    icon: FiAlertTriangle
  },
  {
    term: "Vishing",
    category: "Social Engineering",
    definition: "Voice-based phishing where cybercriminals use phone calls, voice cloning, or robocalls to impersonate trusted entities and steal personal or organizational data.",
    icon: FiAlertTriangle
  },
  {
    term: "Workforce Maturity Level",
    category: "HRM & Training",
    definition: "A metric-driven scale measuring an organization's overall human security posture, ranging from initial compliance checkbox to fully security-driven culture.",
    icon: FiBookOpen
  },
  {
    term: "XSS (Cross-Site Scripting)",
    category: "Threats",
    definition: "A vulnerability where an attacker injects malicious scripts into trusted websites, which are then executed by unsuspecting visitors' browsers.",
    icon: FiAlertTriangle
  },
  {
    term: "Yearly Security Awareness Auditing",
    category: "HRM & Training",
    definition: "A comprehensive yearly evaluation of an organization's security posture, employee completion rates, and simulation performance metrics.",
    icon: FiBookOpen
  },
  {
    term: "Zero-Day Exploit",
    category: "Threats",
    definition: "A cyberattack targeting a software vulnerability that is completely unknown to the vendor, leaving the system exposed before a security patch can be released.",
    icon: FiAlertTriangle
  }
];

const categories = ["All", "Social Engineering", "Email Security", "Threats", "HRM & Training", "Defensive Systems"];

const alphabet = [
  "All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const heroRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownSelect = (termName) => {
    // Reset filters so the card is guaranteed to render in the DOM
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLetter("All");
    setIsDropdownOpen(false);

    // Scroll smoothly to the target card after React renders
    setTimeout(() => {
      const cardId = `card-${termName.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
      const element = document.getElementById(cardId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Flash border & shadow highlight
        element.style.borderColor = "#f15a24";
        element.style.boxShadow = "0 0 25px rgba(241, 90, 36, 0.35)";
        element.style.transform = "translateY(-4px)";
        setTimeout(() => {
          element.style.borderColor = "#FFEAD4";
          element.style.boxShadow = "none";
          element.style.transform = "none";
        }, 2000);
      }
    }, 150);
  };

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setSelectedCategory("All");
    setSearchTerm(""); // Reset search so all letter items are shown

    setTimeout(() => {
      if (letter === "All") {
        const gridHeader = document.querySelector(".border-b.border-slate-100");
        if (gridHeader) {
          gridHeader.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const firstMatchingTerm = glossaryTerms.find(item => item.term.toUpperCase().startsWith(letter));
        if (firstMatchingTerm) {
          const cardId = `card-${firstMatchingTerm.term.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
          const element = document.getElementById(cardId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            // Highlight card
            element.style.borderColor = "#f15a24";
            element.style.boxShadow = "0 0 25px rgba(241, 90, 36, 0.35)";
            element.style.transform = "translateY(-4px)";
            setTimeout(() => {
              element.style.borderColor = "#FFEAD4";
              element.style.boxShadow = "none";
              element.style.transform = "none";
            }, 2000);
          }
        }
      }
    }, 150);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
      ).fromTo(
        ".hero-backdrop-shape",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "<"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesLetter = selectedLetter === "All" || item.term.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchTerm, selectedCategory, selectedLetter]);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} style={{ backgroundColor: "#FFEFEA", color: "#f15a24", fontWeight: "700", borderRadius: "4px", paddingLeft: "4px", paddingRight: "4px", paddingTop: "2px", paddingBottom: "2px" }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          
          {/* PREMIUM HERO SECTION */}
          <section className="hero-section">
            <div className="hero-outer-wrapper">
              
              {/* Background SVG Decor */}
              <div className="hero-bg-decor" aria-hidden="true">
                <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  
                  <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  
                  <circle cx="78" cy="198" r="5" fill="#FF7A00" />
                  <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
                  <circle cx="158" cy="308" r="4" fill="#FF7A00" />
                  <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
                  <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
                  <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
                  <circle cx="268" cy="338" r="4" fill="#FF7A00" />
                  <circle cx="188" cy="238" r="4" fill="#FF7A00" />
                  <circle cx="398" cy="78" r="5" fill="#FF7A00" />
                  <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
                  <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
                  <circle cx="488" cy="128" r="4" fill="#FF7A00" />
                  <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
                  <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
                  <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
                  <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
                  <circle cx="648" cy="110" r="4" fill="#FF7A00" />
                  <circle cx="638" cy="278" r="4" fill="#FF7A00" />
                  
                  <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>
                <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
                  <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
                  <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
                  <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                  <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                </svg>
              </div>
 
              <div className="hero-backdrop-wrapper">
                <div className="backdrop-shape shape-1">
                  <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
                    <defs>
                      <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                        <stop offset="0.31" stopColor="#FF7A00" />
                        <stop offset="0.59" stopColor="#F59E0B" />
                        <stop offset="0.78" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="backdrop-shape shape-2">
                  <div className="shape-2-inner-1">
                    <svg width="100%" height="100%" viewBox="0 0 537 517" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M243.007 443.747L0.726096 516.282L295.51 69.4185L536.066 0.564209L243.007 443.747Z" fill="url(#paint0_linear_hero_2)" />
                      <defs>
                        <linearGradient id="paint0_linear_hero_2" x1="626.513" y1="479.564" x2="320.001" y2="-98.1139" gradientUnits="userSpaceOnUse">
                          <stop offset="0.22" stopColor="#FF7A00" />
                          <stop offset="0.55" stopColor="#F59E0B" />
                          <stop offset="0.89" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
 
              {/* Force text-center layout globally for the hero content */}
              <div className="container" style={{ position: "relative", zIndex: "12" }}>
                <div 
                  className="hero-content mx-auto !text-center flex flex-col items-center" 
                  style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto", 
                    float: "none", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    textAlign: "center", 
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "860px"
                  }}
                >
                  <span className="text-subheading mx-auto" style={{ color: "#f15a24", display: "block", textAlign: "center" }}>Resources</span>
                  <h1 className="text-96-heading mx-auto text-center !text-center" style={{ textAlign: "center", width: "100%" }}>
                    Cybersecurity <span className="text-orange">Glossary</span>
                  </h1>
 
                  <div 
                    className="hero-text-wrapper mx-auto" 
                    style={{ 
                      marginLeft: "auto", 
                      marginRight: "auto", 
                      maxWidth: "680px", 
                      textAlign: "center" 
                    }}
                  >
                    <p className="text-20-content hero-paragraph text-center" style={{ textAlign: "center", opacity: 0.8, marginTop: "1.5rem" }}>
                      Your guide to understanding social engineering threats, email security protocols, regulatory frameworks, and workforce risk management concepts.
                    </p>
                  </div>
 
                  {/* Bulletproof inline styled search bar - centered on all screens */}
                  <div 
                    ref={searchContainerRef}
                    style={{ 
                      position: "relative",
                      width: "100%", 
                      maxWidth: "680px", 
                      marginLeft: "auto", 
                      marginRight: "auto", 
                      marginTop: "2.5rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "16px",
                      display: "block",
                      zIndex: "40",
                      pointerEvents: "auto"
                    }}
                  >
                    <span 
                      style={{ 
                        position: "absolute",
                        top: "50%",
                        left: "1.25rem",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none",
                        zIndex: 45,
                      }}
                    >
                      <FiSearch className="h-5 w-5 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search cybersecurity terms or definitions..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedCategory("All");
                        setSelectedLetter("All");
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #dee2e6",
                        borderRadius: "16px",
                        paddingTop: "1.1rem",
                        paddingBottom: "1.1rem",
                        paddingLeft: "3.25rem",
                        paddingRight: "4rem",
                        width: "100%",
                        height: "58px",
                        fontSize: "1rem",
                        color: "#222",
                        display: "block",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 41,
                        pointerEvents: "auto"
                      }}
                      className="focus:outline-none focus:border-[#f15a24] focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-medium"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "1.25rem",
                          transform: "translateY(-50%)",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          cursor: "pointer",
                          padding: "4px 8px",
                          zIndex: 45,
                        }}
                      >
                        Clear
                      </button>
                    )}

                    {/* Search Results Dropdown */}
                    {isDropdownOpen && searchTerm.trim() !== "" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "64px",
                          left: "0",
                          right: "0",
                          background: "#ffffff",
                          border: "1px solid #FFEAD4",
                          borderRadius: "16px",
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          zIndex: "50",
                          maxHeight: "320px",
                          overflowY: "auto",
                          textAlign: "left",
                          padding: "8px"
                        }}
                      >
                        {filteredTerms.length === 0 ? (
                          <div style={{ padding: "16px", color: "#64748B", fontWeight: "600", textAlign: "center" }}>
                            No terms found for &quot;{searchTerm}&quot;
                          </div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {filteredTerms.slice(0, 6).map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleDropdownSelect(item.term)}
                                style={{
                                  width: "100%",
                                  padding: "12px 16px",
                                  borderRadius: "12px",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  transition: "background-color 0.2s ease",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  gap: "12px"
                                }}
                                className="hover:bg-[#FFEFEA] transition-colors"
                              >
                                <span style={{ fontWeight: "705", color: "#1E293B", fontSize: "0.95rem", textAlign: "left" }}>
                                  {item.term}
                                </span>
                                <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#f15a24", backgroundColor: "#FFEFEA", padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                                  {item.category}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
 
            </div>
          </section>
 
          {/* CONTROLS & GRID SECTION */}
          <section className="bg-white" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div className="container">
              
              {/* Filter by Category */}
              <div className="mb-8 text-left" style={{ marginBottom: "2.5rem" }}>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-3.5 tracking-wider" style={{ marginBottom: "0.875rem" }}>
                  Filter by Category
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedLetter("All");
                      }}
                      style={{
                        backgroundColor: selectedCategory === category ? "#f15a24" : "#FFFBF7",
                        color: selectedCategory === category ? "#ffffff" : "#1E293B",
                        border: selectedCategory === category ? "1px solid #f15a24" : "1px solid #FFEAD4",
                        borderRadius: "30px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        display: "inline-block",
                      }}
                      className="cursor-pointer hover:opacity-90"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Alphabet Quick Filter */}
              <div className="mb-12 border-t border-slate-100 pt-6 text-left" style={{ marginBottom: "3rem", paddingTop: "1.5rem" }}>
                <span className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider" style={{ marginBottom: "0.75rem" }}>
                  Alphabet Index
                </span>
                <div className="flex flex-wrap gap-2">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleLetterSelect(letter)}
                      style={{
                        backgroundColor: selectedLetter === letter ? "#f15a24" : "#FFFBF7",
                        color: selectedLetter === letter ? "#ffffff" : "#64748B",
                        border: selectedLetter === letter ? "1px solid #f15a24" : "1px solid #FFEAD4",
                        borderRadius: "8px",
                        minWidth: "36px",
                        height: "36px",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="cursor-pointer hover:opacity-90"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Results Stats */}
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-100" style={{ marginBottom: "2.5rem", paddingBottom: "1rem" }}>
                <p className="text-slate-500 font-medium text-left">
                  Showing <span className="text-dark font-bold">{filteredTerms.length}</span> of <span className="text-dark font-bold">30</span> terms
                </p>
                {(searchTerm || selectedCategory !== "All" || selectedLetter !== "All") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setSelectedLetter("All");
                    }}
                    className="text-sm font-semibold text-[#f15a24] hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
 
              {/* 3-COLUMN GLOSSARY CARDS GRID */}
              {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredTerms.map((item, index) => {
                    const IconComponent = item.icon || FiBookOpen;
                    return (
                      <div
                        key={index}
                        id={`card-${item.term.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                        style={{
                          background: "#FFFBF7",
                          border: searchTerm ? "1.5px solid #f15a24" : "1px solid #FFEAD4",
                          borderRadius: "16px",
                          paddingTop: "2rem",
                          paddingBottom: "2rem",
                          paddingLeft: "2rem",
                          paddingRight: "2rem",
                          transition: "all 0.3s ease",
                          minHeight: "220px",
                          cursor: "default",
                          boxShadow: searchTerm ? "0 4px 20px -2px rgba(241, 90, 36, 0.12)" : "none",
                        }}
                        className="group hover:shadow-md hover:-translate-y-1 transform flex flex-col justify-between text-left hover:border-[#f15a24]"
                      >
                        <div>
                          {/* Card Header */}
                          <div className="flex justify-between items-start mb-4" style={{ marginBottom: "1.25rem" }}>
                            <span
                              style={{
                                backgroundColor: "#FFEFEA",
                                color: "#f15a24",
                                fontSize: "0.75rem",
                                fontWeight: "700",
                                paddingTop: "4px",
                                paddingBottom: "4px",
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                borderRadius: "30px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                display: "inline-block",
                              }}
                            >
                              {item.category}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#FFEFEA] flex items-center justify-center text-[#f15a24] group-hover:bg-[#f15a24] group-hover:text-white transition-colors duration-300">
                              <IconComponent className="text-sm shrink-0" />
                            </div>
                          </div>
 
                          {/* Term Title */}
                          <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug font-secondary" style={{ marginTop: "0px", marginBottom: "0.75rem", textDecoration: "none" }}>
                            {highlightText(item.term, searchTerm)}
                          </h3>
 
                          {/* Definition */}
                          <p className="text-sm text-slate-650 leading-relaxed font-medium" style={{ marginTop: "0px", marginBottom: "0px" }}>
                            {highlightText(item.definition, searchTerm)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 border border-slate-150 border-dashed rounded-3xl" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
                  <FiBookOpen className="text-5xl text-slate-300 mx-auto mb-4" style={{ marginBottom: "1rem" }} />
                  <h4 className="text-lg font-bold text-dark mb-1" style={{ marginTop: "0px", marginBottom: "0.25rem" }}>No terms found</h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto" style={{ marginTop: "0px" }}>
                    Try adjusting your search criteria or reset filters to view all cybersecurity definitions.
                  </p>
                </div>
              )}

            </div>
          </section>

          {/* Custom Phishing Final CTA Section */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
              <div className="container-xl">
                  <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                      <div className="animate">
                          <h2 className="section-title leading-tight">
                              Ready to Test Your Workforce?
                          </h2>
                          <p className="mt-10 font-primary text-base text-slate-655 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                              Run safe simulations and turn risky behaviour into measurable learning.
                          </p>
                          <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                              <Link href="/book-demo" className="btn btn-primary text-white font-bold">
                                  Book A Demo
                              </Link>
                              <Link href="/contact" className="btn btn-outline-primary font-bold">
                                  Start Free
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
                          <Circle
                              className="left-[10%] top-12"
                              width={32}
                              height={32}
                              fill={false}
                              fillValue="#FF5A1F"
                          />
                          <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                          <Circle
                              className="left-[15%] bottom-[35%]"
                              width={47}
                              height={47}
                              fill={false}
                              fillValue="#FF5A1F"
                          />

                          <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                          <Circle
                              className="right-[2%] bottom-[30%]"
                              width={73}
                              height={73}
                              fill={false}
                              fillValue="#FF5A1F"
                          />
                          <Circle
                              className="right-[19%] bottom-[16%]"
                              width={37}
                              height={37}
                              fill={false}
                              fillValue="#FF5A1F"
                          />
                      </div>
                  </div>
              </div>
          </section>
        </div>
      </div>
    </GSAPWrapper>
  );
}
