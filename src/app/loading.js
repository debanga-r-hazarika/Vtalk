"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FAFAF5] flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-6">
        {/* Premium Rotating & Pulsing Logo Loader */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Ripple effect rings */}
          <div className="absolute inset-0 bg-[#EBFFAF] rounded-full opacity-60 animate-ping"></div>
          <div className="absolute inset-2 bg-[#EBFFAF] rounded-full opacity-80 animate-pulse"></div>
          
          {/* Main Logo Container */}
          <div className="relative w-16 h-16 bg-[#EBFFAF] rounded-full flex items-center justify-center shadow-md border-2 border-black/5 animate-[spin_3s_linear_infinite]">
            {/* Off-center black dot that orbits/spins inside */}
            <div className="w-6 h-6 bg-black rounded-full translate-x-1 translate-y-1"></div>
          </div>
        </div>

        {/* Text Loader */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 rounded-full bg-black animate-bounce"></span>
          </div>
          <h1 className="font-extrabold text-2xl tracking-tighter text-black">
            V talk
          </h1>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
            Initializing AI Sandbox
          </p>
        </div>
      </div>
    </div>
  );
}
