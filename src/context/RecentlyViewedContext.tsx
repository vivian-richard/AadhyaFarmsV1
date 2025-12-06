import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('recently-viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recently-viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== product.id);
      // Add to front, keep max 10 items
      return [product, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recently-viewed');
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }
  return context;
};
