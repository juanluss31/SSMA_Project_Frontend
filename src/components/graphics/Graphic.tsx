import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';
import { BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Bar } from 'react-chartjs-2';

const Graphic: React.FC = () => {
	// const data = [
	// 	{
	// 		name: 'Page A',
	// 		uv: 4000,
	// 		pv: 2400,
	// 		amt: 2400,
	// 	},
	// 	{
	// 		name: 'Page B',
	// 		uv: 3000,
	// 		pv: 1398,
	// 		amt: 2210,
	// 	},
	// 	{
	// 		name: 'Page C',
	// 		uv: 2000,
	// 		pv: 9800,
	// 		amt: 2290,
	// 	},
	// 	{
	// 		name: 'Page D',
	// 		uv: 2780,
	// 		pv: 3908,
	// 		amt: 2000,
	// 	},
	// 	{
	// 		name: 'Page E',
	// 		uv: 1890,
	// 		pv: 4800,
	// 		amt: 2181,
	// 	},
	// 	{
	// 		name: 'Page F',
	// 		uv: 2390,
	// 		pv: 3800,
	// 		amt: 2500,
	// 	},
	// 	{
	// 		name: 'Page G',
	// 		uv: 3490,
	// 		pv: 4300,
	// 		amt: 2100,
	// 	},
	// ];

	return (
		<IonCard>
			<IonCardContent>
				<Bar
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
				/>
			</IonCardContent>
		</IonCard>
	);
};

export default Graphic;
