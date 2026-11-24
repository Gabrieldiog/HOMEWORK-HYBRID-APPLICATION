import { Task } from '../types/subject';

export function averageGrade(tasks: Task[]) {
  const graded = tasks.filter((task) => typeof task.grade === 'number');
  if (graded.length === 0) return null;
  return graded.reduce((sum, task) => sum + (task.grade ?? 0), 0) / graded.length;
}

export function formatGrade(grade: number) {
  return grade.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
