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
      name: 'Fresh Milk',
      price: 70,
      image: '/products/Milk.png',
      category: 'Dairy',
      description: 'Pure A2 milk from our grass-fed cows, rich in nutrients and natural goodness',
      unit: 'per liter',
      stock: 50,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 124,
      frequentlyBoughtTogether: ['2', '15'],
      tags: ['dairy', 'organic', 'a2-milk'],
      subscriptionOnly: true,
    },
    {
      id: '2',
      name: 'Badam Milk',
      price: 90,
      image: '/products/Badam-Milk.png',
      category: 'Dairy',
      description: 'Delicious almond-flavored milk packed with nutrients and natural sweetness',
      unit: 'per liter',
      stock: 40,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 89,
      tags: ['dairy', 'flavored'],
    },
    {
      id: '3',
      name: 'Banana Milk',
      price: 85,
      image: '/products/Banana-milk.png',
      category: 'Dairy',
      description: 'Creamy banana-flavored milk, a perfect energy drink for all ages',
      unit: 'per liter',
      stock: 40,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 76,
      tags: ['dairy', 'flavored'],
    },
    {
      id: '4',
      name: 'Chocolate Milk',
      price: 85,
      image: '/products/Chacolate-Milk.png',
      category: 'Dairy',
      description: 'Rich chocolate milk made with pure cocoa and fresh dairy',
      unit: 'per liter',
      stock: 45,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 142,
      tags: ['dairy', 'flavored'],
    },
    {
      id: '5',
      name: 'Rose Milk',
      price: 85,
      image: '/products/Rose-Milk.png',
      category: 'Dairy',
      description: 'Aromatic rose-flavored milk with natural rose essence',
      unit: 'per liter',
      stock: 35,
      reviews: [],
      averageRating: 4.5,
      totalReviews: 63,
      tags: ['dairy', 'flavored'],
    },
    {
      id: '6',
      name: 'Strawberry Milk',
      price: 85,
      image: '/products/Strawberry-Milk.png',
      category: 'Dairy',
      description: 'Sweet strawberry-flavored milk with real fruit goodness',
      unit: 'per liter',
      stock: 40,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 98,
      tags: ['dairy', 'flavored'],
    },
    {
      id: '7',
      name: 'Dryfruit Milk',
      price: 120,
      image: '/products/Dryfruit-Milk.png',
      category: 'Dairy',
      description: 'Premium milk enriched with assorted dry fruits and nuts',
      unit: 'per liter',
      stock: 30,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 134,
      tags: ['dairy', 'premium'],
    },
    {
      id: '8',
      name: 'Flavored Milk Combo',
      price: 400,
      image: '/products/Flavored-Milk-Combo.png',
      category: 'Dairy',
      description: 'Variety pack of all our delicious flavored milk options',
      unit: 'per pack',
      stock: 20,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 87,
      tags: ['dairy', 'combo'],
    },
    {
      id: '9',
      name: 'Butter Milk',
      price: 50,
      image: '/products/Buttuer-Milk.png',
      category: 'Dairy',
      description: 'Traditional buttermilk with natural probiotics for healthy digestion',
      unit: 'per liter',
      stock: 60,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 112,
      tags: ['dairy', 'probiotic'],
      subscriptionOnly: true,
    },
    {
      id: '10',
      name: 'Fresh Curd',
      price: 60,
      image: '/products/Curd.png',
      category: 'Dairy',
      description: 'Thick, creamy yogurt with natural probiotics for healthy digestion',
      unit: 'per kg',
      stock: 50,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 156,
      tags: ['dairy', 'probiotic'],
      subscriptionOnly: true,
    },
    {
      id: '11',
      name: 'Fresh Paneer',
      price: 350,
      image: '/products/Paneer.png',
      category: 'Dairy',
      description: 'Soft, fresh cottage cheese made daily from organic milk',
      unit: 'per kg',
      stock: 35,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 143,
      tags: ['dairy', 'protein'],
    },
    {
      id: '12',
      name: 'Pure Ghee',
      price: 800,
      image: '/products/Ghee.png',
      category: 'Dairy',
      description: 'Traditional hand-churned ghee made from pure cow milk, the essence of purity',
      unit: 'per kg',
      stock: 25,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 198,
      tags: ['dairy', 'traditional'],
    },
    {
      id: '13',
      name: 'Fresh Malaai',
      price: 200,
      image: '/products/Malaai.png',
      category: 'Dairy',
      description: 'Rich, creamy malai collected from fresh milk',
      unit: 'per kg',
      stock: 30,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 89,
      tags: ['dairy', 'premium'],
    },
    {
      id: '14',
      name: 'Kova',
      price: 400,
      image: '/products/Kova.png',
      category: 'Dairy',
      description: 'Traditional milk solid, perfect for making Indian sweets',
      unit: 'per kg',
      stock: 20,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 67,
      tags: ['dairy', 'sweets'],
    },
    {
      id: '15',
      name: 'Farm Fresh Eggs',
      price: 90,
      image: '/products/Eggs.png',
      category: 'Meat',
      description: 'Free-range chicken eggs with rich golden yolks, packed with protein',
      unit: 'per dozen',
      stock: 100,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 234,
      tags: ['eggs', 'protein'],
      subscriptionOnly: true,
    },
    {
      id: '16',
      name: 'Fresh Chicken',
      price: 280,
      image: '/products/chicken.png',
      category: 'Meat',
      description: 'Farm-raised, antibiotic-free chicken for healthy meals',
      unit: 'per kg',
      stock: 40,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 176,
      tags: ['chicken', 'protein'],
    },
    {
      id: '17',
      name: 'Chicken Bone',
      price: 200,
      image: '/products/chicken-bone.png',
      category: 'Meat',
      description: 'Fresh chicken with bone, perfect for curries and traditional dishes',
      unit: 'per kg',
      stock: 35,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 134,
      tags: ['chicken'],
    },
    {
      id: '18',
      name: 'Marinated Chicken',
      price: 320,
      image: '/products/Chicken-Marinated .png',
      category: 'Meat',
      description: 'Expertly marinated chicken ready for grilling or cooking',
      unit: 'per kg',
      stock: 30,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 198,
      tags: ['chicken', 'marinated'],
    },
    {
      id: '19',
      name: 'Chicken Tandoori',
      price: 350,
      image: '/products/Chicken-Tandoori.png',
      category: 'Meat',
      description: 'Tandoori-spiced marinated chicken, ready to cook',
      unit: 'per kg',
      stock: 25,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 212,
      tags: ['chicken', 'marinated'],
    },
    {
      id: '20',
      name: 'Chicken Liver',
      price: 180,
      image: '/products/Liver.png',
      category: 'Meat',
      description: 'Fresh chicken liver, rich in iron and nutrients',
      unit: 'per kg',
      stock: 20,
      reviews: [],
      averageRating: 4.5,
      totalReviews: 87,
      tags: ['chicken', 'organ'],
    },
    {
      id: '21',
      name: 'Marinated Chicken Liver',
      price: 200,
      image: '/products/Marinated-Chicken-Liver.png',
      category: 'Meat',
      description: 'Marinated chicken liver with aromatic spices',
      unit: 'per kg',
      stock: 18,
      reviews: [],
      averageRating: 4.6,
      totalReviews: 93,
      tags: ['chicken', 'marinated'],
    },
    {
      id: '22',
      name: 'Mutton Boneless',
      price: 750,
      image: '/products/Mutton-Boneless.png',
      category: 'Meat',
      description: 'Premium boneless mutton, tender and flavorful',
      unit: 'per kg',
      stock: 25,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 167,
      tags: ['mutton', 'premium'],
    },
    {
      id: '23',
      name: 'Mutton Bone',
      price: 600,
      image: '/products/Mutton-Bone.png',
      category: 'Meat',
      description: 'Fresh mutton with bone, ideal for rich curries',
      unit: 'per kg',
      stock: 30,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 143,
      tags: ['mutton'],
    },
    {
      id: '24',
      name: 'Mutton Chops',
      price: 700,
      image: '/products/Mutton-Chops.png',
      category: 'Meat',
      description: 'Succulent mutton chops, perfect for grilling',
      unit: 'per kg',
      stock: 22,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 156,
      tags: ['mutton'],
    },
    {
      id: '25',
      name: 'Mutton Kheema',
      price: 650,
      image: '/products/Mutton-Kheema.png',
      category: 'Meat',
      description: 'Freshly minced mutton for kebabs and curries',
      unit: 'per kg',
      stock: 28,
      reviews: [],
      averageRating: 4.7,
      totalReviews: 134,
      tags: ['mutton', 'minced'],
    },
    {
      id: '26',
      name: 'Marinated Mutton',
      price: 800,
      image: '/products/Mutton-Marinated.png',
      category: 'Meat',
      description: 'Marinated mutton with traditional spices, ready to cook',
      unit: 'per kg',
      stock: 20,
      reviews: [],
      averageRating: 4.9,
      totalReviews: 189,
      tags: ['mutton', 'marinated'],
    },
    {
      id: '27',
      name: 'Boti',
      price: 720,
      image: '/products/Boti.png',
      category: 'Meat',
      description: 'Tender mutton boti pieces, perfect for kebabs',
      unit: 'per kg',
      stock: 24,
      reviews: [],
      averageRating: 4.8,
      totalReviews: 176,
      tags: ['mutton'],
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
