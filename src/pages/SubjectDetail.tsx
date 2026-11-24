import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter
} from '@ionic/react';
import { addCircleOutline, alertCircleOutline, close, trashOutline } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import SubjectIcon from '../components/SubjectIcon';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useSubjects } from '../context/SubjectsContext';
import { useGradePrompt } from '../hooks/useGradePrompt';
import { averageGrade, formatGrade } from '../utils/grades';

const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { subjects, ready, addTask, toggleTask, removeTask, removeSubject, setGrade } = useSubjects();
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [formOpen, setFormOpen] = useState(false);
  const subject = subjects.find((item) => item.id === id);
  const askGrade = useGradePrompt(
    useCallback((taskId: string, grade?: number) => setGrade(id, taskId, grade), [id, setGrade])
  );

  const leave = () => {
    if (router.canGoBack()) router.goBack();
    else router.push('/materias', 'root', 'replace');
  };

  const confirmRemoval = () => {
    if (!subject) return;
    presentAlert({
      header: 'Excluir matéria',
      message: `${subject.name} e todas as entregas dela serão apagadas.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            leave();
            removeSubject(subject.id);
          }
        }
      ]
    });
  };

  const renderContent = () => {
    if (!ready) {
      return (
        <div className="empty-state">
          <IonSpinner />
        </div>
      );
    }

    if (!subject) {
      return (
        <EmptyState
          icon={alertCircleOutline}
          title="Matéria não encontrada"
          description="Ela pode ter sido excluída."
        >
          <IonButton onClick={leave}>Voltar</IonButton>
        </EmptyState>
      );
    }

    const tasks = [...subject.tasks].sort(
      (a, b) => Number(a.done) - Number(b.done) || a.dueDate.localeCompare(b.dueDate)
    );
    const pending = subject.tasks.filter((task) => !task.done).length;
    const average = averageGrade(subject.tasks);

    return (
      <>
        <div className="subject-hero">
          <SubjectIcon icon={subject.icon} color={subject.color} size="lg" />
          <h1>{subject.name}</h1>
          {subject.teacher && <p>{subject.teacher}</p>}
        </div>

        <div className="stats">
          <StatCard label="Pendentes" value={pending} />
          <StatCard label="Entregues" value={subject.tasks.length - pending} />
          <StatCard
            label="Média"
            value={average === null ? '–' : formatGrade(average)}
            hint={average !== null && average < 6 ? 'Atenção' : undefined}
          />
        </div>

        <h2 className="section-title">
          Entregas
          <IonButton fill="clear" size="small" onClick={() => setFormOpen(true)}>
            <IonIcon slot="start" icon={addCircleOutline} />
            Adicionar
          </IonButton>
        </h2>

        {tasks.length === 0 ? (
          <EmptyState
            icon={addCircleOutline}
            title="Sem entregas"
            description="Adicione provas, trabalhos e atividades dessa matéria."
          />
        ) : (
          <div className="stack">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                color={subject.color}
                onToggle={(taskId) => toggleTask(subject.id, taskId)}
                onRemove={(taskId) => removeTask(subject.id, taskId)}
                onOpen={task.done ? () => askGrade(task) : undefined}
              />
            ))}
          </div>
        )}

        {subject.tasks.some((task) => task.done) && (
          <p className="hint">Toque numa entrega concluída para lançar ou editar a nota.</p>
        )}

        <IonModal
          isOpen={formOpen}
          onDidDismiss={() => setFormOpen(false)}
          initialBreakpoint={0.75}
          breakpoints={[0, 0.75, 1]}
        >
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonTitle>Nova entrega</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setFormOpen(false)} aria-label="Fechar">
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <TaskForm
              color={subject.color}
              onSubmit={(draft) => {
                addTask(subject.id, draft);
                setFormOpen(false);
              }}
            />
          </IonContent>
        </IonModal>
      </>
    );
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/materias" text="" />
          </IonButtons>
          <IonTitle>Matéria</IonTitle>
          {subject && (
            <IonButtons slot="end">
              <IonButton color="danger" onClick={confirmRemoval} aria-label="Excluir matéria">
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{renderContent()}</IonContent>
    </IonPage>
  );
};

export default SubjectDetail;
