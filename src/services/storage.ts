import { Preferences } from '@capacitor/preferences';
import { seedSubjects } from '../data/seed';
import { Subject } from '../types/subject';

const SUBJECTS_KEY = 'semestre.subjects';
const PASSING_KEY = 'semestre.passing-grade';
const DEFAULT_PASSING = 6;

export async function loadSubjects(): Promise<Subject[]> {
  const { value } = await Preferences.get({ key: SUBJECTS_KEY });
  if (value === null) return seedSubjects();

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSubjects(subjects: Subject[]) {
  await Preferences.set({ key: SUBJECTS_KEY, value: JSON.stringify(subjects) });
}

export async function loadPassingGrade() {
  const { value } = await Preferences.get({ key: PASSING_KEY });
  const grade = Number(value);
  return value !== null && Number.isFinite(grade) ? grade : DEFAULT_PASSING;
}

export async function savePassingGrade(grade: number) {
  await Preferences.set({ key: PASSING_KEY, value: String(grade) });
}
