import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { ProductProvider } from './context/ProductContext';
import { ReferralProvider } from './context/ReferralContext';
import { FarmStayProvider } from './context/FarmStayContext';
import { FarmCreditsProvider } from './context/FarmCreditsContext';

// Mobile Components
import MobileHeader from './mobile/MobileHeader';
import MobileHome from './mobile/MobileHome';
import MobileProducts from './mobile/MobileProducts';
import MobileProductDetail from './mobile/MobileProductDetail';
import MobileCart from './mobile/MobileCart';
import MobileProfile from './mobile/MobileProfile';
import MobileSearch from './mobile/MobileSearch';
import MobileSubscriptions from './mobile/MobileSubscriptions';
import MobileFarmStay from './mobile/MobileFarmStay';
import MobileRewards from './mobile/MobileRewards';
import MobileOrders from './mobile/MobileOrders';
import MobileOrderTracking from './mobile/MobileOrderTracking';
import MobileWishlist from './mobile/MobileWishlist';
import MobileLogin from './mobile/MobileLogin';
import MobilePayment from './mobile/MobilePayment';
import MobileAddresses from './mobile/MobileAddresses';
import MobilePaymentMethods from './mobile/MobilePaymentMethods';
import MobileSupport from './mobile/MobileSupport';
import MobileAbout from './mobile/MobileAbout';
import MobileBottomNav from './mobile/MobileBottomNav';
import InstallPrompt from './mobile/InstallPrompt';
import SplashScreen from './mobile/SplashScreen';
import './mobile/mobile-styles.css';

function MobileAppContent() {
  const location = useLocation();
  const hideNavRoutes = ['/search', '/product-detail', '/login', '/payment', '/order-tracking', '/addresses', '/payment-methods', '/support', '/about'];
  const hideHeaderRoutes = ['/search', '/login', '/payment', '/order-tracking', '/addresses', '/payment-methods', '/support', '/about'];
  const showBottomNav = !hideNavRoutes.some(route => location.pathname.startsWith(route));
  const showHeader = !hideHeaderRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="mobile-app">
      {showHeader && <MobileHeader />}
      <main className="mobile-main">
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/products" element={<MobileProducts />} />
          <Route path="/product-detail/:id" element={<MobileProductDetail />} />
          <Route path="/cart" element={<MobileCart />} />
          <Route path="/payment" element={<MobilePayment />} />
          <Route path="/profile" element={<MobileProfile />} />
          <Route path="/search" element={<MobileSearch />} />
          <Route path="/subscriptions" element={<MobileSubscriptions />} />
          <Route path="/farmstay" element={<MobileFarmStay />} />
          <Route path="/rewards" element={<MobileRewards />} />
          <Route path="/orders" element={<MobileOrders />} />
          <Route path="/order-tracking/:orderId" element={<MobileOrderTracking />} />
          <Route path="/wishlist" element={<MobileWishlist />} />
          <Route path="/addresses" element={<MobileAddresses />} />
          <Route path="/payment-methods" element={<MobilePaymentMethods />} />
          <Route path="/support" element={<MobileSupport />} />
          <Route path="/about" element={<MobileAbout />} />
          <Route path="/login" element={<MobileLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showBottomNav && <MobileBottomNav />}
      <InstallPrompt />
    </div>
  );
}

function MobileApp() {
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash was already shown in this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <SubscriptionProvider>
              <ReferralProvider>
                <FarmStayProvider>
                  <FarmCreditsProvider>
                    <Router basename="/m">
                      <MobileAppContent />
                    </Router>
                  </FarmCreditsProvider>
                </FarmStayProvider>
              </ReferralProvider>
            </SubscriptionProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default MobileApp;
