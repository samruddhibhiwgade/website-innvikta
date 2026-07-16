"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Import all sub-components
import CyberIncidentGuide from "../components/CyberIncidentGuide";
import TriageBot from "../components/TriageBot";
import FilingGuide from "../components/FilingGuide";
import FreezeDashboard from "../components/FreezeDashboard";
import ContactDirectory from "../components/ContactDirectory";
import UnifiedDirectory from "../components/UnifiedDirectory";
import BankHelplineDirectory from "../components/BankHelplineDirectory";
import SocialMediaDirectory from "../components/SocialMediaDirectory";
import EvidenceVault from "../components/EvidenceVault";
import ReportingTemplates from "../components/ReportingTemplates";
import ScamSimulator from "../components/ScamSimulator";
import LegalAid from "../components/LegalAid";
import AboutUs from "../components/AboutUs";
import FaqSection from "../components/FaqSection";
import CyberAlerts from "../components/CyberAlerts";
import AdminPortal from "../components/AdminPortal";

const sectionComponents = {
  register: CyberIncidentGuide,
  triage: TriageBot,
  "filing-guide": FilingGuide,
  freeze: FreezeDashboard,
  contacts: ContactDirectory,
  directory: UnifiedDirectory,
  banks: BankHelplineDirectory,
  social: SocialMediaDirectory,
  evidence: EvidenceVault,
  templates: ReportingTemplates,
  simulate: ScamSimulator,
  legal: LegalAid,
  about: AboutUs,
  faq: FaqSection,
  alerts: CyberAlerts,
  admin: AdminPortal,
  "admin-view": AdminPortal
};

import SeoMeta from "@layouts/partials/SeoMeta";

const sectionTitles = {
  register: "Cyber Incident Registration Guide",
  triage: "Cyber Incident Triage Bot",
  "filing-guide": "Cyber Incident Filing Guide",
  freeze: "Account Freeze Dashboard",
  contacts: "Cyber Helpline Contact Directory",
  directory: "Unified Cyber Helpline Directory",
  banks: "Bank Helpline Directory",
  social: "Social Media Helpline Directory",
  evidence: "Evidence Vault",
  templates: "Incident Reporting Templates",
  simulate: "Scam Simulator",
  legal: "Legal Aid & Rights",
  about: "About Cyberhelp",
  faq: "Frequently Asked Questions",
  alerts: "Cyber Security Alerts",
  admin: "Cyberhelp Admin Portal",
  "admin-view": "Cyberhelp Admin Portal View"
};

export default function CyberhelpSectionPage({ params }) {
  const { section } = params;
  const Component = sectionComponents[section];

  if (!Component) {
    notFound();
  }

  const sectionTitle = sectionTitles[section] || "Cyberhelp Resource";
  const sectionDescription = `Access the ${sectionTitle} on Innvikta Cyberhelp to report cyber incidents, get immediate assistance, and access legal and technical resources.`;

  return (
    <div className="section-view">
      <SeoMeta title={`${sectionTitle} | Innvikta Help Center`} description={sectionDescription} />
      <div className="container back-bar">
        <Link href="/cyberhelp" className="btn back-btn" style={{ textDecoration: "none" }}>
          <ArrowLeft size={16} /> Back to Cyberhelp Home
        </Link>
      </div>
      <section className="section">
        <Component />
      </section>
    </div>
  );
}
