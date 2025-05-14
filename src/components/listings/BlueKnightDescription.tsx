
import React from 'react';
import { Zap } from 'lucide-react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-blueknight-800">BlueKnight List</h2>
      </div>
      <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm leading-relaxed text-gray-700">
          Buyers are ranked using a proprietary M&A model trained on real acquisition behavior, deal rationale, and strategic fit.
          This list reflects real-world acquirer behavior and prioritizes those most likely to pursue companies like yours.
        </p>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
