import { Subject } from '../types/subject';
import ProgressRing from './ProgressRing';
import SubjectIcon from './SubjectIcon';

interface SubjectCardProps {
  subject: Subject;
  onOpen: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onOpen }) => {
  const total = subject.tasks.length;
  const finished = subject.tasks.filter((task) => task.done).length;
  const pending = total - finished;
  const summary =
    total === 0
      ? 'Nenhuma entrega cadastrada'
      : pending === 0
        ? 'Tudo em dia'
        : `${pending} ${pending === 1 ? 'pendente' : 'pendentes'}`;

  return (
    <div
      className="subject-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(subject.id)}
      onKeyDown={(event) => event.key === 'Enter' && onOpen(subject.id)}
    >
      <SubjectIcon icon={subject.icon} color={subject.color} />
      <div className="subject-card__info">
        <strong>{subject.name}</strong>
        <span>{subject.teacher ? `${subject.teacher} · ${summary}` : summary}</span>
      </div>
      <ProgressRing value={total ? finished / total : 0} size={40} stroke={5} color={subject.color} />
    </div>
  );
};

export default SubjectCard;
