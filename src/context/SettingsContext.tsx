import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useThemeClass } from '../hooks/useThemeClass';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from '../services/storage';
import { Settings } from '../types/settings';

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (change: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  useThemeClass(settings.theme);

  useEffect(() => {
    loadSettings()
      .then(setSettings)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) saveSettings(settings).catch(() => undefined);
  }, [settings, ready]);

  const updateSettings = useCallback((change: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...change }));
  }, []);

  const value = useMemo(() => ({ settings, updateSettings }), [settings, updateSettings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings precisa estar dentro de SettingsProvider');
  return context;
}
