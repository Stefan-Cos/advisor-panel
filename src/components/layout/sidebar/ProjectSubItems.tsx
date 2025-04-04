
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, BookmarkCheck, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProjectSubItemProps = {
  listingId: string | null;
};

const ProjectSubItems = ({ listingId }: ProjectSubItemProps) => {
  const location = useLocation();
  const { toast } = useToast();

  const projectSubItems = [
    { path: `/listings/${listingId}`, label: 'Buyer List', icon: <List className="h-4 w-4" /> },
    { path: `/listings/${listingId}/saved`, label: 'Saved List', icon: <BookmarkCheck className="h-4 w-4" /> },
    { path: `/listings/${listingId}/crm`, label: 'CRM', icon: <Users2 className="h-4 w-4" /> },
  ];

  const handleCRMClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "CRM Features",
      description: "CRM features coming soon",
    });
  };

  return (
    <div className="ml-5 space-y-1 mt-1">
      <Accordion type="single" collapsible defaultValue="listing-subsections">
        <AccordionItem value="listing-subsections" className="border-none">
          <AccordionTrigger className="py-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded px-2">
            <span className="text-sm font-medium">Project Sections</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-1">
            {projectSubItems.map((subItem, index) => {
              // Check which sub-section is active
              let isSubActive = false;
              
              if (index === 0) {
                // Buyer List is active when path is exactly /listings/[id]
                isSubActive = location.pathname === `/listings/${listingId}`;
              } else if (index === 1) {
                // Saved List is active when path includes /saved
                isSubActive = location.pathname.includes(`/listings/${listingId}/saved`);
              } else if (index === 2) {
                // CRM is active when path includes /crm
                isSubActive = location.pathname.includes(`/listings/${listingId}/crm`);
              }
              
              return (
                <Link
                  key={subItem.label}
                  to={subItem.path}
                  onClick={subItem.label === 'CRM' ? handleCRMClick : undefined}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectSubItems;
