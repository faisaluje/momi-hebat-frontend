import { lazy } from 'react';
import { authRoles } from 'app/auth';

const PackingConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/packing',
      component: lazy(() => import('./Packing'))
    }
  ]
};

export default PackingConfig;
