import { CheckCircleIcon } from '@phosphor-icons/react';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';
import type { FormValue } from './NewTaskCard';

interface PageCardProps {
  total: number;
  completed: number;
  pending: number;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, formValue: FormValue) => void;
  filter: 'all' | 'completed' | 'pending';
  onChangeFilter: (filter: 'all' | 'completed' | 'pending') => void;
}

export default function PageCard({
  tasks,
  total,
  completed,
  pending,
  onToggle,
  onDeleteTask,
  onEditTask,
  filter,
  onChangeFilter,
}: PageCardProps) {
  let taskWord;

  if (completed === 1) {
    taskWord = 'tarefa';
  } else {
    taskWord = 'tarefas';
  }

  const isAllActive = 'all' === filter;
  const isCompletedActive = 'completed' === filter;
  const isPendingActive = 'pending' === filter;

  const percentage = total === 0 ? total : Math.round((completed / total) * 100);
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Suas tarefas</h2>
        <div className="progress-summary">
          <span className="progress-text">
            {completed} de {total} concluídas
          </span>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>
      <div className="browse-tabs">
        <button
          className={isAllActive ? 'browser-button browser-button--highlight' : 'browser-button'}
          type="button"
          onClick={() => onChangeFilter('all')}
        >
          Todas <span className="counting-tab">{total}</span>
        </button>
        <button
          className={
            isPendingActive ? 'browser-button browser-button--highlight' : 'browser-button'
          }
          type="button"
          onClick={() => onChangeFilter('pending')}
        >
          Pendentes <span className="counting-tab">{pending}</span>
        </button>
        <button
          className={
            isCompletedActive ? 'browser-button browser-button--highlight' : 'browser-button'
          }
          type="button"
          onClick={() => onChangeFilter('completed')}
        >
          Concluídas <span className="counting-tab">{completed}</span>
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
      <footer className="card-footer">
        <CheckCircleIcon size={18} />
        Você já concluiu {completed} {taskWord}. Continue no seu ritmo.
      </footer>
    </section>
  );
}
