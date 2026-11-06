import type { PrismaClient } from '../database/prisma.js';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../types/task.js';

/**
 * Acesso a dados da tabela `tasks` (ver prisma/schema.prisma).
 *
 * Cada método abaixo está apenas com a assinatura. Implemente-os usando `this.prisma.task`.
 * Documentação: https://www.prisma.io/docs/orm/prisma-client/queries/crud
 */
export class TaskModel {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(completed?: boolean): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { completed }, orderBy: { estimation: 'desc' } });
  }

  async countTasks(completed?: boolean): Promise<number> {
    return this.prisma.task.count({ where: { completed } });
  }

  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(input: CreateTaskInput): Promise<Task> {
    return this.prisma.task.create({
      data: { title: input.title, estimation: new Date(input.estimation) },
    });
  }

  async update(id: number, input: UpdateTaskInput): Promise<Task> {
    const task = await this.findById(id);

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return this.prisma.task.update({
      where: { id },
      data: { title: input.title, estimation: new Date(input.estimation) },
    });
  }

  async toggle(id: number): Promise<Task> {
    const task = await this.findById(id);

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return this.prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  }

  async delete(id: number): Promise<void> {
    const task = await this.findById(id);

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    await this.prisma.task.delete({ where: { id } });
  }
}
