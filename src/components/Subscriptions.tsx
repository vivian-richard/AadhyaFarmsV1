import React from 'react';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Package, Pause, Play, X, Edit, Plus,
  AlertCircle, Gift, Truck
} from 'lucide-react';

const Subscriptions: React.FC = () => {
  const { subscriptions, pauseSubscription, resumeSubscription, cancelSubscription } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#2D5016] mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view and manage your subscriptions</p>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDeliveryDays = (schedule: any) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const fullDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const selectedDays = days.filter((_, idx) => schedule[fullDays[idx]]);
    return selectedDays.length > 0 ? selectedDays.join(', ') : 'No days selected';
  };

  const getDeliveryDaysCount = (schedule: any) => {
    const fullDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return fullDays.filter(day => schedule[day]).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#2D5016] mb-2">My Subscriptions</h1>
              <p className="text-gray-600">Manage your milk and curd delivery subscriptions</p>
            </div>
            <button
              onClick={() => navigate('/new-subscription')}
              className="flex items-center space-x-2 px-6 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">New Subscription</span>
            </button>
          </div>
        </div>

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Package className="h-32 w-32 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">No Active Subscriptions</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start a subscription to get fresh milk and curd delivered regularly with exclusive discounts!
            </p>
            <button
              onClick={() => navigate('/new-subscription')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <Gift className="h-6 w-6" />
              <span>Create Your First Subscription</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl transition-all"
              >
                {/* Subscription Header */}
                <div className="bg-gradient-to-r from-[#2D5016] to-[#3D6020] p-6 text-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Daily Subscription</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getStatusColor(subscription.status)}`}>
                          {subscription.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white/80 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Started {new Date(subscription.startDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <p className="text-sm text-white/80 mb-1">Next Delivery</p>
                      <p className="text-xl font-bold">
                        {new Date(subscription.nextDelivery).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subscription Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Products */}
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">Products</h4>
                      {subscription.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-4 bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex-shrink-0 bg-white rounded-lg p-2 shadow-sm">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="h-32 w-32 object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-lg text-[#2D5016]">{item.product.name}</p>
                            <p className="text-gray-600">{item.product.unit}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-2xl text-[#2D5016]">×{item.quantity}</p>
                            <p className="text-gray-600">₹{item.product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-[#F5EFE0] to-white rounded-xl p-6 border-2 border-[#2D5016]">
                      <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Daily Total</span>
                          <span className="font-semibold">₹{subscription.totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600">
                          <span>Delivery Days/Week</span>
                          <span className="font-semibold">{getDeliveryDaysCount(subscription.deliverySchedule)} days</span>
                        </div>
                        <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                          <span className="font-bold text-[#2D5016]">Weekly Amount</span>
                          <span className="font-bold text-2xl text-[#2D5016]">
                            ₹{subscription.totalAmount * getDeliveryDaysCount(subscription.deliverySchedule)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Schedule */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <h4 className="font-bold text-[#2D5016]">Delivery Days</h4>
                    </div>
                    <p className="text-gray-700 font-semibold">{getDeliveryDays(subscription.deliverySchedule)}</p>
                    {subscription.vacationMode?.isActive && (
                      <div className="mt-3 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                        <p className="text-sm text-yellow-800 font-semibold">🏖️ Vacation Mode Active</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          {new Date(subscription.vacationMode.startDate).toLocaleDateString()} - {new Date(subscription.vacationMode.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {subscription.skipDates && subscription.skipDates.length > 0 && (
                      <div className="mt-3 p-3 bg-orange-100 rounded-lg border border-orange-300">
                        <p className="text-sm text-orange-800 font-semibold">📅 Upcoming Skips: {subscription.skipDates.length}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {subscription.status === 'active' && (
                      <>
                        <button
                          onClick={() => navigate(`/edit-subscription/${subscription.id}`)}
                          className="flex items-center space-x-2 px-6 py-3 border-2 border-[#2D5016] text-[#2D5016] rounded-lg hover:bg-[#2D5016] hover:text-white transition-colors font-semibold"
                        >
                          <Edit className="h-5 w-5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => pauseSubscription(subscription.id)}
                          className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                        >
                          <Pause className="h-5 w-5" />
                          <span>Pause</span>
                        </button>
                      </>
                    )}
                    {subscription.status === 'paused' && (
                      <button
                        onClick={() => resumeSubscription(subscription.id)}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                      >
                        <Play className="h-5 w-5" />
                        <span>Resume</span>
                      </button>
                    )}
                    {subscription.status !== 'cancelled' && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this subscription?')) {
                            cancelSubscription(subscription.id);
                          }
                        }}
                        className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                      >
                        <X className="h-5 w-5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
