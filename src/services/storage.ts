import { Preferences } from '@capacitor/preferences';
import { seedSubjects } from '../data/seed';
import { Subject } from '../types/subject';
import { Settings } from '../types/settings';

const SUBJECTS_KEY = 'semestre.subjects';
const SETTINGS_KEY = 'semestre.settings';

export const DEFAULT_SETTINGS: Settings = { theme: 'system', passingGrade: 6 };

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

export async function loadSettings(): Promise<Settings> {
  const { value } = await Preferences.get({ key: SETTINGS_KEY });
  if (!value) return DEFAULT_SETTINGS;

  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(value) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings) {
  await Preferences.set({ key: SETTINGS_KEY, value: JSON.stringify(settings) });
}
