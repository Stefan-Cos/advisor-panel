
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBuyerSearchWorkspace() {
  const location = useLocation();
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);
  
  // Check if we're in the buyer search workspace
  useEffect(() => {
    // Path should include /buyer-search/ to be considered in workspace mode
    const isBuyerSearchPath = location.pathname.includes('/buyer-search/');
    setIsWorkspaceMode(isBuyerSearchPath);
  }, [location.pathname]);
  
  return {
    isWorkspaceMode
  };
}
