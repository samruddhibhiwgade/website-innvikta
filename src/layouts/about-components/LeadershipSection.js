import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leadershipTeam } from "./constants";

export default function LeadershipSection({
  activeLeaderIndex,
  setActiveLeaderIndex,
  setIsHovered
}) {
  return (
    <section id="leadership-team" className="leadership-section leader-animate relative overflow-hidden" style={{ background: "var(--color-grey-5)", borderTop: "1px solid #E7E7E7", width: "100vw", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", paddingBottom: "5.5rem" }}>
      
      {/* SECTION HEADER */}
      <div className="container text-center mb-16" style={{ maxWidth: "1200px", margin: "0 auto 5rem auto", padding: "0 2rem" }}>
        <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
          LEADERSHIP & ADVISORS
        </span>
        <h2 className="text-52-heading" style={{ color: "#111111", marginTop: "0.5rem", marginBottom: "1.25rem", lineHeight: "1.2" }}>
          Led by Security, Strategy, and Enterprise <span style={{ color: "#F15A24" }}>Experience</span>
        </h2>
        <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
          Innvikta is guided by a focused leadership team and experienced advisors across cybersecurity, business growth, compliance, and enterprise transformation.
        </p>
      </div>

      {/* DESKTOP INTERACTIVE EDITORIAL LAYOUT */}
      <div className="container hidden md:block" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="grid grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT COLUMN: STICKY NAVIGATION */}
          <div className="col-span-3 sticky top-32 self-start" style={{ zIndex: 10 }}>
            <nav className="flex flex-col gap-2 relative border-l border-[#E7E7E7]">
              {leadershipTeam.map((leader, i) => {
                const isActive = activeLeaderIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveLeaderIndex(i);
                    }}
                    className="group relative flex items-center gap-4 py-3.5 pl-6 text-left transition-all duration-300 w-full"
                    style={{
                      background: isActive ? "rgba(241, 90, 36, 0.03)" : "transparent",
                      borderRadius: "8px",
                      overflow: "hidden"
                    }}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F15A24] rounded-l-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Small Thumbnail Portrait */}
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      background: "transparent",
                      flexShrink: 0,
                      border: isActive ? "1.5px solid #F15A24" : "1px solid #E5E7EB"
                    }}>
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: "0.95rem",
                        fontWeight: isActive ? "700" : "550",
                        color: isActive ? "#111111" : "#6B7280",
                        margin: 0,
                        transition: "color 0.25s"
                      }}>
                        {leader.name}
                      </h4>
                      <p style={{
                        fontSize: "0.8rem",
                        color: isActive ? "#F15A24" : "#9CA3AF",
                        margin: 0
                      }}>
                        {leader.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT COLUMN: ACTIVE LEADER SHOWCASE CONTAINER */}
          <div className="col-span-9 min-h-[440px] flex items-start relative">
            <AnimatePresence mode="wait">
              {leadershipTeam.map((leader, i) => i === activeLeaderIndex && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-9 gap-8 items-start w-full"
                >
                  {/* CENTER COLUMN: EDITORIAL CONTENT */}
                  <div 
                    className="col-span-5 pr-8 text-left"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span style={{ fontSize: "1.1rem", fontWeight: "750", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {leader.role}
                    </span>
                    <h2 style={{ fontSize: "3rem", fontWeight: "800", color: "#111111", marginTop: "0.25rem", marginBottom: "1.5rem", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                      {leader.name}
                    </h2>

                    {/* Executive Summary */}
                    <p className="text-18-content" style={{ fontWeight: "600", color: "#111111", marginBottom: "1.5rem", lineHeight: "1.5" }}>
                      {leader.summary}
                    </p>

                    {/* Detailed Bio */}
                    <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "2rem" }}>
                      {leader.longBio}
                    </p>

                    {/* Leadership Philosophy Quote */}
                    <div style={{
                      borderLeft: "2.5px solid #F15A24",
                      paddingLeft: "1.5rem",
                      marginBottom: "2.5rem",
                      fontStyle: "italic",
                    }}>
                      <p style={{ fontSize: "1.1rem", color: "#111111", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
                       &ldquo;{leader.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: EXECUTIVE PORTRAIT */}
                  <div className="col-span-4 relative self-stretch flex items-end justify-center min-h-[400px] overflow-visible">
                    <div className="w-full flex justify-center items-end" style={{ height: "100%", maxHeight: "500px" }}>
                      <div className="relative overflow-hidden" style={{ width: "100%", height: "400px", borderRadius: "16px" }}>
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover pointer-events-none relative z-10"
                          style={{ borderRadius: "16px" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* MOBILE INTERACTIVE STORYTELLING LAYOUT */}
      <div className="container block md:hidden">
        <div className="flex flex-col gap-20">
          {leadershipTeam.map((leader, i) => (
            <div key={i} className="flex flex-col text-left border-b border-[#E7E7E7] pb-16 last:border-0 last:pb-0">
              {/* Portrait Hero */}
              <motion.div
                className="relative overflow-hidden rounded-2xl pt-6 px-6 pb-0 mb-16 flex justify-center items-end"
                style={{ height: "350px" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-auto h-[80%] object-cover pointer-events-none z-10"
                  style={{ borderRadius: "12px" }}
                />
              </motion.div>

              {/* Text Details Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                <span style={{ fontSize: "0.95rem", fontWeight: "750", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "0.5rem" }}>
                  {leader.role}
                </span>
                <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#111111", marginTop: "0.25rem", marginBottom: "1rem" }}>
                  {leader.name}
                </h2>

                <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#111111", marginBottom: "1rem", lineHeight: "1.5" }}>
                  {leader.summary}
                </p>

                <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                  {leader.longBio}
                </p>

                <div style={{ borderLeft: "2.5px solid #F15A24", paddingLeft: "1.25rem", marginBottom: "2rem", fontStyle: "italic" }}>
                  <p style={{ fontSize: "1.05rem", color: "#111111", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                </div>

              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
