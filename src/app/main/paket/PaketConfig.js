import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PaketConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/paket',
      component: lazy(() => import('./Paket'))
    }
  ]
};

export default PaketConfig;
