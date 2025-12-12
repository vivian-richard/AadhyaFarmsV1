import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoupon } from '../context/CouponContext';

const MobileCoupons = () => {
  const navigate = useNavigate();
  const { coupons, applyCoupon, removeCoupon, appliedCoupon } = useCoupon();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
    navigate('/cart');
  };

  const activeCoupons = (coupons || []).filter(c => c.isActive);
  const categorizedCoupons = {
    featured: activeCoupons.filter(c => c.minPurchase && c.minPurchase <= 500),
    bigSavings: activeCoupons.filter(c => c.discount >= 20),
    all: activeCoupons
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8', paddingBottom: '80px' }}>
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
            Coupons & Offers
          </h1>
        </div>
      </div>

      {/* Applied Coupon Banner */}
      {appliedCoupon && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '16px',
          margin: '12px 16px',
          borderRadius: '12px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>
              Applied Coupon
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '2px' }}>
              {appliedCoupon.code}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>
              You saved ₹{appliedCoupon.discount}!
            </div>
          </div>
          <button
            onClick={removeCoupon}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      )}

      <div style={{ padding: '16px' }}>
        {/* Featured Coupons */}
        {categorizedCoupons.featured.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              🔥 Featured Offers
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categorizedCoupons.featured.map((coupon) => (
                <div
                  key={coupon.code}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    border: appliedCoupon?.code === coupon.code ? '2px solid var(--farm-primary)' : '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
                    borderRadius: '0 12px 0 100%'
                  }} />

                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                          Save up to
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                          {coupon.discountType === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                        </div>
                      </div>
                      <div style={{
                        background: 'var(--farm-primary)',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        height: 'fit-content'
                      }}>
                        NEW
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', color: '#333', marginBottom: '12px', fontWeight: '500' }}>
                      {coupon.description}
                    </p>

                    {coupon.minPurchase && (
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                        Min. purchase: ₹{coupon.minPurchase}
                      </p>
                    )}

                    {/* Coupon Code */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      padding: '12px',
                      background: '#f8f8f8',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px dashed #e0e0e0'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
                          Coupon Code
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '1px' }}>
                          {coupon.code}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        style={{
                          background: copiedCode === coupon.code ? '#10b981' : '#fff',
                          color: copiedCode === coupon.code ? '#fff' : 'var(--farm-primary)',
                          border: copiedCode === coupon.code ? 'none' : '1px solid var(--farm-primary)',
                          borderRadius: '6px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {copiedCode === coupon.code ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>

                    <button
                      onClick={() => handleApplyCoupon(coupon.code)}
                      disabled={appliedCoupon?.code === coupon.code}
                      style={{
                        width: '100%',
                        background: appliedCoupon?.code === coupon.code ? '#e0e0e0' : 'var(--farm-primary)',
                        color: appliedCoupon?.code === coupon.code ? '#666' : '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: appliedCoupon?.code === coupon.code ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply Coupon'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Big Savings */}
        {categorizedCoupons.bigSavings.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              💰 Big Savings
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categorizedCoupons.bigSavings.map((coupon) => (
                <div
                  key={coupon.code}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    border: appliedCoupon?.code === coupon.code ? '2px solid var(--farm-primary)' : '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: '#fef3c7',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      🎁
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                        {coupon.discountType === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                      </div>
                      <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                        {coupon.description}
                      </p>
                    </div>
                  </div>

                  {coupon.minPurchase && (
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '12px',
                      padding: '8px',
                      background: '#f8f8f8',
                      borderRadius: '6px'
                    }}>
                      Min. purchase: ₹{coupon.minPurchase} • Code: <strong>{coupon.code}</strong>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleCopyCode(coupon.code)}
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
                      {copiedCode === coupon.code ? '✓ Copied' : 'Copy Code'}
                    </button>
                    <button
                      onClick={() => handleApplyCoupon(coupon.code)}
                      disabled={appliedCoupon?.code === coupon.code}
                      style={{
                        flex: 1,
                        background: appliedCoupon?.code === coupon.code ? '#e0e0e0' : 'var(--farm-primary)',
                        color: appliedCoupon?.code === coupon.code ? '#666' : '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: appliedCoupon?.code === coupon.code ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Coupons */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
            📋 All Coupons
          </h2>
          {categorizedCoupons.all.length === 0 ? (
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎫</div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                No coupons available
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Check back later for exciting offers!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categorizedCoupons.all.map((coupon) => (
                <div
                  key={coupon.code}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '14px',
                    border: appliedCoupon?.code === coupon.code ? '2px solid var(--farm-primary)' : '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#f0fdf4',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    🏷️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>
                      {coupon.code}
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {coupon.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(coupon.code)}
                    disabled={appliedCoupon?.code === coupon.code}
                    style={{
                      background: appliedCoupon?.code === coupon.code ? '#e0e0e0' : 'var(--farm-primary)',
                      color: appliedCoupon?.code === coupon.code ? '#666' : '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: appliedCoupon?.code === coupon.code ? 'not-allowed' : 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {appliedCoupon?.code === coupon.code ? '✓' : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCoupons;
