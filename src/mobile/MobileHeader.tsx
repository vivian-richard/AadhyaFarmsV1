import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileHeader = () => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="mobile-header">
      <div className="mobile-header__top">
        <div className="mobile-header__location">
          <div className="mobile-header__location-label">Deliver to</div>
          <div className="mobile-header__location-text">
            <span>Home</span>
            <span style={{ fontSize: '12px' }}>▼</span>
          </div>
        </div>
        <div className="mobile-header__actions">
          <Link to="/wishlist" className="mobile-header__icon-btn">
            <span>❤️</span>
          </Link>
          <Link to="/cart" className="mobile-header__icon-btn">
            <span>🛒</span>
            {cartCount > 0 && (
              <span className="mobile-header__badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
      <div className="mobile-header__search">
        <Link to="/search" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="mobile-search-bar">
            <span style={{ fontSize: '18px' }}>🔍</span>
            <span style={{ color: '#93959f' }}>Search for products...</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default MobileHeader;
