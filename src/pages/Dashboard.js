import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Wind, AlertTriangle, Activity, Wifi } from 'lucide-react';
import '@google/model-viewer';
import { MapContainer, TileLayer, Marker, Tooltip, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- 1. Custom Marker Logic (Green for Good, Red for Critical) ---
const createCustomIcon = (health) => {
  const color = health > 70 ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-lg ${color}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

// --- 2. Mock Data: Towers in Colombo ---
const towersData = [
  {
    id: 't1',
    name: 'Tower 01',
    location: 'Colombo Fort',
    coords: [6.9271, 79.8612],
    health: 95,
    windSpeed: 12,
    rustRisk: 'Low',
    status: 'ONLINE',
    graphData: [
      { time: '10:00', health: 98 }, { time: '11:00', health: 97 }, 
      { time: '12:00', health: 96 }, { time: '13:00', health: 95 },
      { time: '14:00', health: 95 }, { time: '15:00', health: 95 }
    ]
  },
  {
    id: 't2',
    name: 'Tower 02',
    location: 'Pettah Market',
    coords: [6.9360, 79.8450],
    health: 45, // CRITICAL
    windSpeed: 58,
    rustRisk: 'Critical',
    status: 'WARNING',
    graphData: [ // Graph dips for this tower
      { time: '10:00', health: 80 }, { time: '11:00', health: 75 }, 
      { time: '12:00', health: 60 }, { time: '13:00', health: 50 },
      { time: '14:00', health: 48 }, { time: '15:00', health: 45 }
    ]
  },
  {
    id: 't3',
    name: 'Tower 03',
    location: 'Cinnamon Gardens',
    coords: [6.9120, 79.8650],
    health: 88,
    windSpeed: 22,
    rustRisk: 'Medium',
    status: 'ONLINE',
    graphData: [
      { time: '10:00', health: 90 }, { time: '11:00', health: 89 }, 
      { time: '12:00', health: 88 }, { time: '13:00', health: 88 },
      { time: '14:00', health: 87 }, { time: '15:00', health: 88 }
    ]
  },
  {
    id: 't4',
    name: 'Tower 04',
    location: 'Bambalapitiya',
    coords: [6.8950, 79.8550],
    health: 92,
    windSpeed: 15,
    rustRisk: 'Low',
    status: 'ONLINE',
    graphData: [
      { time: '10:00', health: 94 }, { time: '11:00', health: 93 }, 
      { time: '12:00', health: 93 }, { time: '13:00', health: 92 },
      { time: '14:00', health: 92 }, { time: '15:00', health: 92 }
    ]
  }
];

// --- 3. Interactive Map Component ---
function MapComponent({ center, zoom, towers, onTowerSelect, selectedId }) {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className="w-full h-full" 
      zoomControl={false}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Dark Map Tiles */}
      <TileLayer
        attribution='&copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        opacity={0.6}
      />
      
      {/* Render All Towers */}
      {towers.map((tower) => (
        <Marker 
          key={tower.id} 
          position={tower.coords} 
          icon={createCustomIcon(tower.health)}
          eventHandlers={{
            click: () => onTowerSelect(tower), // <--- CLICK HANDLER
          }}
        >
          {/* Permanent Label on Map */}
          <Tooltip 
            direction="top" 
            offset={[0, -10]} 
            opacity={1} 
            permanent
            className="custom-leaflet-tooltip" // We can style this in CSS if needed
          >
            <span className="font-bold text-xs">{tower.name}</span>
          </Tooltip>

          {/* Show Selection Ring if clicked */}
          {selectedId === tower.id && (
             <Circle 
                center={tower.coords} 
                radius={400} 
                pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1 }} 
             />
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}

const Dashboard = () => {
  // --- STATE: Tracks which tower is currently active ---
  const [selectedTower, setSelectedTower] = useState(towersData[0]);

  // Handler to switch data when map is clicked
  const handleTowerClick = (tower) => {
    console.log("Switched to:", tower.name);
    setSelectedTower(tower);
  };

  return (
    <div className="flex h-full w-full p-6 gap-6 text-white font-sans">
      
      {/* LEFT PANEL: 3D Model View (Dynamic Data) */}
      <div className="w-1/3 flex flex-col gap-6">
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

            {/* Dynamic Data Tags (Updates on Click) */}
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
      </div>

      {/* RIGHT COLUMN: Map + Analytics */}
      <div className="w-2/3 flex flex-col gap-6">
        
        {/* TOP RIGHT: Interactive Map */}
        <div className="h-1/2 bg-gray-900 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-4 left-4 z-[1000] bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-gray-700">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Live Network Topology</span>
          </div>
          
          <div className="w-full h-full relative">
            <MapComponent 
                center={[6.9200, 79.8600]} // Centered on Colombo
                zoom={13} 
                towers={towersData}
                onTowerSelect={handleTowerClick}
                selectedId={selectedTower.id}
            />
          </div>
        </div>

        {/* BOTTOM RIGHT: Dynamic Health Analytics */}
        <div className="h-1/2 bg-gray-900 rounded-2xl border border-gray-800 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <Activity className="text-blue-500" size={20}/>
                 <h3 className="text-xl font-bold text-white">{selectedTower.name} Health Trend</h3>
              </div>
              <p className="text-xs text-gray-500">Real-time structural integrity vs AI Forecast</p>
            </div>
            
            {/* Legend */}
            <div className="flex gap-4 text-xs font-mono">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> ACTUAL</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500/30"></div> PREDICTED</div>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* Note: We pass selectedTower.graphData here to make the chart dynamic! */}
              <LineChart data={selectedTower.graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#6B7280" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" domain={[0, 100]} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }} 
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Line 
                    type="monotone" 
                    dataKey="health" 
                    stroke={selectedTower.health > 70 ? "#3B82F6" : "#EF4444"} // Color changes based on health
                    strokeWidth={3} 
                    dot={{r: 4, fill: '#1F2937', strokeWidth: 2}} 
                    activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;