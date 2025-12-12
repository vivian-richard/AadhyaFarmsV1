import { useNavigate } from 'react-router-dom';
import { useReferral } from '../context/ReferralContext';
import { useFarmCredits } from '../context/FarmCreditsContext';

const MobileRewards = () => {
  const navigate = useNavigate();
  const { referralCode, referrals, generateCode } = useReferral();
  const { credits, addCredits } = useFarmCredits();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Aadhya Farms',
        text: `Use my referral code ${referralCode} and get ₹100 off on your first order!`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(referralCode);
      alert('Referral code copied!');
    }
  };

  const rewardHistory = [
    { date: '2024-01-15', type: 'Referral Bonus', credits: 100 },
    { date: '2024-01-10', type: 'First Order', credits: 50 },
    { date: '2024-01-05', type: 'Sign Up Bonus', credits: 100 }
  ];

  return (
    <div className="mobile-rewards">
      <div style={{ padding: '16px' }}>
        {/* Credits Summary */}
        <div style={{
          background: 'linear-gradient(135deg, var(--farm-primary) 0%, #1a3a0f 100%)',
          color: '#fff',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
            Available Credits
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}>
            ₹{credits}
          </div>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: '#fff',
              color: 'var(--farm-primary)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Redeem Credits
          </button>
        </div>

        {/* Referral Section */}
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
            Refer & Earn
          </h3>
          <p style={{ fontSize: '14px', color: '#93959f', marginBottom: '16px' }}>
            Invite friends and earn ₹100 for each successful referral
          </p>

          {/* Referral Code */}
          <div style={{
            background: '#f8f8f8',
            border: '2px dashed var(--farm-primary)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#93959f', marginBottom: '8px' }}>
              Your Referral Code
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--farm-primary)',
              letterSpacing: '2px',
              marginBottom: '12px'
            }}>
              {referralCode || 'AADHYA100'}
            </div>
            <button
              onClick={handleShare}
              style={{
                background: 'var(--farm-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Share Code
            </button>
          </div>

          {/* Referral Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <div style={{
              background: '#f0f7ed',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                {referrals?.length || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#93959f' }}>
                Successful Referrals
              </div>
            </div>
            <div style={{
              background: '#fff7ed',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--swiggy-orange)' }}>
                ₹{(referrals?.length || 0) * 100}
              </div>
              <div style={{ fontSize: '12px', color: '#93959f' }}>
                Total Earned
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
            How It Works
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--farm-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  Share your code
                </div>
                <div style={{ fontSize: '13px', color: '#93959f' }}>
                  Send your referral code to friends
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--farm-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  They sign up
                </div>
                <div style={{ fontSize: '13px', color: '#93959f' }}>
                  Your friend gets ₹100 off on first order
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--farm-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  You earn rewards
                </div>
                <div style={{ fontSize: '13px', color: '#93959f' }}>
                  Get ₹100 credits when they order
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reward History */}
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
          Reward History
        </h3>
        {rewardHistory.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {rewardHistory.map((reward, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                    {reward.type}
                  </div>
                  <div style={{ fontSize: '12px', color: '#93959f' }}>
                    {new Date(reward.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--swiggy-green)'
                }}>
                  +₹{reward.credits}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f8f8f8',
            borderRadius: '8px',
            padding: '32px 16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎁</div>
            <div style={{ fontSize: '14px', color: '#93959f' }}>
              No rewards yet. Start referring friends!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileRewards;
