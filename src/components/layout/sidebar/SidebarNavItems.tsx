
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  FileText, 
  Settings,
  MessageCircle
} from 'lucide-react';
import { useSidebarState } from '@/hooks/useSidebarState';
import { cn } from '@/lib/utils';
import ProjectSubItems from './ProjectSubItems';
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SidebarNavItemsProps {
  collapsed?: boolean;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ collapsed = false }) => {
  const { isListingDetailsPage, listingId } = useSidebarState();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  
  const navItems = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Projects',
      path: '/listings',
      icon: <LayoutGrid className="w-5 h-5" />,
      hasSubItems: true
    },
    {
      title: 'Buyer Mandates',
      path: '/buyer-mandates',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />
    },
    {
      title: 'Give us Feedback',
      path: '#feedback',
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => setDialogOpen(true)
    }
  ];

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Thank you for your feedback!",
        description: "We'll review it shortly."
      });
      setFeedback("");
      setDialogOpen(false);
      // Navigate to projects after submission
      navigate("/listings");
    } else {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting."
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Navigation Items */}
      <ul className={cn(
        "space-y-2",
        collapsed ? "flex flex-col items-center" : ""
      )}>
        {navItems.map((item, index) => {
          const isActive = item.path !== '#feedback' ? pathname.startsWith(item.path) : false;
          
          return (
            <li key={index} className="relative">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors w-full",
                    isActive ? "bg-[#001437] text-white" : "text-gray-600 hover:bg-gray-100",
                    collapsed ? "justify-center w-10 h-10" : "space-x-3"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors",
                    isActive ? "bg-[#001437] text-white" : "text-gray-600 hover:bg-gray-100",
                    collapsed ? "justify-center w-10 h-10" : "space-x-3"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
              
              {/* Only show project subitems when not collapsed and for the Projects nav item */}
              {!collapsed && item.hasSubItems && isActive && isListingDetailsPage && (
                <ProjectSubItems listingId={listingId} />
              )}
            </li>
          );
        })}
      </ul>

      {/* Feedback Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Feedback Matters</DialogTitle>
            <DialogDescription>
              Help us improve BlueKnight by sharing your thoughts on existing features or suggesting new ones.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Tell us what you think or what features you'd like to see..."
              className="min-h-[150px]"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarNavItems;
