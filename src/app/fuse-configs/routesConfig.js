import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import MenuConfig from 'app/main/menu/MenuConfig';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [LoginConfig, MenuConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/menu" />
	}
];

export default routes;
