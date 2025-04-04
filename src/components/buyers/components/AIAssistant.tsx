
import React from 'react';
import { Bot, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const { toast } = useToast();

  const handleAIAssistantQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('aiQuery') as HTMLInputElement;
    if (input.value.trim()) {
      toast({
        title: "AI Assistant",
        description: "Your query has been sent to the AI Assistant",
      });
      input.value = '';
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Bot className="h-4 w-4 mr-2" />
          AI Assistant
        </h3>
        <button 
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <p className="mb-2 font-medium">AI Assistant</p>
          <p>I can help you analyze this buyer list and provide insights. What would you like to know about these potential buyers?</p>
        </div>
        
        <form onSubmit={handleAIAssistantQuery} className="flex space-x-2">
          <input 
            type="text" 
            name="aiQuery"
            placeholder="Ask anything about these buyers..." 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
