import React from 'react';

const AlertsHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Alerts</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> 1 Critical</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> 1 Warning</span>
        </div>
      </div>

      {/* Tabs */}
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
  );
};

export default AlertsHeader;