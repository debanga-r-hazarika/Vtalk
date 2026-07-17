"use client";

import React, { useState, useEffect, useRef } from "react";

const responses = {
  "Warm, curious": [
    "I love exploring new ideas! What inspired you today?",
    "That sounds fascinating. Could you tell me more about how that made you feel?",
    "Oh really? Tell me more! I'm all ears.",
    "That's wonderful! Having meaningful interactions is my favorite part of the day.",
    "Interesting point! What other things do you like about that?",
    "I'm so glad we are chatting. You have such a unique perspective!"
  ],
  "Witty, sarcastic": [
    "Oh, standard human answer. I'm shocked.",
    "Well, that's one way to spend your finite lifetime. Fascinating.",
    "I'm pretending to write this down in my memory banks right now.",
    "Let's be honest, you could have described that with slightly more enthusiasm.",
    "Wow, tell me more. No, seriously, I have absolutely nothing better to do.",
    "Is that your final answer, or can I interest you in a more creative response?"
  ],
  "Professional, calm": [
    "Understood. That is a solid approach to the situation.",
    "Thank you for sharing that. How would you evaluate the outcome?",
    "I appreciate your input. Let's analyze how that applies to our research goals.",
    "Indeed. Consistency and clarity are key in these interactions.",
    "Let's proceed. What would you outline as the next critical step?",
    "Thank you for this feedback. It helps refine our conversational standards."
  ],
  "Creative, mystical": [
    "Every word is a brushstroke on the canvas of our shared reality. What color is your mood today?",
    "Fascinating... I feel a strange connection to that memory. It feels like stardust.",
    "Tell me of your dreams. What echoes in the quiet corners of your mind?",
    "Ah, a beautiful pattern! The universe speaks in such unexpected whispers.",
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
      },
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

    // User message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputVal("");
    setChatCount((c) => c + 1);

    // Call state update (for score boosting)
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
      
      setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-[280px] h-[580px] bg-white rounded-[40px] border-8 border-schmooze-dark shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-schmooze-lime overflow-hidden flex items-center justify-center">
          <img
            id="phone-avatar"
            alt="Avatar"
            src={persona.avatar}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] font-bold" id="phone-persona-name">
            {persona.name}
          </p>
          <p className="text-[8px] text-green-500 font-bold" id="phone-persona-status">
            • Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 p-4 bg-gray-50 space-y-4 text-[10px] overflow-y-auto chat-messages-container"
        id="chat-box"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-2xl text-tight message-bubble ${
              msg.sender === "user"
                ? "bg-schmooze-lime rounded-tr-none ml-auto max-w-[80%]"
                : "bg-white rounded-tl-none max-w-[80%] border border-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="bg-white p-2 rounded-2xl rounded-tl-none max-w-[30%] border border-gray-100 flex items-center justify-center gap-1.5 message-bubble">
            <span className="w-1.5 h-1.5 bg-schmooze-gray rounded-full dot"></span>
            <span className="w-1.5 h-1.5 bg-schmooze-gray rounded-full dot"></span>
            <span className="w-1.5 h-1.5 bg-schmooze-gray rounded-full dot"></span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={`Say hello to ${persona.name}...`}
          className="flex-1 bg-gray-100 h-8 px-3 rounded-full text-[10px] focus:outline-none focus:ring-1 focus:ring-schmooze-lime border-none"
        />
        <button
          type="submit"
          className="w-8 h-8 bg-schmooze-dark text-white rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 transform rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
