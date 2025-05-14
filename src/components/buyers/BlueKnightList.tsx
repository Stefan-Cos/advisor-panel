
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { strategicBuyers, peBuyers } from './data/mockBuyers';
import { Buyer } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import BlueKnightDescription from '../listings/BlueKnightDescription';
import FilterSidebar from '../listings/FilterSidebar';
import FilterSidebarToggle from '../listings/ai-builder/FilterSidebarToggle';
import ProcessingAnimation from '../listings/ai-builder/ProcessingAnimation';
import { cn } from '@/lib/utils';

interface BlueKnightListProps {
  listingId: string;
}

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<number>(0);

  // Default scoring config for processing animation
  const defaultScoringConfig = {
    offering: { enabled: true, weight: 100 },
    problemSolved: { enabled: true, weight: 100 },
    useCase: { enabled: true, weight: 100 },
    customerBase: { enabled: true, weight: 100 },
    positioning: { enabled: true, weight: 100 },
    acquisitionHistory: { enabled: true, weight: 100 },
  };

  useEffect(() => {
    // Simulate loading data with processing animation
    setIsLoading(true);
    setProcessingStep(0);
    setProgressValue(0);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
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
          }, 500);
          return 100;
        }
        
        // Update processing step at certain thresholds
        if (newValue >= 20 && processingStep < 1) {
          setProcessingStep(1);
        } else if (newValue >= 40 && processingStep < 2) {
          setProcessingStep(2);
        } else if (newValue >= 60 && processingStep < 3) {
          setProcessingStep(3);
        } else if (newValue >= 80 && processingStep < 4) {
          setProcessingStep(4);
        }
        
        return newValue;
      });
    }, 300); // Reduced timeout for faster loading
    
    return () => {
      clearInterval(interval);
    };
  }, [listingId, activeTab]);

  // Toggle rationale expansion
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
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

  return (
    <div className="space-y-4 relative">
      {/* Filter Sidebar Toggle */}
      <FilterSidebarToggle 
        filterVisible={filterVisible} 
        toggleFilterSidebar={toggleFilterSidebar} 
      />

      {/* Description component rendered outside the tab-switching area */}
      <BlueKnightDescription />
      
      <div className={cn(
        "bg-white shadow-sm rounded-lg border border-gray-200 p-6 transition-all duration-300",
        filterVisible ? "ml-[280px]" : "ml-0"
      )}>
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {isLoading ? (
          <ProcessingAnimation 
            progressValue={progressValue}
            processingStep={processingStep}
            scoringConfig={defaultScoringConfig}
          />
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
    </div>
  );
};

export default BlueKnightList;
