import { lazy } from 'react';
import { authRoles } from 'app/auth';

const SaldoConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/saldo',
      component: lazy(() => import('./Saldo'))
    }
  ]
};

export default SaldoConfig;
