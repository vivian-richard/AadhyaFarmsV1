import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SubscriptionProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

export interface SubscriptionItem {
  product: SubscriptionProduct;
  quantity: number;
}

export interface DeliverySchedule {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface Subscription {
  id: string;
  items: SubscriptionItem[];
  frequency: 'daily' | 'weekly' | 'monthly';
  deliverySchedule: DeliverySchedule;
  startDate: string;
  status: 'active' | 'paused' | 'cancelled';
  totalAmount: number;
  discount: number; // percentage
  nextDelivery: string;
  addressId: string;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  availableProducts: SubscriptionProduct[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'nextDelivery'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  getDiscountPercentage: (frequency: string) => number;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Available subscription products (Milk and Curd only)
const SUBSCRIPTION_PRODUCTS: SubscriptionProduct[] = [
  {
    id: 'milk-500ml',
    name: 'Fresh Farm Milk',
    price: 30,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
    unit: '500ml',
  },
  {
    id: 'milk-1l',
    name: 'Fresh Farm Milk',
    price: 55,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
    unit: '1 Liter',
  },
  {
    id: 'curd-500g',
    name: 'Organic Curd',
    price: 35,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500',
    unit: '500g',
  },
  {
    id: 'curd-1kg',
    name: 'Organic Curd',
    price: 65,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500',
    unit: '1 Kg',
  },
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const getDiscountPercentage = (frequency: string): number => {
    switch (frequency) {
      case 'daily':
        return 15;
      case 'weekly':
        return 12;
      case 'monthly':
        return 10;
      default:
        return 0;
    }
  };

  const calculateNextDelivery = (
    startDate: string,
    frequency: string,
    schedule: DeliverySchedule
  ): string => {
    const today = new Date();
    const start = new Date(startDate);
    
    if (start > today) {
      return startDate;
    }

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 1);

    if (frequency === 'daily') {
      // Find next day that's in the schedule
      for (let i = 0; i < 7; i++) {
        const dayName = daysOfWeek[nextDate.getDay()] as keyof DeliverySchedule;
        if (schedule[dayName]) {
          return nextDate.toISOString();
        }
        nextDate.setDate(nextDate.getDate() + 1);
      }
    } else if (frequency === 'weekly') {
      // Next week, same selected days
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (frequency === 'monthly') {
      // Next month, same date
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    return nextDate.toISOString();
  };

  const addSubscription = (subscription: Omit<Subscription, 'id' | 'nextDelivery'>) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: Date.now().toString(),
      nextDelivery: calculateNextDelivery(
        subscription.startDate,
        subscription.frequency,
        subscription.deliverySchedule
      ),
    };
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(
      subscriptions.map((sub) => {
        if (sub.id === id) {
          const updated = { ...sub, ...updates };
          if (updates.frequency || updates.deliverySchedule || updates.startDate) {
            updated.nextDelivery = calculateNextDelivery(
              updated.startDate,
              updated.frequency,
              updated.deliverySchedule
            );
          }
          return updated;
        }
        return sub;
      })
    );
  };

  const pauseSubscription = (id: string) => {
    updateSubscription(id, { status: 'paused' });
  };

  const resumeSubscription = (id: string) => {
    updateSubscription(id, { status: 'active' });
  };

  const cancelSubscription = (id: string) => {
    updateSubscription(id, { status: 'cancelled' });
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        availableProducts: SUBSCRIPTION_PRODUCTS,
        addSubscription,
        updateSubscription,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        getDiscountPercentage,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
