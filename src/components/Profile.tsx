import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Award, MapPin, Package, 
  LogOut, Plus, Trash2, CheckCircle, Home, Edit, X
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, updateUserProfile, addresses, addAddress, deleteAddress, setDefaultAddress, orders } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'loyalty'>('profile');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddress);
    setNewAddress({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const handleUpdateProfile = () => {
    updateUserProfile(editedProfile.name, editedProfile.phone);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      name: user?.name || '',
      phone: user?.phone || '',
    });
    setIsEditingProfile(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out-for-delivery': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-full p-4 flex-shrink-0">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#2D5016]">{user.name}</h1>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-3 py-1 rounded-full text-sm font-bold">
                    <Award className="h-4 w-4" />
                    <span>{user.loyaltyPoints} pts</span>
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="font-medium">📧</span> {user.email}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-[#2D5016] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 inline mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-[#2D5016] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MapPin className="h-5 w-5 inline mr-2" />
                Addresses ({addresses.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#2D5016] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="h-5 w-5 inline mr-2" />
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('loyalty')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'loyalty'
                    ? 'bg-[#2D5016] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Award className="h-5 w-5 inline mr-2" />
                Loyalty
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <User className="h-6 w-6 text-[#2D5016]" />
                        <h3 className="text-xl font-bold text-[#2D5016]">Personal Information</h3>
                      </div>
                      {!isEditingProfile ? (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="flex items-center space-x-2 px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] rounded-lg hover:bg-[#2D5016] hover:text-white transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="text-sm font-semibold">Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdateProfile}
                            className="flex items-center space-x-1 px-3 py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-semibold">Save</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            <span className="text-sm font-semibold">Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {!isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                          <p className="text-lg font-bold text-[#2D5016] mt-1">{user.name}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                          <p className="text-lg font-bold text-[#2D5016] mt-1">{user.email}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                          <p className="text-lg font-bold text-[#2D5016] mt-1">{user.phone}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Member Since</label>
                          <p className="text-lg font-bold text-[#2D5016] mt-1">
                            {new Date(user.createdAt).toLocaleDateString('en-IN', { 
                              day: 'numeric',
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#2D5016] mb-2">Full Name</label>
                          <input
                            type="text"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#2D5016] mb-2">Email</label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-lg cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#2D5016] mb-2">Phone</label>
                          <input
                            type="tel"
                            value={editedProfile.phone}
                            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none text-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-[#2D5016] rounded-lg p-6 bg-gradient-to-br from-[#F5EFE0] via-white to-[#F5EFE0]">
                    <div className="flex items-center space-x-3 mb-6">
                      <Award className="h-6 w-6 text-[#D4AF37]" />
                      <h3 className="text-xl font-bold text-[#2D5016]">Account Overview</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-[#2D5016]">{orders.length}</p>
                          </div>
                          <Package className="h-10 w-10 text-[#2D5016] opacity-20" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-white/90 mb-1">Loyalty Points</p>
                            <p className="text-3xl font-bold text-white">{user.loyaltyPoints}</p>
                            <p className="text-xs text-white/80 mt-1">Worth ₹{user.loyaltyPoints}</p>
                          </div>
                          <Award className="h-10 w-10 text-white opacity-50" />
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Saved Addresses</p>
                            <p className="text-3xl font-bold text-[#2D5016]">{addresses.length}</p>
                          </div>
                          <MapPin className="h-10 w-10 text-[#2D5016] opacity-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#2D5016] to-[#3D6020] rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      to="/wishlist"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all group hover:scale-105"
                    >
                      <div className="text-3xl mb-2">💚</div>
                      <h4 className="font-bold text-lg mb-1">Wishlist</h4>
                      <p className="text-sm text-white/80">View saved items</p>
                    </Link>
                    <Link
                      to="/recently-viewed"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all group hover:scale-105"
                    >
                      <div className="text-3xl mb-2">👁️</div>
                      <h4 className="font-bold text-lg mb-1">Recently Viewed</h4>
                      <p className="text-sm text-white/80">Browse history</p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all group hover:scale-105"
                    >
                      <div className="text-3xl mb-2">🛒</div>
                      <h4 className="font-bold text-lg mb-1">Shop Now</h4>
                      <p className="text-sm text-white/80">Browse products</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#2D5016]">Saved Addresses</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your delivery addresses</p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold">{showAddressForm ? 'Cancel' : 'Add Address'}</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-white border-2 border-[#2D5016] rounded-xl p-6 space-y-4 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        required
                      />
                    </div>
                    <label className="flex items-center space-x-3 bg-[#F5EFE0] p-4 rounded-lg cursor-pointer hover:bg-[#E8DCC8] transition-colors">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-[#2D5016]"
                      />
                      <span className="font-semibold text-[#2D5016]">Set as default address</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#2D5016] text-white py-3 rounded-lg font-semibold hover:bg-[#3D6020] transition-colors shadow-lg"
                      >
                        💾 Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="sm:w-32 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {addresses.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <Home className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-semibold mb-2">No saved addresses yet</p>
                    <p className="text-gray-500 text-sm">Add your first delivery address to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`rounded-xl p-6 shadow-md transition-all hover:shadow-lg ${
                          address.isDefault 
                            ? 'border-2 border-[#2D5016] bg-gradient-to-br from-[#F5EFE0] to-white' 
                            : 'border-2 border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full ${address.isDefault ? 'bg-[#2D5016]' : 'bg-gray-200'}`}>
                              <MapPin className={`h-4 w-4 ${address.isDefault ? 'text-white' : 'text-gray-600'}`} />
                            </div>
                            <h3 className="font-bold text-lg text-[#2D5016]">{address.name}</h3>
                          </div>
                          {address.isDefault && (
                            <span className="flex items-center space-x-1 px-3 py-1 bg-[#2D5016] text-white text-xs font-bold rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              <span>Default</span>
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-gray-600 flex items-center gap-2">
                            <span className="font-semibold">📱</span> {address.phone}
                          </p>
                          <p className="text-gray-800 font-medium">{address.addressLine1}</p>
                          {address.addressLine2 && <p className="text-gray-700">{address.addressLine2}</p>}
                          <p className="text-gray-800 font-medium">
                            {address.city}, {address.state} - <span className="font-bold">{address.pincode}</span>
                          </p>
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="flex-1 px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] rounded-lg hover:bg-[#2D5016] hover:text-white transition-all text-sm font-semibold"
                            >
                              ⭐ Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                            title="Delete address"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2D5016]">Order History</h2>
                  <p className="text-sm text-gray-600 mt-1">Track and manage all your orders</p>
                </div>
                
                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-semibold mb-2">No orders yet</p>
                    <p className="text-gray-500 text-sm mb-6">Start shopping to see your orders here</p>
                    <Link
                      to="/products"
                      className="inline-block px-8 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      🛒 Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-[#2D5016]">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                              <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t-2 border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
                            <p className="text-3xl font-bold text-[#2D5016]">₹{order.total}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Award className="h-4 w-4 text-green-600" />
                              <p className="text-sm text-green-600 font-semibold">+{order.pointsEarned} loyalty points earned</p>
                            </div>
                          </div>
                          <Link
                            to="/order-tracking"
                            className="px-6 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-all font-semibold shadow-lg hover:shadow-xl whitespace-nowrap"
                          >
                            📦 Track Order
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Loyalty Tab */}
            {activeTab === 'loyalty' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] rounded-2xl p-10 text-center text-white shadow-2xl border-4 border-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-14 w-14" />
                  </div>
                  <p className="text-lg font-semibold mb-2 uppercase tracking-wider">Your Balance</p>
                  <h2 className="text-6xl font-bold mb-2">{user.loyaltyPoints}</h2>
                  <p className="text-2xl font-semibold">Loyalty Points</p>
                  <p className="text-sm mt-3 bg-white/20 inline-block px-4 py-2 rounded-full">Worth ₹{user.loyaltyPoints}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="text-3xl font-bold text-[#2D5016] mb-2">₹{user.loyaltyPoints}</h3>
                    <p className="text-gray-600 font-semibold">Points Value</p>
                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1 rounded-full inline-block">1 point = ₹1</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-3xl font-bold text-[#2D5016] mb-2">1:10</h3>
                    <p className="text-gray-600 font-semibold">Earning Rate</p>
                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1 rounded-full inline-block">1 pt per ₹10 spent</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="text-3xl font-bold text-[#2D5016] mb-2">{orders.reduce((sum, order) => sum + order.pointsEarned, 0)}</h3>
                    <p className="text-gray-600 font-semibold">Total Earned</p>
                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1 rounded-full inline-block">All-time points</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#2D5016] rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-6 flex items-center gap-2">
                    <span>💡</span> How to Earn & Use Points
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-[#2D5016] text-lg">🛍️ Shop & Earn</p>
                        <p className="text-sm text-gray-700">Earn 1 point for every ₹10 spent on all orders</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-[#2D5016] text-lg">🎁 Welcome Bonus</p>
                        <p className="text-sm text-gray-700">Get 100 points instantly on registration</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-[#2D5016] text-lg">💳 Redeem Anytime</p>
                        <p className="text-sm text-gray-700">Use points as ₹1 = 1 point at checkout</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/products"
                  className="block text-center bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start Earning More Points
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
