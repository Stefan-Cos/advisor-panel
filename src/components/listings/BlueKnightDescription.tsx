
import React from 'react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        AI-Generated Buyer Recommendations
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        This table shows potential strategic buyers for your company, ranked by match score. 
        Our AI-powered analysis evaluates each buyer based on their strategic fit, acquisition history, 
        and financial capacity. Click on "Rationale" to see detailed analysis of why a particular 
        buyer might be interested in your company.
      </p>
      <div className="px-4 py-2 bg-blue-50 border-l-4 border-blue-500 rounded-md">
        <p className="text-xs text-blue-700 flex items-center">
          <strong className="mr-2">Pro Tip:</strong> 
          Save potential buyers by clicking the "Save" button to add them to your shortlist for future reference.
        </p>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
