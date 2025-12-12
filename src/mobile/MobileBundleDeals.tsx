import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface BundleDeal {
  id: string;
  name: string;
  products: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  image: string;
  description: string;
  popular?: boolean;
}

const MobileBundleDeals = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState<BundleDeal | null>(null);

  const bundleDeals: BundleDeal[] = [
    {
      id: 'bundle-1',
      name: 'Fresh Start Bundle',
      products: ['Organic Tomatoes 500g', 'Organic Potatoes 1kg', 'Organic Onions 500g'],
      originalPrice: 250,
      bundlePrice: 199,
      savings: 51,
      image: '/products/vegetables-mix.jpg',
      description: 'Essential veggies for your daily cooking',
      popular: true
    },
    {
      id: 'bundle-2',
      name: 'Fruit Fiesta',
      products: ['Organic Apples 500g', 'Organic Bananas 1kg', 'Organic Oranges 500g'],
      originalPrice: 320,
      bundlePrice: 269,
      savings: 51,
      image: '/products/fruits-mix.jpg',
      description: 'Fresh fruits packed with vitamins',
      popular: true
    },
    {
      id: 'bundle-3',
      name: 'Leafy Greens Pack',
      products: ['Organic Spinach 250g', 'Organic Coriander 100g', 'Organic Mint 100g'],
      originalPrice: 180,
      bundlePrice: 149,
      savings: 31,
      image: '/products/greens-mix.jpg',
      description: 'Nutritious leafy vegetables bundle'
    },
    {
      id: 'bundle-4',
      name: 'Dairy Delights',
      products: ['Organic Milk 1L', 'Organic Ghee 500ml', 'Organic Paneer 200g'],
      originalPrice: 450,
      bundlePrice: 389,
      savings: 61,
      image: '/products/dairy-mix.jpg',
      description: 'Pure and fresh dairy products'
    },
    {
      id: 'bundle-5',
      name: 'Breakfast Essentials',
      products: ['Organic Bread', 'Organic Butter 200g', 'Organic Honey 250g'],
      originalPrice: 280,
      bundlePrice: 229,
      savings: 51,
      image: '/products/breakfast-mix.jpg',
      description: 'Start your day the healthy way'
    },
    {
      id: 'bundle-6',
      name: 'Salad Special',
      products: ['Organic Cucumber 500g', 'Organic Lettuce', 'Organic Carrots 500g'],
      originalPrice: 200,
      bundlePrice: 169,
      savings: 31,
      image: '/products/salad-mix.jpg',
      description: 'Perfect ingredients for a fresh salad'
    }
  ];

  const handleAddBundle = (bundle: BundleDeal) => {
    // Add bundle as a single item
    addItem({
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      image: bundle.image,
      category: 'Bundle',
      unit: 'bundle'
    });
    setSelectedBundle(bundle);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              Bundle Deals
            </h1>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              Save more by buying together
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '16px',
        margin: '12px 16px',
        borderRadius: '12px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '32px' }}>💰</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
            Save up to 25% on Bundle Deals
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Pre-selected combos at special prices
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Popular Bundles */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
            🔥 Popular Bundles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bundleDeals.filter(b => b.popular).map((bundle) => (
              <div
                key={bundle.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{
                    height: '160px',
                    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${bundle.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
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
                    Save ₹{bundle.savings}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                    {bundle.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                    {bundle.description}
                  </p>

                  {/* Products List */}
                  <div style={{
                    background: '#f8f8f8',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px', fontWeight: '600' }}>
                      INCLUDES:
                    </div>
                    {bundle.products.map((product, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#333', marginBottom: '4px' }}>
                        • {product}
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666', textDecoration: 'line-through' }}>
                        ₹{bundle.originalPrice}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                        ₹{bundle.bundlePrice}
                      </div>
                    </div>
                    <div style={{
                      background: '#dcfce7',
                      color: '#16a34a',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}>
                      {Math.round((bundle.savings / bundle.originalPrice) * 100)}% OFF
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddBundle(bundle)}
                    disabled={selectedBundle?.id === bundle.id}
                    style={{
                      width: '100%',
                      background: selectedBundle?.id === bundle.id ? '#10b981' : 'var(--farm-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: selectedBundle?.id === bundle.id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {selectedBundle?.id === bundle.id ? '✓ Added to Cart' : 'Add Bundle to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Bundles */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
            📦 All Bundle Deals
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {bundleDeals.map((bundle) => (
              <div
                key={bundle.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{
                    height: '120px',
                    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${bundle.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#dc2626',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    -{Math.round((bundle.savings / bundle.originalPrice) * 100)}%
                  </div>
                </div>

                <div style={{ padding: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px', lineHeight: '1.3' }}>
                    {bundle.name}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px', lineHeight: '1.3' }}>
                    {bundle.products.length} items
                  </p>

                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#666', textDecoration: 'line-through' }}>
                      ₹{bundle.originalPrice}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                      ₹{bundle.bundlePrice}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddBundle(bundle)}
                    disabled={selectedBundle?.id === bundle.id}
                    style={{
                      width: '100%',
                      background: selectedBundle?.id === bundle.id ? '#10b981' : 'var(--farm-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: selectedBundle?.id === bundle.id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {selectedBundle?.id === bundle.id ? '✓' : 'Add'}
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

export default MobileBundleDeals;
