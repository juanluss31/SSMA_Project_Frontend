import { IonCard, IonCardContent } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { StatisticsModel } from '../../generated/graphql';

interface GraphicsProps {
	graphicData: StatisticsModel[];
}

const Graphic: React.FC<GraphicsProps> = ({ graphicData }) => {
	const [label, setLabel] = useState<string[]>();
	const [data, setData] = useState<string[]>();
	const [counterName, setCounterName] = useState<string>();

	// const data = {
	// 	labels: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
	// 	datasets: [
	// 		{
	// 			label: 'My First Dataset',
	// 			data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
	// 			fill: false,
	// 			borderColor: 'rgb(75, 192, 192)',
	// 			tension: 0.1,
	// 		},
	// 	],
	// };

	useEffect(() => {
		let parsedLabels: string[] = [];
		let parsedData: string[] = [];
		let date: Date;
		graphicData
			.slice()
			.reverse()
			.forEach(value => {
				date = new Date(value.datetime);
				parsedLabels.push(`${date.getHours()}:${date.getMinutes()}`);
				parsedData.push(`${value.entering - value.exiting}`);
			});
		setLabel(parsedLabels);
		setData(parsedData);
		setCounterName(graphicData[0].counter.username);
	}, [graphicData]);

	return (
		<IonCard>
			<IonCardContent>
				{/* <Bar
					data={{
						labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
						datasets: [
							{
								label: 'Colors of Votes',
								data: [12, 19, 3, 5, 2, 3],
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)',
								],
								borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)',
								],
								borderWidth: 1,
							},
						],
					}}
					// height={400}
					// width={600}
					options={{
						responsive: true,
						maintainAspectRatio: true,
					}}
				/> */}
				<Line
					data={{
						labels: label,
						datasets: [
							{
								label: counterName,
								data: data,
								fill: false,
								borderColor: 'rgb(75, 192, 192)',
								tension: 0.1,
							},
						],
					}}
				/>
			</IonCardContent>
		</IonCard>
	);
};

export default Graphic;
