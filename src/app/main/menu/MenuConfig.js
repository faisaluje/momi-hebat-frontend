import { lazy } from 'react';
import { authRoles } from 'app/auth';

const MenuConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/menu',
			component: lazy(() => import('./Menu'))
		}
	]
};

export default MenuConfig;
