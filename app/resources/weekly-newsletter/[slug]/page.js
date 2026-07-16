"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCalendar, FiClock, FiUser, FiArrowLeft, FiMail, FiCheckCircle, FiShare2, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";
import "../../../styles/insat.scss";

const EDITIONS_DATA = {
  "future-of-human-risk-management": {
    title: "The Future of Human Risk Management in 2026",
    description: "Discover how AI-driven behavioral profiling, continuous training, and automated phishing feedback loops are redefining enterprise cybersecurity culture.",
    date: "July 15, 2026",
    readTime: "6 min read",
    author: "Derick C.",
    category: "Insights",
    content: (
      <>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          For years, security awareness training followed a simple, predictable pattern: assign a compliance video once a year, run a generic phishing simulation, record the completion, and hope for the best. But as we step into 2026, threat actors are leveraging AI to automate highly targeted social engineering campaigns at scale. The traditional, checklist-based approach is no longer sufficient.
        </p>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          The Rise of Behavioral Profiling
        </h2>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          Modern human risk management (HRM) moves beyond simple compliance metrics. It uses active data telemetry to build dynamic risk profiles for every employee. Rather than treating everyone the same, organizations now analyze who is being targeted, how they interact with security prompts, and their past susceptibility.
        </p>
        <blockquote className="border-l-4 border-[#f15a24] bg-orange-50/50 p-4 rounded-r-xl my-6 text-sm font-bold text-slate-800 italic">
          "By profiling user vulnerabilities dynamically, security teams can deliver micro-learning campaigns exactly when and where they are needed most, reducing cognitive overload and maximizing engagement."
        </blockquote>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          Automated Feedback Loops
        </h2>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          One of the biggest shifts in 2026 is the introduction of automated response loops. When an employee reports a suspicious email using a reporter button, the email is analyzed in real-time by AI triaging engines. Within seconds, the employee receives a personalized feedback message detailing whether the email was a simulation, a clean email, or a genuine threat. This instant reinforcement builds high trust and encourages active reporting.
        </p>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          Key Takeaways for Security Leaders
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-slate-700 space-y-3 font-semibold mb-6">
          <li><strong>Ditch Annual Modules:</strong> Pivot to bite-sized 2-minute micro-learning scenarios integrated into the daily flow of work.</li>
          <li><strong>Contextual Phishing:</strong> Match phishing templates to the actual SaaS tools used by specific departments (e.g., GitHub templates for Devs, Salesforce for Sales).</li>
          <li><strong>Reward Reporting:</strong> Celebrate employees who consistently detect and report threats rather than solely punishing clickers.</li>
        </ul>
      </>
    )
  },
  "combating-vishing-attacks-deepfakes": {
    title: "Combating Vishing & Audio Deepfakes",
    description: "Practical strategies for training employees to detect AI voice cloning, phone scams, and high-frequency corporate social engineering campaigns.",
    date: "July 08, 2026",
    readTime: "8 min read",
    author: "Derick C.",
    category: "Threat Defense",
    content: (
      <>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          Vishing (voice phishing) has grown exponentially in complexity due to the availability of generative AI voice cloning software. It takes less than 3 seconds of reference audio to clone a voice with near-perfect accuracy. Organizations must update their defensive training to protect employees from advanced telephone scams.
        </p>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          How AI-Powered Voice Cloning Works
        </h2>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          Attackers scrape public webinars, social media videos, or news interviews of corporate executives to harvest audio samples. They then use text-to-speech tools to impersonate CFOs, CEOs, or IT admins, calling junior staff to request urgent wire transfers, credential releases, or MFA bypass confirmations.
        </p>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          Developing a verification policy
        </h2>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          To combat voice impersonation, companies should establish a strict verification protocol for out-of-band requests. No sensitive operation should be authorized solely on a phone call. Require multi-step approval through official chat channels or secondary managers.
        </p>
      </>
    )
  },
  "dpdp-act-employee-compliance-check": {
    title: "DPDP Act 2023: Employee Awareness Checklist",
    description: "Ensure your workforce understands data fiduciary duties, consent managers, and personal data rights under the newly notified rules.",
    date: "July 01, 2026",
    readTime: "5 min read",
    author: "Compliance Team",
    category: "Compliance",
    content: (
      <>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-semibold">
          India's Digital Personal Data Protection (DPDP) Act 2023 introduces major responsibilities for data fiduciaries. Since employee negligence is a primary cause of data exposure, educating staff on consent and personal data security is a high priority.
        </p>

        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4">
          Employee Obligations Checklist
        </h2>
        <ul className="list-decimal list-inside text-sm md:text-base text-slate-700 space-y-3 font-semibold mb-6">
          <li><strong>Purpose Limitation:</strong> Only process personal data for the specific reason consent was given.</li>
          <li><strong>Data Security:</strong> Maintain secure access passwords, avoid downloading data to unauthorized personal devices.</li>
          <li><strong>Breach Escalation:</strong> Immediately notify the DPO in case of any suspected unauthorized access or storage errors.</li>
        </ul>
      </>
    )
  }
};

const OTHER_EDITIONS = [
  { slug: "future-of-human-risk-management", title: "The Future of Human Risk Management in 2026" },
  { slug: "combating-vishing-attacks-deepfakes", title: "Combating Vishing & Audio Deepfakes" },
  { slug: "dpdp-act-employee-compliance-check", title: "DPDP Act 2023: Employee Awareness Checklist" }
];

export default function NewsletterDetailPage() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const edition = EDITIONS_DATA[slug] || EDITIONS_DATA["future-of-human-risk-management"];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <SeoMeta 
        title={`${edition.title} | Innvikta Weekly Newsletter`} 
        description={edition.description} 
      />

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#f15a24] transition-all duration-100 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%`, zIndex: 100005 }}
      ></div>

      <div className="bg-slate-50 py-12 md:py-16 min-h-screen">
        <div className="container max-w-5xl mx-auto px-4">
          
          {/* Back button */}
          <div className="mb-8">
            <Link 
              href="/resources/weekly-newsletter"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#f15a24] font-extrabold text-xs transition-colors"
            >
              <FiArrowLeft size={14} /> Back to all editions
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Article */}
            <article className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-sm">
              
              {/* Header meta */}
              <div className="mb-6">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#f15a24] bg-[#f15a24]/5 px-2.5 py-1 rounded-lg border border-[#f15a24]/10 inline-block mb-4">
                  {edition.category}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                  {edition.title}
                </h1>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-6">
                  {edition.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-[11px] uppercase tracking-wider pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <FiUser size={14} className="text-[#f15a24]" />
                    <span>{edition.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiCalendar size={14} className="text-[#f15a24]" />
                    <span>{edition.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiClock size={14} className="text-[#f15a24]" />
                    <span>{edition.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Main Content Render */}
              <div className="prose prose-slate max-w-none pt-4 border-t border-slate-100">
                {edition.content}
              </div>

              {/* Social Share Box */}
              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FiShare2 className="text-[#f15a24]" /> Share this edition
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-[#f15a24] hover:text-[#f15a24] transition-all bg-white cursor-pointer" aria-label="Share on LinkedIn">
                    <FiLinkedin size={15} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-[#f15a24] hover:text-[#f15a24] transition-all bg-white cursor-pointer" aria-label="Share on Twitter">
                    <FiTwitter size={15} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:border-[#f15a24] hover:text-[#f15a24] transition-all bg-white cursor-pointer" aria-label="Share on Facebook">
                    <FiFacebook size={15} />
                  </button>
                </div>
              </div>

            </article>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Subscription Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg">
                {subscribed ? (
                  <div className="text-center py-4">
                    <FiCheckCircle size={40} className="text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-white mb-1">Subscribed Successfully!</h4>
                    <p className="text-slate-400 text-[10px] font-semibold">You're in. We'll email you next Thursday.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FiMail size={18} className="text-[#f15a24]" />
                      <h4 className="font-black text-sm uppercase tracking-wide">Innvikta Intel</h4>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                      Get curated threat analyses, custom cheat sheets, and regulatory checklists delivered weekly.
                    </p>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your work email address"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none transition-all font-semibold"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#f15a24] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Other editions */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 mb-4 pb-3 border-b border-slate-100">
                  Recent Editions
                </h4>
                <ul className="space-y-3">
                  {OTHER_EDITIONS.filter(item => item.slug !== slug).map((item) => (
                    <li key={item.slug}>
                      <Link 
                        href={`/resources/weekly-newsletter/${item.slug}`}
                        className="text-xs font-semibold text-slate-600 hover:text-[#f15a24] leading-relaxed transition-colors block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
