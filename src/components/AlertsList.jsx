import React from 'react';
import { AlertTriangle, CheckCircle, Clock, MapPin, Box } from 'lucide-react';

const AlertsList = ({ alerts, onAcknowledge }) => {
  
  if (alerts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
        <p>All systems normal. No active alerts.</p>
      </div>
    );
  }

  return (
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
                
                {/* Data Evidence */}
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
                   onClick={() => onAcknowledge(alert.id)}
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
    </div>
  );
};

export default AlertsList; 