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
import { UserModel, CounterModel } from '../../generated/graphql';
import UserForm from '../userForm/userForm';

const CounterTable: React.FC = () => {
	// const { currentUser } = useAuth();
	const { countersData } = useData();
	const { showLoadingMessage } = useUtils();

	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [presentDeleteAlert] = useIonAlert();
	const [formData, setFormData] = useState<CounterModel[]>();
	const [editData, setEditData] = useState<UserModel | undefined>(undefined);

	const onDissmiss = () => {
		setShowEditModal(false);
		setEditData(undefined);
	};

	useEffect(() => {
		showLoadingMessage('Buscando usuarios registrados...');
	}, [showLoadingMessage]);

	useEffect(() => {
		if (editData !== undefined) {
			console.log('Mostramos el modal');
			setShowEditModal(true);
		}
	}, [editData]);

	useEffect(() => {
		if (countersData) {
			setFormData(countersData);
		}
	}, [countersData]);

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
							<IonCol size="3">Versión</IonCol>
							<IonCol size="2">Capacidad</IonCol>
							<IonCol size="1">Opciones</IonCol>
						</IonRow>
						{formData?.map((counter, id) => {
							return (
								<IonRow
									key={id}
									style={{
										alignItems: 'center',
										borderBottom: '1px solid whitesmoke',
										lineHight: '0px',
									}}
								>
									<IonCol size="1">{counter.id}</IonCol>
									<IonCol size="2">{counter.username}</IonCol>
									<IonCol size="3">{counter.currentVersion}</IonCol>
									<IonCol size="2">{counter.capacity}</IonCol>
									<IonCol size="1">
										<IonRow>
											<IonCol>
												<IonIcon
													icon={createOutline}
													style={{ fontSize: '24px' }}
													// onClick={() => {
													// 	setEditData(user);
													// }}
												/>
												<IonIcon
													icon={closeCircleOutline}
													style={{ fontSize: '24px' }}
													// onClick={() =>
													// 	presentDeleteAlert({
													// 		header: '¿Estás seguro?',
													// 		message: `Estás a punto de eliminar al usuario ${user.username}, y no se podrá recuperar.`,
													// 		buttons: [
													// 			'Cancelar',
													// 			{
													// 				text: 'Aceptar',
													// 				handler: () => {
													// 					deleteUser({ userId: user.id });
													// 				},
													// 			},
													// 		],
													// 	})
													// }
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
		</>
	);
};

export default CounterTable;
