import React from 'react';
import { Cpu, Wrench, AlertCircle, CheckCircle } from 'lucide-react';

const HealthDiagnostics = ({ components = [], recommendations = [] }) => {
  if (!components || !recommendations) {
    return <div className="text-gray-500 p-4">No diagnostic data available.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Component Health Breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Cpu size={20} className="text-purple-400"/> Component Diagnostics
        </h3>
        <div className="space-y-6">
          {components.map((comp, index) => (
            <div key={comp.name || index}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">{comp.name}</span>
                <span className={`text-sm font-bold ${
                  comp.status === 'Critical' ? 'text-red-500' : 
                  comp.status === 'Warning' ? 'text-yellow-500' : 'text-green-500'
                }`}>{comp.health}%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    comp.status === 'Critical' ? 'bg-red-600' : 
                    comp.status === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${comp.health}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Wrench size={20} className="text-orange-400"/> AI Recommended Actions
        </h3>
        <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className={`p-4 rounded-xl flex gap-4 border ${
                rec.type === 'critical' ? 'bg-red-900/10 border-red-900/50' : 
                rec.type === 'warning' ? 'bg-yellow-900/10 border-yellow-900/50' : 'bg-blue-900/10 border-blue-900/50'
              }`}>
                {rec.type === 'critical' ? <AlertCircle className="text-red-500 shrink-0" /> : <CheckCircle className="text-blue-500 shrink-0" />}
                <div>
                    <h4 className={`font-bold ${
                      rec.type === 'critical' ? 'text-red-400' : 
                      rec.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                    }`}>{rec.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{rec.desc}</p>
                    {rec.type === 'critical' && (
                      <button className="mt-3 px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded font-bold">Schedule Repair</button>
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default HealthDiagnostics;