import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, libraryOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import DeviceFrame from './components/DeviceFrame';
import { SettingsProvider } from './context/SettingsContext';
import { SubjectsProvider } from './context/SubjectsContext';
import Agenda from './pages/Agenda';
import Home from './pages/Home';
import NewSubject from './pages/NewSubject';
import Settings from './pages/Settings';
import SubjectDetail from './pages/SubjectDetail';

const App: React.FC = () => (
  <DeviceFrame>
    <IonApp>
      <SettingsProvider>
        <SubjectsProvider>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/materias" component={Home} />
                <Route exact path="/materias/nova" component={NewSubject} />
                <Route exact path="/materias/detalhe/:id" component={SubjectDetail} />
                <Route exact path="/agenda" component={Agenda} />
                <Route exact path="/ajustes" component={Settings} />
                <Route exact path="/">
                  <Redirect to="/materias" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="materias" href="/materias">
                  <IonIcon icon={libraryOutline} />
                  <IonLabel>Matérias</IonLabel>
                </IonTabButton>
                <IonTabButton tab="agenda" href="/agenda">
                  <IonIcon icon={calendarOutline} />
                  <IonLabel>Agenda</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ajustes" href="/ajustes">
                  <IonIcon icon={settingsOutline} />
                  <IonLabel>Ajustes</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </SubjectsProvider>
      </SettingsProvider>
    </IonApp>
  </DeviceFrame>
);

export default App;
