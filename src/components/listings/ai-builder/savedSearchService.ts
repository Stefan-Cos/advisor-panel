
// Sample saved searches data
export const savedSearches = [
  {
    id: '1',
    name: 'Enterprise SaaS Buyers',
    date: '2024-05-01',
    filters: { revenue: '50', industry: 'Technology' }
  },
  {
    id: '2',
    name: 'PE Firms with Tech Focus',
    date: '2024-05-05',
    filters: { type: 'pe', industry: 'Technology' }
  },
  {
    id: '3',
    name: 'Strategic Buyers in Healthcare',
    date: '2024-04-28',
    filters: { industry: 'Healthcare', type: 'strategic' }
  }
];

// Saved search dummy results with more details
export const savedSearchResults = {
  '1': [
    { id: 'saas1', name: 'Enterprise Tech Solutions', matchScore: 92, location: 'San Francisco, CA', type: 'strategic', industry: 'Technology', trackRecord: 'High' },
    { id: 'saas2', name: 'Cloud Innovations Inc', matchScore: 88, location: 'Austin, TX', type: 'strategic', industry: 'SaaS', trackRecord: 'Medium' },
    { id: 'saas3', name: 'Software Ventures LLC', matchScore: 84, location: 'Seattle, WA', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'saas4', name: 'Tech Growth Partners', matchScore: 81, location: 'Boston, MA', type: 'pe', industry: 'Software', trackRecord: 'Medium' },
    { id: 'saas5', name: 'Digital Transformation Group', matchScore: 79, location: 'Chicago, IL', type: 'strategic', industry: 'Enterprise Software', trackRecord: 'Medium' }
  ],
  '2': [
    { id: 'pe1', name: 'Horizon Capital Partners', matchScore: 95, location: 'New York, NY', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'pe2', name: 'Techvest Partners', matchScore: 89, location: 'Boston, MA', type: 'pe', industry: 'Software', trackRecord: 'Medium' },
    { id: 'pe3', name: 'Growth Equity Fund', matchScore: 86, location: 'Chicago, IL', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'pe4', name: 'Innovation Ventures', matchScore: 84, location: 'San Francisco, CA', type: 'pe', industry: 'Tech Hardware', trackRecord: 'Low' },
    { id: 'pe5', name: 'Digital Growth Fund', matchScore: 82, location: 'Austin, TX', type: 'pe', industry: 'SaaS', trackRecord: 'Medium' }
  ],
  '3': [
    { id: 'hc1', name: 'HealthTech Innovations', matchScore: 91, location: 'Minneapolis, MN', type: 'strategic', industry: 'Healthcare', trackRecord: 'High' },
    { id: 'hc2', name: 'MedServe Solutions', matchScore: 87, location: 'Philadelphia, PA', type: 'strategic', industry: 'Medical Devices', trackRecord: 'Medium' },
    { id: 'hc3', name: 'BioScience Partners', matchScore: 82, location: 'San Diego, CA', type: 'pe', industry: 'Healthcare', trackRecord: 'High' },
    { id: 'hc4', name: 'Healthcare Equity Group', matchScore: 80, location: 'Boston, MA', type: 'pe', industry: 'Health IT', trackRecord: 'Medium' },
    { id: 'hc5', name: 'Medical Innovation Co', matchScore: 78, location: 'Denver, CO', type: 'strategic', industry: 'Healthcare', trackRecord: 'Low' }
  ]
};

// Format buyer data to match the structure expected by BuyerTableRow
export const formatBuyerData = (buyers: any[]) => {
  return buyers.map(buyer => ({
    id: buyer.id,
    name: buyer.name,
    matchingScore: buyer.matchScore,
    location: buyer.location,
    description: `${buyer.type === 'strategic' ? 'Strategic buyer' : 'Private equity firm'} focused on ${buyer.industry || 'multiple industries'}`,
    hq: buyer.location,
    employees: Math.floor(Math.random() * 5000) + 100,
    maTrackRecord: buyer.trackRecord || (Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low'),
    rationale: {
      overall: {
        text: `This ${buyer.type === 'strategic' ? 'company' : 'fund'} is a good match based on their focus in ${buyer.industry || 'your industry'} and history of similar acquisitions.`,
        score: buyer.matchScore
      }
    }
  }));
};

// Get formatted buyers for a selected saved search
export const getFormattedSavedSearchBuyers = (selectedSavedSearch: string | null) => {
  if (!selectedSavedSearch) return [];
  const rawBuyers = savedSearchResults[selectedSavedSearch as keyof typeof savedSearchResults] || [];
  return formatBuyerData(rawBuyers);
};
