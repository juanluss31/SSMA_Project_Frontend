import { IonCard, IonCardContent, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow } from "@ionic/react"
import { personCircle } from "ionicons/icons";
import React, { useState } from "react";

import './Card.scss';

const Card: React.FC = () => {

    const [username, setUsername] = useState<string>();

    return(
        <div>
            <IonCard>
                <IonCardContent className="inputForm">
                <IonRow>
                    <IonCol>
                        <IonIcon
                        style={{ fontSize: "70px", color: "#0040ff" }}
                        icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Usuario:</IonLabel>
                                <IonInput value={username} placeholder="Introduzca su usuario" onIonChange={(e) => setUsername(e.detail.value!)} clearInput required pattern="text">
                                    {/* <IonLabel>Usuario:</IonLabel> */}
                                </IonInput>
                            </IonItem>
                        </IonList>
                    </IonCol>
                </IonRow>
                </IonCardContent>
            </IonCard>
        </div>
    )
}

export default Card;