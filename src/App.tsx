import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import FarmStay from './components/FarmStay';
import About from './components/About';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import Cart from './components/Cart';
import Payment from './components/Payment';
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
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
