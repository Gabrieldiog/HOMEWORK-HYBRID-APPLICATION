import { IonIcon } from '@ionic/react';
import { SUBJECT_ICONS } from '../constants/subject';
import { SubjectIconKey } from '../types/subject';

interface SubjectIconProps {
  icon: SubjectIconKey;
  color: string;
  size?: 'sm' | 'lg';
}

const SubjectIcon: React.FC<SubjectIconProps> = ({ icon, color, size = 'sm' }) => (
  <span
    className={`subject-icon subject-icon--${size}`}
    style={{ color, backgroundColor: `${color}1f` }}
  >
    <IonIcon icon={SUBJECT_ICONS[icon]} />
  </span>
);

export default SubjectIcon;
