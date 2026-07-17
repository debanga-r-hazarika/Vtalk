"use client";

import React, { useState, useRef } from "react";
import ChatSimulator from "../components/ChatSimulator";
import ScoreSimulator from "../components/ScoreSimulator";
import FAQAccordion from "../components/FAQAccordion";
import PersonaModal from "../components/PersonaModal";
import ApplyModal from "../components/ApplyModal";

export default function Home() {
  // Modal visibility states
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Persona State
  const [persona, setPersona] = useState({
    name: "Luna",
    personality: "Warm, curious",
    backstory: "A traveler who loves talks",
    avatar: "/avatars/indian_girl_1.png"
  });

  // Confidence Score Simulator States
  const [depth, setDepth] = useState(80);
  const [consistency, setConsistency] = useState(85);

  const howItWorksRef = useRef(null);

  // Boost sliders on user chat message
  const handleMessageSent = () => {
    setDepth((d) => Math.min(100, d + 2));
    setConsistency((c) => Math.min(100, c + 1));
  };

  const handleScrollToHowItWorks = (e) => {
    e.preventDefault();
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-schmooze-lime rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-schmooze-dark rounded-full"></div>
          </div>
          <span className="font-extrabold text-2xl tracking-tighter">V talk</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a onClick={handleScrollToHowItWorks} className="hover:text-schmooze-gray transition-colors cursor-pointer">How It Works</a>
          <a onClick={() => setIsApplyOpen(true)} className="hover:text-schmooze-gray transition-colors cursor-pointer">Why Join</a>
          <a onClick={() => setIsApplyOpen(true)} className="hover:text-schmooze-gray transition-colors cursor-pointer">Payout</a>
          <a onClick={handleScrollToHowItWorks} className="hover:text-schmooze-gray transition-colors cursor-pointer">FAQ</a>
          <a className="hover:text-schmooze-gray transition-colors cursor-pointer">About Us</a>
        </div>
        <button
          onClick={() => setIsApplyOpen(true)}
          className="bg-schmooze-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Apply Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 overflow-hidden w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-schmooze-border mb-6">
              <span className="text-schmooze-lime">✦</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-schmooze-gray">
                Paid AI Research Program
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-tight mb-8">
              Create Your AI Persona. Talk. Improve.{" "}
              <span className="bg-schmooze-lime px-2">Get Paid.</span>
            </h1>
            <p className="text-lg text-schmooze-gray leading-relaxed mb-10 max-w-lg">
              Create your own AI character by defining its personality, communication style, interests, memories, and behavior. Talk with your AI persona naturally. As conversation quality improves and your confidence score increases, unlock PayPal payouts.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsPersonaOpen(true)}
                className="bg-schmooze-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Start Building Your AI
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
              <button
                onClick={handleScrollToHowItWorks}
                className="bg-transparent border-2 border-schmooze-dark text-schmooze-dark px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-schmooze-dark hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                <span className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </span>
                How It Works
              </button>
            </div>
          </div>

          {/* Floating UI Elements Group */}
          <div className="relative flex justify-center">
            {/* Interactive Chat Simulator */}
            <ChatSimulator persona={persona} onMessageSent={handleMessageSent} />

            {/* Profile Card */}
            <div className="absolute -top-10 -right-4 md:-right-20 z-20 w-64 bg-white p-5 rounded-4xl shadow-xl card-shadow border border-schmooze-border transform rotate-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-schmooze-lime rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    id="card-avatar"
                    alt="Avatar"
                    src={persona.avatar}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm" id="card-persona-title">
                    {persona.name}
                  </p>
                  <p className="text-xs text-schmooze-gray">Edit your AI character</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-schmooze-gray">Name</span>{" "}
                  <span className="font-bold" id="card-persona-name">
                    {persona.name}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-schmooze-gray">Personality</span>{" "}
                  <span className="font-bold text-right" id="card-persona-personality">
                    {persona.personality.replace(", calm", "").replace(", curious", "").replace(", sarcastic", "").replace(", mystical", "").replace(", logical", "").replace(", funny", "")}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-schmooze-gray">Backstory</span>{" "}
                  <span className="font-bold text-right truncate max-w-[140px]" id="card-persona-backstory">
                    {persona.backstory}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsPersonaOpen(true)}
                className="w-full mt-4 bg-schmooze-lime py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer text-schmooze-dark"
                id="edit-persona-btn"
              >
                Edit Persona →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-32 w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 bg-white/50 border border-schmooze-border rounded-4xl p-8 card-shadow">
          <div className="text-center md:text-left">
            <div className="w-10 h-10 bg-schmooze-lime rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">🛡️</div>
            <h4 className="font-bold text-sm mb-1">Safe &amp; Private</h4>
            <p className="text-xs text-schmooze-gray">Data and conversations are secure.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-10 bg-schmooze-lime rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">👤</div>
            <h4 class="font-bold text-sm mb-1">Create Your Persona</h4>
            <p className="text-xs text-schmooze-gray">Built with custom personality configuration.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-10 bg-schmooze-lime rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">💬</div>
            <h4 className="font-bold text-sm mb-1">Talk Naturally</h4>
            <p className="text-xs text-schmooze-gray">Chat and help us train AI behaviors.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-10 bg-schmooze-lime rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">📈</div>
            <h4 className="font-bold text-sm mb-1">Confidence Score</h4>
            <p className="text-xs text-schmooze-gray">Natural, quality conversations boost score.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-10 bg-schmooze-lime rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">💰</div>
            <h4 className="font-bold text-sm mb-1">PayPal Payouts</h4>
            <p className="text-xs text-schmooze-gray">Unlock PayPal earnings above 70% score.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works-sec" ref={howItWorksRef} className="max-w-7xl mx-auto px-6 mb-32 w-full scroll-mt-6">
        <h2 className="text-center text-2xl font-bold uppercase tracking-widest mb-16">how it works</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Step 1 */}
          <div className="relative bg-white p-8 rounded-4xl card-shadow flex flex-col items-center text-center">
            <span className="absolute top-4 left-4 text-xs font-bold bg-schmooze-lime px-2 py-1 rounded-full">01</span>
            <div className="text-3xl mb-6 mt-4">📝</div>
            <h3 className="font-bold text-lg mb-3 leading-tight">Create Your Persona</h3>
            <p className="text-xs text-schmooze-gray">Design your AI character. Choose personality, backstory, and style.</p>
          </div>
          {/* Step 2 */}
          <div className="relative bg-white p-8 rounded-4xl card-shadow flex flex-col items-center text-center">
            <span className="absolute top-4 left-4 text-xs font-bold bg-schmooze-lime px-2 py-1 rounded-full">02</span>
            <div className="text-3xl mb-6 mt-4">💬</div>
            <h3 className="font-bold text-lg mb-3 leading-tight">Chat Naturally</h3>
            <p className="text-xs text-schmooze-gray">Talk with your AI persona naturally to train it.</p>
          </div>
          {/* Step 3 */}
          <div className="relative bg-white p-8 rounded-4xl card-shadow flex flex-col items-center text-center">
            <span className="absolute top-4 left-4 text-xs font-bold bg-schmooze-lime px-2 py-1 rounded-full">03</span>
            <div className="text-3xl mb-6 mt-4">⭐️</div>
            <h3 className="font-bold text-lg mb-3 leading-tight">Improve Quality</h3>
            <p className="text-xs text-schmooze-gray">System evaluates quality and flow in real-time.</p>
          </div>
          {/* Step 4 */}
          <div className="relative bg-white p-8 rounded-4xl card-shadow flex flex-col items-center text-center">
            <span className="absolute top-4 left-4 text-xs font-bold bg-schmooze-lime px-2 py-1 rounded-full">04</span>
            <div className="text-3xl mb-6 mt-4">🎯</div>
            <h3 className="font-bold text-lg mb-3 leading-tight">Reach Threshold</h3>
            <p className="text-xs text-schmooze-gray">Once score reaches 70% threshold, your payout unlocks.</p>
          </div>
          {/* Step 5 */}
          <div className="relative bg-white p-8 rounded-4xl card-shadow flex flex-col items-center text-center">
            <span className="absolute top-4 left-4 text-xs font-bold bg-schmooze-lime px-2 py-1 rounded-full">05</span>
            <div className="text-3xl mb-6 mt-4">💵</div>
            <h3 className="font-bold text-lg mb-3 leading-tight">Receive PayPal</h3>
            <p className="text-xs text-schmooze-gray">Get your payment via PayPal within 30 days.</p>
          </div>
        </div>
      </section>

      {/* Build & Payout Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Build Any Character Card */}
          <div className="lg:col-span-1 bg-schmooze-lime/30 rounded-4xl p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-tight mb-6">Build any character you imagine</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">👤</span> Choose their personality
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">📖</span> Set their backstory
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">💬</span> Define how they talk
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">🎨</span> Communication style
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">🧠</span> Set interests &amp; memories
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold">
                  <span className="bg-white p-1 rounded-md">⚡</span> Define behavior
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsPersonaOpen(true)}
              className="bg-schmooze-dark text-white w-full py-4 rounded-full font-bold mt-10 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              id="grid-build-btn"
            >
              Create Your Persona →
            </button>
          </div>

          {/* Interactive Range Sliders Simulator */}
          <ScoreSimulator
            depth={depth}
            setDepth={setDepth}
            consistency={consistency}
            setConsistency={setConsistency}
          />

          {/* Payout Details Card */}
          <div className="lg:col-span-1 bg-white border border-schmooze-border rounded-4xl p-10 card-shadow flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-8">Payout details</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-schmooze-lime/30 rounded-full flex items-center justify-center">💰</div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-schmooze-gray">Minimum Payout</p>
                  <p className="font-bold">$10 USD</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-schmooze-lime/30 rounded-full flex items-center justify-center">📈</div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-schmooze-gray">Earnings</p>
                  <p className="font-bold">$10 - Unlimited</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-schmooze-lime/30 rounded-full flex items-center justify-center">💳</div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-schmooze-gray">Method</p>
                  <p className="font-bold">PayPal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-schmooze-lime/30 rounded-full flex items-center justify-center">⏰</div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-schmooze-gray">Timeline</p>
                  <p className="font-bold">Within 30 Days</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsApplyOpen(true)}
              className="bg-schmooze-dark text-white w-full py-4 rounded-full font-bold mt-10 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              View Payout Guide →
            </button>
          </div>
        </div>
      </section>

      {/* Conversation Guide */}
      <section className="max-w-7xl mx-auto px-6 mb-32 w-full">
        <h2 className="text-center text-2xl font-bold uppercase tracking-widest mb-16">
          what makes great conversations?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-4">🌟</div>
            <h4 className="font-bold text-sm mb-1">Authentic</h4>
            <p className="text-xs text-schmooze-gray">Talk naturally and realistically.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h4 className="font-bold text-sm mb-1">Consistent</h4>
            <p className="text-xs text-schmooze-gray">Maintain character identity throughout.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">🗣️</div>
            <h4 className="font-bold text-sm mb-1">Talk Naturally</h4>
            <p className="text-xs text-schmooze-gray">Engage like you would with a friend.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">🗺️</div>
            <h4 className="font-bold text-sm mb-1">Explore Topics</h4>
            <p className="text-xs text-schmooze-gray">Try different scenarios and themes.</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">🤖</div>
            <h4 className="font-bold text-sm mb-1">Maintain Character</h4>
            <p className="text-xs text-schmooze-gray">Keep the AI's personality stable.</p>
          </div>
        </div>
      </section>

      {/* FAQ & Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ Accordion */}
          <div>
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">faq</h2>
            <FAQAccordion />
          </div>

          {/* Final CTA Card */}
          <div className="bg-schmooze-dark text-white rounded-4xl p-12 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-tight mb-4">Ready to build your AI persona?</h2>
              <p className="text-gray-400 mb-8 max-w-sm">
                Build your AI persona today and start earning by having meaningful conversations.
              </p>
            </div>
            <div className="relative z-10">
              <button
                onClick={() => setIsPersonaOpen(true)}
                className="bg-schmooze-lime text-schmooze-dark px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Start Building Now →
              </button>
            </div>
            {/* Decorative Icon */}
            <div className="absolute bottom-6 right-6 opacity-30">
              <svg className="w-24 h-24 text-schmooze-lime" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-12 w-full">
        <div className="bg-schmooze-lime rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">🧩</div>
            <div className="text-schmooze-dark">
              <h3 className="text-2xl font-extrabold">your conversations shape the future of ai.</h3>
              <p className="text-sm font-medium">Join thousands of contributors building smarter, more human-like AI.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsApplyOpen(true)}
              id="banner-apply-btn"
              className="bg-schmooze-dark text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Apply Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <div className="flex -space-x-3">
              <img
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATDSpKAB1fQWqbYCLwLskN2xKxqtphZgsIFLKFI_MyKQ7WMX3iMX_CGuVyVBQmUaRhBdPlnXdriHH82Sulrfd5Ddkj2vugyd_4LG-J4InrVb4FALr0IFDHvMV98Bw0c5sYMWAI_HD-y56jJY-D856zr-hygPpRXC6YgKR0AdRheOTFbrr2HJ2zfBA66aLU_pC3D1jvtYt3MVJp8NdrJMKWTZlATo7DaH2sxAis1lWhDmSzpbj_JtGCbQ"
              />
              <img
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQh0kgi_AL_SZ8eQlZKTAuQKhIcbvShUtDFa-CfxnCGLDr98u7piAsKJBWUvfSxUIsgCVNsP4Gm4tjPm8xoRrhvRONC5bSH-LKZD35iJoKErR-Dsu0ksoObjSiOd0POzo4s9fDWPHbGv7-YHBUq27u7iIkFTuz-cf8BZKeKC_80S1JKNuJWhBtJX3KVKSpVXyyvNCEmkCC6AP4tgIZE6Y6BYQ1mHJ86czswt0tDufm-G33n3lmTUS6g"
              />
              <img
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg00S-Te1XfdqVY4vXEfjmN6yc6pY4da8QigaWCHyR2-ZiGg5Ol6a6MQ0GlzPljPyzLfty3MjNMtakLf8T3tnHTCqj0yll3JWyFNTh0XTLFkmruWMKR4XJwaqDll0Y0KyxgEJ0NzPp_2Eprhaz0Vvb2T7MTuo1gd2MerK3wD0gw-9MYVLWINAVfmfS8-5g5m3rKLUXDju2Dsi_fIfGlnzk-Q5j4wSAInvFrsLAo06M3yiBlGJgmfCHUg"
              />
              <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-bold text-schmooze-dark">
                +1k
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 w-full flex flex-col md:flex-row items-center justify-between border-t border-schmooze-border">
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <div className="w-6 h-6 bg-schmooze-lime rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-schmooze-dark rounded-full"></div>
          </div>
          <span className="font-extrabold text-xl tracking-tighter">V talk</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase text-schmooze-gray">
          <a className="hover:text-schmooze-dark cursor-pointer">About Us</a>
          <a className="hover:text-schmooze-dark cursor-pointer">Privacy Policy</a>
          <a className="hover:text-schmooze-dark cursor-pointer">Terms of Service</a>
          <a className="hover:text-schmooze-dark cursor-pointer">Contact Us</a>
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <a className="p-2 bg-white border border-schmooze-border rounded-full hover:bg-schmooze-lime transition-colors text-schmooze-dark cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a className="p-2 bg-white border border-schmooze-border rounded-full hover:bg-schmooze-lime transition-colors text-schmooze-dark cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </a>
          <a className="p-2 bg-white border border-schmooze-border rounded-full hover:bg-schmooze-lime transition-colors text-schmooze-dark cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
          </a>
        </div>
      </footer>

      {/* Modals */}
      <PersonaModal
        isOpen={isPersonaOpen}
        onClose={() => setIsPersonaOpen(false)}
        persona={persona}
        onSave={(updated) => {
          setPersona(updated);
          setIsPersonaOpen(false);
          setIsApplyOpen(true);
        }}
      />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
