import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Plus, ArrowRight, BarChart3, Brain, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import TotalProjects from '../components/dashboard/TotalProjects';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RestartTourButton } from '../components/onboarding/OnboardingTour';

const Dashboard = () => {
  // Mock data
  const totalProjectsCount = 3;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blueknight-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blueknight-500 to-blue-400">
                Dashboard
              </span>
            </h1>
            <RestartTourButton />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <TotalProjects count={totalProjectsCount} />
            
            <div className="premium-card p-6 animate-scale-in col-span-2 relative overflow-hidden bg-white">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
              </div>
              
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 text-blueknight-500 mr-2" />
                Quick Stats
              </h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blueknight-50 to-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm flex flex-col justify-between">
                  <p className="text-sm text-blueknight-600 font-medium">Active Projects</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold text-blueknight-800">3</p>
                    <BarChart3 className="h-5 w-5 text-blueknight-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blueknight-50 to-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm flex flex-col justify-between">
                  <p className="text-sm text-blueknight-600 font-medium">Pitch Support</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold text-blueknight-800">0</p>
                    <Sparkles className="h-5 w-5 text-blueknight-400" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blueknight-50 to-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm flex flex-col justify-between">
                  <p className="text-sm text-blueknight-600 font-medium">Source New Mandates</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold text-blueknight-800">0</p>
                    <Users className="h-5 w-5 text-blueknight-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-blueknight-800 mb-6 flex items-center">
            Project Options
            <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blueknight-500 animate-pulse"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="premium-card overflow-hidden animate-fade-in h-full border-none shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <AspectRatio ratio={16/9} className="bg-gradient-to-br from-blueknight-800 to-blue-900">
                  <div className="absolute inset-0 opacity-80">
                    <img
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                      alt="Buyer Search"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blueknight-500/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
              <CardContent className="p-6 flex flex-col h-52 bg-white">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Active Projects</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Match your active projects with the right strategic and PE buyers using our targeted search algorithms.
                </p>
                <div className="mt-auto flex gap-3 h-10">
                  <Link
                    to="/add-listing"
                    className="inline-flex items-center justify-center flex-1 rounded-md bg-gradient-to-r from-blueknight-500 to-blueknight-600 px-4 py-2.5 h-10 text-sm font-medium text-white hover:from-blueknight-600 hover:to-blueknight-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Create Buyer Search
                  </Link>
                  <Link
                    to="/listings?tab=active-projects"
                    className="inline-flex items-center justify-center flex-1 rounded-md bg-blueknight-100 px-4 py-2.5 h-10 text-sm font-medium text-blueknight-600 hover:bg-blueknight-200 transition-all border border-blueknight-200"
                  >
                    View Searches
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card overflow-hidden animate-fade-in h-full relative border-none shadow-md">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                  Coming Soon
                </Badge>
              </div>
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <AspectRatio ratio={16/9} className="bg-gradient-to-br from-blueknight-800 to-blue-900">
                  <div className="absolute inset-0 opacity-70">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                      alt="Pitch Search"
                      className="w-full h-full object-cover filter grayscale-[30%]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-blueknight-800/40 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blueknight-500/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white/70" />
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
              <CardContent className="p-6 flex flex-col h-52 bg-white">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Pitch Support</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Win new clients faster by showing them relevant buyers during your pitch.
                </p>
                <div className="mt-auto h-10">
                  <button
                    className="inline-flex items-center justify-center w-full rounded-md bg-gray-200 px-4 py-2.5 h-10 text-sm font-medium text-gray-500 opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Feature Launching Soon
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="premium-card overflow-hidden animate-fade-in h-full relative border-none shadow-md">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                  Coming Soon
                </Badge>
              </div>
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <AspectRatio ratio={16/9} className="bg-gradient-to-br from-blueknight-800 to-blue-900">
                  <div className="absolute inset-0 opacity-70">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                      alt="Find New Clients"
                      className="w-full h-full object-cover filter grayscale-[30%]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-blueknight-800/40 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blueknight-500/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Users className="h-5 w-5 text-white/70" />
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
              <CardContent className="p-6 flex flex-col h-52 bg-white">
                <h3 className="font-semibold text-lg text-blueknight-800 mb-2">Source New Mandates</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">
                  Discover potential clients looking to sell their businesses through our AI-powered matching system.
                </p>
                <div className="mt-auto h-10">
                  <button
                    className="inline-flex items-center justify-center w-full rounded-md bg-gray-200 px-4 py-2.5 h-10 text-sm font-medium text-gray-500 opacity-70 cursor-not-allowed"
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
