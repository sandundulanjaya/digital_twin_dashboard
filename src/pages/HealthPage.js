import React, { useState } from 'react';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { HeartPulse, TrendingDown, Wrench, AlertCircle, CheckCircle, Cpu, ChevronDown } from 'lucide-react';

// --- 1. Dynamic Data Structure (Different data for each tower) ---
const allTowersData = {
  't1': {
    name: 'Tower 01 (Colombo Fort)',
    avgHealth: 98,
    predictedFailures: 0,
    graphData: [
      { time: '00:00', actual: 99, predicted: 99 },
      { time: '08:00', actual: 98, predicted: 98 },
      { time: '16:00', actual: 98, predicted: 98 },
      { time: 'Now',   actual: 98, predicted: 97 }, 
      { time: '04:00 (+1)', actual: null, predicted: 97 }, 
      { time: '12:00 (+1)', actual: null, predicted: 96 }, 
    ],
    components: [
      { name: 'Antenna Arrays', health: 98, status: 'Good' },
      { name: 'Power Supply Unit', health: 95, status: 'Good' },
      { name: 'Fiber Cabling', health: 92, status: 'Good' },
      { name: 'Structural Joints', health: 90, status: 'Good' },
    ],
    recommendations: [
      { type: 'info', title: 'Routine Inspection', desc: 'Schedule standard maintenance checks for next month.' }
    ]
  },
  't2': {
    name: 'Tower 02 (Pettah Market)',
    avgHealth: 64, // CRITICAL
    predictedFailures: 2,
    graphData: [
      { time: '00:00', actual: 95, predicted: 95 },
      { time: '08:00', actual: 88, predicted: 88 },
      { time: '16:00', actual: 75, predicted: 72 },
      { time: 'Now',   actual: 64, predicted: 60 }, 
      { time: '04:00 (+1)', actual: null, predicted: 50 }, // CRITICAL DIP
      { time: '12:00 (+1)', actual: null, predicted: 42 }, 
    ],
    components: [
      { name: 'Antenna Arrays', health: 92, status: 'Good' },
      { name: 'Power Supply Unit', health: 88, status: 'Good' },
      { name: 'Fiber Cabling', health: 45, status: 'Critical' }, // PROBLEM
      { name: 'Structural Joints', health: 76, status: 'Warning' },
    ],
    recommendations: [
      { type: 'critical', title: 'Replace Fiber Optic Cable', desc: 'Signal attenuation high. Risk of outage in < 12h.' },
      { type: 'info', title: 'Calibrate Antenna Tilt', desc: 'Optimization required for Sector B.' }
    ]
  },
  't3': {
    name: 'Tower 03 (Cinnamon Gardens)',
    avgHealth: 88,
    predictedFailures: 0,
    graphData: [
      { time: '00:00', actual: 92, predicted: 92 },
      { time: '08:00', actual: 90, predicted: 90 },
      { time: '16:00', actual: 89, predicted: 89 },
      { time: 'Now',   actual: 88, predicted: 88 }, 
      { time: '04:00 (+1)', actual: null, predicted: 87 }, 
      { time: '12:00 (+1)', actual: null, predicted: 86 }, 
    ],
    components: [
      { name: 'Antenna Arrays', health: 85, status: 'Warning' },
      { name: 'Power Supply Unit', health: 92, status: 'Good' },
      { name: 'Fiber Cabling', health: 95, status: 'Good' },
      { name: 'Structural Joints', health: 88, status: 'Good' },
    ],
    recommendations: [
      { type: 'warning', title: 'Check Antenna Alignment', desc: 'Minor drift detected in azimuth angles.' }
    ]
  }
};

const HealthPage = () => {
  // --- STATE: Selected Tower ID ---
  const [selectedId, setSelectedId] = useState('t2'); // Default to T2 (The interesting one)
  const currentData = allTowersData[selectedId];

  return (
    <div className="p-8 w-full h-full bg-black text-white overflow-y-auto font-sans">
      
      {/* 1. Header with Selector */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Network Health & Diagnostics</h1>
          <p className="text-gray-400">AI-driven predictive maintenance analysis</p>
        </div>
        
        {/* ACTION AREA */}
        <div className="flex gap-4 items-center">
          
          {/* TOWER SELECTOR */}
          <div className="relative">
            <select 
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="appearance-none bg-gray-900 border border-gray-700 text-white pl-4 pr-10 py-3 rounded-xl font-bold focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <option value="t1">Tower 01 - Fort</option>
              <option value="t2">Tower 02 - Pettah</option>
              <option value="t3">Tower 03 - Cinnamon</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Stats Boxes */}
          <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-center gap-3">
             <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><HeartPulse size={20}/></div>
             <div>
               <p className="text-[10px] text-gray-500 uppercase font-bold">Avg Health</p>
               <p className={`text-xl font-bold ${currentData.avgHealth < 70 ? 'text-red-500' : 'text-white'}`}>
                 {currentData.avgHealth}%
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Main Predictive Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <ActivityIcon />
             <h2 className="text-xl font-bold">Structural Integrity Forecast ({currentData.name})</h2>
          </div>
          <div className="flex gap-6 text-sm font-mono">
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500"></div> HISTORICAL</div>
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-yellow-500 dashed border-b-2 border-dashed"></div> AI PREDICTION</div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData.graphData}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentData.avgHealth < 70 ? "#EF4444" : "#3B82F6"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentData.avgHealth < 70 ? "#EF4444" : "#3B82F6"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis stroke="#9CA3AF" domain={[40, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
              
              {/* Actual Data Area */}
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke={currentData.avgHealth < 70 ? "#EF4444" : "#3B82F6"} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorHealth)" 
              />
              
              {/* Predicted Data Line (Dashed) */}
              <Line type="monotone" dataKey="predicted" stroke="#EAB308" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              
              <ReferenceLine x="Now" stroke="white" strokeDasharray="3 3" label={{ position: 'top',  value: 'NOW', fill: 'white', fontSize: 10 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Bottom Grid: Component Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Component Health Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-purple-400"/> Component Diagnostics
          </h3>
          <div className="space-y-6">
            {currentData.components.map((comp) => (
              <div key={comp.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{comp.name}</span>
                  <span className={`text-sm font-bold ${
                    comp.status === 'Critical' ? 'text-red-500' : 
                    comp.status === 'Warning' ? 'text-yellow-500' : 'text-green-500'
                  }`}>{comp.health}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      comp.status === 'Critical' ? 'bg-red-600' : 
                      comp.status === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${comp.health}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Wrench size={20} className="text-orange-400"/> AI Recommended Actions
          </h3>
          <div className="space-y-4">
             {currentData.recommendations.map((rec, idx) => (
               <div key={idx} className={`p-4 rounded-xl flex gap-4 border ${
                 rec.type === 'critical' ? 'bg-red-900/10 border-red-900/50' : 
                 rec.type === 'warning' ? 'bg-yellow-900/10 border-yellow-900/50' : 'bg-blue-900/10 border-blue-900/50'
               }`}>
                  {rec.type === 'critical' ? <AlertCircle className="text-red-500 shrink-0" /> : <CheckCircle className="text-blue-500 shrink-0" />}
                  <div>
                     <h4 className={`font-bold ${
                        rec.type === 'critical' ? 'text-red-400' : 
                        rec.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                     }`}>{rec.title}</h4>
                     <p className="text-sm text-gray-400 mt-1">{rec.desc}</p>
                     {rec.type === 'critical' && (
                        <button className="mt-3 px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded font-bold">Schedule Repair</button>
                     )}
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default HealthPage;