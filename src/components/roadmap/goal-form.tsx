import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GoalFormProps {
  onSubmit: (goal: string) => void;
}

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [goal, setGoal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (goal.trim()) {
      onSubmit(goal.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <Button type="submit">Generate Roadmaps</Button>
    </form>
  )
}

