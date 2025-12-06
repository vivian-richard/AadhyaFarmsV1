import { Menu, X, ShoppingCart, User, LogIn, Award, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ setCurrentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuStructure = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    {
      id: 'services',
      label: 'Services',
      items: [
        { id: 'subscriptions', label: 'Subscriptions', path: '/subscriptions' },
        { id: 'farmstay', label: 'Farm Stay', path: '/farmstay' },
      ],
    },
    {
      id: 'rewards',
      label: 'Rewards & Benefits',
      items: [
        { id: 'rewards', label: 'Referral Rewards', path: '/rewards' },
        { id: 'credits', label: 'Farm Credits', path: '/credits' },
        { id: 'gifts', label: 'Gift Cards', path: '/gifts' },
      ],
    },
    {
      id: 'more',
      label: 'More',
      items: [
        { id: 'calculator', label: 'Calculator', path: '/calculator' },
        { id: 'blogs', label: 'Blogs', path: '/blogs' },
        { id: 'contact', label: 'Contact', path: '/contact' },
      ],
    },
  ];

  const handleNavigation = (path: string, id: string) => {
    navigate(path);
    setCurrentPage(id);
    setOpenDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
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

          <nav className="hidden md:flex items-center space-x-6">
            {menuStructure.map((item) => {
              if ('items' in item && item.items) {
                // Dropdown menu
                const isActive = item.items.some(subItem => location.pathname === subItem.path);
                return (
                  <div 
                    key={item.id} 
                    className="relative group"
                  >
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      className={`flex items-center gap-1 text-lg font-semibold transition-all duration-300 hover:text-[#D4AF37] ${
                        isActive ? 'text-[#D4AF37]' : ''
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.id && (
                      <div
                        className="absolute top-full left-0 mt-2 bg-white text-[#2D5016] rounded-lg shadow-xl py-2 min-w-[200px] z-50"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.items.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigation(subItem.path, subItem.id);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-[#F5EFE0] transition-colors ${
                              location.pathname === subItem.path ? 'bg-[#F5EFE0] text-[#D4AF37] font-bold' : ''
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                // Regular menu item
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`text-lg font-semibold transition-all duration-300 hover:text-[#D4AF37] ${
                      location.pathname === item.path ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
            })}
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
              {menuStructure.map((item) => {
                if ('items' in item && item.items) {
                  // Dropdown section in mobile
                  return (
                    <div key={item.id} className="bg-[#3D6020] bg-opacity-30">
                      <div className="px-6 py-3 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                        {item.label}
                      </div>
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            handleNavigation(subItem.path, subItem.id);
                            setMobileOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 pl-10 text-sm font-semibold transition-colors hover:bg-[#3D6020] ${
                            location.pathname === subItem.path ? 'text-[#D4AF37]' : 'text-[#F5EFE0]'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  );
                } else {
                  // Regular item in mobile
                  return (
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
                  );
                }
              })}
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
