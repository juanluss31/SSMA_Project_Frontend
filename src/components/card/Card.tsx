import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonButtons, IonButton, IonToast } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { LoginContext } from '../../App';

import './Card.scss';

const Card: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formStyle, setFormStyle] = useState<string>();
    const [showToast, setShowToast] = useState<boolean>(false);

    const isMobile = useMediaQuery({ query: `(max-width: 699px)` });
    const history = useHistory();
    const loginContext = useContext(LoginContext);

    useEffect(() => {
        isMobile ? setFormStyle("inputFormMobile") : setFormStyle("inputFormWeb");
    }, [])

    const handleSubmit = () => {
        if(username != '' && password != '' && username && password){
            console.log("El usuario y la contraseña no están vacíos.");
            loginContext.updateDisabled(false);
            history.push("/page/dashboard");
        }
        else{
            console.log("Usuario y contraseña no están rellenos");
            setShowToast(true);
        }
    }

    return(
        <IonCard className={formStyle}>
            <IonToast
                id="toast"
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Usuario o contraseña incorrecto."
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