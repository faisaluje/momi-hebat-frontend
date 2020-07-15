import { lazy } from 'react';
import { authRoles } from 'app/auth';

const KartuPaketConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/kartu-paket',
      component: lazy(() => import('./KartuPaket'))
    }
  ]
};

export default KartuPaketConfig;
