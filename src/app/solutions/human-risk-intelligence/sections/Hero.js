import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
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
            <div className="shape-2-inner-2">
              <svg width="100%" height="100%" viewBox="0 0 426 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M241.39 507.775L0.180044 612.19L185.387 100.986L425.875 0.00805664L241.39 507.775Z" fill="url(#paint0_linear_hero_3)" />
                <defs>
                  <linearGradient id="paint0_linear_hero_3" x1="426.129" y1="607.122" x2="-243.854" y2="-82.0361" gradientUnits="userSpaceOnUse">
                    <stop offset="0.22" stopColor="#FF7A00" />
                    <stop offset="0.55" stopColor="#F59E0B" />
                    <stop offset="0.89" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="shape-2-inner-3">
              <svg width="100%" height="100%" viewBox="0 0 313 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M259.325 543.891L0.873635 683.366L54.1947 136.437L312.926 0.0959473L259.325 543.891Z" fill="url(#paint0_linear_hero_4)" />
                <defs>
                  <linearGradient id="paint0_linear_hero_4" x1="541.623" y1="465.932" x2="-672.11" y2="-514.628" gradientUnits="userSpaceOnUse">
                    <stop offset="0.22" stopColor="#FF7A00" />
                    <stop offset="0.55" stopColor="#F59E0B" />
                    <stop offset="0.89" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="shape-2-inner-4">
              <svg width="100%" height="100%" viewBox="0 0 272 715" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M271.797 551.346L36.791 714.998L0.988926 160.822L236.664 0.241187L271.797 551.346Z" fill="#FF7A00" />
              </svg>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <span className="text-subheading">HUMAN BEHAVIOUR & RISK ANALYTICS</span>
            <h1 className="text-96-heading hero-title-custom">AI-Powered Human Risk Intelligence</h1>

            <div className="hero-text-wrapper">
              <p className="text-20-content hero-paragraph">
                Uncover risky users, weak teams, behaviour trends, and training gaps - before they become incidents.
              </p>
            </div>

              <div className="hero-actions-row">
                <Link 
                  href="/start-free" 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 flex items-center justify-center font-bold text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Start Free
                </Link>
                <Link 
                  href="/book-demo" 
                  className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Explore Platform <FiArrowRight className="text-xs" />
                </Link>
              </div>
          </div>
        </div>

        <div className="container container-hero-visual">
          <div className="hero-visual">
            <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
