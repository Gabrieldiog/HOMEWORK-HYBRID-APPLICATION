import { Subject, Task } from '../types/subject';
import { daysUntil } from './date';

export interface AgendaEntry {
  task: Task;
  subject: Subject;
}

export interface AgendaGroup {
  key: string;
  label: string;
  entries: AgendaEntry[];
}

const GROUPS = [
  { key: 'late', label: 'Atrasadas', test: (days: number) => days < 0 },
  { key: 'today', label: 'Hoje', test: (days: number) => days === 0 },
  { key: 'week', label: 'Próximos 7 dias', test: (days: number) => days > 0 && days <= 7 },
  { key: 'later', label: 'Mais pra frente', test: (days: number) => days > 7 }
];

export function collectEntries(subjects: Subject[]): AgendaEntry[] {
  return subjects
    .flatMap((subject) => subject.tasks.map((task) => ({ task, subject })))
    .sort((a, b) => a.task.dueDate.localeCompare(b.task.dueDate));
}

export function groupPending(entries: AgendaEntry[]): AgendaGroup[] {
  const pending = entries.filter(({ task }) => !task.done);

  return GROUPS.map(({ key, label, test }) => ({
    key,
    label,
    entries: pending.filter(({ task }) => test(daysUntil(task.dueDate)))
  })).filter((group) => group.entries.length > 0);
}

export function finishedEntries(entries: AgendaEntry[]) {
  return entries.filter(({ task }) => task.done).reverse();
}
