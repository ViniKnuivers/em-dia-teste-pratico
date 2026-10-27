import type { TaskModel } from '../models/task.model.js';
import type { CreateTaskInput, Task } from '../types/task.js';

const mockTasks: Task[] = [];

/**
 * Regras de negócio das tarefas.
 *
 * Por enquanto todos os métodos devolvem dados mockados e não recebem parâmetros.
 * Ao implementar, receba os dados necessários e delegue a persistência para a TaskModel.
 */
export class TaskService {
  constructor(private readonly taskModel: TaskModel) {}

  async listTasks(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    return this.taskModel.create(input);
  }

  async updateTask(): Promise<Task> {
    return { ...mockTasks[1], title: 'Organizar a mesa de trabalho' };
  }

  async toggleTask(): Promise<Task> {
    return { ...mockTasks[0], completed: !mockTasks[0].completed };
  }

  async deleteTask(): Promise<void> {}
}
