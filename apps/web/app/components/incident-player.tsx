import Image from 'next/image';
import { IncidentWithCamera } from '../../lib/types';
import { INCIDENT_LIST_MAX_HEIGHT, INCIDENT_LIST_MIN_HEIGHT } from '../constants';

interface IncidentPlayerProps {
  incident: IncidentWithCamera | null;
}

export function IncidentPlayer({ incident }: IncidentPlayerProps) {
  if (!incident) {
    return (
      <div className="bg-[#19191c] rounded-lg overflow-hidden flex items-center justify-center w-full h-full animate-gradient-x bg-gradient-to-r from-[#19191c] via-[#23262B] to-[#19191c] bg-[length:200%_100%]" style={{ maxHeight: INCIDENT_LIST_MAX_HEIGHT, minHeight: INCIDENT_LIST_MIN_HEIGHT }}>
        <p className="text-slate-400" style={{ fontFamily: 'Urbanist, sans-serif' }}>Select an incident to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden" style={{ maxHeight: INCIDENT_LIST_MAX_HEIGHT, minHeight: INCIDENT_LIST_MIN_HEIGHT, height: '100%' }}>
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={incident.thumbnailUrl}
          alt={`Thumbnail for incident ${incident.id}`}
          fill
          className="object-cover w-full h-full rounded"
          priority
          unoptimized
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 text-white">
          <h3 className="text-lg font-bold">{incident.type}</h3>
          <p className="text-sm">{incident.camera.name} - {incident.camera.location}</p>
        </div>
        {incident.secondaryThumbnailUrl && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Image
              src={incident.secondaryThumbnailUrl}
              alt="Thumbnail 2"
              width={150}
              height={90}
              className="rounded border border-gray-400 shadow-lg w-[150px] h-[90px] object-cover"
              unoptimized
            />
            <Image
              src={incident.secondaryThumbnailUrl}
              alt="Thumbnail 3"
              width={150}
              height={90}
              className="rounded border border-gray-400 shadow-lg w-[150px] h-[90px] object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
