
import React from 'react';
import { Zap } from 'lucide-react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-3">
        <Zap className="h-5 w-5 text-blueknight-500" />
        <h2 className="text-lg font-medium text-blueknight-800">BlueKnight List</h2>
      </div>
      <div className="p-4 bg-gradient-to-r from-blueknight-50 to-white border-l-4 border-blueknight-500 rounded-md">
        <p className="text-sm leading-relaxed text-gray-700">
          Buyers are ranked using a proprietary M&A model trained on real acquisition behavior, deal rationale, and strategic fit.
          This list reflects real-world acquirer behavior and prioritizes those most likely to pursue companies like yours.
        </p>
      </div>
    </div>
  );
};

export default BlueKnightDescription;
