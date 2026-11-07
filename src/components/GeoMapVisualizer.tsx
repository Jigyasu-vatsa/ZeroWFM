import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, ShieldCheck, Truck, Users, Radio, Info } from 'lucide-react';
import { calculateDistanceKm } from '../utils/calculations';

interface LocationPin {
  id: string;
  name: string;
  type: 'provider' | 'receiver' | 'volunteer';
  lat: number;
  lng: number;
  status?: string;
  details: string;
  x: number; // percentage in SVG viewBox
  y: number;
}

export const GeoMapVisualizer: React.FC = () => {
  const { donations, volunteers, setSelectedDonation } = useApp();
  const [activeRadiusKm, setActiveRadiusKm] = useState<number>(6);
  const [selectedPin, setSelectedPin] = useState<LocationPin | null>(null);

  // Madhubani bounding box normalized mapping to a 800x500 canvas
  // Lat: 26.3400 to 26.3800, Lng: 86.0400 to 86.0900
  const latMin = 26.345;
  const latMax = 26.375;
  const lngMin = 26.045; // custom scale for aesthetically pleasing distribution
  const lngMax = 26.095;

  // Coordinate projection helper
  const project = (lat: number, lng: number) => {
    // Map Madhubani coordinates nicely onto 800 x 480 SVG box
    const x = Math.min(760, Math.max(40, ((lng - 86.05) / 0.035) * 700 + 50));
    const y = Math.min(440, Math.max(40, (1 - (lat - 26.348) / 0.026) * 400 + 40));
    return { x, y };
  };

  // Convert donations to map pins
  const pins: LocationPin[] = [];

  donations.forEach(d => {
    const coords = project(d.location.lat, d.location.lng);
    pins.push({
      id: d.id,
      name: d.providerName,
      type: 'provider',
      lat: d.location.lat,
      lng: d.location.lng,
      status: d.status,
      details: `${d.quantityKg} kg • ${d.servings} meals • ${d.title}`,
      x: coords.x,
      y: coords.y,
    });
  });

  // Receivers
  const receiverLocations = [
    {
      id: 'rec-asha',
      name: 'Asha Orphanage & Child Care',
      lat: 26.3512,
      lng: 86.0765,
      type: 'receiver' as const,
      details: 'Ganga Sagar Chowk • Capacity: 90 children',
    },
    {
      id: 'rec-sneha',
      name: 'Sneha Old Age Care Home',
      lat: 26.3570,
      lng: 86.0650,
      type: 'receiver' as const,
      details: 'Suratganj Zone • Capacity: 45 senior residents',
    },
    {
      id: 'rec-shelter',
      name: 'Madhubani Community Night Shelter',
      lat: 26.3555,
      lng: 86.0680,
      type: 'receiver' as const,
      details: 'Railway Colony • Nightly shelter for unhoused',
    },
  ];

  receiverLocations.forEach(r => {
    const coords = project(r.lat, r.lng);
    pins.push({
      ...r,
      x: coords.x,
      y: coords.y,
    });
  });

  // Volunteers
  volunteers.forEach(v => {
    const coords = project(v.currentLocation.lat, v.currentLocation.lng);
    pins.push({
      id: v.id,
      name: `${v.name} (${v.vehicleType})`,
      type: 'volunteer',
      lat: v.currentLocation.lat,
      lng: v.currentLocation.lng,
      status: v.activeStatus,
      details: `${v.totalDeliveries} deliveries • ${v.totalKgSaved} kg food saved`,
      x: coords.x,
      y: coords.y,
    });
  });

  // Find in-transit routes to draw dynamic connecting lines
  const activeRoutes = donations.filter(
    d => d.status === 'IN_TRANSIT' || d.status === 'VOLUNTEER_ASSIGNED' || d.status === 'QUALITY_VERIFIED'
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative h-full flex flex-col justify-between">
      {/* Top Header bar inside map */}
      <div className="p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              Geo-Enabled Coordination Radar
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Madhubani Semi-Urban Zone
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Real-time matching within practical volunteer dispatch radius
            </p>
          </div>
        </div>

        {/* Radius Filter Slider */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
          <span className="text-xs font-medium text-slate-300">Dispatch Radius:</span>
          <input
            type="range"
            min="2"
            max="12"
            step="1"
            value={activeRadiusKm}
            onChange={e => setActiveRadiusKm(Number(e.target.value))}
            className="w-20 sm:w-24 accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            {activeRadiusKm} km
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
            <span>Food Provider</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]"></span>
            <span>Receiver NGO</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
            <span>Volunteer</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[450px] flex-1 bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 overflow-hidden select-none">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        {/* Regional Water bodies / River stylized geometry */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Road / Infrastructure Network grid */}
          <path
            d="M 50,220 Q 250,200 420,240 T 750,230"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
            strokeDasharray="4 4"
          />
          <path
            d="M 220,50 Q 240,240 260,420"
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
          />
          <path
            d="M 450,40 Q 420,240 400,430"
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
          />

          {/* Practical Delivery Radius Circle centered on Madhubani Town Hub */}
          <circle
            cx="400"
            cy="230"
            r={activeRadiusKm * 28}
            fill="#10b981"
            fillOpacity="0.04"
            stroke="#10b981"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <text
            x={400}
            y={230 - activeRadiusKm * 28 - 6}
            fill="#34d399"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {activeRadiusKm} km Safe Transit Boundary
          </text>

          {/* Active In-Transit Delivery Vector Lines */}
          {activeRoutes.map((route, i) => {
            const providerPin = pins.find(p => p.id === route.id && p.type === 'provider');
            const receiverPin = pins.find(
              p => p.type === 'receiver' && p.name === route.claimedByReceiverName
            ) || pins.find(p => p.type === 'receiver');

            if (providerPin && receiverPin) {
              return (
                <g key={`route-${route.id}-${i}`}>
                  <line
                    x1={providerPin.x}
                    y1={providerPin.y}
                    x2={receiverPin.x}
                    y2={receiverPin.y}
                    stroke="url(#routeGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                    filter="url(#glow)"
                  />
                  {/* Moving pulse dot along the delivery route */}
                  <circle
                    cx={(providerPin.x + receiverPin.x) / 2}
                    cy={(providerPin.y + receiverPin.y) / 2}
                    r="4"
                    fill="#38bdf8"
                    className="animate-ping"
                  />
                </g>
              );
            }
            return null;
          })}
        </svg>

        {/* Render Interactive Markers */}
        {pins.map(pin => {
          const isSelected = selectedPin?.id === pin.id;

          let badgeColor = 'bg-amber-500 border-amber-300 text-amber-950 shadow-amber-500/50';
          let icon = <MapPin className="w-3.5 h-3.5" />;
          let pulseClass = '';

          if (pin.type === 'receiver') {
            badgeColor = 'bg-blue-500 border-blue-300 text-blue-950 shadow-blue-500/50';
            icon = <Users className="w-3.5 h-3.5" />;
          } else if (pin.type === 'volunteer') {
            badgeColor = 'bg-emerald-500 border-emerald-300 text-emerald-950 shadow-emerald-500/50';
            icon = <Truck className="w-3.5 h-3.5" />;
            pulseClass = 'animate-bounce';
          } else if (pin.status === 'AVAILABLE') {
            pulseClass = 'animate-pulse';
          }

          return (
            <div
              key={`${pin.type}-${pin.id}`}
              style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
              onClick={() => {
                setSelectedPin(pin);
                const matchingDonation = donations.find(d => d.id === pin.id);
                if (matchingDonation) {
                  setSelectedDonation(matchingDonation);
                }
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform duration-200 hover:scale-125"
            >
              {/* Outer wave ring */}
              <div
                className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                  isSelected ? 'scale-125 bg-white/20' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-white shadow-lg ${badgeColor} ${pulseClass}`}
                >
                  {icon}
                </div>
              </div>

              {/* Pin label pill */}
              <div
                className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-medium backdrop-blur-md transition-all pointer-events-none ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md z-30'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-700/60 opacity-80 group-hover:opacity-100 group-hover:scale-105'
                }`}
              >
                {pin.name.split(' ')[0]} {pin.name.split(' ')[1] || ''}
              </div>
            </div>
          );
        })}

        {/* Selected Location Detail Card Overlay */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-slate-900/95 border border-emerald-500/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md z-20 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                    selectedPin.type === 'provider'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : selectedPin.type === 'receiver'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {selectedPin.type.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{selectedPin.name}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-snug">{selectedPin.details}</p>
                {selectedPin.status && (
                  <div className="mt-2 text-[11px] flex items-center gap-1.5 text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Status: {selectedPin.status}
                  </div>
                )}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setSelectedPin(null);
                }}
                className="text-slate-400 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sub-footer inside map */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>Section 5 & 6 Compliance: Geo-enabled dynamic matching ensures semi-urban last-mile delivery before expiration.</span>
        </div>
        <div className="hidden sm:block font-mono text-[11px] text-slate-500">
          Ref: Madhubani Semi-Urban Geo-Grid Engine
        </div>
      </div>
    </div>
  );
};
