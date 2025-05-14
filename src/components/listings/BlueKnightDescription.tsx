
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6 bg-white p-5 rounded-lg border border-gray-100 shadow-sm relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blueknight-400 rounded-full filter blur-2xl"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <Brain className="h-5 w-5 text-blueknight-500 mr-2" />
          <h3 className="text-lg font-semibold text-blueknight-800">
            AI-Generated Buyer Recommendations
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          This table shows potential strategic buyers for your company, ranked by match score. 
          Our AI-powered analysis evaluates each buyer based on their strategic fit, acquisition history, 
          and financial capacity. Click on "Rationale" to see detailed analysis of why a particular 
          buyer might be interested in your company.
        </p>
        
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blueknight-50 border-l-4 border-blueknight-500 rounded-md flex items-center">
          <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
          <p className="text-xs text-blue-700 flex items-center">
            <strong className="mr-2">Pro Tip:</strong> 
            Save potential buyers by clicking the "Save" button to add them to your shortlist for future reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
