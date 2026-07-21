"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const slugger = new GithubSlugger();
    // Preprocess content to ensure headings without spaces (e.g., ##Heading) are parsed properly
    const normalizedContent = content ? content.replace(/^(#{2,3})([^\s#].*)$/gm, "$1 $2") : "";
    
    // Match h2 and h3 headings in markdown
    const headingRegex = /^(#{2,3})\s+(.*)$/gm;
    const matches = normalizedContent.match(headingRegex) || [];
    
    const parsedHeadings = matches.map((match) => {
      const level = match.startsWith("###") ? 3 : 2;
      const text = match.replace(/^(#{2,3})\s+/, "").trim();
      return {
        text,
        level,
        id: slugger.slug(text),
      };
    });

    setHeadings(parsedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all headings that are currently intersecting/visible
        const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
        if (visibleHeadings.length > 0) {
          // Highlight the first visible heading
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px", // Trigger when heading enters the top portion of viewport
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    // Fallback if scrolled to top
    const handleScroll = () => {
      if (window.scrollY < 100 && headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-wrapper">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Table of Contents</h4>
      <div className="relative border-l border-slate-100 dark:border-slate-800 ml-1">
        <ul className="space-y-3.5 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: heading.level === 3 ? "24px" : "12px" }}
                className="relative group"
              >
                {/* Active side indicator */}
                {isActive && (
                  <span className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary rounded-full transition-all duration-300" />
                )}
                
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setActiveId(heading.id);
                  }}
                  className={`block transition-colors duration-200 text-left leading-snug ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-medium"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default TableOfContents;
