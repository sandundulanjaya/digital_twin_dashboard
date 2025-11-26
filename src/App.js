import React, { useState } from 'react';
// Import the components
import Dashboard from './pages/Dashboard'; // Your existing Home page
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
// Sidebar icons
import { LayoutDashboard, Map, Bell, Settings } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'map', 'alerts', 'settings'

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <MapPage />;
      case 'alerts': return <AlertsPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* SHARED SIDEBAR */}
      <div className="w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-8 space-y-8 h-screen z-20">
        <div className="p-3 bg-blue-600 rounded-xl mb-4">
           {/* Logo */}
        </div>
        
        {/* Navigation Buttons */}
        <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
           <LayoutDashboard />
        </button>
        <button onClick={() => setActiveTab('map')} className={`p-3 rounded-xl transition-all ${activeTab === 'map' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
           <Map />
        </button>
         <button onClick={() => setActiveTab('alerts')} className={`p-3 rounded-xl transition-all ${activeTab === 'alerts' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
           <Bell />
        </button>
         <button onClick={() => setActiveTab('settings')} className={`p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
           <Settings />
        </button>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
    </div>
  );
};
export default App;