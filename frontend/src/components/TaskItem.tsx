import { CheckIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import type { Task } from '../types/task';
import { formatCardDate, isOverdue } from '../utils/date';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const overdue = !task.completed && isOverdue(task.estimation);

  return (
    <li className="task-item">
      <label className="checkbox">
        <input type="checkbox" checked={task.completed} readOnly />
        <CheckIcon className="checkbox-icon" size={14} weight="bold" />
      </label>
      <span className={task.completed ? 'task-title task-title--done' : 'task-title'}>
        {task.title}
      </span>
      {task.estimation && (
        <span className={overdue ? 'task-estimation task-estimation--overdue' : 'task-estimation'}>
          {formatCardDate(new Date(task.estimation))}
        </span>
      )}
      <button type="button" className="icon-button icon-button--edit" aria-label="Editar tarefa">
        <PencilSimpleIcon size={18} />
      </button>
      <button type="button" className="icon-button icon-button--delete" aria-label="Excluir tarefa">
        <TrashIcon size={18} />
      </button>
    </li>
  );
}
