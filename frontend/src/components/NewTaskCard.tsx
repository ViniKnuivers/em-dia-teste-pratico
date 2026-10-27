import { PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export type FormValue = { title: string; estimation: string };

interface NewTaskCardProps {
  onCreate: (formValue: FormValue) => void;
}

export default function NewTaskCard({ onCreate }: NewTaskCardProps) {
  const [title, setTitle] = useState<string>('');
  const [estimation, setEstimation] = useState<string>('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (title.trim() === '' || estimation.trim() === '') {
      return;
    }
    //onCreate({ estimation, title }); a mesma coisa de baixo, porem, simplificado.
    onCreate({
      estimation: estimation,
      title: title,
    });
    //onCreate(estimation);
    setTitle('');
    setEstimation('');
    //setEstimation(estimation);
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
        <input
          type="date"
          className="new-task-date"
          value={estimation}
          onChange={(event) => setEstimation(event.target.value)}
        />
        <button type="submit" className="primary-button">
          <PlusIcon size={16} weight="bold" />
          Adicionar tarefa
        </button>
      </form>
    </section>
  );
}
