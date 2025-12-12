import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  name: string;
  details: string;
  isDefault: boolean;
}

const MobilePaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'upi',
      name: 'Google Pay',
      details: 'user@oksbi',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'HDFC Debit Card',
      details: '**** **** **** 4532',
      isDefault: false
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'card' | 'upi'>('upi');
  const [formData, setFormData] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formType,
      name: formType === 'upi' ? 'UPI' : formData.cardName,
      details: formType === 'upi' ? formData.upiId : `**** **** **** ${formData.cardNumber.slice(-4)}`,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setFormData({
      upiId: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(m => ({
      ...m,
      isDefault: m.id === id
    })));
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
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
            Payment Methods
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: 'var(--farm-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Add Payment Form */}
        {showAddForm && (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
              Add Payment Method
            </h2>

            {/* Payment Type Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              background: '#f8f8f8',
              padding: '4px',
              borderRadius: '8px'
            }}>
              <button
                onClick={() => setFormType('upi')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: formType === 'upi' ? '#fff' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                UPI
              </button>
              <button
                onClick={() => setFormType('card')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: formType === 'card' ? '#fff' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Card
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {formType === 'upi' ? (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="yourname@upi"
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
              ) : (
                <>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={16}
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
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      placeholder="John Doe"
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        placeholder="12/25"
                        required
                        maxLength={5}
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
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        placeholder="123"
                        required
                        maxLength={3}
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
                  </div>
                </>
              )}

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
                Save Payment Method
              </button>
            </form>
          </div>
        )}

        {/* Payment Methods List */}
        {paymentMethods.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>💳</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
              No payment methods saved
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Add a payment method for faster checkout
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  border: method.isDefault ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: method.type === 'upi' ? '#E8F5E9' : '#E3F2FD',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {method.type === 'upi' ? '💸' : '💳'}
                  </div>
                  <div style={{ flex: 1 }}>
                    {method.isDefault && (
                      <div style={{
                        display: 'inline-block',
                        background: 'var(--farm-primary)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginBottom: '6px'
                      }}>
                        DEFAULT
                      </div>
                    )}
                    <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                      {method.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      {method.details}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      style={{
                        flex: 1,
                        background: '#fff',
                        color: 'var(--farm-primary)',
                        border: '1px solid var(--farm-primary)',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(method.id)}
                    style={{
                      flex: 1,
                      background: '#fff',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePaymentMethods;
