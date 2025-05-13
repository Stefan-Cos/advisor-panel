
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useBuyerSearchWorkspace() {
  const location = useLocation();
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);
  
  // Check if we're in the buyer search workspace
  useEffect(() => {
    // Path should be exactly /buyer-search/[id] format to be considered in workspace mode
    const isBuyerSearchPath = /^\/buyer-search\/\w+$/.test(location.pathname);
    setIsWorkspaceMode(isBuyerSearchPath);
  }, [location.pathname]);
  
  return {
    isWorkspaceMode
  };
}
