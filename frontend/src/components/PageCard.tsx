import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface PageCardProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export default function PageCard({ tasks, onToggle }: PageCardProps) {
  const totalTasks = tasks.length;
  const howManyCompleted = tasks.filter((tasks) => tasks.completed).length;

  const percentage =
    totalTasks === 0 ? totalTasks : Math.round((howManyCompleted / totalTasks) * 100);
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Suas tarefas</h2>
        <div className="progress-summary">
          <span className="progress-text">
            {howManyCompleted} de {totalTasks} concluídas
          </span>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}
