import React from "react";

export default function FeaturesGridSection() {
  return (
    <section id="security-awareness-training" className="bg-grey-5">
      <div className="container">
        <div className="section-intro animate">
          <span className="text-subheading">Features</span>
          <h2 className="text-52-heading">Powerful Security Training</h2>
        </div>

        <div className="features-grid">
          
          <div className="feature-card animate">
            <div className="feature-visual">
              <img alt="Security Awareness Training" loading="lazy" src="/insat/images/Awareness_Training.png" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Security Awareness Training</h3>
              <p className="feature-desc">
                Cinematic, role-based modules that help employees understand common cyber risks in their
                daily work.
              </p>
            </div>
          </div>

          
          <div className="feature-card animate">
            <div className="feature-visual bg-grey-30">
              <img alt="Phishing simulations mockup" loading="lazy"
                src="/insat/images/Phiahsing_Simulation.png" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Phishing Simulations</h3>
              <p className="feature-desc">
                Launch realistic phishing campaigns and identify risky user responses before attackers
                do.
              </p>
            </div>
          </div>

          
          <div className="feature-card animate">
            <div className="feature-visual bg-aquamarine">
              <img alt="Microlearning modules mockup" loading="lazy"
                src="/insat/images/Micro_Learning.png" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Microlearning</h3>
              <p className="feature-desc">
                Deliver short reinforcement modules exactly when employees need them most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
