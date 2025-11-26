import React from 'react';
import { HeartPulse, ChevronDown } from 'lucide-react';

const HealthHeader = ({ selectedId, onSelect, avgHealth }) => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Network Health & Diagnostics</h1>
        <p className="text-gray-400">AI-driven predictive maintenance analysis</p>
      </div>
      
      {/* ACTION AREA */}
      <div className="flex gap-4 items-center">
        
        {/* TOWER SELECTOR */}
        <div className="relative">
          <select 
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
            className="appearance-none bg-gray-900 border border-gray-700 text-white pl-4 pr-10 py-3 rounded-xl font-bold focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <option value="t1">Tower 01 - Fort</option>
            <option value="t2">Tower 02 - Pettah</option>
            <option value="t3">Tower 03 - Cinnamon</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Stats Box */}
        <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><HeartPulse size={20}/></div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Avg Health</p>
              <p className={`text-xl font-bold ${avgHealth < 70 ? 'text-red-500' : 'text-white'}`}>
                {avgHealth}%
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHeader;