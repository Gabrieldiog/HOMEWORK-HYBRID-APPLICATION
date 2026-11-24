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

export type GradeOutlook =
  | { status: 'empty' }
  | { status: 'closed'; average: number; passed: boolean }
  | { status: 'safe' }
  | { status: 'impossible'; needed: number }
  | { status: 'needs'; needed: number; remaining: number };

export function gradeOutlook(tasks: Task[], passing: number): GradeOutlook {
  if (tasks.length === 0) return { status: 'empty' };

  const graded = tasks.filter((task) => typeof task.grade === 'number');
  const remaining = tasks.length - graded.length;
  const sum = graded.reduce((total, task) => total + (task.grade ?? 0), 0);

  if (remaining === 0) {
    const average = sum / graded.length;
    return { status: 'closed', average, passed: average >= passing };
  }

  const needed = (passing * tasks.length - sum) / remaining;
  if (needed <= 0) return { status: 'safe' };
  if (needed > 10) return { status: 'impossible', needed };
  return { status: 'needs', needed, remaining };
}
