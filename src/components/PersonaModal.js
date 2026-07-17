"use client";

import React, { useState, useEffect } from "react";

const avatarPresets = [
  "/avatars/indian_girl_1.png",
  "/avatars/indian_girl_2.png",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
  "/avatars/us_girl_1.png",
  "/avatars/us_girl_2.png",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
  "/avatars/boy_1.png",
  "/avatars/boy_2.png",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200"
];

const personalityTags = [
  "Warm, curious",
  "Spicy, formal",
  "Witty, sarcastic",
  "Professional, calm",
  "Creative, mystical",
  "Quiet, logical",
  "Energetic, funny",
  "Emotional support"
];

export default function PersonaModal({ isOpen, onClose, persona, onSave }) {
  const [name, setName] = useState("");
  const [backstory, setBackstory] = useState("");
  const [avatar, setAvatar] = useState("");
  const [personality, setPersonality] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync state with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(persona.name);
      setBackstory(persona.backstory);
      setAvatar(persona.avatar);
      setPersonality(persona.personality);
    }
  }, [isOpen, persona]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: name.trim() || "Luna",
      backstory: backstory.trim() || "A traveler who loves talks",
      avatar: avatar || avatarPresets[0],
      personality: personality || personalityTags[0],
    });
  };

  return (
    <div
      className={`modal-overlay active`}
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-container">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Configure Persona</h3>
          <button
            onClick={onClose}
            className="modal-close text-gray-400 hover:text-black text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Avatar preset selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-schmooze-gray mb-1">
              Avatar Preset
            </label>
            <div className="flex gap-3 overflow-x-auto py-2">
              {avatarPresets.map((imgUrl, idx) => {
                const isActive = avatar === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(imgUrl)}
                    className={`avatar-option w-12 h-12 rounded-full border-2 p-0.5 overflow-hidden cursor-pointer transition-all ${isActive ? "border-schmooze-lime scale-105" : "border-transparent hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={imgUrl}
                      className="w-full h-full rounded-full object-cover"
                      alt="Preset option"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label htmlFor="persona-name-input" className="block text-xs font-bold uppercase tracking-wider text-schmooze-gray mb-1">
              Name
            </label>
            <input
              type="text"
              id="persona-name-input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none"
            />
          </div>

          {/* Personality Profile tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-schmooze-gray mb-1">
              Personality Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(isExpanded ? personalityTags : personalityTags.slice(0, 5)).map((tagVal) => {
                const isSelected = personality === tagVal;
                // Human readable formatting
                const label = tagVal
                  .replace(", calm", "")
                  .replace(", curious", "")
                  .replace(", sarcastic", "")
                  .replace(", mystical", "")
                  .replace(", logical", "")
                  .replace(", funny", "")
                  .replace(", formal", "");
                return (
                  <button
                    key={tagVal}
                    type="button"
                    onClick={() => setPersonality(tagVal)}
                    className={`text-[10px] py-2 px-1 rounded-lg font-semibold transition-colors cursor-pointer text-center truncate ${isSelected
                        ? "bg-schmooze-dark text-white tag-active"
                        : "bg-gray-100 hover:bg-gray-200 text-schmooze-dark"
                      }`}
                  >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] py-2 rounded-lg font-bold bg-schmooze-lime hover:opacity-90 text-schmooze-dark cursor-pointer flex items-center justify-center transition-all"
              >
                {isExpanded ? "Less ▲" : "+ More"}
              </button>
            </div>
          </div>

          {/* Backstory */}
          <div>
            <label htmlFor="persona-backstory-input" className="block text-xs font-bold uppercase tracking-wider text-schmooze-gray mb-1">
              Backstory
            </label>
            <textarea
              id="persona-backstory-input"
              rows={2}
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              className="w-full px-4 py-2 border border-schmooze-border rounded-xl focus:ring-schmooze-lime focus:border-schmooze-lime focus:outline-none text-xs"
              placeholder="Describe their backstory..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 border border-schmooze-dark py-3 rounded-full text-sm font-bold hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 bg-schmooze-dark text-white py-3 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Save &amp; Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
