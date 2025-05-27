
import { supabase } from "@/integrations/supabase/client";

export interface SavedBuyer {
  id: string;
  project_id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_type: 'strategic' | 'pe';
  buyer_data: any;
  rank?: number;
  feedback?: string;
  saved_at: string;
  updated_at: string;
}

export interface SaveBuyerRequest {
  project_id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_type: 'strategic' | 'pe';
  buyer_data: any;
}

export const saveBuyerToList = async (request: SaveBuyerRequest): Promise<SavedBuyer> => {
  try {
    const { data, error } = await supabase
      .from('saved_buyers_list')
      .insert({
        project_id: request.project_id,
        buyer_id: request.buyer_id,
        buyer_name: request.buyer_name,
        buyer_type: request.buyer_type,
        buyer_data: request.buyer_data
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving buyer to list:', error);
      throw error;
    }

    return {
      ...data,
      buyer_type: data.buyer_type as 'strategic' | 'pe'
    } as SavedBuyer;
  } catch (error) {
    console.error('Error in saveBuyerToList:', error);
    throw error;
  }
};

export const getSavedBuyersList = async (project_id: string): Promise<SavedBuyer[]> => {
  try {
    const { data, error } = await supabase
      .from('saved_buyers_list')
      .select('*')
      .eq('project_id', project_id)
      .order('saved_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved buyers list:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      buyer_type: item.buyer_type as 'strategic' | 'pe'
    })) as SavedBuyer[];
  } catch (error) {
    console.error('Error in getSavedBuyersList:', error);
    return [];
  }
};

export const updateSavedBuyerRank = async (id: string, rank: number | null): Promise<void> => {
  try {
    const { error } = await supabase
      .from('saved_buyers_list')
      .update({ rank })
      .eq('id', id);

    if (error) {
      console.error('Error updating buyer rank:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateSavedBuyerRank:', error);
    throw error;
  }
};

export const updateSavedBuyerFeedback = async (id: string, feedback: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('saved_buyers_list')
      .update({ feedback })
      .eq('id', id);

    if (error) {
      console.error('Error updating buyer feedback:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateSavedBuyerFeedback:', error);
    throw error;
  }
};

export const removeSavedBuyer = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('saved_buyers_list')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing saved buyer:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in removeSavedBuyer:', error);
    throw error;
  }
};

export const checkIfBuyerIsSaved = async (project_id: string, buyer_id: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('saved_buyers_list')
      .select('id')
      .eq('project_id', project_id)
      .eq('buyer_id', buyer_id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking if buyer is saved:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkIfBuyerIsSaved:', error);
    return false;
  }
};
