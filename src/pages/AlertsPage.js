import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle, Clock, Search, MapPin, Box, ArrowRight, Filter, X 
} from 'lucide-react';

// --- Mock Data with more context ---
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
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'
  const [alerts, setAlerts] = useState(initialAlerts);

  // Function to simulate resolving an alert
  const handleAcknowledge = (id) => {
    // In a real app, send API request to resolve
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 w-full h-full bg-black text-white flex flex-col overflow-hidden">
      
      {/* 1. Header & Stats */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Alerts</h1>
          <div className="flex gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> 1 Critical</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> 1 Warning</span>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col items-end gap-4">
          <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Active Alerts
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
            >
              History Log
            </button>
          </div>
        </div>
      </div>

      {/* 2. Controls Toolbar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by Tower ID, Region or Issue..." 
            className="w-full bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors text-gray-300">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* 3. Alerts List Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`relative bg-gray-900/50 border rounded-xl p-5 transition-all hover:bg-gray-900 group ${
              alert.severity === 'Critical' ? 'border-red-500/30 bg-red-900/5' : 
              alert.severity === 'Warning' ? 'border-yellow-500/30' : 'border-gray-800'
            }`}
          >
            <div className="flex justify-between items-start">
              
              {/* Left: Icon & Main Info */}
              <div className="flex gap-5">
                {/* Severity Icon Box */}
                <div className={`p-4 rounded-xl h-fit ${
                  alert.severity === 'Critical' ? 'bg-red-500/10 text-red-500' : 
                  alert.severity === 'Warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  <AlertTriangle size={24} />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl text-white">{alert.tower}</h3>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                       <MapPin size={12} /> {alert.region}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ml-2 ${
                      alert.severity === 'Critical' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 
                      alert.severity === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' : 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-2">{alert.message}</p>
                  
                  {/* Data Evidence (The "Why") */}
                  <div className="inline-block px-3 py-1 bg-black rounded text-xs font-mono text-gray-400 border border-gray-800">
                    Trigger: <span className="text-white font-bold">{alert.triggerValue}</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions & Time */}
              <div className="flex flex-col items-end justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={14} /> {alert.time}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                   {/* View in 3D Button */}
                   <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg" title="Inspect in 3D">
                     <Box size={20} />
                   </button>
                   {/* Locate on Map Button */}
                   <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg" title="Locate on Map">
                     <MapPin size={20} />
                   </button>
                   {/* Main Action */}
                   <button 
                     onClick={() => handleAcknowledge(alert.id)}
                     className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                   >
                     <CheckCircle size={16} />
                     Acknowledge
                   </button>
                </div>
              </div>

            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
            <p>All systems normal. No active alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;