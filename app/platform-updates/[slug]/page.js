"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiTag, FiClock, FiShare2, FiCheckCircle, FiInfo } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

export default function PlatformUpdateDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const updatesData = {
    "product-updates-q2-2026-review": {
      slug: "product-updates-q2-2026-review",
      category: "PRODUCT",
      date: "June 24, 2026",
      readTime: "4 min read",
      version: "v2.6.0",
      impact: "High",
      title: "Product Updates: Q2 2026 Review & Core Enhancements",
      desc: "This quarter, we rolled out advanced AI-driven phishing simulation customization, compliance tracking mappings for regional privacy laws, and multiplayer security quizzes inside the Innvikta Arcade. Read on to discover how these features will improve employee retention and streamline audit logging.",
      image: "/images/platform-learning.png",
      graphicText: "Q2 RECAP",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg text-slate-800 font-medium">
            We are excited to share our product wrap-up for the second quarter of 2026. This quarter, our focus was on expanding user engagement, automating custom risk mitigation campaigns, and mapping compliance metrics directly to global regulatory frameworks.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            1. Next-Gen Phishing Simulations
          </h3>
          <p>
            Standard phishing templates are easily spotted. In Q2, we integrated our intent-based template generator, allowing security teams to automatically generate hyper-realistic, localized email templates that simulate modern social engineering tactics.
          </p>
          <div className="bg-[#FFEFEA] border-l-4 border-[#f15a24] p-4 rounded-r-xl my-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <FiCheckCircle className="text-[#f15a24]" /> Custom Lures and Multi-Vector Integration
            </h4>
            <p className="text-sm mt-1 text-slate-700">
              Users can now launch simulations that stretch across email, SMS (Smishing), and WhatsApp messaging in a synchronized campaign, mirroring how modern APTs operate.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            2. Interactive Gamified Training Challenges
          </h3>
          <p>
            The Innvikta Arcade has been upgraded with multiplayer mode. Employees can now challenge their peers to security trivia duels, compete in real-time speed rounds, and climb departmental leaderboards. Initial telemetry shows a <strong>140% increase in weekly active participation</strong>.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            3. Dynamic Regional Compliance Mappings
          </h3>
          <p>
            Compliance shouldn&apos;t be a headache. The new compliance dashboard enables security managers to instantly map active employee training completions to specific compliance frameworks, including the Digital Personal Data Protection (DPDP) Act of India, GDPR, HIPAA, and SOC 2 audits.
          </p>

          <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mt-6">
            <FiInfo className="text-blue-500 shrink-0 text-xl mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Update Availability</span>
              <p className="text-sm text-slate-650 mt-1">
                These features are rolled out automatically and are available to all Enterprise and Professional tier customers starting today.
              </p>
            </div>
          </div>
        </div>
      )
    },
    "innvikta-arcade-interactive-gamified-training-challenges": {
      slug: "innvikta-arcade-interactive-gamified-training-challenges",
      category: "INNVIKTA ARCADE",
      date: "May 12, 2026",
      readTime: "3 min read",
      version: "v2.5.1",
      impact: "Medium",
      title: "Innvikta Arcade: Interactive Gamified Training Challenges",
      desc: "Introduce employees to immersive role-based scenarios, competitive team leaderboards, and interactive security quizzes designed to keep training retention high throughout the year.",
      image: "/images/arcade-preview.png",
      graphicText: "INNVIKTA ARCADE",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg text-slate-800 font-medium">
            Gamification is no longer a buzzword; it is a proven strategy for building a resilient security culture. The Innvikta Arcade introduces immersive gamified challenges that test employees&apos; defense reflexes in real-time.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            Immersive Role-Based Missions
          </h3>
          <p>
            Instead of standard slide decks, users step into the shoes of IT support agents, HR managers, or financial executives. They must navigate realistic daily workloads while spotting and responding to multi-vector social engineering attempts.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            Departmental Leaderboards & Achievements
          </h3>
          <p>
            Friendly competition drives participation. The updated Leaderboard interface displays department-level security indices, allowing the engineering team to challenge sales, finance, or operations to monthly security supremacy.
          </p>

          <div className="bg-[#FFEFEA] p-4 rounded-xl border-l-4 border-[#f15a24] my-6">
            <h4 className="font-bold text-slate-950">Key Achievements Included:</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Phishing Sentinel:</strong> Awarded for reporting 5 phishing simulations in a row without a single click.</li>
              <li><strong>Speedy Reporter:</strong> Awarded for reporting a simulation within 2 minutes of delivery.</li>
              <li><strong>Compliance Champion:</strong> Completed all mandatory regulatory modules with a perfect score.</li>
            </ul>
          </div>
        </div>
      )
    },
    "advanced-intent-based-phishing-simulations": {
      slug: "advanced-intent-based-phishing-simulations",
      category: "SIMULATIONS",
      date: "April 08, 2026",
      readTime: "5 min read",
      version: "v2.5.0",
      impact: "High",
      title: "Advanced Intent-Based Phishing Simulations",
      desc: "Create custom simulation campaigns using automated template generators that reflect real-world social engineering, spear phishing, and credential harvesting attacks.",
      image: "/images/phishing-simulator.png",
      graphicText: "PHISHING SIMULATION",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg text-slate-800 font-medium">
            Our simulations department has launched the intent-based campaign builder. Teams can now model attacks based on the exact motivations of real-world hacker groups (financial gain, corporate espionage, credential theft).
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            Intent-Based Template Generation
          </h3>
          <p>
            Our engine analyzes active threat patterns globally and automatically crafts email lures that reflect actual real-time threat campaigns. Whether it&apos;s a fake tax refund, an urgent corporate policy change, or a software update prompt, the lures are dynamically tailored.
          </p>

          <h3 className="text-2xl font-bold text-[#f15a24] mt-8">
            Detailed Susceptibility Telemetry
          </h3>
          <p>
            Track metrics that matter. Go beyond click-rates with detailed metrics on user interactions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 bg-slate-55 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900">Email Open Time</h5>
              <p className="text-xs text-slate-600 mt-1">Tracks exactly how long a user spends reviewing the email before taking action.</p>
            </div>
            <div className="p-4 bg-slate-55 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900">Form Submission</h5>
              <p className="text-xs text-slate-600 mt-1">Monitors if users entered mock credentials or sensitive details in landing pages.</p>
            </div>
            <div className="p-4 bg-slate-55 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900">Reporting Speed</h5>
              <p className="text-xs text-slate-600 mt-1">Measures the lag between campaign delivery and first threat report submission.</p>
            </div>
          </div>
        </div>
      )
    },
    "regional-data-privacy-compliance-mappings": {
      slug: "regional-data-privacy-compliance-mappings",
      category: "COMPLIANCE",
      date: "March 15, 2026",
      readTime: "3 min read",
      version: "v2.4.2",
      impact: "Medium",
      title: "Regional Data Privacy & Compliance Mappings",
      desc: "Automatically map active security awareness courses to major global regulatory frameworks, including DPDP (India), GDPR (Europe), HIPAA (US), and SOC 2 audits.",
      image: "/images/compliance-training.png",
      graphicText: "COMPLIANCE TRACKING",
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p className="text-lg text-slate-800 font-medium">
            With the rapid implementation of regional data protection laws like India&apos;s DPDP Act, compliance tracking has become a critical operational requirement for enterprises.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            One-Click Auditor Evidence Logs
          </h3>
          <p>
            No more manual spreadsheet compilation. The Compliance Mapper generates consolidated, signed completion reports containing course modules, test results, and user sign-offs. These documents serve as verified evidence for SOC 2 audits, GDPR reports, and HIPAA certifications.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-[#f15a24] pl-3 mt-8">
            Automated Recertification Schedules
          </h3>
          <p>
            Compliance requires continuous learning. Set custom schedules that automatically remind and enroll employees whose certifications are close to expiry, ensuring 100% organizational compliance at any given audit timestamp.
          </p>
        </div>
      )
    }
  };

  const currentUpdate = updatesData[slug];

  if (!currentUpdate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-800 p-6">
        <h1 className="text-3xl font-bold mb-4">Platform Update Not Found</h1>
        <p className="text-slate-600 mb-6">The update you are trying to access does not exist or has been relocated.</p>
        <Link href="/platform-updates" className="flex items-center gap-2 bg-[#f15a24] text-white px-5 py-2.5 rounded-full hover:bg-[#df4b17] transition-all font-sans font-bold text-sm">
          <FiArrowLeft /> Back to updates
        </Link>
      </div>
    );
  }

  // Get other updates list
  const otherUpdates = Object.values(updatesData).filter(item => item.slug !== slug);

  return (
    <GSAPWrapper>
      <div className="min-h-screen w-full bg-white text-slate-800 font-sans selection:bg-[#f15a24] selection:text-white pb-24">
        
        {/* ================= HEADER BANNER ================= */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#f15a24] to-[#df4b17] relative overflow-hidden text-white border-b border-[#e24e1b]">
          {/* Decorative Grid */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-[0.08] pointer-events-none z-0">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
          
          <div className="container px-6 md:px-12 lg:px-24 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-200 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/platform-updates" className="hover:text-white transition-colors">Platform Updates</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[200px] md:max-w-sm">{currentUpdate.category}</span>
            </nav>

            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                  {currentUpdate.category}
                </span>
                <span className="text-orange-200 font-semibold text-xs flex items-center gap-1">
                  <FiCalendar /> {currentUpdate.date}
                </span>
                <span className="text-orange-200 font-semibold text-xs flex items-center gap-1">
                  <FiClock /> {currentUpdate.readTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-secondary text-white tracking-tight leading-tight">
                {currentUpdate.title}
              </h1>
            </div>
          </div>
        </section>

        {/* ================= MAIN CONTENT SECTION ================= */}
        <div className="container px-6 md:px-12 lg:px-24 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Column */}
            <main className="lg:col-span-8 space-y-8">
              
              {/* Feature Image */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100/80 aspect-[16/9] bg-slate-50 relative flex items-center justify-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentUpdate.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                <span className="absolute bottom-6 left-6 text-xs text-white/90 font-bold uppercase tracking-widest bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                  {currentUpdate.graphicText}
                </span>
              </div>

              {/* Main Body */}
              <article className="prose max-w-none pt-4">
                {currentUpdate.content}
              </article>

              {/* CTA Back */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                <Link 
                  href="/platform-updates"
                  className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-800 hover:text-[#f15a24] transition-colors border-b-2 border-slate-800 hover:border-[#f15a24] pb-1 font-sans"
                >
                  <FiArrowLeft /> Back to updates
                </Link>
              </div>

            </main>

            {/* Right Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Card: Update Stats */}
              <div className="bg-[#FFEFEA] rounded-2xl p-6 border border-[#f15a24]/10 space-y-6">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#f15a24]">Update Details</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#f15a24]/10 text-sm">
                    <span className="text-slate-500 font-medium">Release Version</span>
                    <span className="text-slate-900 font-bold font-sans">{currentUpdate.version}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#f15a24]/10 text-sm">
                    <span className="text-slate-500 font-medium">Impact Level</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${currentUpdate.impact === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                      {currentUpdate.impact}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#f15a24]/10 text-sm">
                    <span className="text-slate-500 font-medium">Platform Scope</span>
                    <span className="text-slate-900 font-bold">Global SaaS</span>
                  </div>
                </div>
              </div>

              {/* Card: Share */}
              <div className="border border-slate-100 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <FiShare2 /> Share update
                </h4>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-3 border border-slate-200 hover:border-[#f15a24] hover:text-[#f15a24] text-xs font-bold rounded-lg transition-colors font-sans text-slate-650">
                    Twitter
                  </button>
                  <button className="flex-1 py-2 px-3 border border-slate-200 hover:border-[#f15a24] hover:text-[#f15a24] text-xs font-bold rounded-lg transition-colors font-sans text-slate-650">
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Card: Recent / Other Updates */}
              <div className="border border-slate-100 rounded-2xl p-6 space-y-6">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-900">Recent Announcements</h4>
                <div className="space-y-6">
                  {otherUpdates.map((update, idx) => (
                    <div key={idx} className="group block space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                        <span className="text-[#f15a24]">{update.category}</span>
                        <span>•</span>
                        <span>{update.date}</span>
                      </div>
                      <Link 
                        href={`/platform-updates/${update.slug}`}
                        className="block font-bold text-slate-800 group-hover:text-[#f15a24] transition-colors leading-snug line-clamp-2"
                      >
                        {update.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>

      </div>
    </GSAPWrapper>
  );
}
