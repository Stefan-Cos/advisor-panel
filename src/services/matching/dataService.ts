
import { supabase } from "@/integrations/supabase/client";
import type { MatchingBuyer } from "./types";
import { parseMatchScore } from "./utils";

/**
 * Service for fetching matching data from Supabase
 */
export class MatchingDataService {
  
  static async getBuyersFromMatching(): Promise<MatchingBuyer[]> {
    try {
      console.log('=== MATCHING DATA SERVICE DEBUGGING ===');
      console.log('Attempting to fetch from matching table...');
      
      const { data, error } = await supabase
        .from('matching')
        .select('*')
        .order('Total III', { ascending: false, nullsFirst: false });
      
      console.log('Supabase query result:');
      console.log('- Error:', error);
      console.log('- Data:', data);
      console.log('- Data type:', typeof data);
      console.log('- Data length:', data?.length);
      
      if (error) {
        console.error('Error fetching buyers from matching table:', error);
        console.log('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return [];
      }
      
      if (!data || data.length === 0) {
        console.log('No data returned from matching table');
        console.log('Possible reasons:');
        console.log('1. Table is empty');
        console.log('2. RLS policies are blocking access');
        console.log('3. Column names don\'t match exactly');
        console.log('4. Data type issues');
        
        // Try a simpler query to test table access
        console.log('Attempting simpler query to test table access...');
        const { data: testData, error: testError } = await supabase
          .from('matching')
          .select('count');
        
        console.log('Simple count query result:', { testData, testError });
      } else {
        console.log('Successfully fetched data from matching table');
        console.log('Sample record structure:', data[0]);
        console.log('All column names in first record:', Object.keys(data[0]));
        
        // Check for specific expected columns
        const expectedColumns = [
          'Buyer Name', 'Company Name', 'Total III', 'Short Description',
          'Overall Rationale', 'Offering Combined', 'Company Website'
        ];
        
        expectedColumns.forEach(col => {
          console.log(`Column "${col}" exists:`, col in data[0]);
          console.log(`Column "${col}" value:`, data[0][col]);
        });
      }
      
      // Sort by Total III in descending order after fetching
      const sortedData = data?.sort((a, b) => {
        const scoreA = parseMatchScore(a["Total III"]);
        const scoreB = parseMatchScore(b["Total III"]);
        return scoreB - scoreA;
      });
      
      console.log(`Successfully fetched ${sortedData?.length || 0} records from matching table:`, sortedData);
      console.log('=== END MATCHING DATA SERVICE DEBUGGING ===');
      return sortedData || [];
    } catch (error: any) {
      console.error('Exception in getBuyersFromMatching:', error);
      console.log('Exception details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return [];
    }
  }
}
