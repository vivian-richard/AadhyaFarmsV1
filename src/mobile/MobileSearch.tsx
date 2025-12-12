import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const MobileSearch = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState(['Milk', 'Eggs', 'Chicken', 'Ghee']);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const popularProducts = products.slice(0, 6);

  return (
    <div className="mobile-search">
      {/* Search Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        padding: '12px 16px',
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
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '15px',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#93959f'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {!searchQuery ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
                  Recent Searches
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(search)}
                      style={{
                        padding: '8px 16px',
                        background: '#f8f8f8',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Products */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
                Popular Products
              </h3>
              <div className="mobile-product-grid">
                {popularProducts.map((product) => (
                  <div
                    key={product.id}
                    className="mobile-product-card"
                    onClick={() => navigate(`/product-detail/${product.id}`)}
                  >
                    <div className="mobile-product-card__image-wrapper">
                      <img
                        src={product.image || '/api/placeholder/150/150'}
                        alt={product.name}
                        className="mobile-product-card__image"
                      />
                    </div>
                    <div className="mobile-product-card__content">
                      <div className="mobile-product-card__name">{product.name}</div>
                      <div className="mobile-product-card__unit">{product.unit}</div>
                      <div className="mobile-product-card__footer">
                        <div className="mobile-product-card__price">₹{product.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Search Results */}
            {filteredProducts.length > 0 ? (
              <>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                </h3>
                <div className="mobile-product-grid">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="mobile-product-card"
                      onClick={() => navigate(`/product-detail/${product.id}`)}
                    >
                      <div className="mobile-product-card__image-wrapper">
                        <img
                          src={product.image || '/api/placeholder/150/150'}
                          alt={product.name}
                          className="mobile-product-card__image"
                        />
                      </div>
                      <div className="mobile-product-card__content">
                        <div className="mobile-product-card__name">{product.name}</div>
                        <div className="mobile-product-card__unit">{product.unit}</div>
                        <div className="mobile-product-card__footer">
                          <div className="mobile-product-card__price">₹{product.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  No results found
                </div>
                <div style={{ fontSize: '14px', color: '#93959f' }}>
                  Try searching for something else
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
