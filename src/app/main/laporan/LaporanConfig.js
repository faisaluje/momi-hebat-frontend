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
    },
    {
      path: '/laporan/list-transaksi-saldo',
      component: lazy(() => import('./LaporanListTransaksiSaldo'))
    }
  ]
};

export default LaporanConfig;
