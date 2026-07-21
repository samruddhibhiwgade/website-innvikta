import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ImageFallback from "@layouts/components/ImageFallback";
import Circle from "@layouts/components/Circle";

export default function FinalCtaSection() {
  return (
    <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
      <div className="container-xl">
        <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
          <div className="animate">
            <h2 className="section-title leading-tight">Ready to Test Your Workforce?</h2>
            <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
              Run safe simulations and turn risky behaviour into measurable learning.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
              <Link href="/start-free" className="btn btn-outline-primary">
                Start Free
              </Link>
              <Link href="/book-demo" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">Book a Demo <FiArrowRight className="text-xs" /></Link>
            </div>
          </div>
          <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
            <div className="animate-wave absolute inset-0 w-full h-full">
              <ImageFallback src="/images/wave.svg" fill={true} sizes="100vw" alt="bg wave" />
            </div>
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
