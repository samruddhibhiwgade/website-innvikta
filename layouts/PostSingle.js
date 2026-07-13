import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "../app/helper/MDXContent";
import Link from "next/link";
import Image from "next/image";
import ImageFallback from "./components/ImageFallback";
import Share from "./components/Share";
import TableOfContents from "./components/TableOfContents";
import Post from "./partials/Post";
import PostSingleClientControls from "./components/PostSingleClientControls";
import SeoMeta from "./partials/SeoMeta";
import { analyzeArticle } from "@lib/seoAnalyzer";

const PostSingle = ({ frontmatter, content, recentPosts, slug }) => {
  let { description, title, date, lastUpdatedDate, image, imageAlt, author, categories, primaryKeyword, sources, disableAutoLinking } = frontmatter;
  description = description ? description : content.slice(0, 120);



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
      
      <PostSingleClientControls seoAnalysis={seoAnalysis} />

      <section className="section pt-0">
        <div className="container">
          <article>
            {/* Hero Section */}
            <div className="row justify-center mt-10 mb-10">
              <div className="lg:col-10">
                {image && (
                  <figure className="relative w-full overflow-hidden rounded-2xl border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={imageAlt || title}
                      className="fade w-full rounded-2xl object-cover"
                      style={{ maxHeight: "700px", width: "100%" }}
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
                  



                  <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Share Article</h4>
                    <Share
                      title={title}
                      description={description}
                      slug={`blog/${slug}`}
                      className="flex gap-4 text-xl text-slate-400 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary"
                    />
                    

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

                </div>

                {/* Article content block */}
                <section className="content text-left">
                  <MDXContent content={parsedContent} />
                </section>

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


              </div>
            </div>
          </article>



          {/* Related Articles Footer list */}
          <div className="section mt-16 text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide text-center mb-4">Related Articles</h2>
            {/* Centered short orange line below title */}
            <div className="w-[50px] h-[5px] bg-[#f15a24] rounded-full mx-auto mb-12" />
            <div className="row justify-center">
              {recentPosts.slice(0, 3).map((post, index) => (
                <div key={"post-" + index} className="animate lg:col-4 flex flex-col">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
