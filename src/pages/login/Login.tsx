import { IonContent, IonPage, IonToast } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Card from '../../components/loginForm/LoginForm';
import { useLoginLazyQuery } from '../../generated/graphql';
import background from '../../img/login_background.jpg';
import { setToken } from '../../utils/storage.util';

import './Login.scss';

interface LoginCredentials {
    username: string,
    password: string
}

const Login: React.FC = () => {

    const [credentials, setCredentials] = useState<LoginCredentials>({username: "", password: ""});
    const [showToast, setShowToast] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const history = useHistory();

    useEffect(() => {
        console.log("Credentials changed: ", credentials);
        if(credentials.username !== "" && credentials.password !== "") {
            login();
        }
    }, [credentials])

    useEffect(() => {
        if(message !== ''){
            setShowToast(true);
        }
    }, [message])

    const [login ] = useLoginLazyQuery({
        variables: { username: credentials.username, password: credentials.password },
        onCompleted: (res) => {
            if(res.login) {
                console.log("Se ha completado la query");
                console.log(res);

                if(res.login.accessToken === "Bad login" || res.login.refreshToken =="Bad login") {
                    console.log("Credenciales incorrectos");
                    // setMessage("Usuario o contraseña incorrecto.");
                    // setShowToast(true);
                }

                else{
                    setToken(res.login.accessToken)
                    .then(() => {
                        history.push("/page/dashboard");
                    })
                }
            }
        },
        onError: (error) => {
            // setShowLoading(false);
            console.log("Ha ocurrido el siguiente error: ");
            console.log(error);
        }
    })
    
    console.log("hola login");
    return(
        <IonPage style={{backgroundImage: background}}>
            <IonContent fullscreen>
                <IonToast
                    id="toast"
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={message}
                    duration={1000}
                    color="primary"
                    position="top"
                />
                <Card setCredentials={setCredentials} setMessage={setMessage} />
            </IonContent>
        </IonPage>
    );
}

export default Login;