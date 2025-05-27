
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
  buyer_data: any;
  match_score?: number;
  rationale?: any;
  is_saved?: boolean;
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

// Buyer Search Results operations
export const createBuyerSearchResults = async (results: BuyerSearchResult[]) => {
  const { data, error } = await supabase
    .from('buyer_search_results')
    .insert(results)
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

  return data;
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
