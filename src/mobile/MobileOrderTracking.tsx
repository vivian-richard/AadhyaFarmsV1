import { useNavigate, useLocation } from 'react-router-dom';

const MobileOrderTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order from state or use mock data
  const order = location.state?.order || {
    id: 'ORD-2024-001',
    date: '2024-12-05',
    total: 850,
    status: 'out-for-delivery',
    estimatedDelivery: 'Today by 12:00 PM',
    products: [
      { name: 'Fresh Milk', quantity: 2, price: 70 },
      { name: 'Ghee', quantity: 1, price: 350 },
      { name: 'Free Range Eggs', quantity: 1, price: 360 },
    ],
  };

  // Ensure products is an array
  const orderProducts = order.products || [];

  const trackingSteps = [
    { 
      id: 1, 
      label: 'Order Confirmed', 
      status: 'completed', 
      time: 'Dec 5, 10:30 AM',
      description: 'We have received your order'
    },
    { 
      id: 2, 
      label: 'Preparing Order', 
      status: 'completed', 
      time: 'Dec 5, 11:00 AM',
      description: 'Your fresh products are being prepared'
    },
    { 
      id: 3, 
      label: 'Out for Delivery', 
      status: 'current', 
      time: 'Dec 6, 8:00 AM',
      description: 'Your order is on the way'
    },
    { 
      id: 4, 
      label: 'Delivered', 
      status: 'pending', 
      time: 'Estimated by 12:00 PM',
      description: 'Your order will be delivered soon'
    },
  ];

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
          Track Order
        </h1>
      </div>

      {/* Order Info Card */}
      <div style={{
        background: '#fff',
        padding: '16px',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Order ID</p>
            <p style={{ fontSize: '16px', fontWeight: '700' }}>#{order.id}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Amount</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--farm-primary)' }}>
              ₹{order.total}
            </p>
          </div>
        </div>

        <div style={{
          background: '#E8F5E9',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--farm-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>
              Estimated Delivery
            </p>
            <p style={{ fontSize: '13px', color: '#666' }}>
              {order.estimatedDelivery}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div style={{
        background: '#fff',
        padding: '16px',
        marginBottom: '12px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
          Order Items ({orderProducts.length})
        </h2>
        {orderProducts.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            marginBottom: '12px',
            borderBottom: index < orderProducts.length - 1 ? '1px dashed #e0e0e0' : 'none'
          }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                {item.name}
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Qty: {item.quantity}
              </p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: '700' }}>
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Tracking Timeline */}
      <div style={{
        background: '#fff',
        padding: '16px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
          Delivery Status
        </h2>

        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '15px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: '#e0e0e0'
          }} />

          {trackingSteps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPending = step.status === 'pending';

            return (
              <div key={step.id} style={{
                position: 'relative',
                marginBottom: index < trackingSteps.length - 1 ? '32px' : '0'
              }}>
                {/* Icon */}
                <div style={{
                  position: 'absolute',
                  left: '-40px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isCompleted ? 'var(--farm-primary)' : 
                             isCurrent ? 'var(--swiggy-orange)' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(251, 140, 0, 0.2)' : 'none',
                  animation: isCurrent ? 'pulse 2s infinite' : 'none'
                }}>
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : isCurrent ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  ) : (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#fff'
                    }} />
                  )}
                </div>

                {/* Content */}
                <div>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    marginBottom: '4px',
                    color: isCompleted || isCurrent ? '#000' : '#999'
                  }}>
                    {step.label}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '6px'
                  }}>
                    {step.time}
                  </p>
                  {isCurrent && (
                    <div style={{
                      background: '#FFF3E0',
                      borderRadius: '8px',
                      padding: '10px',
                      marginTop: '8px',
                      fontSize: '13px',
                      color: '#E65100'
                    }}>
                      🚚 {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <div style={{
        background: '#fff',
        padding: '16px',
        marginTop: '12px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          Need help with your order?
        </p>
        <a
          href="tel:+918332090317"
          style={{
            display: 'inline-block',
            background: 'var(--farm-primary)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            textDecoration: 'none'
          }}
        >
          📞 Contact Support
        </a>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MobileOrderTracking;
