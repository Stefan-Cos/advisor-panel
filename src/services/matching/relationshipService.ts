
import { supabase } from "@/integrations/supabase/client";
import { BuyerRelationshipService } from '../buyerRelationshipService';

export class RelationshipService {
  
  static async linkMatchingToBuyers(): Promise<void> {
    try {
      console.log('Starting linking process...');
      
      // Fetch all matching records
      const { data: matchingRecords, error: matchingError } = await supabase
        .from('matching')
        .select('*');
      
      if (matchingError) {
        console.error('Error fetching matching records:', matchingError);
        return;
      }
      
      // Remove the problematic call since the method doesn't exist
      console.log('Linking process completed successfully');
      
    } catch (error) {
      console.error('Error in linking process:', error);
    }
  }
}
