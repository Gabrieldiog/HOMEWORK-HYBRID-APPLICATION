import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast
} from '@ionic/react';
import { CSSProperties, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import SubjectIcon from '../components/SubjectIcon';
import { SUBJECT_COLORS } from '../constants/subject';
import { useSubjects } from '../context/SubjectsContext';
import { SubjectIconKey } from '../types/subject';

const NewSubject: React.FC = () => {
  const { addSubject } = useSubjects();
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [icon, setIcon] = useState<SubjectIconKey>('book');
  const [color, setColor] = useState(SUBJECT_COLORS[0]);
  const valid = name.trim().length >= 2;

  const handleSave = () => {
    if (!valid) return;
    const subject = addSubject({ name: name.trim(), teacher: teacher.trim(), icon, color });
    presentToast({ message: `${subject.name} adicionada`, duration: 1800, position: 'bottom' });
    router.push(`/materias/detalhe/${subject.id}`, 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/materias" text="" />
          </IonButtons>
          <IonTitle>Nova matéria</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="subject-hero" style={{ '--subject-color': color } as CSSProperties}>
          <SubjectIcon icon={icon} color={color} size="lg" />
          <div>
            <h1>{name.trim() || 'Nome da matéria'}</h1>
            <p>{teacher.trim() || 'Professor(a)'}</p>
          </div>
        </div>

        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <label className="field">
            <span>Nome</span>
            <IonInput
              fill="outline"
              placeholder="Ex.: Desenvolvimento Mobile"
              maxlength={40}
              value={name}
              onIonInput={(event) => setName(event.detail.value ?? '')}
            />
          </label>

          <label className="field">
            <span>Professor(a)</span>
            <IonInput
              fill="outline"
              placeholder="Opcional"
              maxlength={40}
              value={teacher}
              onIonInput={(event) => setTeacher(event.detail.value ?? '')}
            />
          </label>

          <div className="field">
            <span>Ícone</span>
            <IconPicker value={icon} color={color} onChange={setIcon} />
          </div>

          <div className="field">
            <span>Cor</span>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <IonButton type="submit" expand="block" disabled={!valid}>
            Salvar matéria
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default NewSubject;
