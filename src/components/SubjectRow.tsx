import { Subject } from '../types/subject';
import { averageGrade, formatGrade } from '../utils/grades';
import SubjectIcon from './SubjectIcon';

interface SubjectRowProps {
  subject: Subject;
  onOpen: (id: string) => void;
}

const SubjectRow: React.FC<SubjectRowProps> = ({ subject, onOpen }) => {
  const pending = subject.tasks.filter((task) => !task.done).length;
  const average = averageGrade(subject.tasks);
  const status = pending === 0 ? 'Tudo em dia' : `${pending} ${pending === 1 ? 'pendente' : 'pendentes'}`;

  return (
    <button type="button" className="subject-row" onClick={() => onOpen(subject.id)}>
      <SubjectIcon icon={subject.icon} color={subject.color} />
      <span className="subject-row__info">
        <strong>{subject.name}</strong>
        <span>{status}</span>
      </span>
      <span className="subject-row__grade" style={{ color: subject.color }}>
        {average === null ? '–' : formatGrade(average)}
      </span>
    </button>
  );
};

export default SubjectRow;
