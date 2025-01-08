import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const handleClick = () => {
    const synth = window.speechSynthesis;
    const text = "Let's achieve your dreams together. What goal would you like to accomplish?";
    
    const utterance = new SpeechSynthesisUtterance(text);

    const loadVoices = () => {
      const voices = synth.getVoices();

      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google UK English Male')
      ) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      synth.cancel();
      synth.speak(utterance);
    };

    if (synth.getVoices().length > 0) {
      loadVoices();
    } else {
      synth.onvoiceschanged = loadVoices;
    }

    setShowInput(true);
  };

  const fetchRoadmaps = async (goal: string) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Create a roadmap for achieving the goal: ${goal}. Include sources.`,
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      setRoadmaps(response.data.choices[0].text.split('\n').filter((line: string) => line));
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    fetchRoadmaps(input);
    setShowInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {!showInput && roadmaps.length === 0 ? (
        <div
          className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4"
          onClick={handleClick}
        >
          <p className="text-3xl md:text-5xl text-white font-light tracking-wider animate-fade-in">
            Click anywhere to begin
          </p>
        </div>
      ) : (
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
              Send
            </button>
          </div>
        </form>
      )}

      {roadmaps.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl text-white">Select a Roadmap:</h2>
          <ul className="mt-4">
            {roadmaps.map((roadmap, index) => (
              <li key={index} className="text-white mb-2">
                <button
                  onClick={() => setSelectedRoadmap(roadmap)}
                  className="underline"
                >
                  {roadmap}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRoadmap && (
        <div className="mt-8 text-white">
          <h2 className="text-xl">Selected Roadmap:</h2>
          <p>{selectedRoadmap}</p>
        </div>
      )}
    </div>
  );
}

export default App;