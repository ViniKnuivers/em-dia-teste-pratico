import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface PageCardProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export default function PageCard({ tasks, onToggle }: PageCardProps) {
  return (
    <section className="card">
      <h2 className="card-title">Suas tarefas</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}
