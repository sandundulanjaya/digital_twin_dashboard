import React from 'react';
import { Save, Bell, Shield, Database } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">System Configuration</h1>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Section 1: Thresholds */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 text-blue-400">
            <Shield size={24} />
            <h2 className="text-xl font-bold text-white">Safety Thresholds</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Max Wind Speed Alert (km/h)</label>
              <input type="number" defaultValue={45} className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Vibration Tolerance (g-force)</label>
              <input type="number" defaultValue={0.05} step="0.01" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rust Prediction Sensitivity</label>
              <select className="w-full bg-black border border-gray-700 rounded p-3 text-white outline-none">
                <option>High (Aggressive)</option>
                <option>Medium (Balanced)</option>
                <option>Low (Conservative)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Data Connections */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 text-green-400">
            <Database size={24} />
            <h2 className="text-xl font-bold text-white">Data Connections</h2>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center p-4 bg-black rounded-lg border border-gray-800">
                <div>
                    <p className="font-semibold">AWS IoT Core</p>
                    <p className="text-xs text-green-500">● Connected</p>
                </div>
                <button className="text-xs bg-gray-800 px-3 py-1 rounded">Configure</button>
             </div>
             <div className="flex justify-between items-center p-4 bg-black rounded-lg border border-gray-800">
                <div>
                    <p className="font-semibold">Amazon Timestream</p>
                    <p className="text-xs text-green-500">● Connected</p>
                </div>
                <button className="text-xs bg-gray-800 px-3 py-1 rounded">Configure</button>
             </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2">
            <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;