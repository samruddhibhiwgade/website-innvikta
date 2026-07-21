"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrackingProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Initialize or retrieve session ID
    let sessionId = sessionStorage.getItem("innvikta_session_id");
    if (!sessionId) {
      sessionId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem("innvikta_session_id", sessionId);
    }

    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";

    const sendTrackingEvent = async (eventType, targetElement = null, additionalData = null) => {
      try {
        await fetch(`${backendUrl}/track_api.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            event_type: eventType,
            page_url: window.location.href,
            target_element: targetElement,
            additional_data: additionalData
          }),
        });
      } catch (error) {
        console.error("Tracking error:", error);
      }
    };

    // Track Page View
    sendTrackingEvent("page_view");

    // Track Global Clicks
    const handleGlobalClick = (e) => {
      // Find closest anchor or button
      const target = e.target.closest("a, button, [data-track]");
      
      if (target) {
        let targetDescription = target.innerText || target.getAttribute("aria-label") || target.tagName;
        // Truncate if too long
        if (targetDescription.length > 100) {
          targetDescription = targetDescription.substring(0, 100) + "...";
        }

        const additionalData = {
          tagName: target.tagName,
          href: target.href || null,
          id: target.id || null,
          classes: target.className || null
        };

        sendTrackingEvent("click", targetDescription.trim(), additionalData);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [pathname]); // Re-run when pathname changes to track page views

  return <>{children}</>;
}
