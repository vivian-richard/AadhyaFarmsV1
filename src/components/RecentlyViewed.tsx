import React from 'react';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Clock, Trash2 } from 'lucide-react';

const RecentlyViewed: React.FC = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { addItem } = useCart();

  if (recentlyViewed.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Clock className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#2D5016] mb-4">No Recently Viewed Products</h2>
            <p className="text-[#7A5C3C] text-lg mb-8">
              Products you view will appear here for quick access
            </p>
            <a
              href="/products"
              className="inline-block bg-[#2D5016] text-[#F5EFE0] px-8 py-3 rounded-lg font-semibold hover:bg-[#3D6020] transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#2D5016] mb-2">Recently Viewed</h1>
            <p className="text-[#7A5C3C]">{recentlyViewed.length} products you've viewed</p>
          </div>
          <button
            onClick={clearRecentlyViewed}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentlyViewed.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-auto object-contain"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-[#F5EFE0] text-[#2D5016] rounded-full text-xs font-bold mb-3">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-[#2D5016] mb-2">{product.name}</h3>
                <div className="text-2xl font-bold text-[#D4AF37] mb-4">₹{product.price}</div>
                <button
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    });
                  }}
                  className="w-full bg-[#2D5016] text-[#F5EFE0] py-3 rounded-lg font-semibold hover:bg-[#3D6020] transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
