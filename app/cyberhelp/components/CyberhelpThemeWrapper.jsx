"use client";
import React, { useState, useEffect } from "react";
import DisclaimerPopup from "./shared/DisclaimerPopup";
import ThemeToggle from "./shared/ThemeToggle";

export default function CyberhelpThemeWrapper({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("cyberhelp-theme");
    if (saved) {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("cyberhelp-theme", nextTheme);
  };

  return (
    <div className="cyberhelp-scope" data-theme={theme}>
      <DisclaimerPopup />
      <div className="floating-theme-toggle" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      {children}
    </div>
  );
}
