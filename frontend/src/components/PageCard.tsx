import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface PageCardProps {
  tasks: Task[];
}

export default function PageCard({ tasks }: PageCardProps) {
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
