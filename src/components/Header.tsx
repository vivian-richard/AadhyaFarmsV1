import { Phone, Mail, Menu, X, ShoppingCart, User, LogIn, Award } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'subscriptions', label: 'Subscriptions', path: '/subscriptions' },
    { id: 'rewards', label: 'Rewards', path: '/rewards' },
    { id: 'farmstay', label: 'Farm Stay', path: '/farmstay' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
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
            {user ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
                title={`${user.name} - ${user.loyaltyPoints} points`}
              >
                <User className="h-6 w-6" />
                <div className="hidden lg:flex items-center space-x-2">
                  <span className="font-semibold">{user.name}</span>
                  <div className="flex items-center space-x-1 bg-[#D4AF37] text-[#2D5016] px-2 py-1 rounded-full text-xs">
                    <Award className="h-3 w-3" />
                    <span>{user.loyaltyPoints}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors"
              >
                <LogIn className="h-6 w-6" />
                <span className="hidden lg:inline font-semibold">Login</span>
              </Link>
            )}
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
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-[#D4AF37] text-[#2D5016] px-2 py-1 rounded-full text-xs">
                    <Award className="h-3 w-3" />
                    <span>{user.loyaltyPoints}</span>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-6 py-4 text-sm font-semibold text-[#F5EFE0] hover:bg-[#3D6020]"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login / Register</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
