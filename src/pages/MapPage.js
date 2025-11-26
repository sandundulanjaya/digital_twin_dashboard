import React from 'react';
import { Filter, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- 1. Custom Marker Icons (CSS-based Glowing Dots) ---
const createTowerIcon = (status) => {
  const colorClass = status === 'critical' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${colorClass}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8], 
    popupAnchor: [0, -10]
  });
};

// --- 2. Mock Data ---
const towerLocations = [
  { id: 'T-01', lat: 6.9271, lng: 79.8612, status: 'critical', location: 'Colombo Fort' },
  { id: 'T-09', lat: 6.9147, lng: 79.8758, status: 'critical', location: 'Borella' },
  { id: 'T-14', lat: 6.8969, lng: 79.8584, status: 'critical', location: 'Bambalapitiya' },
  { id: 'T-02', lat: 6.9333, lng: 79.8433, status: 'online', location: 'Pettah' },
  { id: 'T-03', lat: 6.9056, lng: 79.8632, status: 'online', location: 'Cinnamon Gardens' },
  { id: 'T-04', lat: 6.9400, lng: 79.8700, status: 'online', location: 'Kotahena' },
  { id: 'T-05', lat: 6.8724, lng: 79.8806, status: 'online', location: 'Nugegoda' },
  { id: 'T-06', lat: 6.8649, lng: 79.8997, status: 'online', location: 'Maharagama' },
  { id: 'T-07', lat: 6.9500, lng: 79.9100, status: 'online', location: 'Kelaniya' },
  { id: 'T-08', lat: 6.9800, lng: 79.8900, status: 'online', location: 'Wattala' },
];

const MapPage = () => {
  return (
    <div className="w-full h-full relative bg-gray-900">
      
      {/* --- Map Overlay Controls --- */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4 pointer-events-none">
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

        <div className="bg-black/90 backdrop-blur-md p-2 rounded-xl border border-gray-700 flex flex-col gap-2 w-fit pointer-events-auto shadow-xl">
          <button className="p-2 hover:bg-gray-700 rounded-lg text-white transition-colors" title="Layers">
            <Layers size={20}/>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg text-white transition-colors" title="Filter">
            <Filter size={20}/>
          </button>
        </div>
      </div>

      {/* --- The Real Leaflet Map --- */}
      <div className="w-full h-full z-0">
        <MapContainer 
          center={[6.9271, 79.8612]} 
          zoom={13} 
          scrollWheelZoom={true}
          className="w-full h-full"
          zoomControl={false} 
        >
          {/* 1. SATELLITE IMAGE LAYER (Esri World Imagery) */}
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {/* 2. LABELS LAYER (CartoDB Dark Labels - Optional) */}
          {/* This adds street names on top of the satellite image so you know where you are. 
              If you want ONLY satellite, remove this second TileLayer. */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
          />

          {/* Render All Towers */}
          {towerLocations.map((tower) => (
            <Marker 
              key={tower.id} 
              position={[tower.lat, tower.lng]} 
              icon={createTowerIcon(tower.status)}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-gray-900">{tower.id}</h3>
                  <p className="text-xs text-gray-600">{tower.location}</p>
                  <p className={`text-xs font-bold mt-1 ${tower.status === 'critical' ? 'text-red-600' : 'text-green-600'}`}>
                    {tower.status.toUpperCase()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;