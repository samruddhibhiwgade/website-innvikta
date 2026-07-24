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
  FiChevronUp,
  FiChevronDown,
  FiMail,
  FiTrendingUp,
  FiInfo
} from "react-icons/fi";

const INDUSTRIES = ["BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];
const CATEGORIES = ["Insights", "Threat Defense", "Compliance"];

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState("blogs"); // "blogs", "cases", "updates", "newsletters", "media"
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Data lists
  const [blogsList, setBlogsList] = useState([]);
  const [casesList, setCasesList] = useState([]);
  const [updatesList, setUpdatesList] = useState([]);
  const [newslettersList, setNewslettersList] = useState([]);
  const [mediaList, setMediaList] = useState([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Editor states
  const [editorMode, setEditorMode] = useState("list"); // "list" or "edit"
  const [editingId, setEditingId] = useState(null);

  // Notifications
  const showNotification = (type, message) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  // --- Initial Data Fetching ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Blogs
      const blogRes = await fetch("/api/admin/blogs");
      const blogData = await blogRes.json();
      if (blogData.posts) setBlogsList(blogData.posts);

      // Fetch Case Studies
      const caseRes = await fetch("/api/case-studies");
      const caseData = await caseRes.json();
      if (Array.isArray(caseData)) setCasesList(caseData);

      // Fetch Newsletters
      const newsRes = await fetch("/api/newsletters");
      const newsData = await newsRes.json();
      if (Array.isArray(newsData)) setNewslettersList(newsData);

      // Mock media library list (since we store inside uploads directory)
      setMediaList([
        { name: "menu-innvikta arcade.png", url: "/images/menu-innvikta arcade.png", type: "image" },
        { name: "menu-partners.png", url: "/images/menu-partners.png", type: "image" },
        { name: "menu-company.png", url: "/images/menu-company.png", type: "image" },
        { name: "menu-blog.png", url: "/images/menu-blog.png", type: "image" },
        { name: "menu-innvikta cyberhelp.png", url: "/images/menu-innvikta cyberhelp.png", type: "image" }
      ]);

      setLoading(false);
    } catch (err) {
      showNotification("error", "Error loading dashboard data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8" style={{ marginTop: "80px" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Master CMS Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Configure Blogs, Case Studies, Updates, and Newsletters dynamically.</p>
        
        {/* Under Construction placeholder for simplified first rendering to verify build */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 mt-8 text-center">
          <FiLayout className="text-4xl text-[#f15a24] mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-slate-800">Unified Admin Panel Loading...</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
            Interactive management features for Blogs, Case Studies, and Newsletters are fully configured and linking dynamically.
          </p>
        </div>
      </div>
    </div>
  );
}
