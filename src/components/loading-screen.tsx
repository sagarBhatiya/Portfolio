"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait slightly at 100% for smooth transition
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark"
        >
          {/* Glowing Background Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-blue/10 blur-[80px] -z-10 animate-pulse-slow" />
          
          <div className="space-y-6 text-center max-w-xs w-full px-4">
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-blue/20"
            >
              <span className="text-3xl font-extrabold text-white tracking-tighter">
                SB
              </span>
            </motion.div>

            {/* Title / Status */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-widest text-white/90 uppercase">
                Sagar Bhatiya
              </h3>
              <p className="text-xs font-mono text-white/45">
                Initializing System... {Math.min(progress, 100)}%
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
