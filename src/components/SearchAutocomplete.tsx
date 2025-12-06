import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
}

interface SearchAutocompleteProps {
  products: Product[];
  onSelect?: (product: Product) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ products, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setIsOpen(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, products]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (product: Product) => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSelect) {
      onSelect(product);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={i} className="text-[#2D5016] font-bold">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length > 0 && suggestions.length > 0 && setIsOpen(true)}
          placeholder="Search for products..."
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
          {suggestions.map((product, index) => (
            <Link
              key={index}
              to="/products"
              onClick={() => handleSelect(product)}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                index === selectedIndex ? 'bg-gray-100' : ''
              } ${index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  {highlightMatch(product.name, query)}
                </div>
                <div className="text-sm text-gray-500">{product.category}</div>
              </div>
              <div className="text-[#D4AF37] font-bold">₹{product.price}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
