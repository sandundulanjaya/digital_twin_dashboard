import React from 'react';
import { Filter, Layers } from 'lucide-react';

const MapOverlay = () => {
  return (
    <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4 pointer-events-none">
      {/* Network Status Box */}
      <div className="bg-black/90 backdrop-blur-md p-4 rounded-xl border border-gray-700 w-64 shadow-2xl pointer-events-auto">
        <h2 className="font-bold text-white mb-3">Network Status</h2>
        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
            <span className="text-gray-300">Online</span>
          </div>
          <span className="text-white font-mono">45 Towers</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
            <span className="text-gray-300">Critical</span>
          </div>
          <span className="text-white font-mono">3 Towers</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-black/90 backdrop-blur-md p-2 rounded-xl border border-gray-700 flex flex-col gap-2 w-fit pointer-events-auto shadow-xl">
        <button className="p-2 hover:bg-gray-700 rounded-lg text-white transition-colors" title="Layers">
          <Layers size={20}/>
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg text-white transition-colors" title="Filter">
          <Filter size={20}/>
        </button>
      </div>
    </div>
  );
};

export default MapOverlay;