import { Task } from '../types/subject';

export function averageGrade(tasks: Task[]) {
  const graded = tasks.filter((task) => typeof task.grade === 'number');
  if (graded.length === 0) return null;
  return graded.reduce((sum, task) => sum + (task.grade ?? 0), 0) / graded.length;
}

export function formatGrade(grade: number) {
  return grade.toFixed(1).replace('.', ',');
}

export function parseGrade(input: string) {
  const normalized = input.trim().replace(',', '.');
  if (normalized === '') return null;
  const grade = Number(normalized);
  if (!Number.isFinite(grade) || grade < 0 || grade > 10) return null;
  return Math.round(grade * 10) / 10;
}
