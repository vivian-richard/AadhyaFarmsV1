import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileGiftsHampers = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'festival' | 'corporate' | 'wellness'>('all');

  const giftHampers = [
    {
      id: 'gift-1',
      name: 'Premium Wellness Hamper',
      category: 'wellness',
      price: 1499,
      originalPrice: 1899,
      image: '/products/wellness-hamper.jpg',
      description: 'Organic honey, dry fruits, herbal tea, ghee',
      items: 5,
      featured: true
    },
    {
      id: 'gift-2',
      name: 'Festival Special Basket',
      category: 'festival',
      price: 999,
      originalPrice: 1299,
      image: '/products/festival-hamper.jpg',
      description: 'Fresh fruits, sweets, dry fruits, decorative basket',
      items: 6,
      featured: true
    },
    {
      id: 'gift-3',
      name: 'Corporate Gift Box',
      category: 'corporate',
      price: 1299,
      originalPrice: 1599,
      image: '/products/corporate-hamper.jpg',
      description: 'Premium tea, coffee, cookies, branded packaging',
      items: 4,
      featured: true
    },
    {
      id: 'gift-4',
      name: 'Organic Fruit Basket',
      category: 'all',
      price: 799,
      originalPrice: 999,
      image: '/products/fruit-basket.jpg',
      description: 'Seasonal organic fruits in decorative basket',
      items: 8,
      featured: false
    },
    {
      id: 'gift-5',
      name: 'Gourmet Delights',
      category: 'corporate',
      price: 1799,
      originalPrice: 2199,
      image: '/products/gourmet-hamper.jpg',
      description: 'Exotic cheese, wine, crackers, premium nuts',
      items: 6,
      featured: false
    },
    {
      id: 'gift-6',
      name: 'Healthy Living Box',
      category: 'wellness',
      price: 1199,
      originalPrice: 1499,
      image: '/products/healthy-hamper.jpg',
      description: 'Quinoa, chia seeds, flax seeds, organic cereals',
      items: 7,
      featured: false
    },
    {
      id: 'gift-7',
      name: 'Diwali Special Hamper',
      category: 'festival',
      price: 1599,
      originalPrice: 1999,
      image: '/products/diwali-hamper.jpg',
      description: 'Sweets, dry fruits, diyas, decorative items',
      items: 8,
      featured: false
    },
    {
      id: 'gift-8',
      name: 'Eco-Friendly Gift Set',
      category: 'all',
      price: 899,
      originalPrice: 1099,
      image: '/products/eco-hamper.jpg',
      description: 'Reusable bags, bamboo products, organic items',
      items: 5,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Gifts', icon: '🎁' },
    { id: 'festival', label: 'Festival', icon: '🪔' },
    { id: 'corporate', label: 'Corporate', icon: '💼' },
    { id: 'wellness', label: 'Wellness', icon: '🌿' }
  ];

  const filteredHampers = selectedCategory === 'all' 
    ? giftHampers 
    : giftHampers.filter(h => h.category === selectedCategory);

  const handleAddToCart = (hamper: typeof giftHampers[0]) => {
    addItem({
      id: hamper.id,
      name: hamper.name,
      price: hamper.price,
      image: hamper.image,
      category: 'Gifts',
      unit: 'hamper'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
              Gifts & Hampers
            </h1>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              Perfect gifts for every occasion
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              style={{
                background: selectedCategory === cat.id ? 'var(--farm-primary)' : '#fff',
                color: selectedCategory === cat.id ? '#fff' : '#333',
                border: selectedCategory === cat.id ? 'none' : '1px solid #e0e0e0',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Featured Hampers */}
        {selectedCategory === 'all' && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              ⭐ Featured Hampers
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {giftHampers.filter(h => h.featured).map((hamper) => (
                <div
                  key={hamper.id}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid #fbbf24'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      height: '180px',
                      background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${hamper.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#fbbf24',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      ⭐ FEATURED
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#dc2626',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      Save ₹{hamper.originalPrice - hamper.price}
                    </div>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                      {hamper.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                      {hamper.description}
                    </p>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                      {hamper.items} premium items included
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666', textDecoration: 'line-through' }}>
                          ₹{hamper.originalPrice}
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                          ₹{hamper.price}
                        </div>
                      </div>
                      <div style={{
                        background: '#dcfce7',
                        color: '#16a34a',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '700'
                      }}>
                        {Math.round(((hamper.originalPrice - hamper.price) / hamper.originalPrice) * 100)}% OFF
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(hamper)}
                      style={{
                        width: '100%',
                        background: 'var(--farm-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Hampers Grid */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
            {selectedCategory === 'all' ? '🎁 All Hampers' : `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.label} Hampers`}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filteredHampers.map((hamper) => (
              <div
                key={hamper.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{
                    height: '140px',
                    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${hamper.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  {hamper.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: '#fbbf24',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '9px',
                      fontWeight: '700'
                    }}>
                      ⭐
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {hamper.items} items
                  </div>
                </div>

                <div style={{ padding: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px', lineHeight: '1.3', height: '36px', overflow: 'hidden' }}>
                    {hamper.name}
                  </h3>

                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#666', textDecoration: 'line-through' }}>
                      ₹{hamper.originalPrice}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                      ₹{hamper.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(hamper)}
                    style={{
                      width: '100%',
                      background: 'var(--farm-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileGiftsHampers;
