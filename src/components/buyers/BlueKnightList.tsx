import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { MatchedBuyersService } from '@/services/matchedBuyersService';
import { Buyer } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import BuyerSearch from './components/BuyerSearch';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import FilterSidebarToggle from '../listings/ai-builder/FilterSidebarToggle';
import BlueKnightFilterSidebar from './components/BlueKnightFilterSidebar';
import { getMATrackRecordColor } from './utils/buyerUtils';

interface BlueKnightListProps {
  listingId: string;
}

interface FilterState {
  hq: string;
  employees: {
    min: string;
    max: string;
  };
  revenue: {
    min: string;
    max: string;
  };
  cash: {
    min: string;
    max: string;
  };
  isPEVCBacked: string;
  minimumFitScore: string;
  offering: string;
  sectors: string;
  customers: string;
}

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [allBuyers, setAllBuyers] = useState<Buyer[]>([]);
  const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    hq: '',
    employees: {
      min: '',
      max: ''
    },
    revenue: {
      min: '',
      max: ''
    },
    cash: {
      min: '',
      max: ''
    },
    isPEVCBacked: '',
    minimumFitScore: '',
    offering: '',
    sectors: '',
    customers: ''
  });
  
  // Load buyer data from the new matched_buyers table
  const loadBuyerData = async () => {
    setIsLoading(true);
    
    try {
      const matchedBuyers = await MatchedBuyersService.getMatchedBuyers();
      setAllBuyers(matchedBuyers);
    } catch (error) {
      console.error('Error loading matched buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyer data. Please try again.",
        variant: "destructive"
      });
      setAllBuyers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadBuyerData();
  }, []);

  // Apply all filters (search, tab, and advanced filters)
  useEffect(() => {
    let filtered = allBuyers;

    // Filter by active tab
    filtered = filtered.filter(buyer => buyer.type === activeTab);

    // Filter by search value - now properly searching company name
    if (searchValue) {
      const searchTerm = searchValue.toLowerCase().trim();
      filtered = filtered.filter(buyer => {
        const buyerName = (buyer.name || '').toLowerCase();
        const companyName = (buyer.company_name || '').toLowerCase();
        const description = (buyer.description || '').toLowerCase();
        
        return buyerName.includes(searchTerm) || 
               companyName.includes(searchTerm) || 
               description.includes(searchTerm);
      });
    }

    // Apply advanced filters
    if (filters.hq) {
      filtered = filtered.filter(buyer => {
        const location = buyer.location || buyer.hq || '';
        return location.toLowerCase().includes(filters.hq.toLowerCase());
      });
    }

    if (filters.employees.min) {
      filtered = filtered.filter(buyer => {
        const employees = buyer.employees || 0;
        const min = parseInt(filters.employees.min);
        return employees >= min;
      });
    }

    if (filters.revenue.min) {
      filtered = filtered.filter(buyer => {
        const revenue = buyer.revenue || 0;
        const min = parseFloat(filters.revenue.min) * 1000000; // Convert to actual value
        return revenue >= min;
      });
    }

    if (filters.cash.min) {
      filtered = filtered.filter(buyer => {
        const cash = buyer.cash || 0;
        const min = parseFloat(filters.cash.min) * 1000000; // Convert to actual value
        return cash >= min;
      });
    }

    if (filters.isPEVCBacked) {
      const isPEVCBacked = filters.isPEVCBacked === 'true';
      filtered = filtered.filter(buyer => buyer.isPEVCBacked === isPEVCBacked);
    }

    if (filters.minimumFitScore) {
      const minScore = parseInt(filters.minimumFitScore);
      filtered = filtered.filter(buyer => {
        const score = buyer.matchingScore || 0;
        return score >= minScore;
      });
    }

    if (filters.offering) {
      filtered = filtered.filter(buyer => {
        const combinedOffering = buyer.combinedOffering || buyer.offering || buyer.rationale?.overall || '';
        return combinedOffering.toLowerCase().includes(filters.offering.toLowerCase());
      });
    }

    if (filters.sectors) {
      filtered = filtered.filter(buyer => {
        const sectors = buyer.sectors?.join(' ') || buyer.sector || '';
        return sectors.toLowerCase().includes(filters.sectors.toLowerCase());
      });
    }

    if (filters.customers) {
      filtered = filtered.filter(buyer => {
        const customers = buyer.customers || buyer.rationale?.customers || '';
        return customers.toLowerCase().includes(filters.customers.toLowerCase());
      });
    }

    setFilteredBuyers(filtered);
  }, [allBuyers, activeTab, searchValue, filters]);
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      const buyer = filteredBuyers.find(b => b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name} has been added to your saved list.`
      });
    }
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied successfully."
    });
  };

  const handleClearFilters = () => {
    setFilters({
      hq: '',
      employees: {
        min: '',
        max: ''
      },
      revenue: {
        min: '',
        max: ''
      },
      cash: {
        min: '',
        max: ''
      },
      isPEVCBacked: '',
      minimumFitScore: '',
      offering: '',
      sectors: '',
      customers: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been cleared."
    });
  };

  return (
    <div className="animate-fade-in relative">
      {/* Filter Sidebar Toggle */}
      <FilterSidebarToggle
        filterVisible={filterVisible}
        toggleFilterSidebar={toggleFilterSidebar}
        onFilterApply={handleFilterApply}
        position="left"
      />

      {/* Custom Filter Sidebar */}
      <BlueKnightFilterSidebar
        isVisible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleFilterApply}
        onClearFilters={handleClearFilters}
      />

      {/* Main content with conditional left margin */}
      <div className={`transition-all duration-300 ${filterVisible ? 'ml-[280px]' : 'ml-0'}`}>
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <BuyerTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              buyers={allBuyers}
            />
          </div>
          
          <div className="mb-4">
            <BuyerSearch searchValue={searchValue} onSearchChange={setSearchValue} />
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'strategic' ? (
                <StrategicBuyerTable 
                  buyers={filteredBuyers}
                  savedBuyers={savedBuyers}
                  expandedRationales={expandedRationales}
                  onAddToSaved={handleAddToSaved}
                  toggleRationale={toggleRationale}
                  getMATrackRecordColor={getMATrackRecordColor}
                  listingId={listingId}
                />
              ) : (
                <PEBuyerTable
                  buyers={filteredBuyers}
                  savedBuyers={savedBuyers}
                  expandedRationales={expandedRationales}
                  onAddToSaved={handleAddToSaved}
                  toggleRationale={toggleRationale}
                  listingId={listingId}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlueKnightList;
