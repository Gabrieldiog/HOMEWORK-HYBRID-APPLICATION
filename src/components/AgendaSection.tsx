import { AgendaEntry } from '../utils/agenda';
import TaskItem from './TaskItem';

interface AgendaSectionProps {
  title: string;
  entries: AgendaEntry[];
  tone?: 'danger';
  onToggle: (entry: AgendaEntry) => void;
  onOpen: (entry: AgendaEntry) => void;
}

const AgendaSection: React.FC<AgendaSectionProps> = ({ title, entries, tone, onToggle, onOpen }) => (
  <section>
    <h2 className={`section-title${tone ? ` section-title--${tone}` : ''}`}>
      {title} <small>{entries.length}</small>
    </h2>
    <div className="stack">
      {entries.map((entry) => (
        <TaskItem
          key={entry.task.id}
          task={entry.task}
          color={entry.subject.color}
          subjectName={entry.subject.name}
          onToggle={() => onToggle(entry)}
          onOpen={() => onOpen(entry)}
        />
      ))}
    </div>
  </section>
);

export default AgendaSection;
