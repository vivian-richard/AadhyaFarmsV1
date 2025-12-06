import { Phone, Mail, Menu, X, ShoppingCart, Heart, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'farmstay', label: 'Farm Stay', path: '/farmstay' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'faq', label: 'FAQ', path: '/faq' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNavigation = (path: string, id: string) => {
    navigate(path);
    setCurrentPage(id);
  };

  return (
    <header className="bg-[#2D5016] text-[#F5EFE0] shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setCurrentPage('home')}
          >
            <img
              src="/logo-transparent.png"
              alt="Aadhya Farms"
              className="hidden md:block md:h-28 lg:h-32 w-auto transition-all"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`text-lg font-semibold transition-all duration-300 hover:text-[#D4AF37] ${
                  location.pathname === item.path ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:+918332090317" className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors">
              <Phone className="h-5 w-5" />
              <span>+91 8332090317</span>
            </a>
            <Link 
              to="/wishlist" 
              className="relative flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
            >
              <Heart className="h-6 w-6" />
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link 
              to="/recently-viewed" 
              className="relative flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
              title="Recently Viewed"
            >
              <Clock className="h-6 w-6" />
              {recentlyViewed.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {recentlyViewed.length}
                </span>
              )}
            </Link>
            <Link 
              to="/cart" 
              className="relative flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile toggle button aligned left */}
        <div className="md:hidden mt-4 flex justify-start">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#2D5016] text-[#F5EFE0] border border-[#3D6020] shadow transition hover:bg-[#3D6020]"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="font-semibold text-sm">Menu</span>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 bg-[#2D5016] rounded-xl shadow-lg border border-[#3D6020] overflow-hidden animate-fade-in">
            <nav className="flex flex-col divide-y divide-[#3D6020]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.path, item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-6 py-4 text-sm font-semibold transition-colors hover:bg-[#3D6020] ${
                    location.pathname === item.path ? 'text-[#D4AF37]' : 'text-[#F5EFE0]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+918332090317"
                className="flex items-center space-x-2 px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>Call: +91 8332090317</span>
              </a>
              <Link
                to="/wishlist"
                className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </div>
                {wishlistItems > 0 && (
                  <span className="bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              <Link
                to="/recently-viewed"
                className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recently Viewed</span>
                </div>
                {recentlyViewed.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {recentlyViewed.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
