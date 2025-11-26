import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- Custom Marker Logic ---
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

const DashboardMap = ({ center, zoom, towers, onTowerSelect, selectedId }) => {
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
            click: () => onTowerSelect(tower),
          }}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -10]} 
            opacity={1} 
            permanent
            className="custom-leaflet-tooltip"
          >
            <span className="font-bold text-xs">{tower.name}</span>
          </Tooltip>

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
};

export default DashboardMap;