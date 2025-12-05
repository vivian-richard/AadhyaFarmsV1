import { Phone, Mail, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

import { useState } from 'react';

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'farmstay', label: 'Farm Stay' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-[#2D5016] text-[#F5EFE0] shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setCurrentPage('home')}
          >
            <img
              src="/logo-transparent.png"
              alt="Aadhya Farms"
              className="hidden md:block md:h-28 lg:h-32 w-auto transition-all"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-lg font-semibold transition-all duration-300 hover:text-[#D4AF37] ${
                  currentPage === item.id ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+918332090317" className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors">
              <Phone className="h-5 w-5" />
              <span>+91 8332090317</span>
            </a>
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
                    setCurrentPage(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-6 py-4 text-sm font-semibold transition-colors hover:bg-[#3D6020] ${
                    currentPage === item.id ? 'text-[#D4AF37]' : 'text-[#F5EFE0]'
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
