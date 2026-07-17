"use client";

import React from "react";

export default function ScoreSimulator({ depth, setDepth, consistency, setConsistency }) {
  const score = Math.round((depth + consistency) / 2);
  const isUnlocked = score >= 70;
  const earnings = isUnlocked ? (score - 69) * 0.8 + 10 : 0;

  return (
    <div className="lg:col-span-1 bg-white border border-schmooze-border rounded-4xl p-6 sm:p-8 text-center card-shadow flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Track confidence &amp; earnings</h2>
      <p className="text-xs text-schmooze-gray mb-6">
        The better your conversations, the higher your score.
      </p>

      {/* Progress ring dial */}
      <div
        className="relative w-44 h-44 circular-progress rounded-full flex items-center justify-center mb-6"
        style={{
          "--progress-val": `${score}%`,
          "--progress-color": isUnlocked ? "#EBFFAF" : "#FCA5A5",
        }}
      >
        <div className="z-10 text-center">
          <span className="text-4xl font-extrabold" id="score-percentage-text">
            {score}%
          </span>
          <p className="text-[9px] font-bold text-schmooze-gray uppercase mt-1">
            Confidence Score
          </p>
        </div>
      </div>

      {/* Sliders */}
      <div className="w-full space-y-3 mb-6 text-left">
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span>Conversation Depth</span>
            <span>{depth}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="custom-slider cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span>Roleplay Consistency</span>
            <span>{consistency}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={consistency}
            onChange={(e) => setConsistency(parseInt(e.target.value))}
            className="custom-slider cursor-pointer"
          />
        </div>
      </div>

      {/* Unlock / Payout status box */}
      <div
        className={`rounded-2xl p-4 w-full flex items-center gap-3 transition-all duration-300 ${
          isUnlocked
            ? "bg-green-50/80 border border-green-200"
            : "bg-gray-50 border border-transparent"
        }`}
      >
        <span className="text-xl">
          {isUnlocked ? "🔓" : "🔒"}
        </span>
        <div className="text-left">
          <p className="font-bold text-sm">
            {isUnlocked ? "Payout Unlocked" : "Payout Locked"}
          </p>
          <p className="text-xs text-schmooze-gray">
            {isUnlocked
              ? `Est. Earnings: $${earnings.toFixed(2)}`
              : "Minimum 70% score required"}
          </p>
        </div>
      </div>
    </div>
  );
}
