import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileLogin = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Login
        await login(formData.email, formData.password);
      } else {
        // Signup
        await register(formData.name, formData.email, formData.phone, formData.password);
      }
      
      navigate('/profile');
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      position: 'relative'
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
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '24px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <img src="/logo-transparent.png" alt="Aadhya Farms" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            Welcome to Aadhya Farms
          </h2>
          <p style={{ fontSize: '14px', color: '#93959f' }}>
            Fresh, organic products delivered to your door
          </p>
        </div>

        {/* Toggle Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          background: '#f8f8f8',
          padding: '4px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '12px',
              background: isLogin ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: isLogin ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '12px',
              background: !isLogin ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: !isLogin ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#3d4152'
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Enter your name"
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
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#3d4152'
            }}>
              Email or Phone
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email or phone number"
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#3d4152'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
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

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'var(--farm-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>

          {isLogin && (
            <div style={{ textAlign: 'center' }}>
              <a
                href="#"
                style={{
                  fontSize: '14px',
                  color: 'var(--farm-primary)',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Forgot Password?
              </a>
            </div>
          )}
        </form>

        {/* Or Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
          <span style={{ fontSize: '13px', color: '#93959f' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
        </div>

        {/* Social Login */}
        <button
          onClick={() => {
            login({
              id: '1',
              name: 'Demo User',
              email: 'demo@aadhyafarms.com',
              phone: '9876543210'
            });
            navigate('/profile');
          }}
          style={{
            width: '100%',
            background: '#fff',
            color: '#3d4152',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '20px' }}>📱</span>
          Continue with Phone (OTP)
        </button>
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#93959f',
        borderTop: '1px solid #f0f0f0'
      }}>
        By continuing, you agree to our{' '}
        <a href="#" style={{ color: 'var(--farm-primary)' }}>Terms of Service</a>
        {' '}and{' '}
        <a href="#" style={{ color: 'var(--farm-primary)' }}>Privacy Policy</a>
      </div>
    </div>
  );
};

export default MobileLogin;
