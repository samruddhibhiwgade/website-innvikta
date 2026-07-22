import React, { useState, useRef, useEffect } from "react";
import { FiInfo, FiChevronDown } from "react-icons/fi";

export default function CustomDropdown({ label, value, options, optionLabels, onChange, tooltip, activeTooltip, setActiveTooltip, tooltipKey, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative text-left w-full ${isOpen ? "z-50" : "z-10"} ${disabled ? "opacity-60 pointer-events-none" : ""}`} ref={dropdownRef}>
      <div className="flex items-center justify-between !mb-2 w-full">
        <div className="text-sm font-bold text-slate-800 flex items-center !gap-1.5">
          <span>{label}</span>
          {tooltip && (
            <button
              type="button"
              disabled={disabled}
              className="text-slate-400 hover:text-slate-600 focus:outline-none"
              onMouseEnter={() => !disabled && setActiveTooltip(tooltipKey)}
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label={`${label} Info`}
            >
              <FiInfo className="text-xs" />
            </button>
          )}
        </div>
        {activeTooltip === tooltipKey && !disabled && (
          <div className="absolute z-20 top-8 left-0 right-0 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg leading-relaxed">
            {tooltip}
          </div>
        )}
      </div>
      
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between !px-5 !py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:border-[#f15a24] focus:bg-white focus:ring-4 focus:ring-[#f15a24]/5 transition-all font-medium text-left ${disabled ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'cursor-pointer'} ${!value ? 'text-slate-400' : 'text-slate-800'}`}
          style={{ backgroundColor: disabled ? "#e2e8f0" : "#f8fafc" }}
        >
          <span>{value ? (optionLabels ? optionLabels[value] : value) : placeholder}</span>
          <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && !disabled && (
          <div 
            className="absolute left-0 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto no-scrollbar"
            style={{ top: "100%", padding: "6px" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left hover:bg-slate-50 transition-colors text-sm cursor-pointer rounded-lg ${opt === value ? 'bg-[#f15a24]/10 text-[#f15a24] font-semibold' : 'text-slate-700'}`}
                style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem", paddingTop: "0.625rem", paddingBottom: "0.625rem" }}
              >
                {optionLabels ? optionLabels[opt] : opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
