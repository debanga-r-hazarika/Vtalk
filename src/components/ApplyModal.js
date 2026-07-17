"use client";

import React, { useState } from "react";

const countriesList = [
  { name: "United States", code: "+1" },
  { name: "China", code: "+86" },
  { name: "Singapore", code: "+65" },
  { name: "India", code: "+91" },
  { name: "South Korea", code: "+82" },
  { name: "Japan", code: "+81" },
  { name: "Canada", code: "+1" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "Israel", code: "+972" },
  { name: "Taiwan", code: "+886" }
];

export default function ApplyModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [experience, setExperience] = useState("");
  const [hours, setHours] = useState("");
  const [hasCreatedAgents, setHasCreatedAgents] = useState("");
  const [intentReason, setIntentReason] = useState("");

  const [personaName, setPersonaName] = useState("");
  const [domain, setDomain] = useState("");
  const [toneDetails, setToneDetails] = useState("");
  const [safetyGuardrails, setSafetyGuardrails] = useState("");

  const [payoutMethod, setPayoutMethod] = useState("");
  const [paypal, setPaypal] = useState("");
  const [agreeScore, setAgreeScore] = useState(false);
  const [agreeTranscripts, setAgreeTranscripts] = useState(false);

  const [errors, setErrors] = useState({});

  const handleCountryChange = (cName) => {
    setCountry(cName);
    const found = countriesList.find((item) => item.name === cName);
    if (found) {
      setPhone(found.code + " ");
    } else {
      setPhone("");
    }
  };

  if (!isOpen) return null;

  const handleNext = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!name.trim()) nextErrors.name = "Full name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        nextErrors.email = "A valid email address is required";
      }
      if (!phone.trim()) nextErrors.phone = "Phone number is required";
      if (!country.trim()) nextErrors.country = "Country is required";

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (!experience) nextErrors.experience = "Please select your experience level";
      if (!hours) nextErrors.hours = "Please select your weekly commitment";
      if (!hasCreatedAgents) nextErrors.hasCreatedAgents = "Please select an option";
      if (!intentReason.trim() || intentReason.trim().length < 15) {
        nextErrors.intentReason = "Please describe your intent (minimum 15 characters)";
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      if (!personaName.trim()) nextErrors.personaName = "AI Character name idea is required";
      if (!domain) nextErrors.domain = "Please select a domain";
      if (!toneDetails.trim() || toneDetails.trim().length < 15) {
        nextErrors.toneDetails = "Please describe the tone and audience (minimum 15 characters)";
      }
      if (!safetyGuardrails) nextErrors.safetyGuardrails = "Please select a guardrail option";

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      setStep(4);
    } else if (step === 4) {
      if (!payoutMethod) nextErrors.payoutMethod = "Please select a payout method";
      if (payoutMethod === "PayPal" && (!paypal.trim() || !/\S+@\S+\.\S+/.test(paypal))) {
        nextErrors.paypal = "A valid PayPal email is required";
      }
      if (!agreeScore) nextErrors.agreeScore = "You must acknowledge the score threshold";
      if (!agreeTranscripts) nextErrors.agreeTranscripts = "You must agree to the data policy";

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      setStep(5); // Success step
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setExperience("");
    setHours("");
    setHasCreatedAgents("");
    setIntentReason("");
    setPersonaName("");
    setDomain("");
    setToneDetails("");
    setSafetyGuardrails("");
    setPayoutMethod("");
    setPaypal("");
    setAgreeScore(false);
    setAgreeTranscripts(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) handleClose();
      }}
    >
      <div className="modal-container max-w-lg w-[95%] max-h-[90vh] flex flex-col justify-between p-6 md:p-8 bg-white rounded-4xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100 w-full">
          <div>
            {step < 5 && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-schmooze-gray mb-1">
                Step {step} of 4
              </p>
            )}
            <h3 className="text-lg sm:text-xl font-extrabold text-schmooze-dark leading-tight">
              {step < 5 ? "Onboarding Survey" : "Application Completed"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-black text-2xl font-semibold cursor-pointer focus:outline-none ml-4 leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 chat-messages-container text-left text-sm text-schmooze-dark">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-schmooze-gray">
                1. Contact Details
              </h4>
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.name ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.email ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Country of Residence</label>
                <select
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs bg-white ${
                    errors.country ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                >
                  <option value="">Select country...</option>
                  {countriesList.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-[10px] text-red-500 mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.phone ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="+1 (555) 019-2834"
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Experience & Intent */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-schmooze-gray">
                2. Experience &amp; Dedication
              </h4>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  How much experience do you have testing AI products?
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none text-xs bg-white"
                >
                  <option value="">Select experience level...</option>
                  <option value="None">None (Just getting started)</option>
                  <option value="Beginner">Beginner (Used ChatGPT or similar tools)</option>
                  <option value="Intermediate">Intermediate (Familiar with prompts &amp; AI personas)</option>
                  <option value="Expert">Expert (Developer / Professional prompt engineer)</option>
                </select>
                {errors.experience && <p className="text-[10px] text-red-500 mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  How many hours per week can you contribute?
                </label>
                <select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none text-xs bg-white"
                >
                  <option value="">Select commitment...</option>
                  <option value="1-5">1 - 5 hours / week</option>
                  <option value="5-10">5 - 10 hours / week</option>
                  <option value="10-20">10 - 20 hours / week</option>
                  <option value="20+">20+ hours / week</option>
                </select>
                {errors.hours && <p className="text-[10px] text-red-500 mt-1">{errors.hours}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Have you ever created custom agents/characters in other platforms?
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="createdAgents"
                      value="Yes"
                      checked={hasCreatedAgents === "Yes"}
                      onChange={(e) => setHasCreatedAgents(e.target.value)}
                      className="accent-black"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="createdAgents"
                      value="No"
                      checked={hasCreatedAgents === "No"}
                      onChange={(e) => setHasCreatedAgents(e.target.value)}
                      className="accent-black"
                    />
                    No
                  </label>
                </div>
                {errors.hasCreatedAgents && <p className="text-[10px] text-red-500 mt-1">{errors.hasCreatedAgents}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Why do you want to participate in this AI persona research?
                </label>
                <textarea
                  rows={3}
                  value={intentReason}
                  onChange={(e) => setIntentReason(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.intentReason ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="Describe your motivation and targets..."
                />
                {errors.intentReason && <p className="text-[10px] text-red-500 mt-1">{errors.intentReason}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Character Design details */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-schmooze-gray">
                3. Character Blueprint Design
              </h4>

              <div>
                <label className="block text-xs font-semibold mb-1">AI Character Name Idea</label>
                <input
                  type="text"
                  value={personaName}
                  onChange={(e) => setPersonaName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.personaName ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="e.g. Einstein, Mentor, Chef Tony"
                />
                {errors.personaName && <p className="text-[10px] text-red-500 mt-1">{errors.personaName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Primary Testing Scenario / Niche</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none text-xs bg-white"
                >
                  <option value="">Select testing niche...</option>
                  <option value="Casual Flirting">Casual Flirting &amp; Banter</option>
                  <option value="Deep Conversation">Deep Compatibility &amp; Romance</option>
                  <option value="Icebreakers">Icebreaker &amp; First Impressions</option>
                  <option value="Boundary Testing">Safety &amp; Boundary Violations</option>
                  <option value="Bot Verification">Fake Profiles &amp; Bot Behaviors</option>
                  <option value="Conflict Simulation">Dating Conflict &amp; Ghosting</option>
                  <option value="Other">Other Dating Scenarios</option>
                </select>
                {errors.domain && <p className="text-[10px] text-red-500 mt-1">{errors.domain}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Describe target audience &amp; primary tone (e.g. strict teacher, helpful buddy)
                </label>
                <textarea
                  rows={3}
                  value={toneDetails}
                  onChange={(e) => setToneDetails(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                    errors.toneDetails ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                  }`}
                  placeholder="Include communication style details..."
                />
                {errors.toneDetails && <p className="text-[10px] text-red-500 mt-1">{errors.toneDetails}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Does your character require strict safety guardrails?
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="safety"
                      value="Yes"
                      checked={safetyGuardrails === "Yes"}
                      onChange={(e) => setSafetyGuardrails(e.target.value)}
                      className="accent-black"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="safety"
                      value="No"
                      checked={safetyGuardrails === "No"}
                      onChange={(e) => setSafetyGuardrails(e.target.value)}
                      className="accent-black"
                    />
                    No
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="safety"
                      value="Unsure"
                      checked={safetyGuardrails === "Unsure"}
                      onChange={(e) => setSafetyGuardrails(e.target.value)}
                      className="accent-black"
                    />
                    Unsure
                  </label>
                </div>
                {errors.safetyGuardrails && <p className="text-[10px] text-red-500 mt-1">{errors.safetyGuardrails}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Payout & Policy Verification */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-schmooze-gray">
                4. Payouts &amp; Transcripts Agreement
              </h4>

              <div>
                <label className="block text-xs font-semibold mb-1">Preferred Payout Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none text-xs bg-white"
                >
                  <option value="">Select payout method...</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Gift Card">Amazon Gift Cards</option>
                </select>
                {errors.payoutMethod && <p className="text-[10px] text-red-500 mt-1">{errors.payoutMethod}</p>}
              </div>

              {payoutMethod === "PayPal" && (
                <div>
                  <label className="block text-xs font-semibold mb-1">PayPal Email Address</label>
                  <input
                    type="email"
                    value={paypal}
                    onChange={(e) => setPaypal(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none text-xs ${
                      errors.paypal ? "border-red-400 focus:ring-1 focus:ring-red-300" : "border-schmooze-border focus:ring-1 focus:ring-schmooze-lime"
                    }`}
                    placeholder="paypal@example.com"
                  />
                  {errors.paypal && <p className="text-[10px] text-red-500 mt-1">{errors.paypal}</p>}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs leading-normal">
                  <input
                    type="checkbox"
                    checked={agreeScore}
                    onChange={(e) => setAgreeScore(e.target.checked)}
                    className="mt-0.5 accent-black"
                  />
                  <span>
                    I acknowledge that I must hit and maintain a minimum 70% Confidence Score to qualify for PayPal payouts.
                  </span>
                </label>
                {errors.agreeScore && <p className="text-[10px] text-red-500">{errors.agreeScore}</p>}

                <label className="flex items-start gap-2 cursor-pointer text-xs leading-normal">
                  <input
                    type="checkbox"
                    checked={agreeTranscripts}
                    onChange={(e) => setAgreeTranscripts(e.target.checked)}
                    className="mt-0.5 accent-black"
                  />
                  <span>
                    I agree that my conversation transcripts can be used in anonymized formats for AI research and quality validation.
                  </span>
                </label>
                {errors.agreeTranscripts && <p className="text-[10px] text-red-500">{errors.agreeTranscripts}</p>}
              </div>
            </div>
          )}

          {/* Success Step (Step 5) */}
          {step === 5 && (
            <div className="space-y-4 text-center py-6">
              <div className="w-16 h-16 bg-schmooze-lime rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                🎉
              </div>
              <h4 className="text-lg font-bold text-schmooze-dark">Application Submitted!</h4>
              <p className="text-xs text-schmooze-gray leading-relaxed max-w-sm mx-auto">
                Thanks for your interest! We will get back to you with your approval update. Once approved, you can start testing and unlocking payouts.
              </p>
            </div>
          )}
        </div>

        {/* Buttons Footer */}
        <div className="pt-4 border-t border-gray-100 flex gap-4">
          {step < 5 && (
            <>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border border-schmooze-dark py-2.5 rounded-full text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all cursor-pointer text-schmooze-dark"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-schmooze-dark text-white py-2.5 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                {step === 4 ? "Submit Application" : "Next Step"}
              </button>
            </>
          )}
          {step === 5 && (
            <button
              onClick={handleClose}
              className="w-full bg-schmooze-dark text-white py-3 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
