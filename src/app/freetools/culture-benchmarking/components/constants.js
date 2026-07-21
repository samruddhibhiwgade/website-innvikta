export const faqData = [
  {
    q: "What is a security culture benchmark?",
    a: "A security culture benchmark evaluates how employees think about, communicate about, and practice security across an organization. It goes beyond technical controls to measure human risk variables, helping identify cultural strengths, blind spots, and specific maturity improvement opportunities."
  },
  {
    q: "How is the benchmark score calculated?",
    a: "Scores are generated using a weighted algorithm across seven critical security dimensions. The calculation incorporates security behaviors (25%), compliance practices (15%), responsibilities/ownership (15%), knowledge (15%), attitudes (10%), communication (10%), and team norms (10%)."
  },
  {
    q: "Does this benchmark replace a security assessment?",
    a: "No. This benchmark evaluates human and cultural risk factors, reflecting workforce vulnerability and behavioral security maturity. It should complement broader cybersecurity penetration tests, vulnerability assessments, and technical audits."
  },
  {
    q: "How long does the benchmark take?",
    a: "Most organizations can complete the benchmarking questionnaire in less than five minutes. Results are generated instantly, providing a clear score, maturity band, and specific improvement actions."
  },
  {
    q: "Can we benchmark individual departments?",
    a: "Yes. InSAT enables organizations to run targeted culture assessments by department, role, or region to identify specific group risks and track progress over time."
  }
];

export const getScoreData = (benchmarkResult, formData) => {
  const score = benchmarkResult ? benchmarkResult.score : 84;
  const band = benchmarkResult ? benchmarkResult.band : "Mature";
  
  // Map dimensions
  const behaviorsScore = benchmarkResult ? (formData.behaviors === "high" ? 92 : (formData.behaviors === "medium" ? 72 : (formData.behaviors === "low" ? 40 : 72))) : 84;
  const ownershipScore = benchmarkResult ? (formData.ownership === "high" ? 94 : (formData.ownership === "medium" ? 74 : (formData.ownership === "low" ? 48 : 74))) : 92;
  const complianceScore = benchmarkResult ? (formData.compliance === "high" ? 95 : (formData.compliance === "medium" ? 75 : (formData.compliance === "low" ? 50 : 75))) : 85;
  const knowledgeScore = benchmarkResult ? (formData.knowledge === "high" ? 90 : (formData.knowledge === "medium" ? 70 : (formData.knowledge === "low" ? 42 : 70))) : 82;
  const attitudesScore = benchmarkResult ? (formData.attitudes === "high" ? 95 : (formData.attitudes === "medium" ? 75 : (formData.attitudes === "low" ? 45 : 75))) : 85;
  const communicationScore = benchmarkResult ? (formData.communication === "high" ? 93 : (formData.communication === "medium" ? 73 : (formData.communication === "low" ? 46 : 73))) : 82;
  const normsScore = benchmarkResult ? (formData.norms === "high" ? 88 : (formData.norms === "medium" ? 68 : (formData.norms === "low" ? 38 : 68))) : 75;

  const dimensions = [
    { name: "Security Behaviors", weight: "25%", score: behaviorsScore, desc: "Measures phishing resilience, secure decision-making, MFA adoption, password practices, and day-to-day security habits.", color: "#F15A24" },
    { name: "Security Ownership & Accountability", weight: "15%", score: ownershipScore, desc: "Measures employee responsibility, incident ownership, proactive security participation, and accountability across teams.", color: "#3B82F6" },
    { name: "Compliance & Policy Adherence", weight: "15%", score: complianceScore, desc: "Measures policy acknowledgement, procedural compliance, training completion, and adherence to security requirements.", color: "#10B981" },
    { name: "Security Knowledge & Awareness", weight: "15%", score: knowledgeScore, desc: "Measures security understanding, assessment performance, knowledge retention, and awareness effectiveness.", color: "#8B5CF6" },
    { name: "Security Attitudes", weight: "10%", score: attitudesScore, desc: "Measures employee perception of security, willingness to engage, and commitment to secure practices.", color: "#EC4899" },
    { name: "Security Communication", weight: "10%", score: communicationScore, desc: "Measures threat reporting behavior, communication effectiveness, and engagement with security initiatives.", color: "#F59E0B" },
    { name: "Team Norms & Cultural Reinforcement", weight: "10%", score: normsScore, desc: "Measures peer influence, security champion participation, and how security behaviors are reinforced across teams.", color: "#06B6D4" }
  ];

  let maturityLevel = "Level 4 - Mature";
  let maturityDesc = "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.";
  let riskLevel = "Low–Moderate Risk";
  let riskDesc = "Primary exposure areas include social engineering susceptibility and inconsistent security reinforcement across departments.";
  let percentile = "Top 18% of Organizations Assessed";
  
  if (score >= 86) {
    maturityLevel = "Level 5 - Security-Driven Culture";
    maturityDesc = "Security is embedded into daily decision-making, supported by strong ownership, reporting habits, and organizational reinforcement.";
    riskLevel = "Low Risk";
    riskDesc = "Extremely low human risk exposure; resilient peer reinforcement and active proactive threat scanning.";
    percentile = "Top 5% of Organizations Assessed";
  } else if (score >= 76) {
    maturityLevel = "Level 4 - Mature";
    maturityDesc = "Employees consistently demonstrate secure behaviors, accountability, and active participation in security initiatives.";
    riskLevel = "Low–Moderate Risk";
    riskDesc = "Primary exposure areas include social engineering susceptibility and inconsistent security reinforcement across departments.";
    percentile = "Top 18% of Organizations Assessed";
  } else if (score >= 61) {
    maturityLevel = "Level 3 - Progressing";
    maturityDesc = "Security practices are becoming embedded, though key opportunities remain in behavior reinforcement and reporting culture.";
    riskLevel = "Moderate Risk";
    riskDesc = "Moderate risk exposure in credential sharing, reporting lag, and peer accountability.";
    percentile = "Top 42% of Organizations Assessed";
  } else if (score >= 41) {
    maturityLevel = "Level 2 - Foundational";
    maturityDesc = "Basic awareness exists, but security behaviors and cultural adoption remain inconsistent across the organization.";
    riskLevel = "High Risk";
    riskDesc = "Elevated threat vectors in social engineering and shadow IT due to lack of policy compliance.";
    percentile = "Top 70% of Organizations Assessed";
  } else {
    maturityLevel = "Level 1 - High Human Risk";
    maturityDesc = "Organizations show significant cultural gaps, inconsistent security behaviors, and elevated exposure to human-driven threats.";
    riskLevel = "Critical Human Risk";
    riskDesc = "High susceptibility to phishing, social engineering, and security policy bypasses.";
    percentile = "Top 95% of Organizations Assessed";
  }

  // Dynamic recommendations based on lower dimensions
  const sortedDims = [...dimensions].sort((a, b) => a.score - b.score);
  const recommendations = [];
  
  sortedDims.forEach((dim) => {
    if (dim.name.includes("Norms")) {
      recommendations.push("Strengthen security champion programs to drive peer adoption");
      recommendations.push("Increase peer-led security engagement and feedback sessions");
    } else if (dim.name.includes("Behaviors")) {
      recommendations.push("Expand behavior-based security coaching and micro-nudges");
    } else if (dim.name.includes("Ownership")) {
      recommendations.push("Define clear team-level security accountability and ownership metrics");
    } else if (dim.name.includes("Compliance")) {
      recommendations.push("Automate policy acknowledgment loops and streamline compliance reminders");
    } else if (dim.name.includes("Knowledge")) {
      recommendations.push("Deploy personalized awareness training targeting cognitive gaps");
    } else if (dim.name.includes("Attitudes")) {
      recommendations.push("Establish executive messaging and positive reinforcement to build engagement");
    } else if (dim.name.includes("Communication")) {
      recommendations.push("Improve cross-team security communication channels and report simplified feedback");
    }
  });

  while (recommendations.length < 4) {
    recommendations.push("Conduct periodic human risk assessments to track performance");
  }

  const diff = score - 75;
  const comparisonText = diff >= 0 ? `+${diff}% Above Peer Average` : `${Math.abs(diff)}% Below Peer Average`;

  const trendText = score >= 76 ? "+6 Point Improvement" : (score >= 61 ? "+3 Point Improvement" : "+1 Point Improvement");
  const trendDetail = score >= 76 
    ? "Driven by increased reporting activity, stronger policy adherence, and improved phishing resilience."
    : "Supported by baseline completion rates and early policy acknowledgment engagement.";

  let execSummary = `Your organization demonstrates a ${band.toLowerCase()} security culture supported by strong accountability, reporting participation, and policy adherence. Employees generally understand their security responsibilities and actively contribute to reducing organizational risk. The most significant opportunity for improvement lies in strengthening ${sortedDims[0].name.toLowerCase()} so that secure behaviors are consistently reinforced across departments. Organizations that improve cultural reinforcement typically achieve higher reporting rates, stronger phishing resilience, and lower human-related security incidents over time.`;

  if (benchmarkResult) {
    const highest = dimensions.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    const lowest = dimensions.reduce((prev, current) => (prev.score < current.score) ? prev : current);
    let sum = `Your organization demonstrates a ${band.toLowerCase()} security culture (score: ${score}/100) `;
    
    if (score >= 86) {
      sum += `supported by industry-leading habits, with particular strength in ${highest.name} (${highest.score}/100). Secure behaviors are deeply embedded in your daily operations. `;
    } else if (score >= 76) {
      sum += `supported by strong accountability and policy adherence, led by high performance in ${highest.name} (${highest.score}/100). Employees generally take proactive ownership of safety. `;
    } else if (score >= 61) {
      sum += `with established awareness foundations, marked by a relative strength in ${highest.name} (${highest.score}/100). However, cultural adoption and behavior management remain somewhat inconsistent. `;
    } else if (score >= 41) {
      sum += `where basic compliance exists, showing a minor strength in ${highest.name} (${highest.score}/100), but significant behavioral gaps persist across key operational areas. `;
    } else {
      sum += `with critical cultural vulnerabilities, although ${highest.name} (${highest.score}/100) is your highest indicator. Immediate strategic interventions are required to mitigate human threat exposure. `;
    }

    sum += `The most significant opportunity for improvement lies in strengthening ${lowest.name} (${lowest.score}/100), which ${lowest.desc.toLowerCase().replace('measures ', 'focuses on ')}. `;

    if (score >= 76) {
      sum += `Organizations that successfully address these gaps typically achieve higher reporting rates, stronger phishing resilience, and lower human-related security incidents over time.`;
    } else {
      sum += `Prioritizing these cultural reinforcement areas is crucial for establishing baseline security ownership, improving reporting behaviors, and reducing overall human risk.`;
    }
    execSummary = sum;
  }

  return {
    score,
    band,
    dimensions,
    maturityLevel,
    maturityDesc,
    riskLevel,
    riskDesc,
    percentile,
    recommendations: recommendations.slice(0, 4),
    comparisonText,
    trendText,
    trendDetail,
    execSummary
  };
};
