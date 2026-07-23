import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="section banner pt-0 relative overflow-hidden" style={{ paddingBottom: "5rem", paddingTop: "4rem" }}>
      <div className="banner-bg absolute left-0 top-0 w-full h-full overflow-hidden z-0" style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/about-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%"
      }}>
      </div>
      <div className="container-xl relative z-20">
        <div className="row overflow-hidden rounded-2xl will-change-transform">
          <div className="col-12">
            <div className="row relative justify-center pb-10">
              <div className="banner-content col-10 pb-0 pt-10 md:pt-20 text-center will-change-transform">
                 <h1 className="mb-6 banner-title company-hero-title font-semibold text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                  Human Risk Management <br />for the <span className="text-[#f15a24]">AI Era</span>
                </h1>
                <p className="banner-desc text-white/90 text-base md:text-lg max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                  Innvikta helps organizations make security awareness practical, engaging, measurable, and built for real-world behaviour change.
                </p>

                <div className="banner-btn flex flex-wrap items-center justify-center gap-4">
                  <Link href="#our-story" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-6 h-12 font-bold shadow-md shadow-orange-500/10">Read Our Story <FiArrowRight className="text-xs" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .company-hero-title {
            font-family: 'STKBureau-Sans', sans-serif !important;
            font-weight: 600 !important;
            letter-spacing: -0.02em !important;
        }
      `}</style>
    </section>
  );
}
