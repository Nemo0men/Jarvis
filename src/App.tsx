import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
      // Enhanced voice settings
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Let's achieve your dreams together. What goal would you like to accomplish?");
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        // Try to find a natural-sounding English voice
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Samantha') || // MacOS
          voice.name.includes('Google UK English Female') || // Chrome
          voice.name.includes('Microsoft Zira') // Windows
        ) || voices[0];
        
        utterance.voice = preferredVoice;
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.1; // Slightly higher pitch
        utterance.volume = 1.0; // Full volume
        
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log('Goal:', input);
  };

  if (!showInput) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-3xl md:text-5xl text-white font-light tracking-wider animate-fade-in">
          Let's achieve your dreams together
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-in-up">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What goal would you like to accomplish?"
            className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;