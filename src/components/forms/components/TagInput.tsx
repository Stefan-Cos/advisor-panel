
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InfoPopover } from './InfoPopover';

interface TagInputProps {
  label: string;
  description?: string;
  tags: string[];
  placeholder: string;
  infoExample?: string;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  description,
  tags = [],
  placeholder,
  infoExample,
  onAddTag,
  onRemoveTag
}) => {
  const [inputValue, setInputValue] = useState("");
  
  const handleAddTag = () => {
    if (!inputValue.trim()) return;
    onAddTag(inputValue.trim());
    setInputValue("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {infoExample && <InfoPopover example={infoExample} />}
      </div>
      
      {description && <p className="text-xs text-gray-500">{description}</p>}
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => onRemoveTag(index)}
              className="text-blue-500 hover:text-blue-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button 
          type="button"
          size="sm"
          onClick={handleAddTag}
          disabled={!inputValue}
        >
          Add
        </Button>
      </div>
      
      <p className="text-xs text-gray-500">Press Enter to add</p>
    </div>
  );
};

export default TagInput;
