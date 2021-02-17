import { IonContent, IonPage } from '@ionic/react';
import Card from '../../components/card/Card';
import background from '../../img/login_background.jpg';

import './Login.scss';

const Login: React.FC = () => {
    return(
        <IonPage style={{backgroundImage: background}}>
            <IonContent fullscreen>
                <Card />
            </IonContent>
        </IonPage>
    );
}

export default Login;