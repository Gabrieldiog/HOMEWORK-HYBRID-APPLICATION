import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { calendarClearOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { useMemo, useState } from 'react';
import AgendaSection from '../components/AgendaSection';
import EmptyState from '../components/EmptyState';
import { useSubjects } from '../context/SubjectsContext';
import { AgendaEntry, collectEntries, finishedEntries, groupPending } from '../utils/agenda';

type Filter = 'pending' | 'finished';

const Agenda: React.FC = () => {
  const { subjects, ready, toggleTask } = useSubjects();
  const router = useIonRouter();
  const [filter, setFilter] = useState<Filter>('pending');

  const entries = useMemo(() => collectEntries(subjects), [subjects]);
  const groups = useMemo(() => groupPending(entries), [entries]);
  const finished = useMemo(() => finishedEntries(entries), [entries]);

  const handleToggle = ({ subject, task }: AgendaEntry) => toggleTask(subject.id, task.id);
  const handleOpen = ({ subject }: AgendaEntry) => router.push(`/materias/detalhe/${subject.id}`);

  const renderPending = () =>
    groups.length === 0 ? (
      <EmptyState
        icon={checkmarkDoneOutline}
        title="Nada pendente"
        description="Todas as entregas estão em dia. Aproveita o descanso."
      />
    ) : (
      groups.map((group) => (
        <AgendaSection
          key={group.key}
          title={group.label}
          entries={group.entries}
          tone={group.key === 'late' ? 'danger' : undefined}
          onToggle={handleToggle}
          onOpen={handleOpen}
        />
      ))
    );

  const renderFinished = () =>
    finished.length === 0 ? (
      <EmptyState
        icon={calendarClearOutline}
        title="Nenhuma entrega concluída"
        description="Quando você marcar uma entrega como feita, ela aparece aqui."
      />
    ) : (
      <AgendaSection
        title="Concluídas"
        entries={finished}
        onToggle={handleToggle}
        onOpen={handleOpen}
      />
    );

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="page-head">
            <span>todas as matérias</span>
            <h1>Agenda</h1>
          </div>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={filter} onIonChange={(event) => setFilter(event.detail.value as Filter)}>
            <IonSegmentButton value="pending">
              <IonLabel>Pendentes ({entries.length - finished.length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="finished">
              <IonLabel>Concluídas ({finished.length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {ready && (filter === 'pending' ? renderPending() : renderFinished())}
      </IonContent>
    </IonPage>
  );
};

export default Agenda;
