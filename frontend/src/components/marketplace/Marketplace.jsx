import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Package, 
  Leaf, 
  Sprout,
  TrendingUp,
  Award
} from 'lucide-react';
import '../../styles/globals.css';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for compost products
  const products = [
    {
      id: 1,
      name: "Premium Vermicompost",
      seller: "Green Earth Composters",
      price: 250,
      rating: 4.8,
      reviews: 124,
      location: "Bangalore, Karnataka",
      image: "/placeholder-compost-1.jpg",
      category: "vermicompost",
      quantity: "10kg bag",
      description: "High-quality vermicompost rich in nutrients for all plant types"
    },
    {
      id: 2,
      name: "Organic Garden Mix",
      seller: "Urban Soil Solutions",
      price: 180,
      rating: 4.6,
      reviews: 89,
      location: "Mumbai, Maharashtra",
      image: "/placeholder-compost-2.jpg",
      category: "garden-mix",
      quantity: "5kg bag",
      description: "Perfect blend for garden beds and container gardening"
    },
    {
      id: 3,
      name: "Biofertilizer Concentrate",
      seller: "Nature's Best",
      price: 320,
      rating: 4.9,
      reviews: 67,
      location: "Delhi, NCR",
      image: "/placeholder-compost-3.jpg",
      category: "biofertilizer",
      quantity: "1L bottle",
      description: "Liquid biofertilizer for enhanced plant growth and yield"
    },
    {
      id: 4,
      name: "Cocopeat Blocks",
      seller: "EcoGrow Supplies",
      price: 150,
      rating: 4.7,
      reviews: 142,
      location: "Chennai, Tamil Nadu",
      image: "/placeholder-compost-4.jpg",
      category: "cocopeat",
      quantity: "5 blocks",
      description: "100% organic cocopeat for hydroponics and seed starting"
    },
    {
      id: 5,
      name: "Neem Cake Powder",
      seller: "Organic Farm Essentials",
      price: 90,
      rating: 4.5,
      reviews: 78,
      location: "Hyderabad, Telangana",
      image: "/placeholder-compost-5.jpg",
      category: "neem-cake",
      quantity: "1kg pack",
      description: "Natural pest repellent and soil conditioner"
    },
    {
      id: 6,
      name: "Compost Tea Concentrate",
      seller: "Liquid Gold Organics",
      price: 280,
      rating: 4.8,
      reviews: 56,
      location: "Pune, Maharashtra",
      image: "/placeholder-compost-6.jpg",
      category: "compost-tea",
      quantity: "500ml bottle",
      description: "Ready-to-use compost tea for foliar feeding and soil drenching"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'vermicompost', name: 'Vermicompost', icon: Leaf },
    { id: 'garden-mix', name: 'Garden Mix', icon: Sprout },
    { id: 'biofertilizer', name: 'Biofertilizer', icon: TrendingUp },
    { id: 'cocopeat', name: 'Cocopeat', icon: Award }
  ];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const featuredSellers = [
    {
      id: 1,
      name: "Green Earth Composters",
      rating: 4.9,
      products: 24,
      location: "Bangalore"
    },
    {
      id: 2,
      name: "Urban Soil Solutions",
      rating: 4.7,
      products: 18,
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Nature's Best",
      rating: 4.8,
      products: 15,
      location: "Delhi"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-forest to-primary-leaf py-16">
        <div className="container">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Compost Marketplace</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover premium organic compost products from verified sellers across India
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                placeholder="Search products, sellers, or categories..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <button className="px-4 py-3 border border-border rounded-lg flex items-center gap-2 hover:bg-muted transition-colors">
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-dark">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon size={18} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-dark">Featured Sellers</h3>
              <div className="space-y-4">
                {featuredSellers.map(seller => (
                  <div key={seller.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-dark">{seller.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span>{seller.rating}</span>
                        <span>•</span>
                        <span>{seller.products} products</span>
                      </div>
                      <div className="text-xs text-muted flex items-center gap-1">
                        <MapPin size={12} />
                        {seller.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark">
                {filteredProducts.length} Products Found
              </h2>
              <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest First</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="card overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Package size={48} className="text-gray-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-dark">{product.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted text-sm mb-1">{product.seller}</p>
                    
                    <div className="flex items-center gap-1 text-sm text-muted mb-3">
                      <MapPin size={14} />
                      <span>{product.location}</span>
                    </div>
                    
                    <p className="text-muted mb-4">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                        <div className="text-sm text-muted">{product.quantity}</div>
                      </div>
                      <button className="btn btn-primary flex items-center gap-2">
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package size={48} className="text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark mb-2">No products found</h3>
                <p className="text-muted mb-4">Try adjusting your search or filter criteria</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;