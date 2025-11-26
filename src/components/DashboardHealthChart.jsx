import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const DashboardHealthChart = ({ selectedTower }) => {
  return (
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
                stroke={selectedTower.health > 70 ? "#3B82F6" : "#EF4444"} 
                strokeWidth={3} 
                dot={{r: 4, fill: '#1F2937', strokeWidth: 2}} 
                activeDot={{r: 6}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHealthChart;