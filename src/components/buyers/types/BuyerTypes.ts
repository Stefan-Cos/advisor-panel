
export type ImportanceType = 'high' | 'medium' | 'low' | 'N/A';

export interface Buyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  description: string;
  hq: string;
  employees: number;
  revenue: number;
  cash: number;
  reportedDate: string;
  isPEVCBacked: boolean;
  isPublic: boolean;
  website?: string;
  rationale: {
    offering: string;
    customers: string;
    previousTransactions: string;
    financialStrength: string;
    overall: string;
    scores?: {
      offering: number;
      customers: number;
      previousTransactions: number;
      financialStrength: number;
      overall: number;
    };
  };
  matchingScore: number;
  longDescription?: string;
  primaryIndustries?: string[];
  keywords?: string[];
  targetCustomerTypes?: string[];
  parentCompany?: string;
  aum?: number;
  investments?: string;
  offering?: string;
  sectors?: string[];
}

export interface SearchCriteria {
  companyName: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  description: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  offering: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  sectors: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  customerTypes: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
}

export interface BuyerTableProps {
  listingId: string;
}
