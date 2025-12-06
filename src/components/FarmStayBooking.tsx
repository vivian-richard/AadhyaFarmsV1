import React, { useState } from 'react';
import { useFarmStay } from '../context/FarmStayContext';
import { useAuth } from '../context/AuthContext';
import {
  Calendar as CalendarIcon, Bed, Users, MapPin, Star,
  Check, X, ChevronLeft, ChevronRight, Heart, Coffee,
  Wifi, Wind, Tv, Award, Plus, Minus, CreditCard,
  Clock, Info, Package, Sparkles, Gift, Trees, Milk
} from 'lucide-react';

const FarmStayBooking: React.FC = () => {
  const {
    rooms,
    activities,
    specialPackages,
    checkAvailability,
    calculateNights,
    calculateBookingTotal,
    createBooking,
    getBookedDates,
  } = useFarmStay();

  const { user } = useAuth();

  // State Management
  const [step, setStep] = useState<'rooms' | 'dates' | 'activities' | 'packages' | 'checkout'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [selectedActivities, setSelectedActivities] = useState<{ activityId: string; participants: number; date: string }[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [showImageGallery, setShowImageGallery] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Form State
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState('');

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-4 w-4" />,
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Air Conditioning': <Wind className="h-4 w-4" />,
    'Smart TV': <Tv className="h-4 w-4" />,
    'Coffee': <Coffee className="h-4 w-4" />,
  };

  const categoryColors: { [key: string]: string } = {
    'animal-care': 'bg-green-100 text-green-700',
    'farming': 'bg-yellow-100 text-yellow-700',
    'wellness': 'bg-purple-100 text-purple-700',
    'adventure': 'bg-orange-100 text-orange-700',
    'cultural': 'bg-blue-100 text-blue-700',
  };

  const occasionColors: { [key: string]: string } = {
    'anniversary': 'bg-red-100 text-red-700',
    'birthday': 'bg-pink-100 text-pink-700',
    'honeymoon': 'bg-rose-100 text-rose-700',
    'family': 'bg-green-100 text-green-700',
    'corporate': 'bg-blue-100 text-blue-700',
  };

  // Calendar Functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateBooked = (date: string): boolean => {
    if (!selectedRoom) return false;
    const bookedDates = getBookedDates(selectedRoom);
    return bookedDates.includes(date);
  };

  const isDateInRange = (date: string): boolean => {
    if (!checkIn || !checkOut) return false;
    return date >= checkIn && date < checkOut;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDateClick = (date: string) => {
    if (isDateBooked(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut('');
    } else if (date > checkIn) {
      // Check if any dates in range are booked
      const start = new Date(checkIn);
      const end = new Date(date);
      let hasBookedDate = false;

      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        if (isDateBooked(d.toISOString().split('T')[0])) {
          hasBookedDate = true;
          break;
        }
      }

      if (!hasBookedDate) {
        setCheckOut(date);
      } else {
        alert('Selected date range contains already booked dates');
      }
    } else {
      setCheckIn(date);
      setCheckOut('');
    }
  };

  const toggleActivity = (activityId: string) => {
    const existing = selectedActivities.find(a => a.activityId === activityId);
    if (existing) {
      setSelectedActivities(selectedActivities.filter(a => a.activityId !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, {
        activityId,
        participants: 1,
        date: checkIn || new Date().toISOString().split('T')[0],
      }]);
    }
  };

  const updateActivityParticipants = (activityId: string, delta: number) => {
    setSelectedActivities(selectedActivities.map(a => {
      if (a.activityId === activityId) {
        const activity = activities.find(act => act.id === activityId);
        const newCount = Math.max(1, Math.min(a.participants + delta, activity?.maxParticipants || 10));
        return { ...a, participants: newCount };
      }
      return a;
    }));
  };

  const handleBooking = () => {
    if (!user) {
      alert('Please login to make a booking');
      return;
    }

    if (!selectedRoom || !checkIn || !checkOut) {
      alert('Please select room and dates');
      return;
    }

    if (!checkAvailability(selectedRoom, checkIn, checkOut)) {
      alert('Selected dates are not available');
      return;
    }

    const room = rooms.find(r => r.id === selectedRoom);
    if (!room) return;

    const nights = calculateNights(checkIn, checkOut);
    const activitiesData = selectedActivities.map(sa => {
      const activity = activities.find(a => a.id === sa.activityId);
      return {
        activityId: sa.activityId,
        activityName: activity?.name || '',
        participants: sa.participants,
        date: sa.date,
        price: (activity?.price || 0) * sa.participants,
      };
    });

    const packageData = selectedPackage ? {
      packageId: selectedPackage,
      packageName: specialPackages.find(p => p.id === selectedPackage)?.name || '',
      price: specialPackages.find(p => p.id === selectedPackage)?.price || 0,
    } : undefined;

    const totalAmount = calculateBookingTotal(
      selectedRoom,
      nights,
      selectedActivities.map(a => ({ activityId: a.activityId, participants: a.participants })),
      selectedPackage
    );

    const bookingId = createBooking({
      userId: user.id,
      userName: guestName || user.name,
      userEmail: guestEmail || user.email,
      userPhone: guestPhone,
      roomId: selectedRoom,
      roomName: room.name,
      checkIn,
      checkOut,
      nights,
      guests,
      activities: activitiesData,
      specialPackage: packageData,
      totalAmount,
      specialRequests,
    });

    alert(`🎉 Booking created successfully!\n\nBooking ID: ${bookingId}\n\nPlease proceed to payment.\n\nTotal Amount: ₹${totalAmount}`);

    // Reset form
    setStep('rooms');
    setSelectedRoom('');
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
    setSelectedActivities([]);
    setSelectedPackage('');
    setSpecialRequests('');
  };

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalAmount = selectedRoom ? calculateBookingTotal(
    selectedRoom,
    nights,
    selectedActivities.map(a => ({ activityId: a.activityId, participants: a.participants })),
    selectedPackage
  ) : 0;

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const days = [];
    const today = new Date().toISOString().split('T')[0];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toISOString().split('T')[0];
      const isPast = date < today;
      const isBooked = isDateBooked(date);
      const isSelected = date === checkIn || date === checkOut;
      const isInRange = isDateInRange(date);

      days.push(
        <button
          key={day}
          onClick={() => !isPast && !isBooked && handleDateClick(date)}
          disabled={isPast || isBooked}
          className={`h-12 rounded-lg font-semibold transition-all ${
            isPast
              ? 'text-gray-300 cursor-not-allowed'
              : isBooked
              ? 'bg-red-100 text-red-500 cursor-not-allowed'
              : isSelected
              ? 'bg-[#2D5016] text-white'
              : isInRange
              ? 'bg-green-100 text-[#2D5016]'
              : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trees className="h-16 w-16 text-[#2D5016]" />
          </div>
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Farm Stay Booking</h1>
          <p className="text-xl text-gray-600">Experience authentic farm life with comfort and luxury 🌾</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {['rooms', 'dates', 'activities', 'packages', 'checkout'].map((s, idx) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    step === s ? 'bg-[#2D5016] text-white scale-110' :
                    ['rooms', 'dates', 'activities', 'packages', 'checkout'].indexOf(step) > idx ? 'bg-green-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {['rooms', 'dates', 'activities', 'packages', 'checkout'].indexOf(step) > idx ? <Check className="h-6 w-6" /> : idx + 1}
                  </div>
                  <span className="text-xs mt-2 font-semibold text-gray-700 capitalize hidden sm:block">{s}</span>
                </div>
                {idx < 4 && <div className="flex-1 h-1 bg-gray-300 mx-2" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Room Selection */}
        {step === 'rooms' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Choose Your Accommodation</h2>
              <p className="text-gray-600">Select from our comfortable and well-equipped rooms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map(room => (
                <div
                  key={room.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all cursor-pointer ${
                    selectedRoom === room.id ? 'ring-4 ring-[#2D5016]' : 'hover:shadow-2xl'
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  {/* Images */}
                  <div className="relative h-64 bg-gradient-to-br from-[#F5EFE0] to-white">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowImageGallery(room.id);
                        setCurrentImageIndex(0);
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#2D5016]">
                      ₹{room.pricePerNight}/night
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
                      {room.images.length} photos
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-[#2D5016] mb-1">{room.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          room.type === 'suite' ? 'bg-purple-100 text-purple-700' :
                          room.type === 'cottage' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Up to {room.capacity}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{room.description}</p>

                    {/* Amenities */}
                    <div className="bg-[#F5EFE0] rounded-lg p-4 mb-4">
                      <p className="font-semibold text-[#2D5016] mb-2 text-sm">Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.slice(0, 6).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-1 bg-white px-2 py-1 rounded text-xs text-gray-700">
                            {amenityIcons[amenity] || <Check className="h-3 w-3 text-green-600" />}
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {room.amenities.length > 6 && (
                          <div className="px-2 py-1 text-xs text-gray-500">+{room.amenities.length - 6} more</div>
                        )}
                      </div>
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-bold transition-all ${
                        selectedRoom === room.id
                          ? 'bg-[#2D5016] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedRoom === room.id ? 'Selected' : 'Select Room'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => selectedRoom && setStep('dates')}
                disabled={!selectedRoom}
                className="px-8 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Dates
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 'dates' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Select Your Dates</h2>
              <p className="text-gray-600">Choose check-in and check-out dates</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h3 className="text-2xl font-bold text-[#2D5016]">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Calendar */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#2D5016] rounded" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded" />
                  <span>In Range</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 rounded" />
                  <span>Booked</span>
                </div>
              </div>

              {/* Selected Dates Display */}
              {checkIn && (
                <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Check-in</p>
                      <p className="text-lg font-bold text-[#2D5016]">{formatDate(checkIn)}</p>
                    </div>
                    {checkOut && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Check-out</p>
                          <p className="text-lg font-bold text-[#2D5016]">{formatDate(checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Nights</p>
                          <p className="text-lg font-bold text-[#2D5016]">{nights}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Guests Selection */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="text-2xl font-bold text-[#2D5016] min-w-[3rem] text-center">{guests}</span>
                  <button
                    onClick={() => {
                      const room = rooms.find(r => r.id === selectedRoom);
                      setGuests(Math.min(room?.capacity || 10, guests + 1));
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep('rooms')}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => checkIn && checkOut && setStep('activities')}
                disabled={!checkIn || !checkOut}
                className="px-8 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Activities
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Activities Selection */}
        {step === 'activities' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Add Activities to Your Stay</h2>
              <p className="text-gray-600">Enhance your experience with our farm activities (optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map(activity => {
                const isSelected = selectedActivities.some(a => a.activityId === activity.id);
                const selectedActivity = selectedActivities.find(a => a.activityId === activity.id);

                return (
                  <div
                    key={activity.id}
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all ${
                      isSelected ? 'ring-4 ring-[#2D5016]' : ''
                    }`}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-[#F5EFE0] to-white p-4 flex items-center justify-center">
                      <img src={activity.image} alt={activity.name} className="max-h-full max-w-full object-contain" />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#2D5016]">
                        ₹{activity.price}
                      </div>
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[activity.category]}`}>
                        {activity.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#2D5016] mb-2">{activity.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {activity.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          Max {activity.maxParticipants} participants
                        </div>
                        {activity.ageRestriction && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Info className="h-4 w-4" />
                            {activity.ageRestriction}
                          </div>
                        )}
                      </div>

                      {isSelected && selectedActivity && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Participants</label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateActivityParticipants(activity.id, -1)}
                              className="p-2 bg-white hover:bg-gray-100 rounded-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-xl font-bold text-[#2D5016] min-w-[2rem] text-center">
                              {selectedActivity.participants}
                            </span>
                            <button
                              onClick={() => updateActivityParticipants(activity.id, 1)}
                              className="p-2 bg-white hover:bg-gray-100 rounded-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => toggleActivity(activity.id)}
                        className={`w-full py-3 rounded-lg font-bold transition-all ${
                          isSelected
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-[#2D5016] text-white hover:bg-[#3D6020]'
                        }`}
                      >
                        {isSelected ? 'Remove' : 'Add Activity'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedActivities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-[#2D5016] mb-4">Selected Activities Summary</h3>
                <div className="space-y-3">
                  {selectedActivities.map(sa => {
                    const activity = activities.find(a => a.id === sa.activityId);
                    return (
                      <div key={sa.activityId} className="flex items-center justify-between p-3 bg-[#F5EFE0] rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-800">{activity?.name}</p>
                          <p className="text-sm text-gray-600">{sa.participants} participant(s)</p>
                        </div>
                        <p className="font-bold text-[#2D5016]">₹{(activity?.price || 0) * sa.participants}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep('dates')}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep('packages')}
                className="px-8 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Continue to Packages
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Special Packages */}
        {step === 'packages' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Special Occasion Packages</h2>
              <p className="text-gray-600">Make your stay extra special with our curated packages (optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all cursor-pointer ${
                    selectedPackage === pkg.id ? 'ring-4 ring-[#2D5016]' : 'hover:shadow-2xl'
                  }`}
                  onClick={() => setSelectedPackage(selectedPackage === pkg.id ? '' : pkg.id)}
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#F5EFE0] to-white p-4">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full">
                      <p className="text-2xl font-bold text-[#2D5016]">₹{pkg.price.toLocaleString()}</p>
                    </div>
                    <span className={`absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold ${occasionColors[pkg.occasion]}`}>
                      {pkg.occasion.charAt(0).toUpperCase() + pkg.occasion.slice(1)}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#2D5016] mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                    <div className="bg-[#F5EFE0] rounded-lg p-4 mb-4">
                      <p className="font-semibold text-[#2D5016] mb-2 text-sm">Package Includes:</p>
                      <ul className="space-y-1">
                        {pkg.includes.slice(0, 5).map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {pkg.includes.length > 5 && (
                          <li className="text-sm text-gray-500">+{pkg.includes.length - 5} more items</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <CalendarIcon className="h-4 w-4" />
                      {pkg.duration}
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-bold transition-all ${
                        selectedPackage === pkg.id
                          ? 'bg-[#2D5016] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <Gift className="h-12 w-12 text-[#2D5016] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2D5016] mb-2">Skip Package?</h3>
              <p className="text-gray-600">You can proceed without selecting a package and pay only for room and activities.</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStep('activities')}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep('checkout')}
                className="px-8 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Checkout */}
        {step === 'checkout' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Confirm & Pay</h2>
              <p className="text-gray-600">Review your booking details and proceed to payment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Summary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-4">Guest Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                          placeholder="Mobile number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        rows={4}
                        placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-4">Booking Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#F5EFE0] rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">Room</p>
                        <p className="text-sm text-gray-600">{rooms.find(r => r.id === selectedRoom)?.name}</p>
                      </div>
                      <p className="font-bold text-[#2D5016]">
                        ₹{(rooms.find(r => r.id === selectedRoom)?.pricePerNight || 0) * nights}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#F5EFE0] rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">Dates</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(checkIn)} - {formatDate(checkOut)} ({nights} nights)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#F5EFE0] rounded-lg">
                      <p className="font-semibold text-gray-800">Guests</p>
                      <p className="font-bold text-[#2D5016]">{guests}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-4">Price Summary</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Room ({nights} nights)</span>
                      <span>₹{(rooms.find(r => r.id === selectedRoom)?.pricePerNight || 0) * nights}</span>
                    </div>
                    {selectedActivities.length > 0 && (
                      <>
                        <div className="border-t pt-3">
                          <p className="font-semibold text-gray-700 mb-2">Activities</p>
                          {selectedActivities.map(sa => {
                            const activity = activities.find(a => a.id === sa.activityId);
                            return (
                              <div key={sa.activityId} className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{activity?.name} (×{sa.participants})</span>
                                <span>₹{(activity?.price || 0) * sa.participants}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {selectedPackage && (
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-gray-700">
                          <span>Special Package</span>
                          <span>₹{specialPackages.find(p => p.id === selectedPackage)?.price}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-3xl font-bold text-[#2D5016]">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handleBooking}
                      disabled={!guestName || !guestEmail || !guestPhone}
                      className="w-full py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CreditCard className="h-6 w-6" />
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep('packages')}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Image Gallery Modal */}
        {showImageGallery && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <button
              onClick={() => setShowImageGallery('')}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={() => {
                const room = rooms.find(r => r.id === showImageGallery);
                setCurrentImageIndex((currentImageIndex - 1 + (room?.images.length || 0)) % (room?.images.length || 1));
              }}
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
            <button
              onClick={() => {
                const room = rooms.find(r => r.id === showImageGallery);
                setCurrentImageIndex((currentImageIndex + 1) % (room?.images.length || 1));
              }}
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
            <div className="max-w-4xl w-full">
              <img
                src={rooms.find(r => r.id === showImageGallery)?.images[currentImageIndex]}
                alt="Room"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-white text-center mt-4">
                {currentImageIndex + 1} / {rooms.find(r => r.id === showImageGallery)?.images.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmStayBooking;
