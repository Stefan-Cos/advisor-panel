
import React from 'react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-blueknight-800 mb-2">BlueKnight List</h2>
      <p className="text-sm text-gray-600">
        This table shows potential strategic buyers for your company, ranked by match score. 
        Our AI-powered analysis evaluates each buyer based on their strategic fit, acquisition history, 
        and financial capacity. Click on "Rationale" to see detailed analysis of why a particular 
        buyer might be interested in your company.
      </p>
      <div className="mt-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>Pro Tip:</strong> Save potential buyers by clicking the "Save" button to add them to your shortlist for future reference.
        </p>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
