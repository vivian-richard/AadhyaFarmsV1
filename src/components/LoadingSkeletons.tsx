import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-200 h-64"></div>
      <div className="p-6">
        <div className="bg-gray-200 h-6 w-24 rounded-full mb-3"></div>
        <div className="bg-gray-300 h-8 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 h-6 w-1/2 rounded mb-4"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-5/6 rounded mb-6"></div>
        <div className="bg-gray-300 h-12 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="bg-gray-200 h-48"></div>
      <div className="p-6">
        <div className="bg-gray-200 h-4 w-32 rounded mb-3"></div>
        <div className="bg-gray-300 h-6 w-full rounded mb-2"></div>
        <div className="bg-gray-300 h-6 w-4/5 rounded mb-4"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-3/4 rounded mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
          <div className="flex-1">
            <div className="bg-gray-200 h-4 w-24 rounded mb-1"></div>
            <div className="bg-gray-200 h-3 w-20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="bg-gray-200 h-48"></div>
      <div className="p-6">
        <div className="bg-gray-300 h-6 w-full rounded mb-3"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-200 h-4 w-20 rounded"></div>
          <div className="bg-gray-200 h-4 w-24 rounded"></div>
        </div>
        <div className="bg-gray-200 h-4 w-32 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
          <div className="bg-gray-200 h-6 w-24 rounded-full"></div>
        </div>
        <div className="bg-gray-300 h-10 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export const WishlistCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-48"></div>
      <div className="p-6">
        <div className="bg-gray-200 h-6 w-24 rounded-full mb-3"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 h-8 w-1/2 rounded mb-4"></div>
        <div className="bg-gray-300 h-12 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-12 w-64 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="bg-gray-300 h-16 w-96 mx-auto rounded"></div>
        <div className="bg-gray-300 h-8 w-64 mx-auto rounded"></div>
        <div className="flex gap-4 justify-center mt-8">
          <div className="bg-gray-400 h-12 w-32 rounded-lg"></div>
          <div className="bg-gray-400 h-12 w-32 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
