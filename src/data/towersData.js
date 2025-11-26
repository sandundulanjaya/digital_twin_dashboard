export const allTowersData = {
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