import type { TaskModel } from '../models/task.model.js';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../types/task.js';

export class TaskService {
  constructor(private readonly taskModel: TaskModel) {}

  async listTasks(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    return this.taskModel.create(input);
  }

  async updateTask(id: number, input: UpdateTaskInput): Promise<Task> {
    return this.taskModel.update(id, input);
  }

  async toggleTask(id: number): Promise<Task> {
    return this.taskModel.toggle(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskModel.delete(id);
  }
}
