"use client";
import { FiArrowRight } from "react-icons/fi";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

// Database of terms and descriptions for SEO/AEO/GEO and game definitions
const CYBER_TERMS = {
  PHISHING: {
    name: "Phishing",
    def: "A fraudulent attempt to steal sensitive information (like credentials or credit card details) by disguising as a trustworthy entity in electronic communications."
  },
  MALWARE: {
    name: "Malware",
    def: "Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems, servers, or networks."
  },
  FIREWALL: {
    name: "Firewall",
    def: "A security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules."
  },
  PASSWORD: {
    name: "Password",
    def: "A secret string of characters used to confirm identity during authentication and protect unauthorized access to user accounts."
  },
  ENCRYPTION: {
    name: "Encryption",
    def: "The cryptographic process of encoding messages or information in such a way that only authorized parties can read it."
  },
  RANSOMWARE: {
    name: "Ransomware",
    def: "A specific type of extortion malware that encrypts a victim's data files and demands payment in exchange for the decryption key."
  },
  VPN: {
    name: "VPN",
    def: "Virtual Private Network; a service that encrypts internet traffic and masks online identity to protect data transmission over public networks."
  },
  ANTIVIRUS: {
    name: "Antivirus",
    def: "Software utility designed to detect, neutralize, quarantine, and eliminate known malicious software signatures from computer storage."
  },
  PATCH: {
    name: "Patch",
    def: "A software release update designed to remediate security vulnerabilities, resolve system bugs, or enhance application performance."
  },
  ZEROTRUST: {
    name: "Zero Trust",
    def: "A strategic cybersecurity model centered on the belief that organizations should not automatically trust anything inside or outside its perimeters."
  },
  MFA: {
    name: "MFA",
    def: "Multi-Factor Authentication; a verification mechanism requiring users to present two or more independent credentials prior to system entry."
  },
  SIEM: {
    name: "SIEM",
    def: "Security Information and Event Management; platforms that aggregate security event log data across sources to discover anomalies."
  }
};

const CYBER_FACTS = [
  "Over 90% of successful cyber attacks start with a phishing email targeting an employee.",
  "Using Multi-Factor Authentication (MFA) blocks 99.9% of automated account takeover attempts.",
  "The average time to identify and contain a data breach globally is over 200 days.",
  "Ransomware attacks occur every 11 seconds worldwide, causing billions in corporate losses.",
  "Zero Trust architectures operate under the simple motto: 'Never trust, always verify.'"
];

// Word search grid generator helper
const generateWordSearchGrid = (words, size, allowedDirs) => {
  const grid = Array(size).fill(null).map(() => Array(size).fill(""));
  const solutionPaths = {};

  // Sort words longest first for easier placement
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 150) {
      attempts++;
      const dir = allowedDirs[Math.floor(Math.random() * allowedDirs.length)];
      const [dr, dc] = dir;

      const len = word.length;
      // Define valid coordinate bounds
      const minR = dr < 0 ? len - 1 : 0;
      const maxR = dr > 0 ? size - len : size - 1;
      const minC = dc < 0 ? len - 1 : 0;
      const maxC = dc > 0 ? size - len : size - 1;

      if (maxR < minR || maxC < minC) continue;

      const startR = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
      const startC = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

      // Verify fit and character overlap
      let fits = true;
      const cellsToCheck = [];
      for (let i = 0; i < len; i++) {
        const r = startR + i * dr;
        const c = startC + i * dc;
        const char = word[i];
        if (grid[r][c] !== "" && grid[r][c] !== char) {
          fits = false;
          break;
        }
        cellsToCheck.push({ r, c, char });
      }

      if (fits) {
        const path = [];
        cellsToCheck.forEach(({ r, c, char }) => {
          grid[r][c] = char;
          path.push({ r, c });
        });
        solutionPaths[word] = path;
        placed = true;
      }
    }
  }

  // Fill empty spaces with random characters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { grid, solutionPaths };
};

const WordSearchPage = () => {
  // Game state
  const [difficulty, setDifficulty] = useState("easy"); // easy, medium, hard, expert
  const [gridSize, setGridSize] = useState(12);
  const [grid, setGrid] = useState([]);
  const [solutionPaths, setSolutionPaths] = useState({});
  const [remainingWords, setRemainingWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCoords, setFoundCoords] = useState(new Set()); // permanently matched cells
  const [activeSelection, setActiveSelection] = useState([]); // cells highlighted in current drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Timer & Statistics
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [factIndex, setFactIndex] = useState(0);
  const [hintCell, setHintCell] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null); // stores word name for active definition popup

  // References
  const gridRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".floating-shape",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 0.35, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );

      const bg = document.querySelector(".cta .bg-theme");
      if (bg) {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            toggleClass: "bg-animate",
            once: true,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Initialize daily cyber fact
  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * CYBER_FACTS.length));
  }, []);

  // Grid sizing and allowed direction mapping based on difficulty
  const getDifficultyConfig = (diff) => {
    switch (diff) {
      case "easy":
        return {
          size: 10,
          directions: [[0, 1], [1, 0]], // horizontal right, vertical down
          wordCount: 6
        };
      case "hard":
        return {
          size: 15,
          directions: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1]], // forward/backward horizontal, vertical, diagonal
          wordCount: 10
        };
      case "expert":
        return {
          size: 18,
          directions: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]], // all 8 directions
          wordCount: 12
        };
      case "medium":
      default:
        return {
          size: 12,
          directions: [[0, 1], [1, 0], [1, 1], [1, -1]], // horizontal right, vertical down, diagonal down-right, diagonal down-left
          wordCount: 8
        };
    }
  };

  // Start/Restart Puzzle
  const startNewGame = (diff = difficulty) => {
    const config = getDifficultyConfig(diff);
    setGridSize(config.size);
    setIsCompleted(false);
    setSeconds(0);
    setFoundCoords(new Set());
    setFoundWords([]);
    setActiveSelection([]);
    setAttempts(0);
    setAccuracy(100);
    setHintCell(null);
    setActiveTooltip(null);

    // Get random words from glossary keys
    const allWords = Object.keys(CYBER_TERMS);
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, config.wordCount);
    setRemainingWords(selected);

    // Generate Grid
    const { grid: newGrid, solutionPaths: newPaths } = generateWordSearchGrid(selected, config.size, config.directions);
    setGrid(newGrid);
    setSolutionPaths(newPaths);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer runner
  useEffect(() => {
    if (isCompleted || !gameStarted) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, gameStarted]);

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Grid Cell Drag Handling
  const getCellCoordsFromEvent = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return null;
    const r = element.getAttribute("data-row");
    const c = element.getAttribute("data-col");
    if (r !== null && c !== null) {
      return { r: parseInt(r, 10), c: parseInt(c, 10) };
    }
    return null;
  };

  const handleStart = (row, col, e) => {
    if (isCompleted) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ r: row, c: col });
    setActiveSelection([{ r: row, c: col }]);
    setHintCell(null);
    setActiveTooltip(null); // Close active tooltips when user starts choosing next letter / dragging
  };

  const handleMove = (e) => {
    if (!isDragging || !dragStart || isCompleted) return;
    const currentCell = getCellCoordsFromEvent(e);
    if (!currentCell) return;

    const { r: r1, c: c1 } = dragStart;
    const { r: r2, c: c2 } = currentCell;

    // Check if dragging path is straight line (horizontal, vertical, diagonal)
    const dr = r2 - r1;
    const dc = c2 - c1;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    if (dr === 0 || dc === 0 || absDr === absDc) {
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;
      const steps = Math.max(absDr, absDc);

      const path = [];
      for (let i = 0; i <= steps; i++) {
        path.push({ r: r1 + i * stepR, c: c1 + i * stepC });
      }
      setActiveSelection(path);
    }
  };

  const handleEnd = () => {
    if (!isDragging || isCompleted) return;
    setIsDragging(false);

    if (activeSelection.length > 0) {
      let matchedWord = null;
      let matchedPath = null;

      // Check all possible contiguous sub-slices of the selection path, from longest to shortest (min length 2)
      for (let len = activeSelection.length; len >= 2; len--) {
        for (let start = 0; start <= activeSelection.length - len; start++) {
          const subPath = activeSelection.slice(start, start + len);
          const wordStr = subPath.map(({ r, c }) => grid[r][c]).join("");
          const reversedWordStr = wordStr.split("").reverse().join("");

          if (remainingWords.includes(wordStr)) {
            matchedWord = wordStr;
            matchedPath = subPath;
            break;
          } else if (remainingWords.includes(reversedWordStr)) {
            matchedWord = reversedWordStr;
            matchedPath = subPath;
            break;
          }
        }
        if (matchedWord) break;
      }

      setAttempts((prev) => prev + 1);

      if (matchedWord && matchedPath) {
        // Success: Mark as found
        setFoundWords((prev) => [...prev, matchedWord]);
        setRemainingWords((prev) => prev.filter((w) => w !== matchedWord));

        // Add coordinates of the MATCHED sub-path to static found set
        const newCoords = new Set(foundCoords);
        matchedPath.forEach(({ r, c }) => {
          newCoords.add(`${r},${c}`);
        });
        setFoundCoords(newCoords);

        // Check if game complete
        if (remainingWords.length === 1) {
          setIsCompleted(true);
        }

        // Automatically open the definition tooltip on the grid for the found word
        setActiveTooltip(matchedWord);
      }

      // Update accuracy score
      setTimeout(() => {
        setAccuracy(Math.min(100, Math.round(((foundWords.length + (matchedWord ? 1 : 0)) / (attempts + 1)) * 100)));
      }, 50);
    }
    setActiveSelection([]);
  };

  // Check if grid cell matches coordinate key
  const isCellSelected = (r, c) => {
    return activeSelection.some((cell) => cell.r === r && cell.c === c);
  };

  const isCellFound = (r, c) => {
    return foundCoords.has(`${r},${c}`);
  };

  // Provide user hint (reveals first letter of one remaining word)
  const showHint = () => {
    if (remainingWords.length === 0 || isCompleted) return;
    const targetWord = remainingWords[0];
    const path = solutionPaths[targetWord];
    if (path && path.length > 0) {
      setHintCell(path[0]);
    }
  };

  // Compute game rank based on completion specs
  const getKnowledgeLevel = () => {
    if (accuracy >= 90) return "Security Champion";
    if (accuracy >= 75) return "Advanced";
    if (accuracy >= 55) return "Intermediate";
    return "Beginner";
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Free Cybersecurity Word Search Game | Innvikta" description="Boost security vocabulary and team engagement with our interactive cybersecurity word search game." />
      <div className="insat-page" ref={heroRef}>
        <div className="main-content" style={{ backgroundColor: "#FFFAF6" }}>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: "#FFFAF6" }}>
          <div className="container relative z-10 text-center">
            <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem" }}>FREE SECURITY arcade TOOL</span>
            <h1 className="text-52-heading">Find Hidden <span style={{ color: "#F15A24" }}>Cybersecurity</span> Terms</h1>
            <p className="text-18-content hero-paragraph mt-4" style={{ opacity: "0.85", textAlign: "center", margin: "1.5rem auto 0 auto", maxWidth: "42rem" }}>
              Challenge yourself by finding cybersecurity words hidden inside the letter grid while learning essential security concepts used by professionals.
            </p>
            <div style={{ justifyContent: "center", display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
              <a className="btn btn-primary" href="#wordsearch-game">Play Now</a>
              <Link className="btn btn-secondary" href="/solutions/insat">Learn About Security Training</Link>
            </div>
          </div>

          {/* Floating premium illustrations */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="floating-shape shape-lock absolute left-[8%] top-[25%] opacity-40">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <div className="floating-shape shape-shield absolute right-[10%] top-[20%] opacity-40">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <div className="floating-shape shape-browser absolute left-[12%] bottom-[15%] opacity-30">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><circle cx="6" cy="6" r="1" /><circle cx="10" cy="6" r="1" /></svg>
            </div>
            <div className="floating-shape shape-key absolute right-[15%] bottom-[12%] opacity-35">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#F15A24" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" /></svg>
            </div>
          </div>
        </section>



        {/* 3. MAIN GAME INTERACTION AREA */}
        <section id="wordsearch-game" className="py-16">
          <div className="container">
            <div className="word-search-container grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT SIDEBAR: Stats & Helpers */}
              <div className="lg:col-span-3 flex flex-col gap-6" style={{ opacity: gameStarted ? 1 : 0, pointerEvents: gameStarted ? "auto" : "none", transition: "opacity 0.3s ease" }}>
                
                {/* Statistics Box */}
                <div className="bg-white border border-border rounded-2xl shadow-sm" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", background: "#fff", boxSizing: "border-box" }}>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider" style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem", color: "#94A3B8" }}>Game Statistics</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-border pb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.75rem" }}>
                      <span className="text-slate-600 text-sm" style={{ fontSize: "0.875rem", color: "#475569" }}>Difficulty</span>
                      <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="outline-none cursor-pointer"
                        style={{
                          padding: "0.4rem 2rem 0.4rem 0.75rem",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          display: "inline-block",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                          backgroundColor: "#FFFAF6",
                          color: "#1E293B",
                          fontSize: "0.875rem",
                          fontWeight: "700"
                        }}
                      >
                        <option value="easy">Easy (10x10)</option>
                        <option value="medium">Medium (12x12)</option>
                        <option value="hard">Hard (15x15)</option>
                        <option value="expert">Expert (18x18)</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center border-b border-border pb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.75rem" }}>
                      <span className="text-slate-600 text-sm" style={{ fontSize: "0.875rem", color: "#475569" }}>Timer</span>
                      <span className="font-mono font-bold text-slate-800 text-lg" style={{ fontSize: "1.125rem", color: "#1E293B" }}>{formatTime(seconds)}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-border pb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "0.75rem" }}>
                      <span className="text-slate-600 text-sm" style={{ fontSize: "0.875rem", color: "#475569" }}>Words Found</span>
                      <span className="font-bold text-slate-800" style={{ fontSize: "1.125rem", color: "#1E293B" }}>{foundWords.length} / {foundWords.length + remainingWords.length}</span>
                    </div>

                    <div className="flex justify-between items-center pb-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="text-slate-600 text-sm" style={{ fontSize: "0.875rem", color: "#475569" }}>Accuracy</span>
                      <span className="font-bold" style={{ fontSize: "1.125rem", color: accuracy >= 80 ? "#10B981" : "#F59E0B" }}>{accuracy}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress Wheel */}
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Progress</h3>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="#ECECEC" strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="#F15A24" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - foundWords.length / (foundWords.length + remainingWords.length || 1))}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.4s ease" }}
                      />
                    </svg>
                    <span className="text-xl font-bold text-slate-800">
                      {Math.round((foundWords.length / (foundWords.length + remainingWords.length || 1)) * 100)}%
                    </span>
                  </div>
                </div>

                 {/* Help Tools */}
                <div className="bg-white border border-border rounded-2xl shadow-sm flex flex-col gap-3" style={{ padding: "1.5rem" }}>
                  <style>{`
                    .help-btn-outline {
                      background-color: rgba(255, 90, 31, 0.05) !important;
                      border: 1px solid rgba(241, 90, 36, 0.3) !important;
                      color: #f15a24 !important;
                      border-radius: 8px !important;
                      font-weight: 700 !important;
                      font-size: 0.875rem !important;
                      transition: all 0.3s ease !important;
                      height: 2.75rem !important;
                      display: inline-flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      gap: 0.5rem !important;
                      width: 100% !important;
                      box-sizing: border-box !important;
                      padding: 0 1rem !important;
                      line-height: normal !important;
                    }
                    .help-btn-outline:hover {
                      background-color: #f15a24 !important;
                      border-color: #f15a24 !important;
                      color: #fff !important;
                    }
                    .help-btn-solid {
                      background-color: #f15a24 !important;
                      color: #fff !important;
                      border-radius: 8px !important;
                      font-weight: 700 !important;
                      font-size: 0.875rem !important;
                      transition: all 0.3s ease !important;
                      height: 2.75rem !important;
                      display: inline-flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      gap: 0.5rem !important;
                      width: 100% !important;
                      box-sizing: border-box !important;
                      padding: 0 1rem !important;
                      border: 1px solid #f15a24 !important;
                      line-height: normal !important;
                    }
                    .help-btn-solid:hover {
                      background-color: #d84b1b !important;
                      border-color: #d84b1b !important;
                    }
                  `}</style>
                  <button 
                    onClick={showHint} 
                    disabled={isCompleted}
                    className="help-btn-outline cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                    Reveal Hint Letter
                  </button>
                  <button 
                    onClick={() => startNewGame()} 
                    className="help-btn-solid cursor-pointer"
                  >
                    Reset Puzzle
                  </button>
                </div>

                 {/* Cyber Fact Card */}
                <div className="bg-[#FFF3EC] border border-[#FFD9C6] rounded-2xl shadow-sm" style={{ padding: "1.5rem" }}>
                  <h4 className="text-xs font-bold text-[#F15A24] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Daily Cyber Fact
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {CYBER_FACTS[factIndex]}
                  </p>
                </div>

              </div>

              {/* CENTER: Interactive Word Search Letter Grid */}
              <div className="lg:col-span-6 flex flex-col items-center justify-start">
                <style>{`
                  .custom-grid-container {
                    padding: 1.25rem !important;
                    background-color: #fff !important;
                    border: 1px solid #E2E8F0 !important;
                    border-radius: 24px !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                    width: 100% !important;
                    position: relative !important;
                    box-sizing: border-box !important;
                  }
                  .grid-cell {
                    aspect-ratio: 1 / 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    transition: all 150ms ease;
                    cursor: pointer;
                    user-select: none;
                    background-color: #FFFAF6;
                    color: #1E293B;
                    border: 1px solid #E2E8F0;
                  }
                  @media (min-width: 768px) {
                    .grid-cell {
                      font-size: 1rem;
                    }
                  }
                  .grid-cell:hover {
                    background-color: #F15A24 !important;
                    color: #FFFFFF !important;
                    border-color: #F15A24 !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transform: scale(1.05);
                  }
                  .grid-cell.selected {
                    background-color: #F15A24 !important;
                    color: #FFFFFF !important;
                    border-color: #F15A24 !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transform: scale(1.05);
                  }
                  .grid-cell.found {
                    background-color: #FFF3EC !important;
                    color: #F15A24 !important;
                    border-color: #FFD9C6 !important;
                  }
                  .grid-cell.hint {
                    animation: pulse 2s infinite;
                    outline: 2px solid #F15A24;
                    transform: scale(1.1);
                  }
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                  }
                `}</style>
                <div className="custom-grid-container">
                  
                  {/* Start Screen Overlay */}
                  {!gameStarted && (
                    <div 
                      className="absolute inset-0 bg-white/98 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-start text-center animate-fade-in"
                      style={{
                        padding: "2.5rem 2.5rem",
                        boxSizing: "border-box"
                      }}
                    >
                      <h2 style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "#1E293B",
                        margin: "1rem 0 0.5rem 0",
                        padding: 0
                      }}>
                        How to Play
                      </h2>

                      {/* Orange accent line */}
                      <div style={{
                        width: "80px",
                        height: "4px",
                        backgroundColor: "#F15A24",
                        margin: "0 auto 1.5rem auto",
                        borderRadius: "2px"
                      }} />

                      {/* Description */}
                      <p style={{
                        fontSize: "1rem",
                        color: "#4B5563",
                        lineHeight: "1.5",
                        marginBottom: "1.5rem",
                        maxWidth: "500px",
                        padding: 0
                      }}>
                        Find and highlight cybersecurity terms hidden in the grid of letters. Learn definitions as you find them!
                      </p>

                      {/* Rules Guide */}
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                        width: "100%",
                        maxWidth: "480px",
                        textAlign: "left",
                        backgroundColor: "#FFFAF6",
                        border: "1px solid #E2E8F0",
                        borderRadius: "16px",
                        padding: "1.25rem",
                        marginBottom: "2rem",
                        boxSizing: "border-box"
                      }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{
                            backgroundColor: "#FFF5F2",
                            color: "#F15A24",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            flexShrink: 0
                          }}>1</span>
                          <span style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.4" }}>
                            <strong>Drag to select:</strong> Click or touch a letter and drag along straight lines (horizontal, vertical, or diagonal) to spell a word.
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{
                            backgroundColor: "#FFF5F2",
                            color: "#F15A24",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            flexShrink: 0
                          }}>2</span>
                          <span style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.4" }}>
                            <strong>Check the list:</strong> Match words from the target list. Words can be spelled forwards or backwards.
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{
                            backgroundColor: "#FFF5F2",
                            color: "#F15A24",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            flexShrink: 0
                          }}>3</span>
                          <span style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.4" }}>
                            <strong>Use hints:</strong> Stuck? Click <strong>Reveal Hint Letter</strong> to find the starting letter of a remaining word.
                          </span>
                        </div>
                      </div>

                      {/* Start button */}
                      <button
                        onClick={() => setGameStarted(true)}
                        style={{
                          backgroundColor: "#F15A24",
                          color: "white",
                          fontWeight: 700,
                          padding: "1rem 2.5rem",
                          borderRadius: "30px",
                          boxShadow: "0 10px 20px rgba(241, 90, 36, 0.15)",
                          border: "none",
                          fontSize: "1.05rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          transition: "all 0.2s"
                        }}
                      >
                        Start Game
                      </button>
                    </div>
                  )}

                  {/* Complete Screen Overlay */}
                  {isCompleted && (
                    <div 
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-30 flex flex-col items-center justify-start text-center animate-fade-in overflow-y-auto"
                      style={{
                        padding: "2.5rem 2rem",
                        boxSizing: "border-box"
                      }}
                    >
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 flex-shrink-0" style={{ margin: "0 0 0.5rem 0", padding: 0 }}>Puzzle Completed!</h3>
                      <p className="text-slate-600 max-w-md text-sm md:text-base flex-shrink-0" style={{ margin: "0 0 1rem 0", padding: 0 }}>Excellent work! You successfully identified all hidden cybersecurity terms.</p>
                      
                      {/* Metric Dashboard */}
                      <div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl flex-shrink-0"
                        style={{
                          margin: "0.5rem 0 1rem 0"
                        }}
                      >
                        <div 
                          className="border border-border rounded-xl flex flex-col justify-center items-center"
                          style={{
                            backgroundColor: "#FFFAF6",
                            padding: "1rem",
                            minHeight: "80px",
                            boxSizing: "border-box"
                          }}
                        >
                          <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold" style={{ marginBottom: "0.25rem" }}>Total Time</span>
                          <span className="text-base md:text-lg font-bold text-slate-800 font-mono">{formatTime(seconds)}</span>
                        </div>
                        <div 
                          className="border border-border rounded-xl flex flex-col justify-center items-center"
                          style={{
                            backgroundColor: "#FFFAF6",
                            padding: "1rem",
                            minHeight: "80px",
                            boxSizing: "border-box"
                          }}
                        >
                          <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold" style={{ marginBottom: "0.25rem" }}>Accuracy</span>
                          <span className="text-base md:text-lg font-bold text-slate-800">{accuracy}%</span>
                        </div>
                        <div 
                          className="border border-border rounded-xl flex flex-col justify-center items-center"
                          style={{
                            backgroundColor: "#FFFAF6",
                            padding: "1rem",
                            minHeight: "80px",
                            boxSizing: "border-box"
                          }}
                        >
                          <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold" style={{ marginBottom: "0.25rem" }}>Difficulty</span>
                          <span className="text-base md:text-lg font-bold text-[#F15A24] capitalize">{difficulty}</span>
                        </div>
                        <div 
                          className="border border-border rounded-xl flex flex-col justify-center items-center"
                          style={{
                            backgroundColor: "#FFFAF6",
                            padding: "1rem",
                            minHeight: "80px",
                            boxSizing: "border-box"
                          }}
                        >
                          <span className="text-[10px] md:text-xs text-slate-400 block uppercase font-bold" style={{ marginBottom: "0.25rem" }}>Risk Level</span>
                          <span className="text-base md:text-lg font-bold text-emerald-600 whitespace-nowrap">{getKnowledgeLevel()}</span>
                        </div>
                      </div>

                      {/* Removed Educational Term Review Word Glossary Summary */}

                      <div 
                        className="flex gap-4 flex-shrink-0"
                        style={{
                          margin: "0.5rem 0 1.5rem 0"
                        }}
                      >
                        <button onClick={() => startNewGame()} className="btn btn-primary px-6 py-3 cursor-pointer">Play Again</button>
                        <Link href="/solutions/insat" className="btn btn-secondary px-6 py-3">Explore Innvikta Platform</Link>
                      </div>
                    </div>
                  )}

                  {/* Letter Grid */}
                  <div 
                    ref={gridRef}
                    onMouseMove={handleMove}
                    onTouchMove={handleMove}
                    onMouseUp={handleEnd}
                    onTouchEnd={handleEnd}
                    className="grid select-none touch-none w-full"
                    style={{
                      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                      gap: gridSize > 12 ? "4px" : "8px"
                    }}
                  >
                    {grid.map((rowLetters, r) => 
                      rowLetters.map((letter, c) => {
                        const cellSelected = isCellSelected(r, c);
                        const cellFound = isCellFound(r, c);
                        const isHint = hintCell && hintCell.r === r && hintCell.c === c;

                        const startingWord = foundWords.find((word) => {
                          const path = solutionPaths[word];
                          return path && path[0] && path[0].r === r && path[0].c === c;
                        });

                        const isTooltipActive = activeTooltip === startingWord;

                        return (
                          <div
                            key={`${r}-${c}`}
                            data-row={r}
                            data-col={c}
                            onMouseDown={(e) => handleStart(r, c, e)}
                            onTouchStart={(e) => handleStart(r, c, e)}
                            className={`grid-cell ${cellSelected ? "selected" : ""} ${cellFound ? "found" : ""} ${isHint ? "hint" : ""}`}
                            style={{ 
                              position: "relative",
                              zIndex: isTooltipActive ? 50 : 1
                            }}
                          >
                            {letter}

                            {!isCompleted && startingWord && (
                              <>
                                {/* Glowing Hotspot Dot */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setActiveTooltip(activeTooltip === startingWord ? null : startingWord);
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  className="absolute cursor-pointer flex items-center justify-center"
                                  style={{
                                    top: "2px",
                                    right: "2px",
                                    width: "14px",
                                    height: "14px",
                                    zIndex: 20
                                  }}
                                  title={`Click to see definition of ${CYBER_TERMS[startingWord]?.name}`}
                                >
                                  {isTooltipActive && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F15A24] opacity-75"></span>
                                  )}
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F15A24] border border-white"></span>
                                </div>

                                {/* Hotspot Tooltip bubble matching website's dark slate color theme */}
                                {isTooltipActive && (
                                  <div
                                    className="absolute z-50 bg-[#1E293B] text-white rounded-xl shadow-2xl border border-[#475569] text-xs font-normal"
                                    style={{
                                      top: "calc(100% + 12px)",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      width: "230px",
                                      textAlign: "left",
                                      lineHeight: "1.5",
                                      padding: "1rem 1.25rem",
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveTooltip(null);
                                      }}
                                      className="absolute top-2 right-2 text-slate-400 hover:text-white"
                                      style={{
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        lineHeight: "1",
                                        padding: "2px"
                                      }}
                                    >
                                      ✕
                                    </button>
                                    <div className="font-bold mb-1.5 text-[#F15A24]" style={{ fontSize: "0.85rem", paddingRight: "16px" }}>
                                      {CYBER_TERMS[startingWord]?.name}
                                    </div>
                                    <div style={{ opacity: 0.9, fontSize: "0.75rem" }}>
                                      {CYBER_TERMS[startingWord]?.def}
                                    </div>
                                    <div
                                      className="absolute"
                                      style={{
                                        top: "-5px",
                                        left: "50%",
                                        transform: "translateX(-50%) rotate(45deg)",
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#1E293B",
                                        borderTop: "1px solid #475569",
                                        borderLeft: "1px solid #475569",
                                      }}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Target Word Checklist */}
              <div className="lg:col-span-3" style={{ opacity: gameStarted ? 1 : 0, pointerEvents: gameStarted ? "auto" : "none", transition: "opacity 0.3s ease" }}>
                <div className="bg-white border border-border rounded-2xl shadow-sm h-full" style={{ padding: "1.75rem", background: "#fff", boxSizing: "border-box" }}>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4" style={{ margin: "0 0 1rem 0" }}>Word Checklist</h3>
                  <div className="flex flex-col gap-1 pr-2">
                    {/* Found Words List */}
                    {foundWords.map((word) => (
                      <div 
                        key={word} 
                        className="flex items-center justify-between text-emerald-600 text-sm font-bold animate-pulse-once"
                        style={{ padding: "0.6rem 0.25rem", borderBottom: "1px solid #F1F5F9" }}
                      >
                        <span>{CYBER_TERMS[word]?.name || word}</span>
                        <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    ))}
                    {/* Remaining Words List */}
                    {remainingWords.map((word) => (
                      <div 
                        key={word} 
                        className="flex items-center justify-between text-slate-700 text-sm font-medium"
                        style={{ padding: "0.6rem 0.25rem", borderBottom: "1px solid #F1F5F9" }}
                      >
                        <span>{CYBER_TERMS[word]?.name || word}</span>
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. GLOSSARY TERMS SECTION (AEO/GEO Optimized Section) */}
        <section className="bg-white py-16 border-t border-border">
          <div className="container mx-auto px-4 md:px-8" style={{ margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1200px", width: "100%", boxSizing: "border-box" }}>
            <div className="max-w-6xl mx-auto">
              <span className="text-subheading" style={{ display: "block", marginBottom: "0.5rem", textAlign: "center" }}>GLOSSARY TERM EXPLORATIONS</span>
              <h2 className="text-40-heading mb-12 text-center" style={{ marginBottom: "3rem" }}>Essential Security Terminology Defined</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {Object.values(CYBER_TERMS).map((term) => (
                  <div key={term.name} className="border-b border-border pb-6">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#F15A24", fontWeight: "700" }}>{term.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{term.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. RELATED RESOURCES */}
        <section className="bg-white py-16 border-t border-border">
          <div className="container mx-auto px-4 md:px-8" style={{ margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1200px", width: "100%", boxSizing: "border-box" }}>
            <h2 className="text-32-heading text-center" style={{ marginBottom: "3rem" }}>More Free Cybersecurity Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <style>{`
                .custom-resource-card {
                  padding: 1.75rem !important;
                  background-color: #FFFAF6 !important;
                  border: 1px solid #FFEAD4 !important;
                  border-radius: 12px !important;
                  min-height: 220px !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: space-between !important;
                  box-sizing: border-box !important;
                }
              `}</style>
              {[
                { title: "Spot The Phish", desc: "Interactive game testing your skill at identifying phishing mail indicators.", link: "/freetools/spot-the-phish" },
                { title: "Maturity Calculator", desc: "Evaluate the capability levels of your training program structures.", link: "/resources/maturity-calculator" },
                { title: "Domain Security Analyzer", desc: "Audit records like SPF, DKIM, and DMARC for security vulnerability details.", link: "/freetools/domain-security-analyzer" },
                { title: "Baseline Score Tool", desc: "Assess domain safety levels and run mock credential breaches.", link: "/freetools/baseline-score-tool" }
              ].map((tool, idx) => (
                <div key={idx} className="custom-resource-card">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2" style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>{tool.title}</h3>
                    <p className="text-slate-600 mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "#475569" }}>{tool.desc}</p>
                  </div>
                  <Link href={tool.link} className="font-bold hover:underline inline-flex items-center gap-1" style={{ fontSize: "0.875rem", color: "#F15A24" }}>
                    Launch Tool
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. SYSTEM-WIDE FAQ */}
        <section className="bg-[#FFFAF6] border-t border-border py-16">
          <div className="container faq-grid">
            <div className="faq-title-col animate from-left flex flex-col justify-center self-center items-center text-center">
              <h2 className="text-40-heading text-center">We’re here to help</h2>
              <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{ marginTop: "1.25rem" }}>
                <div className="arrow-circle">
                  <span className="arrow-circle-bg"></span>
                  <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                  </svg>
                </div>
                <span>Learn more</span>
              </a>
            </div>

            <div className="faq-list-col animate from-right">
              {[
                { q: "How does the Cybersecurity Word Search game work?", a: "Find the hidden words list on the right side of the screen inside the layout matrix. Drag horizontally, vertically, or diagonally in both forward and backward directions to claim words!" },
                { q: "Can I play this game on mobile phones?", a: "Yes, the word search layout features touch gestures so you can drag and play smoothly on mobile browsers and tablets." },
                { q: "How does this tool help organization security awareness?", a: "Word searches leverage active cognitive recollection, making security terms like MFA, ransomware, and phishing immediately familiar, building foundational security awareness." }
              ].map((faq, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`}>
                  <button type="button" className="faq-trigger" aria-expanded={activeFaq === idx} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <span className="faq-question">{faq.q}</span>
                    <div className="faq-icon-wrapper">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-panel">
                    <div className="faq-panel-inner">
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
          <div className="container-xl">
            <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
              <div className="animate">
                <h2 className="section-title leading-tight">Ready to Test Your Workforce?</h2>
                <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                  Run safe simulations and turn risky behaviour into measurable learning.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                  <Link href="/start-free" className="btn btn-outline-primary">
                    Start Free
                  </Link>
                  <Link href="/book-demo" className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">Book a Demo <FiArrowRight className="text-xs" /></Link>
                </div>
              </div>
              <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
                <div className="animate-wave absolute inset-0 w-full h-full">
                  <ImageFallback src="/images/wave.svg" fill={true} sizes="100vw" alt="bg wave" />
                </div>
                <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
                <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
                <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
                <Circle className="right-[19%] bottom-[16%]" width={37} height={37} fill={false} fillValue="#FF5A1F" />
              </div>
            </div>
          </div>
        </section>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default WordSearchPage;