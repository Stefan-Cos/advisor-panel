
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const revenueRanges = [
  { label: '$0 - $1M', value: '0-1M' },
  { label: '$1M - $5M', value: '1M-5M' },
  { label: '$5M - $10M', value: '5M-10M' },
  { label: '$10M - $50M', value: '10M-50M' },
  { label: '$50M - $100M', value: '50M-100M' },
  { label: '$100M+', value: '100M+' },
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Energy',
  'Real Estate',
  'Media',
  'Telecommunications',
  'Transportation',
];

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Nigeria',
];

const ListingForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    projectTitle: '',
    revenue: '',
    industry: '',
    country: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (Object.values(formData).some(value => value === '')) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Proceed to next step
    toast({
      title: "Form Submitted",
      description: "Proceeding to buyer preferences",
    });
    
    // Navigate to next page
    navigate('/add-listing/buyer-preferences');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="form-label">Company Name <span className="text-red-500">*</span></label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter company name"
          />
        </div>
        
        <div>
          <label htmlFor="projectTitle" className="form-label">Project Title <span className="text-red-500">*</span></label>
          <input
            id="projectTitle"
            name="projectTitle"
            type="text"
            required
            value={formData.projectTitle}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter project title"
          />
        </div>
        
        <div>
          <label htmlFor="revenue" className="form-label">Revenue Range <span className="text-red-500">*</span></label>
          <select
            id="revenue"
            name="revenue"
            required
            value={formData.revenue}
            onChange={handleChange}
            className="input-field"
          >
            <option value="" disabled>Select revenue range</option>
            {revenueRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="industry" className="form-label">Industry <span className="text-red-500">*</span></label>
          <select
            id="industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleChange}
            className="input-field"
          >
            <option value="" disabled>Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="country" className="form-label">Country of Operation <span className="text-red-500">*</span></label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="input-field"
          >
            <option value="" disabled>Select country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Next: Buyer Preferences
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
