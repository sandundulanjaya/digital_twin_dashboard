import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- Custom Marker Icons Logic ---
// We use a divIcon to create a CSS-based marker (no images needed)
const createTowerIcon = (status) => {
  const colorClass = status === 'critical' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${colorClass}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8], // Center the icon
    popupAnchor: [0, -10]
  });
};

const TowerMap = ({ towers }) => {
  return (
    <MapContainer 
      center={[6.9271, 79.8612]} // Center on Colombo
      zoom={13} 
      scrollWheelZoom={true}
      className="w-full h-full"
      zoomControl={false} // We hide default zoom to look cleaner
    >
      {/* 1. SATELLITE IMAGE LAYER (Esri World Imagery) */}
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      {/* 2. LABELS LAYER (CartoDB Dark Labels) */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
      />

      {/* Render All Towers */}
      {towers.map((tower) => (
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
  );
};

export default TowerMap;