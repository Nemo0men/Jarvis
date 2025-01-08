interface Roadmap {
  id: string;
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
    timeframe: string;
    milestones: string[];
  }[];
  sources: {
    title: string;
    url: string;
  }[];
}

export const getRoadmapsForGoal = (goal: string): Roadmap[] => {
  // This is a mock implementation. In a real app, you'd fetch this from an API
  // or use a more sophisticated matching system
  return [
    {
      id: 'traditional',
      title: 'Traditional Path',
      description: 'A conventional approach focusing on structured learning and steady progress.',
      steps: [
        {
          title: 'Research & Planning',
          description: 'Gather information and create a solid foundation',
          timeframe: '1-2 months',
          milestones: [
            'Define specific objectives',
            'Research best practices',
            'Create a timeline',
            'Identify key resources'
          ]
        },
        {
          title: 'Skill Development',
          description: 'Build necessary skills and knowledge',
          timeframe: '3-6 months',
          milestones: [
            'Complete fundamental training',
            'Practice core techniques',
            'Join relevant communities',
            'Track progress regularly'
          ]
        },
        {
          title: 'Implementation',
          description: 'Put knowledge into practice',
          timeframe: '6-12 months',
          milestones: [
            'Start small projects',
            'Gather feedback',
            'Refine approach',
            'Scale up gradually'
          ]
        }
      ],
      sources: [
        {
          title: 'Harvard Business Review - Goal Setting',
          url: 'https://hbr.org/topic/goals-and-objectives'
        },
        {
          title: 'MIT OpenCourseWare',
          url: 'https://ocw.mit.edu'
        }
      ]
    },
    {
      id: 'accelerated',
      title: 'Accelerated Path',
      description: 'An intensive approach for faster results with dedicated focus.',
      steps: [
        {
          title: 'Intensive Preparation',
          description: 'Rapid research and planning phase',
          timeframe: '2 weeks',
          milestones: [
            'Quick assessment',
            'Resource gathering',
            'Schedule creation',
            'Support network setup'
          ]
        },
        {
          title: 'Immersive Learning',
          description: 'Full immersion in skill development',
          timeframe: '1-2 months',
          milestones: [
            'Daily practice sessions',
            'Expert mentoring',
            'Rapid iteration',
            'Continuous feedback'
          ]
        },
        {
          title: 'Quick Implementation',
          description: 'Fast-tracked application of skills',
          timeframe: '2-3 months',
          milestones: [
            'Real-world application',
            'Performance optimization',
            'Result measurement',
            'Quick pivots as needed'
          ]
        }
      ],
      sources: [
        {
          title: 'Coursera Learning Paths',
          url: 'https://www.coursera.org'
        },
        {
          title: 'Fast.ai - Practical Deep Learning',
          url: 'https://www.fast.ai'
        }
      ]
    }
  ];
};