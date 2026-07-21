export const faqData = [
  {
    q: "What is a Human Risk Assessment?",
    a: "A Human Risk Assessment is a formal evaluation of an organization's susceptibility to social engineering and human-centric cybersecurity threats. By analyzing employee behavior patterns, security awareness training frequency, phishing simulation click rates, and externally observable domain configuration records (like SPF, DKIM, and DMARC), a Human Risk Assessment establishes a baseline of vulnerability. It evaluates the human attack surface to guide security leaders in deploying targeted behavioral security solutions, reducing workforce security risks, and strengthening organizational resilience before threat actors attempt to exploit workforce vulnerabilities."
  },
  {
    q: "How is a Human Risk Score calculated?",
    a: "Innvikta calculates the Human Risk Score using a weighted algorithm based on organizational parameters and defensive training practices. This includes workforce size (which expands the potential attack surface), industry target vectors (as sectors like BFSI and healthcare face disproportionate threat intelligence profiles), and security controls. We combine these threat factors with security readiness parameters, specifically auditing how frequently security awareness training and phishing simulations are run. These inputs are aggregated into a score from 1 to 100, where higher scores signify severe risk exposure."
  },
  {
    q: "What causes a high Human Risk Score?",
    a: "A high Human Risk Score is primarily caused by security training maturity gaps and administrative email vulnerabilities. For example, if an organization never runs phishing simulations or conducts security awareness training less than quarterly, employees cannot build secure habits. Additionally, exposed employee identities on look-alike domains, weak DMARC/SPF configurations, and high workforce susceptibility to social engineering techniques escalate the vulnerability index. Large, targeted organizations in highly regulated sectors also start with elevated baseline threat intelligence targets."
  },
  {
    q: "What is considered a good Human Risk Score?",
    a: "A score under 40 is considered low risk, representing a resilient workforce. Achieving a low risk score requires continuous monthly security awareness training, ongoing automated phishing simulations, strong email authentication records, and a proactive security culture. A score of 40-59 represents moderate risk, while any score exceeding 60 flags critical gaps in behavioral security, requiring immediate leadership intervention and structured human risk management campaigns."
  },
  {
    q: "How often should organizations assess human risk?",
    a: "Organizations should evaluate human risk continuously. Because workforce behavior, threat vectors, and personnel change constantly, static annual assessments fail to capture active vulnerability peaks. Best practices suggest review of human risk score metrics monthly, integrated with recurring simulation reporting. This ensures security leaders can proactively adjust learning paths, identify newly vulnerable departments, and maintain audit-ready evidence for compliance framework reviews."
  },
  {
    q: "How does phishing impact human risk?",
    a: "Phishing remains the primary initial access vector for enterprise breaches. Employee interaction with suspicious emails directly drives social engineering exposure, credential harvesting, and malware deployment. Measuring phishing susceptibility - specifically click rates and threat reporting rates - provides a direct behavioral baseline of human risk. Continuous simulations teach employees to spot active threat indicators, transforming them from targets into active defenders."
  },
  {
    q: "Can AI-generated attacks increase human risk?",
    a: "Yes, generative AI has drastically heightened social engineering capabilities. Threat actors use AI to write highly convincing, hyper-targeted spear-phishing emails, automate Look-alike domain campaigns, and create voice deepfakes for business email compromise (BEC). Because AI-generated attacks lack typical spelling errors and translate perfectly across languages, they bypass traditional employee filters, raising the overall baseline risk and demanding advanced behavioral security training."
  },
  {
    q: "How does employee awareness training reduce cyber risk?",
    a: "Structured, continuous security awareness training builds defensive cognitive habits across the workforce. Rather than viewing compliance as a checkbox exercise, active learning programs teach employees to identify credential theft, social engineering hooks, and data sharing risks. This behavioral focus creates an active 'human firewall,' reducing susceptibility to phishing campaigns and driving down the company's overall human risk exposure index."
  },
  {
    q: "What is business email compromise?",
    a: "Business Email Compromise (BEC) is a sophisticated form of social engineering where threat actors impersonate executives, partners, or vendors to orchestrate unauthorized wire transfers or harvest sensitive credentials. BEC scams rarely contain malicious files or links, bypassing traditional technical filters by relying entirely on conversational trust and look-alike domains. Understanding BEC vulnerability is a critical indicator in workforce threat assessments."
  },
  {
    q: "Why is DMARC important?",
    a: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) is a critical email authentication protocol that prevents domain spoofing and brand impersonation. By working alongside SPF and DKIM, DMARC allows domain owners to instruct recipient servers how to handle emails that fail verification, blocking phishing attempts sent in the company's name and securing the brand's external email posture."
  },
  {
    q: "How does Innvikta measure human risk exposure?",
    a: "Innvikta measures human risk exposure by cross-referencing organizational characteristics, administrative records, and behavioral training frequency. We analyze domain controls, look-alike domain risks, and target vectors, combined with active program metrics like security training intervals and phishing simulator activity. This provides security leaders with a clear, defensible view of their human attack surface and specific, actionable paths for risk mitigation."
  }
];
