
import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import BuyerCard from './BuyerCard';
import { useToast } from "@/hooks/use-toast";

interface BuyerListProps {
  listingId: string;
}

// Sample data
const strategicBuyers = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic' as const,
    location: 'USA',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors'
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic' as const,
    location: 'UK',
    sector: 'Healthcare, Technology',
    offering: 'Software solutions, Consulting',
    customers: 'Hospitals, Research institutions'
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic' as const,
    location: 'Germany',
    sector: 'Medical software, Services',
    offering: 'Health management platforms',
    customers: 'Healthcare providers, Clinics'
  },
  {
    id: 'buyer4',
    name: 'BioTech Ventures',
    type: 'strategic' as const,
    location: 'Canada',
    sector: 'Biotechnology, Research',
    offering: 'Data analytics, Clinical solutions',
    customers: 'Pharmaceutical companies, Research labs'
  }
];

const peBuyers = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe' as const,
    location: 'UK',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors'
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe' as const,
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    offering: 'Capital investment, Strategic guidance',
    customers: 'Healthcare innovators, Technology startups'
  },
  {
    id: 'buyer7',
    name: 'Life Sciences Equity',
    type: 'pe' as const,
    location: 'Switzerland',
    sector: 'Biotech, Pharmaceutical',
    offering: 'Growth capital, Operational expertise',
    customers: 'Emerging biotech firms, Research platforms'
  },
  {
    id: 'buyer8',
    name: 'Health Innovation Capital',
    type: 'pe' as const,
    location: 'Australia',
    sector: 'Medical devices, Healthcare IT',
    offering: 'Expansion funding, Market access',
    customers: 'Medical technology providers, Healthcare networks'
  }
];

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
    setShowFilters(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('strategic')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'strategic' 
                  ? 'bg-blueknight-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Strategic Buyers
            </button>
            <button 
              onClick={() => setActiveTab('pe')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'pe' 
                  ? 'bg-blueknight-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PE Funds
            </button>
          </div>
          
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter Options
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select className="input-field">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector
                </label>
                <select className="input-field">
                  <option value="">All Sectors</option>
                  <option value="Medtech">Medtech</option>
                  <option value="Life sciences">Life Sciences</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Fit Score
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select className="input-field">
                  <option value="fit">Fit Score (High to Low)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buyers.map(buyer => (
            <BuyerCard
              key={buyer.id}
              {...buyer}
              addedToSaved={savedBuyers.includes(buyer.id)}
              onAddToSaved={handleAddToSaved}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerList;
