"use client";

import { markdownify } from "@lib/utils/textConverter";

const Testimonial = ({ testimonial }) => {
  // Doubling the list to ensure a perfectly seamless loop in the marquee
  const tickerItems = [...testimonial.list, ...testimonial.list];

  return (
    <section className="section bg-white py-24 overflow-hidden border-t border-border">
      <div className="container">
        <div className="animate text-center mb-16">
          <h2 className="text-3xl md:text-4xl !font-semibold mb-4 leading-tight text-dark">
            {testimonial.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            {testimonial.description}
          </p>
        </div>
      </div>
      
      {/* Infinite Marquee Wrapper */}
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {tickerItems.map((item, index) => (
            <div 
              key={index} 
              className="mx-4 w-[320px] md:w-[380px] flex-shrink-0 whitespace-normal bg-slate-50 border border-slate-100 p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-500 group-hover:pause-marquee border-t-8 border-t-primary/10 hover:border-t-primary"
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-slate-800 text-sm md:text-base leading-relaxed font-semibold italic mb-10 opacity-90">
                  "{item.content}"
                </p>
                <div className="flex flex-col border-t border-slate-200 pt-6">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {item.profession.split(",")[0]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mirror div for seamless scrolling */}
        <div className="flex animate-marquee whitespace-nowrap py-4" aria-hidden="true">
          {tickerItems.map((item, index) => (
            <div 
              key={"mirror-" + index} 
              className="mx-4 w-[320px] md:w-[380px] flex-shrink-0 whitespace-normal bg-slate-50 border border-slate-100 p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-500 group-hover:pause-marquee border-t-8 border-t-primary/10 hover:border-t-primary"
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-slate-800 text-sm md:text-base leading-relaxed font-semibold italic mb-10 opacity-90">
                  "{item.content}"
                </p>
                <div className="flex flex-col border-t border-slate-200 pt-6">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {item.profession.split(",")[0]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
