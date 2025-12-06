import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface GiftCard {
  id: string;
  amount: number;
  code: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  design: string;
  purchaseDate: string;
  expiryDate: string;
  isRedeemed: boolean;
  redeemedDate?: string;
  balance: number;
}

export interface PreMadeHamper {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'festival' | 'birthday' | 'wedding' | 'corporate' | 'wellness';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    image: string;
  }[];
  price: number;
  originalPrice: number;
  packaging: string;
  occasion: string;
  inStock: boolean;
}

export interface CustomHamperItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CustomHamper {
  id: string;
  name: string;
  items: CustomHamperItem[];
  packaging: 'standard' | 'premium' | 'luxury';
  packagingPrice: number;
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
  totalPrice: number;
  createdDate: string;
}

export interface GiftOrder {
  id: string;
  type: 'giftcard' | 'premade-hamper' | 'custom-hamper';
  giftCard?: GiftCard;
  hamper?: PreMadeHamper | CustomHamper;
  recipientName: string;
  recipientEmail?: string;
  recipientPhone?: string;
  deliveryAddress?: string;
  deliveryDate: string;
  message: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  orderDate: string;
}

interface GiftContextType {
  giftCards: GiftCard[];
  preMadeHampers: PreMadeHamper[];
  customHampers: CustomHamper[];
  giftOrders: GiftOrder[];
  availableProducts: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }[];
  giftCardDesigns: {
    id: string;
    name: string;
    image: string;
    occasion: string;
  }[];
  packagingOptions: {
    type: 'standard' | 'premium' | 'luxury';
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
  purchaseGiftCard: (
    amount: number,
    recipientName: string,
    recipientEmail: string,
    senderName: string,
    message: string,
    design: string
  ) => string;
  redeemGiftCard: (code: string, amount: number) => boolean;
  getGiftCardBalance: (code: string) => number;
  createCustomHamper: (name: string, items: CustomHamperItem[], packaging: 'standard' | 'premium' | 'luxury') => string;
  updateCustomHamper: (id: string, items: CustomHamperItem[], packaging: 'standard' | 'premium' | 'luxury') => void;
  addMessageToHamper: (id: string, recipientName: string, recipientEmail: string, message: string) => void;
  placeGiftOrder: (
    type: 'giftcard' | 'premade-hamper' | 'custom-hamper',
    itemId: string,
    recipientName: string,
    recipientEmail: string,
    recipientPhone: string,
    deliveryAddress: string,
    deliveryDate: string,
    message: string
  ) => string;
  getGiftOrderById: (id: string) => GiftOrder | undefined;
  getUserGiftCards: (userEmail: string) => GiftCard[];
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const useGift = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
};

// Sample data
const PREMADE_HAMPERS: PreMadeHamper[] = [
  {
    id: 'hamper-1',
    name: 'Diwali Delights Hamper',
    description: 'Celebrate the festival of lights with our premium dairy collection featuring pure desi ghee, fresh paneer, and traditional sweets.',
    image: '/products/Ghee.png',
    category: 'festival',
    items: [
      { productId: 'prod-5', productName: 'Pure Desi Ghee', quantity: 2, image: '/products/Ghee.png' },
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 3, image: '/products/Paneer.png' },
      { productId: 'prod-3', productName: 'Fresh Curd', quantity: 2, image: '/products/Curd.png' },
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 4, image: '/products/Milk.png' },
    ],
    price: 1899,
    originalPrice: 2299,
    packaging: 'Premium gift box with festive ribbon',
    occasion: 'Diwali',
    inStock: true,
  },
  {
    id: 'hamper-2',
    name: 'Birthday Bonanza Box',
    description: 'Make birthdays extra special with fresh dairy products, perfect for celebrations and cake baking.',
    image: '/products/Milk.png',
    category: 'birthday',
    items: [
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 3, image: '/products/Milk.png' },
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 2, image: '/products/Paneer.png' },
      { productId: 'prod-3', productName: 'Fresh Curd', quantity: 2, image: '/products/Curd.png' },
      { productId: 'prod-6', productName: 'Fresh Cream', quantity: 2, image: '/products/Malaai.png' },
    ],
    price: 1299,
    originalPrice: 1599,
    packaging: 'Birthday themed gift box with balloons',
    occasion: 'Birthday',
    inStock: true,
  },
  {
    id: 'hamper-3',
    name: 'Wedding Blessing Hamper',
    description: 'Traditional dairy hamper perfect for wedding gifts, featuring our finest organic products.',
    image: '/products/Ghee.png',
    category: 'wedding',
    items: [
      { productId: 'prod-5', productName: 'Pure Desi Ghee', quantity: 3, image: '/products/Ghee.png' },
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 5, image: '/products/Milk.png' },
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 3, image: '/products/Paneer.png' },
      { productId: 'prod-3', productName: 'Fresh Curd', quantity: 3, image: '/products/Curd.png' },
      { productId: 'prod-6', productName: 'Fresh Cream', quantity: 2, image: '/products/Malaai.png' },
    ],
    price: 2799,
    originalPrice: 3499,
    packaging: 'Luxury wooden box with golden embellishments',
    occasion: 'Wedding',
    inStock: true,
  },
  {
    id: 'hamper-4',
    name: 'Corporate Excellence Pack',
    description: 'Professional gift hamper ideal for corporate gifting and business partners.',
    image: '/products/Ghee.png',
    category: 'corporate',
    items: [
      { productId: 'prod-5', productName: 'Pure Desi Ghee', quantity: 2, image: '/products/Ghee.png' },
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 2, image: '/products/Paneer.png' },
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 3, image: '/products/Milk.png' },
    ],
    price: 1599,
    originalPrice: 1899,
    packaging: 'Premium black gift box with company card slot',
    occasion: 'Corporate Gift',
    inStock: true,
  },
  {
    id: 'hamper-5',
    name: 'Wellness & Health Hamper',
    description: 'Nutritious dairy collection promoting health and wellness with organic certified products.',
    image: '/products/Milk.png',
    category: 'wellness',
    items: [
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 4, image: '/products/Milk.png' },
      { productId: 'prod-3', productName: 'Fresh Curd', quantity: 3, image: '/products/Curd.png' },
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 2, image: '/products/Paneer.png' },
      { productId: 'prod-5', productName: 'Pure Desi Ghee', quantity: 1, image: '/products/Ghee.png' },
    ],
    price: 1699,
    originalPrice: 2099,
    packaging: 'Eco-friendly jute bag with wellness card',
    occasion: 'Health & Wellness',
    inStock: true,
  },
  {
    id: 'hamper-6',
    name: 'Holi Festival Hamper',
    description: 'Celebrate colors with traditional dairy treats perfect for Holi festivities.',
    image: '/products/Paneer.png',
    category: 'festival',
    items: [
      { productId: 'prod-4', productName: 'Fresh Paneer', quantity: 3, image: '/products/Paneer.png' },
      { productId: 'prod-3', productName: 'Fresh Curd', quantity: 4, image: '/products/Curd.png' },
      { productId: 'prod-2', productName: 'Full Cream Milk', quantity: 3, image: '/products/Milk.png' },
      { productId: 'prod-6', productName: 'Fresh Cream', quantity: 2, image: '/products/Malaai.png' },
    ],
    price: 1499,
    originalPrice: 1849,
    packaging: 'Colorful festive box with Holi greetings',
    occasion: 'Holi',
    inStock: true,
  },
];

const AVAILABLE_PRODUCTS = [
  { id: 'prod-1', name: 'Farm Fresh Milk (1L)', price: 65, image: '/products/Milk.png', category: 'Milk' },
  { id: 'prod-2', name: 'Full Cream Milk (1L)', price: 75, image: '/products/Milk.png', category: 'Milk' },
  { id: 'prod-3', name: 'Fresh Curd (500g)', price: 45, image: '/products/Curd.png', category: 'Curd' },
  { id: 'prod-4', name: 'Fresh Paneer (250g)', price: 90, image: '/products/Paneer.png', category: 'Paneer' },
  { id: 'prod-5', name: 'Pure Desi Ghee (500g)', price: 450, image: '/products/Ghee.png', category: 'Ghee' },
  { id: 'prod-6', name: 'Fresh Cream (200ml)', price: 55, image: '/products/Malaai.png', category: 'Cream' },
  { id: 'prod-7', name: 'Buttermilk (1L)', price: 40, image: '/products/Buttuer-Milk.png', category: 'Beverages' },
  { id: 'prod-8', name: 'Flavored Milk (500ml)', price: 45, image: '/products/Flavored-Milk-Combo.png', category: 'Beverages' },
];

const GIFT_CARD_DESIGNS = [
  { id: 'design-1', name: 'Birthday Celebration', image: '🎂', occasion: 'Birthday' },
  { id: 'design-2', name: 'Festive Joy', image: '🪔', occasion: 'Festival' },
  { id: 'design-3', name: 'Wedding Bells', image: '💍', occasion: 'Wedding' },
  { id: 'design-4', name: 'Thank You', image: '🙏', occasion: 'Gratitude' },
  { id: 'design-5', name: 'Congratulations', image: '🎉', occasion: 'Celebration' },
  { id: 'design-6', name: 'Get Well Soon', image: '🌸', occasion: 'Health' },
];

const PACKAGING_OPTIONS = [
  {
    type: 'standard' as const,
    name: 'Standard Gift Box',
    description: 'Eco-friendly cardboard box with basic ribbon',
    price: 0,
    image: '📦',
  },
  {
    type: 'premium' as const,
    name: 'Premium Gift Box',
    description: 'Elegant box with decorative ribbon and card',
    price: 150,
    image: '🎁',
  },
  {
    type: 'luxury' as const,
    name: 'Luxury Hamper Basket',
    description: 'Handcrafted wicker basket with satin lining',
    price: 350,
    image: '🧺',
  },
];

export const GiftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [customHampers, setCustomHampers] = useState<CustomHamper[]>([]);
  const [giftOrders, setGiftOrders] = useState<GiftOrder[]>([]);

  useEffect(() => {
    const storedGiftCards = localStorage.getItem('giftCards');
    const storedCustomHampers = localStorage.getItem('customHampers');
    const storedGiftOrders = localStorage.getItem('giftOrders');

    if (storedGiftCards) setGiftCards(JSON.parse(storedGiftCards));
    if (storedCustomHampers) setCustomHampers(JSON.parse(storedCustomHampers));
    if (storedGiftOrders) setGiftOrders(JSON.parse(storedGiftOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('giftCards', JSON.stringify(giftCards));
  }, [giftCards]);

  useEffect(() => {
    localStorage.setItem('customHampers', JSON.stringify(customHampers));
  }, [customHampers]);

  useEffect(() => {
    localStorage.setItem('giftOrders', JSON.stringify(giftOrders));
  }, [giftOrders]);

  const generateGiftCardCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AADHYA-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const purchaseGiftCard = (
    amount: number,
    recipientName: string,
    recipientEmail: string,
    senderName: string,
    message: string,
    design: string
  ): string => {
    const code = generateGiftCardCode();
    const purchaseDate = new Date().toISOString();
    const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year validity

    const giftCard: GiftCard = {
      id: `gc-${Date.now()}`,
      amount,
      code,
      recipientName,
      recipientEmail,
      senderName,
      message,
      design,
      purchaseDate,
      expiryDate,
      isRedeemed: false,
      balance: amount,
    };

    setGiftCards((prev) => [...prev, giftCard]);
    return code;
  };

  const redeemGiftCard = (code: string, amount: number): boolean => {
    const cardIndex = giftCards.findIndex((card) => card.code === code);
    if (cardIndex === -1) return false;

    const card = giftCards[cardIndex];
    if (card.balance < amount) return false;
    if (new Date(card.expiryDate) < new Date()) return false;

    const updatedCards = [...giftCards];
    updatedCards[cardIndex] = {
      ...card,
      balance: card.balance - amount,
      isRedeemed: card.balance - amount === 0,
      redeemedDate: card.balance - amount === 0 ? new Date().toISOString() : card.redeemedDate,
    };

    setGiftCards(updatedCards);
    return true;
  };

  const getGiftCardBalance = (code: string): number => {
    const card = giftCards.find((card) => card.code === code);
    return card ? card.balance : 0;
  };

  const createCustomHamper = (
    name: string,
    items: CustomHamperItem[],
    packaging: 'standard' | 'premium' | 'luxury'
  ): string => {
    const packagingPrice = PACKAGING_OPTIONS.find((p) => p.type === packaging)?.price || 0;
    const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const hamper: CustomHamper = {
      id: `ch-${Date.now()}`,
      name,
      items,
      packaging,
      packagingPrice,
      totalPrice: itemsTotal + packagingPrice,
      createdDate: new Date().toISOString(),
    };

    setCustomHampers((prev) => [...prev, hamper]);
    return hamper.id;
  };

  const updateCustomHamper = (
    id: string,
    items: CustomHamperItem[],
    packaging: 'standard' | 'premium' | 'luxury'
  ): void => {
    const hamperIndex = customHampers.findIndex((h) => h.id === id);
    if (hamperIndex === -1) return;

    const packagingPrice = PACKAGING_OPTIONS.find((p) => p.type === packaging)?.price || 0;
    const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const updatedHampers = [...customHampers];
    updatedHampers[hamperIndex] = {
      ...updatedHampers[hamperIndex],
      items,
      packaging,
      packagingPrice,
      totalPrice: itemsTotal + packagingPrice,
    };

    setCustomHampers(updatedHampers);
  };

  const addMessageToHamper = (
    id: string,
    recipientName: string,
    recipientEmail: string,
    message: string
  ): void => {
    const hamperIndex = customHampers.findIndex((h) => h.id === id);
    if (hamperIndex === -1) return;

    const updatedHampers = [...customHampers];
    updatedHampers[hamperIndex] = {
      ...updatedHampers[hamperIndex],
      recipientName,
      recipientEmail,
      message,
    };

    setCustomHampers(updatedHampers);
  };

  const placeGiftOrder = (
    type: 'giftcard' | 'premade-hamper' | 'custom-hamper',
    itemId: string,
    recipientName: string,
    recipientEmail: string,
    recipientPhone: string,
    deliveryAddress: string,
    deliveryDate: string,
    message: string
  ): string => {
    let giftCard: GiftCard | undefined;
    let hamper: PreMadeHamper | CustomHamper | undefined;
    let totalAmount = 0;

    if (type === 'giftcard') {
      giftCard = giftCards.find((gc) => gc.id === itemId);
      totalAmount = giftCard?.amount || 0;
    } else if (type === 'premade-hamper') {
      hamper = PREMADE_HAMPERS.find((h) => h.id === itemId);
      totalAmount = hamper?.price || 0;
    } else if (type === 'custom-hamper') {
      hamper = customHampers.find((h) => h.id === itemId);
      totalAmount = hamper?.totalPrice || 0;
    }

    const order: GiftOrder = {
      id: `go-${Date.now()}`,
      type,
      giftCard,
      hamper,
      recipientName,
      recipientEmail,
      recipientPhone,
      deliveryAddress,
      deliveryDate,
      message,
      totalAmount,
      status: 'pending',
      orderDate: new Date().toISOString(),
    };

    setGiftOrders((prev) => [...prev, order]);
    return order.id;
  };

  const getGiftOrderById = (id: string): GiftOrder | undefined => {
    return giftOrders.find((order) => order.id === id);
  };

  const getUserGiftCards = (userEmail: string): GiftCard[] => {
    return giftCards.filter((card) => card.recipientEmail === userEmail);
  };

  const value: GiftContextType = {
    giftCards,
    preMadeHampers: PREMADE_HAMPERS,
    customHampers,
    giftOrders,
    availableProducts: AVAILABLE_PRODUCTS,
    giftCardDesigns: GIFT_CARD_DESIGNS,
    packagingOptions: PACKAGING_OPTIONS,
    purchaseGiftCard,
    redeemGiftCard,
    getGiftCardBalance,
    createCustomHamper,
    updateCustomHamper,
    addMessageToHamper,
    placeGiftOrder,
    getGiftOrderById,
    getUserGiftCards,
  };

  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
};
