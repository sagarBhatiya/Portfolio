"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#202123] border border-white/10 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-lg font-bold text-white">Application Error</h2>
        <p className="text-xs text-zinc-400">
          {error?.message || "An error occurred while loading this view."}
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#10a37f] hover:bg-[#10a37f]/90 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition"
        >
          Reset Application
        </button>
      </div>
    </div>
  );
}
