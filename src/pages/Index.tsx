
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate authentication check and redirect to dashboard
    const redirectToDashboard = () => {
      toast({
        title: "Welcome to BlueKnight",
        description: "You have been automatically logged in",
      });
      
      navigate('/dashboard');
    };
    
    // Short timeout for demo purposes
    const timer = setTimeout(redirectToDashboard, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 bg-blueknight-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">B</div>
        <h1 className="text-3xl font-bold text-blueknight-800 mb-2">BlueKnight</h1>
        <p className="text-gray-600">Connecting M&A advisors with the right buyers</p>
        <div className="mt-8">
          <div className="animate-pulse h-2 w-36 bg-blueknight-200 rounded-full mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
