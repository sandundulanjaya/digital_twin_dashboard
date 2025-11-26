import React from 'react';
import { Server, Activity } from 'lucide-react';

const SettingsConnections = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
          <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
          <Server size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Cloud Connectivity</h2>
          <p className="text-xs text-gray-500">Status of AWS Services (us-east-1)</p>
        </div>
      </div>
      
      <div className="space-y-4">
          {/* Connection Item 1 */}
          <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3">
                <Activity size={18} className="text-green-500"/>
                <div>
                    <p className="font-semibold text-sm">AWS IoT Core</p>
                    <p className="text-xs text-gray-500">Endpoint: a2x...amazonaws.com</p>
                </div>
            </div>
            <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900">24ms Latency</span>
          </div>

          {/* Connection Item 2 */}
          <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3">
                <Activity size={18} className="text-green-500"/>
                <div>
                    <p className="font-semibold text-sm">Amazon Timestream</p>
                    <p className="text-xs text-gray-500">Table: TelecomDT / SensorData</p>
                </div>
            </div>
            <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900">Sync Active</span>
          </div>
      </div>
    </div>
  );
};

export default SettingsConnections;