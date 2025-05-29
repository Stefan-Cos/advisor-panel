import { supabase } from "@/integrations/supabase/client";
import { Buyer } from '@/components/buyers/types/BuyerTypes';

// Simplified interface to avoid deep type instantiation
interface SimpleBuyer {
  id: string;
  external_id?: string;
  name: string;
  type: string;
  description?: string;
  longDescription?: string;
  hq?: string;
  location?: string;
  employees?: number;
  revenue?: number;
  cash?: number;
  reportedDate?: string;
  isPEVCBacked?: boolean;
  isPublic?: boolean;
  website?: string;
  sector?: string;
  maTrackRecord?: string;
  offering?: string;
  sectors?: string[];
  customers?: string;
  matchingScore?: number;
  status?: string;
  primaryIndustries?: string[];
  keywords?: string[];
  targetCustomerTypes?: string[];
  parentCompany?: string;
  aum?: number;
  investments?: string;
  previousAcquisitions?: string;
  investmentType?: string[];
  geography?: string[];
  investmentSize?: string;
  ebitda?: string;
  industryFocus?: string;
  industryPreferences?: string[];
  combinedOffering?: string;
  rationale?: {
    overall?: string;
    offering?: string;
    customers?: string;
    financialStrength?: string;
    previousTransactions?: string;
    scores?: {
      offering?: number;
      customers?: number;
      previousTransactions?: number;
      financialStrength?: number;
      overall?: number;
    };
  };
}

export interface SavedBuyer {
  id: string;
  project_id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_type: string;
  buyer_data: SimpleBuyer;
  saved_at: string;
  updated_at: string;
  rank?: number | null;
  feedback?: string | null;
}

/**
 * Normalizes a website URL for comparison
 */
function normalizeWebsite(website: string | null | undefined): string {
  if (!website) return '';
  
  let normalized = website.toLowerCase().trim();
  
  // Remove protocol
  normalized = normalized.replace(/^https?:\/\//, '');
  
  // Remove www prefix
  normalized = normalized.replace(/^www\./, '');
  
  // Remove trailing slash and path
  normalized = normalized.split('/')[0];
  
  // Remove common subdomains that might vary
  normalized = normalized.replace(/^(app|admin|portal|dashboard)\./, '');
  
  return normalized;
}

// Simplified types to avoid deep instantiation
interface UpdateResult {
  updated: number;
  errors: string[];
}

interface RelationshipStats {
  totalMatching: number;
  linkedRecords: number;
  unlinkedRecords: number;
  linkageRate: number;
}

/**
 * Service for managing relationships between matching records and buyers
 */
export class BuyerRelationshipService {
  
  /**
   * Updates buyer relationships using website matching first, then name matching
   */
  static async updateAllRelationships(): Promise<UpdateResult> {
    try {
      console.log('Starting comprehensive buyer relationship update...');
      
      let totalUpdated = 0;
      const allErrors: string[] = [];
      
      // First, try website-based matching
      const websiteResult = await this.updateRelationshipsByWebsite();
      totalUpdated += websiteResult.updated;
      allErrors.push(...websiteResult.errors);
      
      // Then, try name-based matching for remaining unlinked records
      const nameResult = await this.updateRelationshipsByName();
      totalUpdated += nameResult.updated;
      allErrors.push(...nameResult.errors);
      
      console.log(`Total relationships updated: ${totalUpdated}, Total errors: ${allErrors.length}`);
      return { updated: totalUpdated, errors: allErrors };
      
    } catch (error: any) {
      console.error('Error in comprehensive relationship update:', error);
      return { updated: 0, errors: [error.message] };
    }
  }
  
  /**
   * Updates buyer relationships using website matching
   */
  static async updateRelationshipsByWebsite(): Promise<UpdateResult> {
    try {
      console.log('Starting website-based buyer relationship update...');
      
      // Get all matching records without buyer_id that have website data
      const { data: unmatchedRecords, error: fetchError } = await supabase
        .from('matching')
        .select('*')
        .is('buyer_id', null)
        .or('website_alpha.neq.null,Company Website.neq.null');
      
      if (fetchError) {
        throw fetchError;
      }
      
      console.log(`Found ${unmatchedRecords?.length || 0} unmatched records with website data`);
      
      let updated = 0;
      const errors: string[] = [];
      
      // Get all buyers with their website data for comparison
      const { data: allBuyers, error: buyersError } = await supabase
        .from('buyers')
        .select('id, name, website, website_https');
      
      if (buyersError) {
        throw buyersError;
      }
      
      console.log(`Found ${allBuyers?.length || 0} buyers to match against`);
      
      // Process each unmatched record
      for (const record of unmatchedRecords || []) {
        try {
          const matchingWebsite = normalizeWebsite(record['website_alpha'] || record['Company Website']);
          
          if (!matchingWebsite) {
            console.log(`No website data for matching record: ${record['Company Name']}`);
            continue;
          }
          
          // Find buyer by website match
          const matchedBuyer = allBuyers?.find(buyer => {
            const buyerWebsite1 = normalizeWebsite(buyer.website);
            const buyerWebsite2 = normalizeWebsite(buyer.website_https);
            
            return buyerWebsite1 === matchingWebsite || buyerWebsite2 === matchingWebsite;
          });
          
          if (matchedBuyer) {
            // Update the matching record with the found buyer_id
            const { error: updateError } = await supabase
              .from('matching')
              .update({ buyer_id: matchedBuyer.id })
              .eq('Company Name', record['Company Name']);
            
            if (updateError) {
              errors.push(`Error updating record for "${record['Company Name']}": ${updateError.message}`);
            } else {
              updated++;
              console.log(`Successfully linked "${record['Company Name']}" to buyer "${matchedBuyer.name}" via website match`);
            }
          } else {
            console.log(`No buyer found for website "${matchingWebsite}" (${record['Company Name']})`);
          }
        } catch (error: any) {
          errors.push(`Exception processing record: ${error.message}`);
        }
      }
      
      console.log(`Website-based update completed: ${updated} updated, ${errors.length} errors`);
      return { updated, errors };
      
    } catch (error: any) {
      console.error('Error in website-based relationship update:', error);
      return { updated: 0, errors: [error.message] };
    }
  }
  
  /**
   * Updates buyer relationships using name matching (fallback method)
   */
  static async updateRelationshipsByName(): Promise<UpdateResult> {
    try {
      console.log('Starting name-based buyer relationship update...');
      
      // Get all matching records without buyer_id
      const { data: unmatchedRecords, error: fetchError } = await supabase
        .from('matching')
        .select('*')
        .is('buyer_id', null)
        .not('Company Name', 'is', null);
      
      if (fetchError) {
        throw fetchError;
      }
      
      console.log(`Found ${unmatchedRecords?.length || 0} unmatched records for name-based matching`);
      
      let updated = 0;
      const errors: string[] = [];
      
      // Process each record using the existing database function
      for (const record of unmatchedRecords || []) {
        try {
          const companyName = record['Company Name'] || record['Buyer Name'];
          if (!companyName) continue;
          
          // Use the database function to find a matching buyer
          const { data: buyerId, error: findError } = await supabase
            .rpc('find_buyer_by_name', { company_name: companyName });
          
          if (findError) {
            errors.push(`Error finding buyer for "${companyName}": ${findError.message}`);
            continue;
          }
          
          if (buyerId) {
            // Update the matching record with the found buyer_id
            const { error: updateError } = await supabase
              .from('matching')
              .update({ buyer_id: buyerId })
              .eq('Company Name', record['Company Name']);
            
            if (updateError) {
              errors.push(`Error updating record for "${companyName}": ${updateError.message}`);
            } else {
              updated++;
              console.log(`Successfully linked "${companyName}" to buyer ${buyerId} via name match`);
            }
          }
        } catch (error: any) {
          errors.push(`Exception processing record: ${error.message}`);
        }
      }
      
      console.log(`Name-based update completed: ${updated} updated, ${errors.length} errors`);
      return { updated, errors };
      
    } catch (error: any) {
      console.error('Error in name-based relationship update:', error);
      return { updated: 0, errors: [error.message] };
    }
  }
  
  /**
   * Links a specific matching record to a buyer by ID
   */
  static async linkMatchingToBuyer(matchingId: string, buyerId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('matching')
        .update({ buyer_id: buyerId })
        .eq('id', matchingId);
      
      if (error) {
        console.error('Error linking matching to buyer:', error);
        return false;
      }
      
      console.log(`Successfully linked matching record ${matchingId} to buyer ${buyerId}`);
      return true;
    } catch (error) {
      console.error('Exception linking matching to buyer:', error);
      return false;
    }
  }
  
  /**
   * Gets statistics about the current relationship state
   */
  static async getRelationshipStats(): Promise<RelationshipStats> {
    try {
      // Get total count
      const { count: totalCount } = await supabase
        .from('matching')
        .select('*', { count: 'exact', head: true });
      
      const { count: linkedCount } = await supabase
        .from('matching')
        .select('*', { count: 'exact', head: true })
        .not('buyer_id', 'is', null);
      
      const totalMatching = totalCount || 0;
      const linkedRecords = linkedCount || 0;
      const unlinkedRecords = totalMatching - linkedRecords;
      const linkageRate = totalMatching > 0 ? Math.round((linkedRecords / totalMatching * 100) * 100) / 100 : 0;
      
      return {
        totalMatching,
        linkedRecords,
        unlinkedRecords,
        linkageRate
      };
    } catch (error) {
      console.error('Error getting relationship stats:', error);
      return {
        totalMatching: 0,
        linkedRecords: 0,
        unlinkedRecords: 0,
        linkageRate: 0
      };
    }
  }
}
