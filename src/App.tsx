import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { SubjectsProvider } from './context/SubjectsContext';
import Home from './pages/Home';
import NewSubject from './pages/NewSubject';
import SubjectDetail from './pages/SubjectDetail';

const App: React.FC = () => (
  <IonApp>
    <SubjectsProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/materias" component={Home} />
          <Route exact path="/materias/nova" component={NewSubject} />
          <Route exact path="/materia/:id" component={SubjectDetail} />
          <Route exact path="/">
            <Redirect to="/materias" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </SubjectsProvider>
  </IonApp>
);

export default App;
