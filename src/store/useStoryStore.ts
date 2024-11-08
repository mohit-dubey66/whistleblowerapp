import { create } from 'zustand';

export interface Story {
  id: string;
  category: string;
  subCategory: string;
  insider: string;
  location: string;
  timeAgo: string;
  title: string;
  content: string;
  tags: Array<{
    label: string;
    count: number;
    type: 'reaction';
  }>;
}

interface StoryState {
  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'timeAgo' | 'tags'>) => void;
}

const defaultTags = [
  { label: 'Relatable', count: 0, type: 'reaction' as const },
  { label: 'I also feel this', count: 0, type: 'reaction' as const },
  { label: 'Brave', count: 0, type: 'reaction' as const },
  { label: 'Thought-Provoking', count: 0, type: 'reaction' as const },
  { label: 'Support', count: 0, type: 'reaction' as const }
];

export const useStoryStore = create<StoryState>((set) => ({
  stories: [
    {
      id: '1',
      category: 'Company',
      subCategory: 'WorkPressure',
      insider: 'BurntOutGoogler',
      location: 'India',
      timeAgo: '1 hour ago',
      title: 'Working at Google: Not as Dreamy as it Looks from the Outside',
      content: `I used to think working at Google would be the highlight of my career. I mean, who wouldn't want to be at one of the world's most innovative companies, right? But being here feels like you're constantly on a treadmill that just keeps speeding up.

The perks are great, sure, but honestly, they start feeling like golden handcuffs after a while. The deadlines and expectations are relentless, and it's like there's this silent pressure that if you're not putting in 12-hour days, you're not 'Google material'. We talk about work-life balance, but no one really practices it here. Even vacations are tense because when you're off, you're just dreading the mountain of work you'll return to.

The worst part is probably the competition. My team is full of super smart people, but it feels like we're all subtly competing against each other. Everyone wants to stand out, and that creates this weird, tense environment where it's hard to trust anyone. Some people seem to get all the attention and praise, while others (like me) just keep grinding without much recognition. It feels exhausting, like running in circles with no finish line in sight.

Honestly, I'm not sure how much longer I can keep this up. The dream job hype is wearing off, and what's left is just a bunch of stressed-out, overworked people pretending everything's fine.`,
      tags: [
        { label: 'Relatable', count: 30, type: 'reaction' },
        { label: 'I also feel this', count: 11, type: 'reaction' },
        { label: 'Brave', count: 4, type: 'reaction' },
        { label: 'Thought-Provoking', count: 15, type: 'reaction' },
        { label: 'Frustrating', count: 8, type: 'reaction' },
        { label: 'Support', count: 20, type: 'reaction' }
      ]
    }
  ],
  addStory: (newStory) =>
    set((state) => ({
      stories: [
        {
          ...newStory,
          id: Math.random().toString(36).substr(2, 9),
          timeAgo: 'Just now',
          tags: defaultTags
        },
        ...state.stories
      ]
    }))
}));