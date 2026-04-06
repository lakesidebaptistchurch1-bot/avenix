"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 1400);

    const handleLoad = () => setVisible(false);
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-brand-primary overflow-hidden">
      {/* Subtle background overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#31475A_0.8px,transparent_1px)] bg-size-[20px_20px] opacity-30" />

      <div className="relative flex flex-col items-center">
        {/* Spinning Logo Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="relative w-28 h-28 flex items-center justify-center mb-8"
        >
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />

          {/* Logo */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            <img
              src="/images/church_logo_blue-removebg-preview (1).png"
              alt="Lakeside Baptist Church"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-white/80 text-sm tracking-[3px] font-medium"
        >
          PREPARING WORSHIP EXPERIENCE
        </motion.div>

        {/* Progress Bar (optional subtle indicator) */}
        <div className="mt-10 w-48 h-px bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-brand-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}