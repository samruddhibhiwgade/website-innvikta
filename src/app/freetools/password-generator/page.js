"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import React, { useState, useEffect, useRef } from "react";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";

import { WORDLIST, faqData } from "./components/constants";
import HeroSection from "./components/Hero";
import ToolPlatform from "./components/ToolPlatform";
import PasswordPillars from "./components/PasswordPillars";
import HygieneAndThreats from "./components/HygieneAndThreats";
import FAQSection from "./components/Faq";
import FinalCtaSection from "./components/FinalCta";

export default function PasswordGeneratorPage() {
  const heroRef = useRef(null);
  const generatorRef = useRef(null);
  const strengthRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const [activeTool, setActiveTool] = useState("generator");

  const [passLength, setPassLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copiedGen, setCopiedGen] = useState(false);

  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [capitalization, setCapitalization] = useState("lowercase");
  const [passphraseIncludeNum, setPassphraseIncludeNum] = useState(false);
  const [passphraseIncludeSym, setPassphraseIncludeSym] = useState(false);
  const [useCustomPhrase, setUseCustomPhrase] = useState(false);
  const [customPhrase, setCustomPhrase] = useState("");
  const [generatedPassphrase, setGeneratedPassphrase] = useState("");
  const [copiedPhrase, setCopiedPhrase] = useState(false);

  const [checkPassword, setCheckPassword] = useState("");
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const generateRandomPassword = () => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      lower = lower.replace(/[ilo]/g, "");
      upper = upper.replace(/[LOI]/g, "");
      numbers = numbers.replace(/[01]/g, "");
    }

    if (excludeAmbiguous) {
      symbols = symbols.replace(/[{}\[\]()\/\\'"`~,;:.<>]/g, "");
    }

    let charPool = "";
    if (includeLower) charPool += lower;
    if (includeUpper) charPool += upper;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (!charPool) {
      setGeneratedPassword("Please select options");
      return;
    }

    let pass = "";
    if (includeLower && lower.length > 0) pass += lower[Math.floor(Math.random() * lower.length)];
    if (includeUpper && upper.length > 0) pass += upper[Math.floor(Math.random() * upper.length)];
    if (includeNumbers && numbers.length > 0) pass += numbers[Math.floor(Math.random() * numbers.length)];
    if (includeSymbols && symbols.length > 0) pass += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = pass.length; i < passLength; i++) {
      pass += charPool[Math.floor(Math.random() * charPool.length)];
    }

    pass = pass.split("").sort(() => 0.5 - Math.random()).join("");
    setGeneratedPassword(pass);
    setCopiedGen(false);
  };

  const generateRandomPassphrase = () => {
    let words = [];
    if (useCustomPhrase) {
      if (!customPhrase.trim()) {
        setGeneratedPassphrase("Please enter a custom phrase");
        return;
      }
      const rawWords = customPhrase.trim().split(/[\s]+/);
      words = rawWords.map(word => {
        let cleaned = word.replace(/[^a-zA-Z0-9]/g, "");
        if (capitalization === "lowercase") {
          return cleaned.toLowerCase();
        } else if (capitalization === "titlecase") {
          return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
        } else if (capitalization === "random") {
          return cleaned.split("").map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join("");
        }
        return cleaned;
      }).filter(Boolean);
      
      if (words.length === 0) {
        setGeneratedPassphrase("Please enter a valid phrase with letters or numbers");
        return;
      }
    } else {
      for (let i = 0; i < wordCount; i++) {
        let word = WORDLIST[Math.floor(Math.random() * WORDLIST.length)];
        if (capitalization === "lowercase") {
          word = word.toLowerCase();
        } else if (capitalization === "titlecase") {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        } else if (capitalization === "random") {
          word = word.split("").map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join("");
        }
        words.push(word);
      }
    }

    let phrase = words.join(separator);

    if (passphraseIncludeNum) {
      phrase += Math.floor(Math.random() * 10);
    }
    if (passphraseIncludeSym) {
      const symList = "!@#$%^&*";
      phrase += symList[Math.floor(Math.random() * symList.length)];
    }

    setGeneratedPassphrase(phrase);
    setCopiedPhrase(false);
  };

  useEffect(() => {
    generateRandomPassword();
  }, [passLength, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  useEffect(() => {
    generateRandomPassphrase();
  }, [wordCount, separator, capitalization, passphraseIncludeNum, passphraseIncludeSym, useCustomPhrase, customPhrase]);

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

  const analyzePassword = (pass) => {
    if (!pass) return { score: 0, rating: "Very Weak", color: "#EF4444", feedback: [], crackTime: "Instant" };

    let score = 0;
    let feedback = [];

    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;
    if (pass.length >= 20) score += 1;

    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const hasSym = /[^A-Za-z0-9]/.test(pass);

    if (hasLower) score += 0.5;
    if (hasUpper) score += 0.5;
    if (hasNum) score += 0.5;
    if (hasSym) score += 0.5;

    if (/(012|123|234|345|456|567|678|789|890)/.test(pass)) {
      score -= 0.5;
      feedback.push("Avoid sequential numbers (e.g. 123).");
    }
    if (/(.)\1\1/.test(pass)) {
      score -= 0.5;
      feedback.push("Avoid three or more repeating characters.");
    }
    if (/(qwerty|asdfgh|zxcvbn)/i.test(pass)) {
      score -= 1;
      feedback.push("Avoid common keyboard patterns.");
    }

    let normalized = Math.max(0, Math.min(5, Math.ceil(score)));

    let rating = "Very Weak";
    let color = "#EF4444";
    let crackTime = "Instant";

    if (normalized === 1) {
      rating = "Weak";
      color = "#F97316";
      crackTime = "~ Few seconds";
    } else if (normalized === 2) {
      rating = "Fair";
      color = "#F59E0B";
      crackTime = "~ Hours / Days";
    } else if (normalized === 3) {
      rating = "Good";
      color = "#3B82F6";
      crackTime = "~ Months / Years";
    } else if (normalized === 4) {
      rating = "Strong";
      color = "#10B981";
      crackTime = "~ Centuries";
    } else if (normalized === 5) {
      rating = "Excellent";
      color = "#059669";
      crackTime = "Trillions of years";
    }

    if (pass.length < 12) {
      feedback.push("Increase length to at least 12-16 characters.");
    }
    if (!hasUpper || !hasSym || !hasNum) {
      feedback.push("Mix uppercase, numbers, and symbols to boost complexity.");
    }

    return { score: normalized, rating, color, feedback, crackTime };
  };

  const genAnalysis = analyzePassword(generatedPassword);
  const phraseAnalysis = analyzePassword(generatedPassphrase);
  const checkAnalysis = analyzePassword(checkPassword);

  const copyToClipboard = (text, setCopied) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToGenerator = () => {
    setActiveTool("generator");
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToStrength = () => {
    setActiveTool("strength");
    strengthRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Secure Strong Password Generator | Innvikta" description="Generate cryptographically secure, random passwords to protect your online accounts." />
      
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Password Generator & Strength Checker",
              "description": "A free browser-based cybersecurity tool by Innvikta to generate highly secure passwords/passphrases and check password entropy locally.",
              "applicationCategory": "SecurityApplication",
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
          <HeroSection 
            scrollToGenerator={scrollToGenerator}
            scrollToStrength={scrollToStrength}
          />
          <ToolPlatform 
            generatorRef={generatorRef}
            strengthRef={strengthRef}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            passLength={passLength}
            setPassLength={setPassLength}
            includeUpper={includeUpper}
            setIncludeUpper={setIncludeUpper}
            includeLower={includeLower}
            setIncludeLower={setIncludeLower}
            includeNumbers={includeNumbers}
            setIncludeNumbers={setIncludeNumbers}
            includeSymbols={includeSymbols}
            setIncludeSymbols={setIncludeSymbols}
            excludeSimilar={excludeSimilar}
            setExcludeSimilar={setExcludeSimilar}
            excludeAmbiguous={excludeAmbiguous}
            setExcludeAmbiguous={setExcludeAmbiguous}
            generatedPassword={generatedPassword}
            generateRandomPassword={generateRandomPassword}
            copiedGen={copiedGen}
            genAnalysis={genAnalysis}
            wordCount={wordCount}
            setWordCount={setWordCount}
            separator={separator}
            setSeparator={setSeparator}
            capitalization={capitalization}
            setCapitalization={setCapitalization}
            passphraseIncludeNum={passphraseIncludeNum}
            setPassphraseIncludeNum={setPassphraseIncludeNum}
            passphraseIncludeSym={passphraseIncludeSym}
            setPassphraseIncludeSym={setPassphraseIncludeSym}
            useCustomPhrase={useCustomPhrase}
            setUseCustomPhrase={setUseCustomPhrase}
            customPhrase={customPhrase}
            setCustomPhrase={setCustomPhrase}
            generatedPassphrase={generatedPassphrase}
            generateRandomPassphrase={generateRandomPassphrase}
            copiedPhrase={copiedPhrase}
            phraseAnalysis={phraseAnalysis}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            showCheckPassword={showCheckPassword}
            setShowCheckPassword={setShowCheckPassword}
            checkAnalysis={checkAnalysis}
            copyToClipboard={copyToClipboard}
            setCopiedGen={setCopiedGen}
            setCopiedPhrase={setCopiedPhrase}
          />
          <PasswordPillars />
          <HygieneAndThreats />
          <FAQSection 
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />
        </div>
      </div>
    </GSAPWrapper>
  );
}