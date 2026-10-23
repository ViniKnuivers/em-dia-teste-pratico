import { useState, useEffect } from 'react';
import { request } from '../api/client';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';

export default function PageCard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    request<Task[]>('/tasks').then((data) => setTasks(data));
  }, []);
  return (
    <section className="card">
      <h2 className="card-title">Suas tarefas</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
