import { PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface NewTaskCardProps {
  onCreate: (title: string) => void;
}

export default function NewTaskCard({ onCreate }: NewTaskCardProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim() === '') {
      return;
    }
    onCreate(title.trim());
    setTitle('');
  }

  return (
    <section className="card">
      <h2 className="card-title">Nova tarefa</h2>
      <form className="new-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-task-input"
          placeholder="O que você precisa fazer?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input type="date" className="new-task-date" />
        <button type="submit" className="primary-button">
          <PlusIcon size={16} weight="bold" />
          Adicionar tarefa
        </button>
      </form>
    </section>
  );
}
