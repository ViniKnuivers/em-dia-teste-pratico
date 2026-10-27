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

  return (
    <>
      <Header />
      <main className="container">
        <PageHeader />
        <NewTaskCard onCreate={(value) => handleCreateTask(value)} />
        <PageCard tasks={tasks} />
        <Footer />
      </main>
    </>
  );
}
