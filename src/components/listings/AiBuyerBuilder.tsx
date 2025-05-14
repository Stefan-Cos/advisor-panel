
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Settings, Save } from 'lucide-react';
import BuyerFilter from '../buyers/components/BuyerFilter';

// Import components
import ProcessingAnimation from './ai-builder/ProcessingAnimation';
import ScoringConfiguration from './ai-builder/ScoringConfiguration';
import MatchedResults from './ai-builder/MatchedResults';
import SavedSearchesList from './ai-builder/SavedSearchesList';
import SavedSearchDetails from './ai-builder/SavedSearchDetails';
import FilterSidebarToggle from './ai-builder/FilterSidebarToggle';

// Import saved search service
import { 
  savedSearches, 
  getFormattedSavedSearchBuyers 
} from './ai-builder/savedSearchService';

interface AiBuyerBuilderProps {
  listingId: string;
}

const AiBuyerBuilder: React.FC<AiBuyerBuilderProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<string>("scoring");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState<string | null>(null);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [processingStep, setProcessingStep] = useState<number>(0);
  
  // Scoring configuration state
  const [scoringConfig, setScoringConfig] = useState({
    offering: {
      enabled: true,
      weight: 100,
    },
    problemSolved: {
      enabled: true,
      weight: 100,
    },
    useCase: {
      enabled: true,
      weight: 100,
    },
    customerBase: {
      enabled: true,
      weight: 100,
    },
    positioning: {
      enabled: true,
      weight: 100,
    },
    acquisitionHistory: {
      enabled: true,
      weight: 100,
    },
  });

  // Handle saving a buyer
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "This buyer has been added to your saved list."
      });
    }
  };

  // Handle expanding a buyer rationale
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Handle scoring config toggle
  const handleConfigToggle = (key: keyof typeof scoringConfig, value: boolean) => {
    setScoringConfig(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: value
      }
    }));
  };

  // Handle scoring weight change
  const handleWeightChange = (key: keyof typeof scoringConfig, value: number[]) => {
    setScoringConfig(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        weight: value[0]
      }
    }));
  };

  // Apply scoring configuration
  const applyScoring = () => {
    setProcessing(true);
    setProgressValue(0);
    setProcessingStep(0);
    
    // Simulate AI processing with multiple steps
    const interval = setInterval(() => {
      setProgressValue(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setProcessing(false);
            setShowMatches(true);
            toast({
              title: "Scoring Configuration Applied",
              description: "Your buyer match scoring has been applied successfully."
            });
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
    }, 1000); // Update every second for a total of ~10 seconds
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  // Handler for filter application
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied successfully."
    });
  };

  // Handle saving a search
  const handleSaveSearch = (searchName: string) => {
    toast({
      title: "Search Saved",
      description: `"${searchName}" has been saved successfully.`
    });
  };

  // Handle clicking on a saved search
  const handleLoadSavedSearch = (id: string) => {
    setSelectedSavedSearch(id);
    
    toast({
      title: "Saved Search Loaded",
      description: `Loaded search: ${savedSearches.find(s => s.id === id)?.name}`
    });
  };

  // Handle reconfiguring the AI settings
  const handleReconfigure = () => {
    setShowMatches(false);
    setActiveTab("scoring");
  };

  // Reset to initial state when returning to scoring tab
  useEffect(() => {
    if (activeTab === "scoring") {
      setShowMatches(false);
      setSelectedSavedSearch(null);
    }
  }, [activeTab]);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Filter Sidebar Toggle with BuyerFilter component */}
      <FilterSidebarToggle 
        filterVisible={filterVisible} 
        toggleFilterSidebar={toggleFilterSidebar} 
      />
      
      {/* Filter Sidebar Content Injection */}
      {filterVisible && (
        <BuyerFilter
          onFilterApply={handleFilterApply}
          onClose={toggleFilterSidebar}
        />
      )}
      
      <Tabs defaultValue="scoring" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-gray-200">
          <div className="px-4 py-2">
            <TabsList className="grid grid-cols-2 h-9">
              <TabsTrigger value="scoring" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Configure AI Scoring
              </TabsTrigger>
              <TabsTrigger value="searches" className="text-xs">
                <Save className="h-3 w-3 mr-1" />
                Saved Searches
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div>
          <TabsContent value="scoring" className="p-0 m-0">
            {processing ? (
              <ProcessingAnimation 
                progressValue={progressValue}
                processingStep={processingStep}
                scoringConfig={scoringConfig}
              />
            ) : showMatches ? (
              <MatchedResults 
                listingId={listingId}
                handleSaveSearch={handleSaveSearch}
                handleReconfigure={handleReconfigure}
              />
            ) : (
              <ScoringConfiguration 
                scoringConfig={scoringConfig}
                handleConfigToggle={handleConfigToggle}
                handleWeightChange={handleWeightChange}
                applyScoring={applyScoring}
              />
            )}
          </TabsContent>
          
          <TabsContent value="searches" className="p-0 m-0">
            {selectedSavedSearch ? (
              <SavedSearchDetails 
                selectedSearch={savedSearches.find(s => s.id === selectedSavedSearch)!}
                buyers={getFormattedSavedSearchBuyers(selectedSavedSearch)}
                savedBuyers={savedBuyers}
                expandedRationales={expandedRationales}
                onBack={() => setSelectedSavedSearch(null)}
                onAddToSaved={handleAddToSaved}
                toggleRationale={toggleRationale}
              />
            ) : (
              <SavedSearchesList 
                savedSearches={savedSearches}
                onSelectSearch={handleLoadSavedSearch}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AiBuyerBuilder;
