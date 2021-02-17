import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login/Login';
import React, {useContext, useState} from 'react';

export const LoginContext = React.createContext({
  updateDisabled: (value: boolean) => {},
});

const App: React.FC = () => {

  const [disabled, setDisabled] = useState<boolean>(true);

  const updateDisabled = (value: boolean) => {
    setDisabled(value);
  }

  return (
    <IonApp>
      <IonReactRouter>
      {/* <Menu /> */}
      <IonSplitPane contentId="main" disabled={disabled}>
        <Menu />
          <LoginContext.Provider value={{updateDisabled}}>
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/login" />
              </Route>
              <Route path="/login" exact={true}>
                <Login />
              </Route>
              <Route path="/page/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </LoginContext.Provider>
      </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;


{/* <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane> */}