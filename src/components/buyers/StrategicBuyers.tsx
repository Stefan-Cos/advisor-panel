import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import BuyerTableHeader from './components/BuyerTableHeader';
import BuyerTableRow from './components/BuyerTableRow';
import BuyerRationalePanel from './components/BuyerRationalePanel';

interface StrategicBuyersProps {
  savedBuyers?: string[];
  onAddToSaved: (id: string) => void;
}

// Mock data for strategic buyers
const strategicBuyers = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic' as const,
    location: 'USA',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors',
    employees: 1500,
    previousAcquisitions: 'Acquired three complementary software companies in the last 2 years',
    notifications: 0,
    savedBuyers: 3,
    matchingScore: 92,
    status: 'active' as const,
    description: 'Leading provider of technology solutions',
    maTrackRecord: 'High',
    longDescription: 'Tech Innovations Inc. is a leading enterprise software company specializing in cloud infrastructure, data management, and cybersecurity solutions. Founded in 2005, they have grown to become a trusted partner for digital transformation initiatives across multiple sectors.',
    primaryIndustries: ['Technology', 'Healthcare', 'Financial Services'],
    keywords: ['Enterprise Software', 'Cloud Infrastructure', 'Digital Transformation', 'API Management'],
    targetCustomerTypes: ['Enterprise Clients', 'Mid-market Organizations', 'Healthcare Systems'],
    parentCompany: 'TechGroup Holdings',
    rationale: {
      offering: {
        text: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
        score: 95
      },
      customers: {
        text: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
        score: 88
      },
      previousTransactions: {
        text: 'Acquired three complementary software companies in the last 2 years, demonstrating experience in successful post-merger integration.',
        score: 90
      },
      financialStrength: {
        text: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
        score: 92
      },
      overall: {
        text: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.',
        score: 92
      }
    }
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic' as const,
    location: 'UK',
    sector: 'Healthcare, Technology',
    offering: 'Software solutions, Consulting',
    customers: 'Hospitals, Research institutions',
    employees: 850,
    previousAcquisitions: 'Completed one strategic acquisition in the clinical workflow space last year',
    notifications: 0,
    savedBuyers: 2,
    matchingScore: 85,
    status: 'active' as const,
    description: 'Healthcare technology provider',
    maTrackRecord: 'Medium',
    longDescription: 'Global HealthTech specializes in developing electronic health record systems and clinical workflow solutions for hospitals and healthcare facilities. With a presence in over 15 countries, they are focused on improving patient outcomes through technology.',
    primaryIndustries: ['Healthcare', 'Life Sciences', 'Biotechnology'],
    keywords: ['EHR', 'Clinical Workflow', 'Patient Management', 'Healthcare IT'],
    targetCustomerTypes: ['Hospitals', 'Healthcare Systems', 'Clinics', 'Medical Practices'],
    parentCompany: 'UK Health Innovations Group',
    rationale: {
      offering: {
        text: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
        score: 84
      },
      customers: {
        text: 'Strong presence in European healthcare systems which would open new markets for our client.',
        score: 90
      },
      previousTransactions: {
        text: 'Completed one strategic acquisition in the clinical workflow space last year, showing appetite for growth through acquisition.',
        score: 82
      },
      financialStrength: {
        text: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
        score: 78
      },
      overall: {
        text: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.',
        score: 85
      }
    }
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic' as const,
    location: 'Germany',
    sector: 'Medical software, Services',
    offering: 'Health management platforms',
    customers: 'Healthcare providers, Clinics',
    employees: 620,
    previousAcquisitions: 'No recent acquisition history',
    notifications: 0,
    savedBuyers: 1,
    matchingScore: 78,
    status: 'inactive' as const,
    description: 'Medical software provider',
    maTrackRecord: 'Low',
    longDescription: 'MediSoft Solutions creates specialized software applications for medical diagnostics, laboratory management, and healthcare analytics. Their solutions are known for regulatory compliance and integration capabilities with existing medical systems.',
    primaryIndustries: ['Medical Technology', 'Healthcare', 'Diagnostics'],
    keywords: ['Medical Software', 'Lab Management', 'Healthcare Analytics', 'Regulatory Compliance'],
    targetCustomerTypes: ['Medical Laboratories', 'Diagnostic Centers', 'Research Institutions'],
    parentCompany: 'Deutsche Medical Technologies',
    rationale: {
      offering: {
        text: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
        score: 82
      },
      customers: {
        text: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
        score: 86
      },
      previousTransactions: {
        text: 'No recent acquisition history, but their parent company has completed several technology acquisitions in the past 3 years.',
        score: 65
      },
      financialStrength: {
        text: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
        score: 74
      },
      overall: {
        text: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.',
        score: 78
      }
    }
  },
  {
    id: 'buyer4',
    name: 'BioTech Ventures',
    type: 'strategic' as const,
    location: 'Canada',
    sector: 'Biotechnology, Research',
    offering: 'Data analytics, Clinical solutions',
    customers: 'Pharmaceutical companies, Research labs',
    employees: 420,
    previousAcquisitions: 'Acquired a data analytics platform in 2023',
    notifications: 0,
    savedBuyers: 0,
    matchingScore: 70,
    status: 'pending' as const,
    description: 'Biotechnology research company',
    maTrackRecord: 'Medium',
    longDescription: 'BioTech Ventures focuses on developing innovative data analytics platforms for pharmaceutical research and clinical trials. Their solutions help accelerate drug discovery and optimize clinical trial processes.',
    primaryIndustries: ['Biotechnology', 'Pharmaceutical', 'Research'],
    keywords: ['Data Analytics', 'Clinical Research', 'Drug Discovery', 'Research Optimization'],
    targetCustomerTypes: ['Pharmaceutical Companies', 'Research Labs', 'Biotech Startups'],
    parentCompany: 'Canadian Bio Innovations',
    rationale: {
      offering: {
        text: 'Their analytics platforms could integrate well with our client\'s technology to create more comprehensive research solutions.',
        score: 72
      },
      customers: {
        text: 'Strong relationships with pharmaceutical companies that could benefit from our client\'s offerings.',
        score: 78
      },
      previousTransactions: {
        text: 'Successfully acquired and integrated a data analytics platform last year, showing M&A capability.',
        score: 68
      },
      financialStrength: {
        text: 'Moderate financial position with some capacity for strategic acquisitions in the right space.',
        score: 65
      },
      overall: {
        text: 'BioTech Ventures presents a solid strategic fit with complementary technology and customer relationships in the pharmaceutical research space.',
        score: 70
      }
    }
  }
];

const StrategicBuyers: React.FC<StrategicBuyersProps> = ({ savedBuyers = [], onAddToSaved }) => {
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchCompany, setSearchCompany] = useState<string>('');
  
  const filteredBuyers = strategicBuyers.filter(buyer => 
    buyer.name.toLowerCase().includes(searchCompany.toLowerCase())
  );
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  const getMATrackRecordColor = (record: string) => {
    switch(record) {
      case 'High':
        return 'bg-green-50 text-green-700';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700';
      case 'Low':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="relative overflow-hidden">    
      <ScrollArea className="h-[600px] w-full" orientation="both">
        <div className="min-w-max">
          <Table>
            <BuyerTableHeader />
            <TableBody>
              {filteredBuyers.map((buyer) => (
                <React.Fragment key={buyer.id}>
                  <BuyerTableRow 
                    buyer={buyer}
                    savedBuyers={savedBuyers}
                    onAddToSaved={onAddToSaved}
                    isExpanded={expandedRationales.includes(buyer.id)}
                    toggleRationale={toggleRationale}
                    getMATrackRecordColor={getMATrackRecordColor}
                  />
                  
                  {expandedRationales.includes(buyer.id) && (
                    <TableRow className="bg-green-50">
                      <TableCell colSpan={9} className="p-0">
                        <BuyerRationalePanel buyer={buyer} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StrategicBuyers;
