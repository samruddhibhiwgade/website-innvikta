"use client";

import { gsap } from "@lib/gsap";
import { useEffect, useRef } from "react";

const Metrics = ({ metrics }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = document.querySelectorAll(".stat-value");
      stats.forEach((stat) => {
        const valueStr = stat.getAttribute("data-value");
        if (!valueStr) return;
        
        // Extract numeric part (e.g., "500,000" -> 500000, "94%" -> 94)
        const match = valueStr.replace(/,/g, "").match(/[0-9.]+/);
        if (!match) return;
        
        const numericValue = parseFloat(match[0]);
        const suffix = valueStr.replace(/[0-9.,]/g, "");
        // Check if there's a prefix (unlikely given requirements but good for robustness)
        const prefixMatch = valueStr.match(/^[^0-9]*/);
        const prefix = prefixMatch ? prefixMatch[0] : "";

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            stat.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-body py-24 border-b border-border">
      <div className="container">
        <div className="row justify-center text-center mb-16">
          <div className="col-12 lg:col-8">
            <h2 className="mb-6 text-4xl md:text-5xl font-bold leading-tight">{metrics.title}</h2>
            <p className="text-lg md:text-xl text-light leading-relaxed">
              {metrics.description}
            </p>
          </div>
        </div>
        <div className="row justify-center">
          {metrics.list?.map((item, index) => (
            <div key={index} className="col-12 md:col-4 mb-12 md:mb-0 text-center">
              <div className="px-4 flex flex-col items-center text-center">
                <span 
                  className="stat-value block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-[#ff8c42] mb-4"
                  data-value={item.value}
                >
                  0
                </span>
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-slate-500 max-w-[200px] mx-auto">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
