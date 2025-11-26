import React from 'react';
import MapOverlay from '../components/MapOverlay';
import TowerMap from '../components/TowerMap';
import { towerLocations } from '../data/mapData';

const MapPage = () => {
  return (
    <div className="w-full h-full relative bg-gray-900">
      
      {/* Overlay Controls */}
      <MapOverlay />

      {/* The Real Leaflet Map */}
      <div className="w-full h-full z-0">
        <TowerMap towers={towerLocations} />
      </div>

    </div>
  );
};

export default MapPage;