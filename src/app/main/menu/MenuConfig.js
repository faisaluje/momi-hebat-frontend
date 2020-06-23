import { lazy } from 'react';

const MenuConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/menu',
			component: lazy(() => import('./Menu'))
		}
	]
};

export default MenuConfig;
