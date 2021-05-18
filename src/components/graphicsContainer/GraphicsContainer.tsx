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
import { useData } from '../../context/data/data.context';
import { useAuth } from '../../context/auth/auth.context';
import { CounterModel } from '../../generated/graphql';
import Loading from '../loading/loading';

interface CapacityInterface {
	name: string;
	occupied: number;
	free: number;
	maximun: number;
}

interface CounterInterface {
	username: string;
	capacity: number;
}

const GraphicsContainer: React.FC = () => {
	const [countersIds, setCountersIds] = useState<number[]>();
	const [capacityData, setCapacityData] = useState<CapacityInterface[]>();

	const { currentUser } = useAuth();
	const {
		findCounters,
		countersData,
		findStatistics,
		statisticsData,
		findGraphics,
		graphicsData,
	} = useData();

	useEffect(() => {
		findCounters({ companyId: currentUser?.me?.company?.id! });
	}, []);

	useEffect(() => {
		let statisticsInterval: NodeJS.Timeout;
		let graphicsInterval: NodeJS.Timeout;
		// TODO fix, se declaran 2 veces los intervalos al volver a la página
		if (countersIds) {
			findStatistics({ countersIds });
			findGraphics({ countersIds });

			statisticsInterval = setInterval(() => {
				findStatistics({ countersIds });
			}, 5000);

			graphicsInterval = setInterval(() => {
				findGraphics({ countersIds });
			}, 600000);
		}
		return () => {
			console.log('Esto se acaba manito');
			clearInterval(statisticsInterval);
			clearInterval(graphicsInterval);
		};
	}, [countersIds]);

	useEffect(() => {
		if (countersData && !countersIds) {
			setCountersIds(countersData.map(counter => counter.id));
		}
	}, [countersData]);

	useEffect(() => {
		console.log('He cambiado');
		if (statisticsData && countersData) {
			const capacity: CapacityInterface[] = [];
			let counterInfo: any;
			statisticsData.findStatisticsFromCounters.forEach(statistic => {
				counterInfo = countersData.find(counter => {
					return statistic.id === counter.id;
				});
				if (counterInfo) {
					capacity.push({
						name: counterInfo.username,
						occupied: statistic.statistics.entering - statistic.statistics.exiting,
						free:
							counterInfo.capacity - statistic.statistics.entering + statistic.statistics.exiting,
						maximun: counterInfo.capacity,
					});
				}
			});
			console.log('Capacity: ', capacity);
			setCapacityData(capacity);
		}
	}, [statisticsData]);

	if (!capacityData || !graphicsData) {
		return <Loading />;
	}

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<IonGrid>
				<IonRow>
					{capacityData.map((value, index) => {
						return (
							<IonCol
								size-xl="4"
								size-lg="6"
								size-md="12"
								size-sm="12"
								size-xm="12"
								style={{ margin: 'auto' }}
								key={index}
							>
								<IonCard>
									<IonCardHeader>
										<IonCardTitle
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: '25px',
											}}
										>
											{value.name}
										</IonCardTitle>
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
											{value.occupied} &nbsp; personas
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
											Aforo Total: {value.maximun} personas
										</IonCardTitle>
										<IonCardTitle
											style={{
												display: 'flex',
												alignItems: 'center',
												// justifyContent: 'center',
												fontSize: '15px',
											}}
										>
											Aforo disponible: {value.maximun - value.occupied}
										</IonCardTitle>
									</IonCardHeader>
								</IonCard>
							</IonCol>
						);
					})}
				</IonRow>
				<IonRow>
					{graphicsData.map((value, index) => {
						if (value && value.length > 0) {
							return (
								<IonCol
									size-xl="4"
									size-lg="6"
									size-md="12"
									size-sm="12"
									size-xm="12"
									style={{ margin: 'auto' }}
									key={index}
								>
									<Graphic graphicData={value} />
								</IonCol>
							);
						}
					})}
				</IonRow>
			</IonGrid>
		</div>
	);
};

export default GraphicsContainer;
