import { IonIcon } from '@ionic/react';

interface ActionRowProps {
  icon: string;
  label: string;
  tone?: 'danger';
  onClick: () => void;
}

const ActionRow: React.FC<ActionRowProps> = ({ icon, label, tone, onClick }) => (
  <button type="button" className={`action-row${tone ? ` is-${tone}` : ''}`} onClick={onClick}>
    <IonIcon icon={icon} />
    <span>{label}</span>
  </button>
);

export default ActionRow;
