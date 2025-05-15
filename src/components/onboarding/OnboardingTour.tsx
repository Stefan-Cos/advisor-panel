
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tourService from '@/services/TourService';
import 'shepherd.js/dist/css/shepherd.css';
import { Button } from "@/components/ui/button";

// Custom CSS for our tour styling
const TourStyles = () => (
  <style jsx="true">{`
    .shepherd-element {
      border-radius: 0.5rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      background-color: white;
      max-width: 400px;
    }
    
    .shepherd-header {
      background-color: #001437;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding: 0.75rem 1rem;
    }
    
    .shepherd-title {
      color: white;
      font-size: 1.15rem;
      font-weight: 600;
    }
    
    .shepherd-cancel-icon {
      color: white;
    }
    
    .shepherd-text {
      padding: 1.25rem;
      color: #4b5563;
      font-size: 0.925rem;
      line-height: 1.5;
    }
    
    .shepherd-button {
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .shepherd-button:last-child {
      margin-right: 0;
    }
    
    .shepherd-button:not(.shepherd-button-secondary) {
      background-color: #001437;
      color: white;
    }
    
    .shepherd-button:not(.shepherd-button-secondary):hover {
      background-color: #00204f;
    }
    
    .shepherd-button-secondary {
      background-color: transparent;
      border: 1px solid #d1d5db;
      color: #6b7280;
    }
    
    .shepherd-button-secondary:hover {
      background-color: #f3f4f6;
    }
    
    .shepherd-footer {
      padding: 0.75rem 1rem;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      display: flex;
      justify-content: flex-end;
    }
    
    .shepherd-arrow {
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    }
    
    .shepherd-arrow::before {
      background-color: white;
    }
  `}</style>
);

interface OnboardingTourProps {
  autoStart?: boolean;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ autoStart = true }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Only start the tour automatically on the dashboard
    if (autoStart && location.pathname === '/dashboard' && tourService.shouldShowTour()) {
      setTimeout(() => {
        tourService.startTour();
      }, 1000); // Delay to allow the page to fully render
    }
  }, [autoStart, location.pathname]);

  return (
    <>
      <TourStyles />
      {/* Hidden elements to ensure tour steps have targets even when not on the right page */}
      <div id="blueknight-list-section" className="hidden" />
      <div id="ai-buyer-builder-section" className="hidden" />
      <div className="process-animation-placeholder hidden" />
    </>
  );
};

// Separate component for manual restart button
export const RestartTourButton: React.FC = () => {
  const handleRestartTour = () => {
    tourService.restartTour();
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleRestartTour}
      className="flex items-center space-x-2"
    >
      <span>Restart Tour</span>
    </Button>
  );
};

export default OnboardingTour;
