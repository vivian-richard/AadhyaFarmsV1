import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarmStay } from '../context/FarmStayContext';

const MobileFarmStay = () => {
  const navigate = useNavigate();
  const { bookings, addBooking } = useFarmStay();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    {
      id: 'deluxe',
      name: 'Deluxe Farm Cottage',
      image: '/farmstay/deluxe.jpg',
      price: 3500,
      capacity: '2-4 guests',
      amenities: ['King bed', 'AC', 'Farm view', 'Breakfast']
    },
    {
      id: 'family',
      name: 'Family Suite',
      image: '/farmstay/family.jpg',
      price: 5000,
      capacity: '4-6 guests',
      amenities: ['2 Bedrooms', 'AC', 'Kitchen', 'Breakfast']
    },
    {
      id: 'premium',
      name: 'Premium Villa',
      image: '/farmstay/villa.jpg',
      price: 8000,
      capacity: '6-8 guests',
      amenities: ['3 Bedrooms', 'Pool', 'Butler', 'All meals']
    }
  ];

  const activities = [
    { icon: '🚜', name: 'Farm Tour', description: 'Guided tour of organic farm' },
    { icon: '🐄', name: 'Cow Feeding', description: 'Feed and interact with cows' },
    { icon: '🥛', name: 'Milking Demo', description: 'Learn traditional milking' },
    { icon: '🌾', name: 'Crop Picking', description: 'Harvest seasonal vegetables' },
    { icon: '🍳', name: 'Cooking Class', description: 'Learn farm-to-table recipes' },
    { icon: '🔥', name: 'Bonfire Night', description: 'Evening bonfire with music' }
  ];

  const handleBook = (room: any) => {
    addBooking({
      roomType: room.name,
      checkIn: new Date().toISOString(),
      checkOut: new Date(Date.now() + 86400000).toISOString(),
      guests: 2,
      price: room.price
    });
    setSelectedRoom(null);
    navigate('/profile');
  };

  return (
    <div className="mobile-farmstay">
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--farm-primary) 0%, #1a3a0f 100%)',
        color: '#fff',
        padding: '32px 16px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Aadhya Farm Stay
        </div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>
          Experience authentic farm life
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Active Bookings */}
        {bookings.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              Your Bookings
            </h3>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>
                  {booking.roomType}
                </div>
                <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '4px' }}>
                  Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                </div>
                <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '4px' }}>
                  Check-out: {new Date(booking.checkOut).toLocaleDateString()}
                </div>
                <div style={{ fontSize: '13px', color: '#93959f' }}>
                  Guests: {booking.guests} | ₹{booking.price}/night
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Room Options */}
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          Choose Your Stay
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{
                background: '#fff',
                border: selectedRoom === room.id ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedRoom(room.id)}
            >
              <img
                src={room.image}
                alt={room.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {room.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#93959f' }}>
                      {room.capacity}
                    </div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--farm-primary)' }}>
                    ₹{room.price}
                    <span style={{ fontSize: '13px', fontWeight: '400', color: '#93959f' }}>/night</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {room.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 12px',
                        background: '#f0f0f0',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                {selectedRoom === room.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(room);
                    }}
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
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Activities */}
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
          Farm Activities
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {activities.map((activity, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                {activity.icon}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                {activity.name}
              </div>
              <div style={{ fontSize: '12px', color: '#93959f' }}>
                {activity.description}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div style={{
          background: '#f0f7ed',
          border: '1px solid var(--farm-primary)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', color: 'var(--farm-primary)' }}>
            What's Included
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#3d4152' }}>
            <li>Farm-fresh organic meals</li>
            <li>Guided farm tours</li>
            <li>Traditional village activities</li>
            <li>Bonfire evenings</li>
            <li>Complimentary farm products</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileFarmStay;
