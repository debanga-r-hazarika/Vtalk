"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 w-full flex flex-col md:flex-row items-center justify-between border-t border-schmooze-border">
      <Link href="/" className="flex items-center gap-2 mb-6 md:mb-0 cursor-pointer">
        <div className="w-6 h-6 bg-schmooze-lime rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-schmooze-dark rounded-full"></div>
        </div>
        <span className="font-extrabold text-xl tracking-tighter text-schmooze-dark">V talk</span>
      </Link>
      <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase text-schmooze-gray">
        <Link href="/about" className="hover:text-schmooze-dark cursor-pointer">
          About Us
        </Link>
        <Link href="/privacy" className="hover:text-schmooze-dark cursor-pointer">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-schmooze-dark cursor-pointer">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
