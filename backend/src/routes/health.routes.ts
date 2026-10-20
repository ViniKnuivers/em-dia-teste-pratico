import type { FastifyInstance } from 'fastify';
import type { HealthController } from '../controllers/health.controller.js';

export function healthRoutes(app: FastifyInstance, controller: HealthController) {
  app.get('/health', controller.check);
}
