
import { useLocation } from 'react-router-dom';

export const useSidebarState = () => {
  const location = useLocation();
  
  // Check if we're on a listing details page
  const isListingDetailsPage = location.pathname.includes('/listings/') && /\/listings\/\d+/.test(location.pathname);
  
  // Extract listing ID from path if we're on a listing details page
  const listingId = isListingDetailsPage ? location.pathname.split('/')[2] : null;

  return {
    isListingDetailsPage,
    listingId,
    currentPath: location.pathname
  };
};
