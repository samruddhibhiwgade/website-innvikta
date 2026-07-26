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
  FiAlertCircle,
  FiArchive
} from "react-icons/fi";

const INDUSTRIES = ["BFSI", "Healthcare", "Insurance", "IT & Services", "Manufacturing", "Government"];
const CATEGORIES = ["Insights", "Threat Defense", "Compliance"];

// HTML to Markdown converter
const convertHtmlToMarkdown = (htmlString) => {
  if (typeof window === "undefined") return htmlString;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const body = doc.body;

  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    let childrenContent = "";
    node.childNodes.forEach((child) => {
      childrenContent += traverse(child);
    });

    const tagName = node.tagName.toLowerCase();

    switch (tagName) {
      case "h1": return `\n# ${childrenContent.trim()}\n`;
      case "h2": return `\n## ${childrenContent.trim()}\n`;
      case "h3": return `\n### ${childrenContent.trim()}\n`;
      case "h4": return `\n#### ${childrenContent.trim()}\n`;
      case "h5": return `\n##### ${childrenContent.trim()}\n`;
      case "h6": return `\n###### ${childrenContent.trim()}\n`;
      case "p": return `\n${childrenContent.trim()}\n`;
      case "br": return `\n`;
      case "b":
      case "strong":
        return `**${childrenContent.trim()}**`;
      case "i":
      case "em":
        return `*${childrenContent.trim()}*`;
      case "a":
        const href = node.getAttribute("href") || "#";
        return `[${childrenContent.trim()}](${href})`;
      case "li":
        return `\n- ${childrenContent.trim()}`;
      case "ul":
        return `\n${childrenContent.trim()}\n`;
      case "ol": {
        let items = "";
        let count = 1;
        node.childNodes.forEach((child) => {
          if (child.tagName && child.tagName.toLowerCase() === "li") {
            items += `\n${count++}. ${traverse(child).replace(/^\n-\s*/, "").trim()}`;
          }
        });
        return `\n${items}\n`;
      }
      case "table": {
        let mdTable = "\n";
        const rows = Array.from(node.querySelectorAll("tr"));
        if (rows.length === 0) return "";
        const headers = Array.from(rows[0].querySelectorAll("th, td")).map(el => el.textContent.trim());
        mdTable += `| ${headers.join(" | ")} |\n`;
        mdTable += `| ${headers.map(() => "---").join(" | ")} |\n`;
        for (let i = 1; i < rows.length; i++) {
          const cells = Array.from(rows[i].querySelectorAll("td, th")).map(el => el.textContent.trim());
          mdTable += `| ${cells.join(" | ")} |\n`;
        }
        return mdTable + "\n";
      }
      default:
        return childrenContent;
    }
  };

  return traverse(body)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// Upgraded Reusable Rich Text Editor Component
function ToolbarEditor({ 
  value, 
  onChange, 
  placeholder, 
  rows = 8, 
  onInsertImage, 
  onInsertVideo, 
  onInsertFaq, 
  onInsertTakeaways,
  textareaRef
}) {
  const localRef = useRef(null);
  const activeRef = textareaRef || localRef;

  const applyFormatting = (syntax) => {
    const textarea = activeRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const originalText = textarea.value;
    const selectedText = originalText.substring(startPos, endPos) || "";

    let replacement = "";
    switch (syntax) {
      case "bold": replacement = `**${selectedText || "text"}**`; break;
      case "italic": replacement = `*${selectedText || "text"}*`; break;
      case "h1": replacement = `\n# ${selectedText || "Heading 1"}\n`; break;
      case "h2": replacement = `\n## ${selectedText || "Heading 2"}\n`; break;
      case "h3": replacement = `\n### ${selectedText || "Heading 3"}\n`; break;
      case "list": replacement = `\n- ${selectedText || "item"}`; break;
      case "link": {
        const url = prompt("Enter URL:", "https://");
        if (url === null) return;
        replacement = `[${selectedText || "link text"}](${url})`;
        break;
      }
      case "quote": replacement = `\n<Blockquote name="Author Name">\n${selectedText || "Enter quote here..."}\n</Blockquote>\n`; break;
      case "table": replacement = `\n| Feature | Innvikta InSAT | Others |\n| :--- | :---: | :---: |\n| **Gamified Learning** | Yes | No |\n| **Phishing Simulations** | Yes | Basic |\n`; break;
      case "demo": replacement = `\n<BookDemo />\n`; break;
    }

    if (replacement) {
      const newText = originalText.substring(0, startPos) + replacement + originalText.substring(endPos);
      onChange(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + replacement.length, startPos + replacement.length);
      }, 50);
    }
  };

  const handlePaste = (e) => {
    const html = e.clipboardData.getData("text/html");
    if (html) {
      e.preventDefault();
      const markdown = convertHtmlToMarkdown(html);
      
      const textarea = activeRef.current;
      if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const originalText = textarea.value;
        const newText = originalText.substring(0, startPos) + markdown + originalText.substring(endPos);
        onChange(newText);
        
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(startPos + markdown.length, startPos + markdown.length);
        }, 50);
      }
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Rich formatting toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => applyFormatting("bold")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded font-bold text-xs" title="Bold">B</button>
        <button type="button" onClick={() => applyFormatting("italic")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded italic text-xs" title="Italic">I</button>
        <div className="w-px h-4 bg-slate-300 mx-1"></div>
        <button type="button" onClick={() => applyFormatting("h1")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold" title="Heading 1">H1</button>
        <button type="button" onClick={() => applyFormatting("h2")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold" title="Heading 2">H2</button>
        <button type="button" onClick={() => applyFormatting("h3")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold" title="Heading 3">H3</button>
        <div className="w-px h-4 bg-slate-300 mx-1"></div>
        <button type="button" onClick={() => applyFormatting("list")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold" title="Bullet List">List</button>
        <button type="button" onClick={() => applyFormatting("link")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold" title="Link">Link</button>
        <button type="button" onClick={() => applyFormatting("quote")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold" title="Blockquote">Quote</button>
        <button type="button" onClick={() => applyFormatting("table")} className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold" title="Table">Table</button>
        
        {/* Advanced buttons */}
        <div className="w-px h-4 bg-slate-300 mx-1"></div>
        {onInsertImage && (
          <button type="button" onClick={onInsertImage} className="px-2 py-0.5 hover:bg-slate-200 text-[#f15a24] rounded text-xs font-bold flex items-center gap-0.5" title="Insert Image">
            <FiImage size={11} /> Image
          </button>
        )}
        {onInsertVideo && (
          <button type="button" onClick={onInsertVideo} className="px-2 py-0.5 hover:bg-slate-200 text-[#f15a24] rounded text-xs font-bold flex items-center gap-0.5" title="Insert Video">
            <FiVideo size={11} /> Video
          </button>
        )}
        {onInsertFaq && (
          <button type="button" onClick={onInsertFaq} className="px-2 py-0.5 hover:bg-slate-200 text-[#f15a24] rounded text-xs font-bold" title="Insert FAQ Accordion">
            FAQ
          </button>
        )}
        {onInsertTakeaways && (
          <button type="button" onClick={onInsertTakeaways} className="px-2 py-0.5 hover:bg-slate-200 text-[#f15a24] rounded text-xs font-bold" title="Insert Takeaways Box">
            Takeaways
          </button>
        )}
        <button type="button" onClick={() => applyFormatting("demo")} className="px-2 py-0.5 hover:bg-slate-200 text-[#f15a24] rounded text-xs font-bold" title="Insert Book a Demo Button">
          CTA Button
        </button>
      </div>
      <textarea
        ref={activeRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-xs font-mono text-slate-800 focus:outline-none focus:bg-slate-50/20"
      />
    </div>
  );
}
// Simple Markdown Parser to render Preview HTML using safe RegExp strings
const parseMarkdownToHtml = (markdown) => {
  if (!markdown) return "";
  let html = markdown;

  // Escaping HTML characters
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Parse tables to HTML
  const tableRegex = new RegExp('^\\|([^\\n]+)\\n\\|([^\\n]+)\\n((?:\\|[^\\n]+\\n*)+)', 'gm');
  html = html.replace(tableRegex, (match, headerLine, alignLine, rowsBlock) => {
    const headers = headerLine.split("|").slice(1, -1).map(h => h.trim());
    const alignments = alignLine.split("|").slice(1, -1).map(a => {
      if (a.includes(":") && a.endsWith(":")) return "center";
      if (a.endsWith(":")) return "right";
      return "left";
    });
    const rows = rowsBlock.trim().split("\n").map(r => r.split("|").slice(1, -1).map(c => c.trim()));
    
    let tableHtml = `<div class="my-6 overflow-x-auto"><table class="w-full border-collapse border border-slate-100 text-slate-700 text-sm">`;
    tableHtml += `<thead><tr class="bg-slate-50/80 border-b border-slate-100">`;
    headers.forEach((h, idx) => {
      const align = alignments[idx] || "left";
      tableHtml += `<th class="px-4 py-3 text-xs font-semibold text-slate-800 uppercase tracking-wider text-${align} border-r border-slate-100/50">${h}</th>`;
    });
    tableHtml += `</tr></thead><tbody>`;
    rows.forEach(row => {
      tableHtml += `<tr class="border-b border-slate-150 hover:bg-slate-50/30 transition-colors">`;
      row.forEach((cell, idx) => {
        const align = alignments[idx] || "left";
        let cleanedCell = cell;
        if (cleanedCell.startsWith("**") && cleanedCell.endsWith("**")) {
          cleanedCell = `<span class="font-medium text-slate-800">${cleanedCell.slice(2, -2)}</span>`;
        }
        tableHtml += `<td class="px-4 py-2.5 text-xs text-${align} border-r border-slate-100/50">${cleanedCell}</td>`;
      });
      tableHtml += `</tr>`;
    });
    tableHtml += `</tbody></table></div>`;
    return tableHtml;
  });

  // Headings
  html = html.replace(new RegExp('^######\\s+(.+)$', 'gm'), '<h6 class="text-xs font-bold text-slate-850 mt-3 mb-1.5">$1</h6>');
  html = html.replace(new RegExp('^#####\\s+(.+)$', 'gm'), '<h5 class="text-sm font-bold text-slate-850 mt-3 mb-1.5">$1</h5>');
  html = html.replace(new RegExp('^####\\s+(.+)$', 'gm'), '<h4 class="text-base font-bold text-slate-900 mt-3.5 mb-2">$1</h4>');
  html = html.replace(new RegExp('^###\\s+(.+)$', 'gm'), '<h3 class="text-lg font-bold text-slate-900 mt-4 mb-2.5">$1</h3>');
  html = html.replace(new RegExp('^##\\s+(.+)$', 'gm'), '<h2 class="text-2xl font-extrabold text-slate-955 mt-5 mb-3 border-b border-slate-100 pb-2">$1</h2>');
  html = html.replace(new RegExp('^#\\s+(.+)$', 'gm'), '<h1 class="text-3xl font-extrabold text-slate-955 mt-6 mb-4">$1</h1>');

  // Helper to parse attributes from JSX tags
  const parseAttributes = (attrString) => {
    const attrs = {};
    const regex = new RegExp('(\\w+)=["\']([^"\']*)["\']', 'g');
    let match;
    while ((match = regex.exec(attrString)) !== null) {
      attrs[match[1]] = match[2];
    }
    return attrs;
  };

  // Parse <BlogImage ... />
  html = html.replace(new RegExp('&lt;BlogImage\\s+([^&]+)\\s*\\/?&gt;', 'g'), (match, attrStr) => {
    const attrs = parseAttributes(attrStr);
    const src = attrs.src || "";
    const alt = attrs.alt || attrs.title || "";
    const width = attrs.width || "100%";
    const align = attrs.align || "center";
    
    let wrapperClass = "my-6 clear-both";
    let imgClass = "rounded-2xl shadow-md";
    if (align === "left") {
      wrapperClass = "float-left mr-6 mb-4 clear-none";
    } else if (align === "right") {
      wrapperClass = "float-right ml-6 mb-4 clear-none";
    } else {
      wrapperClass = "flex flex-col items-center my-6 clear-both mx-auto";
      imgClass += " mx-auto";
    }
    return `<div class="${wrapperClass}" style="width: ${width}; max-width: 100%;">
      <img src="${src}" alt="${alt}" class="${imgClass}" style="width: 100%; height: auto;" />
      ${alt ? `<span class="block text-center text-xs text-slate-400 mt-2 font-medium">${alt}</span>` : ""}
    </div>`;
  });

  // Parse <Video ... />
  html = html.replace(new RegExp('&lt;Video\\s+([^&]+)\\s*\\/?&gt;', 'g'), (match, attrStr) => {
    const attrs = parseAttributes(attrStr);
    const src = attrs.src || "";
    const title = attrs.title || "";
    const width = attrs.width || "100%";
    const align = attrs.align || "center";
    const height = attrs.height || "auto";
    
    let wrapperClass = "my-6 clear-both";
    let videoClass = "overflow-hidden rounded-xl shadow-md";
    if (align === "left") {
      wrapperClass = "float-left mr-6 mb-4 clear-none";
    } else if (align === "right") {
      wrapperClass = "float-right ml-6 mb-4 clear-none";
    } else {
      wrapperClass = "flex flex-col items-center my-6 clear-both mx-auto";
      videoClass += " mx-auto";
    }
    const videoSrc = src.startsWith("http") ? src : `/videos/${src}`;
    return `<div class="${wrapperClass}" style="width: ${width}; max-width: 100%;">
      <video src="${videoSrc}" controls class="${videoClass}" style="width: 100%; height: ${height};"></video>
      ${title ? `<span class="block text-center text-xs text-slate-400 mt-2 font-medium">${title}</span>` : ""}
    </div>`;
  });

  // Standard markdown images
  html = html.replace(new RegExp('!\\[([^\\]]*)\\]\\(([^)]+)\\)', 'g'), '<div class="my-6"><img src="$2" alt="$1" class="w-full h-auto rounded-2xl shadow-md" /><span class="block text-center text-xs text-slate-400 mt-2">$1</span></div>');

  // Hyperlinks
  html = html.replace(new RegExp('\\[([^\\]]+)\\]\\(([^)]+)\\)', 'g'), '<a href="$2" class="text-[#f15a24] hover:underline font-bold" target="_blank">$1</a>');

  // Bold & Italic
  html = html.replace(new RegExp('\\*\\*([^*]+)\\*\\*', 'g'), "<strong>$1</strong>");
  html = html.replace(new RegExp('\\*([^*]+)\\*', 'g'), "<em>$1</em>");

  // Bullet Lists
  html = html.replace(new RegExp('^\\-\\s+(.+)$', 'gm'), '<li class="ml-5 list-disc mb-1">$1</li>');

  // Paragraphs
  html = html.split(/\n\n+/).map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<div') || p.trim().startsWith('<li') || p.trim().startsWith('<ul')) {
      return p;
    }
    return `<p class="text-slate-700 leading-relaxed text-sm mb-4">${p.replace(/\n/g, "<br/>")}</p>`;
  }).join("");

  // BookDemo shortcode
  html = html.replace(new RegExp('&lt;BookDemo\\s*\\/?&gt;', 'g'), `
    <div class="my-8 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row text-left">
      <div class="md:w-[40%] bg-gradient-to-br from-[#f15a24] to-[#c2410c] text-white p-6 md:p-8 flex flex-col justify-between shrink-0">
        <div>
          <div class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-wider bg-white/10 rounded-full uppercase border border-white/15">HUMAN RISK MANAGEMENT</div>
          <h4 class="text-2xl font-extrabold text-white leading-tight mb-4">See Innvikta InSAT in Action</h4>
          <p class="text-xs text-white/90 leading-relaxed font-medium">Explore how our interactive games and phishing simulations reduce cyber risk.</p>
        </div>
        <div class="mt-8 text-[10px] text-white/70 font-semibold tracking-wider uppercase">© INNVIKTA SECURITY</div>
      </div>
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
          </div>
          <div class="pt-4 flex justify-start">
            <button type="button" disabled class="px-10 py-3.5 bg-[#f15a24] !text-white font-bold rounded-full shadow-lg text-xs uppercase tracking-wider cursor-not-allowed flex items-center gap-2">
              <span>Book a Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `);

  // FAQ/Accordion/Blockquote
  html = html.replace(new RegExp('&lt;FAQ\\s+title="([^"]+)"\\s+subtitle="([^"]+)"&gt;([\\s\\S]*?)&lt;\\/FAQ&gt;', 'g'), `
    <div class="my-8 p-6 md:p-8 bg-transparent border border-slate-100/80 rounded-[20px] shadow-sm max-w-3xl mx-auto text-left">
      <div class="mb-6">
        <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 m-0 leading-tight">$1</h3>
        <p class="text-xs md:text-sm text-slate-500 mt-2 m-0 leading-relaxed">$2</p>
      </div>
      <div class="flex flex-col gap-3">$3</div>
    </div>
  `);
  html = html.replace(new RegExp('&lt;FAQ\\s+title="([^"]+)"\\s*&gt;([\\s\\S]*?)&lt;\\/FAQ&gt;', 'g'), `
    <div class="my-8 p-6 md:p-8 bg-transparent border border-slate-100/80 rounded-[20px] shadow-sm max-w-3xl mx-auto text-left">
      <div class="mb-6">
        <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 m-0 leading-tight">$1</h3>
      </div>
      <div class="flex flex-col gap-3">$2</div>
    </div>
  `);
  html = html.replace(new RegExp('&lt;Accordion\\s+title="([^"]+)"&gt;([\\s\\S]*?)&lt;\\/Accordion&gt;', 'g'), `
    <div class="mb-4 overflow-hidden rounded-xl border border-slate-100 bg-[#f8fafc] text-left">
      <div class="px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-800 text-sm md:text-base">
        <span>$1</span>
        <div class="w-7 h-7 rounded-full bg-[#f15a24]/10 text-[#f15a24] flex items-center justify-center font-bold text-base">+</div>
      </div>
      <div class="px-5 py-3 text-xs md:text-sm text-slate-600 border-t border-slate-200/80">$2</div>
    </div>
  `);
  html = html.replace(new RegExp('&lt;Blockquote\\s+name="([^"]+)"&gt;([\\s\\S]*?)&lt;\\/Blockquote&gt;', 'g'), `
    <blockquote class="my-6 relative border-l-[5px] border-l-[#f15a24] bg-slate-50/70 p-6 md:p-8 rounded-r-2xl text-left not-italic">
      <div class="text-slate-700 font-medium leading-relaxed text-sm md:text-base mb-4 italic">$2</div>
      <cite class="block border-t border-slate-200/60 pt-3 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 not-italic">— $1</cite>
    </blockquote>
  `);

  // KeyTakeaways
  html = html.replace(new RegExp('&lt;KeyTakeaways\\s+title="([^"]+)"\\s+type="([^"]+)"&gt;([\\s\\S]*?)&lt;\\/KeyTakeaways&gt;', 'g'), `
    <div class="my-8 p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm max-w-3xl mx-auto text-left">
      <h4 class="text-base font-extrabold text-slate-900 m-0 uppercase tracking-wide mb-4">$1</h4>
      <div class="prose prose-slate text-slate-700 text-sm">$3</div>
    </div>
  `);
  html = html.replace(new RegExp('&lt;KeyTakeaways\\s+title="([^"]+)"\\s*&gt;([\\s\\S]*?)&lt;\\/KeyTakeaways&gt;', 'g'), `
    <div class="my-8 p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm max-w-3xl mx-auto text-left">
      <h4 class="text-base font-extrabold text-slate-900 m-0 uppercase tracking-wide mb-4">$1</h4>
      <div class="prose prose-slate text-slate-700 text-sm">$2</div>
    </div>
  `);

  return html;
};

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState("blogs"); // "blogs", "cases", "newsletters", "updates"
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Custom states for uploading & alt text
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImageFile, setInlineImageFile] = useState(null);
  const [inlineImageAlt, setInlineImageAlt] = useState("");
  const [inlineImageWidth, setInlineImageWidth] = useState("100%");
  const [inlineImageAlign, setInlineImageAlign] = useState("center");
  const [isUploadingInline, setIsUploadingInline] = useState(false);

  // Custom Video Modal States
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoSrcUrl, setVideoSrcUrl] = useState("");
  const [videoWidth, setVideoWidth] = useState("100%");
  const [videoHeight, setVideoHeight] = useState("auto");
  const [videoAlign, setVideoAlign] = useState("center");
  const [videoTitle, setVideoTitle] = useState("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

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

  const activeTextareaRef = useRef(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setUploadingPdf(true);
      showNotification("success", "Uploading PDF...");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCaseForm(prev => ({ ...prev, pdfUrl: data.url }));
        showNotification("success", "PDF uploaded successfully!");
      } else {
        showNotification("error", "Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      showNotification("error", "Upload failed due to connection error");
    } finally {
      setUploadingPdf(false);
    }
  };

  // Data lists
  const [blogsList, setBlogsList] = useState([]);
  const [casesList, setCasesList] = useState([]);
  const [newslettersList, setNewslettersList] = useState([]);
  const [updatesList, setUpdatesList] = useState([]);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  const textareaRef = useRef(null);

  // Yoast SEO Auditor states
  const [focusKeyphrase, setFocusKeyphrase] = useState("");
  const [seoReport, setSeoReport] = useState([]);

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
    archived: false,
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
    pdfUrl: "",
    archived: false
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
    graphicText: "",
    archived: false
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

  const updateActiveContent = (newText) => {
    if (activeTab === "blogs") {
      setBlogForm((prev) => ({ ...prev, content: newText }));
    } else if (activeTab === "updates") {
      setUpdateForm((prev) => ({ ...prev, desc: newText }));
    } else if (activeTab === "newsletters") {
      setNewsletterForm((prev) => ({ ...prev, content: newText }));
    }
  };

  const getActiveContent = () => {
    if (activeTab === "blogs") return blogForm.content || "";
    if (activeTab === "updates") return updateForm.desc || "";
    if (activeTab === "newsletters") return newsletterForm.content || "";
    return "";
  };

  // Yoast SEO Auditor logic
  const runSeoAudit = () => {
    const checks = [];
    const content = getActiveContent();
    let title = "";
    if (activeTab === "blogs") title = blogForm.title || "";
    else if (activeTab === "updates") title = updateForm.title || "";
    else if (activeTab === "newsletters") title = newsletterForm.title || "";

    const keyphrase = focusKeyphrase.trim().toLowerCase();
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

    // Keyphrase in Title
    if (title.toLowerCase().includes(keyphrase)) {
      checks.push({ id: "title", label: "Focus keyphrase in title: Yes, keyphrase is present.", status: "success" });
    } else {
      checks.push({ id: "title", label: "Focus keyphrase in title: Keyphrase not found. Try including it.", status: "error" });
    }

    // Keyphrase in Introduction (First 100 words)
    const introText = content.split(/\s+/).slice(0, 100).join(" ").toLowerCase();
    if (introText.includes(keyphrase)) {
      checks.push({ id: "intro", label: "Introduction match: Keyphrase appears in the first paragraph.", status: "success" });
    } else {
      checks.push({ id: "intro", label: "Introduction match: Keyphrase is missing in the opening paragraph.", status: "warning" });
    }

    // Density Check
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

    // Image Alt Tag Checks
    const hasImages = content.includes("![");
    if (hasImages) {
      checks.push({ id: "images", label: "Image Alt Tags: Found media links inside the post.", status: "success" });
    } else {
      checks.push({ id: "images", label: "Image Alt Tags: No images added. Consider inserting supportive media.", status: "info" });
    }

    // Link check
    const hasLinks = content.includes("](") && !content.includes("![");
    if (hasLinks) {
      checks.push({ id: "links", label: "Outbound/Internal Links: Great job linking references.", status: "success" });
    } else {
      checks.push({ id: "links", label: "Links: No hyperlinks found. Consider adding context links.", status: "warning" });
    }

    setSeoReport(checks);
  };

  // Run SEO audit when fields change
  useEffect(() => {
    runSeoAudit();
  }, [
    blogForm.content, blogForm.title, blogForm.metaDescription,
    updateForm.desc, updateForm.title,
    newsletterForm.content, newsletterForm.title, newsletterForm.description,
    focusKeyphrase, activeTab
  ]);

  const handleInsertInlineImage = async (e) => {
    e.preventDefault();
    if (!inlineImageSrcUrl.trim() && !inlineImageFile) {
      showNotification("error", "Please select an image file or paste an image URL.");
      return;
    }
    setIsUploadingInline(true);
    try {
      let finalUrl = inlineImageSrcUrl.trim();
      if (inlineImageFile) {
        const uploadData = new FormData();
        uploadData.append("file", inlineImageFile);
        const res = await fetch("/api/admin/upload", { method: "POST", body: uploadData });
        const data = await res.json();
        if (data.success) {
          finalUrl = data.url;
        } else {
          showNotification("error", data.error || "Failed to upload image.");
          setIsUploadingInline(false);
          return;
        }
      }
      const alignmentStyle = inlineImageAlign === "center" ? "mx-auto block" : (inlineImageAlign === "right" ? "float-right ml-4" : "float-left mr-4");
      const imgMarkdown = `\n<img src="${finalUrl}" alt="${inlineImageAlt || 'Image'}" width="${inlineImageWidth}" class="${alignmentStyle}" />\n`;
      
      const textarea = textareaRef.current;
      if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const originalText = textarea.value;
        const newText = originalText.substring(0, startPos) + imgMarkdown + originalText.substring(endPos);
        updateActiveContent(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(startPos + imgMarkdown.length, startPos + imgMarkdown.length);
        }, 50);
      }
      setShowImageModal(false);
      setInlineImageFile(null);
      setInlineImageSrcUrl("");
      setInlineImageAlt("");
      setInlineImageWidth("100%");
      setInlineImageAlign("center");
      showNotification("success", "Image inserted successfully!");
    } catch (err) {
      showNotification("error", "Error uploading image.");
    } finally {
      setIsUploadingInline(false);
    }
  };

  const handleInsertVideo = async (e) => {
    e.preventDefault();
    let finalVideoUrl = videoSrcUrl.trim();
    if (!finalVideoUrl && !videoFile) {
      showNotification("error", "Please select a video file or paste a video URL.");
      return;
    }
    setIsUploadingVideo(true);
    try {
      if (videoFile) {
        const uploadData = new FormData();
        uploadData.append("file", videoFile);
        const res = await fetch("/api/admin/upload", { method: "POST", body: uploadData });
        const data = await res.json();
        if (data.success) {
          finalVideoUrl = data.url;
        } else {
          showNotification("error", data.error || "Failed to upload video.");
          setIsUploadingVideo(false);
          return;
        }
      }
      const videoMarkdown = `\n<Video src="${finalVideoUrl}" title="${videoTitle || 'Embedded Video'}" width="${videoWidth}" height="${videoHeight}" align="${videoAlign}" />\n`;
      const textarea = textareaRef.current;
      if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const originalText = textarea.value;
        const newText = originalText.substring(0, startPos) + videoMarkdown + originalText.substring(endPos);
        updateActiveContent(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(startPos + videoMarkdown.length, startPos + videoMarkdown.length);
        }, 50);
      }
      setShowVideoModal(false);
      setVideoFile(null);
      setVideoSrcUrl("");
      setVideoTitle("");
      setVideoWidth("100%");
      setVideoHeight("auto");
      setVideoAlign("center");
      showNotification("success", "Video inserted successfully!");
    } catch (err) {
      showNotification("error", "Error inserting video.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

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
      updateActiveContent(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + mdx.length, startPos + mdx.length);
      }, 50);
    }
    setFaqPasteText("");
    setShowFaqModal(false);
    showNotification("success", "FAQ inserted successfully!");
  };

  const handleInsertParsedTakeaways = () => {
    if (!takeawaysPasteText.trim()) return;
    const lines = takeawaysPasteText.split("\n");
    const points = [];
    for (let line of lines) {
      let trimmed = line.trim();
      if (trimmed) {
        trimmed = trimmed.replace(/^[\s\-\*\d\.\)\(]+/g, "");
        points.push(trimmed);
      }
    }
    let mdx = `\n<KeyTakeaways title="${takeawaysTitle}" type="${takeawaysType}">\n`;
    points.forEach(point => {
      mdx += `  - ${point}\n`;
    });
    mdx += `</KeyTakeaways>\n`;

    const textarea = textareaRef.current;
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const originalText = textarea.value;
      const newText = originalText.substring(0, startPos) + mdx + originalText.substring(endPos);
      updateActiveContent(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(startPos + mdx.length, startPos + mdx.length);
      }, 50);
    }
    setTakeawaysTitle("Key Takeaways");
    setTakeawaysPasteText("");
    setTakeawaysType("bullet");
    setShowTakeawaysModal(false);
    showNotification("success", "Key Takeaways inserted successfully!");
  };

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

  // ARCHIVE functions
  const handleToggleArchiveBlog = async (blog) => {
    const isArchived = !!blog.frontmatter.archived;
    const action = isArchived ? "unarchive" : "archive";
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: blog.filename,
          frontmatter: {
            ...blog.frontmatter,
            archived: !isArchived
          },
          content: blog.content
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", `Blog post ${action}d successfully!`);
        fetchData();
      } else {
        showNotification("error", data.error || `Failed to ${action} blog post.`);
      }
    } catch (err) {
      showNotification("error", `Error attempting to ${action} blog.`);
    }
  };

  const handleToggleArchiveCase = async (study) => {
    const isArchived = !!study.archived;
    const action = isArchived ? "unarchive" : "archive";
    try {
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...study,
          archived: !isArchived
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", `Case study ${action}d successfully!`);
        fetchData();
      } else {
        showNotification("error", data.error || `Failed to ${action} case study.`);
      }
    } catch (err) {
      showNotification("error", `Error attempting to ${action} case study.`);
    }
  };

  const handleToggleArchiveUpdate = async (update) => {
    const isArchived = !!update.archived;
    const action = isArchived ? "unarchive" : "archive";
    try {
      const res = await fetch("/api/platform-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...update,
          archived: !isArchived
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", `Platform update ${action}d successfully!`);
        fetchData();
      } else {
        showNotification("error", data.error || `Failed to ${action} platform update.`);
      }
    } catch (err) {
      showNotification("error", `Error attempting to ${action} platform update.`);
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
            archived: blogForm.archived,
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
      archived: blog.frontmatter.archived || false,
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
      pdfUrl: study.pdfUrl || "",
      archived: study.archived || false
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
      graphicText: item.graphicText || "",
      archived: item.archived || false
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
                    archived: false,
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
                    pdfUrl: "",
                    archived: false
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
                    graphicText: "",
                    archived: false
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
                      <th className="py-4 px-6">Archived</th>
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
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${blog.frontmatter.archived ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                            {blog.frontmatter.archived ? "Archived" : "No"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => handleToggleArchiveBlog(blog)} className={`p-2 rounded-lg cursor-pointer ${blog.frontmatter.archived ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-slate-500 hover:text-amber-600 bg-slate-50'}`} title={blog.frontmatter.archived ? "Unarchive" : "Archive"}><FiArchive /></button>
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
                      <th className="py-4 px-6">Archived</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {casesList.map((study) => (
                      <tr key={study.id} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{study.title}</td>
                        <td className="py-4 px-6">{study.industryLabel}</td>
                        <td className="py-4 px-6">{study.timeline}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${study.archived ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                            {study.archived ? "Archived" : "No"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => handleToggleArchiveCase(study)} className={`p-2 rounded-lg cursor-pointer ${study.archived ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-slate-500 hover:text-amber-600 bg-slate-50'}`} title={study.archived ? "Unarchive" : "Archive"}><FiArchive /></button>
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
                      <th className="py-4 px-6">Archived</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {updatesList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/40">
                        <td className="py-4 px-6 font-bold text-slate-900">{item.title}</td>
                        <td className="py-4 px-6">{item.category}</td>
                        <td className="py-4 px-6">{item.date}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.archived ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                            {item.archived ? "Archived" : "No"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                          <button onClick={() => handleToggleArchiveUpdate(item)} className={`p-2 rounded-lg cursor-pointer ${item.archived ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-slate-500 hover:text-amber-600 bg-slate-50'}`} title={item.archived ? "Unarchive" : "Archive"}><FiArchive /></button>
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

            <div className={`grid grid-cols-1 ${editorTab === 'edit' && activeTab !== 'cases' ? 'lg:grid-cols-3' : ''} gap-8`}>
              <div className={editorTab === 'edit' && activeTab !== 'cases' ? 'lg:col-span-2' : ''}>

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
                    textareaRef={textareaRef}
                    onInsertImage={() => setShowImageModal(true)}
                    onInsertVideo={() => setShowVideoModal(true)}
                    onInsertFaq={() => setShowFaqModal(true)}
                    onInsertTakeaways={() => setShowTakeawaysModal(true)}
                  />
                </div>
                <div className="flex items-center gap-6">
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
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="blog_archived"
                      checked={blogForm.archived}
                      onChange={(e) => setBlogForm({ ...blogForm, archived: e.target.checked })}
                      className="w-4 h-4 rounded text-[#f15a24] focus:ring-[#f15a24]"
                    />
                    <label htmlFor="blog_archived" className="text-xs font-bold text-slate-600">Archive Post (hides from site)</label>
                  </div>
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
                
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="case_archived"
                    checked={caseForm.archived}
                    onChange={(e) => setCaseForm({ ...caseForm, archived: e.target.checked })}
                    className="w-4 h-4 rounded text-[#f15a24] focus:ring-[#f15a24]"
                  />
                  <label htmlFor="case_archived" className="text-xs font-bold text-slate-600">Archive Case Study (hides from website)</label>
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
                    textareaRef={textareaRef}
                    onInsertImage={() => setShowImageModal(true)}
                    onInsertVideo={() => setShowVideoModal(true)}
                    onInsertFaq={() => setShowFaqModal(true)}
                    onInsertTakeaways={() => setShowTakeawaysModal(true)}
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
                  <ToolbarEditor
                    value={updateForm.desc}
                    onChange={(val) => setUpdateForm({ ...updateForm, desc: val })}
                    placeholder="Write platform update description..."
                    rows={8}
                    textareaRef={textareaRef}
                    onInsertImage={() => setShowImageModal(true)}
                    onInsertVideo={() => setShowVideoModal(true)}
                    onInsertFaq={() => setShowFaqModal(true)}
                    onInsertTakeaways={() => setShowTakeawaysModal(true)}
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="update_archived"
                    checked={updateForm.archived}
                    onChange={(e) => setUpdateForm({ ...updateForm, archived: e.target.checked })}
                    className="w-4 h-4 rounded text-[#f15a24] focus:ring-[#f15a24]"
                  />
                  <label htmlFor="update_archived" className="text-xs font-bold text-slate-600">Archive Platform Update (hides from website)</label>
                </div>

                <button type="submit" className="bg-[#f15a24] hover:bg-orange-600 !text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md">
                  <FiSave /> Save Platform Update
                </button>
              </form>
            )}
              </div>
              
              {editorTab === 'edit' && activeTab !== 'cases' && (
                <div className="space-y-6">
                  {/* Focus Keyphrase */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/60">
                      <FiTrendingUp className="text-[#f15a24] text-base" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SEO Focus Keyphrase</h4>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={focusKeyphrase}
                        onChange={(e) => setFocusKeyphrase(e.target.value)}
                        placeholder="e.g. security awareness training"
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-750 text-xs focus:outline-none focus:border-[#f15a24] font-semibold"
                      />
                      <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    </div>
                  </div>

                  {/* Yoast Checklist */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/60">
                      <FiTrendingUp className="text-[#f15a24] text-base" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SEO Audit Checklist</h4>
                    </div>
                    <div className="space-y-2.5">
                      {seoReport.map((audit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            audit.status === "success" ? "bg-emerald-500 text-white" :
                            audit.status === "warning" ? "bg-amber-500 text-white" :
                            audit.status === "info" ? "bg-blue-500 text-white" :
                            "bg-rose-500 text-white"
                          }`} style={{ fontSize: "7px" }}>
                            {audit.status === "success" && <FiCheck />}
                          </span>
                          <span className="text-[11px] font-semibold leading-relaxed text-slate-605">
                            {audit.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document settings card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/60">
                      <FiFileText className="text-[#f15a24] text-base" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Document Settings</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Editor Tab</span>
                        <span className="text-xs font-bold text-slate-700 uppercase">{editorTab} mode</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                        <span className="text-xs font-bold text-slate-700">
                          {activeTab === 'blogs' ? (blogForm.draft ? 'Draft' : 'Published') : 'Published'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Visible on Site</span>
                        <span className={`text-xs font-bold ${
                          activeTab === 'blogs' ? (blogForm.archived ? 'text-amber-600' : 'text-emerald-600') :
                          activeTab === 'updates' ? (updateForm.archived ? 'text-amber-600' : 'text-emerald-600') :
                          activeTab === 'newsletters' ? (newsletterForm.archived ? 'text-amber-600' : 'text-emerald-600') :
                          'text-emerald-600'
                        }`}>
                          {activeTab === 'blogs' ? (blogForm.archived ? 'Hidden (Archived)' : 'Visible') :
                           activeTab === 'updates' ? (updateForm.archived ? 'Hidden (Archived)' : 'Visible') :
                           activeTab === 'newsletters' ? (newsletterForm.archived ? 'Hidden (Archived)' : 'Visible') :
                           'Visible'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

        {/* Inline Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Upload & Insert Image</h4>
                <button 
                  onClick={() => {
                    setShowImageModal(false);
                    setInlineImageFile(null);
                    setInlineImageSrcUrl("");
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleInsertInlineImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setInlineImageFile(e.target.files[0]);
                        setInlineImageSrcUrl("");
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {inlineImageFile && <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Selected: {inlineImageFile.name}</p>}
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-150"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">OR</span>
                  <div className="flex-grow border-t border-slate-150"></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste Image URL</label>
                  <input
                    type="text"
                    value={inlineImageSrcUrl}
                    onChange={(e) => {
                      setInlineImageSrcUrl(e.target.value);
                      if (e.target.value) setInlineImageFile(null);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alt Text (SEO)</label>
                  <input
                    type="text"
                    value={inlineImageAlt}
                    onChange={(e) => setInlineImageAlt(e.target.value)}
                    placeholder="Describe the image..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Width</label>
                    <input
                      type="text"
                      value={inlineImageWidth}
                      onChange={(e) => setInlineImageWidth(e.target.value)}
                      placeholder="e.g. 100%, 300px"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alignment</label>
                    <select
                      value={inlineImageAlign}
                      onChange={(e) => setInlineImageAlign(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    >
                      <option value="center">Center</option>
                      <option value="left">Left Align</option>
                      <option value="right">Right Align</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageModal(false);
                      setInlineImageFile(null);
                      setInlineImageSrcUrl("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploadingInline}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 disabled:bg-slate-300 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isUploadingInline ? "Uploading..." : "Insert Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Insert Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Upload & Insert Video</h4>
                <button 
                  onClick={() => {
                    setShowVideoModal(false);
                    setVideoFile(null);
                    setVideoSrcUrl("");
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleInsertVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Upload Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setVideoFile(e.target.files[0]);
                        setVideoSrcUrl("");
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {videoFile && <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Selected: {videoFile.name}</p>}
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-150"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">OR</span>
                  <div className="flex-grow border-t border-slate-150"></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste Video Direct URL</label>
                  <input
                    type="text"
                    value={videoSrcUrl}
                    onChange={(e) => {
                      setVideoSrcUrl(e.target.value);
                      if (e.target.value) setVideoFile(null);
                    }}
                    placeholder="https://example.com/video.mp4"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Video Title (Screen readers)</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Embedded video description..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Width</label>
                    <input
                      type="text"
                      value={videoWidth}
                      onChange={(e) => setVideoWidth(e.target.value)}
                      placeholder="100%"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Height</label>
                    <input
                      type="text"
                      value={videoHeight}
                      onChange={(e) => setVideoHeight(e.target.value)}
                      placeholder="auto"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alignment</label>
                    <select
                      value={videoAlign}
                      onChange={(e) => setVideoAlign(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                    >
                      <option value="center">Center</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVideoModal(false);
                      setVideoFile(null);
                      setVideoSrcUrl("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploadingVideo}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 disabled:bg-slate-300 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isUploadingVideo ? "Uploading..." : "Insert Video"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FAQ Parser Modal */}
        {showFaqModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 text-left shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <h4 className="text-base font-bold text-slate-900">Bulk Convert & Insert FAQ</h4>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">FAQ Main Title</label>
                  <input
                    type="text"
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">FAQ Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={faqSubtitle}
                    onChange={(e) => setFaqSubtitle(e.target.value)}
                    placeholder="Find answers to common questions..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Paste FAQ (Q&A List)</label>
                  <textarea
                    rows="8"
                    value={faqPasteText}
                    onChange={(e) => setFaqPasteText(e.target.value)}
                    placeholder={`Paste text list of questions and answers here. For example:\n\nQ: What is social engineering?\nA: Social engineering is a manipulation technique that exploits human error.\n\nQ: How often is simulation updated?\nA: New simulated templates are rolled out weekly.`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5">The parser automatically detects question/answer tokens and converts them into interactive accordions.</p>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFaqModal(false);
                      setFaqPasteText("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertParsedFaq}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">List Style</label>
                  <select
                    value={takeawaysType}
                    onChange={(e) => setTakeawaysType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-805 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-semibold"
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
                    placeholder={`Paste points here. For example:\n\n- Regular security awareness training reduces breaches by up to 80%.\n- MFA must be enforced on all employee credentials.`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-400 text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5">Each line will be converted into a styled bullet point inside the takeaway card.</p>
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTakeawaysModal(false);
                      setTakeawaysPasteText("");
                    }}
                    className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertParsedTakeaways}
                    className="flex-1 bg-[#f15a24] hover:bg-orange-600 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Convert & Insert
                  </button>
                </div>
              </div>
            </div>
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
