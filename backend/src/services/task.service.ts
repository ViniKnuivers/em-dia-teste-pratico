import type { TaskModel } from '../models/task.model.js';
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
  TaskListQuery,
  TaskListResponse,
} from '../types/task.js';

export class TaskService {
  constructor(private readonly taskModel: TaskModel) {}

  async listTasks(query: TaskListQuery): Promise<TaskListResponse> {
    let completedFilter;

    if (query.status === 'completed') {
      completedFilter = true;
    } else if (query.status === 'pending') {
      completedFilter = false;
    } else {
      completedFilter = undefined;
    }
    const tasks = await this.taskModel.findAll(completedFilter);
    const total = await this.taskModel.countTasks();
    const completed = await this.taskModel.countTasks(true);
    const pending = await this.taskModel.countTasks(false);

    return { tasks, total, completed, pending };
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
