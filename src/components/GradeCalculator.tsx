import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { Task } from '../types/subject';
import { formatGrade, gradeOutlook } from '../utils/grades';

const PASSING_OPTIONS = [5, 6, 7];

interface GradeCalculatorProps {
  tasks: Task[];
  passing: number;
  color: string;
  onPassingChange: (grade: number) => void;
}

function describe(tasks: Task[], passing: number) {
  const outlook = gradeOutlook(tasks, passing);

  switch (outlook.status) {
    case 'empty':
      return { value: '–', text: 'Cadastre as entregas da matéria para calcular.' };
    case 'closed':
      return {
        value: formatGrade(outlook.average),
        text: outlook.passed ? 'Média fechada. Aprovado!' : 'Média fechada abaixo do mínimo.'
      };
    case 'safe':
      return { value: '0,0', text: 'A média já está garantida. Mas entrega caprichado mesmo assim.' };
    case 'impossible':
      return { value: formatGrade(outlook.needed), text: 'Nem tirando 10 em tudo. Hora de conversar com o professor.' };
    case 'needs':
      return {
        value: formatGrade(outlook.needed),
        text:
          outlook.remaining === 1
            ? 'É a nota que falta na última entrega sem nota.'
            : `É a média que falta nas ${outlook.remaining} entregas sem nota.`
      };
  }
}

const GradeCalculator: React.FC<GradeCalculatorProps> = ({ tasks, passing, color, onPassingChange }) => {
  const { value, text } = describe(tasks, passing);

  return (
    <section className="calculator">
      <div className="calculator__head">
        <h2>Quanto preciso tirar?</h2>
        <IonSegment
          className="calculator__segment"
          value={String(passing)}
          onIonChange={(event) => onPassingChange(Number(event.detail.value))}
        >
          {PASSING_OPTIONS.map((option) => (
            <IonSegmentButton key={option} value={String(option)}>
              <IonLabel>média {option}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
      </div>
      <div className="calculator__result">
        <strong style={{ color }}>{value}</strong>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default GradeCalculator;
