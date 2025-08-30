import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ModernDashboard from './pages/ModernDashboard';
import HouseholdDashboard from './pages/HouseholdDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import ComposterDashboard from './pages/ComposterDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Profile from './pages/Profile';
import WasteListingForm from './pages/WasteListingForm';
import WasteListings from './pages/WasteListings';
import CompostListingForm from './pages/CompostListingForm';
import CompostMarketplace from './pages/CompostMarketplace';
import MyOrders from './pages/MyOrders';
import SampleDashboard from './pages/SampleDashboard';
import { ModernHeader } from './components/ui/ModernHeader';
import NextLevelHomePage from './components/homepage/NextLevelHomePage';
import ComponentDemo from './pages/ComponentDemo';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import './styles/globals.css';
import './styles/winning-theme.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen" style={{ margin: 0, padding: 0 }}>
          <ModernHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<NextLevelHomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/components-demo" element={<ComponentDemo />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/dashboard" element={<ProtectedRoute roles={['household', 'business', 'composter', 'buyer']}><ModernDashboard /></ProtectedRoute>} />
              <Route path="/household-dashboard" element={<ProtectedRoute roles={['household']}><HouseholdDashboard /></ProtectedRoute>} />
              <Route path="/business-dashboard" element={<ProtectedRoute roles={['business']}><BusinessDashboard /></ProtectedRoute>} />
              <Route path="/composter-dashboard" element={<ProtectedRoute roles={['composter']}><ComposterDashboard /></ProtectedRoute>} />
              <Route path="/farmer-dashboard" element={<ProtectedRoute roles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute roles={['household', 'business', 'composter', 'buyer']}><Profile /></ProtectedRoute>} />
              <Route path="/create-waste-listing" element={<ProtectedRoute roles={['household', 'business']}><WasteListingForm /></ProtectedRoute>} />
              <Route path="/waste-listings" element={<WasteListings />} />
              <Route path="/create-compost-listing" element={<ProtectedRoute roles={['composter']}><CompostListingForm /></ProtectedRoute>} />
              <Route path="/compost-marketplace" element={<ProtectedRoute roles={['buyer', 'composter']}><CompostMarketplace /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute roles={['buyer']}><MyOrders /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;