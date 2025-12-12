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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>
          <Link to="/cart" className="mobile-header__icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
            </svg>
            {cartCount > 0 && (
              <span className="mobile-header__badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
      <div className="mobile-header__search">
        <Link to="/search" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="mobile-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span style={{ color: '#93959f' }}>Search for products...</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default MobileHeader;
