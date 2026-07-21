import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Circle from "../components/Circle";
import NetworkBackground from "@layouts/components/NetworkBackground";

export default function HeroSection() {
  return (
    <section className="section banner pt-0 relative overflow-hidden" style={{ paddingBottom: "5rem", paddingTop: "4rem" }}>
      <div className="banner-bg absolute left-0 top-0 w-full h-full overflow-hidden z-0 bg-[#fff7f3]" style={{ height: "100%" }}>
        <Circle className="circle left-[10%] top-12" width={32} height={32} fill={false} />
        <Circle className="circle left-[2.5%] top-[29%]" width={85} height={85} />
        <Circle className="circle bottom-[48%] left-[22%]" width={20} height={20} />
        <Circle className="circle bottom-[37%] left-[15%]" width={47} height={47} fill={false} />
        <Circle className="circle bottom-[13%] left-[6%]" width={62} height={62} fill={false} />
        <Circle className="circle right-[12%] top-[15%]" width={20} height={20} />
        <Circle className="circle right-[2%] top-[30%]" width={73} height={73} fill={false} />
        <Circle className="circle right-[19%] top-[48%]" width={37} height={37} fill={false} />
        <Circle className="circle right-[33%] top-[54%]" width={20} height={20} />
        <Circle className="circle bottom-[20%] right-[3%]" width={65} height={65} />
        <NetworkBackground />
      </div>
      <div className="container-xl relative z-20">
        <div className="row overflow-hidden rounded-2xl will-change-transform">
          <div className="col-12">
            <div className="row relative justify-center pb-10">
              <div className="banner-content col-10 pb-0 pt-10 md:pt-20 text-center will-change-transform">
                <h1 className="mb-6 banner-title font-bold text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                  Human Risk Management <br />for the <span className="text-primary">AI Era</span>
                </h1>
                <p className="banner-desc text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                  Innvikta helps organizations make security awareness practical, engaging, measurable, and built for real-world behaviour change.
                </p>

                <div className="banner-btn flex flex-wrap items-center justify-center gap-4">
                  <Link href="/book-demo" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">Book a Demo <FiArrowRight className="text-xs" /></Link>
                  <Link href="/book-demo" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">Book a Demo <FiArrowRight className="text-xs" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
