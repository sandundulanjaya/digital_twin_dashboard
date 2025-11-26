import React, { useState } from 'react';
import SettingsHeader from '../components/SettingsHeader';
import SettingsThresholds from '../components/SettingsThresholds';
import SettingsConnections from '../components/SettingsConnections';
import SettingsVisualization from '../components/SettingsVisualization';

const SettingsPage = () => {
  // State for UI interactions
  const [simulationActive, setSimulationActive] = useState(true);
  const [mapStyle, setMapStyle] = useState('dark');
  const [windThreshold, setWindThreshold] = useState(45);
  const [rainThreshold, setRainThreshold] = useState(80);

  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto font-sans">
      
      <SettingsHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: Operational Thresholds */}
        <SettingsThresholds 
          windThreshold={windThreshold}
          setWindThreshold={setWindThreshold}
          rainThreshold={rainThreshold}
          setRainThreshold={setRainThreshold}
        />

        {/* RIGHT: Stacked Panels */}
        <div className="space-y-8">
          
          <SettingsConnections />

          <SettingsVisualization 
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
            simulationActive={simulationActive}
            setSimulationActive={setSimulationActive}
          />

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;