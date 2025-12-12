import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import MobileApp from './MobileApp.tsx';
import './index.css';
import './mobile-app.css';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

// Check if app is running as PWA
const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://');
};

// Detect mobile device
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isSmallScreen = window.innerWidth <= 768;
  return mobileRegex.test(userAgent) || isSmallScreen;
};

function AppWrapper() {
  // If running as PWA, always show mobile app
  const [isMobile, setIsMobile] = useState(isPWA() || isMobileDevice());

  useEffect(() => {
    // If PWA, always stay mobile
    if (isPWA()) {
      setIsMobile(true);
      if (!window.location.pathname.startsWith('/m')) {
        window.history.replaceState(null, '', '/m' + window.location.pathname);
      }
      return;
    }

    const handleResize = () => {
      const shouldBeMobile = isMobileDevice();
      if (shouldBeMobile !== isMobile) {
        setIsMobile(shouldBeMobile);
        
        // Update URL based on device type
        if (shouldBeMobile && !window.location.pathname.startsWith('/m')) {
          window.history.replaceState(null, '', '/m' + window.location.pathname);
        } else if (!shouldBeMobile && window.location.pathname.startsWith('/m')) {
          const newPath = window.location.pathname.replace(/^\/m/, '') || '/';
          window.history.replaceState(null, '', newPath);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial URL setup
    if (isMobile && !window.location.pathname.startsWith('/m')) {
      window.history.replaceState(null, '', '/m' + window.location.pathname);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return isMobile ? <MobileApp /> : <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
