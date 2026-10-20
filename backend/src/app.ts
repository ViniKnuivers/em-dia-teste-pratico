import Fastify, { type FastifyServerOptions } from 'fastify';
import { HealthController } from './controllers/health.controller.js';
import { TaskController } from './controllers/task.controller.js';
import { createPrismaClient } from './database/prisma.js';
import { healthRoutes } from './routes/health.routes.js';
import { taskRoutes } from './routes/task.routes.js';
import { TaskService } from './services/task.service.js';

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);
  const prisma = createPrismaClient();

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  const taskService = new TaskService();

  healthRoutes(app, new HealthController(prisma));
  taskRoutes(app, new TaskController(taskService));

  return app;
}
