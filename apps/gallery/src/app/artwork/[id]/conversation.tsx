"use client";

import { useState } from "react";
import { Artwork } from "../../../types";

export default function Conversation({ artwork }: { artwork: Artwork }) {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai'}[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          artwork: artwork
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      const aiMessage = { text: data.text, sender: 'ai' as const };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 border rounded-lg border-neutral-200 dark:border-neutral-700">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          Discuss this Artwork
        </h2>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-4 py-2 text-neutral-900 dark:text-neutral-50">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about this artwork..."
            className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition ${
              isLoading || !inputText.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600'
            }`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
