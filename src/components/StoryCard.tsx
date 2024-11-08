import React from 'react';

interface StoryTag {
  label: string;
  count: number;
  type?: 'reaction' | 'tag';
}

interface StoryProps {
  id: string;
  category: string;
  subCategory: string;
  insider: string;
  location: string;
  timeAgo: string;
  title: string;
  content: string;
  tags: StoryTag[];
  selectedReaction: string | null;
  onReactionSelect: (storyId: string, reaction: string) => void;
}

export default function StoryCard({
  id,
  category,
  subCategory,
  insider,
  location,
  timeAgo,
  title,
  content,
  tags,
  selectedReaction,
  onReactionSelect,
}: StoryProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sl text-black-00 font-medium">
            {category} · {subCategory}
          </div>
          <div className="text-sm text-gray-500">
            Insider: {insider} · {location}
          </div>
        </div>
        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>

      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div 
        className="text-gray-700 mb-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((reaction) => (
          <button
            key={reaction.label}
            onClick={() => onReactionSelect(id, reaction.label)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors
              ${
                selectedReaction === reaction.label
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {reaction.label}
            <span className="ml-2">
              {reaction.count + (selectedReaction === reaction.label ? 1 : 0)}
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}