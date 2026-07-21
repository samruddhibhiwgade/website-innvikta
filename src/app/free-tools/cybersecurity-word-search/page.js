"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import { CYBER_TERMS, CYBER_FACTS, generateWordSearchGrid } from "./components/constants";
import HeroSection from "./components/Hero";
import GameInterface from "./components/GameInterface";
import GlossaryExplorations from "./components/GlossaryExplorations";
import RelatedTools from "./components/RelatedTools";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

export default function WordSearchPage() {
  // Game state
  const [difficulty, setDifficulty] = useState("easy");
  const [gridSize, setGridSize] = useState(12);
  const [grid, setGrid] = useState([]);
  const [solutionPaths, setSolutionPaths] = useState({});
  const [remainingWords, setRemainingWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCoords, setFoundCoords] = useState(new Set());
  const [activeSelection, setActiveSelection] = useState([]);
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
  const [activeTooltip, setActiveTooltip] = useState(null);

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

  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * CYBER_FACTS.length));
  }, []);

  const getDifficultyConfig = (diff) => {
    switch (diff) {
      case "easy":
        return {
          size: 10,
          directions: [[0, 1], [1, 0]],
          wordCount: 6
        };
      case "hard":
        return {
          size: 15,
          directions: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1]],
          wordCount: 10
        };
      case "expert":
        return {
          size: 18,
          directions: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]],
          wordCount: 12
        };
      case "medium":
      default:
        return {
          size: 12,
          directions: [[0, 1], [1, 0], [1, 1], [1, -1]],
          wordCount: 8
        };
    }
  };

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

    const allWords = Object.keys(CYBER_TERMS);
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, config.wordCount);
    setRemainingWords(selected);

    const { grid: newGrid, solutionPaths: newPaths } = generateWordSearchGrid(selected, config.size, config.directions);
    setGrid(newGrid);
    setSolutionPaths(newPaths);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  useEffect(() => {
    if (isCompleted || !gameStarted) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted, gameStarted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

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
    setActiveTooltip(null);
  };

  const handleMove = (e) => {
    if (!isDragging || !dragStart || isCompleted) return;
    const currentCell = getCellCoordsFromEvent(e);
    if (!currentCell) return;

    const { r: r1, c: c1 } = dragStart;
    const { r: r2, c: c2 } = currentCell;

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
        setFoundWords((prev) => [...prev, matchedWord]);
        setRemainingWords((prev) => prev.filter((w) => w !== matchedWord));

        const newCoords = new Set(foundCoords);
        matchedPath.forEach(({ r, c }) => {
          newCoords.add(`${r},${c}`);
        });
        setFoundCoords(newCoords);

        if (remainingWords.length === 1) {
          setIsCompleted(true);
        }

        setActiveTooltip(matchedWord);
      }

      setTimeout(() => {
        setAccuracy(Math.min(100, Math.round(((foundWords.length + (matchedWord ? 1 : 0)) / (attempts + 1)) * 100)));
      }, 50);
    }
    setActiveSelection([]);
  };

  const isCellSelected = (r, c) => {
    return activeSelection.some((cell) => cell.r === r && cell.c === c);
  };

  const isCellFound = (r, c) => {
    return foundCoords.has(`${r},${c}`);
  };

  const showHint = () => {
    if (remainingWords.length === 0 || isCompleted) return;
    const targetWord = remainingWords[0];
    const path = solutionPaths[targetWord];
    if (path && path.length > 0) {
      setHintCell(path[0]);
    }
  };

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
          <HeroSection />
          <GameInterface 
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            seconds={seconds}
            formatTime={formatTime}
            foundWords={foundWords}
            remainingWords={remainingWords}
            accuracy={accuracy}
            showHint={showHint}
            isCompleted={isCompleted}
            startNewGame={startNewGame}
            factIndex={factIndex}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            getKnowledgeLevel={getKnowledgeLevel}
            gridRef={gridRef}
            handleMove={handleMove}
            handleEnd={handleEnd}
            gridSize={gridSize}
            grid={grid}
            isCellSelected={isCellSelected}
            isCellFound={isCellFound}
            hintCell={hintCell}
            solutionPaths={solutionPaths}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
            handleStart={handleStart}
          />
          <GlossaryExplorations />
          <RelatedTools />
          <FAQSection 
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />
          <FinalCtaSection />
        </div>
      </div>
    </GSAPWrapper>
  );
}