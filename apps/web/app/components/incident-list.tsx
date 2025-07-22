'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Check, AlertTriangle, ShieldAlert, Video } from 'lucide-react';
import { IncidentWithCamera } from '../../lib/types';
import { IncidentCardSkeleton } from './ui/skeleton';
import axios from 'axios';
import "@fontsource/urbanist";
import { INCIDENT_LIST_MAX_HEIGHT, INCIDENT_LIST_MIN_HEIGHT } from '../constants';

const incidentTypes: { [key: string]: { icon: React.ElementType; color: string } } = {
  'Unauthorised Access': { icon: ShieldAlert, color: 'text-red-500' },
  'Gun Threat': { icon: AlertTriangle, color: 'text-red-700' },
};

async function getIncidents(resolved: boolean) {
  const res = await axios.get(`http://localhost:3002/api/incidents?resolved=${resolved}`);
  return res.data;
}

async function resolveIncident(id: string) {
  const res = await axios.patch(`http://localhost:3002/api/incidents/${id}/resolve`);
  return res.data;
}

interface IncidentListProps {
  onIncidentSelect: (incident: IncidentWithCamera) => void;
}

export function IncidentList({ onIncidentSelect }: IncidentListProps) {
  const [showResolved, setShowResolved] = useState(false);
  const queryClient = useQueryClient();

  // Fetch both unresolved and resolved for header counts
  const { data: unresolvedData, isLoading: isLoadingUnresolved } = useQuery({
    queryKey: ['incidents', false],
    queryFn: () => getIncidents(false),
  });
  const { data: resolvedData, isLoading: isLoadingResolved } = useQuery({
    queryKey: ['incidents', true],
    queryFn: () => getIncidents(true),
  });

  // Use correct data for list
  const data = showResolved ? resolvedData : unresolvedData;
  const isLoading = showResolved ? isLoadingResolved : isLoadingUnresolved;

  const mutation = useMutation({
    mutationFn: resolveIncident,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['incidents', showResolved] });
      const previousIncidents = queryClient.getQueryData(['incidents', showResolved]);
      // Remove optimisticallyRemoved animation
      queryClient.setQueryData(['incidents', showResolved], (old: any) => ({
        ...old,
        incidents: old.incidents.filter((i: any) => i.id !== id),
      }));
      return { previousIncidents };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['incidents', showResolved], context?.previousIncidents);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents', showResolved] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  if (isLoading) {
    return (
      <div className="bg-[#19191c] rounded-xl p-6 h-full">
        <div className="flex items-center mb-6">
          <span className="flex items-center text-lg font-semibold text-white mr-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            Loading Incidents...
          </span>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Header counts
  const unresolvedCount = unresolvedData?.incidents?.length || 0;
  const resolvedCount = resolvedData?.incidents?.length || 0;

  return (
    <div className="bg-[#19191c] rounded-2xl p-6 h-full flex flex-col font-[Urbanist]" style={{ boxShadow: 'none', border: 'none', fontFamily: 'Urbanist, sans-serif', maxHeight: INCIDENT_LIST_MAX_HEIGHT, minHeight: INCIDENT_LIST_MIN_HEIGHT }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-[#ffb13b]" />
          <span className="text-lg font-semibold text-white">
            {unresolvedCount} Unresolved Incidents
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResolved(false)}
            className={`rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1 transition-colors ${!showResolved ? 'bg-[#232326] text-white' : 'text-[#bdbdbd] hover:text-white'}`}
            style={{ background: !showResolved ? '#232326' : 'transparent', boxShadow: 'none', border: 'none' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ffb13b] mr-1" />
            <span>Active</span>
          </button>
          <button
            onClick={() => setShowResolved(true)}
            className={`rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1 transition-colors ${showResolved ? 'bg-[#232326] text-white' : 'text-[#bdbdbd] hover:text-white'}`}
            style={{ background: showResolved ? '#232326' : 'transparent', boxShadow: 'none', border: 'none' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#3ec97a] mr-1" />
            <span>{resolvedCount} resolved incidents</span>
          </button>
        </div>
      </div>
      <ul
        className="overflow-y-auto pr-1"
        style={{ maxHeight: INCIDENT_LIST_MAX_HEIGHT, minHeight: INCIDENT_LIST_MIN_HEIGHT }}
      >
        {data.incidents.map((incident: any) => {
          const IncidentIcon = incident.type === 'Gun Threat' ? '🔫' : null;
          const iconColor = incident.type === 'Gun Threat' ? 'text-[#ff4d4f]' : 'text-[#ffb13b]';
          const isResolved = !!incident.resolved;
          return (
            <li
              key={incident.id}
              className="flex items-center gap-4 cursor-pointer hover:bg-[#232326] transition-all duration-200 rounded-xl px-2 py-4"
              onClick={() => onIncidentSelect(incident)}
              style={{ boxShadow: 'none', border: 'none', opacity: 1, transform: 'none', background: 'none', minHeight: '92px' }}
            >
              <img
                src={incident.thumbnailUrl}
                alt={incident.type}
                className="w-40 h-20 object-cover rounded-lg"
                style={{ border: 'none', boxShadow: 'none' }}
              />
              <div className="flex flex-col flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {incident.type === 'Gun Threat' ? (
                    <span className="text-lg mr-1">🔫</span>
                  ) : (
                    <ShieldAlert className="h-4 w-4 text-[#ffb13b]" />
                  )}
                  <span className={`font-semibold text-sm ${isResolved ? 'text-[#3ec97a]' : 'text-white'}`}>{incident.type}</span>
                </div>
                <div className="flex items-center gap-2 text-[#bdbdbd] text-xs mb-1">
                  <span className="truncate">{incident.camera?.name || incident.camera?.location}</span>
                </div>
                <div className="text-xs font-bold text-white">
                  {(() => {
                    const start = new Date(incident.tsStart);
                    const end = new Date(incident.tsEnd);
                    const pad = (n: number) => n.toString().padStart(2, '0');
                    return `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(end.getHours())}:${pad(end.getMinutes())} on ${start.getDate()}-${start.toLocaleString('default', { month: 'short' })}-${start.getFullYear()}`;
                  })()}
                </div>
              </div>
              {!isResolved && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    mutation.mutate(incident.id);
                  }}
                  className="ml-auto text-[#ffd600] font-semibold text-sm flex items-center gap-1 hover:underline focus:outline-none hover:cursor-pointer"
                  style={{ background: 'none', boxShadow: 'none', border: 'none' }}
                >
                  <span>Resolve</span>
                  <span className="text-lg">›</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
