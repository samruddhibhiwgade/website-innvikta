import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { keyBenefits } from "./constants";

export default function ValueProps() {
  return (
    <div className="col-12 lg:col-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
      <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
        Build Safe Workforces <span className="text-[#f15a24]">Starting Today</span>
      </h2>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Join the platform to run simulations, evaluate compliance benchmarks, and track training retention scores inside your company for free.
      </p>

      <div className="space-y-8 mb-10">
        {keyBenefits.map((benefit, i) => (
          <div key={i} className="flex items-start gap-4">
            <FiCheckCircle className="text-3xl text-[#f15a24] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-dark text-lg leading-tight mb-1">
                {benefit.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Callout Section */}
      <div className="pt-8 border-t border-slate-200 mt-8">
        <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
          Start <span className="text-[#f15a24]">Security Awareness Training</span> Today
        </h3>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
          Start building a stronger security culture with free awareness training modules, cybersecurity games. Create your account and get started in minutes.
        </p>
      </div>

      {/* Sales Callout */}
      <div className="pt-6 border-t border-slate-200 mt-6">
        <p className="text-slate-750 text-base leading-relaxed font-medium">
          Need custom enterprise parameters or advanced integrations? Contact our sales team directly at{" "}
          <a href="mailto:sale@innvikta.com" className="text-[#f15a24] font-extrabold hover:underline">
            sale@innvikta.com
          </a>
        </p>
      </div>
    </div>
  );
}
