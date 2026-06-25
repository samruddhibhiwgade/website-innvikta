"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import ImageFallback from "@layouts/components/ImageFallback";
import Circle from "@layouts/components/Circle";
import { gsap } from "@lib/gsap";

import { 
  FiShield, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiMail, 
  FiUser, 
  FiPaperclip,
  FiClock,
  FiInfo,
  FiInbox,
  FiSend,
  FiArchive,
  FiTrash2,
  FiArrowRight,
  FiChevronRight,
  FiAward,
  FiSearch,
  FiMenu,
  FiRotateCcw,
  FiMoreHorizontal,
  FiFileText,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiFlag,
  FiX,
  FiGlobe,
  FiUserX,
  FiKey,
  FiDollarSign,
  FiAlertCircle,
  FiLock,
  FiLinkedin,
  FiFacebook,
  FiTwitter
} from "react-icons/fi";

// 15 Highly Realistic Email Scenarios
const EMAILS = [
  {
    id: 1,
    senderInitials: "MS",
    senderName: "Microsoft Support",
    senderEmail: "security@micosoft-services.com",
    date: "10:24 AM",
    subject: "Action Required: Your password expires today",
    body: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 16px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" width="100" style="margin-bottom: 20px;" />
        <p>Dear User,</p>
        <p>Your Office 365 password is set to expire in less than 24 hours.</p>
        <p>To retain your current password and maintain uninterrupted access to your emails and files, you must verify your active session.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #0078D4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 16px;">Keep Current Password</a>
        </div>
        <p style="font-size: 14px; color: #666;">If you do not verify your account, your access will be suspended automatically.</p>
        <p style="font-size: 14px; color: #666;">Microsoft Corporation, One Microsoft Way, Redmond, WA 98052</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain is 'micosoft-services.com' (missing the 'r' in Microsoft). Legitimate Microsoft emails come from @microsoft.com. It also uses generic 'Dear User' greetings and creates false urgency."
  },
  {
    id: 2,
    senderInitials: "HR",
    senderName: "HR Department",
    senderEmail: "hr@innvikta.com",
    date: "9:15 AM",
    subject: "Updated Employee Handbook - Please Review",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi Team,</p>
        <p>Following our recent All-Hands meeting, we have finalized the updates to the Employee Handbook. The primary changes reflect our new flexible working hours and the updated expense reimbursement process.</p>
        <p>Please review the updated document on the company intranet by the end of the week.</p>
        <p><a href="https://intranet.innvikta.com/hr/handbook-2026" style="color: #0066cc;">View Updated Handbook (Intranet)</a></p>
        <p>If you have any questions, feel free to reach out to your HR business partner.</p>
        <p>Best regards,<br/>Sarah Jenkins<br/>HR Director</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: The email uses the official internal domain (@innvikta.com), addresses a known internal topic without threatening language, and links to the official intranet subdomain."
  },
  {
    id: 3,
    senderInitials: "PP",
    senderName: "PayPal Service",
    senderEmail: "service@paypaI-security.com",
    date: "Yesterday",
    subject: "Your account has been temporarily restricted",
    body: `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hello Customer,</p>
        <p>We noticed unusual login activity from a new device on your PayPal account. To protect your funds, we have temporarily restricted your account features.</p>
        <p>To restore full access, you must confirm your identity and billing information immediately.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #003087; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: bold; font-size: 16px;">Secure My Account</a>
        </div>
        <p style="font-size: 12px; color: #888;">Copyright © 1999-2026 PayPal. All rights reserved.</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain is 'paypaI-security.com' (uses a capital 'i' instead of an 'l' in paypaI). Official emails come from @paypal.com. The generic 'Hello Customer' and immediate threat of restricted funds are classic phishing tactics."
  },
  {
    id: 4,
    senderInitials: "GH",
    senderName: "GitHub",
    senderEmail: "noreply@github.com",
    date: "Yesterday",
    subject: "[GitHub] A new public key was added to your account",
    body: `
      <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif; color: #24292e; font-size: 16px;">
        <p>Hey there,</p>
        <p>A new SSH key <strong>"dev-machine-rsa"</strong> was added to your GitHub account.</p>
        <p>If you recently added this key, you can safely ignore this email.</p>
        <p>If you did not add this key, your account may have been compromised. Please immediately review your SSH keys and security settings.</p>
        <p><a href="https://github.com/settings/keys" style="color: #0366d6;">Review SSH Keys</a></p>
        <p>Thanks,<br/>The GitHub Team</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@github.com' domain. It informs you of a security event without forcing you to click an urgent, obscured button. The link goes directly to github.com."
  },
  {
    id: 5,
    senderInitials: "DS",
    senderName: "DocuSign via IT",
    senderEmail: "docusign-alert@securesign-portal.com",
    date: "Oct 10",
    subject: "Please review and sign: Q4 Vendor Agreement",
    body: `
      <div style="background-color: #f4f4f4; padding: 25px; font-family: Helvetica, Arial, sans-serif; font-size: 16px;">
        <div style="background-color: white; padding: 25px; border-top: 5px solid #ffcc22;">
          <h2 style="margin-top: 0; font-size: 22px;">DocuSign</h2>
          <p><strong>IT Admin</strong> sent you a document to review and sign.</p>
          <p><strong>Message:</strong> Please sign the attached Q4 vendor confidentiality agreement before the end of the day. This is required for the upcoming audit.</p>
          <div style="margin: 30px 0;">
            <a href="#" style="background-color: #ffcc22; color: #333; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Review Document</a>
          </div>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The sender domain 'securesign-portal.com' is not owned by DocuSign (official is docusign.net/com). 'IT Admin' is highly vague, and demanding a signature 'before the end of the day' creates false pressure."
  },
  {
    id: 6,
    senderInitials: "SL",
    senderName: "Slack",
    senderEmail: "notifications@slack.com",
    date: "Oct 09",
    subject: "New mention from David in #marketing-team",
    body: `
      <div style="font-family: Lato, sans-serif; color: #1d1c1d; font-size: 16px;">
        <p>Hi there,</p>
        <p><strong>David</strong> mentioned you in <strong>#marketing-team</strong>:</p>
        <div style="border-left: 4px solid #e2e8f0; padding-left: 15px; margin: 15px 0; color: #4a4a4a; font-size: 16px;">
          "Hey @channel, could someone take a look at the latest copy for the Q4 campaign? @user I think you had some thoughts on this."
        </div>
        <div style="margin: 25px 0;">
          <a href="https://slack.com/app" style="background-color: #007a5a; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Reply in Slack</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@slack.com' domain. Provides context, doesn't ask for sensitive information, and links to the legitimate slack.com application."
  },
  {
    id: 7,
    senderInitials: "AP",
    senderName: "Apple",
    senderEmail: "receipts@appie-id.com",
    date: "Oct 08",
    subject: "Your receipt from Apple",
    body: `
      <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; color: #333; text-align: center; font-size: 16px;">
        <h2 style="font-size: 24px;">Apple</h2>
        <p style="font-size: 20px; color: #888;">Receipt</p>
        <div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 20px 0; margin: 25px 0; text-align: left;">
          <p style="font-size: 18px;"><strong>App Store</strong></p>
          <p style="font-size: 16px;">Clash of Clans: 14000 Gems - $99.99</p>
        </div>
        <p>If you did not authorize this purchase, you can cancel it within 24 hours.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="color: #0070c9; text-decoration: underline; font-size: 16px;">Cancel this transaction</a>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: Sender domain is 'appie-id.com' (spelled with an 'i' instead of 'l'). Official receipts come from '@email.apple.com'. This scam relies on the shock of a $99.99 charge to trick you into clicking the cancel link to steal your Apple ID."
  },
  {
    id: 8,
    senderInitials: "AW",
    senderName: "Amazon Web Services",
    senderEmail: "no-reply-aws@amazon.com",
    date: "Oct 07",
    subject: "AWS Invoice Available",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Greetings,</p>
        <p>Your Amazon Web Services (AWS) invoice for the previous month is now available.</p>
        <p>You can view your invoice, download a PDF copy, and check your billing details by logging into the AWS Billing Console.</p>
        <p><a href="https://console.aws.amazon.com/billing/home" style="color: #0066cc;">Go to Billing Console</a></p>
        <p>Thank you for using AWS.</p>
        <p>Sincerely,<br/>Amazon Web Services</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the legitimate '@amazon.com' domain. It correctly directs you to 'console.aws.amazon.com' without forcing a direct payment link or creating a false emergency."
  },
  {
    id: 9,
    senderInitials: "GD",
    senderName: "Google Drive",
    senderEmail: "drive-shares@googIedrive-noreply.com",
    date: "Oct 06",
    subject: "Document shared with you: 'Q4 Salary Adjustments.xlsx'",
    body: `
      <div style="font-family: Roboto, Arial, sans-serif; color: #333; font-size: 16px;">
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px;">
          <p><strong>Finance Dept</strong> shared a document with you:</p>
          <div style="margin: 20px 0; padding: 20px; border-left: 5px solid #0f9d58; background-color: #f8f9fa;">
            <p style="margin: 0; font-size: 18px;"><strong>Q4 Salary Adjustments.xlsx</strong></p>
          </div>
          <div style="margin: 30px 0;">
            <a href="#" style="background-color: #1a73e8; color: white; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">Open in Sheets</a>
          </div>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'googIedrive-noreply.com' uses a capital 'I' instead of an 'L'. Official Google Drive shares come from '@google.com'. The file name 'Q4 Salary Adjustments' is pure bait to exploit human curiosity."
  },
  {
    id: 10,
    senderInitials: "LI",
    senderName: "LinkedIn",
    senderEmail: "messages-noreply@linkedin.com",
    date: "Oct 05",
    subject: "You have a new message from a recruiter",
    body: `
      <div style="font-family: -apple-system, system-ui, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p>You have a new message waiting for you on LinkedIn.</p>
        <p><strong>Subject:</strong> Career Opportunity at TechGlobal</p>
        <div style="margin: 25px 0;">
          <a href="https://www.linkedin.com/messaging/" style="background-color: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: 600; font-size: 16px;">View Message</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: From the official '@linkedin.com' domain. It correctly links to 'linkedin.com/messaging' and does not ask for your password directly in the email."
  },
  {
    id: 11,
    senderInitials: "IT",
    senderName: "IT Helpdesk",
    senderEmail: "admin@innvikta-it-support.com",
    date: "Oct 04",
    subject: "URGENT: Mandatory VPN Software Update",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <h3 style="color: #d9534f; font-size: 20px;">CRITICAL SECURITY UPDATE</h3>
        <p>Dear Employee,</p>
        <p>Due to a newly discovered security vulnerability, all remote employees MUST download and install the new VPN client patch immediately.</p>
        <p>Failure to install this patch by 5:00 PM today will result in an automatic network lockout.</p>
        <p><a href="#" style="color: #0066cc; font-weight: bold; font-size: 18px;">Download VPN_Patch_v2.exe</a></p>
        <p>Regards,<br/>IT Services Team</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'innvikta-it-support.com' is external (not @innvikta.com). 'Dear Employee' is highly suspicious for an internal email. It relies on intense fear ('network lockout') and pushes a direct executable download."
  },
  {
    id: 12,
    senderInitials: "ZM",
    senderName: "Zoom",
    senderEmail: "no-reply@zoom.us",
    date: "Oct 03",
    subject: "Meeting Invitation: Weekly Sync",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p><strong>Michael</strong> is inviting you to a scheduled Zoom meeting.</p>
        <p><strong>Topic:</strong> Weekly Team Sync<br/><strong>Time:</strong> Oct 14, 10:00 AM Pacific Time (US and Canada)</p>
        <p>Join Zoom Meeting:<br/><a href="https://zoom.us/j/1234567890" style="color: #0E72ED;">https://zoom.us/j/1234567890</a></p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@zoom.us' domain. The link points directly to the 'zoom.us' domain. It provides standard meeting information without any threatening language."
  },
  {
    id: 13,
    senderInitials: "CJ",
    senderName: "CEO Jenkins",
    senderEmail: "ceo.jenkins.innvikta@gmail.com",
    date: "Oct 02",
    subject: "Are you available? Urgent request.",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p>I am stuck in a meeting right now and need a quick favor. Can you process a wire transfer to a new vendor today?</p>
        <p>I can't take calls right now, just reply to this email so I know you got it and I will send over the routing details.</p>
        <p>Thanks,<br/>CEO Jenkins</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: This is classic Business Email Compromise (BEC) / CEO Fraud. The email originates from a free '@gmail.com' address, not the corporate domain. It claims the sender is unavailable by phone (to prevent verification) and asks to bypass standard financial protocols."
  },
  {
    id: 14,
    senderInitials: "JR",
    senderName: "Jira",
    senderEmail: "jira@innvikta.atlassian.net",
    date: "Oct 01",
    subject: "[JIRA] (SEC-402) Update Firewall Rules",
    body: `
      <div style="font-family: -apple-system, sans-serif; color: #172b4d; font-size: 16px;">
        <p><strong>Alex</strong> updated an issue</p>
        <p><strong>Status:</strong> In Progress &rarr; Done</p>
        <p><strong>Comment:</strong> "I've applied the new rules to the staging environment. Tests are passing."</p>
        <div style="margin: 20px 0;">
          <a href="https://innvikta.atlassian.net/browse/SEC-402" style="background-color: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-size: 16px;">View Issue</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: From the verified '@innvikta.atlassian.net' domain. Contains standard Jira issue tracking context and links directly to the verified Atlassian environment."
  },
  {
    id: 15,
    senderInitials: "FX",
    senderName: "FedEx Tracking",
    senderEmail: "updates@fedex-delivery-notice.com",
    date: "Sep 30",
    subject: "Delivery Failure Notice - Action Required",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <h2 style="color: #4D148C; font-size: 24px;">FedEx</h2>
        <p>Dear Customer,</p>
        <p>We attempted to deliver your package today at 11:30 AM, but no one was available to sign for it.</p>
        <p>Your package is currently held at our sorting facility. You must pay a small redelivery fee of $1.99 to schedule a new delivery date.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #FF6600; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Schedule Redelivery</a>
        </div>
        <p>If action is not taken within 48 hours, the package will be returned to the sender.</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'fedex-delivery-notice.com' is fake (official is fedex.com). It creates urgency (48 hours), uses a generic greeting, and demands an unexpected payment to resolve a fabricated delivery issue."
  }
];

export default function SpotThePhish() {
  const [activeEmailId, setActiveEmailId] = useState(EMAILS[0].id);
  const [guesses, setGuesses] = useState({}); // { emailId: 'phish' | 'safe' }
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedbackOverlay, setFeedbackOverlay] = useState(null); // null or { status: 'correct' | 'incorrect', message: string }
  const [timer, setTimer] = useState(300);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Mobile UI States
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

  // Initial Hero Animation
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

  const activeEmail = EMAILS.find(e => e.id === activeEmailId);
  const hasGuessedCurrent = !!guesses[activeEmailId];

  // Helper to format MM:SS
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

    // Auto advance after 4.5 seconds
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

  const faqData = [
    {
      question: "What is a phishing email?",
      answer: "A phishing email is a fraudulent message designed to trick recipients into revealing sensitive information, downloading malware, or performing unauthorized actions."
    },
    {
      question: "How does the Spot The Phish game work?",
      answer: "Players review realistic emails and determine whether each message is legitimate or a phishing attempt. Detailed explanations are provided after every decision."
    },
    {
      question: "Is the phishing game free?",
      answer: "Yes. Spot The Phish is completely free to play and designed to improve cybersecurity awareness."
    },
    {
      question: "What phishing techniques are covered?",
      answer: "The game includes examples of credential phishing, business email compromise, fake invoices, account verification scams, delivery scams, impersonation attacks, and social engineering tactics."
    },
    {
      question: "Can organizations use phishing simulations for employee training?",
      answer: "Yes. Phishing simulations are widely used to help employees recognize threats, reinforce security awareness, and reduce human cyber risk."
    },
    {
      question: "Why is phishing awareness important?",
      answer: "Human error remains one of the leading causes of cybersecurity incidents. Awareness training helps employees identify and report suspicious communications before damage occurs."
    },
    {
      question: "How can I improve my phishing detection skills?",
      answer: "Regular awareness training, phishing simulations, and practical exercises such as Spot The Phish help users develop stronger threat recognition skills."
    },
    {
      question: "Does Innvikta offer enterprise phishing simulation services?",
      answer: "Yes. Innvikta provides phishing simulation campaigns, awareness training, human risk intelligence, compliance-focused learning, and gamified cybersecurity education for organizations of all sizes."
    }
  ];

  return (
    <GSAPWrapper>
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
                  <div className="hero-content" style={{ paddingTop: "2rem", textAlign: "center", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span className="text-subheading" style={{ display: "inline-block", margin: "0 auto 1.25rem auto", textAlign: "center" }}>Free Phishing Awareness Simulator</span>
                    <h1 className="text-96-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.1", marginBottom: "1.5rem", textAlign: "center", width: "100%" }}>
                      Email Threat <span className="text-primary">Identifier</span>
                    </h1>
                    <p className="text-20-content hero-paragraph" style={{ marginBottom: "2rem", maxWidth: "720px", margin: "0 auto 2rem auto", textAlign: "center" }}>
                      Think you can spot a phishing email before attackers trick you? Review realistic scenarios and test your ability to detect modern cyber threats.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* GAME UI SECTION - OUTLOOK WEB STYLE WITH ORANGE THEME */}
          <section style={{ padding: "0 0 4rem 0", backgroundColor: "#FFFFFF", position: "relative" }}>
            <div className="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "700px" // Reduced height
              }}>
                <div style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden"
                }}>
                  {/* 1. START SCREEN MODAL OVERLAY */}
                  {!gameStarted && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 30,
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(6px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1.5rem"
                    }}>
                      <div style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        padding: "2.5rem 2rem",
                        maxWidth: "600px",
                        width: "100%",
                        position: "relative",
                        textAlign: "center"
                      }}>
                        {/* Background glow decorator */}
                        <div style={{
                          position: "absolute",
                          width: "180px",
                          height: "180px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(241, 90, 36, 0.05)",
                          filter: "blur(40px)",
                          top: "15%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          pointerEvents: "none"
                        }} />

                        {/* Title */}
                        <h2 style={{
                          fontSize: "2rem",
                          fontWeight: 800,
                          color: "#111827",
                          marginBottom: "0.75rem",
                          fontFamily: "var(--font-heading)"
                        }}>
                          Spot the Phish
                        </h2>

                        {/* Orange accent line */}
                        <div style={{
                          width: "80px",
                          height: "3px",
                          backgroundColor: "#F15A24",
                          margin: "0 auto 1.5rem auto",
                          borderRadius: "2px"
                        }} />

                        {/* Description */}
                        <p style={{
                          fontSize: "1.05rem",
                          color: "#4B5563",
                          lineHeight: "1.6",
                          marginBottom: "2.5rem",
                          fontWeight: 500
                        }}>
                          Suspicious emails are landing in your inbox. Can you tell the difference between a harmless message and a malicious phishing attack? Put your phishing detection skills to the test and spot the phish!
                        </p>

                        {/* Action guide */}
                        <div style={{
                          display: "flex",
                          gap: "3rem",
                          marginBottom: "2.5rem",
                          flexWrap: "wrap",
                          justifyContent: "center"
                        }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                            <div style={{
                              width: "52px",
                              height: "52px",
                              borderRadius: "14px",
                              backgroundColor: "#FFF5F2",
                              color: "#F15A24",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "24px",
                              border: "1px solid #FFDDCF"
                            }}>
                              <FiShield />
                            </div>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Report Phishing</span>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                            <div style={{
                              width: "52px",
                              height: "52px",
                              borderRadius: "14px",
                              backgroundColor: "#D1FAE5",
                              color: "#10B981",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "24px",
                              border: "1px solid #A7F3D0"
                            }}>
                              <FiCheckCircle />
                            </div>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Mark as Safe</span>
                          </div>
                        </div>

                        {/* CTA Button */}
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
                            margin: "0 auto",
                            transition: "all 0.2s"
                          }}
                          className="hover:opacity-90 hover:scale-102 transform transition-transform duration-200"
                        >
                          Start the Challenge <FiArrowRight />
                        </button>

                        {/* Disclaimer */}
                        <p style={{
                          fontSize: "0.8rem",
                          color: "#9CA3AF",
                          lineHeight: "1.5",
                          marginTop: "2.5rem",
                          borderTop: "1px solid #F3F4F6",
                          paddingTop: "1rem"
                        }}>
                          <strong>Disclaimer:</strong> In the real world, always take your time to inspect links and domains carefully. While this challenge tests your rapid reflexes for fun and practice, vigilance is your best defense against actual threats.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 2. TOP ACTION BAR */}
                  <div style={{ 
                    height: "70px",
                    backgroundColor: "#FFFFFF", 
                    borderBottom: "1px solid #E5E7EB",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 1rem",
                    flexShrink: 0
                  }}>
                    {/* Left: Mobile Menu Toggle / App Menu */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                      <FiMenu 
                        className="text-gray-600 text-2xl cursor-pointer md:hidden" 
                        onClick={() => setIsMobileListOpen(!isMobileListOpen)}
                      />
                      <div className="hidden sm:flex" style={{ 
                        alignItems: "center", backgroundColor: "#F3F4F6", 
                        borderRadius: "20px", padding: "8px 16px", maxWidth: "250px", width: "100%", gap: "8px" 
                      }}>
                        <FiSearch className="text-gray-500 text-lg" />
                        <span className="text-gray-500 text-sm">Search</span>
                      </div>
                    </div>

                    {/* Center: Game Actions */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flex: 1, opacity: (!gameStarted || gameComplete || feedbackOverlay) ? 0.3 : 1, pointerEvents: (!gameStarted || gameComplete || feedbackOverlay) ? 'none' : 'auto', transition: "opacity 0.2s" }}>
                      <button 
                        onClick={() => handleGuess('phish')}
                        style={{ 
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          background: "none", border: "none", cursor: "pointer", color: "#EF4444", gap: "4px"
                        }}
                        className="hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <FiShield size={26} />
                        <span className="hidden sm:inline" style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Report as phishing</span>
                      </button>
                      
                      <button 
                        onClick={() => handleGuess('safe')}
                        style={{ 
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          background: "none", border: "none", cursor: "pointer", color: "#10B981", gap: "4px"
                        }}
                        className="hover:bg-green-50 p-2 rounded-lg transition-colors"
                      >
                        <FiCheckCircle size={26} />
                        <span className="hidden sm:inline" style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Mark as safe</span>
                      </button>
                    </div>

                    {/* Right: Score & Timer Pill (Orange Theme) */}
                    <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
                      <div className="px-3 py-2 sm:px-4 sm:py-2" style={{ 
                        display: "flex", alignItems: "center", backgroundColor: "#FFF5F2", 
                        border: "1px solid #FFDDCF",
                        borderRadius: "24px", gap: "12px", color: "#F15A24"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ backgroundColor: "#F15A24", color: "#FFFFFF", borderRadius: "12px", padding: "2px 8px", fontSize: "13px", fontWeight: 700 }}>
                            {score}
                          </div>
                          <span className="hidden sm:inline" style={{ fontSize: "14px", fontWeight: 600, color: "#9A3412" }}>Score</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ backgroundColor: "#F15A24", color: "#FFFFFF", borderRadius: "12px", padding: "2px 8px", fontSize: "13px", fontWeight: 700, minWidth: "52px", textAlign: "center" }}>
                            {formatTime(timer)}
                          </div>
                          <span className="hidden sm:inline" style={{ fontSize: "14px", fontWeight: 600, color: "#9A3412" }}>Time</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3-PANE LAYOUT */}
                  {!gameComplete ? (
                    <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
                      
                      {/* Left Pane - Folders (Hidden on mobile) */}
                      <div className="hidden lg:flex" style={{ 
                        width: "240px", 
                        borderRight: "1px solid #E5E7EB", 
                        flexDirection: "column", 
                        backgroundColor: "#F9FAFB",
                        padding: "1.5rem 0"
                      }}>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#E5E7EB", fontWeight: 600, color: "#111827", cursor: "pointer", fontSize: "15px" }}>
                          <FiInbox className="text-xl" />
                          <span style={{ flex: 1 }}>Inbox</span>
                          <span style={{ backgroundColor: "#F15A24", color: "white", fontSize: "12px", padding: "2px 8px", borderRadius: "12px" }}>
                            {EMAILS.length - Object.keys(guesses).length}
                          </span>
                        </div>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                          <FiAlertTriangle className="text-xl" /> <span>Junk Email</span>
                        </div>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                          <FiFileText className="text-xl" /> <span>Drafts</span>
                        </div>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                          <FiSend className="text-xl" /> <span>Sent Items</span>
                        </div>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                          <FiTrash2 className="text-xl" /> <span>Deleted Items</span>
                        </div>
                        <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                          <FiArchive className="text-xl" /> <span>Archive</span>
                        </div>
                      </div>

                      {/* Middle Pane - Message List (Responsive Sliding Drawer on Mobile) */}
                      <div 
                        className={`md:flex ${isMobileListOpen ? 'flex' : 'hidden'}`}
                        style={{ 
                          width: "350px", 
                          borderRight: "1px solid #E5E7EB", 
                          flexDirection: "column", 
                          backgroundColor: "#FFFFFF",
                          position: isMobileListOpen ? "absolute" : "relative",
                          zIndex: 10,
                          height: "100%",
                          boxShadow: isMobileListOpen ? "5px 0 15px rgba(0,0,0,0.1)" : "none"
                        }}
                      >
                        {/* Mobile Header for List */}
                        {isMobileListOpen && (
                          <div style={{ padding: "1rem", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F9FAFB" }}>
                            <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Inbox ({EMAILS.length - Object.keys(guesses).length})</span>
                            <FiX className="text-xl cursor-pointer text-gray-600" onClick={() => setIsMobileListOpen(false)} />
                          </div>
                        )}
                        
                        <div style={{ overflowY: "auto", flex: 1, padding: "0.5rem" }}>
                          {EMAILS.map((email) => {
                            const isGuessed = !!guesses[email.id];
                            const isActive = activeEmailId === email.id;
                            return (
                              <div 
                                key={email.id}
                                style={{
                                  padding: "1rem",
                                  borderRadius: "8px",
                                  marginBottom: "4px",
                                  backgroundColor: isActive ? "#F3F4F6" : "transparent",
                                  cursor: isGuessed ? "default" : "pointer",
                                  opacity: isGuessed && !isActive ? 0.4 : 1,
                                  display: "flex",
                                  gap: "1rem",
                                  transition: "background-color 0.2s"
                                }}
                                onClick={() => {
                                  if (!isGuessed && !feedbackOverlay) {
                                    setActiveEmailId(email.id);
                                    setIsMobileListOpen(false); // Close drawer on mobile
                                  }
                                }}
                              >
                                {/* Avatar / Read Indicator */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                                  <div style={{ 
                                    width: "36px", height: "36px", borderRadius: "50%", 
                                    backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "14px", fontWeight: 700, color: "#4B5563"
                                  }}>
                                    {email.senderInitials}
                                  </div>
                                  {!isGuessed && <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#F15A24" }}></div>}
                                </div>
                                
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                                    <span style={{ fontWeight: isGuessed ? 500 : 700, color: "#111827", fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                      {email.senderName}
                                    </span>
                                    <span style={{ fontSize: "12px", color: "#6B7280", flexShrink: 0 }}>{email.date}</span>
                                  </div>
                                  <div style={{ fontSize: "14px", color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: isGuessed ? 400 : 500 }}>
                                    {email.subject}
                                  </div>
                                  {isGuessed && (
                                    <div style={{ marginTop: "6px", fontSize: "13px", fontWeight: 700, color: guesses[email.id] === (email.isPhishing ? 'phish' : 'safe') ? "#10B981" : "#EF4444" }}>
                                      {guesses[email.id] === (email.isPhishing ? 'phish' : 'safe') ? "✓ Correct" : "✗ Incorrect"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Pane - Reading Pane */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", position: "relative" }}>
                        
                        {/* Email Header */}
                        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.3 }}>
                              {activeEmail.subject}
                            </h2>
                            <div className="hidden sm:flex" style={{ gap: "16px", color: "#9CA3AF", fontSize: "20px" }}>
                              <FiCornerUpLeft className="cursor-pointer hover:text-gray-700" />
                              <FiCornerUpRight className="cursor-pointer hover:text-gray-700" />
                              <FiMoreHorizontal className="cursor-pointer hover:text-gray-700" />
                            </div>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#4B5563" }}>
                              {activeEmail.senderInitials}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                                <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>{activeEmail.senderName}</span>
                                <span style={{ color: "#6B7280", fontSize: "14px" }}>&lt;{activeEmail.senderEmail}&gt;</span>
                              </div>
                              <div style={{ color: "#9CA3AF", fontSize: "13px", marginTop: "4px" }}>
                                To: you@company.com • {activeEmail.date}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Email Body Rendering */}
                        <div style={{ padding: "2rem", flex: 1, overflowY: "auto", fontSize: "16px", color: "#374151", lineHeight: "1.6" }}>
                          <div dangerouslySetInnerHTML={{ __html: activeEmail.body }} />
                        </div>

                        {/* Centered Feedback Overlay Modal (Auto-advances) */}
                        {feedbackOverlay && (
                          <>
                            <div style={{
                              position: "absolute",
                              top: 0, left: 0, right: 0, bottom: 0,
                              backgroundColor: "rgba(255, 255, 255, 0.6)",
                              backdropFilter: "blur(2px)",
                              zIndex: 19
                            }}></div>
                            
                            <div style={{
                              position: "absolute",
                              top: "50%", left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "90%",
                              maxWidth: "500px",
                              backgroundColor: "#FFFFFF",
                              borderRadius: "16px",
                              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                              border: `3px solid ${feedbackOverlay.status === 'correct' ? "#10B981" : "#EF4444"}`,
                              padding: "2rem",
                              zIndex: 20,
                              animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                            }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}>
                                <div style={{ 
                                  width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
                                  backgroundColor: feedbackOverlay.status === 'correct' ? "#D1FAE5" : "#FEE2E2", 
                                  color: feedbackOverlay.status === 'correct' ? "#10B981" : "#EF4444",
                                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" 
                                }}>
                                  {feedbackOverlay.status === 'correct' ? <FiCheckCircle /> : <FiAlertTriangle />}
                                </div>
                                <div>
                                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: 800, color: "#111827" }}>
                                    {feedbackOverlay.status === 'correct' ? 'Correct!' : 'Incorrect!'}
                                  </h3>
                                  <p style={{ fontWeight: 600, color: feedbackOverlay.isPhishing ? "#EF4444" : "#10B981", fontSize: "1.1rem", marginBottom: "1rem" }}>
                                    {feedbackOverlay.isPhishing ? "It was a Phishing Attempt." : "It was a Legitimate Email."}
                                  </p>
                                  <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB", textAlign: "left" }}>
                                    <p style={{ margin: 0, color: "#4B5563", fontSize: "15px", lineHeight: "1.6" }}>
                                      {feedbackOverlay.message}
                                    </p>
                                  </div>
                                  <div style={{ marginTop: "1.5rem", fontSize: "14px", color: "#6B7280", fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    <FiClock className="animate-pulse" /> Loading next email automatically...
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                      </div>
                    </div>
                  ) : (
                    /* Game Complete Screen */
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", backgroundColor: "#FFFFFF", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
                      
                      {/* Badge Title */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <h2 style={{ 
                          fontSize: "2.25rem", 
                          fontWeight: 800, 
                          color: "#F15A24", 
                          margin: 0,
                          fontFamily: "var(--font-heading)"
                        }}>
                          {score >= 12 ? "Security Champion" : score >= 8 ? "Cyber Sentinel" : "Cyber Apprentice"}
                        </h2>
                      </div>

                      <div style={{ width: "100%", height: "1px", backgroundColor: "#E5E7EB", margin: "2rem 0" }} />

                      {/* Summary text */}
                      <p style={{ fontSize: "1.125rem", color: "#374151", lineHeight: "1.6", textAlign: "center", margin: "0 0 2rem 0" }}>
                        You&apos;ve earned <strong style={{ color: "#F15A24" }}>{score} out of {EMAILS.length} points</strong> in <strong style={{ color: "#F15A24" }}>{formatTime(300 - timer)}</strong>! Remember, every apprentice to detective starts somewhere, and you&apos;re well on your way.
                      </p>

                      {/* CTA Card */}
                      <div style={{ 
                        backgroundColor: "#FFF5F2", 
                        border: "1px solid #FFDDCF",
                        padding: "2rem", 
                        borderRadius: "16px", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        textAlign: "left", 
                        width: "100%", 
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                        gap: "1.5rem",
                        flexWrap: "wrap"
                      }}>
                        <div style={{ flex: "1 1 300px" }}>
                          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
                            Enjoyed this phishing game?
                          </h3>
                          <p style={{ margin: 0, color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.5" }}>
                            Try the real deal and see how Innvikta can reduce your human risk.
                          </p>
                        </div>
                        <Link href="/book-demo" style={{ 
                          backgroundColor: "#F15A24", 
                          color: "white", 
                          fontWeight: 700, 
                          padding: "0.75rem 1.5rem", 
                          borderRadius: "8px", 
                          boxShadow: "0 4px 10px rgba(241, 90, 36, 0.2)", 
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap"
                        }} className="hover:opacity-90">
                          Get started
                        </Link>
                      </div>

                      {/* Share Section */}
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        width: "100%", 
                        marginTop: "2rem",
                        flexWrap: "wrap",
                        gap: "1rem"
                      }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.05em" }}>
                          SHARE YOUR SCORE & CHALLENGE FRIENDS TO KEEP THEM SAFE
                        </span>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                            <FiLinkedin size={16} />
                          </a>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                            <FiFacebook size={16} />
                          </a>
                          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${score}/${EMAILS.length} in the Email Threat Identifier game! Can you beat my score?`)}&url=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                            <FiTwitter size={16} />
                          </a>
                        </div>
                      </div>

                      {/* Reset Link */}
                      <button onClick={restartGame} style={{ textDecoration: "underline", color: "#6B7280", fontWeight: 500, fontSize: "0.95rem", cursor: "pointer", background: "none", border: "none", marginTop: "3rem" }}>
                        Reset
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATIONAL CONTENT SECTION */}
          <section id="why-phishing-awareness" className="section bg-white border-t border-border" style={{ padding: "8rem 0" }}>
            <div className="container">
              
              <div className="animate" style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span className="text-subheading" style={{ display: "block", marginBottom: "1rem", textAlign: "center" }}>WHY AWARENESS MATTERS</span>
                <h2 className="text-52-heading text-dark" style={{ textAlign: "center", display: "block", width: "100%", margin: "0 auto" }}>Why Phishing Awareness Matters</h2>
              </div>

              <div className="animate" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <p className="text-18-content text-slate-600 max-w-3xl mx-auto leading-relaxed" style={{ textAlign: "center", margin: "0 auto", padding: "2rem 0" }}>
                  Phishing remains one of the most successful cyberattack methods used by threat actors worldwide. 
                  Attackers frequently impersonate Microsoft 365, Google Workspace, banks, HR departments, and IT support teams.
                </p>
              </div>
              
              <div className="animate" style={{ maxWidth: "900px", margin: "4rem auto 6rem auto", textAlign: "center" }}>
                <h3 className="text-2xl font-bold text-dark" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  A single phishing email can lead to:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center px-4" style={{ margin: "0 auto" }}>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiUserX className="text-primary flex-shrink-0 text-xl" /> <span>Account compromise</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiKey className="text-primary flex-shrink-0 text-xl" /> <span>Credential theft</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiDollarSign className="text-primary flex-shrink-0 text-xl" /> <span>Financial fraud</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiMail className="text-primary flex-shrink-0 text-xl" /> <span>Email compromise</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiAlertCircle className="text-primary flex-shrink-0 text-xl" /> <span>Malware infections</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-grey-5 text-slate-700 font-semibold text-base w-full max-w-[280px]" style={{ height: "56px", paddingLeft: "2rem", paddingRight: "1.25rem" }}>
                    <FiLock className="text-primary flex-shrink-0 text-xl" /> <span>Ransomware attacks</span>
                  </div>
                </div>
              </div>

              <div id="phishing-red-flags" className="text-center animate" style={{ marginTop: "5rem", marginBottom: "2.5rem" }}>
                <span className="text-subheading block text-center" style={{ marginBottom: "0.75rem" }}>RED FLAGS</span>
                <h2 className="text-52-heading text-center text-dark" style={{ margin: 0 }}>Common Phishing Red Flags</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate px-6 sm:px-8">
                
                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiGlobe className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Suspicious Domains</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Lookalike domains, e.g., <code className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-mono text-xs border border-red-100 break-all block my-1">support@microsoft-security365.com</code> instead of <code className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-mono text-xs border border-green-100 break-all block my-1">support@microsoft.com</code>.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiClock className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Urgent Language</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Creating false panic by claiming accounts will be suspended or immediate actions are required.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiUserX className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Generic Greetings</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Using generic &quot;Dear Customer&quot; greetings instead of your actual name to target mass user lists.
                  </p>
                </div>

                <div className="feature-card bg-white border border-[#ffece4] rounded-2xl transition-all duration-300 hover:border-transparent hover:shadow-[0px_4px_25px_rgba(0,0,0,.05)] h-full flex flex-col" style={{ padding: "2rem" }}>
                  <div className="feature-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#fff7f3] text-primary mb-5">
                    <FiPaperclip className="text-xl" />
                  </div>
                  <h3 className="text-xl mb-5 text-dark font-bold leading-tight">Unexpected Attachments</h3>
                  <p className="text-slate-600 mb-0 text-15-content leading-relaxed">
                    Unsolicited files, especially ZIP files or macros, that bypass controls to drop malware.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* FAQ SECTION (Matching Human Risk Intelligence Style) */}
          <section className="bg-grey-5" style={{ padding: "6rem 0" }}>
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

          {/* FINAL CTA SECTION */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate relative z-10">
                  <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", fontSize: "2.25rem", fontWeight: "600" }}>
                    Ready to See How Your Workforce Performs?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    A single phishing email can bypass even the strongest technical controls. Discover how vulnerable your employees are to phishing attacks and gain actionable insights into human cyber risk.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/book-demo" className="btn btn-primary">
                      Book A Demo
                    </Link>
                    <Link href="/contact" className="btn btn-outline-primary">
                      Start Free
                    </Link>
                  </div>
                </div>
                
                <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden z-[-1] rounded-2xl">
                  <div className="animate-wave absolute inset-0 w-full h-full">
                    <ImageFallback
                      src="/images/wave.svg"
                      fill={true}
                      sizes="100vw"
                      alt="bg wave"
                    />
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

          {/* Keyframes for popIn animation */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes popIn {
              0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
              100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
          `}} />

        </div>
      </div>
    </GSAPWrapper>
  );
}
