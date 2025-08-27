import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Plus, FileText, Package, Truck, MapPin, Tag } from 'lucide-react';

const WasteListingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [wasteType, setWasteType] = useState('organic');
  const [pickupLocation, setPickupLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!title || !description || !quantity || !pickupLocation) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (parseFloat(quantity) <= 0) {
      setError('Quantity must be greater than 0');
      setLoading(false);
      return;
    }
    
    try {
      await api.post('/waste-listings/', {
        title,
        description,
        quantity: parseFloat(quantity),
        waste_type: wasteType,
        pickup_location: pickupLocation,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create waste listing', error);
      setError('Failed to create waste listing. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Create Waste Listing</h1>
        <p className="dashboard-subtitle">
          List your waste materials for composting by verified composters
        </p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-header">
          <h2 className="card-title">Waste Details</h2>
          <p className="card-description">
            Provide accurate information to help composters efficiently collect your waste
          </p>
        </div>
        
        <div className="card-content">
          {error && (
            <div 
              role="alert"
              aria-live="assertive"
              style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                marginBottom: '1rem'
              }}
            >
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} aria-label="Create waste listing form" noValidate>
            <div className="form-group">
              <label htmlFor="title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag size={16} aria-hidden="true" />
                Listing Title
              </label>
              <div className="input-group">
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Kitchen Scraps, Garden Waste"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!title && error ? "true" : "false"}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} aria-hidden="true" />
                Description
              </label>
              <div className="input-group">
                <textarea
                  id="description"
                  placeholder="Describe the waste materials - composition, freshness, any special handling requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  required
                  aria-required="true"
                  aria-invalid={!description && error ? "true" : "false"}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={16} aria-hidden="true" />
                Quantity (kg)
              </label>
              <div className="input-group">
                <input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity in kilograms"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                  step="0.1"
                  required
                  aria-required="true"
                  aria-invalid={!quantity && error ? "true" : "false"}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="wasteType" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} aria-hidden="true" />
                Waste Type
              </label>
              <div className="input-group">
                <select 
                  id="wasteType"
                  value={wasteType} 
                  onChange={(e) => setWasteType(e.target.value)}
                  aria-required="true"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    appearance: 'none',
                    background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e") no-repeat right 0.5rem center/1.5em 1.5em, var(--background)`
                  }}
                >
                  <option value="organic">Organic (Food scraps, garden waste)</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="glass">Glass</option>
                  <option value="metal">Metal</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="pickupLocation" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} aria-hidden="true" />
                Pickup Location
              </label>
              <div className="input-group">
                <input
                  id="pickupLocation"
                  type="text"
                  placeholder="Enter full address for pickup"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!pickupLocation && error ? "true" : "false"}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 3rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div 
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/dashboard')}
                style={{
                  flex: 1,
                  padding: '0.75rem'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-default"
                disabled={loading}
                aria-disabled={loading}
                aria-busy={loading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: '1rem', height: '1rem' }}></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={16} aria-hidden="true" />
                    Create Listing
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div 
        className="card" 
        style={{ 
          maxWidth: '600px', 
          margin: '2rem auto 0',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Truck size={24} color="#2196F3" aria-hidden="true" />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2196F3' }}>Collection Tips</h3>
            <ul style={{ 
              margin: 0, 
              padding: 0, 
              paddingLeft: '1rem',
              color: 'var(--muted-foreground)'
            }}>
              <li style={{ marginBottom: '0.25rem' }}>Provide accurate quantity estimates to help with logistics</li>
              <li style={{ marginBottom: '0.25rem' }}>Be as specific as possible about waste composition</li>
              <li style={{ marginBottom: '0.25rem' }}>Include any special handling instructions</li>
              <li>Ensure your location is accessible for collection vehicles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteListingForm;
