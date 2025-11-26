import React, { useState } from 'react';
import DashboardMap from '../components/DashboardMap';
import Dashboard3DViewer from '../components/Dashboard3DViewer';
import DashboardHealthChart from '../components/DashboardHealthChart';

// --- Mock Data: Towers in Colombo ---
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
    graphData: [
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

const Dashboard = () => {
  const [selectedTower, setSelectedTower] = useState(towersData[0]);

  const handleTowerClick = (tower) => {
    console.log("Switched to:", tower.name);
    setSelectedTower(tower);
  };

  return (
    <div className="flex h-full w-full p-6 gap-6 text-white font-sans">
      
      {/* LEFT PANEL: 3D Model View */}
      <div className="w-1/3 flex flex-col gap-6">
        <Dashboard3DViewer selectedTower={selectedTower} />
      </div>

      {/* RIGHT COLUMN: Map + Analytics */}
      <div className="w-2/3 flex flex-col gap-6">
        
        {/* TOP RIGHT: Interactive Map */}
        <div className="h-1/2 bg-gray-900 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-4 left-4 z-[1000] bg-black/60 backdrop-blur px-3 py-1 rounded-lg border border-gray-700">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Live Network Topology</span>
          </div>
          
          <div className="w-full h-full relative">
            <DashboardMap 
                center={[6.9200, 79.8600]} 
                zoom={13} 
                towers={towersData}
                onTowerSelect={handleTowerClick}
                selectedId={selectedTower.id}
            />
          </div>
        </div>

        {/* BOTTOM RIGHT: Health Chart */}
        <DashboardHealthChart selectedTower={selectedTower} />

      </div>
    </div>
  );
};

export default Dashboard;