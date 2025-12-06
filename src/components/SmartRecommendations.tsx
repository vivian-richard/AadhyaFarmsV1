import React from 'react';
import { Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

interface SmartRecommendationsProps {
  title?: string;
  productIds?: string[];
  type?: 'seasonal' | 'recommended' | 'frequently-bought';
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  title,
  productIds,
  type = 'seasonal',
}) => {
  const { products, getSeasonalHighlights, getFrequentlyBoughtTogether, getProductById } = useProducts();

  let displayProducts = products;
  let displayTitle = title || 'You Might Also Like';

  if (type === 'seasonal') {
    displayProducts = getSeasonalHighlights();
    displayTitle = title || '🌟 Seasonal Highlights';
  } else if (type === 'frequently-bought' && productIds && productIds.length > 0) {
    displayProducts = getFrequentlyBoughtTogether(productIds[0]);
    displayTitle = title || '🛒 Frequently Bought Together';
  } else if (productIds && productIds.length > 0) {
    displayProducts = productIds
      .map((id) => getProductById(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }

  if (displayProducts.length === 0) return null;

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">{displayTitle}</span>
          </div>
          {type === 'seasonal' && (
            <p className="text-gray-600 text-lg">
              Handpicked fresh products perfect for this season
            </p>
          )}
          {type === 'frequently-bought' && (
            <p className="text-gray-600 text-lg">
              Customers who bought this also purchased
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              stock={product.stock}
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
              variations={product.variations}
              subscriptionOnly={product.subscriptionOnly}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
