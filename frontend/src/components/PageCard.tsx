import { CheckCircleIcon } from '@phosphor-icons/react';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';
import { useMemo, useState } from 'react';
import type { FormValue } from './NewTaskCard';

interface PageCardProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, formValue: FormValue) => void;
}

export default function PageCard({ tasks, onToggle, onDeleteTask, onEditTask }: PageCardProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const totalTasks = tasks.length;

  const howManyCompleted = useMemo(() => {
    const taskCompleted = tasks.filter((task) => task.completed);
    return taskCompleted.length;
  }, [tasks]);

  const howManyPending = useMemo(() => {
    const taskPending = tasks.filter((task) => !task.completed);
    return taskPending.length;
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => new Date(b.estimation).getTime() - new Date(a.estimation).getTime(),
    );
  }, [tasks]);

  let taskWord;

  if (howManyCompleted === 1) {
    taskWord = 'tarefa';
  } else {
    taskWord = 'tarefas';
  }

  const isAllActive = 'all' === filter;
  const isCompletedActive = 'completed' === filter;
  const isPendingActive = 'pending' === filter;

  const forFilteredTasks = useMemo(() => {
    let filteredTask;
    if ('all' === filter) {
      filteredTask = sortedTasks;
    } else if ('pending' === filter) {
      filteredTask = sortedTasks.filter((task) => !task.completed);
    } else {
      filteredTask = sortedTasks.filter((task) => task.completed);
    }
    return filteredTask;
  }, [filter, sortedTasks]);

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
      <div className="browse-tabs">
        <button
          className={isAllActive ? 'browser-button browser-button--highlight' : 'browser-button'}
          type="button"
          onClick={() => setFilter('all')}
        >
          Todas <span className="counting-tab">{totalTasks}</span>
        </button>
        <button
          className={
            isPendingActive ? 'browser-button browser-button--highlight' : 'browser-button'
          }
          type="button"
          onClick={() => setFilter('pending')}
        >
          Pendentes <span className="counting-tab">{howManyPending}</span>
        </button>
        <button
          className={
            isCompletedActive ? 'browser-button browser-button--highlight' : 'browser-button'
          }
          type="button"
          onClick={() => setFilter('completed')}
        >
          Concluídas <span className="counting-tab">{howManyCompleted}</span>
        </button>
      </div>

      <ul className="task-list">
        {forFilteredTasks.map((task) => (
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
        Você já concluiu {howManyCompleted} {taskWord}. Continue no seu ritmo.
      </footer>
    </section>
  );
}
