import React from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Helper Icon
const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const HealthChart = ({ data, avgHealth, towerName }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
            <ActivityIcon />
            <h2 className="text-xl font-bold">Structural Integrity Forecast ({towerName})</h2>
        </div>
        <div className="flex gap-6 text-sm font-mono">
          <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500"></div> HISTORICAL</div>
          <div className="flex items-center gap-2"><div className="w-3 h-1 bg-yellow-500 dashed border-b-2 border-dashed"></div> AI PREDICTION</div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={avgHealth < 70 ? "#EF4444" : "#3B82F6"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={avgHealth < 70 ? "#EF4444" : "#3B82F6"} stopOpacity={0}/>
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
              stroke={avgHealth < 70 ? "#EF4444" : "#3B82F6"} 
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
  );
};

export default HealthChart;