"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FiPlus, FiEdit, FiTrash2, FiFileText, FiSave, FiX, FiCheck, 
  FiAlertCircle, FiBold, FiItalic, FiLink, FiImage, FiList, 
  FiEye, FiTrendingUp, FiSearch, FiUploadCloud
} from "react-icons/fi";

const AVAILABLE_CATEGORIES = [
  "Phishing",
  "Security Awareness Training",
  "Social Engineering",
  "Deepfake",
  "AI"
];

export default function AdminBlogPanel() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list"); // list, write
  const [editorTab, setEditorTab] = useState("edit"); // edit, preview
  
  const [formData, setFormData] = useState({
    filename: "",
    title: "",
    content: "",
    categories: [],
    authorName: "Derick C.",
    image: "",
    date: "",
    draft: false,
    metaDescription: "", 
  });
  
  // Custom states for uploading & alt text
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImageFile, setInlineImageFile] = useState(null);
  const [inlineImageAlt, setInlineImageAlt] = useState("");
  const [isUploadingInline, setIsUploadingInline] = useState(false);

  // FAQ Modal States
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqPasteText, setFaqPasteText] = useState("");
  const [faqTitle, setFaqTitle] = useState("Frequently Asked Questions");
  const [faqSubtitle, setFaqSubtitle] = useState("");

  // Key Takeaways Modal States
  const [showTakeawaysModal, setShowTakeawaysModal] = useState(false);
  const [takeawaysTitle, setTakeawaysTitle] = useState("Key Takeaways");
  const [takeawaysPasteText, setTakeawaysPasteText] = useState("");
  const [takeawaysType, setTakeawaysType] = useState("bullet"); // bullet, number, roman

  const [focusKeyphrase, setFocusKeyphrase] = useState("");
  const [seoReport, setSeoReport] = useState([]);
  const [notification, setNotification] = useState(null);
  const textareaRef = useRef(null);

  // Fetch blogs on load
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      showNotification("error", "Failed to load blog posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run SEO audit
  useEffect(() => {
    runSeoAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.content, formData.title, formData.metaDescription, focusKeyphrase]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  // Upload Cover Image handler
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingCover(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        showNotification("success", "Cover image uploaded successfully!");
      } else {
        showNotification("error", data.error || "Failed to upload cover image.");
      }
    } catch (err) {
      showNotification("error", "Error uploading file.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Handle uploading and inserting inline image
  const handleInsertInlineImage = async (e) => {
    e.preventDefault();
    if (!inlineImageFile) {
      showNotification("error", "Please select an image file first.");
      return;
    }

    setIsUploadingInline(true);
    const uploadData = new FormData();
    uploadData.append("file", inlineImageFile);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        const altText = inlineImageAlt || "Inline Image";
        const imageMarkdown = `![${altText}](${data.url})`;
        
        // Insert markdown tag at cursor
        const textarea = textareaRef.current;
        if (textarea) {
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;
          const originalText = textarea.value;
          const newText = originalText.substring(0, startPos) + imageMarkdown + originalText.substring(endPos);
          setFormData((prev) => ({ ...prev, content: newText }));
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(startPos + imageMarkdown.length, startPos + imageMarkdown.length);
          }, 50);
        }

        setShowImageModal(false);
        setInlineImageFile(null);
        setInlineImageAlt("");
        showNotification("success", "Image inserted successfully!");
      } else {
        showNotification("error", data.error || "Failed to upload image.");
      }
    } catch (err) {
      showNotification("error", "Error uploading image.");
    } finally {
      setIsUploadingInline(false);
    }
  };

  // Insert markdown tag helper at cursor
  const insertMarkdown = (syntax, placeholder = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const originalText = textarea.value;
    const selectedText = originalText.substring(startPos, endPos) || placeholder;

    let replacement = "";
    if (syntax === "bold") replacement = `**${selectedText}**`;
    else if (syntax === "italic") replacement = `*${selectedText}*`;
    else if (syntax === "h1") replacement = `\n# ${selectedText}\n`;
    else if (syntax === "h2") replacement = `\n## ${selectedText}\n`;
    else if (syntax === "h3") replacement = `\n### ${selectedText}\n`;
    else if (syntax === "h4") replacement = `\n#### ${selectedText}\n`;
    else if (syntax === "h5") replacement = `\n##### ${selectedText}\n`;
    else if (syntax === "h6") replacement = `\n###### ${selectedText}\n`;
    else if (syntax === "list") replacement = `\n- ${selectedText}`;
    else if (syntax === "link") {
      const url = prompt("Enter URL:", "https://");
      if (url === null) return;
      replacement = `[${selectedText}](${url})`;
    }
    else if (syntax === "demo") {
      replacement = `\n<BookDemo />\n`;
    }
    else if (syntax === "faq") {
      replacement = `\n<FAQ title="Frequently Asked Questions" subtitle="Find answers to common questions about the platform.">\n  <Accordion title="Enter FAQ Question 1 Here">\n    Enter FAQ Answer 1 here...\n  </Accordion>\n  <Accordion title="Enter FAQ Question 2 Here">\n    Enter FAQ Answer 2 here...\n  </Accordion>\n</FAQ>\n`;
    }
    else if (syntax === "quote") {
      replacement = `\n<Blockquote name="Author/Speaker Name">\nEnter quote content here...\n</Blockquote>\n`;
    }

    const newText = originalText.substring(0, startPos) + replacement + originalText.substring(endPos);
    setFormData((prev) => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(startPos + replacement.length, startPos + replacement.length);
    }, 50);
  };

  // Convert pasted Q&As into structured FAQ and Accordion shortcodes
  const handleInsertParsedFaq = () => {
    if (!faqPasteText.trim()) return;
    
    const lines = faqPasteText.split("\n");
    const items = [];
    let currentQuestion = "";
    let currentAnswerLines = [];

    const saveCurrentItem = () => {
      if (currentQuestion.trim()) {
        items.push({
          question: currentQuestion.trim(),
          answer: currentAnswerLines.join("\n").trim()
        });
      }
    };

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Smart check if line is a question:
      // - Starts with Q: / Q. / Question: / Question 1:
      // - Starts with list number like 1. / 2)
      // - Ends with a question mark "?"
      const isQuestionMarker = /^(?:Q|q|Question|question)\s*[:\.]/i.test(trimmed) || 
                               /^\d+[\.\)]\s+/i.test(trimmed) || 
                               trimmed.endsWith("?");

      if (isQuestionMarker) {
        saveCurrentItem();
        
        let cleanQuestion = trimmed
          .replace(/^(?:Q|q|Question|question)\s*[:\.]\s*/i, "")
          .replace(/^\d+[\.\)]\s*/i, "");
        
        currentQuestion = cleanQuestion;
        currentAnswerLines = [];
      } else {
        if (currentQuestion) {
          let cleanAnswer = trimmed.replace(/^(?:A|a|Answer|answer)\s*[:\.]\s*/i, "");
          currentAnswerLines.push(cleanAnswer);
        } else {
          currentQuestion = trimmed;
        }
      }
    }
    saveCurrentItem();

    // Construct shortcode structure
    let mdx = `\n<FAQ title="${faqTitle}"${faqSubtitle ? ` subtitle="${faqSubtitle}"` : ""}>\n`;
    items.forEach(item => {
      mdx += `  <Accordion title="${item.question}">\n    ${item.answer.replace(/\n/g, "\n    ")}\n  </Accordion>\n`;
    });
    mdx += `</FAQ>\n`;

    const textarea = textareaRef.current;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const originalText = textarea.value;
      const newText = originalText.substring(0, startPos) + mdx + originalText.substring(endPos);
      setFormData((prev) => ({ ...prev, content: newText }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + mdx.length, startPos + mdx.length);
      }, 50);
    }

    // Reset and close modal
    setFaqPasteText("");
    setFaqTitle("Frequently Asked Questions");
    setFaqSubtitle("");
    setShowFaqModal(false);
  };

  // Convert pasted takeaway points into KeyTakeaways shortcode card layout
  const handleInsertParsedTakeaways = () => {
    if (!takeawaysPasteText.trim()) return;

    const lines = takeawaysPasteText.split("\n");
    const points = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Strip bullet points like -, *, +, 1., a)
      const cleanPoint = trimmed
        .replace(/^(?:-|\*|\+)\s*/, "")
        .replace(/^\d+[\.\)]\s*/, "")
        .replace(/^[a-zA-Z][\.\)]\s*/, "");

      if (cleanPoint.trim()) {
        points.push(cleanPoint.trim());
      }
    }

    if (points.length === 0) return;

    let mdx = `\n<KeyTakeaways title="${takeawaysTitle}"${takeawaysType !== "bullet" ? ` type="${takeawaysType}"` : ""}>\n\n`;
    points.forEach((point, idx) => {
      if (takeawaysType === "bullet") {
        mdx += `- ${point}\n\n`;
      } else {
        mdx += `${idx + 1}. ${point}\n\n`;
      }
    });
    mdx += `</KeyTakeaways>\n`;

    const textarea = textareaRef.current;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const originalText = textarea.value;
      const newText = originalText.substring(0, startPos) + mdx + originalText.substring(endPos);
      setFormData((prev) => ({ ...prev, content: newText }));
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + mdx.length, startPos + mdx.length);
      }, 50);
    }

    // Reset state and close modal
    setTakeawaysTitle("Key Takeaways");
    setTakeawaysPasteText("");
    setTakeawaysType("bullet");
    setShowTakeawaysModal(false);
  };

  // Real-time Yoast SEO auditor
  const runSeoAudit = () => {
    const checks = [];
    const content = formData.content || "";
    const title = formData.title || "";
    const keyphrase = focusKeyphrase.trim().toLowerCase();

    // 1. Word Count Check
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount === 0) {
      checks.push({ id: "wc", label: "Content length: Write some content to begin analysis.", status: "error" });
    } else if (wordCount < 300) {
      checks.push({ id: "wc", label: `Word count: ${wordCount} words (Under 300 words recommendation).`, status: "warning" });
    } else {
      checks.push({ id: "wc", label: `Word count: ${wordCount} words. Excellent!`, status: "success" });
    }

    if (!keyphrase) {
      checks.push({ id: "kp", label: "Focus Keyphrase: Enter a keyphrase to enable full SEO optimization checks.", status: "info" });
      setSeoReport(checks);
      return;
    }

    // 2. Keyphrase in Title
    if (title.toLowerCase().includes(keyphrase)) {
      checks.push({ id: "title", label: "Focus keyphrase in title: Yes, keyphrase is present.", status: "success" });
    } else {
      checks.push({ id: "title", label: "Focus keyphrase in title: Keyphrase not found. Try including it.", status: "error" });
    }

    // 3. Keyphrase in Introduction (First 100 words)
    const introText = content.split(/\s+/).slice(0, 100).join(" ").toLowerCase();
    if (introText.includes(keyphrase)) {
      checks.push({ id: "intro", label: "Introduction match: Keyphrase appears in the first paragraph.", status: "success" });
    } else {
      checks.push({ id: "intro", label: "Introduction match: Keyphrase is missing in the opening paragraph.", status: "warning" });
    }

    // 4. Density Check
    const occurrences = (content.toLowerCase().match(new RegExp(keyphrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []).length;
    const density = wordCount > 0 ? ((occurrences / wordCount) * 100).toFixed(1) : 0;
    if (occurrences === 0) {
      checks.push({ id: "density", label: "Keyphrase density: The focus keyphrase was found 0 times.", status: "error" });
    } else if (density < 0.5) {
      checks.push({ id: "density", label: `Keyphrase density: Found ${occurrences} times (${density}%). A bit low.`, status: "warning" });
    } else if (density > 2.5) {
      checks.push({ id: "density", label: `Keyphrase density: Found ${occurrences} times (${density}%). Beware of keyword stuffing!`, status: "warning" });
    } else {
      checks.push({ id: "density", label: `Keyphrase density: Found ${occurrences} times (${density}%). Ideal density.`, status: "success" });
    }

    // 5. Image Alt Tag Checks
    const hasImages = content.includes("![");
    if (hasImages) {
      checks.push({ id: "images", label: "Image Alt Tags: Found media links inside the post.", status: "success" });
    } else {
      checks.push({ id: "images", label: "Image Alt Tags: No images added. Consider inserting supportive media.", status: "info" });
    }

    // 6. Link check
    const hasLinks = content.includes("](") && !content.includes("![");
    if (hasLinks) {
      checks.push({ id: "links", label: "Outbound/Internal Links: Great job linking references.", status: "success" });
    } else {
      checks.push({ id: "links", label: "Links: No hyperlinks found. Consider adding context links.", status: "warning" });
    }

    setSeoReport(checks);
  };

  // Generate Table of Contents
  const generateToc = (markdown) => {
    if (!markdown) return [];
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const toc = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      toc.push({ level, text, anchor });
    }
    return toc;
  };

  // Simple Markdown Parser to render Preview HTML
  const parseMarkdownToHtml = (markdown) => {
    if (!markdown) return "";
    let html = markdown;

    // Escaping HTML characters
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headings
    html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-xs font-bold text-slate-800 mt-4 mb-2">$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm font-bold text-slate-800 mt-4 mb-2">$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base font-bold text-slate-900 mt-5 mb-2">$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-3">$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-extrabold text-slate-950 mt-8 mb-4 border-b border-slate-100 pb-2">$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-extrabold text-slate-950 mt-10 mb-6">$1</h1>');

    // Images with custom styling
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-6"><img src="$2" alt="$1" class="w-full h-auto rounded-2xl shadow-md" /><span class="block text-center text-xs text-slate-400 mt-2">$1</span></div>');

    // Hyperlinks
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#f15a24] hover:underline font-bold" target="_blank">$1</a>');

    // Bold & Italic
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // Bullet Lists
    html = html.replace(/^\-\s+(.+)$/gm, '<li class="ml-5 list-disc mb-1">$1</li>');

    // Paragraphs / Line Breaks
    html = html.split(/\n\n+/).map(p => {
      if (p.trim().startsWith('<h') || p.trim().startsWith('<div') || p.trim().startsWith('<li') || p.trim().startsWith('<ul')) {
        return p;
      }
      return `<p class="text-slate-700 leading-relaxed text-sm mb-4">${p.replace(/\n/g, "<br/>")}</p>`;
    }).join("");

    // Render mockup for <BookDemo /> shortcode inside Live Preview
    html = html.replace(/&lt;BookDemo\s*\/?&gt;/g, `
      <div class="my-8 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row text-left">
        <!-- Left panel -->
        <div class="md:w-[40%] bg-gradient-to-br from-[#f15a24] to-[#c2410c] text-white p-6 md:p-8 flex flex-col justify-between shrink-0">
          <div>
            <div class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-wider bg-white/10 rounded-full uppercase border border-white/15">
              HUMAN RISK MANAGEMENT
            </div>
            <h4 class="text-2xl font-extrabold text-white leading-tight mb-4">See Innvikta InSAT in Action</h4>
            <p class="text-xs text-white/90 leading-relaxed font-medium">Explore how our interactive games, realistic phishing simulations, and gamified training modules dramatically reduce organizational human cyber risk.</p>
          </div>
          <div class="mt-8 text-[10px] text-white/70 font-semibold tracking-wider uppercase">© INNVIKTA SECURITY</div>
        </div>

        <!-- Right panel -->
        <div class="md:w-[60%] p-6 md:p-8 bg-white flex-1">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">YOUR DETAILS</span>
            <div class="h-px bg-slate-100 flex-1"></div>
          </div>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">FULL NAME</label>
                <input type="text" disabled placeholder="Jane Smith" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 opacity-75 text-sm font-medium" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CORPORATE EMAIL</label>
                <input type="email" disabled placeholder="jane@yourcompany.com" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 opacity-75 text-sm font-medium" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">COMPANY NAME</label>
                <input type="text" disabled placeholder="Acme Corp" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 opacity-75 text-sm font-medium" />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PHONE NUMBER</label>
                <input type="text" disabled placeholder="98765 43210" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 opacity-75 text-sm font-medium" />
              </div>
            </div>
            <div class="pt-4 flex justify-start">
              <button type="button" disabled class="px-10 py-3.5 bg-[#f15a24] text-white font-bold rounded-full shadow-lg shadow-[#f15a24]/20 text-xs uppercase tracking-wider cursor-not-allowed flex items-center gap-2">
                <span>Book a Demo</span>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `);

    // Render mockup for <FAQ> wrapper shortcode inside Live Preview
    html = html.replace(/&lt;FAQ\s+title="([^"]+)"\s+subtitle="([^"]+)"&gt;([\s\S]*?)&lt;\/FAQ&gt;/g, `
      <div class="my-8 p-6 md:p-8 bg-transparent border border-slate-100/80 rounded-[20px] shadow-sm max-w-3xl mx-auto text-left">
        <div class="mb-6">
          <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 m-0 leading-tight">$1</h3>
          <p class="text-xs md:text-sm text-slate-500 mt-2 m-0 leading-relaxed">$2</p>
          <div class="h-[3px] w-12 bg-[#f15a24] rounded-full mt-4"></div>
        </div>
        <div class="flex flex-col gap-3">
          $3
        </div>
      </div>
    `);

    html = html.replace(/&lt;FAQ\s+title="([^"]+)"\s*&gt;([\s\S]*?)&lt;\/FAQ&gt;/g, `
      <div class="my-8 p-6 md:p-8 bg-transparent border border-slate-100/80 rounded-[20px] shadow-sm max-w-3xl mx-auto text-left">
        <div class="mb-6">
          <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 m-0 leading-tight">$1</h3>
          <div class="h-[3px] w-12 bg-[#f15a24] rounded-full mt-4"></div>
        </div>
        <div class="flex flex-col gap-3">
          $2
        </div>
      </div>
    `);

    // Render mockup for <Accordion> shortcode inside Live Preview
    html = html.replace(/&lt;Accordion\s+title="([^"]+)"&gt;([\s\S]*?)&lt;\/Accordion&gt;/g, `
      <div class="mb-4 overflow-hidden rounded-xl border border-slate-100 bg-[#f8fafc] text-left">
        <div class="px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-800 text-sm md:text-base">
          <span>$1</span>
          <div class="w-7 h-7 rounded-full bg-[#f15a24]/10 text-[#f15a24] flex items-center justify-center font-bold text-base">+</div>
        </div>
        <div class="px-5 py-3 text-xs md:text-sm text-slate-600 border-t border-slate-200/80">
          $2
        </div>
      </div>
    `);

    // Render mockup for <Blockquote> shortcode inside Live Preview
    html = html.replace(/&lt;Blockquote\s+name="([^"]+)"&gt;([\s\S]*?)&lt;\/Blockquote&gt;/g, `
      <blockquote class="my-6 relative border-l-[5px] border-l-[#f15a24] bg-slate-50/70 p-6 md:p-8 rounded-r-2xl text-left not-italic">
        <div class="text-slate-700 font-medium leading-relaxed text-sm md:text-base mb-4 italic">
          $2
        </div>
        <cite class="block border-t border-slate-200/60 pt-3 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 not-italic">
          — $1
        </cite>
      </blockquote>
    `);
    // Render mockup for <KeyTakeaways> shortcode inside Live Preview (with type)
    html = html.replace(/&lt;KeyTakeaways\s+title="([^"]+)"\s+type="([^"]+)"&gt;([\s\S]*?)&lt;\/KeyTakeaways&gt;/g, (match, title, type, content) => {
      let listClass = type === "number" ? "key-takeaways-number" : (type === "roman" ? "key-takeaways-roman" : "key-takeaways-bullet");
      return `
        <div class="my-8 p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm max-w-3xl mx-auto text-left relative overflow-hidden">
          <div class="mb-4">
            <h4 class="text-base font-extrabold text-slate-900 m-0 uppercase tracking-wide">
              ${title}
            </h4>
          </div>
          <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed font-semibold ${listClass}">
            ${content}
          </div>
          <style>
            .key-takeaways-bullet ul, .key-takeaways-number ol, .key-takeaways-roman ol {
              list-style-type: none !important;
              padding-left: 0 !important;
              display: flex;
              flex-direction: column;
              gap: 0.65rem !important;
              margin-top: 0.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            .key-takeaways-bullet ul li {
              position: relative;
              padding-left: 1.25rem !important;
            }
            .key-takeaways-bullet ul li::before {
              content: "-" !important;
              position: absolute;
              left: 0;
              color: #64748b;
              font-weight: bold;
            }
            .key-takeaways-number ol { counter-reset: takeaway-counter; }
            .key-takeaways-number ol li {
              position: relative;
              padding-left: 1.5rem !important;
            }
            .key-takeaways-number ol li::before {
              counter-increment: takeaway-counter;
              content: counter(takeaway-counter) "." !important;
              position: absolute;
              left: 0;
              color: #64748b;
              font-weight: bold;
            }
            .key-takeaways-roman ol { counter-reset: takeaway-roman-counter; }
            .key-takeaways-roman ol li {
              position: relative;
              padding-left: 2rem !important;
            }
            .key-takeaways-roman ol li::before {
              counter-increment: takeaway-roman-counter;
              content: counter(takeaway-roman-counter, upper-roman) "." !important;
              position: absolute;
              left: 0;
              color: #64748b;
              font-weight: bold;
            }
          </style>
        </div>
      `;
    });

    // Render mockup for <KeyTakeaways> shortcode inside Live Preview (default type="bullet")
    html = html.replace(/&lt;KeyTakeaways\s+title="([^"]+)"\s*&gt;([\s\S]*?)&lt;\/KeyTakeaways&gt;/g, (match, title, content) => {
      return `
        <div class="my-8 p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm max-w-3xl mx-auto text-left relative overflow-hidden">
          <div class="mb-4">
            <h4 class="text-base font-extrabold text-slate-900 m-0 uppercase tracking-wide">
              ${title}
            </h4>
          </div>
          <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed font-semibold key-takeaways-bullet">
            ${content}
          </div>
        </div>
      `;
    });

    return html;
  };

  const handleEdit = (post) => {
    setFormData({
      filename: post.filename,
      title: post.frontmatter.title || "",
      content: post.content || "",
      categories: post.frontmatter.categories || [],
      authorName: post.frontmatter.author?.name || "Derick C.",
      image: post.frontmatter.image || "",
      date: post.frontmatter.date ? post.frontmatter.date.substring(0, 16) : "",
      draft: post.frontmatter.draft || false,
      metaDescription: post.frontmatter.metaDescription || "",
    });
    setActiveTab("write");
    setEditorTab("edit");
  };

  const handleDelete = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/blogs?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Blog post deleted successfully.");
        fetchPosts();
      } else {
        showNotification("error", data.error || "Failed to delete post.");
      }
    } catch (err) {
      showNotification("error", "An error occurred while deleting the post.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      showNotification("error", "Please select at least one Category mapping.");
      return;
    }

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        showNotification("success", formData.filename ? "Blog updated successfully!" : "Blog created successfully!");
        setFormData({
          filename: "",
          title: "",
          content: "",
          categories: [],
          authorName: "Derick C.",
          image: "",
          date: "",
          draft: false,
          metaDescription: "",
        });
        setFocusKeyphrase("");
        setActiveTab("list");
        fetchPosts();
      } else {
        showNotification("error", data.error || "Failed to save post.");
      }
    } catch (err) {
      showNotification("error", "An error occurred while saving the post.");
    }
  };

  const startNewPost = () => {
    setFormData({
      filename: "",
      title: "",
      content: "",
      categories: [],
      authorName: "Derick C.",
      image: "",
      date: "",
      draft: false,
      metaDescription: "",
    });
    setFocusKeyphrase("");
    setActiveTab("write");
    setEditorTab("edit");
  };

  const renderToc = () => {
    const headings = generateToc(formData.content);
    if (headings.length === 0) return null;
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 text-left">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Table of Contents</h4>
        <ul className="space-y-2">
          {headings.map((h, i) => (
            <li key={i} style={{ paddingLeft: `${(h.level - 1) * 12}px` }} className="text-xs font-semibold text-slate-600 hover:text-[#f15a24] transition-colors">
              <a href={`#${h.anchor}`}>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8" style={{ marginTop: "80px" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Innvikta Publisher Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">WordPress-style rich content editor and built-in SEO auditor.</p>
          </div>
          {activeTab === "list" && (
            <button
              onClick={startNewPost}
              className="flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FiPlus />
              <span>Write New Article</span>
            </button>
          )}
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 animate-slide-up ${
              notification.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            {notification.type === "success" ? <FiCheck className="text-xl" /> : <FiAlertCircle className="text-xl" />}
            <span className="font-semibold text-sm">{notification.message}</span>
          </div>
        )}

        {/* Inline Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Upload & Insert Image</h4>
                <button 
                  onClick={() => setShowImageModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleInsertInlineImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setInlineImageFile(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#f15a24]/10 file:text-[#f15a24] hover:file:bg-[#f15a24]/20 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image Alt Text (for SEO)</label>
                  <input
                    type="text"
                    value={inlineImageAlt}
                    onChange={(e) => setInlineImageAlt(e.target.value)}
                    placeholder="Describe this image for screen readers and search engines..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploadingInline}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingInline ? "Uploading..." : "Upload & Insert"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FAQ Conversion Modal */}
        {showFaqModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Bulk Convert to FAQ</h4>
                <button 
                  onClick={() => {
                    setShowFaqModal(false);
                    setFaqPasteText("");
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">FAQ Container Title</label>
                  <input
                    type="text"
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">FAQ Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={faqSubtitle}
                    onChange={(e) => setFaqSubtitle(e.target.value)}
                    placeholder="Find answers to common questions about this topic."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste Raw Questions & Answers</label>
                  <textarea
                    rows="8"
                    value={faqPasteText}
                    onChange={(e) => setFaqPasteText(e.target.value)}
                    placeholder={`Paste Q&As here. For example:\n\nQ: What is Innvikta InSAT?\nA: InSAT is an enterprise platform...\n\nQ: How to prevent phishing?\nA: Always verify sender emails and enable MFA.`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5">Our smart parser automatically identifies questions starting with Q:, numbers, or ending with a question mark (?).</p>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFaqModal(false);
                      setFaqPasteText("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertParsedFaq}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Convert & Insert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Takeaways Modal */}
        {showTakeawaysModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Bulk Insert Key Takeaways Card</h4>
                <button 
                  onClick={() => {
                    setShowTakeawaysModal(false);
                    setTakeawaysPasteText("");
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Card Title</label>
                  <input
                    type="text"
                    value={takeawaysTitle}
                    onChange={(e) => setTakeawaysTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">List Style</label>
                  <select
                    value={takeawaysType}
                    onChange={(e) => setTakeawaysType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  >
                    <option value="bullet">Bullets (-)</option>
                    <option value="number">Numbered List (1, 2, 3)</option>
                    <option value="roman">Roman Numerals (I, II, III)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste Key Takeaway Points (One per line)</label>
                  <textarea
                    rows="8"
                    value={takeawaysPasteText}
                    onChange={(e) => setTakeawaysPasteText(e.target.value)}
                    placeholder={`Paste your points here. For example:\n\n- Phishing attacks cost enterprises millions annually.\n- Implementing regular training reduces successful attacks by 80%.\n- MFA acts as a critical second line of defense.`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5">Each line will be converted into a bullet point in the styled card layout.</p>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTakeawaysModal(false);
                      setTakeawaysPasteText("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertParsedTakeaways}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Convert & Insert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === "list"
                ? "border-[#f15a24] text-[#f15a24]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            All Articles ({posts.length})
          </button>
          <button
            onClick={startNewPost}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === "write"
                ? "border-[#f15a24] text-[#f15a24]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {formData.filename ? "Edit Article" : "Write Article"}
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "list" ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="animate-spin rounded-full h-10 w-10 border-4 border-[#f15a24] border-t-transparent mb-4"></span>
                <span className="text-slate-500 text-sm font-medium">Loading database...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <FiFileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No blog posts found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                  Start creating and organizing articles using the &quot;Write New Article&quot; option.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-bold">
                      <th className="py-4 px-6">Article Title</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Categories</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {posts.map((post) => (
                      <tr key={post.filename} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900">{post.frontmatter.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{post.filename}</div>
                        </td>
                        <td className="py-4 px-6 text-slate-500">
                          {post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString(undefined, { dateStyle: "medium" }) : "N/A"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1.5">
                            {post.frontmatter.categories?.map((cat) => (
                              <span key={cat} className="bg-orange-50 border border-orange-100 text-[#f15a24] text-[10px] font-bold px-2 py-0.5 rounded-md">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {post.frontmatter.draft ? (
                            <span className="bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              Draft
                            </span>
                          ) : (
                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              Published
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2 hover:bg-[#f15a24]/10 text-slate-500 hover:text-[#f15a24] rounded-lg transition-colors cursor-pointer"
                              title="Edit Post"
                            >
                              <FiEdit className="text-base" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.filename)}
                              className="p-2 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Delete Post"
                            >
                              <FiTrash2 className="text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Block: WP Editor / Live Preview toggle */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 text-left">
                
                {/* Editor Tab Toggle */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditorTab("edit")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        editorTab === "edit" 
                          ? "bg-[#f15a24] text-white" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Write / Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        editorTab === "preview" 
                          ? "bg-[#f15a24] text-white" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <FiEye />
                      <span>Live Preview</span>
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{formData.filename || "new_article.md"}</span>
                </div>

                {editorTab === "edit" ? (
                  /* Form Inputs */
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter catch-ready title here..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white transition-all font-semibold"
                      />
                    </div>

                    {/* WP Style Text Editor Toolbar */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Article Body Editor</label>
                      <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        
                        {/* Editor Toolbar */}
                        <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 flex flex-wrap items-center gap-1">
                          <button
                            type="button"
                            onClick={() => insertMarkdown("bold", "bold text")}
                            className="p-2 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors font-bold flex items-center justify-center cursor-pointer"
                            title="Bold Text"
                          >
                            <FiBold className="text-sm" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("italic", "italicized text")}
                            className="p-2 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors italic flex items-center justify-center cursor-pointer"
                            title="Italic Text"
                          >
                            <FiItalic className="text-sm" />
                          </button>
                          
                          <div className="w-px h-6 bg-slate-200 mx-1"></div>
                          
                          {/* Heading Toolbar buttons */}
                          {["h1", "h2", "h3", "h4", "h5", "h6"].map((h) => (
                            <button
                              key={h}
                              type="button"
                              onClick={() => insertMarkdown(h, `${h.toUpperCase()} Heading`)}
                              className="px-2 py-1 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors text-xs font-bold uppercase cursor-pointer"
                              title={`${h.toUpperCase()} Heading`}
                            >
                              {h}
                            </button>
                          ))}
                          
                          <div className="w-px h-6 bg-slate-200 mx-1"></div>
                          
                          <button
                            type="button"
                            onClick={() => insertMarkdown("list", "List item")}
                            className="p-2 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                            title="Bullet List"
                          >
                            <FiList className="text-sm" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown("link", "Link Title")}
                            className="p-2 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                            title="Add Hyperlink"
                          >
                            <FiLink className="text-sm" />
                          </button>
                          
                          {/* Open custom image upload modal */}
                          <button
                            type="button"
                            onClick={() => setShowImageModal(true)}
                            className="p-2 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                            title="Upload & Insert Image"
                          >
                            <FiImage className="text-sm" />
                          </button>

                          <button
                            type="button"
                            onClick={() => insertMarkdown("demo")}
                            className="px-2.5 py-1.5 hover:bg-[#f15a24]/10 text-slate-600 hover:text-[#f15a24] rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold border border-dashed border-slate-300 hover:border-[#f15a24]"
                            title="Insert Reusable Demo Form"
                          >
                            <span>+ Demo Form</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowFaqModal(true)}
                            className="px-2.5 py-1.5 hover:bg-[#f15a24]/10 text-slate-600 hover:text-[#f15a24] rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold border border-dashed border-slate-300 hover:border-[#f15a24]"
                            title="Bulk Convert & Insert FAQ"
                          >
                            <span>+ FAQ Accordion</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => insertMarkdown("quote")}
                            className="px-2.5 py-1.5 hover:bg-[#f15a24]/10 text-slate-600 hover:text-[#f15a24] rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold border border-dashed border-slate-300 hover:border-[#f15a24]"
                            title="Insert Styled Blockquote"
                          >
                            <span>+ Quote</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowTakeawaysModal(true)}
                            className="px-2.5 py-1.5 hover:bg-[#f15a24]/10 text-slate-600 hover:text-[#f15a24] rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold border border-dashed border-slate-300 hover:border-[#f15a24]"
                            title="Bulk Insert Key Takeaways Card"
                          >
                            <span>+ Key Takeaways</span>
                          </button>
                        </div>

                        {/* Content Textarea */}
                        <textarea
                          name="content"
                          ref={textareaRef}
                          required
                          rows="18"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="Start writing blog post content in markdown... Use Heading helper buttons (H1 to H6) to design sections with proper tags."
                          className="w-full px-4 py-3 bg-white border-0 focus:outline-none focus:ring-0 transition-all font-mono text-sm leading-relaxed"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Rendered Blog Live Preview */
                  <div className="bg-white p-2 text-left space-y-6">
                    
                    {/* Blog Cover Image Preview */}
                    {formData.image && (
                      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm relative">
                        <img 
                          src={formData.image} 
                          alt="Cover Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Blog Meta Details */}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 leading-tight">
                        {formData.title || "Untitled Article"}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                        <span className="font-semibold text-slate-800">By {formData.authorName}</span>
                        <span>•</span>
                        <span>{formData.date ? new Date(formData.date).toLocaleDateString(undefined, { dateStyle: "long" }) : "Publish date not set"}</span>
                        <span>•</span>
                        <div className="flex gap-1.5">
                          {formData.categories.map((cat) => (
                            <span key={cat} className="bg-orange-50 text-[#f15a24] font-bold px-2 py-0.5 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Table of Contents Preview */}
                    {renderToc()}

                    {/* Rendered HTML Content */}
                    <div 
                      className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(formData.content) }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Block: Category Mapping, SEO Auditor & Publish settings */}
            <div className="space-y-6">
              
              {/* Category mapping box */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 text-left">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                  Category Mapping
                </h4>
                <p className="text-xs text-slate-500 mb-4">Select categories to display this article under in the frontend blog page filter.</p>
                <div className="space-y-3">
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4 h-4 text-[#f15a24] border-slate-300 rounded focus:ring-[#f15a24]"
                      />
                      <span className="text-sm font-semibold text-slate-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Innvikta Yoast SEO Assistant */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 text-left">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
                  <FiTrendingUp className="text-[#f15a24]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Innvikta SEO Audit
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Focus Keyphrase</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={focusKeyphrase}
                        onChange={(e) => setFocusKeyphrase(e.target.value)}
                        placeholder="e.g. phishing trends"
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                      />
                      <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    </div>
                  </div>

                  {/* Audit checklist list */}
                  <div className="space-y-3 mt-4">
                    {seoReport.map((audit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          audit.status === "success" ? "bg-emerald-500 text-white" :
                          audit.status === "warning" ? "bg-amber-500 text-white" :
                          audit.status === "info" ? "bg-blue-500 text-white" :
                          "bg-rose-500 text-white"
                        }`} style={{ fontSize: "7px" }}>
                          {audit.status === "success" && <FiCheck />}
                        </span>
                        <span className="text-[11px] font-medium leading-normal text-slate-600">
                          {audit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publish Settings */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 text-left space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Metadata & Settings
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Meta Description (Excerpt)</label>
                    <textarea
                      name="metaDescription"
                      rows="3"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Write a brief excerpt or meta description for search snippets..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Author</label>
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    />
                  </div>

                  {/* Device Cover Image Upload Field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cover Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="/images/blog/01.jpg"
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                      />
                      <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm shrink-0 border border-slate-200">
                        <FiUploadCloud />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          className="hidden"
                          disabled={isUploadingCover}
                        />
                      </label>
                    </div>
                    {isUploadingCover && (
                      <span className="text-[10px] text-[#f15a24] font-semibold animate-pulse block mt-1">Uploading cover image...</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Publish Date</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      id="draft-checkbox"
                      type="checkbox"
                      name="draft"
                      checked={formData.draft}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#f15a24] border-slate-300 rounded focus:ring-[#f15a24]"
                    />
                    <label htmlFor="draft-checkbox" className="text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer">
                      Save as draft
                    </label>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all text-xs cursor-pointer"
                  >
                    <FiX />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#f15a24] hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-xs cursor-pointer"
                  >
                    <FiSave />
                    <span>Save Post</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
