
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBuyerSearchWorkspace() {
  const location = useLocation();
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);
  
  // Check if we're in the buyer search workspace
  useEffect(() => {
    // We would check for a specific route or query parameter that indicates 
    // we're in the buyer search workspace
    const isBuyerSearchPath = location.pathname.includes('/buyer-search');
    setIsWorkspaceMode(isBuyerSearchPath);
  }, [location.pathname]);
  
  return {
    isWorkspaceMode,
    setIsWorkspaceMode
  };
}
