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

export interface VacationMode {
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface Subscription {
  id: string;
  items: SubscriptionItem[];
  deliverySchedule: DeliverySchedule; // Select which days to deliver
  startDate: string;
  status: 'active' | 'paused' | 'cancelled';
  totalAmount: number;
  nextDelivery: string;
  addressId: string;
  vacationMode?: VacationMode;
  skipDates?: string[]; // ISO date strings for one-time skips
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  availableProducts: SubscriptionProduct[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'nextDelivery'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  skipDelivery: (id: string, date: string) => void;
  setVacationMode: (id: string, startDate: string, endDate: string) => void;
  cancelVacationMode: (id: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Available subscription products (Milk and Curd only)
const SUBSCRIPTION_PRODUCTS: SubscriptionProduct[] = [
  {
    id: 'milk-500ml',
    name: 'Fresh Farm Milk',
    price: 30,
    image: '/products/Milk.png',
    unit: '500ml',
  },
  {
    id: 'milk-1l',
    name: 'Fresh Farm Milk',
    price: 55,
    image: '/products/Milk.png',
    unit: '1 Liter',
  },
  {
    id: 'curd-500g',
    name: 'Organic Curd',
    price: 35,
    image: '/products/Curd.png',
    unit: '500g',
  },
  {
    id: 'curd-1kg',
    name: 'Organic Curd',
    price: 65,
    image: '/products/Curd.png',
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

  const calculateNextDelivery = (
    startDate: string,
    schedule: DeliverySchedule,
    skipDates: string[] = [],
    vacationMode?: VacationMode
  ): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const nextDate = start > today ? new Date(start) : new Date(today);
    nextDate.setDate(nextDate.getDate() + 1);

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // Find next valid delivery day
    for (let i = 0; i < 30; i++) { // Check up to 30 days ahead
      const dayName = daysOfWeek[nextDate.getDay()] as keyof DeliverySchedule;
      const dateString = nextDate.toISOString().split('T')[0];
      
      // Check if this day is in the schedule
      if (!schedule[dayName]) {
        nextDate.setDate(nextDate.getDate() + 1);
        continue;
      }

      // Check if date is skipped
      if (skipDates.includes(dateString)) {
        nextDate.setDate(nextDate.getDate() + 1);
        continue;
      }

      // Check if date falls in vacation mode
      if (vacationMode?.isActive) {
        const vacStart = new Date(vacationMode.startDate);
        const vacEnd = new Date(vacationMode.endDate);
        vacStart.setHours(0, 0, 0, 0);
        vacEnd.setHours(0, 0, 0, 0);
        
        if (nextDate >= vacStart && nextDate <= vacEnd) {
          nextDate.setDate(nextDate.getDate() + 1);
          continue;
        }
      }

      return nextDate.toISOString();
    }

    return nextDate.toISOString();
  };

  const addSubscription = (subscription: Omit<Subscription, 'id' | 'nextDelivery'>) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: Date.now().toString(),
      skipDates: [],
      nextDelivery: calculateNextDelivery(
        subscription.startDate,
        subscription.deliverySchedule,
        [],
        subscription.vacationMode
      ),
    };
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(
      subscriptions.map((sub) => {
        if (sub.id === id) {
          const updated = { ...sub, ...updates };
          if (updates.deliverySchedule || updates.startDate || updates.skipDates || updates.vacationMode !== undefined) {
            updated.nextDelivery = calculateNextDelivery(
              updated.startDate,
              updated.deliverySchedule,
              updated.skipDates || [],
              updated.vacationMode
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

  const skipDelivery = (id: string, date: string) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    if (subscription) {
      const skipDates = [...(subscription.skipDates || []), date];
      updateSubscription(id, { skipDates });
    }
  };

  const setVacationMode = (id: string, startDate: string, endDate: string) => {
    updateSubscription(id, {
      vacationMode: {
        isActive: true,
        startDate,
        endDate,
      },
    });
  };

  const cancelVacationMode = (id: string) => {
    updateSubscription(id, {
      vacationMode: {
        isActive: false,
        startDate: '',
        endDate: '',
      },
    });
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
        skipDelivery,
        setVacationMode,
        cancelVacationMode,
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
