
import React from 'react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        This table shows potential strategic buyers for your company, ranked by match score. 
        Our AI-powered analysis evaluates each buyer based on their strategic fit, acquisition history, 
        and financial capacity. Click on "Rationale" to see detailed analysis of why a particular 
        buyer might be interested in your company.
      </p>
      <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
        <p className="text-xs text-blue-700 flex items-center">
          <strong className="mr-2">Pro Tip:</strong> 
          Save potential buyers by clicking the "Save" button to add them to your shortlist for future reference.
        </p>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
