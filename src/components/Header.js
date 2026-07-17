"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ onApplyClick }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollAnchor = (e, targetId) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full relative z-50">
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-schmooze-lime rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-schmooze-dark rounded-full"></div>
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-schmooze-dark">V talk</span>
        </Link>
        
        {/* Desktop Navigation */}
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

        <div className="flex items-center gap-3">
          <button
            onClick={onApplyClick}
            className="bg-schmooze-dark text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Apply Now
            <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white border border-schmooze-border text-schmooze-dark hover:bg-gray-50 cursor-pointer focus:outline-none transition-all"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-schmooze-border shadow-lg transition-all duration-300 md:hidden overflow-hidden ${
          isOpen ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-5 font-bold text-base text-schmooze-dark">
          <Link
            href="/#how-it-works-sec"
            onClick={(e) => handleScrollAnchor(e, "how-it-works-sec")}
            className="hover:text-schmooze-gray transition-colors cursor-pointer w-full text-center py-1"
          >
            How It Works
          </Link>
          <Link
            href="/payout"
            onClick={() => setIsOpen(false)}
            className="hover:text-schmooze-gray transition-colors cursor-pointer w-full text-center py-1"
          >
            Payout
          </Link>
          <Link
            href="/#how-it-works-sec"
            onClick={(e) => handleScrollAnchor(e, "how-it-works-sec")}
            className="hover:text-schmooze-gray transition-colors cursor-pointer w-full text-center py-1"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-schmooze-gray transition-colors cursor-pointer w-full text-center py-1"
          >
            About Us
          </Link>
        </div>
      </div>
    </header>
  );
}
