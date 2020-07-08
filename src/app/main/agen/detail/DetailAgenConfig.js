import { lazy } from 'react';
import { authRoles } from 'app/auth';

const DetailAgenConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/agen/:agenId',
      component: lazy(() => import('./DetailAgen'))
    }
  ]
};

export default DetailAgenConfig;
