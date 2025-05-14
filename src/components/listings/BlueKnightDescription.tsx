
import React from 'react';
import { Zap } from 'lucide-react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-blueknight-800 mb-2 flex items-center">
        <Zap className="mr-2 h-5 w-5 text-blueknight-500" />
        BlueKnight List
      </h2>
      <p className="text-sm leading-relaxed text-gray-700">
        Buyers are ranked using a proprietary M&A model trained on real acquisition behavior, deal rationale, and strategic fit.
        This list reflects real-world acquirer behavior and prioritizes those most likely to pursue companies like yours.
      </p>
    </div>
  );
};

export default BlueKnightDescription;
