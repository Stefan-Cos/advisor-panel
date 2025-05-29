import { supabase } from "@/integrations/supabase/client";

export interface MatchingBuyer {
  "Buyer Name": string;
  "Buyer Name2": string;
  "Short Description": string;
  "Company Website": string;
  "Offering Combined": string;
  "Match Socre": string;
  "Overall Rationale": string;
  "Financial Strenght Rationale": string;
  "Prev Transactions Rationale": string;
  "Customers Rationale": string;
  "Offering Rationale": string;
  "Offering": number;
  "Problem Solved": number;
  "Use Case": number;
  "Customers": number;
  "Sector": number;
  "Positioning": number;
  "Total III": string;
  "Company Name": string;
  buyerrr?: string;
  buyer_id?: string; // New field for foreign key relationship
}

export const getBuyersFromMatching = async (): Promise<MatchingBuyer[]> => {
  try {
    console.log('=== MATCHING SERVICE DEBUGGING ===');
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
      return []; // Return empty array instead of throwing to allow fallback
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
      return scoreB - scoreA; // Descending order
    });
    
    console.log(`Successfully fetched ${sortedData?.length || 0} records from matching table:`, sortedData);
    console.log('=== END MATCHING SERVICE DEBUGGING ===');
    return sortedData || [];
  } catch (error: any) {
    console.error('Exception in getBuyersFromMatching:', error);
    console.log('Exception details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return []; // Return empty array to allow fallback to buyers table
  }
};

// Enhanced function to get linked buyer data using the new foreign key relationship
export const getLinkedBuyerData = async () => {
  try {
    console.log('Fetching linked buyer data using foreign key relationships...');
    
    // Get matching records with their linked buyers using the new buyer_id foreign key
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
      return await getLinkedBuyerDataFallback();
    }
    
    console.log(`Found ${matchingWithBuyers?.length || 0} matching records with buyer relationships`);
    
    if (!matchingWithBuyers || matchingWithBuyers.length === 0) {
      console.log('No linked data found, falling back to name-based matching');
      return await getLinkedBuyerDataFallback();
    }
    
    // Transform the linked data
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
          website: matchingBuyer["Company Website"] || linkedBuyer.website,
          combinedOffering: matchingBuyer["Offering Combined"] || 'No offering information available'
        };
      } else {
        console.log(`No linked buyer found for matching record "${matchingBuyer["Company Name"]}", using transformed data`);
        return transformMatchingBuyerToComponentFormat(matchingBuyer);
      }
    });
    
    console.log(`Successfully linked ${linkedData.length} buyer records using foreign key relationships`);
    return linkedData;
    
  } catch (error) {
    console.error('Error in getLinkedBuyerData:', error);
    // Fallback to old method if there's an error
    return await getLinkedBuyerDataFallback();
  }
};

// Fallback function that uses the old name-based matching approach
const getLinkedBuyerDataFallback = async () => {
  try {
    console.log('Using fallback name-based matching...');
    
    // Get all matching records
    const matchingBuyers = await getBuyersFromMatching();
    
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
    
    // Link matching data with buyers data using name matching
    const linkedData = matchingBuyers.map(matchingBuyer => {
      // Try to find matching buyer by name
      const linkedBuyer = buyersData?.find(buyer => {
        const matchingName = matchingBuyer["Company Name"] || matchingBuyer["Buyer Name"] || '';
        return buyer.name.toLowerCase().trim() === matchingName.toLowerCase().trim();
      });
      
      if (linkedBuyer) {
        console.log(`Linked matching record "${matchingBuyer["Company Name"]}" with buyer "${linkedBuyer.name}" via name matching`);
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
          description: matchingBuyer["Short Description"] || linkedBuyer.description,
          offering: matchingBuyer["Offering Combined"] || linkedBuyer.offering,
          website: matchingBuyer["Company Website"] || linkedBuyer.website,
          combinedOffering: matchingBuyer["Offering Combined"] || 'No offering information available'
        };
      } else {
        console.log(`No buyer found for matching record "${matchingBuyer["Company Name"]}" via name matching, using transformed data`);
        return transformMatchingBuyerToComponentFormat(matchingBuyer);
      }
    });
    
    console.log(`Successfully linked ${linkedData.length} buyer records via fallback method`);
    return linkedData;
    
  } catch (error) {
    console.error('Error in getLinkedBuyerDataFallback:', error);
    return [];
  }
};

// Helper function to parse match score from Total III - preserving actual values
const parseMatchScore = (scoreStr: string | undefined): number => {
  if (!scoreStr) return 0;
  
  // Remove commas and parse as number
  const cleanedScore = scoreStr.toString().replace(/,/g, '');
  const parsed = parseFloat(cleanedScore);
  
  if (isNaN(parsed)) return 0;
  
  // Return the actual score without converting to percentage
  return parsed;
};

export const transformMatchingBuyerToComponentFormat = (buyer: MatchingBuyer): any => {
  // Parse match score from Total III field - keep actual value
  let matchScore = 0; // default
  if (buyer["Total III"]) {
    const scoreStr = buyer["Total III"].toString();
    const cleanedScore = scoreStr.replace(/,/g, '');
    const parsed = parseFloat(cleanedScore);
    if (!isNaN(parsed)) {
      matchScore = parsed; // Keep the actual score, don't convert to percentage
    }
  }

  return {
    id: buyer["Company Name"] || buyer["Buyer Name"] || `buyer-${Date.now()}`,
    external_id: buyer["Company Name"] || buyer["Buyer Name"] || `buyer-${Date.now()}`,
    name: buyer["Company Name"] || buyer["Buyer Name"] || "Unknown Company",
    type: 'strategic', // Default to strategic, could be enhanced based on data
    description: buyer["Short Description"] || buyer["Offering Combined"] || 'No description available',
    long_description: buyer["Offering Combined"] || buyer["Short Description"],
    hq: 'N/A', // Not available in matching table
    location: 'N/A', // Not available in matching table
    employees: 0, // Not available in matching table
    revenue: 0, // Not available in matching table
    cash: 0, // Not available in matching table
    reported_date: new Date().toISOString().split('T')[0],
    is_pe_vc_backed: false,
    is_public: false,
    website: buyer["Company Website"] || buyer["Company Name"] || 'N/A',
    sector: 'N/A',
    ma_track_record: 'N/A',
    offering: buyer["Offering Combined"] || buyer["Short Description"] || 'N/A',
    sectors: [],
    customers: 'N/A',
    matching_score: matchScore, // Use actual Total III score
    status: 'active',
    primary_industries: [],
    keywords: [],
    target_customer_types: [],
    parent_company: buyer["Company Name"] || 'Independent',
    aum: 0,
    investments: 'N/A',
    previous_acquisitions: 'N/A',
    investment_type: [],
    geography: [],
    investment_size: 'N/A',
    ebitda: 'N/A',
    industry_focus: 'N/A',
    industry_preferences: [],
    rationale: {
      overall: buyer["Offering Combined"] || 'Strong strategic alignment based on matching criteria.',
      offering: buyer["Offering Rationale"] || 'Good offering alignment.',
      customers: buyer["Customers Rationale"] || 'Customer base aligns well.',
      financialStrength: buyer["Financial Strenght Rationale"] || 'Strong financial profile.',
      previousTransactions: buyer["Prev Transactions Rationale"] || 'Good transaction history.',
      scores: {
        offering: buyer["Offering"] || 75,
        customers: buyer["Customers"] || 65,
        previousTransactions: buyer["Sector"] || 70,
        financialStrength: buyer["Positioning"] || 68,
        overall: matchScore // Use actual score here too
      }
    },
    // Add the combined offering for easy access
    combinedOffering: buyer["Offering Combined"] || 'No offering information available'
  };
};

// Updated function to use the BuyerRelationshipService
export const updateMatchingBuyerRelationships = async () => {
  try {
    console.log('Updating matching table buyer relationships using BuyerRelationshipService...');
    
    // Import the service dynamically to avoid circular dependencies
    const { BuyerRelationshipService } = await import('./buyerRelationshipService');
    const result = await BuyerRelationshipService.updateAllRelationships();
    
    console.log(`Updated ${result.updated} relationships with ${result.errors.length} errors`);
    return result.updated > 0;
  } catch (error) {
    console.error('Exception updating buyer relationships:', error);
    return false;
  }
};
