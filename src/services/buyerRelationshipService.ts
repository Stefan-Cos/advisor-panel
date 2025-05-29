
import { supabase } from "@/integrations/supabase/client";

/**
 * Service for managing relationships between matching records and buyers
 */
export class BuyerRelationshipService {
  
  /**
   * Updates buyer relationships for all matching records that don't have a buyer_id set
   */
  static async updateAllRelationships(): Promise<{ updated: number; errors: string[] }> {
    try {
      console.log('Starting bulk update of buyer relationships...');
      
      // Get all matching records without buyer_id
      const { data: unmatchedRecords, error: fetchError } = await supabase
        .from('matching')
        .select('*')
        .is('buyer_id', null)
        .not('Company Name', 'is', null);
      
      if (fetchError) {
        throw fetchError;
      }
      
      console.log(`Found ${unmatchedRecords?.length || 0} unmatched records`);
      
      let updated = 0;
      const errors: string[] = [];
      
      // Process each record
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
              console.log(`Successfully linked "${companyName}" to buyer ${buyerId}`);
            }
          }
        } catch (error: any) {
          errors.push(`Exception processing record: ${error.message}`);
        }
      }
      
      console.log(`Bulk update completed: ${updated} updated, ${errors.length} errors`);
      return { updated, errors };
      
    } catch (error: any) {
      console.error('Error in bulk relationship update:', error);
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
  static async getRelationshipStats(): Promise<{
    totalMatching: number;
    linkedRecords: number;
    unlinkedRecords: number;
    linkageRate: number;
  }> {
    try {
      // Get total matching records - use simpler query structure
      const totalQuery = await supabase
        .from('matching')
        .select('id', { count: 'exact', head: true });
      
      // Get linked records - use simpler query structure  
      const linkedQuery = await supabase
        .from('matching')
        .select('id', { count: 'exact', head: true })
        .not('buyer_id', 'is', null);
      
      const totalCount = totalQuery.count || 0;
      const linkedCount = linkedQuery.count || 0;
      const unlinkedRecords = totalCount - linkedCount;
      const linkageRate = totalCount ? (linkedCount / totalCount * 100) : 0;
      
      return {
        totalMatching: totalCount,
        linkedRecords: linkedCount,
        unlinkedRecords,
        linkageRate: Math.round(linkageRate * 100) / 100
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
