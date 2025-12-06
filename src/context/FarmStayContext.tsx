import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Room {
  id: string;
  name: string;
  type: 'deluxe' | 'premium' | 'cottage' | 'suite';
  description: string;
  images: string[];
  capacity: number;
  amenities: string[];
  pricePerNight: number;
  available: boolean;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  category: 'animal-care' | 'farming' | 'wellness' | 'adventure' | 'cultural';
  maxParticipants: number;
  ageRestriction?: string;
  includes: string[];
}

export interface SpecialPackage {
  id: string;
  name: string;
  occasion: 'anniversary' | 'birthday' | 'honeymoon' | 'family' | 'corporate';
  description: string;
  image: string;
  includes: string[];
  price: number;
  duration: string;
  highlights: string[];
}

export interface BookingDate {
  date: string;
  roomId: string;
  available: boolean;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  activities: {
    activityId: string;
    activityName: string;
    participants: number;
    date: string;
    price: number;
  }[];
  specialPackage?: {
    packageId: string;
    packageName: string;
    price: number;
  };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  bookingDate: string;
}

interface FarmStayContextType {
  rooms: Room[];
  activities: Activity[];
  specialPackages: SpecialPackage[];
  bookings: Booking[];
  getRoomById: (id: string) => Room | undefined;
  getActivityById: (id: string) => Activity | undefined;
  getPackageById: (id: string) => SpecialPackage | undefined;
  checkAvailability: (roomId: string, checkIn: string, checkOut: string) => boolean;
  calculateNights: (checkIn: string, checkOut: string) => number;
  calculateBookingTotal: (
    roomId: string,
    nights: number,
    activities: { activityId: string; participants: number }[],
    packageId?: string
  ) => number;
  createBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status' | 'paymentStatus'>) => string;
  cancelBooking: (bookingId: string) => boolean;
  getUserBookings: (userId: string) => Booking[];
  getBookedDates: (roomId: string) => string[];
}

const FarmStayContext = createContext<FarmStayContextType | undefined>(undefined);

export const useFarmStay = () => {
  const context = useContext(FarmStayContext);
  if (!context) {
    throw new Error('useFarmStay must be used within a FarmStayProvider');
  }
  return context;
};

// Sample Data
const ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Deluxe Garden View',
    type: 'deluxe',
    description: 'Spacious room with beautiful garden views, perfect for couples seeking a peaceful retreat.',
    images: ['/farmstay1.png', '/farmscene.png', '/farmscene2.png'],
    capacity: 2,
    amenities: ['King Size Bed', 'Private Balcony', 'Air Conditioning', 'Mini Fridge', 'Tea/Coffee Maker', 'Free WiFi', 'Organic Toiletries'],
    pricePerNight: 3500,
    available: true,
  },
  {
    id: 'room-2',
    name: 'Premium Farm Cottage',
    type: 'cottage',
    description: 'Traditional cottage experience with modern amenities, surrounded by lush greenery.',
    images: ['/farmstay.png', '/farmactivites.png', '/handandplant.png'],
    capacity: 4,
    amenities: ['Two Bedrooms', 'Living Area', 'Kitchenette', 'Private Garden', 'BBQ Area', 'Free WiFi', 'Farm View'],
    pricePerNight: 5500,
    available: true,
  },
  {
    id: 'room-3',
    name: 'Luxury Suite with Farm View',
    type: 'suite',
    description: 'Our most luxurious accommodation with panoramic farm views and premium facilities.',
    images: ['/farmscene2.png', '/farmstay1.png', '/tree.png'],
    capacity: 3,
    amenities: ['Master Bedroom', 'Living Room', 'Jacuzzi', 'Private Terrace', 'Butler Service', 'Premium Minibar', 'Smart TV', 'Work Desk'],
    pricePerNight: 7500,
    available: true,
  },
  {
    id: 'room-4',
    name: 'Family Farm House',
    type: 'cottage',
    description: 'Perfect for families, spacious farmhouse with multiple bedrooms and play area for kids.',
    images: ['/farmstay.png', '/cow.png', '/hen.png'],
    capacity: 6,
    amenities: ['Three Bedrooms', 'Kids Play Area', 'Dining Hall', 'Kitchen', 'Private Courtyard', 'Animal Visit Area', 'Free WiFi'],
    pricePerNight: 8500,
    available: true,
  },
];

const ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    name: 'Cow Feeding & Care',
    description: 'Experience the joy of feeding and caring for our gentle cows. Learn about dairy farming and sustainable practices.',
    image: '/cow.png',
    duration: '2 hours',
    price: 500,
    category: 'animal-care',
    maxParticipants: 10,
    ageRestriction: 'Suitable for all ages',
    includes: ['Guided tour', 'Feeding session', 'Photo opportunity', 'Fresh milk tasting'],
  },
  {
    id: 'activity-2',
    name: 'Traditional Milking Experience',
    description: 'Learn the traditional art of hand milking from our experienced farmers. A hands-on rural experience.',
    image: '/cow.png',
    duration: '1.5 hours',
    price: 750,
    category: 'farming',
    maxParticipants: 8,
    ageRestriction: 'Ages 8 and above',
    includes: ['Milking demonstration', 'Hands-on practice', 'Fresh dairy products', 'Certificate of participation'],
  },
  {
    id: 'activity-3',
    name: 'Organic Farming Workshop',
    description: 'Discover organic farming techniques, plant vegetables, and learn about sustainable agriculture.',
    image: '/handandplant.png',
    duration: '3 hours',
    price: 1000,
    category: 'farming',
    maxParticipants: 15,
    ageRestriction: 'Suitable for all ages',
    includes: ['Organic farming tour', 'Hands-on planting', 'Composting demo', 'Take-home seeds', 'Organic snacks'],
  },
  {
    id: 'activity-4',
    name: 'Poultry Farm Visit',
    description: 'Meet our free-range chickens and learn about ethical poultry farming. Collect fresh eggs!',
    image: '/hen.png',
    duration: '1 hour',
    price: 400,
    category: 'animal-care',
    maxParticipants: 12,
    ageRestriction: 'Suitable for all ages',
    includes: ['Chicken coop tour', 'Egg collection', 'Feeding session', 'Fresh eggs to take home'],
  },
  {
    id: 'activity-5',
    name: 'Farm-to-Table Cooking Class',
    description: 'Cook authentic village recipes using fresh ingredients from our farm. Learn traditional cooking methods.',
    image: '/farmactivites.png',
    duration: '3 hours',
    price: 1500,
    category: 'cultural',
    maxParticipants: 10,
    ageRestriction: 'Ages 10 and above',
    includes: ['Traditional kitchen setup', 'Fresh farm ingredients', 'Recipe booklet', 'Lunch included', 'Cooking certificate'],
  },
  {
    id: 'activity-6',
    name: 'Yoga & Meditation in Nature',
    description: 'Start your day with yoga and meditation amidst peaceful farm surroundings. Perfect for wellness.',
    image: '/tree.png',
    duration: '2 hours',
    price: 800,
    category: 'wellness',
    maxParticipants: 20,
    ageRestriction: 'Suitable for all ages',
    includes: ['Professional instructor', 'Yoga mats', 'Herbal tea', 'Guided meditation', 'Nature walk'],
  },
  {
    id: 'activity-7',
    name: 'Bullock Cart Ride',
    description: 'Traditional bullock cart ride through the farm and nearby village. Experience rural life.',
    image: '/farmscene.png',
    duration: '1 hour',
    price: 600,
    category: 'adventure',
    maxParticipants: 6,
    ageRestriction: 'Suitable for all ages',
    includes: ['Village tour', 'Cultural insights', 'Photo stops', 'Traditional snacks'],
  },
  {
    id: 'activity-8',
    name: 'Goat Farming Experience',
    description: 'Interact with our friendly goats, learn about goat rearing, and enjoy fresh goat milk products.',
    image: '/goat.png',
    duration: '1.5 hours',
    price: 550,
    category: 'animal-care',
    maxParticipants: 10,
    ageRestriction: 'Suitable for all ages',
    includes: ['Goat farm tour', 'Feeding session', 'Milk tasting', 'Cheese making demo'],
  },
];

const SPECIAL_PACKAGES: SpecialPackage[] = [
  {
    id: 'package-1',
    name: 'Romantic Anniversary Retreat',
    occasion: 'anniversary',
    description: 'Celebrate your special day with a romantic farm stay experience. Includes candlelight dinner and couple activities.',
    image: '/farmscene2.png',
    includes: [
      '2 Nights in Luxury Suite',
      'Welcome drink with fresh dairy treats',
      'Candlelight dinner with farm-fresh cuisine',
      'Couple spa session (coming soon)',
      'Private farm tour',
      'Complimentary anniversary cake',
      'Romantic room decoration',
      'Yoga for couples',
    ],
    price: 18999,
    duration: '2 Nights / 3 Days',
    highlights: ['Private dining', 'Couple activities', 'Scenic views', 'Photography session'],
  },
  {
    id: 'package-2',
    name: 'Birthday Farm Celebration',
    occasion: 'birthday',
    description: 'Make birthdays memorable with farm activities, special meals, and fun-filled experiences for all ages.',
    image: '/farmactivites.png',
    includes: [
      '1 Night accommodation (room based on group size)',
      'Birthday cake with organic ingredients',
      'Animal feeding activities',
      'Farm treasure hunt',
      'Bonfire with music',
      'Birthday decorations',
      'Complimentary breakfast',
      'Group photo session',
    ],
    price: 12999,
    duration: '1 Night / 2 Days',
    highlights: ['Kids activities', 'Birthday special', 'Group fun', 'Memorable experience'],
  },
  {
    id: 'package-3',
    name: 'Honeymoon in the Countryside',
    occasion: 'honeymoon',
    description: 'Begin your journey together with a serene honeymoon at our farm. Privacy, romance, and nature combined.',
    image: '/farmstay1.png',
    includes: [
      '3 Nights in Premium Cottage',
      'Flower bed decoration',
      'Welcome fruit basket with dairy delights',
      'Couple cooking class',
      'Private farm walks',
      'Complimentary room upgrade (subject to availability)',
      'Late checkout',
      'Honeymoon photo album',
    ],
    price: 24999,
    duration: '3 Nights / 4 Days',
    highlights: ['Privacy assured', 'Romantic settings', 'Nature immersion', 'Peaceful retreat'],
  },
  {
    id: 'package-4',
    name: 'Family Farm Adventure',
    occasion: 'family',
    description: 'Perfect family getaway with activities for all ages. Quality time with nature and animals.',
    image: '/cow.png',
    includes: [
      '2 Nights in Family Farm House',
      'All meals included (farm-to-table)',
      'Cow feeding experience',
      'Organic farming workshop',
      'Poultry farm visit',
      'Bullock cart rides',
      'Kids activity kit',
      'Family photo session',
      'Complimentary dairy hamper',
    ],
    price: 19999,
    duration: '2 Nights / 3 Days',
    highlights: ['Family bonding', 'Educational', 'Fun activities', 'Safe environment'],
  },
  {
    id: 'package-5',
    name: 'Corporate Team Building Retreat',
    occasion: 'corporate',
    description: 'Strengthen team bonds with unique farm-based activities and professional facilitation.',
    image: '/farmstay.png',
    includes: [
      '2 Nights accommodation (multiple rooms)',
      'Conference hall access',
      'Team building activities',
      'Agricultural workshops',
      'Group meals',
      'Evening bonfire sessions',
      'Professional facilitator',
      'Audio-visual equipment',
      'Outdoor sports area',
    ],
    price: 15999,
    duration: '2 Nights / 3 Days (per person)',
    highlights: ['Team bonding', 'Professional setup', 'Unique activities', 'Stress-free environment'],
  },
];

export const FarmStayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('farmStayBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('farmStayBookings', JSON.stringify(bookings));
  }, [bookings]);

  const getRoomById = (id: string): Room | undefined => {
    return ROOMS.find(room => room.id === id);
  };

  const getActivityById = (id: string): Activity | undefined => {
    return ACTIVITIES.find(activity => activity.id === id);
  };

  const getPackageById = (id: string): SpecialPackage | undefined => {
    return SPECIAL_PACKAGES.find(pkg => pkg.id === id);
  };

  const checkAvailability = (roomId: string, checkIn: string, checkOut: string): boolean => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check if room exists and is available
    const room = getRoomById(roomId);
    if (!room || !room.available) return false;

    // Check if dates are valid
    if (checkInDate >= checkOutDate) return false;

    // Check for overlapping bookings
    const hasOverlap = bookings.some(booking => {
      if (booking.roomId !== roomId || booking.status === 'cancelled') return false;

      const bookingCheckIn = new Date(booking.checkIn);
      const bookingCheckOut = new Date(booking.checkOut);

      return (
        (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
        (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
        (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
      );
    });

    return !hasOverlap;
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateBookingTotal = (
    roomId: string,
    nights: number,
    activities: { activityId: string; participants: number }[],
    packageId?: string
  ): number => {
    let total = 0;

    // If package is selected, use package price
    if (packageId) {
      const pkg = getPackageById(packageId);
      if (pkg) {
        total += pkg.price;
      }
    } else {
      // Calculate room cost
      const room = getRoomById(roomId);
      if (room) {
        total += room.pricePerNight * nights;
      }
    }

    // Add activities cost
    activities.forEach(({ activityId, participants }) => {
      const activity = getActivityById(activityId);
      if (activity) {
        total += activity.price * participants;
      }
    });

    return total;
  };

  const createBooking = (
    booking: Omit<Booking, 'id' | 'bookingDate' | 'status' | 'paymentStatus'>
  ): string => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      bookingDate: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
    };

    setBookings(prev => [...prev, newBooking]);
    return newBooking.id;
  };

  const cancelBooking = (bookingId: string): boolean => {
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) return false;

    const updatedBookings = [...bookings];
    updatedBookings[bookingIndex] = {
      ...updatedBookings[bookingIndex],
      status: 'cancelled',
    };

    setBookings(updatedBookings);
    return true;
  };

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(b => b.userId === userId);
  };

  const getBookedDates = (roomId: string): string[] => {
    const bookedDates: string[] = [];

    bookings
      .filter(b => b.roomId === roomId && b.status !== 'cancelled')
      .forEach(booking => {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);

        for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
          bookedDates.push(d.toISOString().split('T')[0]);
        }
      });

    return bookedDates;
  };

  const value: FarmStayContextType = {
    rooms: ROOMS,
    activities: ACTIVITIES,
    specialPackages: SPECIAL_PACKAGES,
    bookings,
    getRoomById,
    getActivityById,
    getPackageById,
    checkAvailability,
    calculateNights,
    calculateBookingTotal,
    createBooking,
    cancelBooking,
    getUserBookings,
    getBookedDates,
  };

  return <FarmStayContext.Provider value={value}>{children}</FarmStayContext.Provider>;
};
