import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundColor: "var(--color-grey-5)" }}>
      <div className="hero-outer-wrapper">
        <div className="container">
          <div className="hero-grid-container">
            <div className="hero-content">
              <span className="text-subheading">Test Human Risk Before Attackers Do</span>
              <h1 className="text-96-heading hero-title-custom">Identify and Reduce<br />Human Risk Before<br />It Becomes a Breach</h1>

              <div className="hero-text-wrapper">
                <p className="text-20-content hero-paragraph">
                  Run AI-enabled attack simulations that uncover risky behaviour and trigger instant learning in real time.
                </p>
              </div>

              <div className="hero-actions-row">
                <Link 
                  href="/start-free" 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 flex items-center justify-center font-bold text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Start Free
                </Link>
                <Link 
                  href="/book-demo" 
                  className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                  style={{ padding: "14px 28px" }}
                >
                  Explore Platform <FiArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            <div className="hero-image-right">
              <img src="/images/solutions/phishingsimulation_images/phishing_simulationhero.png" alt="Phishing Simulation Hero" className="hero-sim-img" />
            </div>
          </div>
        </div>

        <div className="container container-hero-visual hidden md:block">
          <div className="hero-visual">
            <img src="/insat/images/dashboard_platform1.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
