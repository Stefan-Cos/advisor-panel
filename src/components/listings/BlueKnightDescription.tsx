
import React from 'react';
import { Zap } from 'lucide-react';

const BlueKnightDescription: React.FC = () => {
  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-blueknight-800 mb-2">
        BlueKnight List
      </h2>
      <p className="text-sm text-gray-700">
        Buyers are ranked using a proprietary M&A model trained on real acquisition behavior, deal rationale, and strategic fit.
        This list reflects real-world acquirer behavior and prioritizes those most likely to pursue companies like yours.
      </p>
    </div>
  );
};

export default BlueKnightDescription;
