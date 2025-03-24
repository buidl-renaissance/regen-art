"use client";

import { useState, useEffect } from "react";
import { Artwork } from "../../types";
import { getArtwork } from "../../mock";

const ArtworkConversation = () => {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const artwork = getArtwork(4);
    if (artwork) {
      setArtwork(artwork);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    
    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: "user", content: inputMessage }
    ];
    setMessages(newMessages);
    setInputMessage("");

    if (!artwork) return;

    try {
      // Make API call to AI service
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          artwork: {
            title: artwork.title,
            artist: artwork.artist,
            description: artwork.description,
            medium: artwork.medium,
            year: artwork.year
          }
        }),
      });

      const data = await response.json();
      
      // Add AI response to chat
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4">
        <div className="h-96 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-neutral-500">
              Thinking...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about this artwork..."
            className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition
              ${(isLoading || !inputMessage.trim()) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600'}`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArtworkConversation;
