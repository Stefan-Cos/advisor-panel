
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Search, Filter, X, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface ListingDetailsProps {
  id: string;
  companyName: string;
  projectTitle: string;
  revenue: string;
  industry: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  revenue,
  industry,
  country,
  status,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const [showFilters, setShowFilters] = useState(true);
  
  // Analytics stats
  const analyticsStats = [
    { 
      label: "Buyer Country Match", 
      value: 13, 
      icon: <PieChart className="h-5 w-5 text-blue-500" /> 
    },
    { 
      label: "Revenue Range Match", 
      value: 8, 
      icon: <PieChart className="h-5 w-5 text-green-500" /> 
    },
    { 
      label: "Industry Match", 
      value: 21, 
      icon: <PieChart className="h-5 w-5 text-purple-500" /> 
    }
  ];

  // Keyword search state
  const [offeringKeywords, setOfferingKeywords] = useState<{value: string, operator: string}[]>([{value: '', operator: 'AND'}]);
  const [sectorKeywords, setSectorKeywords] = useState<{value: string, operator: string}[]>([{value: '', operator: 'AND'}]);
  const [customerKeywords, setCustomerKeywords] = useState<{value: string, operator: string}[]>([{value: '', operator: 'AND'}]);
  
  const { toast } = useToast();

  // Determine which content to show based on the URL path
  const showAIBuyerBuilder = path.includes('/ai-buyer');
  const showSavedList = path.includes('/saved');
  const showCRM = path.includes('/crm');

  // Handle keyword input change
  const handleKeywordChange = (
    index: number,
    category: 'offering' | 'sector' | 'customer',
    field: 'value' | 'operator',
    value: string
  ) => {
    if (category === 'offering') {
      const newKeywords = [...offeringKeywords];
      newKeywords[index] = { ...newKeywords[index], [field]: value };
      setOfferingKeywords(newKeywords);
    } else if (category === 'sector') {
      const newKeywords = [...sectorKeywords];
      newKeywords[index] = { ...newKeywords[index], [field]: value };
      setSectorKeywords(newKeywords);
    } else {
      const newKeywords = [...customerKeywords];
      newKeywords[index] = { ...newKeywords[index], [field]: value };
      setCustomerKeywords(newKeywords);
    }
  };

  // Add new keyword
  const addKeyword = (category: 'offering' | 'sector' | 'customer') => {
    if (category === 'offering') {
      setOfferingKeywords([...offeringKeywords, {value: '', operator: 'AND'}]);
    } else if (category === 'sector') {
      setSectorKeywords([...sectorKeywords, {value: '', operator: 'AND'}]);
    } else {
      setCustomerKeywords([...customerKeywords, {value: '', operator: 'AND'}]);
    }
  };

  // Remove keyword
  const removeKeyword = (category: 'offering' | 'sector' | 'customer', index: number) => {
    if (category === 'offering') {
      const newKeywords = offeringKeywords.filter((_, i) => i !== index);
      setOfferingKeywords(newKeywords.length ? newKeywords : [{value: '', operator: 'AND'}]);
    } else if (category === 'sector') {
      const newKeywords = sectorKeywords.filter((_, i) => i !== index);
      setSectorKeywords(newKeywords.length ? newKeywords : [{value: '', operator: 'AND'}]);
    } else {
      const newKeywords = customerKeywords.filter((_, i) => i !== index);
      setCustomerKeywords(newKeywords.length ? newKeywords : [{value: '', operator: 'AND'}]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied successfully."
    });
  };

  // Horizontal filters for AI Buyer Builder
  const renderHorizontalFilters = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-600" />
            <h3 className="text-sm font-medium">Filter Options</h3>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
            {/* HQ Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                HQ
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Employees Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Employees
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="100">100+</option>
                  <option value="500">500+</option>
                  <option value="1000">1000+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Revenue Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Revenue ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="10">$10M+</option>
                  <option value="50">$50M+</option>
                  <option value="100">$100M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Cash Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cash ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="5">$5M+</option>
                  <option value="10">$10M+</option>
                  <option value="25">$25M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* PE/VC-Backed Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                PE/VC-Backed
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Minimum Fit Score Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minimum Fit Score
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {showFilters && (
          <div>
            <div className="flex items-center mb-2">
              <Search className="h-3.5 w-3.5 mr-2 text-gray-600" />
              <h4 className="text-xs font-medium">Keyword Search</h4>
            </div>
            
            {/* Horizontal keyword search sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Offering Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Offering</h5>
                <div className="space-y-2">
                  {offeringKeywords.map((keyword, index) => (
                    <div key={`offering-${index}`} className="flex items-center space-x-2">
                      {index > 0 && (
                        <select 
                          className="h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white w-20"
                          value={keyword.operator}
                          onChange={(e) => handleKeywordChange(index, 'offering', 'operator', e.target.value)}
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                          <option value="NOT">NOT</option>
                        </select>
                      )}
                      <input
                        type="text"
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md flex-grow"
                        placeholder="Enter offering keyword..."
                        value={keyword.value}
                        onChange={(e) => handleKeywordChange(index, 'offering', 'value', e.target.value)}
                      />
                      <button 
                        onClick={() => removeKeyword('offering', index)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700"
                    onClick={() => addKeyword('offering')}
                  >
                    + Add offering keyword
                  </button>
                </div>
              </div>
              
              {/* Sectors Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Sectors</h5>
                <div className="space-y-2">
                  {sectorKeywords.map((keyword, index) => (
                    <div key={`sector-${index}`} className="flex items-center space-x-2">
                      {index > 0 && (
                        <select 
                          className="h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white w-20"
                          value={keyword.operator}
                          onChange={(e) => handleKeywordChange(index, 'sector', 'operator', e.target.value)}
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                          <option value="NOT">NOT</option>
                        </select>
                      )}
                      <input
                        type="text"
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md flex-grow"
                        placeholder="Enter sector keyword..."
                        value={keyword.value}
                        onChange={(e) => handleKeywordChange(index, 'sector', 'value', e.target.value)}
                      />
                      <button 
                        onClick={() => removeKeyword('sector', index)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700"
                    onClick={() => addKeyword('sector')}
                  >
                    + Add sector keyword
                  </button>
                </div>
              </div>
              
              {/* Customers Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Customers</h5>
                <div className="space-y-2">
                  {customerKeywords.map((keyword, index) => (
                    <div key={`customer-${index}`} className="flex items-center space-x-2">
                      {index > 0 && (
                        <select 
                          className="h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white w-20"
                          value={keyword.operator}
                          onChange={(e) => handleKeywordChange(index, 'customer', 'operator', e.target.value)}
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                          <option value="NOT">NOT</option>
                        </select>
                      )}
                      <input
                        type="text"
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md flex-grow"
                        placeholder="Enter customer keyword..."
                        value={keyword.value}
                        onChange={(e) => handleKeywordChange(index, 'customer', 'value', e.target.value)}
                      />
                      <button 
                        onClick={() => removeKeyword('customer', index)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700"
                    onClick={() => addKeyword('customer')}
                  >
                    + Add customer keyword
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-3">
          <button 
            className="px-3 py-1.5 text-xs font-medium bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full relative">
      <Card>
        <CardContent className="py-3 px-4">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4">
              {analyticsStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-50 p-2 rounded-lg">
                  <div className="mb-1">{stat.icon}</div>
                  <span className="text-xs font-medium text-gray-700 mb-1">{stat.label}</span>
                  <span className="text-lg font-bold text-blueknight-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Show content based on the current route */}
      {showSavedList ? (
        <SavedList listingId={id} />
      ) : showCRM ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
          <p className="text-gray-500 mt-2">
            Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
          </p>
        </div>
      ) : showAIBuyerBuilder ? (
        // AI Buyer Builder content with horizontal filters
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-blueknight-700">AI Buyer Builder</h2>
          </div>
          
          {/* New horizontal filters */}
          {renderHorizontalFilters()}
          
          <BuyerListNew listingId={id} />
        </div>
      ) : (
        // Default content (BlueKnight List)
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-blueknight-700 mb-4">BlueKnight List</h2>
          <BuyerListNew listingId={id} />
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
