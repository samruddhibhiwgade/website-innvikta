"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowRight, FiCalendar, FiClock, FiUser, FiSearch, FiCheckCircle } from "react-icons/fi";
import "../../../styles/insat.scss";

const NEWSLETTER_EDITIONS = [
  {
    slug: "future-of-human-risk-management",
    title: "The Future of Human Risk Management in 2026",
    description: "Discover how AI-driven behavioral profiling, continuous training, and automated phishing feedback loops are redefining enterprise cybersecurity culture.",
    date: "July 15, 2026",
    readTime: "6 min read",
    author: "Derick C.",
    category: "Insights",
    badge: "Trending",
  },
  {
    slug: "combating-vishing-attacks-deepfakes",
    title: "Combating Vishing & Audio Deepfakes",
    description: "Practical strategies for training employees to detect AI voice cloning, phone scams, and high-frequency corporate social engineering campaigns.",
    date: "July 08, 2026",
    readTime: "8 min read",
    author: "Derick C.",
    category: "Threat Defense",
    badge: "New",
  },
  {
    slug: "dpdp-act-employee-compliance-check",
    title: "DPDP Act 2023: Employee Awareness Checklist",
    description: "Ensure your workforce understands data fiduciary duties, consent managers, and personal data rights under the newly notified rules.",
    date: "July 01, 2026",
    readTime: "5 min read",
    author: "Compliance Team",
    category: "Compliance",
    badge: "Essential",
  }
];

const CATEGORIES = ["All", "Insights", "Threat Defense", "Compliance"];

export default function WeeklyNewsletterPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const filteredEditions = NEWSLETTER_EDITIONS.filter((edition) => {
    const matchesCategory = selectedCategory === "All" || edition.category === selectedCategory;
    const matchesSearch = edition.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          edition.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SeoMeta 
        title="Weekly Cybersecurity Awareness Newsletter | Innvikta" 
        description="Stay ahead of human risk, compliance updates, and modern cybersecurity awareness trends with Innvikta's weekly newsletter." 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white py-20 relative overflow-hidden">
        {/* Subtle geometric grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Soft glowing orange radial lights */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f15a24]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f15a24]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="text-[#f15a24] font-extrabold uppercase tracking-widest text-xs px-3 py-1 bg-[#f15a24]/10 border border-[#f15a24]/20 rounded-full inline-block mb-4">
            INNVIKTA INTEL
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Weekly Cybersecurity <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#f15a24]">
              Awareness Newsletter
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Stay ahead of human risk, upcoming compliance regulations, and modern security training strategies. Curated insights delivered directly to your inbox every Thursday.
          </p>

          {/* Subscription Card */}
          <div className="max-w-md mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
            {subscribed ? (
              <div className="flex flex-col items-center py-4 text-center">
                <FiCheckCircle size={48} className="text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Subscription Confirmed!</h3>
                <p className="text-slate-400 text-xs font-medium">You will receive the next edition this Thursday.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="text-left mb-4">
                  <h3 className="text-sm font-bold text-white">Join 15,000+ CISO & Security Leaders</h3>
                  <p className="text-slate-400 text-xs font-semibold">Weekly threat analysis, custom templates & guides.</p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email"
                    className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all pr-12 font-semibold"
                  />
                  <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#f15a24] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Subscribe Now <FiArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="bg-slate-50 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedCategory === cat
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-[#f15a24] hover:text-[#f15a24] cursor-pointer"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search newsletter editions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none transition-all font-semibold shadow-sm"
              />
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            </div>
          </div>

          {/* Editions Grid */}
          {filteredEditions.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-8">
              <p className="text-slate-400 font-bold text-sm">No newsletter editions found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEditions.map((edition) => (
                <article 
                  key={edition.slug}
                  className="bg-white border border-slate-200/80 hover:border-[#f15a24]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#f15a24] bg-[#f15a24]/5 px-2.5 py-1 rounded-lg border border-[#f15a24]/10">
                        {edition.category}
                      </span>
                      {edition.badge && (
                        <span className="bg-slate-900 text-white font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">
                          {edition.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#f15a24] transition-colors leading-snug mb-3">
                      <Link href={`/resources/weekly-newsletter/${edition.slug}`}>
                        {edition.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold mb-6 flex-1">
                      {edition.description}
                    </p>

                    {/* Meta Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} className="text-[#f15a24]" />
                        <span>{edition.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock size={13} className="text-[#f15a24]" />
                        <span>{edition.readTime}</span>
                      </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="mt-5 pt-1">
                      <Link 
                        href={`/resources/weekly-newsletter/${edition.slug}`}
                        className="inline-flex items-center gap-1.5 text-slate-800 hover:text-[#f15a24] font-extrabold text-xs transition-colors group-hover:translate-x-1 duration-200"
                      >
                        Read Edition <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
