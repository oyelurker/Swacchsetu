import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, ShoppingCart, Scale, IndianRupee, Calendar } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/users/me/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Orders</h1>
        <p className="dashboard-subtitle">Track your compost purchases</p>
      </div>
      
      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <ShoppingCart size={48} style={{ margin: '0 auto 1rem', color: 'var(--muted-foreground)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No orders yet
          </h3>
          <p style={{ color: 'var(--muted-foreground)' }}>
            You haven't placed any orders yet. Browse the marketplace to get started!
          </p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="card order-item">
              <div className="order-header">
                <div className="order-id">Order #{order.id}</div>
                <span 
                  className={getStatusColor(order.status)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Scale size={16} style={{ color: 'var(--muted-foreground)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Quantity</div>
                    <div style={{ fontWeight: '500' }}>{order.quantity_kg} kg</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IndianRupee size={16} style={{ color: 'var(--muted-foreground)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Price/kg</div>
                    <div style={{ fontWeight: '500' }}>₹{(order.total_price / order.quantity_kg).toFixed(2)}</div>
                  </div>
                </div>
              </div>
              
              <div className="order-total">
                <div style={{ fontWeight: '500' }}>Total:</div>
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>₹{order.total_price.toFixed(2)}</div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
                color: 'var(--muted-foreground)',
                fontSize: '0.875rem'
              }}>
                <Calendar size={14} />
                Ordered on: {new Date(order.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
