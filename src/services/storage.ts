import { Preferences } from '@capacitor/preferences';
import { seedSubjects } from '../data/seed';
import { Subject } from '../types/subject';

const SUBJECTS_KEY = 'semestre.subjects';

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
