import React from "react";
import ImageFallback from "../components/ImageFallback";

export default function OurStory() {
  return (
    <section id="our-story" className="story-section story-animate" style={{ background: "#FFFFFF", borderTop: "1px solid #E7E7E7" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story Content */}
          <div className="lg:col-span-6" style={{ textAlign: "left" }}>
            <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>OUR STORY</span>
            <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
              From Security Awareness to Real-World <span style={{ color: "#F15A24" }}>Readiness</span>
            </h2>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
              With 15+ years of cybersecurity experience across the US and India, we saw one gap repeatedly: awareness was being delivered, but real-world recall was still missing.
            </p>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
              Employees may complete modules and follow policies, but the true test comes later — during a suspicious email, urgent payment request, risky attachment, QR code, or AI-generated deception.
            </p>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", marginBottom: "1.25rem" }}>
              Innvikta was created to close that gap with awareness experiences that are practical, engaging, measurable, and built for recall when it matters most.
            </p>
            <p className="text-18-content" style={{ opacity: "0.85", lineHeight: "1.6", margin: 0 }}>
              We are not just creating modules — with InSAT, we are building a platform that helps people stay ready when threats arrive.
            </p>
          </div>

          {/* Right Column: Representation Office Photo with Quote overlay */}
          <div className="lg:col-span-6">
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
              <ImageFallback
                src="/images/about/01.jpg"
                width={600}
                height={400}
                alt="Innvikta Office Team"
                className="w-full h-auto object-cover"
                style={{ filter: "brightness(0.9)" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "2rem",
                  right: "2rem",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "1.5rem 2rem",
                  borderRadius: "14px",
                  borderLeft: "4px solid #F15A24",
                  textAlign: "left"
                }}
              >
                <p style={{ fontStyle: "italic", fontSize: "1.1rem", fontWeight: "500", color: "#1F1F1F", margin: 0 }}>
                  “Awareness should work when the real decision happens.”
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
