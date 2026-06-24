"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { FiSearch, FiArrowRight, FiClock, FiCalendar, FiEye, FiShield, FiLock, FiTerminal, FiGlobe, FiCpu, FiAlertTriangle } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaFacebookF, FaLink, FaEnvelope } from "react-icons/fa";

const BlogPageClient = ({ initialPosts, title }) => {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  const categories = [
    "All Articles",
    "Phishing",
    "Security Awareness Training",
    "Social Engineering",
    "Deepfake",
    "AI",
  ];

  // Helper to get categories for a post
  const getPostCategories = (post) => {
    return post.frontmatter.categories || [];
  };

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All Articles" ||
        getPostCategories(post).some(
          (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
        );

      // Search filter
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getPostCategories(post).some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  // Is filtering active?
  const isFiltering = activeCategory !== "All Articles" || searchQuery.trim() !== "";

  // Dynamic layout calculation for default state
  const { leftPosts, featuredPost, bottomPosts } = useMemo(() => {
    if (isFiltering || initialPosts.length < 3) {
      return { leftPosts: [], featuredPost: null, bottomPosts: [] };
    }
    // Asymmetric layout: Left column (2 stacked cards), Right column (Featured card)
    const featured = initialPosts[0];
    const left = initialPosts.slice(1, 3);
    const bottom = initialPosts.slice(3);

    return {
      featuredPost: featured,
      leftPosts: left,
      bottomPosts: bottom,
    };
  }, [initialPosts, isFiltering]);

  // Rendering a small vertical stacked card
  const renderSmallCard = (post) => {
    const postCats = getPostCategories(post);
    return (
      <div
        key={post.slug}
        className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 h-full justify-between"
      >
        <div className="space-y-3">
          {post.frontmatter.image && (
            <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl">
              <ImageFallback
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover"
              />
            </Link>
          )}
          <div className="flex flex-wrap gap-1.5">
            {postCats.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-extrabold uppercase tracking-wider text-[#f15a24] bg-orange-50 px-2 py-0.5 rounded-md"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-base font-bold text-slate-800 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </h3>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-50 text-[11px] text-slate-400 font-semibold">
          <span className="flex items-center gap-1">
            <FiCalendar className="text-[#f15a24]" />
            {dateFormat(post.frontmatter.date)}
          </span>
          <span className="flex items-center gap-1">
            <FiClock className="text-[#f15a24]" />
            {readingTime(post.content)}
          </span>
        </div>
      </div>
    );
  };

  // Rendering standard card for grid/bottom layout
  const renderStandardCard = (post) => {
    const postCats = getPostCategories(post);
    return (
      <div
        key={post.slug}
        className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 h-full justify-between"
      >
        <div className="space-y-4">
          {post.frontmatter.image && (
            <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl">
              <ImageFallback
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={400}
                height={240}
                className="w-full h-[180px] object-cover"
              />
            </Link>
          )}
          <div className="flex flex-wrap gap-1.5">
            {postCats.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-extrabold uppercase tracking-wider text-[#f15a24] bg-orange-50 px-2 py-0.5 rounded-md"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-black text-slate-800 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50">
          <div className="flex items-center gap-3">
            {post.frontmatter.author?.avatar && (
              <ImageFallback
                src={post.frontmatter.author.avatar}
                alt={post.frontmatter.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-xs font-bold text-slate-850 leading-none">
                {post.frontmatter.author?.name}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">
                {dateFormat(post.frontmatter.date)}
              </p>
            </div>
          </div>
          <span className="text-[10.5px] text-[#f15a24] font-bold bg-orange-50/50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <FiClock className="text-xs" /> {readingTime(post.content)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Orange Theme Hero Section */}
      <section className="relative bg-[#f15a24] pt-12 pb-12 overflow-hidden text-white">
        {/* Decorative background grid, glowing circles, and floating cybersecurity icons */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          {/* Radial Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)", backgroundSize: "32px 32px" }} />
          
          {/* Cyber Watermark Elements */}
          <FiShield className="absolute top-6 left-[10%] text-white text-[7rem] rotate-12 opacity-15" />
          <FiLock className="absolute bottom-4 right-[12%] text-white text-[6rem] -rotate-12 opacity-15" />
          <FiTerminal className="absolute top-1/2 left-[45%] text-white text-[5rem] rotate-6 opacity-10" />
          <FiGlobe className="absolute top-4 right-[25%] text-white text-[4rem] opacity-15" />
          <FiCpu className="absolute bottom-2 left-[25%] text-white text-[4.5rem] opacity-10" />
          <FiAlertTriangle className="absolute top-1/2 right-[5%] text-white text-[3rem] opacity-15" />

          {/* Gradients */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white blur-[120px] opacity-40" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-300 blur-[100px] opacity-50" />
        </div>

        <div className="container relative z-10 px-4 md:px-8">
          {/* Top row: Social Share Align Right */}
          <div className="flex justify-end mb-6">
            {/* Social Share Box */}
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white shadow-sm">
              <button className="hover:text-orange-200 transition-colors" title="Share on Twitter"><FaTwitter className="text-sm" /></button>
              <span className="w-px h-4 bg-white/20" />
              <button className="hover:text-orange-200 transition-colors" title="Share on LinkedIn"><FaLinkedin className="text-sm" /></button>
              <span className="w-px h-4 bg-white/20" />
              <button className="hover:text-orange-200 transition-colors" title="Share on Facebook"><FaFacebookF className="text-sm" /></button>
              <span className="w-px h-4 bg-white/20" />
              <button className="hover:text-orange-200 transition-colors" title="Copy Link"><FaLink className="text-xs" /></button>
              <span className="w-px h-4 bg-white/20" />
              <button className="hover:text-orange-200 transition-colors" title="Share via Email"><FaEnvelope className="text-sm" /></button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-secondary font-black tracking-tight leading-none text-white border-b-4 border-white pb-3 inline-block">
              The Innvikta Blog
            </h1>
            <p className="text-sm md:text-lg text-white/95 font-medium leading-relaxed max-w-2xl pt-1">
              Catch up on human risk intelligence, phishing simulation trends, security awareness training best practices, compliance standards, and Innvikta product updates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="section bg-white pt-12 pb-24">
        <div className="container px-4 md:px-8">
        {/* Category Navigation Bar & Search Strip */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between border border-slate-100 rounded-xl overflow-hidden mb-12 shadow-sm bg-slate-50/50">
          {/* Categories Tab Strip */}
          <div className="flex flex-wrap items-stretch flex-1 overflow-x-auto no-scrollbar scroll-smooth divide-x divide-slate-100 border-b md:border-b-0 border-slate-100">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-4 text-xs font-extrabold uppercase tracking-wider transition-all relative flex items-center justify-center shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-900 border-t-[3px] border-[#f15a24]"
                      : "bg-transparent text-slate-500 hover:text-[#f15a24] hover:bg-white/40"
                  }`}
                  style={{
                    borderTopColor: isActive ? "#f15a24" : "transparent",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Bar Container */}
          <div className="p-3 md:p-0 md:pr-4 flex items-center w-full md:w-80 shrink-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-semibold"
              />
              <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Heading Section */}
        <div className="mb-12 text-left">
          <span className="text-base font-secondary font-medium uppercase tracking-[0.05em] text-[#f15a24]">
            The Innvikta Blog
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-secondary font-medium leading-[1.1] tracking-[-0.02em] text-slate-900 mt-3">
            Human risk, phishing, and security insights.
          </h2>
        </div>

        {/* Dynamic Layout Rendering */}
        {isFiltering ? (
          /* Filtered state: display matching items in a clean responsive grid */
          filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 border border-slate-100 rounded-3xl">
              <p className="text-slate-400 text-base font-semibold">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Articles");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 bg-[#f15a24] text-white font-extrabold text-xs rounded-full uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => renderStandardCard(post))}
            </div>
          )
        ) : (
          /* Default state: asymmetric Prismic layout */
          <div className="space-y-12">
            {/* Asymmetric Core Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stacked smaller cards */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                {leftPosts.map((post) => renderSmallCard(post))}
              </div>

              {/* Center/Right Column: Huge Featured Post */}
              {featuredPost && (
                <div className="lg:col-span-9">
                  <div className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-6 w-full">
                    <div className="space-y-4">
                      {featuredPost.frontmatter.image && (
                        <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl relative">
                          <span className="absolute top-4 left-4 bg-[#f15a24] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md z-10">
                            Featured
                          </span>
                          <ImageFallback
                            src={featuredPost.frontmatter.image}
                            alt={featuredPost.frontmatter.title}
                            width={750}
                            height={440}
                            className="w-full h-[320px] md:h-[400px] object-cover"
                          />
                        </Link>
                      )}
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {getPostCategories(featuredPost).map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] font-extrabold uppercase tracking-wider text-[#f15a24] bg-orange-50 px-2.5 py-1 rounded-md"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.frontmatter.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {featuredPost.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
                      <div className="flex items-center gap-3.5">
                        {featuredPost.frontmatter.author?.avatar && (
                          <ImageFallback
                            src={featuredPost.frontmatter.author.avatar}
                            alt={featuredPost.frontmatter.author.name}
                            width={38}
                            height={38}
                            className="rounded-full object-cover border border-slate-100"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-850 leading-none">
                            {featuredPost.frontmatter.author?.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold mt-1">
                            {dateFormat(featuredPost.frontmatter.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                          <FiEye /> 1,462 views
                        </span>
                        <span className="text-[11px] text-[#f15a24] font-black bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <FiClock className="text-xs" /> {readingTime(featuredPost.content)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="border-t border-slate-100 my-16" />

            {/* Bottom Grid: Rest of the posts */}
            {bottomPosts.length > 0 && (
              <div className="space-y-8">
                <h4 className="text-lg font-black text-slate-800 tracking-tight font-secondary">
                  More From the Blog
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {bottomPosts.map((post) => renderStandardCard(post))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  </>
  );
};

export default BlogPageClient;
