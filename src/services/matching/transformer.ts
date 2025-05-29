import type { MatchingBuyer } from "./types";
import { parseMatchScore } from "./utils";

/**
 * Transforms a MatchingBuyer to the component format expected by the UI
 */
export const transformMatchingBuyerToComponentFormat = (buyer: MatchingBuyer): any => {
  // Parse match score from Total III field - keep actual value
  let matchScore = 0;
  if (buyer["Total III"]) {
    const scoreStr = buyer["Total III"].toString();
    const cleanedScore = scoreStr.replace(/,/g, '');
    const parsed = parseFloat(cleanedScore);
    if (!isNaN(parsed)) {
      matchScore = parsed;
    }
  }

  return {
    id: buyer["Company Name"] || buyer["Buyer Name"] || `buyer-${Date.now()}`,
    external_id: buyer["Company Name"] || buyer["Buyer Name"] || `buyer-${Date.now()}`,
    name: buyer["Company Name"] || buyer["Buyer Name"] || "Unknown Company",
    type: 'strategic',
    description: buyer["Short Description"] || buyer["Offering Combined"] || 'No description available',
    long_description: buyer["Offering Combined"] || buyer["Short Description"],
    hq: 'N/A',
    location: 'N/A',
    employees: 0,
    revenue: 0,
    cash: 0,
    reported_date: new Date().toISOString().split('T')[0],
    is_pe_vc_backed: false,
    is_public: false,
    website: buyer["Company Website"] || buyer.website_alpha || buyer["Company Name"] || 'N/A',
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
        overall: matchScore
      }
    },
    combinedOffering: buyer["Offering Combined"] || 'No offering information available'
  };
};
