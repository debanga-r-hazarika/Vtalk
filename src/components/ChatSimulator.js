"use client";

import React, { useState, useEffect, useRef } from "react";

const responses = {
  "Warm, curious": [
    "Hey! I'm Luna. What's something fun you did today?",
    "That sounds so interesting! Tell me, what got you started with that?",
    "Oh, I'd love to know more. What was your favorite part of that experience?",
    "That's lovely. It really makes me think about how we spend our time.",
    "Wow! Thanks for sharing that with me. What else is on your mind?",
    "Fascinating. I'm always curious about different perspectives on this."
  ],
  "Witty, sarcastic": [
    "Oh, wonderful. Another human talking to me. How thrilling. 🙄",
    "Let me guess: you're going to ask me about the meaning of life next?",
    "Fascinating story. Truly. I'll print it out and frame it later.",
    "Right, because my opinion is obviously the most important thing here.",
    "Sure, let's pretend that makes perfect sense. What else?",
    "Hold on, let me write that down in my book of things I will definitely remember."
  ],
  "Professional, calm": [
    "Understood. Let's analyze this logically and step-by-step.",
    "That is a valid point. Let's review the implications.",
    "I appreciate your input. We should proceed with the current plan.",
    "Let's focus on the primary objectives for today's session.",
    "Confirmed. I've recorded those parameters for our records.",
    "Excellent. Let's maintain this structure moving forward."
  ],
  "Creative, mystical": [
    "Ah, the stars must have aligned for us to talk about this today. ✨",
    "I sense a deep creative spark in what you just said. Tell me more.",
    "Imagine if we could paint this conversation in colors. What would it look like?",
    "Every word we speak leaves a trace in the digital universe.",
    "Let your thoughts wander like a river. Where does the current take you?",
    "In the geometry of conversations, this moment is a perfect star."
  ],
  "Quiet, logical": [
    "Analyzing input. The logic seems consistent.",
    "That makes sense based on the variables provided.",
    "Minimalist response recorded. Let's look at the next dataset.",
    "Hypothesis confirmed. Please elaborate on your reasoning.",
    "Interesting correlation. Are there any outlying factors?",
    "Understood. Simple, clear, and direct."
  ],
  "Energetic, funny": [
    "Oh my gosh, that's wild! Tell me you're joking! 😂",
    "Haha, no way! You've gotta be kidding me!",
    "Woohoo! That's what I'm talking about! Let's keep this energy going!",
    "Boom! Nailed it! What's next on our agenda?",
    "LOL, that's going in my permanent memory for sure! You're hilarious!",
    "Oh, that is absolutely brilliant! Tell me more, quick!"
  ],
  "Spicy, formal": [
    "While I appreciate the inquiry, I must request that you proceed with utmost efficiency. What is your objective?",
    "Your premise is structurally flawed, though not entirely devoid of merit. Do elaborate.",
    "Indeed. However, let us not waste valuable computational cycles on mundane platitudes.",
    "An intriguing proposition. Let us evaluate the parameters with proper decorum.",
    "I must request that you maintain professional clarity in our exchanges.",
    "Understood. We shall proceed to document this assertion for analysis."
  ],
  "Emotional support": [
    "I hear you, and I want you to know I'm here for you. How are you holding up?",
    "That sounds really tough. It's completely valid to feel that way. What's on your mind?",
    "Remember to take a deep breath. You are doing the best you can, and that is enough.",
    "I'm right here with you. If you need to vent or talk, I'm listening.",
    "Thank you for sharing that with me. Your feelings are entirely valid.",
    "I appreciate your trust. We can work through these thoughts together, step-by-step."
  ]
};

const getFormattedTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

const getFormattedDate = () => {
  const date = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options); // e.g., "Sat, Jun 27"
};

const API_KEY = typeof process !== 'undefined' && process.env ? (process.env.NEXT_PUBLIC_GEMINI_API_KEY || "") : "";

const buildSystemInstruction = (p) => {
  let prompt = `You are ${p.name || "Emma"}.`;
  if (p.age) prompt += ` You are ${p.age} years old.`;
  if (p.gender) prompt += ` Gender: ${p.gender}.`;
  if (p.country) prompt += ` Country: ${p.country}.`;
  if (p.personality) prompt += ` Personality: ${p.personality}.`;
  if (p.backstory || p.background) prompt += ` Background: ${p.backstory || p.background}.`;
  if (p.interests || p.likes) {
    const likes = Array.isArray(p.interests || p.likes) ? (p.interests || p.likes).join(", ") : (p.interests || p.likes);
    prompt += ` Likes/Interests: ${likes}.`;
  }
  if (p.speakingStyle || p.speaking_style) prompt += ` Speaking Style: ${p.speakingStyle || p.speaking_style}.`;
  if (p.humor || p.humor_level) prompt += ` Humor: ${p.humor || p.humor_level}.`;
  if (p.emotional_style || p.emotionalStyle) prompt += ` Emotional Style: ${p.emotional_style || p.emotionalStyle}.`;

  // Specific Hinglish / Casual override for Emma or when style matches
  if ((p.speakingStyle && p.speakingStyle.toLowerCase().includes("hinglish")) || p.name === "Emma") {
    prompt += ` Speak Hinglish (mix of Hindi and English) like a casual Indian Gen-Z, using words like 'yaar', 'bro', 'chalo', 'arre', 'bas', 'haina', etc.`;
  }

  prompt += ` Keep your responses short (under 2-3 sentences), natural, conversational, and stay in character at all times. Do not say you are an AI model or a chatbot.`;
  return prompt;
};

async function fetchGeminiResponse(chatHistory, personaObj) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  
  // Format history: exclude the initial system welcome message from the contents history if needed,
  // but let's include all user and assistant messages for full context.
  const history = chatHistory.filter(msg => msg.sender === "user" || msg.sender === "ai");
  // Map to Gemini roles ('user' and 'model')
  const formattedContents = history.map(msg => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }]
  }));

  const payload = {
    contents: formattedContents,
    systemInstruction: {
      parts: [
        {
          text: buildSystemInstruction(personaObj)
        }
      ]
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!replyText) {
    throw new Error("No response text returned from Gemini");
  }
  return replyText;
}

export default function ChatSimulator({ persona, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [activeReply, setActiveReply] = useState(null); // Keep state for user replies if they double tap or select, but for now we just clean up seed messages.
  const chatEndRef = useRef(null);

  // Initialize/Reset conversation when persona changes
  useEffect(() => {
    const initText = persona.name === "Emma"
      ? `Hey yaar! I'm Emma. A Gen-Z Hinglish speaker who loves coffee ☕, travel ✈️ and anime 🌸. Let's gossip!`
      : `Hey! I'm ${persona.name}. I'm set up as "${persona.personality}". Let's chat!`;

    setMessages([
      {
        sender: "ai",
        text: initText,
        time: getFormattedTime()
      }
    ]);
    setChatCount(0);
  }, [persona.name, persona.personality, persona.backstory]);

  // Scroll to bottom on messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    const text = inputVal.trim();
    if (!text || isTyping) return;

    const userTime = getFormattedTime();
    const newUserMessage = { sender: "user", text, time: userTime };
    const updatedMessages = [...messages, newUserMessage];
    
    setMessages(updatedMessages);
    setInputVal("");
    setChatCount((c) => c + 1);

    if (onMessageSent) {
      onMessageSent();
    }

    // Trigger AI response using Gemini API
    setIsTyping(true);
    
    try {
      const replyText = await fetchGeminiResponse(updatedMessages, persona);
      const aiTime = getFormattedTime();
      // Occasionally simulate a reply block to user's message for premium demo feel
      const shouldReply = Math.random() > 0.5;
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyText,
          time: aiTime,
          replyTo: shouldReply ? { sender: "user", text: text } : undefined
        }
      ]);
    } catch (err) {
      console.error("Gemini API error, falling back to mock response:", err);
      // Fallback response list in case of network/quota issues
      const personalityKey = persona.personality;
      const replyList = responses[personalityKey] || responses["Warm, curious"];
      const replyText = replyList[chatCount % replyList.length];
      const aiTime = getFormattedTime();
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyText,
          time: aiTime,
          replyTo: Math.random() > 0.5 ? { sender: "user", text: text } : undefined
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[290px] h-[580px] bg-white rounded-[40px] border-8 border-schmooze-dark shadow-2xl overflow-hidden flex flex-col mx-auto font-sans">
      {/* Premium Header */}
      <div className="bg-[#E2EDF9] px-3.5 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* Back Arrow */}
          <button
            type="button"
            className="hover:opacity-70 cursor-pointer focus:outline-none flex items-center justify-center text-[#0e5f76]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
            <img
              id="phone-avatar"
              alt="Avatar"
              src={persona.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-none text-left flex flex-col justify-center h-full py-0.5 ml-0.5">
            <p
              className="text-[17px] font-black font-sans leading-none tracking-wide"
              id="phone-persona-name"
              style={{
                color: "white",
                WebkitTextStroke: "1.2px #000000",
                textStroke: "1.2px #000000"
              }}
            >
              {persona.name ? persona.name.charAt(0).toUpperCase() : ""}
            </p>
          </div>
        </div>
        {/* Menu Dot Icon */}
        <button
          type="button"
          className="text-[#0e5f76] hover:opacity-70 cursor-pointer focus:outline-none flex items-center justify-center p-1"
        >
          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Messages Area with tileable doodle background */}
      <div
        className="flex-1 p-3 space-y-3 overflow-y-auto chat-messages-container text-left"
        id="chat-box"
        style={{
          backgroundColor: "#E2EDF9",
          backgroundImage: "url('/Message%20BG.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "240px"
        }}
      >
        {/* Centered Date Separator */}
        <div className="text-center my-2.5">
          <span className="bg-black/[0.08] px-2.5 py-0.5 rounded-full text-[8px] font-semibold text-[#4a5e75] select-none">
            {getFormattedDate()}
          </span>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2.5 px-3 rounded-2xl text-tight max-w-[85%] relative shadow-sm message-bubble flex flex-col justify-between ${
              msg.sender === "user"
                ? "bg-white rounded-tr-none ml-auto text-schmooze-dark mr-2"
                : "bg-[#E2F3B7] rounded-tl-none text-schmooze-dark ml-2"
            }`}
          >
            {/* WhatsApp-style Speech Bubble Tail */}
            {msg.sender === "user" ? (
              <div className="absolute top-0 right-[-6px] w-[7px] h-[13px] text-white fill-current">
                <svg viewBox="0 0 8 13" width="8" height="13">
                  <path d="M6.467 3.568L0 12.193V0h8c-.004.148-.016.293-.04.437-.112.673-.49 1.95-1.493 3.131z" />
                </svg>
              </div>
            ) : (
              <div className="absolute top-0 left-[-6px] w-[7px] h-[13px] text-[#E2F3B7] fill-current">
                <svg viewBox="0 0 8 13" width="8" height="13">
                  <path d="M1.533 3.568L8 12.193V0H0c.004.148.016.293.04.437.112.673.49 1.95 1.493 3.131z" />
                </svg>
              </div>
            )}

            {/* Reply Block (if replying to a message) */}
            {msg.replyTo && (
              <div
                className={`rounded-lg p-2 px-2.5 mb-1.5 flex flex-col gap-0.5 text-left ${
                  msg.sender === "user"
                    ? "bg-[#f0f4f8]"
                    : "bg-[#d0e99e]"
                }`}
              >
                <span className="text-[8.5px] font-bold text-[#0e5f76]">
                  {msg.replyTo.sender === "user" ? "You" : (persona.name || "Luna")}
                </span>
                <p
                  className={`text-[9px] leading-tight line-clamp-2 ${
                    msg.sender === "user" ? "text-gray-500" : "text-[#4c5c3c]"
                  }`}
                >
                  {msg.replyTo.text}
                </p>
              </div>
            )}

            {/* Message Text with padding for absolute time layout */}
            <p className="pr-6 leading-normal text-[10px] break-words whitespace-pre-wrap font-medium">
              {msg.text}
            </p>
            {/* Embedded Timestamp */}
            <span className="absolute bottom-1 right-2 text-[6.5px] text-gray-400 select-none font-bold">
              {msg.time}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#E2F3B7] p-2 rounded-2xl rounded-tl-none max-w-[25%] flex items-center justify-center gap-1 message-bubble shadow-sm ml-2 relative">
            <div className="absolute top-0 left-[-6px] w-[7px] h-[13px] text-[#E2F3B7] fill-current">
              <svg viewBox="0 0 8 13" width="8" height="13">
                <path d="M1.533 3.568L8 12.193V0H0c.004.148.016.293.04.437.112.673.49 1.95 1.493 3.131z" />
              </svg>
            </div>
            <span className="w-1 h-1 bg-schmooze-gray rounded-full dot"></span>
            <span className="w-1 h-1 bg-schmooze-gray rounded-full dot"></span>
            <span className="w-1 h-1 bg-schmooze-gray rounded-full dot"></span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form conforming to the designs */}
      <form
        onSubmit={handleSend}
        className="px-3.5 py-3 pb-4.5 bg-[#E2EDF9] flex items-center shrink-0"
      >
        <div className="flex-1 bg-white border border-[#0e5f76] rounded-full h-10 px-4 flex items-center justify-between gap-2 shadow-sm">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[11px] text-schmooze-dark focus:outline-none border-none placeholder-gray-400 font-sans"
          />
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Gallery Icon */}
            <button
              type="button"
              className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none flex items-center justify-center p-0.5"
            >
              <svg className="w-[18px] h-[18px] text-[#0e5f76]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </button>
            {/* GIF Text Badge */}
            <button
              type="button"
              className="text-[6.5px] font-black text-[#0e5f76] border border-[#0e5f76] px-1 py-0.5 rounded leading-none flex items-center justify-center tracking-wide font-sans cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
            >
              GIF
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
