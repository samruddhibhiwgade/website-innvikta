import React from "react";
import HeroSection from "./components/HeroSection";
import EmergencyBanner from "./components/EmergencyBanner";
import SectionCards from "./components/SectionCards";
import FaqSection from "./components/FaqSection";
import SeoMeta from "@layouts/partials/SeoMeta";

export default function CyberhelpHome() {
  return (
    <>
      <SeoMeta title="Innvikta Help Center & Knowledge Base" description="Get answers to your questions, platform user guides, and troubleshooting support for Innvikta." />
      <HeroSection />
      <EmergencyBanner />
      <SectionCards />
      <FaqSection />
    </>
  );
}
