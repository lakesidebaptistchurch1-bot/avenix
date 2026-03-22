"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader shortly after the app becomes interactive,
    // or immediately after the `load` event if it hasn't fired yet.
    const timeout = setTimeout(() => setVisible(false), 1200);

    const handleLoad = () => setVisible(false);
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading" />
        <div id="loading-icon">
          <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
        </div>
      </div>
    </div>
  );
}

