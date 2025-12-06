import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductVariation {
  id: string;
  size: string;
  price: number;
  stock: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  unit?: string;
  variations?: ProductVariation[];
  stock: number;
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  frequentlyBoughtTogether?: string[];
  tags?: string[];
  subscriptionOnly?: boolean;
}

export interface BundleDeal {
  id: string;
  name: string;
  description: string;
  products: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
}

interface ProductContextType {
  products: Product[];
  bundles: BundleDeal[];
  addReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  getProductById: (id: string) => Product | undefined;
  getRecommendations: (productId: string, limit?: number) => Product[];
  getFrequentlyBoughtTogether: (productId: string) => Product[];
  getSeasonalHighlights: () => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Organic Milk',
      price: 30,
      image: '/products/Milk.png',
      category: 'Dairy',
      description: 'Pure A2 milk from grass-fed cows, rich in nutrients and free from hormones.',
      stock: 50,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 124,
      variations: [
        { id: '1-500ml', size: '500ml', price: 30, stock: 50 },
        { id: '1-1l', size: '1L', price: 55, stock: 45 },
        { id: '1-2l', size: '2L', price: 105, stock: 30 },
      ],
      frequentlyBoughtTogether: ['2', '7'],
      tags: ['dairy', 'organic', 'a2-milk'],
      subscriptionOnly: true,
    },
    {
      id: '2',
      name: 'Farm Fresh Curd',
      price: 25,
      image: '/products/Curd.png',
      category: 'Dairy',
      description: 'Creamy homemade curd made from fresh organic milk.',
      stock: 40,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 98,
      variations: [
        { id: '2-500g', size: '500g', price: 25, stock: 40 },
        { id: '2-1kg', size: '1Kg', price: 45, stock: 35 },
      ],
      frequentlyBoughtTogether: ['1', '3'],
      tags: ['dairy', 'organic', 'probiotic'],
      subscriptionOnly: true,
    },
    {
      id: '3',
      name: 'Pure Desi Ghee',
      price: 450,
      image: '/products/Ghee.png',
      category: 'Dairy',
      description: 'Traditional hand-churned ghee made from A2 milk, perfect for cooking and health.',
      stock: 25,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 156,
      variations: [
        { id: '3-500ml', size: '500ml', price: 450, stock: 25 },
        { id: '3-1l', size: '1L', price: 850, stock: 20 },
      ],
      frequentlyBoughtTogether: ['1', '4'],
      tags: ['dairy', 'organic', 'traditional'],
    },
    {
      id: '4',
      name: 'Fresh Paneer',
      price: 80,
      image: '/products/Paneer.png',
      category: 'Dairy',
      description: 'Soft and fresh cottage cheese made daily from pure milk.',
      stock: 30,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 87,
      variations: [
        { id: '4-250g', size: '250g', price: 80, stock: 30 },
        { id: '4-500g', size: '500g', price: 150, stock: 25 },
      ],
      frequentlyBoughtTogether: ['1', '3'],
      tags: ['dairy', 'organic', 'protein'],
    },
    {
      id: '5',
      name: 'Organic Honey',
      price: 250,
      image: '/products/Honey.png',
      category: 'Natural Products',
      description: 'Pure raw honey harvested from our farm, rich in antioxidants.',
      stock: 35,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 112,
      variations: [
        { id: '5-250g', size: '250g', price: 250, stock: 35 },
        { id: '5-500g', size: '500g', price: 450, stock: 28 },
      ],
      frequentlyBoughtTogether: ['1', '2'],
      tags: ['natural', 'organic', 'raw'],
    },
    {
      id: '6',
      name: 'Fresh Vegetables',
      price: 40,
      image: '/products/Vegetables.png',
      category: 'Vegetables',
      description: 'Seasonal organic vegetables grown without pesticides.',
      stock: 60,
      reviews: [],
      averageRating: 4.5,
      totalReviews: 76,
      frequentlyBoughtTogether: ['1', '4'],
      tags: ['vegetables', 'organic', 'seasonal'],
    },
    {
      id: '7',
      name: 'Organic Eggs',
      price: 60,
      image: '/products/Eggs.png',
      category: 'Poultry',
      description: 'Free-range eggs from naturally raised hens.',
      stock: 100,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 143,
      variations: [
        { id: '7-6pc', size: '6 pieces', price: 60, stock: 100 },
        { id: '7-12pc', size: '12 pieces', price: 110, stock: 80 },
        { id: '7-30pc', size: '30 pieces', price: 260, stock: 50 },
      ],
      frequentlyBoughtTogether: ['1', '4'],
      tags: ['poultry', 'organic', 'free-range'],
    },
  ]);

  const [bundles] = useState<BundleDeal[]>([
    {
      id: 'bundle-1',
      name: 'Dairy Essentials Pack',
      description: 'Complete dairy combo: Milk (1L) + Ghee (500ml) + Paneer (250g)',
      products: ['1', '3', '4'],
      originalPrice: 585,
      discountedPrice: 500,
      discount: 15,
      image: '/products/Milk.png',
    },
    {
      id: 'bundle-2',
      name: 'Breakfast Bundle',
      description: 'Start your day right: Milk (1L) + Eggs (12pc) + Honey (250g)',
      products: ['1', '7', '5'],
      originalPrice: 415,
      discountedPrice: 350,
      discount: 16,
      image: '/products/Eggs.png',
    },
    {
      id: 'bundle-3',
      name: 'Complete Nutrition Pack',
      description: 'Full nutrition: Milk (2L) + Curd (1Kg) + Ghee (500ml) + Paneer (500g)',
      products: ['1', '2', '3', '4'],
      originalPrice: 650,
      discountedPrice: 550,
      discount: 15,
      image: '/products/Ghee.png',
    },
  ]);

  const addReview = (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const newReview: ProductReview = {
            ...review,
            id: `review-${Date.now()}`,
            date: new Date().toISOString(),
          };
          const updatedReviews = [...product.reviews, newReview];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          return {
            ...product,
            reviews: updatedReviews,
            averageRating: totalRating / updatedReviews.length,
            totalReviews: updatedReviews.length,
          };
        }
        return product;
      })
    );
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getRecommendations = (productId: string, limit: number = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    // Get products from same category
    return products
      .filter((p) => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  };

  const getFrequentlyBoughtTogether = (productId: string) => {
    const product = getProductById(productId);
    if (!product || !product.frequentlyBoughtTogether) return [];

    return product.frequentlyBoughtTogether
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);
  };

  const getSeasonalHighlights = () => {
    // Return products with highest ratings or tagged as seasonal
    return products
      .filter((p) => p.tags?.includes('seasonal') || p.averageRating >= 4.7)
      .slice(0, 6);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        bundles,
        addReview,
        getProductById,
        getRecommendations,
        getFrequentlyBoughtTogether,
        getSeasonalHighlights,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
