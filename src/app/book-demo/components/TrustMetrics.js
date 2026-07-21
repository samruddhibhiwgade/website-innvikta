import React from "react";
import { metrics } from "./constants";

export default function TrustMetrics() {
  return (
    <div className="col-12 lg:col-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
      <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
        Why Organizations Choose <span className="text-[#f15a24]">Innvikta</span>
      </h2>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Innvikta helps enterprises build everyday secure behaviour across their workforce. Our platform transforms complex security training into engaging, gamified experiences.
      </p>

      {/* Plain Text Metrics List */}
      <div className="space-y-8 mb-10">
        {metrics.map((metric, i) => (
          <div key={i} className="flex items-start gap-5">
            <span className="text-3xl md:text-4xl font-extrabold text-[#f15a24] shrink-0 min-w-[75px] md:min-w-[90px]">
              {metric.value}
            </span>
            <div>
              <h4 className="font-bold text-dark text-lg leading-tight mb-1">
                {metric.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {metric.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Client / Partner Logos Infinite Scroller */}
      <div className="pt-8 border-t border-slate-200 mt-8">
        <span className="block text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-4">
          TRUSTED BY
        </span>
        
        {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Gradient overlay for fade effect matching page background */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-8 items-center animate-marquee whitespace-nowrap w-max">
            {/* First set of logos */}
            <div className="flex gap-8 items-center shrink-0">
              <img src="/images/logo1.webp" alt="Client Logo 1" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo2.webp" alt="Client Logo 2" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo3.webp" alt="Client Logo 3" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo4.webp" alt="Client Logo 4" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo5.webp" alt="Client Logo 5" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo6.webp" alt="Client Logo 6" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo7.webp" alt="Client Logo 7" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo8.webp" alt="Client Logo 8" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
            </div>
            {/* Duplicated set for seamless loop */}
            <div className="flex gap-8 items-center shrink-0">
              <img src="/images/logo1.webp" alt="Client Logo 1" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo2.webp" alt="Client Logo 2" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo3.webp" alt="Client Logo 3" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo4.webp" alt="Client Logo 4" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo5.webp" alt="Client Logo 5" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo6.webp" alt="Client Logo 6" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo7.webp" alt="Client Logo 7" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
              <img src="/images/logo8.webp" alt="Client Logo 8" className="h-8 w-auto max-w-[120px] object-contain shrink-0" />
            </div>
          </div>
        </div>
        
        {/* Inline stylesheet for keyframe scroller animation */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 16s linear infinite;
          }
        `}</style>
      </div>

      {/* Sales Link Callout */}
      <div className="pt-8 border-t border-slate-200 mt-8">
        <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
          Need custom enterprise requirements or terms? Reach out directly to our sales division at{" "}
          <a href="mailto:sales@innvikta.com" className="text-[#f15a24] font-extrabold hover:underline">
            sales@innvikta.com
          </a>
        </p>
      </div>
    </div>
  );
}
