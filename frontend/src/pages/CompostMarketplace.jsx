import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingCart, Package, Search, User } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const CompostMarketplace = () => {
  const { user } = useAuth();
  const [compostListings, setCompostListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompostListings = async () => {
      try {
        const response = await api.get('/compost-listings/');
        setCompostListings(response.data);
      } catch (error) {
        console.error('Failed to fetch compost listings', error);
        setError('Failed to load compost listings');
      } finally {
        setLoading(false);
      }
    };

    fetchCompostListings();
  }, []);

  const filteredListings = compostListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyNow = (listing) => {
    setSelectedListing(listing);
    setQuantity(1);
    setIsPaymentModalOpen(true);
  };

  const handleQuantityChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0.1) {
      setQuantity(numValue);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedListing) return 0;
    return (selectedListing.price_per_kg * quantity).toFixed(2);
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const response = await api.post('/create-razorpay-order', {
        amount: Math.round(selectedListing.price_per_kg * quantity), // Amount in rupees
        currency: 'INR'
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'SwacchSetu',
        description: `Purchase of ${quantity}kg compost`,
        order_id: response.data.order_id,
        handler: function (response) {
          // Verify payment and create order
          api.post('/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          .then(() => {
            // Create order in database
            return api.post('/orders/', {
              compost_listing_id: selectedListing.id,
              quantity_kg: quantity,
            });
          })
          .then(() => {
            alert('Order placed successfully!');
            setIsPaymentModalOpen(false);
            setSelectedListing(null);
          })
          .catch((error) => {
            console.error('Failed to process payment', error);
            alert('Payment verification failed. Please contact support.');
          });
        },
        prefill: {
          name: user.email.split('@')[0],
          email: user.email,
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Failed to create Razorpay order', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading compost listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Leaf size={48} style={{ margin: '0 auto 1rem', color: 'var(--muted-foreground)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Error Loading Listings
          </h3>
          <p style={{ color: 'var(--muted-foreground)' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Compost Marketplace
        </h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
          Browse and purchase high-quality compost from verified composters
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            position: 'relative', 
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--muted-foreground)'
              }} 
            />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      <div className="card-content">
        {filteredListings.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Leaf size={48} style={{ margin: '0 auto 1rem', color: 'var(--muted-foreground)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No compost listings found
            </h3>
            <p style={{ color: 'var(--muted-foreground)' }}>
              {searchTerm ? 'Try adjusting your search terms' : 'There are currently no compost listings available'}
            </p>
          </div>
        ) : (
          <div className="marketplace-grid">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="card marketplace-item" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative'
              }}>
                <div className="marketplace-item-content" style={{ flex: 1 }}>
                  <h3 className="marketplace-item-title" style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--foreground)'
                  }}>
                    {listing.title}
                  </h3>
                  <p className="marketplace-item-description" style={{ 
                    color: 'var(--muted-foreground)', 
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {listing.description}
                  </p>
                  
                  <div className="marketplace-item-details" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <div className="marketplace-item-price" style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700',
                      color: 'var(--primary)'
                    }}>
                      ₹{listing.price_per_kg}
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '400',
                        color: 'var(--muted-foreground)'
                      }}>
                        /kg
                      </span>
                    </div>
                    <div className="marketplace-item-availability" style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--muted-foreground)'
                    }}>
                      {listing.quantity_available}kg available
                    </div>
                  </div>
                </div>
                
                {user && user.role === 'buyer' && (
                  <div style={{ 
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <button 
                      className="btn btn-default" 
                      onClick={() => handleBuyNow(listing)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: '1px solid var(--primary)',
                        borderRadius: 'var(--radius)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>
                )}
                
                {user && user.role === 'composter' && (
                  <div style={{ 
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--muted-foreground)',
                      fontStyle: 'italic'
                    }}>
                      This is your listing
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedListing && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999
          }}
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                margin: 0
              }}>
                Place Order
              </h3>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: 'var(--radius)',
                  color: 'var(--muted-foreground)'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                margin: '0 0 0.25rem 0' 
              }}>
                {selectedListing.title}
              </h4>
              <p style={{ 
                color: 'var(--muted-foreground)', 
                margin: 0,
                fontSize: '0.875rem'
              }}>
                {selectedListing.description}
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'var(--muted-foreground)'
                }}>
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--muted-foreground)',
                    marginBottom: '0.25rem'
                  }}>
                    Total Price
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: 'var(--primary)'
                  }}>
                    ₹{calculateTotalPrice()}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem'
            }}>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="btn btn-outline"
                style={{ 
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: 'var(--primary)',
                  border: '1px solid var(--primary)',
                  borderRadius: 'var(--radius)',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handlePayment}
                className="btn btn-default"
                style={{ 
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: '1px solid var(--primary)',
                  borderRadius: 'var(--radius)',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                <ShoppingCart size={16} />
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompostMarketplace;