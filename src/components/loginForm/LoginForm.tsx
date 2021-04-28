import './LoginForm.scss';

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonRow,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React, { useState } from 'react';
import { useUtils } from '../../context/error/utils.context';

type Props = {
	setCredentials: Function;
};

const LoginForm: React.FC<Props> = (props: Props) => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { showErrorMessage } = useUtils();

	const handleSubmit = () => {
		if (username !== '' && password !== '' && username && password) {
			props.setCredentials({ username: username, password: password });
		} else {
			showErrorMessage('El usuario y la contraseña no pueden estar vacíos.');
		}
	};

	return (
		<IonCard className="inputFormWeb">
			<IonCardContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonIcon style={{ fontSize: '70px', color: '#37bfd1' }} icon={personCircle} />
						</IonCol>
					</IonRow>
					<IonRow className="marginRow">
						<IonCol>
							<IonList>
								<IonItem>
									<IonLabel position="floating" className="textLabel">
										Usuario:
									</IonLabel>
									<IonInput
										value={username}
										placeholder="Introduzca su usuario"
										onIonChange={e => setUsername(e.detail.value!)}
										clearInput
										type="text"
									/>
								</IonItem>
								<IonItem>
									<IonLabel position="floating" className="textLabel">
										Contraseña:
									</IonLabel>
									<IonInput
										value={password}
										placeholder="Introduzca su contraseña"
										onIonChange={e => setPassword(e.detail.value!)}
										clearInput
										type="password"
									/>
								</IonItem>
							</IonList>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonButton className="submitButton" onClick={handleSubmit}>
					Acceder
				</IonButton>
			</IonCardContent>
		</IonCard>
	);
};

export default LoginForm;
