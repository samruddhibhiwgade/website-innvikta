import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function DemoForm({
  form,
  setForm,
  errors,
  setErrors,
  isSubmitting,
  handleSubmit,
  getEmailError,
  getPhoneError,
  validateEmail
}) {
  return (
    <div className="col-12 lg:col-5 relative">
      <div className="absolute inset-0 -m-8 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="relative bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[24px] p-8 md:p-10">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-dark mb-2">
            Request a Personalized <span className="text-[#f15a24]">Demo</span>
          </h3>
          <p className="text-slate-500 text-sm">
            Fill out the form below, and our cybersecurity experts will tailor a demo session for your team size and industry threat vectors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => {
                setForm({...form, fullName: e.target.value});
                if (errors.fullName) setErrors({...errors, fullName: ""});
              }}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.fullName ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
            />
            {errors.fullName && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Designation</label>
            <select 
              value={form.designation}
              onChange={(e) => {
                setForm({...form, designation: e.target.value});
                if (errors.designation) setErrors({...errors, designation: ""});
              }}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.designation ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
            >
              <option value="">Select designation</option>
              <option>Director / VP</option>
              <option>CISO / CSO / CIO</option>
              <option>Manager / Lead</option>
              <option>Engineer / Specialist</option>
              <option>HR / Compliance Officer</option>
              <option>Consultant / Advisor</option>
              <option>Other / Executive</option>
            </select>
            {errors.designation && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.designation}</p>}
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Work Email</label>
            <input 
              type="email" 
              placeholder="john@company.com"
              value={form.email}
              onChange={(e) => {
                setForm({...form, email: e.target.value});
                if (errors.email && !validateEmail(e.target.value)) setErrors({...errors, email: ""});
              }}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${(errors.email || getEmailError()) ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
            />
            {getEmailError() && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{getEmailError()}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Phone Number</label>
            <input 
              type="tel" 
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setForm({...form, phone: val});
                if (errors.phone && val.length === 10) setErrors({...errors, phone: ""});
              }}
              maxLength={10}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${(errors.phone || getPhoneError()) ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
            />
            {getPhoneError() && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{getPhoneError()}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Company</label>
              <input 
                type="text" 
                placeholder="Acme Inc."
                value={form.company}
                onChange={(e) => {
                  setForm({...form, company: e.target.value});
                  if (errors.company) setErrors({...errors, company: ""});
                }}
                className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.company ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all`}
              />
              {errors.company && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.company}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Team Size</label>
              <select 
                value={form.teamSize}
                onChange={(e) => {
                  setForm({...form, teamSize: e.target.value});
                  if (errors.teamSize) setErrors({...errors, teamSize: ""});
                }}
                className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.teamSize ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"} rounded-xl text-dark focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer`}
              >
                <option value="">Select size</option>
                <option>1–10</option>
                <option>11–25</option>
                <option>26–50</option>
                <option>51–100</option>
                <option>100–200</option>
                <option>200–500</option>
                <option>500–1000</option>
                <option>1000–2000</option>
                <option>2000+</option>
              </select>
              {errors.teamSize && <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wide">{errors.teamSize}</p>}
            </div>
          </div>
          
          <div className="pt-2 flex justify-start">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group relative px-10 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
            >
              <div className="relative z-10 flex items-center gap-2">
                <span className="uppercase tracking-wider text-sm">
                  {isSubmitting ? "Submitting..." : "Book a Demo"}
                </span>
                {!isSubmitting && (
                  <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                )}
              </div>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            By submitting, you agree to receive follow-up information regarding the demo session.
          </p>
        </div>
      </div>
    </div>
  );
}
