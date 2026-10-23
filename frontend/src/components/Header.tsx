import { CheckIcon } from '@phosphor-icons/react';

export default function Header() {
  return (
    <header className="header">
      <span className="logo">
        <span className="logo-icon">
          <CheckIcon size={18} weight="bold" />
        </span>
        <span>em dia</span>
      </span>
      <span className="tagline">Menos pressa. Mais organização.</span>
    </header>
  );
}
