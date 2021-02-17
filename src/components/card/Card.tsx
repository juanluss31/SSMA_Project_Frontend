import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonButtons, IonButton } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

import './Card.scss';

const Card: React.FC = () => {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [formStyle, setFormStyle] = useState<string>();

    const isMobile = useMediaQuery({ query: `(max-width: 699px)` });

    useEffect(() => {
        isMobile ? setFormStyle("inputFormMobile") : setFormStyle("inputFormWeb");
    }, [])

    return(
        <IonCard className={formStyle}>
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
                <IonButton className="submitButton">Acceder</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export default Card;