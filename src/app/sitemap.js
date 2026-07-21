import config from "@config/config.json";

export default async function sitemap() {
  const { base_url } = config.site;

  const routes = [
    "",
    "/solutions/insat",
    "/solutions/phishing-simulation",
    "/solutions/human-risk-intelligence",
    "/solutions/compliance-training",
    "/solutions/customized-solutions",
    "/resources/case-studies",
    "/resources/compliance-mapping",
    "/resources/cybersecurity-awareness-month",
    "/resources/glossary",
    "/resources/research-hub",
    "/resources/simulation-roi",
    "/freetools/baseline-score-tool",
    "/freetools/culture-benchmarking",
    "/freetools/domain-security-analyzer",
    "/freetools/password-generator",
    "/freetools/spot-the-phish",
    "/cyber-arcade",
    "/partners",
    "/book-demo",
    "/start-free",
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${base_url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}
