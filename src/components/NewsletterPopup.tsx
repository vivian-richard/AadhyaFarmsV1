import React, { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save email (in real app, send to backend)
    localStorage.setItem('newsletter-email', email);
    localStorage.setItem('newsletter-popup-seen', 'true');
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    localStorage.setItem('newsletter-popup-seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 pb-12">
              <Gift className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-center mb-2">
                Get 10% OFF
              </h2>
              <p className="text-center text-green-100">
                Your First Order!
              </p>
            </div>

            {/* Form */}
            <div className="p-8 -mt-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-600 text-center mb-6">
                  Subscribe to our newsletter and receive fresh updates, exclusive deals, and farm stories!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Get My Discount
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
              
              <button
                onClick={handleClose}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 py-2"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Check your email for your 10% discount code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
