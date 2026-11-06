export interface Task {
  id: number;
  title: string;
  completed: boolean;
  estimation: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  completed: number;
  pending: number;
}
