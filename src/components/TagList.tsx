import React from 'react';

interface TagListProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const tags = [
  'Feed',
  'ToxicEnvironment',
  'Frustrations',
  'Bullying',
  'Ragging',
  'WorkPressure',
  'AcademicPressure',
  'Placements',
  'OfficePolitics',
  'PoorWorkLifeBalance'
];

export default function TagList({ selectedTag, onTagSelect }: TagListProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="py-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag === 'Feed' ? null : selectedTag === tag ? null : tag)}
            className={`flex-none px-4 py-1.5 rounded-full text-sm transition-colors ${
              (tag === 'Feed' && !selectedTag) || selectedTag === tag
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tag === 'Feed' ? tag : `#${tag}`}
          </button>
        ))}
      </div>
    </div>
  );
}