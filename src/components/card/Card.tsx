import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonButtons, IonButton, IonToast } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';

import './Card.scss';
import { useLoginLazyQuery } from '../../generated/graphql';
import Loading from '../loading/loading';
import { setToken } from '../../utils/storage.util';

interface LoginCredentials {
    username: string,
    password: string
}

const Card: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [credentials, setCredentials] = useState<LoginCredentials>({username: "", password: ""});
    const [message, setMessage] = useState<string>('');
    const [formStyle, setFormStyle] = useState<string>();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    const isMobile = useMediaQuery({ query: `(max-width: 699px)` });
    const history = useHistory();

    const [login, { called } ] = useLoginLazyQuery({
        fetchPolicy: 'network-only',
        variables: { username: credentials.username, password: credentials.password },
        onCompleted: (response) => {
            if(showLoading) {
                console.log("Se ha completado la query");
                console.log(response);

                setShowLoading(false);

                if(response.login.accessToken === "Bad login" || response.login.refreshToken =="Bad login") {
                    console.log("Credenciales incorrectos");
                    setMessage("Usuario o contraseña incorrecto.");
                    setShowToast(true);
                }

                else{
                    setToken(response.login.accessToken)
                    .then(() => {
                        history.push("/page/dashboard");
                    })
                }
            }
        },
        onError: (error) => {
            setShowLoading(false);
            console.log("Ha ocurrido el siguiente error: ");
            console.log(error);
        }
    })

    useEffect(() => {
        isMobile ? setFormStyle("inputFormMobile") : setFormStyle("inputFormWeb");
    }, [])

    const handleSubmit = () => {
        if(username != '' && password != '' && username && password){
            console.log("El usuario y la contraseña no están vacíos.");
            setShowLoading(true);
            setCredentials({username: username, password: password});
            // if(!called)
            login();
        }
        else {
            setMessage("El usuario y la contraseña no pueden estar vacíos.");
            setShowToast(true);
        }
    }

    return(
        <IonCard className={formStyle}>
            { showLoading ? <Loading /> : void 0 }
            <IonToast
                id="toast"
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                duration={1000}
                color="primary"
                position="top"
            />
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                            style={{ fontSize: "70px", color: "#37bfd1" }}
                            icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow className="marginRow">
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonLabel position="floating" className="textLabel">Usuario:</IonLabel>
                                    <IonInput value={username} placeholder="Introduzca su usuario" onIonChange={(e) => setUsername(e.detail.value!)} clearInput type="text" />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating" className="textLabel">Contraseña:</IonLabel>
                                    <IonInput value={password} placeholder="Introduzca su contraseña" onIonChange={(e) => setPassword(e.detail.value!)} clearInput type="password" />
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton className="submitButton" onClick={handleSubmit}>Acceder</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default Card;