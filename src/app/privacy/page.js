"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApplyModal from "../../components/ApplyModal";

export default function PrivacyPage() {
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
              Legal
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-schmooze-gray mt-2">Last Updated: July 17, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 rounded-4xl border border-schmooze-border card-shadow space-y-8 text-sm text-schmooze-gray leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">1. Overview</h2>
            <p>
              Welcome to <strong>V talk</strong>. We are committed to protecting the privacy and security of our users and contributors. This Privacy Policy details how we collect, process, anonymize, and store data gathered through our AI Dating App Tester onboarding and simulation sandbox.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">2. Information We Collect</h2>
            <p>
              We collect information in two main categories:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Onboarding &amp; Profile Details:</strong> Full name, email address, phone number, and PayPal address collected during the onboarding survey.
              </li>
              <li>
                <strong>Simulated Chat Logs:</strong> Conversation logs exchanged with the AI personas in our testing sandbox.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">3. Anonymization &amp; Research Use</h2>
            <p>
              To protect contributor identity, all conversation transcript logs are fully anonymized. Prior to review by machine learning researchers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All personally identifiable information (PII) such as phone numbers, names, or locations is programmatically stripped.</li>
              <li>Anonymized logs are analyzed solely to evaluate conversational depth, roleplay consistency, and dating model safety boundaries.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">4. Payment Processing Data</h2>
            <p>
              Payouts are processed directly using the PayPal email address provided. We do not store financial credentials (credit cards or bank details) on our servers. All transaction details are processed securely via PayPal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-schmooze-dark">5. Contact Information</h2>
            <p>
              If you have any questions or data removal requests regarding our privacy guidelines, please reach out to our privacy compliance desk at <strong>privacy@vtalk.ai</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
