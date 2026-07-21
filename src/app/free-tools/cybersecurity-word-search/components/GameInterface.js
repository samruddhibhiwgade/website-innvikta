import React from "react";
import Link from "next/link";
import { CYBER_TERMS, CYBER_FACTS } from "./constants";

export default function GameInterface({
  difficulty,
  setDifficulty,
  seconds,
  formatTime,
  foundWords,
  remainingWords,
  accuracy,
  showHint,
  isCompleted,
  startNewGame,
  factIndex,
  gameStarted,
  setGameStarted,
  getKnowledgeLevel,
  gridRef,
  handleMove,
  handleEnd,
  gridSize,
  grid,
  isCellSelected,
  isCellFound,
  hintCell,
  solutionPaths,
  activeTooltip,
  setActiveTooltip,
  handleStart
}) {
  return (
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

                  <div style={{
                    width: "80px",
                    height: "4px",
                    backgroundColor: "#F15A24",
                    margin: "0 auto 1.5rem auto",
                    borderRadius: "2px"
                  }} />

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

                  <div 
                    className="flex gap-4 flex-shrink-0"
                    style={{
                      margin: "0.5rem 0 1.5rem 0"
                    }}
                  >
                    <button onClick={() => startNewGame()} className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm cursor-pointer" style={{ padding: "14px 28px" }}>Play Again</button>
                    <Link href="/solutions/insat" className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm whitespace-nowrap" style={{ padding: "14px 28px" }}>Explore Innvikta Platform</Link>
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
  );
}
