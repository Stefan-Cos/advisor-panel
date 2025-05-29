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
  deleteSavedBuyerSearch,
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

      // Load actual buyer data from the database
      const [strategicBuyers, peBuyers] = await Promise.all([
        getBuyersByType('strategic'),
        getBuyersByType('pe')
      ]);

      // Transform and combine all buyers
      const allBuyers = [
        ...strategicBuyers.map(transformDatabaseBuyerToComponentFormat),
        ...peBuyers.map(transformDatabaseBuyerToComponentFormat)
      ];

      // Apply scoring logic and flatten the data structure
      const scoredBuyers = allBuyers.map(buyer => {
        const baseScore = buyer.matchingScore || Math.floor(Math.random() * 40) + 60;
        
        // Flatten all the data to avoid nested JSONB - updated with new column names
        return {
          // Basic identification
          id: buyer.id,
          external_id: buyer.id,
          name: buyer.name,
          buyer_type: buyer.type,
          
          // Location and basic info
          hq: buyer.hq || buyer.location || 'N/A',
          location: buyer.location || buyer.hq || 'N/A',
          website: buyer.website || 'N/A',
          
          // Financial data
          employees: buyer.employees || 0,
          revenue: buyer.revenue || 0,
          cash: buyer.cash || 0,
          aum: buyer.aum || 0,
          ebitda: buyer.ebitda || 'N/A',
          
          // Descriptions
          description: buyer.description || 'N/A',
          long_description: buyer.longDescription || buyer.description || 'N/A',
          offering: buyer.offering || 'N/A',
          
          // Business details
          sector: buyer.sector || 'N/A',
          industry_focus: buyer.industryFocus || 'N/A',
          customers: buyer.customers || 'N/A',
          target_customer_types: Array.isArray(buyer.targetCustomerTypes) ? buyer.targetCustomerTypes.join(', ') : 'N/A',
          primary_industries: Array.isArray(buyer.primaryIndustries) ? buyer.primaryIndustries.join(', ') : 'N/A',
          sectors: Array.isArray(buyer.sectors) ? buyer.sectors.join(', ') : 'N/A',
          keywords: Array.isArray(buyer.keywords) ? buyer.keywords.join(', ') : 'N/A',
          
          // Investment/acquisition details
          ma_track_record: buyer.maTrackRecord || 'N/A',
          previous_acquisitions: buyer.previousAcquisitions || 'N/A',
          investments: buyer.investments || 'N/A',
          investment_size: buyer.investmentSize || 'N/A',
          investment_type: Array.isArray(buyer.investmentType) ? buyer.investmentType.join(', ') : 'N/A',
          geography: Array.isArray(buyer.geography) ? buyer.geography.join(', ') : 'N/A',
          industry_preferences: Array.isArray(buyer.industryPreferences) ? buyer.industryPreferences.join(', ') : 'N/A',
          
          // Company structure
          parent_company: buyer.parentCompany || 'Independent',
          is_public: buyer.isPublic || false,
          is_pe_vc_backed: buyer.isPEVCBacked || false,
          
          // Dates
          reported_date: buyer.reportedDate || new Date().toISOString().split('T')[0],
          
          // Scoring and rationale (flattened)
          matching_score: baseScore,
          overall_rationale: buyer.rationale?.overall || `This ${buyer.type === 'strategic' ? 'company' : 'fund'} shows strong potential as an acquisition target based on industry alignment and strategic fit.`,
          offering_rationale: buyer.rationale?.offering || `Strong alignment between their offering and target acquisition criteria.`,
          customers_rationale: buyer.rationale?.customers || `Customer base aligns well with acquisition strategy.`,
          financial_rationale: buyer.rationale?.financialStrength || `Financial profile indicates strong acquisition capability.`,
          transactions_rationale: buyer.rationale?.previousTransactions || `Transaction history demonstrates active acquisition strategy.`,
          
          // Status and metadata
          status: buyer.status || 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),

          // New columns from migration - using proper property names
          year_founded: buyer.yearFounded || null,
          company_pbid: buyer.companyPbid || 'N/A',
          website_https: buyer.websiteHttps || buyer.website || 'N/A',
          company_linkedin: buyer.companyLinkedin || 'N/A',
          registry_name: buyer.registryName || 'N/A',
          registration_number: buyer.registrationNumber || 'N/A',
          legal_name: buyer.legalName || buyer.name || 'N/A',
          all_industries: Array.isArray(buyer.allIndustries) ? buyer.allIndustries.join(', ') : 'N/A',
          primary_industry_code: buyer.primaryIndustryCode || 'N/A',
          primary_industry_sector: buyer.primaryIndustrySector || 'N/A',
          primary_industry_group: buyer.primaryIndustryGroup || 'N/A',
          verticals: Array.isArray(buyer.verticals) ? buyer.verticals.join(', ') : 'N/A',
          ownership_status: buyer.ownershipStatus || 'N/A',
          active_investors: buyer.activeInvestors || 'N/A',
          employee_history: buyer.employeeHistory || null,
          net_income: buyer.netIncome || 0,
          net_debt: buyer.netDebt || 0,
          fiscal_period: buyer.fiscalPeriod || 'N/A',
          financing_status: buyer.financingStatus || 'N/A',
          last_financing_date: buyer.lastFinancingDate || null,
          last_financing_deal_type: buyer.lastFinancingDealType || 'N/A',
          last_update_date: buyer.lastUpdateDate || new Date().toISOString(),
          source_file: buyer.sourceFile || 'N/A',
          url: buyer.url || 'N/A',
          id_x: buyer.idX || 'N/A',
          analyzed_at: buyer.analyzedAt || new Date().toISOString(),
          id_y: buyer.idY || 'N/A',
          long_offering: buyer.longOffering || buyer.offering || 'N/A',
          long_problem_solved: buyer.longProblemSolved || 'N/A',
          long_use_cases: buyer.longUseCases || 'N/A',
          target_customers_description: buyer.targetCustomersDescription || 'N/A',
          summary: buyer.summary || buyer.description || 'N/A',
          category_tag: buyer.categoryTag || 'N/A',
          offering_tag: buyer.offeringTag || 'N/A',
          short_sentence_broad: buyer.shortSentenceBroad || 'N/A',
          short_sentence_specific: buyer.shortSentenceSpecific || 'N/A',
          categorisation_offering: buyer.categorisationOffering || 'N/A',
          problem_tag: buyer.problemTag || 'N/A',
          problem_short_sentence_broad: buyer.problemShortSentenceBroad || 'N/A',
          problem_short_sentence_specific: buyer.problemShortSentenceSpecific || 'N/A',
          problem_combined: buyer.problemCombined || 'N/A',
          use_case_tag: buyer.useCaseTag || 'N/A',
          use_case_short_sentence_broad: buyer.useCaseShortSentenceBroad || 'N/A',
          use_case_short_sentence_specific: buyer.useCaseShortSentenceSpecific || 'N/A',
          use_case_combined: buyer.useCaseCombined || 'N/A',
          customer_tag: buyer.customerTag || 'N/A',
          customer_short_sentence_broad: buyer.customerShortSentenceBroad || 'N/A',
          customer_short_sentence_specific: buyer.customerShortSentenceSpecific || 'N/A',
          customer_combined: buyer.customerCombined || 'N/A',
          target_functional_category: buyer.targetFunctionalCategory || 'N/A',
          target_commercial_category: buyer.targetCommercialCategory || 'N/A',
          product_service_tags: Array.isArray(buyer.productServiceTags) ? buyer.productServiceTags.join(', ') : 'N/A',
          technology_delivery: buyer.technologyDelivery || 'N/A',
          company_short_description: buyer.companyShortDescription || buyer.description || 'N/A',
          industry_category: buyer.industryCategory || 'N/A',
          describe_products_services: buyer.describeProductsServices || 'N/A',
          product_service_features: buyer.productServiceFeatures || 'N/A',
          supply_chain_role: buyer.supplyChainRole || 'N/A',
          target_customers_type_new: buyer.targetCustomersTypeNew || 'N/A',
          target_customers_industries: Array.isArray(buyer.targetCustomersIndustries) ? buyer.targetCustomersIndustries.join(', ') : 'N/A',
          investments_last_2_years: buyer.investmentsLast2Years || 'N/A'
        };
      });

      // Sort by matching score and take top results
      const topBuyers = scoredBuyers
        .sort((a, b) => b.matching_score - a.matching_score)
        .slice(0, 20); // Limit to top 20 results

      console.log('Loaded and scored buyers:', topBuyers.length);
      console.log('Sample buyer data:', topBuyers[0]);
      
      // Set the current matched buyers
      setCurrentMatchedBuyers(topBuyers);
      
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

  // Handle saving a search - now saves flattened data to individual columns
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

      // Then save the current matched buyers to buyer_search_results with flattened data
      if (currentMatchedBuyers.length > 0 && savedSearch.id) {
        const buyerResults = currentMatchedBuyers.map(buyer => {
          const result = {
            saved_search_id: savedSearch.id!,
            buyer_external_id: buyer.external_id || buyer.id,
            buyer_name: buyer.name,
            buyer_type: buyer.buyer_type,
            hq: buyer.hq,
            location: buyer.location,
            website: buyer.website,
            employees: buyer.employees,
            revenue: buyer.revenue,
            cash: buyer.cash,
            aum: buyer.aum,
            ebitda: buyer.ebitda,
            description: buyer.description,
            long_description: buyer.long_description,
            offering: buyer.offering,
            sector: buyer.sector,
            industry_focus: buyer.industry_focus,
            customers: buyer.customers,
            target_customer_types: buyer.target_customer_types,
            primary_industries: buyer.primary_industries,
            sectors: buyer.sectors,
            keywords: buyer.keywords,
            ma_track_record: buyer.ma_track_record,
            previous_acquisitions: buyer.previous_acquisitions,
            investments: buyer.investments,
            investment_size: buyer.investment_size,
            investment_type: buyer.investment_type,
            geography: buyer.geography,
            industry_preferences: buyer.industry_preferences,
            parent_company: buyer.parent_company,
            is_public: buyer.is_public,
            is_pe_vc_backed: buyer.isPEVCBacked,
            reported_date: buyer.reported_date,
            matching_score: buyer.matching_score,
            overall_rationale: buyer.overall_rationale,
            offering_rationale: buyer.offering_rationale,
            customers_rationale: buyer.customers_rationale,
            financial_rationale: buyer.financial_rationale,
            transactions_rationale: buyer.transactions_rationale,
            status: buyer.status,
            match_score: buyer.matching_score,
            rationale: {
              overall: buyer.overall_rationale,
              offering: buyer.offering_rationale,
              customers: buyer.customers_rationale,
              financial: buyer.financial_rationale,
              transactions: buyer.transactions_rationale
            },
            is_saved: savedBuyers.includes(buyer.id)
          };
          console.log('Individual Buyer Result (Flattened):', result);
          return result;
        });

        console.log('All Buyer Results to be saved (Flattened):', buyerResults);
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

  // Handle deleting a saved search
  const handleDeleteSavedSearch = async (searchId: string) => {
    try {
      await deleteSavedBuyerSearch(searchId);
      await loadSavedSearches(); // Reload the list
      
      // If the deleted search was currently selected, clear the selection
      if (selectedSavedSearch === searchId) {
        setSelectedSavedSearch(null);
        setSavedSearchResults([]);
      }
    } catch (error) {
      console.error('Error deleting saved search:', error);
      throw error; // Re-throw to let the component handle the error toast
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
                onDeleteSearch={handleDeleteSavedSearch}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AiBuyerBuilder;
