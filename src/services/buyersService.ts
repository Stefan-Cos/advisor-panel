
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
  
  // New columns added from migration
  year_founded?: number;
  company_pbid?: string;
  website_https?: string;
  company_linkedin?: string;
  registry_name?: string;
  registration_number?: string;
  legal_name?: string;
  all_industries?: string[];
  primary_industry_code?: string;
  primary_industry_sector?: string;
  primary_industry_group?: string;
  verticals?: string[];
  ownership_status?: string;
  active_investors?: string;
  employee_history?: any;
  net_income?: number;
  net_debt?: number;
  fiscal_period?: string;
  financing_status?: string;
  last_financing_date?: string;
  last_financing_deal_type?: string;
  last_update_date?: string;
  source_file?: string;
  url?: string;
  id_x?: string;
  analyzed_at?: string;
  id_y?: string;
  long_offering?: string;
  long_problem_solved?: string;
  long_use_cases?: string;
  target_customers_description?: string;
  summary?: string;
  category_tag?: string;
  offering_tag?: string;
  short_sentence_broad?: string;
  short_sentence_specific?: string;
  categorisation_offering?: string;
  problem_tag?: string;
  problem_short_sentence_broad?: string;
  problem_short_sentence_specific?: string;
  problem_combined?: string;
  use_case_tag?: string;
  use_case_short_sentence_broad?: string;
  use_case_short_sentence_specific?: string;
  use_case_combined?: string;
  customer_tag?: string;
  customer_short_sentence_broad?: string;
  customer_short_sentence_specific?: string;
  customer_combined?: string;
  target_functional_category?: string;
  target_commercial_category?: string;
  product_service_tags?: string[];
  technology_delivery?: string;
  company_short_description?: string;
  industry_category?: string;
  describe_products_services?: string;
  product_service_features?: string;
  supply_chain_role?: string;
  target_customers_type_new?: string;
  target_customers_industries?: string[];
  investments_last_2_years?: string;
}

export const getBuyersByType = async (type: 'strategic' | 'pe'): Promise<DatabaseBuyer[]> => {
  try {
    // Use direct table access with type assertion as workaround
    const { data, error } = await (supabase as any)
      .from('buyers')
      .select('*')
      .eq('type', type)
      .order('matching_score', { ascending: false });
    
    if (error) {
      console.error('Error fetching buyers by type:', error);
      throw error;
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
    rationale: buyer.rationale,
    
    // Transform new columns
    yearFounded: buyer.year_founded,
    companyPbid: buyer.company_pbid,
    websiteHttps: buyer.website_https,
    companyLinkedin: buyer.company_linkedin,
    registryName: buyer.registry_name,
    registrationNumber: buyer.registration_number,
    legalName: buyer.legal_name,
    allIndustries: buyer.all_industries,
    primaryIndustryCode: buyer.primary_industry_code,
    primaryIndustrySector: buyer.primary_industry_sector,
    primaryIndustryGroup: buyer.primary_industry_group,
    verticals: buyer.verticals,
    ownershipStatus: buyer.ownership_status,
    activeInvestors: buyer.active_investors,
    employeeHistory: buyer.employee_history,
    netIncome: buyer.net_income,
    netDebt: buyer.net_debt,
    fiscalPeriod: buyer.fiscal_period,
    financingStatus: buyer.financing_status,
    lastFinancingDate: buyer.last_financing_date,
    lastFinancingDealType: buyer.last_financing_deal_type,
    lastUpdateDate: buyer.last_update_date,
    sourceFile: buyer.source_file,
    url: buyer.url,
    idX: buyer.id_x,
    analyzedAt: buyer.analyzed_at,
    idY: buyer.id_y,
    longOffering: buyer.long_offering,
    longProblemSolved: buyer.long_problem_solved,
    longUseCases: buyer.long_use_cases,
    targetCustomersDescription: buyer.target_customers_description,
    summary: buyer.summary,
    categoryTag: buyer.category_tag,
    offeringTag: buyer.offering_tag,
    shortSentenceBroad: buyer.short_sentence_broad,
    shortSentenceSpecific: buyer.short_sentence_specific,
    categorisationOffering: buyer.categorisation_offering,
    problemTag: buyer.problem_tag,
    problemShortSentenceBroad: buyer.problem_short_sentence_broad,
    problemShortSentenceSpecific: buyer.problem_short_sentence_specific,
    problemCombined: buyer.problem_combined,
    useCaseTag: buyer.use_case_tag,
    useCaseShortSentenceBroad: buyer.use_case_short_sentence_broad,
    useCaseShortSentenceSpecific: buyer.use_case_short_sentence_specific,
    useCaseCombined: buyer.use_case_combined,
    customerTag: buyer.customer_tag,
    customerShortSentenceBroad: buyer.customer_short_sentence_broad,
    customerShortSentenceSpecific: buyer.customer_short_sentence_specific,
    customerCombined: buyer.customer_combined,
    targetFunctionalCategory: buyer.target_functional_category,
    targetCommercialCategory: buyer.target_commercial_category,
    productServiceTags: buyer.product_service_tags,
    technologyDelivery: buyer.technology_delivery,
    companyShortDescription: buyer.company_short_description,
    industryCategory: buyer.industry_category,
    describeProductsServices: buyer.describe_products_services,
    productServiceFeatures: buyer.product_service_features,
    supplyChainRole: buyer.supply_chain_role,
    targetCustomersTypeNew: buyer.target_customers_type_new,
    targetCustomersIndustries: buyer.target_customers_industries,
    investmentsLast2Years: buyer.investments_last_2_years
  };
};
