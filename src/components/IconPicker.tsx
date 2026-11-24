import { IonIcon } from '@ionic/react';
import { SUBJECT_ICONS } from '../constants/subject';
import { SubjectIconKey } from '../types/subject';

interface IconPickerProps {
  value: SubjectIconKey;
  color: string;
  onChange: (icon: SubjectIconKey) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ value, color, onChange }) => (
  <div className="picker">
    {(Object.keys(SUBJECT_ICONS) as SubjectIconKey[]).map((key) => {
      const selected = key === value;
      return (
        <button
          key={key}
          type="button"
          aria-label={`Ícone ${key}`}
          className={`picker__icon${selected ? ' is-selected' : ''}`}
          style={selected ? { color, borderColor: color, backgroundColor: `${color}1f` } : undefined}
          onClick={() => onChange(key)}
        >
          <IonIcon icon={SUBJECT_ICONS[key]} />
        </button>
      );
    })}
  </div>
);

export default IconPicker;
