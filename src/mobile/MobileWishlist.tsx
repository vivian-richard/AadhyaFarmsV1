import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const MobileWishlist = () => {
  const navigate = useNavigate();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category || 'Dairy'
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="mobile-wishlist">
        <div style={{ padding: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
            My Wishlist
          </h1>
          <div style={{
            background: '#f8f8f8',
            borderRadius: '12px',
            padding: '48px 16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>❤️</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Your wishlist is empty
            </div>
            <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '20px' }}>
              Save your favorite products here
            </div>
            <button
              onClick={() => navigate('/products')}
              style={{
                background: 'var(--farm-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-wishlist">
      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
          My Wishlist ({wishlistItems.length})
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', padding: '12px' }}>
                <img
                  src={item.image || '/api/placeholder/100/100'}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/product-detail/${item.id}`)}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '4px'
                  }}>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#3d4152',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate(`/product-detail/${item.id}`)}
                    >
                      {item.name}
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '0',
                        color: '#dc2626'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '8px' }}>
                    {item.unit}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--farm-primary)',
                    marginBottom: '12px'
                  }}>
                    ₹{item.price}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{
                      background: 'var(--farm-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Move All to Cart Button */}
        {wishlistItems.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            left: '16px',
            right: '16px',
            zIndex: 10
          }}>
            <button
              onClick={() => {
                wishlistItems.forEach(item => handleAddToCart(item));
              }}
              style={{
                width: '100%',
                background: 'var(--swiggy-orange)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileWishlist;
