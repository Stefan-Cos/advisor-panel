
import { supabase } from "@/integrations/supabase/client";

export interface DatabaseBuyer {
  id: string;
  external_id: string;
  name: string;
  type: 'strategic' | 'pe';
  description?: string;
  long_description?: string;
  hq?: string;
  location?: string;
  employees?: number;
  revenue?: number;
  cash?: number;
  reported_date?: string;
  is_pe_vc_backed?: boolean;
  is_public?: boolean;
  website?: string;
  sector?: string;
  ma_track_record?: string;
  offering?: string;
  sectors?: string[];
  customers?: string;
  matching_score?: number;
  status?: string;
  primary_industries?: string[];
  keywords?: string[];
  target_customer_types?: string[];
  parent_company?: string;
  aum?: number;
  investments?: string;
  previous_acquisitions?: string;
  investment_type?: string[];
  geography?: string[];
  investment_size?: string;
  ebitda?: string;
  industry_focus?: string;
  industry_preferences?: string[];
  rationale?: any;
  created_at?: string;
  updated_at?: string;
}

export const getBuyersByType = async (type: 'strategic' | 'pe'): Promise<DatabaseBuyer[]> => {
  try {
    // Use raw SQL query since TypeScript types haven't been updated yet
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `SELECT * FROM buyers WHERE type = $1 ORDER BY matching_score DESC NULLS LAST`,
      params: [type]
    });

    if (error) {
      console.error('Error fetching buyers by type:', error);
      // Fallback to direct table access with type assertion
      const { data: fallbackData, error: fallbackError } = await (supabase as any)
        .from('buyers')
        .select('*')
        .eq('type', type)
        .order('matching_score', { ascending: false });
      
      if (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
        throw fallbackError;
      }
      
      return fallbackData || [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBuyersByType:', error);
    // Return empty array as fallback
    return [];
  }
};

export const getAllBuyers = async (): Promise<DatabaseBuyer[]> => {
  try {
    // Use direct table access with type assertion as workaround
    const { data, error } = await (supabase as any)
      .from('buyers')
      .select('*')
      .order('matching_score', { ascending: false });

    if (error) {
      console.error('Error fetching all buyers:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllBuyers:', error);
    return [];
  }
};

export const getBuyerById = async (id: string): Promise<DatabaseBuyer | null> => {
  try {
    // Use direct table access with type assertion as workaround
    const { data, error } = await (supabase as any)
      .from('buyers')
      .select('*')
      .eq('external_id', id)
      .single();

    if (error) {
      console.error('Error fetching buyer:', error);
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getBuyerById:', error);
    return null;
  }
};

// Helper function to transform database buyer to the format expected by components
export const transformDatabaseBuyerToComponentFormat = (buyer: DatabaseBuyer): any => {
  return {
    id: buyer.external_id,
    name: buyer.name,
    type: buyer.type,
    description: buyer.description,
    longDescription: buyer.long_description,
    hq: buyer.hq || buyer.location,
    location: buyer.location || buyer.hq,
    employees: buyer.employees,
    revenue: buyer.revenue,
    cash: buyer.cash,
    reportedDate: buyer.reported_date,
    isPEVCBacked: buyer.is_pe_vc_backed,
    isPublic: buyer.is_public,
    website: buyer.website,
    sector: buyer.sector,
    maTrackRecord: buyer.ma_track_record,
    offering: buyer.offering,
    sectors: buyer.sectors,
    customers: buyer.customers,
    matchingScore: buyer.matching_score,
    status: buyer.status,
    primaryIndustries: buyer.primary_industries,
    keywords: buyer.keywords,
    targetCustomerTypes: buyer.target_customer_types,
    parentCompany: buyer.parent_company,
    aum: buyer.aum,
    investments: buyer.investments,
    previousAcquisitions: buyer.previous_acquisitions,
    investmentType: buyer.investment_type,
    geography: buyer.geography,
    investmentSize: buyer.investment_size,
    ebitda: buyer.ebitda,
    industryFocus: buyer.industry_focus,
    industryPreferences: buyer.industry_preferences,
    rationale: buyer.rationale
  };
};
