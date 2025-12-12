import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'delivered' | 'processing' | 'on-the-way' | 'cancelled';
  products: { name: string; quantity: number; price: number }[];
}

const MobileOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const orders: Order[] = [
    {
      id: 'ORD12345',
      date: '2024-01-20',
      items: 3,
      total: 450,
      status: 'on-the-way',
      products: [
        { name: 'A2 Cow Milk', quantity: 2, price: 140 },
        { name: 'Farm Fresh Eggs', quantity: 1, price: 90 },
        { name: 'Pure Desi Ghee', quantity: 1, price: 220 }
      ]
    },
    {
      id: 'ORD12344',
      date: '2024-01-18',
      items: 2,
      total: 180,
      status: 'delivered',
      products: [
        { name: 'Fresh Curd', quantity: 2, price: 100 },
        { name: 'Paneer', quantity: 1, price: 80 }
      ]
    },
    {
      id: 'ORD12343',
      date: '2024-01-15',
      items: 4,
      total: 620,
      status: 'delivered',
      products: [
        { name: 'Organic Chicken', quantity: 1, price: 280 },
        { name: 'A2 Cow Milk', quantity: 3, price: 210 },
        { name: 'Farm Fresh Eggs', quantity: 1, price: 90 },
        { name: 'Fresh Curd', quantity: 1, price: 40 }
      ]
    }
  ];

  const activeOrders = orders.filter(o => o.status === 'processing' || o.status === 'on-the-way');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'var(--swiggy-green)';
      case 'on-the-way':
        return 'var(--swiggy-orange)';
      case 'processing':
        return '#fbbf24';
      case 'cancelled':
        return '#dc2626';
      default:
        return '#93959f';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'on-the-way':
        return 'On the way';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="mobile-orders">
      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
          My Orders
        </h1>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          background: '#f8f8f8',
          padding: '4px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'active' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: activeTab === 'active' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'past' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: activeTab === 'past' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Past ({pastOrders.length})
          </button>
        </div>

        {/* Orders List */}
        {displayOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {displayOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                {/* Order Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: '700' }}>
                      {order.id}
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      background: `${getStatusColor(order.status)}15`,
                      color: getStatusColor(order.status),
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {getStatusText(order.status)}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#93959f' }}>
                    {new Date(order.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '16px' }}>
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        marginBottom: '8px'
                      }}
                    >
                      <span style={{ color: '#3d4152' }}>
                        {product.name} × {product.quantity}
                      </span>
                      <span style={{ fontWeight: '600' }}>₹{product.price}</span>
                    </div>
                  ))}
                  <div style={{
                    borderTop: '1px dashed #d0d0d0',
                    marginTop: '12px',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>

                {/* Order Actions */}
                <div style={{
                  background: '#f8f8f8',
                  padding: '12px 16px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  {order.status === 'on-the-way' && (
                    <button
                      style={{
                        flex: 1,
                        background: 'var(--farm-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Track Order
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <>
                      <button
                        onClick={() => navigate('/products')}
                        style={{
                          flex: 1,
                          background: 'var(--farm-primary)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Reorder
                      </button>
                      <button
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
                        Rate Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f8f8f8',
            borderRadius: '12px',
            padding: '48px 16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              No {activeTab} orders
            </div>
            <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '20px' }}>
              {activeTab === 'active'
                ? 'Place an order to get started'
                : 'Your past orders will appear here'}
            </div>
            {activeTab === 'active' && (
              <button
                onClick={() => navigate('/products')}
                style={{
                  background: 'var(--farm-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Browse Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOrders;
