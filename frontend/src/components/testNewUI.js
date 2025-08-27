// Test the new UI components
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/homepage/WinningHomePage';
import ModernDashboard from './pages/ModernDashboard';
import { ModernHeader } from './components/ui/ModernHeader';
import './styles/winning-theme.css';

// Test rendering of key components
console.log('Testing new UI components...');

// Test HomePage component
try {
  const homePageContainer = document.createElement('div');
  const homePageRoot = createRoot(homePageContainer);
  homePageRoot.render(
    <BrowserRouter>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </BrowserRouter>
  );
  console.log('✓ HomePage component renders without errors');
  homePageRoot.unmount();
} catch (error) {
  console.error('✗ HomePage component failed to render:', error);
}

// Test ModernDashboard component
try {
  const dashboardContainer = document.createElement('div');
  const dashboardRoot = createRoot(dashboardContainer);
  dashboardRoot.render(
    <BrowserRouter>
      <AuthProvider>
        <ModernDashboard />
      </AuthProvider>
    </BrowserRouter>
  );
  console.log('✓ ModernDashboard component renders without errors');
  dashboardRoot.unmount();
} catch (error) {
  console.error('✗ ModernDashboard component failed to render:', error);
}

// Test ModernHeader component
try {
  const headerContainer = document.createElement('div');
  const headerRoot = createRoot(headerContainer);
  headerRoot.render(
    <BrowserRouter>
      <AuthProvider>
        <ModernHeader />
      </AuthProvider>
    </BrowserRouter>
  );
  console.log('✓ ModernHeader component renders without errors');
  headerRoot.unmount();
} catch (error) {
  console.error('✗ ModernHeader component failed to render:', error);
}

console.log('UI component testing complete!');