import { ReactNode } from 'react';

interface SettingsGroupProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, description, children }) => (
  <section className="block">
    <h2 className="block__title">{title}</h2>
    <div className="settings-group">{children}</div>
    {description && <p className="settings-group__note">{description}</p>}
  </section>
);

export default SettingsGroup;
