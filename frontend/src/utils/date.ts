export function formatLongDate(date: Date): string {
  const fullDateString = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const withoutFeira = fullDateString.replace('-feira', '');

  const formattedDate = withoutFeira[0].toUpperCase() + withoutFeira.slice(1);

  return formattedDate;
}

export function formatCardDate(date: Date): string {
  const dateCard = date.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return dateCard;
}

export function isOverdue(estimation: string): boolean {
  const goalDate = estimation.slice(0, 10);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const todayDate = `${year}-${formattedMonth}-${formattedDay}`;

  return todayDate > goalDate;
}
