import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonIcon,
	IonRow,
	useIonModal,
} from '@ionic/react';
import { closeCircleOutline, createOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../context/auth/auth.context';
import { useData } from '../../context/data/data.context';
import { useUtils } from '../../context/error/utils.context';
import EditUserForm from '../editUserForm/EditUserForm';

const UserTable: React.FC = () => {
	const { currentUser } = useAuth();
	const { usersData, findUsers } = useData();
	const { showLoadingMessage } = useUtils();

	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

	const onDismissEdit = () => {
		dismiss();
	};

	const onDismissDelete = () => {
		setShowDeleteModal(false);
	};

	const [present, dismiss] = useIonModal(EditUserForm, {
		dismissModal: onDismissEdit,
	});

	useEffect(() => {
		showLoadingMessage('Buscando usuarios registrados...');
		if (currentUser && currentUser.me) findUsers({ companyId: currentUser?.me?.company.id });
	}, [currentUser, findUsers, showLoadingMessage]);

	return (
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
						<IonCol size="1">Usuario</IonCol>
						<IonCol size="3">Correo</IonCol>
						<IonCol size="1">Nombre</IonCol>
						<IonCol size="3">Apellidos</IonCol>
						<IonCol size="1">Opciones</IonCol>
					</IonRow>
					{usersData?.map(user => {
						return (
							<IonRow
								style={{
									alignItems: 'center',
									borderBottom: '1px solid whitesmoke',
									lineHight: '0px',
								}}
							>
								<IonCol size="1">{user.id}</IonCol>
								<IonCol size="1">{user.username}</IonCol>
								<IonCol size="3">{user.email}</IonCol>
								<IonCol size="1">{user.firstname}</IonCol>
								<IonCol size="3">{user.lastname}</IonCol>
								<IonCol size="1">
									<IonRow>
										<IonCol>
											<IonIcon
												icon={createOutline}
												style={{ fontSize: '24px' }}
												onClick={() => present()}
											/>
											<IonIcon
												icon={closeCircleOutline}
												style={{ fontSize: '24px' }}
												onClick={() => setShowDeleteModal(true)}
											/>
										</IonCol>
									</IonRow>
								</IonCol>
							</IonRow>
						);
					})}
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default UserTable;
