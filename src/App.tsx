import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { CouponProvider } from './context/CouponContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { ProductProvider } from './context/ProductContext';
import { BlogProvider } from './context/BlogContext';
import { ReferralProvider } from './context/ReferralContext';
import { GiftProvider } from './context/GiftContext';
import { FarmStayProvider } from './context/FarmStayContext';
import { FarmCreditsProvider } from './context/FarmCreditsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import FarmStay from './components/FarmStay';
import About from './components/About';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Wishlist from './components/Wishlist';
import RecentlyViewed from './components/RecentlyViewed';
import OrderTracking from './components/OrderTracking';
import FAQ from './components/FAQ';
import Recipes from './components/Recipes';
import Login from './components/Login';
import Profile from './components/Profile';
import Subscriptions from './components/Subscriptions';
import NewSubscription from './components/NewSubscription';
import ReferralRewards from './components/ReferralRewards';
import GiftsHampers from './components/GiftsHampers';
import FarmStayBooking from './components/FarmStayBooking';
import ComparisonCalculator from './components/ComparisonCalculator';
import FarmCredits from './components/FarmCredits';
import NewsletterPopup from './components/NewsletterPopup';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { useState } from 'react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#F5EFE0]">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Routes>
        <Route path="/" element={<Hero setCurrentPage={setCurrentPage} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/farmstay" element={<FarmStay />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/recently-viewed" element={<RecentlyViewed />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/new-subscription" element={<NewSubscription />} />
        <Route path="/rewards" element={<ReferralRewards />} />
        <Route path="/gifts" element={<GiftsHampers />} />
        <Route path="/farmstay-booking" element={<FarmStayBooking />} />
        <Route path="/calculator" element={<ComparisonCalculator />} />
        <Route path="/credits" element={<FarmCredits />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NewsletterPopup />
      <WhatsAppButton />
      <BackToTop />
      {/* Mobile App Bar - visible only on mobile via CSS, aria-hidden on desktop */}
      <div
        className="mobile-app-bar"
        role="navigation"
        style={window.innerWidth > 768 ? { display: 'none' } : {}}
      >
        <div className="logo">
          <img src="/logo192.png" alt="Aadhya Farms" />
        </div>
        <div className="app-bar-actions">
          <button className="mobile-app-bar__search" aria-label="Search">
            <span role="img" aria-label="search">🔍</span>
          </button>
          <button className="mobile-app-bar__cart" aria-label="Cart">
            <span role="img" aria-label="cart">🛒</span>
          </button>
          <button className="mobile-app-bar__profile" aria-label="Profile">
            <span role="img" aria-label="profile">👤</span>
          </button>
        </div>
      </div>
      {/* Main content remains unchanged */}
      {/* Mobile Bottom Navigation - visible only on mobile via CSS, aria-hidden on desktop, placed above Footer */}
      <nav
        className="mobile-bottom-nav"
        role="navigation"
        style={window.innerWidth > 768 ? { display: 'none' } : {}}
      >
        <button className="nav-btn" aria-label="Home">
          <span role="img" aria-label="home">🏠</span>
          <span className="mobile-bottom-nav__label">Home</span>
        </button>
        <button className="nav-btn" aria-label="Shop">
          <span role="img" aria-label="shop">🛍️</span>
          <span className="mobile-bottom-nav__label">Shop</span>
        </button>
        <button className="nav-btn" aria-label="Gifts">
          <span role="img" aria-label="gift">🎁</span>
          <span className="mobile-bottom-nav__label">Gifts</span>
        </button>
        <button className="nav-btn" aria-label="Farm Stay">
          <span role="img" aria-label="farm">🏡</span>
          <span className="mobile-bottom-nav__label">Farm Stay</span>
        </button>
        <button className="nav-btn" aria-label="Profile">
          <span role="img" aria-label="profile">👤</span>
          <span className="mobile-bottom-nav__label">Profile</span>
        </button>
      </nav>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ProductProvider>
        <BlogProvider>
          <AuthProvider>
            <ReferralProvider>
              <GiftProvider>
                <FarmStayProvider>
                  <FarmCreditsProvider>
                    <SubscriptionProvider>
                    <RecentlyViewedProvider>
                  <WishlistProvider>
                    <CouponProvider>
                      <CartProvider>
                        <AppContent />
                      </CartProvider>
                    </CouponProvider>
                  </WishlistProvider>
                    </RecentlyViewedProvider>
                    </SubscriptionProvider>
                  </FarmCreditsProvider>
                </FarmStayProvider>
              </GiftProvider>
            </ReferralProvider>
          </AuthProvider>
        </BlogProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
