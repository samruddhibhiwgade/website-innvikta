/**
 * SEO & AI Score Analyzer for Innvikta Blog CMS
 * Scores an article out of 100 and provides actionable recommendations.
 */
export function analyzeArticle({ title = "", content = "", frontmatter = {}, slug = "" }) {
  const checks = [];
  let score = 0;
  
  const contentLower = content.toLowerCase();
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  
  const primaryKeyword = (frontmatter.primaryKeyword || "").trim().toLowerCase();
  const seoTitle = (frontmatter.seoTitle || title || "").trim();
  const metaDesc = (frontmatter.metaDescription || "").trim();
  const excerpt = (frontmatter.excerpt || "").trim();
  const image = (frontmatter.image || "").trim();
  const imageAlt = (frontmatter.imageAlt || "").trim();

  // Helper to add check and points
  function addCheck({ id, name, status, points = 0, maxPoints = 5, description, recommendation }) {
    checks.push({ id, name, status, points, maxPoints, description, recommendation });
    score += points;
  }

  // 1. Word Count (Max 5 pts)
  if (wordCount >= 600) {
    addCheck({
      id: "word-count",
      name: "Word Count",
      status: "success",
      points: 5,
      description: `Word count is ${wordCount} words (Ideal deep-dive length).`,
      recommendation: "Great length for comprehensive topic coverage."
    });
  } else if (wordCount >= 300) {
    addCheck({
      id: "word-count",
      name: "Word Count",
      status: "warning",
      points: 3,
      description: `Word count is ${wordCount} words (Minimum recommendation is 600 words for deep-dive).`,
      recommendation: "Consider expanding the article with cyber examples or statistics to exceed 600 words."
    });
  } else {
    addCheck({
      id: "word-count",
      name: "Word Count",
      status: "error",
      points: 0,
      description: `Word count is ${wordCount} words (Thin content under 300 words).`,
      recommendation: "Substantially expand this article with definitions, practical scenarios, and details."
    });
  }

  // 2. Focus Keyword presence (Max 5 pts)
  if (!primaryKeyword) {
    addCheck({
      id: "primary-keyword",
      name: "Primary Keyword",
      status: "error",
      points: 0,
      description: "No primary keyword specified in frontmatter.",
      recommendation: "Define a focus keyword to target Search and Answer Engines."
    });
  } else {
    addCheck({
      id: "primary-keyword",
      name: "Primary Keyword",
      status: "success",
      points: 5,
      description: `Focus keyword "${primaryKeyword}" is defined.`,
      recommendation: "Perfect."
    });
  }

  // 3. Keyword density (Max 5 pts)
  if (primaryKeyword && wordCount > 0) {
    const escapedKeyword = primaryKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, "g");
    const count = (contentLower.match(regex) || []).length;
    const density = ((count / wordCount) * 100).toFixed(2);
    
    if (count === 0) {
      addCheck({
        id: "keyword-density",
        name: "Keyword Density",
        status: "error",
        points: 0,
        description: `Keyword density is 0% (Keyword found 0 times).`,
        recommendation: `Incorporate your primary keyword "${primaryKeyword}" naturally inside paragraphs, headings, and intro.`
      });
    } else if (density < 0.5) {
      addCheck({
        id: "keyword-density",
        name: "Keyword Density",
        status: "warning",
        points: 2,
        description: `Keyword density is ${density}% (Found ${count} times). Slightly low.`,
        recommendation: "Try to mention the keyword a few more times (target 0.5% - 2.5% density)."
      });
    } else if (density > 2.5) {
      addCheck({
        id: "keyword-density",
        name: "Keyword Density",
        status: "warning",
        points: 2,
        description: `Keyword density is ${density}% (Found ${count} times). Danger of keyword stuffing!`,
        recommendation: "Reduce the keyword frequency to write more naturally for humans first."
      });
    } else {
      addCheck({
        id: "keyword-density",
        name: "Keyword Density",
        status: "success",
        points: 5,
        description: `Keyword density is ${density}% (Found ${count} times). Ideal range.`,
        recommendation: "Excellent density. Search and Answer Engines can index this topic cleanly."
      });
    }
  } else if (!primaryKeyword) {
    addCheck({
      id: "keyword-density",
      name: "Keyword Density",
      status: "error",
      points: 0,
      description: "Cannot check keyword density without a primary keyword.",
      recommendation: "Specify the primary keyword to calculate density."
    });
  }

  // 4. SEO Title (Max 5 pts)
  if (!seoTitle) {
    addCheck({
      id: "seo-title",
      name: "SEO Title",
      status: "error",
      points: 0,
      description: "SEO Title is missing.",
      recommendation: "Create a unique, keyword-rich SEO Title in the frontmatter."
    });
  } else {
    const titleLength = seoTitle.length;
    const hasKeyword = primaryKeyword ? seoTitle.toLowerCase().includes(primaryKeyword) : false;
    
    if (titleLength < 40 || titleLength > 60) {
      addCheck({
        id: "seo-title",
        name: "SEO Title",
        status: "warning",
        points: 3,
        description: `SEO Title is ${titleLength} characters (Recommended: 40-60 characters). ${hasKeyword ? "Keyword present." : "Keyword missing."}`,
        recommendation: "Adjust SEO Title length to stay within 40-60 characters for maximum search snippet visibility."
      });
    } else if (primaryKeyword && !hasKeyword) {
      addCheck({
        id: "seo-title",
        name: "SEO Title",
        status: "warning",
        points: 3,
        description: `SEO Title has ideal length (${titleLength} chars), but does not contain the primary keyword.`,
        recommendation: `Insert the primary keyword "${primaryKeyword}" near the beginning of your SEO Title.`
      });
    } else {
      addCheck({
        id: "seo-title",
        name: "SEO Title",
        status: "success",
        points: 5,
        description: "SEO Title is highly optimized (Ideal length and contains focus keyword).",
        recommendation: "Great job."
      });
    }
  }

  // 5. Meta Description (Max 5 pts)
  if (!metaDesc) {
    addCheck({
      id: "meta-description",
      name: "Meta Description",
      status: "error",
      points: 0,
      description: "Meta description is missing.",
      recommendation: "Add a meta description (120-160 characters) to summarize the article and boost organic CTR."
    });
  } else {
    const descLength = metaDesc.length;
    const hasKeyword = primaryKeyword ? metaDesc.toLowerCase().includes(primaryKeyword) : false;
    
    if (descLength < 120 || descLength > 160) {
      addCheck({
        id: "meta-description",
        name: "Meta Description",
        status: "warning",
        points: 3,
        description: `Meta description is ${descLength} characters (Recommended: 120-160 characters). ${hasKeyword ? "Keyword present." : "Keyword missing."}`,
        recommendation: "Adjust meta description length to 120-160 characters to avoid snippet truncation."
      });
    } else if (primaryKeyword && !hasKeyword) {
      addCheck({
        id: "meta-description",
        name: "Meta Description",
        status: "warning",
        points: 3,
        description: `Meta description length is good, but does not contain the primary keyword.`,
        recommendation: `Include the primary keyword "${primaryKeyword}" in the meta description.`
      });
    } else {
      addCheck({
        id: "meta-description",
        name: "Meta Description",
        status: "success",
        points: 5,
        description: "Meta description is fully optimized.",
        recommendation: "Excellent description."
      });
    }
  }

  // 6. URL Slug (Max 4 pts)
  const slugToCheck = slug || frontmatter.slug || "";
  if (!slugToCheck) {
    addCheck({
      id: "url-slug",
      name: "URL Slug",
      status: "error",
      points: 0,
      maxPoints: 4,
      description: "URL Slug cannot be verified.",
      recommendation: "Ensure the file has a clean, readable name or frontmatter slug."
    });
  } else {
    const hasKeyword = primaryKeyword ? slugToCheck.toLowerCase().includes(primaryKeyword.replace(/\s+/g, "-")) : false;
    const cleanFormat = /^[a-z0-9-]+$/.test(slugToCheck);
    
    if (!cleanFormat) {
      addCheck({
        id: "url-slug",
        name: "URL Slug",
        status: "error",
        points: 0,
        maxPoints: 4,
        description: `Slug "${slugToCheck}" contains invalid characters (should only be lowercase letters, numbers, and hyphens).`,
        recommendation: "Use lowercase alphanumeric characters separated by single dashes only."
      });
    } else if (primaryKeyword && !hasKeyword) {
      addCheck({
        id: "url-slug",
        name: "URL Slug",
        status: "warning",
        points: 2,
        maxPoints: 4,
        description: "Slug is clean, but doesn't contain the primary keyword.",
        recommendation: `Include the primary keyword "${primaryKeyword}" (separated by dashes) in the URL slug.`
      });
    } else {
      addCheck({
        id: "url-slug",
        name: "URL Slug",
        status: "success",
        points: 4,
        maxPoints: 4,
        description: "URL Slug is SEO-friendly and matches focus keyword.",
        recommendation: "Slug is ready."
      });
    }
  }

  // 7. Heading Hierarchy (Max 5 pts)
  const contentH1s = (content.match(/^#\s+.+$/gm) || []).length;
  const headings = [];
  const headingLines = content.match(/^(#{1,6})\s+(.+)$/gm) || [];
  let skippedHierarchy = false;
  let lastLevel = 1; // Assuming page title is H1
  
  headingLines.forEach(line => {
    const level = line.match(/^(#{1,6})/)[0].length;
    headings.push(level);
    if (level - lastLevel > 1) {
      skippedHierarchy = true;
    }
    lastLevel = level;
  });

  if (contentH1s > 0) {
    addCheck({
      id: "heading-hierarchy",
      name: "Heading Hierarchy",
      status: "error",
      points: 1,
      description: `Found H1 headings (#) in the article body. The page title itself is the H1.`,
      recommendation: "Remove raw '# H1' tags in content and replace with '## H2' tags to maintain strict hierarchy."
    });
  } else if (skippedHierarchy) {
    addCheck({
      id: "heading-hierarchy",
      name: "Heading Hierarchy",
      status: "warning",
      points: 3,
      description: "Skipped heading levels detected (e.g., jumping from H2 directly to H4 without H3).",
      recommendation: "Review headings structure. Ensure subheadings nest progressively (H2 followed by H3, then H4)."
    });
  } else {
    addCheck({
      id: "heading-hierarchy",
      name: "Heading Hierarchy",
      status: "success",
      points: 5,
      description: "Heading hierarchy is fully valid. H1 is unique and levels nest correctly.",
      recommendation: "Perfect structure."
    });
  }

  // 8. Internal Links (Max 4 pts)
  // Match absolute local path or relative path, e.g. /solutions, /freetools, /blog/
  const internalLinkRegex = /\[[^\]]+\]\((?:\/|https?:\/\/(?:localhost|127\.0\.0\.1|innvikta\.com))[^\)]*\)/g;
  const internalLinks = (content.match(internalLinkRegex) || []).length;
  if (internalLinks > 0) {
    addCheck({
      id: "internal-links",
      name: "Internal Links",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: `Found ${internalLinks} internal link(s) to Solutions, Tools, or pages.`,
      recommendation: "Helps spread page authority and guides search crawlers."
    });
  } else {
    addCheck({
      id: "internal-links",
      name: "Internal Links",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No internal links found in the content.",
      recommendation: "Add links pointing to related Innvikta products (e.g. /solutions/phishing-simulation) or resources."
    });
  }

  // 9. External Links (Max 4 pts)
  const externalLinkRegex = /\[[^\]]+\]\((https?:\/\/(?!(?:localhost|127\.0\.0\.1|innvikta\.com))[^\)]+)\)/g;
  const externalLinks = (content.match(externalLinkRegex) || []).length;
  if (externalLinks > 0) {
    addCheck({
      id: "external-links",
      name: "External Links",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: `Found ${externalLinks} external citation link(s).`,
      recommendation: "Provides credibility and sources for claims."
    });
  } else {
    addCheck({
      id: "external-links",
      name: "External Links",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No external authority links/citations found.",
      recommendation: "Reference and link outbound to high-authority cyber reports (e.g., Verizon DBIR, FBI, APWG)."
    });
  }

  // 10. Featured Image & Alt (Max 5 pts)
  if (!image) {
    addCheck({
      id: "featured-image",
      name: "Featured Image",
      status: "error",
      points: 0,
      description: "Featured Image is missing.",
      recommendation: "Add a representative featured image path in the frontmatter."
    });
  } else if (!imageAlt) {
    addCheck({
      id: "featured-image",
      name: "Featured Image Alt Text",
      status: "warning",
      points: 2,
      description: "Featured Image is set, but Alt Text is missing.",
      recommendation: "Add 'imageAlt' to frontmatter to describe the image for screen readers and image search engines."
    });
  } else {
    addCheck({
      id: "featured-image",
      name: "Featured Image",
      status: "success",
      points: 5,
      description: `Featured Image is set with Alt Text: "${imageAlt}".`,
      recommendation: "Fully optimized."
    });
  }

  // 11. Quick Answer (Max 5 pts)
  // Check if content has a Quick Answer section (usually represented by heading or special block)
  const hasQuickAnswer = contentLower.includes("quick answer") || content.includes("<QuickAnswer");
  if (hasQuickAnswer) {
    addCheck({
      id: "quick-answer",
      name: "Quick Answer",
      status: "success",
      points: 5,
      description: "Quick Answer block or section detected. Highly optimized for Google AI Overviews and snippet extraction.",
      recommendation: "Great addition for instant AI reading."
    });
  } else {
    addCheck({
      id: "quick-answer",
      name: "Quick Answer",
      status: "warning",
      points: 0,
      description: "No Quick Answer section found.",
      recommendation: "Add a quick 2-3 sentence definition/summary at the beginning of the article to target AI Overviews/Featured Snippets."
    });
  }

  // 12. Definition Box (Max 4 pts)
  const hasDefinition = contentLower.includes("definition") || content.includes("<DefinitionBox") || content.includes("<Blockquote");
  if (hasDefinition) {
    addCheck({
      id: "definition-box",
      name: "Definition Box",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Definition block or definition terms found.",
      recommendation: "Helps LLMs extract clean terminology definitions."
    });
  } else {
    addCheck({
      id: "definition-box",
      name: "Definition Box",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No Definition box or terminology highlighting found.",
      recommendation: "Create a definition block to explicitly define key cybersecurity terms for crawlers."
    });
  }

  // 13. Statistics Block (Max 4 pts)
  const hasStats = /\b\d+(?:\.\d+)?%\b|\b\$\d+(?:\.\d+)?\s*(?:billion|million|trillion|B|M|T)\b/i.test(content) || content.includes("Statistics") || content.includes("<Stats");
  if (hasStats) {
    addCheck({
      id: "statistics-block",
      name: "Statistics Block",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Statistics, percentages, or cost figures detected in content.",
      recommendation: "Provides high-value trust indicators for GEO/AEO optimization."
    });
  } else {
    addCheck({
      id: "statistics-block",
      name: "Statistics Block",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No cybersecurity statistics or cost impact metrics found.",
      recommendation: "Cite data metrics (e.g. breach cost, user failure percentage) to enrich credibility."
    });
  }

  // 14. Comparison Table (Max 4 pts)
  const hasTable = content.includes("|") && content.includes("---");
  if (hasTable) {
    addCheck({
      id: "comparison-table",
      name: "Comparison Table",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Structured comparison table detected.",
      recommendation: "AEO/GEO engines love tables for comparative user queries."
    });
  } else {
    addCheck({
      id: "comparison-table",
      name: "Comparison Table",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No tables or comparison blocks found.",
      recommendation: "Add a comparison table when comparing vectors, options, or costs."
    });
  }

  // 15. Checklist (Max 4 pts)
  const hasChecklist = content.includes("- [ ]") || content.includes("- [x]") || contentLower.includes("checklist") || content.includes("<Checklist");
  if (hasChecklist) {
    addCheck({
      id: "checklist",
      name: "Checklist",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Actionable checklist detected.",
      recommendation: "Actionable itemization is highly crawled by search bots."
    });
  } else {
    addCheck({
      id: "checklist",
      name: "Checklist",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "No interactive or static checklists found.",
      recommendation: "Include a checklist summarizing action items to improve user engagement."
    });
  }

  // 16. FAQ Section (Max 5 pts)
  const hasFaq = content.includes("<FAQ") || contentLower.includes("frequently asked questions") || contentLower.includes("faq");
  if (hasFaq) {
    addCheck({
      id: "faq-section",
      name: "FAQ Section",
      status: "success",
      points: 5,
      description: "FAQ container with accordion questions detected. Triggers FAQPage structured schema.",
      recommendation: "Perfect for voice and question-based search engine queries."
    });
  } else {
    addCheck({
      id: "faq-section",
      name: "FAQ Section",
      status: "warning",
      points: 0,
      description: "No FAQ section found.",
      recommendation: "Add an FAQ section at the end of the post answering 3-5 key queries."
    });
  }

  // 17. Key Takeaways (Max 4 pts)
  const hasTakeaways = content.includes("<KeyTakeaways") || contentLower.includes("key takeaways");
  if (hasTakeaways) {
    addCheck({
      id: "key-takeaways",
      name: "Key Takeaways",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Key Takeaways summary block detected.",
      recommendation: "Helps users and AI summarize the post's core message instantly."
    });
  } else {
    addCheck({
      id: "key-takeaways",
      name: "Key Takeaways",
      status: "warning",
      points: 0,
      maxPoints: 4,
      description: "Key Takeaways summary is missing.",
      recommendation: "Create a summary block of key takeaways after the main body."
    });
  }

  // 18. Related Articles (Max 4 pts)
  // PostSingle template automatically renders Recent/Related posts at footer
  addCheck({
    id: "related-articles",
    name: "Related Articles",
    status: "success",
    points: 4,
    maxPoints: 4,
    description: "Related / Recent Articles are dynamically recommended at the bottom of the page.",
    recommendation: "Internal links and pagination are active."
  });

  // 19. Book Demo CTA (Max 5 pts)
  const hasCta = content.includes("<BookDemo") || content.includes("<CTA") || content.includes("BookDemo");
  if (hasCta) {
    addCheck({
      id: "book-demo-placement",
      name: "Book Demo CTA",
      status: "success",
      points: 5,
      description: "Convertible Book Demo Call-To-Action form is injected inside the content.",
      recommendation: "Optimizes post conversion rate."
    });
  } else {
    addCheck({
      id: "book-demo-placement",
      name: "Book Demo CTA",
      status: "warning",
      points: 0,
      description: "No conversion CTA or Demo form is placed in the article body.",
      recommendation: "Add the Book Demo CTA component mid-article or at the end to drive leads."
    });
  }

  // 20. Structured Data (Max 5 pts)
  // Dynamic JSON-LD is automatically rendered by PostSingle
  addCheck({
    id: "structured-data",
    name: "JSON-LD Structured Data",
    status: "success",
    points: 5,
    description: "BlogPosting JSON-LD and FAQPage JSON-LD (if applicable) are dynamically generated.",
    recommendation: "Provides search engines with clear machine-readable entities."
  });

  // 21. Readability (Max 4 pts)
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  let longParagraphs = 0;
  paragraphs.forEach(p => {
    const sentences = p.split(/[.!?]+/).filter(Boolean).length;
    if (sentences > 4) {
      longParagraphs++;
    }
  });

  if (longParagraphs === 0 && wordCount > 0) {
    addCheck({
      id: "readability",
      name: "Readability",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Paragraph lengths are short and readable (under 4 sentences per block).",
      recommendation: "Ideal for fast skimming and mobile devices."
    });
  } else if (longParagraphs > 2) {
    addCheck({
      id: "readability",
      name: "Readability",
      status: "warning",
      points: 2,
      maxPoints: 4,
      description: `Found ${longParagraphs} paragraphs containing more than 4 sentences.`,
      recommendation: "Split long paragraphs into shorter 2-3 sentence blocks to make reading easier."
    });
  } else {
    addCheck({
      id: "readability",
      name: "Readability",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Good paragraph readability.",
      recommendation: "Maintains strong user retention."
    });
  }

  // 22. Semantic Coverage (Max 4 pts)
  const questionHeadings = (content.match(/^##+\s+(?:What|Why|How|Can|Is|Which|Who|Where)\b.+$/gim) || []).length;
  if (questionHeadings >= 2) {
    addCheck({
      id: "semantic-coverage",
      name: "Semantic Coverage",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: `Found ${questionHeadings} question-based headings (AEO friendly).`,
      recommendation: "Great for capturing direct questions asked in search voice and chat engines."
    });
  } else {
    addCheck({
      id: "semantic-coverage",
      name: "Semantic Coverage",
      status: "warning",
      points: 1,
      maxPoints: 4,
      description: "Few question-based headings found in subheadings.",
      recommendation: "Rephrase H2 subheadings as direct questions (e.g. 'What is Social Engineering?' instead of 'Social Engineering Overview')."
    });
  }

  // 23. AI Readiness / GEO (Max 4 pts)
  const hasLists = content.includes("\n- ") || content.includes("\n* ") || /^\d+\.\s/m.test(content);
  const hasBold = content.includes("**");
  
  if (hasLists && hasBold) {
    addCheck({
      id: "ai-readiness",
      name: "AI & Generative Engine Readiness",
      status: "success",
      points: 4,
      maxPoints: 4,
      description: "Content makes strong use of bullet/numbered lists and bold definitions.",
      recommendation: "Helps LLMs index and summarize key takeaways accurately."
    });
  } else {
    addCheck({
      id: "ai-readiness",
      name: "AI & Generative Engine Readiness",
      status: "warning",
      points: 1,
      maxPoints: 4,
      description: "Missing lists or bold text keywords.",
      recommendation: "Format core definitions in bold, and bullet points to outline steps or metrics."
    });
  }

  // Calculate final score based on points earned out of possible 100
  // Adjust sum of all points to 100 max
  score = Math.min(100, score);
  
  return {
    score,
    checks
  };
}
