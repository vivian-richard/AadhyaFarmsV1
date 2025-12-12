import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

const MobileProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const product = products?.find((p: any) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate('/cart');
  };

  return (
    <div>
      {/* Back Button & Wishlist */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid var(--swiggy-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          ←
        </button>
        <button
          onClick={toggleWishlist}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px',
            color: inWishlist ? '#ff3d00' : '#666'
          }}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Product Image */}
      <div style={{
        background: 'var(--swiggy-light-gray)',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <img
          src={product.image || '/api/placeholder/300/300'}
          alt={product.name}
          style={{ maxWidth: '80%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }}
        />
      </div>

      {/* Product Info */}
      <div style={{ padding: '20px 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          {product.name}
        </h1>
        <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '16px' }}>
          {product.unit}
        </div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--swiggy-dark)', marginBottom: '20px' }}>
          ₹{product.price}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            About this product
          </h3>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            {product.description || 'Fresh and organic product from our farm. Sourced daily to ensure maximum freshness and quality.'}
          </p>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
            Why choose this product
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['100% Organic', 'Farm Fresh', 'No Preservatives', 'Daily Delivery'].map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--swiggy-green)', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        padding: '16px',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <div className="mobile-quantity-control">
          <button
            className="mobile-quantity-control__btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="mobile-quantity-control__value">{quantity}</span>
          <button
            className="mobile-quantity-control__btn"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: 'var(--swiggy-green)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          ADD TO CART - ₹{product.price * quantity}
        </button>
      </div>
    </div>
  );
};

export default MobileProductDetail;
