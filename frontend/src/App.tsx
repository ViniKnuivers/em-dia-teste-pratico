import Header from './components/Header';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import PageCard from './components/PageCard';
import { useState, useEffect, useCallback } from 'react';
import { request } from './api/client';
import type { TaskListResponse, Task } from './types/task';
import NewTaskCard, { type FormValue } from './components/NewTaskCard';

export default function App() {
  const [taskList, setTaskList] = useState<TaskListResponse>({
    tasks: [],
    total: 0,
    completed: 0,
    pending: 0,
  });

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const loadTasks = useCallback(async () => {
    const data = await request<TaskListResponse>(`/tasks?status=${filter}`);
    return data;
  }, [filter]);

  useEffect(() => {
    loadTasks().then((data) => setTaskList(data));
  }, [loadTasks]);

  async function handleCreateTask(formValue: FormValue) {
    await request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ estimation: formValue.estimation, title: formValue.title }),
    });

    const data = await loadTasks();
    setTaskList(data);
  }

  async function handleToggleTask(id: number) {
    await request<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });

    const data = await loadTasks();
    setTaskList(data);
  }

  async function handleEditTask(id: number, formValue: FormValue) {
    await request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ estimation: formValue.estimation, title: formValue.title }),
    });

    const data = await loadTasks();
    setTaskList(data);
  }

  async function handleDeleteTask(id: number) {
    await request<Task>(`/tasks/${id}`, {
      method: 'DELETE',
    });

    const data = await loadTasks();
    setTaskList(data);
  }

  return (
    <>
      <Header />
      <main className="container">
        <PageHeader />
        <NewTaskCard onCreate={(value) => handleCreateTask(value)} />
        <PageCard
          tasks={taskList.tasks}
          total={taskList.total}
          completed={taskList.completed}
          pending={taskList.pending}
          onToggle={(id) => handleToggleTask(id)}
          onDeleteTask={(id) => handleDeleteTask(id)}
          onEditTask={(id, formValue) => handleEditTask(id, formValue)}
          filter={filter}
          onChangeFilter={(filter) => setFilter(filter)}
        />
        <Footer />
      </main>
    </>
  );
}
