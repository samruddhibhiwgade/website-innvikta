"use client";

import React, { useState, createContext } from "react";

export const FAQContext = createContext(null);

const FAQ = ({ title = "Frequently Asked Questions", subtitle, children }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <FAQContext.Provider value={{ activeId, setActiveId }}>
      <div className="my-8 p-6 md:p-8 bg-transparent border border-slate-100/80 rounded-[20px] shadow-sm max-w-3xl mx-auto text-left">
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 m-0 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-2 m-0 leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="h-[3px] w-12 bg-[#f15a24] rounded-full mt-4"></div>
        </div>
        <div className="flex flex-col gap-3.5">
          {children}
        </div>
      </div>
    </FAQContext.Provider>
  );
};

export default FAQ;
