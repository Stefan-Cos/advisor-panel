
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Search, Filter, SlidersHorizontal, Bot } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import AIAssistantChat from '../ui/AIAssistantChat';

interface ListingDetailsProps {
  id: string;
  companyName: string;
  projectTitle: string;
  revenue: string;
  industry: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  revenue,
  industry,
  country,
  status,
}) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Analytics stats
  const analyticsStats = [
    { 
      label: "Buyer Country Match", 
      value: 13, 
      icon: <PieChart className="h-5 w-5 text-blue-500" /> 
    },
    { 
      label: "Revenue Range Match", 
      value: 8, 
      icon: <PieChart className="h-5 w-5 text-green-500" /> 
    },
    { 
      label: "Industry Match", 
      value: 21, 
      icon: <PieChart className="h-5 w-5 text-purple-500" /> 
    }
  ];

  // Determine which content to show based on the URL path
  const showAIBuyerBuilder = path.includes('/ai-buyer');
  const showSavedList = path.includes('/saved');
  const showCRM = path.includes('/crm');

  return (
    <div className="space-y-6 w-full relative">
      <Card>
        <CardContent className="py-3 px-4">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4">
              {analyticsStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-50 p-2 rounded-lg">
                  <div className="mb-1">{stat.icon}</div>
                  <span className="text-xs font-medium text-gray-700 mb-1">{stat.label}</span>
                  <span className="text-lg font-bold text-blueknight-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Show content based on the current route */}
      {showSavedList ? (
        <SavedList listingId={id} />
      ) : showCRM ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
          <p className="text-gray-500 mt-2">
            Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
          </p>
        </div>
      ) : showAIBuyerBuilder ? (
        // AI Buyer Builder content with horizontal filters
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
          <h2 className="text-base font-medium text-blueknight-700 mb-3">AI Buyer Builder</h2>
          
          {/* Horizontal filters for AI Buyer Builder */}
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md">
              <Search className="h-3.5 w-3.5 text-gray-500" />
              <Input 
                placeholder="Search buyers..." 
                className="border-0 bg-transparent text-sm h-7 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
            </div>
            
            <div className="flex-1 grid grid-cols-5 gap-2">
              <Select defaultValue="country">
                <SelectTrigger className="h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="country">All Countries</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="revenue">
                <SelectTrigger className="h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Revenue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Any Revenue</SelectItem>
                  <SelectItem value="50m">$50M+</SelectItem>
                  <SelectItem value="100m">$100M+</SelectItem>
                  <SelectItem value="500m">$500M+</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="industry">
                <SelectTrigger className="h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industry">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="match">
                <SelectTrigger className="h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Match Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Any Score</SelectItem>
                  <SelectItem value="75">75%+</SelectItem>
                  <SelectItem value="85">85%+</SelectItem>
                  <SelectItem value="95">95%+</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="type">
                <SelectTrigger className="h-8 text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Buyer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type">All Types</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                  <SelectItem value="pe">Private Equity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center space-x-1 px-3 py-1 bg-blueknight-100 text-blueknight-700 rounded-md text-xs hover:bg-blueknight-200">
                <Bot className="h-3.5 w-3.5" />
                <span>AI Assistant</span>
              </button>
              
              <button className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs hover:bg-purple-200">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Advanced</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-1 text-xs mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Active filters:</span>
              <button className="text-blueknight-600 hover:text-blueknight-800 text-xs font-medium">Clear all</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                Match: 75%+
                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                Revenue: $50M+
                <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
              </span>
            </div>
          </div>
          
          <BuyerListNew listingId={id} />
        </div>
      ) : (
        // Default content (BlueKnight List)
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-blueknight-700 mb-4">BlueKnight List</h2>
          <BuyerListNew listingId={id} />
        </div>
      )}
      
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
