"use client";

import { useState, useEffect } from "react";
import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "../app/helper/MDXContent";
import Link from "next/link";
import Image from "next/image";
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Share from "./components/Share";
import TableOfContents from "./components/TableOfContents";
import Post from "./partials/Post";
import SeoMeta from "./partials/SeoMeta";
import { analyzeArticle } from "@lib/seoAnalyzer";

const PostSingle = ({ frontmatter, content, recentPosts, slug }) => {
  let { description, title, date, lastUpdatedDate, image, imageAlt, author, categories, primaryKeyword, sources, disableAutoLinking } = frontmatter;
  description = description ? description : content.slice(0, 120);

  // States for Reading Experience
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isSeoPanelOpen, setIsSeoPanelOpen] = useState(false);

  // Calculate scrolling progress and floating back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Automatically link key phrases inside content to solutions, tools, and arcade
  const autoLinkContent = (text) => {
    if (!text) return text;
    
    const KEYWORD_LINKS = config.keyword_links || [];

    let placeholders = [];
    let placeholderCounter = 0;
    
    // Extract markdown links to avoid nesting links
    let processedText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, (match) => {
      const key = `___MDLINK_${placeholderCounter++}___`;
      placeholders.push({ key, value: match });
      return key;
    });

    // Extract HTML/JSX tags to avoid matching keywords in tag parameters
    processedText = processedText.replace(/<[^>]+>/g, (match) => {
      const key = `___JSXTAG_${placeholderCounter++}___`;
      placeholders.push({ key, value: match });
      return key;
    });

    // Replace first occurrence of each keyword group
    KEYWORD_LINKS.forEach(({ keywords, url }) => {
      const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
      for (let kw of sortedKeywords) {
        const regex = new RegExp(`\\b(${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})\\b`, 'i');
        if (regex.test(processedText)) {
          processedText = processedText.replace(regex, `[$1](${url})`);
          break; // Link once per post
        }
      }
    });

    // Restore tags and links
    for (let i = placeholders.length - 1; i >= 0; i--) {
      const { key, value } = placeholders[i];
      processedText = processedText.replace(key, value);
    }

    return processedText;
  };

  // Automatically insert Book Demo CTA approximately halfway through the article
  const getParsedContent = (originalContent) => {
    let linkedContent = disableAutoLinking ? originalContent : autoLinkContent(originalContent);
    if (linkedContent.includes("<BookDemo />") || linkedContent.includes("<BookDemo")) {
      return linkedContent;
    }
    const paragraphs = linkedContent.split("\n\n");
    if (paragraphs.length <= 4) {
      return linkedContent + "\n\n<BookDemo />\n";
    }
    const middleIndex = Math.floor(paragraphs.length / 2);
    paragraphs.splice(middleIndex, 0, "<BookDemo />");
    return paragraphs.join("\n\n");
  };

  const parsedContent = getParsedContent(content);
  const wordCount = content.split(" ").length;

  // Run SEO and AI audit analysis
  const seoAnalysis = analyzeArticle({
    title,
    content: parsedContent,
    frontmatter,
    slug
  });

  // Calculate Previous / Next Post
  const currentPostIndex = recentPosts.findIndex(p => p.slug === slug);
  const nextPost = currentPostIndex !== -1 && recentPosts[(currentPostIndex + 1) % recentPosts.length];
  const prevPost = currentPostIndex !== -1 && recentPosts[(currentPostIndex - 1 + recentPosts.length) % recentPosts.length];

  // Default author details for E-E-A-T trust validation
  const authorData = {
    name: author?.name || "Derick C.",
    avatar: author?.avatar || "/images/author/derick.jpg",
    bio: author?.bio || "Technical Lead & Cybersecurity Research Specialist at Innvikta, helping organizations build robust human security awareness and minimize threat vectors.",
    twitter: author?.twitter || "https://twitter.com/innvikta",
    linkedin: author?.linkedin || "https://linkedin.com/company/innvikta"
  };

  // Default sources if not provided in frontmatter
  const defaultSources = sources || [
    { name: "Verizon Data Breach Investigations Report (DBIR) 2024", link: "https://www.verizon.com/business/resources/reports/dbir/" },
    { name: "FBI Internet Crime Report (IC3)", link: "https://www.ic3.gov/" },
    { name: "APWG Phishing Activity Trends Report", link: "https://docs.apwg.org/" }
  ];

  return (
    <>
      <SeoMeta 
        title={title} 
        description={description} 
        image={image} 
        frontmatter={frontmatter} 
        content={parsedContent} 
      />
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[5px] bg-[#f15a24] z-[9999] transition-all duration-75" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* Floating Analyzer Badge */}
      <button
        onClick={() => setIsSeoPanelOpen(!isSeoPanelOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[45] bg-[#1e293b] text-white hover:bg-slate-900 px-3.5 py-5 rounded-r-2xl shadow-xl flex flex-col items-center gap-1.5 border border-l-0 border-slate-700 transition-all active:scale-95 group"
      >
        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 group-hover:text-primary">SEO & AI</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 ${
          seoAnalysis.score >= 80 ? "border-green-500 text-green-400" :
          seoAnalysis.score >= 50 ? "border-amber-500 text-amber-400" : "border-red-500 text-red-400"
        }`}>
          {seoAnalysis.score}
        </div>
      </button>

      {/* Slide-out CMS SEO & AI Analysis Panel Drawer */}
      {isSeoPanelOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex justify-end" onClick={() => setIsSeoPanelOpen(false)}>
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-fade-in relative z-10 text-left border-l border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">CMS SEO & AI Analyzer</h3>
                <p className="text-xs text-slate-400 font-medium">Real-time search engine scoring report</p>
              </div>
              <button 
                onClick={() => setIsSeoPanelOpen(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Score Ring Display */}
            <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
              <div className={`w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-xl font-black border-4 ${
                seoAnalysis.score >= 80 ? "border-green-500 text-green-600 bg-green-50" :
                seoAnalysis.score >= 50 ? "border-amber-500 text-amber-600 bg-amber-50" : "border-red-500 text-red-600 bg-red-50"
              }`}>
                {seoAnalysis.score}
              </div>
              <div>
                <div className="text-xs font-black uppercase text-slate-400">Total Quality Score</div>
                <div className="text-sm font-bold text-slate-800">
                  {seoAnalysis.score >= 80 ? "Fully Optimized for Search & AI!" :
                   seoAnalysis.score >= 50 ? "Needs minor optimization adjustments" : "Substantial content enhancements required"}
                </div>
              </div>
            </div>

            {/* Failed & Passed Audit Checks Accordion list */}
            <div className="space-y-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Optimization Audit Checklist</div>
              {seoAnalysis.checks.map((check, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 shrink-0">
                      {check.status === "success" && (
                        <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] font-black">✓</span>
                      )}
                      {check.status === "warning" && (
                        <span className="w-4 h-4 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] font-black">!</span>
                      )}
                      {check.status === "error" && (
                        <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-[10px] font-black">✗</span>
                      )}
                      {check.status === "info" && (
                        <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">?</span>
                      )}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{check.name} ({check.points}/{check.maxPoints} pts)</div>
                      <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{check.description}</p>
                      {check.status !== "success" && (
                        <div className="mt-1 text-[11px] font-medium text-primary bg-orange-50 px-2 py-1 rounded border border-orange-100/50">
                          <strong>Rec:</strong> {check.recommendation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#f15a24] hover:bg-[#c2410c] text-white p-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center border border-white/10"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      )}

      <section className="section pt-0">
        <div className="container">
          <article>
            {/* Hero Section */}
            <div className="row justify-center mt-10 mb-10">
              <div className="lg:col-10">
                {image && (
                  <figure className="relative w-full overflow-hidden rounded-2xl border border-slate-100">
                    <Image
                      src={image}
                      height="700"
                      width="1120"
                      alt={imageAlt || title}
                      priority={true}
                      className="fade w-full rounded-2xl object-cover"
                    />
                    {imageAlt && (
                      <figcaption className="block text-center text-xs text-slate-400 mt-3 italic">
                        {imageAlt}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            </div>

            <div className="row justify-center">
              {/* Left Sidebar: Sticky TOC & Share */}
              <aside className="hidden lg:block lg:col-3 pr-8">
                <div className="sticky top-36 self-start flex flex-col gap-10">
                  <TableOfContents content={parsedContent} />
                  
                  {/* Reading statistics card */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Metrics</h4>
                    <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <span>🕒 {readingTime(parsedContent)}</span>
                      <span>•</span>
                      <span>📖 {wordCount} words</span>
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Share Article</h4>
                    <Share
                      title={title}
                      description={description}
                      slug={`blog/${slug}`}
                      className="flex gap-4 text-xl text-slate-400 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary"
                    />
                    
                    {/* Copy Link Button */}
                    <button 
                      onClick={handleCopyLink} 
                      className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-slate-50 hover:bg-orange-50 px-3 py-2 rounded-xl border border-slate-100"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                      {isCopied ? "Link Copied!" : "Copy URL"}
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="col-12 lg:col-7">
                <header className="mb-6">
                  {markdownify(title, "h1", "font-black leading-tight text-3xl md:text-5xl text-slate-900")}
                  
                  {/* Author Details and dates */}
                  <div className="mt-6 flex items-center mb-8 border-b border-slate-100 pb-6">
                    <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary shrink-0">
                      <ImageFallback
                        src={authorData.avatar}
                        width={50}
                        height={50}
                        alt={authorData.name}
                      />
                    </div>
                    <div className="pl-4">
                      <p className="font-bold text-slate-900 leading-none mb-1.5">{authorData.name}</p>
                      <p className="text-xs text-slate-500">
                        Published: {dateFormat(date)}
                        {lastUpdatedDate && ` (Updated: ${dateFormat(lastUpdatedDate)})`}
                        <span> • {readingTime(parsedContent)}</span>
                      </p>
                    </div>
                  </div>
                </header>

                {/* Mobile Share */}
                <div className="block lg:hidden mb-8 border-y py-3.5 border-slate-100 flex items-center justify-between">
                  <Share
                    title={title}
                    description={description}
                    slug={`blog/${slug}`}
                    className="flex gap-5 text-2xl text-slate-400 justify-start"
                  />
                  <button 
                    onClick={handleCopyLink} 
                    className="text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-slate-50 hover:bg-orange-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5"
                  >
                    {isCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>

                {/* Article content block */}
                <section className="content text-left">
                  <MDXContent content={parsedContent} />
                </section>

                {/* Sources & References component */}
                {defaultSources && defaultSources.length > 0 && (
                  <section className="sources-section border-t border-slate-150 pt-8 mt-12">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-widest mb-4">Sources & References</h3>
                    <ul className="space-y-2 list-none p-0 m-0">
                      {defaultSources.map((source, idx) => (
                        <li key={idx} className="text-sm font-medium text-slate-500 flex items-start gap-2">
                          <span className="text-primary mt-0.5">🔗</span>
                          <a href={source.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline text-slate-600 transition-colors">
                            {source.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Previous / Next Navigation Row */}
                <nav className="flex justify-between items-center border-t border-slate-100 py-8 my-8 gap-4" aria-label="Article navigation">
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col text-left max-w-[48%]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Previous Article</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{prevPost.frontmatter.title}</span>
                    </Link>
                  ) : <div />}
                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col text-right max-w-[48%]">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Next Article</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{nextPost.frontmatter.title}</span>
                    </Link>
                  ) : <div />}
                </nav>

                {/* Author Information Box */}
                <footer className="author-box border border-slate-100 bg-slate-50/50 rounded-3xl p-6 md:p-8 mt-10 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-md shrink-0 w-[80px] h-[80px]">
                    <ImageFallback
                      src={authorData.avatar}
                      width={80}
                      height={80}
                      alt={authorData.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg font-black text-slate-900 mb-2">Written By {authorData.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">{authorData.bio}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      {authorData.twitter && (
                        <a href={authorData.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors text-xs font-bold flex items-center gap-1">
                          🐦 Twitter
                        </a>
                      )}
                      {authorData.linkedin && (
                        <a href={authorData.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0a66c2] transition-colors text-xs font-bold flex items-center gap-1">
                          💼 LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </article>

          {/* Related Products / Solutions / Free Tools Links */}
          <div className="border-t border-slate-100 pt-12 mt-12 text-left">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Recommended Products & Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:border-primary/20 transition-all">
                <span className="text-2xl mb-3 block">🛡️</span>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Phishing Simulation</h4>
                <p className="text-xs text-slate-500 mb-4 font-medium">Deliver realistic phishing attacks and simulations to measure user risks.</p>
                <Link href="/solutions/phishing-simulation" className="text-xs font-black text-primary hover:underline">Explore Solution →</Link>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:border-primary/20 transition-all">
                <span className="text-2xl mb-3 block">🎮</span>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Innvikta Arcade</h4>
                <p className="text-xs text-slate-500 mb-4 font-medium">Interactive games to build cybersecurity awareness with positive retention.</p>
                <Link href="/cyber-arcade" className="text-xs font-black text-primary hover:underline">Explore Arcade →</Link>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:border-primary/20 transition-all">
                <span className="text-2xl mb-3 block">🔍</span>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Domain Analyzer</h4>
                <p className="text-xs text-slate-500 mb-4 font-medium">Verify your email and domain status against public security spoof threats.</p>
                <Link href="/freetools/domain-security-analyzer" className="text-xs font-black text-primary hover:underline">Use Free Tool →</Link>
              </div>
            </div>
          </div>

          {/* Related Articles Footer list */}
          <div className="section mt-16 text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide text-center mb-10">Related Articles</h2>
            <div className="row justify-center">
              {recentPosts.slice(0, 3).map((post, index) => (
                <div key={"post-" + index} className="animate lg:col-4">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>

          <Cta />
        </div>
      </section>

      <Cta />
    </>
  );
};

export default PostSingle;
