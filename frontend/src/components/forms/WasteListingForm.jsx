import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Leaf, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  Weight, 
  FileText, 
  Image,
  Upload
} from 'lucide-react';
import '../../styles/globals.css';

const WasteListingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    wasteType: 'kitchen',
    quantity: '',
    unit: 'kg',
    frequency: 'daily',
    availability: 'immediate',
    startDate: '',
    endDate: '',
    location: '',
    contactMethod: 'phone',
    contactInfo: '',
    images: [],
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const wasteTypes = [
    { id: 'kitchen', name: 'Kitchen Waste', description: 'Food scraps, peels, leftovers' },
    { id: 'garden', name: 'Garden Waste', description: 'Leaves, grass clippings, plant trimmings' },
    { id: 'commercial', name: 'Commercial Waste', description: 'Restaurant, hotel, or office organic waste' },
    { id: 'agricultural', name: 'Agricultural Waste', description: 'Crop residues, farm organic waste' }
  ];
  
  const units = [
    { id: 'kg', name: 'Kilograms (kg)' },
    { id: 'liters', name: 'Liters (L)' },
    { id: 'bags', name: 'Standard Bags' }
  ];
  
  const frequencies = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'biweekly', name: 'Twice a Week' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'on-demand', name: 'On Demand' }
  ];
  
  const availabilities = [
    { id: 'immediate', name: 'Immediate' },
    { id: 'scheduled', name: 'Scheduled' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid positive number';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - redirect to listings page
      navigate('/waste-listings', {
        state: { message: 'Waste listing created successfully!' }
      });
    } catch (error) {
      console.error('Error creating waste listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.slice(0, 3)] // Limit to 3 images
    }));
  };
  
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Create Waste Listing</h1>
            <p className="text-muted">
              List your organic waste for collection by verified composters
            </p>
          </div>
          
          <div className="card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-dark">Waste Details</h2>
                  <p className="text-muted">Provide accurate information about your waste</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.title ? 'border-error' : 'border-border'
                    }`}
                    placeholder="e.g., Kitchen Waste Collection - Daily"
                  />
                  {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
                </div>
                
                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.description ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Describe your waste in detail - what type, composition, any special considerations..."
                  />
                  {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
                </div>
                
                {/* Waste Type */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Waste Type *
                  </label>
                  <select
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {wasteTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Quantity *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.quantity ? 'border-error' : 'border-border'
                      }`}
                      placeholder="e.g., 10"
                    />
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {units.map(unit => (
                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.quantity && <p className="text-error text-sm mt-1">{errors.quantity}</p>}
                </div>
                
                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Collection Frequency *
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {frequencies.map(freq => (
                      <option key={freq.id} value={freq.id}>{freq.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availabilities.map(avail => (
                      <option key={avail.id} value={avail.id}>{avail.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                  </div>
                </div>
                
                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                  </div>
                </div>
                
                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.location ? 'border-error' : 'border-border'
                      }`}
                      placeholder="e.g., MG Road, Bangalore, Karnataka"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                  </div>
                  {errors.location && <p className="text-error text-sm mt-1">{errors.location}</p>}
                </div>
                
                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Preferred Contact Method *
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                
                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Contact Information *
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.contactInfo ? 'border-error' : 'border-border'
                    }`}
                    placeholder={formData.contactMethod === 'email' ? 'your@email.com' : '+91 XXXXXXXXXX'}
                  />
                  {errors.contactInfo && <p className="text-error text-sm mt-1">{errors.contactInfo}</p>}
                </div>
              </div>
              
              {/* Images Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-dark mb-2">
                  Images (Optional)
                </label>
                <div className="border border-border rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-lg">
                    <Upload className="h-12 w-12 text-muted mb-4" />
                    <p className="text-lg font-medium text-dark mb-2">Upload Images</p>
                    <p className="text-muted mb-4 text-center">Add photos of your waste to help composters understand what you're offering</p>
                    <label className="btn btn-primary cursor-pointer">
                      <FileText size={20} />
                      Choose Files
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="text-sm text-muted mt-2">Max 3 images, JPG/PNG format</p>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <Image className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center"
                          >
                            ×
                          </button>
                          <p className="text-sm text-muted mt-2 truncate">{image.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Terms */}
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 text-primary border-border rounded focus:ring-primary"
                  />
                  <div>
                    <label className="block text-sm font-medium text-dark">
                      I agree to the Terms and Conditions *
                    </label>
                    <p className="text-sm text-muted mt-1">
                      By submitting this listing, I agree to provide accurate information and 
                      comply with SwacchSetu's guidelines for waste listing and collection.
                    </p>
                    {errors.termsAccepted && <p className="text-error text-sm mt-1">{errors.termsAccepted}</p>}
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Listing...
                    </>
                  ) : (
                    <>
                      <Package size={20} />
                      Create Waste Listing
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/waste-listings')}
                  className="btn btn-ghost btn-lg flex-1"
                >
                  Cancel
                </button>
              </div>
              
              {errors.submit && (
                <div className="mt-4 p-4 bg-error/10 border border-error rounded-lg">
                  <p className="text-error">{errors.submit}</p>
                </div>
              )}
            </form>
          </div>
          
          {/* Info Box */}
          <div className="card mt-6 p-6 bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <Leaf className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Why List Your Waste?</h3>
                <p className="text-blue-800">
                  By listing your organic waste on SwacchSetu, you're contributing to a circular 
                  economy that transforms waste into valuable compost, reduces landfill burden, 
                  and creates meaningful environmental impact in your community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteListingForm;