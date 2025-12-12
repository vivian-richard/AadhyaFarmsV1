import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobilePayment = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [upiId, setUpiId] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Clear cart and redirect after success
      setTimeout(() => {
        clearCart();
        navigate('/orders');
      }, 2000);
    }, 1500);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
          No Items in Cart
        </h2>
        <p style={{ color: '#93959f', marginBottom: '24px' }}>
          Please add items to your cart before proceeding to payment
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            background: 'var(--farm-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        background: '#fff'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#E8F5E9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--farm-primary)" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Payment Successful!
        </h2>
        <p style={{ color: '#93959f', marginBottom: '16px', fontSize: '14px' }}>
          Thank you for your order
        </p>
        <div style={{
          background: '#E8F5E9',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          width: '100%',
          maxWidth: '300px'
        }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--farm-primary)' }}>
            ₹{totalPrice}
          </p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Confirmation sent to your email
          </p>
        </div>
        <p style={{ fontSize: '12px', color: '#93959f' }}>
          Redirecting to orders...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
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
          Payment
        </h1>
      </div>

      {/* Order Summary */}
      <div style={{ padding: '16px', borderBottom: '8px solid #f8f8f8' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
          Order Summary
        </h2>
        <div style={{ marginBottom: '12px' }}>
          {items.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#666' }}>
                {item.name} × {item.quantity}
              </span>
              <span style={{ fontWeight: '600' }}>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px dashed #e0e0e0',
          paddingTop: '12px',
          marginTop: '12px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#666' }}>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#666' }}>Delivery</span>
            <span style={{ color: 'var(--swiggy-green)', fontWeight: '600' }}>FREE</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            fontWeight: '700',
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <span>Total</span>
            <span style={{ color: 'var(--farm-primary)' }}>₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{ padding: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
          Payment Method
        </h2>

        {/* Payment Method Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setPaymentMethod('upi')}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: paymentMethod === 'upi' ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: paymentMethod === 'upi' ? '#E8F5E9' : '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            UPI
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: paymentMethod === 'card' ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: paymentMethod === 'card' ? '#E8F5E9' : '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Card
          </button>
          <button
            onClick={() => setPaymentMethod('cod')}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: paymentMethod === 'cod' ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: paymentMethod === 'cod' ? '#E8F5E9' : '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            COD
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment}>
          {paymentMethod === 'upi' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#3d4152'
              }}>
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{
                background: '#E3F2FD',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '12px',
                fontSize: '12px',
                color: '#1976D2'
              }}>
                You will be redirected to your UPI app to complete payment
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#3d4152'
                }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  required
                  maxLength={19}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#3d4152'
                }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.cardName}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#3d4152'
                  }}>
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    required
                    maxLength={5}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#3d4152'
                  }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                    maxLength={3}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div style={{
              background: '#FFF3E0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
                Cash on Delivery
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                Please keep exact change handy. You can pay our delivery executive when you receive your order.
              </p>
            </div>
          )}

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '16px',
              background: isProcessing ? '#ccc' : 'var(--swiggy-green)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? 'Processing...' : paymentMethod === 'cod' ? `Place Order - ₹${totalPrice}` : `Pay ₹${totalPrice}`}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '11px',
          color: '#999'
        }}>
          🔒 This is a demo payment. No actual transaction will be processed.
        </div>
      </div>
    </div>
  );
};

export default MobilePayment;
