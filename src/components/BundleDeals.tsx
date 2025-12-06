import React from 'react';
import { ShoppingCart, Tag, Package } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const BundleDeals: React.FC = () => {
  const { bundles, getProductById } = useProducts();
  const { addItem } = useCart();

  const handleAddBundleToCart = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId);
    if (!bundle) return;

    // Add all products in the bundle to cart
    bundle.products.forEach((productId) => {
      const product = getProductById(productId);
      if (product) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full mb-4">
            <Package className="h-5 w-5 inline mr-2" />
            <span className="font-bold">Special Bundle Deals</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Save More with Our Combo Packs
          </h2>
          <p className="text-gray-600 text-lg">
            Get your favorite products together and save up to 16%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {bundle.discount}% OFF
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{bundle.name}</h3>
                <p className="text-gray-600 mb-4">{bundle.description}</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-400 line-through font-semibold">
                      ₹{bundle.originalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold text-lg">Bundle Price:</span>
                    <span className="text-green-600 font-bold text-2xl">
                      ₹{bundle.discountedPrice}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-green-700 font-semibold text-sm">
                      You save ₹{bundle.originalPrice - bundle.discountedPrice}!
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddBundleToCart(bundle.id)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add Bundle to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundleDeals;
