"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "How do I create my AI persona?",
    answer: "Simply click \"Start Building\" to open the Persona Builder. You can name your AI, choose a predefined personality template (like Curious, Sarcastic, or Friendly), write a custom backstory, and define its communication style. The AI will immediately adapt to your settings."
  },
  {
    question: "How is the confidence score calculated?",
    answer: "Our research engine analyzes conversation patterns in real-time. It evaluates how well the AI stays in character, the vocabulary depth, grammar consistency, and the natural flow of your replies. High-quality, realistic interactions increase the score."
  },
  {
    question: "What affects my payout?",
    answer: "Your payout is determined by your persona's final Confidence Score (which must be at least 70% to qualify) and the total volume of helpful messages exchanged. Higher scores and longer, high-quality chats unlock higher reward tiers."
  },
  {
    question: "When will I get paid?",
    answer: "Once you hit the $10 USD minimum payout threshold and request a withdrawal, payments are processed and sent directly to your registered PayPal account within 30 days of validation."
  },
  {
    question: "Do I need experience?",
    answer: "Not at all! This program is designed for everyone. As long as you can have natural conversations and are interested in experimenting with AI behaviors, you can participate and get paid."
  }
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className={`border-b border-schmooze-border pb-4 accordion-item ${isActive ? "active" : ""}`}>
            <button
              aria-expanded={isActive}
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left font-bold text-sm custom-accordion-header py-2 cursor-pointer focus:outline-none"
            >
              {faq.question}
              <span className="icon-plus text-xl transition-transform duration-300">
                +
              </span>
            </button>
            <div className="accordion-content">
              <p className="text-xs text-schmooze-gray pt-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
