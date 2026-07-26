"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import Link from "next/link";
import SeoMeta from "@layouts/partials/SeoMeta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";

function PDFViewerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const file = searchParams.get("file");

  useEffect(() => {
    // Disable right click to protect PDF contents from saving
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable keyboard print/save shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "p" || e.key === "u")) ||
        (e.metaKey && (e.key === "s" || e.key === "p" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!file) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold mb-4">No PDF Document Specified</h2>
        <Link href="/resources/case-studies" className="text-[#f15a24] hover:underline font-bold">
          Return to Case Studies
        </Link>
      </div>
    );
  }

  // Sanitize filename
  const cleanFilename = file.replace(/[^a-zA-Z0-9.\-_]/g, "");

  return (
    <GSAPWrapper>
      <SeoMeta title="View Document | Innvikta" description="Secure Document Viewer" />
      <div className="min-h-screen bg-slate-900 flex flex-col text-slate-100 font-sans">
        
        {/* Secure Viewer Header */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Link 
              href="/resources/case-studies"
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              <FiArrowLeft /> Back to Case Studies
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full font-semibold">
            <FiShield className="text-[#f15a24] animate-pulse" />
            <span>Secure Preview Mode (Download Disabled)</span>
          </div>

          <div className="w-[120px] text-right text-xs font-bold text-[#f15a24]">
            Innvikta Secure
          </div>
        </header>

        {/* PDF Frame Container */}
        <main className="flex-1 bg-slate-900 flex justify-center items-center p-0 md:p-6">
          <div className="w-full max-w-5xl h-[calc(100vh-140px)] bg-slate-950 rounded-none md:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative">
            
            {/* The PDF iframe pointing directly to the sanitized API proxy with toolbar=0 parameters */}
            <iframe 
              src={`/api/pdf/${cleanFilename}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title="Secure Document Preview"
              onContextMenu={(e) => e.preventDefault()}
            />
            
            {/* Overlay to intercept right-clicks or interactions on outer iframe areas */}
            <div 
              className="absolute inset-x-0 top-0 h-10 bg-transparent pointer-events-none" 
              style={{ userSelect: "none" }}
            />
          </div>
        </main>
      </div>
    </GSAPWrapper>
  );
}

export default function PDFViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#f15a24] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  );
}
