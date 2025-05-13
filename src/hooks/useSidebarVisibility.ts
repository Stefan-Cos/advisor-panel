
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSidebarVisibility = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // Hide sidebar when in buyer search workspace
    // We'll check for a specific URL parameter or path segment that indicates buyer search workspace
    const isBuyerSearchWorkspace = location.pathname.includes('/buyer-search');
    setSidebarVisible(!isBuyerSearchWorkspace);
  }, [location.pathname]);
  
  return {
    sidebarVisible,
    setSidebarVisible
  };
};
