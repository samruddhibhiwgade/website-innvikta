"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
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
  FiMessageSquare, 
  FiMail, 
  FiMenu,
  FiSearch,
  FiPhone,
  FiHelpCircle,
  FiTarget,
  FiPieChart,
  FiBarChart2,
  FiCrosshair,
  FiAlertTriangle,
  FiBook,
  FiVideo,
  FiStar,
  FiDatabase,
  FiCloud,
  FiServer,
  FiSettings,
  FiSliders,
  FiTool,
  FiFolder,
  FiPenTool,
  FiMap,
  FiCompass,
  FiThumbsUp,
  FiCheck,
  FiKey
} from "react-icons/fi";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);
  
  // Custom interactive search / language triggers
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);

  const closeMenus = () => {
    setForceClose(true);
    setShowMenu(false);
    setTimeout(() => setForceClose(false), 300);
  };

  const pathname = usePathname();
  const { logo } = config.site;

  // sticky header scroll listener
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const headerHeight = header.clientHeight + 100;
    let prevScroll = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 20 ? setSticky(true) : setSticky(false);

      if (scrollY > headerHeight) {
        prevScroll > scrollY ? setDirection(-1) : setDirection(1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileTab = (tabName) => {
    if (mobileActiveTab === tabName) {
      setMobileActiveTab(null);
    } else {
      setMobileActiveTab(tabName);
    }
  };

  return (
    <>
      {/* Dynamic spacer supporting the dual-layer combined height */}
      <div className="header-height-fix"></div>
      
      <header
        className={`header flex flex-col ${sticky ? "header-sticky" : ""} ${
          direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        
        {/* =========================================================
            LAYER 1: TOP UTILITY BAR (Inspired by KnowBe4 Enterprise Layout)
            ========================================================= */}
        <div className="hidden lg:block w-full bg-primary h-[40px] transition-all duration-300">
          <div className="container-xl h-full flex items-center justify-between text-[11px] font-bold text-white/90">
            
            {/* Left Info Headline Link */}
            <div className="flex items-center gap-3">
              <span className="bg-white/20 text-white font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">NEW</span>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                InSAT Platform Release 2026: Human Behavior Analytics <FiArrowRight className="text-[10px]" />
              </Link>
            </div>

            {/* Right Side Utility Actions */}
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                <FiSearch /> Search
              </Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                <FiHelpCircle /> Support
              </Link>
              <span className="h-3 w-[1px] bg-white/20"></span>
              
              <Link href="#" className="text-white hover:opacity-80 transition-opacity font-extrabold flex items-center gap-1">
                <FiUsers /> Login
              </Link>

              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  onBlur={() => setTimeout(() => setLangOpen(false), 200)}
                  className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <FiGlobe /> English <FiChevronDown className="text-[9px]" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-[140px] bg-white border border-slate-100 rounded-lg shadow-xl py-1 z-50 animate-float-up text-slate-600">
                    {["English (US)", "Deutsch", "Français", "Español", "日本語"].map((lang, idx) => (
                      <button key={idx} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-primary text-slate-600 font-semibold block transition-colors">
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
            LAYER 2: MAIN NAVIGATION BAR (Contains Logo & Submenus)
            ========================================================= */}
        <div className="w-full transition-all duration-300 bg-white h-[80px]">
          <div className="container-xl h-full flex items-center justify-between">
            
            {/* LOGO */}
            <div className="z-50">
              <Link href="/">
                <img 
                  src="/images/logo-main.png" 
                  alt="Innvikta" 
                  className="h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* DESKTOP CORE NAVIGATION (Rich Columns and original content preserved) */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-auto mr-3 h-full">
              
              {/* PLATFORM MEGA MENU */}
              <li className="group h-full flex items-center">
                <span className="nav-link h-full flex items-center text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight cursor-pointer">
                  Platform <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* PLATFORM MEGA MENU (Full-Width Viewport Style) */}
                <div className={`fixed left-0 right-0 top-[120px] pt-5 -mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto ${forceClose ? "opacity-0 invisible !pointer-events-none" : ""}`}>
                  <div className="w-screen bg-white border-t border-slate-100 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="container-xl grid grid-cols-12">
                      
                      {/* Column 1 - InSAT Platform */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiCpu className="text-xl" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900 leading-none mb-1">InSAT Platform</h4>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-8">
                          AI-powered security awareness platform that transforms employee behavior.
                        </p>
                        <ul className="space-y-4 mb-10">
                          {[
                            { name: "Security Awareness Training", icon: FiShield, href: "/security-awareness-training" },
                            { name: "Phishing Simulations", icon: FiMail },
                            { name: "Human Risk Dashboard", icon: FiActivity },
                            { name: "AI Adaptive Learning", icon: FiZap },
                            { name: "Gamified Learning", icon: FiPlay },
                            { name: "Executive Reporting", icon: FiBarChart2 },
                            { name: "Compliance Training", icon: FiCheckCircle }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link 
                                href={link.href || "#"} 
                                onClick={closeMenus}
                                className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item"
                              >
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link 
                          href="#" 
                          onClick={closeMenus}
                          className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest"
                        >
                          See Platform Demo <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 2 - Human Risk Intelligence */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiShield className="text-xl" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900 leading-none mb-1">Human Risk Intelligence</h4>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-8">
                          Real-time visibility into employee cyber risk and behavior maps.
                        </p>
                        <ul className="space-y-4 mb-10">
                          {[
                            { name: "Risk Scoring", icon: FiTarget },
                            { name: "Behavioral Analytics", icon: FiActivity },
                            { name: "Department Heatmaps", icon: FiMap },
                            { name: "Board Reports", icon: FiFileText },
                            { name: "Threat Intelligence", icon: FiZap },
                            { name: "Risk Benchmarking", icon: FiTrendingUp }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Explore Dashboard <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 3 - Employee Experience */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiLayers className="text-xl" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900 leading-none mb-1">Employee Experience</h4>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-8">
                          Interactive training employees actually enjoy and participate in.
                        </p>
                        <ul className="space-y-4 mb-10">
                          {[
                            { name: "Cybersecurity Arcade", icon: FiPlay },
                            { name: "Microlearning", icon: FiVideo },
                            { name: "Badges & XP System", icon: FiAward },
                            { name: "Leaderboards", icon: FiStar },
                            { name: "Adaptive Learning Paths", icon: FiCompass },
                            { name: "Story-Based Simulations", icon: FiBookOpen }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          View Learning Experience <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 4 - AI Live Dashboard Feature */}
                      <div className="col-span-3 p-10 bg-slate-50/50">
                        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden group/card">
                          {/* Live Indicator */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/10 flex items-center gap-2">
                              <span className="text-[10px] font-black text-primary tracking-tighter uppercase">AI Live Dashboard</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Simulation Active</span>
                            </div>
                          </div>

                          {/* Risk Trend Widget */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Score Trend</span>
                              <span className="text-xs font-black text-green-500">-24% Safe</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "65%" }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Active Users</span>
                              <span className="text-lg font-black text-slate-900 tracking-tight">1,482</span>
                            </div>
                            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Simulations</span>
                              <span className="text-lg font-black text-slate-900 tracking-tight">14.8k</span>
                            </div>
                          </div>

                          <h5 className="text-sm font-black text-slate-900 mb-2">Human Security Insights</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-6">
                            Deploy real-time phishing tests and monitor individual security behavior trends instantly.
                          </p>

                          <Link href="#" className="w-full justify-center py-3 text-[11px] font-black text-slate-900 bg-white border border-slate-200 hover:border-slate-400 rounded-xl transition-all flex items-center gap-2 group-hover/card:bg-slate-50">
                            Launch Sandbox Demo <FiArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>

              {/* SOLUTIONS MEGA MENU */}
              <li className="group h-full flex items-center">
                <span className="nav-link h-full flex items-center text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight cursor-pointer">
                  Solutions <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* SOLUTIONS MEGA MENU */}
                <div className={`fixed left-0 right-0 top-[120px] pt-5 -mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto ${forceClose ? "opacity-0 invisible !pointer-events-none" : ""}`}>
                  <div className="w-screen bg-white border-t border-slate-100 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="container-xl grid grid-cols-12">
                      
                      {/* Column 1 - By Industry */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiGlobe className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">By Industry</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "BFSI", icon: FiShield },
                            { name: "Healthcare", icon: FiHeart },
                            { name: "Government", icon: FiGlobe },
                            { name: "IT Services", icon: FiCpu },
                            { name: "SaaS Companies", icon: FiCloud },
                            { name: "Manufacturing", icon: FiSettings },
                            { name: "Education", icon: FiBookOpen }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          View All Industries <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 2 - Use Cases */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiTrendingUp className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Use Cases</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Phishing Prevention", icon: FiLock },
                            { name: "Human Risk Management", icon: FiActivity },
                            { name: "Compliance Training", icon: FiCheckCircle },
                            { name: "Security Culture Building", icon: FiUsers },
                            { name: "Remote Workforce Security", icon: FiGlobe },
                            { name: "Executive Risk Reporting", icon: FiBarChart2 }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Explore Use Cases <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 3 - Featured Highlight */}
                      <div className="col-span-6 p-10 bg-slate-50/50 flex items-center justify-center">
                        <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200 border border-slate-100 w-full max-w-2xl relative overflow-hidden group/featured">
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <FiZap className="text-primary text-2xl animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 bg-orange-500/5 px-3 py-1 rounded-full">Featured Highlight</span>
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Turn Human Risk Into Human Strength</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-10 max-w-lg">
                              AI-native security awareness training with phishing simulations, adaptive learning paths, and real-time behavioral intelligence dashboards.
                            </p>
                            <Link href="#" className="bg-primary hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl transition-all shadow-xl shadow-orange-500/30 flex items-center gap-3 inline-flex">
                              Book a Demo <FiArrowRight />
                            </Link>
                          </div>
                          
                          {/* Background Decoration */}
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>


              {/* RESOURCES MEGA MENU */}
              <li className="group h-full flex items-center">
                <span className="nav-link h-full flex items-center text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight cursor-pointer">
                  Resources <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* RESOURCES MEGA MENU */}
                <div className={`fixed left-0 right-0 top-[120px] pt-5 -mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto ${forceClose ? "opacity-0 invisible !pointer-events-none" : ""}`}>
                  <div className="w-screen bg-white border-t border-slate-100 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="container-xl grid grid-cols-12">
                      
                      {/* Column 1 - Learning Center */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiBookOpen className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Learning Center</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Blog", icon: FiZap },
                            { name: "Cybersecurity Guides", icon: FiMonitor },
                            { name: "Security Awareness Playbooks", icon: FiFileText },
                            { name: "Phishing Examples 2026", icon: FiMail },
                            { name: "Human Risk Research", icon: FiActivity },
                            { name: "Compliance Guides", icon: FiShield }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Visit Blog <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 2 - Research Hub */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiFileText className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Research Hub</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Security Benchmark Report", icon: FiBarChart2 },
                            { name: "ROI Reports", icon: FiTrendingUp },
                            { name: "Industry Research", icon: FiGlobe },
                            { name: "Threat Reports", icon: FiAlertTriangle },
                            { name: "Case Studies", icon: FiFolder },
                            { name: "Whitepapers", icon: FiFileText }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Download Reports <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 3 - Community */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiCalendar className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Community</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Webinars", icon: FiVideo },
                            { name: "Workshops", icon: FiUsers },
                            { name: "Podcasts", icon: FiPlay },
                            { name: "Product Updates", icon: FiZap },
                            { name: "Newsletter", icon: FiMail },
                            { name: "Security Awareness Events", icon: FiCalendar }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Join Webinar <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 4 - Proof & Trust */}
                      <div className="col-span-3 p-10">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiUsers className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Proof & Trust</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Customer Stories", icon: FiHeart },
                            { name: "Testimonials", icon: FiThumbsUp },
                            { name: "G2 Reviews", icon: FiStar },
                            { name: "Partner Network", icon: FiGlobe },
                            { name: "Success Metrics", icon: FiActivity }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          See Success Stories <FiArrowRight />
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </li>

              {/* FREE TOOLS MEGA MENU */}
              <li className="group h-full flex items-center">
                <span className="nav-link h-full flex items-center text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight cursor-pointer">
                  Free Tools <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* FREE TOOLS MEGA MENU */}
                <div className={`fixed left-0 right-0 top-[120px] pt-5 -mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto ${forceClose ? "opacity-0 invisible !pointer-events-none" : ""}`}>
                  <div className="w-screen bg-white border-t border-slate-100 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="container-xl grid grid-cols-12">
                      
                      {/* Column 1 - Security Assessments */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiActivity className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Security Assessments</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Security Awareness Maturity Calculator", icon: FiActivity },
                            { name: "Phishing Risk Assessment", icon: FiMail },
                            { name: "Human Risk Score Tool", icon: FiTarget },
                            { name: "Security Culture Benchmark", icon: FiUsers }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Run Free Assessment <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 2 - Free Cyber Tools */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiMonitor className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Free Cyber Tools</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Password Exposure Checker", icon: FiKey },
                            { name: "Email Security Analyzer", icon: FiMail },
                            { name: "Compliance Readiness Checker", icon: FiCheckCircle },
                            { name: "Security ROI Calculator", icon: FiTrendingUp }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Try Free Tools <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 3 - Templates */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiFileText className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Templates</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Phishing Templates", icon: FiMail },
                            { name: "Security Policies", icon: FiShield },
                            { name: "Incident Response Checklists", icon: FiFileText },
                            { name: "Awareness Campaign Planner", icon: FiCalendar }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Download Templates <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 4 - Trial Feature */}
                      <div className="col-span-3 p-10 bg-slate-50/50">
                        <div className="bg-orange-500/5 rounded-3xl p-8 border border-orange-500/10 h-full flex flex-col justify-center">
                          <h4 className="text-lg font-black text-slate-900 mb-2">Try InSAT up to 50 Users</h4>
                          <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            Generate reports, benchmark risk, and improve employee security awareness instantly.
                          </p>
                          <div className="space-y-3">
                            <Link href="#" className="w-full justify-center py-3.5 text-xs font-black text-white bg-primary hover:bg-orange-600 rounded-xl transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 uppercase tracking-widest">
                              Book a Demo
                            </Link>
                            <Link href="#" className="w-full justify-center py-3.5 text-xs font-black text-slate-700 bg-white border border-slate-200 hover:border-slate-400 rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest">
                              Explore Tools
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>

              {/* INNVIKTA ARCADE */}
              <li className="py-2">
                <Link href="/arcade" className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight flex items-center gap-2 group/arcade">
                  <FiPlay className="text-primary group-hover/arcade:scale-110 transition-transform" /> Innvikta Arcade
                </Link>
              </li>

              {/* PRICING LINK */}
              <li className="py-2">
                <Link href="#" className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Pricing
                </Link>
              </li>

              {/* COMPANY MEGA MENU */}
              <li className="group h-full flex items-center">
                <span className="nav-link h-full flex items-center text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight cursor-pointer">
                  Company <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* COMPANY MEGA MENU */}
                <div className={`fixed left-0 right-0 top-[120px] pt-5 -mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto ${forceClose ? "opacity-0 invisible !pointer-events-none" : ""}`}>
                  <div className="w-screen bg-white border-t border-slate-100 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="container-xl grid grid-cols-12">
                      
                      {/* Column 1 - About Us */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiBriefcase className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">About Us</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "About Innvikta", icon: FiBriefcase },
                            { name: "Our Mission", icon: FiHeart },
                            { name: "Leadership Team", icon: FiUsers },
                            { name: "Careers", icon: FiSmile },
                            { name: "Press & Media", icon: FiFileText }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Learn About Us <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 2 - Ecosystem */}
                      <div className="col-span-3 p-10 border-r border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="p-2.5 rounded-xl bg-orange-500/10 text-primary">
                            <FiLayers className="text-xl" />
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-none">Ecosystem</h4>
                        </div>
                        <ul className="space-y-4 mb-8">
                          {[
                            { name: "Technology Partners", icon: FiCpu },
                            { name: "MSSP Program", icon: FiShield },
                            { name: "Channel Partners", icon: FiGlobe }
                          ].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="flex items-center gap-2.5 text-[14px] font-bold text-slate-700 hover:text-primary transition-colors group/item">
                                <link.icon className="text-primary/40 group-hover/item:text-primary transition-colors text-xs" />
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="#" className="text-primary font-black text-xs flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                          Become a Partner <FiArrowRight />
                        </Link>
                      </div>

                      {/* Column 3 - Buffer/Empty spacing */}
                      <div className="col-span-3 border-r border-slate-100"></div>

                      {/* Column 4 - Get In Touch side-card */}
                      <div className="col-span-3 p-10 bg-slate-50/50">
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 h-full flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-6">
                            <FiMail className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-orange-500/5 px-2 py-1 rounded">Get In Touch</span>
                          </div>
                          <div className="space-y-4 mb-8">
                            <Link href="#" className="block text-[15px] font-bold text-slate-700 hover:text-primary transition-colors">Contact Sales</Link>
                            <Link href="#" className="block text-[15px] font-bold text-slate-700 hover:text-primary transition-colors">Book Demo</Link>
                          </div>
                          <Link href="#" className="w-full justify-center py-3.5 text-xs font-black text-white bg-primary hover:bg-orange-600 rounded-xl transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 uppercase tracking-widest">
                            Talk to Sales
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>

            </ul>

            {/* RIGHT SIDE STICKY CONVERSION AREA (Primary and Secondary CTAs + Search Trigger) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Secondary CTA: Highlighted Premium "Start Free" Button */}
              <Link 
                href="#" 
                className="px-4 py-2.5 bg-orange-500/5 hover:bg-primary border-2 border-primary/30 hover:border-primary text-primary hover:text-white rounded-lg text-[13px] font-extrabold transition-all duration-300 shadow-sm hover:shadow-orange-500/25 flex items-center gap-1 hover:-translate-y-0.5"
              >
                Start Free
              </Link>

              {/* Primary CTA: High-Contrast Premium Filled "Book Demo" */}
              <Link 
                href="#" 
                className="px-5 py-2.5 bg-primary hover:bg-orange-600 text-white rounded-lg text-[13px] font-bold transition-all duration-300 shadow-md shadow-orange-500/15 flex items-center gap-1"
              >
                Book Demo <FiArrowRight className="text-xs" />
              </Link>

            </div>

            {/* MOBILE NAV TOGGLER */}
            <div className="flex items-center lg:hidden z-50">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-800 hover:text-primary text-2xl transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {showMenu ? <CgClose /> : <FiMenu />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE NAVIGATION STRUCTURE (Accordion-based menu - Original Content Intact) */}
        <div className={`fixed inset-x-0 top-0 h-screen bg-white z-40 px-6 pt-24 pb-28 overflow-y-auto transition-all duration-500 lg:hidden flex flex-col justify-between ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          
          <div className="space-y-4">
            
            {/* Platform Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("platform")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Platform</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "platform" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "platform" ? "max-h-[500px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <div className="space-y-4 py-2">
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Core Platform</h5>
                    <ul className="space-y-2">
                      {["Security Awareness Training", "Phishing Simulations", "Human Risk Dashboard", "AI Adaptive Learning", "Gamified Learning", "Executive Reporting", "Compliance Training"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Risk Intelligence</h5>
                    <ul className="space-y-2">
                      {["Risk Scoring", "Behavioral Analytics", "Department Heatmaps", "Board Reports", "Threat Intelligence", "Risk Benchmarking"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("solutions")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Solutions</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "solutions" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "solutions" ? "max-h-[500px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <div className="space-y-4 py-2">
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">By Industry</h5>
                    <ul className="space-y-2">
                      {["BFSI", "Healthcare", "Government", "IT Services", "SaaS Companies", "Manufacturing", "Education"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">By Need</h5>
                    <ul className="space-y-2">
                      {["Phishing Prevention", "Human Risk Management", "Compliance Training", "Security Culture Building", "Remote Workforce Security", "Executive Risk Reporting"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Innvikta Arcade Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("arcade")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Innvikta Arcade</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "arcade" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "arcade" ? "max-h-[300px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Cybersecurity Arcade", "Microlearning", "Badges & XP System", "Leaderboards", "Adaptive Learning Paths", "Story-Based Simulations"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("resources")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Resources</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "resources" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "resources" ? "max-h-[400px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Blog", "Cybersecurity Guides", "Security Awareness Playbooks", "Phishing Examples 2026", "Human Risk Research", "Compliance Guides", "Security Benchmark Report", "ROI Reports", "Case Studies", "Webinars", "Workshops"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Free Tools Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("freetools")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Free Tools</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "freetools" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "freetools" ? "max-h-[300px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Security Awareness Maturity Calculator", "Phishing Risk Assessment", "Human Risk Score Tool", "Password Exposure Checker", "Email Security Analyzer", "Compliance Readiness Checker", "Security ROI Calculator"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing direct link */}
            <div className="border-b border-slate-100 pb-2">
              <Link href="#" className="w-full block text-left text-slate-800 text-base font-bold py-2" onClick={() => setShowMenu(false)}>
                Pricing
              </Link>
            </div>

            {/* Company Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("company")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Company</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "company" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "company" ? "max-h-[250px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["About Innvikta", "Our Mission", "Leadership Team", "Careers", "Press & Media", "Technology Partners", "MSSP Program", "Contact Sales"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM MOBILE STICKY CONVERSION BUTTONS */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 mt-6">
            <Link 
              href="#" 
              onClick={() => setShowMenu(false)}
              className="w-full text-center py-3 bg-primary text-white font-bold rounded-xl text-base shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
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
