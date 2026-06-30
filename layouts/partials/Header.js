"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoGameControllerOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronDown, 
  FiArrowRight, 
  FiCpu, 
  FiShield, 
  FiLayers, 
  FiActivity, 
  FiMonitor, 
  FiTrendingUp, 
  FiZap, 
  FiSmile, 
  FiAward, 
  FiGlobe, 
  FiBriefcase, 
  FiHeart, 
  FiLock, 
  FiCheckCircle, 
  FiPlay, 
  FiBookOpen, 
  FiFileText, 
  FiCalendar, 
  FiUsers, 
  FiMail, 
  FiMenu,
  FiSearch,
  FiHelpCircle,
  FiTarget,
  FiBarChart2,
  FiStar,
  FiCloud,
  FiSettings,
  FiKey
} from "react-icons/fi";

// SVG illustrations for the right-hand Featured CTA cards
const RenderSvgIllustration = ({ type }) => {
  const primaryColor = "#f15a24";

  switch (type) {
    case "platform":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes drawPath {
              to { stroke-dashoffset: 0; }
            }
            @keyframes fillProgress {
              from { width: 0; }
              to { width: 150px; }
            }
            @keyframes pulseCircle {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.25); opacity: 0.7; }
            }
            @keyframes fadeInSeq {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .draw-line {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: drawPath 1.2s ease-out forwards;
            }
            .fill-bar {
              animation: fillProgress 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .pulse-dot {
              transform-origin: 124px 78px;
              animation: pulseCircle 2s infinite ease-in-out;
            }
            .fade-item-1 { animation: fadeInSeq 0.4s ease-out 0.2s forwards; opacity: 0; }
            .fade-item-2 { animation: fadeInSeq 0.4s ease-out 0.4s forwards; opacity: 0; }
            .fade-item-3 { animation: fadeInSeq 0.4s ease-out 0.6s forwards; opacity: 0; }
          `}</style>
          {/* Dashboard browser window mockup */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="52" x2="305" y2="52" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          <circle cx="35" cy="34" r="4" fill="currentColor" fillOpacity="0.3" stroke="none" />
          <circle cx="49" cy="34" r="4" fill="currentColor" fillOpacity="0.3" stroke="none" />
          <circle cx="63" cy="34" r="4" fill="currentColor" fillOpacity="0.3" stroke="none" />
          {/* Dashboard chart mockup */}
          <rect x="35" y="72" width="105" height="60" rx="6" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M48 112 L72 92 L96 102 L124 78" className="draw-line" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="124" cy="78" r="4" className="pulse-dot" fill="#fff" stroke={primaryColor} strokeWidth="2" />
          {/* Checklist items */}
          <rect x="160" y="78" width="115" height="8" rx="4" className="fade-item-1" fill="currentColor" fillOpacity="0.1" stroke="none" />
          <rect x="160" y="96" width="95" height="8" rx="4" className="fade-item-2" fill="currentColor" fillOpacity="0.1" stroke="none" />
          <rect x="160" y="114" width="105" height="8" rx="4" className="fade-item-3" fill="currentColor" fillOpacity="0.1" stroke="none" />
          {/* Progress bar */}
          <rect x="35" y="160" width="250" height="18" rx="9" fill="currentColor" fillOpacity="0.08" stroke="none" />
          <rect x="35" y="160" width="150" height="18" rx="9" className="fill-bar" fill={primaryColor} stroke="none" />
          <text x="110" y="173" className="fade-item-3" fill="#fff" fontSize="10" fontWeight="extrabold" fontFamily="Inter, sans-serif">60%</text>
        </svg>
      );
    case "phishing":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes slideInRow {
              from { transform: translateX(-8px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes shakeTriangle {
              0%, 100% { transform: rotate(0deg); }
              20%, 60% { transform: rotate(-4deg); }
              40%, 80% { transform: rotate(4deg); }
            }
            .alert-shield {
              transform-origin: 137px 92px;
              animation: shakeTriangle 3s ease-in-out infinite;
            }
            .list-row-1 { animation: slideInRow 0.4s ease-out 0.15s forwards; opacity: 0; }
            .list-row-2 { animation: slideInRow 0.4s ease-out 0.3s forwards; opacity: 0; }
            .list-row-3 { animation: slideInRow 0.4s ease-out 0.45s forwards; opacity: 0; }
          `}</style>
          {/* Email client window */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="52" x2="305" y2="52" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          <line x1="95" y1="52" x2="95" y2="225" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          {/* Left panel items */}
          <rect x="28" y="70" width="55" height="10" rx="5" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="0.5" />
          <rect x="28" y="92" width="50" height="8" rx="4" fill="currentColor" fillOpacity="0.1" stroke="none" />
          <rect x="28" y="110" width="42" height="8" rx="4" fill="currentColor" fillOpacity="0.1" stroke="none" />
          {/* Email row with warning sign */}
          <g className="list-row-1">
            <rect x="110" y="70" width="180" height="52" rx="6" fill={primaryColor} fillOpacity="0.10" stroke={primaryColor} strokeWidth="1.5" />
            <g className="alert-shield">
              <path d="M125 102 L137 82 L149 102 Z" fill={primaryColor} stroke={primaryColor} strokeWidth="1.5" strokeLinejoin="round" />
              <line x1="137" y1="88" x2="137" y2="94" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="137" cy="98" r="1" fill="#fff" />
            </g>
            <rect x="160" y="80" width="90" height="8" rx="4" fill="currentColor" stroke="none" />
            <rect x="160" y="96" width="115" height="6" rx="3" fill="currentColor" fillOpacity="0.4" stroke="none" />
          </g>
          {/* Simple list of emails */}
          <g className="list-row-2">
            <rect x="110" y="136" width="180" height="24" rx="4" fill="currentColor" fillOpacity="0.05" stroke="none" />
            <rect x="122" y="144" width="90" height="8" rx="4" fill="currentColor" fillOpacity="0.15" stroke="none" />
          </g>
          <g className="list-row-3">
            <rect x="110" y="172" width="180" height="24" rx="4" fill="currentColor" fillOpacity="0.05" stroke="none" />
            <rect x="122" y="180" width="110" height="8" rx="4" fill="currentColor" fillOpacity="0.15" stroke="none" />
          </g>
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes growBar {
              from { transform: scaleY(0); }
              to { transform: scaleY(1); }
            }
            @keyframes drawRiskLine {
              to { stroke-dashoffset: 0; }
            }
            @keyframes floatBadge {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes pulseCircle {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.25); opacity: 0.7; }
            }
            .bar-chart-1 { transform-origin: 50px 190px; animation: growBar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards; transform: scaleY(0); }
            .bar-chart-2 { transform-origin: 95px 190px; animation: growBar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s forwards; transform: scaleY(0); }
            .bar-chart-3 { transform-origin: 140px 190px; animation: growBar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s forwards; transform: scaleY(0); }
            .bar-chart-4 { transform-origin: 185px 190px; animation: growBar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.55s forwards; transform: scaleY(0); }
            
            .risk-line {
              stroke-dasharray: 150;
              stroke-dashoffset: 150;
              animation: drawRiskLine 1.2s ease-out 0.3s forwards;
            }
            .risk-badge {
              animation: floatBadge 3.5s ease-in-out infinite;
            }
            .risk-dot {
              transform-origin: 95px 65px;
              animation: pulseCircle 2s infinite ease-in-out 1.2s;
            }
          `}</style>
          {/* Analytics graph dashboard */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="52" x2="305" y2="52" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          {/* Multi-series bar chart */}
          <rect x="35" y="110" width="30" height="80" rx="4" className="bar-chart-1" fill="currentColor" fillOpacity="0.08" stroke="none" />
          <rect x="80" y="80" width="30" height="110" rx="4" className="bar-chart-2" fill={primaryColor} stroke="none" />
          <rect x="125" y="95" width="30" height="95" rx="4" className="bar-chart-3" fill="currentColor" fillOpacity="0.4" stroke="none" />
          <rect x="170" y="130" width="30" height="60" rx="4" className="bar-chart-4" fill="currentColor" fillOpacity="0.15" stroke="none" />
          {/* Line overlay representing risk dropping */}
          <path d="M50 100 L95 65 L140 85 L185 115" className="risk-line" fill="none" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="95" cy="65" r="6" className="risk-dot" fill="#fff" stroke={primaryColor} strokeWidth="2.5" />
          {/* Analytics Stats badge */}
          <g className="risk-badge">
            <rect x="220" y="70" width="65" height="28" rx="8" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="1.5" />
            <text x="230" y="88" fill={primaryColor} fontSize="11" fontWeight="extrabold" fontFamily="Inter, sans-serif">-24%</text>
            <text x="220" y="115" fill="currentColor" fillOpacity="0.7" fontSize="10" fontWeight="semibold" fontFamily="Inter, sans-serif">Risk Score</text>
          </g>
        </svg>
      );
    case "compliance":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes pulseShield {
              0%, 100% { fill-opacity: 0.10; }
              50% { fill-opacity: 0.22; }
            }
            @keyframes drawCheckmark {
              to { stroke-dashoffset: 0; }
            }
            @keyframes floatBadge1 {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes floatBadge2 {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(4px); }
            }
            .shield-path {
              animation: pulseShield 3s ease-in-out infinite;
            }
            .checkmark-path {
              stroke-dasharray: 80;
              stroke-dashoffset: 80;
              animation: drawCheckmark 0.8s ease-out 0.2s forwards;
            }
            .compliance-badge-1 { transform-origin: 55px 80px; animation: floatBadge1 3.5s ease-in-out infinite; }
            .compliance-badge-2 { transform-origin: 55px 140px; animation: floatBadge2 3s ease-in-out infinite; }
            .compliance-badge-3 { transform-origin: 265px 110px; animation: floatBadge1 4s ease-in-out infinite; }
          `}</style>
          {/* Lock and compliance certificate shield layout */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          {/* Centered shield illustration */}
          <path d="M160 55 C210 55 225 72 225 105 C225 147 160 170 160 170 C160 170 95 147 95 105 C95 72 110 55 160 55 Z" className="shield-path" fill={primaryColor} fillOpacity="0.10" stroke={primaryColor} strokeWidth="3" strokeLinejoin="round" />
          {/* Custom checkmark */}
          <path d="M133 105 L151 123 L187 87" className="checkmark-path" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Certificates badges */}
          <g className="compliance-badge-1">
            <circle cx="55" cy="80" r="20" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <text x="43" y="84" fill="currentColor" fontSize="9" fontWeight="extrabold" fontFamily="Inter, sans-serif">GDPR</text>
          </g>
          
          <g className="compliance-badge-2">
            <circle cx="55" cy="140" r="20" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <text x="40" y="144" fill="currentColor" fontSize="9" fontWeight="extrabold" fontFamily="Inter, sans-serif">HIPAA</text>
          </g>
 
          <g className="compliance-badge-3">
            <circle cx="265" cy="110" r="20" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <text x="253" y="114" fill="currentColor" fontSize="9" fontWeight="extrabold" fontFamily="Inter, sans-serif">SOC2</text>
          </g>
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes animateSignal {
              to { stroke-dashoffset: -20; }
            }
            @keyframes radiateRing {
              0% { transform: scale(0.7); opacity: 1; }
              100% { transform: scale(1.4); opacity: 0; }
            }
            @keyframes scaleNode {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.15); }
            }
            .signal-line {
              animation: animateSignal 1.2s linear infinite;
            }
            .radiate-circle {
              transform-origin: 160px 120px;
              animation: radiateRing 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            }
            .center-node {
              transform-origin: 160px 120px;
              animation: scaleNode 3s ease-in-out infinite;
            }
            .outer-node-1 { transform-origin: 65px 70px; animation: scaleNode 3s ease-in-out infinite 0.2s; }
            .outer-node-2 { transform-origin: 255px 70px; animation: scaleNode 3s ease-in-out infinite 0.5s; }
            .outer-node-3 { transform-origin: 65px 170px; animation: scaleNode 3s ease-in-out infinite 0.8s; }
            .outer-node-4 { transform-origin: 255px 170px; animation: scaleNode 3s ease-in-out infinite 1.1s; }
          `}</style>
          {/* Centralized Node Connection Mockup */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          
          {/* Radiating outer circles */}
          <circle cx="160" cy="120" r="32" className="radiate-circle" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.4" fill="none" />
          
          {/* Interlocking nodes */}
          <circle cx="160" cy="120" r="32" className="center-node" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="2" />
          <circle cx="160" cy="120" r="10" className="center-node" fill={primaryColor} stroke="none" />
          
          <circle cx="65" cy="70" r="20" className="outer-node-1" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="255" cy="70" r="20" className="outer-node-2" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="65" cy="170" r="20" className="outer-node-3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="255" cy="170" r="20" className="outer-node-4" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
 
          {/* Connection lines */}
          <line x1="160" y1="120" x2="65" y2="70" className="signal-line" stroke={primaryColor} strokeWidth="2" strokeDasharray="6,4" strokeDashoffset="0" />
          <line x1="160" y1="120" x2="255" y2="70" className="signal-line" stroke={primaryColor} strokeWidth="2" strokeDasharray="6,4" strokeDashoffset="0" />
          <line x1="160" y1="120" x2="65" y2="170" className="signal-line" stroke={primaryColor} strokeWidth="2" strokeDasharray="6,4" strokeDashoffset="0" />
          <line x1="160" y1="120" x2="255" y2="170" className="signal-line" stroke={primaryColor} strokeWidth="2" strokeDasharray="6,4" strokeDashoffset="0" />
 
          <circle cx="65" cy="70" r="6" className="outer-node-1" fill="currentColor" />
          <circle cx="255" cy="70" r="6" className="outer-node-2" fill="currentColor" />
          <circle cx="65" cy="170" r="6" className="outer-node-3" fill="currentColor" />
          <circle cx="255" cy="170" r="6" className="outer-node-4" fill="currentColor" />
        </svg>
      );
    case "resources":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes floatBook {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes floatBookBack {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-2.5px); }
            }
            @keyframes slideCoverLine {
              from { width: 0; }
            }
            @keyframes fadeInSeq {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .book-front {
              transform-origin: 112px 110px;
              animation: floatBook 4s ease-in-out infinite;
            }
            .book-back {
              transform-origin: 85px 115px;
              animation: floatBookBack 4s ease-in-out infinite;
            }
            .cover-line-1 { animation: slideCoverLine 0.8s ease-out 0.3s forwards; }
            .cover-line-2 { animation: slideCoverLine 0.8s ease-out 0.45s forwards; }
            .fade-item-1 { animation: fadeInSeq 0.4s ease-out 0.1s forwards; opacity: 0; }
            .fade-item-2 { animation: fadeInSeq 0.4s ease-out 0.25s forwards; opacity: 0; }
            .fade-item-3 { animation: fadeInSeq 0.4s ease-out 0.4s forwards; opacity: 0; }
          `}</style>
          {/* Resource center mockup with guides/books */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          
          {/* Back book */}
          <rect x="40" y="55" width="90" height="120" rx="6" className="book-back" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          
          {/* Front book */}
          <g className="book-front">
            <rect x="65" y="45" width="95" height="130" rx="8" fill={primaryColor} fillOpacity="0.1" stroke={primaryColor} strokeWidth="2.5" />
            {/* Guide Cover detail */}
            <rect x="65" y="45" width="22" height="130" fill={primaryColor} stroke="none" />
            <rect x="98" y="70" width="50" height="8" rx="2" className="cover-line-1" fill="currentColor" stroke="none" />
            <rect x="98" y="88" width="45" height="6" rx="2" className="cover-line-2" fill="currentColor" fillOpacity="0.6" stroke="none" />
            <path d="M98 120 C 112 114, 132 126, 145 120" fill="none" stroke={primaryColor} strokeWidth="2" />
          </g>
          
          {/* Side text links */}
          <g>
            <rect x="185" y="65" width="85" height="8" rx="4" className="fade-item-1" fill="currentColor" fillOpacity="0.15" stroke="none" />
            <rect x="185" y="85" width="75" height="8" rx="4" className="fade-item-2" fill="currentColor" fillOpacity="0.15" stroke="none" />
            <rect x="185" y="105" width="65" height="8" rx="4" className="fade-item-3" fill="currentColor" fillOpacity="0.15" stroke="none" />
            <rect x="185" y="125" width="80" height="8" rx="4" className="fade-item-2" fill="currentColor" fillOpacity="0.15" stroke="none" />
            <rect x="185" y="145" width="70" height="8" rx="4" className="fade-item-3" fill="currentColor" fillOpacity="0.15" stroke="none" />
          </g>
        </svg>
      );
    case "assessments":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes popCheck {
              0% { transform: scale(0); opacity: 0; }
              70% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes drawCheckmark {
              to { stroke-dashoffset: 0; }
            }
            @keyframes slideLine {
              from { width: 0; opacity: 0; }
              to { width: var(--line-width); opacity: var(--line-opacity, 1); }
            }
            .check-badge-1 { transform-origin: 80px 78px; animation: popCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards; opacity: 0; }
            .check-badge-2 { transform-origin: 80px 120px; animation: popCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s forwards; opacity: 0; }
            .check-badge-3 { transform-origin: 80px 162px; animation: popCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; opacity: 0; }
            
            .checkmark-path-1 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: drawCheckmark 0.3s ease-out 0.35s forwards; }
            .checkmark-path-2 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: drawCheckmark 0.3s ease-out 0.5s forwards; }
            .checkmark-path-3 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: drawCheckmark 0.3s ease-out 0.65s forwards; }
            
            .assess-line-1 { --line-width: 135px; animation: slideLine 0.6s ease-out 0.35s forwards; opacity: 0; }
            .assess-line-2 { --line-width: 115px; --line-opacity: 0.4; animation: slideLine 0.6s ease-out 0.5s forwards; opacity: 0; }
            .assess-line-3 { --line-width: 125px; --line-opacity: 0.4; animation: slideLine 0.6s ease-out 0.65s forwards; opacity: 0; }
          `}</style>
          {/* Assessment checklist illustration */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          {/* Document page border */}
          <rect x="45" y="45" width="230" height="150" rx="8" fill="currentColor" fillOpacity="0.01" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          
          {/* Checklist rows */}
          <g>
            <g className="check-badge-1">
              <circle cx="80" cy="78" r="12" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="1.5" />
              <path d="M74 78 L78 82 L86 74" className="checkmark-path-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <rect x="110" y="73" width="135" height="10" rx="5" className="assess-line-1" fill="currentColor" stroke="none" />
          </g>
          
          <g>
            <g className="check-badge-2">
              <circle cx="80" cy="120" r="12" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="1.5" />
              <path d="M74 120 L78 124 L86 116" className="checkmark-path-2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <rect x="110" y="115" width="115" height="10" rx="5" className="assess-line-2" fill="currentColor" fillOpacity="0.4" stroke="none" />
          </g>
          
          <g>
            <g className="check-badge-3">
              <circle cx="80" cy="162" r="12" fill={primaryColor} fillOpacity="0.15" stroke={primaryColor} strokeWidth="1.5" />
              <path d="M74 162 L78 166 L86 158" className="checkmark-path-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <rect x="110" y="157" width="125" height="10" rx="5" className="assess-line-3" fill="currentColor" fillOpacity="0.4" stroke="none" />
          </g>
        </svg>
      );
    case "arcade":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes crownFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes joyTilt {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(-2px, 1px); }
              50% { transform: translate(2px, -2px); }
              75% { transform: translate(-1px, -2px); }
            }
            @keyframes buttonPulse {
              0%, 100% { transform: scale(1); filter: brightness(1); }
              50% { transform: scale(1.15); filter: brightness(1.2); }
            }
            .crown-svg {
              transform-origin: 160px 48px;
              animation: crownFloat 3s ease-in-out infinite;
            }
            .joystick-1 {
              transform-origin: 130px 130px;
              animation: joyTilt 4s ease-in-out infinite;
            }
            .joystick-2 {
              transform-origin: 180px 130px;
              animation: joyTilt 4s ease-in-out infinite 2s;
            }
            .act-btn-1 { transform-origin: 230px 120px; animation: buttonPulse 2s infinite ease-in-out; }
            .act-btn-2 { transform-origin: 248px 138px; animation: buttonPulse 2s infinite ease-in-out 1s; }
          `}</style>
          {/* Innvikta Arcade gaming/illustration mockup */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          <rect x="50" y="80" width="220" height="100" rx="16" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
          {/* Controller D-Pad */}
          <path d="M72 130 H92 M82 120 V140" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          {/* Action buttons */}
          <circle cx="230" cy="120" r="8" className="act-btn-1" fill={primaryColor} stroke="none" />
          <circle cx="248" cy="138" r="8" className="act-btn-2" fill={primaryColor} stroke="none" />
          {/* Joysticks */}
          <circle cx="130" cy="130" r="10" className="joystick-1" fill="currentColor" fillOpacity="0.2" stroke="none" />
          <circle cx="180" cy="130" r="10" className="joystick-2" fill="currentColor" fillOpacity="0.2" stroke="none" />
          {/* Arcade Crown / Star */}
          <path d="M160 38 L170 50 L182 42 L175 58 H145 L138 42 L150 50 Z" className="crown-svg" fill={primaryColor} stroke={primaryColor} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "partners":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes rotateClockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateCounter {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            .gear-large {
              transform-origin: 120px 110px;
              animation: rotateClockwise 12s linear infinite;
            }
            .gear-small {
              transform-origin: 185px 135px;
              animation: rotateCounter 9.375s linear infinite;
            }
          `}</style>
          {/* Connecting gears representation */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          {/* Gears */}
          <g className="gear-large">
            <circle cx="120" cy="110" r="32" fill="none" stroke={primaryColor} strokeWidth="7" strokeDasharray="11,7" />
            <circle cx="120" cy="110" r="12" fill={primaryColor} stroke="none" />
          </g>
          
          <g className="gear-small">
            <circle cx="185" cy="135" r="25" fill="none" stroke="currentColor" strokeWidth="5.5" strokeDasharray="9,5" />
            <circle cx="185" cy="135" r="8" fill="currentColor" stroke="none" />
          </g>
          {/* Grid visual lines */}
          <line x1="35" y1="55" x2="95" y2="55" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
          <line x1="35" y1="70" x2="80" y2="70" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
          <line x1="285" y1="180" x2="235" y2="180" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
        </svg>
      );
    case "company":
      return (
        <svg viewBox="0 0 320 240" className="w-full h-auto" fill="none" stroke="currentColor" strokeWidth="1.5">
          <style>{`
            @keyframes pulseGlobe {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.04); opacity: 1; }
            }
            @keyframes rotateGlobeLines {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes floatPin {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
            .globe-outer {
              transform-origin: 160px 120px;
              animation: rotateGlobeLines 25s linear infinite;
            }
            .globe-inner {
              transform-origin: 160px 120px;
              animation: pulseGlobe 4s ease-in-out infinite;
            }
            .location-pin {
              transform-origin: 160px 107px;
              animation: floatPin 2.5s ease-in-out infinite;
            }
          `}</style>
          {/* Globe or structural lines visual representation */}
          <rect x="15" y="15" width="290" height="210" rx="10" fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeWidth="2" />
          
          <g className="globe-outer">
            <circle cx="160" cy="120" r="55" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
          </g>
          
          <g className="globe-inner">
            <circle cx="160" cy="120" r="48" fill={primaryColor} fillOpacity="0.08" stroke={primaryColor} strokeWidth="2" />
            {/* Globe grid lines */}
            <line x1="112" y1="120" x2="208" y2="120" stroke={primaryColor} strokeWidth="1.5" />
            <line x1="160" y1="72" x2="160" y2="168" stroke={primaryColor} strokeWidth="1.5" />
            <path d="M124 90 C 144 102, 176 102, 196 90" fill="none" stroke={primaryColor} strokeWidth="1.5" />
            <path d="M124 150 C 144 138, 176 138, 196 150" fill="none" stroke={primaryColor} strokeWidth="1.5" />
          </g>
          
          <path d="M140 78 C 152 102, 152 138, 140 162" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M180 78 C 168 102, 168 138, 180 162" fill="none" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Satellite / Location pin */}
          <g className="location-pin">
            <path d="M153 100 A 7 7 0 0 1 167 100 C 167 108, 160 114, 160 114 C 160 114, 153 108, 153 100 Z" fill={primaryColor} stroke="none" />
            <circle cx="160" cy="100" r="2.5" fill="#fff" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

// Reusable menu configuration data with 2x2 grid layout (exactly 4 cells per tab)
const menuData = {
  solutions: {
    title: "Solutions",
    tabs: [
      {
        id: "insat",
        label: "InSAT",
        href: "/solutions/insat",
        icon: FiCpu,
        headline: "Build everyday secure behaviour across your workforce with Innvikta’s unified Security Awareness Training platform.",
        cells: [
          { 
            name: "Security Awareness Training", 
            desc: "Cinematic, role-based courses that engage employees and satisfy audits.", 
            href: "/solutions/insat#security-awareness-training",
            chips: [{ label: "Role-Based Modules" }, { label: "Story-Based Simulations" }]
          },
          { 
            name: "Interactive Gamified Arcade", 
            desc: "Bite-sized microlearning games and quizzes that motivate participation.", 
            href: "/solutions/insat#interactive-gamified-arcade",
            chips: [{ label: "Gamified / Interactive Modules" }, { label: "Policy Reinforcement" }]
          },
          { 
            name: "AI Adaptive Learning", 
            desc: "Personalized paths adjusted dynamically to user risk profiles.", 
            href: "/solutions/insat#ai-adaptive-learning",
            chips: [{ label: "Personalized Learning Paths" }, { label: "Dynamic Risk Profiling" }]
          },
          { 
            name: "Human Risk Intelligence", 
            desc: "Turn awareness data into measurable, board-ready risk scoring and visibility.", 
            href: "/solutions/insat#human-risk-intelligence",
            chips: [{ label: "Risk Dashboards" }, { label: "Behavioral Analytics" }]
          }
        ],
        cta: {
          title: "Launch modern awareness training",
          desc: "Deliver personalized learning built for active participation and defensible compliance evidence.",
          label: "Explore Training Platform",
          href: "/solutions/insat",
          svgType: "platform"
        }
      },
      {
        id: "user_risk_simulation",
        label: "Phishing Simulation",
        href: "/solutions/phishing-simulation",
        icon: FiMail,
        headline: "Personalized phishing simulations that teach, test, and strengthen workforce response.",
        cells: [
          { 
            name: "Multi Vector Attack", 
            desc: "Simulate and track phishing, attachment, and QR code attacks.", 
            href: "/solutions/phishing-simulation#multi-vector-attack",
            chips: [
              { label: "Smishing Simulation", href: "/solutions/phishing-simulation#smishing-whatsapp" },
              { label: "WhatsApp Simulation", href: "/solutions/phishing-simulation#smishing-whatsapp" }
            ]
          },
          { 
            name: "Vishing Simulation", 
            desc: "Automated phone tests simulating voice-based social engineering threats.", 
            href: "/solutions/phishing-simulation#vishing-simulation",
            chips: [
              { label: "Voice Attack Scenarios", href: "/solutions/phishing-simulation#vishing-simulation" },
              { label: "AI-Led Variants", href: "/solutions/phishing-simulation#ai-led-scenario-variants" }
            ]
          },
          { 
            name: "Audience Segmentation", 
            desc: "Auto-generate dynamic templates based on current local threat vectors.", 
            href: "/solutions/phishing-simulation#audience-segmentation",
            chips: [{ label: "Campaign Scheduling" }, { label: "Difficulty Progression" }]
          },
          { 
            name: "AI-Led Scenario Variants", 
            desc: "Escalate difficulty levels dynamically based on employee susceptibility.", 
            href: "/solutions/phishing-simulation#ai-led-scenario-variants",
            chips: [{ label: "Adaptive Risk Testing" }, { label: "Personalized Simulation Paths" }]
          }
        ],
        cta: {
          title: "Simulate modern attacks and reinforce behavior",
          desc: "Test your team across multiple vectors including SMS, QR codes, and voice to verify click resilience.",
          label: "Explore Phishing Simulations",
          href: "/solutions/phishing-simulation",
          svgType: "phishing"
        }
      },
      {
        id: "compliance_training",
        label: "Compliance Training",
        href: "/solutions/compliance-training",
        icon: FiCheckCircle,
        headline: "Meet regulatory mandates and reinforce critical privacy policies.",
        cells: [
          { 
            name: "Compliance Learning Suite", 
            desc: "Satisfy GDPR, HIPAA, PCI-DSS, and India's DPDP Act requirements.", 
            href: "/solutions/compliance-training#compliance-learning-suite",
            chips: [{ label: "GDPR Awareness" }, { label: "HIPAA Awareness" }]
          },
          { 
            name: "Acknowledgement Tracking", 
            desc: "Track and log employee policy agreements and corporate code sign-offs.", 
            href: "/solutions/compliance-training#acknowledgement-tracking",
            chips: [{ label: "Completion Logs" }, { label: "Audit Records" }]
          },
          { 
            name: "Refresher Campaigns", 
            desc: "Automatically deploy compliance courses to specific high-risk user groups.", 
            href: "/solutions/compliance-training#refresher-campaigns",
            chips: [{ label: "Governance Reinforcement" }, { label: "Ongoing Compliance Education" }]
          },
          { 
            name: "Audit-Ready Evidence", 
            desc: "Generate automated training completion records to satisfy security framework audits.", 
            href: "/solutions/compliance-training#audit-ready-evidence",
            chips: [{ label: "Automated Records" }, { label: "Auditor Reports" }]
          }
        ],
        cta: {
          title: "Close the awareness gap in compliance",
          desc: "Audit-ready training modules built to satisfy global frameworks, privacy rules, and internal audits.",
          label: "See Compliance Solutions",
          href: "/solutions/compliance-training",
          svgType: "compliance"
        }
      },
      {
        id: "customized_solutions",
        label: "Customized Solutions",
        href: "/solutions/customized-solutions",
        icon: FiLayers,
        headline: "Tailored training for your people, risks, and industry with customized learning paths.",
        cells: [
          { 
            name: "Industry-Specific Portals", 
            desc: "Custom simulations and rules for BFSI, Healthcare, IT, and Manufacturing.", 
            href: "/solutions/customized-solutions#industry-specific-portals",
            chips: [
              { label: "BFSI", icon: FiShield },
              { label: "Healthcare", icon: FiHeart },
              { label: "Government", icon: FiGlobe },
              { label: "IT Services", icon: FiCpu },
              { label: "View All Industries", isMore: true }
            ]
          },
          { 
            name: "Departmental Learning Paths", 
            desc: "Custom training tracks designed for unique team exposures and duties.", 
            href: "/solutions/customized-solutions#departmental-learning-paths",
            chips: [
              { label: "Remote Workforce Security", icon: FiCloud },
              { label: "Human Risk Management", icon: FiActivity }
            ]
          },
          { 
            name: "Executive Risk Management", 
            desc: "Deploy specialized campaigns to high-target C-suite and finance teams.", 
            href: "/solutions/customized-solutions#executive-risk-management",
            chips: [
              { label: "Executive Risk Reporting", icon: FiBarChart2 },
              { label: "Phishing Prevention", icon: FiLock }
            ]
          },
          { 
            name: "Culture Benchmark Studies", 
            desc: "Assess and compare security culture indexes across remote workforces.", 
            href: "/solutions/customized-solutions#culture-benchmark-studies",
            chips: [
              { label: "Security Culture Building", icon: FiUsers },
              { label: "Compliance Training", icon: FiCheckCircle }
            ]
          }
        ],
        cta: {
          title: "Tailor simulations to specific industries",
          desc: "Build customized learning paths based on the unique regulatory and operational risks of your sector.",
          label: "View Customized Solutions",
          href: "/solutions/customized-solutions",
          svgType: "network"
        }
      }
    ]
  },
  resources: {
    title: "Resources",
    tabs: [
      {
        id: "victim_support",
        label: "Innvikta Cyberhelp",
        icon: FiShield,
        headline: "Victim of Cyberfraud? We’re Here to Help You Fight Back.",
        headlineCta: {
          label: "Get Guidance",
          href: "/cyberhelp"
        },
        cells: [
          { name: "Incident Reporting Guide", desc: "Step-by-step assistance for victims to understand, document, and report cyber incidents effectively.", href: "/cyberhelp/register" },
          { name: "Complaint Filing Support", desc: "Guided NCRP complaint filing walkthroughs with actionable reporting instructions and support resources.", href: "/cyberhelp/filing-guide" },
          { name: "Emergency Account Freeze", desc: "Quick access to emergency banking and UPI account freeze guidance to reduce fraud impact immediately.", href: "/cyberhelp/freeze" },
          { name: "Cyber Helpline Directory", desc: "Search verified national, state, banking, and cybercrime support contacts in one centralized place.", href: "/cyberhelp/directory" },
          { name: "Evidence Vault & Report Templates", desc: "Organize cyber evidence securely and use ready-made complaint templates for faster reporting.", href: "/cyberhelp/evidence" },
          { name: "Scam Awareness & Cyber Alerts", desc: "Stay informed about scam trends, fraud warnings, cyber safety tips, and interactive awareness resources.", href: "/cyberhelp/alerts" }
        ],
        cta: {
          title: "Stop Threats at Every Layer—People, Data, AI",
          desc: "Innvikta provides intent-based protection for every human, every AI agent, across all data.",
          label: "Learn More",
          href: "#",
          svgType: "resources"
        }
      },
      {
        id: "knowledge_hub",
        label: "Knowledge Hub",
        icon: FiBookOpen,
        headline: "Explore our latest cybersecurity articles, global benchmarks, and community updates.",
        cells: [
          { name: "Security Blog", desc: "Latest threat research findings and awareness campaign tips.", href: "/blog" },
          { name: "Glossary", desc: "A comprehensive glossary of cybersecurity terms and concepts.", href: "/resources/glossary" },
          { name: "Maturity Benchmarks", desc: "Compare regional click rates and reporting rates against industry peers.", href: "/maturity-benchmarks" },
          { name: "Case Studies", desc: "Success stories from real enterprise security leadership teams.", href: "/resources/case-studies" },
          { name: "Platform Updates", desc: "See the latest features added to the Innvikta training suite.", href: "/platform-updates" },
          { name: "Weekly Newsletter", desc: "Security tips and campaign ideas delivered directly to your inbox.", href: "#" }
        ],
        cta: {
          title: "Explore the Innvikta Blog",
          desc: "Stay updated with real-time cybersecurity findings and employee engagement tactics.",
          label: "Go to Blog",
          href: "/blog",
          svgType: "resources"
        }
      }
    ]
  },
  freetools: {
    title: "Free Tools",
    tabs: [
      {
        id: "assessments",
        label: "Security Assessments",
        icon: FiActivity,
        headline: "Benchmark your workforce risk baseline and training maturity.",
        cells: [
          { name: "Maturity Calculator", desc: "Grade the effectiveness and maturity of your training program.", href: "/resources/maturity-calculator" },
          { name: "Risk Estimator", desc: "Estimate employee click rates before starting simulations.", href: "#" },
          { name: "Baseline Score Tool", desc: "Get a baseline human risk score for your active domain.", href: "/freetools/baseline-score-tool" },
          { name: "Culture Benchmarking", desc: "Measure security culture indicators and threat reports.", href: "/freetools/culture-benchmarking" }
        ],
        cta: {
          title: "Run a free human risk test",
          desc: "Verify baseline employee susceptibility in less than 5 minutes.",
          label: "Start Assessment",
          href: "#",
          svgType: "assessments"
        }
      },
      {
        id: "cyber_tools",
        label: "Free Cybersecurity Tools",
        icon: FiMonitor,
        headline: "Immediate security utilities for IT and security administration teams.",
        cells: [
          { name: "Free Password Generator", desc: "Create secure passwords and check credential strength locally.", href: "/freetools/password-generator" },
          { name: "Domain Security Analyzer", desc: "Scan SPF, DKIM, and DMARC record vulnerabilities.", href: "/freetools/domain-security-analyzer" },
          { name: "Spot The Phish", desc: "Test your ability to detect phishing emails in an interactive simulator.", href: "/freetools/spot-the-phish" },
          { name: "Simulation ROI Tool", desc: "Estimate potential cost savings from threat training campaigns.", href: "/resources/simulation-roi" }
        ],
        cta: {
          title: "Check password exposure logs",
          desc: "Analyze if employee credentials exist on public breach indexes securely.",
          label: "Run Tool",
          href: "#",
          svgType: "assessments"
        }
      }
    ]
  },
  arcade: {
    title: "Innvikta Arcade",
    tabs: [
      {
        id: "arcade_exp",
        label: "Arcade Experience",
        icon: IoGameControllerOutline,
        headline: "Turn security awareness into engaging, game-based learning.",
        cells: [
          { name: "Story-Based Learning", desc: "Cinematic, scenario-driven interactive modules.", href: "/cyber-arcade" },
          { name: "Missions & Quests", desc: "Simulated security assignments for active play.", href: "/cyber-arcade" },
          { name: "Topic-Based Modules", desc: "Mini-games targeting specific security topics.", href: "/cyber-arcade#section-games" },
          { name: "Free Arcade Challenges", desc: "Try arcade modules without a full workspace setup.", href: "/cyber-arcade" }
        ],
        cta: {
          title: "Explore Innvikta Arcade",
          desc: "Utilize interactive gamified lessons that build defensive employee habits through story play.",
          label: "Launch a Free Challenge",
          href: "/cyber-arcade",
          svgType: "arcade"
        }
      },
      {
        id: "gamification_sys",
        label: "Gamification System",
        icon: FiAward,
        headline: "Keep employees motivated with progression, badges, and rewards.",
        cells: [
          { name: "Badges & XP", desc: "Reward milestone achievements and daily login streaks.", href: "/cyber-arcade" },
          { name: "Leaderboards", desc: "Encourage friendly security culture competition.", href: "/cyber-arcade" },
          { name: "Progression Paths", desc: "Unlock corporate career stages as skills advance.", href: "/cyber-arcade" },
          { name: "Arcade Rewards Store", desc: "Redeem XP points for custom achievements and items.", href: "/cyber-arcade" }
        ],
        cta: {
          title: "Increase employee participation rates",
          desc: "Leverage gamification mechanics to achieve up to 94% training engagement rates.",
          label: "See Arcade Benefits",
          href: "/cyber-arcade",
          svgType: "arcade"
        }
      }
    ]
  },
  partners: {
    title: "Partners",
    tabs: [
      {
        id: "partner_prog",
        label: "Partner Program",
        icon: FiGlobe,
        headline: "Grow with a modern security awareness and human risk platform built for enterprises.",
        cells: [
          { name: "Partner Program", desc: "Collaborate with Innvikta to deliver modern security awareness solutions.", href: "/partners" },
          { name: "Co-Selling", desc: "Partner with our sales experts to close deals and drive mutual revenue.", href: "/partners#support" },
          { name: "Growth Support", desc: "Access tier pricing, marketing assets, and co-marketing funds.", href: "/partners#support" }
        ],
        cta: {
          title: "Join our partner network",
          desc: "Expand your portfolio with our leading security awareness and human risk analytics tools.",
          label: "Become a Partner",
          href: "/partners#form",
          svgType: "partners"
        }
      },
      {
        id: "reseller",
        label: "Channel & Reseller",
        icon: FiShield,
        headline: "Offer Innvikta’s awareness, simulation, compliance, and human risk solutions to your clients.",
        cells: [
          { name: "Resellers", desc: "Offer Innvikta's training and human risk solutions to your clients.", href: "/partners#reseller" },
          { name: "Consultants", desc: "Integrate human risk intelligence into your security consulting services.", href: "/partners#reseller" },
          { name: "IT Partners", desc: "Equip your IT offerings with easy-to-manage training and phishing tools.", href: "/partners#reseller" }
        ],
        cta: {
          title: "Access white-label reseller tools",
          desc: "Rebrand the training experience and deliver human risk visibility as a managed service.",
          label: "Explore Reseller Program",
          href: "/partners#form",
          svgType: "partners"
        }
      }
    ]
  },
  company: {
    title: "Company",
    tabs: [
      {
        id: "about",
        label: "About Innvikta",
        href: "/about",
        icon: FiBriefcase,
        headline: "We help enterprises build everyday secure employee behavior.",
        cells: [
          { name: "Our Story", desc: "Who we are, our team, and our human security mission.", href: "/about#our-story" },
          { name: "Our Mission", desc: "Transforming workforce vulnerability into defense strength.", href: "/about#our-mission" },
          { name: "Leadership & Team", desc: "Meet the executive team driving security awareness innovation.", href: "/about#leadership-team" },
          { name: "Impact & Approach", desc: "Read about our commitment to privacy, clarity, and trust.", href: "/about#impact-approach" }
        ],
        cta: {
          title: "Discover our mission",
          desc: "Read about our commitment to secure employee work habits and mitigate social engineering vectors.",
          label: "Read About Us",
          href: "/about",
          svgType: "company"
        }
      }
    ]
  }
};

const searchIndex = [
  {
    title: "Security Awareness Training",
    description: "Cinematic, role-based courses that engage employees and satisfy compliance audits.",
    url: "/solutions/insat",
    category: "Solutions",
    keywords: ["insat", "training", "modules", "awareness", "gamification", "arcade", "microlearning"]
  },
  {
    title: "Interactive Gamified Arcade",
    description: "Bite-sized microlearning games and quizzes that motivate participation.",
    url: "/solutions/insat",
    category: "Solutions",
    keywords: ["arcade", "game", "gamified", "quiz", "points", "xp", "badges", "rewards"]
  },
  {
    title: "Phishing Simulation",
    description: "Personalized phishing simulations that teach, test, and strengthen workforce response.",
    url: "/solutions/phishing-simulation",
    category: "Solutions",
    keywords: ["phishing", "simulation", "sms", "whatsapp", "qr code", "templates", "email", "vishing"]
  },
  {
    title: "Human Risk Intelligence",
    description: "Turn awareness data into measurable, board-ready human risk visibility and risk scores.",
    url: "/solutions/human-risk-intelligence",
    category: "Solutions",
    keywords: ["analytics", "risk score", "dashboard", "heatmap", "reporting", "ciso", "roi"]
  },
  {
    title: "Compliance Training",
    description: "Satisfy GDPR, HIPAA, PCI-DSS, and India's DPDP Act requirements.",
    url: "/solutions/compliance-training",
    category: "Solutions",
    keywords: ["compliance", "gdpr", "hipaa", "dpdp", "audit", "policy", "regulations"]
  },
  {
    title: "Customized Solutions",
    description: "Tailored training for your people, risks, and industry with customized learning paths.",
    url: "/solutions/customized-solutions",
    category: "Solutions",
    keywords: ["custom", "industry", "bfsi", "healthcare", "manufacturing", "remote", "department"]
  },
  {
    title: "Partner Program",
    description: "Collaborate with Innvikta to deliver modern security awareness solutions, co-selling, and reseller support.",
    url: "/partners",
    category: "Company & Partners",
    keywords: ["partners", "reseller", "channel", "growth", "co-selling", "collaborate", "alliance"]
  },
  {
    title: "About Innvikta",
    description: "Learn about our story, mission, leadership, and our human security mission.",
    url: "/about",
    category: "Company & Partners",
    keywords: ["about", "story", "mission", "leadership", "team", "innvikta"]
  },
  {
    title: "Free Baseline Risk Score Assessment",
    description: "Verify baseline employee susceptibility in less than 5 minutes.",
    url: "/freetools/baseline-score-tool",
    category: "Free Tools",
    keywords: ["baseline", "calculator", "risk estimator", "free tool"]
  },
  {
    title: "Free Security Culture Benchmarking",
    description: "Measure security culture indicators and threat reports across your industry.",
    url: "/freetools/culture-benchmarking",
    category: "Free Tools",
    keywords: ["culture", "benchmark", "indicator", "survey", "free tool"]
  },
  {
    title: "Free Domain Security Analyzer",
    description: "Scan SPF, DKIM, and DMARC record vulnerabilities for your active domain.",
    url: "/freetools/domain-security-analyzer",
    category: "Free Tools",
    keywords: ["domain", "spf", "dkim", "dmarc", "scanner", "email security", "free tool"]
  },
  {
    title: "Start Free Trial",
    description: "Start building a stronger security culture with free awareness training modules and cybersecurity games.",
    url: "/start-free",
    category: "Get Started",
    keywords: ["start free", "trial", "register", "free account"]
  },
  {
    title: "Book A Demo",
    description: "Schedule a live demo session with our product experts.",
    url: "/book-demo",
    category: "Get Started",
    keywords: ["demo", "book", "schedule", "product demo", "meeting"]
  },
  {
    title: "Cybersecurity Glossary",
    description: "A comprehensive glossary of cybersecurity terms, threat vectors, and compliance standards.",
    url: "/resources/glossary",
    category: "Resources",
    keywords: ["glossary", "dictionary", "terms", "definitions", "cybersecurity", "phishing", "bec"]
  }
];

const languageMap = {
  "English (US)": "en",
  "Deutsch": "de",
  "Français": "fr",
  "Español": "es",
  "日本語": "ja"
};

// Get current language from googtrans cookie
const getLangFromCookie = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'English (US)';
  const match = document.cookie.match(/googtrans=\/([^/]+)\/([^;]+)/);
  if (match && match[2]) {
    const code = match[2];
    const reverseMap = {
      'en': 'English (US)',
      'de': 'Deutsch',
      'fr': 'Français',
      'es': 'Español',
      'ja': '日本語'
    };
    return reverseMap[code] || 'English (US)';
  }
  return 'English (US)';
};

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Close menus and search on path changes
  useEffect(() => {
    setActiveMegaMenu(null);
    setShowMenu(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Re-apply translation on route change
  useEffect(() => {
    const currentLang = getLangFromCookie();
    if (currentLang !== 'English (US)') {
      const timer = setTimeout(() => {
        const langCode = languageMap[currentLang] || 'en';
        const selectEl = document.querySelector('#global_google_translate_element select.goog-te-combo');
        if (selectEl) {
          selectEl.value = langCode;
          selectEl.dispatchEvent(new Event('change'));
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Auto focus input when search overlay is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Reset active result index when query changes
  useEffect(() => {
    setActiveSearchIndex(-1);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // States to manage the active mega menu and active tabs per mega menu
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeTabs, setActiveTabs] = useState({
    solutions: "insat",
    resources: "knowledge_hub",
    freetools: "assessments",
    arcade: "arcade_exp",
    partners: "partner_prog",
    company: "about"
  });

  // Mobile navigation state
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [mobileActiveSubTab, setMobileActiveSubTab] = useState(null);

  // Language top strip state
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");

  // Initialize global Google Translate
  useEffect(() => {
    // Set initial display language from cookie if present
    setSelectedLang(getLangFromCookie());

    const initGlobalTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,de,fr,es,ja,hi,mr' // Support English, German, French, Spanish, Japanese, Hindi, Marathi
          },
          'global_google_translate_element'
        );
      }
    };

    window.globalGoogleTranslateElementInit = initGlobalTranslate;

    // Load Google Translate script if not loaded
    if (window.google && window.google.translate) {
      initGlobalTranslate();
    } else if (!document.querySelector('#global-google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'global-google-translate-script';
      addScript.src = 'https://translate.google.com/translate_a/element.js?cb=globalGoogleTranslateElementInit';
      document.body.appendChild(addScript);
    }
  }, []);

  const handleLanguageChange = (langName) => {
    setSelectedLang(langName);
    const langCode = languageMap[langName] || 'en';

    const triggerChange = () => {
      const selectEl = document.querySelector('#global_google_translate_element select.goog-te-combo');
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (!triggerChange()) {
      // Retry for up to 2 seconds if the script is still loading
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerChange() || attempts > 20) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  // Scroll listener for sticky styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 20 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredResults = searchQuery.trim() === "" 
    ? [] 
    : searchIndex.filter(item => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.keywords.some(kw => kw.toLowerCase().includes(query)) ||
               item.category.toLowerCase().includes(query);
      });

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSearchIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSearchIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSearchIndex >= 0 && activeSearchIndex < filteredResults.length) {
        const targetUrl = filteredResults[activeSearchIndex].url;
        setIsSearchOpen(false);
        setSearchQuery("");
        window.location.href = targetUrl;
      }
    }
  };

  const handleTabHover = (menuKey, tabId) => {
    setActiveTabs((prev) => ({
      ...prev,
      [menuKey]: tabId
    }));
  };

  const handleMenuHover = (menuKey) => {
    setActiveMegaMenu(menuKey);
  };

  const handleMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  const toggleMobileMenu = (menuKey) => {
    setMobileActiveMenu(mobileActiveMenu === menuKey ? null : menuKey);
    setMobileActiveSubTab(null);
  };

  const toggleMobileSubTab = (subTabId) => {
    setMobileActiveSubTab(mobileActiveSubTab === subTabId ? null : subTabId);
  };

  return (
    <>
      <div className="header-height-fix"></div>
      
      <header
        className={`header flex flex-col ${sticky ? "header-sticky" : ""}`}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99999 }}
        ref={headerRef}
        onMouseLeave={handleMenuLeave}
      >
        {/* =========================================================
            LAYER 1: UTILITY STRIP (Enterprise Alignment, Minimal Spacing)
            ========================================================= */}
        <div className="hidden lg:block w-full bg-[#f15a24] border-b border-[#e14a14] h-[40px] transition-all duration-300">
          <div className="container-xl h-full flex items-center justify-between text-[13px] font-bold text-white/90">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 text-white border border-white/30 font-extrabold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">NEW</span>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                InSAT Platform Release 2026: Human Behavior Analytics <FiArrowRight className="text-[12px]" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery("");
                }}
                className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <FiSearch className="text-[14px]" /> Search
              </button>
              <span className="h-3 w-[1px] bg-white/30"></span>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                <FiHelpCircle className="text-[14px]" /> Support
              </Link>
              <span className="h-3 w-[1px] bg-white/30"></span>
 
              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  onBlur={() => setTimeout(() => setLangOpen(false), 200)}
                  className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <FiGlobe className="text-[14px]" /> {selectedLang} <FiChevronDown className="text-[11px]" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-[140px] bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-slate-400">
                    {["English (US)", "Deutsch", "Français", "Español", "日本語"].map((lang, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleLanguageChange(lang)}
                        className="w-full text-left px-3 py-1.5 hover:bg-slate-800 hover:text-white text-slate-400 font-semibold block transition-colors text-xs"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
                {/* Global Google Translate Element */}
                <div id="global_google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}></div>
              </div>
            </div>
          </div>
        </div>
 
        {/* =========================================================
            LAYER 2: MAIN NAVIGATION BAR (Logo, Navigation & CTA Buttons)
            ========================================================= */}
        <div className="w-full transition-all duration-300 bg-transparent border-b border-slate-200/10 h-[80px] relative z-40">
          {/* Search Overlay Container */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 w-full h-[80px] bg-white z-[60] flex items-center border-b border-slate-100"
              >
                <div className="container-xl flex items-center justify-center gap-4 w-full relative">
                  <div className="relative flex-1 max-w-[800px]">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search for offerings, solutions, tools..."
                      className="w-full px-6 py-2.5 bg-white border border-slate-200 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] rounded-full text-slate-800 placeholder-slate-400 focus:outline-none pr-12 text-sm transition-all font-semibold"
                    />
                    <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#f15a24] text-lg pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-[#f15a24] transition-colors p-2 cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                    aria-label="Close search"
                  >
                    <CgClose className="text-xl stroke-[1px]" />
                  </button>

                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {searchQuery.trim() !== "" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        ref={searchResultsRef}
                        className="absolute left-0 right-0 top-[60px] mx-auto max-w-[800px] bg-white border border-slate-100 rounded-2xl shadow-xl z-[70] overflow-hidden max-h-[450px] overflow-y-auto"
                      >
                        {filteredResults.length === 0 ? (
                          <div className="p-8 text-center text-slate-400 font-semibold">
                            No results found for <span className="text-[#f15a24]">"{searchQuery}"</span>
                          </div>
                        ) : (
                          <div className="p-4 space-y-4 text-left">
                            {Array.from(new Set(filteredResults.map(r => r.category))).map(category => (
                              <div key={category} className="space-y-1.5">
                                <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase px-3">
                                  {category}
                                </div>
                                <div className="space-y-1">
                                  {filteredResults
                                    .filter(r => r.category === category)
                                    .map((result) => {
                                      const globalIdx = filteredResults.indexOf(result);
                                      const isSelected = globalIdx === activeSearchIndex;
                                      return (
                                        <Link
                                          key={result.title}
                                          href={result.url}
                                          onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                          }}
                                          className={`block p-3 rounded-xl transition-all ${
                                            isSelected 
                                              ? "bg-orange-50/70 border-l-4 border-[#f15a24] pl-2" 
                                              : "hover:bg-slate-50 border-l-4 border-transparent"
                                          }`}
                                        >
                                          <div className="font-bold text-[14px] text-slate-800 flex items-center justify-between">
                                            <span>{result.title}</span>
                                            <FiArrowRight className={`text-xs text-[#f15a24] transition-transform ${isSelected ? "translate-x-1" : "opacity-0"}`} />
                                          </div>
                                          <div className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                                            {result.description}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`relative container-xl h-full flex items-center justify-between transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {/* Logo */}
            {/* Logo */}
            <div className="shrink-0 flex items-center" style={{ zIndex: 100001 }}>
              <Link href="/">
                <img 
                  src="/images/logo-main.png" 
                  alt="Innvikta" 
                  className="h-8 lg:h-7 xl:h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Main Navigation Items */}
            <ul className="hidden lg:flex items-center justify-center lg:gap-3 xl:gap-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2 h-full desktop-nav-menu">
              {Object.keys(menuData).map((menuKey) => (
                <li
                  key={menuKey}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleMenuHover(menuKey)}
                >
                  <button className={`nav-link h-full flex items-center text-slate-900 hover:text-[#f15a24] transition-colors focus:outline-none whitespace-nowrap ${
                    activeMegaMenu === menuKey ? "text-[#f15a24]" : ""
                  }`}>
                    {menuKey === "arcade" && <IoGameControllerOutline className="text-lg text-[#f15a24]" />}
                    {menuData[menuKey].title}
                    <FiChevronDown className={`text-xs transition-transform duration-200 ${
                      activeMegaMenu === menuKey ? "rotate-180 text-[#f15a24]" : "text-slate-400"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Sticky Conversion Area */}
            <div className="hidden lg:flex items-center ml-auto relative">
              {/* Partner CTA */}
              <div className={`transition-all duration-300 flex items-center h-full ${pathname === "/partners" ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-4 absolute right-0"}`}>
                <Link 
                  href="#form" 
                  className="px-4 xl:px-6 py-2 bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg text-[12px] xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1 border border-[#f15a24] hover:border-orange-600 whitespace-nowrap"
                >
                  Become a Partner <FiArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Standard CTAs */}
              <div className={`header-cta-buttons transition-all duration-300 flex items-center h-full ${pathname !== "/partners" ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4 absolute right-0"}`}>
                <Link 
                  href="/start-free" 
                  className="bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] text-[#f15a24] hover:text-white rounded-lg transition-all duration-300 whitespace-nowrap header-cta-start-free"
                >
                  Start Free
                </Link>
                <Link 
                  href="/book-demo" 
                  className="bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg transition-all duration-300 flex items-center gap-1 whitespace-nowrap header-cta-book-demo"
                >
                  Book A Demo <FiArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <div className="flex items-center lg:hidden" style={{ zIndex: 100001 }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-800 hover:text-[#f15a24] text-2xl transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {showMenu ? <CgClose /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* =========================================================
              LAYER 3: REDESIGNED MASTER MEGA MENU FLYOUT LAYER
              ========================================================= */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 right-0 top-[80px] w-full mega-menu-flyout border-t border-white/10 shadow-[0_30px_50px_-10px_rgba(0,0,0,0.08)] z-[99999] pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar"
                onMouseEnter={() => handleMenuHover(activeMegaMenu)}
                onMouseLeave={handleMenuLeave}
              >
                <div className="container-xl mx-auto flex min-h-[380px] lg:min-h-[420px] xl:min-h-[460px]">
                  {/* 1. LEFT TAB RAIL (Persistent skeleton anchor) */}
                  <div className="w-[240px] xl:w-[280px] 2xl:w-[320px] bg-slate-50/10 border-r border-slate-200/10 pt-4 pb-8 xl:pt-6 xl:pb-12 px-2 xl:px-4 flex flex-col gap-2 shrink-0">
                    {menuData[activeMegaMenu].tabs.map((tab) => {
                      const isActive = activeTabs[activeMegaMenu] === tab.id;
                      const isPlaceholder = !tab.href || tab.href === "#";
                      const tabContent = (
                        <>
                          <div className="flex items-center gap-2 xl:gap-3">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <tab.icon className="text-[17px] shrink-0 text-[#f15a24]" />
                            </div>
                            <span className="whitespace-nowrap transition-colors">{tab.label}</span>
                          </div>
                          <FiArrowRight className={`text-xs shrink-0 transition-all duration-200 ${isActive ? "opacity-100 translate-x-0 text-[#f15a24]" : "opacity-0 -translate-x-1 group-hover/tab:opacity-100 group-hover/tab:translate-x-0 group-hover/tab:text-[#f15a24]"}`} />
                        </>
                      );
                      const baseClass = `relative w-full flex items-center justify-between text-left pl-3 xl:pl-5 pr-2 xl:pr-4 py-2.5 rounded-lg text-[13.5px] xl:text-[14px] font-semibold transition-all duration-200 group/tab ${
                        isActive
                          ? "active-tab-rail"
                          : "inactive-tab-rail"
                      }`;

                      return isPlaceholder ? (
                        <div
                          key={tab.id}
                          onMouseEnter={() => handleTabHover(activeMegaMenu, tab.id)}
                          className={`${baseClass} cursor-pointer`}
                        >
                          {tabContent}
                        </div>
                      ) : (
                        <Link
                          key={tab.id}
                          href={tab.href}
                          onMouseEnter={() => handleTabHover(activeMegaMenu, tab.id)}
                          onClick={handleMenuLeave}
                          className={baseClass}
                        >
                          {tabContent}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Active tab object parsing */}
                  {(() => {
                    const currentTabId = activeTabs[activeMegaMenu] || menuData[activeMegaMenu].tabs[0].id;
                    const currentTab = menuData[activeMegaMenu].tabs.find(t => t.id === currentTabId) || menuData[activeMegaMenu].tabs[0];
                    return (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentTabId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="flex flex-1 w-full"
                        >
                          {/* 2. CENTER WORKSPACE (Strict 2x2 grid, visually populated) */}
                          <div className="flex-1 pt-4 pb-8 xl:pt-6 xl:pb-12 px-4 xl:px-12 flex flex-col justify-start">
                             {currentTab.headline && (
                               <div className={`mb-6 max-w-4xl border-b border-slate-200/10 pb-6 ${currentTab.headlineCta ? 'flex flex-col items-start gap-4' : ''}`}>
                                 <h3 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-snug">
                                   {currentTab.headline}
                                 </h3>
                                 {currentTab.headlineCta && (
                                   <Link 
                                     href={currentTab.headlineCta.href}
                                     onClick={handleMenuLeave}
                                     className="group px-6 py-2.5 bg-[#f15a24] hover:bg-orange-600 text-white font-extrabold rounded-full text-[13px] transition-colors flex items-center gap-1.5 mt-1 hover:shadow-none"
                                   >
                                     {currentTab.headlineCta.label} <FiArrowRight className="text-[13px] transition-transform duration-200 group-hover:translate-x-1" />
                                   </Link>
                                 )}
                                </div>
                             )}

                            {/* Strictly 2-column or 3-column layout based on tab config */}
                            {currentTab.groups ? (
                              <div className="grid grid-cols-3 gap-6 lg:gap-x-6 xl:gap-x-10 w-full mt-1">
                                {currentTab.groups.map((group, gIdx) => (
                                  <div key={gIdx} className="flex flex-col justify-start">
                                    <h4 className="text-[13px] font-extrabold text-[#f15a24] uppercase tracking-wider mb-4 pb-2 border-b border-slate-200/40">
                                      {group.name}
                                    </h4>
                                    <div className="space-y-5">
                                      {group.cells.map((cell, idx) => {
                                        const isCellPlaceholder = !cell.href || cell.href === "#";
                                        return (
                                          <div key={idx} className="group/item flex flex-col justify-start py-0.5">
                                            {isCellPlaceholder ? (
                                              <span className="text-[#f15a24] lg:text-[14px] xl:text-[16px] font-bold inline-flex items-center gap-1">
                                                {cell.name}
                                              </span>
                                            ) : (
                                              <Link 
                                                href={cell.href}
                                                onClick={handleMenuLeave}
                                                className="text-[#f15a24] lg:text-[14px] xl:text-[15px] font-bold inline-flex items-center gap-1 group-hover/item:text-orange-600 transition-colors"
                                              >
                                                {cell.name}
                                                <FiArrowRight className="text-[11px] opacity-100 translate-x-0.5 group-hover/item:translate-x-1.5 transition-transform text-[#f15a24] group-hover/item:text-orange-600" />
                                              </Link>
                                            )}

                                            {cell.desc && (
                                              isCellPlaceholder ? (
                                                <p className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1">
                                                  {cell.desc}
                                                </p>
                                              ) : (
                                                <Link 
                                                  href={cell.href}
                                                  onClick={handleMenuLeave}
                                                  className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1 group-hover/item:text-slate-950 transition-colors block"
                                                >
                                                  {cell.desc}
                                                </Link>
                                              )
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className={`grid ${currentTab.layout === 'three-column' ? 'grid-cols-3' : 'grid-cols-2'} lg:gap-x-4 xl:gap-x-10 gap-y-6 items-start content-start w-full mt-1`}>
                                {currentTab.cells && currentTab.cells.map((cell, idx) => {
                                  const isCellPlaceholder = !cell.href || cell.href === "#";
                                  return (
                                    <div key={idx} className="group/item flex flex-col justify-start py-0.5">
                                      {isCellPlaceholder ? (
                                        <span className="text-[#f15a24] lg:text-[14px] xl:text-[16px] font-bold inline-flex items-center gap-1">
                                          {cell.name}
                                        </span>
                                      ) : (
                                        <Link 
                                          href={cell.href}
                                          onClick={handleMenuLeave}
                                          className="text-[#f15a24] lg:text-[14px] xl:text-[16px] font-bold inline-flex items-center gap-1 group-hover/item:text-orange-600 transition-colors"
                                        >
                                          {cell.name}
                                          <FiArrowRight className="text-[11px] opacity-100 translate-x-0.5 group-hover/item:translate-x-1.5 transition-transform text-[#f15a24] group-hover/item:text-orange-600" />
                                        </Link>
                                      )}

                                      {cell.desc && (
                                        isCellPlaceholder ? (
                                          <p className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1">
                                            {cell.desc}
                                          </p>
                                        ) : (
                                          <Link 
                                            href={cell.href}
                                            onClick={handleMenuLeave}
                                            className="text-[12px] xl:text-[13px] text-slate-700 font-semibold leading-normal mt-1 group-hover/item:text-slate-950 transition-colors block"
                                          >
                                            {cell.desc}
                                          </Link>
                                        )
                                      )}

                                      {/* Chips rendering */}
                                      {cell.chips && (
                                        <div className={`flex ${currentTab.id === 'customized_solutions' ? 'flex-wrap gap-x-4 gap-y-1.5' : 'flex-col gap-1.5'} mt-2.5 items-start`}>
                                          {cell.chips.map((chip, i) => {
                                            const chipClass = `text-[12px] font-medium flex items-center gap-1.5 transition-colors ${
                                              isCellPlaceholder 
                                                ? 'text-slate-400'
                                                : chip.isMore 
                                                  ? 'text-slate-400 hover:text-[#f15a24]' 
                                                  : 'text-slate-500 hover:text-[#f15a24]'
                                            }`;
                                            
                                            const chipContent = (
                                              <>
                                                {chip.icon && <chip.icon className="text-[12px] opacity-60" />}
                                                {chip.label}
                                              </>
                                            );

                                            if (chip.href) {
                                              return (
                                                <Link 
                                                  key={i} 
                                                  href={chip.href}
                                                  onClick={handleMenuLeave}
                                                  className={chipClass}
                                                >
                                                  {chipContent}
                                                </Link>
                                              );
                                            }

                                            return (
                                              <span key={i} className={chipClass}>
                                                {chipContent}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}


                          </div>

                          {/* 3. FEATURED CARD (Integrated conversion card) */}
                          {currentTab.cta && (
                            <div className="w-[220px] lg:w-[260px] xl:w-[320px] 2xl:w-[360px] pt-4 pb-8 xl:pt-6 xl:pb-12 px-3 xl:px-6 border-l border-slate-200/10 bg-transparent shrink-0 flex flex-col justify-start">
                              <div className="bg-white/20 rounded-2xl p-3 xl:p-5 flex flex-col gap-3 xl:gap-5 shadow-sm border border-white/20 relative text-slate-700">
                                <div className="flex flex-col gap-3">
                                  <div className="w-full bg-white/30 rounded-xl border border-white/20 shadow-sm overflow-hidden mb-2 relative group-hover/card:shadow-md transition-shadow">
                                    {currentTab.cta.image && (
                                      <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                                        Featured
                                      </div>
                                    )}
                                    {currentTab.cta.image ? (
                                      <img src={currentTab.cta.image} alt={currentTab.cta.title} className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                      <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                                        <RenderSvgIllustration type={currentTab.cta.svgType} />
                                      </div>
                                    )}
                                  </div>
                                  <h5 className="text-[13px] xl:text-[15px] font-medium text-slate-900 leading-snug">
                                    {currentTab.cta.title}
                                  </h5>
                                  {/* Description removed to reduce text as requested */}
                                </div>
                                <Link 
                                  href={currentTab.cta.href || "#"}
                                  onClick={handleMenuLeave}
                                  className="w-full justify-center text-center py-2.5 xl:py-3 bg-[#f15a24] hover:bg-orange-600 text-white font-semibold whitespace-nowrap rounded-lg text-[10px] xl:text-xs transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-md shadow-orange-500/10"
                                >
                                  {currentTab.cta.label} <FiArrowRight className="text-xs" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================
            MOBILE ACCORDION-BASED MENU (Preserves Information Hierarchy)
            ========================================================= */}
        <div className={`fixed inset-x-0 top-0 h-screen bg-white z-30 px-6 pt-24 pb-28 overflow-y-auto transition-all duration-500 lg:hidden flex flex-col justify-between ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="space-y-3">
            {Object.keys(menuData).map((menuKey) => {
              const menu = menuData[menuKey];
              const isMenuOpen = mobileActiveMenu === menuKey;

              return (
                <div key={menuKey} className="border-b border-slate-100 pb-2">
                  <button 
                    onClick={() => toggleMobileMenu(menuKey)}
                    className="w-full flex items-center justify-between text-left text-slate-800 text-base font-extrabold py-2 focus:outline-none"
                  >
                    <span className={isMenuOpen ? "text-[#f15a24]" : ""}>{menu.title}</span>
                    <FiChevronDown className={`transform transition-transform duration-300 ${isMenuOpen ? "rotate-180 text-[#f15a24]" : "text-slate-400"}`} />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[1200px] opacity-100 mt-2 pl-3 border-l-2 border-[#f15a24]/20" : "max-h-0 opacity-0"}`}>
                    <div className="space-y-4 py-2">
                      {menu.tabs.map((tab) => {
                        const isSubTabOpen = mobileActiveSubTab === tab.id;
                        return (
                          <div key={tab.id} className="space-y-2">
                            <button
                              onClick={() => toggleMobileSubTab(tab.id)}
                              className="w-full flex items-center justify-between text-left text-[14px] font-bold text-slate-700 focus:outline-none"
                            >
                              <span className="flex items-center gap-2">
                                <tab.icon className="text-[#f15a24] text-xs" />
                                {tab.label}
                              </span>
                              <FiChevronDown className={`transform transition-transform duration-300 text-xs ${isSubTabOpen ? "rotate-180" : ""}`} />
                            </button>

                            <div className={`transition-all duration-300 overflow-hidden pl-4 ${isSubTabOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                              <ul className="space-y-3 py-1 border-l border-slate-100 pl-3">
                                {tab.groups ? (
                                  tab.groups.map((group, gIdx) => (
                                    <div key={gIdx} className="space-y-2 pt-2 first:pt-0">
                                      <h5 className="text-[11px] font-extrabold text-[#f15a24] uppercase tracking-wider pl-1">
                                        {group.name}
                                      </h5>
                                      <ul className="space-y-3 border-l border-slate-100 pl-3">
                                        {group.cells.map((cell, idx) => {
                                          const isCellPlaceholder = !cell.href || cell.href === "#";
                                          return (
                                            <li key={idx} className="block py-1">
                                              {isCellPlaceholder ? (
                                                <span className="text-slate-700 text-xs font-bold block">
                                                  {cell.name}
                                                </span>
                                              ) : (
                                                <Link 
                                                  href={cell.href} 
                                                  onClick={() => setShowMenu(false)}
                                                  className="text-[#f15a24] hover:text-orange-600 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                                                >
                                                  {cell.name}
                                                  <FiArrowRight className="text-[10px]" />
                                                </Link>
                                              )}
                                              {cell.desc && (
                                                isCellPlaceholder ? (
                                                  <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                                                    {cell.desc}
                                                  </p>
                                                ) : (
                                                  <Link
                                                    href={cell.href}
                                                    onClick={() => setShowMenu(false)}
                                                    className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5 hover:text-[#f15a24]"
                                                  >
                                                    {cell.desc}
                                                  </Link>
                                                )
                                              )}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  ))
                                ) : (
                                  tab.cells && tab.cells.map((cell, idx) => {
                                    const isCellPlaceholder = !cell.href || cell.href === "#";
                                    return (
                                      <li key={idx} className="block py-1">
                                        {isCellPlaceholder ? (
                                          <span className="text-slate-700 text-xs font-bold block">
                                            {cell.name}
                                          </span>
                                        ) : (
                                          <Link 
                                            href={cell.href} 
                                            onClick={() => setShowMenu(false)}
                                            className="text-[#f15a24] hover:text-orange-600 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                                          >
                                            {cell.name}
                                            <FiArrowRight className="text-[10px]" />
                                          </Link>
                                        )}
                                        
                                        {cell.desc && (
                                          isCellPlaceholder ? (
                                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                                              {cell.desc}
                                            </p>
                                          ) : (
                                            <Link
                                              href={cell.href}
                                              onClick={() => setShowMenu(false)}
                                              className="text-[10px] text-slate-400 font-medium leading-tight block mt-0.5 hover:text-[#f15a24]"
                                            >
                                              {cell.desc}
                                            </Link>
                                          )
                                        )}

                                        {cell.chips && (
                                          <div className="mt-2 flex flex-wrap gap-1.5">
                                            {cell.chips.map((chip, i) => {
                                              const chipClass = "text-[10.5px] font-bold border rounded bg-slate-50 text-slate-500 border-slate-100 px-1.5 py-0.5";
                                              if (chip.href) {
                                                return (
                                                  <Link 
                                                    key={i}
                                                    href={chip.href}
                                                    onClick={() => setShowMenu(false)}
                                                    className={chipClass}
                                                  >
                                                    {chip.label}
                                                  </Link>
                                                );
                                              }
                                              return (
                                                <span key={i} className={chipClass}>
                                                  {chip.label}
                                                </span>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </li>
                                    );
                                  })
                                )}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Mobile Sticky CTAs */}
          <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-6 mt-6 relative min-h-[60px]">
            {/* Partner CTA */}
            <div className={`transition-all duration-300 w-full ${pathname === "/partners" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2 absolute inset-x-0"}`}>
              <Link 
                href="#form" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-[#f15a24] text-white font-extrabold rounded-lg text-sm shadow-md shadow-orange-500/10 flex items-center justify-center gap-1"
              >
                Become a Partner <FiArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Standard CTA */}
            <div className={`transition-all duration-300 w-full flex flex-col gap-3 ${pathname !== "/partners" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2 absolute inset-x-0"}`}>
              <Link 
                href="/start-free" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 text-[#f15a24] hover:text-white font-extrabold rounded-lg text-sm transition-all"
              >
                Start Free
              </Link>
              <Link 
                href="/book-demo" 
                onClick={() => setShowMenu(false)}
                className="w-full block text-center py-3 bg-[#f15a24] text-white font-extrabold rounded-lg text-sm shadow-md shadow-orange-500/10 flex items-center justify-center gap-1"
              >
                Book A Demo <FiArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Film */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 backdrop-film z-[99998] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

