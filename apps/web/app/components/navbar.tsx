'use client';

import { useQuery } from '@tanstack/react-query';
import { Shield, LayoutGrid, Video, Users, AlertTriangle, MoreHorizontal, Square, User } from 'lucide-react';
import { useState } from 'react';

async function getStats() {
  const res = await fetch('http://localhost:3002/api/stats');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Cameras', icon: Video },
  { label: 'Scenes', icon: Square },
  { label: 'Incidents', icon: AlertTriangle },
  { label: 'Users', icon: Users },
  { label: 'More', icon: MoreHorizontal, isMore: true },
];

export function Navbar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  function handleNavClick(item: any) {
    if (item.isMore) {
      alert('More features coming soon!');
    } else {
      alert(`${item.label} feature coming soon!`);
    }
  }

  return (
    <nav className="relative rounded-sm bg-gradient-to-r from-black via-zinc-900 to-black shadow-md w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 items-center w-full">
          {/* Left: Logo and Brand (absolutely left) */}
          <div className="flex items-center space-x-3 flex-shrink-0 min-w-[220px] h-full absolute left-0 top-0 pl-4">
            <Shield className="h-8 w-8 text-white" />
            <span className="ml-2 text-lg font-bold tracking-wide text-white">secureSight</span>
          </div>
          {/* Center: Navigation */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center px-2 py-1 text-sm font-medium text-slate-200 hover:text-yellow-400 transition-colors focus:outline-none"
                  style={{ background: item.isMore ? 'none' : undefined }}
                >
                  <item.icon className="mr-1 h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Right: User Profile (absolutely right) */}
          <div className="flex items-center space-x-3 flex-shrink-0 min-w-[260px] h-full absolute right-0 top-0 pr-4 justify-end">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-white">Sangeeth</span>
              <span className="text-xs text-slate-300">sangeeth999123@gmail.com</span>
              {/* Stats moved here */}
              <div className="flex space-x-4 mt-1">
                <div className="flex items-center text-xs text-slate-400">
                  <span className="mr-1">Total Cameras:</span>
                  <span className="font-bold text-white">
                    {isLoading || error ? '-' : data.totalCameras}
                  </span>
                </div>
                <div className="flex items-center text-xs text-slate-400">
                  <span className="mr-1">Active Incidents:</span>
                  <span className="font-bold text-red-500">
                    {isLoading || error ? '-' : data.activeIncidents}
                  </span>
                </div>
              </div>
            </div>
            {/* Use shadcn cartoon style profile image */}
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="User Avatar"
              className="h-9 w-9 rounded-full border border-slate-700 object-cover bg-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
