"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplyModal from "../../components/ApplyModal";

export default function PayoutPage() {
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
              Earnings Guide
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">Payout &amp; Rewards</h1>
          <p className="text-lg text-schmooze-gray mt-4 max-w-xl mx-auto leading-relaxed">
            Understand how conversation quality translates to PayPal payouts.
          </p>
        </div>

        {/* Content Details */}
        <div className="space-y-12">
          {/* Rules Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-schmooze-border p-6 rounded-4xl card-shadow">
              <span className="text-2xl">💰</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Minimum Limit</h4>
              <p className="text-xs text-schmooze-gray">Withdraw once your account reaches $10 USD.</p>
            </div>
            <div className="bg-schmooze-lime/30 p-6 rounded-4xl">
              <span className="text-2xl">📈</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Score Requirement</h4>
              <p className="text-xs text-schmooze-gray">Maintain a 70%+ Confidence Score during chats.</p>
            </div>
            <div className="bg-white border border-schmooze-border p-6 rounded-4xl card-shadow">
              <span className="text-2xl">⏰</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Timeline</h4>
              <p className="text-xs text-schmooze-gray">Payments are verified and processed within 30 days.</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-4xl border border-schmooze-border card-shadow">
            <h2 className="text-2xl font-bold mb-6 text-left">Payout Tiers &amp; Estimation</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[550px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-schmooze-gray font-bold">
                    <th className="py-3 pr-4">Confidence Tier</th>
                    <th className="py-3 px-4">Score Range</th>
                    <th className="py-3 px-4">Estimated Earnings</th>
                    <th className="py-3 pl-4">Review Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="py-4 pr-4 font-bold">🥉 Basic Tier</td>
                    <td className="py-4 px-4 text-schmooze-gray">70% - 79%</td>
                    <td className="py-4 px-4 text-green-600 font-bold">$10.00 - $25.00</td>
                    <td className="py-4 pl-4 text-schmooze-gray">Weekly</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold">🥈 Silver Tier</td>
                    <td className="py-4 px-4 text-schmooze-gray">80% - 89%</td>
                    <td className="py-4 px-4 text-green-600 font-bold">$25.00 - $50.00</td>
                    <td className="py-4 pl-4 text-schmooze-gray">Bi-weekly</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold">🥇 Gold Tier</td>
                    <td className="py-4 px-4 text-schmooze-gray">90% - 100%</td>
                    <td className="py-4 px-4 text-green-600 font-bold">$50.00+ / session</td>
                    <td className="py-4 pl-4 text-schmooze-gray">Real-time</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-schmooze-gray leading-normal mt-6">
              * Note: Estimated earnings fluctuate based on message volume, conversation depth, and alignment with target dating testing scenarios (e.g. flirting success, safety boundaries).
            </p>
          </div>

          {/* Guide steps */}
          <div className="bg-white p-8 md:p-12 rounded-4xl border border-schmooze-border card-shadow space-y-6">
            <h2 className="text-2xl font-bold">How to claim your payouts:</h2>
            <div className="space-y-4 text-xs leading-relaxed text-schmooze-gray">
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-schmooze-lime rounded-full flex items-center justify-center font-bold text-schmooze-dark shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-schmooze-dark text-sm mb-0.5">Submit Application</h4>
                  <p>Apply for the onboarding survey with your details and PayPal account.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-schmooze-lime rounded-full flex items-center justify-center font-bold text-schmooze-dark shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-schmooze-dark text-sm mb-0.5">Conduct Simulations</h4>
                  <p>Once approved, chat naturally with AI dating app personas, testing various communication styles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 bg-schmooze-lime rounded-full flex items-center justify-center font-bold text-schmooze-dark shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-schmooze-dark text-sm mb-0.5">Withdraw Earnings</h4>
                  <p>When account balance hits $10 USD, request withdrawal. Payments clear via PayPal within 30 days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-schmooze-dark text-white p-8 md:p-12 rounded-4xl text-center space-y-6">
            <h2 className="text-3xl font-extrabold">Ready to start earning?</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Complete the onboarding survey and start testing dating app conversational models today.
            </p>
            <button
              onClick={() => setIsApplyOpen(true)}
              className="bg-schmooze-lime text-schmooze-dark px-8 py-3.5 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Onboard Now →
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
