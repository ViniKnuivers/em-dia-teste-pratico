import { CheckIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import type { Task } from '../types/task';
import { formatCardDate, isOverdue } from '../utils/date';
import { useState } from 'react';
import type { FormValue } from './NewTaskCard';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, formValue: FormValue) => void;
}
export default function TaskItem({ task, onToggle, onDeleteTask, onEditTask }: TaskItemProps) {
  const [isEditing, setEditing] = useState<true | false>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);
  const [editedDate, setEditedDate] = useState<string>(task.estimation.slice(0, 10));
  const overdue = !task.completed && isOverdue(task.estimation);

  function handleCancel() {
    setEditedTitle(task.title);
    setEditedDate(task.estimation.slice(0, 10));
    setEditing(false);
  }

  function handleSave() {
    onEditTask(task.id, { title: editedTitle, estimation: editedDate });
    setEditing(false);
  }
  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <label className="checkbox">
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          <CheckIcon className="checkbox-icon" size={14} weight="bold" />
        </label>
        <div className="edit-form">
          <span className="edit-label">EDITAR TAREFA</span>
          <input
            type="text"
            className="new-task-input"
            placeholder="O que você precisa fazer?"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
          <input
            type="date"
            className="new-task-date"
            value={editedDate}
            onChange={(event) => setEditedDate(event.target.value)}
          />
          <div className="edit-actions">
            <button className="primary-button" type="button" onClick={handleSave}>
              Salvar
            </button>
            <button className="secondary-button" type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </li>
    );
  }
  return (
    <li className="task-item">
      <label className="checkbox">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
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
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="icon-button icon-button--edit"
        aria-label="Editar tarefa"
      >
        <PencilSimpleIcon size={18} />
      </button>
      <button
        type="button"
        onClick={() => onDeleteTask(task.id)}
        className="icon-button icon-button--delete"
        aria-label="Excluir tarefa"
      >
        <TrashIcon size={18} />
      </button>
    </li>
  );
}
