const DAY_MS = 86_400_000;

export function toKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromKey(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function todayKey() {
  return toKey(new Date());
}

export function daysUntil(key: string) {
  const today = fromKey(todayKey());
  return Math.round((fromKey(key).getTime() - today.getTime()) / DAY_MS);
}

export function dueLabel(key: string) {
  const days = daysUntil(key);
  if (days < 0) return days === -1 ? 'Atrasada há 1 dia' : `Atrasada há ${-days} dias`;
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Amanhã';
  return `Em ${days} dias`;
}

export function formatShortDate(key: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })
    .format(fromKey(key))
    .replace('.', '');
}

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date);
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
