import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import MenuConfig from 'app/main/menu/MenuConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import PenggunaConfig from 'app/main/pengguna/PenggunaConfig';
import PeriodeConfig from 'app/main/periode/PeriodeConfig';
import AgenConfig from 'app/main/agen/AgenConfig';

const routeConfigs = [LoginConfig, MenuConfig, PenggunaConfig, PeriodeConfig, AgenConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/menu" />
	}
];

export default routes;
