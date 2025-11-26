import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// REMOVED: Sidebar specific icons (LayoutDashboard, Map icon, etc.)
// KEPT: Icons used in the 3D view
import { Wind, AlertTriangle } from 'lucide-react'; 
import '@google/model-viewer';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Leaflet Setup (Kept your settings) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapComponent({ center = [51.505, -0.09], zoom = 13 }) {
  return (
    <MapContainer center={center} zoom={zoom} className="w-full h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={center}>
        <Popup>Selected Tower</Popup>
      </Marker>
      <Circle center={center} radius={200} pathOptions={{ color: '#34D399', fillColor: '#34D399', fillOpacity: 0.15 }} />
    </MapContainer>
  );
}

// --- Mock Data ---
const healthData = [
  { time: '10:00', health: 95, predicted: 94 },
  { time: '11:00', health: 94, predicted: 93 },
  { time: '12:00', health: 94, predicted: 92 },
  { time: '13:00', health: 92, predicted: 90 },
  { time: '14:00', health: 88, predicted: 85 },
  { time: '15:00', health: 85, predicted: 80 },
];

// REMOVED: const Sidebar = ... 
// REMOVED: const NavItem = ... 

const Dashboard = () => {
  const [selectedTower, setSelectedTower] = useState('Tower-01');

  return (
    // UPDATED: Removed the outer 'flex h-screen bg-black' wrapper.
    // This container now fits inside the content area provided by App.js
    <div className="flex h-full w-full p-6 gap-6 text-white font-sans">
      
      {/* 2. Left Panel: 3D Model View */}
      <div className="w-1/3 flex flex-col gap-6">
         {/* Header */}
        <div className="bg-gray-900 rounded-2xl p-3 border border-gray-800 shadow-2xl h-full relative overflow-hidden group">
          <div className="absolute top-6 left-6 z-10">
            <h2 className="text-2xl font-bold text-white">{selectedTower}</h2>
            <span className="text-sm text-green-400 font-mono">● ONLINE | LAST SYNC: 2s ago</span>
          </div>

          {/* 3D Model Placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 relative">
            {/* Model Viewer */}
            <div className="w-full h-full">
              <model-viewer
                src="/models/telecom%20tower.glb"
                alt="Tower 3D Model"
                camera-controls
                auto-rotate
                style={{ width: '100%', height: '100%' }}
              />
            </div>

             {/* Floating AR Tags */}
             <div className="absolute top-1/3 right-10 bg-black/60 backdrop-blur-md border border-gray-700 p-3 rounded-lg text-xs">
               <div className="flex items-center gap-2 text-blue-400 mb-1"><Wind size={14}/> Wind Speed</div>
               <div className="text-xl font-bold text-white">12 km/h</div>
             </div>
             
             <div className="absolute bottom-1/3 left-10 bg-black/60 backdrop-blur-md border border-red-900/50 p-3 rounded-lg text-xs">
               <div className="flex items-center gap-2 text-red-400 mb-1"><AlertTriangle size={14}/> Rust Risk</div>
               <div className="text-xl font-bold text-white">High</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column: Map + Analytics */}
      <div className="w-2/3 flex flex-col gap-6">
        
        {/* 3. Top Right: Geospatial Map */}
        <div className="h-1/2 bg-gray-900 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-sm font-semibold">Network Topology Map</span>
          </div>
          
          <div className="w-full h-full bg-gray-800 relative">
            <div className="absolute inset-0">
              <MapComponent center={[6.9271, 79.8612]} zoom={13} />
            </div>

            {/* Simulated Overlay Dots */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] cursor-pointer ring-4 ring-red-900/50 z-[1000]"></div>
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-green-500 rounded-full opacity-60 z-[1000]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-green-500 rounded-full opacity-60 z-[1000]"></div>
          </div>
        </div>

        {/* 4. Bottom Right: Health Analytics */}
        <div className="h-1/2 bg-gray-900 rounded-2xl border border-gray-800 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Tower Health Prediction</h3>
              <p className="text-xs text-gray-500">Real-time vs AI Forecast</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Actual</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Predicted</div>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} 
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Line type="monotone" dataKey="health" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="predicted" stroke="#EAB308" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;