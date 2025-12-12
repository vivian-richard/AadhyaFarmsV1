import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { 
      path: '/', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={isActive ? 'currentColor' : 'none'} />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Home' 
    },
    { 
      path: '/products', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" fill={isActive ? 'currentColor' : 'none'} />
          <circle cx="20" cy="21" r="1" fill={isActive ? 'currentColor' : 'none'} />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      label: 'Shop' 
    },
    { 
      path: '/subscriptions', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" fill={isActive ? 'currentColor' : 'none'} />
        </svg>
      ),
      label: 'Subscribe' 
    },
    { 
      path: '/cart', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={isActive ? 'currentColor' : 'none'} />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      label: 'Cart', 
      badge: cartCount > 0 ? cartCount : undefined
    },
    { 
      path: '/profile', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" fill={isActive ? 'currentColor' : 'none'} />
        </svg>
      ),
      label: 'Account' 
    },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-bottom-nav__item ${isActive ? 'active' : ''}`}
          >
            <span className="mobile-bottom-nav__icon">
              {item.icon(isActive)}
              {item.badge && item.badge > 0 && (
                <span className="mobile-bottom-nav__badge">{item.badge}</span>
              )}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
