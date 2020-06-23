import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import MenuConfig from 'app/main/menu/MenuConfig';

const routeConfigs = [MenuConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/menu" />
	}
];

export default routes;
