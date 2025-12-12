import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const MobileCart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { addToWishlist } = useWishlist();

  const handleMoveToWishlist = (item: any) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category || 'Dairy',
      unit: item.unit
    });
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="mobile-cart">
        <div className="mobile-cart__empty">
          <div className="mobile-cart__empty-icon">🛒</div>
          <div className="mobile-cart__empty-text">Your cart is empty</div>
          <div className="mobile-cart__empty-subtitle">
            Add products to get started
          </div>
          <button
            className="mobile-cart__browse-btn"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-cart">
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
        My Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
      </h1>

      {items.map((item) => (
        <div key={item.id} className="mobile-cart-item">
          <img
            src={item.image || '/api/placeholder/80/80'}
            alt={item.name}
            className="mobile-cart-item__image"
          />
          <div className="mobile-cart-item__content">
            <div className="mobile-cart-item__name">{item.name}</div>
            <div className="mobile-cart-item__unit">{item.unit}</div>
            <div className="mobile-cart-item__footer">
              <div className="mobile-cart-item__price">₹{item.price * item.quantity}</div>
              <div className="mobile-quantity-control">
                <button
                  className="mobile-quantity-control__btn"
                  onClick={() => {
                    if (item.quantity === 1) {
                      removeItem(item.id);
                    } else {
                      updateQuantity(item.id, item.quantity - 1);
                    }
                  }}
                >
                  −
                </button>
                <span className="mobile-quantity-control__value">{item.quantity}</span>
                <button
                  className="mobile-quantity-control__btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleMoveToWishlist(item)}
              style={{
                marginTop: '8px',
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ❤️ Move to Wishlist
            </button>
          </div>
        </div>
      ))}

      {/* Bill Details */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--swiggy-light-gray)',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
          Bill Details
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span>Item Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--swiggy-green)' }}>
            <span>Delivery Fee</span>
            <span>FREE</span>
          </div>
          <div style={{ borderTop: '1px dashed #d0d0d0', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700' }}>
            <span>To Pay</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mobile-checkout-bar">
        <button className="mobile-checkout-btn" onClick={() => navigate('/payment')}>
          <span>Proceed to Checkout</span>
          <span className="mobile-checkout-btn__amount">₹{totalPrice}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileCart;
