'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CategoryBar from '@/components/CategoryBar';
import ItemGrid from '@/components/ItemGrid';
import SellModal from '@/components/SellModal';
import { Item } from '@/components/ItemCard';

type SortMode = 'newest' | 'price-asc' | 'price-desc';

export default function HomePage() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('collector_favs');
    if (savedFavorites) {
      try {
        const favArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favArray));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setAllItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (itemId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      // Save to localStorage
      localStorage.setItem('collector_favs', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const handleModalSuccess = () => {
    fetchItems(); // Refresh items after creating a new one
  };

  // Filter and sort items
  const filteredItems = allItems
    .filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Sort
      if (sortMode === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortMode === 'price-asc') {
        return a.price - b.price;
      } else if (sortMode === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSellClick={() => setIsModalOpen(true)}
      />

      {/* Category Bar */}
      <CategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Main Content */}
      <div className="max-w-[1300px] mx-auto px-8 py-7 pb-12">
        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-[1.05rem] font-semibold text-text">
            Catalogue
            <span className="text-sm text-text-muted font-normal ml-2">
              ({filteredItems.length} {filteredItems.length === 1 ? 'article' : 'articles'})
            </span>
          </div>

          {/* Sort select */}
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="font-sans text-sm font-medium text-text-secondary bg-surface border-[1.5px] border-border
                      rounded-sm px-2.5 py-1.5 cursor-pointer outline-none"
          >
            <option value="newest">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <ItemGrid
            items={filteredItems}
            loading={loading}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      </div>

      {/* Sell Modal */}
      <SellModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleModalSuccess} />
    </div>
  );
}
