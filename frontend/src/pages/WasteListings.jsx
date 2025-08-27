import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { Search, MapPin, Package, Calendar, User, Check, X, Truck } from 'lucide-react';

const WasteListings = () => {
  const [wasteListings, setWasteListings] = useState([]);
  const [allListings, setAllListings] = useState([]); // Store all listings for composters
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [recommendedComposters, setRecommendedComposters] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchWasteListings = async () => {
    try {
      const response = await api.get('/waste-listings/');
      setAllListings(response.data);
      
      // Filter listings based on user role
      let filteredListings = response.data;
      
      if (user) {
        if (user && (user.role === 'household' || user.role === 'business')) {
          // Household and business users only see their own listings
          filteredListings = response.data.filter(listing => listing.owner_id === user.id);
        }
        // Composters see all listings (no filter needed)
        // Farmers shouldn't really be accessing this page, but if they do, they see all listings
      }
      
      setWasteListings(filteredListings);
    } catch (error) {
      console.error('Failed to fetch waste listings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWasteListings();
  }, [user]);

  const handleAcceptListing = async (listingId) => {
    try {
      await api.put(`/waste-listings/${listingId}/assign-composter`);
      fetchWasteListings();
    } catch (error) {
      console.error('Failed to accept waste listing', error);
    }
  };

  const handleUpdateStatus = async (listingId, status) => {
    try {
      await api.put(`/waste-listings/${listingId}/update-status?status=${status}`);
      fetchWasteListings();
    } catch (error) {
      console.error('Failed to update waste listing status', error);
    }
  };

  const handleFindComposter = async (listingId) => {
    try {
      const response = await api.get(`/waste-listings/${listingId}/recommended-composters`);
      setRecommendedComposters(response.data);
      setSelectedListing(listingId);
    } catch (error) {
      console.error('Failed to fetch recommended composters', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'collected':
        return 'bg-green-100 text-green-800';
      case 'pending_pickup':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredListings = wasteListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading waste listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          {user && (user.role === 'composter' ? 'Available Waste Listings' : 'My Waste Listings')}
        </h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
          {user && (user.role === 'composter' 
            ? 'Browse and accept waste listings in your area' 
            : 'Manage your waste listings and find composters')}
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '0.75rem', 
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

      {filteredListings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Package size={48} style={{ margin: '0 auto 1rem', color: 'var(--muted-foreground)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No waste listings found
          </h3>
          <p style={{ color: 'var(--muted-foreground)' }}>
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : user && user.role === 'composter'
                ? 'There are currently no waste listings available'
                : 'You haven\'t created any waste listings yet'}
          </p>
          {(user && (user.role === 'household' || user.role === 'business')) && !searchTerm && (
            <div style={{ marginTop: '1rem' }}>
              <a href="/create-waste-listing" className="btn btn-default">
                Create Your First Waste Listing
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div 
              key={listing.id} 
              className="card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600',
                    margin: 0,
                    flex: 1
                  }}>
                    {listing.title}
                  </h3>
                  <span 
                    className={getStatusColor(listing.status)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </div>
                
                <p style={{ 
                  color: 'var(--muted-foreground)', 
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {listing.description}
                </p>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={16} style={{ color: 'var(--muted-foreground)' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Quantity</div>
                      <div style={{ fontWeight: '500' }}>{listing.quantity} kg</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={16} style={{ color: 'var(--muted-foreground)' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Type</div>
                      <div style={{ fontWeight: '500' }}>
                        {listing.waste_type?.replace('_', ' ') || 'Not specified'}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} style={{ color: 'var(--muted-foreground)' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Created</div>
                      <div style={{ fontWeight: '500' }}>
                        {new Date(listing.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} style={{ color: 'var(--muted-foreground)' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Location</div>
                      <div style={{ fontWeight: '500' }}>
                        {listing.pickup_location || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)'
              }}>
                {user && user.role === 'composter' && listing.status === 'available' && (
                  <button
                    onClick={() => handleAcceptListing(listing.id)}
                    className="btn btn-default"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Check size={16} />
                    Accept
                  </button>
                )}
                
                {user && user.role === 'composter' && listing.status === 'pending_pickup' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(listing.id, 'completed')}
                      className="btn btn-default"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Check size={16} />
                      Complete
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(listing.id, 'cancelled')}
                      className="btn btn-outline"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                )}
                
                {user && (user.role === 'household' || user.role === 'business') && 
                 listing.status === 'available' && (
                  <button
                    onClick={() => handleFindComposter(listing.id)}
                    className="btn btn-outline"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <User size={16} />
                    Find Composter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedListing && (
        <Modal onClose={() => setSelectedListing(null)}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            marginTop: 0, 
            marginBottom: '1rem' 
          }}>
            Recommended Composters
          </h2>
          {recommendedComposters.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <User size={48} style={{ margin: '0 auto 1rem', color: 'var(--muted-foreground)' }} />
              <p>No recommended composters found for this location.</p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
                Here are the composters near this listing:
              </p>
              <div style={{ 
                listStyle: 'none', 
                padding: 0,
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {recommendedComposters.map((composter) => (
                  <div 
                    key={composter.id}
                    style={{
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.25rem'
                    }}>
                      <div style={{ fontWeight: '500' }}>{composter.email}</div>
                      <span 
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)'
                        }}
                      >
                        {Math.round(composter.distance * 100) / 100} km
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: 'var(--muted-foreground)',
                      fontSize: '0.875rem'
                    }}>
                      <MapPin size={14} />
                      {composter.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default WasteListings;
