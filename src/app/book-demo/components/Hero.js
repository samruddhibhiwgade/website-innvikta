import React from "react";

export default function HeroSection() {
  return (
    <div className="bg-[#f15a24] !text-white py-12 relative overflow-hidden">
      {/* Background Decorative Rings & Dots */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 opacity-25 pointer-events-none">
        <svg viewBox="0 0 300 200" fill="none" className="w-full h-full object-cover md:object-right">
          {/* Dotted curve */}
          <circle cx="260" cy="100" r="130" stroke="white" strokeWidth="2" strokeDasharray="4 8" />
          {/* Thick solid ring */}
          <circle cx="260" cy="100" r="100" stroke="white" strokeWidth="8" opacity="0.3" />
          {/* White solid curve */}
          <circle cx="260" cy="100" r="70" stroke="white" strokeWidth="14" opacity="0.5" />
        </svg>
      </div>
      
      <div className="container px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white font-secondary">
            Request a Free Demo of <br />
            <span className="text-white">Innvikta InSAT</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
