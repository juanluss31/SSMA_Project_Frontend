import { barChartOutline, peopleOutline } from 'ionicons/icons';

export interface AppPage {
	url: string;
	icon: string;
	title: string;
	role: string;
}

export const appPages: AppPage[] = [
	{
		title: 'Vista general',
		url: '/page/Dashboard',
		icon: barChartOutline,
		role: 'BaseUser',
	},
	{
		title: 'Administrar usuarios',
		url: '/page/admin/users',
		icon: peopleOutline,
		role: 'Admin',
	},
	// {
	// 	title: 'Favorites',
	// 	url: '/page/Favorites',
	// 	icon: heartOutline,
	// },
	// {
	// 	title: 'Archived',
	// 	url: '/page/Archived',
	// 	icon: archiveOutline,
	// },
	// {
	// 	title: 'Trash',
	// 	url: '/page/Trash',
	// 	icon: trashOutline,
	// },
	// {
	// 	title: 'Spam',
	// 	url: '/page/Spam',
	// 	icon: warningOutline,
	// },
];
