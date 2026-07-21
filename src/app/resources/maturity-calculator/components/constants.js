export const CATEGORIES = [
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

export const FAQS = [
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
