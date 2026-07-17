"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplyModal from "../../components/ApplyModal";

export default function TermsPage() {
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
              Terms &amp; Guidelines
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-schmooze-gray mt-2">Last Updated: July 17, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 rounded-4xl border border-schmooze-border card-shadow space-y-8 text-sm text-schmooze-gray leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">1. Program Scope &amp; Eligibility</h2>
            <p>
              By accessing <strong>V talk</strong> and participating in our AI Dating App Onboarding/Testing Program, you warrant that you are at least 18 years of age and hold a valid PayPal account. 
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">2. Tester Conduct &amp; Safety</h2>
            <p>
              We are dedicated to building safe, respectful, and engaging conversation models. When talking to simulated AI personas:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not inject malicious, abusive, or explicitly illegal prompts.</li>
              <li>Do not seek to gather or expose credentials or private databanks from the AI models.</li>
              <li>Maintain natural interaction patterns simulating typical dating app environments.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">3. Payout Conditions</h2>
            <p>
              Payouts are conditioned on meeting and maintaining quality thresholds:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Confidence Score:</strong> Your simulated conversations must hit a minimum 70% Confidence Score (determined dynamically by evaluating conversation depth and consistency).</li>
              <li><strong>Verification Period:</strong> Once requested, payments are processed and sent to your PayPal email address within 30 days after data quality validation completes.</li>
              <li><strong>Minimum Payout:</strong> The minimum threshold to request a withdrawal is $10 USD.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">4. Termination of Accounts</h2>
            <p>
              We reserve the right to suspend accounts or refuse payouts if we detect bot scripting, automated messaging hacks, or persistent violations of our tester conduct policies.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
