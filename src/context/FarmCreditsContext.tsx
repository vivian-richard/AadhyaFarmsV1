import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interfaces
interface Container {
  id: string;
  name: string;
  type: 'glass-bottle' | 'plastic-bottle' | 'container' | 'jar';
  creditValue: number;
  product: string;
  image: string;
  description: string;
}

interface ReturnRequest {
  id: string;
  userId: string;
  containers: {
    containerId: string;
    containerName: string;
    quantity: number;
    creditValue: number;
    totalCredits: number;
  }[];
  totalCredits: number;
  status: 'pending' | 'scheduled' | 'picked-up' | 'verified' | 'credited' | 'rejected';
  requestDate: string;
  scheduledPickupDate?: string;
  pickupTimeSlot?: string;
  pickupAddress: string;
  contactNumber: string;
  notes?: string;
  verificationNotes?: string;
  creditedDate?: string;
  rejectionReason?: string;
}

interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  amount: number;
  description: string;
  date: string;
  relatedReturnId?: string;
  expiryDate?: string;
}

interface CreditRedemption {
  id: string;
  code: string;
  type: 'discount' | 'free-product' | 'bonus-points';
  creditCost: number;
  value: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
}

interface FarmCreditsContextType {
  containers: Container[];
  returnRequests: ReturnRequest[];
  transactions: CreditTransaction[];
  redemptions: CreditRedemption[];
  userCredits: number;
  getContainerById: (id: string) => Container | undefined;
  createReturnRequest: (request: Omit<ReturnRequest, 'id' | 'requestDate' | 'status'>) => string;
  updateReturnStatus: (requestId: string, status: ReturnRequest['status'], notes?: string) => boolean;
  getUserReturnRequests: (userId: string) => ReturnRequest[];
  earnCredits: (userId: string, amount: number, description: string, returnId?: string) => void;
  redeemCredits: (userId: string, amount: number, description: string) => boolean;
  getUserTransactions: (userId: string) => CreditTransaction[];
  getRedemptionById: (id: string) => CreditRedemption | undefined;
  calculateCredits: (containers: { containerId: string; quantity: number }[]) => number;
}

const FarmCreditsContext = createContext<FarmCreditsContextType | undefined>(undefined);

// Available containers for return
const CONTAINERS: Container[] = [
  {
    id: 'container-1',
    name: 'Glass Milk Bottle (1L)',
    type: 'glass-bottle',
    creditValue: 10,
    product: 'Milk',
    image: '/products/Milk.png',
    description: 'Standard 1L glass milk bottle',
  },
  {
    id: 'container-2',
    name: 'Glass Milk Bottle (500ml)',
    type: 'glass-bottle',
    creditValue: 7,
    product: 'Milk',
    image: '/products/Milk.png',
    description: 'Small 500ml glass milk bottle',
  },
  {
    id: 'container-3',
    name: 'Plastic Buttermilk Bottle (500ml)',
    type: 'plastic-bottle',
    creditValue: 3,
    product: 'Buttermilk',
    image: '/products/Buttuer-Milk.png',
    description: 'Recyclable plastic buttermilk bottle',
  },
  {
    id: 'container-4',
    name: 'Glass Curd Container (500g)',
    type: 'jar',
    creditValue: 8,
    product: 'Curd',
    image: '/products/Curd.png',
    description: 'Reusable glass curd container',
  },
  {
    id: 'container-5',
    name: 'Glass Ghee Jar (500g)',
    type: 'jar',
    creditValue: 12,
    product: 'Ghee',
    image: '/products/Ghee.png',
    description: 'Premium glass ghee jar',
  },
  {
    id: 'container-6',
    name: 'Plastic Paneer Container (250g)',
    type: 'container',
    creditValue: 5,
    product: 'Paneer',
    image: '/products/Paneer.png',
    description: 'Food-grade plastic paneer container',
  },
  {
    id: 'container-7',
    name: 'Glass Malai Container (200g)',
    type: 'jar',
    creditValue: 6,
    product: 'Malai',
    image: '/products/Malaai.png',
    description: 'Small glass malai container',
  },
];

// Credit redemption options
const REDEMPTIONS: CreditRedemption[] = [
  {
    id: 'redeem-1',
    code: 'CREDIT50',
    type: 'discount',
    creditCost: 50,
    value: 50,
    title: '₹50 Discount Voucher',
    description: 'Get ₹50 off on your next order',
    image: '/farmstay1.png',
    available: true,
  },
  {
    id: 'redeem-2',
    code: 'CREDIT100',
    type: 'discount',
    creditCost: 100,
    value: 100,
    title: '₹100 Discount Voucher',
    description: 'Get ₹100 off on orders above ₹500',
    image: '/farmstay1.png',
    available: true,
  },
  {
    id: 'redeem-3',
    code: 'CREDIT200',
    type: 'discount',
    creditCost: 200,
    value: 200,
    title: '₹200 Discount Voucher',
    description: 'Get ₹200 off on orders above ₹1000',
    image: '/farmstay1.png',
    available: true,
  },
  {
    id: 'redeem-4',
    code: 'FREEMILK',
    type: 'free-product',
    creditCost: 75,
    value: 75,
    title: 'Free 1L Milk',
    description: 'Get 1L fresh milk absolutely free',
    image: '/products/Milk.png',
    available: true,
  },
  {
    id: 'redeem-5',
    code: 'FREECURD',
    type: 'free-product',
    creditCost: 45,
    value: 45,
    title: 'Free 500g Curd',
    description: 'Get 500g fresh curd absolutely free',
    image: '/products/Curd.png',
    available: true,
  },
  {
    id: 'redeem-6',
    code: 'BONUS50',
    type: 'bonus-points',
    creditCost: 150,
    value: 200,
    title: '200 Loyalty Points',
    description: 'Get 200 loyalty points added to your account',
    image: '/farmstay1.png',
    available: true,
  },
];

export const FarmCreditsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [userCredits, setUserCredits] = useState<number>(0);

  // Load data from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('farmCredits_returnRequests');
    const savedTransactions = localStorage.getItem('farmCredits_transactions');
    const savedCredits = localStorage.getItem('farmCredits_userCredits');

    if (savedRequests) {
      setReturnRequests(JSON.parse(savedRequests));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedCredits) {
      setUserCredits(JSON.parse(savedCredits));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('farmCredits_returnRequests', JSON.stringify(returnRequests));
  }, [returnRequests]);

  useEffect(() => {
    localStorage.setItem('farmCredits_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('farmCredits_userCredits', JSON.stringify(userCredits));
  }, [userCredits]);

  const getContainerById = (id: string): Container | undefined => {
    return CONTAINERS.find(c => c.id === id);
  };

  const getRedemptionById = (id: string): CreditRedemption | undefined => {
    return REDEMPTIONS.find(r => r.id === id);
  };

  const calculateCredits = (containers: { containerId: string; quantity: number }[]): number => {
    return containers.reduce((total, item) => {
      const container = getContainerById(item.containerId);
      if (container) {
        return total + (container.creditValue * item.quantity);
      }
      return total;
    }, 0);
  };

  const createReturnRequest = (
    request: Omit<ReturnRequest, 'id' | 'requestDate' | 'status'>
  ): string => {
    const newRequest: ReturnRequest = {
      ...request,
      id: `return-${Date.now()}`,
      requestDate: new Date().toISOString(),
      status: 'pending',
    };

    setReturnRequests(prev => [...prev, newRequest]);
    return newRequest.id;
  };

  const updateReturnStatus = (
    requestId: string,
    status: ReturnRequest['status'],
    notes?: string
  ): boolean => {
    const request = returnRequests.find(r => r.id === requestId);
    if (!request) return false;

    const updatedRequest: ReturnRequest = {
      ...request,
      status,
    };

    if (status === 'verified' && notes) {
      updatedRequest.verificationNotes = notes;
    }

    if (status === 'rejected' && notes) {
      updatedRequest.rejectionReason = notes;
    }

    if (status === 'credited') {
      updatedRequest.creditedDate = new Date().toISOString();
      // Earn credits for the user
      earnCredits(
        request.userId,
        request.totalCredits,
        `Credits from return request #${requestId.slice(-8)}`,
        requestId
      );
    }

    setReturnRequests(prev =>
      prev.map(r => (r.id === requestId ? updatedRequest : r))
    );

    return true;
  };

  const getUserReturnRequests = (userId: string): ReturnRequest[] => {
    return returnRequests.filter(r => r.userId === userId);
  };

  const earnCredits = (
    userId: string,
    amount: number,
    description: string,
    returnId?: string
  ): void => {
    const transaction: CreditTransaction = {
      id: `txn-${Date.now()}`,
      userId,
      type: 'earned',
      amount,
      description,
      date: new Date().toISOString(),
      relatedReturnId: returnId,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year expiry
    };

    setTransactions(prev => [...prev, transaction]);
    setUserCredits(prev => prev + amount);
  };

  const redeemCredits = (
    userId: string,
    amount: number,
    description: string
  ): boolean => {
    if (userCredits < amount) {
      return false;
    }

    const transaction: CreditTransaction = {
      id: `txn-${Date.now()}`,
      userId,
      type: 'redeemed',
      amount,
      description,
      date: new Date().toISOString(),
    };

    setTransactions(prev => [...prev, transaction]);
    setUserCredits(prev => prev - amount);
    return true;
  };

  const getUserTransactions = (userId: string): CreditTransaction[] => {
    return transactions.filter(t => t.userId === userId).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  return (
    <FarmCreditsContext.Provider
      value={{
        containers: CONTAINERS,
        returnRequests,
        transactions,
        redemptions: REDEMPTIONS,
        userCredits,
        getContainerById,
        createReturnRequest,
        updateReturnStatus,
        getUserReturnRequests,
        earnCredits,
        redeemCredits,
        getUserTransactions,
        getRedemptionById,
        calculateCredits,
      }}
    >
      {children}
    </FarmCreditsContext.Provider>
  );
};

export const useFarmCredits = (): FarmCreditsContextType => {
  const context = useContext(FarmCreditsContext);
  if (!context) {
    throw new Error('useFarmCredits must be used within a FarmCreditsProvider');
  }
  return context;
};
