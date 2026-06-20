"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";

import { 
  FiShield, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiLock,
  FiKey,
  FiGlobe,
  FiUserX,
  FiClock,
  FiFileText,
  FiCopy,
  FiRefreshCw,
  FiInfo,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiChevronRight,
  FiUserCheck,
  FiUserPlus
} from "react-icons/fi";

export default function PasswordGeneratorPage() {
  // Common states
  const heroRef = useRef(null);
  const generatorRef = useRef(null);
  const strengthRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Tab State: "generator" | "passphrase" | "strength"
  const [activeTool, setActiveTool] = useState("generator");

  // Tool 1: Password Generator States
  const [passLength, setPassLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copiedGen, setCopiedGen] = useState(false);

  // Tool 2: Passphrase Generator States
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-"); // "-", "_", " "
  const [capitalization, setCapitalization] = useState("lowercase"); // "lowercase", "titlecase", "random"
  const [passphraseIncludeNum, setPassphraseIncludeNum] = useState(false);
  const [passphraseIncludeSym, setPassphraseIncludeSym] = useState(false);
  const [useCustomPhrase, setUseCustomPhrase] = useState(false);
  const [customPhrase, setCustomPhrase] = useState("");
  const [generatedPassphrase, setGeneratedPassphrase] = useState("");
  const [copiedPhrase, setCopiedPhrase] = useState(false);

  // Tool 3: Password Strength Checker States
  const [checkPassword, setCheckPassword] = useState("");
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [copiedCheck, setCopiedCheck] = useState(false);

  // Wordlist for Passphrase Generator (simple secure words)
  const WORDLIST = [
    "about", "above", "across", "action", "active", "actor", "admit", "adopt", "advice", "advise",
    "affect", "afford", "afraid", "agency", "agent", "agree", "ahead", "alarm", "album", "alert",
    "alike", "alive", "allow", "alone", "along", "alter", "among", "anger", "angle", "angry",
    "animal", "annual", "answer", "appeal", "appear", "apple", "apply", "argue", "arise", "around",
    "arrest", "arrive", "arrow", "article", "artist", "aside", "aspect", "assist", "assume", "attack",
    "attend", "audit", "author", "autumn", "avenue", "average", "avoid", "awake", "award", "aware",
    "backed", "backup", "badge", "baggage", "baker", "balance", "banner", "barber", "barely", "barrel",
    "basin", "basket", "battle", "beacon", "beauty", "become", "before", "behalf", "behind", "belief",
    "belong", "below", "bench", "benefit", "beside", "better", "beyond", "bishop", "bitter", "blanket",
    "border", "borrow", "bottle", "bottom", "bounce", "boundary", "branch", "brave", "breach", "bridge",
    "bright", "bronze", "brown", "brush", "bubble", "bucket", "budget", "buffer", "builder", "bundle",
    "burden", "bureau", "butter", "button", "buyer", "cabin", "cable", "cactus", "cagey", "camera",
    "camp", "campus", "candle", "canvas", "canyon", "capital", "captain", "carbon", "career", "careful",
    "cargo", "carpet", "carrot", "castle", "casual", "catalog", "cattle", "cavity", "cement", "center",
    "chain", "chair", "chamber", "chance", "change", "channel", "chapel", "chapter", "charge", "charity",
    "charm", "chart", "chase", "cheap", "check", "cheek", "cheerful", "cheese", "cherry", "chest",
    "chief", "child", "chimney", "china", "choice", "choose", "chorus", "chronic", "church", "cider",
    "cigar", "cinema", "circle", "circus", "citizen", "citrus", "civil", "claim", "clamp", "classic",
    "clay", "clean", "clear", "clerk", "clever", "click", "client", "cliff", "climate", "climb",
    "clinic", "clock", "close", "cloth", "cloud", "clover", "coach", "coast", "cobalt", "coffee",
    "cohort", "collar", "colony", "colors", "column", "combat", "comedy", "comfort", "comic", "commit",
    "common", "compact", "company", "compare", "compel", "comply", "concept", "concern", "concert", "concrete",
    "condor", "conduct", "confer", "conflict", "conform", "connect", "consent", "consul", "contact", "contain",
    "content", "contest", "context", "contour", "control", "convert", "convex", "convey", "convict", "cookie",
    "copper", "corner", "corona", "correct", "corrid", "cosmic", "cosmos", "costly", "cotton", "council",
    "counsel", "counter", "country", "county", "couple", "courage", "cousin", "covey", "cradle", "crafty",
    "crater", "crayon", "crazy", "create", "credit", "creek", "crest", "crisis", "critic", "crook",
    "crowd", "crown", "crude", "cruise", "crush", "crystal", "cubic", "culture", "cupboard", "curator",
    "curfew", "curious", "current", "cursor", "curtain", "cushion", "custom", "cyber", "cycle", "cynic"
  ];

  // Generator logic
  const generateRandomPassword = () => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      // Exclude i, l, 1, L, o, 0, O, I
      lower = lower.replace(/[ilo]/g, "");
      upper = upper.replace(/[LOI]/g, "");
      numbers = numbers.replace(/[01]/g, "");
    }

    if (excludeAmbiguous) {
      // Exclude ambiguous characters like { } [ ] ( ) / \ ' " ` ~ , ; : . < >
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
    // Ensure at least one of each selected type is included
    if (includeLower && lower.length > 0) pass += lower[Math.floor(Math.random() * lower.length)];
    if (includeUpper && upper.length > 0) pass += upper[Math.floor(Math.random() * upper.length)];
    if (includeNumbers && numbers.length > 0) pass += numbers[Math.floor(Math.random() * numbers.length)];
    if (includeSymbols && symbols.length > 0) pass += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = pass.length; i < passLength; i++) {
      pass += charPool[Math.floor(Math.random() * charPool.length)];
    }

    // Shuffle characters
    pass = pass.split("").sort(() => 0.5 - Math.random()).join("");
    setGeneratedPassword(pass);
    setCopiedGen(false);
  };

  // Passphrase logic
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

  // Run generators on load/config change
  useEffect(() => {
    generateRandomPassword();
  }, [passLength, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  useEffect(() => {
    generateRandomPassphrase();
  }, [wordCount, separator, capitalization, passphraseIncludeNum, passphraseIncludeSym, useCustomPhrase, customPhrase]);

  // Initial animation
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

  // Password analyzer calculations
  const analyzePassword = (pass) => {
    if (!pass) return { score: 0, rating: "Very Weak", color: "#EF4444", feedback: [], crackTime: "Instant" };

    let score = 0;
    let feedback = [];

    // Length criteria
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;
    if (pass.length >= 20) score += 1;

    // Diversity criteria
    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const hasSym = /[^A-Za-z0-9]/.test(pass);

    if (hasLower) score += 0.5;
    if (hasUpper) score += 0.5;
    if (hasNum) score += 0.5;
    if (hasSym) score += 0.5;

    // Reductions for poor patterns
    // Check sequential numbers
    if (/(012|123|234|345|456|567|678|789|890)/.test(pass)) {
      score -= 0.5;
      feedback.push("Avoid sequential numbers (e.g. 123).");
    }
    // Check repeated letters/numbers
    if (/(.)\1\1/.test(pass)) {
      score -= 0.5;
      feedback.push("Avoid three or more repeating characters.");
    }
    // Predictability / Keyboard paths
    if (/(qwerty|asdfgh|zxcvbn)/i.test(pass)) {
      score -= 1;
      feedback.push("Avoid common keyboard patterns.");
    }

    // Normalizing score to 0 - 5 scale
    let normalized = Math.max(0, Math.min(5, Math.ceil(score)));

    // Set ratings and color
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

    // Construct constructive recommendations
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

  // Scroll functions
  const scrollToGenerator = () => {
    setActiveTool("generator");
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToStrength = () => {
    setActiveTool("strength");
    strengthRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqData = [
    {
      question: "What is a strong password?",
      answer: "A strong password is a long, randomized sequence of letters (both uppercase and lowercase), numbers, and special symbols that does not contain dictionary words, sequences, or personal details."
    },
    {
      question: "What is a passphrase?",
      answer: "A passphrase is a security credential made from multiple random words combined. Passphrases are often longer than standard passwords, significantly harder for computers to brute-force, yet much easier for humans to remember."
    },
    {
      question: "How long should my passwords be?",
      answer: "We recommend a minimum of 12 to 16 characters for regular passwords, and at least 4 to 5 words for passphrases. Every added character increases entropy exponentially, rendering standard brute-force attacks mathematically impossible."
    },
    {
      question: "Are passphrases safer than passwords?",
      answer: "Yes, in most cases. Because entropy scales dramatically with length, a 5-word random passphrase (e.g. 'wagon-canyon-coffee-curator-beacon') is vastly stronger than a complex 10-character password like 'P@ssw0rd1!', while remaining much easier to memorize."
    },
    {
      question: "What is password entropy?",
      answer: "Password entropy measures the computational randomness and unpredictability of a password in bits. Higher entropy means a password requires more attempts to guess, offering higher resistance to cracking tools."
    },
    {
      question: "What is credential stuffing?",
      answer: "Credential stuffing is an automated cyberattack where hackers use lists of leaked credentials (usernames and passwords from past database breaches) to log in to other popular websites, relying on the fact that many users reuse passwords across services."
    },
    {
      question: "What is Multi-Factor Authentication (MFA)?",
      answer: "Multi-Factor Authentication (MFA) requires users to provide two or more verification factors to gain access to an account (e.g., a password plus a temporary code sent to an authenticator app), ensuring access is blocked even if passwords leak."
    },
    {
      question: "Are password managers safe to use?",
      answer: "Yes. Cybersecurity authorities strongly recommend using password managers. They securely encrypt your unique passwords locally under a master key, removing the need to reuse passwords or memorize dozens of credentials."
    },
    {
      question: "What are passkeys?",
      answer: "Passkeys are a modern passwordless authentication standard created by the FIDO Alliance. They leverage local device security (biometrics like FaceID or TouchID) to log you in without requiring traditional passwords, eliminating phishing vulnerabilities."
    },
    {
      question: "What constitutes good password hygiene?",
      answer: "Good hygiene includes: creating unique passwords for every single account, avoiding predictable strings, storing credentials in a secure password manager, activating MFA everywhere, and changing credentials immediately upon reports of database compromises."
    }
  ];

  return (
    <GSAPWrapper>
      {/* Schema.org Injections */}
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
          
          {/* HERO DECOR BACKGROUND */}
          <section className="hero-section" style={{ paddingBottom: "2rem" }}>
            <div className="hero-outer-wrapper">
              
              <div className="hero-bg-decor" aria-hidden="true">
                <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                  
                  <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                  
                  <circle cx="78" cy="198" r="5" fill="#FF7A00" />
                  <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
                  <circle cx="158" cy="308" r="4" fill="#FF7A00" />
                  <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
                  <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
                  <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
                  <circle cx="268" cy="338" r="4" fill="#FF7A00" />
                  <circle cx="188" cy="238" r="4" fill="#FF7A00" />
                  <circle cx="398" cy="78" r="5" fill="#FF7A00" />
                  <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
                  <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
                  <circle cx="488" cy="128" r="4" fill="#FF7A00" />
                  <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
                  <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
                  <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
                  <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
                  <circle cx="648" cy="110" r="4" fill="#FF7A00" />
                  <circle cx="638" cy="278" r="4" fill="#FF7A00" />
                  
                  <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>
                <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
                  <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
                  <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
                  <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                  <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                  <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                </svg>
              </div>

              <div className="hero-backdrop-wrapper">
                <div className="backdrop-shape shape-1">
                  <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
                    <defs>
                      <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                        <stop offset="0.31" stopColor="#FF7A00" />
                        <stop offset="0.59" stopColor="#F59E0B" />
                        <stop offset="0.78" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
                  <div className="hero-content" style={{ paddingTop: "2.5rem", textAlign: "center", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto", textAlign: "center" }}>Free Cybersecurity Tools</span>
                    <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                      Generate Strong Passwords & <span className="text-primary">Secure Passphrases</span> Instantly
                    </h1>
                    <p className="text-20-content hero-paragraph" style={{ marginBottom: "2.5rem", maxWidth: "760px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
                      Create secure passwords, test password strength, generate memorable passphrases, and learn how to protect your accounts from modern cyber threats.
                    </p>

                    {/* Trust Indicators */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem 2rem", marginBottom: "3rem", color: "#4B5563", fontWeight: 600, fontSize: "0.95rem" }}>
                      <span className="flex items-center gap-1.5"><FiCheckCircle className="text-primary" /> Free to Use</span>
                      <span className="flex items-center gap-1.5"><FiCheckCircle className="text-primary" /> No Data Stored</span>
                      <span className="flex items-center gap-1.5"><FiCheckCircle className="text-primary" /> Browser-Based Analysis</span>
                      <span className="flex items-center gap-1.5"><FiCheckCircle className="text-primary" /> Privacy Friendly</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                      <button onClick={scrollToGenerator} className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Generate Password
                      </button>
                      <button onClick={scrollToStrength} className="btn btn-secondary" style={{ padding: "12px 28px", borderRadius: "8px", fontWeight: 700 }}>
                        Check Password Strength
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* MAIN TOOL PLATFORM COMPONENT */}
          <section ref={generatorRef} className="section bg-white" style={{ padding: "4rem 0", position: "relative" }}>
            <div className="container max-w-6xl mx-auto px-4">
              
              {/* Tab Selector buttons */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem", borderBottom: "1px solid #E5E7EB", paddingBottom: "1rem" }}>
                <button 
                  onClick={() => setActiveTool("generator")} 
                  style={{
                    padding: "10px 24px",
                    fontWeight: 700,
                    borderRadius: "30px",
                    fontSize: "0.95rem",
                    backgroundColor: activeTool === "generator" ? "#F15A24" : "transparent",
                    color: activeTool === "generator" ? "white" : "#4B5563",
                    transition: "all 0.3s"
                  }}
                >
                  Password Generator
                </button>
                <button 
                  onClick={() => setActiveTool("passphrase")} 
                  style={{
                    padding: "10px 24px",
                    fontWeight: 700,
                    borderRadius: "30px",
                    fontSize: "0.95rem",
                    backgroundColor: activeTool === "passphrase" ? "#F15A24" : "transparent",
                    color: activeTool === "passphrase" ? "white" : "#4B5563",
                    transition: "all 0.3s"
                  }}
                >
                  Passphrase Generator
                </button>
                <button 
                  onClick={() => setActiveTool("strength")} 
                  style={{
                    padding: "10px 24px",
                    fontWeight: 700,
                    borderRadius: "30px",
                    fontSize: "0.95rem",
                    backgroundColor: activeTool === "strength" ? "#F15A24" : "transparent",
                    color: activeTool === "strength" ? "white" : "#4B5563",
                    transition: "all 0.3s"
                  }}
                >
                  Strength Analyzer
                </button>
              </div>

              {/* CARD ENCLOSING ACTIVE TOOL */}
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                padding: "2.5rem",
                maxWidth: "800px",
                margin: "0 auto"
              }}>

                {/* 1. PASSWORD GENERATOR VIEW */}
                {activeTool === "generator" && (
                  <div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
                      Strong Password Generator
                    </h2>
                    <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                      Generate secure, random, and unique passwords designed to resist brute-force attacks, credential stuffing, and account compromise.
                    </p>

                    <div style={{ 
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      marginBottom: "2rem"
                    }}>
                      <span style={{ 
                        fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", 
                        fontFamily: "monospace", 
                        fontWeight: 500, 
                        color: "#111827",
                        wordBreak: "break-all",
                        letterSpacing: "0.05em",
                        flex: 1
                      }}>
                        {generatedPassword}
                      </span>
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        <button 
                          onClick={generateRandomPassword}
                          title="Regenerate password"
                          style={{ color: "#9CA3AF", padding: "8px", borderRadius: "8px" }}
                          className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          <FiRefreshCw size={18} />
                        </button>
                        <button 
                          onClick={() => copyToClipboard(generatedPassword, setCopiedGen)}
                          title="Copy to clipboard"
                          style={{ 
                            color: copiedGen ? "#10B981" : "#9CA3AF", 
                            padding: "8px", 
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          {copiedGen ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Entropy Metrics */}
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                      <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strength</span>
                        <strong style={{ display: "block", fontSize: "1.25rem", color: genAnalysis.color, marginTop: "4px" }}>{genAnalysis.rating}</strong>
                      </div>
                      <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Crack Time</span>
                        <strong style={{ display: "block", fontSize: "1.1rem", color: "#111827", marginTop: "4px" }}>{genAnalysis.crackTime}</strong>
                      </div>
                    </div>

                    {/* Controls Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <label style={{ fontWeight: 700, color: "#374151" }}>Length: {passLength} characters</label>
                        </div>
                        <input 
                          type="range" 
                          min="8" 
                          max="64" 
                          value={passLength}
                          onChange={(e) => setPassLength(parseInt(e.target.value))}
                          style={{ width: "100%", accentColor: "#F15A24" }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Include Uppercase (A-Z)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Include Lowercase (a-z)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Include Numbers (0-9)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Include Symbols (!@#$%)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={excludeSimilar} onChange={(e) => setExcludeSimilar(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Exclude Similar (i, l, 1, L, o, 0)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Exclude Ambiguous ({"{ } [ ] ( )"})
                        </label>
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                      <button onClick={generateRandomPassword} className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
                        Generate Password
                      </button>
                    </div>

                    <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "8px" }}>
                      <FiInfo className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                      <span style={{ fontSize: "0.85rem", color: "#4B5563", lineHeight: "1.4" }}>
                        <strong>Educational Note:</strong> Password strength depends heavily on length, randomness, uniqueness, and resistance to predictable dictionary matches.
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. PASSPHRASE GENERATOR VIEW */}
                {activeTool === "passphrase" && (
                  <div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
                      Secure Passphrase Generator
                    </h2>
                    <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                      Generate easy-to-remember passphrases that provide strong security through length and randomness.
                    </p>

                    <div style={{ 
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      marginBottom: "2rem"
                    }}>
                      <span style={{ 
                        fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)", 
                        fontFamily: "monospace", 
                        fontWeight: 500, 
                        color: "#111827",
                        wordBreak: "break-all",
                        letterSpacing: "0.02em",
                        flex: 1
                      }}>
                        {generatedPassphrase}
                      </span>
                      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                        <button 
                          onClick={generateRandomPassphrase}
                          title="Regenerate passphrase"
                          style={{ color: "#9CA3AF", padding: "8px", borderRadius: "8px" }}
                          className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          <FiRefreshCw size={18} />
                        </button>
                        <button 
                          onClick={() => copyToClipboard(generatedPassphrase, setCopiedPhrase)}
                          title="Copy to clipboard"
                          style={{ 
                            color: copiedPhrase ? "#10B981" : "#9CA3AF", 
                            padding: "8px", 
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          {copiedPhrase ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Entropy Metrics */}
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                      <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strength</span>
                        <strong style={{ display: "block", fontSize: "1.25rem", color: phraseAnalysis.color, marginTop: "4px" }}>{phraseAnalysis.rating}</strong>
                      </div>
                      <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Crack Time</span>
                        <strong style={{ display: "block", fontSize: "1.1rem", color: "#111827", marginTop: "4px" }}>{phraseAnalysis.crackTime}</strong>
                      </div>
                    </div>

                    {/* Controls Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      
                      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 700, color: "#374151" }}>
                          <input 
                            type="radio" 
                            name="passphraseMode" 
                            checked={!useCustomPhrase} 
                            onChange={() => setUseCustomPhrase(false)} 
                            style={{ accentColor: "#F15A24" }} 
                          />
                          Random Words
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 700, color: "#374151" }}>
                          <input 
                            type="radio" 
                            name="passphraseMode" 
                            checked={useCustomPhrase} 
                            onChange={() => setUseCustomPhrase(true)} 
                            style={{ accentColor: "#F15A24" }} 
                          />
                          Custom Phrase
                        </label>
                      </div>

                      {!useCustomPhrase ? (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <label style={{ fontWeight: 700, color: "#374151" }}>Words: {wordCount}</label>
                          </div>
                          <input 
                            type="range" 
                            min="3" 
                            max="8" 
                            value={wordCount}
                            onChange={(e) => setWordCount(parseInt(e.target.value))}
                            style={{ width: "100%", accentColor: "#F15A24" }}
                          />
                        </div>
                      ) : (
                        <div>
                          <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Enter Your Custom Phrase</label>
                          <input 
                            type="text" 
                            value={customPhrase} 
                            onChange={(e) => setCustomPhrase(e.target.value)} 
                            placeholder="e.g. My favorite security tool is Innvikta 100%!" 
                            style={{ 
                              width: "100%", 
                              padding: "10px 14px", 
                              border: "1px solid #D1D5DB", 
                              borderRadius: "8px",
                              outline: "none"
                            }}
                          />
                        </div>
                      )}

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                        <div>
                          <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Word Separator</label>
                          <select 
                            value={separator} 
                            onChange={(e) => setSeparator(e.target.value)}
                            style={{ width: "100%", padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "8px" }}
                          >
                            <option value="-">Dash (-)</option>
                            <option value="_">Underscore (_)</option>
                            <option value=" ">Space ( )</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Capitalization</label>
                          <select 
                            value={capitalization} 
                            onChange={(e) => setCapitalization(e.target.value)}
                            style={{ width: "100%", padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "8px" }}
                          >
                            <option value="lowercase">lowercase</option>
                            <option value="titlecase">Title Case</option>
                            <option value="random">RaNdOm Case</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={passphraseIncludeNum} onChange={(e) => setPassphraseIncludeNum(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Append random digit
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                          <input type="checkbox" checked={passphraseIncludeSym} onChange={(e) => setPassphraseIncludeSym(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                          Append random symbol
                        </label>
                      </div>
                    </div>

                    <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                      <button onClick={generateRandomPassphrase} className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
                        Generate Passphrase
                      </button>
                    </div>

                    <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "8px" }}>
                      <FiInfo className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                      <span style={{ fontSize: "0.85rem", color: "#4B5563", lineHeight: "1.4" }}>
                        <strong>Educational Note:</strong> Longer passphrases are much easier to commit to memory and frequently more secure than short complex passwords.
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. PASSWORD STRENGTH ANALYZER VIEW */}
                {activeTool === "strength" && (
                  <div ref={strengthRef}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
                      Password Strength Analyzer
                    </h2>
                    <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                      Type a password below to test its strength locally. All calculations are executed browser-side.
                    </p>

                    {/* Input Field */}
                    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                      <input 
                        type={showCheckPassword ? "text" : "password"}
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeholder="Enter password to check..."
                        style={{
                          width: "100%",
                          padding: "14px 3rem 14px 1.25rem",
                          border: "1px solid #D1D5DB",
                          borderRadius: "12px",
                          fontSize: "1.1rem",
                          fontFamily: checkPassword ? "monospace" : "inherit"
                        }}
                      />
                      <button 
                        onClick={() => setShowCheckPassword(!showCheckPassword)}
                        style={{
                          position: "absolute",
                          right: "16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9CA3AF"
                        }}
                      >
                        {showCheckPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>

                    {/* Strength Meter Bar */}
                    {checkPassword && (
                      <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontWeight: 700 }}>
                          <span style={{ color: "#374151" }}>Entropy Score: {checkAnalysis.score} / 5</span>
                          <span style={{ color: checkAnalysis.color }}>{checkAnalysis.rating}</span>
                        </div>
                        <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "10px", overflow: "hidden" }}>
                          <div style={{ 
                            width: `${(checkAnalysis.score / 5) * 100}%`, 
                            height: "100%", 
                            backgroundColor: checkAnalysis.color,
                            transition: "width 0.3s"
                          }} />
                        </div>
                      </div>
                    )}

                    {/* Results / Feedback Grid */}
                    {checkPassword ? (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                        <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                          <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Security Metrics</h4>
                          <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
                            <li>Length: <strong>{checkPassword.length} characters</strong></li>
                            <li>Diversity: <strong>{
                              ( /[a-z]/.test(checkPassword) ? 1 : 0) +
                              ( /[A-Z]/.test(checkPassword) ? 1 : 0) +
                              ( /[0-9]/.test(checkPassword) ? 1 : 0) +
                              ( /[^A-Za-z0-9]/.test(checkPassword) ? 1 : 0)
                            } / 4 types</strong></li>
                            <li>Crack Time: <strong style={{ color: checkAnalysis.color }}>{checkAnalysis.crackTime}</strong></li>
                          </ul>
                        </div>

                        <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                          <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recommendations</h4>
                          {checkAnalysis.feedback.length > 0 ? (
                            <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "6px", color: "#4B5563" }}>
                              {checkAnalysis.feedback.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                          ) : (
                            <div style={{ display: "flex", itemsCenter: "center", gap: "6px", color: "#10B981", fontSize: "0.9rem", fontWeight: 600 }}>
                              <FiCheckCircle /> Excellent! No security patterns detected.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF" }}>
                        <FiLock size={48} style={{ margin: "0 auto 1rem auto" }} />
                        <p style={{ margin: 0 }}>Type a password to launch real-time local checks.</p>
                      </div>
                    )}

                    <div style={{ marginTop: "2rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#FFF5F2", border: "1px solid #FFDDCF", padding: "1rem", borderRadius: "8px" }}>
                      <FiShield className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                      <span style={{ fontSize: "0.85rem", color: "#9A3412", lineHeight: "1.4" }}>
                        <strong>Privacy Notice:</strong> Your password calculations are fully local and client-side. We never capture, store, log, or transmit any inputs.
                      </span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </section>

          {/* PASSWORD SECURITY FUNDAMENTALS */}
          <section className="section bg-white border-t border-border" style={{ padding: "8rem 0" }}>
            <div className="container">
              
              <div className="animate" style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span className="text-subheading" style={{ display: "block", marginBottom: "1rem", textAlign: "center" }}>SECURITY ESSENTIALS</span>
                <h2 className="text-52-heading text-dark" style={{ textAlign: "center", display: "block", width: "100%", margin: "0 auto" }}>What Makes a Password Strong?</h2>
              </div>

              <div className="animate" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <p className="text-18-content text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ textAlign: "center", margin: "0 auto", padding: "2rem 0" }}>
                  Computer algorithms can guess simple passwords in milliseconds. Understanding these basic security pillars helps individuals defend their digital identities effectively.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate px-6 sm:px-8">
                
                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiClock className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Length Matters</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Longer passwords dramatically increase entropy, making standard brute-force cracking tools mathematically impractical.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiUserX className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Uniqueness Matters</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Never reuse credentials. If one service gets breached, hackers immediately deploy stuffing attacks on other popular portals.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiGlobe className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Randomness Matters</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Avoid familiar names, dates, or sequences. Machine learning dictionaries guess predictable strings almost immediately.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiKey className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Managers Help</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Don&apos;t try to memorize dozens of random passwords. A verified manager does it for you securely under one master key.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* EDUCATIONAL DETAILS SECTION */}
          <section className="section bg-grey-5" style={{ padding: "6rem 0" }}>
            <div className="container max-w-7xl mx-auto px-4">
              
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ display: "block", marginBottom: "1rem" }}>HYGIENE BEST PRACTICES</span>
                <h2 className="text-40-heading text-dark" style={{ margin: 0 }}>Password Hygiene Best Practices</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>1. Avoid Reusing Passwords</h4>
                  <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                    Reusing passwords exposes your entire digital identity. A breach on an insecure forum can lead directly to commercial mailbox compromise.
                  </p>
                </div>

                <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>2. Set Up Multi-Factor Auth (MFA)</h4>
                  <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                    MFA adds a critical second barrier. Even if someone steals your password, they cannot gain entry without your physical token/code.
                  </p>
                </div>

                <div style={{ backgroundColor: "transparent", padding: "1.5rem 0", border: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#F15A24", marginBottom: "0.75rem" }}>3. Use Secure Password Storage</h4>
                  <p style={{ color: "#1F2937", fontSize: "1rem", lineHeight: "1.7", margin: 0, flexGrow: 1 }}>
                    Never store credentials in text files or browser histories. Utilize commercial managers that encrypt vaults locally.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ATTACKERS EXPLAINED */}
          <section className="section bg-white" style={{ padding: "6rem 0" }}>
            <div className="container max-w-7xl mx-auto px-4">
              
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ display: "block", marginBottom: "1rem" }}>THREAT INTELLIGENCE</span>
                <h2 className="text-40-heading text-dark" style={{ margin: 0 }}>How Attackers Compromise Credentials</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiShield className="text-primary" /> Brute-Force & Dictionary
                  </h4>
                  <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                    Automated scripts try millions of standard combinations and dictionary word variations in seconds. Complex passwords prevent these tools from finding hits.
                  </p>
                </div>

                <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiUserX className="text-primary" /> Credential Stuffing
                  </h4>
                  <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                    Hackers acquire lists of leaked credentials from dark web forums and feed them into scripts targeting thousands of popular sites to hijack active sessions.
                  </p>
                </div>

                <div style={{ backgroundColor: "transparent", border: "1px solid #FFDDCF", padding: "2rem", borderRadius: "12px" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FiGlobe className="text-primary" /> Password Spraying
                  </h4>
                  <p style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                    Attackers spray a common password (like &apos;Spring2026!&apos;) against thousands of corporate email targets, bypassing lockout controls that monitor single accounts.
                  </p>
                </div>
              </div>

            </div>
          </section>



          {/* FAQ ACCORDION SECTION */}
          <section className="section bg-grey-5" style={{ padding: "6rem 0" }}>
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading">Frequently Asked Questions</h2>
                <Link className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Still have questions? Contact us</span>
                </Link>
              </div>

              <div className="faq-list-col animate from-right">
                {faqData.map((faq, index) => (
                  <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={activeFaq === index}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                      <span className="faq-question">{faq.question}</span>
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
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </GSAPWrapper>
  );
}
