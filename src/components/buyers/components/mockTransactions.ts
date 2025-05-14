
import { Transaction } from './types/TransactionTypes';

export const getMockTransactions = (record: string): Transaction[] => {
  if (record === 'High') {
    return [
      {
        id: '1',
        name: 'Acquisition of MedTech Solutions',
        date: 'March 2024',
        type: 'Full Acquisition',
        amount: '$120M',
        description: 'Acquired to expand healthcare technology portfolio and enter the clinical trials market.'
      },
      {
        id: '2',
        name: 'Merger with DataHealth Inc',
        date: 'November 2023',
        type: 'Merger',
        amount: '$85M',
        description: 'Strategic merger to combine data analytics capabilities with healthcare expertise.'
      },
      {
        id: '3',
        name: 'HealthAI Platform Acquisition',
        date: 'May 2023',
        type: 'Full Acquisition',
        amount: '$65M',
        description: 'Acquired AI-powered healthcare platform to enhance product offerings.'
      }
    ];
  } else if (record === 'Medium') {
    return [
      {
        id: '1',
        name: 'Partial Acquisition of BioData Systems',
        date: 'January 2024',
        type: 'Partial Acquisition',
        amount: '$42M',
        description: 'Acquired 40% stake to gain access to biotech data processing technology.'
      },
      {
        id: '2',
        name: 'MedAnalytics Platform Purchase',
        date: 'August 2023',
        type: 'Asset Purchase',
        amount: '$28M',
        description: 'Purchased analytics platform to strengthen data capabilities.'
      }
    ];
  } else {
    return [
      {
        id: '1',
        name: 'Investment in HealthTech Startup',
        date: 'February 2024',
        type: 'Minority Investment',
        amount: '$10M',
        description: 'Strategic minority investment in emerging healthcare technology provider.'
      }
    ];
  }
};
