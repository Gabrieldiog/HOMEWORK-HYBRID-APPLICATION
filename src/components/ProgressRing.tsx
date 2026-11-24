import { ReactNode } from 'react';

interface ProgressRingProps {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 88,
  stroke = 9,
  color = 'var(--ion-color-primary)',
  children
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 1);

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="progress-ring__bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring__label">{children}</div>
    </div>
  );
};

export default ProgressRing;
