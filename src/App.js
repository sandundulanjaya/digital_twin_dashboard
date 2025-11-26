import React, { useState } from 'react';
// Import the components
import Dashboard from './pages/Dashboard'; // Your existing Home page
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/navbar';

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
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>
    </div>
  );
};
export default App;