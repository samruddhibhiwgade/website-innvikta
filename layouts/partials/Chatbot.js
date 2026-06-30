"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMessageSquare, FiX, FiSend, FiCalendar, FiArrowRight, FiShield } from "react-icons/fi";

const Chatbot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bookingState, setBookingState] = useState({
    step: "idle", // idle, ask_name, ask_email, confirmed
    name: "",
    email: ""
  });
  const [quickPills, setQuickPills] = useState([
    { label: "Pricing Quote", query: "Pricing details" },
    { label: "MFA Fatigue?", query: "What is MFA fatigue?" }
  ]);
  
  const messagesEndRef = useRef(null);

  // Synthesize notification sound using Web Audio API
  const playPopSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5 note
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("Audio Context playback ignored or blocked by browser policy.");
    }
  };

  // Play sound when chat window transitions to open
  useEffect(() => {
    if (isOpen) {
      playPopSound();
    }
  }, [isOpen]);

  // Trigger on page/pathname changes to dynamically open and load custom context-aware messages & pills
  useEffect(() => {
    if (!pathname) return;

    // Reset booking state on page change
    setBookingState({
      step: "idle",
      name: "",
      email: ""
    });

    // Close the chat briefly so it transitions open after the delay
    setIsOpen(false);

    // 1-second delay before opening and greeting
    const timer = setTimeout(() => {
      // Determine greeting based on local time
      const hour = new Date().getHours();
      let greeting = "Hello!";
      if (hour < 12) greeting = "Good morning!";
      else if (hour < 18) greeting = "Good afternoon!";
      else greeting = "Good evening!";

      // Select dynamic welcome message based on page
      let pageMessage = "";
      let pills = [];

      if (pathname.includes("/solutions/insat")) {
        pageMessage = `${greeting} Welcome to the InSAT Workspace page! Here, you can explore how our integrated platform automates training campaigns, schedules simulated phishing, and tracks human risk scores. Would you like to book a quick live demo of InSAT?`;
        pills = [
          { label: "InSAT Features", query: "What is InSAT?" },
          { label: "Pricing Plans", query: "Pricing details" }
        ];
      } else if (pathname.includes("/solutions/phishing-simulation")) {
        pageMessage = `${greeting} Welcome to the Phishing Simulation page! Explore how InSAT tests employees against real-world phishing vectors like email, SMS, and credentials harvesting templates. Would you like to see a demo?`;
        pills = [
          { label: "Phish Vectors", query: "phishing vectors" },
          { label: "Landing Hooks", query: "phishing simulations landing page training hooks" }
        ];
      } else if (pathname.includes("/solutions/compliance-training")) {
        pageMessage = `${greeting} Welcome to the Compliance Training page! See how we help organizations meet SOC2, GDPR, ISO 27001, and HIPAA compliance using interactive modules. Let me know if you would like a custom quote.`;
        pills = [
          { label: "SOC2/GDPR courses", query: "compliance SOC2 GDPR" },
          { label: "Course catalog", query: "compliance training catalog" }
        ];
      } else if (pathname.includes("/solutions/human-risk-intelligence")) {
        pageMessage = `${greeting} Welcome to the Human Risk Intelligence page! Learn how we translate security behavioral data into predictive risk analytics and automated interventions. Would you like to schedule a live walk-through?`;
        pills = [
          { label: "Risk Analytics", query: "risk score analytics" },
          { label: "Employee Profiling", query: "human risk factors" }
        ];
      } else if (pathname.includes("/resources/simulation-roi")) {
        pageMessage = `${greeting} Welcome to the Simulation ROI Calculator! You can input your organization size and existing training type to calculate estimated savings, ROI, and risk score reductions. Need any help with these formulas?`;
        pills = [
          { label: "Benchmark stats", query: "maturity benchmarks click rate" },
          { label: "Calculator help", query: "roi calculator help" }
        ];
      } else if (pathname.includes("/resources/glossary")) {
        pageMessage = `${greeting} Welcome to our Cybersecurity Glossary! This is a reference directory for common threat definitions. Feel free to ask me to explain terms like 'MFA Fatigue' or 'Ransomware' here!`;
        pills = [
          { label: "MFA Fatigue", query: "MFA fatigue definition" },
          { label: "Ransomware", query: "Ransomware definition" }
        ];
      } else if (pathname.includes("/maturity-benchmarks")) {
        pageMessage = `${greeting} Welcome to our Maturity Benchmarks report! Explore global phishing click-rates and reporting metrics to compare against your industry peers. Would you like to see your industry metrics?`;
        pills = [
          { label: "Click Rate stats", query: "phishing click rate statistics" },
          { label: "Reporting rates", query: "reporting rate benchmarks" }
        ];
      } else if (pathname.includes("/partners")) {
        pageMessage = `${greeting} Welcome to the Innvikta Partners page! Check out our MSP and reseller programs to bring InSAT to your clients. Let me know if you would like to speak with our partnership team.`;
        pills = [
          { label: "MSP benefits", query: "MSP reseller program benefits" },
          { label: "Partner pricing", query: "partner tiers quote" }
        ];
      } else if (pathname.includes("/start-free")) {
        pageMessage = `${greeting} Ready to spin up your InSAT workspace? You can register a free account with up to 50 users on this page. Let me know if you need assistance during setup!`;
        pills = [
          { label: "50-user limit", query: "free trial user tier limits" },
          { label: "Setup help", query: "insat workspace setup help" }
        ];
      } else if (pathname.includes("/book-demo")) {
        pageMessage = `${greeting} Welcome to our booking page! Please fill out the request form here to schedule your demo, or simply tell me your name and email to request it directly in this chat.`;
        pills = [
          { label: "Meeting length", query: "how long is the demo" },
          { label: "Enterprise trial", query: "enterprise trial pricing custom" }
        ];
      } else if (pathname.includes("/blog")) {
        pageMessage = `${greeting} Welcome to the Innvikta Threat Blog! Explore the latest social engineering trends, scam warnings, and awareness safety guides.`;
        pills = [
          { label: "Threat trends", query: "social engineering latest threat trends" },
          { label: "Security tips", query: "best employee awareness campaign tips" }
        ];
      } else {
        pageMessage = `${greeting} Welcome to Innvikta! I'm your Assistant. You can ask me questions about InSAT workspace features, pricing options, security terms, or request to book a demo!`;
        pills = [
          { label: "Pricing Quote", query: "Pricing details" },
          { label: "MFA Fatigue?", query: "What is MFA fatigue?" }
        ];
      }

      setQuickPills(pills);
      setIsTyping(true);
      setMessages([]);
      setIsOpen(true);

      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            sender: "bot",
            text: pageMessage
          }
        ]);
      }, 800);

      return () => clearTimeout(typingTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Scroll to bottom and play sound on actual message arrivals
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].sender === "bot") {
      playPopSound();
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Determine if chatbot should be hidden on current page
  if (
    pathname === "/" ||
    pathname.startsWith("/arcade") ||
    pathname.startsWith("/cyberhelp") ||
    pathname.includes("cyber-arcade")
  ) {
    return null;
  }

  const getQueryReply = (lowerText) => {
    // Specific pill query overrides
    if (lowerText === "what is insat?") {
      return "InSAT (Integrated Security Awareness Training) is Innvikta's central SaaS workspace. It automates campaign schedules, distributes micro-learning modules, and gathers human risk analytics. Read more on the [InSAT solution page](/solutions/insat).";
    }
    if (lowerText === "phishing simulations landing page training hooks") {
      return "Our **Landing Page Hooks** simulate realistic login templates to test employee credential-harvesting resilience. When employees click a link, they land on cloned portals mimicking popular tools (such as Microsoft 365, Google Workspace, or corporate VPNs). If they submit entries, they are immediately guided to a secure micro-learning page. Read more on the [Phishing Simulation solution page](/solutions/phishing-simulation).";
    }
    if (lowerText === "compliance soc2 gdpr") {
      return "Innvikta provides complete awareness courses mapping to compliance frameworks like **SOC2, GDPR, HIPAA, and ISO 27001**. Our interactive modules educate employees on data privacy, physical security, access controls, and incident reporting. Read more details on our [Compliance Training page](/solutions/compliance-training).";
    }
    if (lowerText === "compliance training catalog") {
      return "Our course catalog contains over 150+ interactive micro-learning modules covering topics such as Password Security, Phishing Prevention, Social Engineering, and Remote Work Safety. Explore our courses on the [Compliance Training page](/solutions/compliance-training).";
    }
    if (lowerText === "risk score analytics") {
      return "Our Risk Score Analytics compile mock phishing performance and quiz scores into a unified human risk metric. It identifies your most vulnerable groups, departments, and individuals. Read more on the [Human Risk Intelligence page](/solutions/human-risk-intelligence).";
    }
    if (lowerText === "human risk factors") {
      return "We profile human risk using indicators like training completion speed, simulation click rates, and reporting behaviors. This helps automate personalized interventions. Read more on the [Human Risk Intelligence page](/solutions/human-risk-intelligence).";
    }
    if (lowerText === "maturity benchmarks click rate" || lowerText === "phishing click rate statistics") {
      return "In our Maturity Benchmarks report, the global average phishing click rate is 12.8%, which drops to under 2.5% after 12 months of continuous awareness training. Read the industry breakdowns on our [Maturity Benchmarks page](/maturity-benchmarks).";
    }
    if (lowerText === "reporting rate benchmarks") {
      return "The average organization sees a 14.5% phishing reporting rate. With Innvikta's reporting hook plug-ins, employee reporting rates can increase up to 60%, creating active active defense indicators. Read more details on our [Maturity Benchmarks page](/maturity-benchmarks).";
    }
    if (lowerText === "msp reseller program benefits") {
      return "Our MSP Partner Program offers multi-tenant administration, white-labeled client portals, flexible tiered pricing, and marketing assets. Learn more on our [Partners page](/partners).";
    }
    if (lowerText === "partner tiers quote") {
      return "We offer flexible partnership tiers (Silver, Gold, and Platinum) with wholesale seat pricing discounts. Contact our partnership desk on the [Partners page](/partners) for a direct quote.";
    }
    if (lowerText === "free trial user tier limits") {
      return "The free trial allows you to manage up to **50 active users** with full access to phishing simulation templates and compliance modules. Get started instantly on the [Start Free page](/start-free).";
    }
    if (lowerText === "insat workspace setup help") {
      return "Setting up your InSAT workspace takes less than 5 minutes. Simply register, sync your directory (Google Workspace or Microsoft 365), and select your first campaign template. Check the [Start Free page](/start-free) for details.";
    }
    if (lowerText === "enterprise trial pricing custom") {
      return "For organizations with over 1,000 employees, we offer custom LDAP/Active Directory integrations, dedicated account managers, and custom simulated templates. Get in touch on our [Book a Demo page](/book-demo).";
    }
    if (lowerText === "social engineering latest threat trends") {
      return "Latest cyber trends show a sharp increase in QR code phishing (Quishing) and AI-driven deepfake impersonations. Read detailed analysis and security alerts on the [Innvikta Blog](/blog).";
    }
    if (lowerText === "best employee awareness campaign tips") {
      return "For successful awareness campaigns: run random simulations (not monthly batches), keep training modules under 5 minutes (micro-learning), and reward employees who report mock phishing. Get more tips on the [Innvikta Blog](/blog).";
    }

    if (lowerText.includes("length") || lowerText.includes("how long") || lowerText.includes("duration")) {
      return "A standard live walk-through with our security engineers takes between **15 to 20 minutes**. We will showcase workspace navigation, simulation templates, SCORM integrations, and employee reporting dashboards. You can request a callback on our [Book a Demo page](/book-demo) or book here by typing 'book a demo'.";
    }

    if (
      lowerText.includes("price") || 
      lowerText.includes("pricing") || 
      lowerText.includes("quote") || 
      lowerText.includes("cost") || 
      lowerText.includes("rate")
    ) {
      return "Innvikta offers tailored pricing plans based on organization size and specific simulation requirements. You can start a free trial with up to 50 users on our [Start Free page](/start-free). For detailed enterprise quotes and custom pricing sheets, feel free to [Book a Demo](/book-demo) or type 'book a demo' here to request a callback.";
    }

    if (lowerText.includes("mfa fatigue") || lowerText.includes("prompt bomb")) {
      return "MFA fatigue (or prompt bombing) happens when hackers spam a victim with multi-factor authentication prompts until they tap 'approve' out of frustration or error. Innvikta InSAT features dedicated simulation modules and training lessons to teach employees how to handle MFA fatigue attacks.";
    }

    if (lowerText.includes("ransomware") || lowerText.includes("encrypt")) {
      return "Ransomware is malicious software designed to lock your systems or encrypt files until a ransom is paid. The primary delivery method is phishing. Innvikta helps you run simulations to train employees to flag high-risk attachments and links that deliver ransomware payloads.";
    }

    if (lowerText.includes("social engineering") || lowerText.includes("manipulat")) {
      return "Social engineering involves manipulating people into giving up confidential information (like passwords or bank details). Innvikta's simulations train users on various social engineering vectors including phishing (email), smishing (SMS), and vishing (voice calls).";
    }

    if (lowerText.includes("mfa") || lowerText.includes("2fa") || lowerText.includes("auth")) {
      return "Multi-Factor Authentication (MFA) adds an essential layer of defense by requiring two or more verification steps. Implementing MFA reduces account compromise by 99%, and Innvikta includes modules teaching employees how to secure authorization codes and avoid credentials leakage.";
    }

    if (lowerText.includes("vector")) {
      return "Innvikta simulates multiple **phishing vectors** to build complete employee resilience. These include:\n- **Email Phishing**: Fake login requests, secure document attachments, and urgent billing notifications.\n- **Smishing (SMS)**: False bank alerts, package delivery trackers, and MFA bypass attempts.\n- **Vishing (Voice)**: Audio social engineering, caller ID spoofing, and AI voice clone scams.\n- **QR Code Phishing (Quishing)**: Malicious QR codes embedded in emails or printed office posters.\n\nRead more details on our [Phishing Simulation solution page](/solutions/phishing-simulation).";
    }

    if (lowerText.includes("landing") || lowerText.includes("hook")) {
      return "Our **Landing Page Hooks** simulate realistic login templates to test employee credential-harvesting resilience. When employees click a link, they land on cloned portals mimicking popular tools (such as Microsoft 365, Google Workspace, Salesforce, or corporate VPNs). If they submit entries, they are immediately guided to a secure micro-learning page. Read more on the [Phishing Simulation solution page](/solutions/phishing-simulation).";
    }

    if (lowerText.includes("phish") || lowerText.includes("email") || lowerText.includes("link")) {
      if (!lowerText.includes("@")) {
        return "Phishing is the practice of sending fraudulent messages designed to trick people into revealing sensitive information. Innvikta InSAT simulates these scenarios to build employee resilience. Check out our [Phishing Simulation solution](/solutions/phishing-simulation) to learn more.";
      }
    }

    if (lowerText.includes("insat") || lowerText.includes("workspace") || lowerText.includes("platform") || lowerText.includes("feature")) {
      return "InSAT (Integrated Security Awareness Training) is our central SaaS workspace. It automates campaign schedules, distributes micro-learning modules, and gathers human risk analytics. Read more on the [InSAT solution page](/solutions/insat).";
    }

    if (lowerText.includes("roi") || lowerText.includes("calc")) {
      return "We have an interactive Security Awareness ROI Calculator that uses industry-specific click-rate benchmarks to calculate cost savings and risk score reductions. Try it now on our [Simulation ROI Calculator page](/resources/simulation-roi)!";
    }

    if (
      lowerText.includes("cyberhelp") || 
      lowerText.includes("cyber help") || 
      lowerText.includes("fraud") || 
      lowerText.includes("scam") || 
      lowerText.includes("crime") || 
      lowerText.includes("hacked") || 
      lowerText.includes("stolen") || 
      lowerText.includes("lost money") || 
      lowerText.includes("complaint") || 
      lowerText.includes("report") || 
      lowerText.includes("police") || 
      lowerText.includes("support")
    ) {
      return "If you are a victim of cybercrime, online scams, or financial fraud, please take these immediate steps:\n\n1. **Call 1930**: Call the National Cyber Crime Helpline (India) immediately to report financial fraud and freeze fraudulent transactions.\n2. **File a Complaint**: Submit a formal incident report on the official government website at [cybercrime.gov.in](https://cybercrime.gov.in).\n3. **Freeze Accounts**: Contact your banking institution immediately to freeze compromised cards, accounts, or UPI handlers.\n4. **Preserve Evidence**: Save transaction screenshots, receipts, headers, and chat messages.\n\nOur **[Innvikta Cyberhelp Portal](/cyberhelp)** provides detailed guided filing instructions. You can view our [Complaint Filing Guide](/cyberhelp/filing-guide) or use our [Incident Reporting Guide](/cyberhelp/register) for step-by-step assistance.";
    }

    if (lowerText.includes("arcade") || lowerText.includes("game")) {
      return "Innvikta Arcade (or Cyber Arcade) is our interactive, game-based learning platform. It features high-fidelity cybersecurity games including:\n1. **Dash Car** (endpoint defense challenges)\n2. **Secure Inbox** (phishing email threat detection)\n3. **Crystal Planet** (sci-fi threat identification)\n4. **Escape Room** (puzzle-based security assessments)\n\nThese games turn compliance training into an active experience and improve employee security awareness retention by over 40%! You can explore the [Arcade Experience here](/cyber-arcade).";
    }

    if (lowerText.includes("compliance") || lowerText.includes("soc2") || lowerText.includes("gdpr") || lowerText.includes("iso")) {
      return "Innvikta's **Compliance Training** enables your organization to satisfy audit requirements for standards like SOC2, GDPR, ISO 27001, HIPAA, and PCI-DSS. We deliver automated, interactive courses with full progress tracking, knowledge assessments, and policy signing tools. Read details on the [Compliance Training solution page](/solutions/compliance-training).";
    }

    if (lowerText.includes("risk") || lowerText.includes("analytics") || lowerText.includes("profil")) {
      return "Our **Human Risk Intelligence** platform monitors threat behaviors, profiles employee actions, and calculates real-time risk scores. It helps administrators trigger automated campaign interventions for high-risk profiles. Find out more on our [Human Risk Intelligence page](/solutions/human-risk-intelligence).";
    }

    if (lowerText.includes("benchmark") || lowerText.includes("reporting rate") || lowerText.includes("click rate")) {
      return "Our **Maturity Benchmarks** compile global phishing simulation metrics (like average click rates and report rates) across industries so you can compare employee security levels with your peers. See the statistics on our [Maturity Benchmarks report](/maturity-benchmarks).";
    }

    if (lowerText.includes("partner") || lowerText.includes("msp") || lowerText.includes("reseller")) {
      return "Innvikta offers dedicated **Partner Programs** tailored for MSPs, MSSPs, and security consultants. Our program features multi-tenant portal management, co-branded marketing assets, and wholesale discount structures. Learn more on our [Partners page](/partners).";
    }

    if (lowerText.includes("trial") || lowerText.includes("limit") || lowerText.includes("free tier") || lowerText.includes("setup")) {
      return "Our **Free Trial** lets you roll out Innvikta's full-featured workspace to up to 50 active users. Setup is instant and requires no credit card. Set up your dashboard now on our [Start Free page](/start-free).";
    }

    if (lowerText.includes("tip") || lowerText.includes("trend") || lowerText.includes("campaign")) {
      return "Explore our latest cybersecurity blogs for social engineering updates, phishing awareness templates, and enterprise security training guides. Visit our [Threat Blog](/blog) for daily threat updates.";
    }

    if (
      lowerText.includes("hacker") || 
      lowerText.includes("malware") || 
      lowerText.includes("password") || 
      lowerText.includes("spoof") || 
      lowerText.includes("security") || 
      lowerText.includes("threat")
    ) {
      return "That is an important cybersecurity topic! Educating employees on terms like that is exactly what Innvikta does. Our InSAT platform contains interactive lessons covering passwords, malware, spoofing, and endpoint protection. Would you like to schedule a quick demo to see them?";
    }

    return null;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    // If we are in the middle of a booking workflow
    if (bookingState.step !== "idle" && bookingState.step !== "confirmed") {
      processBookingFlow(userText);
      return;
    }

    // Show bot typing animation before replying
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = userText.toLowerCase();

      // Check if user is asking to book a demo
      if (
        lowerText.includes("demo") || 
        lowerText.includes("book") || 
        lowerText.includes("schedule") || 
        lowerText.includes("call")
      ) {
        setIsTyping(false);
        startBookingFlow();
        return;
      }

      // Check general queries using the helper
      const queryReply = getQueryReply(lowerText);
      let reply = "";
      if (queryReply) {
        reply = queryReply;
      } else {
        reply = "I'm here to answer your questions! Feel free to ask about InSAT training, compliance, pricing quotes, or general security awareness topics (e.g. MFA, Ransomware, Phishing). Type 'book a demo' if you'd like a live walk-through.";
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 850);
  };

  const handlePillClick = (queryText) => {
    setMessages((prev) => [...prev, { sender: "user", text: queryText }]);
    setIsTyping(true);
    setTimeout(() => {
      const lowerText = queryText.toLowerCase();

      // Check if user is asking to book a demo
      if (
        lowerText.includes("demo") || 
        lowerText.includes("book") || 
        lowerText.includes("schedule") || 
        lowerText.includes("call")
      ) {
        setIsTyping(false);
        startBookingFlow();
        return;
      }

      const queryReply = getQueryReply(lowerText);
      let reply = "";
      if (queryReply) {
        reply = queryReply;
      } else {
        reply = "I'm here to answer your questions! Feel free to ask about InSAT training, compliance, pricing quotes, or general security awareness topics (e.g. MFA, Ransomware, Phishing). Type 'book a demo' if you'd like a live walk-through.";
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 850);
  };

  const startBookingFlow = () => {
    setBookingState({
      step: "ask_name",
      name: "",
      email: ""
    });
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'd be glad to help you schedule a demo! To get started, what is your full name?"
        }
      ]);
    }, 800);
  };

  const processBookingFlow = (inputText) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const lowerText = inputText.toLowerCase();
      const queryReply = getQueryReply(lowerText);
      if (queryReply) {
        const bookingPrompt = bookingState.step === "ask_name"
          ? "Now, back to scheduling your demo: what is your full name?"
          : "Now, back to scheduling your demo: what is your work email address?";
        
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: queryReply
          },
          {
            sender: "bot",
            text: bookingPrompt
          }
        ]);
        return;
      }

      if (bookingState.step === "ask_name") {
        setBookingState((prev) => ({ ...prev, step: "ask_email", name: inputText }));
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Thanks, ${inputText}! What is your work email address?`
          }
        ]);
      } else if (bookingState.step === "ask_email") {
        if (!inputText.includes("@") || !inputText.includes(".")) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Please enter a valid work email address so we can schedule the call:"
            }
          ]);
          return;
        }

        // Validate work email domain
        const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];
        const domain = inputText.split("@")[1]?.toLowerCase();
        if (freeDomains.includes(domain)) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Please use your official work email address (avoid Gmail, Yahoo, Outlook, etc.) to schedule a corporate demo:"
            }
          ]);
          return;
        }

        const finalState = { ...bookingState, step: "confirmed", email: inputText };
        setBookingState(finalState);

        // Record the lead locally in localStorage and console log
        try {
          const storedBookings = JSON.parse(localStorage.getItem("innvikta_demo_bookings") || "[]");
          storedBookings.push({
            name: finalState.name,
            email: finalState.email,
            bookedAt: new Date().toISOString()
          });
          localStorage.setItem("innvikta_demo_bookings", JSON.stringify(storedBookings));
          console.log("--- INNVIKTA DEMO BOOKING RECORDED ---", {
            name: finalState.name,
            email: finalState.email,
            source: "Chatbot Assistant"
          });
        } catch (e) {
          console.error("Failed to persist booking lead:", e);
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Perfect! Thank you, ${finalState.name}. I've registered your interest, and our team will email you at ${finalState.email} shortly to coordinate your live workspace walkthrough.\n\nYou can also submit a request directly on our [Book a Demo page](/book-demo).`
          }
        ]);
      }
    }, 800);
  };

  // Parse markdown links [label](url) and bold text **bold**
  const renderMessageText = (text) => {
    // 1. First parse links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <Link 
          key={match.index} 
          href={match[2]} 
          onClick={() => setIsOpen(false)}
          className="text-[#f15a24] hover:text-orange-600 font-bold underline transition-colors"
        >
          {match[1]}
        </Link>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // 2. Parse bold text (double asterisks) inside string segments
    const finalParts = [];
    parts.forEach((part, index) => {
      if (typeof part === "string") {
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const subParts = [];
        let subLastIndex = 0;
        let subMatch;
        let k = 0;

        while ((subMatch = boldRegex.exec(part)) !== null) {
          if (subMatch.index > subLastIndex) {
            subParts.push(part.substring(subLastIndex, subMatch.index));
          }
          subParts.push(
            <strong key={`${index}-${k}`} className="font-extrabold text-slate-900">
              {subMatch[1]}
            </strong>
          );
          k++;
          subLastIndex = boldRegex.lastIndex;
        }

        if (subLastIndex < part.length) {
          subParts.push(part.substring(subLastIndex));
        }

        finalParts.push(...subParts);
      } else {
        finalParts.push(part);
      }
    });

    return finalParts.length > 0 ? finalParts : text;
  };

  return (
    <>
      {/* Floating Chat Bubble - Modernized cybersecurity shield icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#f15a24] hover:bg-orange-600 text-white rounded-full shadow-[0_8px_30px_rgb(241,90,36,0.3)] hover:shadow-[0_8px_30px_rgb(241,90,36,0.5)] transition-all duration-300 flex items-center justify-center z-50 cursor-pointer hover:scale-105"
        aria-label="Toggle Chat"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiShield className="text-2xl" />}
      </button>

      {/* Chat Window - Reduced Size with Smooth Slide & Scale transition */}
      <div 
        className="fixed bottom-24 right-6 w-[320px] md:w-[350px] h-[430px] bg-white border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.12)] rounded-2xl flex flex-col z-50 overflow-hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Header */}
        <div className="bg-[#f15a24] text-white p-4 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="font-bold text-[14px] leading-none text-white">Innvikta Assistant</h4>
            <span className="text-[11px] text-white/90 font-medium mt-1.5 block">Online • Responds Instantly</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <FiX className="text-base" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-3.5 overflow-y-auto bg-slate-50 space-y-3 no-scrollbar">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
            >
              {msg.sender === "bot" && (
                <img 
                  src="/images/author/derick.jpg" 
                  alt="Assistant Avatar" 
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-100 shadow-sm"
                />
              )}
              <div 
                className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-[12px] leading-relaxed font-normal shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-[#f15a24] text-white rounded-tr-none" 
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                }`}
              >
                <p className="whitespace-pre-line">{renderMessageText(msg.text)}</p>
              </div>
            </div>
          ))}

          {/* Dynamic Bouncing Typing dots animation */}
          {isTyping && (
            <div className="flex justify-start items-start gap-2.5 animate-pulse">
              <img 
                src="/images/author/derick.jpg" 
                alt="Assistant Avatar" 
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-100 shadow-sm"
              />
              <div className="bg-white text-slate-400 rounded-2xl rounded-tl-none border border-slate-100 px-4 py-2.5 shadow-sm flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions / Helpers */}
        {bookingState.step === "idle" && !isTyping && (
          <div className="px-3.5 py-1.5 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
            {quickPills.map((pill, pIdx) => (
              <button 
                key={pIdx}
                onClick={() => handlePillClick(pill.query)}
                className="text-[11px] font-medium text-slate-500 hover:text-[#f15a24] bg-white border border-slate-100 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
            <button 
              onClick={startBookingFlow}
              className="text-[11px] font-medium text-[#f15a24] hover:bg-orange-50 bg-white border border-[#f15a24]/20 px-2 py-0.5 rounded-full transition-all flex items-center gap-0.5 cursor-pointer"
            >
              Book A Demo
            </button>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              bookingState.step === "ask_name" ? "Type your name..." :
              bookingState.step === "ask_email" ? "Type your email..." :
              "Message or 'book a demo'..."
            }
            className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-[#f15a24] focus:bg-white transition-all font-normal"
          />
          <button
            type="submit"
            className="p-1.5 bg-[#f15a24] hover:bg-orange-600 text-white rounded-xl shadow-sm transition-colors cursor-pointer"
            aria-label="Send"
          >
            <FiSend className="text-xs" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
