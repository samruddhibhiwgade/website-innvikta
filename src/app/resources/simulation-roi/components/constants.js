export const BENCHMARKS = {
  "Banking": { clickRate: 0.20, credRate: 0.035, emailsPerUser: 520, reportRate: 0.18, costPerUser: 260, compliance: "Very High", notes: "Higher regulatory and fraud exposure" },
  "Insurance": { clickRate: 0.21, credRate: 0.034, emailsPerUser: 500, reportRate: 0.16, costPerUser: 220, compliance: "High", notes: "Customer data and payment risk" },
  "Healthcare": { clickRate: 0.24, credRate: 0.040, emailsPerUser: 480, reportRate: 0.12, costPerUser: 240, compliance: "Very High", notes: "Sensitive data and downtime risk" },
  "Manufacturing": { clickRate: 0.22, credRate: 0.032, emailsPerUser: 440, reportRate: 0.10, costPerUser: 190, compliance: "High", notes: "Ransomware and OT downtime exposure" },
  "IT/ITES": { clickRate: 0.18, credRate: 0.028, emailsPerUser: 560, reportRate: 0.20, costPerUser: 210, compliance: "High", notes: "Credential and client-data exposure" },
  "Retail": { clickRate: 0.25, credRate: 0.038, emailsPerUser: 420, reportRate: 0.11, costPerUser: 170, compliance: "Medium", notes: "Payment and seasonal fraud exposure" },
  "Pharma": { clickRate: 0.22, credRate: 0.033, emailsPerUser: 470, reportRate: 0.13, costPerUser: 230, compliance: "Very High", notes: "IP, regulated data and vendor risk" },
  "Education": { clickRate: 0.28, credRate: 0.045, emailsPerUser: 380, reportRate: 0.08, costPerUser: 130, compliance: "Medium", notes: "High user diversity and low reporting benchmark" },
  "Government": { clickRate: 0.23, credRate: 0.036, emailsPerUser: 460, reportRate: 0.12, costPerUser: 210, compliance: "Very High", notes: "Public service and citizen-data risk" },
  "Energy": { clickRate: 0.21, credRate: 0.032, emailsPerUser: 500, reportRate: 0.13, costPerUser: 250, compliance: "Very High", notes: "Critical infrastructure downtime risk" },
  "Logistics": { clickRate: 0.23, credRate: 0.034, emailsPerUser: 430, reportRate: 0.10, costPerUser: 175, compliance: "Medium", notes: "Invoice, shipment and vendor fraud exposure" },
  "Other": { clickRate: 0.22, credRate: 0.034, emailsPerUser: 440, reportRate: 0.12, costPerUser: 180, compliance: "Medium", notes: "Generic cross-industry assumption" }
};

export const ASSUMPTIONS = {
  "None": { riskReduction: 0.15, clickReduction: 0.18, credReduction: 0.24, reportUplift: 1.2 },
  "Annual Training": { riskReduction: 0.28, clickReduction: 0.30, credReduction: 0.38, reportUplift: 1.6 },
  "Quarterly Training": { riskReduction: 0.42, clickReduction: 0.45, credReduction: 0.55, reportUplift: 2.2 },
  "Monthly Training": { riskReduction: 0.55, clickReduction: 0.58, credReduction: 0.68, reportUplift: 3.0 },
  "Mature Continuous Program": { riskReduction: 0.70, clickReduction: 0.72, credReduction: 0.80, reportUplift: 4.0 }
};

export const CURRENCIES = {
  "USD": { symbol: "$", label: "USD ($)" },
  "INR": { symbol: "₹", label: "INR (₹)" },
  "EUR": { symbol: "€", label: "EUR (€)" },
  "GBP": { symbol: "£", label: "GBP (£)" }
};

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Japan",
  "Other"
];

export const tooltips = {
  companyName: "Name of the organization for branding the board-ready summary report.",
  industry: "Industry type defines the baseline phishing susceptibility, email frequency, and average risk cost per user based on global cybersecurity reports.",
  country: "Region of operations for compliance pressure and exposure mapping.",
  employees: "Total number of organization personnel who actively use corporate email addresses.",
  existingProgram: "The type of security awareness program currently deployed, which determines baseline risk reduction parameters.",
  programCostPerUser: "Average annual security awareness license and administration budget per user.",
  currency: "Select preferred currency for the financial reports."
};

export const faqs = [
  {
    q: "What is a Security Awareness ROI Calculator?",
    a: "A Security Awareness ROI Calculator is an enterprise-grade financial modeling tool designed to help security leaders and CISOs quantify the economic value of implementing cybersecurity awareness training and phishing simulations. By looking at metrics like user susceptibility click rates, remediation overheads, employee productivity loss, and average industry breach exposure, the calculator projects the direct cost savings and Return on Investment (ROI) your business stands to gain. It shifts security conversation from a cost center to a clear investment with measurable business outcomes."
  },
  {
    q: "How is phishing risk estimated?",
    a: "Phishing risk is estimated by combining simulated attack performance statistics with real-world financial exposure models. The baseline calculator calculates total annual phishing attempts by multiplying your email-enabled employee headcount by average monthly attacks. It then applies your baseline phishing click rate and successful breach rate to estimate your current annual cybersecurity incidents. This calculates direct operational overheads alongside potential industry breach benchmarks, offering a comprehensive view of overall phishing susceptibility exposure."
  },
  {
    q: "What factors affect security awareness ROI?",
    a: "Several factors affect security awareness training ROI, including baseline click rates, the quality and frequency of mock campaigns, remediation costs, and industry classification. A primary factor is baseline click rate reduction: dropping from a standard 18% susceptibility rate to under 8% (or even 2-3% in mature programs) significantly decreases system breaches. Additionally, faster response times, reduced analyst workload, lower employee downtime, and mitigating multi-million dollar data breaches drastically enhance the overall ROI calculation."
  },
  {
    q: "Why does phishing susceptibility matter?",
    a: "Phishing susceptibility is a leading indicator of organizational human risk. Because over 90% of successful corporate breaches initiate via email social engineering, having a highly susceptible workforce dramatically increases the likelihood of ransomware, credential theft, and compliance penalties. Lowering this susceptibility rate creates a robust human firewall, ensuring that employees act as active detectors rather than entry points for advanced threat actors."
  }
];

export const ctaData = {
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
