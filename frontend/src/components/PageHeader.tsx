import { CalendarBlankIcon } from '@phosphor-icons/react';
import { formatLongDate } from '../utils/date';

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1 className="page-title">Uma tarefa de cada vez.</h1>
        <p className="page-subtitle">Organize seu dia e celebre cada pequena conquista.</p>
      </div>
      <span className="page-date">
        <CalendarBlankIcon size={16} />
        {formatLongDate(new Date())}
      </span>
    </div>
  );
}
