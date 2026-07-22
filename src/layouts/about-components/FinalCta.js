import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Circle from "../components/Circle";

export default function FinalCta() {
  return (
    <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
      <div className="container-xl">
        <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
          <div className="cta-animate">
            <h2 className="section-title leading-tight">
              Ready to Build a More Security-Aware Workforce?
            </h2>
            <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
              Explore how Innvikta helps enterprises make awareness practical, engaging, and measurable.
            </p>
            
            <div className="flex flex-row flex-nowrap justify-center gap-2 sm:gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
              <Link href="/start-free" className="btn btn-outline-primary" style={{ padding: "0 clamp(12px, 3vw, 28px)", height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Start Free</Link>
              <Link href="/book-demo" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap h-12 font-bold shadow-md shadow-orange-500/10" style={{ padding: "0 clamp(12px, 3vw, 28px)" }}>Book a Demo <FiArrowRight className="text-xs" /></Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[#fff7f3] rounded-2xl overflow-hidden -z-10">
            <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
            <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
            <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
            <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
            <Circle className="right-[19%] bottom-[16%]" width={37} height={37} fill={false} fillValue="#FF5A1F" />
          </div>
        </div>
      </div>
    </section>
  );
}
