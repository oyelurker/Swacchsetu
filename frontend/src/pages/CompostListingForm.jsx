import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Leaf, IndianRupee, Scale, FileText, Tag } from 'lucide-react';

const CompostListingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title || !description || !pricePerKg || !quantityAvailable) {
      setError('Please fill in all fields');
      return;
    }
    
    if (parseFloat(pricePerKg) <= 0) {
      setError('Price per kg must be greater than 0');
      return;
    }
    
    if (parseFloat(quantityAvailable) <= 0) {
      setError('Quantity available must be greater than 0');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/compost-listings/', {
        title,
        description,
        price_per_kg: parseFloat(pricePerKg),
        quantity_available: parseFloat(quantityAvailable),
      });
      navigate('/compost-marketplace');
    } catch (error) {
      console.error('Failed to create compost listing', error);
      setError('Failed to create compost listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Create Compost Listing</h1>
        <p className="dashboard-subtitle">
          List your high-quality compost for farmers in the marketplace
        </p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-header">
          <h2 className="card-title">Compost Details</h2>
          <p className="card-description">
            Provide accurate information to help farmers make informed decisions
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
          
          <form onSubmit={handleSubmit} aria-label="Create compost listing form" noValidate>
            <div className="form-group">
              <label htmlFor="title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag size={16} aria-hidden="true" />
                Product Title
              </label>
              <div className="input-group">
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Premium Organic Compost"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  placeholder="Describe your compost - ingredients, processing method, benefits for soil, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
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
              <label htmlFor="price" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IndianRupee size={16} aria-hidden="true" />
                Price per Kilogram
              </label>
              <div className="input-group">
                <span 
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  ₹
                </span>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  aria-required="true"
                  aria-invalid={!pricePerKg && error ? "true" : "false"}
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
              <label htmlFor="quantity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={16} aria-hidden="true" />
                Available Quantity (kg)
              </label>
              <div className="input-group">
                <input
                  id="quantity"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                  value={quantityAvailable}
                  onChange={(e) => setQuantityAvailable(e.target.value)}
                  aria-required="true"
                  aria-invalid={!quantityAvailable && error ? "true" : "false"}
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
                onClick={() => navigate('/compost-marketplace')}
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
                    <Leaf size={16} aria-hidden="true" />
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
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Leaf size={24} color="#4CAF50" aria-hidden="true" />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4CAF50' }}>Tips for Successful Listings</h3>
            <ul style={{ 
              margin: 0, 
              padding: 0, 
              paddingLeft: '1rem',
              color: 'var(--muted-foreground)'
            }}>
              <li style={{ marginBottom: '0.25rem' }}>Use a descriptive title that highlights your compost's unique qualities</li>
              <li style={{ marginBottom: '0.25rem' }}>Include specific details about ingredients and processing methods</li>
              <li style={{ marginBottom: '0.25rem' }}>Set a competitive price based on local market rates</li>
              <li>Keep your inventory updated to maintain trust with buyers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompostListingForm;
