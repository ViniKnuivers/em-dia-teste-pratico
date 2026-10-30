import Header from './components/Header';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import PageCard from './components/PageCard';
import { useState, useEffect } from 'react';
import { request } from './api/client';
import type { Task } from './types/task';
import NewTaskCard, { type FormValue } from './components/NewTaskCard';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    request<Task[]>('/tasks').then((data) => setTasks(data));
  }, []);

  async function handleCreateTask(formValue: FormValue) {
    const newTask = await request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ estimation: formValue.estimation, title: formValue.title }),
    });

    setTasks((prev) => [...prev, newTask]);
  }

  async function handleToggleTask(id: number) {
    const toggleTask = await request<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });

    setTasks((prev) => prev.map((task) => (task.id === toggleTask.id ? toggleTask : task)));
  }

  async function handleDeleteTask(id: number) {
    await request<Task>(`/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />
      <main className="container">
        <PageHeader />
        <NewTaskCard onCreate={(value) => handleCreateTask(value)} />
        <PageCard
          tasks={tasks}
          onToggle={(id) => handleToggleTask(id)}
          onDeleteTask={(id) => handleDeleteTask(id)}
        />
        <Footer />
      </main>
    </>
  );
}
