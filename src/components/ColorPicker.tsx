import { SUBJECT_COLORS } from '../constants/subject';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => (
  <div className="picker">
    {SUBJECT_COLORS.map((color) => (
      <button
        key={color}
        type="button"
        aria-label={`Cor ${color}`}
        className={`picker__color${value === color ? ' is-selected' : ''}`}
        style={{ backgroundColor: color }}
        onClick={() => onChange(color)}
      />
    ))}
  </div>
);

export default ColorPicker;
