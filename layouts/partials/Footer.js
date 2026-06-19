import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const footerData = {
    solutions: [
      { name: "InSAT (Security Awareness)", url: "/solutions/insat" },
      { name: "Phishing Simulations", url: "/solutions/phishing-simulation" },
      { name: "Human Risk Intelligence", url: "/solutions/human-risk-intelligence" },
      { name: "Compliance Training", url: "/solutions/compliance-training" },
      { name: "Customized Solutions", url: "/solutions/customized-solutions" }
    ],
    freeTools: [
      { name: "Domain Security Analyzer", url: "/freetools/domain-security-analyzer" },
      { name: "Baseline Score Tool", url: "/freetools/baseline-score-tool" },
      { name: "Culture Benchmarking", url: "/freetools/culture-benchmarking" },
      { name: "Maturity Calculator", url: "#" },
      { name: "Risk Estimator", url: "#" },
      { name: "Simulation ROI Calculator", url: "#" }
    ],
    resources: [
      { name: "Maturity Benchmarks", url: "/maturity-benchmarks" },
      { name: "Blog", url: "/posts" },
      { name: "Innvikta Cyberhelp", url: "#" },
      { name: "Cybersecurity Guides", url: "#" },
      { name: "Glossary", url: "/resources/glossary" },
      { name: "Customer Success Stories", url: "#" }
    ],
    company: [
      { name: "About Us", url: "/about" },
      { name: "Contact Sales", url: "/contact" },
      { name: "Partners", url: "/partners" },
      { name: "Careers", url: "#" }
    ]
  };

  return (
    <footer className="footer bg-white border-t border-border px-6 md:px-12 lg:px-20">
      <div className="container">
        {/* Main Columns */}
        <div className="row py-20">
          {/* Logo Row */}
          <div className="col-12 mb-16 text-left">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo-main.png" 
                alt="Innvikta" 
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
 
          {/* Column 1 - Solutions */}
          <div className="col-12 sm:col-6 md:col-4 lg:col-2 mb-10 lg:mb-0">
            <h3 className="h6 font-bold uppercase tracking-wider mb-8 text-dark text-left">Solutions</h3>
            <ul className="space-y-4 text-left">
              {footerData.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Column 2 - Free Tools */}
          <div className="col-12 sm:col-6 md:col-4 lg:col-2 mb-10 lg:mb-0">
            <h3 className="h6 font-bold uppercase tracking-wider mb-8 text-dark text-left">Free Tools</h3>
            <ul className="space-y-4 text-left">
              {footerData.freeTools.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Column 3 - Resources */}
          <div className="col-12 sm:col-6 md:col-4 lg:col-2 mb-10 lg:mb-0">
            <h3 className="h6 font-bold uppercase tracking-wider mb-8 text-dark text-left">Resources</h3>
            <ul className="space-y-4 text-left">
              {footerData.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Column 4 - Company */}
          <div className="col-12 sm:col-6 md:col-4 lg:col-2 mb-10 lg:mb-0">
            <h3 className="h6 font-bold uppercase tracking-wider mb-8 text-dark text-left">Company</h3>
            <ul className="space-y-4 text-left">
              {footerData.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Newsletter Block */}
          <div className="col-12 lg:col-4 lg:pl-10">
            <div className="bg-slate-50 p-8 rounded-3xl border border-border shadow-sm">
              <h3 className="h5 mb-4 font-bold text-dark">Subscribe to Innvikta Newsletter</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium text-left">
                Get the latest cybersecurity insights, human risk trends, phishing research, and product updates from Innvikta.
              </p>
              <form className="relative mb-6">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="form-input w-full rounded-full py-4 px-6 border-slate-300 focus:border-primary outline-none text-sm pr-36 bg-white" 
                />
                <button 
                  type="submit" 
                  className="btn btn-primary absolute right-1.5 top-1.5 py-2.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium text-left">
                By subscribing, you agree to receive updates from Innvikta. Read our <Link href="/terms-policy" className="underline hover:text-primary">Privacy Policy</Link> for details.
              </p>
            </div>
          </div>
        </div>
 
        {/* Social icons row */}
        <div className="py-10 border-t border-border flex justify-start sm:justify-between items-center">
          <Social source={social} className="social-icons" />
        </div>
 
        {/* Bottom bar */}
        <div className="py-10 border-t border-border">
          <div className="row items-center text-sm text-slate-500 font-medium">
            <div className="col-12 md:col-4 text-left mb-6 md:mb-0 uppercase tracking-tight">
              © 2026 Innvikta Technologies Pvt. Ltd.
            </div>
            <div className="col-12 md:col-4 text-left mb-6 md:mb-0">
              <div className="flex justify-start gap-2 md:gap-4 flex-wrap">
                <Link href="/terms-policy" className="hover:text-primary">Privacy</Link>
                <span className="text-slate-200">•</span>
                <Link href="/terms-policy" className="hover:text-primary">Terms</Link>
                <span className="text-slate-200">•</span>
                <Link href="#" className="hover:text-primary">Cookies</Link>
                <span className="text-slate-200">•</span>
                <Link href="#" className="hover:text-primary">Responsible Disclosure</Link>
              </div>
            </div>
            <div className="col-12 md:col-4 text-left md:text-right">
              <span className="font-bold text-dark text-base">Made to reduce human risk.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
