import type { Task } from './types/task';
import { useState, useEffect } from 'react';
import { request } from './api/client';
import { CalendarBlankIcon, CheckIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { formatLongDate } from './utils/date';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    request<Task[]>('/tasks').then((data) => setTasks(data));
  }, []);
  return (
    <>
      <header className="header">
        <span className="logo">
          <span className="logo-icon">
            <CheckIcon size={18} weight="bold" />
          </span>
          <span>em dia</span>
        </span>
        <span className="tagline">Menos pressa. Mais organização.</span>
      </header>

      <main className="container">
        <div className="page-header">
          <div className="page-header-text">
            <h1 className="page-title">Uma tarefa de cada vez.</h1>
            <p className="page-subtitle">Organize seu dia e celebre cada pequena conquista.</p>
          </div>
          <span className="page-date">
            {' '}
            <CalendarBlankIcon size={16} />
            {formatLongDate(new Date())}
          </span>
        </div>
        <section className="card">
          <h2 className="card-title">Suas tarefas</h2>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <label className="checkbox">
                  <input type="checkbox" checked={task.completed} readOnly />
                  <CheckIcon className="checkbox-icon" size={14} weight="bold" />
                </label>
                <span className={task.completed ? 'task-title task-title--done' : 'task-title'}>
                  {task.title}
                </span>
                <button
                  type="button"
                  className="icon-button icon-button--edit"
                  aria-label="Editar tarefa"
                >
                  <PencilSimpleIcon size={18} />
                </button>
                <button
                  type="button"
                  className="icon-button icon-button--delete"
                  aria-label="Excluir tarefa"
                >
                  <TrashIcon size={18} />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <footer className="page-footer">
          <p className="page-hint">Clique na caixa para marcar uma tarefa como concluída.</p>
          <div className="legend">
            <span className="legend-item">
              <PencilSimpleIcon size={14} />
              Editar
            </span>
            <span className="legend-item">
              <TrashIcon size={14} />
              Excluir
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
