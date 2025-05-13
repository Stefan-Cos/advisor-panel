import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import BuyerSearch from './components/BuyerSearch';
import BuyerTableHeader from './components/BuyerTableHeader';
import BuyerTableRow from './components/BuyerTableRow';
import BuyerRationalePanel from './components/BuyerRationalePanel';
import { Buyer } from './types/BuyerTypes';

interface StrategicBuyersProps {
  savedBuyers?: string[];
  onAddToSaved: (id: string) => void;
}

// Mock data for strategic buyers
const strategicBuyers: Buyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    description: 'Leading provider of technology solutions',
    hq: 'USA',
    location: 'USA',
    employees: 1500,
    revenue: 150000000,
    cash: 50000000,
    reportedDate: '2023-12-01',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://techinnovations.example.com',
    sector: 'Medtech, Life sciences',
    maTrackRecord: 'High',
    offering: 'Revenue-focused software, services',
    sectors: ['Medtech', 'Life sciences', 'SaaS'],
    customers: 'Pharmaceutical and life science sectors',
    matchingScore: 92,
    longDescription: 'Tech Innovations Inc. is a leading enterprise software company specializing in cloud infrastructure, data management, and cybersecurity solutions. Founded in 2005, they have grown to become a trusted partner for digital transformation initiatives across multiple sectors.',
    primaryIndustries: ['Technology', 'Healthcare', 'Financial Services'],
    keywords: ['Enterprise Software', 'Cloud Infrastructure', 'Digital Transformation', 'API Management'],
    targetCustomerTypes: ['Enterprise Clients', 'Mid-market Organizations', 'Healthcare Systems'],
    parentCompany: 'TechGroup Holdings',
    rationale: {
      offering: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
      customers: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
      previousTransactions: 'Acquired three complementary software companies in the last 2 years, demonstrating experience in successful post-merger integration.',
      financialStrength: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
      overall: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.',
      scores: {
        offering: 95,
        customers: 88,
        previousTransactions: 90,
        financialStrength: 92,
        overall: 92
      }
    }
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    description: 'Healthcare technology provider',
    hq: 'UK',
    location: 'UK',
    employees: 850,
    revenue: 75000000,
    cash: 25000000,
    reportedDate: '2023-10-15',
    isPEVCBacked: true,
    isPublic: false,
    website: 'https://globalhealthtech.example.com',
    sector: 'Healthcare, Technology',
    maTrackRecord: 'Medium',
    offering: 'Software solutions, Consulting',
    sectors: ['Healthcare', 'Technology', 'Digital Health'],
    customers: 'Hospitals, Research institutions',
    matchingScore: 85,
    longDescription: 'Global HealthTech specializes in developing electronic health record systems and clinical workflow solutions for hospitals and healthcare facilities. With a presence in over 15 countries, they are focused on improving patient outcomes through technology.',
    primaryIndustries: ['Healthcare', 'Life Sciences', 'Biotechnology'],
    keywords: ['EHR', 'Clinical Workflow', 'Patient Management', 'Healthcare IT'],
    targetCustomerTypes: ['Hospitals', 'Healthcare Systems', 'Clinics', 'Medical Practices'],
    parentCompany: 'UK Health Innovations Group',
    rationale: {
      offering: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
      customers: 'Strong presence in European healthcare systems which would open new markets for our client.',
      previousTransactions: 'Completed one strategic acquisition in the clinical workflow space last year, showing appetite for growth through acquisition.',
      financialStrength: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
      overall: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.',
      scores: {
        offering: 84,
        customers: 90,
        previousTransactions: 82,
        financialStrength: 78,
        overall: 85
      }
    }
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    description: 'Medical software provider',
    hq: 'Germany',
    location: 'Germany',
    employees: 620,
    revenue: 45000000,
    cash: 15000000,
    reportedDate: '2023-11-20',
    isPEVCBacked: true,
    isPublic: false,
    website: 'https://medisoft.example.com',
    sector: 'Medical software, Services',
    maTrackRecord: 'Low',
    offering: 'Health management platforms',
    sectors: ['Medical software', 'Healthcare IT', 'Services'],
    customers: 'Healthcare providers, Clinics',
    matchingScore: 78,
    longDescription: 'MediSoft Solutions creates specialized software applications for medical diagnostics, laboratory management, and healthcare analytics. Their solutions are known for regulatory compliance and integration capabilities with existing medical systems.',
    primaryIndustries: ['Medical Technology', 'Healthcare', 'Diagnostics'],
    keywords: ['Medical Software', 'Lab Management', 'Healthcare Analytics', 'Regulatory Compliance'],
    targetCustomerTypes: ['Medical Laboratories', 'Diagnostic Centers', 'Research Institutions'],
    parentCompany: 'Deutsche Medical Technologies',
    rationale: {
      offering: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
      customers: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
      previousTransactions: 'No recent acquisition history, but their parent company has completed several technology acquisitions in the past 3 years.',
      financialStrength: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
      overall: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.',
      scores: {
        offering: 82,
        customers: 86,
        previousTransactions: 65,
        financialStrength: 74,
        overall: 78
      }
    }
  },
  {
    id: 'buyer4',
    name: 'BioTech Ventures',
    type: 'strategic',
    description: 'Biotechnology research company',
    hq: 'Canada',
    location: 'Canada',
    employees: 420,
    revenue: 30000000,
    cash: 12000000,
    reportedDate: '2023-09-30',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://biotechventures.example.com',
    sector: 'Biotechnology, Research',
    maTrackRecord: 'Medium',
    offering: 'Data analytics, Clinical solutions',
    sectors: ['Biotechnology', 'Research', 'Data Science'],
    customers: 'Pharmaceutical companies, Research labs',
    matchingScore: 70,
    longDescription: 'BioTech Ventures focuses on developing innovative data analytics platforms for pharmaceutical research and clinical trials. Their solutions help accelerate drug discovery and optimize clinical trial processes.',
    primaryIndustries: ['Biotechnology', 'Pharmaceutical', 'Research'],
    keywords: ['Data Analytics', 'Clinical Research', 'Drug Discovery', 'Research Optimization'],
    targetCustomerTypes: ['Pharmaceutical Companies', 'Research Labs', 'Biotech Startups'],
    parentCompany: 'Canadian Bio Innovations',
    rationale: {
      offering: 'Their analytics platforms could integrate well with our client\'s technology to create more comprehensive research solutions.',
      customers: 'Strong relationships with pharmaceutical companies that could benefit from our client\'s offerings.',
      previousTransactions: 'Successfully acquired and integrated a data analytics platform last year, showing M&A capability.',
      financialStrength: 'Moderate financial position with some capacity for strategic acquisitions in the right space.',
      overall: 'BioTech Ventures presents a solid strategic fit with complementary technology and customer relationships in the pharmaceutical research space.',
      scores: {
        offering: 72,
        customers: 78,
        previousTransactions: 68,
        financialStrength: 65,
        overall: 70
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
      <BuyerSearch 
        searchValue={searchCompany}
        onSearchChange={setSearchCompany}
      />
    
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
