import React, { useState, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

export function Chat({ onGoalSubmit }: { onGoalSubmit: (goal: string) => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: "Hello! I'm here to help you achieve your goals. What would you like to accomplish?"
  }]);

  useEffect(() => {
    // Speak only once when component mounts
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages[0].content);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user' as const, content: input };
    const botResponse = { type: 'bot' as const, content: `I'll help you create a roadmap for: ${input}` };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    onGoalSubmit(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="h-[400px] overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.type === 'bot' && (
                <Bot className="inline-block mr-2 h-5 w-5" />
              )}
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your goal here..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}