import { IonIcon } from '@ionic/react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  children?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, children }) => (
  <div className="empty-state">
    <IonIcon icon={icon} />
    <h2>{title}</h2>
    <p>{description}</p>
    {children}
  </div>
);

export default EmptyState;
