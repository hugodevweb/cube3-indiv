'use client';

const CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'Baskets', label: 'Baskets' },
  { value: 'Vintage', label: 'Vintage' },
  { value: 'Trading Cards', label: 'Trading Cards' },
  { value: 'Comics', label: 'Comics' },
  { value: 'Watches', label: 'Montres' },
  { value: 'Art', label: 'Art' },
  { value: 'Other', label: 'Autre' },
];

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="bg-surface border-b border-border px-8 overflow-x-auto
                   scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2 py-2.5 min-w-max">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-1.5 rounded-pill border-[1.5px] font-sans text-sm font-medium
                       whitespace-nowrap cursor-pointer transition-all duration-150
                       ${
                         activeCategory === category.value
                           ? 'bg-accent border-accent text-white'
                           : 'bg-surface border-border text-text-secondary hover:border-accent hover:text-accent'
                       }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
