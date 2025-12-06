import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Referral {
  id: string;
  referrerUserId: string;
  referredEmail: string;
  referredName?: string;
  status: 'pending' | 'completed' | 'rewarded';
  rewardAmount: number;
  createdAt: string;
  completedAt?: string;
}

export interface Reward {
  id: string;
  userId: string;
  type: 'referral' | 'birthday' | 'seasonal' | 'flash-sale' | 'loyalty';
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  code: string;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  isUsed: boolean;
  usedAt?: string;
}

export interface FlashSale {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  discountPercentage: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  badge: string;
}

export interface SeasonalOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  discountCode: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  category?: string;
}

interface ReferralContextType {
  referrals: Referral[];
  rewards: Reward[];
  flashSales: FlashSale[];
  seasonalOffers: SeasonalOffer[];
  referralCode: string;
  generateReferralCode: (userId: string) => string;
  sendReferral: (email: string, name?: string) => void;
  shareOnWhatsApp: (productName: string, productUrl: string) => void;
  shareOnSocial: (platform: 'facebook' | 'twitter' | 'linkedin', productName: string, productUrl: string) => void;
  applyReward: (rewardId: string) => void;
  checkBirthdayReward: (userId: string, birthDate: string) => void;
  getReferralStats: (userId: string) => { totalReferrals: number; completedReferrals: number; totalEarned: number };
  getActiveRewards: (userId: string) => Reward[];
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error('useReferral must be used within ReferralProvider');
  }
  return context;
};

const FLASH_SALES: FlashSale[] = [
  {
    id: 'flash-1',
    title: 'Morning Fresh Milk Flash Sale',
    description: 'Get 30% off on all milk products for the next 2 hours!',
    productIds: ['milk-500ml', 'milk-1l'],
    discountPercentage: 30,
    startTime: new Date(Date.now()).toISOString(),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    badge: '🔥 Hot Deal'
  },
  {
    id: 'flash-2',
    title: 'Weekend Dairy Combo',
    description: 'Buy Curd + Paneer + Ghee and save 25%',
    productIds: ['curd-1kg', 'paneer', 'ghee'],
    discountPercentage: 25,
    startTime: new Date(Date.now()).toISOString(),
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    badge: '⚡ Weekend Special'
  }
];

const SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: 'seasonal-1',
    title: 'Winter Wellness Pack',
    description: 'Stay warm and healthy with our winter special dairy products',
    image: '/products/Milk.png',
    discountCode: 'WINTER2025',
    discountPercentage: 20,
    validFrom: '2025-12-01',
    validUntil: '2026-02-28',
    isActive: true,
    category: 'dairy'
  },
  {
    id: 'seasonal-2',
    title: 'New Year Special',
    description: 'Start the year fresh with 15% off on all products',
    image: '/products/Ghee.png',
    discountCode: 'NEWYEAR2026',
    discountPercentage: 15,
    validFrom: '2025-12-25',
    validUntil: '2026-01-15',
    isActive: true
  },
  {
    id: 'seasonal-3',
    title: 'Festive Ghee Offer',
    description: 'Pure desi ghee at special festive prices',
    image: '/products/Ghee.png',
    discountCode: 'FESTIVE25',
    discountPercentage: 25,
    validFrom: '2025-12-01',
    validUntil: '2026-01-31',
    isActive: true,
    category: 'ghee'
  }
];

export const ReferralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem('referrals');
    return saved ? JSON.parse(saved) : [];
  });

  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('rewards');
    return saved ? JSON.parse(saved) : [];
  });

  const [referralCode, setReferralCode] = useState<string>(() => {
    const saved = localStorage.getItem('referralCode');
    return saved || '';
  });

  const [flashSales] = useState<FlashSale[]>(FLASH_SALES);
  const [seasonalOffers] = useState<SeasonalOffer[]>(SEASONAL_OFFERS);

  useEffect(() => {
    localStorage.setItem('referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('referralCode', referralCode);
  }, [referralCode]);

  const generateReferralCode = (userId: string): string => {
    const code = `AADHYA${userId.substring(0, 4).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setReferralCode(code);
    return code;
  };

  const sendReferral = (email: string, name?: string) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!currentUser.id) return;

    const newReferral: Referral = {
      id: Date.now().toString(),
      referrerUserId: currentUser.id,
      referredEmail: email,
      referredName: name,
      status: 'pending',
      rewardAmount: 100,
      createdAt: new Date().toISOString()
    };

    setReferrals(prev => [...prev, newReferral]);

    // Create a reward for the referrer
    const newReward: Reward = {
      id: Date.now().toString(),
      userId: currentUser.id,
      type: 'referral',
      title: 'Referral Reward',
      description: `Referred ${name || email} - Earn ₹100 when they make their first purchase`,
      discountType: 'fixed',
      discountValue: 100,
      code: `REF${Date.now()}`,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      isUsed: false
    };

    setRewards(prev => [...prev, newReward]);
  };

  const shareOnWhatsApp = (productName: string, productUrl: string) => {
    const message = `Check out this amazing product from Aadhya Farms: ${productName}! 
    
🌿 Fresh from the farm
🚚 Free home delivery
💚 100% organic

Use my referral code: ${referralCode} and get ₹100 off on your first order!

${window.location.origin}${productUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin', productName: string, productUrl: string) => {
    const fullUrl = `${window.location.origin}${productUrl}`;
    const message = `Check out ${productName} from Aadhya Farms! Use code ${referralCode} for ₹100 off!`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(fullUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const applyReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward =>
      reward.id === rewardId
        ? { ...reward, isUsed: true, usedAt: new Date().toISOString() }
        : reward
    ));
  };

  const checkBirthdayReward = (userId: string, birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    if (today.getMonth() === birth.getMonth()) {
      // Check if birthday reward already exists for this year
      const existingBirthdayReward = rewards.find(
        r => r.userId === userId && 
        r.type === 'birthday' && 
        new Date(r.validFrom).getFullYear() === today.getFullYear()
      );

      if (!existingBirthdayReward) {
        const birthdayReward: Reward = {
          id: Date.now().toString(),
          userId: userId,
          type: 'birthday',
          title: '🎉 Birthday Month Special!',
          description: 'Happy Birthday! Enjoy 20% off on your birthday month',
          discountType: 'percentage',
          discountValue: 20,
          code: `BDAY${today.getFullYear()}`,
          maxDiscount: 500,
          validFrom: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
          validUntil: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString(),
          isUsed: false
        };

        setRewards(prev => [...prev, birthdayReward]);
      }
    }
  };

  const getReferralStats = (userId: string) => {
    const userReferrals = referrals.filter(r => r.referrerUserId === userId);
    const completedReferrals = userReferrals.filter(r => r.status === 'completed' || r.status === 'rewarded');
    const totalEarned = completedReferrals.reduce((sum, r) => sum + r.rewardAmount, 0);

    return {
      totalReferrals: userReferrals.length,
      completedReferrals: completedReferrals.length,
      totalEarned
    };
  };

  const getActiveRewards = (userId: string) => {
    const now = new Date();
    return rewards.filter(
      r => r.userId === userId &&
      !r.isUsed &&
      new Date(r.validFrom) <= now &&
      new Date(r.validUntil) >= now
    );
  };

  return (
    <ReferralContext.Provider
      value={{
        referrals,
        rewards,
        flashSales,
        seasonalOffers,
        referralCode,
        generateReferralCode,
        sendReferral,
        shareOnWhatsApp,
        shareOnSocial,
        applyReward,
        checkBirthdayReward,
        getReferralStats,
        getActiveRewards
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};
