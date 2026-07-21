"use client";
import React, { useState, useEffect } from "react";

const attackVectors = [
  {
    title: "Phishing Simulations",
    desc: "Deploy realistic, customizable email attacks, replica login portals, and test attachment clicks across user bases.",
    image: "/images/solutions/phishingsimulation_images/phishing_simulation.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-phishing text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path className="envelope-flap" d="M22 6l-10 7L2 6" />
        <circle className="notification-dot" cx="19" cy="7" r="2" fill="#F15A24" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  },
  {
    title: "Smishing & WhatsApp",
    desc: "Simulate mobile social engineering risks via high-fidelity SMS and WhatsApp-style conversational templates.",
    image: "/images/solutions/phishingsimulation_images/smishing_whatsapp phishing.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-sms text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle className="pulse-ring" cx="12" cy="12" r="10" stroke="#F15A24" strokeWidth="1.5" fill="none" />
        <path className="chat-bubble" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: "QR Traps",
    desc: "Generate malicious QR code mockups to test employee awareness of scanning untrusted physical or digital codes.",
    image: "/images/solutions/phishingsimulation_images/qr_phishing.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-qr text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="qr-block qr-block-1" x="3" y="3" width="6" height="6" />
        <rect className="qr-block qr-block-2" x="15" y="3" width="6" height="6" />
        <rect className="qr-block qr-block-3" x="3" y="15" width="6" height="6" />
        <rect className="qr-block qr-block-4" x="15" y="15" width="6" height="6" />
        <line className="beam-line" x1="2" y1="12" x2="22" y2="12" stroke="#F15A24" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Vishing Tests",
    desc: "Automate voice-based phone tests simulating social engineering tactics to steal credentials or verify details.",
    image: "/images/solutions/phishingsimulation_images/vishing_simulation.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-phone text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="phone-wave wave-1" d="M17 6A5 5 0 0 1 17 18" stroke="#F15A24" />
        <path className="phone-wave wave-2" d="M20 3A9 9 0 0 1 20 21" stroke="#F15A24" />
        <path className="phone-receiver" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    title: "AI Scenario Variants",
    desc: "Escalate campaign difficulty and customize message content dynamically based on user risk profiles and behaviors.",
    image: "/images/solutions/phishingsimulation_images/aivariants (2).png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-ai text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <g className="spark-rays">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </g>
      </svg>
    )
  },
  {
    title: "Attachment Simulations",
    desc: "Incorporate mock malicious payloads or attachments in fake invoices and emails to track user opening habits.",
    image: "/images/solutions/phishingsimulation_images/attachmentsimulation (2).png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-attach text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="paperclip" d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        <path className="attach-arrow" d="M12 2v6M9 5l3 3 3-3" />
      </svg>
    )
  },
  {
    title: "USB Baiting",
    desc: "Deploy trackable, safe USB drives in common workspace areas to evaluate employee behavior and readiness regarding physical media security.",
    image: "/images/solutions/phishingsimulation_images/usb_baiting.png",
    icon: (active) => (
      <svg className={`w-6 h-6 transition-colors duration-300 ${active ? "active-vector-usb text-white" : "text-current"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="usb-body" x="6" y="6" width="12" height="14" rx="2" />
        <rect className="usb-connector" x="9" y="2" width="6" height="4" />
        <path className="usb-lines" d="M10 10v4M14 10v4" />
      </svg>
    )
  }
];

export default function AccordionPanelSection() {
  const [activeVector, setActiveVector] = useState(0);
  const [displayImages, setDisplayImages] = useState({
    current: "/images/solutions/phishingsimulation_images/phishing_simulation.png",
    prev: null
  });

  useEffect(() => {
    const nextImg = activeVector !== null ? attackVectors[activeVector].image : "/images/solutions/phishingsimulation_images/phishing_simulation.png";
    if (nextImg !== displayImages.current) {
      setDisplayImages((prev) => ({
        prev: prev.current,
        current: nextImg
      }));
    }
  }, [activeVector]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      let targetIndex = -1;
      let targetId = "";
      
      if (hash === "#vishing-simulation" || hash === "#vishing-tests") {
        targetIndex = 3;
        targetId = "vishing-simulation";
      } else if (hash === "#ai-led-scenario-variants" || hash === "#ai-scenario-variants") {
        targetIndex = 4;
        targetId = "ai-led-scenario-variants";
      } else if (hash === "#multi-vector-attack") {
        targetIndex = 0;
        targetId = "multi-vector-attack";
      } else if (hash === "#smishing-whatsapp" || hash === "#smishing-simulation") {
        targetIndex = 1;
        targetId = "smishing-whatsapp";
      } else if (hash === "#qr-traps" || hash === "#qr-traps-simulation") {
        targetIndex = 2;
        targetId = "qr-traps";
      } else if (hash === "#attachment-simulations" || hash === "#attachment-simulation") {
        targetIndex = 5;
        targetId = "attachment-simulations";
      } else if (hash === "#usb-baiting" || hash === "#usb-baiting-simulation") {
        targetIndex = 6;
        targetId = "usb-baiting";
      }

      if (targetIndex !== -1) {
        setActiveVector(targetIndex);
        if (targetId) {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section id="multi-vector-attack" className="bg-white" style={{ paddingTop: "4rem", position: "relative" }}>
      <div id="smishing-whatsapp" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="smishing-simulation" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="qr-traps" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="qr-traps-simulation" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="vishing-simulation" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="vishing-tests" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="ai-led-scenario-variants" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="ai-scenario-variants" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="attachment-simulations" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="attachment-simulation" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="usb-baiting" style={{ position: "absolute", top: "-80px" }}></div>
      <div id="usb-baiting-simulation" style={{ position: "absolute", top: "-80px" }}></div>
      
      <div className="container">
        <div className="animate mb-12">
          <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem" }}>INSAT MULTICHANNEL SIMULATION</span>
          <h2 className="text-52-heading">Modern Attack Simulations</h2>
          <div style={{marginTop: "1rem", opacity: "0.7"}}>
            <p className="text-18-content">
              Test your workforce across the channels attackers use today.
            </p>
          </div>
        </div>

        <div className="modern-simulations-grid">
          {/* Left Accordion Column */}
          <div className="simulation-accordion-list animate from-left">
            {attackVectors.map((vector, index) => {
              const active = activeVector === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveVector(index)}
                  className={`simulation-accordion-item ${active ? "active" : ""}`}
                >
                  <div className="sim-icon-container">
                    {vector.icon(active)}
                  </div>
                  <div className="sim-text-content">
                    <h3 className="sim-title">{vector.title}</h3>
                    <div 
                      className="sim-desc-wrapper" 
                      style={{ 
                        maxHeight: active ? "120px" : "0px",
                        opacity: active ? 1 : 0
                      }}
                    >
                      <p className="sim-desc">{vector.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Bezel Frame Column */}
          <div className="animate from-right">
            <div className="platform-bezel-frame">
              <div className="frame-inner" style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                {displayImages.prev && (
                  <img 
                    key={displayImages.prev + "_prev"}
                    src={displayImages.prev} 
                    alt="Previous simulation screenshot"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" }}
                    className="animate-image-fade-out"
                  />
                )}
                <img 
                  key={displayImages.current + "_current"}
                  src={displayImages.current} 
                  alt={activeVector !== null ? attackVectors[activeVector].title : "Modern Attack Simulations"} 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" }}
                  className="animate-image-fade-in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
