import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import { checkmark, trashOutline } from 'ionicons/icons';
import { CSSProperties } from 'react';
import { TASK_TYPES } from '../constants/subject';
import { Task } from '../types/subject';
import { daysUntil, dueLabel, formatShortDate } from '../utils/date';
import { formatGrade } from '../utils/grades';

interface TaskItemProps {
  task: Task;
  color: string;
  subjectName?: string;
  onToggle?: (id: string) => void;
  onRemove?: (id: string) => void;
  onOpen?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, color, subjectName, onToggle, onRemove, onOpen }) => {
  const late = !task.done && daysUntil(task.dueDate) < 0;
  const status = task.done
    ? typeof task.grade === 'number'
      ? `nota ${formatGrade(task.grade)}`
      : 'entregue'
    : dueLabel(task.dueDate).toLowerCase();

  const item = (
    <IonItem
      lines="none"
      detail={false}
      className={`task-item${task.done ? ' is-done' : ''}${onOpen ? ' is-clickable' : ''}`}
      style={{ '--task-color': color } as CSSProperties}
      onClick={onOpen}
    >
      {onToggle && (
        <button
          type="button"
          slot="start"
          className="task-item__check"
          aria-label={task.done ? 'Marcar como pendente' : 'Marcar como entregue'}
          onClick={(event) => {
            event.stopPropagation();
            onToggle(task.id);
          }}
        >
          <IonIcon icon={checkmark} />
        </button>
      )}
      <div className="task-item__info">
        <strong>{task.title}</strong>
        <span>
          {subjectName && task.type === 'prova' && <em className="task-item__tag">{TASK_TYPES.prova}</em>}
          {subjectName ?? TASK_TYPES[task.type]}
        </span>
      </div>
      <div slot="end" className={`task-item__due${late ? ' is-late' : ''}`}>
        <strong>{formatShortDate(task.dueDate)}</strong>
        <span>{status}</span>
      </div>
    </IonItem>
  );

  if (!onRemove) return item;

  return (
    <IonItemSliding>
      {item}
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onRemove(task.id)}>
          <IonIcon slot="icon-only" icon={trashOutline} aria-label="Excluir entrega" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;
