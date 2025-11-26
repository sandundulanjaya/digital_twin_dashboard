import React, { useState } from 'react';
import { allTowersData } from '../data/towersData'; // Import the data
import HealthHeader from '../components/HealthHeader';
import HealthChart from '../components/HealthChart';
import HealthDiagnostics from '../components/HealthDiagnostics';

const HealthPage = () => {
  // --- STATE: Selected Tower ID ---
  const [selectedId, setSelectedId] = useState('t2'); // Default to T2 (The interesting one)
  
  // Get the data for the selected tower
  const currentData = allTowersData ? allTowersData[selectedId] : null;

  if (!currentData) {
    return (
        <div className="p-8 w-full h-full bg-black text-white flex items-center justify-center">
            <p>Loading tower data...</p>
        </div>
    );
  }

  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto font-sans">
      
      {/* 1. Header Section */}
      <HealthHeader 
        selectedId={selectedId} 
        onSelect={setSelectedId} 
        avgHealth={currentData.avgHealth} 
      />

      {/* 2. Chart Section */}
      <HealthChart 
        data={currentData.graphData} 
        avgHealth={currentData.avgHealth} 
        towerName={currentData.name} 
      />

      {/* 3. Diagnostics Section */}
      <HealthDiagnostics 
        components={currentData.components} 
        recommendations={currentData.recommendations} 
      />

    </div>
  );
};

export default HealthPage;