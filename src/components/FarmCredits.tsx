import React, { useState } from 'react';
import { useFarmCredits } from '../context/FarmCreditsContext';
import { useAuth } from '../context/AuthContext';
import {
  Recycle, Plus, Minus, Calendar, MapPin, Phone,
  CheckCircle, Clock, Truck, PackageCheck, XCircle, Gift,
  TrendingUp, Coins, ShoppingBag, Info
} from 'lucide-react';

const FarmCredits: React.FC = () => {
  const {
    containers,
    userCredits,
    redemptions,
    createReturnRequest,
    getUserReturnRequests,
    getUserTransactions,
    calculateCredits,
    redeemCredits,
  } = useFarmCredits();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'return' | 'history' | 'redeem' | 'transactions'>('return');
  
  // Return Request Form State
  const [selectedContainers, setSelectedContainers] = useState<{ containerId: string; quantity: number }[]>([]);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successRequestId, setSuccessRequestId] = useState<string>('');

  const timeSlots = [
    '6:00 AM - 8:00 AM',
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  const userReturnRequests = user ? getUserReturnRequests(user.id) : [];
  const userTransactions = user ? getUserTransactions(user.id) : [];

  const handleContainerQuantityChange = (containerId: string, delta: number) => {
    setSelectedContainers(prev => {
      const existing = prev.find(c => c.containerId === containerId);
      
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(c => c.containerId !== containerId);
        }
        return prev.map(c =>
          c.containerId === containerId ? { ...c, quantity: newQuantity } : c
        );
      } else if (delta > 0) {
        return [...prev, { containerId, quantity: 1 }];
      }
      return prev;
    });
  };

  const getContainerQuantity = (containerId: string): number => {
    const container = selectedContainers.find(c => c.containerId === containerId);
    return container ? container.quantity : 0;
  };

  const totalCredits = calculateCredits(selectedContainers);

  const handleSubmitReturn = () => {
    if (!user) {
      alert('Please login to submit a return request');
      return;
    }

    if (selectedContainers.length === 0) {
      alert('Please select at least one container to return');
      return;
    }

    if (!pickupDate || !timeSlot || !address || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const containerDetails = selectedContainers.map(sc => {
      const container = containers.find(c => c.id === sc.containerId);
      return {
        containerId: sc.containerId,
        containerName: container?.name || '',
        quantity: sc.quantity,
        creditValue: container?.creditValue || 0,
        totalCredits: (container?.creditValue || 0) * sc.quantity,
      };
    });

    const requestId = createReturnRequest({
      userId: user.id,
      containers: containerDetails,
      totalCredits,
      scheduledPickupDate: pickupDate,
      pickupTimeSlot: timeSlot,
      pickupAddress: address,
      contactNumber,
      notes,
    });

    // Reset form
    setSelectedContainers([]);
    setPickupDate('');
    setTimeSlot('');
    setAddress('');
    setContactNumber('');
    setNotes('');
    
    // Show success modal
    setSuccessRequestId(requestId);
    setShowSuccessModal(true);
  };

  const handleRedeemCredits = (redemptionId: string) => {
    if (!user) {
      alert('Please login to redeem credits');
      return;
    }

    const redemption = redemptions.find(r => r.id === redemptionId);
    if (!redemption) return;

    if (userCredits < redemption.creditCost) {
      alert(`Insufficient credits! You need ${redemption.creditCost} credits but only have ${userCredits}.`);
      return;
    }

    const success = redeemCredits(
      user.id,
      redemption.creditCost,
      `Redeemed: ${redemption.title}`
    );

    if (success) {
      alert(`Successfully redeemed ${redemption.title}! Your voucher code: ${redemption.code}`);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-purple-100 text-purple-800';
      case 'verified': return 'bg-indigo-100 text-indigo-800';
      case 'credited': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5" />;
      case 'scheduled': return <Calendar className="h-5 w-5" />;
      case 'picked-up': return <Truck className="h-5 w-5" />;
      case 'verified': return <PackageCheck className="h-5 w-5" />;
      case 'credited': return <CheckCircle className="h-5 w-5" />;
      case 'rejected': return <XCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Recycle className="h-16 w-16 text-[#2D5016]" />
          </div>
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Farm Credits System</h1>
          <p className="text-xl text-gray-600">Return containers, earn credits, save the planet! 🌍♻️</p>
        </div>

        {/* Credits Balance Card */}
        {user && (
          <div className="bg-gradient-to-r from-[#2D5016] to-[#3D6020] rounded-2xl shadow-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90 mb-2">Your Available Credits</p>
                <div className="flex items-center gap-3">
                  <Coins className="h-12 w-12 text-yellow-300" />
                  <p className="text-6xl font-bold">{userCredits}</p>
                  <span className="text-2xl opacity-90">credits</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75 mb-1">Equivalent Value</p>
                <p className="text-3xl font-bold text-yellow-300">₹{userCredits}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('return')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'return'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Recycle className="h-5 w-5" />
            Return Containers
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Clock className="h-5 w-5" />
            Return History
          </button>
          <button
            onClick={() => setActiveTab('redeem')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'redeem'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Gift className="h-5 w-5" />
            Redeem Credits
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'transactions'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            Transactions
          </button>
        </div>

        {/* Return Containers Tab */}
        {activeTab === 'return' && (
          <div className="space-y-8">
            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">1. Select Containers</h3>
                  <p className="text-sm text-gray-600">Choose the containers you want to return</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">2. Schedule Pickup</h3>
                  <p className="text-sm text-gray-600">Choose a convenient date and time</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">3. We Collect</h3>
                  <p className="text-sm text-gray-600">Our team picks up from your doorstep</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Coins className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">4. Earn Credits</h3>
                  <p className="text-sm text-gray-600">Credits added to your account</p>
                </div>
              </div>
            </div>

            {/* Container Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Select Containers to Return</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {containers.map(container => {
                  const quantity = getContainerQuantity(container.id);
                  return (
                    <div
                      key={container.id}
                      className={`border-2 rounded-xl p-6 transition-all ${
                        quantity > 0
                          ? 'border-[#2D5016] bg-green-50'
                          : 'border-gray-200 hover:border-[#2D5016]'
                      }`}
                    >
                      <img
                        src={container.image}
                        alt={container.name}
                        className="w-full h-40 object-contain mb-4"
                      />
                      <h3 className="font-bold text-gray-800 mb-2">{container.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{container.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Credit Value:</span>
                        <span className="font-bold text-green-600 flex items-center gap-1">
                          <Coins className="h-4 w-4" />
                          {container.creditValue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleContainerQuantityChange(container.id, -1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                            disabled={quantity === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => handleContainerQuantityChange(container.id, 1)}
                            className="bg-[#2D5016] hover:bg-[#3D6020] text-white rounded-full p-2 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Credits Preview */}
            {selectedContainers.length > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Total Credits You'll Earn</h3>
                  <div className="flex items-center gap-3">
                    <Coins className="h-10 w-10 text-yellow-300" />
                    <span className="text-5xl font-bold">{totalCredits}</span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Selected Containers:</h4>
                  <div className="space-y-2">
                    {selectedContainers.map(sc => {
                      const container = containers.find(c => c.id === sc.containerId);
                      return (
                        <div key={sc.containerId} className="flex justify-between text-sm">
                          <span>{container?.name} x {sc.quantity}</span>
                          <span className="font-semibold">{(container?.creditValue || 0) * sc.quantity} credits</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Pickup Details Form */}
            {selectedContainers.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Schedule Pickup</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Pickup Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      placeholder="Enter your complete address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      placeholder="Any special instructions"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmitReturn}
                  className="mt-6 w-full bg-[#2D5016] hover:bg-[#3D6020] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Submit Return Request
                </button>
              </div>
            )}
          </div>
        )}

        {/* Return History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Return History</h2>
            {userReturnRequests.length === 0 ? (
              <div className="text-center py-12">
                <Recycle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No return requests yet. Start returning containers to earn credits!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {userReturnRequests.map(request => (
                  <div key={request.id} className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Request ID: {request.id}</p>
                        <p className="text-sm text-gray-600">Submitted: {formatDate(request.requestDate)}</p>
                      </div>
                      <span className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Containers:</p>
                        <ul className="space-y-1">
                          {request.containers.map((c, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              • {c.containerName} x {c.quantity} = {c.totalCredits} credits
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Pickup Details:</p>
                        <p className="text-sm text-gray-600">Date: {request.scheduledPickupDate}</p>
                        <p className="text-sm text-gray-600">Time: {request.pickupTimeSlot}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">Address: {request.pickupAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-600" />
                        <span className="font-bold text-lg text-[#2D5016]">Total: {request.totalCredits} credits</span>
                      </div>
                      {request.status === 'credited' && request.creditedDate && (
                        <span className="text-sm text-green-600">Credited on {formatDate(request.creditedDate)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Redeem Credits Tab */}
        {activeTab === 'redeem' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Redeem Your Credits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redemptions.map(redemption => (
                  <div
                    key={redemption.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#2D5016] transition-all"
                  >
                    <div className="relative mb-4">
                      <img
                        src={redemption.image}
                        alt={redemption.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 right-2 bg-yellow-400 text-[#2D5016] px-3 py-1 rounded-full text-sm font-bold">
                        {redemption.creditCost} credits
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{redemption.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{redemption.description}</p>
                    <button
                      onClick={() => handleRedeemCredits(redemption.id)}
                      disabled={!user || userCredits < redemption.creditCost}
                      className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        !user || userCredits < redemption.creditCost
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#2D5016] hover:bg-[#3D6020] text-white'
                      }`}
                    >
                      <Gift className="h-4 w-4" />
                      Redeem Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Transaction History</h2>
            {userTransactions.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No transactions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userTransactions.map(txn => (
                  <div key={txn.id} className="border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${
                        txn.type === 'earned' ? 'bg-green-100' :
                        txn.type === 'redeemed' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {txn.type === 'earned' ? (
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{txn.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        txn.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.type === 'earned' ? '+' : '-'}{txn.amount}
                      </p>
                      <p className="text-xs text-gray-500">{txn.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D5016] mb-2">Request Submitted!</h3>
                <p className="text-gray-600 mb-4">
                  Your return request has been successfully submitted.
                </p>
                <div className="bg-[#F5EFE0] rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">Request ID:</p>
                  <p className="font-mono font-bold text-[#2D5016]">{successRequestId}</p>
                  <p className="text-sm text-gray-600 mt-3">
                    You'll earn <span className="font-bold text-green-600">{totalCredits} credits</span> once verified
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab('history');
                  }}
                  className="w-full bg-[#2D5016] hover:bg-[#3D6020] text-white font-bold py-3 rounded-lg transition-colors"
                >
                  View Return History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmCredits;
