export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  estimation: string;
}

export interface CreateTaskInput {
  title: string;
  estimation: Date;
}

export interface UpdateTaskInput {
  title: string;
  estimation: string;
}

export interface TaskParams {
  id: string;
}
