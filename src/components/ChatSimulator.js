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

export default function ChatSimulator({ persona, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const chatEndRef = useRef(null);

  // Initialize/Reset conversation when persona changes
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: `Hey! I'm ${persona.name}. I'm set up as "${persona.personality}". Let's chat!`,
        time: "11:01 pm"
      }
    ]);
    setChatCount(0);
  }, [persona.name, persona.personality]);

  // Scroll to bottom on messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e?.preventDefault();
    const text = inputVal.trim();
    if (!text || isTyping) return;

    const userTime = getFormattedTime();
    setMessages((prev) => [...prev, { sender: "user", text, time: userTime }]);
    setInputVal("");
    setChatCount((c) => c + 1);

    if (onMessageSent) {
      onMessageSent();
    }

    // Trigger AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const personalityKey = persona.personality;
      const replyList = responses[personalityKey] || responses["Warm, curious"];
      const replyText = replyList[chatCount % replyList.length];
      const aiTime = getFormattedTime();

      setMessages((prev) => [...prev, { sender: "ai", text: replyText, time: aiTime }]);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-[280px] h-[580px] bg-white rounded-[40px] border-8 border-schmooze-dark shadow-2xl overflow-hidden flex flex-col">
      {/* Premium Header */}
      <div className="bg-white px-3 py-2.5 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          {/* Back Arrow */}
          <button
            type="button"
            className="text-schmooze-dark hover:text-gray-600 font-bold text-sm cursor-pointer mr-1 focus:outline-none"
          >
            ←
          </button>
          <div className="w-8 h-8 rounded-full bg-schmooze-lime overflow-hidden flex items-center justify-center border border-gray-100">
            <img
              id="phone-avatar"
              alt="Avatar"
              src={persona.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight text-left flex items-center h-full py-1">
            <p className="text-xs font-extrabold text-schmooze-dark" id="phone-persona-name">
              {persona.name}
            </p>
          </div>
        </div>
        {/* Menu Dot Icon */}
        <button
          type="button"
          className="text-schmooze-gray hover:text-black font-extrabold text-sm px-1 cursor-pointer focus:outline-none"
        >
          ⋮
        </button>
      </div>

      {/* Messages Area with tileable doodle background */}
      <div
        className="flex-1 p-3 space-y-3 overflow-y-auto chat-messages-container text-left"
        id="chat-box"
        style={{
          backgroundColor: "#d6e6ed",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23a2b7c2' fill-opacity='0.16'%3E%3Cpath d='M15 15c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v5c0 2.8-2.2 5-5 5H20c-2.8 0-5-2.2-5-5v-5zm35 45c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v5c0 2.8-2.2 5-5 5H55c-2.8 0-5-2.2-5-5v-5zm45-30c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v5c0 2.8-2.2 5-5 5h-10c-2.8 0-5-2.2-5-5v-5z'/%3E%3Cpath d='M100 85c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v6c0 1.7-1.3 3-3 3h-6c-1.7 0-3-1.3-3-3v-6zm-75 10c-1.7 0-3-1.3-3-3v-6c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v6c0 1.7-1.3 3-3 3h-6z'/%3E%3Cpath d='M85 10c2 0 3.5 1.5 3.5 3.5S87 17 85 17s-3.5-1.5-3.5-3.5S83 10 85 10zm-65 45c2 0 3.5 1.5 3.5 3.5S18 62 16 62s-3.5-1.5-3.5-3.5S14 55 16 55zm40-40c2 0 3.5 1.5 3.5 3.5S58 22 56 22s-3.5-1.5-3.5-3.5S54 15 56 15z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Centered Date Separator */}
        <div className="text-center my-2">
          <span className="bg-white/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[7.5px] font-bold text-schmooze-gray shadow-sm uppercase tracking-wider">
            Today
          </span>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-2xl text-tight max-w-[85%] relative shadow-sm message-bubble flex flex-col justify-between ${
              msg.sender === "user"
                ? "bg-white rounded-tr-none ml-auto text-schmooze-dark"
                : "bg-[#E2F3B7] rounded-tl-none text-schmooze-dark"
            }`}
          >
            {/* Message Text with padding for absolute time layout */}
            <p className="pr-6 leading-normal text-[10px] break-words whitespace-pre-wrap">
              {msg.text}
            </p>
            {/* Embedded Timestamp */}
            <span className="absolute bottom-0.5 right-1.5 text-[6.5px] text-gray-400 select-none">
              {msg.time || "11:01 pm"}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#E2F3B7] p-2 rounded-2xl rounded-tl-none max-w-[25%] flex items-center justify-center gap-1 message-bubble shadow-sm">
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
        className="p-2 border-t border-gray-100 bg-white flex items-center gap-2 shrink-0"
      >
        <div className="flex-1 bg-gray-50 border border-gray-150 rounded-full h-8 px-3 flex items-center justify-between gap-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[10px] text-schmooze-dark focus:outline-none border-none placeholder-gray-400"
          />
          <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
            {/* Gallery Icon */}
            <button
              type="button"
              className="hover:text-schmooze-dark transition-colors cursor-pointer focus:outline-none"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </button>
            {/* GIF Text Badge */}
            <button
              type="button"
              className="text-[7.5px] font-bold border border-current px-0.8 py-0.1 rounded hover:text-schmooze-dark transition-colors cursor-pointer focus:outline-none"
            >
              GIF
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-8 h-8 bg-schmooze-dark text-white rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0 focus:outline-none"
        >
          <svg
            className="w-3.5 h-3.5 transform rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
