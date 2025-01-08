interface Roadmap {
    id: number;
    steps: string[];
    source: string;
  }
  
  interface SelectedRoadmapProps {
    roadmap: Roadmap;
  }
  
  export default function SelectedRoadmap({ roadmap }: SelectedRoadmapProps) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Selected Roadmap</h2>
        <p className="text-sm text-gray-600 mb-2">Source: {roadmap.source}</p>
        <ol className="list-decimal list-inside space-y-2">
          {roadmap.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    )
  }
  
  