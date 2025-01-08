import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface Source {
  title: string;
  url: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  timeframe: string;
  milestones: string[];
}

interface RoadmapProps {
  title: string;
  description: string;
  steps: RoadmapStep[];
  sources: Source[];
}

export function Roadmap({ title, description, steps, sources }: RoadmapProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl mx-auto border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-300 mb-6">{description}</p>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-white mb-2">
              {step.title}
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({step.timeframe})
              </span>
            </h3>
            <p className="text-gray-300 mb-3">{step.description}</p>
            <ul className="space-y-2">
              {step.milestones.map((milestone, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Sources</h3>
        <ul className="space-y-2">
          {sources.map((source, index) => (
            <li key={index}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}