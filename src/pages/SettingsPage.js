import React, { useState } from 'react';
import { Save, Server, Shield, Activity, Globe, Cpu, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

const SettingsPage = () => {
  // State for UI interactions
  const [simulationActive, setSimulationActive] = useState(true);
  const [mapStyle, setMapStyle] = useState('dark');
  const [windThreshold, setWindThreshold] = useState(45);
  const [rainThreshold, setRainThreshold] = useState(80);

  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Control Center</h1>
          <p className="text-gray-400">Manage Digital Twin parameters and connectivity</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
            <Save size={18} /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL 1: Operational Thresholds (The "Brain") */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alert Rules & Thresholds</h2>
              <p className="text-xs text-gray-500">Define when the system triggers 'Critical' status</p>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Wind Speed Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-300">Max Safe Wind Speed</label>
                <span className="text-blue-400 font-mono font-bold">{windThreshold} km/h</span>
              </div>
              <input 
                type="range" min="20" max="100" value={windThreshold} 
                onChange={(e) => setWindThreshold(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Simulates 'High Wind' warnings based on sensor data.</p>
            </div>

            {/* Rain Probability Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-300">Rain Prediction Confidence</label>
                <span className="text-blue-400 font-mono font-bold">{rainThreshold}%</span>
              </div>
              <input 
                type="range" min="50" max="99" value={rainThreshold} 
                onChange={(e) => setRainThreshold(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum ML model confidence required to trigger a Rust Alert.</p>
            </div>

            {/* Rust Sensitivity (Segmented Control) */}
            <div>
              <label className="block text-sm text-gray-300 mb-3">Rust Prediction Model Sensitivity</label>
              <div className="flex bg-black p-1 rounded-lg border border-gray-700">
                {['Conservative', 'Balanced', 'Aggressive'].map((level) => (
                  <button key={level} className={`flex-1 py-2 text-xs rounded-md transition-all ${level === 'Aggressive' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN STACK */}
        <div className="space-y-8">

          {/* PANEL 2: System Connections (AWS Status) */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
               <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <Server size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Cloud Connectivity</h2>
                <p className="text-xs text-gray-500">Status of AWS Services (us-east-1)</p>
              </div>
            </div>
            
            <div className="space-y-4">
               {/* Connection Item 1 */}
               <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3">
                      <Activity size={18} className="text-green-500"/>
                      <div>
                          <p className="font-semibold text-sm">AWS IoT Core</p>
                          <p className="text-xs text-gray-500">Endpoint: a2x...amazonaws.com</p>
                      </div>
                  </div>
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900">24ms Latency</span>
               </div>

               {/* Connection Item 2 */}
               <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-3">
                      <Activity size={18} className="text-green-500"/>
                      <div>
                          <p className="font-semibold text-sm">Amazon Timestream</p>
                          <p className="text-xs text-gray-500">Table: TelecomDT / SensorData</p>
                      </div>
                  </div>
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900">Sync Active</span>
               </div>
            </div>
          </div>

          {/* PANEL 3: Visualization Settings */}
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

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;