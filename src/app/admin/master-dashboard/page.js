"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiImage, 
  FiVideo, 
  FiX, 
  FiCheck,
  FiBookOpen,
  FiUsers,
  FiFileText,
  FiLayout,
  FiRefreshCw,
  FiArrowLeft,
  FiEye,
  FiSave,
  FiMail,
  FiPlusCircle,
  FiMapPin,
  FiClock,
  FiAlertCircle
} from "react-icons/fi";

const INDUSTRIES = ["BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];
const CATEGORIES = ["Insights", "Threat Defense", "Compliance"];

// Reusable Word-style Rich Text Editor Toolbar Component
function ToolbarEditor({ value, onChange, placeholder, rows = 8 }) {
  const ref = useRef(null);

  const applyFormatting = (syntax) => {
    const textarea = ref.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const originalText = textarea.value;
    const selectedText = originalText.substring(startPos, endPos) || "text";

    let replacement = "";
    switch (syntax) {
      case "bold": replacement = `**${selectedText}**`; break;
      case "italic": replacement = `*${selectedText}*`; break;
      case "h1": replacement = `\n# ${selectedText}\n`; break;
      case "h2": replacement = `\n## ${selectedText}\n`; break;
      case "h3": replacement = `\n### ${selectedText}\n`; break;
      case "list": replacement = `\n- ${selectedText}`; break;
      case "link": replacement = `[${selectedText}](url)`; break;
      case "quote": replacement = `\n> ${selectedText}\n`; break;
      case "table": replacement = `\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n`; break;
    }

    const newText = originalText.substring(0, startPos) + replacement + originalText.substring(endPos);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(startPos + replacement.length, startPos + replacement.length);
    }, 50);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Word-style formatting toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => applyFormatting("bold")} className="px-2.5 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer font-bold text-xs" title="Bold">B</button>
        <button type="button" onClick={() => applyFormatting("italic")} className="px-2.5 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer italic text-xs" title="Italic">I</button>
        <div className="w-px h-4 bg-slate-300 mx-1"></div>
        <button type="button" onClick={() => applyFormatting("h1")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-[10px] font-bold" title="Heading 1">H1</button>
        <button type="button" onClick={() => applyFormatting("h2")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-[10px] font-bold" title="Heading 2">H2</button>
        <button type="button" onClick={() => applyFormatting("h3")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-[10px] font-bold" title="Heading 3">H3</button>
        <div className="w-px h-4 bg-slate-300 mx-1"></div>
        <button type="button" onClick={() => applyFormatting("list")} className="px-2 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-xs font-bold" title="Bullet List">List</button>
        <button type="button" onClick={() => applyFormatting("link")} className="px-2 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-xs font-bold" title="Link">Link</button>
        <button type="button" onClick={() => applyFormatting("quote")} className="px-2 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-xs font-bold" title="Blockquote">Quote</button>
        <button type="button" onClick={() => applyFormatting("table")} className="px-2 py-1 hover:bg-slate-200 text-slate-700 rounded cursor-pointer text-xs font-bold" title="Table">Table</button>
      </div>
      <textarea
        ref={ref}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-xs font-mono text-slate-800 focus:outline-none focus:bg-slate-50/20"
      />
    </div>
  );
}

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState("blogs"); // "blogs", "cases", "newsletters", "updates"
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Data lists
  const [blogsList, setBlogsList] = useState([]);
  const [casesList, setCasesList] = useState([]);
  const [newslettersList, setNewslettersList] = useState([]);
  const [updatesList, setUpdatesList] = useState([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Editor states
  const [editorMode, setEditorMode] = useState("list"); // "list" or "edit"
  const [editingId, setEditingId] = useState(null);
  const [editorTab, setEditorTab] = useState("edit"); // "edit" or "preview"

  // Common Form States
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    authorName: "Derick C.",
    content: "",
    image: "",
    date: "",
    draft: false,
    metaTitle: "",
    metaDescription: "",
  });

  const [caseForm, setCaseForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    industry: "BFSI",
    industryLabel: "Banking & Finance",
    description: "",
    image: "",
    location: "",
    timeline: "",
    atGlance: [""],
    summaryTitle: "",
    textAlignment: "justify",
    summaryParagraphs: [""],
    challengeTitle: "",
    challengeParagraphs: [""],
    solutionTitle: "Solution Section",
    solutionParagraphs: [""],
    sidebarChallenge: "",
    sidebarDetails: [
      { label: "Target Coverage", val: "" },
      { label: "Delivery Model", val: "" }
    ],
    quoteText: "",
    quoteAuthor: "",
    customSections: [],
    cultureTitle: "Building a Stronger Security Culture",
    cultureParagraphs: [
      "Building a security culture requires a program built around real behavior analytics, not slide library training. By triggering short, repeated reinforcement modules, employees understand the role they play in preserving compliance frameworks and cybersecurity defenses.",
      "Using Innvikta InSAT, the organization achieved full compliance alignment, minimized repeat clickers, and accelerated threat containment times dramatically."
    ],
    cultureImage: "/images/about-bg.jpeg",
    ctaTitle: "Ready to Build a Stronger Security Culture?",
    ctaDescription: "Get a personalized walk-through of Innvikta InSAT to see how our simulated phishing campaigns and automated training modules reduce social engineering risks.",
    ctaButtonText: "Book a Demo",
    ctaButtonUrl: "/book-demo",
    heroImage: "",
    pdfUrl: ""
  });
  const [caseContentSource, setCaseContentSource] = useState("manual");

  const [newsletterForm, setNewsletterForm] = useState({
    title: "",
    slug: "",
    description: "",
    date: "",
    readTime: "5 min read",
    author: "Compliance Team",
    category: "Insights",
    content: "",
    image: "",
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonText: "",
    ctaButtonUrl: "",
    showCta: true,
    mailSubscribers: false
  });

  const [updateForm, setUpdateForm] = useState({
    title: "",
    slug: "",
    category: "INNVIKTA ARCADE",
    date: "",
    desc: "",
    image: "/images/arcade-preview.png",
    graphicText: ""
  });

  // Notifications
  const showNotification = (type, message) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Blogs
      const blogRes = await fetch("/api/admin/blogs");
      const blogData = await blogRes.json();
      if (blogData.posts) setBlogsList(blogData.posts);

      // Case Studies
      const caseRes = await fetch("/api/case-studies");
      const caseData = await caseRes.json();
      if (Array.isArray(caseData)) setCasesList(caseData);

      // Newsletters
      const newsRes = await fetch("/api/newsletters");
      const newsData = await newsRes.json();
      if (Array.isArray(newsData)) setNewslettersList(newsData);

      // Platform Updates
      const updatesRes = await fetch("/api/platform-updates");
      const updatesData = await updatesRes.json();
      if (Array.isArray(updatesData)) setUpdatesList(updatesData);

      setLoading(false);
    } catch (err) {
      showNotification("error", "Error loading database data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CRUD Handlers ---

  // DELETE functions
  const handleDeleteBlog = async (filename) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?filename=${filename}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Blog deleted successfully!");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to delete blog.");
      }
    } catch (err) {
      showNotification("error", "Error deleting blog.");
    }
  };

  const handleDeleteCase = async (id) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetch(`/api/case-studies?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Case study deleted successfully!");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to delete case study.");
      }
    } catch (err) {
      showNotification("error", "Error deleting case study.");
    }
  };

  const handleDeleteNewsletter = async (id) => {
    if (!confirm("Are you sure you want to delete this newsletter?")) return;
    try {
      const res = await fetch(`/api/newsletters?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Newsletter deleted successfully!");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to delete newsletter.");
      }
    } catch (err) {
      showNotification("error", "Error deleting newsletter.");
    }
  };

  // SAVE functions
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: editingId || `${blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`,
          frontmatter: {
            title: blogForm.title,
            date: blogForm.date || new Date().toISOString().split("T")[0],
            image: blogForm.image,
            author: blogForm.authorName,
            draft: blogForm.draft,
            metaTitle: blogForm.metaTitle,
            metaDescription: blogForm.metaDescription,
          },
          content: blogForm.content
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Blog saved successfully!");
        setEditorMode("list");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to save blog.");
      }
    } catch (err) {
      showNotification("error", "Error saving blog.");
    }
  };

  const handleSaveCase = async (e) => {
    e.preventDefault();
    if (caseContentSource === "pdf" && !caseForm.pdfUrl) {
      showNotification("error", "Please upload a PDF file first.");
      return;
    }
    try {
      const payload = { ...caseForm };
      if (caseContentSource === "pdf") {
        payload.description = caseForm.description || "PDF Case Study Document";
        payload.atGlance = [];
        payload.summaryTitle = "";
        payload.summaryParagraphs = [];
        payload.challengeTitle = "";
        payload.challengeParagraphs = [];
        payload.solutionTitle = "Solution Section";
        payload.solutionParagraphs = [];
        payload.sidebarChallenge = "";
        payload.sidebarDetails = [];
        payload.quoteText = "";
        payload.quoteAuthor = "";
        payload.customSections = [];
      } else {
        payload.pdfUrl = "";
      }
      if (editingId) payload.id = editingId;
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Case study saved successfully!");
        setEditorMode("list");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to save case study.");
      }
    } catch (err) {
      showNotification("error", "Error saving case study.");
    }
  };

  const handleSaveNewsletter = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newsletterForm };
      if (editingId) payload.id = editingId;
      const res = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        let msg = "Newsletter saved successfully!";
        if (data.mailStatus && data.mailStatus.success) {
          msg += ` Broadcasted to ${data.mailStatus.sent_count} subscribers!`;
        }
        showNotification("success", msg);
        setEditorMode("list");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to save newsletter.");
      }
    } catch (err) {
      showNotification("error", "Error saving newsletter.");
    }
  };

  // EDIT open functions
  const openEditBlog = (blog) => {
    setEditingId(blog.filename);
    setBlogForm({
      title: blog.frontmatter.title || "",
      slug: blog.slug || "",
      authorName: blog.frontmatter.author && typeof blog.frontmatter.author === "object" 
        ? blog.frontmatter.author.name 
        : (blog.frontmatter.author || "Derick C."),
      content: blog.content || "",
      image: blog.frontmatter.image || "",
      date: blog.frontmatter.date || "",
      draft: blog.frontmatter.draft || false,
      metaTitle: blog.frontmatter.metaTitle || "",
      metaDescription: blog.frontmatter.metaDescription || "",
    });
    setEditorMode("edit");
  };

  const openEditCase = (study) => {
    setEditingId(study.id);
    setCaseForm({
      title: study.title || "",
      subtitle: study.subtitle || "",
      slug: study.slug || "",
      industry: study.industry || "BFSI",
      industryLabel: study.industryLabel || "",
      description: study.description || "",
      image: study.image || "",
      location: study.location || "",
      timeline: study.timeline || "",
      atGlance: study.atGlance || [""],
      summaryTitle: study.summaryTitle || "",
      textAlignment: study.textAlignment || "justify",
      summaryParagraphs: study.summaryParagraphs || [""],
      challengeTitle: study.challengeTitle || "",
      challengeParagraphs: study.challengeParagraphs || [""],
      solutionTitle: study.solutionTitle || "Solution Section",
      solutionParagraphs: study.solutionParagraphs || [""],
      sidebarChallenge: study.sidebarChallenge || "",
      sidebarDetails: study.sidebarDetails || [
        { label: "Target Coverage", val: "" },
        { label: "Delivery Model", val: "" }
      ],
      quoteText: study.quoteText || "",
      quoteAuthor: study.quoteAuthor || "",
      customSections: study.customSections || [],
      cultureTitle: study.cultureTitle || "Building a Stronger Security Culture",
      cultureParagraphs: study.cultureParagraphs || [
        "Building a security culture requires a program built around real behavior analytics, not slide library training. By triggering short, repeated reinforcement modules, employees understand the role they play in preserving compliance frameworks and cybersecurity defenses.",
        "Using Innvikta InSAT, the organization achieved full compliance alignment, minimized repeat clickers, and accelerated threat containment times dramatically."
      ],
      cultureImage: study.cultureImage || "/images/about-bg.jpeg",
      ctaTitle: study.ctaTitle || "Ready to Build a Stronger Security Culture?",
      ctaDescription: study.ctaDescription || "Get a personalized walk-through of Innvikta InSAT to see how our simulated phishing campaigns and automated training modules reduce social engineering risks.",
      ctaButtonText: study.ctaButtonText || "Book a Demo",
      ctaButtonUrl: study.ctaButtonUrl || "/book-demo",
      heroImage: study.heroImage || "",
      pdfUrl: study.pdfUrl || ""
    });
    setCaseContentSource(study.pdfUrl ? "pdf" : "manual");
    setEditorMode("edit");
  };

  const openEditNewsletter = (news) => {
    setEditingId(news.id);
    setNewsletterForm({
      title: news.title || "",
      slug: news.slug || "",
      description: news.description || "",
      date: news.date || "",
      readTime: news.readTime || "5 min read",
      author: news.author || "Compliance Team",
      category: news.category || "Insights",
      content: news.content || "",
      image: news.image || "",
      ctaTitle: news.ctaTitle || "",
      ctaDescription: news.ctaDescription || "",
      ctaButtonText: news.ctaButtonText || "",
      ctaButtonUrl: news.ctaButtonUrl || "",
      showCta: news.hasOwnProperty('showCta') ? news.showCta : true,
      mailSubscribers: false
    });
    setEditorMode("edit");
  };

  const handleDeleteUpdate = async (id) => {
    if (!confirm("Are you sure you want to delete this platform update?")) return;
    try {
      const res = await fetch(`/api/platform-updates?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Platform update deleted successfully!");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to delete platform update.");
      }
    } catch (err) {
      showNotification("error", "Error deleting platform update.");
    }
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...updateForm };
      if (editingId) payload.id = editingId;
      const res = await fetch("/api/platform-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Platform update saved successfully!");
        setEditorMode("list");
        fetchData();
      } else {
        showNotification("error", data.error || "Failed to save platform update.");
      }
    } catch (err) {
      showNotification("error", "Error saving platform update.");
    }
  };

  const openEditUpdate = (item) => {
    setEditingId(item.id);
    setUpdateForm({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "INNVIKTA ARCADE",
      date: item.date || "",
      desc: item.desc || "",
      image: item.image || "/images/arcade-preview.png",
      graphicText: item.graphicText || ""
    });
    setEditorMode("edit");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-left" style={{ marginTop: "80px" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Master CMS Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Configure Blogs, Case Studies, and Newsletters dynamically.</p>
          </div>
          
          {editorMode === "list" && (
            <button
              onClick={() => {
                setEditingId(null);
                if (activeTab === "blogs") {
                  setBlogForm({
                    title: "",
                    slug: "",
                    authorName: "Derick C.",
                    content: "",
                    image: "",
                    date: new Date().toISOString().split("T")[0],
                    draft: false,
                    metaTitle: "",
                    metaDescription: "",
                  });
                } else if (activeTab === "cases") {
                  setCaseForm({
                    title: "",
                    subtitle: "",
                    slug: "",
                    industry: "BFSI",
                    industryLabel: "Banking & Finance",
                    description: "",
                    image: "",
                    location: "",
                    timeline: "",
                    atGlance: [""],
                    summaryTitle: "",
                    summaryParagraphs: [""],
                    challengeTitle: "",
                    challengeParagraphs: [""],
                    solutionTitle: "Solution Section",
                    solutionParagraphs: [""],
                    sidebarChallenge: "",
                    sidebarDetails: [
                      { label: "Target Coverage", val: "" },
                      { label: "Delivery Model", val: "" }
                    ],
                    quoteText: "",
                    quoteAuthor: "",
                    customSections: [],
                    cultureTitle: "Building a Stronger Security Culture",
                    cultureParagraphs: [""],
                    cultureImage: "/images/about-bg.jpeg",
                    ctaTitle: "Ready to Build a Stronger Security Culture?",
                    ctaDescription: "Get a personalized walk-through of Innvikta InSAT to see how our simulated phishing campaigns and automated training modules reduce social engineering risks.",
                    ctaButtonText: "Book a Demo",
                    ctaButtonUrl: "/book-demo",
                    heroImage: "",
                    pdfUrl: ""
                  });
                  setCaseContentSource("manual");
                } else if (activeTab === "newsletters") {
                  setNewsletterForm({
                    title: "",
                    slug: "",
                    description: "",
                    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
                    readTime: "5 min read",
                    author: "Compliance Team",
                    category: "Insights",
                    content: "",
                    image: "",
                    ctaTitle: "",
                    ctaDescription: "",
                    ctaButtonText: "",
                    ctaButtonUrl: "",
                    showCta: true,
                    mailSubscribers: false
                  });
                } else if (activeTab === "updates") {
                  setUpdateForm({
                    title: "",
                    slug: "",
                    category: "INNVIKTA ARCADE",
                    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
                    desc: "",
                    image: "/images/arcade-preview.png",
                    graphicText: ""
                  });
                }
                setEditorMode("edit");
              }}
              className="flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 !text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-xs"
            >
              <FiPlus />
              <span>Add New {activeTab === "blogs" ? "Blog" : activeTab === "cases" ? "Case Study" : activeTab === "newsletters" ? "Newsletter" : "Platform Update"}</span>
            </button>
          )}
        </div>

        {/* Dynamic tabs */}
        {editorMode === "list" && (
          <div className="flex gap-2 border-b border-slate-200 mb-6 pb-px">
            {["blogs", "cases", "newsletters", "updates"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-bold text-xs capitalize transition-all border-b-2 -mb-px cursor-pointer ${
                  activeTab === tab 
                    ? "border-[#f15a24] text-[#f15a24]" 
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "cases" ? "Case Studies" : tab === "updates" ? "Platform Updates" : tab}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#f15a24] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-xs font-bold">Loading Database Records...</p>
          </div>
        ) : editorMode === "list" ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {activeTab === "blogs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Author</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {blogsList.map((blog) => (
                      <tr key={blog.filename} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{blog.frontmatter.title}</td>
                        <td className="py-4 px-6">
                          {blog.frontmatter.author && typeof blog.frontmatter.author === "object" 
                            ? blog.frontmatter.author.name 
                            : blog.frontmatter.author || "Admin"}
                        </td>
                        <td className="py-4 px-6">{blog.frontmatter.date ? new Date(blog.frontmatter.date).toLocaleDateString() : ""}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${blog.frontmatter.draft ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {blog.frontmatter.draft ? "Draft" : "Published"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => openEditBlog(blog)} className="p-2 text-slate-500 hover:text-[#f15a24] bg-slate-50 rounded-lg cursor-pointer"><FiEdit /></button>
                          <button onClick={() => handleDeleteBlog(blog.filename)} className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 rounded-lg cursor-pointer"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "cases" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                      <th className="py-4 px-6">Company / Title</th>
                      <th className="py-4 px-6">Industry</th>
                      <th className="py-4 px-6">Timeline</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {casesList.map((study) => (
                      <tr key={study.id} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{study.title}</td>
                        <td className="py-4 px-6">{study.industryLabel}</td>
                        <td className="py-4 px-6">{study.timeline}</td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => openEditCase(study)} className="p-2 text-slate-500 hover:text-[#f15a24] bg-slate-50 rounded-lg cursor-pointer"><FiEdit /></button>
                          <button onClick={() => handleDeleteCase(study.id)} className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 rounded-lg cursor-pointer"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "newsletters" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                      <th className="py-4 px-6">Edition Title</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Read Time</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {newslettersList.map((news) => (
                      <tr key={news.id} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{news.title}</td>
                        <td className="py-4 px-6">{news.date}</td>
                        <td className="py-4 px-6">{news.readTime}</td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => openEditNewsletter(news)} className="p-2 text-slate-500 hover:text-[#f15a24] bg-slate-50 rounded-lg cursor-pointer"><FiEdit /></button>
                          <button onClick={() => handleDeleteNewsletter(news.id)} className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 rounded-lg cursor-pointer"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "updates" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                      <th className="py-4 px-6">Update Title</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {updatesList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{item.title}</td>
                        <td className="py-4 px-6">{item.category}</td>
                        <td className="py-4 px-6">{item.date}</td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => openEditUpdate(item)} className="p-2 text-slate-500 hover:text-[#f15a24] bg-slate-50 rounded-lg cursor-pointer"><FiEdit /></button>
                          <button onClick={() => handleDeleteUpdate(item.id)} className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 rounded-lg cursor-pointer"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Editors Mode */
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-6">
                <h3 className="text-base font-bold text-slate-900">
                  {editingId ? "Edit" : "Create New"} {activeTab === "blogs" ? "Blog Post" : activeTab === "cases" ? "Case Study" : activeTab === "newsletters" ? "Newsletter" : "Platform Update"}
                </h3>
                <div className="flex gap-1.5 bg-slate-150 p-0.5 rounded-lg">
                  <button
                    onClick={() => setEditorTab("edit")}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all ${editorTab === "edit" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Edit Form
                  </button>
                  <button
                    onClick={() => setEditorTab("preview")}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all ${editorTab === "preview" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>
              <button 
                onClick={() => {
                  setEditorMode("list");
                  setEditorTab("edit");
                }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
              >
                <FiArrowLeft /> Back to List
              </button>
            </div>

            {/* Blogs editor */}
            {activeTab === "blogs" && editorTab === "edit" && (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author</label>
                    <input
                      type="text"
                      value={blogForm.authorName}
                      onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                    <input
                      type="date"
                      value={blogForm.date}
                      onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Content (Markdown)</label>
                  <ToolbarEditor
                    value={blogForm.content}
                    onChange={(val) => setBlogForm({ ...blogForm, content: val })}
                    placeholder="Write article content..."
                    rows={12}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="draft"
                    checked={blogForm.draft}
                    onChange={(e) => setBlogForm({ ...blogForm, draft: e.target.checked })}
                    className="w-4 h-4 rounded text-[#f15a24] focus:ring-[#f15a24]"
                  />
                  <label htmlFor="draft" className="text-xs font-bold text-slate-600">Save as Draft</label>
                </div>
                <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                  <FiSave /> Save Blog
                </button>
              </form>
            )}

            {/* Case Studies editor */}
            {activeTab === "cases" && editorTab === "edit" && (
              <form onSubmit={handleSaveCase} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title (Company)</label>
                    <input
                      type="text"
                      required
                      value={caseForm.title}
                      onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={caseForm.subtitle}
                      onChange={(e) => setCaseForm({ ...caseForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industry</label>
                    <select
                      value={caseForm.industry}
                      onChange={(e) => setCaseForm({ ...caseForm, industry: e.target.value, industryLabel: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    >
                      {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
                    <input
                      type="text"
                      value={caseForm.location}
                      onChange={(e) => setCaseForm({ ...caseForm, location: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Timeline</label>
                    <input
                      type="text"
                      value={caseForm.timeline}
                      onChange={(e) => setCaseForm({ ...caseForm, timeline: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={caseForm.image}
                        onChange={(e) => setCaseForm({ ...caseForm, image: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                        placeholder="e.g. /images/case-studies/hero.jpg"
                      />
                      <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md select-none">
                        <FiImage />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const data = await res.json();
                              if (data.success) {
                                setCaseForm({ ...caseForm, image: data.url });
                                showNotification("success", "Cover image uploaded successfully!");
                              } else {
                                showNotification("error", data.error || "Failed to upload image.");
                              }
                            } catch (err) {
                              showNotification("error", "Error uploading image.");
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {caseForm.image && (
                    <div className="flex items-end">
                      <div className="w-32 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={caseForm.image} alt="Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero Banner Image URL (Optional - defaults to Cover Image)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={caseForm.heroImage}
                        onChange={(e) => setCaseForm({ ...caseForm, heroImage: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                        placeholder="e.g. /images/case-studies/banner.jpg"
                      />
                      <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md select-none">
                        <FiImage />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const data = await res.json();
                              if (data.success) {
                                setCaseForm({ ...caseForm, heroImage: data.url });
                                showNotification("success", "Hero image uploaded successfully!");
                              } else {
                                showNotification("error", data.error || "Failed to upload image.");
                              }
                            } catch (err) {
                              showNotification("error", "Error uploading image.");
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {caseForm.heroImage && (
                    <div className="flex items-end">
                      <div className="w-32 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={caseForm.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 font-black">Description Summary *</label>
                  <ToolbarEditor
                    value={caseForm.description}
                    onChange={(val) => setCaseForm({ ...caseForm, description: val })}
                    placeholder="Enter case study description summary..."
                    rows={3}
                  />
                </div>

                {/* Case Study Content Source Toggle */}
                <div className="border-t border-slate-100 pt-4 text-left">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Case Study Content Source</label>
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setCaseContentSource("manual")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        caseContentSource === "manual"
                          ? "bg-orange-50 border-[#f15a24] text-[#f15a24]"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Manual Text & Sections
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseContentSource("pdf")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        caseContentSource === "pdf"
                          ? "bg-orange-50 border-[#f15a24] text-[#f15a24]"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Direct PDF Upload
                    </button>
                  </div>
                </div>

                {caseContentSource === "pdf" && (
                  <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-4 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase">Case Study PDF Document</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={caseForm.pdfUrl || ""}
                        onChange={(e) => setCaseForm({ ...caseForm, pdfUrl: e.target.value })}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="e.g. /uploads/blog/filename.pdf"
                      />
                      <label className="px-4 py-2 bg-[#f15a24] text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
                        <FiImage /> {uploadingPdf ? "Uploading..." : "Upload File"}
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfUpload}
                          disabled={uploadingPdf}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {caseForm.pdfUrl && (
                      <div className="text-[10px] text-green-700 font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-150 w-fit">
                        PDF Attached: {caseForm.pdfUrl}
                      </div>
                    )}
                  </div>
                )}

                {caseContentSource === "manual" && (
                  <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">At Glance Highlights (One per line)</label>
                  <textarea
                    rows={4}
                    value={caseForm.atGlance.join("\n")}
                    onChange={(e) => setCaseForm({ ...caseForm, atGlance: e.target.value.split("\n") })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-805"
                  />
                </div>

                {/* Summary section */}
                <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Summary Section (Outcome Description)</h4>
                                    <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Text Alignment (in detail page)</label>
                    <select
                      value={caseForm.textAlignment || 'justify'}
                      onChange={(e) => setCaseForm({ ...caseForm, textAlignment: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    >
                      <option value="justify">Justify</option>
                      <option value="left">Align Left</option>
                      <option value="center">Align Center</option>
                      <option value="right">Align Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Summary Section Title</label>
                    <input
                      type="text"
                      value={caseForm.summaryTitle}
                      onChange={(e) => setCaseForm({ ...caseForm, summaryTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-black">Content Paragraph Blocks (Success Sections)</label>
                    {caseForm.summaryParagraphs.map((para, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 p-3 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#f15a24]">Paragraph #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseForm.summaryParagraphs.filter((_, i) => i !== idx);
                              setCaseForm({ ...caseForm, summaryParagraphs: updated });
                            }}
                            className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Remove Paragraph
                          </button>
                        </div>
                        <ToolbarEditor
                          value={para}
                          onChange={(val) => {
                            const updated = [...caseForm.summaryParagraphs];
                            updated[idx] = val;
                            setCaseForm({ ...caseForm, summaryParagraphs: updated });
                          }}
                          placeholder="Write paragraph content..."
                          rows={4}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCaseForm({
                        ...caseForm,
                        summaryParagraphs: [...caseForm.summaryParagraphs, ""]
                      })}
                      className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                    >
                      <FiPlusCircle /> Add Paragraph Block
                    </button>
                  </div>
                </div>

                {/* Challenge section */}
                <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Challenge Section</h4>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Challenge Section Title</label>
                    <input
                      type="text"
                      value={caseForm.challengeTitle}
                      onChange={(e) => setCaseForm({ ...caseForm, challengeTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-black">Content Paragraph Blocks</label>
                    {caseForm.challengeParagraphs.map((para, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 p-3 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#f15a24]">Paragraph #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseForm.challengeParagraphs.filter((_, i) => i !== idx);
                              setCaseForm({ ...caseForm, challengeParagraphs: updated });
                            }}
                            className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Remove Paragraph
                          </button>
                        </div>
                        <ToolbarEditor
                          value={para}
                          onChange={(val) => {
                            const updated = [...caseForm.challengeParagraphs];
                            updated[idx] = val;
                            setCaseForm({ ...caseForm, challengeParagraphs: updated });
                          }}
                          placeholder="Write paragraph content..."
                          rows={4}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCaseForm({
                        ...caseForm,
                        challengeParagraphs: [...caseForm.challengeParagraphs, ""]
                      })}
                      className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                    >
                      <FiPlusCircle /> Add Paragraph Block
                    </button>
                  </div>
                </div>

                {/* Solution section */}
                <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Solution Section</h4>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Solution Section Title</label>
                    <input
                      type="text"
                      value={caseForm.solutionTitle}
                      onChange={(e) => setCaseForm({ ...caseForm, solutionTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-black">Content Paragraph Blocks</label>
                    {caseForm.solutionParagraphs.map((para, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 p-3 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#f15a24]">Paragraph #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseForm.solutionParagraphs.filter((_, i) => i !== idx);
                              setCaseForm({ ...caseForm, solutionParagraphs: updated });
                            }}
                            className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Remove Paragraph
                          </button>
                        </div>
                        <ToolbarEditor
                          value={para}
                          onChange={(val) => {
                            const updated = [...caseForm.solutionParagraphs];
                            updated[idx] = val;
                            setCaseForm({ ...caseForm, solutionParagraphs: updated });
                          }}
                          placeholder="Write paragraph content..."
                          rows={4}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCaseForm({
                        ...caseForm,
                        solutionParagraphs: [...caseForm.solutionParagraphs, ""]
                      })}
                      className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                    >
                      <FiPlusCircle /> Add Paragraph Block
                    </button>
                  </div>
                </div>

                {/* Custom/New content sections builder */}
                <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider font-extrabold">Custom Content Sections</h4>
                  
                  {(caseForm.customSections || []).map((section, sIdx) => (
                    <div key={sIdx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-4 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-[#f15a24]">Custom Section #{sIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = caseForm.customSections.filter((_, i) => i !== sIdx);
                            setCaseForm({ ...caseForm, customSections: updated });
                          }}
                          className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove Section
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Section Heading/Title</label>
                        <input
                          type="text"
                          required
                          value={section.title}
                          onChange={(e) => {
                            const updated = [...caseForm.customSections];
                            updated[sIdx].title = e.target.value;
                            setCaseForm({ ...caseForm, customSections: updated });
                          }}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                          placeholder="e.g. Project Outcomes & Scope"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-black">Section Paragraphs</label>
                        {(section.paragraphs || []).map((para, pIdx) => (
                          <div key={pIdx} className="space-y-2 border border-slate-100 p-3 rounded-lg bg-slate-50/20">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-slate-500">Paragraph #{pIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...caseForm.customSections];
                                  updated[sIdx].paragraphs = section.paragraphs.filter((_, i) => i !== pIdx);
                                  setCaseForm({ ...caseForm, customSections: updated });
                                }}
                                className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                              >
                                Remove Paragraph
                              </button>
                            </div>
                            <ToolbarEditor
                              value={para}
                              onChange={(val) => {
                                const updated = [...caseForm.customSections];
                                updated[sIdx].paragraphs[pIdx] = val;
                                setCaseForm({ ...caseForm, customSections: updated });
                              }}
                              placeholder="Write paragraph content..."
                              rows={4}
                            />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...caseForm.customSections];
                            updated[sIdx].paragraphs = [...(section.paragraphs || []), ""];
                            setCaseForm({ ...caseForm, customSections: updated });
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                        >
                          <FiPlusCircle /> Add Paragraph Block
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCaseForm({
                      ...caseForm,
                      customSections: [...(caseForm.customSections || []), { title: "", paragraphs: [""] }]
                    })}
                    className="flex items-center gap-1.5 text-xs text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl font-bold cursor-pointer transition-all w-fit"
                  >
                    <FiPlus /> Add Custom Content Section
                  </button>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Dynamic Sidebar Details</h4>
                  
                  {caseForm.sidebarDetails.map((detail, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <input
                        type="text"
                        placeholder="Label"
                        value={detail.label}
                        onChange={(e) => {
                          const updated = [...caseForm.sidebarDetails];
                          updated[idx].label = e.target.value;
                          setCaseForm({ ...caseForm, sidebarDetails: updated });
                        }}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={detail.val}
                        onChange={(e) => {
                          const updated = [...caseForm.sidebarDetails];
                          updated[idx].val = e.target.value;
                          setCaseForm({ ...caseForm, sidebarDetails: updated });
                        }}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = caseForm.sidebarDetails.filter((_, i) => i !== idx);
                          setCaseForm({ ...caseForm, sidebarDetails: updated });
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCaseForm({
                      ...caseForm,
                      sidebarDetails: [...caseForm.sidebarDetails, { label: "", val: "" }]
                    })}
                    className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                  >
                    <FiPlusCircle /> Add Custom Metric Detail
                  </button>
                </div>

                {/* Testimonial Quote Section customization */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Testimonial Quote Section</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quote Text</label>
                    <textarea
                      rows={3}
                      value={caseForm.quoteText}
                      onChange={(e) => setCaseForm({ ...caseForm, quoteText: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      placeholder="e.g. “Innvikta Arcade turned security training from a chore into a collaborative game.”"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quote Author / Representative (Details)</label>
                    <input
                      type="text"
                      value={caseForm.quoteAuthor}
                      onChange={(e) => setCaseForm({ ...caseForm, quoteAuthor: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Helen Carter, Chief Information Officer"
                    />
                  </div>
                </div>

                {/* Building a Stronger Security Culture Section customization */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Security Culture Section</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Section Title</label>
                    <input
                      type="text"
                      value={caseForm.cultureTitle}
                      onChange={(e) => setCaseForm({ ...caseForm, cultureTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Building a Stronger Security Culture"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-black">Culture Section Paragraphs</label>
                    {(caseForm.cultureParagraphs || []).map((para, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 p-3 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-[#f15a24]">Paragraph #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseForm.cultureParagraphs.filter((_, i) => i !== idx);
                              setCaseForm({ ...caseForm, cultureParagraphs: updated });
                            }}
                            className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Remove Paragraph
                          </button>
                        </div>
                        <ToolbarEditor
                          value={para}
                          onChange={(val) => {
                            const updated = [...caseForm.cultureParagraphs];
                            updated[idx] = val;
                            setCaseForm({ ...caseForm, cultureParagraphs: updated });
                          }}
                          placeholder="Write paragraph content..."
                          rows={4}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCaseForm({
                        ...caseForm,
                        cultureParagraphs: [...(caseForm.cultureParagraphs || []), ""]
                      })}
                      className="flex items-center gap-1.5 text-xs text-[#f15a24] font-bold hover:underline"
                    >
                      <FiPlusCircle /> Add Paragraph Block
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Culture Section Collage Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={caseForm.cultureImage}
                        onChange={(e) => setCaseForm({ ...caseForm, cultureImage: e.target.value })}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="e.g. /images/about-bg.jpeg"
                      />
                      <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md select-none">
                        <FiImage />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const data = await res.json();
                              if (data.success) {
                                setCaseForm({ ...caseForm, cultureImage: data.url });
                                showNotification("success", "Collage image uploaded successfully!");
                              } else {
                                showNotification("error", data.error || "Failed to upload image.");
                              }
                            } catch (err) {
                              showNotification("error", "Error uploading image.");
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Custom CTA Demo Banner customization */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Book a Demo Banner</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Title</label>
                    <input
                      type="text"
                      value={caseForm.ctaTitle}
                      onChange={(e) => setCaseForm({ ...caseForm, ctaTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Ready to Build a Stronger Security Culture?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Description</label>
                    <textarea
                      rows={3}
                      value={caseForm.ctaDescription}
                      onChange={(e) => setCaseForm({ ...caseForm, ctaDescription: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      placeholder="Get a personalized walk-through..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Button Text</label>
                      <input
                        type="text"
                        value={caseForm.ctaButtonText}
                        onChange={(e) => setCaseForm({ ...caseForm, ctaButtonText: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="e.g. Book a Demo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Button URL</label>
                      <input
                        type="text"
                        value={caseForm.ctaButtonUrl}
                        onChange={(e) => setCaseForm({ ...caseForm, ctaButtonUrl: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="e.g. /book-demo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

              <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                <FiSave /> Save Case Study
              </button>
            </form>
            )}

            {/* Newsletters editor */}
            {activeTab === "newsletters" && editorTab === "edit" && (
              <form onSubmit={handleSaveNewsletter} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Edition Title</label>
                  <input
                    type="text"
                    required
                    value={newsletterForm.title}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Read Time</label>
                    <input
                      type="text"
                      value={newsletterForm.readTime}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, readTime: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
                    <input
                      type="text"
                      value={newsletterForm.date}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Description</label>
                  <input
                    type="text"
                    value={newsletterForm.description}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-805"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Content (HTML body)</label>
                  <ToolbarEditor
                    value={newsletterForm.content}
                    onChange={(val) => setNewsletterForm({ ...newsletterForm, content: val })}
                    placeholder="Write newsletter HTML content..."
                    rows={12}
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newsletterForm.image || ""}
                      onChange={(e) => setNewsletterForm({ ...newsletterForm, image: e.target.value })}
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      placeholder="e.g. /images/newsletter-cover.jpg"
                    />
                    <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md select-none">
                      <FiImage />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/admin/upload", {
                              method: "POST",
                              body: formData
                            });
                            const data = await res.json();
                            if (data.success) {
                              setNewsletterForm({ ...newsletterForm, image: data.url });
                              showNotification("success", "Cover image uploaded successfully!");
                            } else {
                              showNotification("error", data.error || "Failed to upload image.");
                            }
                          } catch (err) {
                            showNotification("error", "Error uploading image.");
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Book a Demo Banner customization */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Book a Demo Banner</h4>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 font-bold select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterForm.showCta !== false}
                        onChange={(e) => setNewsletterForm({ ...newsletterForm, showCta: e.target.checked })}
                        className="w-3.5 h-3.5 rounded text-[#f15a24] focus:ring-[#f15a24]"
                      />
                      Show CTA Banner
                    </label>
                  </div>
                  {newsletterForm.showCta !== false && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Title</label>
                        <input
                          type="text"
                          value={newsletterForm.ctaTitle || ""}
                          onChange={(e) => setNewsletterForm({ ...newsletterForm, ctaTitle: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                          placeholder="e.g. Ready to Build a Stronger Security Culture?"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Description</label>
                        <textarea
                          rows={3}
                          value={newsletterForm.ctaDescription || ""}
                          onChange={(e) => setNewsletterForm({ ...newsletterForm, ctaDescription: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                          placeholder="Get a personalized walk-through..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Button Text</label>
                          <input
                            type="text"
                            value={newsletterForm.ctaButtonText || ""}
                            onChange={(e) => setNewsletterForm({ ...newsletterForm, ctaButtonText: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                            placeholder="e.g. Book a Demo"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Button URL</label>
                          <input
                            type="text"
                            value={newsletterForm.ctaButtonUrl || ""}
                            onChange={(e) => setNewsletterForm({ ...newsletterForm, ctaButtonUrl: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                            placeholder="e.g. /book-demo"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 border border-slate-100 rounded-xl p-4 bg-slate-50/30">
                  <input
                    type="checkbox"
                    id="mailSubscribers"
                    checked={newsletterForm.mailSubscribers}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, mailSubscribers: e.target.checked })}
                    className="w-4 h-4 rounded text-[#f15a24] focus:ring-[#f15a24]"
                  />
                  <div className="flex flex-col">
                    <label htmlFor="mailSubscribers" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <FiMail className="text-[#f15a24]" /> Broadcast & Mail All Subscribers
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">When checked, a branded HTML copy of this edition will be mailed out instantly to all registered subscribers upon saving.</span>
                  </div>
                </div>

                <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                  <FiSave /> Publish Newsletter
                </button>
              </form>
            )}

            {/* Platform Updates Editor */}
            {activeTab === "updates" && editorTab === "edit" && (
              <form onSubmit={handleSaveUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update Title</label>
                    <input
                      type="text"
                      required
                      value={updateForm.title}
                      onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category (e.g. SIMULATIONS, INNVIKTA ARCADE)</label>
                    <input
                      type="text"
                      required
                      value={updateForm.category}
                      onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date (e.g. May 12, 2026)</label>
                    <input
                      type="text"
                      required
                      value={updateForm.date}
                      onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Graphic Banner Text</label>
                    <input
                      type="text"
                      required
                      value={updateForm.graphicText}
                      onChange={(e) => setUpdateForm({ ...updateForm, graphicText: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Banner Image URL</label>
                    <input
                      type="text"
                      required
                      value={updateForm.image}
                      onChange={(e) => setUpdateForm({ ...updateForm, image: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">URL Slug (Auto-generated if empty)</label>
                    <input
                      type="text"
                      value={updateForm.slug}
                      onChange={(e) => setUpdateForm({ ...updateForm, slug: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                      placeholder="e.g. custom-slug-value"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Description</label>
                  <textarea
                    rows={3}
                    required
                    value={updateForm.desc}
                    onChange={(e) => setUpdateForm({ ...updateForm, desc: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-808"
                  />
                </div>

                <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                  <FiSave /> Save Platform Update
                </button>
              </form>
            )}
            {/* Live Preview Tabs */}
            {editorTab === "preview" && (
              <div className="space-y-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-500 flex justify-between items-center">
                  <span>LIVE VISUAL PREVIEW MODE (Real-time Mock rendering)</span>
                  <span className="text-[#f15a24]">Dynamic Content Mock</span>
                </div>

                {activeTab === "blogs" && (
                  <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-4xl mx-auto text-left">
                    <h1 className="text-3xl font-bold font-secondary text-slate-900 leading-tight">{blogForm.title || "Untitled Blog Post"}</h1>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-4">
                      <span>By {blogForm.authorName}</span>
                      <span>•</span>
                      <span>Published {blogForm.date || new Date().toLocaleDateString()}</span>
                    </div>
                    {blogForm.image && (
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200">
                        <img src={blogForm.image} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="prose prose-slate text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-700 pt-4">
                      {blogForm.content || "Start writing content in the editor tab to see it previewed here..."}
                    </div>
                  </div>
                )}

                {activeTab === "cases" && (
                  <div className="space-y-8 max-w-5xl mx-auto text-left">
                    {/* Hero Section */}
                    <div 
                      className="relative text-white py-16 bg-cover bg-center rounded-3xl overflow-hidden min-h-[250px] flex items-end shadow-sm"
                      style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.75)), url(${caseForm.image || '/images/about-bg.jpeg'})` }}
                    >
                      <div className="p-8 w-full relative z-10">
                        <span className="text-[#f15a24] font-black text-[10px] tracking-wider uppercase mb-1 block">CASE STUDY PREVIEW</span>
                        <h1 className="text-3xl font-bold text-white leading-snug">{caseForm.title || "Untitled Case Study"}</h1>
                        <p className="text-slate-200 text-sm mt-2 font-medium max-w-2xl">{caseForm.subtitle || "Case study subheader"}</p>
                      </div>
                    </div>

                    {/* Measure outcomes */}
                    <div className="bg-white p-6 rounded-3xl border border-orange-100/50">
                      <h3 className="text-sm font-bold text-[#f15a24] mb-4 uppercase tracking-wider">Outcomes</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {(caseForm.atGlance || []).map((point, idx) => (
                          <div key={idx} className="border-l-2 border-[#f15a24] pl-3 py-0.5">
                            <p className="text-slate-700 text-xs font-semibold leading-relaxed">{point || "Highlight text..."}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 space-y-8">
                        {/* Summary */}
                        <div className="space-y-3">
                          <h2 className="text-xl font-bold text-slate-900">{caseForm.summaryTitle || "Summary Section"}</h2>
                          {(caseForm.summaryParagraphs || []).map((para, idx) => (
                            <p key={idx} className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">{para}</p>
                          ))}
                        </div>

                        {/* Challenge */}
                        <div className="space-y-3 pt-6 border-t border-slate-100">
                          <h2 className="text-xl font-bold text-slate-900">{caseForm.challengeTitle || "Challenge Section"}</h2>
                          {(caseForm.challengeParagraphs || []).map((para, idx) => (
                            <p key={idx} className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">{para}</p>
                          ))}
                        </div>

                        {/* Solution */}
                        <div className="space-y-3 pt-6 border-t border-slate-100">
                          <h2 className="text-xl font-bold text-slate-900">{caseForm.solutionTitle || "Solution Section"}</h2>
                          {(caseForm.solutionParagraphs || []).map((para, idx) => (
                            <p key={idx} className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">{para}</p>
                          ))}
                        </div>
                      </div>

                      {/* Right Card */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="text-[10px] font-bold text-[#f15a24] uppercase tracking-wider block mb-1">Company</span>
                          <span className="text-sm font-bold text-slate-800">{caseForm.title || "Representative logo"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Industry</span>
                            <span className="text-xs font-bold text-slate-700">{caseForm.industryLabel}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</span>
                            <span className="text-xs font-bold text-slate-700">{caseForm.location || "Global"}</span>
                          </div>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Challenge Summary</span>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{caseForm.sidebarChallenge || "Details..."}</p>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                          {(caseForm.sidebarDetails || []).map((detail, idx) => (
                            <div key={idx}>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{detail.label || "Metric"}</span>
                              <span className="text-xs font-bold text-slate-700">{detail.val || "Value"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Collage & Quote */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-slate-900">Building a Stronger Security Culture</h3>
                        <p className="text-slate-600 text-xs leading-relaxed">Building a security culture requires a program built around real behavior analytics, not slide library training. By triggering short, repeated reinforcement modules, employees understand the role they play in preserving compliance frameworks and cybersecurity defenses.</p>
                      </div>
                      <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src="/images/about-bg.jpeg" alt="collage" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center space-y-4">
                      <p className="text-sm font-medium italic text-slate-600 leading-relaxed">&ldquo;{caseForm.quoteText || "Insert testimonial quote..."}&rdquo;</p>
                      <cite className="block text-xs font-bold text-[#f15a24] uppercase tracking-wider not-italic">{caseForm.quoteAuthor}</cite>
                    </div>

                    {/* Custom Sections */}
                    {(caseForm.customSections || []).map((section, sIdx) => (
                      <div key={sIdx} className="bg-white p-8 rounded-3xl border border-slate-100 space-y-4">
                        <h2 className="text-xl font-bold text-slate-900">{section.title || "Custom Section Title"}</h2>
                        {(section.paragraphs || []).map((para, pIdx) => (
                          <p key={pIdx} className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap">{para}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "newsletters" && (
                  <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto text-left">
                    <span className="text-[#f15a24] font-bold text-[10px] tracking-wider uppercase block">WEEKLY NEWSLETTER</span>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">{newsletterForm.title || "Untitled Newsletter Edition"}</h1>
                    <div className="flex gap-2 text-xs text-slate-500 border-b border-slate-100 pb-3">
                      <span>{newsletterForm.date || new Date().toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{newsletterForm.readTime}</span>
                    </div>
                    <p className="text-slate-600 text-xs font-semibold">{newsletterForm.description}</p>
                    <div 
                      className="text-xs leading-relaxed prose prose-slate max-w-none pt-4 whitespace-pre-wrap font-mono text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200"
                      dangerouslySetInnerHTML={{ __html: newsletterForm.content || "<p>No HTML body written yet...</p>" }}
                    />
                  </div>
                )}

                {activeTab === "updates" && (
                  <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto text-left">
                    <div className="flex items-center gap-2 text-xs text-[#f15a24] font-bold">
                      <span>{updateForm.category}</span>
                      <span>•</span>
                      <span className="text-slate-400">{updateForm.date}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{updateForm.title || "Untitled Platform Update"}</h1>
                    {updateForm.image && (
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200">
                        <img src={updateForm.image} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-slate-700 text-xs leading-relaxed pt-2">{updateForm.desc || "Write platform update details..."}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 animate-slide-up ${
            toast.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}>
            {toast.type === "success" ? <FiCheck className="text-xl" /> : <FiAlertCircle className="text-xl" />}
            <span className="font-bold text-xs">{toast.message}</span>
          </div>
        )}

      </div>
    </div>
  );
}
