
import { supabase } from "@/integrations/supabase/client";
import { Buyer } from '@/components/buyers/types/BuyerTypes';

export interface MatchedBuyer {
  id: string;
  company_name: string;
  company_website: string;
  website_alpha: string;
  buyer_name: string;
  short_description: string;
  offering_score: number;
  customers_score: number;
  sector_score: number;
  positioning_score: number;
  total_score: string;
  offering_combined: string;
  offering_rationale: string;
  customers_rationale: string;
  prev_transactions_rationale: string;
  financial_strength_rationale: string;
  overall_rationale: string;
  buyer_table_id: string;
  buyer_external_id: string;
  buyer_table_name: string;
  buyer_type: string;
  buyer_description: string;
  buyer_long_description: string;
  hq: string;
  location: string;
  employees: number;
  revenue: number;
  cash: number;
  reported_date: string;
  is_pe_vc_backed: boolean;
  is_public: boolean;
  buyer_website: string;
  sector: string;
  ma_track_record: string;
  buyer_offering: string;
  sectors: string[];
  buyer_customers: string;
  matching_score: number;
  status: string;
  primary_industries: string[];
  keywords: string[];
  target_customer_types: string[];
  parent_company: string;
  aum: number;
  investments: string;
  previous_acquisitions: string;
  investment_type: string[];
  geography: string[];
  investment_size: string;
  ebitda: string;
  industry_focus: string;
  industry_preferences: string[];
  buyer_rationale: any;
  created_at: string;
  updated_at: string;
}

/**
 * Service for fetching matched buyers data from the new matched_buyers table
 */
export class MatchedBuyersService {
  
  static async getMatchedBuyers(): Promise<Buyer[]> {
    try {
      console.log('Fetching from matched_buyers table...');
      
      const { data, error } = await supabase
        .from('matched_buyers')
        .select('*')
        .order('total_score', { ascending: false, nullsFirst: false });
      
      if (error) {
        console.error('Error fetching matched buyers:', error);
        return [];
      }
      
      if (!data || data.length === 0) {
        console.log('No data found in matched_buyers table');
        return [];
      }
      
      console.log(`Successfully fetched ${data.length} matched buyers`);
      
      // Transform the matched buyer data to the Buyer component format
      const transformedBuyers: Buyer[] = data.map((matchedBuyer: any) => ({
        id: matchedBuyer.buyer_table_id || matchedBuyer.id,
        external_id: matchedBuyer.buyer_external_id,
        name: matchedBuyer.buyer_table_name || matchedBuyer.company_name,
        type: matchedBuyer.buyer_type || 'strategic',
        description: matchedBuyer.buyer_description || matchedBuyer.short_description,
        longDescription: matchedBuyer.buyer_long_description,
        hq: matchedBuyer.hq,
        location: matchedBuyer.location,
        employees: matchedBuyer.employees,
        revenue: matchedBuyer.revenue,
        cash: matchedBuyer.cash,
        reportedDate: matchedBuyer.reported_date,
        isPEVCBacked: matchedBuyer.is_pe_vc_backed,
        isPublic: matchedBuyer.is_public,
        website: matchedBuyer.buyer_website || matchedBuyer.company_website,
        sector: matchedBuyer.sector,
        maTrackRecord: matchedBuyer.ma_track_record,
        offering: matchedBuyer.buyer_offering || matchedBuyer.offering_combined,
        sectors: matchedBuyer.sectors,
        customers: matchedBuyer.buyer_customers,
        matchingScore: this.parseMatchScore(matchedBuyer.total_score),
        status: matchedBuyer.status,
        primaryIndustries: matchedBuyer.primary_industries,
        keywords: matchedBuyer.keywords,
        targetCustomerTypes: matchedBuyer.target_customer_types,
        parentCompany: matchedBuyer.parent_company,
        aum: matchedBuyer.aum,
        investments: matchedBuyer.investments,
        previousAcquisitions: matchedBuyer.previous_acquisitions,
        investmentType: matchedBuyer.investment_type,
        geography: matchedBuyer.geography,
        investmentSize: matchedBuyer.investment_size,
        ebitda: matchedBuyer.ebitda,
        industryFocus: matchedBuyer.industry_focus,
        industryPreferences: matchedBuyer.industry_preferences,
        combinedOffering: matchedBuyer.offering_combined,
        rationale: {
          overall: matchedBuyer.overall_rationale || 'Strong strategic alignment based on matching criteria.',
          offering: matchedBuyer.offering_rationale || 'Good offering alignment.',
          customers: matchedBuyer.customers_rationale || 'Customer base aligns well.',
          financialStrength: matchedBuyer.financial_strength_rationale || 'Strong financial profile.',
          previousTransactions: matchedBuyer.prev_transactions_rationale || 'Good transaction history.',
          scores: {
            offering: matchedBuyer.offering_score || 75,
            customers: matchedBuyer.customers_score || 65,
            previousTransactions: matchedBuyer.sector_score || 70,
            financialStrength: matchedBuyer.positioning_score || 68,
            overall: this.parseMatchScore(matchedBuyer.total_score)
          }
        }
      }));
      
      // Remove duplicates based on buyer_table_id, company name, and buyer_table_name
      const uniqueBuyers = this.removeDuplicates(transformedBuyers);
      
      console.log(`Removed ${transformedBuyers.length - uniqueBuyers.length} duplicates, returning ${uniqueBuyers.length} unique buyers`);
      
      return uniqueBuyers;
      
    } catch (error: any) {
      console.error('Exception in getMatchedBuyers:', error);
      return [];
    }
  }
  
  /**
   * Remove duplicate buyers based on ID and company name
   */
  private static removeDuplicates(buyers: Buyer[]): Buyer[] {
    const seen = new Set<string>();
    const uniqueBuyers: Buyer[] = [];
    
    for (const buyer of buyers) {
      // Create multiple unique keys to check for duplicates
      const normalizedName = buyer.name?.toLowerCase().trim() || '';
      const buyerId = buyer.id || 'no-id';
      
      // Create unique keys for different scenarios
      const uniqueKeys = [
        `id-${buyerId}`,
        `name-${normalizedName}`,
        `id-name-${buyerId}-${normalizedName}`
      ];
      
      // Check if any of the unique keys have been seen before
      const isDuplicate = uniqueKeys.some(key => seen.has(key));
      
      if (!isDuplicate && normalizedName !== '') {
        // Add all unique keys to the seen set
        uniqueKeys.forEach(key => seen.add(key));
        uniqueBuyers.push(buyer);
      }
    }
    
    return uniqueBuyers;
  }
  
  /**
   * Parse match score from string to number
   */
  private static parseMatchScore(score: any): number {
    if (typeof score === 'number') return score;
    if (typeof score === 'string') {
      const parsed = parseFloat(score);
      return isNaN(parsed) ? 0 : Math.round(parsed);
    }
    return 0;
  }
  
  /**
   * Refresh the matched_buyers table data
   */
  static async refreshMatchedBuyers(): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('refresh_matched_buyers');
      
      if (error) {
        console.error('Error refreshing matched buyers:', error);
        return false;
      }
      
      console.log('Successfully refreshed matched_buyers table');
      return true;
    } catch (error) {
      console.error('Exception refreshing matched buyers:', error);
      return false;
    }
  }
}
