import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PenggunaConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/pengguna',
			component: lazy(() => import('./Pengguna'))
		}
	]
};

export default PenggunaConfig;
