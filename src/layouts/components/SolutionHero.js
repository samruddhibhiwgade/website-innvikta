"use client";

import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ImageFallback from "./ImageFallback";
import { FiArrowRight } from "react-icons/fi";

const SolutionHero = ({ hero }) => {
  const banner = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-image-wrapper",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );
    }, banner);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section banner pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden bg-white" ref={banner}>
      <div className="container-xl px-6 lg:px-10 xl:px-16 relative z-20">
        
        <div className="row items-center justify-between gap-y-16 lg:gap-y-0">
          {/* Left Side: Text Content Area */}
          <div className="col-12 lg:col-6 xl:col-6 hero-content text-left lg:pr-12">
            {hero.subtitle && (
              <span className="mb-6 inline-block font-semibold text-slate-400 text-[15px] tracking-wide">
                {hero.subtitle}
              </span>
            )}
            
            {markdownify(
              hero.title,
              "h1",
              "mb-8 font-medium text-slate-900 text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[52px] leading-[1.15] tracking-tight"
            )}
            
            <p className="text-slate-600 text-base md:text-[17px] lg:text-[18px] mb-10 font-medium leading-relaxed max-w-lg">
              {hero.content}
            </p>
            
            <div className="flex flex-wrap items-center gap-5">
              {hero.button && (
                <Link 
                  className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                  style={{ padding: "14px 28px" }}
                  href={hero.button.link}
                >
                  {hero.button.label} 
                  <FiArrowRight className="text-xs" />
                </Link>
              )}
              {hero.button_secondary && (
                <Link 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 flex items-center justify-center font-bold text-sm"
                  style={{ padding: "14px 28px" }}
                  href={hero.button_secondary.link}
                >
                  {hero.button_secondary.label}
                </Link>
              )}
            </div>
          </div>
          
          {/* Right Side: Image Area */}
          <div className="col-12 lg:col-6 xl:col-6 hero-image-wrapper">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] bg-slate-50">
              <ImageFallback
                src={hero.image || "/images/banner-app.png"}
                className="w-full h-full object-cover object-top relative z-0"
                fill={true}
                priority={true}
                alt={hero.title.replace(/\*\*/g, "")}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionHero;
