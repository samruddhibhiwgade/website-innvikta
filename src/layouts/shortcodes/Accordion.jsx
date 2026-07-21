"use client";

import { useState, useId, useContext } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FAQContext } from "./FAQ";

const Accordion = ({ title, children, className }) => {
  const [localShow, setLocalShow] = useState(false);
  const faqContext = useContext(FAQContext);
  const localId = useId();
  const buttonId = useId();
  const panelId = useId();

  const isControlled = !!faqContext;
  const show = isControlled ? faqContext.activeId === localId : localShow;

  const handleToggle = () => {
    if (isControlled) {
      faqContext.setActiveId(show ? null : localId);
    } else {
      setLocalShow(!show);
    }
  };

  return (
    <div
      className={`mb-0 overflow-hidden rounded-2xl border transition-all duration-300 bg-[#f8fafc] ${
        show 
          ? "border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.02)]" 
          : "border-slate-100 hover:border-slate-200"
      } ${className}`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={show}
        aria-controls={panelId}
        className={`w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base focus:outline-none transition-all duration-350 cursor-pointer ${
          show ? "text-[#f15a24]" : "text-slate-800"
        }`}
        onClick={handleToggle}
      >
        <span className="leading-snug">{title}</span>
        <div
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            show ? "bg-[#f15a24] text-white rotate-180" : "bg-slate-100 text-slate-500"
          }`}
        >
          {show ? <FiMinus className="text-xs" /> : <FiPlus className="text-xs" />}
        </div>
      </button>
      
      {/* Smooth height transition panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          show ? "grid-rows-[1fr] opacity-100 border-t border-slate-200/80" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
