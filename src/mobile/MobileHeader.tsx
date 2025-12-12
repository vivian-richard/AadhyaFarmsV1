import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const MobileHeader = () => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    if (!isPWA) {
      // Show install button after 3 seconds if event hasn't fired
      setTimeout(() => {
        if (!deferredPrompt) {
          setShowInstallBtn(true);
        }
      }, 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback: show instructions for manual installation
      alert('To install this app:\n\niOS: Tap Share button, then "Add to Home Screen"\n\nAndroid: Tap menu (⋮) then "Add to Home Screen" or "Install App"');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowInstallBtn(false);
    }
    
    setDeferredPrompt(null);
  };

  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

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
          {showInstallBtn && !isPWA && (
            <button 
              onClick={handleInstall}
              className="mobile-header__icon-btn"
              style={{
                background: 'var(--farm-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                marginRight: '8px'
              }}
            >
              📱 Install
            </button>
          )}
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
