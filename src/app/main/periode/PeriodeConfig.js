import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PeriodeConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/periode',
			component: lazy(() => import('./Periode'))
		}
	]
};

export default PeriodeConfig;
