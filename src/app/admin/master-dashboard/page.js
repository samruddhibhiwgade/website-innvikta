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

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState("blogs"); // "blogs", "cases", "newsletters"
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Data lists
  const [blogsList, setBlogsList] = useState([]);
  const [casesList, setCasesList] = useState([]);
  const [newslettersList, setNewslettersList] = useState([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Editor states
  const [editorMode, setEditorMode] = useState("list"); // "list" or "edit"
  const [editingId, setEditingId] = useState(null);

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
    summaryParagraphs: [""],
    challengeTitle: "",
    challengeParagraphs: [""],
    solutionParagraphs: [""],
    sidebarChallenge: "",
    sidebarDetails: [
      { label: "Target Coverage", val: "" },
      { label: "Delivery Model", val: "" }
    ],
    quoteText: "",
    quoteAuthor: ""
  });

  const [newsletterForm, setNewsletterForm] = useState({
    title: "",
    slug: "",
    description: "",
    date: "",
    readTime: "5 min read",
    author: "Compliance Team",
    category: "Insights",
    content: "",
    mailSubscribers: false
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
    try {
      const payload = { ...caseForm };
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
      summaryParagraphs: study.summaryParagraphs || [""],
      challengeTitle: study.challengeTitle || "",
      challengeParagraphs: study.challengeParagraphs || [""],
      solutionParagraphs: study.solutionParagraphs || [""],
      sidebarChallenge: study.sidebarChallenge || "",
      sidebarDetails: study.sidebarDetails || [
        { label: "Target Coverage", val: "" },
        { label: "Delivery Model", val: "" }
      ],
      quoteText: study.quoteText || "",
      quoteAuthor: study.quoteAuthor || ""
    });
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
      mailSubscribers: false
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
                    solutionParagraphs: [""],
                    sidebarChallenge: "",
                    sidebarDetails: [
                      { label: "Target Coverage", val: "" },
                      { label: "Delivery Model", val: "" }
                    ],
                    quoteText: "",
                    quoteAuthor: ""
                  });
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
                    mailSubscribers: false
                  });
                }
                setEditorMode("edit");
              }}
              className="flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 !text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-xs"
            >
              <FiPlus />
              <span>Add New {activeTab === "blogs" ? "Blog" : activeTab === "cases" ? "Case Study" : "Newsletter"}</span>
            </button>
          )}
        </div>

        {/* Dynamic tabs */}
        {editorMode === "list" && (
          <div className="flex gap-2 border-b border-slate-200 mb-6 pb-px">
            {["blogs", "cases", "newsletters"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-bold text-xs capitalize transition-all border-b-2 -mb-px cursor-pointer ${
                  activeTab === tab 
                    ? "border-[#f15a24] text-[#f15a24]" 
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "cases" ? "Case Studies" : tab}
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
          </div>
        ) : (
          /* Editors Mode */
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? "Edit" : "Create New"} {activeTab === "blogs" ? "Blog Post" : activeTab === "cases" ? "Case Study" : "Newsletter"}
              </h3>
              <button 
                onClick={() => setEditorMode("list")}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
              >
                <FiArrowLeft /> Back to List
              </button>
            </div>

            {/* Blogs editor */}
            {activeTab === "blogs" && (
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
                  <textarea
                    rows={12}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white"
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
            {activeTab === "cases" && (
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

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={caseForm.description}
                    onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">At Glance Highlights (One per line)</label>
                  <textarea
                    rows={4}
                    value={caseForm.atGlance.join("\n")}
                    onChange={(e) => setCaseForm({ ...caseForm, atGlance: e.target.value.split("\n") })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-805"
                  />
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

                <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                  <FiSave /> Save Case Study
                </button>
              </form>
            )}

            {/* Newsletters editor */}
            {activeTab === "newsletters" && (
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
                  <textarea
                    rows={10}
                    value={newsletterForm.content}
                    onChange={(e) => setNewsletterForm({ ...newsletterForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#f15a24] focus:bg-white"
                  />
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
