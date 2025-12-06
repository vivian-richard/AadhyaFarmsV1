import React, { useState } from 'react';
import { useSubscription, SubscriptionItem, DeliverySchedule } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Calendar, Gift, AlertCircle, MapPin, CheckCircle } from 'lucide-react';

const NewSubscription: React.FC = () => {
  const { availableProducts, addSubscription, getDiscountPercentage } = useSubscription();
  const { user, addresses } = useAuth();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<SubscriptionItem[]>([]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [deliverySchedule, setDeliverySchedule] = useState<DeliverySchedule>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#2D5016] mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to create a subscription</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-[#2D5016] text-white rounded-lg font-semibold hover:bg-[#3D6020] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const addItem = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = selectedItems.find(item => item.product.id === productId);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([...selectedItems, { product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: string) => {
    const existingItem = selectedItems.find(item => item.product.id === productId);
    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      setSelectedItems(
        selectedItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setSelectedItems(selectedItems.filter(item => item.product.id !== productId));
    }
  };

  const getItemQuantity = (productId: string) => {
    return selectedItems.find(item => item.product.id === productId)?.quantity || 0;
  };

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const discount = getDiscountPercentage(frequency);
  const subtotal = calculateTotal();
  const discountAmount = Math.round(subtotal * discount / 100);
  const total = subtotal - discountAmount;

  const toggleDay = (day: keyof DeliverySchedule) => {
    setDeliverySchedule({ ...deliverySchedule, [day]: !deliverySchedule[day] });
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one product');
      return;
    }

    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    if (frequency === 'daily') {
      const hasAnyDay = Object.values(deliverySchedule).some(day => day);
      if (!hasAnyDay) {
        alert('Please select at least one delivery day');
        return;
      }
    }

    addSubscription({
      items: selectedItems,
      frequency,
      deliverySchedule,
      startDate,
      status: 'active',
      totalAmount: subtotal,
      discount,
      addressId: selectedAddressId,
    });

    navigate('/subscriptions');
  };

  const days = [
    { key: 'monday' as keyof DeliverySchedule, label: 'Mon' },
    { key: 'tuesday' as keyof DeliverySchedule, label: 'Tue' },
    { key: 'wednesday' as keyof DeliverySchedule, label: 'Wed' },
    { key: 'thursday' as keyof DeliverySchedule, label: 'Thu' },
    { key: 'friday' as keyof DeliverySchedule, label: 'Fri' },
    { key: 'saturday' as keyof DeliverySchedule, label: 'Sat' },
    { key: 'sunday' as keyof DeliverySchedule, label: 'Sun' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#2D5016] mb-2">Create New Subscription</h1>
          <p className="text-gray-600">Get fresh milk and curd delivered with exclusive discounts!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Products & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Select Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableProducts.map((product) => {
                  const quantity = getItemQuantity(product.id);
                  return (
                    <div
                      key={product.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        quantity > 0
                          ? 'border-[#2D5016] bg-[#F5EFE0]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-[#2D5016] mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.unit}</p>
                      <p className="text-xl font-bold text-[#2D5016] mb-3">₹{product.price}</p>
                      
                      {quantity === 0 ? (
                        <button
                          onClick={() => addItem(product.id)}
                          className="w-full py-2 bg-[#2D5016] text-white rounded-lg font-semibold hover:bg-[#3D6020] transition-colors"
                        >
                          Add to Subscription
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-[#2D5016] rounded-lg p-2">
                          <button
                            onClick={() => removeItem(product.id)}
                            className="p-2 bg-white text-[#2D5016] rounded-lg hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-bold text-white text-lg">{quantity}</span>
                          <button
                            onClick={() => addItem(product.id)}
                            className="p-2 bg-white text-[#2D5016] rounded-lg hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Delivery Frequency</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'daily', label: 'Daily', discount: 15, desc: 'Best Value!' },
                  { value: 'weekly', label: 'Weekly', discount: 12, desc: 'Great Savings' },
                  { value: 'monthly', label: 'Monthly', discount: 10, desc: 'Good Deal' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFrequency(option.value as any)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      frequency === option.value
                        ? 'border-[#2D5016] bg-[#F5EFE0] shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">📦</div>
                    <h3 className="font-bold text-[#2D5016] text-lg mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.desc}</p>
                    <div className="flex items-center justify-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      <Gift className="h-4 w-4" />
                      {option.discount}% OFF
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Schedule (for daily subscriptions) */}
            {frequency === 'daily' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Delivery Days</h2>
                <p className="text-gray-600 mb-4">Select the days you want delivery</p>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day) => (
                    <button
                      key={day.key}
                      onClick={() => toggleDay(day.key)}
                      className={`py-3 rounded-lg font-semibold transition-all ${
                        deliverySchedule[day.key]
                          ? 'bg-[#2D5016] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Start Date */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Start Date</h2>
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-[#2D5016]" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Delivery Address</h2>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved addresses</p>
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-6 py-3 bg-[#2D5016] text-white rounded-lg font-semibold hover:bg-[#3D6020] transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? 'border-[#2D5016] bg-[#F5EFE0]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${selectedAddressId === address.id ? 'bg-[#2D5016]' : 'bg-gray-300'}`}>
                          <CheckCircle className={`h-5 w-5 ${selectedAddressId === address.id ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-[#2D5016]">{address.name}</p>
                            {address.isDefault && (
                              <span className="px-2 py-0.5 bg-[#2D5016] text-white text-xs rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-700">
                            {address.addressLine1}, {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Order Summary</h2>
              
              {selectedItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No products selected</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.product.name}</p>
                          <p className="text-xs text-gray-600">{item.product.unit} × {item.quantity}</p>
                        </div>
                        <p className="font-bold">₹{item.product.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4 space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="flex items-center gap-1">
                        <Gift className="h-4 w-4" />
                        Discount ({discount}%)
                      </span>
                      <span className="font-semibold">-₹{discountAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-[#2D5016] pt-3 border-t-2 border-gray-200">
                      <span>Per Delivery</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={selectedItems.length === 0 || !selectedAddressId}
                    className="w-full py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Create Subscription
                  </button>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      <strong>Note:</strong> You'll be charged ₹{total} per delivery. You can pause or cancel anytime.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSubscription;
