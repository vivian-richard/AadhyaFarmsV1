import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileAddresses = () => {
  const navigate = useNavigate();
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

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
        justifyContent: 'space-between'
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
            Saved Addresses
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: 'var(--farm-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Add Address Form */}
        {showAddForm && (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
              Add New Address
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  placeholder="House No., Building Name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Road Name, Area, Colony"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: '14px' }}>Set as default address</span>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--farm-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Save Address
              </button>
            </form>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📍</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
              No addresses saved
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Add a delivery address to get started
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {addresses.map((address) => (
              <div
                key={address.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  border: address.isDefault ? '2px solid var(--farm-primary)' : '1px solid #e0e0e0'
                }}
              >
                {address.isDefault && (
                  <div style={{
                    display: 'inline-block',
                    background: 'var(--farm-primary)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }}>
                    DEFAULT
                  </div>
                )}
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                  {address.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                  {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}
                </p>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                  Phone: {address.phone}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!address.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(address.id)}
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
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(address.id)}
                    style={{
                      flex: 1,
                      background: '#fff',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAddresses;
