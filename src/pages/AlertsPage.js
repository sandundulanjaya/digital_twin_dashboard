import React, { useState } from 'react';
import AlertsHeader from '../components/AlertsHeader';
import AlertsFilter from '../components/AlertsFilter';
import AlertsList from '../components/AlertsList';

// --- Mock Data ---
const initialAlerts = [
  { 
    id: 1, 
    tower: 'Tower-01', 
    region: 'Colombo Fort', 
    severity: 'Critical', 
    type: 'Rust Risk', 
    message: 'Structural integrity compromised at Joint-4', 
    triggerValue: 'Rain Probability: 92%', 
    time: '10 mins ago' 
  },
  { 
    id: 2, 
    tower: 'Tower-05', 
    region: 'Bambalapitiya', 
    severity: 'Warning', 
    type: 'High Wind', 
    message: 'Wind speed exceeded 45 km/h safe limit', 
    triggerValue: 'Wind: 48 km/h', 
    time: '2 hours ago' 
  },
  { 
    id: 3, 
    tower: 'Tower-03', 
    region: 'Nugegoda', 
    severity: 'Info', 
    type: 'Maintenance', 
    message: 'Scheduled maintenance completed successfully', 
    triggerValue: 'Routine Check', 
    time: '1 day ago' 
  },
];

const AlertsPage = () => {
  const [activeTab, setActiveTab] = useState('active'); 
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleAcknowledge = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 w-full h-full bg-black text-white flex flex-col overflow-hidden">
      
      <AlertsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AlertsFilter />
      
      <AlertsList alerts={alerts} onAcknowledge={handleAcknowledge} />

    </div>
  );
};

export default AlertsPage;