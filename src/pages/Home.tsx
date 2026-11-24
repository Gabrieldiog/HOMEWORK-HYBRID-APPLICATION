import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { add, schoolOutline } from 'ionicons/icons';
import { useMemo } from 'react';
import AgendaSection from '../components/AgendaSection';
import EmptyState from '../components/EmptyState';
import NextExamHero from '../components/NextExamHero';
import SubjectRow from '../components/SubjectRow';
import { useSubjects } from '../context/SubjectsContext';
import { collectEntries } from '../utils/agenda';
import { daysUntil, formatLongDate, greeting } from '../utils/date';

const Home: React.FC = () => {
  const { subjects, ready, toggleTask } = useSubjects();
  const router = useIonRouter();

  const entries = useMemo(() => collectEntries(subjects), [subjects]);
  const pending = entries.filter(({ task }) => !task.done);
  const nextExam =
    pending.find(({ task }) => task.type === 'prova' && daysUntil(task.dueDate) >= 0) ?? null;

  const openSubject = (id: string) => router.push(`/materias/detalhe/${id}`);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="page-head">
            <span>{formatLongDate(new Date())}</span>
            <h1>{greeting()}</h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NextExamHero
          exam={nextExam}
          finished={entries.length - pending.length}
          total={entries.length}
        />

        {ready && subjects.length === 0 ? (
          <EmptyState
            icon={schoolOutline}
            title="Nenhuma matéria ainda"
            description="Toque no + para cadastrar a primeira matéria do semestre."
          />
        ) : (
          <>
            {pending.length > 0 && (
              <AgendaSection
                title="Para fazer"
                entries={pending.slice(0, 3)}
                onToggle={({ subject, task }) => toggleTask(subject.id, task.id)}
                onOpen={({ subject }) => openSubject(subject.id)}
              />
            )}

            <section className="block">
              <h2 className="block__title">
                Matérias
                <span>média</span>
              </h2>
              <div className="list">
                {subjects.map((subject) => (
                  <SubjectRow key={subject.id} subject={subject} onOpen={openSubject} />
                ))}
              </div>
            </section>
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
