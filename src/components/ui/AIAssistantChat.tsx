import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  SparkleIcon, 
  Bot 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const AIAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Assistant. How can I help you with your M&A activities today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m analyzing your request. This is a demo of the AI Assistant interface. In the full version, I can help with buyer recommendations, deal analysis, and market insights.',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      toast({
        title: "AI Assistant",
        description: "New message from your AI Assistant"
      });
    }, 1000);
  };
  
  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blueknight-500 text-white flex items-center justify-center shadow-lg hover:bg-blueknight-600 transition-all z-50"
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="bg-blueknight-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SparkleIcon className="h-5 w-5" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-blueknight-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-blueknight-500 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask the AI Assistant..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blueknight-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blueknight-500 text-white p-2 rounded-full hover:bg-blueknight-600"
                disabled={!inputValue.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistantChat;
