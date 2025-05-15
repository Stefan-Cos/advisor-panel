
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import SettingsNavigation from '../components/settings/SettingsNavigation';
import AccountSettings from '../components/settings/AccountSettings';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const location = useLocation();
  const section = location.hash.replace('#', '') || 'account';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-blueknight-800 mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">Manage your account and application preferences</p>
            
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SettingsNavigation activeSection={section} />
                
                <div className="md:col-span-3">
                  {section === 'account' && <AccountSettings />}
                  {/* Add more sections here when needed */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
