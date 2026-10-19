export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface CreateTaskInput {
  title: string;
}

export interface UpdateTaskInput {
  title: string;
}

export interface TaskParams {
  id: string;
}
