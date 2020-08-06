import { lazy } from 'react';
import { authRoles } from 'app/auth';

const LaporanConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/laporan/list-agen',
      component: lazy(() => import('./LaporanListAgen'))
    }
  ]
};

export default LaporanConfig;
