
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
    longDescription: buyer["Offering Combined"] || buyer["Short Description"],
    hq: 'N/A', // Not available in matching table
    location: 'N/A', // Not available in matching table
    employees: 0, // Not available in matching table
    revenue: 0, // Not available in matching table
    cash: 0, // Not available in matching table
    reportedDate: new Date().toISOString().split('T')[0],
    isPEVCBacked: false,
    isPublic: false,
    website: buyer["Company Website"] || buyer["Company Name"] || 'N/A',
    sector: 'N/A',
    maTrackRecord: 'N/A',
    offering: buyer["Offering Combined"] || buyer["Short Description"] || 'N/A',
    sectors: [],
    customers: 'N/A',
    matchingScore: matchScore,
    status: 'active',
    primaryIndustries: [],
    keywords: [],
    targetCustomerTypes: [],
    parentCompany: buyer["Company Name"] || 'Independent',
    aum: 0,
    investments: 'N/A',
    previousAcquisitions: 'N/A',
    investmentType: [],
    geography: [],
    investmentSize: 'N/A',
    ebitda: 'N/A',
    industryFocus: 'N/A',
    industryPreferences: [],
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
