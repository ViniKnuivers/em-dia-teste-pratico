/* eslint-disable @typescript-eslint/no-unused-vars -- remova esta linha ao implementar os métodos */
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

  /**
   * Lista todas as tarefas, das mais antigas para as mais recentes.
   */
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({ orderBy: { createdAt: 'asc' } });
  }

  /**
   * Busca uma tarefa pelo id. Retorna `null` quando não existir.
   */
  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  /**
   * Cria uma tarefa pendente com o título informado.
   */
  async create(input: CreateTaskInput): Promise<Task> {
    return this.prisma.task.create({
      data: { title: input.title, estimation: new Date(input.estimation) },
    });
  }

  /**
   * Atualiza o título de uma tarefa existente.
   */
  async update(id: number, input: UpdateTaskInput): Promise<Task> {
    // return this.prisma.task.update({ where: { id }, data: ... });
    throw new Error('Not implemented');
  }

  /**
   * Inverte o campo `completed` de uma tarefa existente.
   */
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

  /**
   * Remove uma tarefa.
   */
  async delete(id: number): Promise<void> {
    // await this.prisma.task.delete({ where: { id } });
    throw new Error('Not implemented');
  }
}
