import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

export default function Footer() {
  return (
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
  );
}
