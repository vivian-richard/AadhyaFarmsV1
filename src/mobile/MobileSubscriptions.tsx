import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../context/SubscriptionContext';

const MobileSubscriptions = () => {
  const navigate = useNavigate();
  const { subscriptions, addSubscription } = useSubscription();
  const [selectedFrequency, setSelectedFrequency] = useState<'daily' | 'weekly'>('daily');

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Daily Milk',
      image: '/products/Milk.png',
      price: 70,
      unit: '500ml',
      frequency: 'daily',
      description: 'Fresh A2 milk delivered every morning',
      benefits: ['Farm fresh', 'No preservatives', 'Morning delivery', 'Pause anytime']
    },
    {
      id: 2,
      name: 'Farm Fresh Eggs',
      image: '/products/Eggs.png',
      price: 90,
      unit: '6 eggs',
      frequency: 'weekly',
      description: 'Organic eggs from free-range chickens',
      benefits: ['Free range', 'No antibiotics', 'High protein', 'Weekly delivery']
    },
    {
      id: 3,
      name: 'Pure Desi Ghee',
      image: '/products/Ghee.png',
      price: 550,
      unit: '500ml',
      frequency: 'weekly',
      description: 'Handmade A2 cow ghee',
      benefits: ['100% pure', 'Traditional method', 'Rich aroma', 'Monthly delivery']
    },
    {
      id: 4,
      name: 'Fresh Curd',
      image: '/products/Curd.png',
      price: 50,
      unit: '500ml',
      frequency: 'daily',
      description: 'Homemade style curd',
      benefits: ['Probiotic rich', 'No additives', 'Fresh daily', 'Healthy gut']
    }
  ];

  const filteredPlans = subscriptionPlans.filter(
    (plan) => plan.frequency === selectedFrequency
  );

  const handleSubscribe = (plan: any) => {
    addSubscription({
      productId: plan.id,
      productName: plan.name,
      frequency: selectedFrequency,
      quantity: 1,
      price: plan.price
    });
    navigate('/profile');
  };

  return (
    <div className="mobile-subscriptions">
      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Subscriptions
        </h1>
        <p style={{ fontSize: '14px', color: '#93959f', marginBottom: '20px' }}>
          Subscribe and save on daily essentials
        </p>

        {/* Active Subscriptions */}
        {subscriptions.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              Active Subscriptions ({subscriptions.length})
            </h3>
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600' }}>
                    {sub.productName}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: '#e7f5e7',
                    color: 'var(--swiggy-green)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {sub.status}
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '4px' }}>
                  Frequency: {sub.frequency}
                </div>
                <div style={{ fontSize: '13px', color: '#93959f' }}>
                  Quantity: {sub.quantity} | ₹{sub.price}/{sub.frequency === 'daily' ? 'day' : 'week'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Frequency Toggle */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          background: '#f8f8f8',
          padding: '4px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => setSelectedFrequency('daily')}
            style={{
              flex: 1,
              padding: '10px',
              background: selectedFrequency === 'daily' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: selectedFrequency === 'daily' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedFrequency('weekly')}
            style={{
              flex: 1,
              padding: '10px',
              background: selectedFrequency === 'weekly' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: selectedFrequency === 'weekly' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Weekly
          </button>
        </div>

        {/* Subscription Plans */}
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
          Available Plans
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', padding: '16px' }}>
                <img
                  src={plan.image}
                  alt={plan.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '8px' }}>
                    {plan.unit} • {plan.frequency}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                    ₹{plan.price}
                    <span style={{ fontSize: '13px', fontWeight: '400', color: '#93959f' }}>
                      /{plan.frequency === 'daily' ? 'day' : 'week'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{
                background: '#f8f8f8',
                padding: '12px 16px',
                borderTop: '1px solid #e0e0e0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} style={{ fontSize: '12px', color: '#3d4152' }}>
                      ✓ {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <div style={{ padding: '16px' }}>
                <button
                  onClick={() => handleSubscribe(plan)}
                  style={{
                    width: '100%',
                    background: 'var(--farm-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSubscriptions;
