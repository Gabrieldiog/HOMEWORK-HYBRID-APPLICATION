import { useIonAlert, useIonToast } from '@ionic/react';
import { useCallback } from 'react';
import { Task } from '../types/subject';
import { formatGrade, parseGrade } from '../utils/grades';

export function useGradePrompt(onSave: (taskId: string, grade?: number) => void) {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  return useCallback(
    (task: Task) => {
      const hasGrade = typeof task.grade === 'number';

      presentAlert({
        header: 'Nota',
        subHeader: task.title,
        inputs: [
          {
            name: 'grade',
            type: 'text',
            placeholder: 'De 0 a 10',
            value: hasGrade ? formatGrade(task.grade!) : '',
            attributes: { inputmode: 'decimal', maxlength: 4 }
          }
        ],
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          ...(hasGrade
            ? [{ text: 'Remover', role: 'destructive', handler: () => onSave(task.id, undefined) }]
            : []),
          {
            text: 'Salvar',
            handler: (values: { grade: string }) => {
              const grade = parseGrade(values.grade);
              if (grade === null) {
                presentToast({ message: 'Digite uma nota entre 0 e 10', duration: 1800, color: 'danger' });
                return false;
              }
              onSave(task.id, grade);
              return true;
            }
          }
        ]
      });
    },
    [presentAlert, presentToast, onSave]
  );
}
