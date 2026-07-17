"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ onApplyClick }) {
  const pathname = usePathname();

  const handleScrollAnchor = (e, targetId) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-schmooze-lime rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-schmooze-dark rounded-full"></div>
        </div>
        <span className="font-extrabold text-2xl tracking-tighter text-schmooze-dark">V talk</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 font-medium text-sm text-schmooze-dark">
        <Link
          href="/#how-it-works-sec"
          onClick={(e) => handleScrollAnchor(e, "how-it-works-sec")}
          className="hover:text-schmooze-gray transition-colors cursor-pointer"
        >
          How It Works
        </Link>
        <Link href="/payout" className="hover:text-schmooze-gray transition-colors cursor-pointer">
          Payout
        </Link>
        <Link
          href="/#how-it-works-sec"
          onClick={(e) => handleScrollAnchor(e, "how-it-works-sec")}
          className="hover:text-schmooze-gray transition-colors cursor-pointer"
        >
          FAQ
        </Link>
        <Link href="/about" className="hover:text-schmooze-gray transition-colors cursor-pointer">
          About Us
        </Link>
      </div>
      <button
        onClick={onApplyClick}
        className="bg-schmooze-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
      >
        Apply Now
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </button>
    </nav>
  );
}
