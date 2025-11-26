import React from 'react';
import { Search, Filter } from 'lucide-react';

const AlertsFilter = () => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search by Tower ID, Region or Issue..." 
          className="w-full bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors text-gray-300">
        <Filter size={18} /> Filter
      </button>
    </div>
  );
};

export default AlertsFilter;