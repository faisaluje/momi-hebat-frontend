import { lazy } from 'react';
import { authRoles } from 'app/auth';

const AgenConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/agen',
			component: lazy(() => import('./Agen'))
		}
	]
};

export default AgenConfig;
