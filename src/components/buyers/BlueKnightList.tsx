
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
      console.log('Loaded buyers:', matchedBuyers);
      // Ensure we always set an array, even if the service returns null/undefined
      const buyersArray = Array.isArray(matchedBuyers) ? matchedBuyers : [];
      setAllBuyers(buyersArray);
      setFilteredBuyers(buyersArray); // Initialize filtered buyers as well
    } catch (error) {
      console.error('Error loading matched buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyer data. Please try again.",
        variant: "destructive"
      });
      setAllBuyers([]);
      setFilteredBuyers([]);
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
    // Ensure allBuyers is always an array
    if (!Array.isArray(allBuyers)) {
      console.warn('allBuyers is not an array:', allBuyers);
      setFilteredBuyers([]);
      return;
    }

    let filtered = [...allBuyers]; // Create a copy to avoid mutation

    // Filter by active tab
    filtered = filtered.filter(buyer => {
      return buyer && buyer.type === activeTab;
    });

    // Filter by search value - searching buyer name and description
    if (searchValue && searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const buyerName = (buyer.name || '').toLowerCase();
        const description = (buyer.description || '').toLowerCase();
        
        return buyerName.includes(searchTerm) || 
               description.includes(searchTerm);
      });
    }

    // Apply advanced filters with null safety
    if (filters.hq && filters.hq.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const location = buyer.location || buyer.hq || '';
        return location.toLowerCase().includes(filters.hq.toLowerCase());
      });
    }

    if (filters.employees.min && filters.employees.min.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const employees = buyer.employees || 0;
        const min = parseInt(filters.employees.min);
        return !isNaN(min) && employees >= min;
      });
    }

    if (filters.revenue.min && filters.revenue.min.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const revenue = buyer.revenue || 0;
        const min = parseFloat(filters.revenue.min) * 1000000;
        return !isNaN(min) && revenue >= min;
      });
    }

    if (filters.cash.min && filters.cash.min.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const cash = buyer.cash || 0;
        const min = parseFloat(filters.cash.min) * 1000000;
        return !isNaN(min) && cash >= min;
      });
    }

    if (filters.isPEVCBacked && filters.isPEVCBacked.trim()) {
      const isPEVCBacked = filters.isPEVCBacked === 'true';
      filtered = filtered.filter(buyer => {
        return buyer && buyer.isPEVCBacked === isPEVCBacked;
      });
    }

    if (filters.minimumFitScore && filters.minimumFitScore.trim()) {
      const minScore = parseInt(filters.minimumFitScore);
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const score = buyer.matchingScore || 0;
        return !isNaN(minScore) && score >= minScore;
      });
    }

    if (filters.offering && filters.offering.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const combinedOffering = buyer.combinedOffering || buyer.offering || buyer.rationale?.overall || '';
        return combinedOffering.toLowerCase().includes(filters.offering.toLowerCase());
      });
    }

    if (filters.sectors && filters.sectors.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const sectors = (Array.isArray(buyer.sectors) ? buyer.sectors.join(' ') : '') || buyer.sector || '';
        return sectors.toLowerCase().includes(filters.sectors.toLowerCase());
      });
    }

    if (filters.customers && filters.customers.trim()) {
      filtered = filtered.filter(buyer => {
        if (!buyer) return false;
        const customers = buyer.customers || buyer.rationale?.customers || '';
        return customers.toLowerCase().includes(filters.customers.toLowerCase());
      });
    }

    // Ensure filtered result is always an array
    const finalFiltered = Array.isArray(filtered) ? filtered : [];
    setFilteredBuyers(finalFiltered);
  }, [allBuyers, activeTab, searchValue, filters]);
  
  const handleAddToSaved = (buyerId: string) => {
    if (!buyerId || typeof buyerId !== 'string') {
      console.warn('Invalid buyerId provided to handleAddToSaved:', buyerId);
      return;
    }
    
    const currentSaved = Array.isArray(savedBuyers) ? savedBuyers : [];
    if (!currentSaved.includes(buyerId)) {
      setSavedBuyers(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, buyerId];
      });
      const buyer = filteredBuyers.find(b => b && b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name || 'Buyer'} has been added to your saved list.`
      });
    }
  };

  const toggleRationale = (buyerId: string) => {
    if (!buyerId || typeof buyerId !== 'string') {
      console.warn('Invalid buyerId provided to toggleRationale:', buyerId);
      return;
    }
    
    setExpandedRationales(prev => {
      const currentExpanded = Array.isArray(prev) ? prev : [];
      return currentExpanded.includes(buyerId) 
        ? currentExpanded.filter(id => id !== buyerId) 
        : [...currentExpanded, buyerId];
    });
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

  // Ensure all arrays are properly initialized before rendering
  const safeAllBuyers = Array.isArray(allBuyers) ? allBuyers : [];
  const safeFilteredBuyers = Array.isArray(filteredBuyers) ? filteredBuyers : [];
  const safeSavedBuyers = Array.isArray(savedBuyers) ? savedBuyers : [];
  const safeExpandedRationales = Array.isArray(expandedRationales) ? expandedRationales : [];

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
              buyers={safeAllBuyers}
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
                  buyers={safeFilteredBuyers}
                  savedBuyers={safeSavedBuyers}
                  expandedRationales={safeExpandedRationales}
                  onAddToSaved={handleAddToSaved}
                  toggleRationale={toggleRationale}
                  getMATrackRecordColor={getMATrackRecordColor}
                  listingId={listingId}
                />
              ) : (
                <PEBuyerTable
                  buyers={safeFilteredBuyers}
                  savedBuyers={safeSavedBuyers}
                  expandedRationales={safeExpandedRationales}
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
