"use client";

import React, { useState, useEffect } from "react";
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiImage, 
  FiX, 
  FiCheck,
  FiMapPin,
  FiClock,
  FiFileText,
  FiEye,
  FiChevronLeft
} from "react-icons/fi";
import Link from "next/link";

const INDUSTRIES = ["BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list" or "form"
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [industry, setIndustry] = useState("BFSI");
  const [industryLabel, setIndustryLabel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [atGlance, setAtGlance] = useState([""]);
  const [summaryTitle, setSummaryTitle] = useState("");
  const [summaryParagraphs, setSummaryParagraphs] = useState([""]);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeParagraphs, setChallengeParagraphs] = useState([""]);
  const [solutionParagraphs, setSolutionParagraphs] = useState([""]);
  const [sidebarChallenge, setSidebarChallenge] = useState("");
  const [sidebarDetails, setSidebarDetails] = useState([
    { label: "Target Coverage", val: "" },
    { label: "Delivery Model", val: "" }
  ]);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [contentSource, setContentSource] = useState("manual");
  const [textAlignment, setTextAlignment] = useState("justify");

  // Fetch case studies on load
  const fetchCaseStudies = async () => {
    try {
      const res = await fetch("/api/case-studies");
      const data = await res.json();
      setCaseStudies(data);
      setLoading(false);
    } catch (err) {
      showToast("Failed to fetch case studies", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!editingId && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  }, [title, editingId]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle("");
    setSubtitle("");
    setSlug("");
    setIndustry("BFSI");
    setIndustryLabel("Banking & Finance");
    setDescription("");
    setImage("");
    setLocation("");
    setTimeline("");
    setAtGlance([""]);
    setSummaryTitle("");
    setSummaryParagraphs([""]);
    setChallengeTitle("");
    setChallengeParagraphs([""]);
    setSolutionParagraphs([""]);
    setSidebarChallenge("");
    setSidebarDetails([
      { label: "Target Coverage", val: "" },
      { label: "Delivery Model", val: "" }
    ]);
    setQuoteText("");
    setQuoteAuthor("");
    setPdfUrl("");
    setContentSource("manual");
    setTextAlignment("justify");
    setView("form");
  };

  const handleOpenEdit = (study) => {
    setEditingId(study.id);
    setTitle(study.title || "");
    setSubtitle(study.subtitle || "");
    setSlug(study.slug || "");
    setIndustry(study.industry || "BFSI");
    setIndustryLabel(study.industryLabel || "");
    setDescription(study.description || "");
    setImage(study.image || "");
    setLocation(study.location || "");
    setTimeline(study.timeline || "");
    setAtGlance(study.atGlance || [""]);
    setSummaryTitle(study.summaryTitle || "");
    setSummaryParagraphs(study.summaryParagraphs || [""]);
    setChallengeTitle(study.challengeTitle || "");
    setChallengeParagraphs(study.challengeParagraphs || [""]);
    setSolutionParagraphs(study.solutionParagraphs || [""]);
    setSidebarChallenge(study.sidebarChallenge || "");
    setSidebarDetails(study.sidebarDetails || [
      { label: "Target Coverage", val: "" },
      { label: "Delivery Model", val: "" }
    ]);
    setQuoteText(study.quoteText || "");
    setQuoteAuthor(study.quoteAuthor || "");
    setPdfUrl(study.pdfUrl || "");
    setContentSource(study.pdfUrl ? "pdf" : "manual");
    setTextAlignment(study.textAlignment || "justify");
    setView("form");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this case study? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/case-studies?id=${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (resData.success) {
        setCaseStudies(resData.data);
        showToast("Case study deleted successfully");
      } else {
        showToast("Failed to delete case study", "error");
      }
    } catch (err) {
      showToast("Server error during deletion", "error");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !slug || (contentSource === "manual" && !description)) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (contentSource === "pdf" && !pdfUrl) {
      showToast("Please upload a PDF file", "error");
      return;
    }

    const payload = {
      id: editingId,
      title,
      subtitle,
      slug,
      industry,
      industryLabel: industryLabel || industry,
      description: contentSource === "manual" ? description : "PDF Case Study Document",
      image: image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=600&q=80",
      location,
      timeline,
      atGlance: contentSource === "manual" ? atGlance.filter(Boolean) : [],
      summaryTitle: contentSource === "manual" ? summaryTitle : "",
      summaryParagraphs: contentSource === "manual" ? summaryParagraphs.filter(Boolean) : [],
      challengeTitle: contentSource === "manual" ? challengeTitle : "",
      challengeParagraphs: contentSource === "manual" ? challengeParagraphs.filter(Boolean) : [],
      solutionParagraphs: contentSource === "manual" ? solutionParagraphs.filter(Boolean) : [],
      sidebarChallenge: contentSource === "manual" ? sidebarChallenge : "",
      sidebarDetails: contentSource === "manual" ? sidebarDetails.filter(d => d.label && d.val) : [],
      quoteText: contentSource === "manual" ? quoteText : "",
      quoteAuthor: contentSource === "manual" ? quoteAuthor : "",
      pdfUrl: contentSource === "pdf" ? pdfUrl : "",
      textAlignment: contentSource === "manual" ? textAlignment : "justify"
    };

    try {
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();
      if (resData.success) {
        setCaseStudies(resData.data);
        setView("list");
        showToast(editingId ? "Case study updated successfully" : "New case study created successfully");
      } else {
        showToast("Failed to save case study", "error");
      }
    } catch (err) {
      showToast("Server error during save", "error");
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      showToast("Uploading PDF...", "success");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setPdfUrl(data.url);
        showToast("PDF uploaded successfully!");
      } else {
        showToast("Upload failed: " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      showToast("Upload failed due to connection error", "error");
    }
  };

  // Helper dynamic fields addition/removal
  const handleAddListField = (state, setState) => setState([...state, ""]);
  const handleRemoveListField = (index, state, setState) => {
    if (state.length === 1) return;
    setState(state.filter((_, i) => i !== index));
  };
  const handleUpdateListField = (index, val, state, setState) => {
    const updated = [...state];
    updated[index] = val;
    setState(updated);
  };

  const filteredStudies = caseStudies.filter(study => 
    study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form View Layout
  if (view === "form") {
    return (
      <div className="min-h-screen bg-slate-50 py-12 font-sans relative overflow-hidden text-slate-800" style={{ paddingTop: "7rem" }}>
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200 rounded-full blur-[100px] -z-10 opacity-60" />

        {/* Floating Toast Alert */}
        {toast.show && (
          <div className={`fixed top-24 right-8 z-50 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 border transition-all duration-300 ${
            toast.type === "success" 
              ? "bg-white border-green-200 text-green-700" 
              : "bg-white border-red-200 text-red-700"
          }`}>
            <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        )}

        <div className="container max-w-5xl mx-auto px-6">
          {/* Form Header */}
          <div className="flex flex-col items-start gap-3 mb-8 text-left">
            <button 
              onClick={() => setView("list")}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#f15a24] font-bold text-sm transition-colors cursor-pointer"
            >
              <FiChevronLeft className="text-base" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mt-2">
              {editingId ? "Edit Case Study" : "Create New Case Study"}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {editingId ? `Editing Record ID: ${editingId}` : "Specify client details and metrics to add a story"}
            </p>
          </div>

          {/* Form Layout */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-left">
            <form onSubmit={handleSave} className="space-y-8">
              {/* 1. Basic Metadata Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Global Bank Reduces Phishing"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Slug (URL endpoint) *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. global-bank-phishing"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subtitle / Main Card Headline</label>
                <input 
                  type="text" 
                  placeholder="e.g. Global Bank Reduces Phishing Susceptibility by 82%"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Industry Sector</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Industry Label</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Banking & Finance"
                    value={industryLabel}
                    onChange={(e) => setIndustryLabel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. North America, Global"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium font-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Timeline Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 6 Months, Ongoing"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium font-secondary"
                  />
                </div>
                <div />
              </div>

              {/* Content Source Selector */}
              <div className="border-t border-slate-100 pt-6 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Case Study Content Source</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setContentSource("manual")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      contentSource === "manual"
                        ? "bg-orange-50 border-[#f15a24] text-[#f15a24]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Manual Text & Sections
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSource("pdf")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      contentSource === "pdf"
                        ? "bg-orange-50 border-[#f15a24] text-[#f15a24]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Direct PDF Upload
                  </button>
                </div>
              </div>

              {contentSource === "pdf" && (
                <div className="border-t border-slate-100 pt-6 bg-orange-50/20 p-6 rounded-2xl border border-orange-100 text-left">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Upload PDF Document</h3>
                  <p className="text-xs text-slate-500 mb-4 font-medium">Select a PDF file. Users will view this PDF directly when opening this case study.</p>
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={handlePdfUpload}
                      className="text-sm font-semibold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-orange-50 file:text-[#f15a24] hover:file:bg-orange-100 cursor-pointer"
                    />
                    {pdfUrl && (
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl text-xs font-bold">
                        <FiCheck /> PDF Linked: <a href={pdfUrl} target="_blank" rel="noreferrer" className="underline hover:text-green-800">{pdfUrl.split('/').pop()}</a>
                        <button type="button" onClick={() => setPdfUrl("")} className="text-slate-400 hover:text-red-500 ml-2">
                          <FiX />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {contentSource === "manual" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Short Grid Description *</label>
                    <textarea 
                      required
                      rows="3"
                      placeholder="Provide a brief summary for the main grid page..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium leading-relaxed"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-base font-bold text-slate-900 mb-4">At a Glance Details (Bullets)</h3>
                    <div className="space-y-3">
                      {atGlance.map((point, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input 
                            type="text"
                            placeholder={`Key metric point ${index + 1}...`}
                            value={point}
                            onChange={(e) => handleUpdateListField(index, e.target.value, atGlance, setAtGlance)}
                            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium"
                          />
                          <button 
                            type="button"
                            onClick={() => handleRemoveListField(index, atGlance, setAtGlance)}
                            className="p-2 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddListField(atGlance, setAtGlance)}
                        className="inline-flex items-center gap-1.5 text-[#f15a24] hover:text-orange-600 font-bold text-xs pt-1 cursor-pointer"
                      >
                        <FiPlus /> Add bullet item
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 space-y-6">
                                        {/* Text Alignment */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Text Alignment (in detail page)
                      </label>
                      <select
                        value={textAlignment}
                        onChange={(e) => setTextAlignment(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                      >
                        <option value="justify">Justify</option>
                        <option value="left">Align Left</option>
                        <option value="center">Align Center</option>
                        <option value="right">Align Right</option>
                      </select>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Story Content Blocks</h3>

                    {/* Summary Block */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Summary Title & Paragraphs</label>
                      <input 
                        type="text" 
                        placeholder="Summary Title e.g. Preserving Client Confidentiality"
                        value={summaryTitle}
                        onChange={(e) => setSummaryTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                      />
                      <div className="space-y-3">
                        {summaryParagraphs.map((para, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <textarea 
                              rows="2"
                              placeholder={`Summary Paragraph ${index + 1}...`}
                              value={para}
                              onChange={(e) => handleUpdateListField(index, e.target.value, summaryParagraphs, setSummaryParagraphs)}
                              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium leading-relaxed"
                            />
                            <button 
                              type="button"
                              onClick={() => handleRemoveListField(index, summaryParagraphs, setSummaryParagraphs)}
                              className="p-2 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 rounded-xl transition-colors mt-2"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddListField(summaryParagraphs, setSummaryParagraphs)}
                          className="inline-flex items-center gap-1.5 text-[#f15a24] hover:text-orange-600 font-bold text-xs pt-1 cursor-pointer"
                        >
                          <FiPlus /> Add paragraph
                        </button>
                      </div>
                    </div>

                    {/* Challenge Block */}
                    <div className="space-y-4 pt-4 border-t border-slate-100/50">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Challenge Title & Paragraphs</label>
                      <input 
                        type="text" 
                        placeholder="Challenge Title e.g. Minimizing Potential Data Breaches"
                        value={challengeTitle}
                        onChange={(e) => setChallengeTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                      />
                      <div className="space-y-3">
                        {challengeParagraphs.map((para, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <textarea 
                              rows="2"
                              placeholder={`Challenge Paragraph ${index + 1}...`}
                              value={para}
                              onChange={(e) => handleUpdateListField(index, e.target.value, challengeParagraphs, setChallengeParagraphs)}
                              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium leading-relaxed"
                            />
                            <button 
                              type="button"
                              onClick={() => handleRemoveListField(index, challengeParagraphs, setChallengeParagraphs)}
                              className="p-2 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 rounded-xl transition-colors mt-2"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddListField(challengeParagraphs, setChallengeParagraphs)}
                          className="inline-flex items-center gap-1.5 text-[#f15a24] hover:text-orange-600 font-bold text-xs pt-1 cursor-pointer"
                        >
                          <FiPlus /> Add paragraph
                        </button>
                      </div>
                    </div>

                    {/* Solution Paragraphs */}
                    <div className="space-y-4 pt-4 border-t border-slate-100/50">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Solution Paragraphs</label>
                      <div className="space-y-3">
                        {solutionParagraphs.map((para, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <textarea 
                              rows="2"
                              placeholder={`Solution Paragraph ${index + 1}...`}
                              value={para}
                              onChange={(e) => handleUpdateListField(index, e.target.value, solutionParagraphs, setSolutionParagraphs)}
                              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium leading-relaxed"
                            />
                            <button 
                              type="button"
                              onClick={() => handleRemoveListField(index, solutionParagraphs, setSolutionParagraphs)}
                              className="p-2 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 rounded-xl transition-colors mt-2"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddListField(solutionParagraphs, setSolutionParagraphs)}
                          className="inline-flex items-center gap-1.5 text-[#f15a24] hover:text-orange-600 font-bold text-xs pt-1 cursor-pointer"
                        >
                          <FiPlus /> Add paragraph
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quote text */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quote Text</label>
                      <textarea 
                        rows="4"
                        placeholder="“From the board down, security compliance is our priority...”"
                        value={quoteText}
                        onChange={(e) => setQuoteText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium italic"
                      />
                    </div>
                    {/* Quote Author */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quote Author</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Jane Doe, Head of Risk & Compliance"
                        value={quoteAuthor}
                        onChange={(e) => setQuoteAuthor(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 mb-1">Sidebar Card Info</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sidebar Challenge Summary</label>
                      <textarea 
                        rows="2"
                        placeholder="Short challenge summary for the sidebar box..."
                        value={sidebarChallenge}
                        onChange={(e) => setSidebarChallenge(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-sm font-medium leading-relaxed"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sidebarDetails.map((detail, idx) => (
                        <div key={idx} className="space-y-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Detail {idx + 1} Label</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Target Coverage"
                            value={detail.label}
                            onChange={(e) => {
                              const updated = [...sidebarDetails];
                              updated[idx].label = e.target.value;
                              setSidebarDetails(updated);
                            }}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-xs font-bold"
                          />
                          <input 
                            type="text" 
                            placeholder="e.g. 12,000+ Endpoints"
                            value={detail.val}
                            onChange={(e) => {
                              const updated = [...sidebarDetails];
                              updated[idx].val = e.target.value;
                              setSidebarDetails(updated);
                            }}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-orange-500 text-xs font-semibold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Submit button wrapper */}
              <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
                <button 
                  type="button" 
                  onClick={() => setView("list")}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 bg-[#f15a24] hover:bg-orange-600 text-white font-bold rounded-xl text-sm shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard List View Layout
  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans relative overflow-hidden text-slate-800" style={{ paddingTop: "7rem" }}>
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200 rounded-full blur-[100px] -z-10 opacity-60" />

      {/* Floating Toast Alert */}
      {toast.show && (
        <div className={`fixed top-24 right-8 z-50 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 border transition-all duration-300 ${
          toast.type === "success" 
            ? "bg-white border-green-200 text-green-700" 
            : "bg-white border-red-200 text-red-700"
        }`}>
          <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="container max-w-7xl mx-auto px-6">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="text-left">
            <Link href="/resources/case-studies" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#f15a24] font-bold text-sm transition-colors mb-3">
              <FiChevronLeft className="text-base" /> Back to Website
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
              Case Studies Admin Panel
            </h1>
            <p className="text-slate-500 text-base font-medium">
              Manage enterprise success stories, add metrics, and update client quotes.
            </p>
          </div>

          <button 
            onClick={handleOpenCreate}
            className="self-start md:self-center inline-flex items-center gap-2 bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 cursor-pointer"
          >
            <FiPlus className="text-lg" /> Create Case Study
          </button>
        </div>

        {/* Dashboard Search & Controls */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input 
              type="text" 
              placeholder="Search case studies by name, industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors font-medium text-sm"
            />
          </div>
          <div className="text-slate-400 text-sm font-bold pr-2 whitespace-nowrap">
            Showing {filteredStudies.length} of {caseStudies.length} records
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-[#f15a24] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <span className="text-slate-500 font-bold">Loading Database Records...</span>
          </div>
        ) : filteredStudies.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl py-20 text-center shadow-sm">
            <FiFileText className="text-5xl text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-1">No Case Studies Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6 text-sm font-medium">
              Create a new case study to list it dynamically in the resources section.
            </p>
            <button 
              onClick={handleOpenCreate}
              className="bg-[#f15a24] hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              Add Your First Record
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div 
                key={study.id} 
                className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group text-left"
              >
                {/* Image & Tag */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-100 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {study.industry}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 min-h-[50px] line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold mb-4 font-mono">
                      SLUG: /resources/case-studies/{study.slug}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                      {study.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                    <Link 
                      href={`/resources/case-studies/${study.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-bold text-xs transition-colors"
                    >
                      <FiEye className="text-sm" /> Preview
                    </Link>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleOpenEdit(study)}
                        className="p-2 border border-slate-200 hover:border-slate-800 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Edit study"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDelete(study.id)}
                        className="p-2 border border-red-100 hover:bg-red-50 hover:border-red-200 rounded-lg text-red-500 transition-all cursor-pointer"
                        title="Delete study"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
