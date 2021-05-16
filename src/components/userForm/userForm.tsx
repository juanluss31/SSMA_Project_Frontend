import './userForm.scss';

import {
	IonButton,
	IonContent,
	IonFooter,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonModal,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../context/auth/auth.context';
import { useData } from '../../context/data/data.context';
import {
	RegisterMutationVariables,
	UpdateUserMutationVariables,
	UserModel,
} from '../../generated/graphql';

import { Controller, useForm } from 'react-hook-form';

interface UserFormProps {
	showModal: boolean;
	dismissModal: Function;
	userData?: UserModel;
}

interface RegisterUserInterface {
	username?: string;
	email?: string;
	password?: string;
	firstname?: string;
	lastname?: string;
}

const UserForm: React.FC<UserFormProps> = ({ showModal, dismissModal, userData }) => {
	const { register, currentUser } = useAuth();
	const { updateUser } = useData();

	const [username, setUsername] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [firstname, setFirstname] = useState<string>();
	const [lastname, setLastname] = useState<string>();

	useEffect(() => {
		console.log('El modal se construye: ', userData);
		if (userData) {
			setUsername(userData.username);
			setEmail(userData.email);
			setFirstname(userData.firstname);
			setLastname(userData.lastname);
		}
	}, [userData]);

	const clearData = () => {
		setUsername(undefined);
		setFirstname(undefined);
		setLastname(undefined);
		setEmail(undefined);
		setPassword(undefined);
	};

	const parseUpdateUser = () => {
		if (userData) {
			const updatedUserData: UpdateUserMutationVariables = { username: userData.username };
			if (username !== userData.username) updatedUserData.newUsername = username;
			if (email !== userData.email) updatedUserData.newEmail = email;
			if (firstname !== userData.firstname) updatedUserData.newFirstname = firstname;
			if (lastname !== userData.lastname) updatedUserData.newLastname = lastname;

			console.log(updatedUserData);
			updateUser(updatedUserData);
		}
	};

	const parseRegisterUser = () => {
		const registerUserData: RegisterMutationVariables = {
			username: username!,
			email: email!,
			password: password!,
			firstname: firstname!,
			lastname: lastname!,
			companyName: currentUser?.me?.company?.name!,
		};
		console.log(registerUserData);
		register(registerUserData);
	};

	return (
		<IonModal
			isOpen={showModal}
			cssClass="editModal"
			onDidDismiss={() => {
				dismissModal();
			}}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{userData ? 'Edición del usuario' : 'Creación de usuario'}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form
					onSubmit={event => {
						event.preventDefault();
						userData ? parseUpdateUser() : parseRegisterUser();
						dismissModal();
						clearData();
					}}
				>
					<IonList>
						<IonItem className="formItem">
							<IonLabel position="floating" className="formLabel">
								Nombre del usuario
							</IonLabel>
							<IonInput
								value={username}
								clearInput={true}
								required={true}
								onIonChange={e => {
									setUsername(e.detail.value!);
								}}
							/>
						</IonItem>
						<IonItem className="formItem">
							<IonLabel position="floating" className="formLabel">
								Correo electrónico
							</IonLabel>
							<IonInput
								value={email}
								clearInput={true}
								required={true}
								onIonChange={e => {
									setEmail(e.detail.value!);
								}}
								pattern="^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
							/>
						</IonItem>
						{userData === undefined && (
							<IonItem className="formItem">
								<IonLabel position="floating" className="formLabel">
									Contraseña
								</IonLabel>
								<IonInput
									value={password}
									type="password"
									required={true}
									onIonChange={e => {
										setPassword(e.detail.value!);
									}}
								/>
							</IonItem>
						)}
						<IonItem className="formItem">
							<IonLabel position="floating" className="formLabel">
								Nombre
							</IonLabel>
							<IonInput
								value={firstname}
								clearInput={true}
								required={true}
								onIonChange={e => {
									setFirstname(e.detail.value!);
								}}
							/>
						</IonItem>
						<IonItem className="formItem">
							<IonLabel position="floating" className="formLabel">
								Apellidos
							</IonLabel>
							<IonInput
								value={lastname}
								clearInput={true}
								required={true}
								onIonChange={e => {
									setLastname(e.detail.value!);
								}}
							/>
						</IonItem>
					</IonList>
					<IonButton type="submit" className="buttonCenter">
						{userData ? 'Actualizar' : 'Crear'}
					</IonButton>
					<IonButton
						className="buttonCenter"
						onClick={() => {
							dismissModal();
							clearData();
						}}
					>
						Cancelar
					</IonButton>
				</form>
			</IonContent>
		</IonModal>
	);
};

export default UserForm;
