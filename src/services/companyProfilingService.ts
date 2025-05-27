
import { supabase } from "@/integrations/supabase/client";

export const analyzeCompanyWebsite = async (website: string): Promise<any> => {
  try {
    console.log('Starting website analysis for:', website);
    
    // Call the scrape-website edge function
    const { data, error } = await supabase.functions.invoke('scrape-website', {
      body: { url: website }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Scraping failed: ${error.message}`);
    }

    console.log('Scraping successful:', data);
    
    if (data?.textContent) {
      console.log('First 400 words from website:', data.textContent);
    }
    
    return data;
  } catch (error) {
    console.error('Error in analyzeCompanyWebsite:', error);
    throw error;
  }
};
