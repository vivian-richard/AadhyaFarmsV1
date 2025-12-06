import React, { createContext, useContext, useState } from 'react';

interface Coupon {
  code: string;
  discount: number; // percentage or fixed amount
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  description: string;
}

interface CouponContextType {
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  calculateDiscount: (totalAmount: number) => number;
  availableCoupons: Coupon[];
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

// Predefined coupons
const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    description: 'Get 10% off on your first order',
  },
  {
    code: 'SAVE50',
    discount: 50,
    type: 'fixed',
    minPurchase: 500,
    description: 'Save ₹50 on orders above ₹500',
  },
  {
    code: 'FRESH20',
    discount: 20,
    type: 'percentage',
    minPurchase: 1000,
    description: 'Get 20% off on orders above ₹1000',
  },
  {
    code: 'FARM15',
    discount: 15,
    type: 'percentage',
    description: 'Get 15% off on all farm products',
  },
  {
    code: 'MEGA100',
    discount: 100,
    type: 'fixed',
    minPurchase: 2000,
    description: 'Save ₹100 on orders above ₹2000',
  },
];

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string): boolean => {
    const coupon = COUPONS.find((c) => c.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (totalAmount: number): number => {
    if (!appliedCoupon) return 0;

    // Check minimum purchase requirement
    if (appliedCoupon.minPurchase && totalAmount < appliedCoupon.minPurchase) {
      return 0;
    }

    if (appliedCoupon.type === 'percentage') {
      return (totalAmount * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
        availableCoupons: COUPONS,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within CouponProvider');
  }
  return context;
};
