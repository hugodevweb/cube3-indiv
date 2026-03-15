'use client';

import ItemCard, { Item } from './ItemCard';

interface ItemGridProps {
  items: Item[];
  loading?: boolean;
  favorites: Set<number>;
  onFavoriteToggle: (itemId: number) => void;
}

export default function ItemGrid({ items, loading = false, favorites, onFavoriteToggle }: ItemGridProps) {
  if (loading) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="w-8 h-8 border-[3px] border-border border-t-accent rounded-full
                       animate-spin mx-auto my-12" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-16 px-4 text-text-muted">
        <svg
          className="mx-auto mb-4 text-border"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M9.172 14.828 12 12m0 0 2.828-2.828M12 12l2.828 2.828M12 12l-2.828-2.828" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <p className="text-[0.95rem] font-medium">Aucun article trouvé</p>
        <small className="text-sm mt-1.5 block text-text-muted">
          Essayez d'ajuster vos filtres ou votre recherche
        </small>
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavorite={favorites.has(item.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </>
  );
}
