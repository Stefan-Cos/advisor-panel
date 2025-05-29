
import { supabase } from "@/integrations/supabase/client";

export interface BuyerRelationship {
  id: string;
  buyer_id: string;
  project_id: string;
  relationship_type: 'saved' | 'contacted' | 'interested' | 'not_interested';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export class BuyerRelationshipService {
  
  static async saveBuyer(buyerId: string, projectId: string, notes?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('saved_buyers')
        .insert({
          buyer_id: buyerId,
          project_id: projectId,
          relationship_type: 'saved',
          notes: notes || null
        });
      
      if (error) {
        console.error('Error saving buyer:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception saving buyer:', error);
      return false;
    }
  }
  
  static async getSavedBuyers(projectId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('saved_buyers')
        .select('buyer_id')
        .eq('project_id', projectId);
      
      if (error) {
        console.error('Error fetching saved buyers:', error);
        return [];
      }
      
      return data?.map(item => item.buyer_id) || [];
    } catch (error) {
      console.error('Exception fetching saved buyers:', error);
      return [];
    }
  }
  
  static async removeSavedBuyer(buyerId: string, projectId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('saved_buyers')
        .delete()
        .eq('buyer_id', buyerId)
        .eq('project_id', projectId);
      
      if (error) {
        console.error('Error removing saved buyer:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception removing saved buyer:', error);
      return false;
    }
  }
}
