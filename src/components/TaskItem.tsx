import { IonIcon } from '@ionic/react';
import { checkmark, trashOutline } from 'ionicons/icons';
import { TASK_TYPES } from '../constants/subject';
import { Task } from '../types/subject';
import { daysUntil, dueLabel, formatShortDate } from '../utils/date';

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
  const meta = [TASK_TYPES[task.type], subjectName, formatShortDate(task.dueDate)].filter(Boolean).join(' · ');

  return (
    <div
      className={`task-item${task.done ? ' task-item--done' : ''}`}
      style={{ borderLeftColor: color }}
      onClick={onOpen}
    >
      {onToggle && (
        <button
          type="button"
          className="task-item__check"
          aria-label={task.done ? 'Marcar como pendente' : 'Marcar como entregue'}
          style={{ borderColor: color, backgroundColor: task.done ? color : 'transparent' }}
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
        <span>{meta}</span>
      </div>
      <span className={`task-item__due${late ? ' is-late' : ''}`}>
        {task.done ? 'Entregue' : dueLabel(task.dueDate)}
      </span>
      {onRemove && (
        <button
          type="button"
          className="task-item__remove"
          aria-label="Excluir entrega"
          onClick={(event) => {
            event.stopPropagation();
            onRemove(task.id);
          }}
        >
          <IonIcon icon={trashOutline} />
        </button>
      )}
    </div>
  );
};

export default TaskItem;
