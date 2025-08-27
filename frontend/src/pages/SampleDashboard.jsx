import React from 'react';
import { Button } from '../components/ui/Button';
import { Leaf, Package, Truck, TrendingUp } from 'lucide-react';

const SampleDashboard = () => {
  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="heading-1">Welcome to SwacchSetu</h1>
        <p className="body-large" style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
          Ready to make an environmental impact!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-content">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
              <div style={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                marginRight: '1rem'
              }}>
                <Leaf size={24} color="#4CAF50" />
              </div>
              <div>
                <h3 style={{fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0}}>Waste Diverted</h3>
                <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '0.25rem 0 0 0'}}>150 kg</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
              <div style={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                marginRight: '1rem'
              }}>
                <Package size={24} color="#4CAF50" />
              </div>
              <div>
                <h3 style={{fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0}}>Compost Produced</h3>
                <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '0.25rem 0 0 0'}}>85 kg</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
              <div style={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                marginRight: '1rem'
              }}>
                <Truck size={24} color="#4CAF50" />
              </div>
              <div>
                <h3 style={{fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0}}>Pickups Completed</h3>
                <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '0.25rem 0 0 0'}}>12</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
              <div style={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                marginRight: '1rem'
              }}>
                <TrendingUp size={24} color="#4CAF50" />
              </div>
              <div>
                <h3 style={{fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0}}>CO2 Saved</h3>
                <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '0.25rem 0 0 0'}}>45 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="heading-2">Quick Actions</h2>
          <p className="body-medium" style={{ color: 'var(--muted-foreground)' }}>
            Manage your waste and compost activities
          </p>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="btn-default btn-lg"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                padding: '1rem'
              }}
            >
              <Leaf size={20} />
              Create Waste Listing
            </Button>
            <Button 
              className="btn-outline btn-lg"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                padding: '1rem'
              }}
            >
              <Package size={20} />
              Browse Compost Marketplace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDashboard;