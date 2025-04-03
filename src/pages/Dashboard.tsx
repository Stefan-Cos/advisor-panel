
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Plus, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import TotalProjects from '../components/dashboard/TotalProjects';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data
  const totalProjectsCount = 3;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <TotalProjects count={totalProjectsCount} />
            
            <div className="premium-card p-6 animate-scale-in col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Active Projects</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">3</p>
                </div>
                
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Pitch Support</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">0</p>
                </div>
                
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Source New Mandates</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">0</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-blueknight-800 mb-6">Project Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="premium-card overflow-hidden animate-fade-in h-full">
              <div className="h-48 bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Buyer Search"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 flex flex-col h-52">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Active Projects</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Match your active projects with the right strategic and PE buyers using our targeted search algorithms.
                </p>
                <div className="mt-auto flex gap-3">
                  <Link
                    to="/add-listing"
                    className="inline-flex items-center justify-center flex-1 rounded-md bg-blueknight-500 px-2 py-2 text-sm font-medium text-white hover:bg-blueknight-600 transition-colors"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Create Buyer Search
                  </Link>
                  <Link
                    to="/listings?tab=active-projects"
                    className="inline-flex items-center justify-center flex-1 rounded-md bg-blueknight-300 px-2 py-2 text-sm font-medium text-white hover:bg-blueknight-400 transition-colors"
                  >
                    View Searches
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card overflow-hidden animate-fade-in h-full relative opacity-80">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                  Coming Soon
                </Badge>
              </div>
              <div className="h-48 bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Pitch Search"
                  className="w-full h-full object-cover filter grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-blueknight-800/20"></div>
              </div>
              <CardContent className="p-6 flex flex-col h-52">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Pitch Support</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Win new clients faster by showing them relevant buyers during your pitch.
                </p>
                <div className="mt-auto">
                  <button
                    className="btn-secondary flex items-center justify-center w-full opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Feature Launching Soon
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card overflow-hidden animate-fade-in h-full relative opacity-80">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                  Coming Soon
                </Badge>
              </div>
              <div className="h-48 bg-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Find New Clients"
                  className="w-full h-full object-cover filter grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-blueknight-800/20"></div>
              </div>
              <CardContent className="p-6 flex flex-col h-52">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Source New Mandates</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Discover potential clients looking to sell their businesses through our AI-powered matching system.
                </p>
                <div className="mt-auto">
                  <button
                    className="btn-secondary flex items-center justify-center w-full opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Feature Launching Soon
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
