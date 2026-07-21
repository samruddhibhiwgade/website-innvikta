"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import { EMAILS, faqData } from "./components/constants";
import HeroSection from "./components/Hero";
import GameInterface from "./components/GameInterface";
import WhyAwarenessMatters from "./components/WhyAwarenessMatters";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

export default function SpotThePhish() {
  const [activeEmailId, setActiveEmailId] = useState(EMAILS[0].id);
  const [guesses, setGuesses] = useState({});
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedbackOverlay, setFeedbackOverlay] = useState(null);
  const [timer, setTimer] = useState(300);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  const heroRef = useRef(null);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setGameComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [gameStarted, gameComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const activeEmail = EMAILS.find(e => e.id === activeEmailId) || EMAILS[0];
  const hasGuessedCurrent = !!guesses[activeEmailId];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleGuess = (guessType) => {
    if (hasGuessedCurrent || feedbackOverlay) return;

    const isCorrect = (guessType === 'phish' && activeEmail.isPhishing) || 
                      (guessType === 'safe' && !activeEmail.isPhishing);

    if (isCorrect) setScore(prev => prev + 1);
    
    setGuesses(prev => ({ ...prev, [activeEmailId]: guessType }));
    
    setFeedbackOverlay({
      status: isCorrect ? 'correct' : 'incorrect',
      message: activeEmail.explanation,
      isPhishing: activeEmail.isPhishing
    });

    setTimeout(() => {
      setFeedbackOverlay(null);
      const currentIndex = EMAILS.findIndex(e => e.id === activeEmailId);
      if (currentIndex < EMAILS.length - 1) {
        setActiveEmailId(EMAILS[currentIndex + 1].id);
      } else {
        setGameComplete(true);
      }
    }, 4500);
  };

  const restartGame = () => {
    setGuesses({});
    setScore(0);
    setTimer(300);
    setGameComplete(false);
    setGameStarted(false);
    setFeedbackOverlay(null);
    setActiveEmailId(EMAILS[0].id);
    setIsMobileListOpen(false);
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Spot the Phish Simulation Game | Innvikta" description="Test your phishing detection skills in our interactive Spot the Phish training simulation game." />
      
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Spot The Phish Game",
              "description": "A free interactive cybersecurity awareness game by Innvikta that challenges users to identify whether an email is legitimate or a phishing attempt.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ])
        }}
      />

      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
          <HeroSection />
          <GameInterface 
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameComplete={gameComplete}
            guesses={guesses}
            score={score}
            timer={timer}
            formatTime={formatTime}
            handleGuess={handleGuess}
            activeEmailId={activeEmailId}
            setActiveEmailId={setActiveEmailId}
            feedbackOverlay={feedbackOverlay}
            isMobileListOpen={isMobileListOpen}
            setIsMobileListOpen={setIsMobileListOpen}
            restartGame={restartGame}
          />
          <WhyAwarenessMatters />
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