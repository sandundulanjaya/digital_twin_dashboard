import React from 'react';
import { Globe, ToggleLeft, ToggleRight } from 'lucide-react';

const SettingsVisualization = ({ mapStyle, setMapStyle, simulationActive, setSimulationActive }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <Globe size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">Visualization</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300 text-sm">Default Map Layer</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setMapStyle('dark')}
              className={`px-3 py-1 rounded text-xs border ${mapStyle === 'dark' ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-600 text-gray-400'}`}
            >Dark Mode</button>
            <button 
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1 rounded text-xs border ${mapStyle === 'satellite' ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-600 text-gray-400'}`}
            >Satellite</button>
          </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <div>
            <span className="text-gray-300 text-sm block">Live Simulation Feed</span>
            <span className="text-xs text-gray-500">Pause updates from Python script</span>
          </div>
          <button onClick={() => setSimulationActive(!simulationActive)} className="text-blue-400">
            {simulationActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
          </button>
      </div>

    </div>
  );
};

export default SettingsVisualization;