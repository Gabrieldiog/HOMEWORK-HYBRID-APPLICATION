import { useEffect } from 'react';
import { ThemeMode } from '../types/settings';

const DARK_CLASS = 'ion-palette-dark';

export function useThemeClass(mode: ThemeMode) {
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'system' && query.matches);
      document.documentElement.classList.toggle(DARK_CLASS, dark);
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [mode]);
}
