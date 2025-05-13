
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBuyerSearchWorkspace() {
  const location = useLocation();
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);
  
  // Check if we're in the buyer search workspace
  useEffect(() => {
    const isBuyerSearchPath = location.pathname.includes('/buyer-search');
    setIsWorkspaceMode(isBuyerSearchPath);
  }, [location.pathname]);
  
  return {
    isWorkspaceMode
  };
}
