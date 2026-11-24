interface Stat {
  label: string;
  value: string | number;
  tone?: 'danger';
}

const StatRow: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <dl className="stat-row">
    {stats.map((stat) => (
      <div key={stat.label} className={stat.tone ? `is-${stat.tone}` : undefined}>
        <dt>{stat.label}</dt>
        <dd>{stat.value}</dd>
      </div>
    ))}
  </dl>
);

export default StatRow;
