import React from 'react';
import { Wind, AlertTriangle, Wifi } from 'lucide-react';
import '@google/model-viewer';

const Dashboard3DViewer = ({ selectedTower }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 shadow-2xl h-full relative overflow-hidden group">
      
      {/* Dynamic Header */}
      <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-gray-700/50">
        <h2 className="text-3xl font-bold text-white mb-1">{selectedTower.name}</h2>
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${selectedTower.health > 70 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm text-gray-300 font-mono uppercase">{selectedTower.status} | {selectedTower.location}</span>
        </div>
      </div>

      {/* 3D Model Placeholder */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black relative">
        <model-viewer
          src="/models/telecom%20tower.glb"
          alt="Tower 3D Model"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Dynamic Data Tags */}
        <div className="absolute top-1/3 right-6 bg-gray-900/80 backdrop-blur border border-gray-700 p-3 rounded-xl min-w-[120px]">
          <div className="flex items-center gap-2 text-blue-400 mb-1 text-xs uppercase font-bold tracking-wider">
            <Wind size={14}/> Wind Speed
          </div>
          <div className="text-2xl font-bold text-white">{selectedTower.windSpeed} <span className="text-sm font-normal text-gray-400">km/h</span></div>
        </div>
        
        <div className={`absolute bottom-1/3 left-6 backdrop-blur border p-3 rounded-xl min-w-[120px] ${
            selectedTower.rustRisk === 'Critical' ? 'bg-red-900/60 border-red-500/50' : 'bg-gray-900/80 border-gray-700'
        }`}>
          <div className={`flex items-center gap-2 mb-1 text-xs uppercase font-bold tracking-wider ${
              selectedTower.rustRisk === 'Critical' ? 'text-red-400' : 'text-gray-400'
          }`}>
            <AlertTriangle size={14}/> Rust Risk
          </div>
          <div className="text-2xl font-bold text-white">{selectedTower.rustRisk}</div>
        </div>

         <div className="absolute bottom-6 right-6 bg-gray-900/80 backdrop-blur border border-gray-700 p-3 rounded-xl">
          <div className="flex items-center gap-2 text-green-400 mb-1 text-xs uppercase font-bold tracking-wider">
            <Wifi size={14}/> Signal
          </div>
          <div className="text-xl font-bold text-white">5G / LTE</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3DViewer;