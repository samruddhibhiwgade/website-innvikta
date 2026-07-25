"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiShield } from "react-icons/fi";

export default function DpdpBannerSection() {
  return (
    <section className="dpdp-banner-section py-16 md:py-24 bg-white">
      <div className="container">
        <div className="animate bg-[#FFFBF7] border border-[#FFEAD4] rounded-[24px] overflow-hidden p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(241,90,36,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs font-bold bg-[#FFEFEA] text-[#f15a24]">
                <FiShield size={14} />
                DPDP Act Compliance
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-52-heading font-bold text-slate-900 leading-tight mb-4 font-secondary tracking-tight">
                India's DPDP Act.<br/>
                <span className="text-[#f15a24]">Decoded at a Glance.</span>
              </h2>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                India's Digital Personal Data Protection Act requires companies to ensure "reasonable security safeguards" for personal data. Understand your liabilities, penalties, and employee training requirements under the new framework.
              </p>
              
              <Link 
                href="/resources/dpdp-at-a-glance"
                className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                style={{ padding: "14px 28px" }}
              >
                Explore DPDP Resource <FiArrowRight className="text-xs" />
              </Link>
            </div>
            
            {/* Right Column: Visual Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center bg-white rounded-2xl border border-orange-100/50 shadow-sm p-4">
                <img 
                  src="/images/dpdp_compliance.png" 
                  alt="DPDP Compliance Illustration" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
