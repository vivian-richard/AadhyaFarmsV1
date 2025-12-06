import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, AlertCircle, Check, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts, ProductVariation } from '../context/ProductContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  averageRating: number;
  totalReviews: number;
  variations?: ProductVariation[];
  subscriptionOnly?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  stock,
  averageRating,
  totalReviews,
  variations,
  subscriptionOnly = false,
}) => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    variations?.[0] || null
  );

  const currentPrice = selectedVariation?.price || price;
  const currentStock = selectedVariation?.stock || stock;
  const isInWishlistAlready = isInWishlist(id);

  const handleAddToCart = () => {
    addItem({
      id: selectedVariation?.id || id,
      name: selectedVariation ? `${name} (${selectedVariation.size})` : name,
      price: currentPrice,
      image,
      category,
    });
  };

  const handleAddToWishlist = () => {
    if (!isInWishlistAlready) {
      addToWishlist({
        id,
        name,
        price,
        image,
        category,
      });
    }
  };

  const getStockStatus = () => {
    if (currentStock === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (currentStock <= 10) return { text: `Only ${currentStock} left!`, color: 'text-orange-600', bg: 'bg-orange-100' };
    return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        
        {/* Subscription Only Badge */}
        {subscriptionOnly ? (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Package className="h-3 w-3" />
            Subscription Only
          </div>
        ) : (
          /* Stock Badge */
          <div className={`absolute top-3 left-3 ${stockStatus.bg} ${stockStatus.color} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
            <Package className="h-3 w-3" />
            {stockStatus.text}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all ${
            isInWishlistAlready
              ? 'bg-pink-600 text-white'
              : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600'
          }`}
          disabled={isInWishlistAlready}
        >
          <Heart className={`h-5 w-5 ${isInWishlistAlready ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{category}</p>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} ({totalReviews})
          </span>
        </div>

        {/* Variations */}
        {variations && variations.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => setSelectedVariation(variation)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border-2 transition-all ${
                    selectedVariation?.id === variation.id
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  {variation.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-600">₹{currentPrice}</span>
            {selectedVariation && (
              <p className="text-xs text-gray-500">{selectedVariation.size}</p>
            )}
          </div>
        </div>

        {/* Add to Cart Button or Subscribe Button */}
        {subscriptionOnly ? (
          <a
            href="/new-subscription"
            className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
          >
            <Package className="h-5 w-5" />
            Subscribe Only
          </a>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
            }`}
          >
            {currentStock === 0 ? (
              <>
                <AlertCircle className="h-5 w-5" />
                Out of Stock
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
