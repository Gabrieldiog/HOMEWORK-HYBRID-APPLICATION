import { IonButton, IonInput, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { CSSProperties, useState } from 'react';
import { TASK_TYPES } from '../constants/subject';
import { TaskDraft, TaskType } from '../types/subject';
import { todayKey } from '../utils/date';

interface TaskFormProps {
  color: string;
  onSubmit: (draft: TaskDraft) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ color, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>('trabalho');
  const [dueDate, setDueDate] = useState(todayKey());
  const valid = title.trim().length >= 2 && Boolean(dueDate);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (valid) onSubmit({ title: title.trim(), type, dueDate });
      }}
    >
      <label className="field">
        <span>Título</span>
        <IonInput
          fill="outline"
          placeholder="Ex.: Lista de exercícios 3"
          maxlength={60}
          value={title}
          onIonInput={(event) => setTitle(event.detail.value ?? '')}
        />
      </label>

      <div className="field">
        <span>Tipo</span>
        <IonSegment value={type} onIonChange={(event) => setType(event.detail.value as TaskType)}>
          {(Object.keys(TASK_TYPES) as TaskType[]).map((key) => (
            <IonSegmentButton key={key} value={key}>
              <IonLabel>{TASK_TYPES[key]}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
      </div>

      <label className="field">
        <span>Prazo</span>
        <input
          className="date-input"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>

      <IonButton type="submit" expand="block" disabled={!valid} style={{ '--background': color } as CSSProperties}>
        Adicionar entrega
      </IonButton>
    </form>
  );
};

export default TaskForm;
