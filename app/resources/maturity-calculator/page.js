"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FiArrowRight, FiShield, FiCheckCircle, FiActivity, 
  FiDownload, FiMail, FiAlertTriangle, FiCheck, 
  FiChevronLeft
} from "react-icons/fi";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import FreeTierCta from "@layouts/partials/FreeTierCta";

// Categories and Questions
const CATEGORIES = [
  {
    id: "training",
    name: "Training Program",
    weight: 0.15,
    description: "Frequency and structure of workforce cybersecurity awareness programs.",
    question: "How regularly does your organization deliver security awareness training to employees?",
    levelDescriptions: [
      "No formal security awareness training is provided to employees.",
      "Training campaigns are being planned or discussed for future rollout.",
      "Training is delivered annually or to selected departments only.",
      "Regular training is delivered to most departments but lacks custom tracks.",
      "Continuous, role-based micro-learning is active organization-wide."
    ]
  },
  {
    id: "incident_response",
    name: "Incident Response",
    weight: 0.10,
    description: "Processes for reporting and responding to security incidents.",
    question: "Do employees know how to report a suspected phishing email or security threat?",
    levelDescriptions: [
      "No formal process or contact point exists for reporting incidents.",
      "Incident reporting procedures are currently being documented.",
      "Reporting exists, but relies on manual IT tickets with slow response.",
      "Most employees use a dedicated reporting hook; responses are managed.",
      "Active 1-click reporting is integrated with automated SOC triaging."
    ]
  },
  {
    id: "privacy",
    name: "Privacy & Data Protection",
    weight: 0.10,
    description: "Handling and protection of customer and internal sensitive data.",
    question: "What level of data privacy training and access control exists for sensitive data handling?",
    levelDescriptions: [
      "No formal data privacy training or structured access controls exist.",
      "Data handling guidelines are planned but not yet implemented.",
      "Core departments (HR/Finance) receive data protection briefs.",
      "Data privacy policies are signed and implemented across most teams.",
      "Strict data privacy controls and continuous compliance testing are active."
    ]
  },
  {
    id: "compliance",
    name: "Compliance Readiness",
    weight: 0.10,
    description: "Alignment with security frameworks like SOC2, GDPR, or ISO 27001.",
    question: "How ready is your organization to provide training audit evidence for security compliance?",
    levelDescriptions: [
      "We cannot produce structured training records for framework audits.",
      "We are mapping training requirements to compliance controls.",
      "Basic completion logs are maintained manually via spreadsheets.",
      "Automated reports are available for most frameworks but require manual assembly.",
      "Audit-ready compliance dashboards compile automated logs dynamically."
    ]
  },
  {
    id: "budget",
    name: "Resources & Budget",
    weight: 0.05,
    description: "Budget allocation and dedicated team for security awareness.",
    question: "Is there a dedicated budget and security team allocated to human risk management?",
    levelDescriptions: [
      "No budget or team members are allocated to security awareness.",
      "Awareness budget is being requested for the next fiscal year.",
      "Part-time IT support manages basic training campaigns.",
      "Dedicated awareness tools are funded, managed by a security officer.",
      "Comprehensive, ongoing budget supports custom simulations and platforms."
    ]
  },
  {
    id: "threat_awareness",
    name: "Threat Awareness",
    weight: 0.10,
    description: "Awareness of engineering threats, ransomware, and credential theft.",
    question: "How aware is your workforce of modern social engineering tactics?",
    levelDescriptions: [
      "Employees have no formal training on modern threat vectors.",
      "Basic threat documentation is shared occasionally.",
      "Core threats (phishing/passwords) are covered in annual sessions.",
      "Most employees receive regular alerts and training on active scams.",
      "Role-based, adaptive lessons teach advanced threats dynamically."
    ]
  },
  {
    id: "password_security",
    name: "Password Security",
    weight: 0.10,
    description: "Password hygiene and multi-factor authentication (MFA) practices.",
    question: "What password practices and MFA controls are enforced across the organization?",
    levelDescriptions: [
      "No structured password policies or MFA controls are in place.",
      "MFA implementation is planned for core administrator accounts.",
      "MFA is active for major corporate apps, but password reuse is common.",
      "Strong password rules and MFA are mandatory across most software.",
      "Zero-trust authentication, SSO, and MFA fatigue training are standard."
    ]
  },
  {
    id: "phishing_sim",
    name: "Phishing Simulation",
    weight: 0.20,
    description: "Frequency and realism of internal simulated phishing attacks.",
    question: "How regularly does your organization run simulated phishing tests?",
    levelDescriptions: [
      "No phishing simulations are conducted.",
      "Simulations are planned but templates are not yet configured.",
      "Simulations are conducted annually or biannually.",
      "Quarterly simulations are conducted with basic email templates.",
      "Monthly, multi-channel simulations (Email, SMS, QR) test adaptive paths."
    ]
  },
  {
    id: "policy",
    name: "Communication & Policy",
    weight: 0.05,
    description: "Distribution and sign-off of security policies.",
    question: "How are corporate security policies shared and signed by employees?",
    levelDescriptions: [
      "Security policies are not documented or shared.",
      "Policies are drafted but formal sign-off is pending.",
      "Policies are shared via onboarding emails once.",
      "Annual policy sign-offs are tracked manually for most departments.",
      "Policy signing is integrated with micro-learning campaigns."
    ]
  },
  {
    id: "content_quality",
    name: "Content Quality",
    weight: 0.03,
    description: "Interactivity, length, and engagement levels of training content.",
    question: "How engaging and interactive is your security training content?",
    levelDescriptions: [
      "No training content exists.",
      "Slide decks are planned to replace text PDFs.",
      "Static PDFs and basic quizzes are shared via email.",
      "Video courses with modular quizzes are deployed.",
      "Interactive, gamified arcade challenges and simulations are standard."
    ]
  },
  {
    id: "emerging_tech",
    name: "Emerging Technologies",
    weight: 0.02,
    description: "Training on AI, deepfakes, and WhatsApp/messaging scams.",
    question: "Does your training program cover advanced threats like deepfakes and AI voice clones?",
    levelDescriptions: [
      "We do not cover emerging technologies.",
      "AI security policies are under discussion.",
      "Basic guidelines on AI tool usage are distributed.",
      "AI and messaging scams are covered in general newsletters.",
      "Specific simulations and micro-learning cover quishing and deepfakes."
    ]
  }
];

const FAQS = [
  {
    question: "What is a Human Risk Assessment?",
    answer: "A Human Risk Assessment evaluates your organization's security awareness program, phishing resilience, and compliance readiness against industry standards. It helps security leaders identify gaps and implement targeted awareness training."
  },
  {
    question: "How is the maturity score calculated?",
    answer: "Each category receives a score from 0-4 based on your answer. This is normalized to a percentage (0-100) and then multiplied by its category weight. The final score is a weighted sum representing your overall human risk maturity level."
  },
  {
    question: "Can I share the results with my executive board?",
    answer: "Yes. The generated dashboard and downloadable report are designed specifically for executive presentations, offering high-level maturity grades alongside actionable, department-specific risk recommendations."
  },
  {
    question: "How often should we assess our human risk maturity?",
    answer: "We recommend conducting a comprehensive maturity assessment bi-annually or after rolling out new security training tools to measure changes in employee cyber behavior and compliance readiness."
  }
];

const CTA_DATA = {
  label: "FREE FOR UP TO 50 USERS",
  title: "Start Free. No Credit Card. No Catch.",
  description: "Get access to AI-powered security awareness training, phishing templates, gamified learning, and human risk reporting - free for teams up to 50 users.",
  features: [
    "Security awareness modules",
    "Phishing email templates",
    "Gamified learning experiences",
    "Play-driven security games",
    "Basic human risk reports",
    "Employee engagement tracking",
    "Security quizzes & challenges",
    "Leaderboards & achievements",
    "Admin dashboard access",
    "Easy Deployment"
  ],
  form: {
    title: "Start Your Free InSAT Workspace",
    subtitle: "Setup takes less than 2 minutes.",
    button_label: "Submit",
    micro_trust: "No credit card required • Free for up to 50 users • Cancel anytime",
    trust_row: "SOC2 Ready • ISO 27001 Aligned • GDPR Friendly"
  }
};

export default function MaturityCalculator() {
  const [step, setStep] = useState("hero"); // hero, assessment, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { categoryId: score }
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Animation state for the needle angle
  const [needleAngle, setNeedleAngle] = useState(-68);

  const resultsRef = useRef(null);

  const selectAnswer = (score) => {
    const category = CATEGORIES[currentQuestionIndex];
    setAnswers((prev) => ({ ...prev, [category.id]: score }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < CATEGORIES.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("results");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Calculations
  const calculateCategoryScore = (catId) => {
    const score = answers[catId] ?? 0;
    return (score / 4) * 100;
  };

  const overallScore = Math.round(
    CATEGORIES.reduce((total, cat) => {
      const score = answers[cat.id] ?? 0;
      return total + (score / 4) * 100 * cat.weight;
    }, 0)
  );

  // Trigger needle swinging animation
  useEffect(() => {
    if (step === "results") {
      const targetAngle = 
        overallScore >= 90 ? 68 :
        overallScore >= 70 ? 23 :
        overallScore >= 50 ? -23 : -68;
      
      // Start needle at D, then swing to target
      setNeedleAngle(-68);
      const timeout = setTimeout(() => {
        setNeedleAngle(targetAngle);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [step, overallScore]);

  return (
    <GSAPWrapper>
      <div className="insat-page" style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">
          
          {/* HERO SECTION (Centered like Password Generator) */}
          {step === "hero" && (
            <section className="hero-section" style={{ background: "#FFFFFF", padding: "8rem 0 6rem 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
              {/* Background SVG Decors */}
              <div className="hero-bg-decor" aria-hidden="true" style={{ pointerEvents: "none" }}>
                {/* Orange shield (left side, matching other tools) */}
                <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
                  <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
                  <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
                  <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                  <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                </svg>
              </div>

              <div className="container relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
                <span className="text-subheading block text-center" style={{ color: "#F15A24", fontWeight: "600", marginBottom: "1rem" }}>
                  MATURITY ASSESSMENT TOOL
                </span>
                <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                  Measure Your <span className="text-primary">Human Cyber Risk</span>
                </h1>
                <p className="text-20-content hero-paragraph" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
                  Evaluate your organization&apos;s security awareness maturity across training, phishing resilience, compliance, privacy, and employee cyber behavior.
                </p>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setStep("assessment")}
                    className="btn btn-primary"
                    style={{ 
                      backgroundColor: "#F15A24", 
                      color: "#FFFFFF", 
                      border: "none", 
                      padding: "14px 32px", 
                      borderRadius: "8px", 
                      fontWeight: 700, 
                      fontSize: "1rem", 
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span>Start Free Assessment</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ASSESSMENT QUESTIONNAIRE VIEW (Centered card structure) */}
          {step === "assessment" && (
            <section className="section bg-white" style={{ padding: "6rem 0 4rem 0" }}>
              <div className="container max-w-3xl mx-auto px-4">
                
                {/* Question Card Box */}
                {(() => {
                  const currentCat = CATEGORIES[currentQuestionIndex];
                  const selectedAnswer = answers[currentCat.id];

                  return (
                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderLeft: "4px solid #F15A24",
                        borderRadius: "16px",
                        padding: "2.5rem",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                        maxWidth: "700px",
                        margin: "0 auto",
                        width: "100%"
                      }}
                      className="text-left space-y-6"
                    >
                      <div className="flex justify-between items-center">
                        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Category {currentQuestionIndex + 1} of {CATEGORIES.length}: <span style={{ color: "#1F1F1F" }}>{currentCat.name}</span>
                        </span>
                        <div style={{ display: "flex", gap: "0.25rem" }}>
                          {CATEGORIES.map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: "12px",
                                height: "4px",
                                borderRadius: "2px",
                                backgroundColor: i <= currentQuestionIndex ? "#F15A24" : "#E7E7E7",
                                transition: "background-color 0.3s ease"
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-950 mb-1 leading-snug">{currentCat.question}</h3>
                        <p className="text-[12px] text-slate-500">{currentCat.description}</p>
                      </div>

                      <div className="space-y-3">
                        {currentCat.levelDescriptions.map((desc, idx) => {
                          const isSelected = selectedAnswer === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => selectAnswer(idx)}
                              className="w-full text-left rounded-xl border transition-all flex items-center justify-between cursor-pointer"
                              style={{
                                padding: "14px 20px",
                                fontSize: "0.9rem",
                                border: isSelected ? "2px solid #F15A24" : "1px solid #E5E7EB",
                                backgroundColor: isSelected ? "#FFF9F6" : "#FFFFFF",
                                color: isSelected ? "#F15A24" : "#374151",
                                fontWeight: isSelected ? "600" : "500",
                              }}
                            >
                              <span>{desc}</span>
                              <span className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4"
                                style={{
                                  borderColor: isSelected ? "#F15A24" : "#D1D5DB",
                                  backgroundColor: isSelected ? "#F15A24" : "transparent"
                                }}
                              >
                                {isSelected && <FiCheck className="text-[10px] text-white" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrev}
                          disabled={currentQuestionIndex === 0}
                          className="flex items-center justify-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
                          style={{ background: "none", border: "none", padding: "8px 16px" }}
                        >
                          <FiChevronLeft />
                          <span>Back</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={selectedAnswer === undefined}
                          className="flex items-center justify-center gap-1.5 text-white rounded-lg font-bold shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                          style={{ 
                            backgroundColor: "#F15A24", 
                            border: "none",
                            padding: "12px 28px"
                          }}
                        >
                          <span>{currentQuestionIndex === CATEGORIES.length - 1 ? "Get Results" : "Next"}</span>
                          <FiArrowRight />
                        </button>
                      </div>
                    </div>
                  );
                })()}

              </div>
            </section>
          )}

          {/* RESULTS REPORT DASHBOARD (Redesigned matching screenshot) */}
          {step === "results" && (
            <section className="section bg-white" ref={resultsRef} style={{ padding: "6rem 0" }}>
              <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 1.5rem" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", textAlign: "left", alignItems: "start" }}>
                  
                  {/* Left Column: Gauge Illustration & elevation prompt */}
                  <div className="flex flex-col items-center text-center">
                    
                    {/* SVG Speedometer Gauge */}
                    <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center", width: "100%" }}>
                      <svg width="340" height="190" viewBox="0 0 200 110" style={{ overflow: "visible" }}>
                        {/* Segment D (Red) */}
                        <path d="M 22 100 A 78 78 0 0 1 43.9 45.8" fill="none" stroke="#E53E3E" strokeWidth="24" strokeLinecap="butt" />
                        {/* Segment C (Orange) */}
                        <path d="M 45.8 43.9 A 78 78 0 0 1 97.2 22.1" fill="none" stroke="#ED8936" strokeWidth="24" strokeLinecap="butt" />
                        {/* Segment B (Light Green) */}
                        <path d="M 102.7 22.1 A 78 78 0 0 1 154.1 43.9" fill="none" stroke="#9CD323" strokeWidth="24" strokeLinecap="butt" />
                        {/* Segment A (Dark Green) */}
                        <path d="M 156.1 45.8 A 78 78 0 0 1 178 100" fill="none" stroke="#38A169" strokeWidth="24" strokeLinecap="butt" />
                        
                        {/* Labels inside segments (rotated to follow segment slope) */}
                        <text x="27.7" y="70.8" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(-68, 27.7, 70.8)">D</text>
                        <text x="69.5" y="28.2" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(-23, 69.5, 28.2)">C</text>
                        <text x="130.5" y="28.2" fill="black" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(23, 130.5, 28.2)">B</text>
                        <text x="172.3" y="70.8" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" transform="rotate(68, 172.3, 70.8)">A</text>

                        {/* Needle with dynamic transition swinging animation */}
                        <g 
                          transform={`rotate(${needleAngle}, 100, 100)`}
                          style={{ 
                            transition: "transform 1.6s cubic-bezier(0.25, 1, 0.2, 1.1)",
                            transformOrigin: "100px 100px"
                          }}
                        >
                          <polygon points="98,100 100,22 102,100" fill="#1A202C" />
                          <circle cx="100" cy="100" r="6" fill="#1A202C" />
                        </g>
                      </svg>
                    </div>

                    {/* Elevate Text & SME CTA */}
                    <div style={{ textAlign: "left", width: "100%" }}>
                      <h2 style={{ fontSize: "2rem", color: "#F15A24", fontWeight: "700", lineHeight: "1.2", marginBottom: "1rem" }}>
                        Ready to elevate your organization&apos;s cybersecurity awareness?
                      </h2>
                      <h4 style={{ fontSize: "1.1rem", color: "#1F1F1F", fontWeight: "600", marginBottom: "1rem" }}>
                        Talk to us for a free detailed analysis of your grade!
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6", marginBottom: "2rem" }}>
                        Our team of SMEs will walk you through easy ways you can improve your existing security awareness training and help you strengthen your defences against cyber threats.
                      </p>
                      
                      <button
                        onClick={() => window.open("/book-demo", "_blank")}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#F15A24",
                          color: "#FFFFFF",
                          border: "none",
                          padding: "12px 28px",
                          borderRadius: "30px",
                          fontWeight: "700",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.9rem"
                        }}
                      >
                        <span>Schedule a call</span>
                        <FiArrowRight />
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Rating Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#F15A24", display: "block", marginBottom: "0.5rem" }}>
                        Your Security Awareness Rating
                      </span>
                      <span style={{ 
                        fontSize: "7.5rem", 
                        fontWeight: "900", 
                        color: overallScore >= 90 ? "#38A169" : overallScore >= 70 ? "#9CD323" : overallScore >= 50 ? "#ED8936" : "#E53E3E",
                        lineHeight: "1",
                        display: "block",
                        marginBottom: "1rem"
                      }}>
                        {overallScore >= 90 ? "A" : overallScore >= 70 ? "B" : overallScore >= 50 ? "C" : "D"}
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                        {overallScore >= 90 ? "Your organization has an elite security awareness maturity, showing strong protection posture:" :
                         overallScore >= 70 ? "Your organization has made progress in security awareness, but there's still room for improvement:" :
                         overallScore >= 50 ? "Your organization displays basic security awareness, but experiences high risk exposure:" :
                         "Your organization is at critical risk due to minimal security awareness training:"}
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6" }}>
                        {overallScore >= 90 ? "Employees demonstrate advanced security understanding, active threat reporting, and minimal susceptibility. Continue to reinforce learning campaigns to sustain this posture." :
                         overallScore >= 70 ? "While employees may have a basic understanding of security principles, there are areas where awareness could be strengthened. Targeted training programs and ongoing reinforcement of security policies can help address weaknesses and further enhance security awareness across the organization." :
                         overallScore >= 50 ? "Security policies exist but are not actively understood or followed by most departments. Phishing simulated click rates are likely higher than average, and incident reporting is slow or manual." :
                         "There is no formal or regular training delivered to employees. Susceptibility to social engineering, ransomware, and credential harvesting attacks is high, with no reporting processes in place."}
                      </p>
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                        Suggestions for Improvement:
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "#4B5563", lineHeight: "1.6" }}>
                        {overallScore >= 90 ? "Focus on gamified deepdives, regular emerging threat alerts, and automated SOC integration for reported threats." :
                         overallScore >= 70 ? "Introduce advanced cybersecurity training modules, promote a culture of reporting security incidents, and provide regular updates on emerging threats and best practices." :
                         overallScore >= 50 ? "Establish regular monthly simulated campaigns, mandate role-based privacy training, and deploy a 1-click reporting hook to ease threat detection." :
                         "Roll out initial baseline awareness modules immediately, set up strong password and MFA rules, and configure simulated phishing tests."}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </section>
          )}

          {/* FAQ ACCORDION SECTION */}
          <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
            <div className="container faq-grid">
              <div className="faq-title-col text-left">
                <h2 className="text-40-heading">Frequently Asked Questions</h2>
                <a className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor"
                        d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Still have questions? Contact us</span>
                </a>
              </div>

              <div className="faq-list-col text-left">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="faq-trigger"
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question">{faq.question}</span>
                        <div className="faq-icon-wrapper">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                            <path
                              className="vertical-line"
                              d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z"
                              stroke="var(--color-grey-30)" />
                          </svg>
                        </div>
                      </button>
                      <div className="faq-panel">
                        <div className="faq-panel-inner">
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* START FREE CTA SECTION */}
          <FreeTierCta data={CTA_DATA} />

        </div>
      </div>
    </GSAPWrapper>
  );
}
