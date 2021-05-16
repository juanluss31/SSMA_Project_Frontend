import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonRow,
	useIonAlert,
} from '@ionic/react';
import { add, closeCircleOutline, createOutline } from 'ionicons/icons';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../context/auth/auth.context';
import { useData } from '../../context/data/data.context';
import { useUtils } from '../../context/error/utils.context';
import { UserModel } from '../../generated/graphql';
import UserForm from '../userForm/userForm';

const UserTable: React.FC = () => {
	const { currentUser } = useAuth();
	const { usersData, findUsers, deleteUser } = useData();
	const { showLoadingMessage } = useUtils();

	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [presentDeleteAlert] = useIonAlert();
	const [formData, setFormData] = useState<UserModel[]>();
	const [editData, setEditData] = useState<UserModel | undefined>(undefined);

	const onDissmiss = () => {
		setShowEditModal(false);
		setEditData(undefined);
	};

	const findRelatedUsers = useCallback(() => {
		if (currentUser && currentUser.me) findUsers({ companyId: currentUser?.me?.company.id });
	}, [currentUser, findUsers]);

	useEffect(() => {
		showLoadingMessage('Buscando usuarios registrados...');
		findRelatedUsers();
	}, [findRelatedUsers, showLoadingMessage]);

	useEffect(() => {
		if (editData !== undefined) {
			console.log('Mostramos el modal');
			setShowEditModal(true);
		}
	}, [editData]);

	useEffect(() => {
		if (usersData) {
			setFormData(usersData);
		}
	}, [usersData]);

	return (
		<>
			<IonCard>
				<IonCardHeader>
					<IonCardTitle style={{ textAlign: 'center' }}>Usuarios creados</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<IonGrid>
						<IonRow
							style={{
								alignItems: 'center',
								borderBottom: '1px solid whitesmoke',
								lineHight: '0px',
							}}
						>
							<IonCol size="1">Id</IonCol>
							<IonCol size="2">Usuario</IonCol>
							<IonCol size="3">Correo</IonCol>
							<IonCol size="2">Nombre</IonCol>
							<IonCol size="3">Apellidos</IonCol>
							<IonCol size="1">Opciones</IonCol>
						</IonRow>
						{formData?.map((user, id) => {
							return (
								<IonRow
									key={id}
									style={{
										alignItems: 'center',
										borderBottom: '1px solid whitesmoke',
										lineHight: '0px',
									}}
								>
									<IonCol size="1">{user.id}</IonCol>
									<IonCol size="2">{user.username}</IonCol>
									<IonCol size="3">{user.email}</IonCol>
									<IonCol size="2">{user.firstname}</IonCol>
									<IonCol size="3">{user.lastname}</IonCol>
									<IonCol size="1">
										<IonRow>
											<IonCol>
												<IonIcon
													icon={createOutline}
													style={{ fontSize: '24px' }}
													onClick={() => {
														setEditData(user);
													}}
												/>
												<IonIcon
													icon={closeCircleOutline}
													style={{ fontSize: '24px' }}
													onClick={() =>
														presentDeleteAlert({
															header: '¿Estás seguro?',
															message: `Estás a punto de eliminar al usuario ${user.username}, y no se podrá recuperar.`,
															buttons: [
																'Cancelar',
																{
																	text: 'Aceptar',
																	handler: () => {
																		deleteUser({ userId: user.id });
																	},
																},
															],
														})
													}
												/>
											</IonCol>
										</IonRow>
									</IonCol>
								</IonRow>
							);
						})}
					</IonGrid>
				</IonCardContent>

				<div style={{ height: '50px' }}>
					<IonFab
						vertical="bottom"
						horizontal="end"
						onClick={() => {
							console.log('Has hecho click: ', showEditModal);
							setShowEditModal(true);
						}}
					>
						<IonFabButton size="small">
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>
				</div>
			</IonCard>
			<UserForm showModal={showEditModal} dismissModal={onDissmiss} userData={editData} />
		</>
	);
};

export default UserTable;
