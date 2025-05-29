
import { supabase } from "@/integrations/supabase/client";
import { getBuyersFromMatching, transformMatchingBuyerToComponentFormat } from './matchingService';

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
  
  // New columns with correct quoted names
  "Year Founded"?: number;
  "Company PBId"?: string;
  "Website Https"?: string;
  "Company LinkedIn"?: string;
  "Registry Name"?: string;
  "Registration Number"?: string;
  "Legal Name"?: string;
  "All Industries"?: string[];
  "Primary Industry Code"?: string;
  "Primary Industry Sector"?: string;
  "Primary Industry Group"?: string;
  "Verticals"?: string[];
  "Ownership Status"?: string;
  "Active Investors"?: string;
  "Employee History"?: any;
  "Net Income"?: number;
  "Net Debt"?: number;
  "Fiscal Period"?: string;
  "Financing Status"?: string;
  "Last Financing Date"?: string;
  "Last Financing Deal Type"?: string;
  "Last Update Date"?: string;
  "SourceFile"?: string;
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
  target_customers_type?: string;
  target_customers_industries?: string[];
  "Investments in the last 2 Years"?: string;
}

export const getBuyersByType = async (type: 'strategic' | 'pe'): Promise<DatabaseBuyer[]> => {
  try {
    console.log(`Fetching buyers for type: ${type}`);
    
    // First try to get buyers from the matching table
    const matchingBuyers = await getBuyersFromMatching();
    console.log(`Got ${matchingBuyers.length} buyers from matching table`);
    
    if (matchingBuyers.length > 0) {
      // Transform matching buyers to DatabaseBuyer format
      const transformedBuyers = matchingBuyers.map(buyer => {
        const transformed = transformMatchingBuyerToComponentFormat(buyer);
        return {
          id: transformed.id,
          external_id: transformed.id,
          name: transformed.name,
          type: type as 'strategic' | 'pe', // Properly cast the type
          description: transformed.description,
          long_description: transformed.longDescription,
          hq: transformed.hq,
          location: transformed.location,
          employees: transformed.employees,
          revenue: transformed.revenue,
          cash: transformed.cash,
          reported_date: transformed.reportedDate,
          is_pe_vc_backed: transformed.isPEVCBacked,
          is_public: transformed.isPublic,
          website: transformed.website,
          sector: transformed.sector,
          ma_track_record: transformed.maTrackRecord,
          offering: transformed.offering,
          sectors: transformed.sectors,
          customers: transformed.customers,
          matching_score: transformed.matchingScore,
          status: transformed.status,
          primary_industries: transformed.primaryIndustries,
          keywords: transformed.keywords,
          target_customer_types: transformed.targetCustomerTypes,
          parent_company: transformed.parentCompany,
          aum: transformed.aum,
          investments: transformed.investments,
          previous_acquisitions: transformed.previousAcquisitions,
          investment_type: transformed.investmentType,
          geography: transformed.geography,
          investment_size: transformed.investmentSize,
          ebitda: transformed.ebitda,
          industry_focus: transformed.industryFocus,
          industry_preferences: transformed.industryPreferences,
          rationale: transformed.rationale,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as DatabaseBuyer;
      });
      
      console.log(`Successfully transformed ${transformedBuyers.length} buyers from matching table for type: ${type}`);
      return transformedBuyers;
    }
    
    // Fallback to original buyers table if matching table is empty
    console.log('Matching table is empty, falling back to buyers table');
    const { data, error } = await (supabase as any)
      .from('buyers')
      .select('*')
      .eq('type', type)
      .order('matching_score', { ascending: false });
    
    if (error) {
      console.error('Error fetching buyers by type:', error);
      throw error;
    }
    
    console.log(`Fetched ${data?.length || 0} buyers from buyers table`);
    return data || [];
  } catch (error) {
    console.error('Error in getBuyersByType:', error);
    return [];
  }
};

export const getAllBuyers = async (): Promise<DatabaseBuyer[]> => {
  try {
    // First try to get buyers from the matching table
    const matchingBuyers = await getBuyersFromMatching();
    
    if (matchingBuyers.length > 0) {
      // Transform matching buyers to DatabaseBuyer format
      const transformedBuyers = matchingBuyers.map(buyer => {
        const transformed = transformMatchingBuyerToComponentFormat(buyer);
        return {
          id: transformed.id,
          external_id: transformed.id,
          name: transformed.name,
          type: 'strategic' as 'strategic' | 'pe', // Properly cast the type
          description: transformed.description,
          long_description: transformed.longDescription,
          hq: transformed.hq,
          location: transformed.location,
          employees: transformed.employees,
          revenue: transformed.revenue,
          cash: transformed.cash,
          reported_date: transformed.reportedDate,
          is_pe_vc_backed: transformed.isPEVCBacked,
          is_public: transformed.isPublic,
          website: transformed.website,
          sector: transformed.sector,
          ma_track_record: transformed.maTrackRecord,
          offering: transformed.offering,
          sectors: transformed.sectors,
          customers: transformed.customers,
          matching_score: transformed.matchingScore,
          status: transformed.status,
          primary_industries: transformed.primaryIndustries,
          keywords: transformed.keywords,
          target_customer_types: transformed.targetCustomerTypes,
          parent_company: transformed.parentCompany,
          aum: transformed.aum,
          investments: transformed.investments,
          previous_acquisitions: transformed.previousAcquisitions,
          investment_type: transformed.investmentType,
          geography: transformed.geography,
          investment_size: transformed.investmentSize,
          ebitda: transformed.ebitda,
          industry_focus: transformed.industryFocus,
          industry_preferences: transformed.industryPreferences,
          rationale: transformed.rationale,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as DatabaseBuyer;
      });
      
      console.log(`Loaded ${transformedBuyers.length} buyers from matching table`);
      return transformedBuyers;
    }
    
    // Fallback to original buyers table if matching table is empty
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
    
    // Transform new columns with quoted names
    yearFounded: buyer["Year Founded"],
    companyPbid: buyer["Company PBId"],
    websiteHttps: buyer["Website Https"],
    companyLinkedin: buyer["Company LinkedIn"],
    registryName: buyer["Registry Name"],
    registrationNumber: buyer["Registration Number"],
    legalName: buyer["Legal Name"],
    allIndustries: buyer["All Industries"],
    primaryIndustryCode: buyer["Primary Industry Code"],
    primaryIndustrySector: buyer["Primary Industry Sector"],
    primaryIndustryGroup: buyer["Primary Industry Group"],
    verticals: buyer["Verticals"],
    ownershipStatus: buyer["Ownership Status"],
    activeInvestors: buyer["Active Investors"],
    employeeHistory: buyer["Employee History"],
    netIncome: buyer["Net Income"],
    netDebt: buyer["Net Debt"],
    fiscalPeriod: buyer["Fiscal Period"],
    financingStatus: buyer["Financing Status"],
    lastFinancingDate: buyer["Last Financing Date"],
    lastFinancingDealType: buyer["Last Financing Deal Type"],
    lastUpdateDate: buyer["Last Update Date"],
    sourceFile: buyer["SourceFile"],
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
    targetCustomersTypeNew: buyer.target_customers_type,
    targetCustomersIndustries: buyer.target_customers_industries,
    investmentsLast2Years: buyer["Investments in the last 2 Years"]
  };
};
