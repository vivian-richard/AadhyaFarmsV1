import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  // Don't show if already dismissed or if already installed
  const isDismissed = localStorage.getItem('install-prompt-dismissed');
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  if (!showPrompt || isDismissed || isPWA) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '16px',
      right: '16px',
      background: '#fff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 999,
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <img 
          src="/logo-transparent.png" 
          alt="Aadhya Farms" 
          style={{ width: '48px', height: '48px', borderRadius: '8px' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
            Install Aadhya Farms
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Add to home screen for a better experience
          </div>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            color: '#93959f'
          }}
        >
          ✕
        </button>
      </div>
      <button
        onClick={handleInstall}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--farm-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Install App
      </button>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InstallPrompt;
