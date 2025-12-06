import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCoupon } from '../context/CouponContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useProducts } from '../context/ProductContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X, AlertCircle, Heart, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartRecommendations from './SmartRecommendations';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, addItem } = useCart();
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount, availableCoupons } = useCoupon();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();
  const { getFrequentlyBoughtTogether } = useProducts();
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist' | 'recently-viewed'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);

  const discount = calculateDiscount(totalPrice);
  const finalPrice = totalPrice - discount;

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Shopping</h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'cart'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              Cart ({totalItems})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'wishlist'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="h-5 w-5" />
              Wishlist ({wishlistItems.length})
            </button>
            <button
              onClick={() => setActiveTab('recently-viewed')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'recently-viewed'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="h-5 w-5" />
              Recently Viewed ({recentlyViewed.length})
            </button>
          </div>
        </div>

        {/* Cart Tab Content */}
        {activeTab === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Add some fresh, organic products from our farm to get started!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cart Items ({totalItems})</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mt-2">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                      <p className="text-xl font-bold text-green-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Coupon Section */}
              <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-700">{appliedCoupon.code}</p>
                        <p className="text-xs text-gray-600">{appliedCoupon.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{couponError}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-sm text-green-600 hover:text-green-700 font-semibold mt-2"
                    >
                      {showCoupons ? 'Hide' : 'View'} available coupons
                    </button>
                    {showCoupons && (
                      <div className="mt-3 space-y-2">
                        {availableCoupons.map((coupon) => (
                          <div
                            key={coupon.code}
                            onClick={() => {
                              setCouponCode(coupon.code);
                              handleApplyCoupon();
                              setShowCoupons(false);
                            }}
                            className="p-3 bg-white rounded border border-gray-200 hover:border-green-500 cursor-pointer transition-colors"
                          >
                            <p className="font-semibold text-green-700">{coupon.code}</p>
                            <p className="text-xs text-gray-600">{coupon.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">₹{finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/payment"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                to="/products"
                className="w-full mt-3 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Free delivery</span> on all orders!
                  Fresh produce delivered straight from our farm to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
              </>
            )}
          </>
        )}

        {/* Wishlist Tab Content */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Start adding your favorite products to your wishlist!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                      >
                        <X className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                      </div>
                      <button
                        onClick={() => {
                          addItem(item);
                          removeFromWishlist(item.id);
                        }}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recently Viewed Tab Content */}
        {activeTab === 'recently-viewed' && (
          <div>
            {recentlyViewed.length === 0 ? (
              <div className="text-center py-20">
                <Clock className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">No Recently Viewed Products</h2>
                <p className="text-gray-600 mb-8">
                  Products you view will appear here for easy access!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyViewed.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                        <Eye className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between mb-4 mt-3">
                        <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                      </div>
                      <button
                        onClick={() => addItem(item)}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Frequently Bought Together - Show only when cart tab is active and has items */}
        {activeTab === 'cart' && items.length > 0 && (
          <div className="mt-12">
            <SmartRecommendations
              type="frequently-bought"
              productIds={[items[0].id]}
              title="🛒 Frequently Bought Together"
            />
          </div>
        )}

        {/* You Might Also Like - Show for all tabs */}
        {(activeTab !== 'cart' || items.length === 0) && (
          <div className="mt-12">
            <SmartRecommendations type="seasonal" title="✨ You Might Also Like" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
