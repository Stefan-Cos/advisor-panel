
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, ChevronUp } from "lucide-react";

export type ImportanceType = 'high' | 'medium' | 'low' | 'N/A';

export interface PreferenceItemProps {
  title: string;
  description: string;
  items: Array<{ name: string; importance: ImportanceType }>;
  isEditing: boolean;
  inputValue: string;
  placeholder: string;
  onInputChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (name: string) => void;
  onImportanceChange: (name: string, importance: ImportanceType) => void;
}

const importanceOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
  { label: 'N/A', value: 'N/A' },
];

const PreferenceItem: React.FC<PreferenceItemProps> = ({
  title,
  description,
  items,
  isEditing,
  inputValue,
  placeholder,
  onInputChange,
  onAddItem,
  onRemoveItem,
  onImportanceChange
}) => {
  return (
    <div className="mb-6 border-b border-gray-100 pb-6">
      <div className="flex items-start mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-blueknight-700">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="text-sm font-medium">Importance</div>
      </div>
      
      {/* Items list */}
      {items.length > 0 && (
        <div className="space-y-2 mb-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.name}</span>
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <Select 
                      value={item.importance} 
                      onValueChange={(value) => onImportanceChange(item.name, value as ImportanceType)}
                    >
                      <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue placeholder="Importance" />
                      </SelectTrigger>
                      <SelectContent>
                        {importanceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-xs">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <Badge variant="outline" className={`
                    text-xs
                    ${item.importance === 'high' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                    ${item.importance === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    ${item.importance === 'low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${item.importance === 'N/A' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                  `}>
                    {item.importance}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add new item input - only visible in edit mode */}
      {isEditing && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="text-sm h-9"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
            className="flex items-center justify-center w-9 h-9 p-0 min-w-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreferenceItem;
