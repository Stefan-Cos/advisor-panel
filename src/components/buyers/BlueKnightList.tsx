import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { strategicBuyers, peBuyers } from './data/mockBuyers';
import { Buyer } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import BlueKnightDescription from '../listings/BlueKnightDescription';
import FilterSidebarToggle from '../listings/ai-builder/FilterSidebarToggle';

// Import the ProcessingAnimation component
import ProcessingAnimation from '../listings/ai-builder/ProcessingAnimation';

interface BlueKnightListProps {
  listingId: string;
}

// Create a session storage key based on the listing ID
const getFirstVisitKey = (listingId: string) => `blueknightlist_first_visit_${listingId}`;

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  
  // Add state to control the first-time animation
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<number>(0);

  useEffect(() => {
    // Check if this is the first visit to this listing's BlueKnight List
    const firstVisitKey = getFirstVisitKey(listingId);
    const hasVisitedBefore = sessionStorage.getItem(firstVisitKey);
    
    if (!hasVisitedBefore) {
      // This is the first visit, show the animation
      setIsFirstVisit(true);
      
      // Start the progress animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setProgressValue(progress);
        
        // Update processing step at certain thresholds
        if (progress >= 20 && processingStep < 1) {
          setProcessingStep(1);
        } else if (progress >= 40 && processingStep < 2) {
          setProcessingStep(2);
        } else if (progress >= 60 && processingStep < 3) {
          setProcessingStep(3);
        } else if (progress >= 80 && processingStep < 4) {
          setProcessingStep(4);
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // After animation completes, mark as visited and show content
          setTimeout(() => {
            sessionStorage.setItem(firstVisitKey, 'true');
            setIsFirstVisit(false);
            loadBuyerData();
          }, 500);
        }
      }, 800); // Slightly faster than AiBuyerBuilder for returning users
      
    } else {
      // Not first visit, load data directly
      setIsFirstVisit(false);
      loadBuyerData();
    }
    
    // Clean up interval on component unmount
    return () => {
      const interval = setInterval(() => {});
      clearInterval(interval);
    };
  }, [listingId]); // Re-run when listingId changes

  // Move the data loading logic to a separate function
  const loadBuyerData = () => {
    setIsLoading(true);
    
    // In a real app, you would fetch this data from an API
    setTimeout(() => {
      const filteredBuyers = activeTab === 'strategic' 
        ? strategicBuyers.filter(buyer => 
            buyer.type === 'strategic' && buyer.matchingScore > 0
          ).sort((a, b) => b.matchingScore - a.matchingScore)
        : peBuyers.filter(buyer =>
            buyer.type === 'pe' && buyer.matchingScore > 0
          ).sort((a, b) => b.matchingScore - a.matchingScore);
      
      setBuyers(filteredBuyers);
      setIsLoading(false);
    }, 300);
  };

  // When tab changes, refresh the data
  useEffect(() => {
    if (!isFirstVisit) {
      loadBuyerData();
    }
  }, [activeTab]);

  // Toggle rationale expansion
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Handle saving a buyer
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      const buyer = buyers.find(b => b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name} has been added to your saved list.`
      });
    }
  };

  // Function to determine color based on M&A track record
  const getMATrackRecordColor = (record: string): string => {
    switch (record.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  // Handler for filter application
  const handleFilterApply = () => {
    // This would normally filter the data based on selected filters
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied to the buyer list."
    });
  };

  // Create a mock scoring configuration for the animation
  const mockScoringConfig = {
    offering: { enabled: true, weight: 80 },
    problemSolved: { enabled: true, weight: 90 },
    useCase: { enabled: true, weight: 70 },
    customerBase: { enabled: true, weight: 85 },
    positioning: { enabled: true, weight: 75 },
    acquisitionHistory: { enabled: true, weight: 95 },
  };

  return (
    <div className="space-y-4" id="blueknight-list-section">
      {/* If it's the first visit, show the processing animation */}
      {isFirstVisit ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 process-animation-placeholder">
          <ProcessingAnimation 
            progressValue={progressValue}
            processingStep={processingStep}
            scoringConfig={mockScoringConfig}
          />
        </div>
      ) : (
        <>
          {/* Filter Sidebar Toggle - moved to the left side */}
          <FilterSidebarToggle 
            filterVisible={filterVisible} 
            toggleFilterSidebar={toggleFilterSidebar}
            onFilterApply={handleFilterApply}
            position="left"
          />
          
          {/* Description component rendered outside the tab-switching area */}
          <BlueKnightDescription />
          
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <BuyerTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                buyers={buyers}
              />
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
              <div>
                {activeTab === 'strategic' ? (
                  <StrategicBuyerTable
                    buyers={buyers}
                    savedBuyers={savedBuyers}
                    expandedRationales={expandedRationales}
                    onAddToSaved={handleAddToSaved}
                    toggleRationale={toggleRationale}
                    getMATrackRecordColor={getMATrackRecordColor}
                    showDescription={false}
                  />
                ) : (
                  <PEBuyerTable
                    buyers={buyers}
                    savedBuyers={savedBuyers}
                    expandedRationales={expandedRationales}
                    onAddToSaved={handleAddToSaved}
                    toggleRationale={toggleRationale}
                    showDescription={false}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlueKnightList;
