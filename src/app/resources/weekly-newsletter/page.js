"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import SuccessPopup from "@layouts/partials/SuccessPopup";
import { 
  FiMail, 
  FiCalendar, 
  FiClock, 
  FiSearch, 
  FiCheckCircle, 
  FiArrowRight 
} from "react-icons/fi";
import "../../../styles/insat.scss";

const CATEGORIES = ["All Categories", "Insights", "Threat Defense", "Compliance"];

function getExcerpt(text, length = 160) {
  if (!text) return "";
  // Strip XML/HTML tags like <FAQ> or <Accordion>
  let clean = text.replace(/<[^>]*>/g, "");
  // Replace multiple spaces/newlines
  clean = clean.replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  return clean.substring(0, length) + "...";
}

export default function WeeklyNewsletterPage() {
  const [newsletters, setNewsletters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/api/newsletters")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNewsletters(data);
        }
      })
      .catch(err => console.error("Error fetching newsletter editions", err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setShowPopup(true);
      setEmail("");
    }
  };

  const filteredEditions = useMemo(() => {
    return newsletters.filter((edition) => {
      const matchesCategory = activeCategory === "All Categories" || edition.category === activeCategory;
      const matchesSearch = edition.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            edition.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, newsletters]);

  return (
    <GSAPWrapper>
      <SeoMeta 
        title="Weekly Cybersecurity Awareness Newsletter | Innvikta" 
        description="Stay ahead of human risk, compliance updates, and modern cybersecurity awareness trends with Innvikta's weekly newsletter." 
      />

      {/* Hero Section */}
      <div className="bg-[#f15a24] !text-white py-20 relative overflow-hidden">
        {/* Background Decorative Rings & Dots */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-25 pointer-events-none">
          <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
            <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
            <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
            <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
          </svg>
        </div>

        <div className="container px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary border-b-4 border-white pb-3 inline-block">
              Weekly Newsletter
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed font-medium">
              Stay ahead of human risk, upcoming compliance regulations, and modern security training strategies. Curated insights delivered directly to your inbox every Thursday.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section bg-white pt-12 pb-24">
        <div className="container px-6 md:px-12 lg:px-24">
          
          {/* Top Row: Category Filter Tabs & Search Box */}
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between border border-slate-100 rounded-xl overflow-hidden mb-12 shadow-sm bg-slate-50/50">
            <div className="flex flex-nowrap items-stretch flex-1 overflow-x-auto no-scrollbar scroll-smooth divide-x divide-slate-100">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-4 text-xs font-extrabold uppercase tracking-wider transition-all relative flex items-center justify-center shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-white text-slate-900 border-t-[3px] border-[#f15a24]"
                        : "bg-transparent text-slate-500 hover:text-[#f15a24] hover:bg-white/40"
                    }`}
                    style={{
                      borderTopColor: isActive ? "#f15a24" : "transparent",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            
            {/* Search Input Box */}
            <div className="relative border-t md:border-t-0 md:border-l border-slate-100 shrink-0 min-w-[280px]">
              <input
                type="text"
                placeholder="Search editions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-transparent text-slate-800 placeholder-slate-400 text-xs focus:outline-none font-bold"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-12 text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-base font-secondary font-medium uppercase tracking-[0.05em] text-[#f15a24]">
                Innvikta Cybersonic
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-secondary font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 mt-3">
                Security tips & campaign ideas.
              </h2>
            </div>

            {/* In-page subscription form */}
            <div className="w-full lg:max-w-md bg-transparent border-0 p-0 shadow-none shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-3 py-2 text-slate-800">
                  <FiCheckCircle size={32} className="text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Subscription Confirmed!</h4>
                    <p className="text-xs text-slate-500 font-medium">We&apos;ll deliver the next intel this Thursday.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full rounded-full py-4 px-6 border border-slate-300 focus:border-[#f15a24] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none text-xs pr-36 bg-white font-bold text-slate-800 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 rounded-full text-xs transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Editions Grid */}
          {filteredEditions.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-[2rem] p-8">
              <p className="text-slate-400 font-bold text-sm">No newsletter editions found matching your selection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredEditions.map((edition) => (
                <div 
                  key={edition.slug}
                  className="flex flex-col bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm justify-between"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="border-l-2 border-[#f15a24] pl-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
                        {edition.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <FiCalendar size={12} className="text-[#f15a24]" />
                        {edition.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug tracking-tight">
                      {edition.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                      {getExcerpt(edition.description)}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <FiClock size={12} className="text-[#f15a24]" />
                      {edition.readTime}
                    </span>

                    <Link 
                      href={`/resources/weekly-newsletter/${edition.slug}`} 
                      className="bg-[#f15a24] hover:bg-orange-600 !text-white px-4 py-2 rounded-lg transition-all duration-300 inline-flex items-center gap-1 whitespace-nowrap font-bold text-xs shadow-md shadow-orange-500/10"
                    >
                      Read Edition <FiArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      <SuccessPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        title="Subscription Confirmed!" 
        message="Thank you for subscribing! You will receive the weekly updates related to modern threat intelligence and human security." 
      />
    </GSAPWrapper>
  );
}
