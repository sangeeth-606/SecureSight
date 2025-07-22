export interface Camera {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  cameraId: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  secondaryThumbnailUrl?: string; // Add this line
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IncidentWithCamera = Incident & { camera: Camera };
