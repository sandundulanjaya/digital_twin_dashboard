import React from 'react';
import { Filter, MapPin, Layers } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="w-full h-full relative bg-gray-900">
      
      {/* Map Overlay Controls */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 w-64">
          <h2 className="font-bold text-white mb-2">Network Status</h2>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-green-400">● Online</span>
            <span className="text-white">45 Towers</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-red-400">● Critical</span>
            <span className="text-white">3 Towers</span>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-md p-2 rounded-xl border border-gray-700 flex flex-col gap-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg text-white" title="Layers"><Layers size={20}/></button>
          <button className="p-2 hover:bg-gray-700 rounded-lg text-white" title="Filter"><Filter size={20}/></button>
        </div>
      </div>

      {/* The Actual Map Container */}
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        {/* Replace this with your actual Leaflet/Google Map Component */}
        <div className="text-center opacity-50">
          <MapPin size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-xl text-gray-400">Full Screen Map View</p>
          <p className="text-sm text-gray-600">Render your geospatial data here</p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;