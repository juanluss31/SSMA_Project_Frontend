import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonRow,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import Graphic from '../graphics/Graphic';

const GraphicsContainer: React.FC = () => {
	const [number, setNumber] = useState<number>(0);

	const array = ['a', 'b'];

	useEffect(() => {
		setTimeout(() => {
			const newNumber = Math.floor(Math.random() * (200 - 0 + 1) + 0);
			setNumber(newNumber);
		}, 5000);
	}, [number]);

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<IonGrid>
				<IonRow>
					<IonCol
						size-xl="4"
						size-lg="6"
						size-md="12"
						size-sm="12"
						size-xm="12"
						style={{ margin: 'auto' }}
					>
						<IonCard>
							<IonCardHeader>
								<IonCardTitle
									style={{
										display: 'flex',
										alignItems: 'center',
										// justifyContent: 'center',
										fontSize: '15px',
									}}
								>
									Aforo Ocupado
								</IonCardTitle>
								<IonCardTitle
									style={{
										display: 'flex',
										alignItems: 'center',
										// justifyContent: 'center',
									}}
								>
									{/* <AnimatedNumber value={number} duration={100} /> &nbsp; personas */}
									{number} &nbsp; personas
								</IonCardTitle>
								<IonCardTitle
									style={{
										display: 'flex',
										alignItems: 'center',
										// justifyContent: 'center',
										marginTop: '5%',
										fontSize: '15px',
									}}
								>
									Aforo Total: 200 personas
								</IonCardTitle>
								<IonCardTitle
									style={{
										display: 'flex',
										alignItems: 'center',
										// justifyContent: 'center',
										fontSize: '15px',
									}}
								>
									Aforo disponible: {200 - number}
								</IonCardTitle>
							</IonCardHeader>
							<IonCardContent></IonCardContent>
						</IonCard>
					</IonCol>
					{array.map(() => {
						return (
							<IonCol size-xl="4" size-lg="6" size-md="12" size-sm="12" size-xm="12">
								<Graphic />
							</IonCol>
						);
					})}
				</IonRow>
			</IonGrid>
		</div>
	);
};

export default GraphicsContainer;
