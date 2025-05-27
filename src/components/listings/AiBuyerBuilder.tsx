
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Settings, Save } from 'lucide-react';

// Import components
import ProcessingAnimation from './ai-builder/ProcessingAnimation';
import ScoringConfiguration from './ai-builder/ScoringConfiguration';
import MatchedResults from './ai-builder/MatchedResults';
import SavedSearchesList from './ai-builder/SavedSearchesList';
import SavedSearchDetails from './ai-builder/SavedSearchDetails';
import FilterSidebarToggle from './ai-builder/FilterSidebarToggle';

// Import services
import { 
  createBuyerSearchConfig,
  createSavedBuyerSearch,
  getSavedBuyerSearches,
  getBuyerSearchResults,
  saveBuyer,
  getSavedBuyers,
  createBuyerSearchResults,
  BuyerSearchConfig
} from '@/services/buyerSearchService';

import { getBuyersByType, transformDatabaseBuyerToComponentFormat } from '@/services/buyersService';

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
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [savedSearchResults, setSavedSearchResults] = useState<any[]>([]);
  const [currentMatchedBuyers, setCurrentMatchedBuyers] = useState<any[]>([]);
  
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

  // Load saved searches and saved buyers on component mount
  useEffect(() => {
    loadSavedSearches();
    loadSavedBuyers();
  }, [listingId]);

  const loadSavedSearches = async () => {
    try {
      const searches = await getSavedBuyerSearches(listingId);
      setSavedSearches(searches.map(search => ({
        id: search.id,
        name: search.name,
        date: new Date(search.created_at).toLocaleDateString(),
        filters: search.search_criteria
      })));
    } catch (error) {
      console.error('Error loading saved searches:', error);
    }
  };

  const loadSavedBuyers = async () => {
    try {
      const buyers = await getSavedBuyers(listingId);
      setSavedBuyers(buyers.map(buyer => buyer.buyer_id));
    } catch (error) {
      console.error('Error loading saved buyers:', error);
    }
  };

  // Handle saving a buyer
  const handleAddToSaved = async (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      try {
        // Create a mock buyer data structure for now
        const buyerData = {
          id: buyerId,
          name: `Buyer ${buyerId}`,
          // Add other mock data as needed
        };

        await saveBuyer({
          project_id: listingId,
          buyer_id: buyerId,
          buyer_data: buyerData
        });

        setSavedBuyers(prev => [...prev, buyerId]);
        toast({
          title: "Buyer Saved",
          description: "This buyer has been added to your saved list."
        });
      } catch (error) {
        console.error('Error saving buyer:', error);
        toast({
          title: "Error",
          description: "Failed to save buyer. Please try again.",
          variant: "destructive"
        });
      }
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
  const applyScoring = async () => {
    setProcessing(true);
    setProgressValue(0);
    setProcessingStep(0);
    
    try {
      // Save the scoring configuration
      const configName = `Config ${new Date().toISOString()}`;
      await createBuyerSearchConfig({
        project_id: listingId,
        name: configName,
        scoring_config: scoringConfig
      });

      console.log('Scoring configuration saved:', scoringConfig);
    } catch (error) {
      console.error('Error saving scoring configuration:', error);
    }
    
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

  // Handle saving a search - now also saves results to buyer_search_results
  const handleSaveSearch = async (searchName: string) => {
    console.log('=== SAVE SEARCH BUTTON CLICKED ===');
    console.log('Search Name:', searchName);
    console.log('Listing ID:', listingId);
    console.log('Scoring Config:', scoringConfig);
    console.log('Current Matched Buyers Count:', currentMatchedBuyers.length);
    console.log('Current Matched Buyers Data:', currentMatchedBuyers);
    console.log('Saved Buyers List:', savedBuyers);
    
    try {
      // First save the search configuration
      const searchCriteria = { scoringConfig };
      console.log('Search Criteria to be saved:', searchCriteria);
      
      const savedSearchPayload = {
        project_id: listingId,
        name: searchName,
        search_criteria: searchCriteria
      };
      console.log('Saved Search Payload:', savedSearchPayload);
      
      const savedSearch = await createSavedBuyerSearch(savedSearchPayload);
      console.log('Saved Search Response:', savedSearch);

      // Then save the current matched buyers to buyer_search_results
      if (currentMatchedBuyers.length > 0 && savedSearch.id) {
        const buyerResults = currentMatchedBuyers.map(buyer => {
          const result = {
            saved_search_id: savedSearch.id!,
            buyer_data: buyer,
            match_score: buyer.matchingScore || Math.floor(Math.random() * 40) + 60,
            rationale: buyer.rationale || null,
            is_saved: savedBuyers.includes(buyer.id)
          };
          console.log('Individual Buyer Result:', result);
          return result;
        });

        console.log('All Buyer Results to be saved:', buyerResults);
        const buyerResultsResponse = await createBuyerSearchResults(buyerResults);
        console.log('Buyer Results Save Response:', buyerResultsResponse);
      } else {
        console.log('No buyers to save or savedSearch.id is missing');
        console.log('currentMatchedBuyers.length:', currentMatchedBuyers.length);
        console.log('savedSearch.id:', savedSearch.id);
      }

      await loadSavedSearches();
      
      toast({
        title: "Search Saved",
        description: `"${searchName}" has been saved with ${currentMatchedBuyers.length} buyer results.`
      });
      
      console.log('=== SAVE SEARCH COMPLETED SUCCESSFULLY ===');
    } catch (error) {
      console.error('=== ERROR SAVING SEARCH ===');
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: "Failed to save search. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle clicking on a saved search
  const handleLoadSavedSearch = async (id: string) => {
    try {
      setSelectedSavedSearch(id);
      
      // Load search results
      const results = await getBuyerSearchResults(id);
      setSavedSearchResults(results.map(result => result.buyer_data));
      
      const selectedSearch = savedSearches.find(s => s.id === id);
      toast({
        title: "Saved Search Loaded",
        description: `Loaded search: ${selectedSearch?.name}`
      });
    } catch (error) {
      console.error('Error loading saved search:', error);
      toast({
        title: "Error",
        description: "Failed to load saved search.",
        variant: "destructive"
      });
    }
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
    <div className="bg-white shadow-sm rounded-lg border border-gray-200" id="ai-buyer-builder-section">
      {/* Filter Sidebar Toggle with BuyerFilter component directly embedded */}
      <FilterSidebarToggle 
        filterVisible={filterVisible} 
        toggleFilterSidebar={toggleFilterSidebar}
        onFilterApply={handleFilterApply}
      />
      
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
                buyers={savedSearchResults}
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
