interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, hint }) => (
  <div className="stat-card">
    <span className="stat-card__label">{label}</span>
    <strong className="stat-card__value">{value}</strong>
    {hint && <span className="stat-card__hint">{hint}</span>}
  </div>
);

export default StatCard;
