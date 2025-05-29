
import { supabase } from "@/integrations/supabase/client";
import type { MatchingBuyer } from "./types";
import { normalizeWebsite, parseMatchScore } from "./utils";
import { MatchingDataService } from "./dataService";
import { transformMatchingBuyerToComponentFormat } from "./transformer";

/**
 * Service for linking matching records with buyers
 */
export class MatchingLinkingService {
  
  /**
   * Enhanced function to get linked buyer data using improved website and name matching
   */
  static async getLinkedBuyerData() {
    try {
      console.log('Fetching linked buyer data using improved matching strategies...');
      
      // First, try to get matching records with their linked buyers using the buyer_id foreign key
      const { data: matchingWithBuyers, error: matchingError } = await supabase
        .from('matching')
        .select(`
          *,
          buyers!buyer_id (*)
        `)
        .order('Total III', { ascending: false, nullsFirst: false });
      
      if (matchingError) {
        console.error('Error fetching linked data:', matchingError);
        // Fallback to old method if new relationship fails
        return await this.getLinkedBuyerDataFallback();
      }
      
      console.log(`Found ${matchingWithBuyers?.length || 0} matching records`);
      
      if (!matchingWithBuyers || matchingWithBuyers.length === 0) {
        console.log('No linked data found, falling back to manual matching');
        return await this.getLinkedBuyerDataFallback();
      }
      
      // Transform the data, handling both linked and unlinked records
      const linkedData = matchingWithBuyers.map(matchingRecord => {
        const matchingBuyer = matchingRecord as MatchingBuyer;
        const linkedBuyer = (matchingRecord as any).buyers;
        
        if (linkedBuyer) {
          console.log(`Successfully linked matching record "${matchingBuyer["Company Name"]}" with buyer "${linkedBuyer.name}"`);
          
          // Merge the data, prioritizing matching table for scores and rationale
          return {
            ...linkedBuyer,
            matching_score: parseMatchScore(matchingBuyer["Total III"]),
            rationale: {
              overall: matchingBuyer["Overall Rationale"] || 'Strong strategic alignment based on matching criteria.',
              offering: matchingBuyer["Offering Rationale"] || 'Good offering alignment.',
              customers: matchingBuyer["Customers Rationale"] || 'Customer base aligns well.',
              financialStrength: matchingBuyer["Financial Strenght Rationale"] || 'Strong financial profile.',
              previousTransactions: matchingBuyer["Prev Transactions Rationale"] || 'Good transaction history.',
              scores: {
                offering: matchingBuyer["Offering"] || 75,
                customers: matchingBuyer["Customers"] || 65,
                previousTransactions: matchingBuyer["Sector"] || 70,
                financialStrength: matchingBuyer["Positioning"] || 68,
                overall: parseMatchScore(matchingBuyer["Total III"])
              }
            },
            // Update description if matching has better info
            description: matchingBuyer["Short Description"] || linkedBuyer.description,
            offering: matchingBuyer["Offering Combined"] || linkedBuyer.offering,
            website: matchingBuyer["Company Website"] || matchingBuyer.website_alpha || linkedBuyer.website,
            combinedOffering: matchingBuyer["Offering Combined"] || 'No offering information available'
          };
        } else {
          console.log(`No linked buyer found for matching record "${matchingBuyer["Company Name"]}", using transformed data`);
          return transformMatchingBuyerToComponentFormat(matchingBuyer);
        }
      });
      
      console.log(`Successfully processed ${linkedData.length} buyer records using improved matching`);
      return linkedData;
      
    } catch (error) {
      console.error('Error in getLinkedBuyerData:', error);
      return await this.getLinkedBuyerDataFallback();
    }
  }

  /**
   * Fallback function that uses the old name-based matching approach
   */
  private static async getLinkedBuyerDataFallback() {
    try {
      console.log('Using fallback manual matching...');
      
      // Get all matching records
      const matchingBuyers = await MatchingDataService.getBuyersFromMatching();
      
      if (matchingBuyers.length === 0) {
        console.log('No matching data found, returning empty array');
        return [];
      }
      
      // Get all buyers from the buyers table
      const { data: buyersData, error: buyersError } = await supabase
        .from('buyers')
        .select('*');
      
      if (buyersError) {
        console.error('Error fetching buyers table:', buyersError);
        return matchingBuyers.map(buyer => transformMatchingBuyerToComponentFormat(buyer));
      }
      
      console.log(`Found ${buyersData?.length || 0} buyers in buyers table`);
      
      // Link matching data with buyers data using improved matching
      const linkedData = matchingBuyers.map(matchingBuyer => {
        // Try website matching first
        let linkedBuyer = buyersData?.find(buyer => {
          const matchingWebsite1 = normalizeWebsite(matchingBuyer.website_alpha);
          const matchingWebsite2 = normalizeWebsite(matchingBuyer["Company Website"]);
          const buyerWebsite1 = normalizeWebsite(buyer.website);
          const buyerWebsite2 = normalizeWebsite(buyer.website_https);
          
          return (matchingWebsite1 && (matchingWebsite1 === buyerWebsite1 || matchingWebsite1 === buyerWebsite2)) ||
                 (matchingWebsite2 && (matchingWebsite2 === buyerWebsite1 || matchingWebsite2 === buyerWebsite2));
        });
        
        // If no website match, try name matching
        if (!linkedBuyer) {
          linkedBuyer = buyersData?.find(buyer => {
            const matchingName = matchingBuyer["Company Name"] || matchingBuyer["Buyer Name"] || '';
            return buyer.name.toLowerCase().trim() === matchingName.toLowerCase().trim();
          });
        }
        
        if (linkedBuyer) {
          console.log(`Linked matching record "${matchingBuyer["Company Name"]}" with buyer "${linkedBuyer.name}"`);
          
          return {
            ...linkedBuyer,
            matching_score: parseMatchScore(matchingBuyer["Total III"]),
            rationale: {
              overall: matchingBuyer["Overall Rationale"] || 'Strong strategic alignment based on matching criteria.',
              offering: matchingBuyer["Offering Rationale"] || 'Good offering alignment.',
              customers: matchingBuyer["Customers Rationale"] || 'Customer base aligns well.',
              financialStrength: matchingBuyer["Financial Strenght Rationale"] || 'Strong financial profile.',
              previousTransactions: matchingBuyer["Prev Transactions Rationale"] || 'Good transaction history.',
              scores: {
                offering: matchingBuyer["Offering"] || 75,
                customers: matchingBuyer["Customers"] || 65,
                previousTransactions: matchingBuyer["Sector"] || 70,
                financialStrength: matchingBuyer["Positioning"] || 68,
                overall: parseMatchScore(matchingBuyer["Total III"])
              }
            },
            description: matchingBuyer["Short Description"] || linkedBuyer.description,
            offering: matchingBuyer["Offering Combined"] || linkedBuyer.offering,
            website: matchingBuyer["Company Website"] || matchingBuyer.website_alpha || linkedBuyer.website,
            combinedOffering: matchingBuyer["Offering Combined"] || 'No offering information available'
          };
        } else {
          console.log(`No buyer found for matching record "${matchingBuyer["Company Name"]}", using transformed data`);
          return transformMatchingBuyerToComponentFormat(matchingBuyer);
        }
      });
      
      console.log(`Successfully linked ${linkedData.length} buyer records via fallback method`);
      return linkedData;
      
    } catch (error) {
      console.error('Error in getLinkedBuyerDataFallback:', error);
      return [];
    }
  }
}
