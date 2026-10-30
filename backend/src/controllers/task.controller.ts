import type { FastifyReply, FastifyRequest } from 'fastify';
import type { TaskService } from '../services/task.service.js';
import type { CreateTaskInput, TaskParams, UpdateTaskInput } from '../types/task.js';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  list = async (_request: FastifyRequest) => {
    return this.taskService.listTasks();
  };

  create = async (request: FastifyRequest<{ Body: CreateTaskInput }>, reply: FastifyReply) => {
    const task = await this.taskService.createTask(request.body);
    return reply.code(201).send(task);
  };

  update = async (_request: FastifyRequest<{ Params: TaskParams; Body: UpdateTaskInput }>) => {
    return this.taskService.updateTask();
  };

  toggle = async (request: FastifyRequest<{ Params: TaskParams }>) => {
    const id = Number(request.params.id);
    return this.taskService.toggleTask(id);
  };

  remove = async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
    const id = Number(request.params.id);
    await this.taskService.deleteTask(id);
    return reply.code(204).send();
  };
}
