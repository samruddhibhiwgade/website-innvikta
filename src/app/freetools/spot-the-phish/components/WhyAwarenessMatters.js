import React from "react";
import { 
  FiUserX, 
  FiKey, 
  FiDollarSign, 
  FiMail, 
  FiAlertCircle, 
  FiLock, 
  FiGlobe, 
  FiClock, 
  FiPaperclip 
} from "react-icons/fi";

export default function WhyAwarenessMatters() {
  return (
    <section id="why-phishing-awareness" className="section bg-white border-t border-border" style={{ padding: "8rem 0" }}>
      <div className="container">
        
        <div className="animate" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="text-subheading" style={{ display: "block", marginBottom: "1rem", textAlign: "center" }}>WHY AWARENESS MATTERS</span>
          <h2 className="text-52-heading text-dark" style={{ textAlign: "center", display: "block", width: "100%", margin: "0 auto" }}>Why Phishing Awareness Matters</h2>
        </div>

        <div className="animate" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="text-18-content text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ textAlign: "center", margin: "0 auto", padding: "2rem 0" }}>
            Phishing remains one of the most successful cyberattack methods used by threat actors worldwide. 
            Attackers frequently impersonate Microsoft 365, Google Workspace, banks, HR departments, and IT support teams.
          </p>
        </div>
        
        <div className="animate" style={{ maxWidth: "900px", margin: "4rem auto 6rem auto", textAlign: "center" }}>
          <h3 className="text-2xl font-bold text-dark" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            A single phishing email can lead to:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center px-4" style={{ margin: "0 auto" }}>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiUserX className="text-primary flex-shrink-0 text-xl" /> <span>Account compromise</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiKey className="text-primary flex-shrink-0 text-xl" /> <span>Credential theft</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiDollarSign className="text-primary flex-shrink-0 text-xl" /> <span>Financial fraud</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiMail className="text-primary flex-shrink-0 text-xl" /> <span>Email compromise</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiAlertCircle className="text-primary flex-shrink-0 text-xl" /> <span>Malware infections</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
              <FiLock className="text-primary flex-shrink-0 text-xl" /> <span>Ransomware attacks</span>
            </div>
          </div>
        </div>

        <div id="phishing-red-flags" className="text-center animate" style={{ marginTop: "5rem", marginBottom: "2.5rem" }}>
          <span className="text-subheading block text-center" style={{ marginBottom: "0.75rem" }}>RED FLAGS</span>
          <h2 className="text-52-heading text-center text-dark" style={{ margin: 0 }}>Common Phishing Red Flags</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate px-6 sm:px-8">
          
          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiGlobe className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Suspicious Domains</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Lookalike domains, e.g., <code className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-mono text-xs border border-red-100 break-all block my-1">support@microsoft-security365.com</code> instead of <code className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-mono text-xs border border-green-100 break-all block my-1">support@microsoft.com</code>.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiClock className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Urgent Language</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Creating false panic by claiming accounts will be suspended or immediate actions are required.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiUserX className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Generic Greetings</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Using generic &quot;Dear Customer&quot; greetings instead of your actual name to target mass user lists.
            </p>
          </div>

          <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
            <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
              <FiPaperclip className="text-xl" />
            </div>
            <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Unexpected Attachments</h3>
            <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
              Unsolicited files, especially ZIP files or macros, that bypass controls to drop malware.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
