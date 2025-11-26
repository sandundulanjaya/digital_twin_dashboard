import React from 'react';
import { LayoutDashboard, Map, Bell, Settings, Activity } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
	 <div className="w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-8 space-y-8 h-screen z-20">
		<div className="p-3 bg-blue-600 rounded-xl mb-4">{/* Logo */}</div>

		<button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
			<LayoutDashboard />
		</button>
		<button onClick={() => setActiveTab('map')} className={`p-3 rounded-xl transition-all ${activeTab === 'map' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
			<Map />
		</button>
		<button onClick={() => setActiveTab('health')} className={`p-3 rounded-xl transition-all ${activeTab === 'health' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`} title="Health & Diagnostics">
			<Activity />
		</button>
		<button onClick={() => setActiveTab('alerts')} className={`p-3 rounded-xl transition-all ${activeTab === 'alerts' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
			<Bell />
		</button>
		<button onClick={() => setActiveTab('settings')} className={`p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
			<Settings />
		</button>
	 </div>
  );
};

export default Navbar;
