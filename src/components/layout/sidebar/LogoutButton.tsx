
import React from 'react';
import { LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    // Redirect to login in a real app
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
    >
      <LogOut className="h-5 w-5 text-gray-500" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
