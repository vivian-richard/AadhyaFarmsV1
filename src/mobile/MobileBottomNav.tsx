import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { items } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { 
      path: '/', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : '#93959f'}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      label: 'Home' 
    },
    { 
      path: '/products', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : '#93959f'}>
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      ),
      label: 'Shop' 
    },
    { 
      path: '/wishlist', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke={isActive ? 'currentColor' : '#93959f'} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      label: 'Wishlist',
      badge: wishlistCount > 0 ? wishlistCount : undefined
    },
    { 
      path: '/cart', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : '#93959f'}>
          <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
        </svg>
      ),
      label: 'Cart', 
      badge: cartCount > 0 ? cartCount : undefined
    },
    { 
      path: '/profile', 
      icon: (isActive: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : '#93959f'}>
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
