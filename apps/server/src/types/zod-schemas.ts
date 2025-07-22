import { z } from 'zod';

export const getIncidentsSchema = z.object({
  query: z.object({
    resolved: z.string().transform(val => val === 'true').optional(),
  }),
});

export const resolveIncidentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
