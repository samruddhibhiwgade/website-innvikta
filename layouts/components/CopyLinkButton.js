"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopyLink} 
      className="text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-slate-50 hover:bg-orange-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5"
    >
      {isCopied ? "Copied!" : "Copy Link"}
    </button>
  );
}
