"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { 
  FiArrowLeft, 
  FiArrowRight,
  FiPlay
} from "react-icons/fi";

const CASE_STUDY_DETAILS = {
  "global-bank-phishing": {
    title: "Global Bank",
    subtitle: "Global Bank Reduces Phishing Susceptibility by 82%",
    industry: "BFSI",
    location: "Global Operations",
    timeline: "6 Months",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1200&h=800&q=80",
    
    // At a glance items (4 points)
    atGlance: [
      "Voice phishing susceptibility dropped from 28% to 5% within six months.",
      "75% of employees successfully identified and reported smishing attempts.",
      "Reduced IT security department verification overhead by 40% due to automated reporting.",
      "Achieved 100% training coverage across international retail branches."
    ],
    
    // Main Content
    summaryTitle: "Preserving Client Confidentiality with Innvikta InSAT",
    summaryParagraphs: [
      "Securing client data is a top priority for any multinational financial institution. With over 12,000 endpoints spread across diverse global offices, the bank required a robust, continuous security awareness training solution to replace static annual modules.",
      "Traditional, slide-based security training failed to change behavior. By implementing Innvikta InSAT, the bank successfully transformed their employees into a strong first line of defense."
    ],
    
    challengeTitle: "Minimizing Potential Email & Communication Data Breaches",
    challengeParagraphs: [
      "The bank faced growing, sophisticated social engineering campaigns targeting remote bank managers and customer service desks. Vishing (voice phishing) and smishing (SMS phishing) attacks mimic internal IT alerts, representing high-risk vulnerabilities.",
      "Before deploying Innvikta, vishing susceptibility was at an all-time high of 28%. The security team had limited visibility into department-level risk and could not prove that human risk was actively going down."
    ],
    
    solutionParagraphs: [
      "Innvikta deployed a multi-channel threat simulation program, including realistic simulated voice phishing and smishing scenarios. Employees who failed a simulation were automatically enrolled in targeted micro-learning paths.",
      "This continuous feedback loop ensured employees learned to verify suspicious alerts in real time, preventing credentials harvesting and supply-chain fraud."
    ],
    
    // Sidebar card content
    sidebarChallenge: "Vishing and smishing campaigns targeted remote bank managers, with susceptibility reaching 28% and traditional training failing to drive secure habits.",
    sidebarDetails: [
      { label: "Target Coverage", val: "12,000+ Endpoints" },
      { label: "Delivery Model", val: "Multi-channel Simulations" }
    ],

    // Big Quote
    quoteText: "“From the board down, client confidentiality is our top priority, and Innvikta ensures we’re preserving that across all digital channels.”",
    quoteAuthor: "Sarah Jenkins, Head of IT Risk & Compliance, Global Banking Group"
  },
  "healthcare-security-crisis": {
    title: "MedTech Leader",
    subtitle: "Securing Patient Data and HIPAA Compliance for MedTech Leader",
    industry: "Healthcare",
    location: "North America",
    timeline: "3 Months",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=800&q=80",
    
    atGlance: [
      "Secured 100% compliance audit readiness with detailed training logs.",
      "Reduced QR-code scanning failure rate from 34% to less than 2%.",
      "99% of administrative staff completed role-based HIPAA privacy courses.",
      "Established a secure, automated reporting loop for all external email links."
    ],
    
    summaryTitle: "Strengthening HIPAA Compliance & Security Culture",
    summaryParagraphs: [
      "Under strict HIPAA guidelines, the developer required documented proof of continuous security training. They needed a platform to educate healthcare workers and protect patient portal access.",
      "With the rise of QR code-based phishing (quishing), administrative and clinical staff faced immediate exposure to patient data access leaks."
    ],
    
    challengeTitle: "Combatting Sophisticated QR Code Scams",
    challengeParagraphs: [
      "The MedTech firm identified critical exposure to patient records through fake doctor portal links and scanned QR codes on printouts.",
      "Annual training modules did not account for newer attack vectors like quishing, leaving staff unprepared to verify destination URLs before scanning."
    ],
    
    solutionParagraphs: [
      "Innvikta implemented automated compliance-focused phishing simulations using fake portal QR codes. Interactive modules were deployed to train employees on verifying destination URLs.",
      "Detailed, automated training logs provided the compliance team with audit-ready documentation for external HIPAA regulators."
    ],
    
    sidebarChallenge: "Securing sensitive patient records and maintaining HIPAA compliance audit readiness against complex QR code phishing (quishing) vectors.",
    sidebarDetails: [
      { label: "Compliance Goal", val: "100% Audit Readiness" },
      { label: "Primary Focus", val: "QR Code (Quishing) Training" }
    ],

    quoteText: "“Innvikta’s automated simulations gave us the audit logs we needed for HIPAA compliance while successfully driving down QR code failure rates to near zero.”",
    quoteAuthor: "David Chen, Chief Information Security Officer, MedTech Labs"
  },
  "saas-credentials-harvesting": {
    title: "SaaS Enterprise",
    subtitle: "SaaS Enterprise Mitigates Developer Credentials Harvesting Scams",
    industry: "IT & Services",
    location: "United States",
    timeline: "Ongoing Campaign",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=800&q=80",
    
    atGlance: [
      "95% decrease in developer credential harvesting click-through rates.",
      "Developer report rates of suspicious access alerts increased to 88%.",
      "Zero successful real-world credential compromise incidents since rollout.",
      "Strengthened developers' resilience against multi-factor authentication (MFA) bypasses."
    ],
    
    summaryTitle: "Protecting Critical Source Code & Developer Identity",
    summaryParagraphs: [
      "For a leading SaaS provider, developers' credentials represent the keys to their source code repositories and cloud environment infrastructures.",
      "Credential harvesting templates simulating code repository notifications and cloud console alerts posed massive security risks."
    ],
    
    challengeTitle: "Minimizing Exposure to Sophisticated OAuth and MFA fatigue scams",
    challengeParagraphs: [
      "Social engineering campaigns target developers using mock OAuth grant requests and push notification fatigue.",
      "Developers, who typically bypass traditional security modules, required highly technical, contextual training that fit their workflows."
    ],
    
    solutionParagraphs: [
      "Innvikta implemented simulated phishing campaigns mimicking console alerts and repository access changes. Developers who fell for simulated scams received instant in-context feedback on MFA fatigue.",
      "The program established robust reporting behaviors, allowing developers to flag suspicious requests directly to the security operations center."
    ],
    
    sidebarChallenge: "Developers were targeted with realistic code repository alerts and cloud console warnings aimed at harvesting credentials and bypassing MFA protocols.",
    sidebarDetails: [
      { label: "Exposure Risk", val: "OAuth / MFA Fatigue Scams" },
      { label: "Reporting Target", val: "85%+ Active Report Rate" }
    ],

    quoteText: "“Developers need training that respects their technical knowledge. Innvikta’s developer-focused templates successfully reduced credential theft susceptibility by 95%.”",
    quoteAuthor: "Marcus Brody, Director of Infrastructure Security, SaaS Corp"
  },
  "insurance-customer-data": {
    title: "Major Insurer",
    subtitle: "Leading Insurer Safeguards Customer Data Against Phishing",
    industry: "Insurance",
    location: "Global Operations",
    timeline: "4 Months",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800&q=80",
    
    atGlance: [
      "Increase in employee report rates from 12% to over 75% inside 4 months.",
      "Achieved full compliance with state data protection regulations.",
      "Zero successful data breach incidents reported post-implementation.",
      "Created a robust internal community of 'security champions' across regional offices."
    ],
    
    summaryTitle: "Safeguarding Customer Financial and Medical Records",
    summaryParagraphs: [
      "Insurance companies hold vast stores of highly sensitive client financial and medical records, making them high-value targets for identity theft scams.",
      "To safeguard these records, the insurer deployed Innvikta’s automated training program to build positive reporting habits."
    ],
    
    challengeTitle: "Transforming Passive Employees into Active Defenders",
    challengeParagraphs: [
      "Before Innvikta, the employee reporting rate for suspicious emails was a mere 12%. Phishing campaigns often went unflagged, giving threat actors time to exploit endpoints.",
      "The firm required a structured program to increase reporting speed and verify external links across regional branches."
    ],
    
    solutionParagraphs: [
      "The insurer deployed Innvikta's automated platform to trigger targeted training when users clicked on simulated links, shifting focus from compliance checkbox to actual resilience.",
      "Over four months, employee report rates rose to over 75%, creating an early warning detection loop for the SOC."
    ],
    
    sidebarChallenge: "Protecting highly sensitive customer medical and financial records from identity theft and spear-phishing campaigns.",
    sidebarDetails: [
      { label: "Report Rate Shift", val: "From 12% to 75%" },
      { label: "Timeline", val: "4-Month Campaign" }
    ],

    quoteText: "“Our employees are now our strongest firewall. Increasing report rates to over 75% has allowed our SOC to isolate and neutralize real threats much faster.”",
    quoteAuthor: "Laura Vance, CISO, Alliance Insurance Group"
  },
  "manufacturing-people-centric": {
    title: "Industrial Leader",
    subtitle: "Industrial Leader Safeguards Supply Chain against CEO Fraud",
    industry: "Manufacturing",
    location: "North America & Europe",
    timeline: "12 Months",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=80",
    
    atGlance: [
      "Zero losses to BEC and CEO fraud over a 12-month period.",
      "92% of finance team members correctly flagged simulated wire requests.",
      "Streamlined invoice validation and vendor approval protocols.",
      "Reduced average response and cleanup time for suspicious emails to under 10 minutes."
    ],
    
    summaryTitle: "Safeguarding the Supply Chain Against CEO Impersonation",
    summaryParagraphs: [
      "With manufacturing plants and procurement hubs spread globally, the company was vulnerable to Business Email Compromise (BEC) and invoice manipulation.",
      "Annual check-the-box training did not prepare procurement or finance managers to detect targeted social engineering."
    ],
    
    challengeTitle: "Mitigating Financial Fraud and Fake Invoice Requests",
    challengeParagraphs: [
      "Attackers repeatedly targeted procurement teams with fake invoice updates and CEO impersonations requesting emergency wire transfers.",
      "A compliance-only program was creating a false sense of security while actual click rates remained high and response times slow."
    ],
    
    solutionParagraphs: [
      "Innvikta deployed manufacturing-specific CEO fraud simulations replicating procurement workflows.",
      "Interactive learning modules and instant feedback helped employees learn how to verify payment details before executing transactions."
    ],
    
    sidebarChallenge: "Defending global supply chain managers and finance personnel from Business Email Compromise and fake vendor payment requests.",
    sidebarDetails: [
      { label: "BEC Loss Rate", val: "Zero incidents post-rollout" },
      { label: "Simulation Focus", val: "Invoice & CEO Impersonation" }
    ],

    quoteText: "“Innvikta helped us move from compliance theater to real resilience. Our finance team now validation-checks every vendor change request as standard workflow.”",
    quoteAuthor: "Thomas Kemp, VP of IT & Compliance, Industrial Metals Corp"
  },
  "national-agency-gamified": {
    title: "National Agency",
    subtitle: "National Agency Builds Cybersecurity Culture with Innvikta Arcade",
    industry: "Government",
    location: "National Infrastructure",
    timeline: "Ongoing Quest",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&h=800&q=80",
    
    atGlance: [
      "94% overall training completion rate driven by voluntary participation.",
      "Significant increase in retention scores for remote work policies.",
      "Fostered healthy competition across departments using public leaderboards.",
      "Reduced training administration overhead by 60% via automated game campaigns."
    ],
    
    summaryTitle: "Building a Dynamic Security Culture via Gamification",
    summaryParagraphs: [
      "Government employees were historically disengaged from legacy compliance training, leading to poor retention of secure practices.",
      "To build a strong security culture, the agency deployed Innvikta Arcade, a gamified system featuring interactive quests."
    ],
    
    challengeTitle: "Overcoming Disengagement in Security Awareness Training",
    challengeParagraphs: [
      "With remote work on the rise, securing remote access and home networks became a national security priority.",
      "Annual training felt tedious, resulting in low completion rates and zero behavior change among administrative staff."
    ],
    
    solutionParagraphs: [
      "The agency implemented game campaigns, security quizzes, and Department vs. Department leaderboards.",
      "Fostering friendly competition drove voluntary completion rates to 94% and significantly improved retention scores."
    ],
    
    sidebarChallenge: "Overcoming traditional training disengagement across public sector departments through interactive, gamified cybersecurity challenges.",
    sidebarDetails: [
      { label: "Engagement Shift", val: "94% Voluntary Completion" },
      { label: "Training Method", val: "Arcade Games & Leaderboards" }
    ],

    quoteText: "“Innvikta Arcade turned security training from a chore into a collaborative game. Completion rates soared to 94% with zero administrative reminders.”",
    quoteAuthor: "Helen Carter, Chief Information Officer, National Infrastructure Board"
  }
};

export default function CaseStudyDetail() {
  const params = useParams();
  const slug = params?.slug;

  const data = CASE_STUDY_DETAILS[slug] || CASE_STUDY_DETAILS["global-bank-phishing"];

  return (
    <GSAPWrapper>
      <SeoMeta title={`${data.subtitle} | Innvikta Case Study`} description={data.overview} />
      
      {/* 1. KnowBe4-Style Hero Section (Using Innvikta Theme Overlay) */}
      <div 
        className="relative text-white py-20 bg-cover bg-center overflow-hidden min-h-[300px] flex items-end"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${data.image})` }}
      >
        <div className="container px-6 md:px-12 lg:px-24 relative z-10 w-full text-left">
          <Link href="/resources/case-studies" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold mb-4 transition-colors font-secondary text-sm">
            <FiArrowLeft /> Back to Case Studies
          </Link>
          <div className="max-w-4xl">
            <span className="text-white/80 font-bold text-sm tracking-wider uppercase mb-2 block font-secondary">
              CASE STUDY
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-secondary text-white leading-tight">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. At a Glance Section (Soft light-orange/cream background, orange bullet icons, 2x2 layout) */}
      <section className="py-12 bg-[#FFFBF7] border-b border-orange-100">
        <div className="container px-6 md:px-12 lg:px-24 text-left">
          <h2 className="text-2xl font-bold font-secondary text-[#f15a24] mb-8">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.atGlance.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[#f15a24] font-bold text-lg leading-none shrink-0 mt-0.5">&rarr;</span>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Content Section (Split Layout) */}
      <section className="py-16 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
             {/* Left Column (2/3 width content details) */}
             <div className="lg:col-span-8 space-y-12 text-left">
               
               {/* Block 1 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.summaryTitle}
                 </h2>
                 {data.summaryParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
               {/* Block 2 */}
               <div className="space-y-4">
                 <h2 className="text-2xl md:text-[2rem] font-bold font-secondary text-[#0F172A] leading-snug tracking-tight mb-4">
                   {data.challengeTitle}
                 </h2>
                 {data.challengeParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
               {/* Block 3 */}
               <div className="space-y-4">
                 {data.solutionParagraphs.map((para, i) => (
                   <p key={i} className="text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-normal max-w-2xl">
                     {para}
                   </p>
                 ))}
               </div>
 
             </div>

            {/* Right Column (1/3 width sidebar card) */}
            <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-100 rounded-3xl p-8 text-left space-y-8">
              
              {/* Header Company Logo Placeholder */}
              <div className="border-b border-slate-200 pb-6">
                <div className="text-2xl font-extrabold font-secondary tracking-tight text-[#1F1F1F]">
                  {data.title}
                </div>
              </div>

              {/* Industry & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-1">
                    INDUSTRY
                  </span>
                  <span className="text-sm font-bold text-slate-800">{data.industry}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-1">
                    LOCATION
                  </span>
                  <span className="text-sm font-bold text-slate-800">{data.location}</span>
                </div>
              </div>

              {/* Challenge summary */}
              <div>
                <span className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider mb-2">
                  CHALLENGE
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {data.sidebarChallenge}
                </p>
              </div>

              {/* Platform and Representative details */}
              <div className="space-y-4 pt-4 border-t border-slate-200/80">
                {data.sidebarDetails.map((detail, idx) => (
                  <div key={idx}>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {detail.label}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{detail.val}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Center Action Banner Section (Rounded Card, not edge-to-edge) */}
      <section className="py-4 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="bg-[#CFD8DC]/50 rounded-[1.5rem] px-8 py-6 md:py-8 text-center border border-slate-200/30">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-secondary text-[#0F172A]">
                See Innvikta InSAT Security Awareness in Action
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed font-normal max-w-xl mx-auto">
                Request a personalized demo today to see how simulated threat scenarios can reduce security risks across your organization.
              </p>
              <div className="pt-3">
                <Link 
                  href="/book-demo" 
                  className="inline-flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md shadow-orange-500/25"
                >
                  Get a Demo <span className="text-sm">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Additional Section (Quote & Team Image Layout) */}
      <section className="py-20 bg-white">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Story details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                Building a security culture requires a program built around real behavior analytics, not slide library training. By triggering short, repeated reinforcement modules, employees understand the role they play in preserving compliance frameworks and cybersecurity defenses.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                Using Innvikta InSAT, the organization achieved full compliance alignment, minimized repeat clickers, and accelerated threat containment times dramatically.
              </p>
            </div>

            {/* Right Side: Collage / Collaboration Image */}
            <div className="lg:col-span-5">
              <img 
                src="/images/about-bg.jpeg" 
                alt="Security Compliance Team" 
                className="w-full h-72 object-cover rounded-3xl border border-slate-200/80 shadow-sm"
              />
            </div>

          </div>

          {/* 6. Big Quote Section (Centered, full width quote block) */}
          <div className="max-w-4xl mx-auto pt-20 text-center relative">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-8xl font-serif text-slate-100 select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative z-10 space-y-6">
              <blockquote className="text-xl md:text-2xl font-bold font-secondary text-[#1F1F1F] leading-relaxed italic">
                {data.quoteText}
              </blockquote>
              <cite className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider not-italic">
                {data.quoteAuthor}
              </cite>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Bottom Action Banner Section */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(241,90,36,0.12),transparent)] pointer-events-none" />
        <div className="container px-6 md:px-12 lg:px-24 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl md:text-2xl font-bold font-secondary">
              Everything you need to secure your human risk &mdash; on one platform.
            </h3>
            <div className="pt-2">
              <Link 
                href="/book-demo" 
                className="inline-flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-md shadow-orange-500/25"
              >
                Book a Demo <FiPlay className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </GSAPWrapper>
  );
}
