import React from 'react';
import { Save } from 'lucide-react';

const SettingsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Control Center</h1>
        <p className="text-gray-400">Manage Digital Twin parameters and connectivity</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
          <Save size={18} /> Save Configuration
      </button>
    </div>
  );
};

export default SettingsHeader;