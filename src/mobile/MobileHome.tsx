import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const MobileHome = () => {
  const { products } = useProducts();
  
  const categories = [
    { id: 'dairy', icon: '🥛', name: 'Dairy' },
    { id: 'eggs', icon: '🥚', name: 'Eggs' },
    { id: 'chicken', icon: '🍗', name: 'Chicken' },
    { id: 'mutton', icon: '🥩', name: 'Mutton' },
    { id: 'ghee', icon: '🧈', name: 'Ghee' },
    { id: 'paneer', icon: '🧀', name: 'Paneer' },
    { id: 'subscription', icon: '🔄', name: 'Subscribe' },
    { id: 'farmstay', icon: '🏡', name: 'Farm Stay' },
  ];

  const featuredProducts = products?.slice(0, 6) || [];

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Banner */}
      <div className="mobile-home__banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <img src="/logo-transparent.png" alt="Aadhya Farms" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <div className="mobile-home__banner-title" style={{ margin: 0 }}>
            Fresh from Farm
          </div>
        </div>
        <div className="mobile-home__banner-subtitle">
          100% organic products delivered daily
        </div>
      </div>

      {/* Categories */}
      <div className="mobile-categories">
        <h2 className="mobile-categories__title">Shop by Category</h2>
        <div className="mobile-categories__grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="mobile-category-card"
            >
              <div className="mobile-category-card__icon">
                <span>{category.icon}</span>
              </div>
              <div className="mobile-category-card__name">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div style={{ padding: '0 16px 20px' }}>
        <h2 className="mobile-categories__title">Special Offers 🎉</h2>
        <div style={{
          background: 'linear-gradient(135deg, #FFF9E6 0%, #FFE5B4 100%)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
            Get 15% OFF on First Order! 
          </div>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
            Use code: FRESH15
          </div>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              background: 'var(--farm-primary)',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '700'
            }}
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Popular Products */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 className="mobile-categories__title" style={{ marginBottom: 0 }}>
            Popular Products
          </h2>
          <Link
            to="/products"
            style={{
              color: 'var(--farm-primary)',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            See All →
          </Link>
        </div>
        <div className="mobile-product-grid">
          {featuredProducts.map((product: any) => (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="mobile-product-card"
            >
              <div className="mobile-product-card__image-wrapper">
                <img
                  src={product.image || '/api/placeholder/200/200'}
                  alt={product.name}
                  className="mobile-product-card__image"
                />
                <button className="mobile-product-card__wishlist">
                  ❤️
                </button>
              </div>
              <div className="mobile-product-card__content">
                <div className="mobile-product-card__name">{product.name}</div>
                <div className="mobile-product-card__unit">{product.unit}</div>
                <div className="mobile-product-card__footer">
                  <div className="mobile-product-card__price">
                    ₹{product.price}
                  </div>
                  <button className="mobile-product-card__add-btn">
                    ADD
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription CTA */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '48px' }}>🔄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
              Subscribe & Save
            </div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
              Get daily delivery & save up to 20%
            </div>
            <Link
              to="/subscriptions"
              style={{
                display: 'inline-block',
                background: 'var(--swiggy-green)',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Farm Stay Banner */}
      <div style={{ padding: '0 16px 20px' }}>
        <Link to="/farmstay" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFE8E8 0%, #FFD4D4 100%)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏡</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: 'var(--swiggy-dark)' }}>
              Experience Farm Life
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              Book your stay at our organic farm
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileHome;
