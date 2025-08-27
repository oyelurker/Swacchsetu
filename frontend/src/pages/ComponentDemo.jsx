import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  KpiChip, 
  StatCard, 
  FeatureCard, 
  TestimonialCard, 
  ProgressBar, 
  Rating, 
  Badge, 
  Alert, 
  Skeleton, 
  Avatar, 
  Breadcrumb, 
  Modal, 
  Tabs, 
  Pagination 
} from '../components/ui/components-library.jsx';
import { 
  Leaf, 
  Package, 
  Users, 
  TrendingUp, 
  Home, 
  Building2, 
  Recycle, 
  Sprout,
  Zap,
  Star,
  Calendar,
  ShoppingCart,
  Award
} from 'lucide-react';
import '../styles/globals.css';

const ComponentDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Component Demo' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl font-bold text-dark mt-4">Component Library Demo</h1>
          <p className="text-muted mt-2">
            Showcase of all available UI components in the SwacchSetu Design System
          </p>
        </div>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-card rounded-2xl">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="accent">Accent Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button icon={<Leaf />}>With Icon</Button>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Basic Card</h3>
              <p className="text-muted">This is a simple card component with padding and border.</p>
            </Card>
            
            <FeatureCard 
              title="Feature Card"
              description="This card highlights a platform feature with an icon."
              icon={<Zap />}
              color="bg-primary"
            />
            
            <TestimonialCard 
              name="Priya Sharma"
              role="Household User"
              content="SwacchSetu has transformed how I handle kitchen waste. It's now contributing to a greener planet!"
              avatar="PS"
            />
          </div>
        </section>

        {/* KPI Chips and Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">KPI Chips & Stats</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <KpiChip icon={<Package />}>150+ Tons Waste Diverted</KpiChip>
            <KpiChip icon={<Leaf />}>45+ Tons CO2 Saved</KpiChip>
            <KpiChip icon={<Users />}>2400+ Active Users</KpiChip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              value="150+" 
              label="Tons Waste Diverted" 
              icon={<Package />} 
              color="bg-emerald-500" 
            />
            <StatCard 
              value="45+" 
              label="Tons CO2 Saved" 
              icon={<Leaf />} 
              color="bg-green-500" 
            />
            <StatCard 
              value="2400+" 
              label="Active Users" 
              icon={<Users />} 
              color="bg-blue-500" 
            />
            <StatCard 
              value="120+" 
              label="Partner Composters" 
              icon={<Recycle />} 
              color="bg-amber-500" 
            />
          </div>
        </section>

        {/* Progress and Ratings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Progress & Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card rounded-2xl">
            <div>
              <h3 className="text-lg font-semibold mb-4">Progress Bars</h3>
              <ProgressBar value={75} max={100} label="Monthly Goal" />
              <div className="mt-4">
                <ProgressBar value={45} max={100} label="Environmental Impact" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ratings</h3>
              <div className="flex items-center gap-2 mb-2">
                <Rating value={4.5} max={5} size={20} />
                <span className="text-sm text-muted">4.5/5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Rating value={5} max={5} size={20} />
                <span className="text-sm text-muted">5/5.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* Badges and Alerts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Badges & Alerts</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-card rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <Alert variant="info">
                <strong>Information:</strong> This is an informational alert.
              </Alert>
              <Alert variant="success">
                <strong>Success:</strong> Operation completed successfully.
              </Alert>
              <Alert variant="warning">
                <strong>Warning:</strong> Please review your inputs.
              </Alert>
              <Alert variant="error">
                <strong>Error:</strong> Something went wrong. Please try again.
              </Alert>
            </div>
          </div>
        </section>

        {/* Avatars and Skeletons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Avatars & Loaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card rounded-2xl">
            <div>
              <h3 className="text-lg font-semibold mb-4">Avatars</h3>
              <div className="flex items-center gap-4">
                <Avatar name="Priya Sharma" size="sm" />
                <Avatar name="Priya Sharma" size="md" />
                <Avatar name="Priya Sharma" size="lg" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Skeleton Loaders</h3>
              <div className="space-y-3">
                <Skeleton width="100%" height="20px" />
                <Skeleton width="80%" height="20px" />
                <Skeleton width="60%" height="20px" />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Tabs</h2>
          <Card className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-6">
              {activeTab === 'overview' && (
                <p className="text-muted">This is the overview tab content. Display general information here.</p>
              )}
              {activeTab === 'analytics' && (
                <p className="text-muted">This is the analytics tab content. Show data visualizations and metrics here.</p>
              )}
              {activeTab === 'settings' && (
                <p className="text-muted">This is the settings tab content. Configure user preferences and options here.</p>
              )}
            </div>
          </Card>
        </section>

        {/* Pagination */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Pagination</h2>
          <Card className="p-6">
            <Pagination 
              currentPage={currentPage} 
              totalPages={10} 
              onPageChange={setCurrentPage} 
            />
          </Card>
        </section>

        {/* Modal Trigger */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Modals</h2>
          <Card className="p-6">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>
          </Card>
        </section>
      </div>

      {/* Demo Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Component Demo Modal"
      >
        <p className="text-muted mb-4">
          This is a demo of the modal component. You can put any content inside modals.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <Rating value={4.5} max={5} size={20} />
          <span className="text-sm text-muted">4.5/5.0</span>
        </div>
        <Alert variant="info">
          Modals are great for focused interactions and drawing attention to important information.
        </Alert>
        
        <div slot="footer" className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary">
            Take Action
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentDemo;