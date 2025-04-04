
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListFilter, 
  MessageSquare, 
  Settings, 
  Users,
  BarChart,
  LogOut,
  Building,
  MessageCircle,
  List,
  BookmarkCheck,
  Users2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  
  // Check if we're on a listing details page
  const isListingDetailsPage = location.pathname.includes('/listings/') && /\/listings\/\d+/.test(location.pathname);
  
  // Extract listing ID from path if we're on a listing details page
  const listingId = isListingDetailsPage ? location.pathname.split('/')[2] : null;
  
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/listings', label: 'Projects', icon: <ListFilter className="h-5 w-5" /> },
    { path: '/buyer-mandates', label: 'Active Buyer Mandates', icon: <Building className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
  ];
  
  const projectSubItems = [
    { path: `/listings/${listingId}`, label: 'Buyer List', icon: <List className="h-4 w-4" /> },
    { path: `/listings/${listingId}/saved`, label: 'Saved List', icon: <BookmarkCheck className="h-4 w-4" /> },
    { path: `/listings/${listingId}/crm`, label: 'CRM', icon: <Users2 className="h-4 w-4" /> },
  ];
  
  const handleMessagesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/messages') {
      e.preventDefault();
      toast({
        title: "Messages",
        description: "Messaging features coming soon",
      });
    }
  };
  
  const handleSettingsItemClick = (settingType: string) => {
    toast({
      title: `${settingType} Settings`,
      description: `${settingType} settings features coming soon`,
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    // Redirect to login in a real app
    window.location.href = '/';
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it shortly.",
      });
      setFeedback("");
    } else {
      toast({
        title: "Empty Feedback",
        description: "Please enter some feedback before submitting.",
        variant: "destructive"
      });
    }
  };
  
  const handleCRMClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "CRM Features",
      description: "CRM features coming soon",
    });
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            // Check if this is the Projects item and we're on a listing details page
            const isProjectsItem = item.path === '/listings';
            const isActive = isProjectsItem 
              ? (location.pathname === '/listings' || isListingDetailsPage)
              : location.pathname === item.path;
              
            return (
              <React.Fragment key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "nav-link group",
                    isActive 
                      ? "bg-blueknight-500 text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={item.path === '/messages' ? handleMessagesClick : undefined}
                >
                  {React.cloneElement(item.icon, {
                    className: cn(
                      "h-5 w-5",
                      isActive 
                        ? "text-white" 
                        : "text-gray-500 group-hover:text-gray-600"
                    )
                  })}
                  <span>{item.label}</span>
                </Link>
                
                {/* Add subsections for the specific listing */}
                {isProjectsItem && isListingDetailsPage && (
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
                )}
              </React.Fragment>
            );
          })}
          
          <Collapsible
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            className="w-full"
          >
            <CollapsibleTrigger className={cn(
              "nav-link group w-full text-left",
              isSettingsOpen
                ? "bg-blueknight-500 text-white" 
                : "text-gray-600 hover:bg-gray-100"
            )}>
              <Settings className={cn(
                "h-5 w-5",
                isSettingsOpen
                  ? "text-white" 
                  : "text-gray-500 group-hover:text-gray-600"
              )} />
              <span>Settings</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-5 space-y-1 mt-1">
              <button 
                onClick={() => handleSettingsItemClick('Account')}
                className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
              >
                <Users className="h-4 w-4 text-gray-500" />
                <span>Account</span>
              </button>
              <button 
                onClick={() => handleSettingsItemClick('Analytics')}
                className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
              >
                <BarChart className="h-4 w-4 text-gray-500" />
                <span>Analytics</span>
              </button>
            </CollapsibleContent>
          </Collapsible>

          {/* Feedback Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="nav-link w-full text-left text-gray-600 hover:bg-gray-100 mt-2">
                <MessageCircle className="h-5 w-5 text-gray-500" />
                <span>Give us Feedback</span>
              </button>
            </DialogTrigger>
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
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5 text-gray-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
