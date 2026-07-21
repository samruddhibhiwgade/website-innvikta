"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import Share from "@layouts/components/Share";
import SuccessPopup from "@layouts/partials/SuccessPopup";
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiArrowLeft, 
  FiMail, 
  FiCheckCircle 
} from "react-icons/fi";
import "../../../../styles/insat.scss";

const EDITIONS_DATA = {
  "future-of-human-risk-management": {
    title: "The Future of Human Risk Management in 2026",
    description: "Discover how AI-driven behavioral profiling, continuous training, and automated phishing feedback loops are redefining enterprise cybersecurity culture.",
    date: "July 15, 2026",
    readTime: "6 min read",
    author: "Derick C.",
    category: "Insights",
    content: `
      <p>For years, security awareness training followed a simple, predictable pattern: assign a compliance video once a year, run a generic phishing simulation, record the completion, and hope for the best. But as we step into 2026, threat actors are leveraging AI to automate highly targeted social engineering campaigns at scale. The traditional, checklist-based approach is no longer sufficient.</p>

      <h2>The Rise of Behavioral Profiling</h2>
      <p>Modern human risk management (HRM) moves beyond simple compliance metrics. It uses active data telemetry to build dynamic risk profiles for every employee. Rather than treating everyone the same, organizations now analyze who is being targeted, how they interact with security prompts, and their past susceptibility.</p>
      
      <blockquote>
        "By profiling user vulnerabilities dynamically, security teams can deliver micro-learning campaigns exactly when and where they are needed most, reducing cognitive overload and maximizing engagement."
      </blockquote>

      <h2>Automated Feedback Loops</h2>
      <p>One of the biggest shifts in 2026 is the introduction of automated response loops. When an employee reports a suspicious email using a reporter button, the email is analyzed in real-time by AI triaging engines. Within seconds, the employee receives a personalized feedback message detailing whether the email was a simulation, a clean email, or a genuine threat. This instant reinforcement builds high trust and encourages active reporting.</p>

      <h2>Key Takeaways for Security Leaders</h2>
      <ul>
        <li><strong>Ditch Annual Modules:</strong> Pivot to bite-sized 2-minute micro-learning scenarios integrated into the daily flow of work.</li>
        <li><strong>Contextual Phishing:</strong> Match phishing templates to the actual SaaS tools used by specific departments (e.g., GitHub templates for Devs, Salesforce for Sales).</li>
        <li><strong>Reward Reporting:</strong> Celebrate employees who consistently detect and report threats rather than solely punishing clickers.</li>
      </ul>
    `
  },
  "combating-vishing-attacks-deepfakes": {
    title: "Combating Vishing & Audio Deepfakes",
    description: "Practical strategies for training employees to detect AI voice cloning, phone scams, and high-frequency corporate social engineering campaigns.",
    date: "July 08, 2026",
    readTime: "8 min read",
    author: "Derick C.",
    category: "Threat Defense",
    content: `
      <p>Vishing (voice phishing) has grown exponentially in complexity due to the availability of generative AI voice cloning software. It takes less than 3 seconds of reference audio to clone a voice with near-perfect accuracy. Organizations must update their defensive training to protect employees from advanced telephone scams.</p>

      <h2>How AI-Powered Voice Cloning Works</h2>
      <p>Attackers scrape public webinars, social media videos, or news interviews of corporate executives to harvest audio samples. They then use text-to-speech tools to impersonate CFOs, CEOs, or IT admins, calling junior staff to request urgent wire transfers, credential releases, or MFA bypass confirmations.</p>

      <h2>Developing a Verification Policy</h2>
      <p>To combat voice impersonation, companies should establish a strict verification protocol for out-of-band requests. No sensitive operation should be authorized solely on a phone call. Require multi-step approval through official chat channels or secondary managers.</p>
    `
  },
  "dpdp-act-employee-compliance-check": {
    title: "DPDP Act 2023: Employee Awareness Checklist",
    description: "Ensure your workforce understands data fiduciary duties, consent managers, and personal data rights under the newly notified rules.",
    date: "July 01, 2026",
    readTime: "5 min read",
    author: "Compliance Team",
    category: "Compliance",
    content: `
      <p>India's Digital Personal Data Protection (DPDP) Act 2023 introduces major responsibilities for data fiduciaries. Since employee negligence is a primary cause of data exposure, educating staff on consent and personal data security is a high priority.</p>

      <h2>Employee Obligations Checklist</h2>
      <ul>
        <li><strong>Purpose Limitation:</strong> Only process personal data for the specific reason consent was given.</li>
        <li><strong>Data Security:</strong> Maintain secure access passwords, avoid downloading data to unauthorized personal devices.</li>
        <li><strong>Breach Escalation:</strong> Immediately notify the DPO in case of any suspected unauthorized access or storage errors.</li>
      </ul>
    `
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
  const [showPopup, setShowPopup] = useState(false);

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
      setShowPopup(true);
      setEmail("");
    }
  };

  return (
    <GSAPWrapper>
      <SeoMeta 
        title={`${edition.title} | Innvikta Weekly Newsletter`} 
        description={edition.description} 
      />

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#f15a24] transition-all duration-100 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%`, zIndex: 100005 }}
      ></div>

      <section className="section bg-white pt-10 pb-24">
        <div className="container px-6 md:px-12 lg:px-24">
          
          {/* Back button */}
          <div className="mb-8 text-left">
            <Link 
              href="/resources/weekly-newsletter"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#f15a24] font-extrabold text-xs transition-colors"
            >
              <FiArrowLeft size={14} /> Back to all editions
            </Link>
          </div>

          <article>
            <div className="row justify-center">
              
              {/* Left Sidebar: Sticky share & recent list */}
              <aside className="hidden lg:block lg:col-3 pr-8 text-left">
                <div className="sticky top-36 self-start flex flex-col gap-10">
                  
                  {/* Recent editions widget */}
                  <div className="border-b border-slate-100 pb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Recent Editions</h4>
                    <ul className="space-y-3.5">
                      {OTHER_EDITIONS.filter(item => item.slug !== slug).map((item) => (
                        <li key={item.slug}>
                          <Link 
                            href={`/resources/weekly-newsletter/${item.slug}`}
                            className="text-xs font-bold text-slate-600 hover:text-[#f15a24] leading-relaxed transition-colors block"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share widget */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Share Edition</h4>
                    <Share
                      title={edition.title}
                      description={edition.description}
                      slug={`resources/weekly-newsletter/${slug}`}
                      className="flex gap-4 text-xl text-slate-400 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary"
                    />
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="col-12 lg:col-7 text-left">
                <header className="mb-8">
                  <span className="text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-3 block">
                    {edition.category}
                  </span>
                  <h1 className="font-bold leading-tight text-3xl md:text-5xl text-slate-900">
                    {edition.title}
                  </h1>
                  
                  {/* Author Details and dates */}
                  <div className="mt-6 flex items-center border-b border-slate-100 pb-6">
                    <div className="pl-1">
                      <p className="font-bold text-slate-900 leading-none mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <FiUser className="text-[#f15a24]" /> {edition.author}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-4 font-semibold">
                        <span className="flex items-center gap-1"><FiCalendar className="text-[#f15a24]" /> {edition.date}</span>
                        <span className="flex items-center gap-1"><FiClock className="text-[#f15a24]" /> {edition.readTime}</span>
                      </p>
                    </div>
                  </div>
                </header>

                {/* Mobile Share */}
                <div className="block lg:hidden mb-8 border-y py-3.5 border-slate-100 flex items-center justify-between">
                  <Share
                    title={edition.title}
                    description={edition.description}
                    slug={`resources/weekly-newsletter/${slug}`}
                    className="flex gap-5 text-2xl text-slate-400 justify-start"
                  />
                </div>

                {/* Newsletter content block */}
                <section 
                  className="content text-left" 
                  dangerouslySetInnerHTML={{ __html: edition.content }}
                />

                {/* Subscription Card at bottom of article */}
                <div className="bg-slate-50 text-slate-800 rounded-3xl p-8 border border-slate-200/80 shadow-sm mt-12">
                  {subscribed ? (
                    <div className="text-center py-4">
                      <FiCheckCircle size={40} className="text-emerald-500 mx-auto mb-2 animate-bounce" />
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Subscribed Successfully!</h4>
                      <p className="text-slate-500 text-[10px] font-semibold">You&apos;re in. We&apos;ll email you next Thursday.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FiMail size={18} className="text-[#f15a24]" />
                        <h4 className="font-black text-xs uppercase tracking-wide text-slate-900">Innvikta Cybersonic</h4>
                      </div>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                        Get curated threat analyses, custom cheat sheets, and regulatory checklists delivered weekly.
                      </p>
                      <div className="relative w-full">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your work email address"
                          className="w-full rounded-full py-4 px-6 border border-slate-300 focus:border-[#f15a24] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none text-xs pr-36 bg-white font-bold text-slate-800 placeholder-slate-400"
                        />
                        <button
                          type="submit"
                          className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 rounded-full text-xs transition-all cursor-pointer"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </article>

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
