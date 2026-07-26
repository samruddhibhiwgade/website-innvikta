"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function DpdpaBanner() {
  return (
    <div className="dpdpa-banner-wrapper">
      <div className="container">
        <Link href="/resources/dpdp-at-a-glance" className="dpdpa-banner-link-wrapper">
          <div className="dpdpa-banner-card group">
            {/* Left Accent Bar */}
            <div className="dpdpa-accent-bar" />
            
            {/* Glowing Decorative Background Orbs */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-[#f15a24]/15 to-transparent rounded-full filter blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-gradient-to-tr from-[#FF7A00]/10 to-transparent rounded-full filter blur-xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
              {/* Left Column: Icon + Text */}
              <div className="flex flex-col sm:flex-row items-start gap-5 max-w-3xl text-left">
                {/* Decorative Icon Wrapper */}
                <div className="dpdpa-icon-wrapper shrink-0">
                  <HiOutlineDocumentText className="text-2xl text-[#f15a24] transition-colors duration-300" />
                </div>
                
                <div>
                  <span className="text-xs font-bold text-[#f15a24] uppercase tracking-wider bg-orange-50/80 px-3 py-1 rounded-full border border-orange-200/50 inline-block mb-3">
                    COMPLIANCE RESOURCE
                  </span>
                  <h3 className="text-28-heading text-slate-900 font-bold mb-2">
                    India's <span className="text-[#f15a24]">DPDP Act</span> At a Glance
                  </h3>
                  <p className="text-base text-slate-600 font-body leading-relaxed max-w-2xl">
                    Understand the key mandates, consent-based frameworks, and penalty structure of the Digital Personal Data Protection Act (DPDPA) with our simplified, interactive guide.
                  </p>
                </div>
              </div>
              
              {/* Right Column: CTA Button */}
              <div className="shrink-0 w-full md:w-auto flex justify-center md:justify-end">
                <span 
                  className="bg-[#f15a24] group-hover:bg-orange-600 !text-white rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 font-bold shadow-lg shadow-orange-500/10 text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  <span>Explore DPDPA Guide</span>
                  <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <style jsx global>{`
        .dpdpa-banner-wrapper {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
            background-color: #ffffff !important;
        }
        @media (min-width: 768px) {
            .dpdpa-banner-wrapper {
                padding-top: 3.5rem !important;
                padding-bottom: 3.5rem !important;
            }
        }
        .dpdpa-banner-link-wrapper {
            text-decoration: none !important;
            display: block !important;
            outline: none !important;
        }
        .dpdpa-banner-wrapper .container {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
        }
        @media (min-width: 768px) {
            .dpdpa-banner-wrapper .container {
                padding-left: 2.5rem !important;
                padding-right: 2.5rem !important;
            }
        }
        .dpdpa-banner-card {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 24px !important;
            background: linear-gradient(to right, #FFFBF7, #FFF4E9) !important;
            border: 1px solid #FFE2C6 !important;
            padding: 2rem !important;
            display: flex !important;
            box-shadow: 0 10px 30px rgba(241,90,36,0.02) !important;
            box-sizing: border-box !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            cursor: pointer !important;
        }
        .dpdpa-banner-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 20px 40px rgba(241,90,36,0.06) !important;
            border-color: #FFE3C6 !important;
            background: linear-gradient(to right, #FFFBF7, #FFEAD4) !important;
        }
        .dpdpa-accent-bar {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 5px !important;
            background-color: #f15a24 !important;
            border-top-left-radius: 24px !important;
            border-bottom-left-radius: 24px !important;
            transition: width 0.3s ease !important;
        }
        .dpdpa-banner-card:hover .dpdpa-accent-bar {
            width: 8px !important;
        }
        .dpdpa-icon-wrapper {
            width: 48px !important;
            height: 48px !important;
            border-radius: 14px !important;
            background-color: #FFF0E0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border: 1px solid #FFEAD4 !important;
            box-shadow: 0 4px 10px rgba(241,90,36,0.03) !important;
            transition: all 0.3s ease !important;
            margin-top: 0.25rem !important;
        }
        .dpdpa-banner-card:hover .dpdpa-icon-wrapper {
            background-color: #f15a24 !important;
            border-color: #f15a24 !important;
        }
        .dpdpa-banner-card:hover .dpdpa-icon-wrapper svg {
            color: #ffffff !important;
        }
        .dpdpa-banner-card h3 {
            margin-bottom: 0.5rem !important;
            margin-top: 0px !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
        }
        .dpdpa-banner-card p {
            line-height: 1.6 !important;
            margin-top: 0px !important;
            margin-bottom: 0px !important;
        }
        .dpdpa-banner-card span {
            box-sizing: border-box !important;
        }
        @media (min-width: 768px) {
            .dpdpa-banner-card {
                padding: 2.5rem 3rem !important;
            }
        }
      `}</style>
    </div>
  );
}
