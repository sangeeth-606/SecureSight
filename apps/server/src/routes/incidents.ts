import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { getIncidentsSchema, resolveIncidentSchema } from '../types/zod-schemas';

const router = Router();

// GET /api/incidents
router.get('/incidents', async (req, res) => {
  try {
    const { query } = getIncidentsSchema.parse({ query: req.query });

    const incidents = await prisma.incident.findMany({
      where: {
        resolved: query.resolved,
      },
      orderBy: {
        tsStart: 'desc',
      },
      include: {
        camera: true,
      },
    });

    // Ensure all incidents have secondaryThumbnailUrl in the response
    res.json({ incidents: incidents.map(i => ({ ...i, secondaryThumbnailUrl: i.secondaryThumbnailUrl || null })) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PATCH /api/incidents/:id/resolve
router.patch('/incidents/:id/resolve', async (req, res) => {
  try {
    const { params } = resolveIncidentSchema.parse({ params: req.params });

    const incident = await prisma.incident.findUnique({
      where: { id: params.id },
    });

    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: params.id },
      data: { resolved: !incident.resolved },
    });

    res.json(updatedIncident);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [totalCameras, activeIncidents] = await Promise.all([
      prisma.camera.count(),
      prisma.incident.count({ where: { resolved: false } }),
    ]);
    res.json({ totalCameras, activeIncidents });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
