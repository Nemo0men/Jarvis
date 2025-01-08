import { Button } from "@/components/ui/button"

interface Roadmap {
  id: number;
  steps: string[];
  source: string;
}

interface RoadmapListProps {
  roadmaps: Roadmap[];
  onSelect: (roadmap: Roadmap) => void;
}

export default function RoadmapList({ roadmaps, onSelect }: RoadmapListProps) {
  return (
    <div className="space-y-4">
      {roadmaps.map((roadmap) => (
        <div key={roadmap.id} className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">Roadmap {roadmap.id}</h3>
          <p className="text-sm text-gray-600 mb-2">Source: {roadmap.source}</p>
          <ul className="list-disc list-inside mb-4">
            {roadmap.steps.slice(0, 3).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
            {roadmap.steps.length > 3 && <li>...</li>}
          </ul>
          <Button onClick={() => onSelect(roadmap)}>Select This Roadmap</Button>
        </div>
      ))}
    </div>
  )
}

