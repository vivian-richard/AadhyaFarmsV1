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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NewsletterPopup />
      <WhatsAppButton />
      <BackToTop />
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
