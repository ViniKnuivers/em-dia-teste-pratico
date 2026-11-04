export interface Task {
  id: number;
  title: string;
  completed: boolean;
  estimation: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  estimation: string;
}

export interface UpdateTaskInput {
  title: string;
  estimation: string;
}

export interface TaskParams {
  id: string;
}

export interface TaskListQuery {
  status?: 'all' | 'completed' | 'pending';
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  completed: number;
  pending: number;
}
