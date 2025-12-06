import { ShoppingCart, Search, ChevronLeft, ChevronRight, Check, Heart } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductImageZoom from './ProductImageZoom';
import { ProductCardSkeleton } from './LoadingSkeletons';
import SearchAutocomplete from './SearchAutocomplete';
import SocialShare from './SocialShare';

export default function Products() {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy]);

  const products = [
    {
      name: 'Fresh Milk',
      image: '/products/Milk.png',
      price: 70,
      unit: 'per liter',
      description: 'Pure A2 milk from our grass-fed cows, rich in nutrients and natural goodness',
      category: 'Dairy',
    },
    {
      name: 'Badam Milk',
      image: '/products/Badam-Milk.png',
      price: 90,
      unit: 'per liter',
      description: 'Delicious almond-flavored milk packed with nutrients and natural sweetness',
      category: 'Dairy',
    },
    {
      name: 'Banana Milk',
      image: '/products/Banana-milk.png',
      price: 85,
      unit: 'per liter',
      description: 'Creamy banana-flavored milk, a perfect energy drink for all ages',
      category: 'Dairy',
    },
    {
      name: 'Chocolate Milk',
      image: '/products/Chacolate-Milk.png',
      price: 85,
      unit: 'per liter',
      description: 'Rich chocolate milk made with pure cocoa and fresh dairy',
      category: 'Dairy',
    },
    {
      name: 'Rose Milk',
      image: '/products/Rose-Milk.png',
      price: 85,
      unit: 'per liter',
      description: 'Aromatic rose-flavored milk with natural rose essence',
      category: 'Dairy',
    },
    {
      name: 'Strawberry Milk',
      image: '/products/Strawberry-Milk.png',
      price: 85,
      unit: 'per liter',
      description: 'Sweet strawberry-flavored milk with real fruit goodness',
      category: 'Dairy',
    },
    {
      name: 'Dryfruit Milk',
      image: '/products/Dryfruit-Milk.png',
      price: 120,
      unit: 'per liter',
      description: 'Premium milk enriched with assorted dry fruits and nuts',
      category: 'Dairy',
    },
    {
      name: 'Flavored Milk Combo',
      image: '/products/Flavored-Milk-Combo.png',
      price: 400,
      unit: 'per pack',
      description: 'Variety pack of all our delicious flavored milk options',
      category: 'Dairy',
    },
    {
      name: 'Butter Milk',
      image: '/products/Buttuer-Milk.png',
      price: 50,
      unit: 'per liter',
      description: 'Traditional buttermilk with natural probiotics for healthy digestion',
      category: 'Dairy',
    },
    {
      name: 'Fresh Curd',
      image: '/products/Curd.png',
      price: 60,
      unit: 'per kg',
      description: 'Thick, creamy yogurt with natural probiotics for healthy digestion',
      category: 'Dairy',
    },
    {
      name: 'Fresh Paneer',
      image: '/products/Paneer.png',
      price: 350,
      unit: 'per kg',
      description: 'Soft, fresh cottage cheese made daily from organic milk',
      category: 'Dairy',
    },
    {
      name: 'Pure Ghee',
      image: '/products/Ghee.png',
      price: 800,
      unit: 'per kg',
      description: 'Traditional hand-churned ghee made from pure cow milk, the essence of purity',
      category: 'Dairy',
    },
    {
      name: 'Fresh Malaai',
      image: '/products/Malaai.png',
      price: 200,
      unit: 'per kg',
      description: 'Rich, creamy malai collected from fresh milk',
      category: 'Dairy',
    },
    {
      name: 'Kova',
      image: '/products/Kova.png',
      price: 400,
      unit: 'per kg',
      description: 'Traditional milk solid, perfect for making Indian sweets',
      category: 'Dairy',
    },
    {
      name: 'Farm Fresh Eggs',
      image: '/products/Eggs.png',
      price: 90,
      unit: 'per dozen',
      description: 'Free-range chicken eggs with rich golden yolks, packed with protein',
      category: 'Meat',
    },
    {
      name: 'Fresh Chicken',
      image: '/products/chicken.png',
      price: 280,
      unit: 'per kg',
      description: 'Farm-raised, antibiotic-free chicken for healthy meals',
      category: 'Meat',
    },
    {
      name: 'Chicken Bone',
      image: '/products/chicken-bone.png',
      price: 200,
      unit: 'per kg',
      description: 'Fresh chicken with bone, perfect for curries and traditional dishes',
      category: 'Meat',
    },
    {
      name: 'Marinated Chicken',
      image: '/products/Chicken-Marinated .png',
      price: 320,
      unit: 'per kg',
      description: 'Expertly marinated chicken ready for grilling or cooking',
      category: 'Meat',
    },
    {
      name: 'Chicken Tandoori',
      image: '/products/Chicken-Tandoori.png',
      price: 350,
      unit: 'per kg',
      description: 'Tandoori-spiced marinated chicken, ready to cook',
      category: 'Meat',
    },
    {
      name: 'Chicken Liver',
      image: '/products/Liver.png',
      price: 180,
      unit: 'per kg',
      description: 'Fresh chicken liver, rich in iron and nutrients',
      category: 'Meat',
    },
    {
      name: 'Marinated Chicken Liver',
      image: '/products/Marinated-Chicken-Liver.png',
      price: 200,
      unit: 'per kg',
      description: 'Marinated chicken liver with aromatic spices',
      category: 'Meat',
    },
    {
      name: 'Mutton Boneless',
      image: '/products/Mutton-Boneless.png',
      price: 750,
      unit: 'per kg',
      description: 'Premium boneless mutton, tender and flavorful',
      category: 'Meat',
    },
    {
      name: 'Mutton Bone',
      image: '/products/Mutton-Bone.png',
      price: 600,
      unit: 'per kg',
      description: 'Fresh mutton with bone, ideal for rich curries',
      category: 'Meat',
    },
    {
      name: 'Mutton Chops',
      image: '/products/Mutton-Chops.png',
      price: 700,
      unit: 'per kg',
      description: 'Succulent mutton chops, perfect for grilling',
      category: 'Meat',
    },
    {
      name: 'Mutton Kheema',
      image: '/products/Mutton-Kheema.png',
      price: 650,
      unit: 'per kg',
      description: 'Freshly minced mutton for kebabs and curries',
      category: 'Meat',
    },
    {
      name: 'Marinated Mutton',
      image: '/products/Mutton-Marinated.png',
      price: 800,
      unit: 'per kg',
      description: 'Marinated mutton with traditional spices, ready to cook',
      category: 'Meat',
    },
    {
      name: 'Boti',
      image: '/products/Boti.png',
      price: 720,
      unit: 'per kg',
      description: 'Tender mutton boti pieces, perfect for kebabs',
      category: 'Meat',
    },
  ];

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] py-20 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 opacity-3 pointer-events-none">
        <img src="/hen.png" alt="" className="h-72 w-auto" />
      </div>
      <div className="absolute right-0 top-0 opacity-3 pointer-events-none">
        <img src="/goat.png" alt="" className="h-80 w-auto transform scale-x-[-1]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2D5016] mb-6">
            Our Organic Products
          </h1>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto leading-relaxed">
            Discover our range of 100% organic dairy and meat products, made with love and care.
            Each product is a testament to quality, purity, and traditional farming methods.
          </p>
        </div>

        {/* Search Autocomplete */}
        <div className="flex justify-center mb-8">
          <SearchAutocomplete 
            products={products.map(p => ({ 
              name: p.name, 
              category: p.category, 
              price: p.price, 
              image: p.image 
            }))} 
            onSelect={(product) => {
              setSearchQuery(product.name);
              const productId = product.name.toLowerCase().replace(/\s+/g, '-');
              addToRecentlyViewed({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
              });
            }}
          />
        </div>

        {/* Search, Filter, and Sort Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7A5C3C]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none text-[#2D5016]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none text-[#2D5016] font-semibold bg-white cursor-pointer"
              >
                <option value="All">All Products</option>
                <option value="Dairy">Dairy Products</option>
                <option value="Meat">Meat Products</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none text-[#2D5016] font-semibold bg-white cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-[#7A5C3C] font-semibold">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show loading skeletons
            [...Array(itemsPerPage)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            currentProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-8 flex items-center justify-center h-64 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={product.image} alt="" className="h-full w-full object-cover blur-sm" />
                </div>
                <ProductImageZoom
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-auto object-contain relative z-10"
                />
                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    const productId = product.name.toLowerCase().replace(/\s+/g, '-');
                    if (isInWishlist(productId)) {
                      removeFromWishlist(productId);
                    } else {
                      addToWishlist({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      });
                    }
                  }}
                  className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isInWishlist(product.name.toLowerCase().replace(/\s+/g, '-'))
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-[#F5EFE0] text-[#2D5016] rounded-full text-xs font-bold mb-3">
                  {product.category}
                </div>
                <h3 className="text-2xl font-bold text-[#2D5016] mb-2">{product.name}</h3>
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold text-[#D4AF37]">₹{product.price}</span>
                  <span className="text-[#7A5C3C]">{product.unit}</span>
                </div>
                <p className="text-[#7A5C3C] leading-relaxed mb-6">{product.description}</p>
                
                {/* Social Share and Add to Cart */}
                <div className="flex gap-2 mb-4">
                  <SocialShare
                    title={product.name}
                    description={product.description}
                    imageUrl={product.image}
                  />
                  <button 
                    onClick={() => {
                      const productId = product.name.toLowerCase().replace(/\s+/g, '-');
                      addItem({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      });
                      // Track recently viewed when adding to cart
                      addToRecentlyViewed({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      });
                      setAddedToCart(product.name);
                      setTimeout(() => setAddedToCart(null), 2000);
                    }}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      addedToCart === product.name
                        ? 'bg-green-600 text-white'
                        : 'bg-[#2D5016] text-[#F5EFE0] hover:bg-[#3D6020]'
                    }`}
                  >
                    {addedToCart === product.name ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2D5016] text-white hover:bg-[#3D6020]'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show first page, last page, current page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-[#D4AF37] text-[#2D5016]'
                          : 'bg-white text-[#2D5016] hover:bg-[#F5EFE0]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-[#7A5C3C]">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2D5016] text-white hover:bg-[#3D6020]'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="mt-20 bg-gradient-to-r from-[#2D5016] to-[#3D6020] rounded-3xl p-12 md:p-16 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose Our Products?</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg text-[#E8DCC8]">100% organic and chemical-free farming</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg text-[#E8DCC8]">Happy, grass-fed animals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg text-[#E8DCC8]">Traditional farming methods</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg text-[#E8DCC8]">Daily fresh production</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg text-[#E8DCC8]">Direct farm-to-table delivery</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-[#F5EFE0] rounded-2xl p-8 transform rotate-3 shadow-2xl">
                <img
                  src="/products.png"
                  alt="Natural Farming"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
