
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonTabProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ title, description, imageUrl }) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center p-12">
        <Badge variant="secondary" className="mb-4 bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
          Coming Soon
        </Badge>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
          {description}
        </p>
        <div className="h-48 w-full max-w-md relative opacity-80">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg filter grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-blueknight-800/20 rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonTab;
