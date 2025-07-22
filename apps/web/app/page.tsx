'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IncidentPlayer } from './components/incident-player';
import { IncidentList } from './components/incident-list';
import { IncidentTimeline } from './components/incident-timeline';
import { INCIDENT_LIST_MAX_HEIGHT, INCIDENT_LIST_MIN_HEIGHT } from './constants';
import { IncidentWithCamera } from '../lib/types';

async function getAllIncidents() {
  const res = await axios.get('http://localhost:3002/api/incidents');
  return res.data;
}

export default function Home() {
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['allIncidents'],
    queryFn: getAllIncidents,
  });

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: INCIDENT_LIST_MIN_HEIGHT, maxHeight: INCIDENT_LIST_MAX_HEIGHT }}>
        <div className="lg:col-span-3 h-full">
          <IncidentPlayer incident={selectedIncident} />
        </div>
        <div className="lg:col-span-2 h-full">
          <IncidentList onIncidentSelect={setSelectedIncident} />
        </div>
      </div>
      {data && !isLoading && !error && (
        <IncidentTimeline incidents={data.incidents} onIncidentSelect={setSelectedIncident} />
      )}
    </main>
  );
}
