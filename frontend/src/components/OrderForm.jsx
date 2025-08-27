import React, { useState } from 'react';
import api from '../services/api';
import Modal from './Modal';
import { ShoppingCart, Scale, Package } from 'lucide-react';

const OrderForm = ({ listing, onClose }) => {
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate quantity
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('Please enter a valid quantity');
      setLoading(false);
      return;
    }
    
    if (qty > listing.quantity_available) {
      setError(`Quantity cannot exceed available amount (${listing.quantity_available} kg)`);
      setLoading(false);
      return;
    }
    
    try {
      await api.post('/orders/', {
        compost_listing_id: listing.id,
        quantity_kg: qty,
      });
      onClose();
      // Show success message or redirect
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Failed to create order', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = quantity ? (parseFloat(quantity) * listing.price_per_kg).toFixed(2) : '0.00';

  return (
    <Modal onClose={onClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Place Order</h2>
          <p>{listing.title}</p>
        </div>
        
        <div className="modal-body">
          <div className="order-details-grid">
            <div className="order-detail-item">
              <Scale size={16} aria-hidden="true" />
              <div>
                <div className="detail-label">Price/kg</div>
                <div className="detail-value">₹{listing.price_per_kg}</div>
              </div>
            </div>
            
            <div className="order-detail-item">
              <Package size={16} aria-hidden="true" />
              <div>
                <div className="detail-label">Available</div>
                <div className="detail-value">{listing.quantity_available} kg</div>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="form-error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} aria-label="Place compost order form" noValidate>
            <div className="form-group">
              <label htmlFor="quantity">
                Quantity (kg)
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity in kilograms"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                step="0.1"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>
            
            <div className="order-total">
              <p>
                Total: ₹{total}
              </p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="submit" 
                className="btn btn-default" 
                disabled={loading}
                aria-disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} aria-hidden="true" />
                    Place Order
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default OrderForm;
