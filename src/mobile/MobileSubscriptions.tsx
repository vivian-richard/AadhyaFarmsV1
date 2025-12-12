import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription, DeliverySchedule } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';

const MobileSubscriptions = () => {
  const navigate = useNavigate();
  const { availableProducts, addSubscription } = useSubscription();
  const { addresses } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliverySchedule, setDeliverySchedule] = useState<DeliverySchedule>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: false,
  });
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );

  const getDeliveryDaysCount = () => {
    return Object.values(deliverySchedule).filter(Boolean).length;
  };

  const toggleDay = (day: keyof DeliverySchedule) => {
    setDeliverySchedule({ ...deliverySchedule, [day]: !deliverySchedule[day] });
  };

  const calculateDailyTotal = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * quantity;
  };

  const calculateWeeklyCost = () => {
    return calculateDailyTotal() * getDeliveryDaysCount();
  };

  const handleSubscribeClick = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!selectedProduct) return;

    const hasAnyDay = Object.values(deliverySchedule).some(day => day);
    if (!hasAnyDay) {
      alert('Please select at least one delivery day');
      return;
    }

    if (!selectedAddressId && addresses.length > 0) {
      alert('Please select a delivery address');
      return;
    }

    addSubscription({
      items: [{
        product: selectedProduct,
        quantity: quantity
      }],
      deliverySchedule,
      startDate,
      status: 'active',
      totalAmount: calculateWeeklyCost(),
      addressId: selectedAddressId,
    });

    setShowModal(false);
    alert(`Successfully subscribed to ${selectedProduct.name}!`);
  };

  const days = [
    { key: 'monday' as keyof DeliverySchedule, label: 'M' },
    { key: 'tuesday' as keyof DeliverySchedule, label: 'T' },
    { key: 'wednesday' as keyof DeliverySchedule, label: 'W' },
    { key: 'thursday' as keyof DeliverySchedule, label: 'T' },
    { key: 'friday' as keyof DeliverySchedule, label: 'F' },
    { key: 'saturday' as keyof DeliverySchedule, label: 'S' },
    { key: 'sunday' as keyof DeliverySchedule, label: 'S' },
  ];

  return (
    <div className="mobile-subscriptions" style={{ paddingBottom: '80px' }}>
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
            Subscriptions
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
          Available Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          {availableProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: '#2D5016' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                  {product.unit}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#2D5016' }}>
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleSubscribeClick(product)}
                    style={{
                      background: 'linear-gradient(135deg, #2D5016 0%, #3D6020 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Modal */}
      {showModal && selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '24px'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#2D5016', margin: 0 }}>
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                Quantity per day
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: '20px', fontWeight: '700', minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Days */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                Select Delivery Days
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {days.map((day) => (
                  <button
                    key={day.key}
                    onClick={() => toggleDay(day.key)}
                    style={{
                      background: deliverySchedule[day.key] ? '#2D5016' : '#f0f0f0',
                      color: deliverySchedule[day.key] ? '#fff' : '#666',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 4px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                {getDeliveryDaysCount()} days selected
              </p>
            </div>

            {/* Start Date */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Delivery Address */}
            {addresses.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                  Delivery Address
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      style={{
                        padding: '12px',
                        border: selectedAddressId === address.id ? '2px solid #2D5016' : '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selectedAddressId === address.id ? '#f5f5f5' : '#fff'
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        style={{ marginRight: '8px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{address.name}</span>
                      {address.isDefault && (
                        <span style={{ fontSize: '11px', color: '#2D5016', marginLeft: '8px' }}>(Default)</span>
                      )}
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px', marginLeft: '24px' }}>
                        {address.addressLine1}, {address.city}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Daily Cost</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>₹{calculateDailyTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Delivery Days/Week</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{getDeliveryDaysCount()} days</span>
              </div>
              <div style={{ borderTop: '1px solid #ccc', paddingTop: '8px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#2D5016' }}>Weekly Cost</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#2D5016' }}>₹{calculateWeeklyCost()}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={getDeliveryDaysCount() === 0}
              style={{
                width: '100%',
                background: getDeliveryDaysCount() === 0 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #2D5016 0%, #3D6020 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: getDeliveryDaysCount() === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Start Subscription
            </button>

            <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '12px' }}>
              💡 Flexible: Pause anytime, skip dates, or set vacation mode
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSubscriptions;
