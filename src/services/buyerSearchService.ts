import { supabase } from "@/integrations/supabase/client";

export interface BuyerSearchConfig {
  id?: string;
  project_id: string;
  name: string;
  scoring_config: {
    offering?: { enabled: boolean; weight: number };
    problemSolved?: { enabled: boolean; weight: number };
    useCase?: { enabled: boolean; weight: number };
    customerBase?: { enabled: boolean; weight: number };
    positioning?: { enabled: boolean; weight: number };
    acquisitionHistory?: { enabled: boolean; weight: number };
  };
  filters?: any;
}

export interface SavedBuyerSearch {
  id?: string;
  project_id: string;
  search_config_id?: string;
  name: string;
  search_criteria: any;
  results_count?: number;
}

export interface BuyerSearchResult {
  id?: string;
  saved_search_id: string;
  buyer_external_id?: string;
  buyer_name?: string;
  buyer_type?: string;
  hq?: string;
  location?: string;
  website?: string;
  employees?: number;
  revenue?: number;
  cash?: number;
  aum?: number;
  ebitda?: string;
  description?: string;
  long_description?: string;
  offering?: string;
  sector?: string;
  industry_focus?: string;
  customers?: string;
  target_customer_types?: string;
  primary_industries?: string;
  sectors?: string;
  keywords?: string;
  ma_track_record?: string;
  previous_acquisitions?: string;
  investments?: string;
  investment_size?: string;
  investment_type?: string;
  geography?: string;
  industry_preferences?: string;
  parent_company?: string;
  is_public?: boolean;
  is_pe_vc_backed?: boolean;
  reported_date?: string;
  matching_score?: number;
  overall_rationale?: string;
  offering_rationale?: string;
  customers_rationale?: string;
  financial_rationale?: string;
  transactions_rationale?: string;
  status?: string;
  match_score?: number;
  rationale?: any;
  is_saved?: boolean;
  buyer_data?: any; // Keep for backward compatibility
}

export interface SavedBuyer {
  id?: string;
  project_id: string;
  buyer_id: string;
  buyer_data: any;
  notes?: string;
  status?: string;
}

// Buyer Search Configuration operations
export const createBuyerSearchConfig = async (config: BuyerSearchConfig) => {
  const { data, error } = await supabase
    .from('buyer_search_configs')
    .insert([{
      project_id: config.project_id,
      name: config.name,
      scoring_config: config.scoring_config,
      filters: config.filters || {}
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating buyer search config:', error);
    throw error;
  }

  return data;
};

export const getBuyerSearchConfigs = async (projectId: string) => {
  const { data, error } = await supabase
    .from('buyer_search_configs')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching buyer search configs:', error);
    throw error;
  }

  return data;
};

// Saved Buyer Search operations
export const createSavedBuyerSearch = async (search: SavedBuyerSearch) => {
  const { data, error } = await supabase
    .from('saved_buyer_searches')
    .insert([{
      project_id: search.project_id,
      search_config_id: search.search_config_id,
      name: search.name,
      search_criteria: search.search_criteria,
      results_count: search.results_count || 0
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating saved buyer search:', error);
    throw error;
  }

  return data;
};

export const getSavedBuyerSearches = async (projectId: string) => {
  const { data, error } = await supabase
    .from('saved_buyer_searches')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved buyer searches:', error);
    throw error;
  }

  return data;
};

export const deleteSavedBuyerSearch = async (searchId: string) => {
  // First delete all related buyer search results
  const { error: resultsError } = await supabase
    .from('buyer_search_results')
    .delete()
    .eq('saved_search_id', searchId);

  if (resultsError) {
    console.error('Error deleting buyer search results:', resultsError);
    throw resultsError;
  }

  // Then delete the saved search itself
  const { error } = await supabase
    .from('saved_buyer_searches')
    .delete()
    .eq('id', searchId);

  if (error) {
    console.error('Error deleting saved buyer search:', error);
    throw error;
  }
};

// Buyer Search Results operations - Updated to use flattened columns
export const createBuyerSearchResults = async (results: BuyerSearchResult[]) => {
  const flattenedResults = results.map(result => ({
    saved_search_id: result.saved_search_id,
    buyer_external_id: result.buyer_external_id,
    buyer_name: result.buyer_name,
    buyer_type: result.buyer_type,
    hq: result.hq,
    location: result.location,
    website: result.website,
    employees: result.employees,
    revenue: result.revenue,
    cash: result.cash,
    aum: result.aum,
    ebitda: result.ebitda,
    description: result.description,
    long_description: result.long_description,
    offering: result.offering,
    sector: result.sector,
    industry_focus: result.industry_focus,
    customers: result.customers,
    target_customer_types: result.target_customer_types,
    primary_industries: result.primary_industries,
    sectors: result.sectors,
    keywords: result.keywords,
    ma_track_record: result.ma_track_record,
    previous_acquisitions: result.previous_acquisitions,
    investments: result.investments,
    investment_size: result.investment_size,
    investment_type: result.investment_type,
    geography: result.geography,
    industry_preferences: result.industry_preferences,
    parent_company: result.parent_company,
    is_public: result.is_public,
    is_pe_vc_backed: result.is_pe_vc_backed,
    reported_date: result.reported_date,
    matching_score: result.matching_score,
    overall_rationale: result.overall_rationale,
    offering_rationale: result.offering_rationale,
    customers_rationale: result.customers_rationale,
    financial_rationale: result.financial_rationale,
    transactions_rationale: result.transactions_rationale,
    status: result.status,
    match_score: result.match_score,
    rationale: result.rationale,
    is_saved: result.is_saved,
    buyer_data: null // Set to null since we're using individual columns now
  }));

  const { data, error } = await supabase
    .from('buyer_search_results')
    .insert(flattenedResults)
    .select();

  if (error) {
    console.error('Error creating buyer search results:', error);
    throw error;
  }

  return data;
};

export const getBuyerSearchResults = async (savedSearchId: string) => {
  const { data, error } = await supabase
    .from('buyer_search_results')
    .select('*')
    .eq('saved_search_id', savedSearchId)
    .order('match_score', { ascending: false });

  if (error) {
    console.error('Error fetching buyer search results:', error);
    throw error;
  }

  // Transform the flattened data back to the expected format for display
  return data.map(result => ({
    ...result,
    buyer_data: {
      id: result.buyer_external_id,
      name: result.buyer_name,
      type: result.buyer_type,
      hq: result.hq,
      location: result.location,
      website: result.website,
      employees: result.employees,
      revenue: result.revenue,
      cash: result.cash,
      aum: result.aum,
      ebitda: result.ebitda,
      description: result.description,
      longDescription: result.long_description,
      offering: result.offering,
      sector: result.sector,
      industryFocus: result.industry_focus,
      customers: result.customers,
      targetCustomerTypes: result.target_customer_types?.split(', ') || [],
      primaryIndustries: result.primary_industries?.split(', ') || [],
      sectors: result.sectors?.split(', ') || [],
      keywords: result.keywords?.split(', ') || [],
      maTrackRecord: result.ma_track_record,
      previousAcquisitions: result.previous_acquisitions,
      investments: result.investments,
      investmentSize: result.investment_size,
      investmentType: result.investment_type?.split(', ') || [],
      geography: result.geography?.split(', ') || [],
      industryPreferences: result.industry_preferences?.split(', ') || [],
      parentCompany: result.parent_company,
      isPublic: result.is_public,
      isPEVCBacked: result.is_pe_vc_backed,
      reportedDate: result.reported_date,
      matchingScore: result.matching_score,
      rationale: {
        overall: result.overall_rationale,
        offering: result.offering_rationale,
        customers: result.customers_rationale,
        financialStrength: result.financial_rationale,
        previousTransactions: result.transactions_rationale
      },
      status: result.status
    }
  }));
};

// Saved Buyers operations
export const saveBuyer = async (buyer: SavedBuyer) => {
  const { data, error } = await supabase
    .from('saved_buyers')
    .upsert([{
      project_id: buyer.project_id,
      buyer_id: buyer.buyer_id,
      buyer_data: buyer.buyer_data,
      notes: buyer.notes,
      status: buyer.status || 'saved'
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving buyer:', error);
    throw error;
  }

  return data;
};

export const getSavedBuyers = async (projectId: string) => {
  const { data, error } = await supabase
    .from('saved_buyers')
    .select('*')
    .eq('project_id', projectId)
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved buyers:', error);
    throw error;
  }

  return data;
};

export const removeSavedBuyer = async (projectId: string, buyerId: string) => {
  const { error } = await supabase
    .from('saved_buyers')
    .delete()
    .eq('project_id', projectId)
    .eq('buyer_id', buyerId);

  if (error) {
    console.error('Error removing saved buyer:', error);
    throw error;
  }
};
