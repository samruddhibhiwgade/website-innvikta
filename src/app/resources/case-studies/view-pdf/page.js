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
    // Redirect mobile users to open the PDF natively
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && file) {
      const cleanFilename = file.replace(/[^a-zA-Z0-9.\-_]/g, "");
      window.location.replace(`/api/pdf/${cleanFilename}`);
      return;
    }

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
      <div className="w-full bg-slate-900" style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}>
        <iframe 
          src={`/api/pdf/${cleanFilename}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full border-none"
          title="Secure Document Preview"
          onContextMenu={(e) => e.preventDefault()}
        />
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
