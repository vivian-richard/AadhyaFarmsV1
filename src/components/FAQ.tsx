import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqs: FAQItem[] = [
    {
      category: 'Orders & Delivery',
      question: 'What are your delivery areas?',
      answer: 'We currently deliver across Hyderabad and surrounding areas within a 50km radius. For specific locations, please contact us at +91 8332090317.',
    },
    {
      category: 'Orders & Delivery',
      question: 'What is the minimum order value for free delivery?',
      answer: 'We offer FREE delivery on all orders! No minimum order value required.',
    },
    {
      category: 'Orders & Delivery',
      question: 'What are your delivery timings?',
      answer: 'We deliver fresh products daily between 6 AM to 12 PM. You can choose your preferred time slot during checkout.',
    },
    {
      category: 'Products',
      question: 'Are your products 100% organic?',
      answer: 'Yes! All our products are 100% organic. We follow natural farming methods without any chemicals, pesticides, or synthetic fertilizers.',
    },
    {
      category: 'Products',
      question: 'How fresh is the milk?',
      answer: 'Our milk is delivered within 2-3 hours of milking. We milk our cows twice daily - early morning and evening - ensuring you get the freshest milk possible.',
    },
    {
      category: 'Products',
      question: 'What is A2 milk?',
      answer: 'A2 milk comes from cows that produce only A2 beta-casein protein. It\'s easier to digest and closer to the milk our ancestors consumed. Our indigenous cow breeds naturally produce A2 milk.',
    },
    {
      category: 'Products',
      question: 'Do you sell in bulk quantities?',
      answer: 'Yes! We offer bulk pricing for regular customers and businesses. Contact us at contactus@aadhyafarms.in for bulk orders.',
    },
    {
      category: 'Payment & Refunds',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.',
    },
    {
      category: 'Payment & Refunds',
      question: 'What is your refund policy?',
      answer: 'If you\'re not satisfied with any product, contact us within 24 hours of delivery. We\'ll replace it or provide a full refund, no questions asked.',
    },
    {
      category: 'Payment & Refunds',
      question: 'Do you offer subscriptions?',
      answer: 'Yes! Subscribe to daily or weekly deliveries and save up to 15%. You can pause, modify, or cancel anytime.',
    },
    {
      category: 'Farm Stay',
      question: 'Can I visit your farm?',
      answer: 'Absolutely! We welcome visitors. Book a farm stay to experience rural life, interact with animals, and learn about organic farming. Check our Farm Stay section for booking.',
    },
    {
      category: 'Farm Stay',
      question: 'What activities are included in the farm stay?',
      answer: 'Farm stay includes: guided farm tour, cow feeding & milking experience, organic farming workshop, fresh farm meals, nature walks, and stargazing. Perfect for families and kids!',
    },
    {
      category: 'Packaging',
      question: 'Is your packaging eco-friendly?',
      answer: 'Yes! We use reusable glass bottles for milk and minimal plastic packaging. Return empty bottles for a refund or exchange.',
    },
    {
      category: 'Packaging',
      question: 'Can I return the bottles?',
      answer: 'Yes! Return clean glass bottles on your next delivery for ₹10 credit per bottle. Help us reduce waste!',
    },
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="mb-6 text-green-100">
            We're here to help! Contact our friendly support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918332090317"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Call: +91 8332090317
            </a>
            <a
              href="mailto:contactus@aadhyafarms.in"
              className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
