import type { Task } from '../types/task.js';

const now = new Date('2026-10-19T09:00:00.000Z');

const mockTasks: Task[] = [
  { id: 1, title: 'Comprar frutas e verduras', completed: false, createdAt: now, updatedAt: now },
  {
    id: 2,
    title: 'Organizar a mesa de trabalho',
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  { id: 3, title: 'Ler 10 páginas de um livro', completed: false, createdAt: now, updatedAt: now },
  { id: 4, title: 'Regar as plantas', completed: true, createdAt: now, updatedAt: now },
  {
    id: 5,
    title: 'Fazer uma caminhada de 20 minutos',
    completed: true,
    createdAt: now,
    updatedAt: now,
  },
];

/**
 * Regras de negócio das tarefas.
 *
 * Por enquanto todos os métodos devolvem dados mockados e não recebem parâmetros.
 * Ao implementar, receba os dados necessários e delegue a persistência para a TaskModel.
 */
export class TaskService {
  async listTasks(): Promise<Task[]> {
    return mockTasks;
  }

  async createTask(): Promise<Task> {
    return { id: 6, title: 'Nova tarefa', completed: false, createdAt: now, updatedAt: now };
  }

  async updateTask(): Promise<Task> {
    return { ...mockTasks[1], title: 'Organizar a mesa de trabalho' };
  }

  async toggleTask(): Promise<Task> {
    return { ...mockTasks[0], completed: !mockTasks[0].completed };
  }

  async deleteTask(): Promise<void> {}
}
