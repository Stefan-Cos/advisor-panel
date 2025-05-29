
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
}

export const getBuyersFromMatching = async (): Promise<MatchingBuyer[]> => {
  try {
    console.log('Attempting to fetch from matching table...');
    
    const { data, error } = await supabase
      .from('matching')
      .select('*')
      .order('Match Socre', { ascending: false, nullsFirst: false });
    
    if (error) {
      console.error('Error fetching buyers from matching table:', error);
      return []; // Return empty array instead of throwing to allow fallback
    }
    
    console.log(`Successfully fetched ${data?.length || 0} records from matching table:`, data);
    return data || [];
  } catch (error) {
    console.error('Exception in getBuyersFromMatching:', error);
    return []; // Return empty array to allow fallback to buyers table
  }
};

// New function to get linked buyer data by merging matching and buyers tables
export const getLinkedBuyerData = async () => {
  try {
    console.log('Fetching linked buyer data from both tables...');
    
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
    
    // Link matching data with buyers data
    const linkedData = matchingBuyers.map(matchingBuyer => {
      // Try to find matching buyer by name
      const linkedBuyer = buyersData?.find(buyer => {
        const matchingName = matchingBuyer["Buyer Name"] || matchingBuyer["Company Name"] || '';
        return buyer.name.toLowerCase().trim() === matchingName.toLowerCase().trim();
      });
      
      if (linkedBuyer) {
        console.log(`Linked matching record "${matchingBuyer["Buyer Name"]}" with buyer "${linkedBuyer.name}"`);
        // Merge the data, prioritizing matching table for scores and rationale
        return {
          ...linkedBuyer,
          matching_score: parseMatchScore(matchingBuyer["Match Socre"]),
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
              overall: parseMatchScore(matchingBuyer["Match Socre"])
            }
          },
          // Update description if matching has better info
          description: matchingBuyer["Short Description"] || linkedBuyer.description,
          offering: matchingBuyer["Offering Combined"] || linkedBuyer.offering,
          website: matchingBuyer["Company Website"] || linkedBuyer.website
        };
      } else {
        console.log(`No buyer found for matching record "${matchingBuyer["Buyer Name"]}", using transformed data`);
        // If no buyer found, use transformed matching data
        return transformMatchingBuyerToComponentFormat(matchingBuyer);
      }
    });
    
    console.log(`Successfully linked ${linkedData.length} buyer records`);
    return linkedData;
    
  } catch (error) {
    console.error('Error in getLinkedBuyerData:', error);
    return [];
  }
};

// Helper function to parse match score
const parseMatchScore = (scoreStr: string | undefined): number => {
  if (!scoreStr) return 75;
  const parsed = parseFloat(scoreStr.toString().replace('%', ''));
  return isNaN(parsed) ? 75 : Math.round(parsed);
};

export const transformMatchingBuyerToComponentFormat = (buyer: MatchingBuyer): any => {
  // Parse match score - handle both string and number formats
  let matchScore = 75; // default
  if (buyer["Match Socre"]) {
    const scoreStr = buyer["Match Socre"].toString();
    const parsed = parseFloat(scoreStr.replace('%', ''));
    if (!isNaN(parsed)) {
      matchScore = Math.round(parsed);
    }
  }

  return {
    id: buyer["Buyer Name"] || buyer["Buyer Name2"] || `buyer-${Date.now()}`,
    external_id: buyer["Buyer Name"] || buyer["Buyer Name2"] || `buyer-${Date.now()}`,
    name: buyer["Buyer Name"] || buyer["Buyer Name2"] || "Unknown Buyer",
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
    matching_score: matchScore,
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
      overall: buyer["Overall Rationale"] || 'Strong strategic alignment based on matching criteria.',
      offering: buyer["Offering Rationale"] || 'Good offering alignment.',
      customers: buyer["Customers Rationale"] || 'Customer base aligns well.',
      financialStrength: buyer["Financial Strenght Rationale"] || 'Strong financial profile.',
      previousTransactions: buyer["Prev Transactions Rationale"] || 'Good transaction history.',
      scores: {
        offering: buyer["Offering"] || 75,
        customers: buyer["Customers"] || 65,
        previousTransactions: buyer["Sector"] || 70,
        financialStrength: buyer["Positioning"] || 68,
        overall: matchScore
      }
    }
  };
};
