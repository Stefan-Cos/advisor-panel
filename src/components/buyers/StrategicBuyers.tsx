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

// Mock data for strategic buyers with 15 rows
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
  },
  {
    id: 'buyer5',
    name: 'HealthTech Innovations',
    type: 'strategic',
    description: 'Digital health platform',
    hq: 'Sweden',
    location: 'Sweden',
    employees: 580,
    revenue: 42000000,
    cash: 18000000,
    reportedDate: '2023-08-15',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://healthtech-innovations.example.com',
    sector: 'Healthcare, Digital Health',
    maTrackRecord: 'High',
    offering: 'Digital health solutions',
    sectors: ['Healthcare', 'Digital Health', 'Telemedicine'],
    customers: 'Healthcare providers, Patients',
    matchingScore: 89,
    rationale: {
      offering: 'Their digital health platform aligns perfectly with our client\'s technology.',
      customers: 'Strong presence in Nordic healthcare systems that would expand market reach.',
      previousTransactions: 'Completed two strategic acquisitions in the last 18 months.',
      financialStrength: 'Solid financial position with good growth metrics.',
      overall: 'HealthTech Innovations offers excellent strategic fit and expansion opportunities.',
      scores: {
        offering: 90,
        customers: 85,
        previousTransactions: 88,
        financialStrength: 90,
        overall: 89
      }
    }
  },
  {
    id: 'buyer6',
    name: 'DataMed Systems',
    type: 'strategic',
    description: 'Medical data analytics',
    hq: 'France',
    location: 'France',
    employees: 420,
    revenue: 36000000,
    cash: 14000000,
    reportedDate: '2023-09-20',
    isPEVCBacked: true,
    isPublic: false,
    website: 'https://datamed.example.com',
    sector: 'Medical Analytics, Healthcare',
    maTrackRecord: 'Medium',
    offering: 'Data analytics platforms',
    sectors: ['Healthcare', 'Data Science', 'Analytics'],
    customers: 'Hospitals, Research centers',
    matchingScore: 75,
    rationale: {
      offering: 'Their analytics capabilities complement our client\'s data collection systems.',
      customers: 'Strong European hospital relationships would expand market presence.',
      previousTransactions: 'One acquisition completed last year with good integration results.',
      financialStrength: 'PE backing provides acquisition capital despite moderate size.',
      overall: 'DataMed Systems presents good synergies in analytics capabilities and European market access.',
      scores: {
        offering: 78,
        customers: 80,
        previousTransactions: 72,
        financialStrength: 70,
        overall: 75
      }
    }
  },
  {
    id: 'buyer7',
    name: 'Clinical Solutions Inc',
    type: 'strategic',
    description: 'Clinical trials software',
    hq: 'USA',
    location: 'USA',
    employees: 650,
    revenue: 58000000,
    cash: 22000000,
    reportedDate: '2023-07-10',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://clinicalsolutions.example.com',
    sector: 'Clinical Trials, Healthcare IT',
    maTrackRecord: 'High',
    offering: 'Trial management software',
    sectors: ['Healthcare IT', 'Clinical Trials', 'Life Sciences'],
    customers: 'Pharma companies, CROs',
    matchingScore: 82,
    rationale: {
      offering: 'Their clinical trials platform would be enhanced by our client\'s technology.',
      customers: 'Strong relationships with major pharmaceutical companies.',
      previousTransactions: 'Successfully acquired and integrated three companies in five years.',
      financialStrength: 'Strong financial position with consistent growth.',
      overall: 'Clinical Solutions Inc offers solid strategic fit and acquisition experience.',
      scores: {
        offering: 84,
        customers: 86,
        previousTransactions: 88,
        financialStrength: 80,
        overall: 82
      }
    }
  },
  {
    id: 'buyer8',
    name: 'BioPharma Tech',
    type: 'strategic',
    description: 'Pharmaceutical technology',
    hq: 'Switzerland',
    location: 'Switzerland',
    employees: 780,
    revenue: 85000000,
    cash: 32000000,
    reportedDate: '2023-10-05',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://biopharmatech.example.com',
    sector: 'Pharmaceutical, Technology',
    maTrackRecord: 'Medium',
    offering: 'Pharmaceutical technology platforms',
    sectors: ['Pharmaceutical', 'Technology', 'Life Sciences'],
    customers: 'Pharma companies, Research labs',
    matchingScore: 78,
    rationale: {
      offering: 'Their pharmaceutical platforms align with our client\'s technology focus.',
      customers: 'Strong European pharmaceutical industry relationships.',
      previousTransactions: 'Two acquisitions in the last three years with mixed integration results.',
      financialStrength: 'Strong cash position with steady growth.',
      overall: 'BioPharma Tech offers good strategic fit with European market expansion potential.',
      scores: {
        offering: 80,
        customers: 82,
        previousTransactions: 72,
        financialStrength: 85,
        overall: 78
      }
    }
  },
  {
    id: 'buyer9',
    name: 'MediData Innovations',
    type: 'strategic',
    description: 'Healthcare data management',
    hq: 'Australia',
    location: 'Australia',
    employees: 320,
    revenue: 28000000,
    cash: 10000000,
    reportedDate: '2023-11-12',
    isPEVCBacked: true,
    isPublic: false,
    website: 'https://medidata-innovations.example.com',
    sector: 'Healthcare IT, Data Management',
    maTrackRecord: 'Low',
    offering: 'Healthcare data solutions',
    sectors: ['Healthcare IT', 'Data Management', 'Medical Records'],
    customers: 'Hospitals, Healthcare systems',
    matchingScore: 68,
    rationale: {
      offering: 'Their data management solutions complement our client\'s technology.',
      customers: 'Strong presence in Asia-Pacific healthcare markets.',
      previousTransactions: 'Limited acquisition experience, focused on organic growth.',
      financialStrength: 'Moderate financial position with recent PE investment.',
      overall: 'MediData Innovations offers interesting geographic expansion opportunities despite limited M&A experience.',
      scores: {
        offering: 72,
        customers: 75,
        previousTransactions: 55,
        financialStrength: 65,
        overall: 68
      }
    }
  },
  {
    id: 'buyer10',
    name: 'LifeScience Analytics',
    type: 'strategic',
    description: 'Life science data analysis',
    hq: 'Israel',
    location: 'Israel',
    employees: 270,
    revenue: 24000000,
    cash: 8500000,
    reportedDate: '2023-08-30',
    isPEVCBacked: false,
    isPublic: false,
    website: 'https://lifescienceanalytics.example.com',
    sector: 'Life Sciences, Data Analytics',
    maTrackRecord: 'Medium',
    offering: 'Life science analytics platforms',
    sectors: ['Life Sciences', 'Data Analytics', 'Research'],
    customers: 'Biotechnology firms, Research institutions',
    matchingScore: 71,
    rationale: {
      offering: 'Their analytics capabilities would benefit from our client\'s technology.',
      customers: 'Strong relationships with global research institutions.',
      previousTransactions: 'One strategic acquisition completed successfully last year.',
      financialStrength: 'Moderate size but profitable with growing revenues.',
      overall: 'LifeScience Analytics offers good technology alignment and interesting market position.',
      scores: {
        offering: 75,
        customers: 70,
        previousTransactions: 68,
        financialStrength: 65,
        overall: 71
      }
    }
  },
  {
    id: 'buyer11',
    name: 'MedTech Innovators',
    type: 'strategic',
    description: 'Medical technology innovation',
    hq: 'Japan',
    location: 'Japan',
    employees: 480,
    revenue: 40000000,
    cash: 15000000,
    reportedDate: '2023-07-25',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://medtech-innovators.example.com',
    sector: 'Medical Technology, Healthcare',
    maTrackRecord: 'High',
    offering: 'Medical device technology',
    sectors: ['Medical Technology', 'Healthcare', 'Devices'],
    customers: 'Hospitals, Clinics, Medical practices',
    matchingScore: 85,
    rationale: {
      offering: 'Their medical device technology complements our client\'s software solutions.',
      customers: 'Strong presence in Asian healthcare markets.',
      previousTransactions: 'Three successful acquisitions in the past four years.',
      financialStrength: 'Strong financial position with consistent growth.',
      overall: 'MedTech Innovators offers excellent strategic fit and Asian market expansion potential.',
      scores: {
        offering: 88,
        customers: 85,
        previousTransactions: 84,
        financialStrength: 82,
        overall: 85
      }
    }
  },
  {
    id: 'buyer12',
    name: 'Healthcare Systems Inc',
    type: 'strategic',
    description: 'Healthcare management systems',
    hq: 'USA',
    location: 'USA',
    employees: 820,
    revenue: 92000000,
    cash: 38000000,
    reportedDate: '2023-06-18',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://healthcaresystems.example.com',
    sector: 'Healthcare IT, Management Systems',
    maTrackRecord: 'High',
    offering: 'Healthcare management platforms',
    sectors: ['Healthcare IT', 'Management Systems', 'Electronic Health Records'],
    customers: 'Hospitals, Healthcare systems, Clinics',
    matchingScore: 88,
    rationale: {
      offering: 'Their healthcare management platforms align perfectly with our client\'s technology.',
      customers: 'Large existing customer base of US healthcare providers.',
      previousTransactions: 'Five successful acquisitions completed in the last five years.',
      financialStrength: 'Very strong financial position with significant acquisition capacity.',
      overall: 'Healthcare Systems Inc offers excellent strategic fit and proven acquisition capability.',
      scores: {
        offering: 90,
        customers: 92,
        previousTransactions: 88,
        financialStrength: 86,
        overall: 88
      }
    }
  },
  {
    id: 'buyer13',
    name: 'BioAnalytics Ltd',
    type: 'strategic',
    description: 'Biological data analytics',
    hq: 'UK',
    location: 'UK',
    employees: 310,
    revenue: 27000000,
    cash: 9800000,
    reportedDate: '2023-09-08',
    isPEVCBacked: true,
    isPublic: false,
    website: 'https://bioanalytics.example.com',
    sector: 'Bioinformatics, Data Analytics',
    maTrackRecord: 'Low',
    offering: 'Biological data platforms',
    sectors: ['Bioinformatics', 'Data Analytics', 'Life Sciences'],
    customers: 'Research institutions, Biotech companies',
    matchingScore: 65,
    rationale: {
      offering: 'Their biological data analysis complements our client\'s technology focus.',
      customers: 'Strong relationships with European research institutions.',
      previousTransactions: 'No recent acquisition history but expressed interest in expansion.',
      financialStrength: 'Recently received significant PE investment for growth.',
      overall: 'BioAnalytics Ltd offers interesting technology alignment despite limited M&A experience.',
      scores: {
        offering: 70,
        customers: 68,
        previousTransactions: 55,
        financialStrength: 64,
        overall: 65
      }
    }
  },
  {
    id: 'buyer14',
    name: 'Clinical Research Tech',
    type: 'strategic',
    description: 'Clinical research technology',
    hq: 'Germany',
    location: 'Germany',
    employees: 490,
    revenue: 43000000,
    cash: 16500000,
    reportedDate: '2023-10-20',
    isPEVCBacked: false,
    isPublic: false,
    website: 'https://clinicalresearchtech.example.com',
    sector: 'Clinical Research, Technology',
    maTrackRecord: 'Medium',
    offering: 'Clinical research platforms',
    sectors: ['Clinical Research', 'Technology', 'Life Sciences'],
    customers: 'Pharmaceutical companies, CROs, Research institutions',
    matchingScore: 79,
    rationale: {
      offering: 'Their clinical research platforms align well with our client\'s technology.',
      customers: 'Strong relationships with European pharmaceutical companies.',
      previousTransactions: 'Two acquisitions completed in the last three years.',
      financialStrength: 'Solid financial position with good growth trajectory.',
      overall: 'Clinical Research Tech offers good strategic fit and European market presence.',
      scores: {
        offering: 82,
        customers: 80,
        previousTransactions: 75,
        financialStrength: 76,
        overall: 79
      }
    }
  },
  {
    id: 'buyer15',
    name: 'PharmaTech Solutions',
    type: 'strategic',
    description: 'Pharmaceutical technology solutions',
    hq: 'USA',
    location: 'USA',
    employees: 680,
    revenue: 62000000,
    cash: 25000000,
    reportedDate: '2023-08-05',
    isPEVCBacked: false,
    isPublic: true,
    website: 'https://pharmatech-solutions.example.com',
    sector: 'Pharmaceutical Technology, Healthcare IT',
    maTrackRecord: 'High',
    offering: 'Pharmaceutical software solutions',
    sectors: ['Pharmaceutical Technology', 'Healthcare IT', 'Life Sciences'],
    customers: 'Pharmaceutical companies, Biotech firms',
    matchingScore: 86,
    rationale: {
      offering: 'Their pharmaceutical software solutions align perfectly with our client\'s technology.',
      customers: 'Strong relationships with global pharmaceutical companies.',
      previousTransactions: 'Four successful acquisitions in the last five years.',
      financialStrength: 'Strong financial position with consistent growth.',
      overall: 'PharmaTech Solutions offers excellent strategic fit and proven acquisition capability.',
      scores: {
        offering: 88,
        customers: 90,
        previousTransactions: 85,
        financialStrength: 84,
        overall: 86
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
