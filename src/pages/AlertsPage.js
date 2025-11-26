import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Search } from 'lucide-react';

const alertsData = [
  { id: 1, tower: 'Tower-01', severity: 'Critical', type: 'Rust Risk', message: 'Structural integrity compromised at Joint-4', time: '10 mins ago' },
  { id: 2, tower: 'Tower-05', severity: 'Warning', type: 'High Wind', message: 'Wind speed exceeded 45 km/h safe limit', time: '2 hours ago' },
  { id: 3, tower: 'Tower-03', severity: 'Info', type: 'Maintenance', message: 'Scheduled maintenance completed', time: '1 day ago' },
];

const AlertsPage = () => {
  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">System Alerts</h1>
          <p className="text-gray-400">Real-time notifications from TwinMaker prediction models</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700">Filter</button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alertsData.map((alert) => (
          <div key={alert.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center gap-6">
              {/* Icon based on Severity */}
              <div className={`p-3 rounded-full ${
                alert.severity === 'Critical' ? 'bg-red-900/30 text-red-500' : 
                alert.severity === 'Warning' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-blue-900/30 text-blue-500'
              }`}>
                <AlertTriangle size={24} />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{alert.tower}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    alert.severity === 'Critical' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 
                    alert.severity === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' : 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-gray-300">{alert.message}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} />
                {alert.time}
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <CheckCircle size={16} />
                Acknowledge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;