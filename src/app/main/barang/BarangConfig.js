import { lazy } from 'react';
import { authRoles } from 'app/auth';

const BarangConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/barang',
      component: lazy(() => import('./Barang'))
    }
  ]
};

export default BarangConfig;
