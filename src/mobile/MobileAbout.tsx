import { useNavigate } from 'react-router-dom';

const MobileAbout = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: '🌱', value: '50+', label: 'Organic Products' },
    { icon: '👨‍🌾', value: '200+', label: 'Partner Farmers' },
    { icon: '😊', value: '10,000+', label: 'Happy Customers' },
    { icon: '🏆', value: '5 Years', label: 'Of Excellence' }
  ];

  const values = [
    {
      icon: '🌿',
      title: '100% Organic',
      description: 'All our products are certified organic, grown without harmful chemicals or pesticides.'
    },
    {
      icon: '🚜',
      title: 'Farm to Table',
      description: 'Direct sourcing from farmers ensures freshness and fair prices for both farmers and customers.'
    },
    {
      icon: '♻️',
      title: 'Sustainable',
      description: 'We follow eco-friendly practices in farming, packaging, and delivery to protect our planet.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'Supporting local farmers and building a community focused on health and sustainability.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: '👨‍💼',
      description: 'Passionate about organic farming and sustainable agriculture'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: '👩‍💼',
      description: 'Ensuring quality and timely delivery of farm-fresh products'
    },
    {
      name: 'Amit Patel',
      role: 'Farmer Relations',
      image: '👨‍🌾',
      description: 'Building strong partnerships with organic farmers across India'
    }
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
            About Us
          </h1>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, var(--farm-primary) 0%, #059669 100%)',
          borderRadius: '16px',
          padding: '32px 24px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/products/logo final 5.png" 
              alt="Aadhya Farms" 
              style={{ 
                height: '80px',
                width: 'auto'
              }} 
            />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            Aadhya Farms
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
            Bringing fresh, organic produce directly from farms to your doorstep since 2020
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
            Our Story
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '12px' }}>
            Aadhya Farms was born from a simple yet powerful vision: to make organic, farm-fresh produce accessible to everyone while supporting local farmers and promoting sustainable agriculture.
          </p>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '12px' }}>
            What started as a small initiative with 10 farmers has now grown into a thriving community of over 200 partner farmers, serving thousands of health-conscious families across the region.
          </p>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>
            Every product you receive is harvested within 24 hours of delivery, ensuring you get the freshest, most nutritious produce possible. We're not just delivering vegetables and fruits; we're delivering health, sustainability, and a promise of quality.
          </p>
        </div>

        {/* Our Values */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
            Our Values
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {values.map((value, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {value.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
            Meet Our Team
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {team.map((member, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                background: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  {member.image}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--farm-primary)', marginBottom: '6px', fontWeight: '600' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
            Certifications & Awards
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>🏅</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>FSSAI Certified</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Food Safety Standards Authority of India</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>✅</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Organic India Certified</div>
                <div style={{ fontSize: '12px', color: '#666' }}>100% Organic Produce Certification</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>🌟</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Best Organic Vendor 2024</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Recognized by Indian Organic Association</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{
          background: 'var(--farm-primary)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Have Questions?
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>
            We'd love to hear from you!
          </p>
          <button
            onClick={() => navigate('/support')}
            style={{
              background: '#fff',
              color: 'var(--farm-primary)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAbout;
