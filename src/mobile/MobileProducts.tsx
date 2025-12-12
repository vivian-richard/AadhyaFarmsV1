import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const MobileProducts = () => {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'meat', name: 'Meat' },
  ];

  // Filter by category
  let filteredProducts = activeCategory === 'all'
    ? products
    : products?.filter((p: any) => p.category?.toLowerCase() === activeCategory);

  // Filter by price range
  filteredProducts = filteredProducts?.filter((p: any) => 
    p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Filter by rating
  filteredProducts = filteredProducts?.filter((p: any) => 
    (p.rating || 0) >= minRating
  );

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...(filteredProducts || [])].sort((a: any, b: any) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...(filteredProducts || [])].sort((a: any, b: any) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...(filteredProducts || [])].sort((a: any, b: any) => a.name.localeCompare(b.name));
  } else if (sortBy === 'rating') {
    filteredProducts = [...(filteredProducts || [])].sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
  }

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  return (
    <div style={{ paddingTop: '12px', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Category Tabs */}
      <div style={{
        padding: '0 16px 12px',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        gap: '8px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        width: '100%',
        boxSizing: 'border-box'
      } as React.CSSProperties}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              background: activeCategory === cat.id ? 'var(--farm-primary)' : 'var(--swiggy-light-gray)',
              color: activeCategory === cat.id ? '#fff' : 'var(--swiggy-dark)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort and Filter Bar */}
      <div style={{
        padding: '0 16px 12px',
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <button
          onClick={() => setShowSortModal(true)}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <span>🔄</span>
          <span>Sort</span>
        </button>
        <button
          onClick={() => setShowFilterModal(true)}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <span>⚙️</span>
          <span>Filter</span>
        </button>
      </div>

      {/* Products Grid */}
      {!filteredProducts || filteredProducts.length === 0 ? (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: '#93959f'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>No products found</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>Try selecting a different category</div>
        </div>
      ) : (
        <div className="mobile-product-grid">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="mobile-product-card">
              <Link to={`/product-detail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="mobile-product-card__image-wrapper">
                  <img
                    src={product.image || '/api/placeholder/200/200'}
                    alt={product.name}
                    className="mobile-product-card__image"
                  />
                </div>
                <div className="mobile-product-card__content">
                  <div className="mobile-product-card__name">{product.name}</div>
                  <div className="mobile-product-card__unit">{product.unit}</div>
                  <div className="mobile-product-card__footer">
                    <div className="mobile-product-card__price">₹{product.price}</div>
                  </div>
                </div>
              </Link>
              <div style={{ padding: '0 12px 12px' }}>
                <button
                  className="mobile-product-card__add-btn"
                  onClick={() => addItem(product)}
                  style={{ width: '100%' }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sort Modal */}
      {showSortModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end'
        }} onClick={() => setShowSortModal(false)}>
          <div style={{
            background: '#fff',
            width: '100%',
            borderRadius: '16px 16px 0 0',
            padding: '20px',
            maxHeight: '70vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Sort By</h3>
              <button
                onClick={() => setShowSortModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>
            
            {[
              { id: 'default', label: 'Default', icon: '📋' },
              { id: 'price-low', label: 'Price: Low to High', icon: '💰' },
              { id: 'price-high', label: 'Price: High to Low', icon: '💸' },
              { id: 'name', label: 'Name: A to Z', icon: '🔤' },
              { id: 'rating', label: 'Rating: High to Low', icon: '⭐' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSortBy(option.id);
                  setShowSortModal(false);
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  background: sortBy === option.id ? '#f8f8f8' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{option.icon}</span>
                <span style={{ fontWeight: sortBy === option.id ? '600' : '400' }}>
                  {option.label}
                </span>
                {sortBy === option.id && <span style={{ marginLeft: 'auto', color: 'var(--farm-primary)' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end'
        }} onClick={() => setShowFilterModal(false)}>
          <div style={{
            background: '#fff',
            width: '100%',
            borderRadius: '16px 16px 0 0',
            padding: '20px',
            maxHeight: '70vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Filters</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ✕
              </button>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                💰 Price Range
              </h4>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
            </div>

            {/* Rating Filter */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                ⭐ Minimum Rating
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0, 1, 2, 3, 4].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      background: minRating === rating ? 'var(--farm-primary)' : '#fff',
                      color: minRating === rating ? '#fff' : '#000',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {rating === 0 ? 'All' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  resetFilters();
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: '#fff',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'var(--farm-primary)',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileProducts;
