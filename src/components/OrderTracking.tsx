import React from 'react';
import { ChevronDown, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderTracking: React.FC = () => {
  // Mock order data - in real app, fetch from backend
  const order = {
    id: 'ORD-2024-001',
    date: '2024-12-05',
    total: 850,
    status: 'out-for-delivery',
    estimatedDelivery: '2024-12-06',
    items: [
      { name: 'Fresh Milk', quantity: 2, price: 70 },
      { name: 'Ghee', quantity: 1, price: 350 },
      { name: 'Free Range Eggs', quantity: 1, price: 360 },
    ],
  };

  const trackingSteps = [
    { id: 1, label: 'Order Confirmed', icon: CheckCircle, status: 'completed', time: 'Dec 5, 10:30 AM' },
    { id: 2, label: 'Preparing Order', icon: Package, status: 'completed', time: 'Dec 5, 11:00 AM' },
    { id: 3, label: 'Out for Delivery', icon: Truck, status: 'current', time: 'Dec 6, 8:00 AM' },
    { id: 4, label: 'Delivered', icon: CheckCircle, status: 'pending', time: 'Estimated by 12:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Track Your Order</h1>

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{order.id}</h2>
              <p className="text-gray-600">Placed on {order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{order.total}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Delivery Status</h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
                  {/* Icon Circle */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                      isCompleted
                        ? 'bg-green-600'
                        : isCurrent
                        ? 'bg-blue-600 animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{step.time}</p>
                    {isCurrent && (
                      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 font-medium">
                          🚚 Your order is on the way! Our delivery partner will reach you soon.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Info */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h4>
                <p className="text-gray-600">
                  Your order will be delivered by <span className="font-semibold">12:00 PM today</span>
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Need help with your order?</p>
            <a
              href="tel:+918332090317"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
            >
              Contact Support: +91 8332090317
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
