import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📦', title: 'My Orders', subtitle: 'Track and manage orders', path: '/orders' },
    { icon: '❤️', title: 'Wishlist', subtitle: 'Your saved items', path: '/wishlist' },
    { icon: '🔄', title: 'Subscriptions', subtitle: 'Manage subscriptions', path: '/subscriptions' },
    { icon: '🎁', title: 'Rewards & Credits', subtitle: 'Earn and redeem points', path: '/rewards' },
    { icon: '🏡', title: 'Farm Stay Bookings', subtitle: 'Your farm stays', path: '/farmstay' },
    { icon: '📍', title: 'Addresses', subtitle: 'Manage delivery addresses', path: '/addresses' },
    { icon: '💳', title: 'Payment Methods', subtitle: 'Saved cards & UPI', path: '/payment-methods' },
    { icon: '📞', title: 'Help & Support', subtitle: 'Get assistance', path: '/support' },
    { icon: 'ℹ️', title: 'About Us', subtitle: 'Know more about Aadhya Farms', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mobile-profile">
      {user ? (
        <>
          <div className="mobile-profile__header">
            <div className="mobile-profile__avatar">👤</div>
            <div className="mobile-profile__name">{user.name || 'Guest User'}</div>
            <div className="mobile-profile__email">{user.email || 'guest@aadhyafarms.com'}</div>
          </div>

          <div className="mobile-profile__menu">
            {menuItems.map((item, idx) => (
              <Link key={idx} to={item.path} className="mobile-profile__menu-item">
                <div className="mobile-profile__menu-icon">{item.icon}</div>
                <div className="mobile-profile__menu-content">
                  <div className="mobile-profile__menu-title">{item.title}</div>
                  <div className="mobile-profile__menu-subtitle">{item.subtitle}</div>
                </div>
                <div className="mobile-profile__menu-arrow">›</div>
              </Link>
            ))}
          </div>

          <div style={{ padding: '16px' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#dc2626',
                border: '2px solid #dc2626',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>👤</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            Welcome to Aadhya Farms
          </h2>
          <p style={{ fontSize: '14px', color: '#93959f', marginBottom: '24px' }}>
            Login to access your orders, wishlist & more
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'var(--farm-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Login / Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileProfile;
