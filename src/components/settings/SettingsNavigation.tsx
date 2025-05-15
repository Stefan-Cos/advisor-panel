
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface SettingsNavigationProps {
  activeSection: string;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'account', label: 'Account', icon: <Users className="h-4 w-4" /> },
    // Add more settings sections as needed
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={`/settings#${item.id}`}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md",
            activeSection === item.id
              ? "bg-[#001437] text-white"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {React.cloneElement(item.icon as React.ReactElement, {
            className: cn(
              "mr-3 h-4 w-4",
              activeSection === item.id
                ? "text-white" 
                : "text-gray-500"
            )
          })}
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default SettingsNavigation;
