import { AgendaEntry } from '../utils/agenda';
import { daysUntil, formatShortDate } from '../utils/date';

interface NextExamHeroProps {
  exam: AgendaEntry | null;
  finished: number;
  total: number;
}

function countdown(days: number) {
  if (days < 0) return 'já passou!';
  if (days === 0) return 'é hoje!';
  if (days === 1) return 'é amanhã';
  return `faltam ${days} dias`;
}

const NextExamHero: React.FC<NextExamHeroProps> = ({ exam, finished, total }) => {
  const progress = total ? finished / total : 0;

  return (
    <section className="hero">
      <span className="hero__label">Próxima prova</span>
      {exam ? (
        <>
          <strong className="hero__countdown">{countdown(daysUntil(exam.task.dueDate))}</strong>
          <span className="hero__detail">
            {exam.task.title}, {exam.subject.name}, {formatShortDate(exam.task.dueDate)}
          </span>
        </>
      ) : (
        <>
          <strong className="hero__countdown">sem provas à vista</strong>
          <span className="hero__detail">Cadastre uma prova numa matéria para ver a contagem aqui.</span>
        </>
      )}

      <div className="hero__progress">
        <div className="hero__bar">
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <span>
          {finished} de {total} entregas feitas
        </span>
      </div>
    </section>
  );
};

export default NextExamHero;
