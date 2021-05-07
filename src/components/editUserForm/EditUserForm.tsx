import './EditUserForm.scss';

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonInput,
	IonItem,
	IonLabel,
} from '@ionic/react';
import React from 'react';

interface EditUserFormProps {
	showModal: boolean;
	dismissModal: Function;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ showModal, dismissModal }) => {
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<IonCard style={{ margin: 'auto', marginTop: '5%', width: 'fit-content' }}>
				<IonCardHeader style={{ borderBottom: '1px solid whitesmoke' }}>
					<IonCardTitle
						style={{
							// display: 'flex',
							// alignItems: 'center',
							// justifyContent: 'center',
							// fontSize: '15px',
							textAlign: 'center',
						}}
					>
						Crear nuevo usuario
					</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<form>
						<IonItem style={{ height: '50%' }}>
							<IonLabel position="floating" className="formItem">
								Nombre del usuario
							</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel position="floating" className="formItem">
								Correo electrónico
							</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel position="floating" className="formItem">
								Contraseña
							</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel position="floating" className="formItem">
								Nombre
							</IonLabel>
							<IonInput />
						</IonItem>
						<IonItem>
							<IonLabel position="floating" className="formItem">
								Apellidos
							</IonLabel>
							<IonInput />
						</IonItem>
						<IonButton className="buttonCenter">Crear usuario</IonButton>
					</form>
				</IonCardContent>
			</IonCard>
		</div>
	);
};

export default EditUserForm;
