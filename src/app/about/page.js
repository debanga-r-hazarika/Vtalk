"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplyModal from "../../components/ApplyModal";

export default function AboutPage() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <>
      <Header onApplyClick={() => setIsApplyOpen(true)} />

      <main className="max-w-4xl mx-auto px-6 py-20 text-schmooze-dark">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-schmooze-border mb-4">
            <span className="text-schmooze-lime">✦</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-schmooze-gray">
              Who We Are
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">About V talk</h1>
          <p className="text-lg text-schmooze-gray mt-4 max-w-xl mx-auto leading-relaxed">
            Evaluating conversational romance and companion AI through natural human interaction.
          </p>
        </div>

        {/* Content Details */}
        <div className="space-y-12">
          {/* Mission */}
          <div className="bg-white p-8 md:p-12 rounded-4xl border border-schmooze-border card-shadow">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-sm text-schmooze-gray leading-relaxed mb-4">
              At <strong>V talk</strong>, we believe the next frontier of artificial intelligence isn't just logical reasoning, but emotional resonance. Conversational agents in dating apps require deep empathy, humor, and appropriate boundary-awareness. 
            </p>
            <p className="text-sm text-schmooze-gray leading-relaxed">
              We connect passionate human testers with custom AI models to simulate dating app interactions. By evaluating conversation depth and character consistency, our contributors help train models to be safe, authentic, and engaging companions.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-schmooze-lime/30 p-8 rounded-4xl">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold mt-4 mb-2">Simulated Dating App Testing</h3>
              <p className="text-xs text-schmooze-gray leading-relaxed">
                We focus entirely on the dating and matchmaking niche. Our agents are evaluated on first impressions, casual flirting, deep compatibility, and ghosting mitigation.
              </p>
            </div>
            <div className="bg-white border border-schmooze-border p-8 rounded-4xl card-shadow">
              <span className="text-2xl">🛡️</span>
              <h3 className="text-lg font-bold mt-4 mb-2">Anonymized Data Security</h3>
              <p className="text-xs text-schmooze-gray leading-relaxed">
                Privacy is our absolute priority. All simulated conversation logs are anonymized and stripped of personally identifiable information before being analyzed by researchers.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-schmooze-dark text-white p-8 md:p-12 rounded-4xl text-center space-y-6">
            <h2 className="text-3xl font-extrabold">Help Us Shape the Future</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Join our exclusive panel of AI dating app testers today. Create a persona, have natural conversations, and earn payouts.
            </p>
            <button
              onClick={() => setIsApplyOpen(true)}
              className="bg-schmooze-lime text-schmooze-dark px-8 py-3.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Apply for Tester Panel →
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
