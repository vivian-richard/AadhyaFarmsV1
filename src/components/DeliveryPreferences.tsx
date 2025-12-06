import React, { useState } from 'react';
import { useAuth, DeliveryPreferences as DeliveryPrefs } from '../context/AuthContext';
import { Clock, Package, MapPin, Info, Sunrise, Leaf } from 'lucide-react';

interface DeliveryPreferencesProps {
  addressId: string;
  existingPreferences?: DeliveryPrefs;
  onSave?: () => void;
}

const DeliveryPreferences: React.FC<DeliveryPreferencesProps> = ({ 
  addressId, 
  existingPreferences,
  onSave 
}) => {
  const { updateDeliveryPreferences } = useAuth();
  
  const [preferences, setPreferences] = useState<DeliveryPrefs>(
    existingPreferences || {
      timeSlot: 'morning',
      instructions: '',
      gateCode: '',
      preferredLocation: '',
      ecoFriendlyPackaging: true,
      earlyMorningDelivery: false,
    }
  );

  const timeSlots = [
    {
      value: 'early-morning' as const,
      label: 'Early Morning',
      time: '5:00 AM - 7:00 AM',
      icon: Sunrise,
      description: 'Get fresh products before you start your day',
      badge: 'Popular',
      badgeColor: 'bg-orange-500'
    },
    {
      value: 'morning' as const,
      label: 'Morning',
      time: '7:00 AM - 11:00 AM',
      icon: Clock,
      description: 'Perfect for breakfast and daily cooking'
    },
    {
      value: 'afternoon' as const,
      label: 'Afternoon',
      time: '11:00 AM - 4:00 PM',
      icon: Clock,
      description: 'Convenient midday delivery'
    },
    {
      value: 'evening' as const,
      label: 'Evening',
      time: '4:00 PM - 8:00 PM',
      icon: Clock,
      description: 'After work delivery option'
    }
  ];

  const handleSave = () => {
    updateDeliveryPreferences(addressId, preferences);
    onSave?.();
  };

  return (
    <div className="space-y-6">
      {/* Time Slot Selection */}
      <div>
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Choose Delivery Time Slot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <button
                key={slot.value}
                onClick={() => setPreferences({ ...preferences, timeSlot: slot.value })}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  preferences.timeSlot === slot.value
                    ? 'border-[#2D5016] bg-[#F5EFE0] shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {slot.badge && (
                  <span className={`absolute top-2 right-2 ${slot.badgeColor} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                    {slot.badge}
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    preferences.timeSlot === slot.value ? 'bg-[#2D5016] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2D5016] mb-1">{slot.label}</p>
                    <p className="text-sm font-semibold text-gray-600 mb-1">{slot.time}</p>
                    <p className="text-xs text-gray-500">{slot.description}</p>
                  </div>
                </div>
                {preferences.timeSlot === slot.value && (
                  <div className="absolute top-2 left-2 w-5 h-5 bg-[#2D5016] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Early Morning Preference */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-500 text-white rounded-lg">
            <Sunrise className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#2D5016] mb-2">Early Morning Delivery (Before 7 AM)</h4>
            <p className="text-sm text-gray-600 mb-3">
              Get your fresh dairy products delivered before sunrise. Perfect for early risers who want the freshest milk for their morning tea or coffee.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.earlyMorningDelivery}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setPreferences({
                    ...preferences,
                    earlyMorningDelivery: checked,
                    timeSlot: checked ? 'early-morning' : preferences.timeSlot
                  });
                }}
                className="w-5 h-5 text-[#2D5016] border-gray-300 rounded focus:ring-[#2D5016]"
              />
              <span className="font-semibold text-[#2D5016]">
                I prefer early morning delivery (before 7 AM)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Eco-Friendly Packaging */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-600 text-white rounded-lg">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#2D5016] mb-2">Eco-Friendly Packaging</h4>
            <p className="text-sm text-gray-600 mb-3">
              Choose sustainable, biodegradable packaging. We use glass bottles, paper bags, and compostable materials instead of plastic.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.ecoFriendlyPackaging}
                onChange={(e) => setPreferences({ ...preferences, ecoFriendlyPackaging: e.target.checked })}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-600"
              />
              <span className="font-semibold text-[#2D5016]">
                Use eco-friendly packaging (Highly Recommended)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div>
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Delivery Instructions
        </h3>
        <div className="space-y-4">
          {/* Gate Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gate Code / Security Code (Optional)
            </label>
            <input
              type="text"
              value={preferences.gateCode || ''}
              onChange={(e) => setPreferences({ ...preferences, gateCode: e.target.value })}
              placeholder="e.g., #1234 or A-Block"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
            />
          </div>

          {/* Preferred Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Drop Location (Optional)
            </label>
            <input
              type="text"
              value={preferences.preferredLocation || ''}
              onChange={(e) => setPreferences({ ...preferences, preferredLocation: e.target.value })}
              placeholder="e.g., Front porch, Back door, With security"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
            />
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Delivery Instructions (Optional)
            </label>
            <textarea
              value={preferences.instructions || ''}
              onChange={(e) => setPreferences({ ...preferences, instructions: e.target.value })}
              placeholder="e.g., Ring the doorbell twice, Please call before delivery, Leave with neighbor..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Delivery Notes:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Our delivery partners will follow your instructions carefully</li>
              <li>Early morning deliveries ensure maximum freshness</li>
              <li>Eco-friendly packaging can be returned for recycling</li>
              <li>You can update these preferences anytime</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-[#2D5016] text-white rounded-lg font-semibold hover:bg-[#3D6020] transition-colors shadow-lg flex items-center gap-2"
        >
          <Package className="h-5 w-5" />
          Save Delivery Preferences
        </button>
      </div>
    </div>
  );
};

export default DeliveryPreferences;
