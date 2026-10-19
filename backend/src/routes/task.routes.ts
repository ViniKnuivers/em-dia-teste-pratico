import type { FastifyInstance } from 'fastify';
import type { TaskController } from '../controllers/task.controller.js';
import type { CreateTaskInput, TaskParams, UpdateTaskInput } from '../types/task.js';

export function taskRoutes(app: FastifyInstance, controller: TaskController) {
  app.get('/tasks', controller.list);
  app.post<{ Body: CreateTaskInput }>('/tasks', controller.create);
  app.patch<{ Params: TaskParams; Body: UpdateTaskInput }>('/tasks/:id', controller.update);
  app.patch<{ Params: TaskParams }>('/tasks/:id/toggle', controller.toggle);
  app.delete<{ Params: TaskParams }>('/tasks/:id', controller.remove);
}
