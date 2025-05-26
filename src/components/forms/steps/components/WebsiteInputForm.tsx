
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface WebsiteInputFormProps {
  website: string;
  setWebsite: (website: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing: boolean;
}

const WebsiteInputForm: React.FC<WebsiteInputFormProps> = ({
  website,
  setWebsite,
  onSubmit,
  isAnalyzing
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="website">Company Website URL</Label>
        <div className="flex gap-2">
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://www.example.com"
            className="flex-1"
            disabled={isAnalyzing}
          />
          <Button 
            type="submit" 
            disabled={!website || isAnalyzing}
            className="bg-blueknight-600 hover:bg-blueknight-700"
          >
            Analyse
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WebsiteInputForm;
