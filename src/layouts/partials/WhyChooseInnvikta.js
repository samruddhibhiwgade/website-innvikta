"use client";

import Link from "next/link";

const WhyChooseInnvikta = () => {
  const metrics = [
    {
      value: "94%",
      title: "Training Engagement Rate",
      desc: "Drive daily behavior change with immersive, play-driven training pathways.",
    },
    {
      value: "72%",
      title: "Phishing Resilience",
      desc: "Run realistic simulations that empower employees to detect complex social engineering vectors.",
    },
    {
      value: "3.4×",
      title: "Higher Learning Retention",
      desc: "Transform corporate cybersecurity compliance into interactive habit building through Innvikta Arcade.",
    },
  ];

  return (
    <section className="section bg-body py-24 border-b border-border">
      <div className="container">
        <div className="row items-center justify-between">
          {/* Left Column: Heading and Text */}
          <div className="col-12 lg:col-6 mb-16 lg:mb-0 px-6 md:pl-12 lg:pl-16 lg:pr-14 text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-dark mb-8">
              Why Organizations<br className="hidden md:inline" /> Choose <span className="text-[#f15a24]">Innvikta</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Innvikta helps enterprises build everyday secure behaviour across their workforce. Our platform transforms complex security training into engaging, gamified experiences.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link
                href="/start-free"
                className="btn btn-primary btn-cta inline-flex items-center gap-2"
                style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", gap: "8px" }}
              >
                <span>Start Free</span>
                <div className="arrow-wrapper" style={{ display: "inline-flex", margin: 0 }}>
                  <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Key metrics */}
          <div className="col-12 lg:col-6 px-6 md:pr-12 lg:pr-16 lg:pl-14 text-left">
            <div className="space-y-10">
              {metrics.map((metric, i) => (
                <div key={i} className="flex items-start gap-6">
                  <span className="text-3xl md:text-4xl font-extrabold text-[#f15a24] shrink-0 min-w-[70px] md:min-w-[90px]">
                    {metric.value}
                  </span>
                  <div>
                    <h4 className="font-bold text-dark text-lg mb-1 leading-tight">
                      {metric.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInnvikta;
