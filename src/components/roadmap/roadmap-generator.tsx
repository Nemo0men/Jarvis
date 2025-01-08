"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GoalForm from './goal-form'
import RoadmapList from './roadmap-list'
import SelectedRoadmap from './selected-roadmap'

interface Roadmap {
  id: number;
  steps: string[];
  source: string;
}

export default function RoadmapGenerator() {
  const [goal, setGoal] = useState<string>('')
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null)

  const handleGoalSubmit = async (submittedGoal: string) => {
    setGoal(submittedGoal)
    // In a real application, you would call an API to generate roadmaps using ChatGPT
    // For this example, we'll simulate the API call with a timeout
    setTimeout(() => {
      const generatedRoadmaps: Roadmap[] = [
        {
          id: 1,
          steps: [
            "Research the topic thoroughly",
            "Create a detailed outline",
            "Write the first draft",
            "Revise and edit the content",
            "Publish and promote the article"
          ],
          source: "ChatGPT - Writing Process"
        },
        {
          id: 2,
          steps: [
            "Define the target audience",
            "Brainstorm key points",
            "Gather supporting evidence",
            "Structure the argument logically",
            "Craft a compelling conclusion"
          ],
          source: "ChatGPT - Persuasive Writing"
        },
        {
          id: 3,
          steps: [
            "Choose a specific angle",
            "Conduct interviews if applicable",
            "Fact-check all information",
            "Incorporate storytelling elements",
            "Add visuals to enhance the content"
          ],
          source: "ChatGPT - Journalism Techniques"
        }
      ]
      setRoadmaps(generatedRoadmaps)
    }, 1000)
  }

  const handleRoadmapSelect = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap)
  }

  const handleReset = () => {
    setGoal('')
    setRoadmaps([])
    setSelectedRoadmap(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Roadmap Generator</CardTitle>
        <CardDescription>Enter your goal to generate roadmaps</CardDescription>
      </CardHeader>
      <CardContent>
        {!goal && <GoalForm onSubmit={handleGoalSubmit} />}
        {goal && !selectedRoadmap && (
          <>
            <h2 className="text-xl font-semibold mb-4">Roadmaps for: {goal}</h2>
            <RoadmapList roadmaps={roadmaps} onSelect={handleRoadmapSelect} />
          </>
        )}
        {selectedRoadmap && (
          <>
            <SelectedRoadmap roadmap={selectedRoadmap} />
            <Button onClick={handleReset} className="mt-4">Generate New Roadmaps</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

