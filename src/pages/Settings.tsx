import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonAlert,
  useIonToast
} from '@ionic/react';
import { refreshOutline, trashOutline } from 'ionicons/icons';
import { version } from '../../package.json';
import ActionRow from '../components/ActionRow';
import SettingsGroup from '../components/SettingsGroup';
import { useSettings } from '../context/SettingsContext';
import { useSubjects } from '../context/SubjectsContext';
import { ThemeMode } from '../types/settings';

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' }
];

const PASSING_OPTIONS = [5, 6, 7];

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { restoreSample, clearAll } = useSubjects();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const confirm = (header: string, message: string, action: string, onConfirm: () => void, done: string) =>
    presentAlert({
      header,
      message,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: action,
          role: 'destructive',
          handler: () => {
            onConfirm();
            presentToast({ message: done, duration: 1800 });
          }
        }
      ]
    });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="page-head">
            <span>preferências do app</span>
            <h1>Ajustes</h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <SettingsGroup title="Aparência">
          <IonSegment
            value={settings.theme}
            onIonChange={(event) => updateSettings({ theme: event.detail.value as ThemeMode })}
          >
            {THEMES.map((theme) => (
              <IonSegmentButton key={theme.value} value={theme.value}>
                <IonLabel>{theme.label}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </SettingsGroup>

        <SettingsGroup
          title="Média para aprovação"
          description="Usada na calculadora de cada matéria e para destacar médias abaixo do mínimo."
        >
          <IonSegment
            value={String(settings.passingGrade)}
            onIonChange={(event) => updateSettings({ passingGrade: Number(event.detail.value) })}
          >
            {PASSING_OPTIONS.map((option) => (
              <IonSegmentButton key={option} value={String(option)}>
                <IonLabel>{option},0</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </SettingsGroup>

        <SettingsGroup title="Dados" description="Tudo fica salvo só neste aparelho.">
          <div className="list">
            <ActionRow
              icon={refreshOutline}
              label="Restaurar dados de exemplo"
              onClick={() =>
                confirm(
                  'Restaurar exemplo',
                  'Suas matérias atuais serão trocadas pelas matérias de exemplo.',
                  'Restaurar',
                  restoreSample,
                  'Dados de exemplo restaurados'
                )
              }
            />
            <ActionRow
              icon={trashOutline}
              label="Apagar todas as matérias"
              tone="danger"
              onClick={() =>
                confirm(
                  'Apagar tudo',
                  'Todas as matérias, entregas e notas serão apagadas deste aparelho.',
                  'Apagar',
                  clearAll,
                  'Matérias apagadas'
                )
              }
            />
          </div>
        </SettingsGroup>

        <p className="about">
          Semestre {version}
          <br />
          Projeto A2 de Desenvolvimento Mobile, feito com Ionic, React e Capacitor.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
