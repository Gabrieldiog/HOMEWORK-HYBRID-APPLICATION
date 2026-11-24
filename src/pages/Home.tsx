import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { add, schoolOutline } from 'ionicons/icons';
import EmptyState from '../components/EmptyState';
import ProgressRing from '../components/ProgressRing';
import SubjectCard from '../components/SubjectCard';
import TaskItem from '../components/TaskItem';
import { useSubjects } from '../context/SubjectsContext';
import { formatLongDate, greeting } from '../utils/date';

const Home: React.FC = () => {
  const { subjects, ready, toggleTask } = useSubjects();
  const router = useIonRouter();

  const allTasks = subjects.flatMap((subject) => subject.tasks.map((task) => ({ task, subject })));
  const finished = allTasks.filter(({ task }) => task.done).length;
  const progress = allTasks.length ? finished / allTasks.length : 0;
  const upcoming = allTasks
    .filter(({ task }) => !task.done)
    .sort((a, b) => a.task.dueDate.localeCompare(b.task.dueDate))
    .slice(0, 4);

  const openSubject = (id: string) => router.push(`/materia/${id}`);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Semestre</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <section className="summary">
          <div>
            <p className="summary__date">{formatLongDate(new Date())}</p>
            <h1>{greeting()}!</h1>
            <p>
              {finished} de {allTasks.length} entregas concluídas
            </p>
          </div>
          <ProgressRing value={progress} color="var(--ion-color-secondary)">
            {Math.round(progress * 100)}%
          </ProgressRing>
        </section>

        {ready && subjects.length === 0 ? (
          <EmptyState
            icon={schoolOutline}
            title="Nenhuma matéria ainda"
            description="Cadastre as matérias do semestre para acompanhar provas e trabalhos."
          />
        ) : (
          <>
            {upcoming.length > 0 && (
              <>
                <h2 className="section-title">
                  Próximas entregas <small>{upcoming.length} mais próximas</small>
                </h2>
                <div className="stack">
                  {upcoming.map(({ task, subject }) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      color={subject.color}
                      subjectName={subject.name}
                      onToggle={(taskId) => toggleTask(subject.id, taskId)}
                      onOpen={() => openSubject(subject.id)}
                    />
                  ))}
                </div>
              </>
            )}

            <h2 className="section-title">
              Matérias <small>{subjects.length}</small>
            </h2>
            <div className="stack">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} onOpen={openSubject} />
              ))}
            </div>
          </>
        )}

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/materias/nova" aria-label="Nova matéria">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
