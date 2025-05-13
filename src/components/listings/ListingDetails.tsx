
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Search, Filter, SlidersHorizontal, Bot, ChevronDown, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import AIAssistantChat from '../ui/AIAssistantChat';
import BuyerFilter from '../buyers/components/BuyerFilter';
import { cn } from '@/lib/utils';

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
  const [activeKeywordSection, setActiveKeywordSection] = useState<string | null>(null);
  
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

  // Determine which content to show based on the URL path
  const showAIBuyerBuilder = path.includes('/ai-buyer');
  const showSavedList = path.includes('/saved');
  const showCRM = path.includes('/crm');

  const handleFilterApply = () => {
    // This function will be passed to the filter component
  };

  const toggleKeywordSection = (section: string) => {
    if (activeKeywordSection === section) {
      setActiveKeywordSection(null);
    } else {
      setActiveKeywordSection(section);
    }
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
          <div className="space-y-3">
            <div className="flex items-center mb-1">
              <Search className="h-3.5 w-3.5 mr-2 text-gray-600" />
              <h4 className="text-xs font-medium">Keyword Search</h4>
            </div>
            
            {/* Offering Keywords */}
            <div className="mb-2">
              <button
                onClick={() => toggleKeywordSection('offering')}
                className="flex items-center justify-between w-full text-xs font-medium text-gray-700 bg-gray-50 p-2 rounded"
              >
                <span>Offering</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-gray-500 transition-transform", activeKeywordSection === 'offering' && "transform rotate-180")} />
              </button>
              {activeKeywordSection === 'offering' && (
                <div className="mt-2 p-2 border border-gray-200 rounded-md bg-white">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Enter offering keyword..."
                      className="flex-1 text-xs p-1.5 border border-gray-300 rounded-md"
                    />
                    <button className="ml-1 p-1 text-gray-400 hover:text-gray-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700">
                    + Add offering keyword
                  </button>
                </div>
              )}
            </div>
            
            {/* Sectors Keywords */}
            <div className="mb-2">
              <button
                onClick={() => toggleKeywordSection('sectors')}
                className="flex items-center justify-between w-full text-xs font-medium text-gray-700 bg-gray-50 p-2 rounded"
              >
                <span>Sectors</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-gray-500 transition-transform", activeKeywordSection === 'sectors' && "transform rotate-180")} />
              </button>
              {activeKeywordSection === 'sectors' && (
                <div className="mt-2 p-2 border border-gray-200 rounded-md bg-white">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Enter sector keyword..."
                      className="flex-1 text-xs p-1.5 border border-gray-300 rounded-md"
                    />
                    <button className="ml-1 p-1 text-gray-400 hover:text-gray-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700">
                    + Add sector keyword
                  </button>
                </div>
              )}
            </div>
            
            {/* Customers Keywords */}
            <div className="mb-2">
              <button
                onClick={() => toggleKeywordSection('customers')}
                className="flex items-center justify-between w-full text-xs font-medium text-gray-700 bg-gray-50 p-2 rounded"
              >
                <span>Customers</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-gray-500 transition-transform", activeKeywordSection === 'customers' && "transform rotate-180")} />
              </button>
              {activeKeywordSection === 'customers' && (
                <div className="mt-2 p-2 border border-gray-200 rounded-md bg-white">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Enter customer keyword..."
                      className="flex-1 text-xs p-1.5 border border-gray-300 rounded-md"
                    />
                    <button className="ml-1 p-1 text-gray-400 hover:text-gray-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button className="text-xs text-blueknight-600 font-medium hover:text-blueknight-700">
                    + Add customer keyword
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-3">
          <button 
            className="px-3 py-1.5 text-xs font-medium bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
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
            <div className="flex gap-2">
              <button className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs bg-blueknight-100 text-blueknight-700 rounded-md hover:bg-blueknight-200">
                <Bot className="h-3.5 w-3.5" />
                <span>AI Assistant</span>
              </button>
              <button className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Advanced</span>
              </button>
            </div>
          </div>
          
          {/* New horizontal filters */}
          {renderHorizontalFilters()}
          
          <div className="space-y-1 text-xs mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Active filters:</span>
              <button className="text-blueknight-600 hover:text-blueknight-800 text-xs font-medium">Clear all</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                Match: 75%+
                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                Revenue: $50M+
                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
              </span>
            </div>
          </div>
          
          <BuyerListNew listingId={id} />
        </div>
      ) : (
        // Default content (BlueKnight List)
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-blueknight-700 mb-4">BlueKnight List</h2>
          <BuyerListNew listingId={id} />
        </div>
      )}
      
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
