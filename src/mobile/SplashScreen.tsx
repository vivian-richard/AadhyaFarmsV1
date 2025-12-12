import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 500); // Wait for fade out animation
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, var(--farm-primary) 0%, #3D6020 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: '120px',
          height: '120px',
          background: '#fff',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          animation: 'scaleIn 0.6s ease-out'
        }}
      >
        <img
          src="/logo-transparent.png"
          alt="Aadhya Farms"
          style={{
            width: '90px',
            height: '90px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Brand Name */}
      <h1
        style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: '800',
          marginBottom: '8px',
          animation: 'fadeInUp 0.8s ease-out 0.2s both'
        }}
      >
        Aadhya Farms
      </h1>

      {/* Tagline */}
      <p
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '14px',
          fontWeight: '500',
          animation: 'fadeInUp 0.8s ease-out 0.4s both'
        }}
      >
        Fresh from Farm to Your Table
      </p>

      {/* Loading Animation */}
      <div
        style={{
          marginTop: '32px',
          animation: 'fadeIn 0.8s ease-out 0.6s both'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      </div>

      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0.5);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
