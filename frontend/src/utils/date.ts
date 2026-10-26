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
