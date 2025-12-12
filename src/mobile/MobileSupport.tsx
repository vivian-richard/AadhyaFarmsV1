import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileSupport = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      category: 'Orders & Delivery',
      questions: [
        {
          q: 'How do I track my order?',
          a: 'Go to Profile > My Orders and tap on any order to see real-time tracking with delivery status updates.'
        },
        {
          q: 'What are the delivery charges?',
          a: 'Free delivery on orders above ₹500. Below ₹500, delivery charges of ₹40 apply.'
        },
        {
          q: 'Can I change my delivery address?',
          a: 'Yes, you can change the delivery address before the order is dispatched. Contact support immediately.'
        }
      ]
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).'
        },
        {
          q: 'How do I get a refund?',
          a: 'Refunds are processed within 5-7 business days to the original payment method after we receive the returned item.'
        },
        {
          q: 'Is Cash on Delivery available?',
          a: 'Yes, COD is available on all orders. However, online payment gets you extra farm credits!'
        }
      ]
    },
    {
      category: 'Products & Quality',
      questions: [
        {
          q: 'Are your products organic?',
          a: 'Yes, all our products are 100% organic, farm-fresh, and grown without harmful pesticides or chemicals.'
        },
        {
          q: 'How fresh are the products?',
          a: 'Products are harvested within 24 hours of delivery to ensure maximum freshness and nutritional value.'
        },
        {
          q: 'Can I return products?',
          a: 'We offer easy returns within 48 hours if you\'re not satisfied with the quality. Check our return policy for details.'
        }
      ]
    },
    {
      category: 'Subscriptions',
      questions: [
        {
          q: 'How do subscriptions work?',
          a: 'Choose your products and delivery frequency (daily, weekly, monthly). Products are automatically delivered on schedule.'
        },
        {
          q: 'Can I pause my subscription?',
          a: 'Yes, you can pause or cancel subscriptions anytime from Profile > Subscriptions.'
        },
        {
          q: 'Do I get discounts on subscriptions?',
          a: 'Yes! Subscriptions come with 10-15% discount and earn you double farm credits on every delivery.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 98765 43210',
      subtitle: 'Mon-Sat, 9 AM - 6 PM',
      action: 'tel:+919876543210'
    },
    {
      icon: '📧',
      title: 'Email',
      value: 'support@aadhyafarms.com',
      subtitle: 'We reply within 24 hours',
      action: 'mailto:support@aadhyafarms.com'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+91 98765 43210',
      subtitle: 'Quick responses',
      action: 'https://wa.me/919876543210'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', paddingBottom: '20px' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ←
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
            Help & Support
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: '#fff',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#f8f8f8',
          padding: '4px',
          borderRadius: '8px'
        }}>
          <button
            onClick={() => setActiveTab('faq')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'faq' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'contact' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {activeTab === 'faq' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((category, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '12px', padding: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
                  {category.category}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {category.questions.map((item, qIdx) => (
                    <div key={qIdx}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: '#333' }}>
                        {item.q}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Contact Methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.action}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#f0fdf4',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {method.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                      {method.title}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                      {method.value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {method.subtitle}
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', color: '#666' }}>›</div>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
                Send us a message
              </h2>
              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    We'll get back to you within 24 hours
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'var(--farm-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSupport;
