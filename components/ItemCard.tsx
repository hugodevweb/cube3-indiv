'use client';

import { useState } from 'react';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  photoUrl: string;
  status: string;
  createdAt: string;
}

interface ItemCardProps {
  item: Item;
  isFavorite?: boolean;
  onFavoriteToggle?: (itemId: number) => void;
}

export default function ItemCard({ item, isFavorite = false, onFavoriteToggle }: ItemCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(item.id);
  };

  return (
    <div className="group bg-surface rounded-md overflow-hidden border border-border cursor-pointer
                    transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-border-hover
                    animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Image wrapper with 4:5 aspect ratio */}
      <div className="relative w-full aspect-[4/5] bg-background overflow-hidden">
        {imageError || !item.photoUrl ? (
          <div className="w-full h-full flex items-center justify-center text-4xl text-text-muted bg-background">
            📦
          </div>
        ) : (
          <img
            src={item.photoUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        {/* Favorite button - appears on hover */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 w-8 h-8 bg-white/92 rounded-full flex items-center justify-center
                     border-0 shadow-sm transition-all duration-150
                     opacity-0 group-hover:opacity-100 hover:scale-110
                     ${isFavorite ? 'opacity-100' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#e03e3e' : 'none'}
            stroke={isFavorite ? '#e03e3e' : '#888'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Price badge */}
        <div className="absolute bottom-2 left-2 bg-white/96 backdrop-blur-sm rounded-sm px-2 py-1
                       text-sm font-bold text-text shadow-sm">
          {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </div>
      </div>

      {/* Card body */}
      <div className="p-2.5 px-3">
        <h3 className="text-sm font-medium text-text mb-1.5 truncate">{item.title}</h3>

        <div className="flex gap-1.5 flex-wrap">
          {/* Category tag */}
          <span className="text-xs font-medium px-2 py-0.5 rounded-pill border border-border
                          text-text-secondary bg-background">
            {item.category}
          </span>

          {/* Status tag */}
          {item.status && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-pill border border-[#fde68a]
                            text-[#b45309] bg-[#fef3c7]">
              {item.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
