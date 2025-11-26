import React from 'react';
import { Shield } from 'lucide-react';

const SettingsThresholds = ({ windThreshold, setWindThreshold, rainThreshold, setRainThreshold }) => {
  return (
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
  );
};

export default SettingsThresholds;