
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, BookmarkCheck, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";

type ProjectSubItemProps = {
  listingId: string | null;
};

const ProjectSubItems = ({ listingId }: ProjectSubItemProps) => {
  const location = useLocation();

  const projectSubItems = [
    { path: `/listings/${listingId}`, label: 'BlueKnight List', icon: <List className="h-4 w-4" /> },
    { path: `/listings/${listingId}/ai-buyer`, label: 'AI Buyer Builder', icon: <List className="h-4 w-4" /> },
    { path: `/listings/${listingId}/saved`, label: 'Saved List', icon: <BookmarkCheck className="h-4 w-4" /> },
    { path: `/listings/${listingId}/crm`, label: 'CRM', icon: <Users2 className="h-4 w-4" />, comingSoon: true },
  ];

  const handleCRMClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "Coming soon",
      description: "CRM features will be available in an upcoming update."
    });
  };

  return (
    <div className="ml-5 space-y-1 mt-1 mb-2">
      <div className="text-xs font-medium text-gray-500 px-2 py-1">
        Project Sections
      </div>
      <div className="space-y-1">
        {projectSubItems.map((subItem, index) => {
          // Check which sub-section is active
          let isSubActive = false;
          
          if (index === 0) {
            // BlueKnight List is active when path is exactly /listings/[id]
            isSubActive = location.pathname === `/listings/${listingId}`;
          } else if (index === 1) {
            // AI Buyer Builder is active when path includes /ai-buyer
            isSubActive = location.pathname.includes(`/listings/${listingId}/ai-buyer`);
          } else if (index === 2) {
            // Saved List is active when path includes /saved
            isSubActive = location.pathname.includes(`/listings/${listingId}/saved`);
          } else if (index === 3) {
            // CRM is active when path includes /crm
            isSubActive = location.pathname.includes(`/listings/${listingId}/crm`);
          }
          
          return (
            <Link
              key={subItem.label}
              to={subItem.path}
              onClick={subItem.comingSoon ? handleCRMClick : undefined}
              className={cn(
                "flex items-center py-1.5 px-2 rounded-md text-sm",
                isSubActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {React.cloneElement(subItem.icon, {
                className: cn(
                  "h-4 w-4 mr-2",
                  isSubActive
                    ? "text-gray-900"
                    : "text-gray-500"
                )
              })}
              {subItem.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSubItems;
