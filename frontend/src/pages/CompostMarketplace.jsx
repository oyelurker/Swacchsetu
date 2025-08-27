import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Search, ShoppingCart, Package, Leaf, Scale } from 'lucide-react';

const CompostMarketplace = () => {
  const [compostListings, setCompostListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { user } = useAuth();
  const dropdownRefs = useRef({});

  useEffect(() => {
    // Check if Razorpay is loaded
    const checkRazorpay = () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        console.log('Razorpay SDK loaded successfully');
      } else {
        // Try again after a short delay
        setTimeout(checkRazorpay, 500);
      }
    };
    
    checkRazorpay();
    
    const fetchCompostListings = async () => {
      try {
        const response = await api.get('/compost-listings/');
        setCompostListings(response.data);
      } catch (error) {
        console.error('Failed to fetch compost listings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompostListings();
  }, []);

  const handlePayment = async (listing) => {
    // Check if Razorpay is loaded
    if (!razorpayLoaded) {
      alert('Payment gateway is still loading. Please try again in a moment.');
      return;
    }
    
    // Debug environment variables
    console.log('VITE_RAZORPAY_KEY_ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
    
    const quantity = quantities[listing.id] || 0;
    const qty = parseFloat(quantity);

    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    if (qty > listing.quantity_available) {
      alert(`Quantity cannot exceed available amount (${listing.quantity_available} kg)`);
      return;
    }

    const totalAmount = parseFloat(getTotalForListing(listing));

    try {
      // 1. Create Razorpay Order
      console.log('Creating Razorpay order with amount:', totalAmount);
      const orderResponse = await api.post('/create-razorpay-order', {
        amount: totalAmount,
        currency: 'INR',
      });
      
      console.log('Order response:', orderResponse);

      const { order_id, amount } = orderResponse.data;
      console.log('Razorpay order created:', orderResponse.data);

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Get Key ID from .env
        amount: amount,
        currency: 'INR',
        name: 'SwacchSetu',
        description: `Payment for ${listing.title}`,
        order_id: order_id,
        handler: function (response) {
          // Handle successful payment - keep it simple
          console.log('Payment successful', response);
          alert('Payment successful! Order will be processed.');
          
          // Process the payment asynchronously without blocking
          processPayment(response, listing.id, qty);
        },
        prefill: {
          name: user.email, // Use user's name if available
          email: user.email,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment dialog closed by user');
          }
        }
      };
      
      // Debug the options being sent to Razorpay
      console.log('Razorpay options:', options);
      
      // Check if Razorpay is available
      if (window.Razorpay) {
        console.log('Initializing Razorpay checkout with options:', options);
        // Add a small delay to ensure everything is ready
        setTimeout(() => {
          try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
              console.error('Payment failed', response);
              // Log more details about the failure
              if (response.error) {
                console.error('Payment error details:', response.error);
                console.error('Error code:', response.error.code);
                console.error('Error description:', response.error.description);
                console.error('Error source:', response.error.source);
                console.error('Error step:', response.error.step);
                console.error('Error reason:', response.error.reason);
              }
              alert('Payment failed. Please try again. Error: ' + (response.error?.description || 'Unknown error'));
            });
            rzp1.open();
          } catch (error) {
            console.error('Error initializing Razorpay:', error);
            alert('Error initializing payment gateway. Please try again.');
          }
        }, 100);
      } else {
        console.error('Razorpay SDK not loaded');
        alert('Payment gateway not loaded. Please refresh the page and try again.');
      }
      
      // Check if Razorpay is available
      if (window.Razorpay) {
        console.log('Initializing Razorpay checkout with options:', options);
        // Add a small delay to ensure everything is ready
        setTimeout(() => {
          const rzp1 = new window.Razorpay(options);
          rzp1.on('payment.failed', function (response){
            console.error('Payment failed', response);
            alert('Payment failed. Please try again.');
          });
          rzp1.open();
        }, 100);
      } else {
        console.error('Razorpay SDK not loaded');
        alert('Payment gateway not loaded. Please refresh the page and try again.');
      }
    } catch (error) {
      console.error('Failed to create Razorpay order', error);
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Failed to initiate payment: ${error.response.data.detail || 'Unknown error'}`);
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    }
  };

  const filteredListings = compostListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleQuantityChange = (listingId, value) => {
    setQuantities(prev => ({
      ...prev,
      [listingId]: value
    }));
  };

  const processPayment = (response, listingId, qty) => {
    // Process payment asynchronously
    api.post('/verify-payment', {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    })
    .then((verifyResponse) => {
      console.log('Payment verified successfully', verifyResponse);
      // Create Order in your DB
      return api.post('/orders/', {
        compost_listing_id: listingId,
        quantity_kg: qty,
      });
    })
    .then((orderResponse) => {
      console.log('Order created successfully', orderResponse);
      alert('Payment successful and order placed!');
      setOpenDropdown(null);
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[listingId];
        return newQuantities;
      });
      // Optionally, refresh listings to show updated quantity
      return api.get('/compost-listings/');
    })
    .then((freshListings) => {
      setCompostListings(freshListings.data);
    })
    .catch((error) => {
      console.error('Payment verification or order creation failed', error);
      alert('Payment verification failed. Please contact support.');
    });
  };

  const getTotalForListing = (listing) => {
    const quantity = quantities[listing.id] || 0;
    return (parseFloat(quantity) * listing.price_per_kg).toFixed(2);
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p>Loading compost listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
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
                padding: '0.75rem 0.75rem 0.75rem 3rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '1rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="card" style={{ 
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
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
                            <div className="marketplace-item-price">
                              <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>
                                Price/kg
                              </div>
                              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>
                                ₹{listing.price_per_kg}
                              </div>
                            </div>
                            <div className="marketplace-item-quantity">
                              <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem', textAlign: 'right' }}>
                                Available
                              </div>
                              <div style={{ fontWeight: '600', fontSize: '1.125rem', textAlign: 'right' }}>
                                <span style={{ color: 'var(--foreground)' }}>{listing.quantity_available}</span>
                                <span style={{ color: 'var(--muted-foreground)', fontWeight: '500', marginLeft: '0.25rem' }}>kg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {user && user.role === 'buyer' && (
                    <div style={{ 
                      position: 'relative',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border)'
                    }} ref={el => dropdownRefs.current[listing.id] = el}>
                      <button 
                        className="btn btn-default" 
                        onClick={() => setOpenDropdown(openDropdown === listing.id ? null : listing.id)}
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
                      
                      {openDropdown === listing.id && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            zIndex: 1000,
                            minWidth: '300px',
                            marginTop: '0.5rem',
                            backgroundColor: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            padding: '1rem'
                          }}
                        >
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                          }}>
                            <div>
                              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
                                Place Order
                              </h3>
                              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                                {listing.title}
                              </p>
                            </div>
                            <button 
                              onClick={() => setOpenDropdown(null)}
                              style={{ 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer',
                                padding: '0.25rem',
                                borderRadius: 'var(--radius)',
                                color: 'var(--muted-foreground)'
                              }}
                              aria-label="Close"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                          
                          <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Scale size={16} style={{ color: 'var(--muted-foreground)' }} />
                              <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Price/kg</div>
                                <div style={{ fontWeight: '600', fontSize: '1.125rem', color: 'var(--primary)' }}>₹{listing.price_per_kg}</div>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Package size={16} style={{ color: 'var(--muted-foreground)' }} />
                              <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Available</div>
                                <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                                  <span style={{ color: 'var(--foreground)' }}>{listing.quantity_available}</span>
                                  <span style={{ color: 'var(--muted-foreground)', fontWeight: '500', marginLeft: '0.25rem' }}>kg</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                              <label htmlFor={`quantity-${listing.id}`} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Quantity (kg)
                              </label>
                              <input
                                type="number"
                                id={`quantity-${listing.id}`}
                                value={quantities[listing.id] || ''}
                                onChange={(e) => handleQuantityChange(listing.id, e.target.value)}
                                placeholder="Enter quantity in kilograms"
                                min="0"
                                step="0.1"
                                required
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
                              paddingTop: '1rem',
                              borderTop: '1px solid var(--border)'
                            }}>
                              <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                                Total: <span style={{ color: 'var(--primary)' }}>₹{getTotalForListing(listing)}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                  type="button"
                                  onClick={() => setOpenDropdown(null)}
                                  className="btn btn-outline"
                                  style={{ 
                                    padding: '0.5rem 1rem',
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
                                  type="button" 
                                  onClick={() => handlePayment(listing)}
                                  className="btn btn-default"
                                  style={{ 
                                    padding: '0.5rem 1rem',
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
                        </div>
                      )}
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
      </div>
    </div>
  );
};

export default CompostMarketplace;
